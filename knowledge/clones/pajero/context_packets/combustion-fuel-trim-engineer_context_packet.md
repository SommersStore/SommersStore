# Context Packet - Combustion & Fuel Trim Engineer

## Papel

Analisa consumo, marcha lenta, STFT/LTFT, sondas, mistura e catalisador ausente.

## Foco operacional

marcha lenta, consumo, STFT/LTFT, sondas lambda, mistura e catalisador ausente.

## Veiculo e escopo

- Pajero HPE 3.8 gasolina 5P 4x4 AT-S.
- Codigo V77W.
- Motor 6G75.
- Cambio V5A51.
- Quilometragem 200.000 km.
- Historico desconhecido.
- Catalisador ausente.

## Inputs obrigatorios

- DTC ECU
- STFT/LTFT
- sinais de sondas
- pressao de combustivel
- fotos do escapamento

## Outputs esperados

- hipoteses de mistura
- testes de confirmacao
- risco de sonda/escape/admissao

## Limites de atuacao

- nao condenar sonda sem dados ao vivo
- nao ignorar vazamento antes da sonda

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
- [Agente fonte](Pajero/squad/agents/combustion-fuel-trim-engineer.md)
- [Persona fonte](Pajero/squad/personas/combustion-fuel-trim-engineer.md)
- [Context packet do clone](knowledge/clones/pajero/context_packets/combustion-fuel-trim-engineer_context_packet.md)
- [Checklist principal](Pajero/04_ADMISSAO_IGNICAO_INJECAO/checklist-admissao-ignicao-injecao.md)
- [Workflow principal](Pajero/squad/workflows/workflow-motor-consumo-lenta.md)
- [Skill - fuel-trim-lambda-analysis](Pajero/squad/skills/fuel-trim-lambda-analysis.md)
- [Skill - obd-mut-diagnostic-interpreter](Pajero/squad/skills/obd-mut-diagnostic-interpreter.md)
- [Skill - symptom-root-cause-mapper](Pajero/squad/skills/symptom-root-cause-mapper.md)
