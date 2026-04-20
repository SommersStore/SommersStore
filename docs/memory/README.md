# Memory Architecture (Canonical)

Este diretorio e a fonte canonica de memoria humana do projeto.

## Objetivo
Garantir continuidade entre sessoes, reduzir perda de contexto e evitar retrabalho.

## Camadas
- Camada de sessao (lifecycle): `docs/control/session_state.json`
- Camada executiva (estado atual): `docs/control/memory_current_state.json`
- Camada decisional: `docs/control/memory_decision_log.json`
- Camada de execucao: `docs/control/memory_execution_journal.json`
- Camada de artefatos: `docs/control/memory_artifact_index.json`
- Camada de retomada: `docs/control/memory_open_loops.json` e `docs/control/memory_checkpoints.json`

## Leitura recomendada no inicio da sessao
1. `docs/control/session_state.json`
2. `docs/control/memory_current_state.json`
3. `docs/control/memory_open_loops.json`
4. Ultimo item de `docs/control/memory_checkpoints.json`
5. Ultimo item ativo de `docs/control/memory_decision_log.json`
6. `docs/memory/project_memory.md`
7. `task.md`

## Regras de governanca
- Toda mudanca relevante deve gerar registro em `memory_execution_journal.json`.
- Toda decisao relevante deve gerar registro em `memory_decision_log.json`.
- Todo entregavel relevante deve entrar em `memory_artifact_index.json`.
- Toda sessao encerrada deve registrar mutacao em `docs/control/memory_mutations.json`.

## Fonte de verdade
- Fonte canonica de memoria atual: `docs/memory/` + `docs/control/memory_*.json`.
- O arquivo `knowledge/project_memory.md` esta mantido apenas como legado apontando para a fonte canonica.

## Last updated
- updated_at: 2026-04-20T16:58:41-03:00
