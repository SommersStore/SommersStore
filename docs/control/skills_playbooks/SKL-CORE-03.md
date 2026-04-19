# Skill Playbook: SKL-CORE-03 - OfferStructuring

## Objetivo Operacional
Executar OfferStructuring com criterio operacional no fases BLD-01, BLD-11 e operacao OPS-06, garantindo as saidas `DLV-BLUEPRINT-ProductBrief`, `DLV-SPEC-OfferThesis`, `DLV-SPEC-PersonaPreliminar`.

## Donos
- Grupo: `CORE`
- Squads: SQD-CORE - CORE STRATEGY
- Agentes: `@po`

## Quando Executar
- Build: `BLD-01` (Definição & Enquadramento), `BLD-11` (Checkout)
- Operacao: `OPS-06` (Order Bump)
- Gatilhos principais: `conclusao de BLD-10`, `carrinho aberto`

## Entradas
- Build: `Briefing`, `Business Goals`, `BLD-10`
- Operacao: `carrinho`

## Saidas Esperadas
- Build: `DLV-BLUEPRINT-ProductBrief`, `DLV-SPEC-OfferThesis`, `DLV-SPEC-PersonaPreliminar`, `DLV-INTEGRATION-Checkout`, `DLV-INTEGRATION-OrderBump`, `DLV-INTEGRATION-Upsell`, `DLV-INTEGRATION-Downsell`
- Operacao: `aceitação ou rejeição do bump`

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-01 (Escopo)
- CHK-08 (Checkout funcional)
- Decision gates:
- DEC-01 (Escopo aprovado?)
- DEC-05 (Página e checkout coerentes?)
- DEC-OPS-02 (Aceitou bump?)

## Telemetria e Alertas
- KPIs monitorados:
- KPI-OPS-AOV: Ticket Médio (Average Order Value)
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: Retornar a briefing e reposicionamento | Reconstrução do checkout | recalibrar bump
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
