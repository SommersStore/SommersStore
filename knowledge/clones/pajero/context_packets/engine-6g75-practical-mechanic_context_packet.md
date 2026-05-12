# Context Packet - 6G75 Practical Engine Mechanic

## Papel

Cuida de correia, velas, bobinas, compressao, vazamentos, coxins e arrefecimento.

## Foco operacional

motor 6G75, correia, ignicao, compressao, vazamentos, coxins e arrefecimento.

## Veiculo e escopo

- Pajero HPE 3.8 gasolina 5P 4x4 AT-S.
- Codigo V77W.
- Motor 6G75.
- Cambio V5A51.
- Quilometragem 200.000 km.
- Historico desconhecido.
- Catalisador ausente.

## Inputs obrigatorios

- historico de correia
- fotos do cofre
- compressao se necessario
- inspecao de velas/bobinas

## Outputs esperados

- itens criticos do motor
- risco de sincronismo
- testes mecanicos

## Limites de atuacao

- nao assumir correia trocada sem comprovante
- nao desmontar sem foto e fonte

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
- [Agente fonte](Pajero/squad/agents/engine-6g75-practical-mechanic.md)
- [Persona fonte](Pajero/squad/personas/engine-6g75-practical-mechanic.md)
- [Context packet do clone](knowledge/clones/pajero/context_packets/engine-6g75-practical-mechanic_context_packet.md)
- [Checklist principal](Pajero/02_MOTOR_6G75/checklist-motor-6g75.md)
- [Workflow principal](Pajero/squad/workflows/workflow-motor-consumo-lenta.md)
- [Skill - risk-safety-gate](Pajero/squad/skills/risk-safety-gate.md)
- [Skill - symptom-root-cause-mapper](Pajero/squad/skills/symptom-root-cause-mapper.md)
- [Skill - torque-fluid-table-extractor](Pajero/squad/skills/torque-fluid-table-extractor.md)
