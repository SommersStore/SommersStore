# Revisao da Planilha Financeiro 2026

Data da analise: 2026-05-04  
Arquivo analisado: `C:\Users\ADMIN\Desktop\Financeiro 2026.xlsx`

## Leitura principal

A aba `PESSOAL` e a fonte do retrato atual. Ela mostra receita total de R$ 15.507,03, despesas de R$ 1.870,00, parcelas de dividas de R$ 5.815,44, despesas + dividas de R$ 7.685,44, saldo mensal de R$ 7.821,59, divida total de R$ 178.744,00 e reserva atual de R$ 50,00.

O painel Financas agora usa esse snapshot como base e individualiza as dividas que estavam escondidas dentro dos blocos Holerite, Cartoes e Outras Dividas. O total estruturado bate com a planilha: R$ 178.744,00 de saldo e R$ 5.815,44 de parcelas mensais.

## Como a planilha deve melhorar

- Separar lancamentos reais, orcamento mensal, dossie de dividas e simulacoes em abas/blocos independentes.
- Transformar cada bloco em tabela limpa, com cabecalhos fixos: data, competencia, categoria, subcategoria, origem, valor, status, comprovante e observacao.
- Criar uma linha por divida com credor, contrato, saldo atualizado, parcela, atraso, protesto, SPC/Serasa, processo, oferta alvo e proxima acao.
- Separar Uber bruto de Uber liquido: gasolina, manutencao, plataforma, impostos e reserva do veiculo precisam aparecer como custos.
- Isolar `Deriv Robo`, `Projecao Futura`, `Planilha2` e `Hedging` dos KPIs reais; elas sao simulacoes de risco/trading.
- Nomear as duas dividas sem credor visivel e classificar as linhas com parcela zero.
- Fechar todo mes com previsto vs realizado, saldo final, reserva, acordo assinado e proxima acao.

## Como organizar pelo Anti-Gravity

1. Use a subaba `Planilha` em Financas para validar origem, snapshot e pendencias.
2. Use `Caixa` para ajustar PM liquido, Uber e despesas recorrentes.
3. Use `Dividas` para completar credor, contrato, documentos, risco e status de negociacao.
4. Use `Plano` para fechar o mes e decidir quais acordos cabem no limite de caixa.
5. Salve o JSON do painel; deixe o Excel como fonte bruta e nao como cockpit operacional.

## Alertas de qualidade

- A gasolina aparece na area de despesas, mas o total cacheado de despesas nao inclui essa linha. Confirmar se ela e despesa pessoal ou custo do Uber.
- Ha linhas de dividas com saldo e parcela, mas sem credor nomeado.
- Dividas com parcela zero podem estar pausadas, vencidas, quitadas ou apenas provisionadas; elas nao devem ficar ambigueas.
- As simulacoes de trading contem erros de formula em abas de sandbox e nao devem alterar caixa, reserva ou limite de acordo.
