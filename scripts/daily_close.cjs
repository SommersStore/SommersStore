#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = Number(process.env.AIOX_PORT || 4000);
const API_BASE = `http://127.0.0.1:${PORT}`;

const SNAPSHOT_FILES = [
  'task.md',
  'docs/control/session_state.json',
  'docs/control/memory_current_state.json',
  'docs/control/memory_checkpoints.json',
  'docs/control/memory_decision_log.json',
  'docs/control/memory_execution_journal.json',
  'docs/control/memory_mutations.json',
  'docs/control/memory_open_loops.json',
  'docs/control/memory_registry.json',
  'docs/memory/project_memory.md'
];

function toIsoLocal(date = new Date()) {
  const z = -date.getTimezoneOffset();
  const sign = z >= 0 ? '+' : '-';
  const abs = Math.abs(z);
  const zh = String(Math.floor(abs / 60)).padStart(2, '0');
  const zm = String(abs % 60).padStart(2, '0');
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}${sign}${zh}:${zm}`;
}

function dayStamp(date = new Date()) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function timeStamp(date = new Date()) {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${hh}${mm}${ss}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parseArgs(argv) {
  const args = { push: false, noCommit: false, summary: '', nextAction: '' };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--push') args.push = true;
    else if (token === '--no-commit') args.noCommit = true;
    else if (token === '--summary' && argv[i + 1]) {
      args.summary = String(argv[i + 1]);
      i += 1;
    } else if (token.startsWith('--summary=')) {
      args.summary = token.slice('--summary='.length);
    } else if (token === '--next' && argv[i + 1]) {
      args.nextAction = String(argv[i + 1]);
      i += 1;
    } else if (token.startsWith('--next=')) {
      args.nextAction = token.slice('--next='.length);
    }
  }
  return args;
}

async function isServerUp() {
  try {
    const res = await fetch(`${API_BASE}/api/session`, { method: 'GET' });
    return res.ok;
  } catch (_err) {
    return false;
  }
}

async function ensureDashboardServer() {
  if (await isServerUp()) {
    return { startedHere: false, process: null };
  }

  const child = spawn(process.execPath, ['scripts/dashboard_server.js'], {
    cwd: ROOT_DIR,
    stdio: 'ignore',
    windowsHide: true
  });

  for (let i = 0; i < 60; i += 1) {
    await sleep(500);
    if (await isServerUp()) {
      return { startedHere: true, process: child };
    }
  }

  throw new Error('Nao foi possivel iniciar o dashboard server na porta 4000.');
}

function readJson(relativePath, fallback) {
  const fullPath = path.join(ROOT_DIR, relativePath);
  try {
    if (!fs.existsSync(fullPath)) return fallback;
    const raw = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(raw);
  } catch (_err) {
    return fallback;
  }
}

async function closeSession(summary, nextAction) {
  const payload = {
    summary,
    next_action: nextAction || '',
    completed_tasks: [],
    closed_by: 'human',
    model_hint: 'codex'
  };

  const res = await fetch(`${API_BASE}/api/session/close`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Falha ao fechar sessao via API (${res.status}): ${body}`);
  }

  const data = await res.json();
  if (!data.success) {
    throw new Error(`API retornou erro ao fechar sessao: ${JSON.stringify(data)}`);
  }
  return data;
}

function copyFileToSnapshot(snapshotRoot, relPath) {
  const source = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(source)) return false;

  const target = path.join(snapshotRoot, relPath);
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
  return true;
}

function runGit(args, options = {}) {
  const result = spawnSync('git', args, {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options
  });
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim()
  };
}

function runGitCheckpoint(checkpointId, wantPush) {
  const summary = {
    gitRepo: false,
    committed: false,
    pushed: false,
    commitMessage: null,
    note: null
  };

  const inside = runGit(['rev-parse', '--is-inside-work-tree']);
  if (!inside.ok || inside.stdout !== 'true') {
    summary.note = 'Diretorio nao e um repositorio git.';
    return summary;
  }

  summary.gitRepo = true;
  runGit(['add', '-A']);

  const hasChanges = runGit(['diff', '--cached', '--quiet']);
  if (hasChanges.status !== 1) {
    summary.note = 'Sem alteracoes para commit.';
    return summary;
  }

  const now = new Date();
  const dateLabel = `${dayStamp(now)} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const commitMessage = checkpointId
    ? `chore: fechamento do dia ${dateLabel} (${checkpointId})`
    : `chore: fechamento do dia ${dateLabel}`;
  summary.commitMessage = commitMessage;

  const commit = runGit(['commit', '-m', commitMessage]);
  if (!commit.ok) {
    summary.note = `Commit falhou: ${commit.stderr || commit.stdout || 'erro desconhecido'}`;
    return summary;
  }

  summary.committed = true;

  if (!wantPush) {
    summary.note = 'Commit local criado (push desativado).';
    return summary;
  }

  const remotes = runGit(['remote']);
  const list = remotes.stdout.split(/\r?\n/).map((v) => v.trim()).filter(Boolean);
  if (!remotes.ok || list.length === 0) {
    summary.note = 'Commit local criado; push ignorado (sem remote configurado).';
    return summary;
  }

  const branchRes = runGit(['rev-parse', '--abbrev-ref', 'HEAD']);
  const branch = branchRes.ok ? branchRes.stdout : 'main';

  const upstream = runGit(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}']);
  let pushRes;
  if (upstream.ok) {
    pushRes = runGit(['push']);
  } else {
    const remote = list.includes('origin') ? 'origin' : list[0];
    pushRes = runGit(['push', '-u', remote, branch]);
  }

  if (pushRes.ok) {
    summary.pushed = true;
    summary.note = 'Commit e push concluidos.';
  } else {
    summary.note = `Commit local criado; push falhou: ${pushRes.stderr || pushRes.stdout || 'erro desconhecido'}`;
  }

  return summary;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const now = new Date();
  const closeSummary = args.summary || 'Fechamento do dia com snapshot de memoria e checkpoint seguro.';
  const nextAction = args.nextAction || '';

  console.log('[AIOX] Fechamento do dia iniciado...');

  const server = await ensureDashboardServer();
  let closeData;

  try {
    closeData = await closeSession(closeSummary, nextAction);
  } finally {
    if (server.startedHere && server.process && !server.process.killed) {
      try { server.process.kill(); } catch (_err) {}
    }
  }

  const snapshotRoot = path.join(ROOT_DIR, 'artifacts', 'daily_closings', dayStamp(now), timeStamp(now));
  ensureDir(snapshotRoot);

  const copied = SNAPSHOT_FILES.filter((rel) => copyFileToSnapshot(snapshotRoot, rel));

  const gitStatus = runGit(['status', '--short']);
  if (gitStatus.ok) {
    fs.writeFileSync(path.join(snapshotRoot, 'git-status.txt'), `${gitStatus.stdout || '(clean)'}\n`, 'utf8');
  }

  const checkpointId = closeData && closeData.checkpoint_id ? closeData.checkpoint_id : null;
  const gitResult = args.noCommit ? {
    gitRepo: false,
    committed: false,
    pushed: false,
    commitMessage: null,
    note: 'Commit desativado por parametro --no-commit.'
  } : runGitCheckpoint(checkpointId, args.push);

  const sessionState = readJson('docs/control/session_state.json', { current_session: null, history: [] });
  const latestSession = Array.isArray(sessionState.history) ? sessionState.history[sessionState.history.length - 1] : null;

  const manifest = {
    generated_at: toIsoLocal(new Date()),
    snapshot_root: path.relative(ROOT_DIR, snapshotRoot).replace(/\\/g, '/'),
    close_response: closeData,
    latest_closed_session: latestSession,
    copied_files: copied,
    git: gitResult
  };
  fs.writeFileSync(path.join(snapshotRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(`[AIOX] Sessao encerrada com checkpoint: ${checkpointId || 'N/A'}`);
  console.log(`[AIOX] Snapshot salvo em: ${manifest.snapshot_root}`);
  console.log(`[AIOX] Git: ${gitResult.note || 'ok'}`);
}

main().catch((error) => {
  console.error(`[AIOX] Falha no fechamento do dia: ${error.message}`);
  process.exit(1);
});
