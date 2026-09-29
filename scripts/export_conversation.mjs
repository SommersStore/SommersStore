import fs from 'node:fs';
import readline from 'node:readline';
import path from 'node:path';

const transcriptPath = 'C:/Users/AMD/.gemini/antigravity-ide/brain/2e3d709f-af6b-4404-b2c0-6d23be8f5048/.system_generated/logs/transcript.jsonl';
const desktopPath = 'C:/Users/AMD/Desktop/Conversa_Sessao_2026-09-24_MT5_Risco_Copiador.md';
const protheusRecordPath = 'C:/AIOX/Workspace/Protheus/records/Conversa_Sessao_2026-09-24_MT5_Risco_Copiador.md';

async function run() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let mdContent = `# Registro Completo e Literal da Conversa - Sessão MT5 Gestor de Risco v1.60 e Copiador Local

**Data:** 2026-09-24 a 2026-09-25
**Ambiente Principal:** Protheus (\`C:\\AIOX\\Workspace\\Protheus\`)
**ID da Conversa:** \`2e3d709f-af6b-4404-b2c0-6d23be8f5048\`
**Status:** Fase 1 Concluída com Sucesso no Protheus (Story PRO-012)
**Objetivo deste Documento:** Permitir que o usuário e/ou qualquer outro agente dê continuidade imediata sem perda de contexto ou retrabalho.

---

## Sumário Executivo para Retomada Imediata

1. **Topologia das Contas Confirmada (1 Master + 4 Receptoras)**:
   - **Master**: ActivTrades Demo — Login \`6275085\` (\`ActivTrades-Server\`).
   - **Receptora 1 (Teste)**: FTMO Demo — Login \`1514716800\` (\`FTMO-Demo\`).
   - **Receptora 2 (Inativa)**: Funded Trader Markets — Login \`227066\` (\`FundedTraderMarkets-Server\`).
   - **Receptora 3 (Inativa)**: Blue Guardian — Login \`570363\` (\`BlueGuardian-Server\`).
   - **Receptora 4 (Inativa)**: LVL Funding - Zero Markets — Login \`135070062\` (\`ZeroMarkets-1\`).
   - *Proteção Máxima*: ActivTrades Real (\`917799\`) e contas reais das mesas protegidas estão 100% fora do escopo de testes operacionais.

2. **Decisões Técnicas Críticas Implementadas na Fase 1**:
   - **Gestor de Risco v1.60** (\`platforms/mt5/AIOX_Trader_On_Chart.mq5\`):
     - Risco calculado em moeda da conta via \`OrderCalcProfit\`.
     - Parâmetro \`InpRiskTolerancePercent = 20.0;\`. Se o lote calculado demandar lote mínimo da corretora (\`0.01\`) e o risco monetário no SL ficar em até +20% do alvo, autoriza automaticamente.
     - Botão sutil de sobrescrita consciente: \`AIOX_TOC_BTN_RISK_OVERRIDE\` (\`[  ] Risco >20%\`). Se a perda no lote mínimo exceder +20%, bloqueia por padrão (*fail-closed*). O operador pode clicar para armar em âmbar (\`[X] Risco >20% AUTORIZADO\`) e executar. Imediatamente após a ordem ser enviada, o botão desmarca-se automaticamente para \`OFF\` (trava *fail-safe*).
     - Paleta Cyber Cyan integrada (\`TEMA_GAMMA_CYAN\`) inspirada no *Centro de Comando* (#070B12 e #00E5FF).
   - **Copiador Local** (\`platforms/mt5/AIOX_Local_Trade_Copier.mq5\`):
     - Stops estáticos por preço absoluto de abertura da master (sem recálculo dinâmico por ticks da receptora).
     - Sequência com timestamp para não travar após reinicializações.
     - Reduções parciais via \`CTrade::PositionClosePartial\`.
   - **Template Visual** (\`platforms/mt5/templates/Gamma_SFX_Cyan.tpl\`):
     - Gerado em UTF-16LE com a paleta escura/ciano, preservando 100% dos indicadores técnicos originais.
   - **Presets**: 5 arquivos gerados em \`platforms/mt5/presets/\`.
   - **Quality Gates Protheus**: Lint, typecheck e 15/15 testes passando.

3. **Próxima Ação Imediata (Fase 2)**:
   - Fazer backup seguro dos copiadores de terceiros das 5 pastas de dados das plataformas para \`C:\\AIOX\\Workspace\\Protheus\\backups\\copiers_terceiros_20260925\\\`.
   - Limpar esses arquivos antigos de \`MQL5/Experts\` dos terminais.
   - Compilar os novos EAs via MetaEditor (\`0 errors, 0 warnings\`) e preparar o ensaio demo controlado exclusivamente entre Master ActivTrades Demo e FTMO Demo com lote 0.01.

---

## Transcrição Integral e Cronológica das Mensagens

`;

  let turnIndex = 1;
  for await (const line of rl) {
    try {
      const obj = JSON.parse(line);
      if (obj.type === 'USER_INPUT') {
        const text = obj.content || '';
        // Skip purely internal synthetic commands if any
        mdContent += `### 👤 [TURNO ${turnIndex}] Mensagem do Usuário:\n\n${text.trim()}\n\n---\n\n`;
      } else if (obj.type === 'PLANNER_RESPONSE') {
        const text = obj.content || '';
        if (text.trim().length > 0) {
          mdContent += `### 🤖 [TURNO ${turnIndex}] Resposta do Assistente:\n\n${text.trim()}\n\n---\n\n`;
          turnIndex++;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // Write to Desktop
  fs.writeFileSync(desktopPath, mdContent, 'utf8');
  console.log('Arquivo salvo com sucesso na Área de Trabalho:', desktopPath);

  // Write copy to Protheus records
  fs.writeFileSync(protheusRecordPath, mdContent, 'utf8');
  console.log('Cópia de segurança salva em Protheus records:', protheusRecordPath);
}

run().catch(console.error);
