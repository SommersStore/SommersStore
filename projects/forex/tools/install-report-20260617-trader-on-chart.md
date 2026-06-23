# Install Report - AIOX Trader On Chart

## Data

- Timestamp inicial: 2026-06-17 04:47:25 -03:00
- Correcao de instalacao: 2026-06-17 11:34:31 -03:00
- Escopo: Expert Advisor manual para MT4 e MT5, inspirado em funcionalidades publicas de chart trading.
- Observacao: a primeira instalacao cobriu apenas os data folders Dukascopy. A correcao instalou e compilou em todos os data folders MT4/MT5 detectados na maquina.

## Terminais alvo

| Plataforma | Terminal | MetaEditor | Data folder |
| --- | --- | --- | --- |
| MT4 | Dukascopy MetaTrader 4 | `C:\Program Files (x86)\Dukascopy MetaTrader 4\metaeditor.exe` | `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\ADB94438A57B9692806EA638441107AB` |
| MT4 | MetaTrader - ActivTrades | `C:\Program Files (x86)\MetaTrader - ActivTrades\metaeditor.exe` | `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\A6DFBB1B8DE9672D2328FF3445436DEC` |
| MT5 | Dukascopy MetaTrader 5 | `C:\Program Files\Dukascopy MetaTrader 5\MetaEditor64.exe` | `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\3CA1B4AB7DFED5C81B1C7F1007926D06` |
| MT5 | FTMO Global Markets MT5 Terminal | `C:\Program Files\FTMO Global Markets MT5 Terminal\MetaEditor64.exe` | `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\81A933A9AFC5DE3C23B15CAB19C63850` |
| MT5 | Genial Investimentos MetaTrader 5_PC | `C:\Program Files\Genial Investimentos MetaTrader 5_PC\MetaEditor64.exe` | `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\91B74C876E94E78049A056E2705B6A7B` |
| MT5 | MetaTrader 5 - ActivTrades_Teste TPL | `C:\Program Files\MetaTrader 5 - ActivTrades_Teste TPL\MetaEditor64.exe` | `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\ABF1944EF182FAAF2C912C5759E1DF11` |
| MT5 | MetaTrader 5 - ActivTrades | `C:\Program Files\MetaTrader 5 - ActivTrades\MetaEditor64.exe` | `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\FE0E65DDB0B7B40DE125080872C34D61` |

## Experts instalados e compilados

| Plataforma | Terminal | Fonte instalado | Binario | Resultado |
| --- | --- | --- | --- | --- |
| MT4 | Dukascopy MetaTrader 4 | `MQL4\Experts\AIOX_Trader_On_Chart.mq4` | `MQL4\Experts\AIOX_Trader_On_Chart.ex4` | 0 errors, 0 warnings |
| MT4 | MetaTrader - ActivTrades | `MQL4\Experts\AIOX_Trader_On_Chart.mq4` | `MQL4\Experts\AIOX_Trader_On_Chart.ex4` | 0 errors, 0 warnings |
| MT5 | Dukascopy MetaTrader 5 | `MQL5\Experts\AIOX_Trader_On_Chart.mq5` | `MQL5\Experts\AIOX_Trader_On_Chart.ex5` | 0 errors, 0 warnings |
| MT5 | FTMO Global Markets MT5 Terminal | `MQL5\Experts\AIOX_Trader_On_Chart.mq5` | `MQL5\Experts\AIOX_Trader_On_Chart.ex5` | 0 errors, 0 warnings |
| MT5 | Genial Investimentos MetaTrader 5_PC | `MQL5\Experts\AIOX_Trader_On_Chart.mq5` | `MQL5\Experts\AIOX_Trader_On_Chart.ex5` | 0 errors, 0 warnings |
| MT5 | MetaTrader 5 - ActivTrades_Teste TPL | `MQL5\Experts\AIOX_Trader_On_Chart.mq5` | `MQL5\Experts\AIOX_Trader_On_Chart.ex5` | 0 errors, 0 warnings |
| MT5 | MetaTrader 5 - ActivTrades | `MQL5\Experts\AIOX_Trader_On_Chart.mq5` | `MQL5\Experts\AIOX_Trader_On_Chart.ex5` | 0 errors, 0 warnings |

## Logs de compilacao

- `projects/forex/tools/compile-logs/mt4_trader_on_chart.log`
- `projects/forex/tools/compile-logs/mt5_trader_on_chart.log`
- `projects/forex/tools/compile-logs/mt4_ADB94438A57B9692806EA638441107AB_trader_on_chart.log`
- `projects/forex/tools/compile-logs/mt4_A6DFBB1B8DE9672D2328FF3445436DEC_trader_on_chart.log`
- `projects/forex/tools/compile-logs/mt5_3CA1B4AB7DFED5C81B1C7F1007926D06_trader_on_chart.log`
- `projects/forex/tools/compile-logs/mt5_81A933A9AFC5DE3C23B15CAB19C63850_trader_on_chart.log`
- `projects/forex/tools/compile-logs/mt5_91B74C876E94E78049A056E2705B6A7B_trader_on_chart.log`
- `projects/forex/tools/compile-logs/mt5_ABF1944EF182FAAF2C912C5759E1DF11_trader_on_chart.log`
- `projects/forex/tools/compile-logs/mt5_FE0E65DDB0B7B40DE125080872C34D61_trader_on_chart.log`

## Recursos incluidos

- Painel no grafico com `BUY`, `SELL`, `PENDING`, `STRADDLE`, `BE`, `TRAIL`, `CLOSE`, `DEL` e `CLOSE ALL`.
- Modos de risco: percentual da conta, valor fixo em dinheiro e lote fixo.
- Linhas arrastaveis de entrada, stop loss e take profit.
- Filtro de spread maximo e checagem de stop level do broker.
- Gerenciamento por magic number com `ManageOnlyMagic`.
- Breakeven com trigger e offset.
- Trailing stop automatico enquanto o EA estiver rodando no grafico.
- Straddle com buy stop e sell stop ao redor do preco atual.

## Proxima verificacao manual

1. Abrir conta demo/Strategy Tester.
2. Anexar `AIOX_Trader_On_Chart` em um grafico liquido, preferencialmente EURUSD.
3. Habilitar AutoTrading/Algo Trading apenas em demo.
4. Arrastar Entry/SL/TP e conferir lote, risco, R:R e spread no painel.
5. Testar primeiro `PENDING` e `STRADDLE` com lotes pequenos.
6. Testar `BE` e `TRAIL` em posicao demo aberta.
