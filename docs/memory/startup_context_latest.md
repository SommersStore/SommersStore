# Startup Context (Latest)

## Session
- generated_at: 2026-09-08T15:16:37-03:00
- session_id: MIG-PC-NOVO-20260908

## Continuity Snapshot
- checkpoint_id: CHK-MIG-PC-NOVO-PRIMARY-CORE
- checkpoint_strategy: latest_actionable_milestone
- checkpoint_title: PC novo promovido como base principal do nucleo local-first
- where_it_stopped: Workspace, Git, dados privados, Codex, pacote, JForex e espelho local foram revalidados. O PC novo e a base principal para esses escopos; GitHub e Google Drive permanecem copias. MetaTrader 5 e NinjaTrader ficaram sob configuracao manual do usuario, e o smoke JForex DEMO continua pendente.
- next_action: Concluir manualmente MetaTrader 5 e NinjaTrader com automacao e ordens desativadas, realizar smoke JForex em DEMO e registrar os resultados sem transferir credenciais.

## Ultimas Conversas Relevantes
- last_sessions: 3
- sessions_considered: migration_pc_new
- conversa_1: A restauracao conservadora copiou 27.024 arquivos e substituiu somente tres dados privados, restando 487 conflitos preservados e zero erros.
- conversa_2: Os 487 conflitos foram salvos em backup e tratados seletivamente: Codex mesclado, Workspace/NinjaTrader preservados e MetaTrader mantido apos classificacao integral; gates aprovados.
- conversa_3: O pacote, Codex, JForex, Git e espelho local foram revalidados; o PC novo foi promovido como base principal do nucleo, enquanto MT5/NinjaTrader e o smoke JForex ficaram manuais.

## Fonte
- `docs/stories/2.112.story.md`
- `docs/memory/project_memory.md`
- `docs/control/memory_mutations.json`
- `task.md`
