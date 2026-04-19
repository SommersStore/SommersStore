# Skill Playbook: SKL-EXP-04 - LandingPageUXMapping

## Objetivo Operacional
Executar LandingPageUXMapping com criterio operacional no fases BLD-10 e operacao OPS-03, garantindo as saidas `DLV-PAGE-SalesPagePronta`, `consumo da página`.

## Donos
- Grupo: `EXP`
- Squads: SQD-EXP - EXPERIENCE & DESIGN SYSTEM
- Agentes: `@ux-design-expert`

## Quando Executar
- Build: `BLD-10` (Sales Page)
- Operacao: `OPS-03` (Landing View)
- Gatilhos principais: `conclusao de BLD-03`, `conclusao de BLD-06`, `conclusao de BLD-07`, `sessão iniciada`

## Entradas
- Build: `BLD-03`, `BLD-06`, `BLD-07`
- Operacao: `sessão`

## Saidas Esperadas
- Build: `DLV-PAGE-SalesPagePronta`
- Operacao: `consumo da página`

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-07 (Sales page validada)
- Decision gates:
- DEC-05 (Página e checkout coerentes?)

## Telemetria e Alertas
- KPIs monitorados:
- KPI-OPS-CVR: Taxa de Conversão
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: Revisar page blocks | ajuste de UX / estrutura
- Em incidente, abrir registro em `docs/control/incidents.json` e definir owner de tratativa.

## Handoff
- Atualizar estado em `docs/control/build_state.json` ou `docs/control/ops_state.json` quando houver mudanca de fase/estagio.
- Registrar decisao e checkpoint quando aplicavel.
- Registrar resumo no fluxo de memoria (`docs/control/memory_mutations.json` e `task.md`) em encerramento de ciclo.
- Trilhas de projeto mais afetadas: `CZ-04 (Pagina de Vendas)`, `VZ-02 (Landing)`, `CV-03 (Pagina de Vendas)`, `VV-02 (Landing)`, `CE-03 (UX e Vitrine)`, `VE-02 (Catalogo para PDP)`.

## Fontes Canonicas
- `docs/control/registry.json`
- `docs/control/build_state.json`
- `docs/control/ops_state.json`
- `docs/control/project_flows.json`
