const fs = require('fs');
const path = require('path');

const fluxogramaPath = path.join(__dirname, '../docs/aiox_fluxograma.html');
const dashPath = path.join(__dirname, '../docs/aiox_dashboard.html');

let html = fs.readFileSync(fluxogramaPath, 'utf8');

// 1. Adicionar Botão de Atualizar dinâmico no Header
html = html.replace(
  '<div class="hdr-right">',
  '<div class="hdr-right">\n    <button onclick="fetchData()" id="btnUpdate" style="font-size:.6rem;padding:6px 14px;border-radius:20px;font-weight:700;background:var(--indigo);color:#fff;border:none;cursor:pointer;margin-right:10px;">🔄 Sincronizar Torre</button>\n'
);

// 2. Mudar o Título do Header
html = html.replace('AIOX Central · v2.0</small>', 'AIOX Tower · Modo Observacional</small>');

// 3. Adicionar as novas abas (Relatórios e Design)
html = html.replace(
  '<div class="tab" onclick="sw(\'creditos\',this);initCalc()">💰 Créditos API</div>',
  '<div class="tab" onclick="sw(\'creditos\',this);initCalc()">💰 Créditos API</div>\n  <div class="tab" onclick="sw(\'artefatos\',this)">📓 Relatórios da IA</div>\n  <div class="tab" onclick="sw(\'design\',this)">🎨 Paletas & Designs</div>'
);

// 4. Injetar o container dos Micro-Esquadrões Dinâmicos dentro do Fluxo, logo acima de Revisor
const injectionPoint = '<!-- N4 Revisor + Deploy -->';
const dynamicSquads = `
  <!-- Micro Esquadrões Dinâmicos Injetados -->
  <div class="brk" style="margin-bottom:24px;">
    <span class="brk-lbl" style="color:var(--amber);">⚡ Esquadrões Cirúrgicos Ativos (Lidos do HD)</span>
    <div class="row" id="squads-container" style="min-height:80px; align-items: stretch;">
        <p style="font-size:0.75rem; color:var(--muted); text-align:center; width:100%; padding:20px;">Clique em Sincronizar Torre para ler os Squads (Hook, Pain, etc)</p>
    </div>
  </div>
  <div class="av" style="height:22px"></div>
`;
html = html.replace(injectionPoint, dynamicSquads + injectionPoint);

// 5. Injetar Panes Dinâmicas no final dos panos atuais (antes do primeiro <script>)
const paneStyles = `
/* Relatórios Dinâmicos */
.hist-item {background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 12px; margin-bottom:10px; cursor: pointer; transition:.2s;}
.hist-item:hover {border-color: var(--teal);}
.hist-date {font-size: 0.65rem; color: var(--teal); font-weight:700; margin-bottom: 4px;}
.hist-title {font-size: 0.8rem; font-weight: 600;}
.hist-content {display: none; padding-top: 10px; margin-top: 10px; border-top: 1px dashed var(--border); font-size: 0.75rem; color: var(--dim); line-height: 1.6;}
.hist-content h1, .hist-content h2, .hist-content h3 {color: var(--text); margin: 12px 0 6px;}
.hist-content code {background: rgba(0,0,0,0.5); padding: 2px 5px;}
.hist-item.open .hist-content {display: block;}

/* Design Systems Display */
.ds-card { background: var(--card); border-radius: 12px; padding: 20px; border: 1px solid var(--border); box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
`;
html = html.replace('</style>', paneStyles + '\n</style>');

const newPanes = `
<!-- ══════════ RELATORIOS ══════════ -->
<div id="pane-artefatos" class="pane">
<p class="sec-title">📓 Bitácora Cronológica de Planejamento e Execução</p>
<div id="history-container" style="max-width:800px; margin:0 auto;"></div>
</div>

<!-- ══════════ DESIGN SYSTEMS ══════════ -->
<div id="pane-design" class="pane">
<p class="sec-title">🎨 Temas de Coversão Lidos da Pasta de Branding</p>
<div id="ds-container" class="row" style="flex-wrap: wrap; align-items: stretch;"></div>
</div>
`;
html = html.replace('<!-- ══════════ SKILLS ══════════ -->', newPanes + '\n<!-- ══════════ SKILLS ══════════ -->');

// 6. Injetar a Lógica de Fetch
// Nós vamos colocar isso no final do arquivo, logo antes do </body>
const fetchScript = `
<script>
async function fetchData() {
    const btnIcon = document.getElementById('btnUpdate');
    btnIcon.innerText = "⏳ Lendo arquivos locais...";
    try {
        const res = await fetch('http://localhost:4000/api/data');
        const data = await res.json();
        
        // 1. Squads Cirúrgicos
        let squadsHtml = '';
        const order = ['sp-01-hook.yaml', 'sp-02-pain.yaml', 'sp-03-solution.yaml', 'sp-04-offer.yaml'];
        order.forEach(fileName => {
            if(data.squads[fileName]) {
                const yaml = data.squads[fileName];
                let name = "Squad"; let desc = "";
                const nm = yaml.match(/name:\\s*(.*?)\\n/);
                const dm = yaml.match(/description:\\s*"(.*?)"/);
                if(nm) name = nm[1];
                if(dm) desc = dm[1];

                let boxClass = "bt"; 
                if(fileName.includes("hook")) boxClass = "bp";
                if(fileName.includes("pain")) boxClass = "bc";
                if(fileName.includes("offer")) boxClass = "bi";

                squadsHtml += \`
                <div class="col" style="min-width:180px;">
                  <div class="bx \${boxClass}" style="width:100%; height:100%;" onclick="this.lastElementChild.style.display=this.lastElementChild.style.display==='block'?'none':'block'">
                    <div class="bx-t" style="margin-bottom:8px;">\${name}</div>
                    <div class="bx-s">\${desc}</div>
                    <div class="bx-a" style="margin-top:10px;">YAML Source 👁️</div>
                    <pre style="display:none; text-align:left; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 6px; font-family: monospace; font-size: 0.6rem; color: #a78bfa; overflow-x: auto; margin-top: 10px;">\${yaml}</pre>
                  </div>
                </div>\`;
            }
        });
        document.getElementById('squads-container').innerHTML = squadsHtml || "<p>Nenhum squad extraído do disco.</p>";

        // 2. Design Systems
        const dsContainer = document.getElementById('ds-container');
        dsContainer.innerHTML = '';
        Object.keys(data.design_systems).forEach(k => {
            const sys = data.design_systems[k];
            dsContainer.innerHTML += \`
            <div class="col" style="min-width:250px;">
              <div class="ds-card" style="width:100%; height:100%; border-color: \${sys.colors.primary}; background: \${sys.colors.background};">
                <div style="color:\${sys.colors.primary}; font-weight:900; font-size:1.1rem; margin-bottom:5px;">\${sys.system_name}</div>
                <div style="font-size:0.7rem; color:\${sys.colors.text_muted}; margin-bottom:15px; font-style:italic;">\${sys.archetype}</div>
                
                <div style="font-size:0.7rem; line-height:1.8; color:\${sys.colors.text_main};">
                   <div style="display:flex; align-items:center; gap:8px;">
                     <div style="width:14px;height:14px;border-radius:3px;background:\${sys.colors.primary}"></div>
                     Primary: \${sys.colors.primary}
                   </div>
                   <div style="display:flex; align-items:center; gap:8px;">
                     <div style="width:14px;height:14px;border-radius:3px;background:\${sys.colors.accent}"></div>
                     Accent: \${sys.colors.accent}
                   </div>
                   <div style="display:flex; align-items:center; gap:8px;">
                     <div style="width:14px;height:14px;border-radius:3px;background:\${sys.colors.background}; border: 1px solid #333;"></div>
                     Background: \${sys.colors.background}
                   </div>
                </div>
              </div>
            </div>\`;
        });

        // 3. History Logs
        const histContainer = document.getElementById('history-container');
        histContainer.innerHTML = '';
        if(data.history && data.history.length > 0) {
            data.history.forEach(h => {
                const dateStr = new Date(h.date).toLocaleString('pt-BR');
                let htmlContent = h.content
                    .replace(/^### (.*$)/gim, '<h3 style="color:var(--text);border-bottom:1px solid var(--border);padding-bottom:5px;">$1</h3>')
                    .replace(/^## (.*$)/gim, '<h2 style="color:var(--indigo);border-bottom:1px solid var(--border);padding-bottom:5px;">$1</h2>')
                    .replace(/^# (.*$)/gim, '<h1 style="color:white;font-size:1.2rem;">$1</h1>')
                    .replace(/^\\> \\[\!.*?\\]\\n\\> (.*$)/gim, '<div style="background:var(--indigo-dim);border-left:3px solid var(--indigo);padding:10px;margin:10px 0; border-radius:4px;">$1</div>')
                    .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
                    .replace(/\\n/g, '<br>');

                histContainer.innerHTML += \`
                <div class="hist-item" onclick="this.classList.toggle('open')">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                       <div>
                         <div class="hist-date">\${dateStr}</div>
                         <div class="hist-title">\${h.name.replace('.md', '').toUpperCase()}</div>
                       </div>
                       <div style="color:var(--muted); font-size:0.7rem;">▼ Expandir</div>
                    </div>
                    <div class="hist-content">\${htmlContent}</div>
                </div>\`;
            });
        }

        btnIcon.innerText = "✅ Sincronizado com Sucesso!";
        setTimeout(() => btnIcon.innerText = "🔄 Sincronizar Torre", 3000);
    } catch (e) {
        alert("Erro ao conectar ao Node.js. Inicie o start_painel.bat");
        btnIcon.innerText = "❌ Offline";
    }
}
setTimeout(fetchData, 800);
</script>
`;
html = html.replace('</body>', fetchScript + '\n</body>');

fs.writeFileSync(dashPath, html);
console.log('Dashboard combinado e gerado com sucesso em docs/aiox_dashboard.html');
