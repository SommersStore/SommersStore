# Agent Session Memory

## Startup protocol (Oracle)
0. Ler `docs/memory/startup_context_latest.md` (quando existir)
1. Ler `docs/control/memory_current_state.json`
2. Ler `docs/control/memory_open_loops.json`
3. Ler ultimo checkpoint em `docs/control/memory_checkpoints.json`
4. Ler `docs/memory/project_memory.md`
5. Ler `task.md`
6. Ler `docs/control/session_state.json` para confirmar sessao ativa/fechada

## Shutdown protocol (Scribe)
1. Atualizar `task.md` com progresso real
2. Atualizar estado/checkpoint quando houver mudanca relevante
3. Registrar mutacao em `docs/control/memory_mutations.json`

## Regra forte
- Sem startup completo: nao iniciar implementacao.
- Sem shutdown completo: nao encerrar sessao.
- Na primeira resposta de uma conversa nova: sinalizar contexto carregado com checkpoint e proxima acao.

## Automacao no painel
- Startup automatico via `POST /api/session/start` (Oracle)
- Shutdown automatico via `POST /api/session/close` (Scribe)
- Estado de sessao em `docs/control/session_state.json`

## Ultima atualizacao
- updated_at: 2026-04-21T06:25:40-03:00
