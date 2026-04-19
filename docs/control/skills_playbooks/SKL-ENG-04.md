# Skill Playbook: SKL-ENG-04 - DeliveryOrchestration

## Objetivo Operacional
Executar DeliveryOrchestration com criterio operacional no fases BLD-13 e operacao OPS-09, garantindo as saidas `DLV-AUTOMATION-Emails`, `DLV-AUTOMATION-Webhooks`, `DLV-AUTOMATION-EntregaDigital`.

## Donos
- Grupo: `ENG`
- Squads: SQD-ENG - PLATFORM ENGINEERING
- Agentes: `@data-engineer`

## Quando Executar
- Build: `BLD-13` (Automação & Entrega)
- Operacao: `OPS-09` (Delivery)
- Gatilhos principais: `conclusao de BLD-11`, `conclusao de BLD-12`, `payment approved`

## Entradas
- Build: `BLD-11`, `BLD-12`
- Operacao: `payment approved`

## Saidas Esperadas
- Build: `DLV-AUTOMATION-Emails`, `DLV-AUTOMATION-Webhooks`, `DLV-AUTOMATION-EntregaDigital`
- Operacao: `acesso entregue`

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-10 (Automação ponta a ponta)
- Decision gates:
- DEC-06 (Entrega ponta a ponta passou?)

## Telemetria e Alertas
- KPIs monitorados:
- KPI-OPS-DELIVERY-RATE: Taxa de Entrega
- Alertas relacionados:
- ALT-OPS-04: Entrega falhou [critical] owner=SQD-ENG

## Fallback e Incidentes
- Acao de fallback: Rerun de integração / entrega | reprocessar entrega
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
