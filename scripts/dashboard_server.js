const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = Number(process.env.AIOX_PORT || 4000);
const ROOT_DIR = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const CONTROL_DIR = path.join(DOCS_DIR, 'control');
const MEMORY_DIR = path.join(DOCS_DIR, 'memory');
const SESSIONS_DIR = path.join(CONTROL_DIR, 'sessions');
const MEMORY_EXTRA_DIR = path.join(CONTROL_DIR, 'memory_extra');
const TASK_PATH = path.join(ROOT_DIR, 'task.md');

const FILES = {
    session: 'session_state.json',
    logs: 'execution_log.json',
    snapshots: 'context_snapshots.json',
    memoryMutations: 'memory_mutations.json',
    memoryState: 'memory_current_state.json',
    memoryLoops: 'memory_open_loops.json',
    memoryCheckpoints: 'memory_checkpoints.json',
    memoryDecisions: 'memory_decision_log.json',
    memoryRuns: 'memory_execution_journal.json',
    memoryArtifacts: 'memory_artifact_index.json',
    memoryRegistry: 'memory_registry.json',
    cloudSync: 'cloud_sync_state.json',
    personaMaterials: 'persona_materials.json',
    projectFlows: 'project_flows.json'
};

const PERSONA_CLONE_DEFAULTS = {
    'prs-alan-nicolas': 'knowledge/clones/alan_nicolas_clone.md',
    'prs-elisa-clark': 'knowledge/clones/elisa_clark.md',
    'prs-joao-vturb': 'knowledge/clones/joao_vturb_clone.md',
    'prs-pedro-valerio': 'knowledge/clones/pedro_valerio_clone.md',
    'prs-tiago-finch': 'knowledge/clones/tiago_finch_clone.md'
};

const DEFAULT_BRUNSON_BOOK_FILES = [
    'knowledge/clones/books/Dotcom Secrets - Russel Brunson.pdf',
    'knowledge/clones/books/Expert Secrets - Russell Brunson.pdf',
    'knowledge/clones/books/Traffic Secrets - Russel Brunson.pdf'
];

const DEFAULT_TRANSCRIPT_FILES = [
    'knowledge/clones/transcripts/alan_nicolas_aluno_negocio_inteiro.md',
    'knowledge/clones/transcripts/elida_dias_vturb.md',
    'knowledge/clones/transcripts/iox_squad_masterclass_1.md'
];

function nowIso() {
    const d = new Date();
    const z = -d.getTimezoneOffset();
    const sign = z >= 0 ? '+' : '-';
    const abs = Math.abs(z);
    const zh = String(Math.floor(abs / 60)).padStart(2, '0');
    const zm = String(abs % 60).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}${sign}${zh}:${zm}`;
}

function dayKey() {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}

function asArray(v) {
    return Array.isArray(v) ? v : [];
}

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function readControlJson(filename, defaultValue = {}) {
    const filePath = path.join(CONTROL_DIR, filename);
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`[WARN] File not found: ${filename}. Returning default.`);
            return defaultValue;
        }
        const data = fs.readFileSync(filePath, 'utf8');
        if (!data || data.trim() === '') return defaultValue;
        return JSON.parse(data);
    } catch (err) {
        console.error(`[ERROR] Failed to read/parse ${filename}:`, err.message);
        // Important fallbacks for critical structures
        if (filename === 'registry.json') return { squads: [], agents: [], checkpoints: [], alerts: [], personas: [], tracked_files: [] };
        if (filename === 'build_state.json') return { phases: [] };
        return defaultValue;
    }
}

function writeControlJson(filename, data) {
    ensureDir(CONTROL_DIR);
    fs.writeFileSync(path.join(CONTROL_DIR, filename), JSON.stringify(data, null, 2), 'utf8');
}

function ensureControlJson(filename, fallback) {
    const data = readControlJson(filename, null);
    if (data !== null) return data;
    writeControlJson(filename, fallback);
    return fallback;
}

function readText(fullPath, fallback = '') {
    try {
        if (!fs.existsSync(fullPath)) return fallback;
        return fs.readFileSync(fullPath, 'utf8');
    } catch (_) {
        return fallback;
    }
}

function writeText(fullPath, content) {
    ensureDir(path.dirname(fullPath));
    fs.writeFileSync(fullPath, content, 'utf8');
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let raw = '';
        req.on('data', chunk => { raw += chunk.toString(); });
        req.on('end', () => {
            if (!raw.trim()) return resolve({});
            try {
                resolve(JSON.parse(raw));
            } catch (error) {
                reject(error);
            }
        });
    });
}

function sendJson(res, data, code = 200) {
    res.writeHead(code, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

function sendText(res, data, contentType = 'text/plain', code = 200) {
    res.writeHead(code, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
}

function safeWorkspacePath(relativePath) {
    const cleaned = String(relativePath || '').replace(/^[/\\]+/, '');
    const absolute = path.resolve(ROOT_DIR, cleaned);
    if (!absolute.toLowerCase().startsWith(ROOT_DIR.toLowerCase())) {
        throw new Error('Path outside workspace is not allowed');
    }
    return absolute;
}

function normalizePathForJson(inputPath) {
    return String(inputPath || '').replace(/\\/g, '/').replace(/^\/+/, '');
}

const MEMORY_SYNC_EXACT_FILES = new Set([
    'task.md',
    'docs/control/session_state.json',
    'docs/control/context_snapshots.json',
    'docs/control/execution_log.json'
]);

const MEMORY_SYNC_PREFIXES = [
    'docs/memory/',
    'docs/control/memory_',
    'docs/control/sessions/'
];

function cloudSyncDefaultState() {
    return {
        auto_sync_memory: true,
        in_progress: false,
        pending_trigger: null,
        last_sync_id: null,
        last_status: 'idle',
        last_summary: 'Nenhuma sincronizacao executada.',
        last_trigger: null,
        last_scope: null,
        last_target: null,
        last_started_at: null,
        last_completed_at: null,
        github: {},
        firebase: {}
    };
}

function loadCloudSyncState() {
    const merged = Object.assign(
        cloudSyncDefaultState(),
        ensureControlJson(FILES.cloudSync, cloudSyncDefaultState()) || {}
    );
    if (typeof merged.auto_sync_memory !== 'boolean') merged.auto_sync_memory = true;
    if (typeof merged.in_progress !== 'boolean') merged.in_progress = false;
    if (!merged.github || typeof merged.github !== 'object') merged.github = {};
    if (!merged.firebase || typeof merged.firebase !== 'object') merged.firebase = {};
    return merged;
}

function writeCloudSyncState(state) {
    writeControlJson(FILES.cloudSync, state);
}

function isMemorySyncPath(relativePath) {
    const normalized = normalizePathForJson(relativePath);
    if (!normalized) return false;
    if (MEMORY_SYNC_EXACT_FILES.has(normalized)) return true;
    return MEMORY_SYNC_PREFIXES.some(prefix => normalized.startsWith(prefix));
}

function runCommand(command, args, options = {}) {
    return new Promise((resolve) => {
        const startedAt = Date.now();
        const child = spawn(command, args, {
            cwd: options.cwd || ROOT_DIR,
            shell: false,
            windowsHide: true
        });

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', chunk => { stdout += chunk.toString(); });
        child.stderr.on('data', chunk => { stderr += chunk.toString(); });

        child.on('error', (error) => {
            resolve({
                ok: false,
                code: -1,
                stdout: stdout.trim(),
                stderr: `${stderr}\n${error.message}`.trim(),
                duration_ms: Date.now() - startedAt,
                command: [command].concat(args || []).join(' ')
            });
        });

        child.on('close', (code) => {
            resolve({
                ok: code === 0,
                code,
                stdout: stdout.trim(),
                stderr: stderr.trim(),
                duration_ms: Date.now() - startedAt,
                command: [command].concat(args || []).join(' ')
            });
        });
    });
}

function parsePorcelainPath(line) {
    const raw = String(line || '');
    if (raw.length < 4) return null;
    const payload = raw.slice(3).trim();
    if (!payload) return null;
    const arrow = ' -> ';
    if (payload.includes(arrow)) {
        const parts = payload.split(arrow);
        return normalizePathForJson(parts[parts.length - 1]);
    }
    return normalizePathForJson(payload);
}

async function listGitChangedPaths() {
    const status = await runCommand('git', ['status', '--porcelain']);
    if (!status.ok) return [];
    return status.stdout
        .split(/\r?\n/)
        .map(parsePorcelainPath)
        .filter(Boolean);
}

function cloudCommitMessage(scope, trigger) {
    const stamp = nowIso().replace('T', ' ').slice(0, 19);
    const label = scope === 'memory' ? 'memory' : 'workspace';
    const reason = trigger ? ` (${trigger})` : '';
    return `chore(${label}): cloud sync ${stamp}${reason}`;
}

async function runGitHubSync(scope, commitMessage) {
    const result = {
        status: 'skipped',
        note: 'Nao executado.',
        scope,
        changed_files: 0,
        commit_message: null,
        branch: null
    };

    const inside = await runCommand('git', ['rev-parse', '--is-inside-work-tree']);
    if (!inside.ok || inside.stdout !== 'true') {
        result.status = 'error';
        result.note = 'Repositorio Git nao encontrado.';
        result.error = inside.stderr || inside.stdout || 'git rev-parse falhou';
        return result;
    }

    let targetFiles = [];
    if (scope === 'memory') {
        const changed = await listGitChangedPaths();
        targetFiles = changed.filter(isMemorySyncPath);
        result.changed_files = targetFiles.length;
        if (!targetFiles.length) {
            result.status = 'skipped';
            result.note = 'Sem alteracoes de memoria para commit.';
            return result;
        }
        const addResult = await runCommand('git', ['add', '--'].concat(targetFiles));
        if (!addResult.ok) {
            result.status = 'error';
            result.note = 'Falha ao preparar arquivos de memoria para commit.';
            result.error = addResult.stderr || addResult.stdout || 'git add falhou';
            return result;
        }
    } else {
        const addResult = await runCommand('git', ['add', '-A']);
        if (!addResult.ok) {
            result.status = 'error';
            result.note = 'Falha ao preparar workspace para commit.';
            result.error = addResult.stderr || addResult.stdout || 'git add -A falhou';
            return result;
        }
    }

    const staged = await runCommand('git', ['diff', '--cached', '--quiet']);
    if (staged.code === 0) {
        result.status = 'skipped';
        result.note = 'Nao ha alteracoes em stage para commit.';
        return result;
    }
    if (staged.code !== 1) {
        result.status = 'error';
        result.note = 'Nao foi possivel validar alteracoes staged.';
        result.error = staged.stderr || staged.stdout || 'git diff --cached --quiet falhou';
        return result;
    }

    const finalCommitMessage = commitMessage || cloudCommitMessage(scope, 'manual');
    const commit = await runCommand('git', ['commit', '-m', finalCommitMessage]);
    if (!commit.ok) {
        result.status = 'error';
        result.note = 'Falha no commit.';
        result.error = commit.stderr || commit.stdout || 'git commit falhou';
        return result;
    }
    result.commit_message = finalCommitMessage;

    const branchRes = await runCommand('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
    const branch = branchRes.ok ? branchRes.stdout : 'master';
    result.branch = branch;

    const remotes = await runCommand('git', ['remote']);
    const remoteList = (remotes.stdout || '').split(/\r?\n/).map(v => v.trim()).filter(Boolean);
    if (!remoteList.length) {
        result.status = 'partial';
        result.note = 'Commit criado, mas sem remote configurado para push.';
        return result;
    }

    const upstream = await runCommand('git', ['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}']);
    const push = upstream.ok
        ? await runCommand('git', ['push'])
        : await runCommand('git', ['push', '-u', (remoteList.includes('origin') ? 'origin' : remoteList[0]), branch]);

    if (!push.ok) {
        result.status = 'partial';
        result.note = 'Commit criado, mas push falhou.';
        result.error = push.stderr || push.stdout || 'git push falhou';
        return result;
    }

    result.status = 'success';
    result.note = 'Commit e push enviados ao GitHub.';
    return result;
}

async function runFirebaseSync() {
    const deploy = await runCommand('firebase', ['deploy', '--only', 'hosting', '--non-interactive']);
    if (deploy.ok) {
        return {
            status: 'success',
            note: 'Deploy Firebase Hosting concluido.',
            duration_ms: deploy.duration_ms
        };
    }
    return {
        status: 'error',
        note: 'Falha no deploy Firebase Hosting.',
        error: deploy.stderr || deploy.stdout || 'firebase deploy falhou',
        duration_ms: deploy.duration_ms
    };
}

let cloudSyncBusy = false;
let cloudSyncQueuedPayload = null;
let cloudAutoSyncTimer = null;

async function runCloudSyncJob(payload = {}) {
    const request = {
        target: (payload.target || 'all'),
        scope: (payload.scope || 'memory'),
        trigger: payload.trigger || 'manual',
        initiated_by: payload.initiated_by || 'human',
        project_id: normalizeProjectId(payload.project_id || null),
        commit_message: payload.commit_message || null
    };

    if (cloudSyncBusy) {
        cloudSyncQueuedPayload = request;
        const state = loadCloudSyncState();
        state.pending_trigger = request.trigger;
        writeCloudSyncState(state);
        return { queued: true, in_progress: true, message: 'Sincronizacao ja em execucao. Novo pedido entrou na fila.' };
    }

    cloudSyncBusy = true;
    const syncId = `SYNC-${dayKey()}-${Date.now()}`;
    const state = loadCloudSyncState();
    state.in_progress = true;
    state.pending_trigger = null;
    state.last_sync_id = syncId;
    state.last_status = 'running';
    state.last_summary = 'Sincronizacao em andamento...';
    state.last_trigger = request.trigger;
    state.last_scope = request.scope;
    state.last_target = request.target;
    state.last_started_at = nowIso();
    writeCloudSyncState(state);

    let github = { status: 'skipped', note: 'Nao solicitado.' };
    let firebase = { status: 'skipped', note: 'Nao solicitado.' };

    try {
        if (request.target === 'all' || request.target === 'github') {
            github = await runGitHubSync(request.scope, request.commit_message || cloudCommitMessage(request.scope, request.trigger));
        }
        if (request.target === 'all' || request.target === 'firebase') {
            firebase = await runFirebaseSync();
        }

        const outcome = [github, firebase]
            .filter(item => item.status !== 'skipped')
            .map(item => item.status);

        const hasError = outcome.includes('error');
        const hasPartial = outcome.includes('partial');
        const status = hasError ? 'error' : (hasPartial ? 'partial' : 'success');
        const summary = [
            `Cloud sync ${syncId}: ${status.toUpperCase()}.`,
            `GitHub: ${github.status || 'skipped'} (${github.note || '-'})`,
            `Firebase: ${firebase.status || 'skipped'} (${firebase.note || '-'})`
        ].join(' ');

        const doneState = loadCloudSyncState();
        doneState.in_progress = false;
        doneState.pending_trigger = null;
        doneState.last_status = status;
        doneState.last_summary = summary;
        doneState.last_completed_at = nowIso();
        doneState.github = github;
        doneState.firebase = firebase;
        writeCloudSyncState(doneState);

        appendExecutionLog(
            'cloud_sync',
            syncId,
            summary,
            request.initiated_by,
            `target=${request.target}; scope=${request.scope}; trigger=${request.trigger}`,
            request.project_id
        );
        appendMemoryMutation('cloud_sync', summary, request.initiated_by);

        return {
            queued: false,
            in_progress: false,
            sync_id: syncId,
            status,
            summary,
            github,
            firebase
        };
    } finally {
        cloudSyncBusy = false;
        const queued = cloudSyncQueuedPayload;
        cloudSyncQueuedPayload = null;
        if (queued) {
            setTimeout(() => {
                runCloudSyncJob({
                    target: queued.target,
                    scope: queued.scope,
                    trigger: `queued:${queued.trigger}`,
                    initiated_by: queued.initiated_by,
                    project_id: queued.project_id,
                    commit_message: queued.commit_message
                }).catch(err => console.error('Queued cloud sync error:', err.message));
            }, 500);
        }
    }
}

function scheduleAutoCloudSync(trigger, projectId = null) {
    const state = loadCloudSyncState();
    if (!state.auto_sync_memory) return { scheduled: false, reason: 'auto_disabled' };
    if (cloudAutoSyncTimer) clearTimeout(cloudAutoSyncTimer);
    cloudAutoSyncTimer = setTimeout(() => {
        cloudAutoSyncTimer = null;
        runCloudSyncJob({
            target: 'all',
            scope: 'memory',
            trigger: trigger || 'memory_auto',
            initiated_by: 'system',
            project_id: projectId || null
        }).catch(err => console.error('Auto cloud sync error:', err.message));
    }, 1200);
    return { scheduled: true };
}

function coreMemoryFiles() {
    return [
        'docs/control/memory_current_state.json',
        'docs/control/memory_checkpoints.json',
        'docs/control/memory_decision_log.json',
        'docs/control/memory_execution_journal.json',
        'docs/control/memory_mutations.json',
        'docs/control/memory_open_loops.json'
    ];
}

function uniquePaths(paths) {
    return [...new Set(asArray(paths).map(normalizePathForJson).filter(Boolean))];
}

function personaDefaultEntry(personaId) {
    return {
        persona_id: personaId,
        clone_file: PERSONA_CLONE_DEFAULTS[personaId] || null,
        transcript_files: [],
        book_files: [],
        support_files: personaId === 'prs-elisa-clark' ? ['docs/content/ebooks/oto-vault/original_master_at_2026_03_31.md'] : []
    };
}

function loadPersonaMaterials() {
    const registry = ensureControlJson('registry.json', { squads: [], agents: [], personas: [] });
    const personas = asArray(registry.personas);
    const data = ensureControlJson(FILES.personaMaterials, { items: [] });
    const existingById = new Map(
        asArray(data.items)
            .filter(item => item && item.persona_id)
            .map(item => [item.persona_id, item])
    );

    const merged = personas.map(persona => {
        const base = personaDefaultEntry(persona.id);
        const existing = existingById.get(persona.id) || {};
        return {
            persona_id: persona.id,
            clone_file: normalizePathForJson(existing.clone_file || base.clone_file || ''),
            transcript_files: uniquePaths([...(base.transcript_files || []), ...(asArray(existing.transcript_files))]),
            book_files: uniquePaths([...(base.book_files || []), ...(asArray(existing.book_files))]),
            support_files: uniquePaths([...(base.support_files || []), ...(asArray(existing.support_files))])
        };
    });

    const normalized = { items: merged };
    writeControlJson(FILES.personaMaterials, normalized);
    return normalized;
}

function normalizeLinkedPath(rawTarget) {
    const target = String(rawTarget || '').trim().replace(/^<|>$/g, '');
    if (!target || /^https?:\/\//i.test(target)) return null;

    if (/^file:\/\//i.test(target)) {
        const cleaned = decodeURIComponent(target.replace(/^file:\/+/, '')).replace(/\\/g, '/');
        const marker = '/SommersStore/';
        const idx = cleaned.toLowerCase().indexOf(marker.toLowerCase());
        if (idx >= 0) return normalizePathForJson(cleaned.slice(idx + marker.length));
        return null;
    }

    if (/^[a-zA-Z]:[\\/]/.test(target)) {
        const cleaned = target.replace(/\\/g, '/');
        const marker = '/SommersStore/';
        const idx = cleaned.toLowerCase().indexOf(marker.toLowerCase());
        if (idx >= 0) return normalizePathForJson(cleaned.slice(idx + marker.length));
        return null;
    }

    return normalizePathForJson(target);
}

function remapLegacyLinkedPath(relativePath) {
    const rel = normalizePathForJson(relativePath);
    if (!rel) return null;
    const legacyPrefix = 'knowledge/marketing/frameworks/raw_transcripts/';
    if (!rel.startsWith(legacyPrefix)) return rel;
    const fallback = normalizePathForJson(`knowledge/clones/transcripts/${path.basename(rel)}`);
    try {
        const exists = fs.existsSync(safeWorkspacePath(fallback));
        return exists ? fallback : rel;
    } catch (_) {
        return rel;
    }
}

function markdownLinkedPaths(content) {
    const text = String(content || '');
    const rx = /\[[^\]]*]\(([^)]+)\)/g;
    const paths = [];
    let match = null;
    while ((match = rx.exec(text)) !== null) {
        const rel = remapLegacyLinkedPath(normalizeLinkedPath(match[1]));
        if (rel) paths.push(rel);
    }
    return uniquePaths(paths);
}

function safeFileStatView(relativePath) {
    const rel = normalizePathForJson(relativePath);
    if (!rel) return null;
    try {
        return fileStatView(rel);
    } catch (_) {
        return {
            path: rel,
            name: path.basename(rel),
            exists: false,
            editable: false,
            bytes: 0,
            modified_at: null
        };
    }
}

function safeReadWorkspaceText(relativePath) {
    const rel = normalizePathForJson(relativePath);
    if (!rel) return '';
    try {
        return readText(safeWorkspacePath(rel), '');
    } catch (_) {
        return '';
    }
}

function buildPersonaAssetsPayload() {
    const registry = ensureControlJson('registry.json', { squads: [], agents: [], personas: [] });
    const personas = asArray(registry.personas);
    const materials = loadPersonaMaterials();
    const materialById = new Map(asArray(materials.items).map(item => [item.persona_id, item]));

    const items = personas.map(persona => {
        const entry = materialById.get(persona.id) || personaDefaultEntry(persona.id);
        const instructionPath = `.codex/personas/${persona.id}.md`;
        const clonePath = normalizePathForJson(entry.clone_file || '');
        const cloneStat = clonePath ? safeFileStatView(clonePath) : null;
        const cloneContent = clonePath ? safeReadWorkspaceText(clonePath) : '';
        const promptLinked = markdownLinkedPaths(cloneContent);

        const promptTranscriptPaths = promptLinked.filter(p => p.includes('/transcripts/') || p.includes('/raw_transcripts/'));
        const promptBookPaths = promptLinked.filter(p => p.includes('/books/'));
        const promptSupportPaths = promptLinked.filter(p => !p.includes('/transcripts/') && !p.includes('/books/'));

        const transcriptPaths = uniquePaths([...(entry.transcript_files || []), ...promptTranscriptPaths]);
        const bookPaths = uniquePaths([...(entry.book_files || []), ...promptBookPaths]);
        const supportPaths = uniquePaths([...(entry.support_files || []), ...promptSupportPaths]);
        const promptLinkedFiles = uniquePaths(promptLinked);

        const transcriptFiles = transcriptPaths.map(safeFileStatView).filter(Boolean);
        const bookFiles = bookPaths.map(safeFileStatView).filter(Boolean);
        const supportFiles = supportPaths.map(safeFileStatView).filter(Boolean);
        const promptLinkedStats = promptLinkedFiles.map(safeFileStatView).filter(Boolean);

        return {
            persona_id: persona.id,
            persona_name: persona.name,
            instruction_file: safeFileStatView(instructionPath),
            clone_file: cloneStat,
            transcript_files: transcriptFiles,
            book_files: bookFiles,
            support_files: supportFiles,
            prompt_linked_files: promptLinkedStats,
            transcript_status: {
                total: transcriptFiles.length,
                available: transcriptFiles.filter(file => file.exists).length,
                linked_in_clone: promptTranscriptPaths.length
            },
            book_status: {
                total: bookFiles.length,
                available: bookFiles.filter(file => file.exists).length,
                linked_in_clone: promptBookPaths.length
            }
        };
    });

    return {
        items,
        materials_file: `docs/control/${FILES.personaMaterials}`,
        transcript_library: DEFAULT_TRANSCRIPT_FILES.map(safeFileStatView).filter(Boolean),
        brunson_books_library: DEFAULT_BRUNSON_BOOK_FILES.map(safeFileStatView).filter(Boolean)
    };
}

function loadMemoryRegistry() {
    const defaults = {
        canonical_files: coreMemoryFiles(),
        tracked_files: []
    };
    const registry = ensureControlJson(FILES.memoryRegistry, defaults);
    registry.canonical_files = asArray(registry.canonical_files).map(normalizePathForJson).filter(Boolean);
    registry.tracked_files = asArray(registry.tracked_files).map(normalizePathForJson).filter(Boolean);
    if (!registry.canonical_files.length) registry.canonical_files = defaults.canonical_files;
    writeControlJson(FILES.memoryRegistry, registry);
    return registry;
}

function fileStatView(relativePath) {
    const rel = normalizePathForJson(relativePath);
    const absolute = safeWorkspacePath(rel);
    const exists = fs.existsSync(absolute);
    const stat = exists ? fs.statSync(absolute) : null;
    return {
        path: rel,
        name: path.basename(rel),
        exists,
        editable: true,
        bytes: stat ? stat.size : 0,
        modified_at: stat ? stat.mtime.toISOString() : null
    };
}

function patchLastUpdated(md, timestamp) {
    if (md.includes('- updated_at:')) {
        return md.replace(/- updated_at:\s*.*/g, `- updated_at: ${timestamp}`);
    }
    return `${md.trim()}\n\n## Last updated\n- updated_at: ${timestamp}\n`;
}

function setSection(md, title, lines) {
    const body = [`## ${title}`, ...lines].join('\n');
    const pattern = new RegExp(`## ${title}[\\s\\S]*?(?=\\n## |$)`, 'm');
    if (pattern.test(md)) return md.replace(pattern, body);
    return `${md.trim()}\n\n${body}\n`;
}

function nextSerial(prefix, usedIds) {
    const today = dayKey();
    const pattern = new RegExp(`^${prefix}-${today}-(\\d{4})$`);
    const nums = usedIds
        .map(v => String(v || ''))
        .map(v => v.match(pattern))
        .filter(Boolean)
        .map(m => parseInt(m[1], 10));
    const next = (nums.length ? Math.max(...nums) : 0) + 1;
    return `${prefix}-${today}-${String(next).padStart(4, '0')}`;
}

function normalizeProjectId(raw) {
    const value = String(raw || '').trim().toLowerCase();
    if (!value) return null;
    if (value === 'sais' || value === 'velas' || value === 'electro') return value;
    return null;
}

function inferProjectIdFromText(text) {
    const haystack = String(text || '').trim().toUpperCase();
    if (!haystack) return null;
    const flows = ensureControlJson(FILES.projectFlows, { projects: {} });
    const projects = flows.projects || {};

    // Direct aliases and typo-tolerant forms used in historical logs.
    if (haystack.includes('SAIS') || haystack.includes('SIZ')) return 'sais';
    if (haystack.includes('VELAS')) return 'velas';
    if (haystack.includes('ELECTRO')) return 'electro';

    for (const [projectId, project] of Object.entries(projects)) {
        const normalizedProject = normalizeProjectId(projectId);
        if (normalizedProject && haystack.includes(String(projectId || '').toUpperCase())) return normalizedProject;

        const projectLabel = String((project && project.label) || '').trim().toUpperCase();
        if (projectLabel && haystack.includes(projectLabel)) return normalizedProject;

        const nodes = asArray(project.construcao).concat(asArray(project.vendas));
        const ids = nodes.map(node => String((node && node.id) || '').toUpperCase()).filter(Boolean);
        if (ids.some(id => haystack.includes(id))) return normalizedProject;
    }
    return null;
}

function appendExecutionLog(type, target, details, initiatedBy = 'system', why = null, projectId = null) {
    const normalizedProjectId =
        normalizeProjectId(projectId)
        || inferProjectIdFromText(target)
        || inferProjectIdFromText(details)
        || inferProjectIdFromText(why)
        || inferProjectIdFromText(type);
    const logs = ensureControlJson(FILES.logs, { entries: [] });
    logs.entries = asArray(logs.entries);
    const id = nextSerial('LOG', logs.entries.map(item => item.id));
    logs.entries.push({
        id,
        type,
        target: target || null,
        initiated_by: initiatedBy,
        project_id: normalizedProjectId,
        timestamp: nowIso(),
        details: details || null,
        why_this_ran: why || null
    });
    writeControlJson(FILES.logs, logs);
    return id;
}

function appendMemoryMutation(scope, summary, mutatedBy = 'system') {
    const data = ensureControlJson(FILES.memoryMutations, { mutations: [] });
    data.mutations = asArray(data.mutations);
    data.mutations.push({
        timestamp: nowIso(),
        memory_scope: scope,
        diff_summary: summary,
        mutated_by: mutatedBy
    });
    writeControlJson(FILES.memoryMutations, data);
}

function appendMemoryRun(action, outputSummary, filesTouched) {
    const data = ensureControlJson(FILES.memoryRuns, { items: [] });
    data.items = asArray(data.items);
    const id = nextSerial('RUN-MEM', data.items.map(item => item.id));
    const ts = nowIso();
    data.items.push({
        id,
        timestamp_start: ts,
        timestamp_end: ts,
        actor: 'system',
        squad: 'SQD-MEM',
        skill: 'MemoryLifecycle',
        module: 'memory-governance',
        entity: 'dashboard',
        action,
        input_summary: 'Automatic lifecycle event',
        output_summary: outputSummary,
        result: 'success',
        files_touched: filesTouched || []
    });
    writeControlJson(FILES.memoryRuns, data);
    return id;
}

function persistSessionArchive(session) {
    ensureDir(SESSIONS_DIR);
    const filePath = path.join(SESSIONS_DIR, `${session.id}.json`);
    writeText(filePath, `${JSON.stringify(session, null, 2)}\n`);
}

function loadSessionArchives() {
    ensureDir(SESSIONS_DIR);
    const entries = fs.readdirSync(SESSIONS_DIR)
        .filter(name => name.toLowerCase().endsWith('.json'))
        .map(name => path.join(SESSIONS_DIR, name))
        .map(full => {
            try {
                return JSON.parse(fs.readFileSync(full, 'utf8'));
            } catch (_) {
                return null;
            }
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.started_at || b.ended_at || 0).getTime() - new Date(a.started_at || a.ended_at || 0).getTime());
    return entries;
}

function listMemoryFilesPayload() {
    const registry = loadMemoryRegistry();
    const canonicalSet = new Set(registry.canonical_files.map(normalizePathForJson));
    const trackedSet = new Set(registry.tracked_files.map(normalizePathForJson));
    const trackedUnique = [...trackedSet].filter(p => !canonicalSet.has(p));
    const sessions = loadSessionArchives();
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;

    const sessions24h = sessions
        .filter(s => {
            const ref = new Date(s.ended_at || s.started_at || 0).getTime();
            return Number.isFinite(ref) && now - ref <= oneDayMs;
        })
        .map(s => ({
            id: s.id,
            started_at: s.started_at || null,
            ended_at: s.ended_at || null,
            checkpoint_id: s.checkpoint_id || null,
            status: s.status || 'closed',
            path: `docs/control/sessions/${s.id}.json`
        }));

    return {
        canonical_files: registry.canonical_files.map(fileStatView),
        tracked_files: trackedUnique.map(fileStatView),
        sessions_last_24h: sessions24h,
        sessions_total: sessions.length,
        registry
    };
}

function loadMemoryLayers() {
    return {
        current_state: ensureControlJson(FILES.memoryState, {}),
        open_loops: ensureControlJson(FILES.memoryLoops, { items: [] }),
        checkpoints: ensureControlJson(FILES.memoryCheckpoints, { items: [] }),
        decisions: ensureControlJson(FILES.memoryDecisions, { items: [] }),
        execution_journal: ensureControlJson(FILES.memoryRuns, { items: [] }),
        artifact_index: ensureControlJson(FILES.memoryArtifacts, { items: [] })
    };
}

function contextFlash() {
    const layers = loadMemoryLayers();
    const registry = ensureControlJson('registry.json', { squads: [], agents: [], personas: [] });
    const latestCheckpoint = asArray(layers.checkpoints.items).slice(-1)[0] || null;
    const latestDecision = asArray(layers.decisions.items).filter(item => item.status === 'active').slice(-1)[0]
        || asArray(layers.decisions.items).slice(-1)[0]
        || null;
    const openLoops = asArray(layers.open_loops.items).filter(item => item.status !== 'closed');
    return {
        project: layers.current_state.project || 'SommersStore',
        active_goal: layers.current_state.active_goal || null,
        active_task: layers.current_state.active_task || null,
        build_phase: layers.current_state.build_phase || null,
        ops_stage: layers.current_state.ops_stage || null,
        latest_checkpoint_id: latestCheckpoint ? latestCheckpoint.id : null,
        latest_checkpoint_next_action: latestCheckpoint ? latestCheckpoint.next_exact_action || null : null,
        latest_active_decision_id: latestDecision ? latestDecision.id : null,
        open_loops_count: openLoops.length,
        open_loop_ids: openLoops.slice(0, 8).map(item => item.id),
        tracked_files: asArray(registry.tracked_files).slice(0, 20)
    };
}

function runSessionStart(body) {
    const state = ensureControlJson(FILES.session, { current_session: null, history: [] });
    const payloadProjectId = normalizeProjectId(body.project_id || null);
    if (state.current_session && state.current_session.status === 'active' && !body.force_new) {
        const lastSeen = state.current_session.last_seen_at || state.current_session.started_at;
        const inactiveMs = Date.now() - new Date(lastSeen).getTime();
        const stale = Number.isFinite(inactiveMs) && inactiveMs > 1000 * 60 * 20;
        if (!stale) {
            state.current_session.last_seen_at = nowIso();
            if (payloadProjectId) state.current_session.project_id = payloadProjectId;
            writeControlJson(FILES.session, state);
            return { resumed: true, session: state.current_session, context_flash: state.current_session.context_flash };
        }
        runSessionClose({
            summary: 'Sessao anterior encerrada automaticamente por inatividade/fechamento abrupto.',
            next_action: 'Retomar a partir do ultimo checkpoint automatico',
            completed_tasks: [],
            closed_by: 'system',
            project_id: payloadProjectId
        });
    }
    state.history = asArray(state.history);
    const usedIds = state.history.map(item => item.id).concat(state.current_session ? [state.current_session.id] : []);
    const sessionId = nextSerial('SES', usedIds);
    const flash = contextFlash();
    const session = {
        id: sessionId,
        status: 'active',
        started_at: nowIso(),
        started_by: body.started_by || 'dashboard',
        source: body.source || 'dashboard_auto_boot',
        model_hint: body.model_hint || 'unspecified',
        project_id: payloadProjectId,
        last_seen_at: nowIso(),
        context_flash: flash
    };
    state.current_session = session;
    writeControlJson(FILES.session, state);
    persistSessionArchive(session);

    const snapshots = ensureControlJson(FILES.snapshots, { snapshots: [] });
    snapshots.snapshots = asArray(snapshots.snapshots);
    snapshots.snapshots.push({
        id: nextSerial('CTX', snapshots.snapshots.map(item => item.id)),
        timestamp: nowIso(),
        type: 'session_start',
        session_id: sessionId,
        context_flash: flash
    });
    writeControlJson(FILES.snapshots, snapshots);

    appendExecutionLog(
        'session_start',
        sessionId,
        'Oracle startup automatico executado',
        session.started_by,
        'Context flash inicial',
        payloadProjectId
    );
    appendMemoryRun('session_start', `Sessao ${sessionId} iniciada`, [
        `docs/control/${FILES.memoryState}`,
        `docs/control/${FILES.memoryLoops}`,
        `docs/control/${FILES.memoryCheckpoints}`,
        `docs/control/${FILES.memoryDecisions}`,
        'task.md'
    ]);
    appendMemoryMutation('session_startup', `Oracle iniciou ${sessionId}`, session.started_by);

    return { resumed: false, session, context_flash: flash };
}

function updateTaskAndMemoryDocs(summary, nextAction, checkpointId) {
    const timestamp = nowIso();
    const taskRaw = readText(TASK_PATH, '# Task Board (Canonical)\n');
    const note = [
        '- [x] Sessao encerrada automaticamente',
        `- [x] Resumo: ${summary}`,
        `- [x] Proxima acao: ${nextAction || '(nao informada)'}`,
        `- [x] Checkpoint: ${checkpointId}`
    ];
    let taskUpdated = taskRaw;
    if (!taskUpdated.includes('## Done in this session')) {
        taskUpdated += '\n## Done in this session\n';
    }
    taskUpdated = taskUpdated.replace(/## Done in this session([\s\S]*?)(\n## |$)/m, (match, sectionBody, endHeading) => {
        const merged = `## Done in this session${sectionBody}\n${note.join('\n')}\n`;
        return `${merged}${endHeading}`;
    });
    taskUpdated = patchLastUpdated(taskUpdated, timestamp);
    writeText(TASK_PATH, taskUpdated.endsWith('\n') ? taskUpdated : `${taskUpdated}\n`);

    if (fs.existsSync(MEMORY_DIR)) {
        fs.readdirSync(MEMORY_DIR)
            .filter(file => file.endsWith('.md'))
            .forEach(file => {
                const full = path.join(MEMORY_DIR, file);
                let md = readText(full, '');
                if (!md.trim()) return;
                md = patchLastUpdated(md, timestamp);
                if (file === 'project_memory.md') {
                    md = setSection(md, 'Ultimo fechamento automatico', [
                        `- timestamp: ${timestamp}`,
                        `- resumo: ${summary}`,
                        `- proxima_acao: ${nextAction || '(nao informada)'}`,
                        `- checkpoint: ${checkpointId}`
                    ]);
                }
                writeText(full, md.endsWith('\n') ? md : `${md}\n`);
            });
    }
}

function runSessionClose(body) {
    const state = ensureControlJson(FILES.session, { current_session: null, history: [] });
    state.history = asArray(state.history);
    const payloadProjectId = normalizeProjectId(body.project_id || null);

    const summary = (body.summary || '').trim() || 'Sessao encerrada com organizacao automatica da memoria.';
    const nextAction = (body.next_action || '').trim();
    const current = state.current_session || {
        id: nextSerial('SES', state.history.map(item => item.id)),
        started_at: nowIso(),
        started_by: 'dashboard',
        source: 'implicit',
        status: 'active'
    };
    const closeProjectId = payloadProjectId || normalizeProjectId(current.project_id || null) || null;

    const checkpoints = ensureControlJson(FILES.memoryCheckpoints, { items: [] });
    checkpoints.items = asArray(checkpoints.items);
    const checkpointId = `CHK-MEM-${String(checkpoints.items.length + 1).padStart(4, '0')}`;
    checkpoints.items.push({
        id: checkpointId,
        timestamp: nowIso(),
        title: `Fechamento ${current.id}`,
        where_it_stopped: summary,
        completed_since_last_checkpoint: asArray(body.completed_tasks),
        do_not_repeat: ['Fechar sem checkpoint', 'Fechar sem mutacao'],
        next_exact_action: nextAction || 'Rodar startup Oracle na proxima abertura',
        active_risks: [],
        affected_files: ['task.md', 'docs/control/memory_*.json', 'docs/memory/*.md'],
        linked_loops: [],
        linked_decisions: [],
        recovery_instruction: 'Reabrir dashboard e executar startup automatico'
    });
    writeControlJson(FILES.memoryCheckpoints, checkpoints);

    const memoryState = ensureControlJson(FILES.memoryState, {});
    memoryState.last_relevant_event = summary;
    memoryState.latest_checkpoint_id = checkpointId;
    if (nextAction) {
        memoryState.active_task = nextAction;
        const existing = asArray(memoryState.next_actions).filter(item => item !== nextAction);
        memoryState.next_actions = [nextAction, ...existing].slice(0, 8);
    }
    memoryState.updated_at = nowIso();
    writeControlJson(FILES.memoryState, memoryState);

    updateTaskAndMemoryDocs(summary, nextAction, checkpointId);

    const closedSession = {
        ...current,
        status: 'closed',
        ended_at: nowIso(),
        close_summary: summary,
        next_action: nextAction || null,
        completed_tasks: asArray(body.completed_tasks),
        checkpoint_id: checkpointId,
        closed_by: body.closed_by || 'dashboard',
        model_hint: body.model_hint || current.model_hint || 'unspecified',
        project_id: closeProjectId
    };
    state.history.push(closedSession);
    state.history = state.history.slice(-120);
    state.current_session = null;
    writeControlJson(FILES.session, state);
    persistSessionArchive(closedSession);

    const snapshots = ensureControlJson(FILES.snapshots, { snapshots: [] });
    snapshots.snapshots = asArray(snapshots.snapshots);
    snapshots.snapshots.push({
        id: nextSerial('CTX', snapshots.snapshots.map(item => item.id)),
        timestamp: nowIso(),
        type: 'session_close',
        session_id: closedSession.id,
        summary,
        checkpoint_id: checkpointId
    });
    writeControlJson(FILES.snapshots, snapshots);

    appendExecutionLog(
        'session_close',
        closedSession.id,
        summary,
        closedSession.closed_by,
        'Scribe shutdown automatico',
        closeProjectId
    );
    appendMemoryRun('session_close', `Sessao ${closedSession.id} encerrada com ${checkpointId}`, [
        `docs/control/${FILES.memoryState}`,
        `docs/control/${FILES.memoryCheckpoints}`,
        `docs/control/${FILES.memoryMutations}`,
        'task.md'
    ]);
    appendMemoryMutation('session_shutdown', `Scribe encerrou ${closedSession.id}: ${summary}`, closedSession.closed_by);
    scheduleAutoCloudSync('session_close', closeProjectId);

    return { session: closedSession, checkpoint_id: checkpointId };
}

function recordMemorySyncFromPhase(kind, id, stateValue, initiatedBy, projectId = null) {
    const memoryState = ensureControlJson(FILES.memoryState, {});
    memoryState.updated_at = nowIso();
    memoryState.last_relevant_event = `${kind} ${id} => ${stateValue}`;
    if (kind === 'BUILD' && (stateValue === 'in_progress' || stateValue === 'completed')) memoryState.build_phase = id;
    if (kind === 'OPS' && (stateValue === 'in_progress' || stateValue === 'completed')) memoryState.ops_stage = id;
    writeControlJson(FILES.memoryState, memoryState);
    appendExecutionLog('memory_sync', id, `${kind} sincronizado na memoria`, initiatedBy || 'system', null, projectId || null);
}

function maybeRegisterFileMutation(relativePath, initiatedBy) {
    const normalized = String(relativePath || '').replace(/\\/g, '/').replace(/^\//, '');
    const isMemory = normalized.startsWith('docs/memory/')
        || normalized.startsWith('docs/control/memory_')
        || normalized === 'task.md';
    if (!isMemory) return false;
    appendMemoryMutation('file_save', `Arquivo de memoria salvo: ${normalized}`, initiatedBy || 'human');
    return true;
}

function registerTrackedMemoryFile(relativePath) {
    const rel = normalizePathForJson(relativePath);
    if (!rel) return false;
    const registry = loadMemoryRegistry();
    const canonical = new Set(registry.canonical_files.map(normalizePathForJson));
    if (canonical.has(rel)) return true;
    if (!registry.tracked_files.includes(rel)) {
        registry.tracked_files.push(rel);
        writeControlJson(FILES.memoryRegistry, registry);
    }
    return true;
}

function touchSessionPulse(body) {
    const state = ensureControlJson(FILES.session, { current_session: null, history: [] });
    if (!state.current_session || state.current_session.status !== 'active') {
        return { active: false };
    }
    state.current_session.last_seen_at = nowIso();
    const pulseProjectId = normalizeProjectId(body.project_id || null);
    if (pulseProjectId) state.current_session.project_id = pulseProjectId;
    if (body && typeof body.context_note === 'string' && body.context_note.trim()) {
        state.current_session.last_context_note = body.context_note.trim();
    }
    writeControlJson(FILES.session, state);
    persistSessionArchive(state.current_session);
    return { active: true, session_id: state.current_session.id };
}

function ensureBootstrapFiles() {
    ensureDir(CONTROL_DIR);
    ensureDir(SESSIONS_DIR);
    ensureDir(MEMORY_EXTRA_DIR);
    ensureControlJson(FILES.logs, { entries: [] });
    ensureControlJson(FILES.snapshots, { snapshots: [] });
    ensureControlJson(FILES.session, { current_session: null, history: [] });
    ensureControlJson(FILES.memoryMutations, { mutations: [] });
    ensureControlJson(FILES.memoryState, {});
    ensureControlJson(FILES.memoryLoops, { items: [] });
    ensureControlJson(FILES.memoryCheckpoints, { items: [] });
    ensureControlJson(FILES.memoryDecisions, { items: [] });
    ensureControlJson(FILES.memoryRuns, { items: [] });
    ensureControlJson(FILES.memoryArtifacts, { items: [] });
    ensureControlJson(FILES.memoryRegistry, {
        canonical_files: coreMemoryFiles(),
        tracked_files: []
    });
    ensureControlJson(FILES.cloudSync, cloudSyncDefaultState());
    ensureControlJson(FILES.projectFlows, { projects: {} });
    loadPersonaMaterials();
    ensureControlJson('manual_interventions.json', { entries: [] });
    ensureControlJson('approvals.json', { items: [] });
    ensureControlJson('alerts.json', { items: [] });
    ensureControlJson('incidents.json', { items: [] });
    ensureControlJson('reruns.json', { items: [] });
}

ensureBootstrapFiles();

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;

    try {
        if (pathname === '/' || pathname === '/dashboard') {
            return sendText(res, fs.readFileSync(path.join(DOCS_DIR, 'aiox_dashboard.html'), 'utf8'), 'text/html');
        }

        if (pathname === '/api/registry' && req.method === 'GET') return sendJson(res, ensureControlJson('registry.json', {}));
        if (pathname === '/api/build' && req.method === 'GET') return sendJson(res, ensureControlJson('build_state.json', { phases: [] }));
        if (pathname === '/api/ops' && req.method === 'GET') return sendJson(res, ensureControlJson('ops_state.json', { stages: [] }));
        if (pathname === '/api/approvals' && req.method === 'GET') return sendJson(res, ensureControlJson('approvals.json', { items: [] }));
        if (pathname === '/api/alerts' && req.method === 'GET') return sendJson(res, ensureControlJson('alerts.json', { items: [] }));
        if (pathname === '/api/incidents' && req.method === 'GET') return sendJson(res, ensureControlJson('incidents.json', { items: [] }));
        if (pathname === '/api/reruns' && req.method === 'GET') return sendJson(res, ensureControlJson('reruns.json', { items: [] }));
        if (pathname === '/api/logs' && req.method === 'GET') return sendJson(res, ensureControlJson(FILES.logs, { entries: [] }));
        if (pathname === '/api/commands' && req.method === 'GET') return sendJson(res, ensureControlJson('manual_interventions.json', { entries: [] }));
        if (pathname === '/api/memory' && req.method === 'GET') return sendJson(res, ensureControlJson(FILES.memoryMutations, { mutations: [] }));
        if (pathname === '/api/memory/layers' && req.method === 'GET') return sendJson(res, loadMemoryLayers());
        if (pathname === '/api/memory/files' && req.method === 'GET') return sendJson(res, listMemoryFilesPayload());
        if (pathname === '/api/personas/assets' && req.method === 'GET') return sendJson(res, buildPersonaAssetsPayload());
        if (pathname === '/api/project-flows' && req.method === 'GET') return sendJson(res, ensureControlJson(FILES.projectFlows, { projects: {} }));
        if (pathname === '/api/session' && req.method === 'GET') return sendJson(res, ensureControlJson(FILES.session, { current_session: null, history: [] }));
        if (pathname === '/api/cloud-sync/status' && req.method === 'GET') return sendJson(res, loadCloudSyncState());
        if (pathname === '/api/snapshots' && req.method === 'GET') return sendJson(res, ensureControlJson(FILES.snapshots, { snapshots: [] }));

        if (pathname === '/api/registry/personas' && req.method === 'POST') {
            const body = await parseBody(req);
            if (!body.name) return sendJson(res, { error: 'name required' }, 400);
            const registry = ensureControlJson('registry.json', {});
            registry.personas = asArray(registry.personas);
            const id = `prs-${body.name.toLowerCase().replace(/\s+/g, '-')}`;
            const persona = {
                id,
                icon: body.icon || '👤',
                name: body.name,
                role: body.role || 'Nova Persona',
                traits: body.traits || [],
                bio: body.bio || '',
                agents: body.agents || []
            };
            registry.personas.push(persona);
            writeControlJson('registry.json', registry);
            const personaDir = path.join(ROOT_DIR, '.codex', 'personas');
            ensureDir(personaDir);
            const personaFile = path.join(personaDir, `${id}.md`);
            if (!fs.existsSync(personaFile)) writeText(personaFile, `# Persona ${body.name}\n\nGuia da persona.\n`);
            return sendJson(res, { success: true, persona });
        }

        if (pathname.startsWith('/api/build/') && req.method === 'POST') {
            const phaseId = pathname.split('/')[3];
            const body = await parseBody(req);
            const data = ensureControlJson('build_state.json', { phases: [] });
            data.phases = asArray(data.phases);
            const phase = data.phases.find(item => item.id === phaseId);
            if (!phase) return sendJson(res, { error: 'phase not found' }, 404);
            const from = phase.state;
            if (body.state) phase.state = body.state;
            if (body.last_run !== undefined) phase.last_run = body.last_run;
            phase.last_run_at = nowIso();
            writeControlJson('build_state.json', data);
            appendExecutionLog(
                'state_change',
                phaseId,
                `${from} -> ${phase.state}`,
                body.initiated_by || 'human',
                null,
                body.project_id || null
            );
            recordMemorySyncFromPhase('BUILD', phaseId, phase.state, body.initiated_by || 'human', body.project_id || null);
            return sendJson(res, { success: true, phase });
        }

        if (pathname.startsWith('/api/ops/') && req.method === 'POST') {
            const stageId = pathname.split('/')[3];
            const body = await parseBody(req);
            const data = ensureControlJson('ops_state.json', { stages: [] });
            data.stages = asArray(data.stages);
            const stage = data.stages.find(item => item.id === stageId);
            if (!stage) return sendJson(res, { error: 'stage not found' }, 404);
            if (body.state) stage.state = body.state;
            if (body.last_error !== undefined) stage.last_error = body.last_error;
            writeControlJson('ops_state.json', data);
            recordMemorySyncFromPhase('OPS', stageId, stage.state, body.initiated_by || 'human', body.project_id || null);
            return sendJson(res, { success: true, stage });
        }

        if (pathname === '/api/approvals' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = ensureControlJson('approvals.json', { items: [] });
            data.items = asArray(data.items);
            if (body.action === 'create') {
                const item = {
                    id: nextSerial('APR', data.items.map(v => v.id)),
                    decision_id: body.decision_id || null,
                    phase_id: body.phase_id || null,
                    project_id: normalizeProjectId(body.project_id || null),
                    context: body.context || '',
                    status: 'pending',
                    created_at: nowIso(),
                    resolved_at: null,
                    resolved_by: null,
                    notes: null
                };
                data.items.push(item);
                writeControlJson('approvals.json', data);
                return sendJson(res, { success: true, item });
            }
            if (body.action === 'resolve') {
                const item = data.items.find(v => v.id === body.approval_id);
                if (!item) return sendJson(res, { error: 'approval not found' }, 404);
                item.status = body.verdict || 'approved';
                item.resolved_at = nowIso();
                item.resolved_by = body.resolved_by || 'human';
                item.notes = body.notes || null;
                writeControlJson('approvals.json', data);
                appendExecutionLog(
                    'approval',
                    item.decision_id || item.phase_id,
                    item.status,
                    item.resolved_by,
                    null,
                    item.project_id || normalizeProjectId(body.project_id || null)
                );
                return sendJson(res, { success: true, item });
            }
            return sendJson(res, { error: 'invalid action' }, 400);
        }

        if (pathname === '/api/alerts' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = ensureControlJson('alerts.json', { items: [] });
            data.items = asArray(data.items);
            if (body.action === 'create') {
                const item = {
                    id: nextSerial('ALT', data.items.map(v => v.id)),
                    severity: body.severity || 'medium',
                    owner: body.owner || null,
                    message: body.message || '',
                    source: body.source || null,
                    status: 'open',
                    created_at: nowIso(),
                    ack_at: null,
                    closed_at: null
                };
                data.items.push(item);
                writeControlJson('alerts.json', data);
                return sendJson(res, { success: true, item });
            }
            if (body.action === 'ack' || body.action === 'close') {
                const item = data.items.find(v => v.id === body.alert_id);
                if (!item) return sendJson(res, { error: 'alert not found' }, 404);
                if (body.action === 'ack') { item.status = 'acknowledged'; item.ack_at = nowIso(); }
                if (body.action === 'close') { item.status = 'closed'; item.closed_at = nowIso(); }
                writeControlJson('alerts.json', data);
                return sendJson(res, { success: true, item });
            }
            return sendJson(res, { error: 'invalid action' }, 400);
        }

        if (pathname === '/api/incidents' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = ensureControlJson('incidents.json', { items: [] });
            data.items = asArray(data.items);
            if (body.action === 'create') {
                const item = {
                    id: nextSerial('INC', data.items.map(v => v.id)),
                    severity: body.severity || 'medium',
                    owner: body.owner || null,
                    source_run: body.source_run || null,
                    blast_radius: body.blast_radius || null,
                    affected_nodes: body.affected_nodes || [],
                    affected_artifacts: body.affected_artifacts || [],
                    recovery_path: body.recovery_path || null,
                    description: body.description || '',
                    status: 'open',
                    ack_required: true,
                    created_at: nowIso(),
                    resolved_at: null
                };
                data.items.push(item);
                writeControlJson('incidents.json', data);
                return sendJson(res, { success: true, item });
            }
            if (body.action === 'resolve') {
                const item = data.items.find(v => v.id === body.incident_id);
                if (!item) return sendJson(res, { error: 'incident not found' }, 404);
                item.status = 'resolved';
                item.resolved_at = nowIso();
                item.resolution = body.resolution || null;
                writeControlJson('incidents.json', data);
                return sendJson(res, { success: true, item });
            }
            return sendJson(res, { error: 'invalid action' }, 400);
        }

        if (pathname === '/api/reruns' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = ensureControlJson('reruns.json', { items: [] });
            data.items = asArray(data.items);
            const item = {
                id: nextSerial('RERUN', data.items.map(v => v.id)),
                parent_run_id: body.parent_run_id || null,
                initiated_by: body.initiated_by || 'human',
                reason: body.reason || '',
                scope: body.scope || 'node',
                target_id: body.target_id || null,
                context_snapshot_id: nextSerial('CTX', []),
                memory_policy: body.memory_policy || 'inherit',
                approval_required: Boolean(body.approval_required),
                status: 'queued',
                created_at: nowIso()
            };
            data.items.push(item);
            writeControlJson('reruns.json', data);
            return sendJson(res, { success: true, item });
        }

        if (pathname === '/api/logs' && req.method === 'POST') {
            const body = await parseBody(req);
            const id = appendExecutionLog(
                body.type || 'execution',
                body.target || null,
                body.details || null,
                body.initiated_by || 'system',
                body.why_this_ran || null,
                body.project_id || null
            );
            return sendJson(res, { success: true, entry: { id } });
        }

        if (pathname === '/api/commands' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = ensureControlJson('manual_interventions.json', { entries: [] });
            data.entries = asArray(data.entries);
            const entry = {
                id: nextSerial('CMD', data.entries.map(v => v.id)),
                issued_by: body.issued_by || '[HUMAN_OWNER_PENDING]',
                target_scope: body.target_scope || 'node',
                target_id: body.target_id || null,
                project_id: normalizeProjectId(body.project_id || null),
                action: body.action || 'annotate',
                payload: body.payload || {},
                approval_required: Boolean(body.approval_required),
                timestamp: nowIso()
            };
            data.entries.push(entry);
            writeControlJson('manual_interventions.json', data);
            appendExecutionLog('manual_intervention', entry.target_id, entry.action, 'human', null, entry.project_id);
            return sendJson(res, { success: true, entry });
        }

        if (pathname === '/api/memory/mutate' && req.method === 'POST') {
            const body = await parseBody(req);
            appendMemoryMutation(body.memory_scope || 'manual', body.diff_summary || 'Mutacao manual registrada', body.mutated_by || 'human');
            scheduleAutoCloudSync('memory_mutation_manual', body.project_id || null);
            return sendJson(res, { success: true });
        }

        if (pathname === '/api/memory/files/register' && req.method === 'POST') {
            const body = await parseBody(req);
            const filePath = normalizePathForJson(body.path || '');
            if (!filePath) return sendJson(res, { error: 'path required' }, 400);
            const absolute = safeWorkspacePath(filePath);
            if (!fs.existsSync(absolute)) return sendJson(res, { error: 'file not found' }, 404);
            registerTrackedMemoryFile(filePath);
            appendMemoryMutation('memory_registry', `Arquivo registrado para leitura de memoria: ${filePath}`, body.by || 'human');
            scheduleAutoCloudSync('memory_file_register', body.project_id || null);
            return sendJson(res, { success: true, path: filePath });
        }

        if (pathname === '/api/memory/files/create' && req.method === 'POST') {
            const body = await parseBody(req);
            const baseName = String(body.file_name || '').trim();
            if (!baseName) return sendJson(res, { error: 'file_name required' }, 400);
            const ext = (body.type === 'json' ? '.json' : '.md');
            const safeName = baseName.toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'memory-note';
            const relPath = normalizePathForJson(`docs/control/memory_extra/${safeName}${ext}`);
            const absolute = safeWorkspacePath(relPath);
            if (fs.existsSync(absolute)) return sendJson(res, { error: 'file already exists', path: relPath }, 409);
            const initialContent = ext === '.json'
                ? `${JSON.stringify({ title: baseName, created_at: nowIso(), notes: [] }, null, 2)}\n`
                : `# ${baseName}\n\n- created_at: ${nowIso()}\n- notes:\n`;
            writeText(absolute, initialContent);
            registerTrackedMemoryFile(relPath);
            appendMemoryMutation('memory_registry', `Novo arquivo de memoria criado: ${relPath}`, body.by || 'human');
            scheduleAutoCloudSync('memory_file_create', body.project_id || null);
            return sendJson(res, { success: true, path: relPath });
        }

        if (pathname === '/api/session/start' && req.method === 'POST') {
            const body = await parseBody(req);
            return sendJson(res, { success: true, ...runSessionStart(body) });
        }

        if (pathname === '/api/session/close' && req.method === 'POST') {
            const body = await parseBody(req);
            return sendJson(res, { success: true, ...runSessionClose(body) });
        }

        if (pathname === '/api/session/pulse' && req.method === 'POST') {
            const body = await parseBody(req);
            return sendJson(res, { success: true, ...touchSessionPulse(body) });
        }

        if (pathname === '/api/cloud-sync/auto' && req.method === 'POST') {
            const body = await parseBody(req);
            const state = loadCloudSyncState();
            state.auto_sync_memory = Boolean(body.enabled);
            writeCloudSyncState(state);
            return sendJson(res, { success: true, auto_sync_memory: state.auto_sync_memory });
        }

        if (pathname === '/api/cloud-sync/run' && req.method === 'POST') {
            const body = await parseBody(req);
            const target = ['all', 'github', 'firebase'].includes(body.target) ? body.target : 'all';
            const scope = ['memory', 'all'].includes(body.scope) ? body.scope : 'memory';
            const result = await runCloudSyncJob({
                target,
                scope,
                trigger: body.trigger || 'manual',
                initiated_by: body.initiated_by || 'human',
                project_id: body.project_id || null,
                commit_message: body.commit_message || null
            });
            return sendJson(res, { success: true, ...result });
        }

        if (pathname.startsWith('/api/file') && req.method === 'GET') {
            const relative = decodeURIComponent(url.searchParams.get('path') || '');
            try {
                const absolute = safeWorkspacePath(relative);
                return sendText(res, fs.readFileSync(absolute, 'utf8'));
            } catch (error) {
                return sendText(res, `Erro ao ler arquivo: ${error.message}`, 'text/plain', 404);
            }
        }

        if (pathname === '/api/save' && req.method === 'POST') {
            const body = await parseBody(req);
            if (!body.path) return sendJson(res, { error: 'path required' }, 400);
            const normalizedPath = normalizePathForJson(body.path);
            const absolute = safeWorkspacePath(normalizedPath);
            writeText(absolute, body.content || '');
            if (normalizedPath.startsWith('docs/control/memory_extra/')) {
                registerTrackedMemoryFile(normalizedPath);
            }
            const isMemoryFile = maybeRegisterFileMutation(normalizedPath, body.initiated_by || 'human');
            const autoCloud = isMemoryFile ? scheduleAutoCloudSync('memory_file_save', body.project_id || null) : { scheduled: false };
            return sendJson(res, {
                success: true,
                memory_file: Boolean(isMemoryFile),
                cloud_sync_scheduled: Boolean(autoCloud.scheduled)
            });
        }

        const staticPath = path.join(DOCS_DIR, pathname);
        if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
            const ext = path.extname(staticPath);
            const mime = {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml'
            };
            return sendText(res, fs.readFileSync(staticPath), mime[ext] || 'application/octet-stream');
        }

        res.writeHead(404);
        return res.end(`Not found: ${pathname}`);
    } catch (error) {
        console.error('Server error:', error);
        return sendJson(res, { error: error.message }, 500);
    }
});

server.listen(PORT, () => {
    console.log(`Anti-Gravity Tower online: http://localhost:${PORT}`);
});
