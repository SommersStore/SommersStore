# Skill Playbook: SKL-CNT-04 - BrandVoiceEnforcement

## Objetivo Operacional
Executar BrandVoiceEnforcement com criterio operacional no fases BLD-04, garantindo as saidas `DLV-BLUEPRINT-SkeletonEditorial`, `DLV-SPEC-Capitulos`, `DLV-SPEC-Secoes`.

## Donos
- Grupo: `CNT`
- Squads: SQD-CNT - CONTENT FACTORY
- Agentes: `@brand-master`

## Quando Executar
- Build: `BLD-04` (Estruturação Editorial)
- Gatilhos principais: `conclusao de BLD-03`

## Entradas
- Build: `BLD-03`
- Operacao: nenhum

## Saidas Esperadas
- Build: `DLV-BLUEPRINT-SkeletonEditorial`, `DLV-SPEC-Capitulos`, `DLV-SPEC-Secoes`
- Operacao: nenhum

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-03 (Estrutura editorial)
- Decision gates: nenhum gate direto nesta skill.

## Telemetria e Alertas
- KPIs monitorados: nao aplicavel para esta skill.
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: Reestruturação editorial
- Em incidente, abrir registro em `docs/control/incidents.json` e definir owner de tratativa.

## Handoff
- Atualizar estado em `docs/control/build_state.json` ou `docs/control/ops_state.json` quando houver mudanca de fase/estagio.
- Registrar decisao e checkpoint quando aplicavel.
- Registrar resumo no fluxo de memoria (`docs/control/memory_mutations.json` e `task.md`) em encerramento de ciclo.
- Trilhas de projeto mais afetadas: `CZ-02 (Estrutura PDF)`, `CZ-03 (Producao E-book)`, `CV-02 (Conteudo E-book)`, `CE-02 (Catalogo de Produtos)`.

## Fontes Canonicas
- `docs/control/registry.json`
- `docs/control/build_state.json`
- `docs/control/ops_state.json`
- `docs/control/project_flows.json`
