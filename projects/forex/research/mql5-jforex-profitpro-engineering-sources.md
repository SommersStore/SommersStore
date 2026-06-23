# Fontes tecnicas - MQL5, JForex e ProfitPro

## Objetivo

Consolidar fontes primarias para evoluir o AIOX Trader On Chart, adaptar o template MT4 para MT5/JForex/ProfitPro e evitar programacao por tentativa cega.

## MQL5 / MetaTrader 5

Fontes oficiais:

- `CTrade.Buy`: https://www.mql5.com/en/docs/standardlibrary/tradeclasses/ctrade/ctradebuy
- `CTrade.SetTypeFillingBySymbol`: https://www.mql5.com/en/docs/standardlibrary/tradeclasses/ctrade/ctradesettypefillingbysymbol
- `OrderSend`: https://www.mql5.com/en/docs/trading/ordersend
- `EventSetTimer`: https://www.mql5.com/en/docs/eventfunctions/eventsettimer

Aplicacao no EA v1.20+ / v1.31:

- Usar `trade.SetTypeFillingBySymbol(Symbol())` para respeitar a politica de preenchimento do ativo.
- Em `CTrade.Buy/Sell`, usar `price=0.0` para deixar a plataforma usar Ask/Bid atual em ordens a mercado.
- Nao confiar apenas no retorno booleano de `CTrade`; checar `ResultRetcode()` e `ResultRetcodeDescription()`.
- Usar `EventSetTimer` para atualizar painel sem redesenhar tudo a cada tick.
- Bloquear lote zero quando `SYMBOL_TRADE_TICK_VALUE`, `SYMBOL_TRADE_TICK_SIZE` ou distancia Entry/SL nao estiverem validos.

## MQL4 / MetaTrader 4

Aplicacao no EA v1.20+ / v1.31:

- Reduzir carga do `OnTick`; atualizar painel por `OnTimer`.
- Antes de enviar ordem, usar `RefreshRates()`.
- Repetir `OrderSend` somente em erros transientes como requote, off quotes, contexto ocupado ou mudanca de preco.
- Aumentar slippage padrao para 20 points, ajustavel pelo usuario.

## JForex / Dukascopy

Fontes oficiais:

- JForex API Javadoc: https://www.dukascopy.com/client/javadoc/
- `IEngine`: https://www.dukascopy.com/client/javadoc/com/dukascopy/api/IEngine.html
- Strategy API: https://www.dukascopy.com/wiki/en/development/strategy-api/

Pontos de engenharia:

- `IEngine.submitOrder` usa `amount` em milhoes, nao em lote MetaTrader.
- `price=0` em market orders usa o ultimo preco de mercado visivel no JForex.
- Slippage e passado em pips no JForex, nao como `0.0001`.
- Labels de ordem precisam ser unicos e com caracteres permitidos.
- A primeira fase deve replicar o visual como workspace; automacao Java fica para depois de validar comportamento manual.

## ProfitPro / Nelogica

Fontes oficiais:

- Documentacao NTSL: https://ajuda.nelogica.com.br/hc/pt-br/articles/360046443212-Documenta%C3%A7%C3%A3o-NTSL-Compilado-de-fun%C3%A7%C3%B5es-e-instru%C3%A7%C3%B5es-de-usabilidade
- Manual NTSL PDF: https://downloadserver-cdn.nelogica.com.br/content/profit/manual_ntsl/ManualNTSL.pdf
- Editor de Estrategias: https://ajuda.nelogica.com.br/hc/pt-br/articles/9165042993691-Editor-de-Estrat%C3%A9gias-Crie-estrat%C3%A9gias-pr%C3%B3prias-atrav%C3%A9s-do-Profit
- Como montar uma estrategia: https://ajuda.nelogica.com.br/hc/pt-br/articles/9794527588123-Como-montar-uma-estrat%C3%A9gia

Pontos de engenharia:

- ProfitPro nao usa `.tpl` do MetaTrader; a rota e desktop/layout + indicadores + NTSL para coloracao/indicadores/execucao.
- NTSL permite estrategias de indicadores, coloracao, execucao, alarmes e selecao.
- Antes de automatizar, criar template visual manual do setup e uma regra NTSL de marcacao/alerta.
- O visual MT4 deve ser traduzido por equivalencia funcional: candles, sessoes, volume, RSI/Fisher/Peak-like, EMAs, ATR, objetos Elliott/Dow.

## Fontes secundarias

Videos do YouTube podem ajudar a observar fluxo de uso real, especialmente interface do ProfitPro/JForex e exemplos de painel MT5, mas o codigo e as decisoes tecnicas devem ser guiados primeiro pelas fontes oficiais acima.
