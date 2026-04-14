const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '..', 'docs', 'aiox_dashboard.html');
let content = fs.readFileSync(filepath, 'utf8');

// 1. Inserir Pane Recipes
if (!content.includes('id="pane-recipes"')) {
    const oldLine = '        <div id="pane-pipeline" class="tab-pane active p-8">';
    const newBlock = `        <!-- ═══════ 0. ALQUIMIA (RECEITAS) ═══════ -->
        <div id="pane-recipes" class="tab-pane p-8">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h2 class="text-base font-bold text-white mb-1"><span class="text-secondary">Cofre</span> de Alquimia</h2>
                    <p class="text-[10px] text-muted uppercase tracking-widest font-bold">Fórmulas Botânicas & Sinergias de Luxo</p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="badge border-secondary/30 text-secondary bg-secondary/10 font-bold uppercase tracking-widest text-[8px]">16 Fórmulas Core</span>
                    <button class="bg-secondary hover:bg-secondary/80 text-[#050508] text-[10px] font-black px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all" onclick="syncAll()">
                        <i data-lucide="refresh-cw" class="w-3 h-3"></i> SINCRONIZAR
                    </button>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="recipes-view"></div>
        </div>\n\n` + oldLine;
    content = content.replace(oldLine, newBlock);
}

fs.writeFileSync(filepath, content, 'utf8');
console.log("Dashboard fixed successfully (Node Script)");
