# Workspace JForex - Campanha 3 por 1

## Objetivo

Replicar a logica visual da estrategia dentro da JForex/Dukascopy, com Elliott em H4/H1 e figuras em H1/M15/M5.

## Workspace

Criar quatro abas/graficos:

- EUR/USD H4.
- EUR/USD H1.
- EUR/USD M15.
- EUR/USD M5.

Depois duplicar para GBP/USD ou XAU/USD somente quando a estatistica justificar.

## Separacao visual por timeframe

JForex/Dukascopy deve seguir a mesma logica estrategica, mas sem presumir a mesma propriedade de visibilidade por objeto do MetaTrader:

- aba `H4_H1_Elliott` para contagem macro e tatico-operacional;
- aba `H1_M15_Figuras` para figuras H1 e M15;
- aba `M5_Execucao` para microfiguras e entrada;
- objetos M5 nao devem ser salvos em layouts usados para H1/H4;
- usar cores discretas equivalentes ao mapa `projects/forex/templates/timeframe-visibility-map.md`.

## Indicadores

H4/H1 Elliott:

- EMA 20.
- EMA 50.
- EMA 200.
- ATR 14.
- Fibonacci e objetos para contagem Elliott.

H1/M15/M5 figuras:

- EMA 9.
- EMA 20.
- RSI 14.
- ATR 14.
- objetos para bandeira, triangulo, retangulo, pullback e microfigura.

## Recursos JForex importantes

- Depth of Market para verificar liquidez.
- workspace salvo por ativo/setup.
- comissao e spread variavel considerados no risco.
- estrategias Java somente depois do playbook estar validado manualmente.
- MyFXBook nao foi identificado como suporte oficial direto a JForex na pesquisa; para tracking publico, priorizar MT4/MT5.

## Como salvar

1. Montar os graficos.
2. Aplicar indicadores.
3. Organizar janelas.
4. `File -> Save Workspace as...`
5. Salvar como `Campanha_3por1_Dukascopy.wsp`.
