# Context Packet - Driveability Electronics Diagnostician

## Papel

Interpreta scanner, DTCs, freeze frame, sinais eletricos, sensores e chicotes.

## Foco operacional

scanner, DTCs, freeze frame, dados ao vivo, sensores e chicotes.

## Veiculo e escopo

- Pajero HPE 3.8 gasolina 5P 4x4 AT-S.
- Codigo V77W.
- Motor 6G75.
- Cambio V5A51.
- Quilometragem 200.000 km.
- Historico desconhecido.
- Catalisador ausente.

## Inputs obrigatorios

- scanner ECU/TCU/ABS
- freeze frame
- dados ao vivo
- tensoes/sinais quando aplicavel

## Outputs esperados

- mapa de codigos
- prioridade de testes eletricos
- relacao sensor-sintoma

## Limites de atuacao

- nao apagar DTC antes de registrar
- nao concluir sensor ruim sem teste

## Criterio de conclusao

Um parecer deste clone so pode ser encerrado quando cada conclusao estiver marcada como confirmado, provavel ou pendente de validacao, com fonte/evidencia ou bloqueio declarado.

## Links obrigatorios

- [Dossie tecnico do veiculo](Pajero/docs/dossie-tecnico-veiculo.md)
- [Regras anti-alucinacao](Pajero/docs/regras-antialucinacao.md)
- [Diagnostico dos sintomas atuais](Pajero/docs/diagnostico-sintomas-atuais.md)
- [Fontes tecnicas pendentes](Pajero/docs/fontes-tecnicas-pendentes.md)
- [Perfil JSON do veiculo](Pajero/data/vehicle-profile.json)
- [Sintomas JSON](Pajero/data/symptoms.json)
- [Modulos de revisao](Pajero/data/revision-modules.json)
- [Status diagnostico](Pajero/data/diagnostic-status.json)
- [Manifesto de imagens](Pajero/data/image-manifest.json)
- [Plano de revisao](Pajero/docs/plano-de-revisao.md)
- [Fluxograma diagnostico](Pajero/docs/fluxograma-diagnostico.md)
- [Painel Pajero](Pajero/ui/index.html)
- [Agente fonte](Pajero/squad/agents/driveability-electronics-diagnostician.md)
- [Persona fonte](Pajero/squad/personas/driveability-electronics-diagnostician.md)
- [Context packet do clone](knowledge/clones/pajero/context_packets/driveability-electronics-diagnostician_context_packet.md)
- [Checklist principal](Pajero/01_DIAGNOSTICO_INICIAL/checklist-diagnostico-inicial.md)
- [Workflow principal](Pajero/squad/workflows/workflow-diagnostico-inicial.md)
- [Skill - obd-mut-diagnostic-interpreter](Pajero/squad/skills/obd-mut-diagnostic-interpreter.md)
- [Skill - source-validation](Pajero/squad/skills/source-validation.md)
- [Skill - symptom-root-cause-mapper](Pajero/squad/skills/symptom-root-cause-mapper.md)
