# Estudo do indicador Peak

## Fonte local

- Indicador: `Peak.ex4`
- Caminho: `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\ADB94438A57B9692806EA638441107AB\MQL4\Indicators\Nova pasta\ForexWOT.Com-PriceChannelStop\Indicators\Peak.ex4`
- Codigo-fonte `.mq4`: nao localizado.
- Template de origem: `Final_Completo_3.tpl`

Como o arquivo disponivel e compilado, a primeira fase do estudo precisa ser por comportamento. Nao e tecnicamente correto afirmar que ele nao repinta sem testar buffers em velas fechadas ou sem obter o `.mq4`.

## Parametros extraidos do template

| Parametro | Valor |
| --- | --- |
| `Len` | `150` |
| `HistoryBars` | `1000` |
| `TF1` | `0` |
| `TF2` | `0` |
| `ModeHL` | `true` |
| `ModeOnline` | `true` |
| `ModeinFile` | `false` |
| `ModeHistory` | `false` |
| `alert` | `false` |
| `sound` | `false` |
| `email` | `false` |
| `GV` | `false` |
| `UrovenSignal` | `25.0` |
| Nivel 1 | `25` |
| Nivel 2 | `15` |
| Cor buffer 0 | `3937500` |
| Cor buffer 1 | `3329330` |

Observacao visual do usuario: picos verdes parecem antecipar reversao de alta para baixa; picos avermelhados parecem antecipar reversao de queda para alta. A primeira tarefa do probe e confirmar qual buffer representa cada cor e se a interpretacao visual se mantem por ativo/timeframe.

## Hipotese operacional

O Peak deve ser tratado como filtro de exaustao/reversao local, nao como gatilho autonomo. Dentro da Campanha 3 por 1, ele pode melhorar a avaliacao de:

- fim de pullback contra a tendencia de Elliott;
- exaustao antes de rompimento falso;
- regiao onde o M5 deve esperar confirmacao e nao perseguir preco;
- qualidade de uma microfigura quando o candle de forca aparece logo apos o pico.

## Protocolo anti-repaint

1. Instalar `AIOX_Peak_Buffer_Probe.mq4` como Expert Advisor de teste.
2. Rodar em conta demo ou no Strategy Tester visual.
3. Usar o mesmo ativo e timeframe do template primeiro: GBPAUD M5.
4. Registrar no minimo 300 a 500 candles por sessao.
5. Comparar valores por `bar_time`, nao por `shift`, porque o `shift` muda a cada candle novo.
6. Qualquer mudanca de valor em vela ja fechada deve ser registrada como alteracao historica.
7. Se alteracoes ocorrerem apenas no candle 0, o indicador pode ser considerado estavel em candle fechado para aquele ativo/timeframe.
8. Se alteracoes aparecerem em candles antigos, classificar como repaint historico e reduzir peso operacional.

## Metricas para avaliar

| Metrica | Como medir |
| --- | --- |
| Estabilidade | numero de alteracoes em velas fechadas dividido por velas monitoradas |
| Latencia | quantos candles depois do topo/fundo o pico aparece |
| Aderencia a estrategia | pico aparece a favor da leitura Elliott H4/H1 ou contra ela |
| Qualidade do gatilho | M5 gera fechamento de confirmacao apos o pico |
| Falso positivo | pico sem deslocamento minimo de 1R ou sem rompimento estrutural |
| Confluencia | Peak + PVA + Fisher + figura M5 |

## Integracao com a estrategia

Peso sugerido no score A+:

- `+1` se Peak confirma exaustao exatamente na zona de pullback prevista por Elliott/Fibonacci.
- `+0.5` se Peak apenas concorda com M5, mas longe da zona tecnica.
- `0` se Peak esta neutro.
- `-1` se Peak aponta reversao contra a direcao planejada e a estrutura M5 ainda nao confirmou.

O Peak nunca deve liberar Nivel 2 ou Nivel 3 sozinho. Ele pode reforcar o setup, mas a permissao continua vindo de Elliott H4/H1, figura H1/M15, M5 e risco.

## Ferramentas criadas

- `projects/forex/tools/mt4/AIOX_Peak_Buffer_Probe.mq4`: Expert Advisor de teste para registrar buffers e detectar alteracoes em velas fechadas.

## Fontes tecnicas

- MQL4 `iCustom` permite chamar indicadores customizados compilados `.ex4` localizados em `MQL4\Indicators`: https://docs.mql4.com/indicators/icustom
- A ordem dos parametros passados via `iCustom` deve seguir a ordem dos inputs do indicador: https://docs.mql4.com/basis/variables/inputvariables
