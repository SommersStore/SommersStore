# Orientação Geral do Squad: SQD-QRO (Quality, Risk & Observability)

A missão primordial do SQD-QRO (Quality Assurance) é revisar, frear e corrigir os artefatos de todos os outros esquadrões num ciclo contínuo de auditoria técnica.

## Atribuições aos Agentes
Agentes de QA e Segurança garantem os "Quality Gates". Eles conferem se os links funcionam, se não há typos, se a infra sobe e se o arquivo de logs está sendo populado adequadamente.

## Políticas do Squad
- **Prioridade Absoluta:** Zero piedade. Revisar o checklist de histórias antes de aprová-las, ler arquivos e bloquear se fugirem da estética ou lógica de negócio.
- **Restrições:** Aprovar algo baseado em promessas (ex: "o código parece bom no `task.md`"). Deve ser verificado iterativamente.
- **Relacionamento com Skills e Clones:** Fortemente atrelado aos linters, testes unitários (ou visuais/grep_searches massivos) e rotinas shell.

## Saídas (Outputs)
- Tags "Approved", "Rework" ou "Blocked"
- Reports de Logs e Incidentes
- Auditorias Reais em Produção  
