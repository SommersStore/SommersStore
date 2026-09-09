#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT_DIR, 'config', 'investment_platforms.json');
const SCHEMA_VERSION = 'aiox.investment-platforms.v1';
const ACK_PHRASE = 'STOPPED_DOCUMENTS_SYNC';

function normalize(value) {
  return String(value || '').trim();
}

function portable(value) {
  return String(value || '').replace(/\\/g, '/');
}

function writeJsonAtomic(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
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
  if (!config || config.schema_version !== SCHEMA_VERSION || !Array.isArray(config.platforms)) {
    throw new Error(`Configuracao de plataformas invalida: ${configPath}`);
  }
  return config;
}

function expandTemplate(value, environment = process.env) {
  let unresolved = false;
  const expanded = String(value || '').replace(/\$\{([A-Z0-9_]+)\}/gi, (_, key) => {
    const replacement = normalize(environment[key]);
    if (!replacement) unresolved = true;
    return replacement;
  });
  return unresolved || !normalize(expanded) ? null : path.resolve(expanded);
}

function stateRoot(environment = process.env, config = readConfig()) {
  const candidates = (config.snapshot_root_candidates || [])
    .map((candidate) => expandTemplate(candidate, environment))
    .filter(Boolean);
  return candidates[0] || path.join(normalize(environment.LOCALAPPDATA) || os.tmpdir(), 'AIOX', 'Continuity', 'platforms');
}

function isInside(candidate, parent) {
  const relative = path.relative(path.resolve(parent), path.resolve(candidate));
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function globRegex(pattern) {
  const marker = '__DOUBLE_STAR__';
  const escaped = portable(pattern)
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, marker)
    .replace(/\*/g, '[^/]*')
    .replace(new RegExp(marker, 'g'), '.*')
    .replace(/\?/g, '[^/]');
  return new RegExp(`^${escaped}$`, 'i');
}

function matchesAny(relativePath, patterns) {
  const candidate = portable(relativePath);
  return (patterns || []).some((pattern) => globRegex(pattern).test(candidate));
}

function shouldExclude(relativePath, config, source) {
  const parts = portable(relativePath).split('/').filter(Boolean);
  const directoryNames = new Set([
    ...(config.common_exclude_directories || []),
    ...(source.exclude_directories || [])
  ].map((name) => String(name).toLowerCase()));
  if (parts.slice(0, -1).some((part) => directoryNames.has(part.toLowerCase()))) return true;
  const excludedFiles = [...(config.common_exclude_files || []), ...(source.exclude_files || [])];
  return matchesAny(parts.at(-1) || '', excludedFiles);
}

function listSelectedFiles(root, config, source) {
  const selected = [];
  const errors = [];
  const queue = [root];
  while (queue.length > 0) {
    const current = queue.shift();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch (error) {
      errors.push({ path: current, error: error.code || error.message });
      continue;
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue;
      const absolute = path.join(current, entry.name);
      const relative = portable(path.relative(root, absolute));
      if (!relative || shouldExclude(relative, config, source)) continue;
      if (entry.isDirectory()) {
        if (shouldExclude(`${relative}/__directory_probe__`, config, source)) continue;
        queue.push(absolute);
      } else if (entry.isFile() && matchesAny(relative, source.includes || ['**'])) {
        selected.push({ absolute, relative });
      }
    }
  }
  return { selected, errors };
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

function runningProcessNames(environment = process.env) {
  if (process.platform !== 'win32') return [];
  const executable = path.join(environment.SystemRoot || environment.SYSTEMROOT || 'C:\\Windows', 'System32', 'tasklist.exe');
  const result = spawnSync(executable, ['/FO', 'CSV', '/NH'], { encoding: 'utf8', windowsHide: true });
  if (result.status !== 0 || result.error) return [];
  return String(result.stdout || '').split(/\r?\n/).map((line) => {
    const match = line.match(/^"([^"]+)"/);
    return match ? match[1].toLowerCase() : null;
  }).filter(Boolean);
}

function resolvePlatformInventory(options = {}) {
  const config = options.config || readConfig(options.configPath);
  const environment = options.environment || process.env;
  const running = new Set((options.runningProcesses || runningProcessNames(environment)).map((name) => String(name).toLowerCase()));
  const platforms = config.platforms.map((definition) => {
    const activeProcesses = (definition.process_names || []).filter((name) => running.has(String(name).toLowerCase()));
    const sources = [];
    for (const source of definition.sources || []) {
      const roots = (source.candidates || []).map((candidate) => expandTemplate(candidate, environment)).filter(Boolean);
      const existing = [...new Set(roots.filter((root) => fs.existsSync(root)).map((root) => path.resolve(root)))];
      for (const [index, root] of existing.entries()) {
        const listed = listSelectedFiles(root, config, source);
        const bytes = listed.selected.reduce((total, item) => {
          try { return total + fs.statSync(item.absolute).size; } catch (_) { return total; }
        }, 0);
        sources.push({
          id: source.id,
          alias: `${source.id}-${index + 1}`,
          root,
          selected_files: listed.selected.length,
          selected_bytes: bytes,
          scan_errors: listed.errors,
          files: listed.selected
        });
      }
    }
    return {
      id: definition.id,
      name: definition.name,
      installed: sources.length > 0,
      active: activeProcesses.length > 0,
      active_processes: activeProcesses,
      sources
    };
  });
  return { config, environment, platforms };
}

function safeReplaceCurrent(root, temporary, current) {
  const resolvedRoot = path.resolve(root);
  if (!isInside(temporary, resolvedRoot) || !isInside(current, resolvedRoot) || temporary === current) {
    throw new Error('Troca de staging fora da raiz controlada.');
  }
  const previous = path.join(resolvedRoot, 'previous');
  if (fs.existsSync(previous)) fs.rmSync(previous, { recursive: true, force: true });
  if (fs.existsSync(current)) fs.renameSync(current, previous);
  try {
    fs.renameSync(temporary, current);
  } catch (error) {
    if (fs.existsSync(previous) && !fs.existsSync(current)) fs.renameSync(previous, current);
    throw error;
  }
  return previous;
}

function capturePlatforms(options = {}) {
  const inventory = resolvePlatformInventory(options);
  const root = path.resolve(options.snapshotRoot || stateRoot(inventory.environment, inventory.config));
  const current = path.join(root, 'current');
  const temporary = path.join(root, `next-${process.pid}-${Date.now()}`);
  fs.mkdirSync(temporary, { recursive: true });
  const startedAt = new Date().toISOString();
  const manifest = {
    schema_version: SCHEMA_VERSION,
    generated_at: startedAt,
    computer_name: normalize(inventory.environment.COMPUTERNAME) || os.hostname(),
    status: 'success',
    platforms: []
  };
  try {
    for (const platform of inventory.platforms) {
      const item = {
        id: platform.id,
        name: platform.name,
        installed: platform.installed,
        active: platform.active,
        active_processes: platform.active_processes,
        status: !platform.installed ? 'not_found' : (platform.active ? 'partial_platform_open' : 'success'),
        files: 0,
        bytes: 0,
        errors: [],
        sources: []
      };
      for (const source of platform.sources) {
        const sourceReport = { id: source.id, alias: source.alias, root: source.root, files: 0, bytes: 0, errors: [...source.scan_errors] };
        for (const file of source.files) {
          const destination = path.join(temporary, platform.id, source.alias, ...portable(file.relative).split('/'));
          if (!isInside(destination, temporary)) throw new Error(`Destino invalido: ${file.relative}`);
          try {
            fs.mkdirSync(path.dirname(destination), { recursive: true });
            fs.copyFileSync(file.absolute, destination);
            const stat = fs.statSync(destination);
            fs.utimesSync(destination, stat.atime, fs.statSync(file.absolute).mtime);
            sourceReport.files += 1;
            sourceReport.bytes += stat.size;
          } catch (error) {
            sourceReport.errors.push({ path: file.relative, error: error.code || error.message });
          }
        }
        item.files += sourceReport.files;
        item.bytes += sourceReport.bytes;
        item.errors.push(...sourceReport.errors);
        item.sources.push(sourceReport);
      }
      if (item.errors.length > 0) item.status = 'partial_errors';
      if (item.status.startsWith('partial')) manifest.status = 'partial';
      manifest.platforms.push(item);
    }
    writeJsonAtomic(path.join(temporary, 'platform-catalog.json'), manifest);
    safeReplaceCurrent(root, temporary, current);
    writeJsonAtomic(path.join(root, 'latest-platform-catalog.json'), manifest);
    return { ok: true, status: manifest.status, root: current, manifest };
  } catch (error) {
    if (fs.existsSync(temporary)) fs.rmSync(temporary, { recursive: true, force: true });
    return { ok: false, status: 'error', root: current, error: error.message, manifest };
  }
}

function acknowledgementPath(environment = process.env, config = readConfig()) {
  return path.join(stateRoot(environment, config), 'drive-direct-sync-ack.json');
}

function acknowledgeDriveSafe(confirm, options = {}) {
  if (confirm !== ACK_PHRASE) return { ok: false, error: `Confirmacao invalida. Use ${ACK_PHRASE} somente depois de desativar o backup de Documents.` };
  const config = options.config || readConfig(options.configPath);
  const environment = options.environment || process.env;
  const value = {
    schema_version: SCHEMA_VERSION,
    confirmed_at: new Date().toISOString(),
    computer_name: normalize(environment.COMPUTERNAME) || os.hostname(),
    documents_direct_sync_stopped: true
  };
  const filePath = acknowledgementPath(environment, config);
  writeJsonAtomic(filePath, value);
  return { ok: true, file: filePath, acknowledgement: value };
}

function driveSafetyStatus(options = {}) {
  const config = options.config || readConfig(options.configPath);
  const environment = options.environment || process.env;
  const filePath = acknowledgementPath(environment, config);
  const acknowledgement = readJson(filePath);
  const legacyCandidates = [
    'G:\\Outros computadores\\Meu computador\\Documents\\NinjaTrader 8',
    'G:\\Other computers\\My Computer\\Documents\\NinjaTrader 8'
  ];
  return {
    ok: Boolean(acknowledgement && acknowledgement.documents_direct_sync_stopped),
    acknowledgement: acknowledgement || null,
    acknowledgement_file: filePath,
    historical_direct_sync_evidence: legacyCandidates.filter((candidate) => fs.existsSync(candidate))
  };
}

function publishCatalog(options = {}) {
  const config = options.config || readConfig(options.configPath);
  const environment = options.environment || process.env;
  const root = stateRoot(environment, config);
  const source = path.join(root, 'latest-platform-catalog.json');
  if (!fs.existsSync(source)) return { ok: false, error: 'Catalogo local de plataformas ausente.' };
  const destinationRoot = (config.catalog_candidates || [])
    .map((candidate) => expandTemplate(candidate, environment))
    .filter(Boolean)
    .find((candidate) => fs.existsSync(candidate));
  if (!destinationRoot) return { ok: false, error: 'Pasta de catalogos no Google Drive nao encontrada.' };
  const machine = (normalize(environment.COMPUTERNAME) || os.hostname()).replace(/[^a-z0-9._-]+/gi, '-');
  const catalog = readJson(source);
  const datedName = `catalogo-plataformas-${machine}-${String(catalog.generated_at || new Date().toISOString()).replace(/[:.]/g, '-')}.json`;
  const dated = path.join(destinationRoot, datedName);
  const latest = path.join(destinationRoot, `catalogo-plataformas-${machine}-mais-recente.json`);
  writeJsonAtomic(dated, catalog);
  writeJsonAtomic(latest, catalog);
  return { ok: true, files: [dated, latest] };
}

function printableInventory(options = {}) {
  const result = resolvePlatformInventory(options);
  return {
    ok: true,
    schema_version: SCHEMA_VERSION,
    checked_at: new Date().toISOString(),
    platforms: result.platforms.map((platform) => ({
      id: platform.id,
      name: platform.name,
      installed: platform.installed,
      active: platform.active,
      active_processes: platform.active_processes,
      sources: platform.sources.map((source) => ({
        id: source.id,
        root: source.root,
        selected_files: source.selected_files,
        selected_bytes: source.selected_bytes,
        scan_errors: source.scan_errors
      }))
    }))
  };
}

function main(argv = process.argv.slice(2)) {
  const command = argv[0] || 'status';
  let result;
  if (command === 'inventory') result = printableInventory();
  else if (command === 'capture') result = capturePlatforms();
  else if (command === 'acknowledge-drive-safe') result = acknowledgeDriveSafe(argv[1]);
  else if (command === 'status') {
    const config = readConfig();
    const root = stateRoot(process.env, config);
    result = { ...driveSafetyStatus({ config }), latest_catalog: readJson(path.join(root, 'latest-platform-catalog.json')) };
  } else throw new Error('Comando desconhecido. Use inventory, capture, status ou acknowledge-drive-safe.');
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = result.ok ? 0 : 1;
}

if (require.main === module) {
  try { main(); } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}

module.exports = {
  ACK_PHRASE,
  CONFIG_PATH,
  SCHEMA_VERSION,
  acknowledgeDriveSafe,
  capturePlatforms,
  driveSafetyStatus,
  expandTemplate,
  globRegex,
  listSelectedFiles,
  matchesAny,
  printableInventory,
  publishCatalog,
  readConfig,
  resolvePlatformInventory,
  shouldExclude,
  stateRoot
};
