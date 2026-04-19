# Skill Playbook: SKL-QRO-05 - ExecutionAudit

## Objetivo Operacional
Executar ExecutionAudit com criterio operacional no fases BLD-14, garantindo as saidas `DLV-REPORT-DashboardInicial`, `DLV-INSIGHT-HipotesesAB`, `DLV-REPORT-BaselineROI`.

## Donos
- Grupo: `QRO`
- Squads: SQD-QRO - QUALITY, RISK & OBSERVABILITY
- Agentes: `@qa`

## Quando Executar
- Build: `BLD-14` (Otimização Inicial)
- Gatilhos principais: `conclusao de BLD-12`, `conclusao de BLD-13`

## Entradas
- Build: `BLD-12`, `BLD-13`
- Operacao: nenhum

## Saidas Esperadas
- Build: `DLV-REPORT-DashboardInicial`, `DLV-INSIGHT-HipotesesAB`, `DLV-REPORT-BaselineROI`
- Operacao: nenhum

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
- KPIs monitorados: nao aplicavel para esta skill.
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: Revisão de tracking ou funil
- Em incidente, abrir registro em `docs/control/incidents.json` e definir owner de tratativa.

## Handoff
- Atualizar estado em `docs/control/build_state.json` ou `docs/control/ops_state.json` quando houver mudanca de fase/estagio.
- Registrar decisao e checkpoint quando aplicavel.
- Registrar resumo no fluxo de memoria (`docs/control/memory_mutations.json` e `task.md`) em encerramento de ciclo.
- Trilhas de projeto mais afetadas: `CZ-05 (QA e Publicacao)`.

## Fontes Canonicas
- `docs/control/registry.json`
- `docs/control/build_state.json`
- `docs/control/ops_state.json`
- `docs/control/project_flows.json`
