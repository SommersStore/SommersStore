#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const continuity = require('./aiox_continuity.js');
const mirror = require('./project_mirror_sync.js');
const safeGit = require('./lib/safe_git_checkpoint.cjs');
const multiRepo = require('./lib/multi_repo_continuity.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = Number(process.env.AIOX_PORT || 4000);
const API_BASE = `http://127.0.0.1:${PORT}`;
const REPORT_ROOT = process.env.AIOX_DAILY_CLOSE_REPORT_DIR
  || path.join(process.env.LOCALAPPDATA || os.tmpdir(), 'AIOX', 'Continuity', 'daily-close');
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
  'docs/memory/project_memory.md',
  'docs/memory/startup_context_latest.md'
];

function isoStamp(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, '-');
}

function toIsoLocal(date = new Date()) {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const abs = Math.abs(offset);
  const suffix = `${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 19);
  return `${local}${suffix}`;
}

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function writeJsonAtomic(filePath, value) {
  ensureDir(path.dirname(filePath));
  const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tempPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(tempPath, filePath);
}

function parseArgs(argv) {
  const options = {
    noShutdown: false,
    testMode: false,
    summary: 'Fechamento seguro do dia com memoria, publicacao e continuidade verificadas.',
    nextAction: 'Executar Oracle e sincronizacao segura na proxima inicializacao.',
    firebaseProject: '',
    firebaseEnvironment: '',
    firebaseConfirmation: ''
  };
  const args = Array.from(argv || []);
  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    const next = args[index + 1];
    if (token === '--no-shutdown') options.noShutdown = true;
    else if (token === '--test-mode') {
      options.testMode = true;
      options.noShutdown = true;
    } else if (['--summary', '--next', '--firebase-project', '--firebase-environment', '--confirm-firebase'].includes(token) && next) {
      const key = token.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      options[key === 'next' ? 'nextAction' : key] = String(next);
      index += 1;
    } else if (token.startsWith('--summary=')) options.summary = token.slice(10);
    else if (token.startsWith('--next=')) options.nextAction = token.slice(7);
    else if (token.startsWith('--firebase-project=')) options.firebaseProject = token.slice(19);
    else if (token.startsWith('--firebase-environment=')) options.firebaseEnvironment = token.slice(23);
    else if (token.startsWith('--confirm-firebase=')) options.firebaseConfirmation = token.slice(19);
  }
  return options;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || ROOT_DIR,
    encoding: 'utf8',
    windowsHide: true,
    maxBuffer: options.maxBuffer || 64 * 1024 * 1024,
    timeout: options.timeout || 15 * 60 * 1000,
    env: options.env || process.env,
    shell: false
  });
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: String(result.stdout || '').trim(),
    stderr: String(result.stderr || '').trim(),
    error: result.error ? result.error.message : null
  };
}

async function isServerUp() {
  try {
    const response = await fetch(`${API_BASE}/api/session`, { method: 'GET' });
    return response.ok;
  } catch (_) {
    return false;
  }
}

async function ensureDashboardServer() {
  if (await isServerUp()) return { startedHere: false, process: null };
  const child = spawn(process.execPath, ['scripts/dashboard_server.js'], {
    cwd: ROOT_DIR,
    stdio: 'ignore',
    windowsHide: true
  });
  for (let attempt = 0; attempt < 60; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (await isServerUp()) return { startedHere: true, process: child };
  }
  throw new Error('Nao foi possivel iniciar o dashboard server para o Scribe.');
}

async function runScribe(summary, nextAction) {
  const server = await ensureDashboardServer();
  try {
    const response = await fetch(`${API_BASE}/api/session/close`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary,
        next_action: nextAction,
        completed_tasks: ['Story 2.116: continuidade Git multirrepositorio'],
        closed_by: 'human',
        model_hint: 'codex',
        project_id: 'sais',
        skip_auto_cloud: true
      })
    });
    const body = await response.text();
    if (!response.ok) throw new Error(`Scribe respondeu ${response.status}: ${body}`);
    const parsed = JSON.parse(body);
    if (!parsed.success) throw new Error(`Scribe nao confirmou sucesso: ${body}`);
    return { status: 'success', checkpoint_id: parsed.checkpoint_id || null, session_id: parsed.session?.id || null };
  } finally {
    if (server.startedHere && server.process && !server.process.killed) {
      try { server.process.kill(); } catch (_) {}
    }
  }
}

function createLocalCheckpoint(runRoot) {
  const checkpointRoot = path.join(runRoot, 'checkpoint');
  const copied = [];
  for (const relativePath of SNAPSHOT_FILES) {
    const source = path.join(ROOT_DIR, relativePath);
    if (!fs.existsSync(source)) continue;
    const target = path.join(checkpointRoot, relativePath);
    ensureDir(path.dirname(target));
    fs.copyFileSync(source, target);
    copied.push(relativePath);
  }
  return { status: 'success', root: checkpointRoot, copied_files: copied };
}

function runGates(repository, options = {}) {
  return multiRepo.runGates(repository, options);
}

function readFirebaseDefaultProject() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT_DIR, '.firebaserc'), 'utf8')).projects?.default || null;
  } catch (_) {
    return null;
  }
}

function deployFirebaseIfNeeded(changedPaths, options) {
  const publishable = changedPaths.filter(safeGit.isPublishableFirebasePath);
  if (publishable.length === 0) return { status: 'skipped', reason: 'no_publishable_artifacts', files: [] };
  if (options.testMode) return { status: 'planned', reason: 'test_mode', files: publishable };
  const project = String(options.firebaseProject || '').trim();
  const environment = String(options.firebaseEnvironment || '').trim();
  const confirmation = String(options.firebaseConfirmation || '').trim();
  const configuredProject = readFirebaseDefaultProject();
  if (!/^[a-z0-9-]+$/.test(project) || !/^(production|staging|preview)$/.test(environment)) {
    throw new Error('Artefato Firebase detectado; informe --firebase-project e --firebase-environment validos.');
  }
  if (configuredProject && configuredProject !== project) throw new Error(`Projeto Firebase diverge do .firebaserc: ${project} != ${configuredProject}.`);
  if (confirmation !== `${project}:${environment}`) throw new Error(`Confirme Firebase com --confirm-firebase=${project}:${environment}.`);
  const command = process.platform === 'win32' ? 'cmd.exe' : 'firebase';
  const args = process.platform === 'win32'
    ? ['/d', '/s', '/c', 'firebase', 'deploy', '--only', 'hosting', '--project', project, '--non-interactive']
    : ['deploy', '--only', 'hosting', '--project', project, '--non-interactive'];
  const result = run(command, args, { timeout: 30 * 60 * 1000 });
  if (!result.ok) throw new Error(`Firebase Hosting falhou: ${result.stderr || result.stdout || result.error}`);
  return { status: 'success', project, environment, files: publishable };
}

function runContinuityBackup() {
  const backup = continuity.backup({ trigger: 'daily_finalize' });
  if (backup.status !== 'success') throw new Error(`Backup Restic falhou: ${backup.error || 'erro nao detalhado'}`);
  if (!backup.snapshot?.id || backup.snapshot.id !== backup.cloud_validation?.snapshot_id) throw new Error('Snapshot Restic local e nuvem nao coincidem.');
  return {
    status: 'success',
    local_snapshot: backup.snapshot.id,
    cloud_snapshot: backup.cloud_validation.snapshot_id,
    equal: true,
    report_files: backup.report_files || []
  };
}

async function runMirror(gitStatus, firebaseStatus, syncId) {
  const result = await mirror.syncProjectMirror({ trigger: 'daily_finalize', githubStatus: gitStatus, firebaseStatus, syncId });
  if (result.status !== 'success') throw new Error(`Espelho local falhou: ${result.error || result.note}`);
  return result;
}

function writeReadableReport(report, runRoot) {
  ensureDir(runRoot);
  const jsonPath = path.join(runRoot, 'final-report.json');
  const textPath = path.join(runRoot, 'final-report.txt');
  writeJsonAtomic(jsonPath, report);
  const lines = [
    'AIOX - Finalizacao do dia',
    `Status: ${report.status}`,
    `Inicio: ${report.started_at}`,
    `Fim: ${report.completed_at || '(em andamento)'}`,
    `Maquina: ${report.machine}`,
    `Scribe: ${report.steps.scribe?.status || 'nao executado'}`,
    `Git: ${report.steps.git?.status || 'nao executado'}`,
    ...((report.steps.git?.repositories || []).map((item) => `  ${item.id}: ${item.status} | branch=${item.branch || 'n/a'} | local=${item.local_head || item.commit || 'n/a'} | remoto=${item.remote_head || item.remote_after || 'n/a'}`)),
    `Varredura de segredos: ${report.steps.secret_scan?.status || 'nao executado'}`,
    `Firebase: ${report.steps.firebase?.status || 'nao executado'}`,
    `Restic local: ${report.steps.restic?.local_snapshot || 'nao executado'}`,
    `Restic nuvem: ${report.steps.restic?.cloud_snapshot || 'nao executado'}`,
    `Espelho: ${report.steps.mirror?.status || 'nao executado'}`,
    `Shutdown: ${report.steps.shutdown?.status || 'nao executado'}`,
    `Erro: ${report.error || 'nenhum'}`
  ];
  fs.writeFileSync(textPath, `${lines.join('\n')}\n`, 'utf8');
  return { json: jsonPath, text: textPath };
}

function requestShutdown() {
  if (process.platform !== 'win32') throw new Error('Desligamento automatico disponivel somente no Windows.');
  const result = run('shutdown.exe', ['/s', '/t', '60', '/c', 'AIOX: finalizacao do dia concluida com sucesso.'], { timeout: 30000 });
  if (!result.ok) throw new Error(`Nao foi possivel agendar o desligamento: ${result.stderr || result.error}`);
  return { status: 'scheduled', delay_seconds: 60 };
}

async function execute(options = {}) {
  const startedAt = new Date();
  const runRoot = path.join(REPORT_ROOT, isoStamp(startedAt));
  const report = {
    schema_version: 'aiox.daily-finalization.v2',
    started_at: toIsoLocal(startedAt),
    completed_at: null,
    status: 'running',
    machine: process.env.COMPUTERNAME || os.hostname(),
    no_shutdown: Boolean(options.noShutdown),
    test_mode: Boolean(options.testMode),
    steps: {},
    error: null,
    report_files: null
  };
  try {
    const initialStatus = continuity.status();
    const machine = String(report.machine).toUpperCase();
    const primary = String(initialStatus.primary?.computer_name || '').toUpperCase();
    if (!initialStatus.primary || primary !== machine) throw new Error(`Esta maquina nao e a escritora primaria. Primaria=${primary || 'ausente'}; atual=${machine}.`);
    report.steps.primary = { status: 'passed', computer_name: report.machine, policy: initialStatus.primary.policy };
    report.steps.scribe = await runScribe(options.summary, options.nextAction);
    report.steps.checkpoint = createLocalCheckpoint(runRoot);
    const repositories = multiRepo.readRepositories(options.repositoryConfigPath, options.environment || process.env);
    report.steps.restic_sources = { status: 'passed', repositories: multiRepo.verifyResticSources(options.continuityConfigPath) };
    const preflights = multiRepo.preflightAll(repositories);
    report.steps.classification = Object.fromEntries(preflights.map((item) => [item.id, item.classification]));
    const secretFindings = preflights.flatMap((item) => item.classification.secret_findings.map((finding) => ({ repository: item.id, ...finding })));
    report.steps.secret_scan = { status: secretFindings.length === 0 ? 'passed' : 'failed', findings: secretFindings };
    report.steps.gates = {
      status: 'passed',
      repositories: preflights.map((item) => ({ id: item.id, status: 'passed', items: item.gates }))
    };
    const publications = multiRepo.publishAll(repositories, preflights, { testMode: options.testMode });
    report.steps.git = {
      status: options.testMode ? 'planned' : (publications.some((item) => item.status === 'success') ? 'success' : 'skipped'),
      mode: options.testMode ? 'test_mode_no_git_write' : 'normal_push_only',
      repositories: publications
    };
    const sommersPreflight = preflights.find((item) => item.id === 'sommersstore');
    const changedPaths = sommersPreflight ? sommersPreflight.classification.eligible_paths.slice() : [];
    report.steps.firebase = deployFirebaseIfNeeded(changedPaths, options);
    report.steps.restic = runContinuityBackup();
    report.steps.mirror = await runMirror(report.steps.git.status, report.steps.firebase.status, report.steps.restic.local_snapshot);
    report.status = 'success';
    report.completed_at = toIsoLocal(new Date());
    report.steps.shutdown = options.noShutdown ? { status: 'skipped', reason: 'no_shutdown' } : requestShutdown();
  } catch (error) {
    report.status = 'error';
    report.completed_at = toIsoLocal(new Date());
    report.error = error.message;
    if (error.gateResults) report.steps.gates = { status: 'failed', repository: error.repositoryId || null, items: error.gateResults };
    report.steps.shutdown = { status: 'blocked', reason: 'mandatory_step_failed' };
  }
  report.report_files = writeReadableReport(report, runRoot);
  return report;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const report = await execute(options);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exitCode = report.status === 'success' ? 0 : 1;
}

if (require.main === module) main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});

module.exports = {
  REPORT_ROOT,
  ROOT_DIR,
  SNAPSHOT_FILES,
  createLocalCheckpoint,
  deployFirebaseIfNeeded,
  execute,
  parseArgs,
  runGates,
  writeReadableReport
};
