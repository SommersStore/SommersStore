const fs = require('fs');
const path = require('path');

const dashPath = path.join(__dirname, '../docs/aiox_dashboard.html');
let html = fs.readFileSync(dashPath, 'utf8');

// 1. CSS de .flow para modo row
html = html.replace(
  '.flow{display:flex;flex-direction:column;align-items:center;gap:0;max-width:1020px;margin:0 auto;}',
  '.flow{display:flex;flex-direction:row;align-items:stretch;justify-content:flex-start;gap:0;width:100%;overflow-x:auto;padding:20px 20px 40px; margin:0;}'
);

// 2. CSS de .kb (Knowledge Base bar) para virar uma caixa na esquerda, estilo left-sidebar
html = html.replace(
  '.kb{width:100%;background:rgba(99,102,241,.05);border:1px dashed rgba(99,102,241,.2);border-radius:10px;padding:9px 16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:0;}',
  '.kb{min-width:200px;width:220px;background:rgba(99,102,241,.05);border:1px dashed rgba(99,102,241,.2);border-radius:10px;padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:10px;margin-bottom:0;align-self:stretch;}'
);
html = html.replace(
  '.kb-lbl{font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--indigo);white-space:nowrap;}',
  '.kb-lbl{font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--indigo);margin-bottom:6px;}'
);
html = html.replace(
  '.kb-tag{font-size:.65rem;padding:3px 10px;border-radius:20px;background:rgba(99,102,241,.12);color:#c7d2fe;border:1px solid rgba(99,102,241,.2);cursor:pointer;transition:.15s;}',
  '.kb-tag{font-size:.65rem;padding:4px 12px;border-radius:20px;background:rgba(99,102,241,.12);color:#c7d2fe;border:1px solid rgba(99,102,241,.2);cursor:pointer;transition:.15s;width:100%;text-align:left;}'
);

// 3. Setas (Arrows) .av passam a apontar para a direita e ser horizontais
html = html.replace(
  ".av{width:2px;background:linear-gradient(to bottom,rgba(99,102,241,.5),rgba(99,102,241,.1));margin:0 auto;position:relative;}",
  ".av{width:40px;height:2px;background:linear-gradient(to right,rgba(99,102,241,.5),rgba(99,102,241,.1));margin:auto 0;position:relative;flex-shrink:0;}"
);
html = html.replace(
  ".av::after{content:'▼';position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);color:rgba(99,102,241,.5);font-size:9px;}",
  ".av::after{content:'▶';position:absolute;right:-9px;top:50%;transform:translateY(-50%);color:rgba(99,102,241,.5);font-size:10px;}"
);

// 4. Modificar as alturas estáticas no HTML
html = html.replaceAll('<div class="av" style="height:18px"></div>', '<div class="av" style="width:20px"></div>');
html = html.replaceAll('<div class="av" style="height:22px"></div>', '<div class="av" style="width:30px"></div>');

// 5. Ajustar alinhamento do Orquestrador Mestre
html = html.replace(
  '<div class="bx bi" style="width:260px" onclick="show(\'orch\')" id="b-orch">',
  '<div class="bx bi" style="min-width:240px;align-self:center;" onclick="show(\'orch\')" id="b-orch">'
);

// 6. Ajustar a tag Brk (brackets)
html = html.replace(
  '.brk{border:1.5px dashed rgba(99,102,241,.18);border-radius:14px;padding:14px 12px 16px;width:100%;position:relative;margin-top:6px;}',
  '.brk{border:1.5px dashed rgba(99,102,241,.18);border-radius:14px;padding:26px 16px 16px;position:relative;margin:0;align-self:stretch;display:flex;align-items:center;min-width:260px;}'
);
html = html.replace(
  '.brk-lbl{position:absolute;top:-9px;left:16px;background:var(--bg);padding:0 8px;font-size:.58rem;font-weight:800;color:var(--indigo);letter-spacing:.08em;text-transform:uppercase;}',
  '.brk-lbl{position:absolute;top:-9px;left:16px;background:var(--bg);padding:0 8px;font-size:.58rem;font-weight:800;color:var(--indigo);letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;}'
);

// 7. Fazer .row (que guarda os squads dinâmicos e estáticos) fluir verticalmente como colunas no pipeline
// A classe .row original era display:flex. Vamos sobrescrever no HTML onde for pertinente.
html = html.replace(
  '<div class="row" id="squads-container" style="min-height:80px; align-items: stretch;">',
  '<div class="row" id="squads-container" style="min-height:80px; align-items: stretch; flex-direction:column; gap:10px; width:100%;">\n        <!-- SQUADS AQUI -->'
);

// O Output e os outros precisam de um min-width
html = html.replace(
  '<div class="bx bg" style="width:300px" onclick="show(\'output\')" id="b-output">',
  '<div class="bx bg" style="min-width:260px;align-self:center;" onclick="show(\'output\')" id="b-output">'
);

fs.writeFileSync(dashPath, html);
console.log('Conversao Horizontal Concluída Mestre!');
