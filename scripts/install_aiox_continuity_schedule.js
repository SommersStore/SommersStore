'use strict';

const { execFile } = require('child_process');
const path = require('path');
const continuity = require('./aiox_continuity.js');

const ROOT_DIR = path.resolve(__dirname, '..');
const TASK_NAME = 'AIOX Cloud Continuity Backup';

function run(command, args) {
  return new Promise((resolve) => {
    execFile(command, args, { cwd: ROOT_DIR, windowsHide: true }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        output: String(stdout || stderr || '').trim(),
        error: error ? String(stderr || error.message).trim() : null
      });
    });
  });
}

async function createSchedule(options = {}) {
  if (process.platform !== 'win32') {
    return { ok: false, error: 'O agendamento de continuidade esta disponivel apenas no Windows.' };
  }

  const preflight = continuity.preflight();
  if (!preflight.ok) {
    return { ok: false, error: `Preflight bloqueou a agenda: ${preflight.errors.join(', ')}`, preflight_errors: preflight.errors };
  }

  const claim = continuity.claimPrimary({ replacePrimary: Boolean(options.replacePrimary) });
  if (!claim.ok) return claim;

  const hiddenRunner = path.join(ROOT_DIR, 'scripts', 'run_aiox_continuity_hidden.vbs');
  const wscript = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'wscript.exe');
  const taskCommand = `"${wscript}" "${hiddenRunner}"`;
  const scheduled = await run('schtasks.exe', [
    '/Create',
    '/TN', TASK_NAME,
    '/SC', 'HOURLY',
    '/MO', '2',
    '/TR', taskCommand,
    '/F'
  ]);

  return {
    ok: scheduled.ok,
    task_name: TASK_NAME,
    interval_hours: 2,
    primary: claim.primary,
    command: taskCommand,
    output: scheduled.output,
    error: scheduled.error
  };
}

if (require.main === module) {
  const replacePrimary = process.argv.includes('--replace-primary');
  createSchedule({ replacePrimary }).then((result) => {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = result.ok ? 0 : 1;
  }).catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = { TASK_NAME, createSchedule };
