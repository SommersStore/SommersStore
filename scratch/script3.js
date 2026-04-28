
function formatDatePt(value) {
    if (!value) return '-';
    try { return new Date(value).toLocaleString('pt-BR'); } catch (_) { return value; }
}

function latestMemorySaveTs() {
    const allFiles = []
        .concat(MEMORY_FILES.canonical_files || [])
        .concat(MEMORY_FILES.tracked_files || []);
    const stamps = allFiles.map(f => new Date(f.modified_at || 0).getTime()).filter(v => Number.isFinite(v) && v > 0);
    return stamps.length ? new Date(Math.max(...stamps)).toISOString() : null;
}

function renderMemoryModeBoard() {
    const canvas = document.getElementById('memory-board-canvas');
    const svg = document.getElementById('memory-board-svg');
    if (!canvas || !svg) return;

    const filesByName = {};
    (MEMORY_FILES.canonical_files || []).forEach(f => { if (f && f.name) filesByName[f.name] = f; });
    const nodeDefs = [
        { id: 'state', key: 'memory_current_state.json', title: 'Estado Atual', color: '#14b8a6', x: 70, y: 150, info: 'Contexto vivo do projeto' },
        { id: 'loops', key: 'memory_open_loops.json', title: 'Loops Pendentes', color: '#a855f7', x: 380, y: 40, info: 'Pendencias abertas para retomar' },
        { id: 'decisions', key: 'memory_decision_log.json', title: 'Decisoes', color: '#38bdf8', x: 380, y: 260, info: 'Escolhas e racional tecnico' },
        { id: 'execution', key: 'memory_execution_journal.json', title: 'Execucoes', color: '#22c55e', x: 700, y: 40, info: 'Rastro de execucao por sessao' },
        { id: 'checkpoints', key: 'memory_checkpoints.json', title: 'Checkpoint', color: '#f59e0b', x: 700, y: 260, info: 'Onde parou e como retomar' },
        { id: 'mutations', key: 'memory_mutations.json', title: 'Mutacoes', color: '#ef4444', x: 1030, y: 150, info: 'Auditoria de alteracoes' }
    ].map(n => {
        const file = filesByName[n.key] || {
            path: `docs/control/${n.key}`,
            name: n.key,
            modified_at: null,
            bytes: 0
        };
        return { ...n, file };
    });

    canvas.innerHTML = nodeDefs.map(n => `
        <button class="memory-node" style="left:${n.x}px;top:${n.y}px;border-color:${n.color}55" onclick="openEditorModal('${n.file.path}','${n.title}')">
            <div class="mb-1"><span class="memory-dot" style="background:${n.color}"></span><span class="memory-node-title">${n.title}</span></div>
            <div class="memory-node-meta">${n.info}</div>
            <div class="memory-node-meta mt-2">Arquivo: ${n.file.name}</div>
            <div class="memory-node-meta">Atualizado: ${formatDatePt(n.file.modified_at)}</div>
        </button>
    `).join('');

    const edges = [
        ['state', 'loops'],
        ['state', 'decisions'],
        ['loops', 'execution'],
        ['decisions', 'checkpoints'],
        ['execution', 'mutations'],
        ['checkpoints', 'mutations']
    ];

    svg.setAttribute('viewBox', '0 0 1500 440');
    svg.innerHTML = '';
    const idx = {};
    nodeDefs.forEach(n => { idx[n.id] = n; });
    edges.forEach(([fromId, toId]) => {
        const from = idx[fromId];
        const to = idx[toId];
        if (!from || !to) return;
        const x1 = from.x + 240;
        const y1 = from.y + 74;
        const x2 = to.x;
        const y2 = to.y + 74;
        const cx = (x1 + x2) / 2;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'rgba(168,85,247,0.26)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-dasharray', '7 5');
        svg.appendChild(path);
    });
}

function renderSessionStatus() {
    ensureMemoryLifecycleUI();
    const current = SESSION_STATE.current_session;
    const last = (SESSION_STATE.history || []).slice(-1)[0] || null;
    const active = current && current.status === 'active';
    const status = document.getElementById('session-status-badge');
    if (status) {
        status.textContent = active ? 'ATIVA' : 'IDLE';
        status.className = active
            ? 'text-sm font-black text-secondary'
            : 'text-sm font-black text-muted';
    }
    const context = current ? current.context_flash || {} : (MEMORY_LAYERS.current_state || {});
    const flash = document.getElementById('memory-current-flash');
    if (flash) {
        const checkpointLabel = context.latest_raw_checkpoint_id && context.latest_raw_checkpoint_id !== context.latest_checkpoint_id
            ? `${context.latest_checkpoint_id || '-'} (base: ${context.latest_raw_checkpoint_id})`
            : (context.latest_checkpoint_id || '-');
        flash.innerHTML = [
            ['Projeto', context.project || '-'],
            ['Objetivo ativo', context.active_goal || '-'],
            ['Tarefa ativa', context.active_task || '-'],
            ['Build phase', context.build_phase || '-'],
            ['Ops stage', context.ops_stage || '-'],
            ['Checkpoint', checkpointLabel],
            ['Proxima acao', context.latest_checkpoint_next_action || '-'],
            ['Loops abertos', context.open_loops_count != null ? context.open_loops_count : '-']
        ].map(([k, v]) => `<div class=\"flex justify-between gap-3 py-1 border-b border-white/5\"><span class=\"text-muted\">${k}</span><span class=\"text-white text-right\">${v}</span></div>`).join('');
    }
    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const checkpoint = context.latest_checkpoint_id || ((MEMORY_LAYERS.current_state || {}).latest_checkpoint_id) || '-';
    setTxt('memory-last-save', formatDatePt(latestMemorySaveTs()));
    setTxt('memory-active-session', active ? current.id : 'Sem sessao ativa');
    setTxt('memory-latest-checkpoint', checkpoint || '-');
    setTxt('session-active-id', active ? current.id : '-');
    setTxt('session-model-hint', active ? (current.model_hint || '-') : (last && last.model_hint ? last.model_hint : '-'));
    setTxt('session-last-start', active ? formatDatePt(current.started_at) : (last ? formatDatePt(last.started_at) : '-'));
    setTxt('session-last-close', last ? formatDatePt(last.ended_at) : '-');
}

function renderCloudSyncStatus() {
    const state = window.CLOUD_SYNC_STATE || {};
    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const normalize = (value) => String(value || '-').toUpperCase();

    setTxt('cloud-status', normalize(state.last_status || (state.in_progress ? 'running' : 'idle')));
    setTxt('cloud-last-save', formatDatePt(state.last_completed_at || state.last_started_at));
    setTxt('cloud-github-status', normalize((state.github && state.github.status) || 'idle'));
    setTxt('cloud-firebase-status', normalize((state.firebase && state.firebase.status) || 'idle'));
    setTxt('cloud-summary', state.last_summary || 'Sem execucao.');

    const banner = document.getElementById('cloud-sync-banner');
    const bannerTitle = document.getElementById('cloud-banner-title');
    const bannerSubtitle = document.getElementById('cloud-banner-subtitle');
    const bannerTime = document.getElementById('cloud-banner-time');
    const status = String(state.last_status || 'idle').toLowerCase();
    const running = Boolean(state.in_progress);

    if (banner) {
        banner.style.borderColor = running ? 'rgba(56,189,248,0.45)'
            : status === 'success' ? 'rgba(34,197,94,0.45)'
            : status === 'error' ? 'rgba(239,68,68,0.45)'
            : status === 'partial' ? 'rgba(245,158,11,0.45)'
            : 'rgba(255,255,255,0.12)';
        banner.style.background = running ? 'rgba(8,25,45,0.45)'
            : status === 'success' ? 'rgba(8,32,18,0.45)'
            : status === 'error' ? 'rgba(40,12,12,0.45)'
            : status === 'partial' ? 'rgba(48,30,8,0.45)'
            : 'rgba(0,0,0,0.2)';
    }
    if (bannerTitle) bannerTitle.textContent = `Cloud Sync: ${running ? 'EM EXECUCAO' : normalize(status)}`;
    if (bannerSubtitle) bannerSubtitle.textContent = state.last_summary || 'Sem sincronizacao executada.';
    if (bannerTime) bannerTime.textContent = formatDatePt(state.last_completed_at || state.last_started_at);

    const autoToggle = document.getElementById('cloud-auto-sync-toggle');
    if (autoToggle) autoToggle.checked = Boolean(state.auto_sync_memory);

    const disableActions = running;
    ['btn-save-all-main', 'btn-save-all-master'].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.disabled = disableActions;
        btn.style.opacity = disableActions ? '0.55' : '1';
        btn.style.cursor = disableActions ? 'not-allowed' : 'pointer';
    });
}

window.toggleCloudAutoSync = async function(enabled) {
    try {
        const res = await fetch('/api/cloud-sync/auto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enabled: Boolean(enabled) })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha ao atualizar auto-sync');
        await loadAllData();
        renderMemory();
    } catch (e) {
        alert(`Nao foi possivel alterar auto-sync: ${e.message}`);
        await loadAllData();
        renderMemory();
    }
};

window.toggleMemoryAdvanced = function() {
    const blocks = Array.from(document.querySelectorAll('.memory-advanced-section'));
    if (!blocks.length) return;
    const hidden = blocks.every(el => el.classList.contains('memory-advanced-hidden'));
    blocks.forEach(el => {
        if (hidden) el.classList.remove('memory-advanced-hidden');
        else el.classList.add('memory-advanced-hidden');
    });
};

window.runCloudSync = async function(target = 'all', scope = 'memory') {
    try {
        const syncState = window.CLOUD_SYNC_STATE || {};
        if (syncState.in_progress) {
            alert('Ja existe uma sincronizacao em andamento. Aguarde concluir.');
            return;
        }
        window.CLOUD_SYNC_STATE = Object.assign({}, syncState, {
            in_progress: true,
            last_status: 'running',
            last_summary: 'Sincronizacao iniciada... aguarde.',
            last_started_at: new Date().toISOString()
        });
        renderCloudSyncStatus();
        const res = await fetch('/api/cloud-sync/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                target,
                scope,
                trigger: 'memory_panel',
                initiated_by: 'human',
                project_id: getSessionProjectId()
            })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha na sincronizacao');
        await loadAllData();
        renderMemory();
        if (data.queued) {
            alert('Sincronizacao ja estava em andamento. Seu pedido entrou na fila.');
        } else {
            alert(`Cloud sync concluido: ${String(data.status || 'ok').toUpperCase()}`);
        }
    } catch (e) {
        window.CLOUD_SYNC_STATE = Object.assign({}, window.CLOUD_SYNC_STATE || {}, {
            in_progress: false,
            last_status: 'error',
            last_summary: `Falha na sincronizacao: ${e.message}`
        });
        renderCloudSyncStatus();
        alert(`Erro ao sincronizar nuvem: ${e.message}`);
    }
};

window.saveAllNow = async function() {
    try {
        const syncState = window.CLOUD_SYNC_STATE || {};
        if (syncState.in_progress) {
            alert('Ja existe uma sincronizacao em andamento. Aguarde concluir.');
            return;
        }

        const currentTask = ((window.MEMORY_LAYERS || {}).current_state || {}).active_task || '';
        const currentGoal = ((window.MEMORY_LAYERS || {}).current_state || {}).active_goal || '';
        const summary = currentTask || currentGoal || 'Sessao encerrada pelo painel.';
        const nextAction = currentTask || '';

        window.CLOUD_SYNC_STATE = Object.assign({}, syncState, {
            in_progress: true,
            last_status: 'running',
            last_summary: 'Salvando checkpoint e sincronizando tudo na nuvem...',
            last_started_at: new Date().toISOString()
        });
        renderCloudSyncStatus();

        const res = await fetch('/api/cloud-sync/save-all', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                summary: summary,
                next_action: nextAction,
                completed_tasks: [],
                closed_by: 'human',
                model_hint: 'dashboard',
                trigger: 'save_all_one_click',
                project_id: getSessionProjectId()
            })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha no salvar tudo');

        await loadAllData();
        renderMemory();
        if (typeof renderMasterHub === 'function') renderMasterHub();
        if (typeof renderStatus === 'function') renderStatus();
        const cp = data.checkpoint_id || '-';
        const cloudStatus = data.cloud && data.cloud.status ? String(data.cloud.status).toUpperCase() : 'OK';
        alert(`Tudo salvo. Checkpoint: ${cp}. Cloud: ${cloudStatus}.`);
    } catch (e) {
        window.CLOUD_SYNC_STATE = Object.assign({}, window.CLOUD_SYNC_STATE || {}, {
            in_progress: false,
            last_status: 'error',
            last_summary: `Falha no Salvar Tudo: ${e.message}`
        });
        renderCloudSyncStatus();
        alert(`Erro no Salvar Tudo na Nuvem: ${e.message}`);
    }
};

window.runStartupRecoverySilent = async function() {
    return;
};

function getSessionProjectId() {
    return normalizeMasterProjectId(window.MASTER_PROJECT) || null;
}

window.startSessionRoutine = async function(manual = true) {
    try {
        const res = await fetch('/api/session/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                started_by: manual ? 'human' : 'dashboard',
                source: manual ? 'dashboard_manual_start' : 'dashboard_auto_boot',
                model_hint: 'dashboard',
                project_id: getSessionProjectId()
            })
        });
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || 'Erro no servidor: ' + res.status);
        }
        const payload = await res.json().catch(() => ({}));
        const brief = payload && payload.startup_brief ? payload.startup_brief : null;
        await loadAllData();
        renderMemory();
        renderStatus();
        if (brief) {
            window.ORACLE_STARTUP_BRIEF = brief;
        }
        const startupMsg = brief
            ? `Contexto Oracle carregado.\nCheckpoint: ${brief.checkpoint_id || '-'}\nProxima acao: ${brief.next_action || '-'}`
            : 'Startup Oracle concluido com sucesso.';
        if (manual) alert(startupMsg);
    } catch (e) {
        console.error('Session Startup Error:', e);
        alert('Falha ao executar startup Oracle. Verifique o console para detalhes.');
    }
};

window.closeSessionRoutine = async function() {
    const summary = (document.getElementById('session-close-summary') || {}).value || '';
    const nextAction = (document.getElementById('session-next-action') || {}).value || '';
    const tasksRaw = (document.getElementById('session-completed-tasks') || {}).value || '';
    const completedTasks = tasksRaw.split('\n').map(v => v.trim()).filter(Boolean);
    const effectiveSummary = summary.trim() || 'Encerramento automatico pelo painel (sem resumo manual).';
    try {
        const res = await fetch('/api/session/close', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                summary: effectiveSummary,
                next_action: nextAction.trim(),
                completed_tasks: completedTasks,
                closed_by: 'human',
                model_hint: 'dashboard',
                project_id: getSessionProjectId()
            })
        });
        const payload = await res.json();
        await loadAllData();
        renderMemory();
        renderStatus();
        alert(`Shutdown Scribe concluido. Checkpoint: ${payload.checkpoint_id || '-'}`);
    } catch (e) {
        console.error(e);
        alert('Falha ao executar shutdown Scribe.');
    }
};

window.sessionPulse = async function(contextNote = '') {
    try {
        await fetch('/api/session/pulse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                context_note: contextNote || '',
                project_id: getSessionProjectId()
            })
        });
    } catch (_) {}
};

function buildAutoClosePayload(reason) {
    const summaryField = (document.getElementById('session-close-summary') || {}).value || '';
    const nextAction = (document.getElementById('session-next-action') || {}).value || '';
    const tasksRaw = (document.getElementById('session-completed-tasks') || {}).value || '';
    const completedTasks = tasksRaw.split('\n').map(v => v.trim()).filter(Boolean);
    return {
        summary: summaryField.trim() || `Encerramento automatico (${reason}).`,
        next_action: nextAction.trim(),
        completed_tasks: completedTasks,
        closed_by: 'system',
        model_hint: 'dashboard',
        project_id: getSessionProjectId()
    };
}

function sendAutoClose(reason) {
    const payload = JSON.stringify(buildAutoClosePayload(reason));
    if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/session/close', blob);
        return;
    }
    fetch('/api/session/close', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: payload
    }).catch(() => {});
}

function renderMemoryFileLine(file, icon = 'file-json') {
    const modified = file && file.modified_at ? formatDatePt(file.modified_at) : '-';
    const size = file && typeof file.bytes === 'number' ? `${file.bytes}b` : '-';
    const path = file && file.path ? file.path : '';
    if (!path) return '';
    return `<button class=\"w-full text-left px-2 py-2 rounded border border-white/10 hover:border-primary/30 hover:bg-white/5\" onclick=\"openEditorModal('${path}','${file.name || path}')\"><div class=\"flex items-center justify-between gap-2\"><span class=\"text-[10px] text-white truncate\">${file.name || path}</span><span class=\"text-[8px] text-muted\">${size}</span></div><div class=\"text-[8px] text-muted truncate\">${path}</div><div class=\"text-[8px] text-primary\">Editar arquivo</div><div class=\"text-[8px] text-muted\">${modified}</div></button>`;
}

function renderSessions24h() {
    const list = document.getElementById('memory-sessions-24h');
    const count = document.getElementById('memory-sessions-count');
    if (count) count.textContent = `${(MEMORY_FILES.sessions_last_24h || []).length} em 24h`;
    if (!list) return;
    const sessions = (MEMORY_FILES.sessions_last_24h || []);
    if (!sessions.length) {
        list.innerHTML = '<p class=\"text-[10px] text-muted italic\">Nenhuma sessao nas ultimas 24h.</p>';
        return;
    }
    list.innerHTML = sessions.map(s => `
        <button class=\"memory-session-item w-full text-left hover:border-sky/30\" onclick=\"openEditorModal('${s.path}','Sessao ${s.id}')\">
            <div class=\"flex justify-between items-center mb-1\">
                <span class=\"text-[10px] text-white font-mono\">${s.id}</span>
                <span class=\"badge ${s.status === 'closed' ? 'state-completed' : 'state-in_progress'}\" style=\"font-size:7px\">${s.status}</span>
            </div>
            <div class=\"text-[9px] text-muted\">Inicio: ${formatDatePt(s.started_at)}</div>
            <div class=\"text-[9px] text-muted\">Fim: ${formatDatePt(s.ended_at)}</div>
            <div class=\"text-[9px] text-muted\">Checkpoint: ${s.checkpoint_id || '-'}</div>
        </button>
    `).join('');
}

function renderMemoryFiles() {
    const coreNode = document.getElementById('memory-files-core');
    const extraNode = document.getElementById('memory-files-extra');
    if (coreNode) {
        const core = MEMORY_FILES.canonical_files || [];
        coreNode.innerHTML = core.length ? core.map(f => renderMemoryFileLine(f, 'file-json')).join('') : '<p class=\"text-[10px] text-muted italic\">Sem arquivos core.</p>';
    }
    if (extraNode) {
        const extra = MEMORY_FILES.tracked_files || [];
        extraNode.innerHTML = extra.length ? extra.map(f => renderMemoryFileLine(f, 'file-text')).join('') : '<p class=\"text-[10px] text-muted italic\">Nenhum arquivo extra registrado.</p>';
    }
}

window.createMemoryExtraFile = async function() {
    const name = (document.getElementById('memory-new-file-name') || {}).value || '';
    const type = (document.getElementById('memory-new-file-type') || {}).value || 'md';
    if (!name.trim()) {
        alert('Informe um nome para o novo arquivo.');
        return;
    }
    try {
        const res = await fetch('/api/memory/files/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file_name: name.trim(), type, by: 'human' })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha ao criar arquivo');
        await loadAllData();
        renderMemory();
        openEditorModal(data.path, data.path.split('/').pop());
    } catch (e) {
        alert(`Nao foi possivel criar arquivo: ${e.message}`);
    }
};

window.registerMemoryFilePath = async function() {
    const path = (document.getElementById('memory-register-path') || {}).value || '';
    if (!path.trim()) {
        alert('Informe um caminho de arquivo para registrar.');
        return;
    }
    try {
        const res = await fetch('/api/memory/files/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: path.trim(), by: 'human' })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha ao registrar arquivo');
        await loadAllData();
        renderMemory();
    } catch (e) {
        alert(`Nao foi possivel registrar: ${e.message}`);
    }
};

window.renderMemory = function() {
    ensureMemoryLifecycleUI();
    renderMemoryModeBoard();
    renderSessions24h();
    renderMemoryFiles();

    const mutations = (MEMORY.mutations || []).slice(-30).reverse();
    const mutNode = document.getElementById('memory-mutations');
    if (mutNode) {
        mutNode.innerHTML = mutations.length ? mutations.map(m => `<div class=\"flex items-start gap-3 py-2 border-b border-white/5\"><span class=\"text-[8px] text-muted font-mono w-32 shrink-0\">${formatDatePt(m.timestamp)}</span><div><span class=\"badge border-white/10 text-muted bg-white/5\" style=\"font-size:7px\">${m.memory_scope || 'memory'}</span><p class=\"text-[9px] text-white mt-1\">${m.diff_summary || 'Mutacao registrada'}</p></div></div>`).join('') : '<p class=\"text-[10px] text-muted italic\">Nenhuma mutacao registrada.</p>';
    }

    const layersNode = document.getElementById('memory-layer-summary');
    if (layersNode) {
        const loops = (MEMORY_LAYERS.open_loops && MEMORY_LAYERS.open_loops.items) || [];
        const checkpoints = (MEMORY_LAYERS.checkpoints && MEMORY_LAYERS.checkpoints.items) || [];
        const decisions = (MEMORY_LAYERS.decisions && MEMORY_LAYERS.decisions.items) || [];
        const runs = (MEMORY_LAYERS.execution_journal && MEMORY_LAYERS.execution_journal.items) || [];
        const artifacts = (MEMORY_LAYERS.artifact_index && MEMORY_LAYERS.artifact_index.items) || [];
        layersNode.innerHTML = [
            `Loops abertos: ${loops.filter(v => v.status !== 'closed').length}`,
            `Checkpoints: ${checkpoints.length}`,
            `Decisoes: ${decisions.length}`,
            `Runs: ${runs.length}`,
            `Artefatos: ${artifacts.length}`
        ].map(line => `<div class=\"py-2 border-b border-white/5 text-[10px] text-white\">${line}</div>`).join('');
    }

    renderSessionStatus();
    renderCloudSyncStatus();
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.renderAgents = function() {
    const view = document.getElementById('agents-view');
    if (!view) return;
    const agents = REGISTRY.agents || [];
    const countEl = document.getElementById('agents-count');
    if (countEl) countEl.textContent = `${agents.length} Agentes`;
    view.innerHTML = agents.map(a => {
        const sq = (SQUAD_COLORS && SQUAD_COLORS[a.squad]) || '#6b7280';
        const filePath = `.codex/agents/${a.handle.replace('@','')}.md`;
        const title = `${a.name} - ${a.squad}`;
        return `<div class="glass p-4 cursor-pointer hover:-translate-y-0.5 transition-transform" onclick='openEditorModal(${JSON.stringify(filePath)}, ${JSON.stringify(title)})'><div class="flex items-center justify-between mb-3"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full flex items-center justify-center text-lg border border-white/10 bg-white/5">${a.icon}</div><div><h3 class="text-xs font-bold text-white">${a.name}</h3><p class="text-[9px] text-muted font-mono">${a.handle}</p></div></div><button class="btn-ghost text-primary text-[10px] py-1 px-2" onclick='event.stopPropagation();openEditorModal(${JSON.stringify(filePath)}, ${JSON.stringify(title)})'>Editar</button></div><p class="text-[10px] text-muted mb-3">${a.role}</p><span class="text-[9px] font-bold px-2 py-0.5 rounded" style="background:${sq}20;color:${sq}">${a.squad}</span></div>`;
    }).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

function personaAssetMap() {
    const map = {};
    (PERSONA_ASSETS.items || []).forEach(item => { if (item && item.persona_id) map[item.persona_id] = item; });
    return map;
}

function isPersonaEditableFile(pathValue) {
    return /\.(md|markdown|txt|json)$/i.test(String(pathValue || ''));
}

function isPersonaCleanableMarkdown(pathValue) {
    return /\.(md|markdown|txt)$/i.test(String(pathValue || ''));
}

function personaAssetRow(file) {
    if (!file || !file.path) return '';
    const editable = isPersonaEditableFile(file.path);
    const statusClass = file.exists ? 'text-secondary' : 'text-coral';
    const statusText = file.exists ? 'ok' : 'faltando';
    const hint = editable ? '' : '<span class="text-[8px] text-muted uppercase">arquivo nao editavel</span>';
    if (!editable) {
        return `<div class="w-full text-left px-2 py-2 rounded border border-white/10 mb-2"><div class="flex justify-between items-center"><span class="text-[10px] text-white truncate">${file.name || file.path}</span><span class="text-[8px] ${statusClass} uppercase">${statusText}</span></div><div class="text-[8px] text-muted truncate">${file.path}</div><div class="mt-1">${hint}</div></div>`;
    }
    return `<button class="w-full text-left px-2 py-2 rounded border border-white/10 hover:border-primary/30 hover:bg-white/5 mb-2" onclick='openEditorModal(${JSON.stringify(file.path)}, ${JSON.stringify(file.name || file.path)})'><div class="flex justify-between items-center"><span class="text-[10px] text-white truncate">${file.name || file.path}</span><span class="text-[8px] ${statusClass} uppercase">${statusText}</span></div><div class="text-[8px] text-muted truncate">${file.path}</div></button>`;
}

function personaAssetManageRow(file, personaId, kind) {
    if (!file || !file.path) return '';
    const editable = isPersonaEditableFile(file.path);
    const statusClass = file.exists ? 'text-secondary' : 'text-coral';
    const statusText = file.exists ? 'ok' : 'faltando';
    const normalizedKind = String(kind || '').toLowerCase();
    const supportsNectarFlow = file.exists && (normalizedKind === 'transcript' || normalizedKind === 'full_transcript');
    const canCleanFile = Boolean(file.exists && isPersonaCleanableMarkdown(file.path));
    const head = editable
        ? `<button class="w-full text-left" onclick='openEditorModal(${JSON.stringify(file.path)}, ${JSON.stringify(file.name || file.path)})'>
            <div class="flex justify-between items-center"><span class="text-[10px] text-white truncate">${file.name || file.path}</span><span class="text-[8px] ${statusClass} uppercase">${statusText}</span></div>
            <div class="text-[8px] text-muted truncate">${file.path}</div>
        </button>`
        : `<div class="w-full text-left">
            <div class="flex justify-between items-center"><span class="text-[10px] text-white truncate">${file.name || file.path}</span><span class="text-[8px] ${statusClass} uppercase">${statusText}</span></div>
            <div class="text-[8px] text-muted truncate">${file.path}</div>
            <div class="text-[8px] text-muted uppercase mt-1">arquivo nao editavel</div>
        </div>`;

    let actionButtons = '';
    if (!supportsNectarFlow) {
        if (!file.exists) {
            actionButtons += `<span class="text-coral text-[8px] font-bold py-1 px-2 uppercase bg-coral/10 border border-coral/20 rounded">Arquivo faltando</span>`;
        } else if (normalizedKind === 'clone') {
            actionButtons += `<span class="text-primary text-[8px] font-bold py-1 px-2 uppercase bg-primary/10 border border-primary/20 rounded">Clone alvo</span>`;
        } else {
            actionButtons += `<span class="text-muted text-[8px] font-bold py-1 px-2 uppercase bg-white/5 border border-white/10 rounded">Apenas referencia</span>`;
        }
    } else if (file.extracted) {
        actionButtons += `<span class="text-secondary text-[8px] font-bold py-1 px-2 uppercase bg-secondary/10 border border-secondary/20 rounded mr-1" title="Nectar extraido para staging">[OK Staging]</span>`;
        actionButtons += `<button class="btn-ghost text-secondary text-[9px] font-bold py-1 px-2 border border-secondary/30 mr-1" onclick='event.stopPropagation();triggerAutoGeminiExtraction(${JSON.stringify(personaId)}, ${JSON.stringify(file.path)})'>Extrair novamente</button>`;
        if (file.harmonized) {
            actionButtons += `<button class="btn-ghost text-primary text-[9px] font-bold py-1 px-2 border border-primary/30 opacity-60" disabled>Harmonizado (OK)</button>`;
        } else {
            actionButtons += `<button class="btn-ghost text-primary text-[9px] font-bold py-1 px-2 border border-primary/30" onclick='event.stopPropagation();triggerAutoGeminiHarmonize(${JSON.stringify(personaId)}, ${JSON.stringify(file.path)})'>Harmonizar agora</button>`;
        }
        actionButtons += `<button class="btn-ghost text-white/50 text-[10px] py-1 px-2 ml-1 hover:text-primary" title="Resetar status da harmonizacao" onclick='event.stopPropagation();triggerResetPersonaAssetTracking(${JSON.stringify(personaId)}, ${JSON.stringify(file.path)})'>Reset</button>`;
    } else {
        actionButtons += `<button class="btn-ghost text-secondary text-[9px] font-bold py-1 px-2 border border-secondary/30" onclick='event.stopPropagation();triggerAutoGeminiExtraction(${JSON.stringify(personaId)}, ${JSON.stringify(file.path)})'>Extrair nectar (API)</button>`;
    }
    if (canCleanFile) {
        actionButtons += `<button class="btn-ghost text-accent text-[9px] font-bold py-1 px-2 border border-accent/30" onclick='event.stopPropagation();cleanPersonaMarkdownFile(${JSON.stringify(personaId)}, ${JSON.stringify(file.path)})'>Limpar</button>`;
    }

    return `<div class="mb-2 border border-white/10 rounded p-2 hover:border-primary/30">
        ${head}
        <div class="mt-2 flex justify-end gap-1 items-center">
            ${actionButtons}
            <button class="btn-danger text-[9px] py-1 px-2" onclick='event.stopPropagation();unlinkPersonaAsset(${JSON.stringify(personaId)}, ${JSON.stringify(kind)}, ${JSON.stringify(file.path)})'>Remover</button>
        </div>
    </div>`;
}

window.linkPersonaAsset = async function(personaId, kind) {
    const kindLabel = {
        clone: 'arquivo clone (.md/.txt)',
        transcript: 'transcricao base (md/txt)',
        full_transcript: 'transcricao completa (md/txt)',
        support: 'anexo de suporte (md/txt)'
    };
    const sourcePath = prompt(`Cole o caminho do arquivo para ${kindLabel[kind] || kind}.\n\nExemplos:\n- C:/Users/ADMIN/Downloads/arquivo.md\n- knowledge/clones/transcripts/arquivo.md`);
    if (!sourcePath) return;
    const copyToLibrary = confirm('Copiar para a biblioteca padrao do projeto?\n\nOK = sim (recomendado)\nCancelar = apenas vincular caminho atual');
    try {
        const res = await fetch('/api/personas/assets/link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                persona_id: personaId,
                kind,
                source_path: sourcePath,
                copy_to_library: copyToLibrary,
                initiated_by: 'human'
            })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha ao vincular arquivo');
        await loadAllData();
        renderPersonas();
        openPersonaAssetsDrawer(personaId);
        const cleanup = data.markdown_cleanup && data.markdown_cleanup.cleaned
            ? `\n\nLimpador MD: imagens/base64 removidos automaticamente.`
            : '';
        alert(`Arquivo vinculado com sucesso em:\n${data.path}${cleanup}`);
    } catch (error) {
        alert(`Nao foi possivel vincular o arquivo: ${error.message}`);
    }
};

window.ingestPersonaUrl = async function(personaId, kind) {
    const url = prompt(`Ingerir conteudo de URL para a Persona ${personaId} (${kind}):\nCole a URL completa (http/https):`);
    if (!url) return;
    const forceAudioApi = isPersonaForceAudioApiEnabled(personaId);
    try {
        const response = await fetch('/api/personas/assets/ingest-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                persona_id: personaId,
                kind,
                url,
                force_audio_api: forceAudioApi,
                allow_audio_fallback: true
            })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success) throw new Error(data.error || 'Erro ao converter URL.');

        const modeLabel = data.mode === 'youtube_audio_api'
            ? 'Transcricao Audio (API)'
            : (data.mode === 'youtube_transcript' ? 'Transcricao YouTube' : 'Web scrape');
        alert(`URL convertida em Markdown e anexada com sucesso!\nModo: ${modeLabel}\nSalvo em: ${data.file}\nTamanho: ${data.bytes} bytes.`);
        await loadAllData();
        renderPersonas();
        openPersonaAssetsDrawer(personaId);
    } catch (err) {
        alert(err.message);
    }
};

window.linkPersonaAssetsBatch = async function(personaId, kind) {
    const kindLabel = {
        transcript: 'transcricao base (md/txt)',
        full_transcript: 'transcricao completa (md/txt)',
        support: 'anexo (md/txt)'
    };
    const raw = prompt(
        `Cole os caminhos (1 por linha) para ${kindLabel[kind] || kind}.\n\n` +
        `Exemplo:\n` +
        `knowledge/clones/transcripts/dotcom_secrets.md\n` +
        `knowledge/clones/transcripts/traffic_secrets.md`
    );
    if (!raw) return;

    const paths = [...new Set(String(raw)
        .split(/\r?\n/)
        .map(v => v.trim())
        .filter(Boolean))];
    if (!paths.length) return alert('Nenhum caminho valido informado.');

    const copyToLibrary = confirm('Copiar para a biblioteca padrao do projeto?\n\nOK = sim (recomendado)\nCancelar = apenas vincular caminhos atuais');
    const errors = [];
    let success = 0;

    for (const sourcePath of paths) {
        try {
            const res = await fetch('/api/personas/assets/link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    persona_id: personaId,
                    kind,
                    source_path: sourcePath,
                    copy_to_library: copyToLibrary,
                    initiated_by: 'human'
                })
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.error || 'Falha ao vincular');
            success += 1;
        } catch (error) {
            errors.push(`${sourcePath}: ${error.message}`);
        }
    }

    await loadAllData();
    renderPersonas();
    openPersonaAssetsDrawer(personaId);

    if (!errors.length) {
        return alert(`${success} arquivo(s) vinculado(s) com sucesso.`);
    }

    alert(
        `${success} arquivo(s) vinculado(s) com sucesso.\n` +
        `${errors.length} falha(s):\n` +
        `${errors.slice(0, 5).join('\n')}` +
        `${errors.length > 5 ? '\n...' : ''}`
    );
};

window.unlinkPersonaAsset = async function(personaId, kind, filePath) {
    const label = { clone: 'clone', transcript: 'transcricao', full_transcript: 'transcricao completa', support: 'anexo' };
    const confirmMsg = kind === 'clone'
        ? 'Tem certeza que deseja limpar o arquivo clone desta persona?'
        : `Tem certeza que deseja remover este ${label[kind] || 'arquivo'}?`;
    if (!confirm(confirmMsg)) return;
    try {
        const res = await fetch('/api/personas/assets/unlink', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                persona_id: personaId,
                kind,
                path: filePath || null,
                initiated_by: 'human'
            })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha ao remover arquivo');
        await loadAllData();
        renderPersonas();
        openPersonaAssetsDrawer(personaId);
    } catch (error) {
        alert(`Nao foi possivel remover: ${error.message}`);
    }
};

window.cleanPersonaMarkdowns = async function(personaId) {
    try {
        const res = await fetch('/api/personas/assets/clean-md', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                persona_id: personaId,
                initiated_by: 'human'
            })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha ao limpar markdowns');
        await loadAllData();
        renderPersonas();
        openPersonaAssetsDrawer(personaId);
        alert(`Limpador MD concluido.\nArquivos alterados: ${data.changed_files || 0}/${data.total_files || 0}\nBytes removidos: ${data.removed_bytes || 0}`);
    } catch (error) {
        alert(`Nao foi possivel limpar markdowns: ${error.message}`);
    }
};

window.cleanPersonaMarkdownFile = async function(personaId, sourcePath) {
    if (!sourcePath) return;
    if (!confirm('Limpar somente este arquivo (remover imagens/base64)?')) return;
    try {
        const res = await fetch('/api/personas/assets/clean-md-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                persona_id: personaId,
                source_path: sourcePath,
                initiated_by: 'human'
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha ao limpar arquivo');
        await loadAllData();
        renderPersonas();
        openPersonaAssetsDrawer(personaId);
        const changed = data.changed ? 'sim' : 'nao (ja estava limpo)';
        alert(`Limpeza concluida.\nArquivo: ${sourcePath}\nAlterado: ${changed}\nBytes removidos: ${data.removed_bytes || 0}`);
    } catch (error) {
        alert(`Nao foi possivel limpar este arquivo: ${error.message}`);
    }
};

window.triggerResetPersonaAssetTracking = async function(personaId, sourcePath) {
    if (!confirm('Resetar o status de harmonizacao deste arquivo?')) return;
    try {
        const res = await fetch('/api/personas/assets/reset-tracking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                persona_id: personaId,
                source_path: sourcePath
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha ao resetar tracking');
        await loadAllData();
        renderPersonas();
        openPersonaAssetsDrawer(personaId);
    } catch (error) {
        alert(`Nao foi possivel resetar tracking: ${error.message}`);
    }
};

window.triggerAutoGeminiHarmonize = async function(personaId, sourcePath) {
    if (!confirm('A API sera acionada para gerar uma previa segura de harmonizacao.\n\nProsseguir?')) return;
    try {
        const res = await fetch('/api/personas/assets/harmonize-staging', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                persona_id: personaId,
                source_path: sourcePath
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
            if (data.audit && data.audit.review_path) openEditorModal(data.audit.review_path, 'Parecer Nectar Auditor');
            throw new Error(data.error || 'Falha ao harmonizar');
        }
        if (data.candidate_path) openEditorModal(data.candidate_path, 'Previa da harmonizacao');
        const shouldApply = confirm(
            `Previa criada.\n\nCandidato: ${data.candidate_path || '-'}\n\n` +
            'Aplicar agora na Base do clone com backup?'
        );
        let applyData = data;
        if (shouldApply) {
            applyData = await applyMasterCloneHarmonization(personaId, sourcePath, data.candidate_path);
        }
        await loadAllData();
        renderPersonas();
        openPersonaAssetsDrawer(personaId);
        alert(shouldApply
            ? `Harmonizacao aplicada.\nClone atualizado: ${applyData.clone_path || '(nao informado)'}\nBackup: ${applyData.backup_path || '-'}`
            : `Previa mantida sem alterar o clone.\nCandidato: ${data.candidate_path || '-'}`
        );
    } catch (error) {
        alert(`[ERRO DE HARMONIZACAO]: ${error.message}`);
    }
};

window.triggerAutoGeminiExtraction = async function(personaId, sourcePath) {
    if (!confirm('A API sera acionada para extrair heuristicas deste arquivo.\nO resultado ficara em staging ate voce harmonizar.\n\nProsseguir?')) return;
    try {
        const res = await fetch('/api/personas/assets/extract-heuristics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                persona_id: personaId,
                source_path: sourcePath
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) throw new Error(data.error || 'Falha ao extrair nectar');
        await loadAllData();
        renderPersonas();
        openPersonaAssetsDrawer(personaId);
        alert('Nectar extraido com sucesso e enviado para staging.\nAgora clique em "Harmonizar agora".');
    } catch (error) {
        alert(`[ERRO DE EXTRACAO]: ${error.message}`);
    }
};

window.openPersonaAssetsDrawer = function(personaId, forceRefresh = false) {
    const drawer = document.getElementById('detail-drawer');
    const drawerState = window.DETAIL_DRAWER_STATE || { kind: '', id: '' };
    const isSamePersonaOpen = Boolean(
        drawer &&
        drawer.classList.contains('open') &&
        drawerState.kind === 'persona_assets' &&
        drawerState.id === personaId
    );
    if (isSamePersonaOpen && !forceRefresh) {
        closeDrawer();
        return;
    }

    const assets = personaAssetMap()[personaId];
    if (!assets) return;
    const forceAudioApi = isPersonaForceAudioApiEnabled(personaId);
    const forceAudioClass = forceAudioApi
        ? 'border-secondary/30 text-secondary bg-secondary/10'
        : 'border-white/10 text-muted bg-white/5';
    const transcriptRows = (assets.transcript_files || []).map(file => personaAssetManageRow(file, personaId, 'transcript')).join('') || '<p class="text-[10px] text-muted italic">Sem transcricoes base.</p>';
    const fullTranscriptRows = (assets.full_transcript_files || []).map(file => personaAssetManageRow(file, personaId, 'full_transcript')).join('') || '<p class="text-[10px] text-muted italic">Sem transcricao completa em markdown.</p>';
    const supportRows = (assets.support_files || []).map(file => personaAssetManageRow(file, personaId, 'support')).join('') || '<p class="text-[10px] text-muted italic">Sem anexos adicionais.</p>';
    document.getElementById('drawer-title').textContent = `${assets.persona_name} · Arquivos Markdown`;
    document.getElementById('drawer-content').innerHTML = `
        <div class="space-y-4">
            <div class="glass p-3 border border-primary/20 bg-primary/5">
                <p class="text-[10px] text-white font-bold mb-1">Fluxo recomendado (3 etapas)</p>
                <p class="text-[9px] text-muted">1) + URL para trazer a transcricao, 2) Extrair nectar (API), 3) Harmonizar agora no clone.</p>
                <div class="mt-2 flex items-center gap-2 flex-wrap">
                    <button class="btn-ghost text-[9px] py-1 px-2 ${forceAudioClass}" onclick='togglePersonaForceAudioApi(${JSON.stringify(personaId)}, true)'>
                        Forcar Audio API: ${forceAudioApi ? 'ON' : 'OFF'}
                    </button>
                    <span class="text-[8px] text-muted">ON = sempre transcreve por audio/API. OFF = usa legenda e fallback automatico.</span>
                </div>
            </div>
            <div class="glass p-3">
                <p class="text-[9px] text-muted uppercase tracking-widest mb-2">Arquivo de Persona</p>
                ${personaAssetRow(assets.instruction_file)}
                <p class="text-[9px] text-muted uppercase tracking-widest mb-2 mt-3">Arquivo Clone</p>
                ${assets.clone_file ? personaAssetManageRow(assets.clone_file, personaId, 'clone') : '<p class="text-[10px] text-muted italic">Sem clone configurado.</p>'}
            </div>
            <div class="glass p-3 border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <p class="text-[9px] text-muted uppercase tracking-widest flex items-center gap-2">
                        <span class="inline-block w-2 h-2 rounded-full bg-primary/80"></span>
                        Transcricoes Base (MD)
                    </p>
                    <div class="flex gap-2">
                        <button class="btn-ghost text-[9px] py-1 px-2" onclick='ingestPersonaUrl(${JSON.stringify(personaId)}, "transcript")'>+ URL</button>
                        <button class="btn-ghost text-[9px] py-1 px-2" onclick='linkPersonaAsset(${JSON.stringify(personaId)}, "transcript")'>+ Arquivo</button>
                        <button class="btn-ghost text-[9px] py-1 px-2" onclick='linkPersonaAssetsBatch(${JSON.stringify(personaId)}, "transcript")'>+ Lote</button>
                    </div>
                </div>
                <p class="text-[11px] text-white mb-1">
                    Disponiveis:
                    <span class="inline-flex items-center px-2 py-0.5 rounded border border-primary/25 bg-primary/10 text-primary text-[10px] font-bold ml-1">${assets.transcript_status?.available || 0} / ${assets.transcript_status?.total || 0}</span>
                </p>
                <p class="text-[10px] text-muted mb-3">Referenciadas no clone: ${assets.transcript_status?.linked_in_clone || 0}</p>
                ${transcriptRows}
            </div>
            <div class="glass p-3 border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <p class="text-[9px] text-muted uppercase tracking-widest flex items-center gap-2">
                        <span class="inline-block w-2 h-2 rounded-full bg-secondary/80"></span>
                        Anexos Suporte (MD/TXT)
                    </p>
                    <div class="flex gap-2">
                        <button class="btn-ghost text-[9px] py-1 px-2" onclick='linkPersonaAsset(${JSON.stringify(personaId)}, "support")'>+ Arquivo</button>
                        <button class="btn-ghost text-[9px] py-1 px-2" onclick='linkPersonaAssetsBatch(${JSON.stringify(personaId)}, "support")'>+ Lote</button>
                    </div>
                </div>
                <p class="text-[11px] text-white mb-1">
                    Disponiveis:
                    <span class="inline-flex items-center px-2 py-0.5 rounded border border-secondary/25 bg-secondary/10 text-secondary text-[10px] font-bold ml-1">${assets.support_status?.available || 0} / ${assets.support_status?.total || 0}</span>
                </p>
                <p class="text-[10px] text-muted mb-3">Referenciados no clone: ${assets.support_status?.linked_in_clone || 0}</p>
                ${supportRows}
            </div>
            <div class="glass p-3 border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <p class="text-[9px] text-muted uppercase tracking-widest flex items-center gap-2">
                        <span class="inline-block w-2 h-2 rounded-full bg-coral/80"></span>
                        Transcricoes Completas (MD)
                    </p>
                    <div class="flex gap-2">
                        <button class="btn-ghost text-[9px] py-1 px-2" onclick='ingestPersonaUrl(${JSON.stringify(personaId)}, "full_transcript")'>+ URL</button>
                        <button class="btn-ghost text-[9px] py-1 px-2" onclick='linkPersonaAsset(${JSON.stringify(personaId)}, "full_transcript")'>+ Arquivo</button>
                        <button class="btn-ghost text-[9px] py-1 px-2" onclick='linkPersonaAssetsBatch(${JSON.stringify(personaId)}, "full_transcript")'>+ Lote</button>
                    </div>
                </div>
                <p class="text-[11px] text-white mb-1">
                    Disponiveis:
                    <span class="inline-flex items-center px-2 py-0.5 rounded border border-coral/25 bg-coral/10 text-coral text-[10px] font-bold ml-1">${assets.full_transcript_status?.available || 0} / ${assets.full_transcript_status?.total || 0}</span>
                </p>
                <p class="text-[10px] text-muted mb-3">Referenciadas no clone: ${assets.full_transcript_status?.linked_in_clone || 0}</p>
                ${fullTranscriptRows}
            </div>
            <div class="glass p-3">
                <div class="grid grid-cols-2 gap-2">
                    <button class="btn-ghost text-[10px]" onclick='cleanPersonaMarkdowns(${JSON.stringify(personaId)})'>Limpar MDs (imagens/base64)</button>
                    <button class="btn-ghost text-[10px]" onclick='openEditorModal(${JSON.stringify(PERSONA_ASSETS.materials_file || "docs/control/persona_materials.json")}, "persona_materials.json")'>Editar Mapa (JSON)</button>
                </div>
            </div>
        </div>`;
    window.DETAIL_DRAWER_STATE = { kind: 'persona_assets', id: personaId };
    document.getElementById('detail-drawer').classList.add('open');
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.renderPersonas = function() {
    const personas = REGISTRY.personas || [];
    const assetsByPersona = personaAssetMap();
    const count = document.getElementById('personas-count');
    const view = document.getElementById('personas-view');
    if (count) count.textContent = `${personas.length} Personas`;
    if (!view) return;
    view.innerHTML = personas.map(p => {
        const filePath = `.codex/personas/${p.id}.md`;
        const title = `Persona ${p.name}`;
        const assets = assetsByPersona[p.id] || {};
        const tTotal = (assets.transcript_status && assets.transcript_status.total) || 0;
        const tOk = (assets.transcript_status && assets.transcript_status.available) || 0;
        const fTotal = (assets.full_transcript_status && assets.full_transcript_status.total) || 0;
        const fOk = (assets.full_transcript_status && assets.full_transcript_status.available) || 0;
        const sTotal = (assets.support_status && assets.support_status.total) || 0;
        const sOk = (assets.support_status && assets.support_status.available) || 0;
        const hasGap = (tTotal > tOk) || (fTotal > fOk) || (sTotal > sOk);
        const statusBadge = hasGap ? '<span class="badge border-coral/30 text-coral bg-coral/10">anexo faltando</span>' : '<span class="badge border-secondary/30 text-secondary bg-secondary/10">anexos ok</span>';
        return `<div class="glass p-4 cursor-pointer hover:-translate-y-0.5 transition-transform" onclick='openPersonaAssetsDrawer(${JSON.stringify(p.id)})'><div class="flex items-center justify-between mb-3"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg">${p.icon || '👤'}</div><div><h4 class="text-xs font-bold text-white">${p.name}</h4><p class="text-[9px] text-primary font-bold tracking-widest">${p.role || '-'}</p></div></div><button class="btn-ghost text-primary text-[10px] py-1 px-2" onclick='event.stopPropagation();openEditorModal(${JSON.stringify(filePath)}, ${JSON.stringify(title)})'>Editar Persona</button></div><p class="text-[10px] text-muted mb-2">${p.bio || ''}</p><div class="flex flex-wrap gap-1 mb-3">${(p.traits || []).map(t => `<span class="px-1.5 py-0.5 rounded text-[8px] bg-primary/10 text-primary border border-primary/15 font-bold uppercase">${t}</span>`).join('')}</div><div class="grid grid-cols-3 gap-2 mb-3"><div class="bg-black/20 border border-white/10 rounded px-2 py-1"><p class="text-[8px] text-muted uppercase">Transcricoes</p><p class="text-[10px] text-white font-bold">${tOk}/${tTotal}</p></div><div class="bg-black/20 border border-white/10 rounded px-2 py-1"><p class="text-[8px] text-muted uppercase">MD Completo</p><p class="text-[10px] text-white font-bold">${fOk}/${fTotal}</p></div><div class="bg-black/20 border border-white/10 rounded px-2 py-1"><p class="text-[8px] text-muted uppercase">Anexos</p><p class="text-[10px] text-white font-bold">${sOk}/${sTotal}</p></div></div><div class="flex items-center justify-between">${statusBadge}<button class="btn-ghost text-[10px]" onclick='event.stopPropagation();openPersonaAssetsDrawer(${JSON.stringify(p.id)})'>Abrir Estrutura</button></div></div>`;
    }).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.syncAll = async function() {
    await loadAllData();
    renderStatus();
    const active = document.querySelector('.sb-icon.active');
    if (active && active.dataset && active.dataset.tab && active.dataset.tab !== 'status') switchTab(active.dataset.tab);
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(async () => {
        await loadAllData();
        if (!SESSION_STATE.current_session || SESSION_STATE.current_session.status !== 'active') {
            await startSessionRoutine(false);
        } else {
            renderMemory();
        }
    }, 500);
    setInterval(() => {
        const active = SESSION_STATE.current_session && SESSION_STATE.current_session.status === 'active';
        if (!active) return;
        const task = ((MEMORY_LAYERS.current_state || {}).active_task) || '';
        sessionPulse(task);
    }, 60000);
    window.addEventListener('beforeunload', () => {
        const active = SESSION_STATE.current_session && SESSION_STATE.current_session.status === 'active';
        if (!active) return;
        sendAutoClose('fechamento de aba/janela');
    });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState !== 'hidden') return;
        const active = SESSION_STATE.current_session && SESSION_STATE.current_session.status === 'active';
        if (!active) return;
        sessionPulse('background');
    });
});
