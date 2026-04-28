# Task Board (Canonical)

## Current Focus
- [x] Validar e operar a nova memoria em camadas no fluxo diario
- [x] Corrigir fragilidades do painel que afetam continuidade (editor/memory wiring)
- [x] Rodar validacao operacional real do ciclo startup/shutdown no painel
- [x] Auditoria tecnica completa do painel AIOX (server, frontend, registry, memoria)
- [x] Implementar correcoes P0 da auditoria (KPIs nulos, project_id em logs)
- [x] Implementar correcoes P1 (cores squads, handles AGENTS.md, rotacao JSONs)

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
- [ ] Modularizar HTML do painel (P2 auditoria)

## Done in this session
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
- updated_at: 2026-04-28T15:43:24-03:00
