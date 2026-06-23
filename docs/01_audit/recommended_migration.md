# Recommended Migration

**Data:** 2026-05-22  
**Estrategia:** reconstrucao por envoltorio, nao substituicao cega.

## Tese

O painel atual tem excesso de informacao, mas tambem contem trabalho valido. A melhor rota e criar uma camada de Control Hub comercial mais clara e migrar recursos seletivamente.

## Fase 0 - Congelar autoridade

- Codex edita.
- Antigravity revisa e organiza.
- GenSpark fora.
- Gemini/Claude Code apenas consulta.
- Sem `git add .` ate triagem do worktree.

## Fase 1 - Governanca e auditoria

Entregues nesta etapa:

- `docs/00_governance/agent_policy.md`
- `docs/00_governance/decisions.md`
- `docs/00_governance/command_log.md`
- `docs/01_audit/current_structure.md`
- `docs/01_audit/project_classification.md`
- `docs/01_audit/conflict_report.md`
- `docs/01_audit/recommended_migration.md`

## Fase 2 - Hub comercial limpo

Criar uma primeira tela comercial com tres entradas:

1. Produtos Digitais
2. Electro Commerce
3. Financeiro & IR

Pajero e Saude permanecem disponiveis como projetos adjacentes, nao como foco da primeira tela comercial.

## Fase 3 - Digital Products primeiro

Usar `projects/loja-digital`, `projects/ebook-generator`, fluxos Sais/Velas e area de membros como base.

Entregas minimas:

- mapa visual do funil;
- status de e-book/PDF;
- landing/sales page;
- hub de membros;
- upsell/downsell/checkout;
- arquivos vinculados.

## Fase 4 - Electro Commerce

Usar `projects/electro-store` e o fluxo `electro` em `project_flows.json`.

Entregas minimas:

- catalogo;
- pagina de produto;
- precificacao/margem;
- estoque;
- marketplace;
- pedido/logistica/pos-venda.

## Fase 5 - Finance & Tax

Unificar `projects/financas` e `projects/imposto-de-renda` como modulo com tres subareas:

- Empresa/CNPJ;
- Pessoa Fisica;
- Imposto de Renda.

Antes de qualquer automacao: auditar dados sensiveis e separar templates de dados reais.

## Fase 6 - Modularizacao tecnica

So depois do hub limpo validado:

- decidir se `docs/aiox_dashboard.html` sera modularizado gradualmente;
- avaliar se vale criar `apps/control-panel`;
- mover legado por lotes pequenos e reversiveis;
- ampliar testes por modulo.

## Criterio de sucesso

O usuario deve conseguir responder em menos de 30 segundos:

- Qual produto digital esta mais perto de vender?
- O que falta para o Electro ficar operacional?
- Qual pendencia financeira/IR exige atencao agora?
- Onde ficam Pajero e Saude sem poluir o hub comercial?
