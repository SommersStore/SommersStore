const fs = require('fs');
let h = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

// 1. Add Workflow icon to Sidebar (above Pipeline)
const workflowIcon = `        <div data-tab="workflow" class="sb-icon"><i data-lucide="git-branch" class="w-4 h-4"></i><span class="sb-label">Workflow</span></div>`;
h = h.replace(/<div data-tab="pipeline"/, workflowIcon + '\n        <div data-tab="pipeline"');

// 2. Add Workflow Pane before Pipeline Pane
const workflowPane = `        <!-- ═══════ 2. MASTER WORKFLOW ═══════ -->
        <div id="pane-workflow" class="tab-pane">
            <div class="p-8 max-w-5xl mx-auto">
                <div class="mb-12">
                    <h2 class="text-2xl font-black uppercase tracking-tighter mb-2 italic">AIOX Master Workflow</h2>
                    <p class="text-xs text-muted uppercase tracking-[0.3em] font-bold">O Ciclo de Vida Cronológico da SommersStore</p>
                </div>
                <div id="workflow-container" class="relative pl-12 border-l border-white/5 space-y-16">
                    <!-- Workflow items will be injected here -->
                </div>
            </div>
        </div>
`;
h = h.replace(/<!-- ═══════ 2\. PIPELINE SYSTEM ═══════ -->/, workflowPane + '        <!-- ═══════ 2. PIPELINE SYSTEM ═══════ -->');

// 3. Update syncAll to include renderWorkflow
h = h.replace('renderSquads();', 'renderWorkflow(); renderSquads();');

// 4. Add renderWorkflow function
const renderWorkflowFunc = `
function renderWorkflow() {
    const c = document.getElementById('workflow-container');
    if(!c) return;
    c.innerHTML = WORKFLOW_STEPS.map((s, idx) => \`
        <div class="relative group">
            <!-- Connector Dot -->
            <div class="absolute -left-[53px] top-6 w-10 h-10 rounded-full border-4 border-black flex items-center justify-center z-10" style="background: \${s.color}">
                <i data-lucide="\${s.icon}" class="w-4 h-4 text-black"></i>
            </div>
            
            <div class="glass p-8 border border-white/5 group-hover:border-white/10 transition-colors">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <span class="text-[9px] font-black uppercase tracking-[0.3em] px-2 py-0.5 rounded-full mb-2 inline-block" style="background: \${s.color}20; color: \${s.color}">
                            \${s.phase} — SQUAD: \${s.squad}
                        </span>
                        <h3 class="text-xl font-bold tracking-tight">\${s.title}</h3>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-white/10 \${s.status === 'done' ? 'text-green-400' : s.status === 'active' ? 'text-amber-400 animate-pulse' : 'text-muted'}">
                            \${s.status}
                        </span>
                    </div>
                </div>
                
                <p class="text-[11px] text-muted leading-relaxed mb-6 max-w-2xl">\${s.action}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                    <div>
                        <h4 class="text-[8px] uppercase tracking-widest font-black text-primary mb-3">Agentes em Ação</h4>
                        <div class="flex flex-wrap gap-2 text-[10px] font-bold">
                            \${s.agents.map(a => \`<span class="px-2 py-1 rounded bg-white/5 border border-white/5">\${a}</span>\`).join('')}
                        </div>
                    </div>
                    <div>
                        <h4 class="text-[8px] uppercase tracking-widest font-black text-muted mb-3">Hands-Off (Input ➔ Output)</h4>
                        <div class="flex items-center gap-3 text-[10px] text-muted italic">
                            <span>\${s.input}</span>
                            <i data-lucide="arrow-right" class="w-3 h-3 text-primary"></i>
                            <span class="text-white not-italic font-bold">\${s.output}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    \`).join('');
    lucide.createIcons();
}
`;

h = h.replace('function renderSquads() {', renderWorkflowFunc + '\nfunction renderSquads() {');

fs.writeFileSync('docs/aiox_dashboard.html', h, 'utf8');
console.log('Workflow Tab integrated successfully.');
