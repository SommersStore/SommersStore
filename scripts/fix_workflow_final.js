const fs = require('fs');
let h = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

// 1. Ensure Workflow Icon exists and is clickable
if (!h.includes('data-tab="workflow"')) {
    h = h.replace(
        /<div data-tab="pipeline".*?>/,
        '<div data-tab="workflow" class="sb-icon" onclick="switchTab(\'workflow\', this)"><i data-lucide="git-branch" class="w-4 h-4"></i><span class="sb-label">Workflow</span></div>\n        <div data-tab="pipeline"'
    );
}

// 2. Add SwitchTab function if missing (used by my icon above)
if (!h.includes('function switchTab')) {
    const switchTabFunc = `
function switchTab(tab, el) {
    document.querySelectorAll('.sb-icon').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    if(el) el.classList.add('active');
    else document.querySelector(\`[data-tab="\${tab}"]\`).classList.add('active');
    
    document.getElementById('pane-' + tab).classList.add('active');
    if(tab === 'workflow') renderWorkflow();
    lucide.createIcons();
}
`;
    h = h.replace('lucide.createIcons();', switchTabFunc + '\nlucide.createIcons();');
}

// 3. Ensure pane-workflow exists in the DOM
if (!h.includes('id="pane-workflow"')) {
    const pane = `
        <!-- ═══════ 2. MASTER WORKFLOW ═══════ -->
        <div id="pane-workflow" class="tab-pane">
            <div class="p-8 max-w-5xl mx-auto">
                <div class="mb-12">
                    <h2 class="text-2xl font-black uppercase tracking-tighter mb-2 italic">AIOX Master Workflow</h2>
                    <p class="text-xs text-muted uppercase tracking-[0.3em] font-bold">O Ciclo de Vida Cronológico da SommersStore</p>
                </div>
                <div id="workflow-container" class="relative pl-12 border-l border-white/5 space-y-16">
                    <!-- Workflow items will be injected here -->
                </div>
            </div>
        </div>
`;
    // Inject before pane-pipeline
    h = h.replace('<div id="pane-pipeline"', pane + '\n        <div id="pane-pipeline"');
}

// 4. Update SQUADS to include a separate GROWTH squad (answering the user request)
if (!h.includes('GROWTH & SCALE')) {
    const growthSquad = `
    { name: 'Squad GROWTH & SCALE', color: '#f97316', icon: 'trending-up', agents: ['Gauge (@cro-expert)', 'Stratego (@marketing)'],
      mission: 'Otimização contínua de funis, gestão de tráfego e escala de faturamento.',
      inputs: ['Sales Data', 'Traffic Pixels'],
      outputs: ['Conversion Reports', 'Scale Playbook'],
      dependencies: ['← ENGINEERING', '← MARKETING'] }
    `;
    h = h.replace(/];\s+const AGENTS/, ',' + growthSquad + '];\nconst AGENTS');
}

// 5. Update WORKFLOW_STEPS to use the new squad
h = h.replace(
    /phase: 'Fase 06', title: 'Escala & Performance'.*?squad: 'MARKETING'/,
    "phase: 'Fase 06', title: 'Escala & Performance', squad: 'GROWTH & SCALE'"
);

// 6. Ensure renderWorkflow function exists
if (!h.includes('function renderWorkflow')) {
    const renderFunc = `
function renderWorkflow() {
    const c = document.getElementById('workflow-container');
    if(!c) return;
    c.innerHTML = WORKFLOW_STEPS.map((s, idx) => \`
        <div class="relative group">
            <div class="absolute -left-[53px] top-6 w-10 h-10 rounded-full border-4 border-black flex items-center justify-center z-10" style="background: \${s.color}">
                <i data-lucide="\${s.icon}" class="w-4 h-4 text-black"></i>
            </div>
            <div class="glass p-8 border border-white/5 group-hover:border-white/10 transition-colors">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <span class="text-[9px] font-black uppercase tracking-[0.3em] px-2 py-0.5 rounded-full mb-2 inline-block" style="background: \${s.color}20; color: \${s.color}">
                            \${s.phase} — SQUAD: \${s.squad}
                        </span>
                        <h3 class="text-xl font-bold tracking-tight">\${s.title}</h3>
                    </div>
                </div>
                <p class="text-[11px] text-muted leading-relaxed mb-6 max-w-2xl">\${s.action}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                    <div>
                        <h4 class="text-[8px] uppercase tracking-widest font-black text-primary mb-3">Agentes em Ação</h4>
                        <div class="flex flex-wrap gap-2 text-[10px] font-bold">
                            \${s.agents.map(a => \`<span class="px-2 py-1 rounded bg-white/5 border border-white/5">\${a}</span>\`).join('')}
                        </div>
                    </div>
                    <div>
                        <h4 class="text-[8px] uppercase tracking-widest font-black text-muted mb-3">Hands-Off</h4>
                        <div class="flex items-center gap-3 text-[10px] text-muted italic">
                            <span>\${s.input}</span>
                            <i data-lucide="arrow-right" class="w-3 h-3 text-primary"></i>
                            <span class="text-white not-italic font-bold">\${s.output}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    \`).join('');
    lucide.createIcons();
}
`;
    h = h.replace('function renderSquads() {', renderFunc + '\nfunction renderSquads() {');
}

// 7. Add renderWorkflow to syncAll
if (!h.includes('renderWorkflow();')) {
    h = h.replace('renderSquads();', 'renderWorkflow(); renderSquads();');
}

fs.writeFileSync('docs/aiox_dashboard.html', h, 'utf8');
console.log('Restaurado Workflow e criada a Squad de GROWTH separada.');
