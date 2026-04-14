const fs = require('fs');
let c = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

const agentLogic = `    }).join('');
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
        return \\\`<div class="glass p-4 group relative hover:-translate-y-0.5 transition-transform">
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="btn-ghost text-primary text-[10px] py-1 px-2" onclick="openEditorModal('\\\${a.name} — \\\${a.squad}', '.codex/agents/\\\${a.handle.replace('@','')}.md')">
                    <i data-lucide="edit-3" class="w-3 h-3 inline"></i> Editar
                </button>
            </div>
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-inner shadow-black shrink-0 border border-white/5 bg-white/5">\\\${a.icon}</div>
                    <div>
                        <h3 class="text-xs font-bold text-white">\\\${a.name}</h3>
                        <p class="text-[9px] text-muted font-mono">\\\${a.handle}</p>
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-muted mb-4 leading-relaxed">\\\${a.role}</p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span class="text-[9px] font-bold text-white uppercase tracking-widest px-2 py-0.5 rounded" style="background:\\\${sq}20;color:\\\${sq}">\\\${a.squad}</span>
            </div>
        </div>\\\`;
    }).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}`;

c = c.replace(/    \}\)\.join\(''\);\r?\n\}/g, agentLogic);
fs.writeFileSync('docs/aiox_dashboard.html', c);
console.log('Restored renderAgents!');
