Eu tenho uma estratégia, mas ela não se fez consistente, porque eu não consegui desenvolver um setup preciso. A estratégia é a seguinte: são operações com uma relação de risco-retorno de um pra um vírgula seis. Sendo que a primeira operação eu arrisco um por cento. Se eu ganhar o um vírgula seis, eu abro num outro setup, uma segunda operação com risco de dois por cento pra ganhar três vírgula dois. Se perder, eu recomeço. Se eu ganho essa segunda operação, eu abro uma terceira e última, dobrando o risco novamente. Portanto, eu abro uma operação a quatro pra ganhar um pouco mais que seis por cento. A ideia é, no acúmulo das três operações, eu acumular dez vezes o risco inicial. Então, se eu inicio com um risco de um por cento, dobrando na segunda operação, dobrando na terceira, acertando as três, eu acumularia um lucro de dez por cento. Como se eu ganhar na primeira, eu ganho um vírgula seis, e arriscando dois por cento na segunda. Se eu perder essa segunda operação, eu já tenho o lucro de 1,6 da primeira. Assim, o meu risco total, perdendo na segunda operação, seria de apenas 0,4%. Se eu ganho a segunda operação, então eu tenho o lucro da primeira de 1,6 mais o lucro da segunda de 3,2. Portanto, 4,8%. Se eu tenho uma terceira operação, onde eu vou abrir um risco de 4%, mesmo perdendo esta operação, ainda me resta um lucro de 0,8. Você compreendeu os cálculos? Esse gerenciamento de risco me parece muito razoável. A questão é que eu não tenho um setup acertado. Você tem algum setup? Você conseguiria traçar pra mim uma estratégia pra operar, digamos, em 5 a 15 minutos? Talvez tomando por base um time maior de H1 ou H4, mas operando em M5 e M15, pra que eu tivesse sucesso acertando com frequência três operações, mesmo que eventualmente eu perca uma ou outra, mas um setup que me desse condições de acertar três vezes seguidas, sendo um risco de 1% na primeira, com um risco de 2% na segunda e mais um risco de 4% na terceira. Veja se compreendeu. E vamos usar esse raciocínio pra desenvolver essa ideia que eu acredito que eu possa construir um bom plano de investimento com MetaTrader 5, operando Forex, operando ouro, petróleo ou os pares de moeda. O que você acha?

Entendi a lógica do gerenciamento. Vou separar a resposta em duas partes: primeiro validar matematicamente a sequência; depois transformar isso em um plano operacional realista para MT5, sem vender a ilusão de que existe setup confiável para “forçar” três acertos seguidos.

Pensou por 15s

Sim, compreendi os cálculos — e a lógica é **boa como gerenciamento**, mas perigosa se for tratada como “setup mágico”.

Há um ponto importante: com risco-retorno de **1 : 1,6**, a sequência correta fica assim:

| Operação | Risco | Alvo | Resultado acumulado se ganhar |
| ----- | ----- | ----- | ----- |
| 1ª | \-1,0% | \+1,6% | \+1,6% |
| 2ª | \-2,0% | \+3,2% | \+4,8% |
| 3ª | \-4,0% | \+6,4% | **\+11,2%** |

Então, acertando as três, o lucro não é 10%; é **11,2%**.  
 Se você quer exatamente perto de 10%, teria que reduzir o alvo da terceira operação para algo perto de **\+5,2%**, ou seja, a terceira deixaria de ser 1 : 1,6.

Agora, os cenários:

| Sequência | Resultado |
| ----- | ----- |
| Perde a 1ª | **\-1,0%** |
| Ganha 1ª, perde 2ª | **\-0,4%** |
| Ganha 1ª e 2ª, perde 3ª | **\+0,8%** |
| Ganha as 3 | **\+11,2%** |

Matematicamente, a estrutura é interessante porque a partir da segunda operação você está usando “lucro da casa” parcialmente. O problema real não está no gerenciamento. Está na **probabilidade de três acertos consecutivos**.

Mesmo que seu setup acerte **60%** das operações, a chance de acertar três seguidas é:

**0,60 × 0,60 × 0,60 \= 21,6%**

Com 55% de acerto:

**0,55³ \= 16,6%**

Com 50%:

**12,5%**

Então o plano só funciona se o setup tiver **alta seletividade**, pouca exposição e boa filtragem de contexto.

Sobre risco: Forex, ouro, petróleo e CFDs são instrumentos altamente alavancados. Reguladores como ESMA e CFTC destacam que alavancagem amplia perdas rapidamente, e as regras europeias para CFDs existem justamente para limitar alavancagem, impedir saldo negativo e exigir alertas de risco ao varejo. A própria documentação do MetaTrader 5 descreve o ATR como indicador de volatilidade, útil para medir amplitude de mercado, o que é central para posicionar stops em ativos como XAUUSD, petróleo e pares Forex.

## **Minha opinião direta**

A sua ideia é **aproveitável**, mas eu não usaria como “três operações obrigatórias”. Eu transformaria em um **modelo de campanha**:

Você só inicia a campanha quando houver confluência forte no H1/H4.  
 Você só faz a segunda operação se o mercado continuar validando a direção.  
 Você só faz a terceira se estiver em movimento claro, sem notícia relevante iminente, sem exaustão e sem divergência.

Ou seja: o risco progressivo não pode ser automático. Ele precisa ser **condicional**.

## **Setup proposto: “Campanha de Continuidade H4/H1 → Entrada M15/M5”**

Esse setup serve melhor para **XAUUSD, EURUSD, GBPUSD, USDJPY e petróleo**, mas eu começaria testando só **um ativo**, provavelmente XAUUSD ou EURUSD. Misturar muitos ativos no começo aumenta ruído.

### **1\. Filtro de tendência no H4**

No H4, você só opera comprado se:

Preço acima da EMA 200\.  
 EMA 20 acima da EMA 50\.  
 Últimos fundos ascendentes.  
 Preço não está esticado demais, isto é, não está muito longe da EMA 20\.

Você só opera vendido se:

Preço abaixo da EMA 200\.  
 EMA 20 abaixo da EMA 50\.  
 Últimos topos descendentes.  
 Preço não está excessivamente afastado da média.

Esse filtro evita o erro mais comum: tentar fazer sequência de três trades contra a estrutura principal.

### **2\. Gatilho no H1**

No H1, você espera uma destas situações:

Rompimento de consolidação.  
 Pullback na EMA 20 ou EMA 50\.  
 Rejeição em zona anterior de suporte/resistência.  
 Retorno para dentro da tendência depois de uma correção.

Aqui a pergunta é: “o mercado está oferecendo continuidade ou só ruído?”

Se o H4 está comprado, mas o H1 está lateral, você não opera.  
 Se o H4 está comprado e o H1 corrige até uma zona boa, você prepara a entrada.

### **3\. Entrada no M15 ou M5**

No M15/M5, a entrada acontece apenas quando houver confirmação de retomada:

Para compra:

Preço faz pullback.  
 Forma fundo mais alto.  
 Rompe a máxima do candle de confirmação.  
 RSI acima de 50 ou cruzando para cima.  
 Candle de entrada fecha acima da EMA 9/20.

Para venda:

Preço faz pullback.  
 Forma topo mais baixo.  
 Rompe a mínima do candle de confirmação.  
 RSI abaixo de 50 ou cruzando para baixo.  
 Candle de entrada fecha abaixo da EMA 9/20.

O stop não deve ser aleatório. Ele deve ficar atrás do último fundo/topo do M5/M15 ou a pelo menos **1 ATR** do timeframe de entrada, para evitar stop por ruído.

## **Regras da sua campanha de 3 operações**

### **Operação 1 — risco 1%**

Entrada no primeiro gatilho válido.  
 Alvo: 1,6R.  
 Stop: técnico, atrás da estrutura.  
 Sem antecipar entrada.

Se ganhar, você não entra imediatamente na segunda. Você espera novo pullback ou nova microestrutura.

### **Operação 2 — risco 2%**

Só pode acontecer se:

H1 continuar a favor.  
 Preço não chegou em resistência/suporte forte do H4.  
 Não houver notícia de alto impacto nos próximos minutos.  
 A segunda entrada tiver setup próprio, não apenas euforia da primeira vitória.

Se perder, encerra a campanha e recomeça depois.

### **Operação 3 — risco 4%**

Essa é a mais perigosa. Eu colocaria regras mais duras:

Só executar se o mercado estiver em tendência clara.  
 Não executar em lateralização.  
 Não executar perto de topo/fundo diário relevante.  
 Não executar depois de movimento muito esticado.  
 Não executar se o spread aumentou ou se há notícia próxima.

Minha sugestão prática: na terceira operação, em vez de arriscar 4% cheio, você pode usar **3%** até ter estatística real. A sequência ficaria menos explosiva, mas muito mais sustentável psicologicamente.

## **Filtro de horário**

Para M5/M15, eu evitaria operar em qualquer horário. Usaria janelas com liquidez:

Abertura de Londres.  
 Sobreposição Londres/Nova York.  
 Primeiras horas de Nova York.

Evitaria:

Fim de sessão.  
 Mercado asiático para pares sem liquidez naquele horário.  
 Minutos antes/depois de payroll, CPI, FOMC, decisão de juros, estoques de petróleo, discursos de banco central.

No ouro e petróleo, notícia derruba setup bom. Não é detalhe; é sobrevivência.

## **Indicadores simples para MT5**

Eu montaria o gráfico assim:

H4/H1:

EMA 20  
 EMA 50  
 EMA 200  
 ATR 14  
 Marcação manual de suporte/resistência

M15/M5:

EMA 9  
 EMA 20  
 VWAP, se disponível no seu MT5/broker  
 RSI 14 com linha 50  
 ATR 14

Nada muito carregado. O setup precisa ser legível.

## **Checklist objetivo antes da entrada**

Eu só entraria se pelo menos **7 de 9 critérios** fossem verdadeiros:

| Critério | Sim/Não |
| ----- | ----- |
| H4 tem tendência clara |  |
| H1 está alinhado com H4 |  |
| Preço respeitou zona técnica |  |
| M15/M5 deu pullback |  |
| Candle de confirmação fechou a favor |  |
| Stop técnico é aceitável |  |
| Alvo 1,6R cabe antes da próxima barreira |  |
| Spread está normal |  |
| Não há notícia de alto impacto próxima |  |

Se não bater 7/9, não tem trade.

## **Ponto crítico: seu plano precisa de estatística**

Antes de operar real, você precisa testar pelo menos:

100 campanhas simuladas.  
 Não apenas 100 trades isolados.  
 Você precisa medir a sequência completa: primeira, segunda e terceira.

Métricas principais:

Taxa de acerto da 1ª operação.  
 Taxa de acerto da 2ª após vitória da 1ª.  
 Taxa de acerto da 3ª após duas vitórias.  
 Resultado médio por campanha.  
 Maior sequência de campanhas negativas.  
 Drawdown máximo.  
 Performance por ativo e horário.

O setup só é aprovado se a campanha tiver expectativa positiva e drawdown suportável.

## **Ajuste que eu faria no seu modelo**

Eu usaria este modelo inicial:

Primeira operação: risco 1%.  
 Segunda operação: risco 1,5% ou 2%.  
 Terceira operação: risco 2,5% ou 3%, não 4% no começo.

Depois de 60 a 100 campanhas lucrativas no demo/backtest, aí sim você avalia subir a terceira para 4%.

A versão com 1%, 2%, 4% é agressiva. Ela pode funcionar, mas exige uma disciplina que a maioria dos traders não sustenta quando aparecem duas ou três perdas seguidas na primeira entrada.

## **Minha proposta de plano**

Eu desenvolveria isso como um **sistema operacional de trading**, não como uma ideia solta:

**Fase 1 — Backtest manual no MT5**  
 Escolher 1 ativo, 1 horário e 1 direção por vez. Exemplo: XAUUSD, sessão de NY, entradas M5 alinhadas ao H1/H4.

**Fase 2 — Planilha de campanhas**  
 Registrar cada campanha como uma unidade: resultado da 1ª, 2ª e 3ª operação.

**Fase 3 — Regras finais**  
 Eliminar horários ruins, setups ruins e ativos com muito ruído.

**Fase 4 — Demo com execução real**  
 30 dias no demo, obedecendo exatamente o risco.

**Fase 5 — Conta real pequena**  
 Começar com risco reduzido: 0,25%, 0,5%, 1% — mantendo a mesma lógica proporcional.

## **Veredito**

A sua engenharia de risco é inteligente. O que falta é transformar o “quero acertar três seguidas” em uma regra mais profissional:

**não buscar três acertos; buscar três oportunidades independentes dentro de uma mesma campanha direcional forte.**

Essa mudança é fundamental.

O setup que eu usaria para começar é:

**H4 define tendência macro.**  
 **H1 define zona de oportunidade.**  
 **M15/M5 executa pullback com confirmação.**  
 **ATR define stop.**  
 **1,6R define alvo.**  
 **A progressão só continua se o contexto permanecer válido.**

Esse é um caminho sério para transformar sua ideia em um plano testável no MetaTrader 5\.

Sim, eu esqueci de dimensionar a você. É evidente que eu não vou fazer três operações em sequências no mesmo dia ou no mesmo deslacamento de preço. São setups, são sinais. Então, se o gráfico me mostrar uma oportunidade de entrada, eu vou e executo uma operação. Mas se a próxima oportunidade para a segunda operação só surgir no dia seguinte, então a operação será feita somente no dia seguinte e talvez até em outro ativo. Entende? Então isso eu estou consciente e eu esqueci de dimensionar.

Pensou por dois segundos

Sim, agora ficou **muito mais sólido**.

Essa correção muda bastante a avaliação do plano. O risco maior não é mais “tentar pegar três operações no mesmo impulso”, e sim **selecionar três sinais válidos ao longo do tempo**, mantendo a campanha aberta como uma sequência lógica de capital, não como uma sequência obrigatória no gráfico.

Isso torna sua ideia mais profissional.

## **A forma correta de enxergar sua estratégia**

Você não está dizendo:

“Vou fazer três entradas seguidas no mesmo movimento.”

Você está dizendo:

“Vou iniciar uma campanha com risco de 1%. Se o primeiro setup for vencedor, o próximo setup qualificado poderá receber 2% de risco. Se o segundo também vencer, o próximo setup qualificado poderá receber 4%. Se houver perda em qualquer etapa, encerro a campanha e volto ao risco inicial.”

Isso é diferente. E é bem melhor.

O gráfico da campanha fica assim:

Resultado acumulado da campanha

Cenários possíveis usando risco-retorno de 1:1,6 com riscos de 1%, 2% e 4%.

\-4%0%4%8%12%Perde 1ªGanha 1ª, perde 2ªGanha 2, perde 3ªGanha as 3

Valores antes de custos, spread, slippage e swap.

O ponto mais forte da sua ideia é este: **a partir da segunda operação, você não está mais exposto da mesma forma que estaria aumentando lote depois de prejuízo**. Não é martingale clássico. É uma progressão **após vitória**, não após derrota.

Isso é muito mais saudável.

## **Como eu estruturaria isso**

Eu chamaria esse modelo de:

**Campanha 1-2-4 com reset por perda**

A campanha teria três níveis:

| Nível | Risco | Alvo | Condição para executar |
| ----- | ----- | ----- | ----- |
| Nível 1 | 1% | 1,6% | Qualquer setup A+ validado |
| Nível 2 | 2% | 3,2% | Só após vitória no nível 1 |
| Nível 3 | 4% | 6,4% | Só após vitória no nível 2 |

A regra central seria:

**Não existe obrigação de operar. Existe permissão para operar quando aparecer um novo setup A+.**

Essa frase precisa estar no seu plano.

## **Isso pode acontecer em outro ativo?**

Sim, pode. Mas eu colocaria uma regra importante: a segunda ou terceira operação pode ser em outro ativo **desde que o setup seja equivalente em qualidade**.

Exemplo aceitável:

Primeira operação: compra em XAUUSD.  
 Segunda operação no dia seguinte: venda em GBPUSD.  
 Terceira operação dois dias depois: compra em petróleo.

Isso pode funcionar, desde que todas sejam entradas do mesmo padrão: tendência no H4/H1, pullback, confirmação no M15/M5, alvo 1,6R limpo.

O que eu evitaria é misturar setups diferentes dentro da mesma campanha.

Por exemplo:

Primeira: pullback em tendência.  
 Segunda: rompimento de notícia.  
 Terceira: reversão contra tendência.

Isso vira bagunça estatística. Você não saberá se a campanha funciona ou se foi sorte.

## **O ponto mais importante: classificar setups**

Para essa estratégia, eu não operaria qualquer sinal. Eu criaria três classes:

### **Setup A+**

Pode iniciar ou continuar campanha.

Características:

H4 e H1 alinhados.  
 Mercado com direção clara.  
 Pullback limpo.  
 Stop técnico curto.  
 Alvo de 1,6R antes de resistência/suporte importante.  
 Sem notícia forte próxima.  
 Spread normal.

### **Setup B**

Pode ser operado em conta normal, mas **não entra na campanha 1-2-4**.

Características:

Boa entrada, mas com algum defeito.  
 H4 favorável, mas H1 meio lateral.  
 Alvo apertado.  
 Stop um pouco maior.  
 Mercado menos limpo.

### **Setup C**

Não opera.

Características:

Ansiedade, lateralização, notícia, candle grande demais, entrada atrasada ou alvo bloqueado.

A sua campanha só deve aceitar **Setup A+**.

## **A melhor lógica operacional**

Eu faria assim:

### **Regra 1 — Uma campanha por vez**

Enquanto uma campanha estiver ativa, você não inicia outra.

Exemplo:

Você ganhou a primeira operação. Agora está no nível 2\.  
 Você não pode fazer outra operação de risco 1% paralela.  
 A próxima operação válida será o nível 2 ou nenhuma.

Isso evita sobreposição emocional e excesso de exposição.

### **Regra 2 — Campanha pode durar vários dias**

A campanha não tem prazo obrigatório. Mas eu colocaria um limite de validade.

Sugestão:

Se passaram **5 dias úteis** sem novo setup A+, a campanha reseta para o nível 1\.

Por quê? Porque depois de muitos dias, o estado emocional e o contexto de mercado mudam. O lucro anterior começa a virar “licença psicológica” para arriscar mais.

### **Regra 3 — O nível 3 precisa ser excepcional**

A terceira operação é onde mora o ganho grande, mas também onde mora o erro caro.

Eu exigiria uma pontuação mínima maior.

Por exemplo:

Nível 1: mínimo 7/10 no checklist.  
 Nível 2: mínimo 8/10.  
 Nível 3: mínimo 9/10.

Ou seja: quanto maior o risco, maior a exigência de qualidade.

## **Modelo de checklist para a entrada**

Eu usaria este checklist antes de cada operação:

| Critério | Peso |
| ----- | ----- |
| H4 alinhado com a direção | 1 |
| H1 alinhado com H4 | 1 |
| Preço voltou a uma zona técnica clara | 1 |
| M15/M5 confirmou retomada | 1 |
| Stop fica em ponto técnico lógico | 1 |
| Alvo de 1,6R cabe antes da próxima barreira | 1 |
| Candle de entrada não está esticado | 1 |
| Spread está normal | 1 |
| Não há notícia forte próxima | 1 |
| Ativo está em boa liquidez | 1 |

Pontuação:

7/10: aceita nível 1\.  
 8/10: aceita nível 2\.  
 9/10: aceita nível 3\.  
 Menos que isso: não opera.

## **Setup base que eu recomendo**

Eu usaria um setup principal, simples e repetível:

# **Setup: Pullback de Continuidade Multitimeframe**

### **Timeframes**

H4: direção principal.  
 H1: zona de oportunidade.  
 M15: confirmação.  
 M5: refinamento de entrada.

### **Compra**

Condições:

Preço acima da EMA 200 no H4.  
 EMA 20 acima da EMA 50 no H4.  
 H1 faz correção até EMA 20, EMA 50 ou suporte anterior.  
 M15 mostra rejeição da zona.  
 M5 rompe o último topo curto.  
 Stop abaixo do fundo do pullback.  
 Alvo em 1,6R.

### **Venda**

Condições:

Preço abaixo da EMA 200 no H4.  
 EMA 20 abaixo da EMA 50 no H4.  
 H1 corrige até EMA 20, EMA 50 ou resistência anterior.  
 M15 mostra rejeição da zona.  
 M5 rompe o último fundo curto.  
 Stop acima do topo do pullback.  
 Alvo em 1,6R.

Esse setup é melhor para sua estratégia porque ele busca continuidade, não adivinhação de fundo/topo.

## **Ativos que eu priorizaria**

Para começar, eu não operaria tudo. Eu escolheria no máximo três:

### **1\. XAUUSD — ouro**

Bom para movimentos fortes.  
 Excelente para 1,6R quando há tendência.  
 Perigoso em notícia e horários de baixa liquidez.

### **2\. EURUSD**

Mais técnico.  
 Spread geralmente menor.  
 Menos explosivo que ouro, mas melhor para estatística.

### **3\. GBPUSD**

Tem bom deslocamento.  
 Mais volátil que EURUSD.  
 Exige stop mais bem calculado.

Eu deixaria petróleo para uma fase posterior. Ele é muito sensível a notícia, estoque, geopolítica e gaps. Para construir estatística, ele pode poluir o resultado.

## **A regra que protege sua estratégia**

A regra mais importante seria esta:

**A progressão não pertence ao ativo. Ela pertence à campanha.**

Exemplo:

Campanha começa com EURUSD. Ganhou.  
 Agora você está autorizado a procurar uma operação nível 2 em qualquer ativo aprovado.  
 Mas a operação nível 2 precisa ser Setup A+.  
 Se não aparecer, não opera.

Isso permite flexibilidade sem perder controle.

## **Como registrar isso no MT5/planilha**

Você deve registrar cada trade com estes campos:

Campanha nº.  
 Nível da campanha: 1, 2 ou 3\.  
 Ativo.  
 Direção.  
 Timeframe de decisão.  
 Timeframe de entrada.  
 Setup: pullback, rompimento, reversão etc.  
 Pontuação do checklist.  
 Risco percentual.  
 Resultado em R.  
 Resultado percentual.  
 Observação emocional.

O mais importante: medir campanha, não apenas trade.

Você precisa saber:

Quantas campanhas morrem no nível 1\.  
 Quantas chegam ao nível 2\.  
 Quantas chegam ao nível 3\.  
 Quantas completam as três vitórias.  
 Qual o lucro médio por campanha.  
 Qual o pior drawdown.  
 Qual ativo mais contribui.  
 Qual horário mais destrói resultado.

## **Minha sugestão de regra final**

Eu desenharia seu sistema assim:

**Sistema 1-2-4 Conservador**

Operação 1: risco 1%.  
 Se gain: próxima oportunidade A+ vira operação 2\.  
 Operação 2: risco 2%.  
 Se gain: próxima oportunidade A++ vira operação 3\.  
 Operação 3: risco 4%.  
 Se gain: campanha encerrada. Volta para 1%.  
 Se loss em qualquer nível: campanha encerrada. Volta para 1%.

Com uma trava:

**Máximo de uma operação por dia em nível 2 ou 3\.**

Isso impede que você ganhe uma, fique eufórico e force a próxima.

## **Minha opinião final**

Com essa correção que você fez, a ideia deixa de ser uma tentativa de “acertar três entradas no mesmo movimento” e passa a ser uma **estratégia de capital escalonado por performance**.

Isso é bem mais sério.

Mas a execução precisa ser rígida:

Não operar setup B com risco de campanha.  
 Não fazer nível 2 ou 3 por ansiedade.  
 Não trocar de ativo sem o mesmo padrão técnico.  
 Não operar notícia.  
 Não aceitar alvo de 1,6R espremido contra suporte/resistência.  
 Não aumentar risco depois de perda.

O caminho que eu vejo para você é:

**criar um playbook com 1 setup principal, testar 100 campanhas, validar os ativos e só então automatizar parcialmente no MT5.**

A sua tese é boa. O que vai decidir se ela vira um plano de investimento ou uma armadilha emocional é a qualidade do filtro de entrada.

