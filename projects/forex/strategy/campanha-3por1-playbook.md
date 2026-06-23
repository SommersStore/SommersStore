# Playbook — IBKR Manual Desk

## Objetivo e limite

Este playbook organiza estudo e execução manual na Interactive Brokers. Ele não recomenda ativos, não usa cotação ao vivo e não envia ordens. Dukascopy e MetaTrader permanecem materiais de pesquisa/laboratório, não a sequência principal desta etapa.

O primeiro objetivo não é combinar tudo. São dois processos separados:

1. **Campanha 3x1:** uma sequência de operações com stop técnico e alvo 1,5R.
2. **Proteção patrimonial:** compra de ação/ETF que se deseja possuir e estudo de uma put protetiva como seguro limitado por strike, prazo e prêmio.

## 1. Campanha 3x1

### Regras matemáticas

Cada etapa requer uma nova oportunidade válida. Uma perda encerra o ciclo; o próximo ciclo recomeça no nível 1.

| Nível | Risco da ordem | Alvo da ordem | Condição |
| --- | ---: | ---: | --- |
| 1 | 1% | +1,5% | início ou reset |
| 2 | 2% | +3,0% | somente após vitória no nível 1 |
| 3 | 4% | +6,0% | somente após vitória no nível 2 |

| Resultado do ciclo | Resultado líquido antes de custos |
| --- | ---: |
| Stop no nível 1 | -1,0% |
| Vitória no nível 1, stop no nível 2 | -0,5% |
| Vitórias nos níveis 1 e 2, stop no nível 3 | +0,5% |
| Três alvos atingidos | +10,5% |

O ciclo não perde 7%: os níveis não ficam abertos simultaneamente e a primeira perda o interrompe. A exposição da terceira ordem, porém, é 4%; depois de dois ganhos, seu stop representa uma queda de quatro pontos percentuais do pico acumulado.

### Fluxo manual

1. Definir o ativo e a hipótese antes de abrir o ticket.
2. Definir entrada, invalidação/stop e alvo de 1,5 vezes a distância até o stop.
3. Calcular quantidade sem arredondar o risco para cima. Se uma ação inteira ultrapassar o limite, reduzir a quantidade ou não operar.
4. Registrar a operação, inclusive motivo, horário, custo estimado e resultado em R.
5. Em caso de stop, encerrar a campanha. Em caso de alvo, buscar outra oportunidade do zero — não “reutilizar” a análise anterior.

### Exemplo de tamanho didático — capital de US$ 500

Para uma compra a US$ 6,00 com stop em US$ 5,50, o risco por ação é US$ 0,50 e o alvo 1,5R fica em US$ 6,75:

| Nível | Risco máximo | Quantidade teórica | Alvo bruto |
| --- | ---: | ---: | ---: |
| 1 | US$ 5,00 | 10 ações | US$ 7,50 |
| 2 | US$ 10,00 | 20 ações | US$ 15,00 |
| 3 | US$ 20,00 | 40 ações | US$ 30,00 |

É uma visualização de tamanho. Em uma operação real, cada nível pode ter ativo, preço e stop diferentes; custos, spread e a disponibilidade de ações fracionadas alteram o resultado.

## 2. Posição acionária com protective put

### O que ela protege

Uma put comprada concede o direito de vender o ativo no strike até o vencimento. Em uma posição de ação, ela reduz a perda adicional abaixo desse strike, mas:

- o prêmio é um custo conhecido na entrada;
- entre o preço de compra e o strike, a queda continua sendo da posição acionária;
- prazo, volatilidade implícita, spread e liquidez afetam o preço antes do vencimento;
- o contrato de opção sobre ação dos EUA costuma representar 100 ações; confirmar especificação do ativo na corretora.

### Exemplo didático inspirado em CSNA3

Não é cotação, oferta nem confirmação de que o contrato esteja disponível na IBKR.

| Item | Valor hipotético |
| --- | ---: |
| Ações compradas | 100 |
| Compra da ação | US$ 6,00 |
| Queda para | US$ 4,00 |
| Put comprada | strike US$ 5,00 |
| Prêmio da put | US$ 0,25 por ação / US$ 25 por contrato |

No vencimento, antes de custos de corretagem:

- sem hedge: perda das ações = 100 × (US$ 4 − US$ 6) = **−US$ 200**;
- payout da put: 100 × (US$ 5 − US$ 4) = **+US$ 100**;
- resultado com hedge: −US$ 200 + US$ 100 − US$ 25 = **−US$ 125**.

A put ATM no strike de US$ 6 reduziria mais a queda, porém normalmente exigiria prêmio maior. O seguro não é gratuito; o objetivo é escolher conscientemente o nível de proteção, não eliminar risco.

### Restrição da conta inicial

No exemplo, 100 ações a US$ 6 já custariam US$ 600; com o prêmio, aproximadamente US$ 625. Portanto, uma conta de US$ 500 não comporta integralmente esse exemplo sem margem, alavancagem ou outro ativo — e o painel deve sinalizar essa limitação em vez de escondê-la.

## 3. Combinar as estratégias — somente depois

Não é a primeira etapa. Se a combinação for estudada mais adiante:

1. Manter a put ligada a uma posição patrimonial, não como desculpa para aumentar tamanho da campanha 3x1.
2. Contar prêmio, risco até o strike e risco abaixo do strike no cálculo de perda máxima.
3. Evitar lançar ou alterar várias pernas sem revisar vencimento, liquidez, preço limite e impacto de execução.
4. Fazer primeiro conta paper e diário de decisões; depois testar tamanho pequeno, sujeito às permissões e regras da corretora.

## 4. Plataformas

- **IBKR Desktop:** rotina inicial, lista, posição e tickets manuais simples.
- **Trader Workstation (TWS):** cadeia de opções, comparação de vencimentos e combinações, quando a rotina básica já estiver dominada.
- **IBKR Mobile:** acompanhamento e alertas; não é a primeira superfície para montar uma estratégia multileg.
- **Client Portal:** conta, permissões, assinaturas de dados e relatórios.
- **Dukascopy/JForex:** laboratório secundário para pesquisa e Forex; não substitui a jornada patrimonial/acionária na IBKR.

## Guardrails

- Confirmar permissões, dados, multiplicador, liquidez, custos e tributação antes da primeira ordem real.
- Não compartilhar senhas, tokens ou dados sensíveis da corretora.
- Usar ordem limite quando a liquidez/spread exigir e revisar a ordem antes de transmitir.
- Este playbook não é recomendação financeira, tributária ou jurídica.
