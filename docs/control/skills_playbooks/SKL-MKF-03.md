# Skill Playbook: SKL-MKF-03 - HookMining

## Objetivo Operacional
Executar HookMining com criterio operacional no fases BLD-02, garantindo as saidas `DLV-ASSET-ReferenceBoard`, `DLV-REPORT-BenchmarkDeck`, `DLV-INSIGHT-LinguagemMercado`.

## Donos
- Grupo: `MKF`
- Squads: SQD-MKF - MARKET & FUNNEL
- Agentes: `@persona`, `@analyst`

## Quando Executar
- Build: `BLD-02` (Referências & Benchmark)
- Gatilhos principais: nenhum

## Entradas
- Build: `Direção Estratégica`
- Operacao: nenhum

## Saidas Esperadas
- Build: `DLV-ASSET-ReferenceBoard`, `DLV-REPORT-BenchmarkDeck`, `DLV-INSIGHT-LinguagemMercado`
- Operacao: nenhum

## Procedimento
1. Confirmar pre-condicoes (depends_on, trigger e estado da fase/estagio).
2. Executar a skill com o agente dono e produzir os artefatos esperados.
3. Validar checkpoint/decision gate quando existir.
4. Registrar evidencias em logs e memoria operacional.

## Criterios de Pronto
- Checkpoints:
- CHK-02 (Persona e mercado)
- Decision gates: nenhum gate direto nesta skill.

## Telemetria e Alertas
- KPIs monitorados: nao aplicavel para esta skill.
- Alertas relacionados: nenhum alerta direto mapeado.

## Fallback e Incidentes
- Acao de fallback: Nova coleta de mercado
- Em incidente, abrir registro em `docs/control/incidents.json` e definir owner de tratativa.

## Handoff
- Atualizar estado em `docs/control/build_state.json` ou `docs/control/ops_state.json` quando houver mudanca de fase/estagio.
- Registrar decisao e checkpoint quando aplicavel.
- Registrar resumo no fluxo de memoria (`docs/control/memory_mutations.json` e `task.md`) em encerramento de ciclo.
- Trilhas de projeto mais afetadas: `VZ-01 (Anuncio Meta)`, `VZ-04 (Remarketing)`, `VV-01 (Ads)`, `VV-04 (Remarketing)`, `VE-01 (Ads)`, `VE-04 (Remarketing)`.

## Fontes Canonicas
- `docs/control/registry.json`
- `docs/control/build_state.json`
- `docs/control/ops_state.json`
- `docs/control/project_flows.json`
