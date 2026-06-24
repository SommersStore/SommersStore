'use strict';

const { execFile } = require('child_process');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TASK_NAME = 'SommersStore Project Mirror Sync';

function createSchedule() {
    return new Promise((resolve) => {
        if (process.platform !== 'win32') {
            resolve({ ok: false, error: 'O agendamento do espelho em D: está disponível apenas no Windows.' });
            return;
        }
        const mirrorScript = path.join(ROOT_DIR, 'scripts', 'project_mirror_sync.js');
        const taskCommand = `"${process.execPath}" "${mirrorScript}" sync --trigger scheduled-watchdog`;
        execFile('schtasks.exe', [
            '/Create',
            '/TN', TASK_NAME,
            '/SC', 'MINUTE',
            '/MO', '15',
            '/TR', taskCommand,
            '/F'
        ], { windowsHide: true }, (error, stdout, stderr) => {
            resolve({
                ok: !error,
                task_name: TASK_NAME,
                command: taskCommand,
                output: String(stdout || stderr || '').trim(),
                error: error ? String(stderr || error.message).trim() : null
            });
        });
    });
}

if (require.main === module) {
    createSchedule().then(result => {
        process.stdout.write(`${JSON.stringify(result)}\n`);
        process.exitCode = result.ok ? 0 : 1;
    }).catch(error => {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
    });
}

module.exports = { TASK_NAME, createSchedule };
