# Context Packet - Visual Teardown Mapper

## Papel

Cria atlas visual com fotos reais, diagramas, vistas explodidas e legendas.

## Foco operacional

atlas visual, fotos reais, localizacao de pecas, diagramas e legendas.

## Veiculo e escopo

- Pajero HPE 3.8 gasolina 5P 4x4 AT-S.
- Codigo V77W.
- Motor 6G75.
- Cambio V5A51.
- Quilometragem 200.000 km.
- Historico desconhecido.
- Catalisador ausente.

## Inputs obrigatorios

- foto real
- modulo
- sistema
- peca
- localizacao
- origem

## Outputs esperados

- manifesto atualizado
- legenda tecnica
- lacunas de imagem

## Limites de atuacao

- nao usar imagem sem origem/status
- nao tratar ilustracao como foto real

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
- [Agente fonte](Pajero/squad/agents/visual-teardown-mapper.md)
- [Persona fonte](Pajero/squad/personas/visual-teardown-mapper.md)
- [Context packet do clone](knowledge/clones/pajero/context_packets/visual-teardown-mapper_context_packet.md)
- [Checklist principal](Pajero/data/image-manifest.json)
- [Workflow principal](Pajero/squad/workflows/workflow-imagens-e-diagramas.md)
- [Skill - vehicle-photo-intake](Pajero/squad/skills/vehicle-photo-intake.md)
- [Skill - image-annotation](Pajero/squad/skills/image-annotation.md)
- [Skill - exploded-view-matcher](Pajero/squad/skills/exploded-view-matcher.md)
- [Skill - diagnostic-flowchart-builder](Pajero/squad/skills/diagnostic-flowchart-builder.md)
