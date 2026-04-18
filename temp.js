




        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
                    colors: {
                        background: '#0a0a0f', surface: '#0d0d14', card: '#13131f',
                        border: 'rgba(255, 255, 255, 0.06)',
                        primary: '#a855f7', secondary: '#10b981', accent: '#f59e0b',
                        muted: '#6b7280', coral: '#ef4444', sky: '#0ea5e9',
                        pink: '#ec4899', teal: '#14b8a6', gold: '#C5A059'
                    }
                }
            }
        }
    


// ══════════════════════════════════════════
// STATE (loaded from API)
// ══════════════════════════════════════════
const MEMORY_SCOPES = [
    { id: 'project_memory', name: 'Projeto', desc: 'Oferta vigente, persona, prioridades, políticas.', icon: 'globe', color: '#a855f7' },
    { id: 'phase_memory', name: 'Fase', desc: 'Contexto consolidado de cada fase BUILD.', icon: 'layers', color: '#0ea5e9' },
    { id: 'node_memory', name: 'Nó', desc: 'Payload local, tentativa atual, erro anterior.', icon: 'box', color: '#14b8a6' },
    { id: 'agent_session_memory', name: 'Sessão Agente', desc: 'Contexto de trabalho do agente.', icon: 'bot', color: '#f59e0b' },
    { id: 'content_memory', name: 'Conteúdo', desc: 'Versões de copy, blocos narrativos, capítulos.', icon: 'file-text', color: '#10b981' },
    { id: 'decision_memory', name: 'Decisões', desc: 'Decisões tomadas, racional, aprovadores.', icon: 'scale', color: '#ec4899' },
    { id: 'prompt_memory', name: 'Prompts', desc: 'Prompt mestre, override temporário.', icon: 'message-square', color: '#C5A059' },
    { id: 'artifact_registry', name: 'Artefatos', desc: 'PDFs, páginas, specs, assets, links.', icon: 'archive', color: '#6366f1' },
    { id: 'incident_memory', name: 'Incidentes', desc: 'Incidentes, alertas, fallback, resolução.', icon: 'alert-triangle', color: '#ef4444' }
];

// Funnel data (legacy)
const FUNNEL_NODES = { ebook: [
    { id:'fb', title:'Facebook Ads', sub:'Tráfego pago Meta', icon:'megaphone', color:'#0ea5e9', x:60, y:40, layer:'Aquisição', status:'active' },
    { id:'ig', title:'Instagram Ads', sub:'Reels + Stories', icon:'instagram', color:'#ec4899', x:60, y:160, layer:'Aquisição' },
    { id:'org', title:'Orgânico', sub:'SEO + Conteúdo', icon:'leaf', color:'#10b981', x:60, y:280, layer:'Aquisição' },
    { id:'quiz', title:'Quiz Interativo', sub:'Segmentação do lead', icon:'help-circle', color:'#a855f7', x:340, y:80, layer:'Pré-conversão' },
    { id:'cap', title:'Página de Captura', sub:'Lead magnet', icon:'mail', color:'#14b8a6', x:340, y:220, layer:'Pré-conversão' },
    { id:'vsl', title:'VSL / Vídeo', sub:'Pitch de 2min15s', icon:'play-circle', color:'#ec4899', x:600, y:80, layer:'Conversão' },
    { id:'sales', title:'Página de Vendas', sub:'Zen Dark V3', icon:'layout', color:'#a855f7', x:600, y:230, layer:'Conversão', status:'active' },
    { id:'ck', title:'Checkout', sub:'Kiwify Integration', icon:'credit-card', color:'#10b981', x:860, y:160, layer:'Conversão' },
    { id:'ob', title:'Order Bump', sub:'+R$27', icon:'package-plus', color:'#f59e0b', x:1100, y:60, layer:'Monetização' },
    { id:'up', title:'Upsell', sub:'Oferta premium', icon:'trending-up', color:'#a855f7', x:1100, y:180, layer:'Monetização' },
    { id:'dw', title:'Downsell', sub:'Oferta alternativa', icon:'trending-down', color:'#ef4444', x:1100, y:300, layer:'Monetização' },
    { id:'ty', title:'Obrigado', sub:'Thank you + bônus', icon:'heart', color:'#ec4899', x:1360, y:80, layer:'Entrega' },
    { id:'area', title:'Área de Membros', sub:'Acesso ao conteúdo', icon:'lock', color:'#14b8a6', x:1360, y:230, layer:'Entrega' },
    { id:'pos', title:'Pós-Venda', sub:'Nutrição e suporte', icon:'message-circle', color:'#0ea5e9', x:1600, y:80, layer:'Retenção' },
    { id:'rmk', title:'Remarketing', sub:'Retargeting', icon:'repeat', color:'#f59e0b', x:1600, y:230, layer:'Retenção' }
]};
const FUNNEL_EDGES = { ebook: [['fb','quiz'],['fb','sales'],['ig','quiz'],['ig','cap'],['org','cap'],['quiz','vsl'],['quiz','sales'],['cap','vsl'],['cap','sales'],['vsl','sales'],['sales','ck'],['ck','ob'],['ck','up'],['ob','up'],['up','ty'],['up','dw'],['dw','ty'],['ty','area'],['ty','pos'],['area','pos'],['pos','rmk']] };

// ══════════════════════════════════════════
// TAB SWITCHING
// ══════════════════════════════════════════
function switchTab(tab) {
    document.querySelectorAll('.sb-icon').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const el = document.querySelector(`[data-tab="${tab}"]`);
    if (el) el.classList.add('active');
    const pane = document.getElementById('pane-' + tab);
    if (pane) pane.classList.add('active');
    // Render on switch
    if (tab === 'build') renderBuild();
    if (tab === 'ops') renderOps();
    if (tab === 'status') renderStatus();
    if (tab === 'approvals') renderApprovals();
    if (tab === 'alerts') renderAlerts();
    if (tab === 'logs') renderLogs();
    if (tab === 'reruns') renderReruns();
    if (tab === 'incidents') renderIncidents();
    if (tab === 'commands') renderCommands();
    if (tab === 'why') renderWhy();
    if (tab === 'memory') renderMemory();
    if (tab === 'squads') renderSquads();
    if (tab === 'agents') renderAgents();
    if (tab === 'skills') renderSkills();
    if (tab === 'personas') renderPersonas();
    lucide.createIcons();
}

// ══════════════════════════════════════════
// STATUS GLOBAL RENDER
// ══════════════════════════════════════════
function renderStatus() {
    const phases = BUILD_STATE.phases || [];
    const completed = phases.filter(p => p.state === 'completed').length;
    const inProgress = phases.filter(p => p.state === 'in_progress').length;
    const blocked = phases.filter(p => p.state === 'blocked').length;
    const failed = phases.filter(p => p.state === 'failed').length;
    const waiting = phases.filter(p => p.state === 'waiting_approval').length;
    const currentPhase = phases.find(p => p.state === 'in_progress') || phases.find(p => p.state !== 'completed') || {};

    document.getElementById('hdr-build-phase').textContent = currentPhase.id || '—';
    document.getElementById('hdr-alert-count').textContent = (ALERTS.items || []).filter(a => a.status === 'open').length;
    document.getElementById('hdr-approval-count').textContent = (APPROVALS.items || []).filter(a => a.status === 'pending').length;

    document.getElementById('status-kpis').innerHTML = [
        { label: 'Fases BUILD', value: `${completed}/14`, color: '#10b981' },
        { label: 'Em Progresso', value: inProgress, color: '#f59e0b' },
        { label: 'Bloqueadas', value: blocked, color: '#ef4444' },
        { label: 'Aguardando', value: waiting, color: '#a855f7' },
        { label: 'Alertas Abertos', value: (ALERTS.items || []).filter(a => a.status === 'open').length, color: '#ef4444' },
        { label: 'Agentes', value: (REGISTRY.agents || []).length, color: '#14b8a6' }
    ].map(k => `<div class="glass p-4 text-center border-t-2" style="border-top-color:${k.color}">
        <p class="text-2xl font-black text-white">${k.value}</p>
        <p class="text-[8px] text-muted font-bold uppercase tracking-widest mt-1">${k.label}</p>
    </div>`).join('');

    document.getElementById('status-build-progress').innerHTML = phases.map(p => {
        const sq = SQUAD_COLORS[p.squad] || '#6b7280';
        return `<div class="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
            <span class="text-[9px] font-mono text-muted w-16">${p.id}</span>
            <span class="text-[10px] text-white font-bold flex-1">${p.name}</span>
            <span class="badge state-${p.state}" style="font-size:8px">${p.state}</span>
        </div>`;
    }).join('');

    const chks = REGISTRY.checkpoints || [];
    document.getElementById('status-checkpoints').innerHTML = chks.map(c => `<div class="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
        <span class="text-[9px] font-mono text-muted w-14">${c.id}</span>
        <span class="text-[10px] text-white flex-1">${c.name}</span>
        <span class="badge state-${c.status === 'approved' ? 'completed' : c.status === 'in_review' ? 'in_progress' : 'draft'}" style="font-size:8px">${c.status}</span>
    </div>`).join('');

    const logs = (LOGS.entries || []).slice(-10).reverse();
    document.getElementById('status-activity').innerHTML = logs.length ? logs.map(l =>
        `<div class="flex items-center gap-3 text-[10px] py-1 border-b border-white/5 last:border-0">
            <span class="text-muted font-mono text-[8px] w-24">${new Date(l.timestamp).toLocaleString('pt-BR',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})}</span>
            <span class="badge border-white/10 text-muted bg-white/5" style="font-size:7px">${l.type}</span>
            <span class="text-white">${l.target || ''}</span>
            <span class="text-muted">${l.details || l.why_this_ran || l.verdict || ''}</span>
        </div>`
    ).join('') : '<p class="text-[10px] text-muted italic">Nenhuma atividade registrada.</p>';
}

// ══════════════════════════════════════════
// BUILD MAP RENDER
// ══════════════════════════════════════════
let buildZoom = 1;
function setBuildZoom(delta) {
    buildZoom = Math.max(0.3, Math.min(1.5, buildZoom + delta));
    const canvas = document.getElementById('build-canvas');
    const svg = document.getElementById('build-svg');
    canvas.style.transform = `scale(${buildZoom})`; canvas.style.transformOrigin = 'top left';
    svg.style.transform = `scale(${buildZoom})`; svg.style.transformOrigin = 'top left';
    document.getElementById('build-zoom-label').textContent = Math.round(buildZoom * 100) + '%';
}

function renderBuild() {
    const canvas = document.getElementById('build-canvas');
    const svg = document.getElementById('build-svg');
    if (!canvas || !svg) return;
    canvas.innerHTML = ''; svg.innerHTML = '';

    const phases = BUILD_STATE.phases || [];
    // Layout: 2 rows of 7
    const positions = {};
    phases.forEach((p, i) => {
        const row = i < 7 ? 0 : 1;
        const col = i < 7 ? i : i - 7;
        const x = 80 + col * 350;
        const y = 80 + row * 350;
        positions[p.id] = { x, y };

        const sq = SQUAD_COLORS[p.squad] || '#6b7280';
        const div = document.createElement('div');
        div.className = 'build-node';
        div.style.left = x + 'px'; div.style.top = y + 'px';
        div.onclick = () => openBuildDetail(p);
        div.innerHTML = `
            <div class="node-port port-in" style="border-color:${sq}"></div>
            <div class="node-port port-out" style="border-color:${sq}"></div>
            <div class="flex items-center gap-2 mb-2">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white" style="background:${sq}30;color:${sq}">${p.id.replace('BLD-','')}</div>
                <div class="flex-1">
                    <div class="text-[10px] font-bold text-white truncate">${p.name}</div>
                    <div class="text-[8px] text-muted font-mono">${p.squad}</div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <span class="badge state-${p.state}" style="font-size:7px">${p.state}</span>
                ${p.checkpoint ? `<span class="text-[7px] text-muted font-mono">${p.checkpoint}</span>` : ''}
            </div>
            ${p.decision_gate ? `<div class="mt-2 text-[8px] text-accent font-bold">⚡ ${p.decision_gate}</div>` : ''}
        `;
        canvas.appendChild(div);
    });

    // Draw dependency edges
    phases.forEach(p => {
        (p.depends_on || []).forEach(dep => {
            const from = positions[dep];
            const to = positions[p.id];
            if (!from || !to) return;
            const x1 = from.x + 200, y1 = from.y + 50;
            const x2 = to.x, y2 = to.y + 50;
            const mx = (x1 + x2) / 2;
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'rgba(168,85,247,0.15)');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('stroke-dasharray', '6 4');
            svg.appendChild(path);
        });
    });
    lucide.createIcons();
}

function openBuildDetail(phase) {
    const sq = SQUAD_COLORS[phase.squad] || '#6b7280';
    const agents = (phase.agents || []).map(id => { const a = (REGISTRY.agents||[]).find(x=>x.id===id); return a ? `${a.icon} ${a.name}` : id; });
    const skills = (phase.skills || []).map(id => { const cat = Object.values(REGISTRY.skills||{}).flat(); const s = cat.find(x=>x.id===id); return s ? s.name : id; });

    let html = `<div class="p-6">
        <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg" style="background:${sq}20;color:${sq}">${phase.id.replace('BLD-','')}</div>
            <div><h3 class="text-lg font-black text-white">${phase.name}</h3><p class="text-[9px] text-muted font-mono">${phase.id} · ${phase.squad}</p></div>
        </div>
        <div class="flex gap-2 mb-6">
            <span class="badge state-${phase.state}">${phase.state}</span>
            ${phase.risk ? `<span class="badge border-white/10 text-muted bg-white/5">Risco: ${phase.risk}</span>` : ''}
        </div>
        <div class="space-y-4 mb-6">
            <div><p class="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">Agentes</p><div class="flex flex-wrap gap-1">${agents.map(a=>`<span class="text-[9px] bg-white/5 border border-white/10 px-2 py-1 rounded">${a}</span>`).join('')}</div></div>
            <div><p class="text-[9px] font-bold text-secondary uppercase tracking-widest mb-1">Skills</p><div class="flex flex-wrap gap-1">${skills.map(s=>`<span class="text-[9px] bg-secondary/10 border border-secondary/20 text-secondary px-2 py-1 rounded">${s}</span>`).join('')}</div></div>
            <div><p class="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Inputs</p><p class="text-[10px] text-muted">${(phase.inputs||[]).join(' → ')}</p></div>
            <div><p class="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Outputs</p><p class="text-[10px] text-muted">${(phase.outputs||[]).join(', ')}</p></div>
            <div><p class="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Depende de</p><p class="text-[10px] text-muted">${(phase.depends_on||[]).join(', ') || 'Nenhuma'}</p></div>
            ${phase.checkpoint ? `<div><p class="text-[9px] font-bold text-accent uppercase tracking-widest mb-1">Checkpoint</p><p class="text-[10px] text-accent">${phase.checkpoint}</p></div>` : ''}
            ${phase.decision_gate ? `<div><p class="text-[9px] font-bold text-pink uppercase tracking-widest mb-1">Decision Gate</p><p class="text-[10px] text-pink">${phase.decision_gate}</p></div>` : ''}
            <div><p class="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Ações Humanas</p><div class="flex flex-wrap gap-1">${(phase.human_actions||[]).map(a=>`<span class="text-[8px] bg-white/5 text-muted px-1.5 py-0.5 rounded">${a}</span>`).join('')}</div></div>
            <div><p class="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Fallback</p><p class="text-[10px] text-coral">${phase.fallback||'—'}</p></div>
        </div>
        <div class="flex gap-2 border-t border-white/5 pt-4">
            <button class="btn-success" onclick="updateBuildState('${phase.id}','completed')">✅ Concluir</button>
            <button class="btn-primary" onclick="updateBuildState('${phase.id}','in_progress')">▶️ Iniciar</button>
            <button class="btn-danger" onclick="updateBuildState('${phase.id}','blocked')">🚫 Bloquear</button>
            <button class="btn-ghost" onclick="updateBuildState('${phase.id}','draft')">↩️ Reset</button>
        </div>
    </div>`;
    document.getElementById('drawer-title').textContent = phase.id + ' — ' + phase.name;
    document.getElementById('drawer-content').innerHTML = html;
    document.getElementById('detail-drawer').classList.add('open');
    lucide.createIcons();
}

async function updateBuildState(phaseId, newState) {
    await fetch('/api/build/' + phaseId, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ state: newState, initiated_by: 'human', reason: 'Manual state change' }) });
    await loadAllData();
    renderBuild();
    renderStatus();
    closeDrawer();
}

// ══════════════════════════════════════════
// OPS FLOW RENDER
// ══════════════════════════════════════════
function renderOps() {
    const canvas = document.getElementById('ops-canvas');
    const svg = document.getElementById('ops-svg');
    if (!canvas || !svg) return;
    canvas.innerHTML = ''; svg.innerHTML = '';

    const stages = OPS_STATE.stages || [];
    const positions = {};
    stages.forEach((s, i) => {
        const x = 60 + i * 200;
        const y = 120 + (i % 2 === 0 ? 0 : 80);
        positions[s.id] = { x, y };

        const color = SQUAD_COLORS[s.squad] || '#6b7280';
        const div = document.createElement('div');
        div.className = 'funnel-node';
        div.style.left = x + 'px'; div.style.top = y + 'px'; div.style.width = '170px';
        div.onclick = () => openOpsDetail(s);
        div.innerHTML = `
            <div class="node-port port-in" style="border-color:${color}"></div>
            <div class="node-port port-out" style="border-color:${color}"></div>
            <div class="node-icon" style="background:${color}20"><i data-lucide="activity" style="width:14px;height:14px;color:${color}"></i></div>
            <div class="node-title">${s.id.replace('OPS-','')}. ${s.name}</div>
            <div class="node-sub">${s.trigger}</div>
            <div class="mt-2"><span class="badge state-${s.state}" style="font-size:7px">${s.state}</span></div>
            ${s.kpis.length ? `<div class="mt-1 text-[7px] text-accent font-mono">${s.kpis.join(' · ')}</div>` : ''}
        `;
        canvas.appendChild(div);
    });

    // Connect linearly
    for (let i = 0; i < stages.length - 1; i++) {
        const from = positions[stages[i].id], to = positions[stages[i+1].id];
        const x1 = from.x + 170, y1 = from.y + 50, x2 = to.x, y2 = to.y + 50;
        const mx = (x1+x2)/2;
        const path = document.createElementNS('http://www.w3.org/2000/svg','path');
        path.setAttribute('d',`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
        path.setAttribute('fill','none'); path.setAttribute('stroke','rgba(16,185,129,0.15)'); path.setAttribute('stroke-width','2'); path.setAttribute('stroke-dasharray','6 4');
        svg.appendChild(path);
    }
    lucide.createIcons();
}

function openOpsDetail(stage) {
    const agent = (REGISTRY.agents||[]).find(a=>a.id===stage.agent);
    let html = `<div class="p-6">
        <span class="badge state-${stage.state} mb-4 inline-block">${stage.state}</span>
        <h3 class="text-lg font-black text-white mb-1">${stage.name}</h3>
        <p class="text-[9px] text-muted font-mono mb-4">${stage.id} · ${stage.squad}</p>
        <div class="space-y-3">
            <div><span class="text-[9px] font-bold text-primary uppercase">Trigger:</span> <span class="text-[10px] text-muted">${stage.trigger}</span></div>
            <div><span class="text-[9px] font-bold text-secondary uppercase">Agente:</span> <span class="text-[10px] text-white">${agent ? agent.icon + ' ' + agent.name : stage.agent}</span></div>
            <div><span class="text-[9px] font-bold text-accent uppercase">Skill:</span> <span class="text-[10px] text-muted">${stage.skill}</span></div>
            <div><span class="text-[9px] font-bold text-muted uppercase">Input → Output:</span> <span class="text-[10px] text-muted">${stage.input} → ${stage.output}</span></div>
            ${stage.decision_gate ? `<div><span class="text-[9px] font-bold text-pink uppercase">Decision Gate:</span> <span class="text-[10px] text-pink">${stage.decision_gate}</span></div>` : ''}
            ${stage.kpis.length ? `<div><span class="text-[9px] font-bold text-accent uppercase">KPIs:</span> <span class="text-[10px] text-accent">${stage.kpis.join(', ')}</span></div>` : ''}
            ${stage.alerts.length ? `<div><span class="text-[9px] font-bold text-coral uppercase">Alertas:</span> <span class="text-[10px] text-coral">${stage.alerts.join(', ')}</span></div>` : ''}
            <div><span class="text-[9px] font-bold text-coral uppercase">Fallback:</span> <span class="text-[10px] text-muted">${stage.fallback}</span></div>
        </div>
    </div>`;
    document.getElementById('drawer-title').textContent = stage.id; document.getElementById('drawer-content').innerHTML = html; document.getElementById('detail-drawer').classList.add('open'); lucide.createIcons();
}

// ══════════════════════════════════════════
// CONTROL MODULES RENDER
// ══════════════════════════════════════════
function renderApprovals() {
    const buildGates = (REGISTRY.decisions||{}).build || [];
    const opsGates = (REGISTRY.decisions||{}).ops || [];
    document.getElementById('approvals-build-gates').innerHTML = buildGates.map(d => `<div class="flex items-center justify-between py-2 border-b border-white/5">
        <div><span class="text-[9px] font-mono text-muted">${d.id}</span> <span class="text-[10px] text-white ml-2">${d.question}</span></div>
        <span class="badge state-${d.status === 'approved' ? 'completed' : 'draft'}" style="font-size:7px">${d.status}</span>
    </div>`).join('');
    document.getElementById('approvals-ops-gates').innerHTML = opsGates.map(d => `<div class="flex items-center justify-between py-2 border-b border-white/5">
        <div><span class="text-[9px] font-mono text-muted">${d.id}</span> <span class="text-[10px] text-white ml-2">${d.question}</span></div>
        <span class="badge state-draft" style="font-size:7px">${d.status}</span>
    </div>`).join('');
    const queue = (APPROVALS.items || []).reverse();
    document.getElementById('approvals-queue').innerHTML = queue.length ? queue.map(a => `<div class="flex items-center justify-between py-3 border-b border-white/5">
        <div><span class="text-[9px] font-mono text-muted">${a.id}</span><span class="text-[10px] text-white ml-2">${a.decision_id || a.phase_id || ''}</span><p class="text-[9px] text-muted">${a.context||''}</p></div>
        <div class="flex gap-2">
            ${a.status === 'pending' ? `<button class="btn-success" onclick="resolveApproval('${a.id}','approved')">Aprovar</button><button class="btn-danger" onclick="resolveApproval('${a.id}','rejected')">Rejeitar</button>` : `<span class="badge state-${a.status === 'approved' ? 'completed' : 'failed'}">${a.status}</span>`}
        </div>
    </div>`).join('') : '<p class="text-[10px] text-muted italic">Nenhuma aprovação pendente.</p>';
}

async function resolveApproval(id, verdict) {
    await fetch('/api/approvals', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ action: 'resolve', approval_id: id, verdict, resolved_by: 'human' }) });
    await loadAllData(); renderApprovals(); renderStatus();
}
async function createApproval() {
    const dec = prompt('Decision ID (ex: DEC-04):');
    const ctx = prompt('Contexto:');
    if (!dec) return;
    await fetch('/api/approvals', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ action: 'create', decision_id: dec, context: ctx }) });
    await loadAllData(); renderApprovals();
}

function renderAlerts() {
    const active = (ALERTS.items || []).filter(a => a.status === 'open' || a.status === 'acknowledged');
    document.getElementById('alerts-active').innerHTML = active.length ? active.map(a => `<div class="glass p-4 border-l-4 ${a.severity === 'critical' ? 'border-l-coral' : 'border-l-accent'}">
        <div class="flex justify-between items-start mb-2">
            <div><span class="badge ${a.severity === 'critical' ? 'border-coral/30 text-coral bg-coral/10' : 'border-accent/30 text-accent bg-accent/10'}">${a.severity}</span></div>
            <span class="text-[8px] text-muted font-mono">${a.id}</span>
        </div>
        <p class="text-[11px] text-white mb-2">${a.message}</p>
        <div class="flex gap-2 mt-2">
            ${a.status === 'open' ? `<button class="btn-ghost" onclick="ackAlert('${a.id}')">Acknowledge</button>` : ''}
            <button class="btn-danger" onclick="closeAlert('${a.id}')">Fechar</button>
        </div>
    </div>`).join('') : '<p class="text-[10px] text-muted italic">Nenhum alerta ativo.</p>';

    document.getElementById('alerts-registry').innerHTML = (REGISTRY.alerts || []).map(a => `<div class="flex items-center justify-between py-2 border-b border-white/5">
        <div><span class="text-[9px] font-mono text-muted">${a.id}</span><span class="text-[10px] text-white ml-2">${a.name}</span></div>
        <span class="badge ${a.severity === 'critical' ? 'border-coral/30 text-coral bg-coral/10' : 'border-accent/30 text-accent bg-accent/10'}" style="font-size:7px">${a.severity}</span>
    </div>`).join('');
}

async function ackAlert(id) { await fetch('/api/alerts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'ack',alert_id:id}) }); await loadAllData(); renderAlerts(); }
async function closeAlert(id) { await fetch('/api/alerts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'close',alert_id:id}) }); await loadAllData(); renderAlerts(); renderStatus(); }
async function createAlert() {
    const msg = prompt('Mensagem do alerta:'); if (!msg) return;
    const sev = prompt('Severidade (low/medium/high/critical):') || 'medium';
    await fetch('/api/alerts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'create',message:msg,severity:sev}) });
    await loadAllData(); renderAlerts(); renderStatus();
}

function renderLogs(filter='all') {
    const entries = (LOGS.entries || []).reverse();
    const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter);
    document.getElementById('logs-timeline').innerHTML = filtered.length ? filtered.map(l => `<div class="glass p-4 flex items-start gap-4">
        <div class="text-[8px] text-muted font-mono w-28 shrink-0">${new Date(l.timestamp).toLocaleString('pt-BR')}</div>
        <div class="flex-1">
            <span class="badge border-white/10 text-muted bg-white/5 mb-1 inline-block" style="font-size:7px">${l.type}</span>
            <p class="text-[10px] text-white">${l.target || ''} ${l.action || ''} ${l.verdict ? '→ '+l.verdict : ''}</p>
            ${l.why_this_ran ? `<p class="text-[9px] text-accent mt-1">Why: ${l.why_this_ran}</p>` : ''}
            ${l.details ? `<p class="text-[9px] text-muted mt-1">${l.details}</p>` : ''}
        </div>
    </div>`).join('') : '<p class="text-[10px] text-muted italic">Nenhum log registrado.</p>';
}
function filterLogs(type, btn) {
    document.querySelectorAll('#log-filters button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderLogs(type);
}

function renderReruns() {
    const items = (RERUNS.items || []).reverse();
    document.getElementById('reruns-queue').innerHTML = items.length ? items.map(r => `<div class="glass p-5">
        <div class="flex justify-between items-start mb-3">
            <div><span class="text-[9px] font-mono text-muted">${r.id}</span><span class="badge state-${r.status} ml-2" style="font-size:7px">${r.status}</span></div>
            <span class="text-[8px] text-muted font-mono">${new Date(r.created_at).toLocaleString('pt-BR')}</span>
        </div>
        <p class="text-[10px] text-white mb-1"><strong>Target:</strong> ${r.target_id} (${r.scope})</p>
        <p class="text-[10px] text-muted mb-1"><strong>Reason:</strong> ${r.reason}</p>
        <p class="text-[10px] text-muted"><strong>Memory Policy:</strong> ${r.memory_policy}</p>
    </div>`).join('') : '<p class="text-[10px] text-muted italic">Nenhum rerun solicitado.</p>';
}
async function createRerun() {
    const target = prompt('Target ID (ex: BLD-07):'); if (!target) return;
    const reason = prompt('Motivo:'); if (!reason) return;
    const policy = prompt('Memory Policy (inherit/fork/reset_partial/reset_total):') || 'inherit';
    await fetch('/api/reruns', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({target_id:target,reason,memory_policy:policy,scope:'node'}) });
    await loadAllData(); renderReruns();
}

function renderIncidents() {
    const items = (INCIDENTS.items || []).reverse();
    document.getElementById('incidents-list').innerHTML = items.length ? items.map(inc => `<div class="glass p-5 border-l-4 ${inc.severity === 'critical' ? 'border-l-coral' : inc.severity === 'high' ? 'border-l-accent' : 'border-l-sky'}">
        <div class="flex justify-between items-start mb-3">
            <div><span class="text-[9px] font-mono text-muted">${inc.id}</span><span class="badge ${inc.severity === 'critical' ? 'border-coral/30 text-coral bg-coral/10' : 'border-accent/30 text-accent bg-accent/10'} ml-2">${inc.severity}</span><span class="badge state-${inc.status === 'open' ? 'in_progress' : 'completed'} ml-2" style="font-size:7px">${inc.status}</span></div>
            <span class="text-[8px] text-muted font-mono">${new Date(inc.created_at).toLocaleString('pt-BR')}</span>
        </div>
        <p class="text-[11px] text-white mb-2">${inc.description}</p>
        ${inc.blast_radius ? `<p class="text-[9px] text-coral mb-1">Blast Radius: ${inc.blast_radius}</p>` : ''}
        ${inc.affected_nodes?.length ? `<p class="text-[9px] text-muted mb-1">Nós afetados: ${inc.affected_nodes.join(', ')}</p>` : ''}
        ${inc.recovery_path ? `<p class="text-[9px] text-secondary mb-2">Recovery: ${inc.recovery_path}</p>` : ''}
        ${inc.status === 'open' ? `<button class="btn-success mt-2" onclick="resolveIncident('${inc.id}')">Resolver</button>` : ''}
    </div>`).join('') : '<p class="text-[10px] text-muted italic">Nenhum incidente registrado.</p>';
}
async function createIncident() {
    const desc = prompt('Descrição do incidente:'); if (!desc) return;
    const sev = prompt('Severidade (low/medium/high/critical):') || 'medium';
    const owner = prompt('Owner Squad (ex: SQD-ENG):') || 'SQD-ENG';
    await fetch('/api/incidents', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'create',description:desc,severity:sev,owner}) });
    await loadAllData(); renderIncidents();
}
async function resolveIncident(id) {
    const res = prompt('Resolução:'); if (!res) return;
    await fetch('/api/incidents', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'resolve',incident_id:id,resolution:res}) });
    await loadAllData(); renderIncidents();
}

function renderCommands() {
    const items = (COMMANDS.entries || []).reverse();
    document.getElementById('commands-history').innerHTML = items.length ? items.map(c => `<div class="flex items-start gap-3 py-2 border-b border-white/5">
        <span class="text-[8px] text-muted font-mono w-24 shrink-0">${new Date(c.timestamp).toLocaleString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</span>
        <span class="text-[9px] font-mono text-primary">${c.id}</span>
        <span class="text-[10px] text-white">${c.action} → ${c.target_id}</span>
    </div>`).join('') : '<p class="text-[10px] text-muted italic">Nenhum comando registrado.</p>';
}
async function sendCommand() {
    const scope = document.getElementById('cmd-scope').value;
    const target = document.getElementById('cmd-target').value; if (!target) return alert('Preencha o alvo');
    const action = document.getElementById('cmd-action').value;
    const payload = document.getElementById('cmd-payload').value;
    await fetch('/api/commands', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({target_scope:scope,target_id:target,action,payload:{instruction:payload}}) });
    document.getElementById('cmd-payload').value = '';
    await loadAllData(); renderCommands();
}

function renderWhy() {
    const entries = (LOGS.entries || []).filter(e => e.why_this_ran).reverse();
    document.getElementById('why-list').innerHTML = entries.length ? entries.map(l => `<div class="glass p-5">
        <div class="flex justify-between mb-2">
            <span class="text-[9px] font-mono text-muted">${l.id}</span>
            <span class="text-[8px] text-muted font-mono">${new Date(l.timestamp).toLocaleString('pt-BR')}</span>
        </div>
        <p class="text-[10px] text-white mb-1"><strong>Target:</strong> ${l.target}</p>
        <p class="text-[11px] text-accent font-bold">Why: ${l.why_this_ran}</p>
    </div>`).join('') : '<p class="text-[10px] text-muted italic">Nenhuma execução com rastreabilidade causal registrada. Use o Execution Log para registrar with why_this_ran.</p>';
}

function renderMemory() {
    document.getElementById('memory-scopes').innerHTML = MEMORY_SCOPES.map(s => `<div class="glass p-5 border-t-2 cursor-pointer hover:-translate-y-0.5 transition-transform" style="border-top-color:${s.color}" onclick="openEditorModal('${s.name}', 'docs/memory/${s.id}.md')">
        <div class="flex items-center gap-3 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:${s.color}20"><i data-lucide="${s.icon}" class="w-4 h-4" style="color:${s.color}"></i></div>
        <div><h4 class="text-xs font-bold text-white">${s.name}</h4><p class="text-[8px] text-muted font-mono">${s.id}</p></div></div>
        <p class="text-[10px] text-muted">${s.desc}</p>
    </div>`).join('');

    const mutations = (MEMORY.mutations || []).reverse().slice(0, 20);
    document.getElementById('memory-mutations').innerHTML = mutations.length ? mutations.map(m => `<div class="flex items-start gap-3 py-2 border-b border-white/5">
        <span class="text-[8px] text-muted font-mono w-24 shrink-0">${new Date(m.timestamp).toLocaleString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</span>
        <div><span class="badge border-white/10 text-muted bg-white/5" style="font-size:7px">${m.memory_scope}</span><p class="text-[9px] text-white mt-1">${m.diff_summary||'Mutação registrada'}</p></div>
    </div>`).join('') : '<p class="text-[10px] text-muted italic">Nenhuma mutação registrada.</p>';
    lucide.createIcons();
}

// ══════════════════════════════════════════
// SQUADS & AGENTS RENDER
// ══════════════════════════════════════════
function renderSquads() {
    const squads = REGISTRY.squads || [];
    document.getElementById('squads-view').innerHTML = squads.map(s => {
        const squadAgents = (REGISTRY.agents || []).filter(a => a.squad === s.id);
        const fileName = s.id.toLowerCase();
        
        return `<div class="squad-card group border-t-2" style="border-top-color:${s.color}">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center border" style="background:${s.color}10;border-color:${s.color}30;color:${s.color}">
                        <i data-lucide="${s.icon}" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h3 class="font-black tracking-widest text-white">${s.name}</h3>
                        <p class="text-[9px] text-muted font-mono uppercase">${s.id}</p>
                    </div>
                </div>
                <button class="btn-ghost text-primary opacity-0 group-hover:opacity-100 transition-opacity" onclick="openEditorModal('Squad ${s.name}', '.codex/squads/${fileName}.md')">
                    <i data-lucide="edit-3" class="w-3 h-3 inline"></i> Editar
                </button>
            </div>
            <p class="text-xs text-muted mb-6 leading-relaxed">${s.mission}</p>
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <h4 class="text-[9px] font-bold uppercase text-secondary mb-3 tracking-widest">Agentes</h4>
                    <ul class="space-y-2 text-[11px] text-muted">
                        ${squadAgents.map(a => `<li class="flex items-center gap-2 hover:text-white cursor-pointer transition-colors" onclick="openEditorModal('.codex/agents/${a.handle.replace('@','')}.md', '${a.name} â€” ${s.name}')"><span>${a.icon}</span> <span>${a.name} <span class="opacity-50">(${a.handle})</span></span></li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 class="text-[9px] font-bold uppercase text-accent mb-3 tracking-widest">Entregas</h4>
                    <ul class="space-y-2 text-[11px] text-muted">
                        ${s.outputs.map(o => `<li class="flex items-center gap-2 before:content-['Â·'] before:text-white/30">${o.replace('DLV-','')}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 class="text-[9px] font-bold uppercase text-warning mb-3 tracking-widest">Entradas</h4>
                    <ul class="space-y-2 text-[11px] text-muted">
                        ${s.inputs.map(i => `<li class="flex items-center gap-2 before:content-['Â·'] before:text-white/30">${i}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ══════════════════════════════════════════
// AGENTS RENDER
// ══════════════════════════════════════════
function renderAgents() {
    const view = document.getElementById('agents-view');
    if (!view) return;
    const agents = REGISTRY.agents || [];
    view.innerHTML = agents.map(a => {
        const sq = SQUAD_COLORS[a.squad] || '#6b7280';
        return `<div class="glass p-4 group relative hover:-translate-y-0.5 transition-transform">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="btn-ghost text-primary text-[10px] py-1 px-2" onclick="openEditorModal('${a.name} — ${a.squad}', '.codex/agents/${a.handle.replace('@','')}.md')">
                    <i data-lucide="edit-3" class="w-3 h-3 inline"></i> Editar
                </button>
            </div>
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-inner shadow-black shrink-0 border border-white/5 bg-white/5">${a.icon}</div>
                    <div>
                        <h3 class="text-xs font-bold text-white">${a.name}</h3>
                        <p class="text-[9px] text-muted font-mono">${a.handle}</p>
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-muted mb-4 leading-relaxed">${a.role}</p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span class="text-[9px] font-bold text-white uppercase tracking-widest px-2 py-0.5 rounded" style="background:${sq}20;color:${sq}">${a.squad}</span>
            </div>
        </div>`;
    }).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PERSONAS RENDER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function renderPersonas() {
    const personas = REGISTRY.personas || [];
    document.getElementById('personas-count').textContent = `${personas.length} Personas`;
    const view = document.getElementById('personas-view');
    view.innerHTML = personas.map(p => {
        return `<div class="glass p-6 group relative">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="btn-ghost text-primary text-[10px] py-1 px-2" onclick="openEditorModal('.codex/personas/${p.id}.md', 'Persona ${p.name}')">
                    <i data-lucide="edit-3" class="w-3 h-3 inline"></i> Editar
                </button>
            </div>
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl shadow-inner shadow-black shrink-0">${p.icon}</div>
                <div>
                    <h3 class="text-sm font-bold text-white">${p.name}</h3>
                    <p class="text-[9px] text-accent tracking-widest uppercase font-bold">${p.role}</p>
                </div>
            </div>
            <p class="text-xs text-muted mb-4 leading-relaxed">${p.bio || 'Sem bio definida.'}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${(p.traits || []).map(t => `<span class="badge border-white/10 text-white/70 bg-white/5 text-[9px] px-2 py-0.5">${t}</span>`).join('')}
            </div>
            <div class="pt-4 border-t border-white/5">
                <p class="text-[9px] text-muted uppercase tracking-widest font-bold mb-2">Agentes Afetados</p>
                <div class="flex flex-wrap gap-1">
                    ${(p.agents || []).map(a => `<span class="text-[10px] text-primary font-mono">${a}</span>`).join(', ') || '<span class="text-[10px] text-muted italic">Nenhum</span>'}
                </div>
            </div>
        </div>`;
    }).join('');
}

// ══════════════════════════════════════════
// AGENTS RENDER
// ══════════════════════════════════════════
function renderAgents() {
    const view = document.getElementById('agents-view');
    if (!view) return;
    const agents = REGISTRY.agents || [];
    view.innerHTML = agents.map(a => {
        const sq = SQUAD_COLORS[a.squad] || '#6b7280';
        return `<div class="glass p-4 group relative hover:-translate-y-0.5 transition-transform">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="btn-ghost text-primary text-[10px] py-1 px-2" onclick="openEditorModal('${a.name} — ${a.squad}', '.codex/agents/${a.handle.replace('@','')}.md')">
                    <i data-lucide="edit-3" class="w-3 h-3 inline"></i> Editar
                </button>
            </div>
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-inner shadow-black shrink-0 border border-white/5 bg-white/5">${a.icon}</div>
                    <div>
                        <h3 class="text-xs font-bold text-white">${a.name}</h3>
                        <p class="text-[9px] text-muted font-mono">${a.handle}</p>
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-muted mb-4 leading-relaxed">${a.role}</p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span class="text-[9px] font-bold text-white uppercase tracking-widest px-2 py-0.5 rounded" style="background:${sq}20;color:${sq}">${a.squad}</span>
            </div>
        </div>`;
    }).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ADD PERSONA MODAL
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function openAddPersonaModal() {
    document.getElementById('add-persona-modal').style.display = 'flex';
    document.getElementById('new-persona-name').value = '';
    document.getElementById('new-persona-role').value = '';
}

async function submitNewPersona() {
    const name = document.getElementById('new-persona-name').value.trim();
    const role = document.getElementById('new-persona-role').value.trim();
    const icon = document.getElementById('new-persona-icon').value.trim() || 'ðŸ‘¤';
    
    if (!name) return alert('Nome Ã© obrigatÃ³rio');
    
    try {
        const res = await fetch('/api/registry/personas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, role, icon })
        });
        const result = await res.json();
        if (result.success) {
            document.getElementById('add-persona-modal').style.display = 'none';
            await loadAllData();
            openEditorModal(`.codex/personas/${result.persona.id}.md`, `Persona ${result.persona.name}`);
        }
    } catch (e) {
        console.error(e);
        alert('Erro ao criar persona');
    }
}

function skillNameToFile(name) {
    const map = {
        'BriefIngestion': 'governance-roadmap', 'ProductPositioning': 'identidade-de-marca',
        'OfferStructuring': 'otimizacao-de-checkout', 'PersonaFraming': 'psicologia-de-vendas',
        'RoadmapPlanning': 'gestao-de-backlog', 'SprintOrchestration': 'gestao-de-backlog',
        'MarketIntelligence': 'inteligencia-de-trafego', 'CompetitorDeconstruction': 'curadoria-de-conteudo',
        'HookMining': 'psicologia-de-vendas', 'FunnelArchitecture': 'arquitetura-de-funis',
        'TrafficStrategy': 'inteligencia-de-trafego', 'CROHypothesis': 'cro-testes-a-b',
        'EditorialStructuring': 'curadoria-de-conteudo', 'LongformCopy': 'storytelling-de-luxo',
        'SalesPageCopy': 'copywriting-aristocratico', 'BrandVoiceEnforcement': 'identidade-de-marca',
        'ImagePrompting': 'curadoria-de-imagens', 'PDFAssembly': 'ebook-publisher',
        'DesignSystemTokens': 'componentes-ui-luxury', 'LayoutComposition': 'componentes-ui-luxury',
        'A4Composition': 'design-editorial-hd', 'LandingPageUXMapping': 'otimizacao-performance-ux',
        'VisualConsistency': 'direcao-de-arte', 'AssetDirection': 'direcao-de-arte',
        'CheckoutIntegration': 'otimizacao-de-checkout', 'DeployPipeline': 'ci-cd-cloud-ops',
        'WebhookAutomation': 'integracao-de-webhooks', 'DeliveryOrchestration': 'integracao-de-webhooks',
        'TrackingInstrumentation': 'monitoramento-de-erros', 'DataSync': 'schemas-de-dados-imutaveis',
        'EditorialQA': 'testes-qa-estritos', 'SecurityScan': 'ciberseguranca-vault',
        'FailureRecovery': 'monitoramento-de-erros', 'AlertRouting': 'monitoramento-de-erros',
        'ExecutionAudit': 'testes-qa-estritos', 'ApprovalGovernance': 'governance-roadmap'
    };
    return map[name] || name.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/,'');
}

function renderSkills() {
    const skills = REGISTRY.skills || {};
    document.getElementById('skills-view').innerHTML = Object.entries(skills).map(([cat, items]) => `<div>
        <div class="flex items-center gap-2 mb-4"><div class="h-2 w-2 rounded-full bg-primary"></div><span class="text-[10px] font-bold text-primary uppercase tracking-widest">${cat}</span><span class="text-[8px] text-muted">(${items.length} skills)</span></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
            ${items.map(s => {
                const file = '.codex/skills/' + skillNameToFile(s.name) + '.md';
                return `<div class="glass p-4 cursor-pointer hover:-translate-y-0.5 transition-transform" onclick="openEditorModal('${file}','${s.name} â€” Skill')">
                <div class="flex items-center gap-2 mb-2"><span class="text-lg">âš¡</span><div><h4 class="text-[10px] font-bold">${s.name}</h4><p class="text-[8px] text-muted font-mono">${s.id}</p></div></div>
                <p class="text-[9px] text-muted leading-relaxed">${s.desc}</p>
                <div class="mt-2 text-[8px] text-primary font-bold uppercase tracking-widest">âœï¸ Editar</div>
            </div>`;
            }).join('')}
        </div>
    </div>`).join('');
}

function renderPersonas() {
    document.getElementById('personas-view').innerHTML = PERSONAS.map(p => `<div class="glass p-4 hover:-translate-y-0.5 transition-transform cursor-pointer">
        <div class="flex items-center gap-2.5 mb-3">
            <div class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg">${p.icon}</div>
            <div><h4 class="text-xs font-bold">${p.name}</h4><p class="text-[9px] text-primary font-bold tracking-widest">${p.role}</p></div>
        </div>
        <p class="text-[10px] text-muted mb-3 leading-relaxed">${p.bio}</p>
        <div class="flex flex-wrap gap-1">${p.traits.map(t=>`<span class="px-1.5 py-0.5 rounded text-[8px] bg-primary/10 text-primary border border-primary/15 font-bold uppercase">${t}</span>`).join('')}</div>
    </div>`).join('');
}

// Funnel (legacy)
let activeNodeId = null;
function toggleFunnelSub(el) {
    document.getElementById('funnel-sub').classList.toggle('open');
    switchTab('funnel'); renderFunnel('ebook');
}
function loadFunnel(p, el) {
    document.querySelectorAll('.sb-sub-item').forEach(i=>i.classList.remove('active')); if(el)el.classList.add('active');
    document.getElementById('funnel-project-name').textContent = el?el.textContent:p; renderFunnel(p);
}
function renderFunnel(project) {
    const canvas = document.getElementById('funnel-canvas'), svg = document.getElementById('funnel-svg');
    const nodes = FUNNEL_NODES[project]||FUNNEL_NODES.ebook, edges = FUNNEL_EDGES[project]||FUNNEL_EDGES.ebook;
    canvas.innerHTML = ''; svg.innerHTML = '';
    const layerColors = {'AquisiÃ§Ã£o':'#0ea5e9','PrÃ©-conversÃ£o':'#a855f7','ConversÃ£o':'#10b981','MonetizaÃ§Ã£o':'#f59e0b','Entrega':'#ec4899','RetenÃ§Ã£o':'#14b8a6'};
    const layerPos = {};
    nodes.forEach(n => {
        if(!layerPos[n.layer]) layerPos[n.layer]={x:n.x,minY:n.y}; else { layerPos[n.layer].x=Math.min(layerPos[n.layer].x,n.x); layerPos[n.layer].minY=Math.min(layerPos[n.layer].minY,n.y); }
        const isActive = n.status==='active';
        const div = document.createElement('div'); div.className = 'funnel-node'+(isActive?' active-node':''); div.style.left=n.x+'px'; div.style.top=(n.y+40)+'px'; div.id='fn-'+n.id;
        div.innerHTML = `<div class="node-port port-in" style="border-color:${n.color}"></div><div class="node-port port-out" style="border-color:${n.color}"></div>
            <div class="node-icon" style="background:${n.color}18"><i data-lucide="${n.icon}" style="width:16px;height:16px;color:${n.color}"></i></div>
            <div class="node-title">${n.title}</div><div class="node-sub">${n.sub}</div>
            ${isActive?'<div style="position:absolute;top:8px;right:8px;width:6px;height:6px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981"></div>':''}`;
        canvas.appendChild(div);
    });
    Object.entries(layerPos).forEach(([label,pos])=>{const lbl=document.createElement('div');lbl.className='layer-label';lbl.style.left=pos.x+'px';lbl.style.top=(pos.minY+14)+'px';lbl.style.color=layerColors[label]||'#6b7280';lbl.style.background=(layerColors[label]||'#6b7280')+'12';lbl.style.border='1px solid '+(layerColors[label]||'#6b7280')+'25';lbl.textContent=label;canvas.appendChild(lbl);});
    edges.forEach(([fId,tId])=>{const f=nodes.find(n=>n.id===fId),t=nodes.find(n=>n.id===tId);if(!f||!t)return;const x1=f.x+180,y1=f.y+40+50,x2=t.x,y2=t.y+40+50,mx=(x1+x2)/2;const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);path.setAttribute('fill','none');path.setAttribute('stroke','rgba(168,85,247,0.18)');path.setAttribute('stroke-width','2');path.setAttribute('stroke-dasharray','6 4');svg.appendChild(path);});
    lucide.createIcons();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// EDITOR MODAL
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let currentEditorPath = '';
function openEditorModal(path, title) {
    document.getElementById('editor-title').textContent = title||'Editor';
    document.getElementById('editor-path').textContent = path;
    currentEditorPath = path;
    document.getElementById('editor-textarea').value = 'Carregando...';
    document.getElementById('editor-status').classList.add('hidden');
    document.getElementById('editor-modal').classList.add('open');
    fetch('/api/file?path='+encodeURIComponent(path)).then(r=>r.text()).then(t=>{document.getElementById('editor-textarea').value=t;}).catch(()=>{document.getElementById('editor-textarea').value='Arquivo nÃ£o encontrado. Escreva conteÃºdo e salve para criar.';});
}
function closeEditorModal() { document.getElementById('editor-modal').classList.remove('open'); }
function saveEditorModal() {
    fetch('/api/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path:currentEditorPath,content:document.getElementById('editor-textarea').value})})
    .then(r=>r.json()).then(r=>{if(r.success){const s=document.getElementById('editor-status');s.textContent='Salvo âœ“';s.classList.remove('hidden');setTimeout(()=>s.classList.add('hidden'),3000);}});
}
function closeDrawer() { document.getElementById('detail-drawer').classList.remove('open'); }

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DATA LOADING & SYNC
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
async function loadAllData() {
    try {
        const [reg, bld, ops, apr, alt, inc, rer, log, cmd, mem] = await Promise.all([
            fetch('/api/registry').then(r=>r.json()).catch(()=>({})),
            fetch('/api/build').then(r=>r.json()).catch(()=>({phases:[]})),
            fetch('/api/ops').then(r=>r.json()).catch(()=>({stages:[]})),
            fetch('/api/approvals').then(r=>r.json()).catch(()=>({items:[]})),
            fetch('/api/alerts').then(r=>r.json()).catch(()=>({items:[]})),
            fetch('/api/incidents').then(r=>r.json()).catch(()=>({items:[]})),
            fetch('/api/reruns').then(r=>r.json()).catch(()=>({items:[]})),
            fetch('/api/logs').then(r=>r.json()).catch(()=>({entries:[]})),
            fetch('/api/commands').then(r=>r.json()).catch(()=>({entries:[]})),
            fetch('/api/memory').then(r=>r.json()).catch(()=>({mutations:[]}))
        ]);
        REGISTRY = reg; BUILD_STATE = bld; OPS_STATE = ops;
        APPROVALS = apr; ALERTS = alt; INCIDENTS = inc;
        RERUNS = rer; LOGS = log; COMMANDS = cmd; MEMORY = mem;
    } catch(e) { console.error('Data load error:', e); }
}

async function syncAll() {
    await loadAllData();
    renderStatus();
    lucide.createIcons();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// INIT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
document.addEventListener('DOMContentLoaded', async () => {
    await syncAll();
    lucide.createIcons();
});

// Auto-refresh every 10s
setInterval(async () => { await loadAllData(); renderStatus(); }, 10000);
