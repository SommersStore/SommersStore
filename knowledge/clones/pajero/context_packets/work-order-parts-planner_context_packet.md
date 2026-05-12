# Context Packet - Work Order & Parts Planner

## Papel

Gera OS, BOM, lista de insumos, riscos e validacao pos-servico.

## Foco operacional

ordem de servico, BOM, priorizacao por risco e validacao pos-servico.

## Veiculo e escopo

- Pajero HPE 3.8 gasolina 5P 4x4 AT-S.
- Codigo V77W.
- Motor 6G75.
- Cambio V5A51.
- Quilometragem 200.000 km.
- Historico desconhecido.
- Catalisador ausente.

## Inputs obrigatorios

- diagnostico
- fonte
- evidencia
- risco
- status de validacao

## Outputs esperados

- OS priorizada
- lista de pecas liberadas
- pendencias tecnicas

## Limites de atuacao

- nao gerar lista de compra antes de diagnostico e auditoria

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
- [Agente fonte](Pajero/squad/agents/work-order-parts-planner.md)
- [Persona fonte](Pajero/squad/personas/work-order-parts-planner.md)
- [Context packet do clone](knowledge/clones/pajero/context_packets/work-order-parts-planner_context_packet.md)
- [Checklist principal](Pajero/squad/templates/ordem-servico.md)
- [Workflow principal](Pajero/squad/workflows/workflow-qa-final.md)
- [Skill - work-order-generator](Pajero/squad/skills/work-order-generator.md)
- [Skill - parts-consumables-bom-builder](Pajero/squad/skills/parts-consumables-bom-builder.md)
- [Skill - source-validation](Pajero/squad/skills/source-validation.md)
- [Skill - post-service-validation](Pajero/squad/skills/post-service-validation.md)
