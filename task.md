# Task Board (Canonical)

## Current Focus
- [x] Validar e operar a nova memoria em camadas no fluxo diario
- [x] Corrigir fragilidades do painel que afetam continuidade (editor/memory wiring)
- [x] Rodar validacao operacional real do ciclo startup/shutdown no painel
- [x] Auditoria tecnica completa do painel AIOX (server, frontend, registry, memoria)
- [x] Implementar correcoes P0 da auditoria (KPIs nulos, project_id em logs)
- [x] Implementar correcoes P1 (cores squads, handles AGENTS.md, rotacao JSONs)
- [x] Criar projeto Financas inicial inspirado na aba Funil do AIOX Master

## Pending Work
- [x] Handoff UX Master > Clones: remover gaveta lateral grande/flutuante e restaurar abertura dos clones dentro do `Inspector` compacto existente.
- [x] Consolidar eventos automaticos de memoria (execution + checkpoint + mutation)
- [x] Popular KPIs com valores reais em registry.json (P0 auditoria)
- [x] Garantir project_id em todos os log entries (P0 auditoria)
- [x] Diferenciar cores SQD-CORE vs SQD-MEM (P1 auditoria)
- [x] Mapear handles de agentes no AGENTS.md (P1 auditoria)
- [x] Proteger gravacoes do painel antigo com escrita atomica e validacao JSON (P1 auditoria)
- [x] Restaurar navegacao lateral completa do painel antigo e proteger sub-abas do Ops Desk/Clones
- [x] Reverter refinamento rejeitado do Master > Squads e estabilizar inspector lateral
- [/] Avancar para conteudo (ebooks) com checkpoints ativos
- [ ] Preparar trilha de integracao de checkout
- [x] Retomar drag-and-drop de squads (agente, skill, persona/clone)
- [x] Evoluir aba Financas para painel interativo com entrada de dados
- [x] Refinar aba Financas com mapa operacional no modelo da aba Mapa
- [ ] Evoluir projeto Financas com pesquisa juridica, simulacoes e intake real das dividas
- [/] Alimentar o painel Financas com credores, gastos reais, propostas e documentos
- [ ] Modularizar HTML do painel (P2 auditoria)

## Done in this session
- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0397

- [x] Projeto Financas criado com brief, funil operacional, templates de dados e registro no Master Hub/Funil.
- [x] Story 2.14 aberta para rastrear o projeto Financas inicial.
- [x] Fontes oficiais iniciais mapeadas para superendividamento, cidadania financeira, CVM e Tesouro Direto.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.
- [x] UX ajustada: Financas saiu do submenu Funil e virou aba lateral abaixo de Projeto.
- [x] Painel Financas aprimorado com abas internas, KPIs, formularios, tabelas editaveis, metas, plano operacional e persistencia em `projects/financas/data/finance_state.json`.
- [x] Teste visual via Puppeteer confirmou aba ativa, KPIs, abas internas e formulario de dividas.
- [x] Story 2.16 concluida: aba Financas agora segue o modelo da aba Mapa com toolbar refinada, filtros, legenda, canvas operacional, nos conectados e detalhe lateral.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando 7 KPIs, 12 nos, 12 conexoes, detalhe lateral e filtro `Pressao`.
- [x] Story 2.17 concluida: planilha `Financeiro 2026.xlsx` analisada e integrada a aba Financas.
- [x] Snapshot importado: receita R$ 15.507,03, despesas R$ 1.870, divida total R$ 178.744, parcelas mensais R$ 5.815,44 e reserva R$ 50.
- [x] Dividas individualizadas por credor/linha a partir da aba `PESSOAL`, mantendo totais iguais aos da planilha.
- [x] Subaba `Planilha` adicionada em Financas com origem, abas lidas, alertas de qualidade, workflow e sugestoes de melhoria.
- [x] Artefatos criados: `projects/financas/data/financeiro_2026_import.json` e `projects/financas/financeiro_2026_review.md`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando subaba `Planilha`, 7 KPIs e 13 nos no mapa.
- [x] Story 2.18 concluida: Financas rebaseada na aba `SsS Ltda 2025`.
- [x] Snapshot operacional de maio/2026 importado: receita R$ 11.257, despesas R$ 2.792, dividas mensais R$ 11.654, saldo mensal -R$ 3.189 e acumulado -R$ 14.261.
- [x] Forecast mensal de novembro/2025 a dezembro/2026 exposto na subaba `Planilha`.
- [x] Artefatos criados: `projects/financas/data/financeiro_2026_sss_ltda_2025_import.json` e `projects/financas/financeiro_2026_sss_ltda_2025_review.md`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando 14 linhas de forecast.

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0306

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0305

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0303

- [x] Reparo do painel: sidebar completa restaurada (Status, Control/Ops Desk, Memory, Squads, Agents, Skills, Personas) e `Clones` voltou a carregar assets enriquecidos via `/api/personas/assets`.
- [x] Varredura do painel: endpoints GET do dashboard responderam 200, todas as abas laterais/sub-abas do Ops Desk abriram e Master > Sais > Clones renderizou 6 clones com arquivos presentes.
- [x] Validacao do painel: `npm run lint`, `npm run typecheck`, `npm test` e sweep via Puppeteer em `http://localhost:4000/`.
- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0265

- [x] Estabilização do Dashboard (Rotação de logs implementada).
- [x] Restauração do Clone Inspector (Gaveta removida).
- [x] Limpeza de arquivos de memória (project_memory.md e task.md).
- [x] Diagnóstico de hardware do usuário (C: com 26GB livres).
- [x] Geração do PDF Editorial: "O Cofre das Botânicas Secretas" (28 páginas).
- [x] Draft do Volume I de "THE BLACK PROTOCOL" (Manifesto e Guia).

## Risks
- Automacao implantada precisa de validacao operacional recorrente para detectar regressao cedo.
- Se `task.md` nao for mantido, o protocolo Oracle/Scribe perde eficacia.

## Last updated
- updated_at: 2026-05-09T02:02:14-03:00
