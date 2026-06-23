# Skill - MQL5 Expert Advisor Engineering

## Objetivo

Construir, auditar e evoluir Expert Advisors MQL5 com foco em execucao confiavel, diagnostico claro e compatibilidade com brokers como Dukascopy MT5.

## Fontes primarias

- MQL5 `CTrade.Buy`: https://www.mql5.com/en/docs/standardlibrary/tradeclasses/ctrade/ctradebuy
- MQL5 `CTrade.SetTypeFillingBySymbol`: https://www.mql5.com/en/docs/standardlibrary/tradeclasses/ctrade/ctradesettypefillingbysymbol
- MQL5 `OrderSend`: https://www.mql5.com/en/docs/trading/ordersend
- MQL5 `EventSetTimer`: https://www.mql5.com/en/docs/eventfunctions/eventsettimer
- Corpus operacional Rimantas/EA Coder: `projects/forex/research/rimantas-channel/ea-coder-operational-context.md`
- Resumo transcrito Rimantas/EA Coder: `projects/forex/research/rimantas-channel/channel-transcript-context-summary.md`

## Regras de engenharia

- Antes de enviar ordens com `CTrade`, configurar `SetExpertMagicNumber`, `SetDeviationInPoints`, `SetTypeFillingBySymbol` e `SetAsyncMode(false)`.
- Para ordens a mercado via `CTrade.Buy/Sell`, preferir `price=0.0` quando a intencao for usar o preco atual da plataforma.
- Sempre registrar `ResultRetcode()` e `ResultRetcodeDescription()` quando uma operacao falhar.
- Tratar retorno booleano de `CTrade` como verificacao inicial; a validacao final deve olhar retcode de trade server.
- Validar `SYMBOL_VOLUME_MIN`, `SYMBOL_VOLUME_MAX`, `SYMBOL_VOLUME_STEP`, `SYMBOL_TRADE_TICK_VALUE`, `SYMBOL_TRADE_TICK_SIZE`, stops level e freeze level antes de operar.
- Nao calcular lote de risco se Entry, SL, tick value ou tick size forem invalidos; bloquear lote zero com alerta explicito.
- Evitar redesenho pesado no `OnTick`; usar `OnTimer` para painel/labels e `OnTick` para logica realmente dependente de tick.
- Separar painel manual, gestao de ordens e estrategia automatica. O AIOX Trader On Chart e painel de execucao manual, nao gerador de sinais.

## Checklist de diagnostico MT5

- `Algo Trading` esta ativo no terminal?
- `Allow Algo Trading` esta marcado nas propriedades do EA?
- O simbolo permite trade no modo atual?
- O broker exige filling especifico (`FOK`, `IOC`, `RETURN`)?
- O lote calculado esta acima do minimo e respeita o step?
- SL/TP respeitam stop level e freeze level?
- O retcode do trade server foi capturado?
- Ha mensagem na aba `Experts` ou `Journal` logo apos o clique?

## Aplicacao no AIOX Trader On Chart

- Manter tema claro/bege para contraste com templates escuros.
- Manter escala padrao `PanelScalePercent = 130` na versao v1.31 enquanto o usuario pede painel maior.
- Preservar layout compacto estilo TOC: simbolo no topo, versao no canto, linha `Close orders`, campos tabulares e Buy verde/Sell vermelho.
- Preservar botoes de Buy, Sell, Pending, Straddle, BE, Trail, Close, Delete Pending, Close All, Market, Profit, Loss, Pending, Two Way, OCO, seletor de pendente e Place.
- Preservar modos de pendente `BUY STOP`, `SELL STOP`, `BUY LIMIT` e `SELL LIMIT` com distancia em pips.
- Preservar Smart BE com tentativa de cobrir comissao/swap quando a plataforma expuser estes custos.
- Preservar OCO para apagar pendentes do mesmo simbolo/escopo apos abertura de posicao.
- Usar timer para atualizar risco/spread e estados sem travar o grafico.
- Em falhas de ordem, mostrar erro rico no `Print` para o usuario enviar screenshot/log.
- Usar a skill `metatrader-ea-coder-operations` para transformar erros de instalacao, painel e spread em checklists operacionais antes de refatorar codigo.
- Usar a skill `metatrader-trade-copier-ops` quando a automacao envolver master/client, provider/receiver, multi-conta ou copia MT4/MT5.

## Proximos enriquecimentos

- Criar matriz de retcodes comuns por broker.
- Adicionar modo de simulacao sem envio de ordem para validar calculo de lote/SL/TP.
- Criar testes de Strategy Tester por simbolo Dukascopy.
- Mapear diferencas de netting/hedging quando o usuario confirmar o tipo de conta MT5.
