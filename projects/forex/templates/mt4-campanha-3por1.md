# Template MT4 - Campanha 3 por 1

## Objetivo

Criar um modelo visual limpo para operar Elliott H4/H1 e figuras H1/M15/M5 sem poluir a tela.

## Base visual real analisada

Usar como referencia inicial o template local:

- `C:\Users\ADMIN\AppData\Roaming\MetaQuotes\Terminal\ADB94438A57B9692806EA638441107AB\templates\Final_Completo_3.tpl`

O template tem grafico escuro, candles RSI, sessoes, `Peak`, `Sonic_6 PVA Volumes`, `Fisher_Yur4ik` e `smFisherTransform3`. A camada AIOX deve entrar com cores discretas e nomes padronizados, sem cobrir candles, sessoes ou subindicadores.

## Graficos de contexto - H4 e H1 Elliott

Indicadores:

- EMA 20, cor azul.
- EMA 50, cor laranja.
- EMA 200, cor vermelha, espessura maior.
- ATR 14 em janela separada.

Ferramentas manuais:

- Fibonacci retracement.
- linhas horizontais de suporte/resistencia.
- anotacao da contagem Elliott H4/H1.
- marcacao auxiliar de topos/fundos apenas para confirmar estrutura.

## Graficos de figuras e execucao - H1, M15 e M5

Indicadores:

- EMA 9, cor verde.
- EMA 20, cor azul.
- RSI 14 com linha 50 destacada.
- ATR 14.
- linhas/objetos para bandeira, triangulo, retangulo, pullback e microfigura.

## Visibilidade obrigatoria dos desenhos

| Camada | Prefixo | Visibilidade |
| --- | --- | --- |
| Elliott | `AIOX_ELLIOTT_` | H4 e H1 somente |
| Figura H1 | `AIOX_DOW_H1_` | H1, M15 e M5 |
| Figura M15 | `AIOX_DOW_M15_` | M15 e M5 |
| Figura M5 | `AIOX_DOW_M5_` | M5 somente |

Depois de nomear os objetos, rodar:

- `projects/forex/tools/mt4/AIOX_Forex_Apply_Object_Visibility.mq4`

Mapa completo:

- `projects/forex/templates/timeframe-visibility-map.md`

## Peak no template

O `Peak` aparece em uma subjanela curta acima do `Sonic_6 PVA Volumes`. Parametros observados no template:

- `Len=150`
- `HistoryBars=1000`
- `ModeHL=true`
- `ModeOnline=true`
- `UrovenSignal=25.0`
- niveis `25` e `15`

Como so foi encontrado `Peak.ex4`, avaliar o indicador com o probe:

- `projects/forex/tools/mt4/AIOX_Peak_Buffer_Probe.mq4`
- `projects/forex/research/peak-indicator-study.md`

## Como salvar

1. Abrir o grafico do ativo.
2. Inserir os indicadores conforme o timeframe.
3. Desenhar e nomear objetos com os prefixos AIOX.
4. Rodar o script de visibilidade.
5. Alternar H4, H1, M15 e M5 e conferir a hierarquia.
6. Ajustar cores e espessuras.
7. Clicar em `Grafico -> Modelo -> Salvar Modelo`.
8. Salvar como:
   - `Campanha_3por1_H4_H1.tpl`
   - `Campanha_3por1_M15_M5.tpl`
   - `AIOX_Final_Completo_3_Visual.tpl`

## Observacao tecnica

O arquivo `.tpl` final deve ser salvo pelo proprio MT4, porque pode variar por versao, corretora e build.
