# Pesquisa - MyFXBook, MetaTrader e JForex

## Fontes consultadas

- MyFXBook Help - How to add my Trading account?
  - URL: https://www.myfxbook.com/help/knowledge-base/how-to-add-account/
  - Atualizado pela fonte em: 2026-06-10
- MyFXBook Help - MetaTrader 4 connection methods
  - URL: https://www.myfxbook.com/help/knowledge-base/metatrader-4-connection-methods/
  - Atualizado pela fonte em: 2024-04-28
- MyFXBook Help - MetaTrader 5 connection methods
  - URL: https://www.myfxbook.com/help/knowledge-base/metatrader-5-connection-methods/
  - Atualizado pela fonte em: 2024-04-28
- MyFXBook Help - Verification
  - URL: https://www.myfxbook.com/help/knowledge-base/verification/
  - Atualizado pela fonte em: 2025-02-04
- MetaTrader 4 Help - Templates and Profiles
  - URL: https://www.metatrader4.com/en/trading-platform/help/chart_management/templates
- MetaTrader 5 Help - Templates and Profiles
  - URL: https://www.metatrader5.com/en/terminal/help/charts_advanced/templates_profiles
- Dukascopy Wiki - JForex Workspaces and Chart Templates
  - URL: https://www.dukascopy.com/wiki/en/manuals/jforex3-desktop/workspaces-templates/

## Conclusao pratica para MyFXBook

O MyFXBook lista MetaTrader 4 e MetaTrader 5 como plataformas suportadas, cada uma com tres formas de conexao: Live Update, Auto Update e EA Publisher.

Para a Campanha 3 por 1, a rota preferida e:

1. Usar Auto Update ou Live Update quando a conta aceitar credenciais de leitura.
2. Conferir login read-only/investor password no proprio MT4/MT5 antes de inserir no MyFXBook.
3. Evitar compartilhar senha master com IA, assistente, terceiro ou painel local.
4. Usar EA Publisher apenas se houver necessidade de atualizacao por EA e se o operador entender as implicacoes de instalar DLL/EA.

## Como adicionar MT4/MT5 no MyFXBook

1. Entrar no MyFXBook.
2. Abrir o menu do avatar no dashboard.
3. Ir em `Settings`.
4. Clicar em `Add Account`.
5. Escolher `MetaTrader 4 (Auto Update)`, `MetaTrader 5 (Auto Update)` ou a modalidade Live/EA desejada.
6. Preencher os dados solicitados pela tela, preferindo credenciais read-only/investor quando a modalidade permitir.
7. Validar antes no MT4/MT5 se o login read-only entra corretamente.
8. Aguardar a primeira sincronizacao e conferir se broker, servidor e numero da conta estao corretos.

## Criterio 1 - Track Record

O MyFXBook usa este criterio para indicar que o historico visto no site corresponde ao historico fornecido pela corretora/plataforma.

Para verificar:

1. Abrir a pagina da conta no MyFXBook.
2. Clicar em `Settings` acima do grafico de ganho.
3. Ir para `Verification`.
4. Confirmar se os dados estao corretos:
   - numero da conta;
   - investor password;
   - broker;
   - broker server.
5. Se necessario, clicar em `Update Password`, inserir a investor password valida e salvar.
6. Aguardar a atualizacao do MyFXBook.

Se a conta foi conectada via EA Publisher e broker/servidor nao vieram preenchidos, configurar esses campos antes da verificacao.

## Criterio 2 - Trading Privileges

O MyFXBook usa este criterio para confirmar que a pessoa controla a conta e possui acesso operacional.

Metodo A - Alterar investor password:

1. Abrir a pagina da conta no MyFXBook.
2. Clicar em `Settings`.
3. Na area de verificacao/conexao, clicar em `Verify My Account`.
4. Copiar a authorization password gerada.
5. No MT4/MT5, entrar com a conta usando a senha master.
6. Abrir `Tools > Options > Server > Change`.
7. Selecionar a opcao de alterar a investor/read-only password.
8. Colar a authorization password nos campos de nova senha e confirmacao.
9. Voltar ao MyFXBook e acionar a verificacao.

Metodo B - Ordem pendente:

1. Copiar a authorization password gerada pelo MyFXBook.
2. No MT4/MT5, abrir `New Order`.
3. Criar uma ordem pendente com preco distante do mercado.
4. Colar a authorization password no campo `Comment`.
5. Aguardar a proxima atualizacao do MyFXBook.
6. Cancelar a ordem pendente depois da verificacao.

Guardrail: a ordem pendente precisa ficar longe do preco atual para evitar execucao acidental. A verificacao nao exige arriscar capital.

## Publicacao da conta

Antes de tornar a conta publica, a conta deve estar totalmente verificada. Depois disso:

1. Abrir a pagina da conta.
2. Clicar em `Settings`.
3. Ir para `Permissions`.
4. Escolher quais estatisticas ficam publicas ou privadas.
5. Salvar.

## JForex e MyFXBook

Na pagina oficial de plataformas suportadas do MyFXBook, a lista consultada inclui MetaTrader 4, MetaTrader 5, cTrader, TradeLocker, MatchTrade, Oanda e DxTrade. JForex nao aparece nessa lista.

Inferencia operacional: para a Dukascopy, usar MT4/MT5 quando o objetivo for demonstrar conta no MyFXBook; para JForex, manter diario/manual ou exportacoes ate haver rota oficial suportada.

## Templates e workspaces

MT4 e MT5 tratam templates como configuracoes de um grafico: cores, indicadores, objetos e estudos. Perfis salvam grupos de graficos e layout.

JForex separa:

- Workspace: configuracoes principais da plataforma, instrumentos, charts, indicadores, objetos e listas de plugins/estrategias.
- Chart Template: configuracao de um grafico especifico, incluindo periodo, exibicao, indicadores e objetos.

## Aplicacao no painel Forex

- O bloco `Templates` deve abrir os guias MT4, MT5 e JForex.
- O bloco `MyFXBook` deve abrir este arquivo e mostrar passos expansivos.
- O agente `forex-myfxbook-tracker` deve impedir qualquer fluxo que peca senha master ou credenciais sensiveis.
- A skill `myfxbook-account-verification` deve produzir checklists de conexao, verificacao e publicacao.
