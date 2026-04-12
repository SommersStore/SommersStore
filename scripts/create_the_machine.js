const fs = require('fs');
let h = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

// 1. Add Sidebar Icon for "Master Engine" (Elite Flow)
const engineIcon = `        <div data-tab="engine" class="sb-icon" onclick="switchTab('engine', this)"><i data-lucide="cog" class="w-4 h-4"></i><span class="sb-label">The Machine</span></div>`;
h = h.replace(/<div data-tab="workflow"/, engineIcon + '\n        <div data-tab="workflow"');

// 2. Add the UI Pane for the Engine
const enginePane = `
        <!-- ═══════ 2 (NEW). ELITE MACHINE CONTEXT ═══════ -->
        <div id="pane-engine" class="tab-pane" style="overflow:hidden;position:relative;padding:0">
            <div id="engine-header" style="position:absolute;top:0;left:0;right:0;z-index:10;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(to bottom,rgba(10,10,15,0.95),transparent);pointer-events:none">
                <div style="pointer-events:auto">
                    <h2 class="text-sm font-black uppercase tracking-tighter italic"><span class="text-primary">Master Engine</span> <span class="text-white">Elite Flow</span></h2>
                    <p class="text-[9px] text-muted font-mono mt-0.5" id="engine-stats">20 Agentes · 6 Squads · Fluxo N8N Unified</p>
                </div>
            </div>
            <div id="engine-viewport" style="width:100%;height:100%;overflow:auto;position:relative;background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0); background-size: 40px 40px;">
                <svg id="engine-svg" style="position:absolute;top:0;left:0;width:3000px;height:1000px;z-index:1;pointer-events:none"></svg>
                <div class="funnel-canvas" id="engine-canvas" style="width:3000px; height:1000px; position:relative; z-index:2"></div>
            </div>
        </div>
`;
h = h.replace('<div id="pane-workflow"', enginePane + '\n        <div id="pane-workflow"');

// 3. Add Engine Data and Rendering Logic
const engineDataAndLogic = `
const ENGINE_NODES = [
    { id: 'p1', title: '01. Governança', sub: 'Squad CORE OPERATIONS', icon: 'cpu', color: '#a855f7', x: 50, y: 150, agents: ['@master', '@pm', '@sm'] },
    { id: 'p2', title: '02. Arquitetura', sub: 'Squad INFRA-CORE', icon: 'shield', color: '#C5A059', x: 350, y: 150, agents: ['@architect', '@ux-expert'] },
    { id: 'p3', title: '03. Avatar & Research', sub: 'Squad MARKETING', icon: 'search', color: '#ec4899', x: 650, y: 150, agents: ['@analyst', '@persona'] },
    { id: 'p4', title: '04. Content Factory', sub: 'Squad CONTENT FACTORY', icon: 'pen-tool', color: '#10b981', x: 950, y: 100, agents: ['@copywriter', '@art'] },
    { id: 'p4b', title: '04. Data Mapping', sub: 'Liaison Layer', icon: 'database', color: '#10b981', x: 950, y: 300, agents: ['@liaison', '@brand-master'] },
    { id: 'p5', title: '05. Engineering Vault', sub: 'Squad ENGINEERING', icon: 'terminal', color: '#14b8a6', x: 1300, y: 100, agents: ['@dev', '@data'] },
    { id: 'p5b', title: '05. Security & QA', sub: 'Hardening Layer', icon: 'lock', color: '#14b8a6', x: 1300, y: 300, agents: ['@security', '@qa'] },
    { id: 'p6', title: '06. Profit Engine', sub: 'Squad GROWTH & SCALE', icon: 'trending-up', color: '#f97316', x: 1650, y: 200, agents: ['@cro-expert', '@marketing'] }
];

const ENGINE_EDGES = [
    ['p1', 'p2'], ['p2', 'p3'], ['p3', 'p4'], ['p3', 'p4b'], 
    ['p4', 'p5'], ['p4b', 'p5'], ['p5', 'p5b'], ['p5b', 'p6']
];

function renderEngine() {
    const canvas = document.getElementById('engine-canvas');
    const svg = document.getElementById('engine-svg');
    if(!canvas || !svg) return;

    canvas.innerHTML = '';
    svg.innerHTML = '';

    ENGINE_NODES.forEach(n => {
        const div = document.createElement('div');
        div.className = 'funnel-node';
        div.style.left = n.x + 'px';
        div.style.top = n.y + 'px';
        div.innerHTML = \`
            <div class="node-port port-in" style="border-color:\${n.color}"></div>
            <div class="node-port port-out" style="border-color:\${n.color}"></div>
            <div class="node-icon" style="background:\${n.color}20"><i data-lucide="\${n.icon}" style="width:16px;height:16px;color:\${n.color}"></i></div>
            <div class="node-title">\${n.title}</div>
            <div class="node-sub">\${n.sub}</div>
            <div class="flex gap-1 mt-2 opacity-60">
                \${n.agents.map(a => \`<span class="text-[7px] bg-white/5 border border-white/10 px-1 rounded">\${a}</span>\`).join('')}
            </div>
        \`;
        canvas.appendChild(div);
    });

    ENGINE_EDGES.forEach(([fromId, toId]) => {
        const from = ENGINE_NODES.find(n => n.id === fromId);
        const to = ENGINE_NODES.find(n => n.id === toId);
        if(!from || !to) return;
        const x1 = from.x + 180;
        const y1 = from.y + 40;
        const x2 = to.x;
        const y2 = to.y + 40;
        const mx = (x1 + x2) / 2;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', \`M\${x1},\${y1} C\${mx},\${y1} \${mx},\${y2} \${x2},\${y2}\`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'rgba(255,255,255,0.08)');
        path.setAttribute('stroke-width', '2');
        svg.appendChild(path);
    });
    lucide.createIcons();
}
`;

h = h.replace('const WORKFLOW_STEPS =', engineDataAndLogic + '\nconst WORKFLOW_STEPS =');

// 4. Update switchTab and syncAll
h = h.replace('if(tab === \'workflow\') renderWorkflow();', 'if(tab === \'workflow\') renderWorkflow();\n    if(tab === \'engine\') renderEngine();');
h = h.replace('renderWorkflow(); renderSquads();', 'renderEngine(); renderWorkflow(); renderSquads();');

fs.writeFileSync('docs/aiox_dashboard.html', h, 'utf8');
console.log('The Machine (n8n-style context) created as a separate tab.');
