'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const safeGit = require('./safe_git_checkpoint.cjs');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const CONFIG_PATH = path.join(ROOT_DIR, 'config', 'aiox_git_repositories.json');
const CONTINUITY_CONFIG_PATH = path.join(ROOT_DIR, 'config', 'aiox_continuity_sources.json');
const UNSAFE_CATEGORIES = new Set(['conflict', 'secret', 'unknown', 'review']);

function resolveRoot(definition, environment = process.env) {
  const override = definition.root_env ? String(environment[definition.root_env] || '').trim() : '';
  return path.resolve(override || definition.root);
}

function readRepositories(configPath = CONFIG_PATH, environment = process.env) {
  const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (parsed.schema_version !== 'aiox.git-continuity.v1' || !Array.isArray(parsed.repositories)) {
    throw new Error('Configuracao Git multirrepositorio invalida.');
  }
  const ids = new Set();
  const repositories = parsed.repositories.map((definition) => {
    if (!definition.id || ids.has(definition.id)) throw new Error(`Repositorio duplicado ou sem id: ${definition.id || '(ausente)'}.`);
    ids.add(definition.id);
    if (!definition.branch || !definition.remote || !definition.root) throw new Error(`Repositorio ${definition.id} incompleto.`);
    return { ...definition, root: resolveRoot(definition, environment), policy: definition.policy || {} };
  }).sort((left, right) => Number(left.priority) - Number(right.priority));
  if (repositories.length !== 2 || repositories[0].id !== 'protheus' || repositories[1].id !== 'sommersstore') {
    throw new Error('A ordem obrigatoria e Protheus primeiro e SommersStore depois.');
  }
  return repositories;
}

function assertRepository(repository) {
  if (!fs.existsSync(repository.root)) throw new Error(`${repository.id}: raiz ausente em ${repository.root}.`);
  if (!fs.existsSync(path.join(repository.root, '.git'))) throw new Error(`${repository.id}: raiz nao e repositorio Git.`);
  const branch = safeGit.currentBranch({ root: repository.root });
  if (branch !== repository.branch) {
    throw new Error(`${repository.id}: branch incorreta; atual=${branch}; esperada=${repository.branch}.`);
  }
  return branch;
}

function npmInvocation() {
  if (process.platform !== 'win32') return { command: 'npm', prefix: [] };
  return {
    command: process.execPath,
    prefix: [path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js')]
  };
}

function runGates(repository, options = {}) {
  const invocation = npmInvocation();
  const env = {
    ...process.env,
    ...(options.env || {}),
    AIOX_TEST_DISABLE_REAL_RESTIC: '1',
    LOCALAPPDATA: process.env.AIOX_GATE_LOCALAPPDATA || 'C:\\AIOX\\Temp\\AIOX-NoRestic-Test'
  };
  const results = [];
  for (const definition of repository.gates || []) {
    const [name, ...args] = definition;
    const result = spawnSync(invocation.command, [...invocation.prefix, ...args], {
      cwd: repository.root,
      encoding: 'utf8',
      windowsHide: true,
      shell: false,
      timeout: options.timeout || 20 * 60 * 1000,
      maxBuffer: 64 * 1024 * 1024,
      env
    });
    const detail = String(result.status === 0 ? result.stdout : (result.stderr || result.stdout || result.error?.message || '')).trim();
    results.push({ name, status: result.status === 0 ? 'passed' : 'failed', exit_code: result.status, detail: detail.split(/\r?\n/).slice(-3).join(' ') });
    if (result.status !== 0) {
      throw Object.assign(new Error(`${repository.id}: gate ${name} falhou.`), { repositoryId: repository.id, gateResults: results });
    }
  }
  return results;
}

function preflightRepository(repository, options = {}) {
  const branch = assertRepository(repository);
  safeGit.assertEmptyStage({ root: repository.root });
  const classification = safeGit.classifyWorkspace({ root: repository.root, policy: repository.policy });
  const unsafe = classification.blocked.filter((entry) => UNSAFE_CATEGORIES.has(entry.category));
  if (unsafe.length > 0) {
    throw new Error(`${repository.id}: classificacao bloqueada: ${unsafe.map((entry) => `${entry.path}:${entry.reason}`).join(', ')}.`);
  }
  const gates = options.skipGates ? [] : runGates(repository, options);
  safeGit.fetchRemote(repository.remote, repository.branch, { root: repository.root });
  const localHead = safeGit.currentHead({ root: repository.root });
  const remoteHead = safeGit.readRemoteHead(repository.remote, repository.branch, { root: repository.root });
  safeGit.assertRemoteCanFastForward(remoteHead, localHead, { root: repository.root });
  return {
    id: repository.id,
    priority: repository.priority,
    role: repository.role,
    root: repository.root,
    remote: repository.remote,
    branch,
    local_head: localHead,
    remote_head: remoteHead,
    github_visibility: repository.github_visibility,
    classification,
    gates,
    status: classification.eligible_paths.length > 0 ? 'ready_with_changes' : 'ready_clean'
  };
}

function preflightAll(repositories, options = {}) {
  const results = [];
  for (const repository of repositories) results.push(preflightRepository(repository, options));
  return results;
}

function publishRepository(repository, preflight, options = {}) {
  const eligiblePaths = preflight.classification.eligible_paths;
  if (options.testMode) {
    return {
      id: repository.id,
      status: eligiblePaths.length > 0 ? 'planned' : 'verified_clean',
      mode: 'test_mode_no_git_write',
      branch: preflight.branch,
      local_head: preflight.local_head,
      remote_head: preflight.remote_head,
      eligible_paths: eligiblePaths
    };
  }
  if (eligiblePaths.length === 0) {
    return {
      id: repository.id,
      status: 'skipped',
      reason: 'no_safe_changes',
      branch: preflight.branch,
      local_head: preflight.local_head,
      remote_head: preflight.remote_head,
      eligible_paths: []
    };
  }
  const staged = safeGit.stageExplicit(eligiblePaths, { root: repository.root });
  const published = safeGit.commitAndPush({
    root: repository.root,
    remote: repository.remote,
    branch: repository.branch,
    message: options.message || `chore(continuity): finalize ${repository.id}`,
    env: { ...process.env, AIOX_ACTIVE_AGENT: 'github-devops', AIOX_TEST_DISABLE_REAL_RESTIC: '1' }
  });
  return { id: repository.id, status: 'success', staged, eligible_paths: eligiblePaths, ...published };
}

function publishAll(repositories, preflights, options = {}) {
  const byId = new Map(preflights.map((item) => [item.id, item]));
  return repositories.map((repository) => publishRepository(repository, byId.get(repository.id), options));
}

function verifyResticSources(configPath = CONTINUITY_CONFIG_PATH) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const sources = new Map((config.sources || []).map((source) => [source.id, source]));
  const result = {};
  for (const id of ['protheus', 'sommersstore']) {
    const source = sources.get(id);
    if (!source || source.required !== true || Array.isArray(source.includes)) {
      throw new Error(`Restic deve incluir integralmente a fonte obrigatoria ${id}.`);
    }
    result[id] = { required: true, full_workspace: true, restore_policy: source.restore_policy };
  }
  return result;
}

function inspectAll(options = {}) {
  const repositories = readRepositories(options.configPath, options.environment);
  return repositories.map((repository) => {
    const branch = assertRepository(repository);
    if (options.fetch) safeGit.fetchRemote(repository.remote, repository.branch, { root: repository.root });
    return {
      id: repository.id,
      priority: repository.priority,
      root: repository.root,
      branch,
      expected_branch: repository.branch,
      local_head: safeGit.currentHead({ root: repository.root }),
      remote_head: safeGit.readRemoteHead(repository.remote, repository.branch, { root: repository.root }),
      dirty: safeGit.listChanges({ root: repository.root }).length > 0,
      github_visibility: repository.github_visibility
    };
  });
}

function main() {
  const fetch = process.argv.slice(2).includes('--fetch');
  process.stdout.write(`${JSON.stringify({ repositories: inspectAll({ fetch }), restic: verifyResticSources() }, null, 2)}\n`);
}

if (require.main === module) main();

module.exports = {
  CONFIG_PATH,
  CONTINUITY_CONFIG_PATH,
  UNSAFE_CATEGORIES,
  assertRepository,
  inspectAll,
  preflightAll,
  preflightRepository,
  publishAll,
  publishRepository,
  readRepositories,
  resolveRoot,
  runGates,
  verifyResticSources
};
