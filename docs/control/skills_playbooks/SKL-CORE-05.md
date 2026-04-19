# Skill Playbook: SKL-CORE-05 - RoadmapPlanning

## Objetivo Operacional
Executar RoadmapPlanning com criterio operacional no fases BLD-03, garantindo as saidas `DLV-BLUEPRINT-Roadmap`, `DLV-BLUEPRINT-FunnelBlueprint`, `DLV-SPEC-Backlog`.

## Donos
- Grupo: `CORE`
- Squads: SQD-CORE - CORE STRATEGY
- Agentes: `@pm`

## Quando Executar
- Build: `BLD-03` (Estratégia & Arquitetura)
- Gatilhos principais: `conclusao de BLD-01`, `conclusao de BLD-02`

## Entradas
- Build: `BLD-01`, `BLD-02`
- Operacao: nenhum

## Saidas Esperadas
- Build: `DLV-BLUEPRINT-Roadmap`, `DLV-BLUEPRINT-FunnelBlueprint`, `DLV-SPEC-Backlog`
- Operacao: nenhum

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-02 (Persona e mercado)
- Decision gates:
- DEC-02 (Estratégia viável?)

## Telemetria e Alertas
- KPIs monitorados: nao aplicavel para esta skill.
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: Revisão estratégica
- Em incidente, abrir registro em `docs/control/incidents.json` e definir owner de tratativa.

## Handoff
- Atualizar estado em `docs/control/build_state.json` ou `docs/control/ops_state.json` quando houver mudanca de fase/estagio.
- Registrar decisao e checkpoint quando aplicavel.
- Registrar resumo no fluxo de memoria (`docs/control/memory_mutations.json` e `task.md`) em encerramento de ciclo.
- Trilhas de projeto mais afetadas: `CZ-01 (Estrategia)`, `CV-01 (Brief e Oferta)`, `CE-01 (Arquitetura do Site)`.

## Fontes Canonicas
- `docs/control/registry.json`
- `docs/control/build_state.json`
- `docs/control/ops_state.json`
- `docs/control/project_flows.json`
