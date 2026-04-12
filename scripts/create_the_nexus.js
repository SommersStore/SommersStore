const fs = require('fs');
let h = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

// 1. Sidebar icon for "THE NEXUS"
const nexusIcon = `        <div data-tab="nexus" class="sb-icon" onclick="switchTab('nexus', this)"><i data-lucide="layout" class="w-4 h-4"></i><span class="sb-label">The Nexus</span></div>`;
if (!h.includes('data-tab="nexus"')) {
    h = h.replace(/<div data-tab="roadmap"/, nexusIcon + '\n        <div data-tab="roadmap"');
}

// 2. CSS for Round Nodes
const nexusStyle = `
<style>
.nexus-node {
    position: absolute; width: 44px; height: 44px; border-radius: 50%;
    background: rgba(13, 13, 20, 0.95); border: 2px solid rgba(255,255,255,0.08);
    display: flex; items-center; justify-center; cursor: pointer; transition: all 0.3s;
    z-index: 5; box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.nexus-node:hover { border-color: #a855f7; transform: scale(1.1) translateY(-2px); box-shadow: 0 0 15px rgba(168,85,247,0.3); }
.nexus-node.active-node { border-color: #10b981; box-shadow: 0 0 20px rgba(16,185,129,0.4); }
.nexus-label {
    position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
    margin-top: 12px; white-space: nowrap; text-align: center; pointer-events: none;
}
.nexus-label h4 { font-size: 8px; font-weight: 800; text-transform: uppercase; color: #fff; letter-spacing: 0.05em; margin-bottom: 2px; }
.nexus-label p { font-size: 7px; color: #6b7280; font-weight: 600; text-transform: uppercase; }
</style>
`;
if (!h.includes('nexus-node')) {
    h = h.replace('</head>', nexusStyle + '\n</head>');
}

// 3. Pane for Nexus
const paneNexus = `
        <!-- ═══════ 2 (THE NEXUS). MASTER GRAPH ═══════ -->
        <div id="pane-nexus" class="tab-pane" style="overflow:hidden;position:relative;padding:0">
            <div id="nexus-header" style="position:absolute;top:0;left:0;right:0;z-index:10;padding:24px;background:linear-gradient(to bottom,rgba(10,10,15,0.95),transparent);pointer-events:none">
                <div style="pointer-events:auto">
                    <h2 class="text-xl font-black italic tracking-tighter uppercase"><span class="text-primary">The Nexus</span> <span class="text-white">Unified Core</span></h2>
                    <p class="text-[9px] text-muted font-mono tracking-widest uppercase">Cronologia Atômica SommersStore Elite</p>
                </div>
            </div>
            <div id="nexus-viewport" style="width:100%;height:100%;overflow:auto;background:radial-gradient(circle at 1px 1px,rgba(168,85,247,0.03) 1px,transparent 0);background-size:32px 32px">
                <svg id="nexus-svg" style="position:absolute;top:0;left:0;width:3200px;height:1000px;z-index:1;pointer-events:none"></svg>
                <div class="funnel-canvas" id="nexus-canvas" style="width:3200px;height:1000px;position:relative;z-index:2"></div>
            </div>
        </div>
`;
if (!h.includes('id="pane-nexus"')) {
    h = h.replace('<div id="pane-roadmap"', paneNexus + '\n        <div id="pane-roadmap"');
}

// 4. Data and Render Logic
const nexusLogic = `
const NEXUS_DATA = [
    { id:'n1', x:100, y:200, title:'Roadmap Estratégico', phase:'Fase 01', squad:'Core Ops', color:'#a855f7', icon:'map', agents:['@master','@pm'], details: { m:'Definição de visão, épicos e backlog do projeto.', i:'Business Briefing', o:'Master Roadmap' } },
    { id:'n2', x:250, y:200, title:'MDS & Branding', phase:'Fase 02', squad:'Infra Core', color:'#C5A059', icon:'shield', agents:['@architect','@brand-master'], details: { m:'Criação do Master Design System e diretrizes visuais.', i:'Roadmap', o:'MDS Tokens / Brandbook' } },
    { id:'n3', x:400, y:300, title:'Pesquisa Avatar', phase:'Fase 03', squad:'Marketing', color:'#ec4899', icon:'users', agents:['@analyst','@persona'], details: { m:'Mapeamento de avatar Marina e estudo de comportamento.', i:'MDS', o:'Persona Profile' } },
    { id:'n4', x:550, y:200, title:'Copywriting Elite', phase:'Fase 04', squad:'Content', color:'#10b981', icon:'pen-tool', agents:['@copywriter'], details: { m:'Escrita persuasiva aristocrática para o produto.', i:'Persona Profile', o:'Sales Copy V1' } },
    { id:'n5', x:700, y:150, title:'Direção de Arte', phase:'Fase 04', squad:'Content', color:'#10b981', icon:'palette', agents:['@art-director'], details: { m:'Direção estética editorial e diagramação HD.', i:'Sales Copy', o:'Premium Assets' } },
    { id:'n6', x:700, y:350, title:'Data Mapping', phase:'Fase 04', squad:'Content', color:'#10b981', icon:'database', agents:['@liaison'], details: { m:'Estruturação JSON atômica das fórmulas do e-book.', i:'Raw Recipes', o:'Content JSONs' } },
    { id:'n7', x:900, y:200, title:'Engineering Backend', phase:'Fase 05', squad:'Engineering', color:'#14b8a6', icon:'terminal', agents:['@dev','@data-engineer'], details: { m:'Implementação do sistema de entrega e banco imutável.', i:'MDS / JSONs', o:'Live App Backend' } },
    { id:'n8', x:1050, y:100, title:'Security Vault', phase:'Fase 05', squad:'Engineering', color:'#14b8a6', icon:'lock', agents:['@security'], details: { m:'Configuração de segurança Firebase e proteção de dados.', i:'Data Schemes', o:'Hardened Firebase' } },
    { id:'n9', x:1050, y:300, title:'QA Protocol', phase:'Fase 05', squad:'Engineering', color:'#14b8a6', icon:'check-square', agents:['@qa'], details: { m:'Protocolo de testes estritos e auditoria de UX.', i:'Dev Output', o:'Certificado QA Alpha' } },
    { id:'n10', x:1250, y:200, title:'Funnel Mastery', phase:'Fase 06', squad:'Growth', color:'#f97316', icon:'trending-up', agents:['@cro-expert'], details: { m:'Otimização de checkout, upsells e taxas de conversão.', i:'Live App', o:'Profit Funnel' } },
    { id:'n11', x:1400, y:200, title:'Scale Strategy', phase:'Fase 06', squad:'Growth', color:'#f97316', icon:'megaphone', agents:['@marketing'], details: { m:'Estratégia de tráfego pago e escala de vendas massiva.', i:'Profit Funnel', o:'ROI Scale' } }
];

const NEXUS_EDGES = [ ['n1','n2'],['n2','n3'],['n3','n4'],['n4','n5'],['n4','n6'],['n5','n7'],['n6','n7'],['n7','n8'],['n7','n9'],['n8','n10'],['n9','n10'],['n10','n11'] ];

function renderNexus() {
    const canvas = document.getElementById('nexus-canvas');
    const svg = document.getElementById('nexus-svg');
    if(!canvas || !svg) return;
    canvas.innerHTML = '';
    svg.innerHTML = '';

    NEXUS_DATA.forEach(n => {
        const div = document.createElement('div');
        div.className = 'nexus-node';
        div.style.left = n.x + 'px';
        div.style.top = n.y + 'px';
        div.onclick = () => {
            document.querySelectorAll('.nexus-node').forEach(x => x.classList.remove('active-node'));
            div.classList.add('active-node');
            
            // Open detail manual style for context
            const detail = n.details;
            let html = \`<div class="p-4"><span class="badge" style="background:\${n.color}20; color:\${n.color}">\${n.phase}</span><h3 class="mt-4 text-white font-bold">\${n.title}</h3><p class="text-[10px] text-muted mb-4uppercase">\${n.squad}</p><p class="text-[11px] text-muted leading-relaxed mb-6">\${detail.m}</p><div class="space-y-4 border-t border-white/5 pt-4"><div><p class="text-[10px] font-bold text-primary">AGENTES</p><p class="text-[11px] text-white">\${n.agents.join(' · ')}</p></div><div><p class="text-[10px] font-bold text-muted uppercase tracking-widest">Entrada ➔ Saída</p><p class="text-[10px] italic text-muted">\${detail.i} ➔ \${detail.o}</p></div></div></div>\`;
            document.getElementById('drawer-title').textContent = 'Detalhes do Nodo';
            document.getElementById('drawer-content').innerHTML = html;
            document.getElementById('detail-drawer').classList.add('open');
        };
        div.innerHTML = \`<i data-lucide="\${n.icon}" style="width:16px;height:16px;color:\${n.color}"></i><div class="nexus-label"><h4>\${n.title}</h4><p>\${n.phase}</p></div>\`;
        canvas.appendChild(div);
    });

    NEXUS_EDGES.forEach(([fId, tId]) => {
        const f = NEXUS_DATA.find(n => n.id === fId);
        const t = NEXUS_DATA.find(n => n.id === tId);
        const x1 = f.x + 22, y1 = f.y + 22, x2 = t.x + 22, y2 = t.y + 22;
        const mx = (x1 + x2) / 2;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', \`M\${x1},\${y1} C\${mx},\${y1} \${mx},\${y2} \${x2},\${y2}\`);
        path.setAttribute('fill', 'none'); path.setAttribute('stroke', 'rgba(255,255,255,0.06)'); path.setAttribute('stroke-width', '2');
        svg.appendChild(path);
    });
    lucide.createIcons();
}
`;

h = h.replace('const WORKFLOW_STEPS =', nexusLogic + '\nconst WORKFLOW_STEPS =');
h = h.replace('if(tab === \'roadmap\') renderRoadmap();', "if(tab === 'roadmap') renderRoadmap();\n    if(tab === 'nexus') renderNexus();");
h = h.replace('renderRoadmap(); renderEngine();', 'renderNexus(); renderRoadmap(); renderEngine();');

fs.writeFileSync('docs/aiox_dashboard.html', h, 'utf8');
console.log('THE NEXUS (Master Unified Graph) created.');
