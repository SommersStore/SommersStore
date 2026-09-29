import fs from 'node:fs';
import path from 'node:path';

const protheusRoot = 'C:/AIOX/Workspace/Protheus';
const taskPath = path.join(protheusRoot, 'task.md');

let taskContent = fs.readFileSync(taskPath, 'utf8');

const newTasks = `- [x] Implementar gestao de risco segura v1.60 no MT5 com margem de tolerancia de 20%, OrderCalcProfit e botao sutil de override (PRO-012).
- [x] Portar e blindar o copiador local MT5 no Protheus com topologia 1 master e 4 receptoras via FILE_COMMON (PRO-012).
- [x] Criar template visual alternativo Gamma_SFX_Cyan inspirado no Centro de Comando e presets das 5 contas (PRO-012).
- [ ] Validar compilacao dos EAs via MetaEditor e executar ensaio operacional demo isolado entre Master ActivTrades e FTMO (PRO-012).
`;

if (!taskContent.includes('PRO-012')) {
  if (taskContent.includes('## Agora\r\n\r\n')) {
    taskContent = taskContent.replace('## Agora\r\n\r\n', '## Agora\r\n\r\n' + newTasks);
  } else if (taskContent.includes('## Agora\n\n')) {
    taskContent = taskContent.replace('## Agora\n\n', '## Agora\n\n' + newTasks);
  } else {
    taskContent = taskContent.replace('## Agora', '## Agora\n\n' + newTasks);
  }
  
  // Update next action
  const nextActionSection = `## Próxima ação objetiva\r\n\r\nSubmeter os EAs compilados e o template Gamma_SFX_Cyan ao MetaEditor para geracao dos binarios (.ex5) com 0 erros/warnings, e preparar o ensaio demo controlado exclusivamente entre Master ActivTrades Demo (6275085) e FTMO Demo (1514716800) com lote 0.01 (PRO-012).\r\n`;
  taskContent = taskContent.replace(/## Pr[oó]xima a[cç][aã]o objetiva[\s\S]*$/, nextActionSection);

  fs.writeFileSync(taskPath, taskContent, 'utf8');
  console.log('Protheus task.md atualizado com PRO-012');
} else {
  console.log('Protheus task.md já contém PRO-012');
}

// Generate Record / Handoff in Protheus
const recordsDir = path.join(protheusRoot, 'records');
fs.mkdirSync(recordsDir, { recursive: true });
const recordFile = path.join(recordsDir, 'PRO-012-mt5-risk-manager-copier-v160-20260925.md');
const recordContent = `# Registro de Decisao e Handoff - PRO-012

**Data:** 2026-09-25T00:30:00-03:00
**Story:** PRO-012 - Gestao de risco segura v1.60 e copiador local MT5
**Ambiente:** Protheus (\`C:\\AIOX\\Workspace\\Protheus\`)

## Decisoes e Entregas

1. **Gestor de Risco AIOX_Trader_On_Chart.mq5 (v1.60)**:
   - Implementado calculo de risco em moeda da conta com \`OrderCalcProfit\`.
   - Incorporada margem de tolerancia configuravel de 20% (\`RiskTolerancePercent = 20.0\`).
   - Criado botao de sobrescrita consciente de risco (\`AIOX_TOC_BTN_RISK_OVERRIDE\`). Quando o lote minimo excede o teto de 20%, a boleta e bloqueada por padrao (fail-closed); o operador pode armar o botao em ambar (\`[X] Risco >20% AUTORIZADO\`) para autorizar a operacao.
   - Adicionada trava fail-safe: o botao desmarca automaticamente logo apos o envio da ordem.
   - Incorporada paleta cyber cyan alinhada a estetica do Centro de Comando (\`TEMA_GAMMA_CYAN\`).

2. **Copiador Local AIOX_Local_Trade_Copier.mq5**:
   - Paridade e seguranca local via \`FILE_COMMON\`.
   - Stops estaticos por preco de abertura do master.
   - Sequencia monotonicamente resiliente a reinicializacao com timestamp.
   - Reducao parcial compativel com \`PositionClosePartial\`.
   - Topologia de 1 Master e 4 Receptoras com protecao fail-closed.

3. **Template Visual Gamma_SFX_Cyan.tpl**:
   - Criado a partir do \`Gamma_SFX.tpl\` em UTF-16LE, preservando 100% dos indicadores tecnicos.
   - Paleta escura: fundo Obsidian Navy (\`#070B12\` / 1182471), texto e eixos em Cyan Neon (\`#00E5FF\` / 16770304), velas Bull em Cyan e Bear em Carmesim (\`#FF1744\` / 4462591).

4. **Presets das 5 Contas**:
   - Master ActivTrades Demo 6275085: \`presets/master-activtrades-demo-6275085.set\`.
   - FTMO Demo 1514716800 (Ativa para teste): \`presets/receiver-ftmo-demo-1514716800.set\` (\`MaxReceiverLot=0.01\`).
   - Funded Trader Markets 227066 (Inativa): \`ReceiverEnabled=0\`.
   - Blue Guardian 570363 (Inativa): \`ReceiverEnabled=0\`.
   - Zero Markets - LVL Funding 135070062 (Inativa): \`ReceiverEnabled=0\`.

5. **Quality Gates do Protheus**:
   - Lint aprovado (11 arquivos).
   - Typecheck aprovado (17 agentes, 6 skills, 6 etapas).
   - Test suite aprovado (15/15 testes passando).
`;

fs.writeFileSync(recordFile, recordContent, 'utf8');
console.log('Record PRO-012 criado em Protheus');
