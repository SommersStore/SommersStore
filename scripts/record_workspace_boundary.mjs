import fs from 'node:fs';

// 1. Update project_memory.md
const pmFile = 'docs/memory/project_memory.md';
let pmContent = fs.readFileSync(pmFile, 'utf8');
const targetLine = '- Nao encerrar sessao sem registrar mutacao em `docs/control/memory_mutations.json`.';
const insertion = `${targetLine}
- ISOLAMENTO MANDATÓRIO: Projetos de investimentos, EAs, copiadores e Mesas Proprietárias pertencem EXCLUSIVAMENTE ao workspace Protheus (C:\\AIOX\\Workspace\\Protheus), NUNCA ao SommersStore.

## Diretriz Mandatória de Isolamento — Investimentos, EAs e Mesas no Protheus
- timestamp: 2026-09-28T23:25:06-03:00
- decisao: O usuário determinou expressamente que todo projeto sobre investimentos, EAs, copiadores de ordens, MetaTrader e Mesas Proprietárias (FTMO/Prop Firms) deve sempre ser aberto e desenvolvido dentro do Protheus (C:\\AIOX\\Workspace\\Protheus), nunca no SommersStore.
- escopo_sommersstore: E-commerce, Loja Digital, Finanças Pessoais, Painel de Controle e Gestão Geral.
- escopo_protheus: Automações MQL5, EAs, Copiadores, Análise de Mercado, Brain de Trading e Mesas Proprietárias.
`;

if (!pmContent.includes('Diretriz Mandatória de Isolamento — Investimentos, EAs e Mesas no Protheus')) {
  if (pmContent.includes(targetLine)) {
    pmContent = pmContent.replace(targetLine, insertion);
    fs.writeFileSync(pmFile, pmContent, 'utf8');
    console.log('project_memory.md updated successfully!');
  } else {
    console.log('targetLine not found in project_memory.md');
  }
} else {
  console.log('project_memory.md already contains the directive.');
}

// 2. Update task.md in SommersStore
const taskFile = 'task.md';
let taskContent = fs.readFileSync(taskFile, 'utf8');
const taskItem = '- [x] Registrar diretriz mandatória de isolamento: Projetos de investimentos, EAs, Mesas Proprietárias e MetaTrader devem sempre ser abertos e executados no workspace Protheus (C:\\AIOX\\Workspace\\Protheus) e nunca no SommersStore.';
if (!taskContent.includes('Registrar diretriz mandatória de isolamento')) {
  const currentFocus = '## Current Focus\n';
  taskContent = taskContent.replace(currentFocus, currentFocus + taskItem + '\n');
  fs.writeFileSync(taskFile, taskContent, 'utf8');
  console.log('task.md updated successfully!');
} else {
  console.log('task.md already updated.');
}

// 3. Update startup_context_latest.md
const scFile = 'docs/memory/startup_context_latest.md';
if (fs.existsSync(scFile)) {
  let scContent = fs.readFileSync(scFile, 'utf8');
  const targetWhere = '- where_it_stopped:';
  const newWhere = `- where_it_stopped: Registrada diretriz mandatória do usuário: todo projeto sobre investimentos, EAs, copiadores e Mesas Proprietárias deve SEMPRE ser aberto e executado no workspace Protheus (C:\\AIOX\\Workspace\\Protheus) e NUNCA no SommersStore. Os manuais em PDF foram gerados no Desktop (Manual_Forex_Trade_Panel_FTP_v2.0.pdf e Manual_AIOX_Local_Trade_Copier_v1.10.pdf).\n- workspace_obrigatorio: C:\\AIOX\\Workspace\\Protheus\n`;
  if (scContent.includes(targetWhere)) {
    // replace the where_it_stopped line
    const lines = scContent.split('\n');
    const idx = lines.findIndex(l => l.startsWith('- where_it_stopped:'));
    if (idx !== -1) {
      lines[idx] = newWhere.trim();
      scContent = lines.join('\n');
      fs.writeFileSync(scFile, scContent, 'utf8');
      console.log('startup_context_latest.md updated successfully!');
    }
  }
}

// 4. Update task.md in Protheus
const protheusTaskFile = 'C:/AIOX/Workspace/Protheus/task.md';
if (fs.existsSync(protheusTaskFile)) {
  let ptContent = fs.readFileSync(protheusTaskFile, 'utf8');
  const directive = '- [x] Confirmada diretriz de governança: Todo projeto sobre investimentos, EAs e Mesas Proprietárias pertence e deve ser aberto exclusivamente neste workspace (Protheus).';
  if (!ptContent.includes('Confirmada diretriz de governança: Todo projeto sobre investimentos')) {
    ptContent = ptContent + '\n\n## Governança de Workspace\n' + directive + '\n';
    fs.writeFileSync(protheusTaskFile, ptContent, 'utf8');
    console.log('Protheus task.md updated successfully!');
  }
}

console.log('All governance updates completed!');
