# Skill Playbook: SKL-ENG-01 - CheckoutIntegration

## Objetivo Operacional
Executar CheckoutIntegration com criterio operacional no fases BLD-11 e operacao OPS-05, garantindo as saidas `DLV-INTEGRATION-Checkout`, `DLV-INTEGRATION-OrderBump`, `DLV-INTEGRATION-Upsell`.

## Donos
- Grupo: `ENG`
- Squads: SQD-ENG - PLATFORM ENGINEERING
- Agentes: `@dev`

## Quando Executar
- Build: `BLD-11` (Checkout)
- Operacao: `OPS-05` (Checkout Open)
- Gatilhos principais: `conclusao de BLD-10`, `clique em CTA`

## Entradas
- Build: `BLD-10`
- Operacao: `clique CTA`

## Saidas Esperadas
- Build: `DLV-INTEGRATION-Checkout`, `DLV-INTEGRATION-OrderBump`, `DLV-INTEGRATION-Upsell`, `DLV-INTEGRATION-Downsell`
- Operacao: `checkout aberto`

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-08 (Checkout funcional)
- Decision gates:
- DEC-05 (Página e checkout coerentes?)

## Telemetria e Alertas
- KPIs monitorados: nao aplicavel para esta skill.
- Alertas relacionados:
- ALT-OPS-02: Checkout offline [critical] owner=SQD-ENG

## Fallback e Incidentes
- Acao de fallback: Reconstrução do checkout | verificar integração, rollback de checkout
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
