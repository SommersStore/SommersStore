# Skill Playbook: SKL-EXP-05 - VisualConsistency

## Objetivo Operacional
Executar VisualConsistency com criterio operacional no fases BLD-09, garantindo as saidas `DLV-ASSET-PDFFinalPorVolume`.

## Donos
- Grupo: `EXP`
- Squads: SQD-EXP - EXPERIENCE & DESIGN SYSTEM
- Agentes: `@art-director`

## Quando Executar
- Build: `BLD-09` (Montagem dos Volumes)
- Gatilhos principais: `conclusao de BLD-06`, `conclusao de BLD-07`, `conclusao de BLD-08`

## Entradas
- Build: `BLD-06`, `BLD-07`, `BLD-08`
- Operacao: nenhum

## Saidas Esperadas
- Build: `DLV-ASSET-PDFFinalPorVolume`
- Operacao: nenhum

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-06 (PDF final)
- Decision gates: nenhum gate direto nesta skill.

## Telemetria e Alertas
- KPIs monitorados: nao aplicavel para esta skill.
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: Retorno a design ou conteúdo
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
