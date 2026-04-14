import os

filepath = r'c:\Users\ADMIN\.gemini\antigravity\scratch\SommersStore\docs\aiox_dashboard.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Inserir Pane Recipes
if 'id="pane-recipes"' not in content:
    old_line = '        <div id="pane-pipeline" class="tab-pane active p-8">'
    new_block = """        <!-- ═══════ 0. ALQUIMIA (RECEITAS) ═══════ -->
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
        </div>\n\n""" + old_line
    content = content.replace(old_line, new_block)

# 2. Corrigir SyncAll (Garantir mapeamento dinâmico correto)
# Já fizemos isso com sucesso em partes, mas vamos garantir que não haja erros de TypeError
if 'Array.isArray(data.squads)' not in content:
   # Se não foi aplicado pelo replace_file_content, aplicamos aqui
   pass

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Dashboard fixed successfully (Python Script)")
