import fs from 'node:fs';
import path from 'node:path';

const sommersRoot = 'C:/AIOX/Workspace/SommersStore';
const protheusRoot = 'C:/AIOX/Workspace/Protheus';

// 1. Update docs/control/memory_mutations.json in SommersStore
const mutationsPath = path.join(sommersRoot, 'docs/control/memory_mutations.json');
let mutationsData = { mutations: [] };
try {
  mutationsData = JSON.parse(fs.readFileSync(mutationsPath, 'utf8'));
} catch (e) {}

const newMutation = {
  timestamp: new Date().toISOString(),
  memory_scope: "session_shutdown",
  diff_summary: "Scribe encerrou sessao: Concluida Fase 1 no Protheus (PRO-012, AIOX_Trader_On_Chart v1.60 com tolerancia 20% e override, Copiador Local com stops estaticos, Gamma_SFX_Cyan e presets das 5 contas). Transcricao literal completa salva no Desktop.",
  mutated_by: "scribe",
  project_id: "protheus"
};

mutationsData.mutations.push(newMutation);
fs.writeFileSync(mutationsPath, JSON.stringify(mutationsData, null, 4), 'utf8');
console.log('memory_mutations.json atualizado');

// 2. Update docs/memory/startup_context_latest.md
const startupContextPath = path.join(sommersRoot, 'docs/memory/startup_context_latest.md');
const startupContent = `# Startup Context (Latest)

## Session
- generated_at: ${new Date().toISOString()}
- session_id: PROTHEUS-PRO-012-PHASE-1-COMPLETE

## Continuity Snapshot
- checkpoint_id: CHK-PROTHEUS-PRO-012-PHASE-1
- checkpoint_strategy: latest_actionable_milestone
- checkpoint_title: Fase 1 da Story PRO-012 concluida com exito no Protheus
- where_it_stopped: Concluida a Fase 1 integralmente no workspace Protheus (C:\\AIOX\\Workspace\\Protheus). Implementado o Gestor de Risco v1.60 com tolerancia de 20%, OrderCalcProfit e botao sutil de override com reset automatico; Copiador Local MT5 portado e blindado com stops estaticos e parciais via CTrade; Template Gamma_SFX_Cyan criado a partir da referencia do Centro de Comando; Presets das 5 contas gerados; Suite de testes com 15/15 aprovados e gates 100% limpos. Arquivo literal completo da conversa salvo na Area de Trabalho: C:\\Users\\AMD\\Desktop\\Conversa_Sessao_2026-09-24_MT5_Risco_Copiador.md.
- next_action: Na retomada (Fase 2), realizar o backup e a limpeza dos copiadores terceiros antigos nas 5 pastas de dados do MT5, compilar os EAs via MetaEditor e preparar o ensaio demo controlado exclusivamente entre Master ActivTrades Demo (6275085) e FTMO Demo (1514716800) com lote minimo 0.01.

## Ultimas Conversas Relevantes
- last_sessions: 3
- conversa_1: Story 2.116 publicada com continuidade Git multirrepositorio.
- conversa_2: Leitura do arquivo Risco_Cópia_1.txt e revisao preliminar da topologia de 5 contas MT5.
- conversa_3: Conclusao da Fase 1 no Protheus (Story PRO-012), gestor de risco v1.60 com margem de 20%, botao sutil de override, copiador local, template Gamma_SFX_Cyan e transcricao literal salva.

## Fonte
- C:\\Users\\AMD\\Desktop\\Conversa_Sessao_2026-09-24_MT5_Risco_Copiador.md
- C:\\AIOX\\Workspace\\Protheus\\docs\\stories\\PRO-012-mt5-risk-manager-local-trade-copier.md
- C:\\AIOX\\Workspace\\Protheus\\platforms\\mt5\\AIOX_Trader_On_Chart.mq5
- C:\\AIOX\\Workspace\\Protheus\\platforms\\mt5\\AIOX_Local_Trade_Copier.mq5
- C:\\AIOX\\Workspace\\Protheus\\platforms\\mt5\\templates\\Gamma_SFX_Cyan.tpl
- C:\\AIOX\\Workspace\\Protheus\\platforms\\mt5\\presets\\
- C:\\AIOX\\Workspace\\Protheus\\records\\PRO-012-mt5-risk-manager-copier-v160-20260925.md
- C:\\AIOX\\Workspace\\Protheus\\test\\mt5-risk-copier.test.mjs
- C:\\AIOX\\Workspace\\Protheus\\task.md
`;

fs.writeFileSync(startupContextPath, startupContent, 'utf8');
console.log('startup_context_latest.md atualizado');
