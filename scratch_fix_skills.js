const fs = require('fs');
let c = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

const skillsLogic = `    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ══════════════════════════════════════════
// SKILLS RENDER
// ══════════════════════════════════════════
function renderSkills() {
    const skills = REGISTRY.skills || {};
    const view = document.getElementById('skills-view');
    if (!view) return;
    
    view.innerHTML = Object.entries(skills).map(([cat, items]) => \\\`<div>
        <div class="flex items-center gap-2 mb-4"><div class="h-2 w-2 rounded-full bg-primary"></div><span class="text-[10px] font-bold text-primary uppercase tracking-widest">\\\${cat}</span><span class="text-[8px] text-muted">(\\\${items.length} skills)</span></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
            \\\${items.map(s => {
                const file = '.codex/skills/' + skillNameToFile(s.name) + '.md';
                return \\\\\`<div class="glass p-4 cursor-pointer hover:-translate-y-0.5 transition-transform" onclick="openEditorModal('\\\${s.name} — Skill', '\\\${file}')">
                <div class="flex items-center gap-2 mb-2"><span class="text-lg">⚡</span><div><h4 class="text-[10px] font-bold">\\\${s.name}</h4><p class="text-[8px] text-muted font-mono">\\\${s.id}</p></div></div>
                <p class="text-[9px] text-muted leading-relaxed">\\\${s.desc}</p>
                <div class="mt-2 text-[8px] text-primary font-bold uppercase tracking-widest">✏️ Editar</div>
            </div>\\\\\`;
            }).join('')}
        </div>
    </div>\\\`).join('');
}

// ══════════════════════════════════════════
// PERSONAS RENDER`;

c = c.replace(/    if \(typeof lucide !== 'undefined'\) lucide\.createIcons\(\);\r?\n\}\r?\n\r?\n\/\/ ══════════════════════════════════════════\r?\n\/\/ PERSONAS RENDER/g, skillsLogic);
fs.writeFileSync('docs/aiox_dashboard.html', c);
console.log('Restored renderSkills!');
