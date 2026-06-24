'use strict';

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const source = path.join(ROOT_DIR, '.githooks', 'post-push');
const MANAGED_MARKER = 'SommersStore project mirror hook';

function resolveHookPath() {
    return execFileSync('git', ['rev-parse', '--git-path', 'hooks/post-push'], {
        cwd: ROOT_DIR,
        encoding: 'utf8',
        windowsHide: true
    }).trim();
}

function installProjectMirrorHook() {
    const hookPath = resolveHookPath();
    fs.mkdirSync(path.dirname(hookPath), { recursive: true });
    if (fs.existsSync(hookPath)) {
        const current = fs.readFileSync(hookPath, 'utf8');
        const isPreviousMirrorHook = current.includes('project_mirror_sync.js') && current.includes('SommersStore');
        if (!current.includes(MANAGED_MARKER) && !isPreviousMirrorHook) {
            throw new Error(`Já existe um hook pós-push não gerenciado em ${hookPath}. Ele foi preservado; revise-o antes de instalar o espelho.`);
        }
    }
    fs.copyFileSync(source, hookPath);
    if (process.platform !== 'win32') fs.chmodSync(hookPath, 0o755);
    return hookPath;
}

if (require.main === module) {
    try {
        const hookPath = installProjectMirrorHook();
        process.stdout.write(`Hook pós-push instalado em ${hookPath}\n`);
    } catch (error) {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
    }
}

module.exports = { installProjectMirrorHook, resolveHookPath, MANAGED_MARKER };
