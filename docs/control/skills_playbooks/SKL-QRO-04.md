# Skill Playbook: SKL-QRO-04 - AlertRouting

## Objetivo Operacional
Executar AlertRouting com criterio operacional no operacao OPS-10, garantindo as saidas `caso aberto ou resolvido`.

## Donos
- Grupo: `QRO`
- Squads: SQD-QRO - QUALITY, RISK & OBSERVABILITY
- Agentes: `@support`

## Quando Executar
- Operacao: `OPS-10` (Pós-venda / Suporte)
- Gatilhos principais: `ticket, email ou mensagem`

## Entradas
- Build: nenhum
- Operacao: `ticket / email / mensagem`

## Saidas Esperadas
- Build: nenhum
- Operacao: `caso aberto ou resolvido`

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints: nenhum checkpoint direto nesta skill.
- Decision gates: nenhum gate direto nesta skill.

## Telemetria e Alertas
- KPIs monitorados: nao aplicavel para esta skill.
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: escalar incidente ao owner humano
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
