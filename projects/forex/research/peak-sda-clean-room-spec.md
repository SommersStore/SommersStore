# Especificacao clean-room do PIC/Peak (SDA)

## Evidencia

- O binario local `Peak.ex4` expoe os mesmos 13 parametros da familia publica `SDA v3.2`.
- Os probes locais de GBPJPY M15 e XAUUSD M15 produziram 1.000 observacoes.
- Em todas elas, `buffer_0 * buffer_1` ficou entre `0.99999994` e `1.00000013`.
- Nenhuma alteracao de candle fechado foi registrada nas duas capturas existentes.
- O fonte original `Peak.mq4`, identificado como copyright `Mr. X`, foi posteriormente
  fornecido pelo usuario e confirmou integralmente a formula reconstruida.

## Formula

Para cada barra, a implementacao percorre `Len` grupos sobrepostos. Mantem a maior
maxima e a menor minima vistas. Quando encontra um novo extremo, acumula o fechamento
correspondente:

```text
UP = soma_dos_fechamentos_em_novas_maximas /
     soma_dos_fechamentos_em_novas_minimas
DN = 1 / UP
```

Com `ModeHL=false`, os extremos usam o corpo do candle (`max(open,close)` e
`min(open,close)`). O limiar `UrovenSignal` nao participa da formula; serve apenas
para alerta/interpretacao visual.

## Compatibilidade

O MT4 legado usa o numero do timeframe em minutos como quantidade de barras do grupo.
Isso cria sobreposicao (por exemplo, 15 barras por grupo no M15). A porta MT5 oferece:

- `InpLegacyExact=true`: replica essa peculiaridade;
- `InpLegacyExact=false`: versao normalizada, com uma barra por grupo.

O original plota duas linhas com espessura 2 e deixa o candle atual sem calculo. A porta
MT5 conserva esse comportamento por padrao e oferece `InpHistogram` apenas como opcao.

## Limites da validacao

Os CSVs existentes confirmam reciprocidade e estabilidade na amostra. A equivalencia
numerica da porta ainda deve ser medida exportando, no mesmo instante, os buffers do
EX4 e da porta para as mesmas barras e timeframes.
