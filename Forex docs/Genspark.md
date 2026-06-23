Tenho o conteúdo completo dos dois arquivos. Agora vou montar uma estratégia consolidada, técnica e prática, juntando tudo o que você descreveu.

**Usando Ferramenta**

|

Pensar

O usuário quer uma estratégia consolidada baseada em: 1\. Gerenciamento de risco 1-2-4 (R:R 1:1.6) \- "Campanha 3 por 1" 2\. Setup técnico envolvendo Dow, figuras gráficas, Ondas de Elliott 3\. Multi-timeframe: H4/H1 tendência, M15/M5 entrada 4\. Plataformas: MT4, MT5 e JForex (Dukascopy) 5\. Capital inicial: US$ 200 6\. Quer templates visuais limpos Limitações que preciso ser honesto: \- Não posso configurar MyFXBook, MT4/5 ou JForex remotamente (sem credenciais e sem capacidade de acesso a plataformas externas) \- Posso fornecer arquivos .tpl, .set e instruções de instalação manual \- Conta de $200 é muito pequena para esse gerenciamento \- precisa alertar Vou criar uma resposta completa, estruturada, com: \- Análise da estratégia \- Setup técnico detalhado (Dow \+ Elliott \+ figuras) \- Regras objetivas \- Templates (código de template MT4/MT5 em texto) \- Alertas honestos sobre limites \- Próximos passos Não vou usar tantas ferramentas \- vou apenas estruturar a resposta. Talvez gerar um diagrama do fluxo de campanha.

Visualizar

Li os dois arquivos por completo. Você já tem **metade do trabalho pronta** — o gerenciamento (a "Campanha 1-2-4") está matematicamente sólido. O que falta é exatamente o que você disse: o **setup técnico preciso** e a **execução visual nas plataformas**. Vou montar isso de forma objetiva e te dar avisos honestos onde for preciso.

---

# **🎯 Estratégia Consolidada — "Campanha 3 por 1"**

## **1\. Diagnóstico do que você já tem**

Sua engenharia de risco está correta, mas com **um detalhe matemático que precisa ser ajustado**:

| Operação | Risco | Alvo (1:1,6) | Acumulado se ganhar |
| :---- | :---- | :---- | :---- |
| 1ª | \-1,0% | \+1,6% | \+1,6% |
| 2ª | \-2,0% | \+3,2% | \+4,8% |
| 3ª | \-4,0% | \+6,4% | **\+11,2%** |

⚠️ O acumulado real é **\+11,2%**, não 10%. Se você quer fechar exatamente em \~10%, a 3ª teria que ter alvo de **\+5,2%** (R:R 1:1,3), não 1:1,6. Recomendo manter os 11,2% — é mais lucro pelo mesmo risco.

**Cenários completos:**

| Sequência | Resultado líquido |
| :---- | :---- |
| Perde 1ª | **\-1,0%** |
| Ganha 1ª, perde 2ª | **\-0,4%** |
| Ganha 1ª e 2ª, perde 3ª | **\+0,8%** |
| Ganha as 3 (campanha completa) | **\+11,2%** |

✅ **Ponto forte:** isso **não é martingale**. Você escala risco **após vitória**, não após perda. Isso é progressão saudável.

⚠️ **Ponto fraco:** mesmo com 60% de acerto por operação, a chance de fechar a campanha completa é 0,6³ \= **21,6%**. Por isso o setup precisa ser **altamente seletivo** — quantidade não importa, qualidade sim.

---

## **2\. O Setup Técnico que você pediu (Dow \+ Elliott \+ Figuras)**

Você pediu para integrar **Teoria de Dow**, **Ondas de Elliott** e **figuras gráficas**. Aqui está o setup unificado:

### **🧭 Estrutura Multi-Timeframe**

Copy  
H4 ─── Tendência primária (Dow) ─── define **DIRE**ÇÃO  
 │  
 ├── H1 ─── Onda corretiva / Pullback (Elliott 2 ou 4\) ─── define **ZONA**  
 │  
 └── M15 ─── Figura gráfica de continuação ─── define **GATILHO**  
       │  
       └── M5 ─── Confirmação de candle ─── define **ENTRADA**

### **📊 Camada 1 — Dow no H4 (Direção)**

Você só opera **a favor da tendência primária**. Critérios Dow:

**Tendência de alta confirmada quando:**

* Topos ascendentes \+ Fundos ascendentes (HH/HL) nos últimos 3 movimentos do H4  
* Preço acima da **EMA 200**  
* **EMA 20 \> EMA 50** (alinhamento de médias)

**Tendência de baixa confirmada quando:**

* LH/LL \+ Preço abaixo EMA 200 \+ EMA 20 \< EMA 50

🚫 Se H4 está lateral (sem topos/fundos definidos), **não opera**.

### **🌊 Camada 2 — Elliott no H1 (Zona de oportunidade)**

Você só entra em **ondas impulsivas (1, 3, 5\)** — nunca em ondas corretivas (A, B, C) sem confirmação.

**O ponto ideal de entrada é:**

* **Final da Onda 2** (pullback após Onda 1\) → entra na Onda 3  
* **Final da Onda 4** (correção em zigzag/flat/triângulo) → entra na Onda 5

**Como identificar:**

* Onda 2 retrocede tipicamente 50–61,8% da Onda 1 (use **Fibonacci**)  
* Onda 4 retrocede tipicamente 23,6–38,2% da Onda 3  
* Onda 4 **não pode invadir o topo da Onda 1** (regra inviolável)

💡 Onda 3 é a mais lucrativa e a que dá o R:R 1:1,6 com mais folga. Priorize-a.

### **📐 Camada 3 — Figura gráfica no M15 (Gatilho)**

Aceite apenas **figuras de continuação** alinhadas com Dow \+ Elliott:

| Figura | O que confirma |
| :---- | :---- |
| **Bandeira (Flag)** | Pausa curta em tendência forte → continuação |
| **Flâmula (Pennant)** | Triângulo simétrico pequeno → rompimento na direção da tendência |
| **Triângulo ascendente/descendente** | Acúmulo antes de retomada |
| **Retângulo de continuação** | Lateralização breve dentro da tendência |
| **Pivô de Ross / Pin Bar** | Rejeição de zona técnica |

🚫 Ignore figuras de **reversão** (cabeça-ombros, duplo topo) — elas não pertencem a essa estratégia.

### **🎯 Camada 4 — Confirmação no M5 (Entrada)**

A ordem só é enviada quando:

**Compra:**

* M15 fechou candle rompendo a figura (ex: máxima da bandeira)  
* M5 faz **pullback rápido** no rompimento (volta à EMA 9 ou 20\)  
* Forma fundo mais alto \+ candle de força (martelo, marubozu, engolfo)  
* **RSI(14) \> 50** e subindo  
* **Stop** \= abaixo do fundo do pullback OU 1× ATR(14) do M15  
* **Alvo** \= 1,6 × distância do stop

**Venda:** simétrico (espelhado).

---

## **3\. Checklist Único — Pontuação por Nível**

Antes de **cada** operação, marque os critérios. Quanto maior o risco, mais exigente:

| \# | Critério | ✅ |
| :---- | :---- | :---- |
| 1 | H4 com tendência clara (Dow HH/HL ou LH/LL) |  |
| 2 | Preço respeita EMA 200 no H4 |  |
| 3 | H1 em pullback de Onda 2 ou 4 (Fibo 38–62%) |  |
| 4 | M15 formou figura de continuação válida |  |
| 5 | M5 confirmou com candle de força |  |
| 6 | Stop técnico ≤ 1,5× ATR(14) M15 |  |
| 7 | Alvo 1,6R livre até próxima resistência/suporte |  |
| 8 | Spread normal (\< 50% do habitual) |  |
| 9 | Sem notícia de alto impacto nas próximas 2h |  |
| 10 | Horário de liquidez (Londres ou NY) |  |

**Liberação por nível:**

* **Nível 1 (risco 1%)** → mínimo **7/10**  
* **Nível 2 (risco 2%)** → mínimo **8/10**  
* **Nível 3 (risco 4%)** → mínimo **9/10**

---

## **4\. Regras invioláveis da Campanha**

* **Uma campanha por vez.** Não há nível 1 paralelo enquanto houver nível 2 ou 3 ativo.  
* **Sem prazo, mas com validade.** Se passarem 5 dias úteis sem novo setup A+, a campanha **reseta para nível 1**.  
* **Reset imediato em qualquer perda.** Loss em qualquer nível → volta para risco 1%.  
* **Máximo 1 operação por dia em nível 2 ou 3\.** Evita euforia.  
* **Pode trocar de ativo entre níveis**, desde que o setup seja idêntico em qualidade.  
* **Nada de notícia.** Payroll, CPI, FOMC, decisão de juros, estoques de petróleo → fora.

---

## **5\. Ativos e Horários**

**Para começar (escolha 1 ou 2 no máximo):**

* 🥇 **EURUSD** — mais técnico, spread baixo, ideal para estatística com $200  
* 🥈 **GBPUSD** — bom deslocamento, mais volátil  
* 🥉 **XAUUSD** (ouro) — alvos grandes, mas exige stop maior (atenção ao $200)

**Horários (UTC-3 / horário Brasília):**

* ☀️ **Abertura Londres**: 05h–07h  
* 🌐 **Sobreposição Londres/NY**: 10h–13h  
* 🌆 **Primeira hora NY**: 11h–12h

**Evite:** sessão asiática para majors, últimos 30 min de cada sessão, 15 min antes/depois de notícia.

---

## **6\. ⚠️ Alerta crítico sobre os US$ 200**

Preciso ser direto com você: **conta de US$ 200 com risco de 1% \= US$ 2 por trade**. Isso impõe **limites reais**:

| Problema | Impacto |
| :---- | :---- |
| Lote mínimo na Dukascopy é **0,001** (micro) | Em XAUUSD, stop de 50 pips já consome \~$5 \= 2,5% da conta, não 1% |
| Spread \+ comissão | Pode representar 10–20% do risco em operações pequenas |
| Drawdown psicológico | Perder $2 não machuca → você relaxa a disciplina |

**Minha recomendação honesta:**

* Use os **$200 apenas como demo psicológico real** durante 60–100 campanhas  
* **Só passe a operar de verdade com a estratégia 1-2-4 completa a partir de US$ 1.000–2.000**  
* Nesse intervalo, use **risco proporcional reduzido**: 0,25% / 0,5% / 1% — mesma lógica, escala menor

---

## **7\. Templates visuais (gráficos limpos)**

### **MetaTrader 4 / 5 — Configuração de tela**

**Gráfico H4 e H1 (análise):**

* EMA 20 (azul)  
* EMA 50 (laranja)  
* EMA 200 (vermelha, grossa)  
* ATR(14) — janela separada  
* Ferramenta de Fibonacci (manual)  
* Linhas horizontais em suportes/resistências

**Gráfico M15 e M5 (execução):**

* EMA 9 (verde)  
* EMA 20 (azul)  
* RSI(14) com linha 50 destacada  
* ATR(14)  
* Sem mais nada. Tela limpa.

### **📥 Conteúdo do arquivo `.tpl` para MT4/MT5**

Você pode criar manualmente: abra um gráfico, configure as EMAs/RSI/ATR acima → menu **Gráfico → Modelo → Salvar Modelo** com o nome `Campanha_H4.tpl` e `Campanha_M5.tpl`. Faça um para cada timeframe.

⚠️ **Honestidade técnica:** não consigo gerar e enviar arquivos `.tpl` binários funcionais via chat de forma confiável — eles são XML proprietário do MetaTrader e dependem da sua versão exata. O caminho seguro é **você criar uma vez manualmente seguindo os parâmetros acima** e salvar como template.

---

## **8\. Sobre JForex (Dukascopy)**

JForex é uma plataforma Java muito poderosa, com **profundidade real de mercado** (a Dukascopy é ECN). Principais diferenças vs MT4/5:

| Recurso | MT4/5 | JForex |
| :---- | :---- | :---- |
| Execução | Market maker (na maioria) | ECN real |
| Profundidade de mercado | Limitada | Completa (Level II) |
| Linguagem de automação | MQL4/MQL5 | Java (JForex API) |
| Spread | Fixo ou variável | Variável \+ comissão |
| Templates | `.tpl` | "Workspaces" \+ perfis de instrumentos |

**Para replicar o setup no JForex:**

* Adicione 4 abas de gráfico: EURUSD H4, H1, M15, M5  
* Em cada uma: **Add Indicator** → EMA (com os períodos acima), RSI, ATR  
* **File → Save Workspace as...** → `Campanha_3por1.wsp`  
* Próxima vez: **File → Open Workspace** → tudo carregado

---

## **9\. ❌ O que eu não posso fazer por você (honestidade)**

Você perguntou diretamente, então respondo com a mesma franqueza:

* **Configurar sua MyFXBook com login/senha → NÃO.**  
  Não tenho acesso a sites externos com suas credenciais. E mesmo que tivesse, **nunca compartilhe senha de plataforma de trading com IA, humano ou serviço terceiro**. Risco de segurança. O que posso fazer é te dar o **passo a passo** quando você quiser.  
* **Configurar MT4/MT5/JForex remotamente → NÃO.**  
  Mesma razão. Posso te entregar os parâmetros, prints conceituais e instruções clicáveis.  
* **Garantir que o setup vai funcionar → NÃO.**  
  Nenhum setup tem garantia. O que posso garantir é que esse é um framework **testável e mensurável**.

---

## **10\. Próximos passos sugeridos (em ordem)**

* ✅ **Aprovar este setup como base** ou pedir ajustes pontuais  
* 📋 Eu monto pra você uma **planilha de registro de campanhas** (Google Sheets / Excel) com cálculo automático de R, drawdown e estatísticas por nível  
* 📘 Eu te gero um **playbook PDF** com tudo isso consolidado para impressão e consulta na mesa  
* 🧪 Backtest manual de **30 campanhas** em EURUSD H4/H1 → M15/M5 (eu te oriento como fazer no MT5)  
* 🔬 30 dias em **conta demo** com execução real  
* 🚀 Migração para conta real pequena

---

## **❓ Me responda 3 coisas para eu avançar:**

* **Quer que eu monte a planilha de registro de campanhas agora?** (Excel/Sheets com fórmulas prontas)  
* **Quer o playbook em PDF** com tudo isso consolidado e diagramado?  
* Vai operar **EURUSD** primeiro (minha sugestão) ou prefere **XAUUSD**?

Pode me contrariar, criticar ou ajustar qualquer ponto — o objetivo aqui é entregar algo que **você** consiga executar com disciplina, não algo bonito no papel.

Ha uma estratégia chamada 9:1, 9:2 e 9:3. Há mais alguma estratégia, mais acertada, ou setup de entrada que você possa somar a esse conteúdo?  
