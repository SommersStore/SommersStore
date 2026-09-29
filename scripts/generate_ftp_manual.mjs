import fs from 'node:fs';

const manual = `# Manual Completo — Forex Trade Panel MT5 (FTP) v2.0
**Fonte:** MQL5 Market — https://www.mql5.com/pt/market/product/190549
**Autor:** Swan Htet (Myanmar)
**Versao:** 2.0 (publicado 14/ago/2026, atualizado 27/set/2026)
**Preco:** GRATUITO
**Arquivo no terminal:** Market\\\\Forex Trade Panel MT5.ex5
**Avaliacao:** 5/5 estrelas (5 avaliacoes, 88 comentarios na comunidade)
**Identificador interno (comentario de ordem):** FTPMT5

---

## O QUE E ESTE EA?

O Forex Trade Panel MT5 e um painel de negociacao visual completo para MetaTrader 5.
Ele NAO e um robo automatico — e uma ferramenta de auxilio ao operador humano.
O objetivo e permitir que voce prepare, envie e gerencie ordens diretamente no grafico,
com calculo automatico de lote baseado em risco, linhas visuais arrastaveis no grafico,
trailing stop, break-even, take profit parcial em multiplos niveis e atalhos de teclado.

---

## VISAO GERAL DA INTERFACE

O painel e fixado no grafico e possui abas/secoes:
- Aba principal (Trade): onde voce configura e envia ordens
- Secao Partial: configuracao dos alvos parciais
- Secao Trail: configuracao do trailing stop
- Secao BE (Break-Even): configuracao do break-even
- Secao Bulk: acoes em massa (fechar tudo, fechar lucros, etc.)
- Configuracoes gerais e de hotkeys

O painel persiste entre reinicializacoes — salva automaticamente o estado em arquivos .ini
na pasta Terminal\\\\Common\\\\Files\\\\.

---

## 1. DIMENSIONAMENTO DE POSICAO (Sizing da Ordem)

Esta e a funcao principal do painel. Voce define o risco e o SL, e o painel calcula o lote.

### 1.1 Modos de calculo de lote (lot_mode)

--- LOTE FIXO (lot_mode=0) ---
Voce define manualmente o volume da ordem em lotes.
Nenhum calculo de risco e feito — voce informa o lote diretamente.
Uso: quando voce sabe exatamente o lote que quer usar.

--- RISCO EM DINHEIRO (lot_mode=1) ---
Voce define quanto quer arriscar em moeda da conta (ex: R$50 ou USD 20).
O painel calcula o lote necessario para que a perda no SL seja exatamente esse valor.
Uso: operadores que preferem pensar em valores absolutos.

--- PERCENTAGEM DO SALDO (lot_mode=2) ---
Voce define uma porcentagem do saldo da conta (ACCOUNT_BALANCE).
O painel calcula o lote para que a perda no SL corresponda a essa % do saldo.
Exemplo: 2% de saldo $10.000 = risco de $200 por operacao.
Uso: o metodo mais comum em gestao de risco sistematica.

--- PERCENTAGEM DO EQUITY (lot_mode=3) ---
Identico ao modo anterior, mas usa o equity (patrimonio liquido incluindo P&L flutuante).
Se voce tem posicoes abertas com lucro ou prejuizo nao realizado, o calculo muda.
Uso: quando voce quer que o risco reflita o capital atual real.

IMPORTANTE: os modos 2 e 3 diferem em como a base de calculo e tratada.
O modo 2 (saldo) e mais conservador e estavel. O modo 3 (equity) varia conforme
as posicoes abertas — pode resultar em lotes maiores quando ha lucros flutuantes.

### 1.2 Lock R:R (lock_rr)
Quando ativado, fixa a relacao Risco/Retorno entre SL e TP.
Ao mover uma das linhas no grafico, a outra se ajusta automaticamente para manter o RR.
Exemplo: se RR = 1:2 e voce ajusta o SL, o TP se move para manter 2x o SL.

### 1.3 Linhas visuais Buy e Sell
O painel coloca linhas coloridas no grafico representando entrada, SL e TP.
Voce pode ARRASTAR essas linhas diretamente no grafico para ajustar os niveis.
O calculo de lote e atualizado em tempo real conforme voce move as linhas.
Ao clicar em Buy ou Sell, a ordem e enviada com os niveis exatos das linhas.

---

## 2. TAKE PROFIT PARCIAL (Partial Close)

Permite fechar partes da posicao em alvos diferentes, mantendo o restante aberto.

### 2.1 Niveis de TP parcial
O painel suporta ate TRES niveis de TP parcial simultaneos:
  TP1, TP2, TP3 — cada um com um preco e um volume de fechamento

### 2.2 Modo de preco do TP parcial (partial_tp_mode)
Como o preco do TP parcial e definido:
  Modo 0: Distancia em pips a partir da entrada
  Modo 1: Preco absoluto no grafico
  Modo 2: Distancia em pips a partir do SL (multiplo do SL)

### 2.3 Modo de volume do TP parcial (partial_vol_mode)
Como a quantidade a fechar em cada nivel e definida:
  Modo 0: Volume fixo em lotes
  Modo 1: Percentagem do volume total da posicao (ex: 50%)
  Modo 2: Volume fixo em unidades de lote minimo

### 2.4 Como usar na pratica
1. Na aba Partial, ative os niveis desejados (tp1_chk, tp2_chk, tp3_chk)
2. Defina o preco ou distancia de cada nivel
3. Defina o volume a fechar em cada nivel
4. As linhas de TP parcial aparecem no grafico e podem ser arrastadas
5. Quando o preco atingir cada nivel, o EA fecha automaticamente aquela parcela

---

## 3. TRAILING STOP

Modo automatico de protecao de lucro que move o SL conforme o preco avanca a seu favor.
O trailing so comeca apos a posicao atingir um lucro minimo configurado (trail_start).

### 3.1 Tipos de trailing (trail_type)

--- DISTANCIA FIXA (trail_type=0) ---
O SL segue o preco a uma distancia fixa em pips.
trail_fix_dist: distancia do trailing em pips (ex: 20)
trail_fix_step: passo minimo de movimento do SL em pips (ex: 10)
Uso: mais simples, adequado para scalping e mercados direcionais.

--- MAXIMO/MINIMO DA VELA (trail_type=1) ---
O SL e movido para o maximo ou minimo da vela anterior.
trail_candle_tf: timeframe das velas (0=grafico atual)
trail_candle_shift: qual vela usar como referencia (1=vela fechada anterior)
trail_candle_buf: espaco adicional em pips abaixo do minimo (buffer)
Uso: ideal para manter o SL alem das sombras das velas.

--- ATR — Average True Range (trail_type=2) ---
O SL e calculado como multiplo do ATR do instrumento.
trail_atr_tf: timeframe para calculo do ATR
trail_atr_period: periodo do ATR (padrao: 14)
trail_atr_mult: multiplicador do ATR (padrao: 1.5)
trail_atr_buf: buffer adicional em pips
Uso: adapta o trailing a volatilidade atual do mercado.

--- FRACTAIS (trail_type=3) ---
O SL segue os fractais de mercado (Williams Fractals).
trail_fractal_tf: timeframe para identificar os fractais
trail_fractal_str: numero de velas para validar o fractal (padrao: 2)
trail_fractal_look: quantas velas atras buscar o fractal (padrao: 100)
trail_fractal_buf: buffer em pips abaixo do fractal
Uso: ideal para traders que usam estrutura de mercado e Price Action.

--- MEDIA MOVEL (trail_type=4) ---
O SL segue uma media movel calculada no grafico.
trail_ma_tf: timeframe da media movel
trail_ma_type: tipo (0=SMA, 1=EMA, 2=SMMA, 3=LWMA)
trail_ma_period: periodo da media movel (padrao: 20)
trail_ma_buf: buffer em pips abaixo da media
Uso: operadores que usam medias como referencia de tendencia.

### 3.2 Ativacao do trailing (trail_start_on)
Se ativado (trail_start_on=1), o trailing so comeca apos a posicao atingir
o valor minimo de lucro configurado em trail_start.
Isso evita que o trailing mova o SL prematuramente.

---

## 4. BREAK-EVEN (BE)

Move o stop loss para o preco de entrada (ou proximo dele) apos o mercado
se mover a seu favor por uma distancia configurada.
Objetivo: proteger o capital inicial quando a operacao esta em lucro.

### 4.1 Tipos de break-even (be_type)
  Tipo 1: Move o SL para o preco de entrada exato (zero a zero)
  Tipo 2: Move o SL para entrada + be_offset pips (garante lucro minimo)

### 4.2 Parametros do break-even
be_start: distancia em pips que a posicao precisa atingir para ativar o BE
be_offset: quantos pips acima da entrada o SL sera colocado (lucro garantido)
be_candles: numero de velas para confirmar antes de mover (validacao opcional)
be_candle_tf: timeframe para contar as velas de confirmacao

### 4.3 Opcoes adicionais
be_move_sl: se true, move o SL para o nivel de BE
be_move_tp: se true, ajusta o TP proporcionalmente apos o BE
be_by_bars: ativa o modo de confirmacao por barras antes de mover o SL

---

## 5. ORDENS PENDENTES DUPLAS COM OCO

O painel suporta colocacao de duas ordens pendentes opostas no grafico (Buy Limit + Sell Limit,
ou Buy Stop + Sell Stop), com comportamento OCO — One Cancels the Other.

Quando um dos lados e acionado pelo preco, o outro e cancelado automaticamente.
Uso classico: colocar duas ordens nos extremos de uma consolidacao (straddle),
aguardando o rompimento em qualquer direcao.

Como usar:
1. No modo Line Buy + Line Sell, posicione as duas linhas no grafico
2. Envie as duas ordens pendentes
3. Quando o preco atingir um dos lados, a outra ordem e cancelada automaticamente

---

## 6. ACOES EM MASSA (Bulk Actions)

Permite executar acoes em todas as posicoes abertas simultaneamente:

  Fechar tudo: fecha todas as posicoes abertas
  Fechar lucros: fecha apenas posicoes com lucro positivo
  Fechar perdas: fecha apenas posicoes com prejuizo
  Cancelar limits: cancela todas as ordens limit pendentes
  Cancelar stops: cancela todas as ordens stop pendentes
  Break-Even em tudo: aplica BE em todas as posicoes elegiveis

Filtro por magic number (bulk_magic_filter):
Se ativado, as acoes em massa afetam apenas posicoes com o magic configurado.
Util quando voce tem posicoes de diferentes fontes no mesmo terminal.

---

## 7. ALERTAS DE VELA (Candle Alert)

O painel pode emitir alertas quando uma vela fecha em determinadas condicoes.
Configuravel por timeframe e por tipo de padrao de vela.
Pode usar notificacao push (push_notify_on) para enviar alertas ao celular.

Configuravel em: Forex Trade Panel MT5_candle_alert.ini

---

## 8. CAPTURAS DE TELA AUTOMATICAS

O EA pode tirar screenshots automaticamente quando:
  - Uma posicao e aberta (on_pos=1)
  - Uma ordem pendente e acionada (on_ord=1)
  - Uma posicao e fechada (on_close=1)
  - No grafico ativo ou em todos os graficos (active_chart)

Configuracoes de screenshot:
  fmt: formato (0=PNG, 1=JPG)
  w x h: resolucao da imagem (padrao: 1280x720)
  path: pasta de destino (relativa ao MQL5/Files)

---

## 9. ATALHOS DE TECLADO (Hotkeys)

Um dos diferenciais do Forex Trade Panel MT5 e o sistema completo de hotkeys.

### 9.1 Atalhos de timeframe (hk_chart_en=1)
Atribua teclas para mudar rapidamente o timeframe do grafico.
Suporta ate 25 teclas configuradas para timeframes.
Modificadores disponiveis (hk_tf_mod):
  0 = sem modificador
  1 = Ctrl
  2 = Shift
  3 = Alt

### 9.2 Atalhos de acoes em massa (hk_bk_vk)
Ate 7 hotkeys para acoes em massa (fechar tudo, fechar lucros, etc.)
Cada tecla pode ter um modificador independente (hk_bulk_mod).

### 9.3 Atalhos de Trade (hk_tr_vk)
Ate 4 hotkeys para acoes de negociacao (ex: Line Buy, Line Sell).
Modificador configuravel em hk_tr_mod.

### 9.4 Como configurar
No painel, acesse a secao de configuracoes e clique em Hotkeys.
Clique em cada campo de tecla e pressione a tecla desejada.
Salve e carregue conjuntos de hotkeys como perfis.

---

## 10. CONFIGURACOES GERAIS

Acessiveis em FTP_GeneralUi.ini e no painel de configuracoes:

order_comment [Padrao: FTPMT5]
  Comentario incluido em todas as ordens enviadas pelo painel.
  Identifica as ordens no historico e no terminal.

max_spread_on [Padrao: 0 = desativado]
  Se ativado, bloqueia o envio de ordens quando o spread for maior que max_spread_pts.

max_spread_pts [Padrao: 30]
  Spread maximo em pontos permitido para envio de ordens.
  Protege contra execucao em momentos de alta volatilidade ou spread alargado.

confirm_trades [Padrao: 0 = sem confirmacao]
  Se ativado, exibe uma janela de confirmacao antes de enviar cada ordem.
  Util para evitar cliques acidentais.

ui_font_pct [Padrao: 104]
  Tamanho da fonte da interface em porcentagem (100 = tamanho normal).
  Ajuste para monitores de alta resolucao.

ui_panel_size_idx [Padrao: 2]
  Tamanho geral do painel. Valores maiores = painel maior.

ui_tld_scale_idx [Padrao: 2]
  Escala das linhas de trade no grafico.

ui_theme_idx [Padrao: 1]
  Tema de cores do painel.
  ui_theme_schema: esquema de cores do tema personalizado.
  Temas disponíveis: claro, escuro e personalizados.

ui_sec_bulk/partial/trail/be [Padrao: 0]
  Controla quais secoes ficam visiveis na interface por padrao.
  0 = secao recolhida, 1 = secao expandida.

push_notify_on [Padrao: 0]
  Se ativado, envia notificacoes push ao celular via MQL5 (requer configuracao no terminal).

sess_asia/london/nyc_line e shade
  Linhas e sombreamento das sessoes de mercado (Asia, Londres, Nova York) no grafico.
  Formato: R,G,B onde 0,0,0 = desativado.

---

## 11. CONFIGURACAO DO PAINEL POR SIMBOLO

O painel salva configuracoes individuais por simbolo.
Arquivo: Forex Trade Panel MT5_trade_ui_<SIMBOLO>.ini

Exemplo do EURUSD salvo na sua maquina:
  sl=252 pips | tp=196 pips | rr=0.78 | lots=0.01
  lot_mode=0 (lote fixo) | lock_rr=0 (livre)
  trail_type=0 (distancia fixa) | trail_fix_dist=20 | trail_fix_step=10
  trail_atr_period=14 | trail_atr_mult=1.5 | trail_ma_period=20
  Parciais: desativados | Trailing: desativado | BE: desativado

---

## 12. MINHA ANALISE DO EA

### Pontos fortes
1. GRATUITO e completo — rarissimo. A maioria dos paineis com este nivel de funcionalidade
   custa entre USD 50 e USD 200 no mercado.
2. Calculo de risco por equity OU saldo — voce escolhe. O nosso AIOX usa apenas saldo;
   este EA oferece as duas opcoes, o que e mais flexivel.
3. Trailing stop com 5 modos diferentes — ATR e Fractais sao especialmente uteis para
   traders de price action.
4. Take profit parcial em 3 niveis com linhas arrastaveis — muito mais pratico que
   configurar por input.
5. Sistema de hotkeys completo — fundamental para scalpers.
6. Salva config por simbolo — nao precisa reconfigurar ao mudar de par.
7. Screenshots automaticos — util para revisar operacoes e manter diario de trades.
8. OCO visual — diferencial que poucos paineis gratuitos oferecem.

### Pontos de atencao
1. E um painel manual — NAO tem logica automatica de entrada. Voce decide quando operar.
2. Nao tem integracao com o nosso copiador (AIOX_Local_Trade_Copier). As ordens enviadas
   por este painel usam o comentario FTPMT5 e nenhum magic number especial por padrao.
   Para funcionar com o copiador, o magic number das ordens enviadas pelo painel deve
   ser configurado para 888200 (SourceMagicNumber do Master).
3. O calculo de risco usa SL em pips — nao usa OrderCalcProfit como o nosso AIOX_Trader_On_Chart.
   Para pares exoticos ou instrumentos sem denominacao em USD, pode haver imprecisao.
4. Sem protecao de conta demo/real — diferente do nosso AIOX que bloqueia em conta real.
5. Dependencia de configuracao manual — nao tem presets de conta ou failsafe por login.

### Comparacao com AIOX_Trader_On_Chart v1.60

| Funcionalidade                     | FTP MT5 v2.0      | AIOX TOC v1.60     |
|------------------------------------|-------------------|--------------------|
| Calculo de lote por risco          | Sim (4 modos)     | Sim (1 modo % saldo)|
| Calculo por OrderCalcProfit        | Nao               | Sim (mais preciso) |
| Trailing stop                      | 5 modos           | Nao                |
| Take profit parcial                | 3 niveis          | Nao                |
| Break-even automatico              | Sim               | Nao                |
| Hotkeys configuráveis              | Sim               | Nao                |
| OCO visual                         | Sim               | Sim (AIOX_OCO)     |
| Linhas arrastaveis no grafico      | Sim               | Sim                |
| Protecao de conta (demo/login)     | Nao               | Sim                |
| Override de risco (botao 20%)      | Nao               | Sim                |
| Tema visual Gamma Cyan             | Nao               | Sim                |
| Integracao com copiador local      | Nao (sem magic)   | Sim (magic 888200) |
| Preco                              | GRATUITO          | GRATUITO (nosso)   |

### Recomendacao
O FTP MT5 e EXCELENTE como complemento para gestao ativa de posicoes ja abertas.
Se voce entrar via AIOX_Trader_On_Chart (que tem protecao e calculo preciso),
pode usar o FTP MT5 para gerenciar a posicao depois: trailing, BE, parciais.

ATENCAO: para as posicoes copiadas serem gerenciadas pelo FTP, as ordens devem
ter o magic correto. Confirme com o desenvolvedor se o FTP respeita filtros por magic.

---

## 13. COMO INSTALAR E INICIAR

1. Ja instalado no seu ActivTrades em: Market\\\\Forex Trade Panel MT5.ex5
2. Abra qualquer grafico no MT5 ActivTrades
3. Navegador -> Experts -> Market -> Forex Trade Panel MT5
4. Arraste para o grafico e clique OK
5. Habilite AutoTrading (botao verde no topo)
6. O painel aparece no canto do grafico
7. Selecione o modo de calculo de lote desejado
8. Desenhe as linhas de SL e TP no grafico
9. Clique Buy ou Sell para enviar a ordem

---

## 14. ARQUIVOS DE CONFIGURACAO (na sua maquina)

Localizados em: C:\\\\Users\\\\AMD\\\\AppData\\\\Roaming\\\\MetaQuotes\\\\Terminal\\\\Common\\\\Files\\\\

  Forex Trade Panel MT5_hotkeys.ini      - configuracao dos atalhos de teclado
  Forex Trade Panel MT5_panel_chrome.ini - estado do painel (aba ativa, minimizado)
  Forex Trade Panel MT5_trade_ui_EURUSD.ini - config salva para EURUSD
  Forex Trade Panel MT5_trade_ui_GOLD.ini   - config salva para GOLD (XAUUSD)
  Forex Trade Panel MT5_candle_alert.ini    - configuracao de alertas de vela
  FTP_GeneralUi.ini                         - configuracoes gerais da interface
  FTP_HelpUi.ini                            - links de suporte do desenvolvedor
  FTP_ScreenshotSettings.ini               - configuracao de capturas de tela

---

Fim do manual.
Fonte: MQL5 Market + arquivos de configuracao reais do seu terminal + analise comparativa AIOX.
`;

fs.writeFileSync('C:/AIOX/Workspace/Protheus/docs/qa/manual-forex-trade-panel-mt5.md', manual, 'utf8');
console.log('Manual gerado: C:/AIOX/Workspace/Protheus/docs/qa/manual-forex-trade-panel-mt5.md');
