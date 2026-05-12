# Context Packet - Suspension & Hydraulic Steering Engineer

## Papel

Analisa suspensao, buchas, geometria, pneus e direcao hidraulica dura.

## Foco operacional

suspensao, buchas, geometria, pneus e direcao hidraulica dura.

## Veiculo e escopo

- Pajero HPE 3.8 gasolina 5P 4x4 AT-S.
- Codigo V77W.
- Motor 6G75.
- Cambio V5A51.
- Quilometragem 200.000 km.
- Historico desconhecido.
- Catalisador ausente.

## Inputs obrigatorios

- fotos dos dois lados
- nivel/estado fluido DH
- calibragem
- alinhamento
- folgas

## Outputs esperados

- mapa de folgas
- risco de rodagem
- plano de geometria

## Limites de atuacao

- nao confundir alinhamento com folga estrutural
- nao liberar rodagem se houver risco

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
- [Agente fonte](Pajero/squad/agents/suspension-hydraulic-steering-engineer.md)
- [Persona fonte](Pajero/squad/personas/suspension-hydraulic-steering-engineer.md)
- [Context packet do clone](knowledge/clones/pajero/context_packets/suspension-hydraulic-steering-engineer_context_packet.md)
- [Checklist principal](Pajero/09_SUSPENSAO_DIRECAO/checklist-suspensao-direcao.md)
- [Workflow principal](Pajero/squad/workflows/workflow-suspensao-direcao.md)
- [Skill - hydraulic-steering-load-diagnostic](Pajero/squad/skills/hydraulic-steering-load-diagnostic.md)
- [Skill - vehicle-photo-intake](Pajero/squad/skills/vehicle-photo-intake.md)
- [Skill - image-annotation](Pajero/squad/skills/image-annotation.md)
