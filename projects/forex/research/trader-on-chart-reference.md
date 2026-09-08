# Trader On Chart - referencia funcional publica

## Objetivo

Registrar o escopo observavel do Trader On Chart para orientar uma alternativa AIOX em MT4/MT5 sem copiar codigo, marca, imagens ou assets proprietarios.

## Fonte principal

- Pagina publica: `https://www.traderonchart.com/`
- Data da consulta: 2026-06-17 e revisao complementar em 2026-06-18
- Evidencia visual publica observada: painel `TOC 1.8.2 PRO license` com abas/botoes `Close`, `Market`, `Profit`, `Loss`, `Pending`, campos `Risk %`, `SL Pips`, `TP Pips`, `BE`, `TS`, controles `Two Way Trading`, `OCO Yes`, seletor de pendente, distancia em pips, `Place`, `Instant` e botoes grandes `Sell`/`Buy`.
- Evidencia do usuario em 2026-06-18: screenshots de painel licenciado `ToC v1.5` com simbolo no topo, linha `Close orders`, campos tabulares `Lots`, `SL Pips`, `TP Pips`, `Trailing Stop Pips`, `Allow hedge`, pendente `BUY STOP`, `pips distance`, `Place`, Buy verde, Sell vermelho e rodape.
- Manual local analisado: `Manual-de-Acesso-ao-Sistema-Forex-Facil.pdf` em `C:\Users\ADMIN\Desktop\Dukascopy 2025\12-09-2025\Curso Mr. Sky-20250913T000647Z-1-001\Curso Mr. Sky\Atualização jan 2015\`. Resultado: PDF de acesso/licenca ao conteudo do curso, sem parametros tecnicos novos de UI/EA.

## Comportamentos publicos a reproduzir como AIOX

- Painel grafico dentro do MetaTrader para execucao manual.
- Calculo de position size por risco antes de enviar ordens.
- Linhas de entrada, stop loss e take profit ajustaveis no grafico.
- Buy/Sell a mercado.
- Ordens pendentes por modo/direcao e distancia em pips.
- Straddle com buy stop e sell stop ao redor do preco atual.
- Two Way Trading para alternar entre straddle de dois lados e envio unico.
- OCO para remover pendentes opostas apos preenchimento.
- Botao de breakeven.
- Smart breakeven com cobertura de custos quando dados de comissao/swap estiverem disponiveis.
- Trailing stop operacional.
- Fechamento de posicoes por mercado, lucro, prejuizo e limpeza de pendentes.

## Limites

- Nao ha copia do layout visual, marca, imagens, textos comerciais ou codigo do produto externo.
- O EA AIOX nao e um gerador de sinais e nao promete resultado.
- A automacao de trailing depende do terminal aberto e do EA rodando no grafico.
- O MT5 permite somente um Expert Advisor por grafico; para manter outro EA ativo no mesmo simbolo, o AIOX deve rodar em uma segunda janela desse simbolo.
- Todos os parametros precisam ser testados em demo/Strategy Tester antes de qualquer conta real.

## Pesquisa complementar para a v1.50

- API oficial de fechamento parcial: `https://www.mql5.com/en/docs/standardlibrary/tradeclasses/ctrade/ctradepositionclosepartial`. A MetaQuotes limita `CTrade::PositionClosePartial` a contas com contabilidade hedging e recomenda validar `ResultRetcode()` depois do envio.
- Tipos de conta: `https://www.mql5.com/en/docs/constants/environment_state/accountinformation`. O EA consulta `ACCOUNT_MARGIN_MODE` antes de habilitar reducao parcial.
- Restricoes de volume: `https://www.mql5.com/en/docs/constants/environment_state/marketinfoconstants`. Cada parcial respeita `SYMBOL_VOLUME_MIN` e `SYMBOL_VOLUME_STEP`, sem arredondar o fechamento acima do percentual solicitado.
- Referencias funcionais publicas no Market MQL5 mostraram dois padroes uteis: fechamento manual por percentual e ate tres estagios automaticos com gatilho em pips e percentual do volume remanescente. Esses conceitos orientaram a v1.50, sem copiar codigo, marca ou layout de terceiros.

## Escopo AIOX implementado

- `projects/forex/tools/mt4/AIOX_Trader_On_Chart.mq4`
- `projects/forex/tools/mt5/AIOX_Trader_On_Chart.mq5`
- Versao funcional atual: MT5 `v1.50`; MT4 `v1.32` preservado como referencia visual clara.
- MT5 possui `PanelTheme` com `TEMA_CLARO_ORIGINAL_MT4` e `TEMA_ESCURO_GRAFICO_PRETO`; o tema escuro e o padrao e ambos usam `PanelScalePercent = 135`.
- Modos de risco: percentual da conta, valor fixo em dinheiro e lote fixo.
- Linhas `AIOX_TOC_LINE_ENTRY`, `AIOX_TOC_LINE_SL` e `AIOX_TOC_LINE_TP`.
- Botoes: `BUY`, `SELL`, `PENDING`, `STRADDLE`, `BE`, `TRAIL`, `CLOSE`, `DEL`, `CLOSE ALL`, `Market`, `Profit`, `Loss`, `Pending`, `Two Way`, `OCO`, seletor de pendente e `Place`.
- Modos de pendente: `BUY STOP`, `SELL STOP`, `BUY LIMIT`, `SELL LIMIT`.
- Smart BE: adiciona comissao/swap quando a plataforma expuser estes custos e aplica buffer extra.
- OCO: remove pendentes do mesmo simbolo/escopo quando uma posicao e aberta.
- Guardrails: filtro de spread, stop level do broker, magic number e gerenciamento opcional apenas de ordens AIOX.
- MT5 v1.50: Buy a esquerda e Sell a direita sem cotacao nos botoes, acoes com cores mais escuras e texto branco, `Place` ampliado e botoes de fechamento com fundo branco.
- MT5 v1.50: tres controles de fechamento parcial manual e tres estagios automaticos opcionais por gatilho em pips e percentual do volume remanescente. Os estagios automaticos iniciam desativados e a reducao por ticket e limitada a contas hedging, conforme a API oficial `CTrade::PositionClosePartial`.

## Matriz de paridade v1.50

| Recurso publico Trader On Chart | Status AIOX v1.50 |
| --- | --- |
| Painel no grafico MetaTrader | Implementado MT4/MT5 |
| Buy/Sell one-click | Implementado MT4/MT5 |
| Calculo de lote por risco | Implementado por %, dinheiro e lote fixo |
| SL/TP em pips | Implementado com edicao no painel e linhas |
| BE e TS | Implementado com campos `BE` e `TS` |
| Smart break even | Implementado com custos quando disponiveis |
| Straddle pending orders | Implementado |
| Two Way Trading | Implementado |
| OCO | Implementado |
| Fechar mercado/lucro/prejuizo/pendentes | Implementado |
| Visual compacto com simbolo no topo | Implementado como aproximacao propria |
| Buy verde e Sell vermelho | Implementado |
| Tema claro semelhante ao MT4 e tema escuro contrastante | Implementado no MT5 por `PanelTheme` |
| Fechamento parcial em ate tres estagios | Implementado no MT5 por botoes e gatilhos opcionais; conta hedging obrigatoria |
| Visual identico e marca original | Fora do escopo por propriedade intelectual; aproximacao propria |

## Pendencias para comparacao exata

- Se o usuario fornecer um arquivo original licenciado, preset ou screenshots proprios, a analise deve limitar-se a recursos visiveis/configuracoes permitidas, sem decompilar binarios.
- Se o original permitir aumentar escala nativamente, documentar o parametro exato; enquanto isso, o AIOX usa `PanelScalePercent = 130`.
