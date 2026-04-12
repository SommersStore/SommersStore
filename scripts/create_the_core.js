const fs = require('fs');
let h = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

// 1. Sidebar icon for "THE CORE" (replacing/upgrading Nexus)
const coreIcon = `        <div data-tab="core" class="sb-icon" onclick="switchTab('core', this)"><i data-lucide="orbit" class="w-4 h-4"></i><span class="sb-label">The Core</span></div>`;
if (!h.includes('data-tab="core"')) {
    h = h.replace(/<div data-tab="nexus"/, coreIcon + '\n        <div data-tab="nexus"');
}

// 2. PREMIUM CSS for THE CORE
const coreStyle = `
<style>
/* Luxury Pulse & Glows */
@keyframes nodePulse { 0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); } 100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); } }
@keyframes dashFlow { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }

.core-node {
    position: absolute; width: 48px; height: 48px; border-radius: 50%;
    background: rgba(13, 13, 22, 0.9); border: 2px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 10; backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.8);
}
.core-node:hover {
    transform: scale(1.15) translateY(-4px);
    border-color: #fff;
    box-shadow: 0 15px 45px rgba(0,0,0,0.9), 0 0 20px var(--node-color);
}
.core-node i { transition: transform 0.3s; }
.core-node:hover i { transform: scale(1.2); }

.core-node.active {
    animation: nodePulse 2s infinite;
    border-color: #10b981;
}

.core-label {
    position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
    margin-top: 15px; text-align: center; pointer-events: none; width: 150px;
}
.core-label h4 { 
    font-size: 9px; font-weight: 900; color: #fff; text-transform: uppercase; 
    letter-spacing: 0.15em; margin-bottom: 3px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
.core-label p { 
    font-size: 7px; color: #6b7280; font-weight: 600; text-transform: uppercase; 
    letter-spacing: 0.2em; opacity: 0.8;
}

.core-connection {
    stroke-dasharray: 5, 5;
    animation: dashFlow 1s linear infinite;
    filter: drop-shadow(0 0 2px rgba(168, 85, 247, 0.3));
}

#core-viewport {
    background-color: #050508;
    background-image: 
        radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0),
        radial-gradient(circle at 100px 100px, rgba(168, 85, 247, 0.03) 50px, transparent 150px);
    background-size: 40px 40px, 800px 800px;
}
</style>
`;
if (!h.includes('core-node')) {
    h = h.replace('</head>', coreStyle + '\n</head>');
}

// 3. Pane for THE CORE
const paneCore = `
        <!-- ═══════ THE CORE — ELITE NEXUS ═══════ -->
        <div id="pane-core" class="tab-pane" style="overflow:hidden;position:relative;padding:0">
            <div id="core-header" style="position:absolute;top:0;left:0;right:0;z-index:20;padding:32px;pointer-events:none">
                <div style="pointer-events:auto">
                    <h2 class="text-2xl font-black italic tracking-tighter uppercase leading-none"><span class="text-primary">The Core</span> <span class="text-white">Elite Logic</span></h2>
                    <p class="text-[10px] text-muted font-bold tracking-[0.4em] uppercase mt-2">Arquitetura Unificada de Alta Performance</p>
                </div>
            </div>
            <div id="core-viewport" style="width:100%;height:100%;overflow:auto;position:relative">
                <svg id="core-svg" style="position:absolute;top:0;left:0;width:3500px;height:1200px;z-index:1;pointer-events:none"></svg>
                <div class="funnel-canvas" id="core-canvas" style="width:3500px;height:1200px;position:relative;z-index:5"></div>
            </div>
            <!-- HUD Stats -->
            <div style="position:absolute;bottom:32px;right:32px;z-index:30;display:flex;gap:24px">
                <div class="glass p-4 text-center border-l-2 border-primary">
                    <p class="text-[8px] text-muted uppercase tracking-widest font-black">Agentes Ativos</p>
                    <p class="text-xl font-black text-white">20</p>
                </div>
                <div class="glass p-4 text-center border-l-2 border-secondary">
                    <p class="text-[8px] text-muted uppercase tracking-widest font-black">Sync Health</p>
                    <p class="text-xl font-black text-secondary">100%</p>
                </div>
            </div>
        </div>
`;
if (!h.includes('id="pane-core"')) {
    h = h.replace('<div id="pane-nexus"', paneCore + '\n        <div id="pane-nexus"');
}

// 4. PREMUM Logic for Core
const coreLogic = `
const CORE_DATA = [
    { id:'c1', x:150, y:300, title:'Governance', phase:'Phase 01', squad:'Core Ops', color:'#a855f7', icon:'orbit', agents:['@aiox-master','@pm'], details: { m:'Orquestração estratégica de alto nível e governança do projeto.', i:'Business Goals', o:'Master Roadmap' } },
    { id:'c2', x:400, y:300, title:'Elite Identity', phase:'Phase 02', squad:'Infra Core', color:'#C5A059', icon:'shield', agents:['@architect','@brand-master'], details: { m:'Definição dos tokens de luxo e arquitetura visual imutável.', i:'Roadmap', o:'Design System HD' } },
    { id:'c3', x:650, y:450, title:'Avatar Psycho', phase:'Phase 03', squad:'Marketing', color:'#ec4899', icon:'user-check', agents:['@analyst','@persona'], details: { m:'Mapeamento psicológico profundo e simulação de desejo do avatar.', i:'Identity', o:'Psychology Map' } },
    { id:'c4', x:900, y:300, title:'Aristocratic Copy', phase:'Phase 04', squad:'Content', color:'#10b981', icon:'pen-tool', agents:['@copywriter'], details: { m:'Redação de elite baseada em mecanismos de vendas cinematográficos.', i:'Avatar Data', o:'Sales Scripts' } },
    { id:'c5', x:1150, y:200, title:'Editorial Art', phase:'Phase 04', squad:'Content Factory', color:'#10b981', icon:'palette', agents:['@art-director'], details: { m:'Direção de arte editorial A4 para exportação de alta fidelidade.', i:'Copy Scripts', o:'Premium Assets' } },
    { id:'c6', x:1150, y:500, title:'Liaison Bridge', phase:'Phase 04', squad:'Content Factory', color:'#10b981', icon:'server', agents:['@liaison'], details: { m:'Mapeamento JSON de conteúdo para integração dinâmica com o sistema.', i:'Raw Data', o:'Atomic JSONs' } },
    { id:'c7', x:1450, y:350, title:'Engineering', phase:'Phase 05', squad:'Engineering', color:'#14b8a6', icon:'terminal', agents:['@dev','@data-engineer'], details: { m:'Implementação de frontend e backend em Next.js com performance crítica.', i:'MDS / JSONs', o:'Live App' } },
    { id:'c8', x:1700, y:200, title:'The Vault', phase:'Phase 05', squad:'Hardening', color:'#14b8a6', icon:'lock', agents:['@security'], details: { m:'Segurança militar de dados e proteção de regras de acesso Firebase.', i:'App Config', o:'Hardened Vault' } },
    { id:'c9', x:1700, y:500, title:'Final QA', phase:'Phase 05', squad:'Validation', color:'#14b8a6', icon:'fingerprint', agents:['@qa'], details: { m:'Auditoria final de qualidade, UX e protocolos de lançamento.', i:'Dev Output', o:'Certified Build' } },
    { id:'c10', x:2000, y:350, title:'Growth Engine', phase:'Phase 06', squad:'Growth & Scale', color:'#f97316', icon:'bar-chart-3', agents:['@cro-expert','@marketing'], details: { m:'Escala massiva de faturamento, otimização de funis e BI em tempo real.', i:'Live Build', o:'Elite ROI' } }
];

const CORE_EDGES = [ ['c1','c2'],['c2','c3'],['c3','c4'],['c4','c5'],['c4','c6'],['c5','c7'],['c6','c7'],['c7','c8'],['c7','c9'],['c8','c10'],['c9','c10'] ];

function renderCore() {
    const canvas = document.getElementById('core-canvas');
    const svg = document.getElementById('core-svg');
    if(!canvas || !svg) return;
    canvas.innerHTML = '';
    svg.innerHTML = '';

    CORE_DATA.forEach(n => {
        const div = document.createElement('div');
        div.className = 'core-node';
        div.style.left = n.x + 'px';
        div.style.top = n.y + 'px';
        div.style.setProperty('--node-color', n.color);
        div.onclick = () => {
            document.querySelectorAll('.core-node').forEach(x => x.classList.remove('active'));
            div.classList.add('active');
            
            const detail = n.details;
            let html = \`<div class="p-6">
                <span class="badge" style="background:\${n.color}20; color:\${n.color}; border: 1px solid \${n.color}30">\${n.phase}</span>
                <h3 class="mt-4 text-xl font-black text-white italic tracking-tighter uppercase">\${n.title}</h3>
                <p class="text-[9px] text-muted mb-6 font-bold tracking-widest">\${n.squad}</p>
                <p class="text-[12px] text-muted leading-relaxed mb-8 border-l-2 border-\${n.color}/30 pl-4">\${detail.m}</p>
                <div class="space-y-6 pt-6 border-t border-white/5">
                    <div><p class="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2">Operational Squad</p><div class="flex flex-wrap gap-2">\${n.agents.map(a => \`<span class="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white">\${a}</span>\`).join('')}</div></div>
                    <div><p class="text-[9px] font-black text-muted uppercase tracking-[0.2em] mb-2">Protocol Handoff</p><p class="text-[10px] italic text-muted">\${detail.i} <i data-lucide="arrow-right" class="w-2 h-2 inline text-primary mx-2"></i> \${detail.o}</p></div>
                </div>
            </div>\`;
            document.getElementById('drawer-title').textContent = 'System Node Context';
            document.getElementById('drawer-content').innerHTML = html;
            document.getElementById('detail-drawer').classList.add('open');
            lucide.createIcons();
        };
        div.innerHTML = \`<i data-lucide="\${n.icon}" style="width:20px;height:20px;color:\${n.color}"></i><div class="core-label"><h4>\${n.title}</h4><p>\${n.phase}</p></div>\`;
        canvas.appendChild(div);
    });

    CORE_EDGES.forEach(([fId, tId]) => {
        const f = CORE_DATA.find(n => n.id === fId);
        const t = CORE_DATA.find(n => n.id === tId);
        const x1 = f.x + 24, y1 = f.y + 24, x2 = t.x + 24, y2 = t.y + 24;
        const dx = Math.abs(x2 - x1) * 0.5;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', \`M\${x1},\${y1} C\${x1+dx},\${y1} \${x2-dx},\${y2} \${x2},\${y2}\`);
        path.setAttribute('fill', 'none'); 
        path.setAttribute('stroke', (x1 > 1000 ? 'rgba(20, 184, 166, 0.1)' : 'rgba(168, 85, 247, 0.1)')); 
        path.setAttribute('stroke-width', '2');
        path.setAttribute('class', 'core-connection');
        svg.appendChild(path);
    });
    lucide.createIcons();
}
`;

h = h.replace('const WORKFLOW_STEPS =', coreLogic + '\nconst WORKFLOW_STEPS =');
h = h.replace('if(tab === \'nexus\') renderNexus();', "if(tab === 'nexus') renderNexus();\n    if(tab === 'core') renderCore();");
h = h.replace('renderNexus(); renderRoadmap();', 'renderCore(); renderNexus(); renderRoadmap();');

fs.writeFileSync('docs/aiox_dashboard.html', h, 'utf8');
console.log('THE CORE (Premium Elite Nexus) integrated.');
