# Skill Playbook: SKL-CORE-01 - BriefIngestion

## Objetivo Operacional
Executar BriefIngestion com criterio operacional no fases BLD-01, garantindo as saidas `DLV-BLUEPRINT-ProductBrief`, `DLV-SPEC-OfferThesis`, `DLV-SPEC-PersonaPreliminar`.

## Donos
- Grupo: `CORE`
- Squads: SQD-CORE - CORE STRATEGY
- Agentes: `@aiox-master`

## Quando Executar
- Build: `BLD-01` (Definição & Enquadramento)
- Gatilhos principais: nenhum

## Entradas
- Build: `Briefing`, `Business Goals`
- Operacao: nenhum

## Saidas Esperadas
- Build: `DLV-BLUEPRINT-ProductBrief`, `DLV-SPEC-OfferThesis`, `DLV-SPEC-PersonaPreliminar`
- Operacao: nenhum

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-01 (Escopo)
- Decision gates:
- DEC-01 (Escopo aprovado?)

## Telemetria e Alertas
- KPIs monitorados: nao aplicavel para esta skill.
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: Retornar a briefing e reposicionamento
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
