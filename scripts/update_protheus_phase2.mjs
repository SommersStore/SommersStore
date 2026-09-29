import fs from 'node:fs';
import path from 'node:path';

const protheusRoot = 'C:/AIOX/Workspace/Protheus';

// Update PRO-012 story tasks to mark Fase 1 complete
const storyPath = path.join(protheusRoot, 'docs/stories/PRO-012-mt5-risk-manager-local-trade-copier.md');
let story = fs.readFileSync(storyPath, 'utf8');

const taskUpdates = [
  ['- [ ] Implementar `platforms/mt5/AIOX_Trader_On_Chart.mq5`', '- [x] Implementar `platforms/mt5/AIOX_Trader_On_Chart.mq5`'],
  ['- [ ] Implementar `platforms/mt5/AIOX_Local_Trade_Copier.mq5`', '- [x] Implementar `platforms/mt5/AIOX_Local_Trade_Copier.mq5`'],
  ['- [ ] Criar template `platforms/mt5/templates/Gamma_SFX_Cyan.tpl`', '- [x] Criar template `platforms/mt5/templates/Gamma_SFX_Cyan.tpl`'],
  ['- [ ] Criar presets individuais das 5 contas em `platforms/mt5/presets/`', '- [x] Criar presets individuais das 5 contas em `platforms/mt5/presets/`'],
  ['- [ ] Implementar suite de testes em `test/mt5-risk-copier.test.mjs`', '- [x] Implementar suite de testes em `test/mt5-risk-copier.test.mjs`'],
  ['- [ ] Validar gates `npm.cmd run lint`, `typecheck` e `test`', '- [x] Validar gates `npm.cmd run lint`, `typecheck` e `test`'],
  ['- [ ] Atualizar `task.md` do Protheus', '- [ ] Atualizar `task.md` do Protheus'],
];

for (const [from, to] of taskUpdates) {
  story = story.replace(from, to);
}

// Add Fase 2 section
const fase2Section = `
## Fase 2 — Ensaio Demo (Em andamento)

**Status:** Em andamento — 2026-09-28  
**Roteiro:** \`docs/qa/PRO-012-ensaio-demo-20260928.md\`

### Etapas concluidas (Fase 2, pre-ensaio):
- [x] Backup e quarentena de copiadores terceiros (MT5 Local Copier, NTS Local Copier) das 5 pastas de dados
- [x] Sincronizacao dos fontes oficiais (v1.60 / v1.10), Gamma_SFX_Cyan.tpl e 5 presets para os 5 terminais
- [x] Compilacao: 10/10 EAs com 0 errors, 0 warnings
- [x] Roteiro de ensaio gerado (8 TCs com criterio de aprovacao e seguranca)
- [ ] Execucao do ensaio demo (TC-01 a TC-08)
- [ ] Atualizacao final do task.md e registro de memoria

`;

if (!story.includes('## Fase 2')) {
  story = story + fase2Section;
}

fs.writeFileSync(storyPath, story, 'utf8');
console.log('Story PRO-012 atualizada com Fase 1 concluida e Fase 2 em andamento.');

// Update task.md
const taskPath = path.join(protheusRoot, 'task.md');
let task = fs.readFileSync(taskPath, 'utf8');

const taskNewEntry = `
## PRO-012 Fase 2 (2026-09-28)

- [x] Backup copiadores terceiros das 5 pastas MT5
- [x] Sincronizacao oficial: AIOX_Trader_On_Chart v1.60, AIOX_Local_Trade_Copier v1.10, Gamma_SFX_Cyan.tpl, 5 presets
- [x] Compilacao 10/10 com 0 errors e 0 warnings via MetaEditor
- [x] Roteiro de ensaio demo gerado (docs/qa/PRO-012-ensaio-demo-20260928.md)
- [ ] Executar ensaio demo TC-01 a TC-08 (ativTrades Demo 6275085 -> FTMO Demo 1514716800)
- [ ] Marcar story PRO-012 como Done
`;

if (!task.includes('PRO-012 Fase 2 (2026-09-28)')) {
  task = task + taskNewEntry;
}
fs.writeFileSync(taskPath, task, 'utf8');
console.log('task.md do Protheus atualizado.');
