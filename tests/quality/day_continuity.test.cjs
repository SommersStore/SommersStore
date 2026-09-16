'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const documents = require('../../scripts/documents_continuity.cjs');
const finalizeDay = require('../../scripts/finalize_day.cjs');
const safeGit = require('../../scripts/lib/safe_git_checkpoint.cjs');
const startupSync = require('../../scripts/startup_sync.cjs');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function testGitClassification() {
  assert.equal(safeGit.classifyChange({ status: ' M', path: 'scripts/example.js' }).eligible, true);
  assert.equal(safeGit.classifyChange({ status: '??', path: 'docs/example.md' }).eligible, true);
  assert.equal(safeGit.classifyChange({ status: '??', path: 'query' }).category, 'runtime');
  assert.equal(safeGit.classifyChange({ status: ' M', path: 'projects/financas/data/fin2_data.json' }).category, 'private');
  assert.equal(safeGit.classifyChange({ status: '??', path: '.env' }).category, 'credential');
  assert.equal(safeGit.classifyChange({ status: ' D', path: 'scripts/old.js' }).category, 'review');
  assert.equal(safeGit.classifyChange({ status: 'UU', path: 'docs/conflict.md' }).category, 'conflict');
  const syntheticToken = ['ghp_', 'abcdefghijklmnopqrstuvwxyz123456'].join('');
  assert.deepEqual(safeGit.scanTextForSecrets(`const value = "${syntheticToken}";`), ['github_token']);
  assert.deepEqual(safeGit.scanTextForSecrets('auth.json nao deve ser transferido'), []);
}

function git(root, args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  return String(result.stdout || '').trim();
}

function testExplicitGitStage() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aiox-safe-git-'));
  try {
    git(root, ['init']);
    git(root, ['config', 'user.name', 'AIOX Test']);
    git(root, ['config', 'user.email', 'aiox-test@example.invalid']);
    write(path.join(root, 'README.md'), 'base');
    git(root, ['add', '--', 'README.md']);
    git(root, ['commit', '-m', 'test base']);
    write(path.join(root, 'scripts', 'safe.js'), 'module.exports = true;');
    write(path.join(root, '.env'), 'PASSWORD=not-for-git');
    write(path.join(root, 'projects', 'financas', 'data', 'fin2_data.json'), '{}');
    const classification = safeGit.classifyWorkspace({ root });
    assert.deepEqual(classification.eligible_paths, ['scripts/safe.js']);
    assert.deepEqual(classification.blocked.map((entry) => entry.category).sort(), ['credential', 'private']);
    const staged = safeGit.stageExplicit(classification.eligible_paths, { root });
    assert.deepEqual(staged, ['scripts/safe.js']);
    assert.equal(git(root, ['diff', '--cached', '--name-only']), 'scripts/safe.js');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function testStartupGitSafety() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aiox-startup-git-'));
  try {
    const remote = path.join(root, 'remote.git');
    const workspace = path.join(root, 'workspace');
    const upstream = path.join(root, 'upstream');
    fs.mkdirSync(remote, { recursive: true });
    fs.mkdirSync(workspace, { recursive: true });
    git(remote, ['init', '--bare']);
    git(workspace, ['init']);
    git(workspace, ['config', 'user.name', 'AIOX Test']);
    git(workspace, ['config', 'user.email', 'aiox-test@example.invalid']);
    write(path.join(workspace, 'README.md'), 'base');
    git(workspace, ['add', '--', 'README.md']);
    git(workspace, ['commit', '-m', 'base']);
    const branch = git(workspace, ['branch', '--show-current']);
    git(workspace, ['remote', 'add', 'origin', remote]);
    git(workspace, ['push', '-u', 'origin', branch]);

    assert.equal(startupSync.gitStartupSync({ root: workspace, dryRun: true }).status, 'up_to_date');
    write(path.join(workspace, 'README.md'), 'dirty');
    assert.equal(startupSync.gitStartupSync({ root: workspace, dryRun: true }).status, 'blocked_dirty');
    write(path.join(workspace, 'README.md'), 'base');

    git(root, ['clone', remote, upstream]);
    git(upstream, ['config', 'user.name', 'AIOX Test']);
    git(upstream, ['config', 'user.email', 'aiox-test@example.invalid']);
    write(path.join(upstream, 'remote.txt'), 'remote');
    git(upstream, ['add', '--', 'remote.txt']);
    git(upstream, ['commit', '-m', 'remote']);
    git(upstream, ['push', 'origin', branch]);
    assert.equal(startupSync.gitStartupSync({ root: workspace, dryRun: true }).status, 'planned_fast_forward');
    assert.equal(startupSync.gitStartupSync({ root: workspace, dryRun: false }).status, 'fast_forwarded');

    write(path.join(workspace, 'local.txt'), 'local');
    git(workspace, ['add', '--', 'local.txt']);
    git(workspace, ['commit', '-m', 'local']);
    write(path.join(upstream, 'remote-2.txt'), 'remote-2');
    git(upstream, ['add', '--', 'remote-2.txt']);
    git(upstream, ['commit', '-m', 'remote-2']);
    git(upstream, ['push', 'origin', branch]);
    assert.equal(startupSync.gitStartupSync({ root: workspace, dryRun: true }).status, 'blocked_diverged');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function testDocumentsSelectiveCapture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aiox-documents-'));
  try {
    const source = path.join(root, 'Documents');
    const snapshot = path.join(root, 'snapshot');
    write(path.join(source, 'Pessoal', 'contrato.pdf'), 'documento');
    write(path.join(source, 'NinjaTrader 8', 'db', 'runtime.db'), 'runtime');
    write(path.join(source, 'cTrader', 'settings.json'), '{}');
    write(path.join(source, 'JForex4', 'workspace.xml'), '<xml/>');
    const captured = documents.captureDocuments({ sourceRoot: source, snapshotRoot: snapshot, environment: {} });
    assert.equal(captured.ok, true, captured.error);
    assert.equal(captured.manifest.files, 1);
    assert.ok(fs.existsSync(path.join(captured.root, 'Pessoal', 'contrato.pdf')));
    assert.ok(!fs.existsSync(path.join(captured.root, 'NinjaTrader 8')));
    assert.ok(!fs.existsSync(path.join(captured.root, 'cTrader')));
    assert.ok(!fs.existsSync(path.join(captured.root, 'JForex4')));
    assert.equal(documents.isPlatformOperationalPath('Arquivo/MetaTrader 5/config.ini'), true);
    assert.equal(documents.isPlatformOperationalPath('Arquivo/cTrader Automate/config.ini'), true);
    assert.equal(documents.isPlatformOperationalPath('Arquivo/NinjaTrader 8 Backup/runtime.db'), true);
    assert.equal(documents.isPlatformOperationalPath('Pessoal/documento.pdf'), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function testPrivateReconciliation() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aiox-reconcile-'));
  try {
    const workspace = path.join(root, 'workspace');
    const staging = path.join(root, 'staging', 'C', 'AIOX', 'Workspace', 'SommersStore');
    const quarantine = path.join(root, 'quarantine');
    const files = [
      { path: 'projects/financas/data/fin2_data.json', format: 'json' },
      { path: 'projects/financas/data/finance_state.json', format: 'json' },
      { path: 'projects/imposto-de-renda/data/ir_state.json', format: 'json' }
    ];
    write(path.join(staging, files[0].path), '{"same":true}');
    write(path.join(workspace, files[0].path), '{"same":true}');
    write(path.join(staging, files[1].path), '{"missing":true}');
    write(path.join(staging, files[2].path), '{"version":"snapshot"}');
    write(path.join(workspace, files[2].path), '{"version":"current"}');
    const results = startupSync.reconcilePrivateFiles({ files, workspaceRoot: workspace, stagingRoot: path.join(root, 'staging'), quarantineRoot: quarantine, dryRun: false });
    assert.equal(results[0].status, 'identical');
    assert.equal(results[1].status, 'copied_missing');
    assert.equal(results[2].status, 'quarantined');
    assert.ok(fs.existsSync(results[2].current_copy));
    assert.ok(fs.existsSync(results[2].snapshot_copy));
    assert.equal(JSON.parse(fs.readFileSync(path.join(workspace, files[2].path), 'utf8')).version, 'current');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function testFinalizeGuardrails() {
  const parsed = finalizeDay.parseArgs(['--no-shutdown', '--test-mode']);
  assert.equal(parsed.noShutdown, true);
  assert.equal(parsed.testMode, true);
  const firebase = finalizeDay.deployFirebaseIfNeeded(['scripts/example.js'], parsed);
  assert.equal(firebase.status, 'skipped');
  const source = fs.readFileSync(path.join(__dirname, '..', '..', 'scripts', 'finalize_day.cjs'), 'utf8');
  assert.doesNotMatch(source, /git\s+add\s+(?:-A|\.)/i);
  assert.doesNotMatch(source, /push[^\n]*--force/i);
  assert.match(source, /--no-shutdown/);
  assert.match(source, /shutdown\.exe/);
  assert.match(source, /skip_auto_cloud:\s*true/);
  assert.match(source, /['conflict', 'secret', 'unknown', 'review']/);
  const startupSource = fs.readFileSync(path.join(__dirname, '..', '..', 'scripts', 'startup_sync.cjs'), 'utf8');
  assert.ok(startupSource.indexOf('restorePrivateFiles(stagingRoot') < startupSource.indexOf('gitStartupSync({ root: ROOT_DIR'), 'private restore must precede Git synchronization');
}

function runDayContinuityTests() {
  testGitClassification();
  testExplicitGitStage();
  testStartupGitSafety();
  testDocumentsSelectiveCapture();
  testPrivateReconciliation();
  testFinalizeGuardrails();
}

module.exports = { runDayContinuityTests };
