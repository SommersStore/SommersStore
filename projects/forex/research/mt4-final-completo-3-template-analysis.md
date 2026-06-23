# Analise do template MT4 Final_Completo_3

## Fonte local analisada

- Terminal: `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\ADB94438A57B9692806EA638441107AB`
- Template: `templates\Final_Completo_3.tpl`
- Tamanho: `15927` bytes
- Ultima alteracao observada: `2026-06-13 18:29`
- Indicador Peak local: `MQL4\Indicators\Nova pasta\ForexWOT.Com-PriceChannelStop\Indicators\Peak.ex4`
- Codigo-fonte Peak: nao encontrado como `.mq4` no terminal analisado.

## Leitura do visual

O template combina um grafico principal escuro, candles coloridos por leitura RSI, zonas/linhas de trade, marcador de sessoes e quatro subjanelas compactas. A estrutura casa bem com a ideia do painel Forex porque separa:

- preco e desenhos principais no grafico superior;
- sessao e horario de mercado logo abaixo do preco;
- `Peak` como primeira leitura de reversao/exaustao;
- `Sonic_6 PVA Volumes` para participacao/volume;
- `Fisher_Yur4ik` e `smFisherTransform3` como filtros de oscilacao.

Parametros visuais principais extraidos:

| Item | Valor observado |
| --- | --- |
| Simbolo salvo | `GBPAUD` |
| Periodo salvo | `5` / M5 |
| Escala | `8` |
| Grade | `0` / desligada |
| Volumes do grafico principal | `0` / desligados |
| Ask line | `1` / ligada |
| Chart shift | `1` / ligado |
| Janela principal | `height=261` |
| Peak | janela `height=44` |
| Sonic PVA | janela `height=37` |
| Fisher | janela `height=30` |
| smFisherTransform3 | janela `height=32` |

Indicadores principais vistos no template:

- `Cynthia_s_AutoFib_TradeZones`
- `Fractals_Original`
- `Cynthia_s_Trend_Bars`
- `Black Chart\Union Spread`
- `Market\Session Times`
- `Market\Top Clock MT4`
- `4-CONJUNTO-DE-VELAS` com `RSI_Period=21`
- `Forex_System Real Price`
- `Nova pasta\ForexWOT.Com-PriceChannelStop\Indicators\Peak`
- `White Chart\Sonic_6 PVA Volumes (White)`
- `Fisher_Yur4ik`
- `ForexWOT.Com-BullsBearsTrading\Indicators\smFisherTransform3`

## Comparacao com a estrategia

O visual deve ser usado como cockpit, nao como regra automatica. A estrategia continua nesta ordem:

1. Elliott H4 define tendencia macro.
2. Elliott H1 confirma tendencia ou zona.
3. Figuras de Dow/graficas H1 validam estrutura.
4. Figuras M15 refinam gatilho.
5. Microfigura M5 valida entrada.
6. Peak, volume e Fisher entram como filtros de qualidade, nunca como substitutos da leitura H4/H1.

## Camadas novas no grafico

Usar nomes de objetos padronizados para que os scripts MT4/MT5 apliquem a visibilidade correta:

| Camada | Prefixo | Visibilidade desejada |
| --- | --- | --- |
| Ondas de Elliott H4/H1 | `AIOX_ELLIOTT_` | H4 e H1 somente |
| Figura Dow H1 | `AIOX_DOW_H1_` | H1, M15 e M5 |
| Figura Dow M15 | `AIOX_DOW_M15_` | M15 e M5 |
| Figura Dow M5 | `AIOX_DOW_M5_` | M5 somente |
| Objetos permanentes | `AIOX_KEEP_ALL_` | todos os periodos |

## Paleta sugerida

O template ja tem candles fortes em verde/purpura e subindicadores vivos. As novas camadas devem ser discretas:

- Elliott H4/H1: dourado suave, linha 1 ou 2, sem preenchimento pesado.
- Dow H1: ciano/teal com opacidade visual baixa.
- Dow M15: azul frio discreto.
- Dow M5: cinza claro ou branco fino, apenas no M5.
- Invalidacao: vermelho escuro fino, sem caixas grandes.
- Zonas: retangulos em fundo com preenchimento minimo.

## Regras de uso no MT4

1. Desenhar a contagem Elliott apenas em H4/H1.
2. Nomear todos os objetos Elliott com `AIOX_ELLIOTT_`.
3. Desenhar figuras H1 com `AIOX_DOW_H1_`.
4. Desenhar figuras M15 com `AIOX_DOW_M15_`.
5. Desenhar microfiguras M5 com `AIOX_DOW_M5_`.
6. Rodar `AIOX_Forex_Apply_Object_Visibility.mq4` no grafico.
7. Conferir manualmente alternando H4, H1, M15 e M5.
8. Salvar um novo template pelo MT4 apos a validacao.

## Fontes tecnicas

- MetaTrader 4 Help: objetos graficos incluem linhas, formas, setas e textos, e a aba `Visualization` permite mostrar objetos apenas em timeframes selecionados: https://www.metatrader4.com/en/trading-platform/help/analytics/objects_control
- MQL4 Reference: `OBJPROP_TIMEFRAMES` controla os timeframes visiveis e aceita combinacao de flags por `|`: https://docs.mql4.com/constants/objectconstants/visible
- MQL5 Reference: MT5 tambem usa `OBJPROP_TIMEFRAMES` com `ObjectSetInteger`: https://www.mql5.com/en/docs/constants/objectconstants/visible
