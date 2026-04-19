# Skill Playbook: SKL-ENG-05 - TrackingInstrumentation

## Objetivo Operacional
Executar TrackingInstrumentation com criterio operacional no fases BLD-14 e operacao OPS-02, garantindo as saidas `DLV-REPORT-DashboardInicial`, `DLV-INSIGHT-HipotesesAB`, `DLV-REPORT-BaselineROI`.

## Donos
- Grupo: `ENG`
- Squads: SQD-ENG - PLATFORM ENGINEERING
- Agentes: `@data-engineer`

## Quando Executar
- Build: `BLD-14` (Otimização Inicial)
- Operacao: `OPS-02` (Session Attribution)
- Gatilhos principais: `conclusao de BLD-12`, `conclusao de BLD-13`, `clique com UTM`

## Entradas
- Build: `BLD-12`, `BLD-13`
- Operacao: `clique, UTM`

## Saidas Esperadas
- Build: `DLV-REPORT-DashboardInicial`, `DLV-INSIGHT-HipotesesAB`, `DLV-REPORT-BaselineROI`
- Operacao: `sessão atribuída`

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-11 (Baseline de métricas)
- Decision gates: nenhum gate direto nesta skill.

## Telemetria e Alertas
- KPIs monitorados:
- KPI-OPS-ATTRIBUTION-INTEGRITY: Integridade de Atribuição
- Alertas relacionados:
- ALT-OPS-01: Tracking quebrado [high] owner=SQD-ENG

## Fallback e Incidentes
- Acao de fallback: Revisão de tracking ou funil | recalibrar tracking
- Em incidente, abrir registro em `docs/control/incidents.json` e definir owner de tratativa.

## Handoff
- Atualizar estado em `docs/control/build_state.json` ou `docs/control/ops_state.json` quando houver mudanca de fase/estagio.
- Registrar decisao e checkpoint quando aplicavel.
- Registrar resumo no fluxo de memoria (`docs/control/memory_mutations.json` e `task.md`) em encerramento de ciclo.
- Trilhas de projeto mais afetadas: `VZ-03 (Checkout)`, `VV-03 (Checkout)`, `CE-04 (Integracao Checkout)`, `VE-03 (Checkout)`.

## Fontes Canonicas
- `docs/control/registry.json`
- `docs/control/build_state.json`
- `docs/control/ops_state.json`
- `docs/control/project_flows.json`
