const fs = require('fs');
let h = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

// 1. Sidebar icon for Roadmap
const roadmapIcon = `        <div data-tab="roadmap" class="sb-icon" onclick="switchTab('roadmap', this)"><i data-lucide="map" class="w-4 h-4"></i><span class="sb-label">Roadmap</span></div>`;
if (!h.includes('data-tab="roadmap"')) {
    h = h.replace(/<div data-tab="workflow"/, roadmapIcon + '\n        <div data-tab="workflow"');
}

// 2. Add Pane Roadmap
const paneRoadmap = `
        <!-- ═══════ 2 (MASTER ROADMAP). UNIFIED STRATEGY ═══════ -->
        <div id="pane-roadmap" class="tab-pane">
            <div class="p-8 max-w-6xl mx-auto">
                <div class="mb-12 flex justify-between items-end">
                    <div>
                        <h2 class="text-3xl font-black uppercase tracking-tighter mb-2 italic">Elite Roadmap</h2>
                        <p class="text-[10px] text-muted uppercase tracking-[0.4em] font-bold">A Conexão Suprema: Pipeline + Squads + Workflow</p>
                    </div>
                </div>
                <div id="roadmap-container" class="space-y-4"></div>
            </div>
        </div>
`;
if (!h.includes('id="pane-roadmap"')) {
    h = h.replace('<div id="pane-workflow"', paneRoadmap + '\n        <div id="pane-workflow"');
}

// 3. Define Roadmap Data and Render Function
const roadmapLogic = `
const MASTER_ROADMAP = [
    { stage: 'PLANNING', phase: 'Fase 01', squad: 'CORE OPERATIONS', title: 'Visão & Roadmap Estratégico', agents: ['@aiox-master', '@pm'], task: 'Mapeamento de Épicos e Sprints do projeto.', status: 'done', color: '#a855f7' },
    { stage: 'PLANNING', phase: 'Fase 01', squad: 'CORE OPERATIONS', title: 'Governance & Squad Allocation', agents: ['@squad-creator', '@sm'], task: 'Distribuição dinâmica de agentes.', status: 'done', color: '#a855f7' },
    { stage: 'VISUAL', phase: 'Fase 02', squad: 'INFRA-CORE', title: 'Master Design System (MDS)', agents: ['@architect', '@ux-design-expert'], task: 'Tokens visuais e componentes premium.', status: 'done', color: '#C5A059' },
    { stage: 'VISUAL', phase: 'Fase 02', squad: 'INFRA-CORE', title: 'Componentes UI Luxury', agents: ['@ux-design-expert', '@dev'], task: 'E-book UI ultra-dark.', status: 'active', color: '#C5A059' },
    { stage: 'MARKETING', phase: 'Fase 03', squad: 'MARKETING', title: 'Psicologia de Vendas & Avatar', agents: ['@analyst', '@persona'], task: 'Avatar e estudo de comportamento.', status: 'active', color: '#ec4899' },
    { stage: 'CONTENT', phase: 'Fase 04', squad: 'CONTENT FACTORY', title: 'Storytelling & Content', agents: ['@copywriter', '@art-director'], task: 'Copy e diagramação editorial.', status: 'active', color: '#10b981' },
    { stage: 'ENGINEERING', phase: 'Fase 05', squad: 'ENGINEERING', title: 'Engineering & Security', agents: ['@dev', '@security'], task: 'Code & Vault implementation.', status: 'todo', color: '#14b8a6' },
    { stage: 'GROWTH', phase: 'Fase 06', squad: 'GROWTH & SCALE', title: 'Funis & Escala', agents: ['@cro-expert', '@marketing'], task: 'Lançamento e otimização de lucro.', status: 'todo', color: '#f97316' }
];

function renderRoadmap() {
    const c = document.getElementById('roadmap-container');
    if(!c) return;
    c.innerHTML = MASTER_ROADMAP.map(item => \`
        <div class="glass flex items-center gap-6 p-4 border-l-4 group" style="border-left-color: \${item.color}">
            <div class="w-16 text-center">
                <p class="text-[8px] font-black text-muted uppercase">\${item.phase}</p>
                <div class="h-8 w-8 mx-auto rounded-lg flex items-center justify-center bg-white/5 border border-white/10 mt-1">
                    <i data-lucide="map-pin" class="w-3 h-3 text-white"></i>
                </div>
            </div>
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-[7px] font-black px-1.5 py-0.5 rounded bg-white/5 text-muted uppercase">\${item.stage}</span>
                    <h3 class="text-xs font-bold text-white uppercase">\${item.title}</h3>
                </div>
                <p class="text-[10px] text-muted mb-2">\${item.task}</p>
                <div class="flex gap-1">
                    \${item.agents.map(a => \`<span class="text-[7px] font-bold text-primary px-1.5 py-0.5 rounded bg-primary/5 border border-primary/10">\${a}</span>\`).join('')}
                </div>
            </div>
            <div class="w-32 text-right">
                <p class="text-[8px] font-bold text-muted uppercase mb-1">Squad</p>
                <span class="text-[8px] font-black uppercase" style="color:\${item.color}">\${item.squad}</span>
            </div>
            <div class="w-20 text-center">
                 <span class="text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-white/10 \${item.status === 'done' ? 'text-green-400' : item.status === 'active' ? 'text-amber-400 animate-pulse' : 'text-muted/40'}">
                    \${item.status}
                </span>
            </div>
        </div>\`).join('');
    lucide.createIcons();
}
`;

h = h.replace('const WORKFLOW_STEPS =', roadmapLogic + '\nconst WORKFLOW_STEPS =');
h = h.replace('if(tab === \'engine\') renderEngine();', "if(tab === 'engine') renderEngine();\n    if(tab === 'roadmap') renderRoadmap();");
h = h.replace('renderEngine(); renderWorkflow(); renderSquads();', 'renderRoadmap(); renderEngine(); renderWorkflow(); renderSquads();');

fs.writeFileSync('docs/aiox_dashboard.html', h, 'utf8');
console.log('Fixed Elite Roadmap script.');
