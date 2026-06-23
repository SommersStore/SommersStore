'use strict';

function normalizedText(value) {
    return String(value || '').trim();
}

function evaluateGitSyncPreflight({ userName, userEmail, stagedFileCount } = {}) {
    const name = normalizedText(userName);
    const email = normalizedText(userEmail);
    const staged = Math.max(0, Number(stagedFileCount) || 0);

    if (!name || !email) {
        return {
            ok: false,
            code: 'git_identity_missing',
            note: 'GitHub bloqueado: configure user.name e user.email antes de tentar um commit.',
            error: 'Identidade Git ausente. Configure nome e e-mail neste repositório ou globalmente.'
        };
    }

    if (staged > 0) {
        return {
            ok: false,
            code: 'git_stage_not_empty',
            note: `GitHub bloqueado: existem ${staged} arquivo(s) já preparados em stage para revisão.`,
            error: 'O Salvar Tudo não altera um stage existente. Revise ou organize os arquivos antes de sincronizar.'
        };
    }

    return { ok: true, code: 'ready', note: 'Pré-validação Git concluída.' };
}

function cloudSyncSucceeded(status) {
    return normalizedText(status).toLowerCase() === 'success';
}

module.exports = {
    evaluateGitSyncPreflight,
    cloudSyncSucceeded
};
