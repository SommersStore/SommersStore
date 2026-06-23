# Skill - MT4 Visual Layering and Peak Evaluation

## Objetivo

Converter leituras Elliott/Dow da Campanha 3 por 1 em objetos visuais limpos no MT4/MT5 e avaliar o indicador Peak por comportamento, sem presumir que ele nao repinta.

## Entrada esperada

- ativo e timeframe atual;
- template usado;
- objetos desenhados no grafico;
- prefixos dos objetos;
- leitura Elliott H4/H1;
- figura H1, M15 ou M5;
- estado dos buffers Peak;
- log do probe Peak quando existir.

## Prefixos obrigatorios

- `AIOX_ELLIOTT_` para ondas Elliott visiveis em H4/H1.
- `AIOX_DOW_H1_` para figuras H1 visiveis em H1/M15/M5.
- `AIOX_DOW_M15_` para figuras M15 visiveis em M15/M5.
- `AIOX_DOW_M5_` para figuras M5 visiveis apenas em M5.
- `AIOX_KEEP_ALL_` para anotacoes permanentes.

## Saida esperada

- lista de objetos fora do padrao;
- camada visual recomendada;
- ajuste de cor/espessura;
- status de visibilidade por timeframe;
- leitura do Peak: confirma, contradiz ou fica neutro;
- recomendacao de peso do Peak no score A+.

## Regras

- Elliott nao aparece em M15 nem M5.
- Figura M15 nao aparece em H1/H4.
- Figura M5 nao aparece em M15/H1/H4.
- O Peak e filtro, nao gatilho autonomo.
- Nao afirmar non-repaint sem logs em velas fechadas.
- Se houver alteracao historica em vela fechada, classificar o Peak como repaint para aquele contexto ate prova contraria.

## Artefatos relacionados

- `projects/forex/research/mt4-final-completo-3-template-analysis.md`
- `projects/forex/templates/timeframe-visibility-map.md`
- `projects/forex/research/peak-indicator-study.md`
- `projects/forex/tools/mt4/AIOX_Forex_Apply_Object_Visibility.mq4`
- `projects/forex/tools/mt5/AIOX_Forex_Apply_Object_Visibility.mq5`
- `projects/forex/tools/mt4/AIOX_Peak_Buffer_Probe.mq4`
