# Skill Playbook: SKL-EXP-01 - DesignSystemTokens

## Objetivo Operacional
Executar DesignSystemTokens com criterio operacional no fases BLD-07, garantindo as saidas `DLV-SPEC-MDS`, `DLV-ASSET-LayoutA4`, `DLV-SPEC-Grid`.

## Donos
- Grupo: `EXP`
- Squads: SQD-EXP - EXPERIENCE & DESIGN SYSTEM
- Agentes: `@architect`

## Quando Executar
- Build: `BLD-07` (Design System & Layout)
- Gatilhos principais: `conclusao de BLD-04`, `conclusao de BLD-06`

## Entradas
- Build: `BLD-04`, `BLD-06`
- Operacao: nenhum

## Saidas Esperadas
- Build: `DLV-SPEC-MDS`, `DLV-ASSET-LayoutA4`, `DLV-SPEC-Grid`, `DLV-SPEC-RegrasVisuais`
- Operacao: nenhum

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-05 (Design system)
- Decision gates:
- DEC-04 (Design consistente?)

## Telemetria e Alertas
- KPIs monitorados: nao aplicavel para esta skill.
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: Revisão de layout e MDS
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
