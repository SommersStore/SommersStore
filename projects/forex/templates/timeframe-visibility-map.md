# Mapa de visibilidade por timeframe - Elliott e Dow

## Regra do usuario

- Ondas de Elliott aparecem somente em H4 e H1.
- Figuras de Dow/graficas aparecem em H1, M15 e M5.
- Figura H1 aparece em H1, M15 e M5.
- Figura M15 aparece em M15 e M5.
- Figura M5 aparece somente em M5.
- Figuras M15/M5 nao devem subir para H1/H4.

## Prefixos obrigatorios

| Uso | Prefixo do objeto |
| --- | --- |
| Elliott H4/H1 | `AIOX_ELLIOTT_` |
| Dow/Figura H1 | `AIOX_DOW_H1_` |
| Dow/Figura M15 | `AIOX_DOW_M15_` |
| Dow/Figura M5 | `AIOX_DOW_M5_` |
| Objeto permanente | `AIOX_KEEP_ALL_` |

Exemplos:

- `AIOX_ELLIOTT_GBPAUD_W3_H4`
- `AIOX_DOW_H1_GBPAUD_FLAG_20260615`
- `AIOX_DOW_M15_GBPAUD_PULLBACK_20260615`
- `AIOX_DOW_M5_GBPAUD_MICRO_TRIANGLE_20260615`

## Flags MT4

| Camada | Timeframes | Flags MT4 | Hex | Decimal |
| --- | --- | --- | --- | ---: |
| Elliott | H4 + H1 | `OBJ_PERIOD_H4 | OBJ_PERIOD_H1` | `0x0030` | 48 |
| Dow H1 | H1 + M15 + M5 | `OBJ_PERIOD_H1 | OBJ_PERIOD_M15 | OBJ_PERIOD_M5` | `0x0016` | 22 |
| Dow M15 | M15 + M5 | `OBJ_PERIOD_M15 | OBJ_PERIOD_M5` | `0x0006` | 6 |
| Dow M5 | M5 | `OBJ_PERIOD_M5` | `0x0002` | 2 |
| Permanente | Todos | `OBJ_ALL_PERIODS` | `0x01ff` | 511 |

## Flags MT5

| Camada | Timeframes | Flags MT5 | Hex | Decimal |
| --- | --- | --- | --- | ---: |
| Elliott | H4 + H1 | `OBJ_PERIOD_H4 | OBJ_PERIOD_H1` | `0x00004800` | 18432 |
| Dow H1 | H1 + M15 + M5 | `OBJ_PERIOD_H1 | OBJ_PERIOD_M15 | OBJ_PERIOD_M5` | `0x00000910` | 2320 |
| Dow M15 | M15 + M5 | `OBJ_PERIOD_M15 | OBJ_PERIOD_M5` | `0x00000110` | 272 |
| Dow M5 | M5 | `OBJ_PERIOD_M5` | `0x00000010` | 16 |
| Permanente | Todos | `OBJ_ALL_PERIODS` | `0x001fffff` | 2097151 |

## Scripts de apoio

- MT4: `projects/forex/tools/mt4/AIOX_Forex_Apply_Object_Visibility.mq4`
- MT5: `projects/forex/tools/mt5/AIOX_Forex_Apply_Object_Visibility.mq5`

Uso:

1. Copiar o script para a pasta `Scripts` da plataforma correspondente.
2. Compilar no MetaEditor.
3. Nomear os objetos desenhados com os prefixos acima.
4. Rodar o script no grafico.
5. Alternar timeframes e conferir se a hierarquia ficou correta.

## Nota JForex

JForex deve reproduzir a regra com workspaces ou estudos separados por timeframe. A documentacao revisada nao mostrou uma propriedade equivalente e universal ao `OBJPROP_TIMEFRAMES` do MetaTrader para objetos manuais. Para evitar poluicao, manter layouts separados: `H4_H1_Elliott`, `H1_M15_Figuras` e `M5_Execucao`.

## Fontes tecnicas

- MQL4 `OBJPROP_TIMEFRAMES`: https://docs.mql4.com/constants/objectconstants/visible
- MQL5 `OBJPROP_TIMEFRAMES`: https://www.mql5.com/en/docs/constants/objectconstants/visible
- Ajuda MT4 sobre `Visualization`: https://www.metatrader4.com/en/trading-platform/help/analytics/objects_control
