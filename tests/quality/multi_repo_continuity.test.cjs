'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const multiRepo = require('../../scripts/lib/multi_repo_continuity.cjs');
const safeGit = require('../../scripts/lib/safe_git_checkpoint.cjs');
const startupSync = require('../../scripts/startup_sync.cjs');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function git(root, args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  return String(result.stdout || '').trim();
}

function createRepository(base, id, branch) {
  const remote = path.join(base, `${id}.git`);
  const workspace = path.join(base, id);
  fs.mkdirSync(remote, { recursive: true });
  fs.mkdirSync(workspace, { recursive: true });
  git(remote, ['init', '--bare']);
  git(workspace, ['init']);
  git(workspace, ['config', 'user.name', 'AIOX Test']);
  git(workspace, ['config', 'user.email', 'aiox-test@example.invalid']);
  git(workspace, ['branch', '-M', branch]);
  write(path.join(workspace, 'README.md'), `${id}\n`);
  git(workspace, ['add', '--', 'README.md']);
  git(workspace, ['commit', '-m', 'base']);
  git(workspace, ['remote', 'add', 'origin', remote]);
  git(workspace, ['push', '-u', 'origin', branch]);
  return { id, branch, remote, workspace };
}

function repositoryDefinition(repo, priority) {
  return {
    id: repo.id,
    priority,
    role: repo.id === 'protheus' ? 'canonical_investments' : 'administrative_orchestrator',
    root: repo.workspace,
    remote: 'origin',
    branch: repo.branch,
    required: true,
    github_visibility: repo.id === 'protheus' ? 'private' : 'preserve_existing',
    gates: [],
    policy: {
      private_roots: repo.id === 'protheus' ? ['data/private/'] : [],
      safe_untracked_roots: ['src/', 'docs/'],
      safe_untracked_files: ['README.md'],
      safe_untracked_extensions: ['.js', '.md']
    }
  };
}

function testConfigurationAndPolicies() {
  const repositories = multiRepo.readRepositories();
  assert.deepEqual(repositories.map((item) => item.id), ['protheus', 'sommersstore']);
  assert.equal(repositories[0].branch, 'main');
  assert.equal(repositories[0].github_visibility, 'private');
  assert.equal(repositories[1].branch, 'migration/pc-new-20260907');
  const protheusPolicy = repositories[0].policy;
  assert.equal(safeGit.classifyChange({ status: '??', path: 'src/new.js' }, protheusPolicy).eligible, true);
  assert.equal(safeGit.classifyChange({ status: '??', path: 'data/private/account.json' }, protheusPolicy).category, 'private');
  assert.equal(safeGit.classifyChange({ status: '??', path: '.env.local' }, protheusPolicy).category, 'credential');
  const restic = multiRepo.verifyResticSources();
  assert.equal(restic.protheus.full_workspace, true);
  assert.equal(restic.sommersstore.full_workspace, true);
}

function testTwoRepositoryPreflightAndStartup() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aiox-multi-repo-'));
  try {
    const protheus = createRepository(root, 'protheus', 'main');
    const sommers = createRepository(root, 'sommersstore', 'migration/pc-new-20260907');
    const repositories = [repositoryDefinition(protheus, 1), repositoryDefinition(sommers, 2)];
    const initialHeads = repositories.map((repository) => safeGit.currentHead({ root: repository.root }));
    const preflights = multiRepo.preflightAll(repositories, { skipGates: true });
    assert.deepEqual(preflights.map((item) => item.id), ['protheus', 'sommersstore']);
    assert.ok(preflights.every((item) => item.local_head === item.remote_head));
    const planned = multiRepo.publishAll(repositories, preflights, { testMode: true });
    assert.ok(planned.every((item) => item.mode === 'test_mode_no_git_write'));
    assert.deepEqual(repositories.map((repository) => safeGit.currentHead({ root: repository.root })), initialHeads);
    assert.ok(repositories.every((repository) => safeGit.runGit(['diff', '--cached', '--quiet'], { root: repository.root }).ok));

    const upstream = path.join(root, 'protheus-upstream');
    git(root, ['clone', '--branch', 'main', protheus.remote, upstream]);
    git(upstream, ['config', 'user.name', 'AIOX Test']);
    git(upstream, ['config', 'user.email', 'aiox-test@example.invalid']);
    write(path.join(upstream, 'remote.js'), 'module.exports = true;\n');
    git(upstream, ['add', '--', 'remote.js']);
    git(upstream, ['commit', '-m', 'remote advance']);
    git(upstream, ['push', 'origin', 'main']);
    write(path.join(sommers.workspace, 'README.md'), 'dirty\n');

    const startup = startupSync.syncRepositories(repositories, { dryRun: true });
    assert.equal(startup[0].id, 'protheus');
    assert.equal(startup[0].status, 'planned_fast_forward');
    assert.equal(startup[1].id, 'sommersstore');
    assert.equal(startup[1].status, 'blocked_dirty');
    assert.ok(startup.every((item) => item.branch && item.local_head && item.remote_head));

    write(path.join(sommers.workspace, 'README.md'), 'sommersstore\n');
    const applied = startupSync.syncRepositories(repositories, { dryRun: false });
    assert.equal(applied[0].status, 'fast_forwarded');
    assert.equal(applied[0].local_head, applied[0].remote_head);
    assert.equal(applied[1].status, 'up_to_date');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function testGlobalPreflightBlocksBeforeGitMutation() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aiox-multi-block-'));
  try {
    const protheus = createRepository(root, 'protheus', 'main');
    const sommers = createRepository(root, 'sommersstore', 'migration/pc-new-20260907');
    const repositories = [repositoryDefinition(protheus, 1), repositoryDefinition(sommers, 2)];
    write(path.join(protheus.workspace, 'src', 'safe.js'), 'module.exports = true;\n');
    write(path.join(sommers.workspace, 'unknown.bin'), 'unknown');
    const headsBefore = repositories.map((repository) => safeGit.currentHead({ root: repository.root }));
    assert.throws(() => multiRepo.preflightAll(repositories, { skipGates: true }), /sommersstore: classificacao bloqueada/);
    assert.deepEqual(repositories.map((repository) => safeGit.currentHead({ root: repository.root })), headsBefore);
    assert.ok(repositories.every((repository) => safeGit.runGit(['diff', '--cached', '--quiet'], { root: repository.root }).ok));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function testSourceGuardrails() {
  const finalizeSource = fs.readFileSync(path.join(__dirname, '..', '..', 'scripts', 'finalize_day.cjs'), 'utf8');
  const multiSource = fs.readFileSync(path.join(__dirname, '..', '..', 'scripts', 'lib', 'multi_repo_continuity.cjs'), 'utf8');
  const startupSource = fs.readFileSync(path.join(__dirname, '..', '..', 'scripts', 'startup_sync.cjs'), 'utf8');
  const combined = `${finalizeSource}\n${multiSource}\n${startupSource}`;
  assert.doesNotMatch(combined, /git\s+add\s+(?:-A|\.)/i);
  assert.doesNotMatch(combined, /push[^\n]*--force/i);
  assert.doesNotMatch(combined, /runGit\(\[['"]stash/i);
  assert.doesNotMatch(combined, /MetaTrader|NinjaTrader|JForex|Profit/);
  assert.match(finalizeSource, /preflightAll\(repositories\)/);
  assert.ok(finalizeSource.indexOf('preflightAll(repositories)') < finalizeSource.indexOf('publishAll(repositories'), 'both preflights must finish before first publication');
  assert.match(startupSource, /syncRepositories\(repositories/);
}

function runMultiRepoContinuityTests() {
  testConfigurationAndPolicies();
  testTwoRepositoryPreflightAndStartup();
  testGlobalPreflightBlocksBeforeGitMutation();
  testSourceGuardrails();
}

module.exports = { runMultiRepoContinuityTests };
