# Skill Playbook: SKL-CNT-05 - ImagePrompting

## Objetivo Operacional
Executar ImagePrompting com criterio operacional no fases BLD-08, garantindo as saidas `DLV-ASSET-BibliotecaVisualHD`.

## Donos
- Grupo: `CNT`
- Squads: SQD-CNT - CONTENT FACTORY
- Agentes: `@liaison`

## Quando Executar
- Build: `BLD-08` (Imagens & Assets)
- Gatilhos principais: `conclusao de BLD-02`, `conclusao de BLD-04`

## Entradas
- Build: `BLD-02`, `BLD-04`
- Operacao: nenhum

## Saidas Esperadas
- Build: `DLV-ASSET-BibliotecaVisualHD`
- Operacao: nenhum

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints: nenhum checkpoint direto nesta skill.
- Decision gates: nenhum gate direto nesta skill.

## Telemetria e Alertas
- KPIs monitorados: nao aplicavel para esta skill.
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: Rerun isolado de asset
- Em incidente, abrir registro em `docs/control/incidents.json` e definir owner de tratativa.

## Handoff
- Atualizar estado em `docs/control/build_state.json` ou `docs/control/ops_state.json` quando houver mudanca de fase/estagio.
- Registrar decisao e checkpoint quando aplicavel.
- Registrar resumo no fluxo de memoria (`docs/control/memory_mutations.json` e `task.md`) em encerramento de ciclo.
- Trilhas de projeto mais afetadas: `CZ-02 (Estrutura PDF)`, `CZ-03 (Producao E-book)`, `CV-02 (Conteudo E-book)`, `CE-02 (Catalogo de Produtos)`.

## Fontes Canonicas
- `docs/control/registry.json`
- `docs/control/build_state.json`
- `docs/control/ops_state.json`
- `docs/control/project_flows.json`
