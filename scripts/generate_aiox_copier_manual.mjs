import fs from 'node:fs';

const manualContent = `# Manual Operacional e de Configuração — AIOX Local Trade Copier v1.10

**Sistema:** AIOX Local Trade Copier  
**Arquivo do EA:** \`AIOX_Local_Trade_Copier.mq5\` / \`AIOX_Local_Trade_Copier.ex5\`  
**Versão:** 1.10  
**Ambiente:** MetaTrader 5 (Multi-Terminal no mesmo computador / VPS Windows)  
**Mecanismo:** Troca local de dados em alta velocidade via pasta comum (\`FILE_COMMON\`)  
**Compatibilidade:** Contas Hedging (ActivTrades, FTMO, Exness, etc.)

---

## 1. O QUE É E COMO FUNCIONA O COPIADOR?

O **AIOX Local Trade Copier** é um Expert Advisor utilitário projetado para espelhar ordens e posições de forma ultrarrápida entre diferentes contas e terminais MT5 rodando na mesma máquina.

### Como funciona em 3 passos:
1. **Master (Publicador):** O terminal onde você opera (ex: ActivTrades Demo) monitora as posições abertas. A cada alteração ou tique, grava um instantâneo (*snapshot*) estruturado em formato CSV na pasta comum compartilhada do MetaTrader (\`FILE_COMMON\`).
2. **Canal de Comunicação Seguro:** A gravação ocorre em memória de disco local compartilhada (\`AIOX_COPIER_<ChannelId>.csv\`). Não há internet, servidores em nuvem, webhooks ou DLLs externas — zero risco de interceptação de dados ou falhas de provedores de rede.
3. **Receiver (Receptor / Escravo):** Os terminais receptores (ex: FTMO Demo) consultam esse arquivo em intervalos de 250ms. Se encontrarem uma posição nova da Master autorizada, abrem a ordem espelho imediatamente; se a Master mover o Stop Loss, o Receiver move; se houver saída parcial ou fechamento, o Receiver replica a ação.

---

## 2. FILOSOFIA DE SEGURANÇA: FAIL-CLOSED & ANTI-ACIDENTE

Diferente de copiadores comerciais de terceiros (que tentam copiar qualquer coisa que encontrem pela frente), o AIOX Copier foi desenhado sob a política militar **Fail-Closed**:
- Se houver **qualquer dúvida** sobre a conta, o servidor ou o lote, o EA **trava e não abre a ordem**.
- Não copia ordens de outros robôs ou cliques acidentais — apenas ordens com o **Magic Number correto** (\`SourceMagicNumber = 888200\`).
- Possui travas duras por número de conta e tipo de servidor: é impossível disparar ordens em contas reais ou em contas funded não autorizadas durante os testes.

---

## 3. GUIA DETALHADO DE PARÂMETROS DE ENTRADA (INPUTS)

### 🔷 Grupo 1: Identidade e Papel
| Parâmetro | Tipo | Padrão | Descrição e Como Configurar |
|---|---|---|---|
| \`CopierRole\` | Enum | \`COPIER_RECEIVER\` | Define se este terminal é o transmissor ou o receptor. <br>• \`COPIER_MASTER\`: Publica as ordens do terminal. **Apenas 1 Master por canal.** <br>• \`COPIER_RECEIVER\`: Replica as ordens no terminal. Pode haver vários. |
| \`ChannelId\` | String | \`SOMMERS_PRIMARY\` | Identificador do canal compartilhado. Deve ser **rigorosamente idêntico** na Master e no Receiver. Define o nome do arquivo \`AIOX_COPIER_<ChannelId>.csv\`. |

---

### 🔷 Grupo 2: Autorização e Blindagem (Anti-Acidente)
| Parâmetro | Tipo | Padrão | Descrição e Regra de Segurança |
|---|---|---|---|
| \`ExpectedMasterLogin\` | Long | \`6275085\` | Número da conta Master autorizada a publicar ordens. <br>• Na Master: se a conta conectada for diferente, a publicação é bloqueada. <br>• No Receiver: rejeita qualquer snapshot que não tenha sido assinado por esse login. |
| \`ExpectedMasterServer\` | String | \`ActivTrades-Server\` | Nome oficial do servidor da Master. Impede confusão se houver contas com mesmo número em corretoras diferentes. |
| \`AllowedReceiverServer\` | String | \`""\` (Vazio) | Nome do servidor onde o Receiver tem permissão para operar (ex: \`FTMO-Demo\`). Se preenchido e o terminal estiver em outro servidor, o EA recusa ordens. |
| \`RequireDemoMaster\` | Bool | \`true\` | **Trava de Segurança Vital:** Se \`true\`, o Master só publica se a conta conectada for comprovadamente do tipo **DEMO**. Impede publicações acidentais de contas reais em ambiente de ensaio. |
| \`AllowedReceiverLogin\` | Long | \`0\` | Número da conta autorizada para este Receiver. <br>• **\`0\` = FAIL-CLOSED:** Se estiver zero, o EA não replica absolutamente nada. <br>• Para o ensaio FTMO, deve ser configurado como \`1514716800\`. |
| \`ReceiverEnabled\` | Bool | \`false\` | Chave geral de ativação do Receiver. <br>• \`false\`: EA lê o arquivo e loga o status, mas NÃO executa ordens (modo sentinela). <br>• \`true\`: Replicador ativo e operando. Contas protegidas (Funded, Guardian) devem ficar sempre em \`false\`. |
| \`DemoTestOnly\` | Bool | \`true\` | Trava de contingência para o período de testes. Exige que a conta receptora seja a conta de ensaio autorizada. Só deve ser desativado no rollout para produção. |

---

### 🔷 Grupo 3: Magic Numbers (Filtro de Ordens)
| Parâmetro | Tipo | Padrão | Descrição e Boas Práticas |
|---|---|---|---|
| \`SourceMagicNumber\` | Long | \`888200\` | Magic Number das ordens da Master que devem ser copiadas. Qualquer ordem manual sem magic (magic 0) ou de outros robôs será **ignorada**. Suas ordens no FTP devem usar este magic. |
| \`ReceiverMagicNumber\` | Long | \`888210\` | Magic Number aplicado nas ordens abertas pelo Receiver. Identifica de forma cristalina quais posições na conta escrava foram geradas pelo copiador. |

---

### 🔷 Grupo 4: Gestão de Lote e Volume
| Parâmetro | Tipo | Padrão | Descrição e Ajustes Recomendados |
|---|---|---|---|
| \`VolumeMode\` | Enum | \`COPIER_FIXED_LOT\` | Modo de dimensionamento de volume no Receiver: <br>• \`COPIER_FIXED_LOT\`: Usa sempre o lote definido em \`FixedReceiverLot\` (ignora o tamanho da Master). **Modo mais seguro para testes.** <br>• \`COPIER_MULTIPLIER\`: Multiplica o lote da Master por \`VolumeMultiplier\`. |
| \`FixedReceiverLot\` | Double | \`0.01\` | Lote fixo adotado no Receiver quando em modo \`COPIER_FIXED_LOT\`. No ensaio demo, manter \`0.01\`. |
| \`VolumeMultiplier\` | Double | \`1.0\` | Fator multiplicador quando em \`COPIER_MULTIPLIER\` (ex: \`1.0\` = lote idêntico; \`0.5\` = metade do lote). |
| \`MaxReceiverLot\` | Double | \`0.01\` | **Teto de Segurança Absoluto:** Nenhuma ordem poderá ser aberta no Receiver com lote superior a este limite. Se o cálculo resultar em 0.02 e o teto for 0.01, a ordem é rejeitada. |

---

### 🔷 Grupo 5: Símbolos e Mapeamento entre Corretoras
| Parâmetro | Tipo | Padrão | Descrição e Sintaxe |
|---|---|---|---|
| \`AllowedSymbols\` | String | \`""\` (Vazio) | Lista branca de pares autorizados a copiar, separados por ponto-e-vírgula (ex: \`EURUSD;GBPUSD;XAUUSD\`). <br>⚠️ **Atenção:** Se estiver vazio, o EA aplica regra fail-closed e não copia nenhum par. Configure os pares explicitamente. |
| \`SymbolMap\` | String | \`""\` (Vazio) | Conversor de nomenclatura de símbolos entre a Master e a Receiver (caso tenham sufixos ou prefixos). <br>Formato: \`ORIGEM=DESTINO;ORIGEM2=DESTINO2\` <br>Exemplos: \`EURUSD=EURUSDm;XAUUSD=GOLD\`. Se vazio, assume que o nome do ativo é idêntico em ambas. |

---

### 🔷 Grupo 6: Tipos de Ordens e Gestão de Posição
| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| \`CopyPendingOrders\` | Bool | \`false\` | • \`false\`: Copia apenas ordens a mercado já executadas (RECOMENDADO). <br>• \`true\`: Copia também ordens pendentes (Buy/Sell Limit/Stop). Manter \`false\` evita assimetria de preços em picos de volatilidade. |
| \`CopyStopLoss\` | Bool | \`true\` | Copia o preço de Stop Loss da Master exatamente para o Receiver. Obrigatório manter \`true\` para compliance com regras de mesas proprietárias. |
| \`CopyTakeProfit\` | Bool | \`true\` | Copia o preço de Take Profit da Master exatamente para o Receiver. |
| \`RequireStopLoss\` | Bool | \`true\` | Se \`true\`, o Receiver **rejeita** qualquer posição da Master que não tenha um Stop Loss configurado no momento da entrada. Proteção indispensável. |

---

### 🔷 Grupo 7: Temporização e Tolerância a Slippage
| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| \`TimerMilliseconds\` | Int | \`250\` | Frequência de leitura e varredura do arquivo em milissegundos. \`250ms\` garante velocidade sem sobrecarregar a CPU do computador. |
| \`MaxHeartbeatAgeSeconds\` | Int | \`5\` | Validade máxima do snapshot em segundos. Se a Master parar de atualizar o arquivo por mais de 5s, o Receiver assume que a Master está offline e pausa a cópia. |
| \`MaxSlippagePoints\` | Int | \`20\` | Desvio máximo aceitável de preço em pontos (20 pontos = 2.0 pips em pares de 5 dígitos). Se o preço da Receiver tiver corrido além disso em relação à Master, a ordem não é executada. |

---

## 4. TOPOLOGIA DAS CONTAS E PRESETS PRONTOS

O sistema foi preparado com 5 presets configurados e instalados nos respectivos terminais MT5:

| Terminal | Conta | Papel | Preset Utilizado | Status no Ensaio |
|---|---|---|---|---|
| **ActivTrades Demo** | \`6275085\` | **MASTER** | \`copier-master-activtrades-demo.set\` | **ATIVO** (Publicando no canal \`SOMMERS_PRIMARY\`) |
| **FTMO Demo** | \`1514716800\` | **RECEIVER** | \`copier-receiver-ftmo-demo.set\` | **ATIVO** (Replicando com Lote Fixo \`0.01\`) |
| **FTMO Funded** | \`1511257404\` | RECEIVER | \`copier-receiver-ftmo-funded.set\` | DESATIVADO (\`ReceiverEnabled=false\`) |
| **ActivTrades Guardian** | \`6280459\` | RECEIVER | \`copier-receiver-activtrades-guardian.set\` | DESATIVADO (\`ReceiverEnabled=false\`) |
| **Exness Zero** | \`222372483\` | RECEIVER | \`copier-receiver-exness-zero.set\` | DESATIVADO (\`ReceiverEnabled=false\`) |

---

## 5. ROTEIRO DE TESTE PRÁTICO (ENSAIO CONTROLADO)

Para validar a integridade da comunicação entre o **FTP** (painel da ActivTrades) e o **AIOX Copier**:

1. **Terminal ActivTrades (Master):**
   - Gráfico aberto no ativo desejado (ex: EURUSD).
   - Anexar o **Forex Trade Panel MT5 (FTP)**.
   - Ir em *Settings → General Settings* e confirmar o **Magic Number = 888200**.
   - Anexar o **AIOX_Local_Trade_Copier.ex5** em outro gráfico (ex: GBPUSD ou EURUSD M1) com o preset \`copier-master-activtrades-demo.set\`.
   - Confirmar na aba *Experts/Diário* do MT5 o log: \`[AIOX_Copier_Master] Running on channel SOMMERS_PRIMARY\`.

2. **Terminal FTMO (Receiver):**
   - Abrir o MT5 da FTMO Demo.
   - Anexar o **AIOX_Local_Trade_Copier.ex5** a qualquer gráfico com o preset \`copier-receiver-ftmo-demo.set\`.
   - Confirmar o log: \`[AIOX_Copier_Receiver] Listening on channel SOMMERS_PRIMARY, Target Login: 1514716800\`.

3. **Execução do Teste:**
   - No FTP (ActivTrades), clicar em **BUY** ou **SELL** com SL configurado.
   - Verificar:
     1. Na ActivTrades a ordem abre com Magic \`888200\`.
     2. Na FTMO a ordem é replicada em frações de segundo com volume \`0.01\`, mesmo SL e Magic \`888210\`.
     3. Ajustar o SL arrastando a linha no gráfico da ActivTrades: o SL na FTMO deve acompanhar automaticamente.
     4. Fechar a ordem na ActivTrades (ou via FTP): a ordem na FTMO deve ser encerrada imediatamente.

---

## 6. DIAGNÓSTICO E TROUBLESHOOTING (RESOLUÇÃO DE PROBLEMAS)

* **O Receiver não abre ordem:**
  - *Causa 1:* \`ReceiverEnabled\` está \`false\` (deve ser \`true\` no preset da FTMO Demo).
  - *Causa 2:* O ativo não está na lista \`AllowedSymbols\`.
  - *Causa 3:* A ordem na Master não tem SL e \`RequireStopLoss\` está \`true\`.
  - *Causa 4:* A ordem na Master foi aberta com Magic diferente de \`888200\`.

* **Erro "Master Heartbeat Stale":**
  - O terminal Master foi fechado ou o EA foi desanexado do gráfico da ActivTrades há mais de 5 segundos.

* **Erro "Account mismatch / Fail-closed":**
  - O EA foi anexado em uma conta cujo número não corresponde ao \`ExpectedMasterLogin\` ou \`AllowedReceiverLogin\`.
`;

const dest1 = 'C:/AIOX/Workspace/Protheus/docs/qa/manual-aiox-local-trade-copier.md';
const dest2 = 'c:/AIOX/Workspace/SommersStore/docs/manual-aiox-local-trade-copier.md';

fs.writeFileSync(dest1, manualContent, 'utf8');
fs.writeFileSync(dest2, manualContent, 'utf8');
console.log('Successfully saved to both locations!');
