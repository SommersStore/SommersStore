# Projeto Imposto de Renda

Projeto pessoal para organizar, declarar e otimizar o Imposto de Renda Pessoa Fisica (IRPF) ano-calendario 2025, exercicio 2026.

## Missao

Criar um sistema de organizacao e decisao tributaria que una:

- inventario completo de rendimentos, bens, dividas e dependentes;
- classificacao correta de cada fonte de renda (CLT, PJ, aplicacoes, alugueis, etc.);
- levantamento de todas as deducoes legais aplicaveis;
- comparativo entre declaracao simplificada e completa;
- simulacao do imposto devido, restituicao ou saldo a pagar;
- calendario de obrigacoes e prazos da Receita Federal;
- checklist de documentos necessarios por categoria;
- rastreabilidade de cada dado com fonte e comprovante.

## Premissas do briefing

- Ano-calendario: 2025, exercicio: 2026.
- Prazo de entrega: verificar calendario oficial da Receita Federal.
- Regime tributario PF: a definir (simplificado vs completo).
- Fontes de renda a mapear: salarios, pro-labore, Somos Story, aplicacoes financeiras, outros.
- Bens e direitos a declarar: contas, veiculos, participacoes societarias.
- Dividas e onus reais: conforme projeto Financas.

## Guardrails

Este projeto nao substitui contador, auditor ou consultor tributario. As simulacoes e classificacoes devem ser tratadas como pesquisa orientada, com fontes oficiais (RFB, legislacao) e revisao profissional antes do envio da declaracao.

## Artefatos

- `brief.md` - briefing estruturado do projeto.
- `ir_funnel.md` - funil operacional do fluxo de declaracao.
- `data/ir_state.json` - estado operacional do projeto (rendimentos, deducoes, bens, simulacoes).
- `data/documentos_checklist.csv` - checklist de documentos por categoria.
