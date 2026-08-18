# Relatorio de instalacao multimercado - 2026-07-31

## Resultado executivo

| Prioridade | Plataforma | Estado | Evidencia |
| --- | --- | --- | --- |
| 1 | Dukascopy MetaTrader 5 | Instalado e compilado | Template, 5 indicadores, fonte e EX5 presentes; 0 erros/0 warnings |
| 1 | ActivTrades MetaTrader 5 | Instalado e compilado | Template, 5 indicadores, fonte e EX5 presentes; 0 erros/0 warnings |
| 2 | NinjaTrader 8.1.7.0 | Preparado; importacao bloqueada pelo login | 5 ZIPs na pasta nativa de importacao; Defender sem ameacas |
| 3 | JForex4 4.8.16 | Fontes instalados e compilacao Java validada | 2 fontes e 2 classes compiladas contra API 4.8.13 |

## MetaTrader 5

Template disponivel pelo menu de templates:

- `AIOX_Campanha_3por1_MT5.tpl`

EA disponivel no Navegador > Expert Advisors:

- `AIOX_Trader_On_Chart`

Destinos:

- Dukascopy: `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\3CA1B4AB7DFED5C81B1C7F1007926D06\MQL5`
- ActivTrades: `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\FE0E65DDB0B7B40DE125080872C34D61\MQL5`

Dependencias instaladas em ambos:

- `Market\Top Clock MT5.ex5`
- `MT5 Indicators\braintrend2.ex5`
- `MT5 Indicators\fractal-levels-indicator-m5.ex5`
- `MT5 Indicators\lnx_cci.ex5`
- `MT5 Indicators\disparityindex.ex5`
- `SOMMA\SOMMA_Multimarket_Desk.ex5`

Logs:

- `compile-logs/mt5_dukascopy_multimercado_20260731.log`
- `compile-logs/mt5_activtrades_multimercado_20260731.log`

Os dois logs terminam em `Result: 0 errors, 0 warnings`.

### Correcao operacional apos validacao visual

O primeiro pacote deixava o template apenas como arranjo de indicadores e removia o EA ao ser aplicado. A versao corrigida passou a conter explicitamente o bloco `<expert>` do `AIOX_Trader_On_Chart`. Como `Program Files` rejeitou escrita sem elevacao, foi criado e compilado `AIOX_Apply_Campanha_Template.mq5`, executado pelo mecanismo oficial `[StartUp]` a partir de configuracoes temporarias sem login ou credenciais.

Evidencia de runtime em 2026-07-31:

- Dukascopy `GBPUSD,M5`: script carregado, cinco indicadores solicitados e EA carregado com sucesso.
- ActivTrades `GOLD,M5`: script carregado, cinco indicadores solicitados e EA carregado com sucesso.
- Inspecao visual confirmou painel AIOX v1.32, candles coloridos, marcadores, linhas de entrada/SL/TP e subpaineis LNX CCI e Disparity Index na ActivTrades.

### Camada estrategica SOMMA adicionada

A validacao do pacote legado revelou que ele nao materializava o sistema descrito no documento de projeto. Foi entao implementado e anexado ao template o indicador autoral `SOMMA_Multimarket_Desk`, com:

- EMAs 20, 50 e 200 no grafico;
- VWAP de sessao por tick volume;
- maxima/minima e abertura diaria e semanal;
- alinhamento direcional H4, H1, M15 e M5;
- regimes V0 a V4 por ATR relativo;
- deteccao dos setups A (pullback) e B (rompimento aceito);
- score de 0 a 100, classes A+/A/B e estados `BLOCKED`, `WATCH` e `ARMED`;
- motivos de liberacao/bloqueio e filtro de spread.

O indicador foi compilado separadamente nos MetaEditor da Dukascopy e da ActivTrades com `0 errors, 0 warnings`. Os journals registraram `custom indicator SOMMA_Multimarket_Desk ... loaded successfully`, e a tela foi inspecionada com painel, medias e niveis efetivamente visiveis. O desk e assistivo: nao envia ordens e nao implica promessa de desempenho.

Limitacoes ainda explicitas: o mapa de opcoes do arquivo TradingView nao possui alimentacao automatica, e o regime V5 de noticias ainda nao esta conectado a um calendario. Esses itens nao foram simulados como se estivessem prontos.

### Refinamento visual Gamma + FP Leme

O arquivo `Niveis_Opcoes_Tradingview_2026-07-18.txt` foi instalado em `MQL5\Files\SOMMA` e passou a alimentar linhas de Call Wall, Put Wall, Key Level, 0DTE, Gamma 1-10, Gamma Flip e extremos para os simbolos mapeaveis. GOLD usa a referencia GC e GBPUSD usa 6B. A data `18/JUL` permanece visivel para impedir que niveis antigos sejam interpretados como atualizados.

Foi criado o rodape `SOMMA FP | FORCA + DESLOCAMENTO`, consolidando histograma de deslocamento normalizado por ATR, forca/impulso, sinal, posicao no range e ciclos Hertz rapido/lento. A nomenclatura e os modulos foram derivados dos controles expostos pelos ZIPs FP Leme; as equacoes sao uma reconstrucao publica e auditavel, nao uma copia exata das DLLs proprietarias.

O `AIOX_Trader_On_Chart` foi atualizado para v1.33 com fundo escuro opaco, objetos acima do grafico, fontes menores independentes do tamanho do painel e tipografia Segoe UI.

### Histograma S/R v2 e experiencia JForex

O rodape MT5 foi simplificado para um unico histograma de pressao entre suporte e resistencia estrutural, ajustado pela direcao da vela e pelo volume por tick. A escala fixa e de -100 a +100 e possui cinco zonas horizontais: `S2 absorcao (-75)`, `S1 proximidade (-45)`, `equilibrio (0)`, `R1 proximidade (+45)` e `R2 exaustao (+75)`. O titulo do indicador informa pressao atual, suporte, resistencia e volume relativo.

No JForex foram instalados:

- `C:\Users\ADMIN\JForex4\Indicators\SOMMA_FP_Pressure_JForex.java` e `.class`;
- `C:\Users\ADMIN\JForex4\Strategies\AIOX_Multimercado\AIOX_Campanha_3por1_Visual_JForex.java` e `.class`;
- `C:\Users\ADMIN\JForex4\Templates\SOMMA_Cockpit_XAUUSD_M5.tmpl`.

O indicador e a estrategia visual compilaram contra a API local JForex 4.8.13 com codigo 0. O template foi validado como JSON e configurado para XAU/USD M5. Ao reiniciar, o aplicativo abriu a janela `FX Marketplace` em vez da sessao demo anterior; por isso, a aplicacao final no grafico requer reentrada do operador na sessao, sem manipulacao de credenciais pela automacao.

O feed JForex fornece precos inscritos, ticks/barras e volume por tick em tempo real conforme a conexao/conta. Ele nao fornece, pelos dados locais/API identificados, Gamma Walls de opcoes prontos; esses niveis continuam exigindo arquivo ou provedor externo especializado.

## NinjaTrader

Pasta preparada:

`C:\Users\ADMIN\Documents\NinjaTrader 8\import\AIOX_Multimercado`

| Pacote | SHA-256 |
| --- | --- |
| `FPLEME_M7_III.zip` | `EEEC1EE0E257CACE5D039EC180CE8129122984159D49126F3E521F67F6FA1DE2` |
| `HERTZ_MONITOR_N.zip` | `EFF0692E65FD5F5D2B1DC809BDA6B6D34FF40EDC7CD39DFF754B601A854DB50E` |
| `MAPS_M7_MRS_MRI.zip` | `40077FE1C30353839F9B0EF9AC9CDF7B7F54E061550846DEBA979DFA88EA89CA` |
| `RENKOBRZ.zip` | `3ABB408332F1336E83820909E8EC1765332233AF5B4935D134FF17E2445A3F88` |
| `VX_M7.zip` | `348A40905567B0CDD20979DC0ACCE51BF3128E5977FB04BC4E6ABD2601868D03` |

O Microsoft Defender retornou `found no threats` e codigo 0 para todos os pacotes. Isso nao prova qualidade, rentabilidade ou ausencia absoluta de comportamento indesejado.

O NinjaTrader abriu na tela de login com credenciais invalidas. Por seguranca, nenhuma credencial foi solicitada ou manipulada. A etapa restante e entrar no Control Center e usar `Tools > Import > NinjaScript Add-On`, escolhendo os ZIPs na pasta acima. A documentacao oficial recomenda importar apenas arquivos de fonte confiavel e reiniciar a plataforma depois de atualizacoes.

## JForex4

Destino:

`C:\Users\ADMIN\JForex4\Strategies\AIOX_Multimercado`

Instalados:

- `AIOX_Campanha_3por1_Visual_JForex.java` - assistente visual, sem envio de ordens.
- `AIOX_Campanha_3por1_JForex.java` - estrategia de campanha; usar inicialmente apenas em demo.

O codigo legado foi corrigido para a API local JForex 4.8.13 (`Period.FIVE_MINS`, `Period.FIFTEEN_MINS`, `IEngine.OrderCommand` e P/L atual). Ambos os fontes compilaram com codigo de saida 0 via Eclipse Compiler local. O JForex gera o formato proprietario `.jfx` quando o fonte e compilado/aberto pela propria plataforma.

## Guardrails

- Nenhuma credencial foi copiada ou gravada.
- Nenhuma conta real foi habilitada.
- Nenhuma ordem foi enviada.
- O template e as estrategias devem ser validados primeiro em demo.
