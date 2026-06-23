# Template Inicial ProfitPro - Campanha 3 por 1

## Objetivo

Criar a primeira traducao operacional do template MT4 para ProfitPro/Nelogica, usando layout visual e NTSL apenas como apoio de indicador/coloracao/alerta ate haver validacao manual.

## Premissa

ProfitPro nao importa `.tpl` do MetaTrader. A adaptacao deve ser feita por equivalencia:

- janelas/timeframes;
- indicadores nativos;
- objetos manuais;
- coloracao/alertas NTSL;
- regras de visibilidade e leitura.

## Layout sugerido

- Grafico H4: contexto Elliott e tendencia principal.
- Grafico H1: Elliott secundario e figuras principais.
- Grafico M15: refinamento de figura/continuidade.
- Grafico M5: entrada e gestao fina.

## Indicadores equivalentes a mapear

- Medias moveis do template MT4.
- ATR para distancia operacional.
- IFR/RSI ou equivalente.
- Volume nativo/financeiro.
- Fisher/Peak-like: somente se houver indicador nativo ou NTSL replicavel.
- Sessoes/periodos operacionais por cor ou marcação manual.

## Esqueleto NTSL inicial

```pascal
// AIOX Campanha 3 por 1 - marcador inicial ProfitPro/NTSL
// Objetivo: apoiar leitura visual. Nao enviar ordens sem validacao.

input
  MediaCurta(21);
  MediaLonga(89);
  PeriodoATR(14);

var
  mmCurta: Float;
  mmLonga: Float;
  atrValor: Float;
  tendenciaAlta: Boolean;
  tendenciaBaixa: Boolean;

begin
  mmCurta := Media(MediaCurta, Close);
  mmLonga := Media(MediaLonga, Close);
  atrValor := AvgTrueRange(PeriodoATR, 0);

  tendenciaAlta := mmCurta > mmLonga;
  tendenciaBaixa := mmCurta < mmLonga;

  Plot(mmCurta);
  Plot2(mmLonga);

  if tendenciaAlta then
    PaintBar(clBlue)
  else if tendenciaBaixa then
    PaintBar(clRed)
  else
    PaintBar(clGray);
end;
```

## Pendencias para o usuario

- Enviar prints do MT4 canonico em H4/H1/M15/M5.
- Informar nomes e parametros dos indicadores customizados usados no MT4.
- Confirmar se no ProfitPro a prioridade sera visual, alerta, backtest ou execucao.
- Confirmar ativos principais: Forex via CFD, indice, dolar, ouro ou outro mercado disponivel.

## Validacao

- Recriar visual sem operar.
- Comparar prints MT4 x ProfitPro.
- Marcar divergencias funcionais.
- Testar alerta/coloracao em replay ou simulado antes de qualquer automacao.
