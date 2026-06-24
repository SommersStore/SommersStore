'use strict';

const { spawn } = require('child_process');
const { syncProjectMirror } = require('./project_mirror_sync');

function deployHosting() {
    return new Promise((resolve) => {
        const isWindows = process.platform === 'win32';
        const command = isWindows ? 'cmd.exe' : 'firebase';
        const args = isWindows
            ? ['/d', '/s', '/c', 'firebase', 'deploy', '--only', 'hosting', '--non-interactive']
            : ['deploy', '--only', 'hosting', '--non-interactive'];
        const child = spawn(command, args, { cwd: require('path').resolve(__dirname, '..'), shell: false, windowsHide: true });
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
        child.on('error', error => resolve({ ok: false, error: error.message }));
        child.on('close', code => resolve({ ok: code === 0, code }));
    });
}

async function main() {
    const deploy = await deployHosting();
    if (!deploy.ok) {
        process.stderr.write(`Deploy Firebase não concluído (código ${deploy.code ?? 'desconhecido'}). Espelho não foi acionado.\n`);
        process.exitCode = 1;
        return;
    }

    const mirror = await syncProjectMirror({
        trigger: 'npm_deploy_hosting',
        firebaseStatus: 'success'
    });
    process.stdout.write(`${JSON.stringify({ firebase: 'success', mirror })}\n`);
    process.exitCode = mirror.status === 'success' ? 0 : 1;
}

if (require.main === module) {
    main().catch(error => {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
    });
}

module.exports = { deployHosting };
