#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const investmentPlatforms = require('./investment_platform_backup.js');

const ROOT_DIR = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT_DIR, 'config', 'aiox_continuity_sources.json');
const EXCLUDES_PATH = path.join(ROOT_DIR, 'config', 'aiox_continuity_excludes.txt');
const SCHEMA_VERSION = 'aiox.continuity.v1';
const SNAPSHOT_TAG = 'aiox-continuity';
const DEFAULT_RESTORE_ROOT = 'C:\\AIOX\\RestoreTest';
const CRITICAL_BLOCKED_FILE_NAMES = new Set([
  'auth.json',
  '.credentials.json',
  'installation_id',
  'cap_sid'
]);
const REINSTALLABLE_DIRECTORY_NAMES = new Set([
  '.cache',
  '.firebase',
  '.git',
  '.next',
  '.sandbox-bin',
  '.tmp',
  'browser_recordings',
  'cache',
  'cache2',
  'coverage',
  'crashes',
  'dist',
  'logs',
  'node_modules',
  'out_deploy'
]);

function normalizeText(value) {
  return String(value || '').trim();
}

function portablePath(value) {
  return String(value || '').replace(/\\/g, '/');
}

function isInsidePath(candidate, parent) {
  const relative = path.relative(path.resolve(parent), path.resolve(candidate));
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function stateRoot(environment = process.env) {
  const configured = normalizeText(environment.AIOX_CONTINUITY_STATE_DIR);
  if (configured) return path.resolve(configured);
  const localAppData = normalizeText(environment.LOCALAPPDATA) || path.join(os.homedir(), 'AppData', 'Local');
  return path.join(localAppData, 'AIOX', 'Continuity');
}

function writeJsonAtomic(filePath, value) {
  const directory = path.dirname(filePath);
  fs.mkdirSync(directory, { recursive: true });
  const temporary = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(temporary, filePath);
}

function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (_) {
    return fallback;
  }
}

function readConfig(configPath = CONFIG_PATH) {
  const config = readJson(configPath);
  if (!config || config.schema_version !== SCHEMA_VERSION) {
    throw new Error(`Configuracao de continuidade invalida ou ausente: ${configPath}`);
  }
  if (!Array.isArray(config.sources) || config.sources.length === 0) {
    throw new Error('A configuracao de continuidade nao possui fontes.');
  }
  return config;
}

function expandVariablesRaw(value, environment = process.env, projectRoot = ROOT_DIR) {
  const variables = { ...environment, PROJECT_ROOT: projectRoot };
  let unresolved = false;
  const expanded = String(value || '').replace(/\$\{([A-Z0-9_]+)\}/gi, (_, key) => {
    const replacement = normalizeText(variables[key]);
    if (!replacement) unresolved = true;
    return replacement;
  });
  if (unresolved || !normalizeText(expanded)) return null;
  return expanded;
}

function expandTemplate(value, environment = process.env, projectRoot = ROOT_DIR) {
  const expanded = expandVariablesRaw(value, environment, projectRoot);
  return expanded ? path.resolve(expanded) : null;
}

function selectCandidate(candidates, environment = process.env, options = {}) {
  const expanded = (candidates || [])
    .map((candidate) => expandTemplate(candidate, environment, options.projectRoot || ROOT_DIR))
    .filter(Boolean);
  const existing = expanded.find((candidate) => fs.existsSync(candidate));
  if (existing) return existing;
  if (options.allowCreate) {
    return expanded.find((candidate) => {
      const parent = path.dirname(candidate);
      return fs.existsSync(parent) || fs.existsSync(path.dirname(parent));
    }) || expanded[0] || null;
  }
  return null;
}

function resolveBlockedRoots(config, environment = process.env) {
  return (config.blocked_operational_roots || [])
    .map((candidate) => expandTemplate(candidate, environment))
    .filter(Boolean);
}

function pathIsOperationalPlatform(candidate, blockedRoots = []) {
  const resolved = path.resolve(candidate);
  if (blockedRoots.some((blocked) => isInsidePath(resolved, blocked))) return true;
  const portable = portablePath(resolved).toLowerCase();
  return portable.includes('/appdata/roaming/metaquotes/terminal/')
    || portable.endsWith('/appdata/roaming/metaquotes/terminal')
    || portable.includes('/documents/ninjatrader 8/')
    || portable.endsWith('/documents/ninjatrader 8')
    || portable.includes('/jforex4/')
    || portable.endsWith('/jforex4')
    || portable.includes('/appdata/roaming/nelogica/profit/')
    || portable.endsWith('/appdata/roaming/nelogica/profit')
    || portable.includes('/appdata/roaming/nelogica/blackarrow/')
    || portable.endsWith('/appdata/roaming/nelogica/blackarrow')
    || portable.includes('/documents/calgo/')
    || portable.endsWith('/documents/calgo')
    || portable.includes('/documents/ctrader/')
    || portable.endsWith('/documents/ctrader')
    || portable.includes('/appdata/roaming/spotware/')
    || portable.endsWith('/appdata/roaming/spotware')
    || portable.includes('/appdata/roaming/tradovate trader/')
    || portable.endsWith('/appdata/roaming/tradovate trader');
}

function shouldExcludeCriticalPath(candidate, blockedRoots = []) {
  const baseName = path.basename(candidate).toLowerCase();
  if (CRITICAL_BLOCKED_FILE_NAMES.has(baseName)) return true;
  if (/^(logs|state|queue|goals)_\d+\.sqlite(?:-.+)?$/i.test(baseName)) return true;
  if (baseName === '.sandbox-secrets' || baseName === 'mcp-oauth-locks') return true;
  return pathIsOperationalPlatform(candidate, blockedRoots);
}

function resolveSources(config = readConfig(), environment = process.env, options = {}) {
  const blockedRoots = resolveBlockedRoots(config, environment);
  const sources = [];
  const missingRequired = [];
  const warnings = [];

  for (const definition of config.sources) {
    const root = selectCandidate(definition.candidates, environment, { projectRoot: options.projectRoot || ROOT_DIR });
    if (!root) {
      const detail = { id: definition.id, reason: 'root_not_found' };
      if (definition.required) missingRequired.push(detail);
      else warnings.push(detail);
      continue;
    }
    if (pathIsOperationalPlatform(root, blockedRoots)) {
      missingRequired.push({ id: definition.id, reason: 'operational_platform_root_blocked' });
      continue;
    }

    const includeNames = Array.isArray(definition.includes) ? definition.includes : [];
    const entries = [];
    if (includeNames.length === 0) {
      entries.push({ absolute_path: root, relative_path: '.', kind: fs.statSync(root).isDirectory() ? 'directory' : 'file' });
    } else {
      for (const relativeName of includeNames) {
        const absolute = path.resolve(root, relativeName);
        if (!isInsidePath(absolute, root)) {
          throw new Error(`Include fora da raiz em ${definition.id}: ${relativeName}`);
        }
        if (!fs.existsSync(absolute)) {
          warnings.push({ id: definition.id, reason: 'include_not_found', include: relativeName });
          continue;
        }
        if (shouldExcludeCriticalPath(absolute, blockedRoots)) {
          throw new Error(`Caminho critico proibido na fonte ${definition.id}: ${relativeName}`);
        }
        entries.push({
          absolute_path: absolute,
          relative_path: portablePath(relativeName),
          kind: fs.statSync(absolute).isDirectory() ? 'directory' : 'file'
        });
      }
    }

    if (entries.length === 0) {
      const detail = { id: definition.id, reason: 'no_included_paths' };
      if (definition.required) missingRequired.push(detail);
      else warnings.push(detail);
      continue;
    }

    sources.push({
      id: definition.id,
      description: definition.description,
      required: Boolean(definition.required),
      restore_policy: definition.restore_policy || 'manual_review',
      root,
      entries
    });
  }

  const deduplicatedPaths = [];
  const seen = new Set();
  for (const source of sources) {
    for (const entry of source.entries) {
      const key = path.resolve(entry.absolute_path).toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      deduplicatedPaths.push(entry.absolute_path);
    }
  }

  return { sources, source_paths: deduplicatedPaths, missing_required: missingRequired, warnings, blocked_roots: blockedRoots };
}

function resolveRepositoryPaths(config = readConfig(), environment = process.env) {
  const repository = config.repository || {};
  const cloudRemote = (repository.cloud_remote_candidates || [])
    .map((candidate) => expandVariablesRaw(candidate, environment))
    .find(Boolean) || null;
  const local = selectCandidate(repository.local_candidates, environment, { allowCreate: true });
  const cloud = selectCandidate(repository.cloud_candidates, environment, { allowCreate: true });
  const reports = selectCandidate(repository.reports_candidates, environment, { allowCreate: true });
  const recoveryKit = selectCandidate(repository.recovery_kit_candidates, environment, { allowCreate: true });
  if (!local) throw new Error('Repositorio local de continuidade nao pode ser resolvido.');
  if (!cloud) throw new Error('Repositorio de nuvem no Google Drive nao pode ser resolvido.');
  if (isInsidePath(local, ROOT_DIR)) throw new Error('Repositorio local nao pode ficar dentro do workspace.');
  if (isInsidePath(cloud, ROOT_DIR)) throw new Error('Repositorio de nuvem nao pode ficar dentro do workspace.');
  if (path.resolve(local).toLowerCase() === path.resolve(cloud).toLowerCase()) {
    throw new Error('Repositorios local e de nuvem precisam ser caminhos distintos.');
  }
  return {
    local,
    cloud,
    cloud_remote: cloudRemote,
    active_cloud: repository.require_remote_api ? cloudRemote : cloud,
    require_remote_api: Boolean(repository.require_remote_api),
    rclone_remote_name: repository.rclone_remote_name || 'aioxdrive',
    reports,
    recovery_kit: recoveryKit
  };
}

function runProcess(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || ROOT_DIR,
    encoding: 'utf8',
    windowsHide: true,
    env: options.env || process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: options.timeout || 0,
    maxBuffer: options.maxBuffer || (64 * 1024 * 1024)
  });
  return {
    ok: result.status === 0 && !result.error,
    status: result.status,
    signal: result.signal,
    stdout: String(result.stdout || '').trim(),
    stderr: String(result.stderr || '').trim(),
    error: result.error ? result.error.message : null
  };
}

function findRestic(environment = process.env) {
  const configured = normalizeText(environment.AIOX_RESTIC_PATH);
  const candidates = [
    configured,
    path.join(normalizeText(environment.LOCALAPPDATA) || path.join(os.homedir(), 'AppData', 'Local'), 'AIOX', 'Tools', 'restic.exe')
  ].filter(Boolean);
  const local = candidates.find((candidate) => fs.existsSync(candidate));
  if (local) return local;
  const where = process.platform === 'win32' ? runProcess('where.exe', ['restic.exe']) : runProcess('which', ['restic']);
  return where.ok ? where.stdout.split(/\r?\n/)[0] : null;
}

function findRclone(environment = process.env) {
  const configured = normalizeText(environment.AIOX_RCLONE_PATH);
  const candidates = [
    configured,
    path.join(normalizeText(environment.LOCALAPPDATA) || path.join(os.homedir(), 'AppData', 'Local'), 'AIOX', 'Tools', 'rclone.exe')
  ].filter(Boolean);
  const local = candidates.find((candidate) => fs.existsSync(candidate));
  if (local) return local;
  const where = process.platform === 'win32' ? runProcess('where.exe', ['rclone.exe']) : runProcess('which', ['rclone']);
  return where.ok ? where.stdout.split(/\r?\n/)[0] : null;
}

function rcloneRemoteAvailable(rclonePath, remoteName, environment = process.env) {
  if (!rclonePath) return false;
  const result = runProcess(rclonePath, ['listremotes'], { env: environment, timeout: 30000 });
  if (!result.ok) return false;
  const expected = `${String(remoteName || '').replace(/:$/, '')}:`;
  return result.stdout.split(/\r?\n/).map((item) => item.trim()).includes(expected);
}

function loadPassword(environment = process.env) {
  if (normalizeText(environment.RESTIC_PASSWORD)) return environment.RESTIC_PASSWORD;
  if (normalizeText(environment.AIOX_CONTINUITY_TEST_PASSWORD)) return environment.AIOX_CONTINUITY_TEST_PASSWORD;
  if (process.platform !== 'win32') {
    throw new Error('RESTIC_PASSWORD precisa ser fornecida fora do Windows.');
  }
  const secretScript = path.join(ROOT_DIR, 'scripts', 'aiox_continuity_secret.ps1');
  const result = runProcess('powershell.exe', [
    '-NoProfile',
    '-NonInteractive',
    '-ExecutionPolicy', 'Bypass',
    '-File', secretScript,
    'get'
  ]);
  if (!result.ok || !result.stdout) {
    throw new Error(result.stderr || result.error || 'Senha DPAPI de continuidade nao configurada.');
  }
  return result.stdout;
}

function resticEnvironment(password, environment = process.env) {
  const result = { ...environment, RESTIC_PASSWORD: password };
  const rclonePath = findRclone(environment);
  if (rclonePath) {
    const currentPath = normalizeText(result.Path || result.PATH);
    result.Path = `${path.dirname(rclonePath)}${path.delimiter}${currentPath}`;
    result.PATH = result.Path;
  }
  return result;
}

function runRestic(resticPath, repository, args, password, options = {}) {
  const result = runProcess(resticPath, ['--repo', repository, ...args], {
    env: resticEnvironment(password, options.environment || process.env),
    timeout: options.timeout || 0,
    maxBuffer: options.maxBuffer
  });
  if (!result.ok && options.throwOnError !== false) {
    const detail = result.stderr || result.error || result.stdout || `codigo ${result.status}`;
    throw new Error(`Restic falhou em ${args[0]}: ${detail.slice(0, 4000)}`);
  }
  return result;
}

function repositoryInitialized(repository) {
  return fs.existsSync(path.join(repository, 'config')) && fs.existsSync(path.join(repository, 'keys'));
}

function resticRepositoryAvailable(resticPath, repository, password, environment = process.env) {
  if (!repository) return false;
  if (!String(repository).startsWith('rclone:') && !repositoryInitialized(repository)) return false;
  return runRestic(resticPath, repository, ['snapshots', '--json'], password, {
    environment,
    timeout: 180000,
    throwOnError: false
  }).ok;
}

function ensureLocalRepository(resticPath, repository, password) {
  fs.mkdirSync(repository, { recursive: true });
  if (!repositoryInitialized(repository)) {
    runRestic(resticPath, repository, ['init'], password, { timeout: 120000 });
  }
  runRestic(resticPath, repository, ['snapshots', '--json'], password, { timeout: 120000 });
}

function parseSnapshotList(stdout) {
  if (!normalizeText(stdout)) return [];
  const value = JSON.parse(stdout);
  return Array.isArray(value) ? value : [];
}

function selectNewestSnapshot(snapshots = []) {
  return [...snapshots].sort((left, right) => {
    const rightTime = Date.parse(right && right.time ? right.time : 0) || 0;
    const leftTime = Date.parse(left && left.time ? left.time : 0) || 0;
    if (rightTime !== leftTime) return rightTime - leftTime;
    return String(right && right.id ? right.id : '').localeCompare(String(left && left.id ? left.id : ''));
  })[0] || null;
}

function snapshotCompletedAt(snapshot) {
  if (!snapshot) return null;
  const completed = snapshot.summary && snapshot.summary.backup_end;
  return normalizeText(completed) || normalizeText(snapshot.time) || null;
}

function latestSnapshot(resticPath, repository, password) {
  const result = runRestic(resticPath, repository, [
    'snapshots', '--json', '--latest', '1', '--tag', SNAPSHOT_TAG
  ], password, { timeout: 180000 });
  return selectNewestSnapshot(parseSnapshotList(result.stdout));
}

function hashFile(filePath) {
  const hash = crypto.createHash('sha256');
  const descriptor = fs.openSync(filePath, 'r');
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  try {
    let bytesRead;
    do {
      bytesRead = fs.readSync(descriptor, buffer, 0, buffer.length, null);
      if (bytesRead > 0) hash.update(buffer.subarray(0, bytesRead));
    } while (bytesRead > 0);
  } finally {
    fs.closeSync(descriptor);
  }
  return hash.digest('hex');
}

function findRepresentative(entryPath, blockedRoots = []) {
  if (!fs.existsSync(entryPath)) return null;
  const stat = fs.statSync(entryPath);
  if (stat.isFile()) {
    if (stat.size <= 16 * 1024 * 1024 && !shouldExcludeCriticalPath(entryPath, blockedRoots)) return entryPath;
    return null;
  }

  const queue = [entryPath];
  let inspected = 0;
  while (queue.length > 0 && inspected < 5000) {
    const current = queue.shift();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch (_) {
      continue;
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      inspected += 1;
      const absolute = path.join(current, entry.name);
      if (shouldExcludeCriticalPath(absolute, blockedRoots)) continue;
      if (entry.isDirectory()) {
        if (!REINSTALLABLE_DIRECTORY_NAMES.has(entry.name.toLowerCase())) queue.push(absolute);
      } else if (entry.isFile()) {
        try {
          const fileStat = fs.statSync(absolute);
          if (fileStat.size > 0 && fileStat.size <= 16 * 1024 * 1024) return absolute;
        } catch (_) {}
      }
      if (inspected >= 5000) break;
    }
  }
  return null;
}

function createSentinels(resolution, destination) {
  const sentinels = [];
  for (const source of resolution.sources) {
    let representative = null;
    for (const entry of source.entries) {
      representative = findRepresentative(entry.absolute_path, resolution.blocked_roots);
      if (representative) break;
    }
    if (!representative) continue;
    const stat = fs.statSync(representative);
    sentinels.push({
      source_id: source.id,
      file_name: path.basename(representative),
      relative_path: portablePath(path.relative(source.root, representative)),
      bytes: stat.size,
      sha256: hashFile(representative)
    });
  }
  writeJsonAtomic(destination, { schema_version: SCHEMA_VERSION, generated_at: new Date().toISOString(), sentinels });
  return sentinels;
}

function gitMetadata(projectPath) {
  const inside = runProcess('git', ['-C', projectPath, 'rev-parse', '--is-inside-work-tree']);
  if (!inside.ok || inside.stdout !== 'true') return { is_repository: false };
  const command = (args) => runProcess('git', ['-C', projectPath, ...args]);
  const head = command(['rev-parse', 'HEAD']);
  const branch = command(['branch', '--show-current']);
  const origin = command(['remote', 'get-url', 'origin']);
  const status = command(['status', '--short']);
  return {
    is_repository: true,
    head: head.ok ? head.stdout : null,
    branch: branch.ok ? branch.stdout : null,
    origin: origin.ok ? origin.stdout : null,
    dirty_entries: status.ok && status.stdout ? status.stdout.split(/\r?\n/).length : 0
  };
}

function createGitBundles(resolution, bundleRoot) {
  fs.mkdirSync(bundleRoot, { recursive: true });
  const results = [];
  for (const source of resolution.sources.filter((item) => ['sommersstore', 'protheus'].includes(item.id))) {
    const metadata = gitMetadata(source.root);
    const item = { source_id: source.id, ...metadata, bundle_created: false };
    if (metadata.is_repository && metadata.head) {
      const bundlePath = path.join(bundleRoot, `${source.id}.bundle`);
      const temporary = `${bundlePath}.tmp`;
      const bundle = runProcess('git', ['-C', source.root, 'bundle', 'create', temporary, '--all'], { timeout: 300000 });
      if (!bundle.ok) {
        throw new Error(`Falha ao criar bundle Git de ${source.id}: ${bundle.stderr || bundle.error || bundle.stdout}`);
      }
      fs.renameSync(temporary, bundlePath);
      item.bundle_created = true;
      item.bundle_file = path.basename(bundlePath);
      item.bundle_sha256 = hashFile(bundlePath);
      item.bundle_bytes = fs.statSync(bundlePath).size;
    }
    results.push(item);
  }
  writeJsonAtomic(path.join(bundleRoot, 'git-inventory.json'), {
    schema_version: SCHEMA_VERSION,
    generated_at: new Date().toISOString(),
    repositories: results
  });
  return results;
}

function createMachineInventory(destination, resolution, resticPath) {
  const versions = {};
  for (const [name, command, args] of [
    ['node', process.execPath, ['--version']],
    ['npm', process.platform === 'win32' ? 'npm.cmd' : 'npm', ['--version']],
    ['git', 'git', ['--version']],
    ['restic', resticPath, ['version']]
  ]) {
    const result = runProcess(command, args, { timeout: 20000 });
    versions[name] = result.ok ? result.stdout.split(/\r?\n/)[0] : null;
  }
  const inventory = {
    schema_version: SCHEMA_VERSION,
    generated_at: new Date().toISOString(),
    computer_name: normalizeText(process.env.COMPUTERNAME) || os.hostname(),
    platform: process.platform,
    architecture: process.arch,
    versions,
    sources: resolution.sources.map((source) => ({
      id: source.id,
      required: source.required,
      restore_policy: source.restore_policy,
      included_entries: source.entries.length
    })),
    missing_required: resolution.missing_required,
    warnings: resolution.warnings
  };
  writeJsonAtomic(destination, inventory);
  return inventory;
}

function prepareRuntimeArtifacts(resolution, environment = process.env, resticPath = findRestic(environment)) {
  const root = path.join(stateRoot(environment), 'staging');
  const resolvedRoot = path.resolve(root);
  if (!isInsidePath(resolvedRoot, stateRoot(environment))) throw new Error('Staging fora da raiz de continuidade.');
  fs.rmSync(resolvedRoot, { recursive: true, force: true });
  fs.mkdirSync(resolvedRoot, { recursive: true });
  const git = createGitBundles(resolution, path.join(resolvedRoot, 'git-bundles'));
  const sentinels = createSentinels(resolution, path.join(resolvedRoot, 'continuity-sentinels.json'));
  const inventory = createMachineInventory(path.join(resolvedRoot, 'machine-inventory.json'), resolution, resticPath);
  return { root: resolvedRoot, git, sentinels, inventory };
}

function machineIdentity(environment = process.env) {
  const filePath = path.join(stateRoot(environment), 'machine-identity.json');
  const existing = readJson(filePath);
  if (existing && existing.id) return existing;
  const created = {
    id: crypto.randomUUID(),
    computer_name: normalizeText(environment.COMPUTERNAME) || os.hostname(),
    created_at: new Date().toISOString()
  };
  writeJsonAtomic(filePath, created);
  return created;
}

function primaryMarkerPath(paths) {
  return `${paths.cloud}.primary-writer.json`;
}

function readPrimary(paths) {
  return readJson(primaryMarkerPath(paths));
}

function writePrimary(paths, identity) {
  const marker = {
    schema_version: SCHEMA_VERSION,
    machine_id: identity.id,
    computer_name: identity.computer_name,
    claimed_at: new Date().toISOString(),
    policy: 'single_writer'
  };
  writeJsonAtomic(primaryMarkerPath(paths), marker);
  return marker;
}

function claimPrimary(options = {}) {
  const config = options.config || readConfig();
  const environment = options.environment || process.env;
  const paths = options.paths || resolveRepositoryPaths(config, environment);
  fs.mkdirSync(path.dirname(paths.cloud), { recursive: true });
  const identity = machineIdentity(environment);
  const current = readPrimary(paths);
  if (current && current.machine_id !== identity.id && !options.replacePrimary) {
    return {
      ok: false,
      error: `O escritor primario atual e ${current.computer_name || 'outra maquina'}. Use promocao explicita para substituir.`,
      current_primary: current
    };
  }
  const primary = writePrimary(paths, identity);
  return { ok: true, primary };
}

function assertWriter(paths, environment = process.env, handoffSource = false) {
  const identity = machineIdentity(environment);
  const primary = readPrimary(paths);
  if (handoffSource) {
    if (primary && primary.machine_id !== identity.id) {
      throw new Error(`Snapshot de handoff bloqueado: ${primary.computer_name || 'outra maquina'} ja e o escritor primario.`);
    }
    return { mode: 'handoff_source', identity, primary };
  }
  if (!primary) throw new Error('Nenhuma maquina primaria foi registrada. Execute continuity:claim no PC principal.');
  if (primary.machine_id !== identity.id) {
    throw new Error(`Esta maquina nao e a escritora primaria. Escritora atual: ${primary.computer_name || 'desconhecida'}.`);
  }
  return { mode: 'primary', identity, primary };
}

function isRobocopySuccess(code) {
  const value = Number(code);
  return Number.isInteger(value) && value >= 0 && value <= 7;
}

function rcloneRepositoryTarget(repository) {
  return String(repository || '').startsWith('rclone:') ? String(repository).slice('rclone:'.length) : null;
}

function copyRepositoryAdditive(source, destination, options = {}) {
  if (process.platform !== 'win32') throw new Error('A replica gerenciada para Google Drive requer Windows.');
  const remoteSource = rcloneRepositoryTarget(source);
  const remoteDestination = rcloneRepositoryTarget(destination);
  if (remoteSource || remoteDestination) {
    if (remoteSource && remoteDestination) throw new Error('Replica entre dois destinos Rclone nao e suportada.');
    const rclonePath = options.rclonePath || findRclone(options.environment || process.env);
    if (!rclonePath) throw new Error('Rclone nao instalado para a replica direta ao Google Drive.');
    const localPath = remoteSource ? destination : source;
    if (!remoteSource && !repositoryInitialized(localPath)) throw new Error(`Repositorio de origem invalido: ${localPath}`);
    fs.mkdirSync(localPath, { recursive: true });
    const rcloneSource = remoteSource || source;
    const rcloneDestination = remoteDestination || destination;
    const result = runProcess(rclonePath, [
      'copy',
      rcloneSource,
      rcloneDestination,
      '--checksum',
      '--transfers', '4',
      '--checkers', '8',
      '--retries', '5',
      '--low-level-retries', '10',
      '--stats', '30s',
      '--stats-one-line'
    ], { timeout: 12 * 60 * 60 * 1000, env: options.environment || process.env });
    if (!result.ok) {
      throw new Error(`Replica Rclone falhou: ${result.stderr || result.error || result.stdout || `codigo ${result.status}`}`);
    }
    return { status: 0, ok: true, transport: 'rclone_api' };
  }

  if (!repositoryInitialized(source)) throw new Error(`Repositorio de origem invalido: ${source}`);
  fs.mkdirSync(destination, { recursive: true });
  const result = runProcess('robocopy.exe', [
    source,
    destination,
    '/E',
    '/COPY:DAT',
    '/DCOPY:DAT',
    '/XJ',
    '/FFT',
    '/R:3',
    '/W:5',
    '/NP',
    '/NFL',
    '/NDL',
    '/NJH',
    '/NJS'
  ], { timeout: 2 * 60 * 60 * 1000 });
  if (!isRobocopySuccess(result.status)) {
    throw new Error(`Replica para o Drive falhou (robocopy ${result.status}): ${result.stderr || result.error || result.stdout}`);
  }
  return { status: result.status, ok: true, transport: 'drivefs_mount' };
}

function retentionArgs(retention = {}) {
  return [
    '--keep-hourly', String(retention.keep_hourly || 24),
    '--keep-daily', String(retention.keep_daily || 14),
    '--keep-weekly', String(retention.keep_weekly || 8),
    '--keep-monthly', String(retention.keep_monthly || 12)
  ];
}

function publishRecoveryKit(config, paths) {
  if (!paths.recovery_kit) return [];
  fs.mkdirSync(paths.recovery_kit, { recursive: true });
  const published = [];
  for (const relative of config.recovery_kit_files || []) {
    const source = path.resolve(ROOT_DIR, relative);
    if (!isInsidePath(source, ROOT_DIR) || !fs.existsSync(source) || !fs.statSync(source).isFile()) continue;
    const destination = path.join(paths.recovery_kit, path.basename(source));
    const temporary = `${destination}.tmp-${process.pid}`;
    fs.copyFileSync(source, temporary);
    fs.renameSync(temporary, destination);
    published.push(path.basename(source));
  }
  const receipt = published.map((name) => {
    const filePath = path.join(paths.recovery_kit, name);
    return { file: name, bytes: fs.statSync(filePath).size, sha256: hashFile(filePath) };
  });
  writeJsonAtomic(path.join(paths.recovery_kit, 'recovery-kit-manifest.json'), {
    schema_version: SCHEMA_VERSION,
    generated_at: new Date().toISOString(),
    files: receipt
  });
  return receipt;
}

function safeError(error) {
  return normalizeText(error && error.message ? error.message : error).slice(0, 4000);
}

function reportPaths(environment = process.env, paths = null) {
  const localReports = path.join(stateRoot(environment), 'reports');
  return { local: localReports, cloud: paths ? paths.reports : null };
}

function saveReport(report, environment = process.env, paths = null) {
  const destinations = reportPaths(environment, paths);
  const stamp = report.completed_at.replace(/[:.]/g, '-');
  const fileName = `continuity-${stamp}-${report.status}.json`;
  const saved = [];
  for (const directory of [destinations.local, destinations.cloud].filter(Boolean)) {
    try {
      fs.mkdirSync(directory, { recursive: true });
      writeJsonAtomic(path.join(directory, fileName), report);
      writeJsonAtomic(path.join(directory, 'latest-continuity-report.json'), report);
      saved.push(path.join(directory, fileName));
    } catch (_) {}
  }
  return saved;
}

function preflight(options = {}) {
  const config = options.config || readConfig();
  const environment = options.environment || process.env;
  const resolution = resolveSources(config, environment, options);
  const paths = resolveRepositoryPaths(config, environment);
  const resticPath = options.resticPath || findRestic(environment);
  const rclonePath = options.rclonePath || findRclone(environment);
  const remoteReady = paths.require_remote_api
    ? rcloneRemoteAvailable(rclonePath, paths.rclone_remote_name, environment)
    : null;
  const exclusions = fs.existsSync(EXCLUDES_PATH) ? fs.readFileSync(EXCLUDES_PATH, 'utf8') : '';
  const requiredExclusions = [
    'auth.json',
    'MetaQuotes/Terminal',
    'NinjaTrader 8',
    'JForex4',
    'Nelogica/Profit',
    'Tradovate Trader',
    'Downloads/*.exe',
    'Downloads/*.msi'
  ];
  const missingExclusions = requiredExclusions.filter((item) => !exclusions.includes(item));
  const errors = [];
  if (resolution.missing_required.length > 0) errors.push('required_sources_missing');
  if (!resticPath) errors.push('restic_missing');
  if (paths.require_remote_api && !rclonePath) errors.push('rclone_missing');
  else if (paths.require_remote_api && !remoteReady) errors.push('rclone_remote_missing');
  if (paths.require_remote_api && !paths.cloud_remote) errors.push('cloud_remote_missing');
  if (missingExclusions.length > 0) errors.push('critical_exclusions_missing');
  if (!fs.existsSync(path.dirname(paths.cloud))) errors.push('google_drive_parent_missing');
  let platformDriveSafety = null;
  if (config.investment_platforms && config.investment_platforms.enabled) {
    platformDriveSafety = investmentPlatforms.driveSafetyStatus({ environment });
    if (config.investment_platforms.require_drive_sync_ack && !platformDriveSafety.ok) {
      errors.push('google_drive_direct_sync_not_acknowledged');
    }
  }
  return {
    ok: errors.length === 0,
    schema_version: SCHEMA_VERSION,
    checked_at: new Date().toISOString(),
    errors,
    missing_required: resolution.missing_required,
    warnings: resolution.warnings,
    source_ids: resolution.sources.map((source) => source.id),
    source_path_count: resolution.source_paths.length,
    restic: resticPath ? { installed: true, path: resticPath } : { installed: false },
    rclone: rclonePath ? {
      installed: true,
      path: rclonePath,
      remote_name: paths.rclone_remote_name,
      remote_ready: remoteReady,
      required: paths.require_remote_api
    } : { installed: false, remote_ready: false, required: paths.require_remote_api },
    repositories: paths,
    missing_critical_exclusions: missingExclusions,
    platform_drive_safety: platformDriveSafety,
    resolution
  };
}

function initialize(options = {}) {
  const config = options.config || readConfig();
  const environment = options.environment || process.env;
  const paths = options.paths || resolveRepositoryPaths(config, environment);
  const resticPath = options.resticPath || findRestic(environment);
  const rclonePath = options.rclonePath || findRclone(environment);
  if (!resticPath) throw new Error('Restic nao instalado. Execute powershell -File scripts/install_restic.ps1.');
  const password = options.password || loadPassword(environment);
  if (resticRepositoryAvailable(resticPath, paths.active_cloud, password, environment) && !repositoryInitialized(paths.local)) {
    throw new Error('A nuvem ja possui um repositorio. Use o comando adopt em vez de init.');
  }
  ensureLocalRepository(resticPath, paths.local, password);
  copyRepositoryAdditive(paths.local, paths.active_cloud, { rclonePath, environment });
  runRestic(resticPath, paths.active_cloud, ['check'], password, { environment, timeout: 30 * 60 * 1000 });
  const kit = publishRecoveryKit(config, paths);
  return { ok: true, initialized: true, repositories: paths, recovery_kit_files: kit.length };
}

function backup(options = {}) {
  const startedAt = new Date().toISOString();
  const config = options.config || readConfig();
  const environment = options.environment || process.env;
  let paths;
  const report = {
    schema_version: SCHEMA_VERSION,
    operation: 'backup',
    trigger: options.trigger || 'manual',
    status: 'error',
    started_at: startedAt,
    completed_at: startedAt,
    rpo_minutes: config.rpo_minutes || 120,
    computer_name: normalizeText(environment.COMPUTERNAME) || os.hostname(),
    sources: [],
    snapshot: null,
    cloud_validation: null,
    platform_capture: null,
    error: null
  };

  try {
    if (config.investment_platforms && config.investment_platforms.enabled) {
      const safety = investmentPlatforms.driveSafetyStatus({ environment });
      if (config.investment_platforms.require_drive_sync_ack && !safety.ok) {
        throw new Error('Backup direto de Documents ainda nao foi confirmado como desativado no Google Drive Desktop.');
      }
      const captured = investmentPlatforms.capturePlatforms({ environment });
      report.platform_capture = {
        status: captured.status,
        root: captured.root,
        platforms: captured.manifest ? captured.manifest.platforms.map((platform) => ({
          id: platform.id,
          name: platform.name,
          status: platform.status,
          files: platform.files,
          bytes: platform.bytes,
          active: platform.active
        })) : [],
        error: captured.error || null
      };
      if (!captured.ok) throw new Error(`Falha na captura das plataformas: ${captured.error}`);
    }
    const check = preflight({ config, environment, resticPath: options.resticPath });
    paths = check.repositories;
    if (!check.ok) throw new Error(`Preflight bloqueou o backup: ${check.errors.join(', ')}`);
    const writer = assertWriter(paths, environment, Boolean(options.handoffSource));
    const resticPath = check.restic.path;
    const rclonePath = check.rclone && check.rclone.path;
    const password = options.password || loadPassword(environment);
    if (!repositoryInitialized(paths.local)) {
      if (resticRepositoryAvailable(resticPath, paths.active_cloud, password, environment)) {
        throw new Error('Repositorio local ausente e copia de nuvem existente. Execute adopt antes do backup.');
      }
      ensureLocalRepository(resticPath, paths.local, password);
    }

    const runtime = prepareRuntimeArtifacts(check.resolution, environment, resticPath);
    const sourcePaths = [...check.resolution.source_paths, runtime.root];
    const tags = [SNAPSHOT_TAG, writer.mode, `trigger-${report.trigger}`];
    const backupArgs = ['backup', ...sourcePaths, '--exclude-file', EXCLUDES_PATH, '--host', report.computer_name];
    for (const tag of tags) backupArgs.push('--tag', tag);
    backupArgs.push('--quiet');
    runRestic(resticPath, paths.local, backupArgs, password, { timeout: 12 * 60 * 60 * 1000 });
    const localSnapshot = latestSnapshot(resticPath, paths.local, password);
    if (!localSnapshot || !localSnapshot.id) throw new Error('O snapshot local nao apareceu apos o backup.');

    runRestic(resticPath, paths.local, [
      'forget', '--tag', SNAPSHOT_TAG, '--group-by', 'host', ...retentionArgs(config.retention)
    ], password, { timeout: 30 * 60 * 1000 });
    const replication = copyRepositoryAdditive(paths.local, paths.active_cloud, { rclonePath, environment });
    const cloudSnapshot = latestSnapshot(resticPath, paths.active_cloud, password);
    if (!cloudSnapshot || cloudSnapshot.id !== localSnapshot.id) {
      throw new Error(`Snapshot da nuvem divergente. Local=${localSnapshot.id}; nuvem=${cloudSnapshot ? cloudSnapshot.id : 'ausente'}.`);
    }
    runRestic(resticPath, paths.active_cloud, ['check'], password, { environment, timeout: 60 * 60 * 1000 });
    const kit = publishRecoveryKit(config, paths);
    const platformCatalog = report.platform_capture ? investmentPlatforms.publishCatalog({ environment }) : null;

    report.status = 'success';
    report.completed_at = new Date().toISOString();
    report.sources = check.resolution.sources.map((source) => ({
      id: source.id,
      required: source.required,
      restore_policy: source.restore_policy,
      included_entries: source.entries.length
    }));
    report.warnings = check.resolution.warnings;
    if (report.platform_capture && report.platform_capture.status === 'partial') {
      report.warnings.push({ id: 'investment_platforms', reason: 'one_or_more_platforms_partial' });
    }
    report.snapshot = {
      id: localSnapshot.id,
      short_id: localSnapshot.short_id || localSnapshot.id.slice(0, 8),
      time: localSnapshot.time,
      hostname: localSnapshot.hostname,
      tags: localSnapshot.tags || tags
    };
    report.cloud_validation = {
      status: 'success',
      snapshot_id: cloudSnapshot.id,
      structural_check: 'passed',
      transport: replication.transport,
      transport_exit_code: replication.status
    };
    report.recovery_kit_files = kit.length;
    report.platform_catalog = platformCatalog;
    if (platformCatalog && !platformCatalog.ok) {
      report.warnings.push({ id: 'investment_platforms', reason: 'drive_catalog_publish_failed', detail: platformCatalog.error });
    }
    report.git = runtime.git.map((item) => ({
      source_id: item.source_id,
      is_repository: item.is_repository,
      head: item.head || null,
      branch: item.branch || null,
      dirty_entries: item.dirty_entries || 0,
      bundle_created: item.bundle_created
    }));
    report.sentinels = runtime.sentinels;
    report.error = null;
    report.report_files = saveReport(report, environment, paths);
    return report;
  } catch (error) {
    report.completed_at = new Date().toISOString();
    report.error = safeError(error);
    report.report_files = saveReport(report, environment, paths || null);
    return report;
  }
}

function adopt(options = {}) {
  const config = options.config || readConfig();
  const environment = options.environment || process.env;
  const paths = options.paths || resolveRepositoryPaths(config, environment);
  const resticPath = options.resticPath || findRestic(environment);
  const rclonePath = options.rclonePath || findRclone(environment);
  if (!resticPath) throw new Error('Restic nao instalado.');
  const password = options.password || loadPassword(environment);
  if (!resticRepositoryAvailable(resticPath, paths.active_cloud, password, environment)) {
    throw new Error('A copia do Google Drive ainda nao contem um repositorio Restic valido.');
  }

  if (repositoryInitialized(paths.local)) {
    const localLatest = latestSnapshot(resticPath, paths.local, password);
    const cloudLatest = latestSnapshot(resticPath, paths.active_cloud, password);
    if (localLatest && cloudLatest && localLatest.id !== cloudLatest.id) {
      throw new Error('O repositorio local existente diverge da nuvem. Nao sera mesclado automaticamente.');
    }
  }
  copyRepositoryAdditive(paths.active_cloud, paths.local, { rclonePath, environment });
  runRestic(resticPath, paths.local, ['check'], password, { timeout: 60 * 60 * 1000 });
  const snapshot = latestSnapshot(resticPath, paths.local, password);
  const claim = options.claimPrimary ? claimPrimary({ config, environment, paths, replacePrimary: options.replacePrimary }) : null;
  if (claim && !claim.ok) throw new Error(claim.error);
  return { ok: true, adopted: true, latest_snapshot: snapshot, primary: claim ? claim.primary : null };
}

function status(options = {}) {
  const config = options.config || readConfig();
  const environment = options.environment || process.env;
  const paths = options.paths || resolveRepositoryPaths(config, environment);
  const resticPath = options.resticPath || findRestic(environment);
  const latestReport = readJson(path.join(stateRoot(environment), 'reports', 'latest-continuity-report.json'));
  const result = {
    schema_version: SCHEMA_VERSION,
    checked_at: new Date().toISOString(),
    primary: readPrimary(paths),
    latest_report: latestReport,
    local_repository: repositoryInitialized(paths.local),
    cloud_repository: false,
    cloud_transport: paths.require_remote_api ? 'rclone_api' : 'drivefs_mount',
    latest_local_snapshot: null,
    latest_cloud_snapshot: null,
    rpo: { limit_minutes: config.rpo_minutes || 120, age_minutes: null, within_limit: false },
    ok: false
  };
  if (!resticPath) return result;
  const password = options.password || loadPassword(environment);
  result.cloud_repository = resticRepositoryAvailable(resticPath, paths.active_cloud, password, environment);
  if (!result.local_repository && !result.cloud_repository) return result;
  if (result.local_repository) result.latest_local_snapshot = latestSnapshot(resticPath, paths.local, password);
  if (result.cloud_repository) result.latest_cloud_snapshot = latestSnapshot(resticPath, paths.active_cloud, password);
  const reference = result.latest_cloud_snapshot || result.latest_local_snapshot;
  const referenceTime = snapshotCompletedAt(reference);
  if (referenceTime) {
    result.rpo.age_minutes = Math.max(0, Math.round((Date.now() - new Date(referenceTime).getTime()) / 60000));
    result.rpo.within_limit = result.rpo.age_minutes <= result.rpo.limit_minutes;
  }
  result.ok = Boolean(
    result.latest_local_snapshot
    && result.latest_cloud_snapshot
    && result.latest_local_snapshot.id === result.latest_cloud_snapshot.id
    && result.rpo.within_limit
  );
  return result;
}

function verify(options = {}) {
  const config = options.config || readConfig();
  const environment = options.environment || process.env;
  const paths = options.paths || resolveRepositoryPaths(config, environment);
  const resticPath = options.resticPath || findRestic(environment);
  if (!resticPath) throw new Error('Restic nao instalado.');
  const password = options.password || loadPassword(environment);
  const targets = options.target === 'local' ? ['local'] : options.target === 'cloud' ? ['cloud'] : ['local', 'cloud'];
  const checks = [];
  for (const target of targets) {
    const repository = target === 'cloud' ? paths.active_cloud : paths.local;
    if (!resticRepositoryAvailable(resticPath, repository, password, environment)) {
      checks.push({ target, ok: false, error: 'repository_missing' });
      continue;
    }
    const args = ['check'];
    if (options.full) args.push('--read-data');
    else if (options.sample) args.push('--read-data-subset=1/20');
    const checked = runRestic(resticPath, repository, args, password, {
      timeout: options.full ? 12 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
      throwOnError: false
    });
    checks.push({ target, ok: checked.ok, error: checked.ok ? null : safeError(checked.stderr || checked.error || checked.stdout) });
  }
  return { ok: checks.every((item) => item.ok), checked_at: new Date().toISOString(), checks };
}

function assertSafeRestoreTarget(target, restoreRoot = DEFAULT_RESTORE_ROOT) {
  const resolved = path.resolve(target);
  const allowed = path.resolve(restoreRoot);
  if (resolved === path.parse(resolved).root || resolved === allowed || !isInsidePath(resolved, allowed)) {
    throw new Error(`Destino de restore deve ser uma subpasta de ${allowed}.`);
  }
  if (fs.existsSync(resolved) && fs.readdirSync(resolved).length > 0) {
    throw new Error('Destino de restore ja existe e nao esta vazio.');
  }
  return resolved;
}

function walkFiles(root, limit = Infinity) {
  const files = [];
  const stack = [root];
  while (stack.length > 0 && files.length < limit) {
    const current = stack.pop();
    let entries;
    try { entries = fs.readdirSync(current, { withFileTypes: true }); } catch (_) { continue; }
    for (const entry of entries) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(absolute);
      else if (entry.isFile()) files.push(absolute);
      if (files.length >= limit) break;
    }
  }
  return files;
}

function validateRestoredSentinels(target) {
  const files = walkFiles(target);
  const sentinelFiles = files.filter((filePath) => path.basename(filePath) === 'continuity-sentinels.json');
  if (sentinelFiles.length === 0) return { ok: false, checked: 0, failures: ['sentinel_manifest_missing'] };
  const manifest = readJson(sentinelFiles[0], { sentinels: [] });
  const byName = new Map();
  for (const filePath of files) {
    const name = path.basename(filePath).toLowerCase();
    if (!byName.has(name)) byName.set(name, []);
    byName.get(name).push(filePath);
  }
  const failures = [];
  for (const sentinel of manifest.sentinels || []) {
    const candidates = byName.get(String(sentinel.file_name || '').toLowerCase()) || [];
    let matched = false;
    for (const candidate of candidates) {
      try {
        if (fs.statSync(candidate).size === sentinel.bytes && hashFile(candidate) === sentinel.sha256) {
          matched = true;
          break;
        }
      } catch (_) {}
    }
    if (!matched) failures.push(sentinel.source_id);
  }
  return { ok: failures.length === 0, checked: (manifest.sentinels || []).length, failures };
}

function isOnlyRestoreTimestampWarning(result) {
  if (!result || result.ok || !normalizeText(result.stderr)) return false;
  const lines = result.stderr.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return false;
  return lines.every((line) => (
    (/^ignoring error for /i.test(line) && /failed to restore timestamp/i.test(line) && /(access is denied|acesso negado)/i.test(line))
    || /^fatal: there (?:was|were) \d+ errors?$/i.test(line)
  ));
}

function restore(options = {}) {
  const config = options.config || readConfig();
  const environment = options.environment || process.env;
  const paths = options.paths || resolveRepositoryPaths(config, environment);
  const restoreRoot = options.restoreRoot || environment.AIOX_CONTINUITY_RESTORE_ROOT || DEFAULT_RESTORE_ROOT;
  const defaultTarget = path.join(restoreRoot, new Date().toISOString().replace(/[:.]/g, '-'));
  const target = assertSafeRestoreTarget(options.target || defaultTarget, restoreRoot);
  const repositoryName = options.repository === 'local' ? 'local' : 'cloud';
  const plan = {
    mode: options.apply ? 'apply' : 'dry_run',
    repository: repositoryName,
    snapshot: options.snapshot || 'latest',
    target,
    active_workspace_untouched: true
  };
  if (!options.apply) return plan;
  const resticPath = options.resticPath || findRestic(environment);
  if (!resticPath) throw new Error('Restic nao instalado.');
  const password = options.password || loadPassword(environment);
  const repository = repositoryName === 'cloud' ? paths.active_cloud : paths.local;
  if (!resticRepositoryAvailable(resticPath, repository, password, environment)) {
    throw new Error(`Repositorio ${repositoryName} ausente.`);
  }
  fs.mkdirSync(target, { recursive: true });
  const restored = runRestic(resticPath, repository, [
    'restore', plan.snapshot, '--target', target, '--verify'
  ], password, { timeout: 12 * 60 * 60 * 1000, throwOnError: false });
  if (!restored.ok && !isOnlyRestoreTimestampWarning(restored)) {
    throw new Error(`Restic falhou em restore: ${restored.stderr || restored.error || restored.stdout || `codigo ${restored.status}`}`);
  }
  plan.validation = validateRestoredSentinels(target);
  plan.ok = plan.validation.ok;
  plan.metadata_warnings = restored.ok ? [] : ['directory_timestamp_not_restored'];
  return plan;
}

function parseCli(argv) {
  const args = Array.from(argv || []);
  const options = { command: 'preflight' };
  if (args[0] && !args[0].startsWith('--')) options.command = args.shift();
  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    const next = args[index + 1];
    if (token === '--handoff-source') options.handoffSource = true;
    else if (token === '--claim-primary') options.claimPrimary = true;
    else if (token === '--replace-primary') options.replacePrimary = true;
    else if (token === '--apply') options.apply = true;
    else if (token === '--full') options.full = true;
    else if (token === '--sample') options.sample = true;
    else if (['--trigger', '--target', '--snapshot', '--repository'].includes(token) && next) {
      options[token.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = next;
      index += 1;
    }
  }
  return options;
}

function printablePreflight(result) {
  return {
    ok: result.ok,
    schema_version: result.schema_version,
    checked_at: result.checked_at,
    errors: result.errors,
    missing_required: result.missing_required,
    warnings: result.warnings,
    source_ids: result.source_ids,
    source_path_count: result.source_path_count,
    restic: result.restic,
    rclone: result.rclone,
    repositories: result.repositories,
    missing_critical_exclusions: result.missing_critical_exclusions
  };
}

async function main() {
  const options = parseCli(process.argv.slice(2));
  let result;
  if (options.command === 'preflight' || options.command === 'inventory') {
    result = printablePreflight(preflight(options));
  } else if (options.command === 'init') {
    result = initialize(options);
  } else if (options.command === 'backup') {
    result = backup(options);
  } else if (options.command === 'status') {
    result = status(options);
  } else if (options.command === 'verify') {
    result = verify(options);
  } else if (options.command === 'restore') {
    result = restore(options);
  } else if (options.command === 'adopt') {
    result = adopt(options);
  } else if (options.command === 'claim-primary') {
    result = claimPrimary(options);
  } else {
    throw new Error(`Comando desconhecido: ${options.command}. Use preflight, init, backup, status, verify, restore, adopt ou claim-primary.`);
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = result.ok === false || result.status === 'error' ? 1 : 0;
}

if (require.main === module) {
  main().catch((error) => {
    process.stderr.write(`${safeError(error)}\n`);
    process.exitCode = 1;
  });
}

module.exports = {
  CONFIG_PATH,
  DEFAULT_RESTORE_ROOT,
  EXCLUDES_PATH,
  ROOT_DIR,
  SCHEMA_VERSION,
  SNAPSHOT_TAG,
  adopt,
  assertSafeRestoreTarget,
  assertWriter,
  backup,
  claimPrimary,
  copyRepositoryAdditive,
  createSentinels,
  expandTemplate,
  findRestic,
  findRclone,
  hashFile,
  initialize,
  isInsidePath,
  isOnlyRestoreTimestampWarning,
  isRobocopySuccess,
  latestSnapshot,
  machineIdentity,
  parseCli,
  pathIsOperationalPlatform,
  preflight,
  readConfig,
  repositoryInitialized,
  resticRepositoryAvailable,
  resolveRepositoryPaths,
  resolveSources,
  restore,
  retentionArgs,
  rcloneRemoteAvailable,
  rcloneRepositoryTarget,
  selectNewestSnapshot,
  snapshotCompletedAt,
  shouldExcludeCriticalPath,
  status,
  validateRestoredSentinels,
  verify,
  writeJsonAtomic
};
