# Skill Playbook: SKL-MKF-06 - CROHypothesis

## Objetivo Operacional
Executar CROHypothesis com criterio operacional no fases BLD-14 e operacao OPS-08, OPS-11, garantindo as saidas `DLV-REPORT-DashboardInicial`, `DLV-INSIGHT-HipotesesAB`, `DLV-REPORT-BaselineROI`.

## Donos
- Grupo: `MKF`
- Squads: SQD-MKF - MARKET & FUNNEL
- Agentes: `@cro-expert`

## Quando Executar
- Build: `BLD-14` (Otimização Inicial)
- Operacao: `OPS-08` (Upsell / Downsell), `OPS-11` (Tracking / CRO / ROI / Escala)
- Gatilhos principais: `conclusao de BLD-12`, `conclusao de BLD-13`, `payment approved`, `dados de funil consolidados`

## Entradas
- Build: `BLD-12`, `BLD-13`
- Operacao: `aprovação do pagamento`, `dados do funil`

## Saidas Esperadas
- Build: `DLV-REPORT-DashboardInicial`, `DLV-INSIGHT-HipotesesAB`, `DLV-REPORT-BaselineROI`
- Operacao: `receita adicional ou saída`, `hipótese nova, decisão de escala/correção`

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-11 (Baseline de métricas)
- Decision gates:
- DEC-OPS-04 (Aceitou upsell?)
- DEC-OPS-05 (Escalar / manter / corrigir?)

## Telemetria e Alertas
- KPIs monitorados:
- KPI-OPS-AOV: Ticket Médio (Average Order Value)
- KPI-OPS-ROI: Retorno sobre Investimento
- KPI-OPS-CVR: Taxa de Conversão
- KPI-OPS-CAC: Custo de Aquisição de Cliente
- Alertas relacionados:
- ALT-OPS-05: CVR caiu [medium] owner=SQD-MKF
- ALT-OPS-06: CAC subiu [medium] owner=SQD-MKF
- ALT-OPS-07: ROI negativo [critical] owner=SQD-MKF

## Fallback e Incidentes
- Acao de fallback: Revisão de tracking ou funil | ajustar sequência de oferta | reduzir gasto, corrigir tracking, mudar mensagem / oferta
- Em incidente, abrir registro em `docs/control/incidents.json` e definir owner de tratativa.

## Handoff
- Atualizar estado em `docs/control/build_state.json` ou `docs/control/ops_state.json` quando houver mudanca de fase/estagio.
- Registrar decisao e checkpoint quando aplicavel.
- Registrar resumo no fluxo de memoria (`docs/control/memory_mutations.json` e `task.md`) em encerramento de ciclo.
- Trilhas de projeto mais afetadas: `VZ-01 (Anuncio Meta)`, `VZ-04 (Remarketing)`, `VV-01 (Ads)`, `VV-04 (Remarketing)`, `VE-01 (Ads)`, `VE-04 (Remarketing)`.

## Fontes Canonicas
- `docs/control/registry.json`
- `docs/control/build_state.json`
- `docs/control/ops_state.json`
- `docs/control/project_flows.json`
