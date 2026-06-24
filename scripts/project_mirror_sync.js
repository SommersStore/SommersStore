'use strict';

const { spawn, execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEFAULT_MIRROR_ROOT = process.env.AIOX_PROJECT_MIRROR_DIR || 'D:\\Antigravity-SommersStore';
const WORKSPACE_DIRECTORY = 'workspace';
const STATE_FILE_NAME = 'sync-state.json';

function normalizeText(value) {
    return String(value || '').trim();
}

function normalizeMirrorRoot(value = DEFAULT_MIRROR_ROOT) {
    const candidate = normalizeText(value);
    if (!candidate) throw new Error('Destino do espelho local não informado.');
    return path.resolve(candidate);
}

function workspacePathFor(mirrorRoot = DEFAULT_MIRROR_ROOT) {
    return path.join(normalizeMirrorRoot(mirrorRoot), WORKSPACE_DIRECTORY);
}

function statePathFor(mirrorRoot = DEFAULT_MIRROR_ROOT) {
    return path.join(normalizeMirrorRoot(mirrorRoot), STATE_FILE_NAME);
}

function isInsidePath(candidate, parent) {
    const relative = path.relative(path.resolve(parent), path.resolve(candidate));
    return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function assertSafeMirrorRoot(mirrorRoot = DEFAULT_MIRROR_ROOT) {
    const normalized = normalizeMirrorRoot(mirrorRoot);
    if (isInsidePath(normalized, ROOT_DIR)) {
        throw new Error('O destino do espelho não pode ficar dentro do próprio projeto.');
    }
    return normalized;
}

function isRobocopySuccess(exitCode) {
    const code = Number(exitCode);
    return Number.isInteger(code) && code >= 0 && code <= 7;
}

function run(command, args, options = {}) {
    return new Promise((resolve) => {
        const child = spawn(command, args, {
            cwd: options.cwd || ROOT_DIR,
            windowsHide: true,
            shell: false
        });
        let stdout = '';
        let stderr = '';
        child.stdout.on('data', data => { stdout += String(data || ''); });
        child.stderr.on('data', data => { stderr += String(data || ''); });
        child.on('error', error => resolve({ ok: false, code: null, stdout, stderr, error: error.message }));
        child.on('close', code => resolve({ ok: code === 0, code, stdout, stderr, error: null }));
    });
}

function exec(command, args) {
    return new Promise((resolve) => {
        execFile(command, args, { cwd: ROOT_DIR, windowsHide: true }, (error, stdout, stderr) => {
            resolve({
                ok: !error,
                stdout: String(stdout || '').trim(),
                stderr: String(stderr || '').trim()
            });
        });
    });
}

async function gitSnapshot() {
    const [head, branch, remote] = await Promise.all([
        exec('git', ['rev-parse', 'HEAD']),
        exec('git', ['branch', '--show-current']),
        exec('git', ['remote', 'get-url', 'origin'])
    ]);
    return {
        head: head.ok ? head.stdout : null,
        branch: branch.ok ? branch.stdout : null,
        origin: remote.ok ? remote.stdout : null
    };
}

function firebaseProject() {
    try {
        const config = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, '.firebaserc'), 'utf8'));
        return config && config.projects ? config.projects.default || null : null;
    } catch (_) {
        return null;
    }
}

function writeJsonAtomic(filePath, value) {
    const directory = path.dirname(filePath);
    fs.mkdirSync(directory, { recursive: true });
    const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
    fs.writeFileSync(tempPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
    fs.renameSync(tempPath, filePath);
}

function readProjectMirrorState(mirrorRoot = DEFAULT_MIRROR_ROOT) {
    try {
        return JSON.parse(fs.readFileSync(statePathFor(mirrorRoot), 'utf8'));
    } catch (_) {
        return null;
    }
}

async function syncProjectMirror(options = {}) {
    const startedAt = new Date().toISOString();
    const mirrorRoot = assertSafeMirrorRoot(options.mirrorRoot || DEFAULT_MIRROR_ROOT);
    const workspacePath = workspacePathFor(mirrorRoot);
    const statePath = statePathFor(mirrorRoot);
    const trigger = normalizeText(options.trigger) || 'manual';

    if (process.platform !== 'win32') {
        return {
            status: 'error',
            note: 'O espelho local em D: está configurado para Windows.',
            error: `Plataforma não suportada: ${process.platform}`,
            destination: workspacePath,
            state_file: statePath
        };
    }

    fs.mkdirSync(mirrorRoot, { recursive: true });
    const copyStartedAt = Date.now();
    const copy = await run('robocopy', [
        ROOT_DIR,
        workspacePath,
        '/MIR',
        '/COPY:DAT',
        '/DCOPY:DAT',
        '/XJ',
        '/FFT',
        '/R:2',
        '/W:2',
        '/NP',
        '/NFL',
        '/NDL',
        '/NJH',
        '/NJS'
    ]);
    const succeeded = isRobocopySuccess(copy.code);
    const completedAt = new Date().toISOString();
    const snapshot = await gitSnapshot();
    const state = {
        schema_version: 1,
        status: succeeded ? 'success' : 'error',
        trigger,
        started_at: startedAt,
        completed_at: completedAt,
        duration_ms: Date.now() - copyStartedAt,
        source_workspace: ROOT_DIR,
        mirror_workspace: workspacePath,
        git: snapshot,
        firebase: {
            project: firebaseProject(),
            status: normalizeText(options.firebaseStatus) || 'not_reported'
        },
        github: {
            status: normalizeText(options.githubStatus) || 'not_reported'
        },
        cloud_sync_id: normalizeText(options.syncId) || null,
        robocopy_exit_code: copy.code,
        error: succeeded ? null : (copy.error || copy.stderr || copy.stdout || `robocopy terminou com código ${copy.code}`)
    };
    writeJsonAtomic(statePath, state);

    return {
        status: state.status,
        note: succeeded
            ? `Espelho local atualizado em ${workspacePath}.`
            : 'Falha ao atualizar o espelho local no disco D.',
        error: state.error,
        destination: workspacePath,
        state_file: statePath,
        duration_ms: state.duration_ms,
        robocopy_exit_code: copy.code,
        git_head: snapshot.head
    };
}

function readCliOptions(argv) {
    const options = { command: 'sync' };
    const args = Array.from(argv || []);
    if (args[0] && !args[0].startsWith('--')) options.command = args.shift();
    for (let index = 0; index < args.length; index += 1) {
        const key = args[index];
        const value = args[index + 1];
        if (!key.startsWith('--')) continue;
        if (key === '--mirror-root') options.mirrorRoot = value;
        if (key === '--trigger') options.trigger = value;
        if (key === '--github-status') options.githubStatus = value;
        if (key === '--firebase-status') options.firebaseStatus = value;
        if (key === '--sync-id') options.syncId = value;
        index += 1;
    }
    return options;
}

async function main() {
    const options = readCliOptions(process.argv.slice(2));
    if (options.command !== 'sync') {
        throw new Error(`Comando não reconhecido: ${options.command}. Use "sync".`);
    }
    const result = await syncProjectMirror(options);
    process.stdout.write(`${JSON.stringify(result)}\n`);
    process.exitCode = result.status === 'success' ? 0 : 1;
}

if (require.main === module) {
    main().catch(error => {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
    });
}

module.exports = {
    DEFAULT_MIRROR_ROOT,
    ROOT_DIR,
    assertSafeMirrorRoot,
    isInsidePath,
    isRobocopySuccess,
    normalizeMirrorRoot,
    readCliOptions,
    readProjectMirrorState,
    statePathFor,
    syncProjectMirror,
    workspacePathFor
};
