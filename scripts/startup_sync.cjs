#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const continuity = require('./aiox_continuity.js');
const safeGit = require('./lib/safe_git_checkpoint.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT_DIR, 'config', 'aiox_private_reconciliation.json');
const DEFAULT_REPORT_ROOT = process.env.AIOX_STARTUP_SYNC_REPORT_DIR
  || path.join(process.env.LOCALAPPDATA || os.tmpdir(), 'AIOX', 'Continuity', 'startup-sync');
const DEFAULT_STAGING_ROOT = process.env.AIOX_STARTUP_STAGING_ROOT || 'C:\\AIOX\\RestoreTest';
const DEFAULT_QUARANTINE_ROOT = process.env.AIOX_STARTUP_QUARANTINE_ROOT || 'C:\\AIOX\\Transfer\\ContinuityQuarantine';

function stamp(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, '-');
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function hashFile(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function writeJsonAtomic(filePath, value) {
  ensureDir(path.dirname(filePath));
  const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tempPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(tempPath, filePath);
}

function copyFileAtomic(source, target) {
  ensureDir(path.dirname(target));
  const tempPath = `${target}.tmp-${process.pid}-${Date.now()}`;
  fs.copyFileSync(source, tempPath);
  fs.renameSync(tempPath, target);
}

function readConfig(configPath = CONFIG_PATH) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (!Array.isArray(config.files) || config.files.length === 0) throw new Error('Configuracao de reconciliacao privada vazia.');
  return config;
}

function parseArgs(argv) {
  const options = { dryRun: false, repository: 'cloud' };
  const args = Array.from(argv || []);
  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    const next = args[index + 1];
    if (token === '--dry-run') options.dryRun = true;
    else if (token === '--repository' && next) {
      options.repository = next;
      index += 1;
    }
  }
  if (!['local', 'cloud'].includes(options.repository)) throw new Error('Repositorio deve ser local ou cloud.');
  return options;
}

function runPowerShellSecret() {
  if (process.env.AIOX_CONTINUITY_TEST_PASSWORD) return process.env.AIOX_CONTINUITY_TEST_PASSWORD;
  const shell = process.env.SystemRoot
    ? path.join(process.env.SystemRoot, 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe')
    : 'powershell.exe';
  const result = spawnSync(shell, [
    '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass',
    '-File', path.join(ROOT_DIR, 'scripts', 'aiox_continuity_secret.ps1'), 'get'
  ], { cwd: ROOT_DIR, encoding: 'utf8', windowsHide: true, maxBuffer: 1024 * 1024 });
  if (result.status !== 0) throw new Error(String(result.stderr || 'Senha Restic DPAPI indisponivel.').trim());
  return String(result.stdout || '');
}

function restorePrivateFiles(stagingRoot, fileDefinitions, repositoryName = 'cloud') {
  const resticPath = continuity.findRestic(process.env);
  if (!resticPath) throw new Error('Restic nao instalado.');
  const paths = continuity.resolveRepositoryPaths(continuity.readConfig(), process.env);
  const repository = repositoryName === 'local' ? paths.local : paths.active_cloud;
  const password = runPowerShellSecret();
  const args = ['-r', repository, 'restore', 'latest', '--target', stagingRoot, '--verify'];
  for (const definition of fileDefinitions) {
    args.push('--include', `**/${String(definition.path).replace(/\\/g, '/')}`);
  }
  const result = spawnSync(resticPath, args, {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    windowsHide: true,
    maxBuffer: 64 * 1024 * 1024,
    timeout: 2 * 60 * 60 * 1000,
    env: { ...process.env, RESTIC_PASSWORD: password }
  });
  if (result.status !== 0) throw new Error(`Restore seletivo Restic falhou: ${String(result.stderr || result.stdout || result.error?.message || '').trim()}`);
  return { status: 'success', repository: repositoryName, target: stagingRoot, selected_files: fileDefinitions.map((item) => item.path) };
}

function walkFiles(root) {
  const files = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    let entries = [];
    try { entries = fs.readdirSync(current, { withFileTypes: true }); } catch (_) { continue; }
    for (const entry of entries) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(absolute);
      else if (entry.isFile()) files.push(absolute);
    }
  }
  return files;
}

function findRestoredFile(stagingRoot, relativePath) {
  const suffix = String(relativePath).replace(/\\/g, '/').toLowerCase();
  const matches = walkFiles(stagingRoot).filter((filePath) => filePath.replace(/\\/g, '/').toLowerCase().endsWith(suffix));
  if (matches.length !== 1) return { path: null, matches };
  return { path: matches[0], matches };
}

function validateFile(filePath, format) {
  if (format !== 'json') return { ok: true };
  try {
    JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

function quarantinePair(currentPath, incomingPath, quarantineRoot, relativePath) {
  const base = path.join(quarantineRoot, relativePath);
  const extension = path.extname(base);
  const stem = extension ? base.slice(0, -extension.length) : base;
  const currentCopy = `${stem}--current${extension}`;
  const incomingCopy = `${stem}--snapshot${extension}`;
  copyFileAtomic(currentPath, currentCopy);
  copyFileAtomic(incomingPath, incomingCopy);
  return { current_copy: currentCopy, snapshot_copy: incomingCopy };
}

function reconcilePrivateFiles(options) {
  const results = [];
  for (const definition of options.files) {
    const relativePath = String(definition.path).replace(/\\/g, '/');
    const currentPath = path.join(options.workspaceRoot, relativePath);
    const restored = findRestoredFile(options.stagingRoot, relativePath);
    if (!restored.path) {
      results.push({ path: relativePath, status: 'quarantined', reason: restored.matches.length === 0 ? 'snapshot_file_missing' : 'ambiguous_snapshot_matches', matches: restored.matches });
      continue;
    }
    const validation = validateFile(restored.path, definition.format);
    if (!validation.ok) {
      results.push({ path: relativePath, status: 'quarantined', reason: 'invalid_snapshot_file', error: validation.error });
      continue;
    }
    const incomingHash = hashFile(restored.path);
    if (!fs.existsSync(currentPath)) {
      if (!options.dryRun) copyFileAtomic(restored.path, currentPath);
      results.push({ path: relativePath, status: options.dryRun ? 'planned_copy_missing' : 'copied_missing', snapshot_sha256: incomingHash });
      continue;
    }
    const currentHash = hashFile(currentPath);
    if (currentHash === incomingHash) {
      results.push({ path: relativePath, status: 'identical', current_sha256: currentHash, snapshot_sha256: incomingHash });
      continue;
    }
    const copies = quarantinePair(currentPath, restored.path, options.quarantineRoot, relativePath);
    results.push({ path: relativePath, status: 'quarantined', reason: 'hash_conflict', current_sha256: currentHash, snapshot_sha256: incomingHash, ...copies });
  }
  return results;
}

function gitStartupSync(options = {}) {
  const root = options.root || ROOT_DIR;
  const branch = safeGit.currentBranch({ root });
  const statusBefore = safeGit.listChanges({ root });
  safeGit.fetchRemote('origin', branch, { root });
  const localHead = safeGit.currentHead({ root });
  const remoteHead = safeGit.readRemoteHead('origin', branch, { root });
  if (statusBefore.length > 0) return { status: 'blocked_dirty', branch, local_head: localHead, remote_head: remoteHead, dirty_entries: statusBefore };
  if (localHead === remoteHead) return { status: 'up_to_date', branch, local_head: localHead, remote_head: remoteHead };
  const localIsAncestor = safeGit.runGit(['merge-base', '--is-ancestor', localHead, remoteHead], { root });
  if (!localIsAncestor.ok) return { status: 'blocked_diverged', branch, local_head: localHead, remote_head: remoteHead };
  if (options.dryRun) return { status: 'planned_fast_forward', branch, local_head: localHead, remote_head: remoteHead };
  const merge = safeGit.runGit(['merge', '--ff-only', `origin/${branch}`], { root });
  if (!merge.ok) throw new Error(`Fast-forward falhou: ${merge.stderr || merge.stdout}`);
  return { status: 'fast_forwarded', branch, local_head_before: localHead, local_head: safeGit.currentHead({ root }), remote_head: remoteHead };
}

function execute(options = {}) {
  const runStamp = stamp();
  const reportRoot = path.join(options.reportRoot || DEFAULT_REPORT_ROOT, runStamp);
  const stagingRoot = path.join(options.stagingBase || DEFAULT_STAGING_ROOT, `startup-sync-${runStamp}`);
  const quarantineRoot = path.join(options.quarantineBase || DEFAULT_QUARANTINE_ROOT, runStamp);
  ensureDir(reportRoot);
  ensureDir(stagingRoot);
  ensureDir(quarantineRoot);
  const report = {
    schema_version: 'aiox.startup-sync.v1',
    started_at: new Date().toISOString(),
    machine: process.env.COMPUTERNAME || os.hostname(),
    dry_run: Boolean(options.dryRun),
    status: 'running',
    primary: null,
    role: null,
    git: null,
    restore: null,
    reconciliation: [],
    quarantine_root: quarantineRoot,
    error: null
  };
  try {
    const state = continuity.status();
    if (!state.primary?.computer_name) throw new Error('Escritor primario nao registrado.');
    report.primary = state.primary.computer_name;
    report.role = String(report.primary).toUpperCase() === String(report.machine).toUpperCase() ? 'primary' : 'secondary';
    const config = readConfig(options.configPath || CONFIG_PATH);
    report.restore = restorePrivateFiles(stagingRoot, config.files, options.repository || 'cloud');
    report.git = gitStartupSync({ root: ROOT_DIR, dryRun: options.dryRun });
    report.reconciliation = reconcilePrivateFiles({
      files: config.files,
      workspaceRoot: ROOT_DIR,
      stagingRoot,
      quarantineRoot,
      dryRun: options.dryRun
    });
    report.status = report.reconciliation.some((item) => item.status === 'quarantined') ? 'success_with_quarantine' : 'success';
  } catch (error) {
    report.status = 'error';
    report.error = error.message;
  }
  report.completed_at = new Date().toISOString();
  report.report_file = path.join(reportRoot, 'startup-sync-report.json');
  writeJsonAtomic(report.report_file, report);
  writeJsonAtomic(path.join(quarantineRoot, 'quarantine-report.json'), report);
  return report;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const report = execute(options);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exitCode = report.status === 'error' ? 1 : 0;
}

if (require.main === module) main();

module.exports = {
  CONFIG_PATH,
  DEFAULT_QUARANTINE_ROOT,
  DEFAULT_REPORT_ROOT,
  DEFAULT_STAGING_ROOT,
  execute,
  findRestoredFile,
  gitStartupSync,
  hashFile,
  parseArgs,
  quarantinePair,
  readConfig,
  reconcilePrivateFiles,
  restorePrivateFiles,
  validateFile
};
