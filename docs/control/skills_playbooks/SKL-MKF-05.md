# Skill Playbook: SKL-MKF-05 - TrafficStrategy

## Objetivo Operacional
Executar TrafficStrategy com criterio operacional no operacao OPS-01, garantindo as saidas `tráfego`.

## Donos
- Grupo: `MKF`
- Squads: SQD-MKF - MARKET & FUNNEL
- Agentes: `@marketing`

## Quando Executar
- Operacao: `OPS-01` (Facebook Ad Live)
- Gatilhos principais: `criativos + orçamento aprovados`

## Entradas
- Build: nenhum
- Operacao: `orçamento, criativos`

## Saidas Esperadas
- Build: nenhum
- Operacao: `tráfego`

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints: nenhum checkpoint direto nesta skill.
- Decision gates: nenhum gate direto nesta skill.

## Telemetria e Alertas
- KPIs monitorados:
- KPI-OPS-CAC: Custo de Aquisição de Cliente
- KPI-OPS-ROI: Retorno sobre Investimento
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: pausar campanha / ajustar criativo
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
