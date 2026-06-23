# Template MT5 - Campanha 3 por 1

## Layout sugerido

Usar quatro graficos do mesmo ativo:

- H4: tendencia macro por Elliott.
- H1: tendencia/zona por Elliott e primeira leitura de figuras.
- M15: figura/gatilho.
- M5: microfigura e entrada.

## H4/H1 Elliott

Indicadores:

- Moving Average Exponential 20.
- Moving Average Exponential 50.
- Moving Average Exponential 200.
- Average True Range 14.

Marcacoes:

- suportes e resistencias H4/H1;
- fibo da onda de referencia;
- anotacao da contagem Elliott;
- marcacao auxiliar de topos/fundos para confirmar estrutura.

## H1/M15/M5 figuras

Indicadores:

- Moving Average Exponential 9.
- Moving Average Exponential 20.
- RSI 14 com linha 50.
- Average True Range 14.
- objetos graficos para bandeira, triangulo, retangulo, pullback e microfigura.

## Visibilidade por objeto

Usar os mesmos prefixos do MT4:

- `AIOX_ELLIOTT_`: H4 e H1.
- `AIOX_DOW_H1_`: H1, M15 e M5.
- `AIOX_DOW_M15_`: M15 e M5.
- `AIOX_DOW_M5_`: M5.
- `AIOX_KEEP_ALL_`: todos os periodos.

Depois de desenhar, compilar e rodar:

- `projects/forex/tools/mt5/AIOX_Forex_Apply_Object_Visibility.mq5`

Mapa completo:

- `projects/forex/templates/timeframe-visibility-map.md`

## Checklist antes da ordem

- score minimo do nivel atingido;
- alvo 1.6R livre;
- stop tecnico por estrutura ou ATR;
- spread normal;
- sem noticia de alto impacto;
- campanha no nivel correto.

## Como salvar

1. Configurar cada timeframe.
2. Clicar com botao direito no grafico.
3. `Templates -> Save Template`.
4. Salvar como `Campanha_3por1_MT5.tpl`.
