'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const DEFAULT_ROOT = path.resolve(__dirname, '..', '..');

const PRIVATE_PATHS = new Set([
  'projects/financas/data/fin2_data.json',
  'projects/financas/data/finance_state.json',
  'projects/imposto-de-renda/data/ir_state.json'
]);

const CREDENTIAL_PATH_PATTERNS = [
  /(^|\/)auth\.json$/i,
  /(^|\/)credentials(?:\.[^/]+)?\.json$/i,
  /(^|\/)service[-_]?account(?:\.[^/]+)?\.json$/i,
  /(^|\/)application_default_credentials\.json$/i,
  /(^|\/)\.env(?:\..+)?$/i,
  /(^|\/)(?:id_rsa|id_ed25519|known_hosts)$/i,
  /\.(?:pem|key|p12|pfx)$/i
];

const RUNTIME_PATH_PATTERNS = [
  /(^|\/)node_modules\//i,
  /(^|\/)\.firebase\//i,
  /(^|\/)coverage\//i,
  /(^|\/)(?:dist|build|tmp|temp|cache|logs?)\//i,
  /(^|\/)artifacts\/daily_closings\//i,
  /(^|\/)docs\/control\/.*\.log$/i,
  /(^|\/)query$/i,
  /\.tmp(?:-|$)/i,
  /(?:^|\/)Thumbs\.db$/i,
  /(?:^|\/)desktop\.ini$/i
];

const SAFE_UNTRACKED_ROOTS = [
  '.github/',
  'bin/',
  'config/',
  'docs/',
  'packages/',
  'scripts/',
  'tests/'
];

const SAFE_UNTRACKED_FILES = new Set([
  '.gitignore',
  'AGENTS.md',
  'README.md',
  'firebase.json',
  'firestore.rules',
  'package-lock.json',
  'package.json',
  'storage.rules',
  'task.md'
]);

const SAFE_UNTRACKED_EXTENSIONS = new Set([
  '.bat', '.cjs', '.cmd', '.css', '.csv', '.html', '.js', '.json', '.jsx', '.md',
  '.mjs', '.ps1', '.scss', '.sh', '.toml', '.ts', '.tsx', '.txt', '.yaml', '.yml'
]);

const SECRET_PATTERNS = [
  { id: 'private_key', regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { id: 'github_token', regex: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b|\bgithub_pat_[A-Za-z0-9_]{20,}\b/ },
  { id: 'openai_key', regex: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { id: 'google_api_key', regex: /\bAIza[0-9A-Za-z_-]{30,}\b/ },
  { id: 'aws_access_key', regex: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: 'jwt', regex: /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/ },
  {
    id: 'credential_assignment',
    regex: /^\s*(?:password|passwd|secret|access[_-]?token|refresh[_-]?token|api[_-]?key)\s*[:=]\s*(?:["'][^"'\r\n]{8,}["']|[A-Za-z0-9+/=_-]{16,})\s*[,;]?\s*$/im
  }
];

function normalizeRepoPath(value) {
  return String(value || '').replace(/\\/g, '/').replace(/^\.\//, '').trim();
}

function runGit(args, options = {}) {
  const result = spawnSync(options.gitPath || 'git', args, {
    cwd: options.root || DEFAULT_ROOT,
    encoding: 'utf8',
    windowsHide: true,
    maxBuffer: options.maxBuffer || 32 * 1024 * 1024,
    env: options.env || process.env,
    timeout: options.timeout || 120000
  });
  const stdoutRaw = String(result.stdout || '');
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: stdoutRaw.trim(),
    stdout_raw: stdoutRaw,
    stderr: String(result.stderr || '').trim(),
    error: result.error ? result.error.message : null
  };
}

function parsePorcelainZ(raw) {
  const parts = String(raw || '').split('\0');
  const entries = [];
  for (let index = 0; index < parts.length; index += 1) {
    const record = parts[index];
    if (!record) continue;
    const status = record.slice(0, 2);
    let filePath = normalizeRepoPath(record.slice(3));
    let originalPath = null;
    if (status.includes('R') || status.includes('C')) {
      originalPath = normalizeRepoPath(parts[index + 1]);
      index += 1;
    }
    if (filePath) entries.push({ status, path: filePath, original_path: originalPath });
  }
  return entries;
}

function listChanges(options = {}) {
  const result = runGit(['status', '--porcelain=v1', '-z', '--untracked-files=all'], options);
  if (!result.ok) throw new Error(`Nao foi possivel ler o status Git: ${result.stderr || result.error}`);
  return parsePorcelainZ(result.stdout_raw).filter((entry) => {
    if (entry.status !== ' M') return true;
    const diff = runGit(['diff', '--quiet', '--', entry.path], options);
    if (diff.status === 0) return false;
    if (diff.status === 1) return true;
    throw new Error(`Nao foi possivel confirmar o diff de ${entry.path}: ${diff.stderr || diff.error}`);
  });
}

function isCredentialPath(repoPath) {
  return CREDENTIAL_PATH_PATTERNS.some((pattern) => pattern.test(repoPath));
}

function isRuntimePath(repoPath) {
  return RUNTIME_PATH_PATTERNS.some((pattern) => pattern.test(repoPath));
}

function isSafeUntrackedPath(repoPath) {
  if (SAFE_UNTRACKED_FILES.has(repoPath)) return true;
  if (!SAFE_UNTRACKED_ROOTS.some((root) => repoPath.startsWith(root))) return false;
  if (repoPath.includes('/data/') && repoPath.startsWith('projects/')) return false;
  return SAFE_UNTRACKED_EXTENSIONS.has(path.posix.extname(repoPath).toLowerCase());
}

function classifyChange(entry) {
  const repoPath = normalizeRepoPath(entry.path);
  const untracked = entry.status === '??';
  const conflicted = /U|AA|DD/.test(entry.status);
  const deleted = entry.status.includes('D');

  if (conflicted) return { ...entry, path: repoPath, category: 'conflict', eligible: false, reason: 'git_conflict' };
  if (PRIVATE_PATHS.has(repoPath)) return { ...entry, path: repoPath, category: 'private', eligible: false, reason: 'private_data' };
  if (isCredentialPath(repoPath)) return { ...entry, path: repoPath, category: 'credential', eligible: false, reason: 'credential_path' };
  if (isRuntimePath(repoPath)) return { ...entry, path: repoPath, category: 'runtime', eligible: false, reason: 'runtime_path' };
  if (deleted) return { ...entry, path: repoPath, category: 'review', eligible: false, reason: 'deletion_requires_review' };
  if (untracked && !isSafeUntrackedPath(repoPath)) {
    return { ...entry, path: repoPath, category: 'unknown', eligible: false, reason: 'untracked_not_allowlisted' };
  }
  return { ...entry, path: repoPath, category: untracked ? 'safe_untracked' : 'safe_tracked', eligible: true, reason: 'allowed' };
}

function scanTextForSecrets(text) {
  const findings = [];
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.regex.test(String(text || ''))) findings.push(pattern.id);
  }
  return findings;
}

function looksBinary(buffer) {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8192));
  return sample.includes(0);
}

function scanPathsForSecrets(paths, options = {}) {
  const root = options.root || DEFAULT_ROOT;
  const findings = [];
  for (const repoPath of paths) {
    const absolute = path.join(root, repoPath);
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) continue;
    const buffer = fs.readFileSync(absolute);
    if (looksBinary(buffer)) continue;
    for (const patternId of scanTextForSecrets(buffer.toString('utf8'))) {
      findings.push({ path: repoPath, pattern: patternId });
    }
  }
  return findings;
}

function classifyWorkspace(options = {}) {
  const entries = listChanges(options).map(classifyChange);
  const initiallyEligible = entries.filter((entry) => entry.eligible).map((entry) => entry.path);
  const secretFindings = scanPathsForSecrets(initiallyEligible, options);
  const secretPaths = new Set(secretFindings.map((finding) => finding.path));
  for (const entry of entries) {
    if (secretPaths.has(entry.path)) {
      entry.category = 'secret';
      entry.eligible = false;
      entry.reason = 'secret_content';
    }
  }
  return {
    entries,
    eligible_paths: entries.filter((entry) => entry.eligible).map((entry) => entry.path),
    blocked: entries.filter((entry) => !entry.eligible),
    secret_findings: secretFindings
  };
}

function assertEmptyStage(options = {}) {
  const staged = runGit(['diff', '--cached', '--name-only'], options);
  if (!staged.ok) throw new Error(`Nao foi possivel conferir o stage: ${staged.stderr || staged.error}`);
  const paths = staged.stdout.split(/\r?\n/).map(normalizeRepoPath).filter(Boolean);
  if (paths.length > 0) throw new Error(`Stage preexistente nao sera alterado automaticamente: ${paths.join(', ')}`);
  return true;
}

function stageExplicit(paths, options = {}) {
  assertEmptyStage(options);
  for (const repoPath of paths) {
    const result = runGit(['add', '--', repoPath], options);
    if (!result.ok) throw new Error(`Falha ao adicionar ${repoPath}: ${result.stderr || result.error}`);
  }
  const check = runGit(['diff', '--cached', '--check'], options);
  if (!check.ok) throw new Error(`git diff --cached --check falhou: ${check.stdout || check.stderr}`);
  const staged = runGit(['diff', '--cached', '--name-only'], options);
  const stagedPaths = staged.stdout.split(/\r?\n/).map(normalizeRepoPath).filter(Boolean);
  if (JSON.stringify(stagedPaths.sort()) !== JSON.stringify([...paths].sort())) {
    throw new Error('A lista do stage diverge da classificacao aprovada.');
  }
  for (const repoPath of stagedPaths) {
    const indexed = runGit(['rev-parse', '--verify', `:${repoPath}`], options);
    const workingTree = runGit(['hash-object', '--', repoPath], options);
    if (!indexed.ok || !workingTree.ok || indexed.stdout !== workingTree.stdout) {
      throw new Error(`O conteudo indexado diverge do workspace durante a varredura: ${repoPath}`);
    }
  }
  const findings = scanPathsForSecrets(stagedPaths, options);
  if (findings.length > 0) throw new Error(`Segredo detectado no stage: ${findings.map((item) => `${item.path}:${item.pattern}`).join(', ')}`);
  return stagedPaths;
}

function currentBranch(options = {}) {
  const result = runGit(['branch', '--show-current'], options);
  if (!result.ok || !result.stdout) throw new Error('Branch Git atual nao identificada.');
  return result.stdout;
}

function currentHead(options = {}) {
  const result = runGit(['rev-parse', 'HEAD'], options);
  if (!result.ok) throw new Error(`HEAD Git nao identificado: ${result.stderr || result.error}`);
  return result.stdout;
}

function readRemoteHead(remote, branch, options = {}) {
  const result = runGit(['ls-remote', remote, `refs/heads/${branch}`], options);
  if (!result.ok) throw new Error(`Falha ao ler o remoto: ${result.stderr || result.error}`);
  return normalizeRepoPath(result.stdout.split(/\s+/)[0]);
}

function fetchRemote(remote, branch, options = {}) {
  const result = runGit(['fetch', remote, branch], options);
  if (!result.ok) throw new Error(`git fetch falhou: ${result.stderr || result.error}`);
  return result;
}

function assertRemoteCanFastForward(remoteHead, localHead, options = {}) {
  const ancestor = runGit(['merge-base', '--is-ancestor', remoteHead, localHead], options);
  if (!ancestor.ok) throw new Error('O HEAD remoto nao e ancestral do HEAD local; push normal foi bloqueado.');
  return true;
}

function commitAndPush(options = {}) {
  const remote = options.remote || 'origin';
  const branch = options.branch || currentBranch(options);
  const message = String(options.message || '').trim();
  if (!message) throw new Error('Mensagem de commit obrigatoria.');

  fetchRemote(remote, branch, options);
  const beforeCommitHead = currentHead(options);
  const remoteBefore = readRemoteHead(remote, branch, options);
  assertRemoteCanFastForward(remoteBefore, beforeCommitHead, options);

  const commit = runGit(['commit', '-m', message], { ...options, timeout: 15 * 60 * 1000 });
  if (!commit.ok) throw new Error(`Commit falhou: ${commit.stderr || commit.stdout || commit.error}`);
  const commitHead = currentHead(options);
  const push = runGit(['push', remote, branch], { ...options, timeout: 15 * 60 * 1000 });
  if (!push.ok) throw new Error(`Push normal falhou: ${push.stderr || push.stdout || push.error}`);
  const remoteAfter = readRemoteHead(remote, branch, options);
  if (remoteAfter !== commitHead) throw new Error(`HEAD remoto divergente apos push: local=${commitHead}; remoto=${remoteAfter}`);
  return { branch, remote, remote_before: remoteBefore, commit: commitHead, remote_after: remoteAfter, pushed: true };
}

function isPublishableFirebasePath(repoPath) {
  const normalized = normalizeRepoPath(repoPath);
  return normalized === 'firebase.json'
    || normalized === '.firebaserc'
    || normalized.startsWith('projects/loja-digital/out_deploy/');
}

module.exports = {
  CREDENTIAL_PATH_PATTERNS,
  DEFAULT_ROOT,
  PRIVATE_PATHS,
  RUNTIME_PATH_PATTERNS,
  SECRET_PATTERNS,
  assertEmptyStage,
  assertRemoteCanFastForward,
  classifyChange,
  classifyWorkspace,
  commitAndPush,
  currentBranch,
  currentHead,
  fetchRemote,
  isCredentialPath,
  isPublishableFirebasePath,
  isRuntimePath,
  isSafeUntrackedPath,
  listChanges,
  normalizeRepoPath,
  parsePorcelainZ,
  readRemoteHead,
  runGit,
  scanPathsForSecrets,
  scanTextForSecrets,
  stageExplicit
};
