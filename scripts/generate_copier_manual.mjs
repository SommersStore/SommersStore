// manual_generator.mjs
import fs from 'node:fs';

const manual = `# Manual de Configuracao - AIOX Local Trade Copier v1.10

Arquivo: AIOX_Local_Trade_Copier.mq5
Versao: 1.10
Mecanismo: Arquivo compartilhado via FILE_COMMON (mesmo PC)

## Como funciona em 3 linhas

O copiador opera em dois papeis: Master (publica ordens) e Receiver (replica ordens).
A Master escreve um arquivo CSV na pasta comum do MT5. O Receiver le esse arquivo
a cada 250ms e sincroniza suas posicoes com as da Master.
Toda comunicacao e local - funciona entre diferentes terminais MT5 no mesmo computador.

---

## Parametros de Configuracao

### IDENTIDADE E PAPEL

--- CopierRole [Padrao: COPIER_RECEIVER] ---
Define o papel deste EA no par de copia.
  COPIER_MASTER   = este terminal publica as ordens. Apenas UM por canal.
  COPIER_RECEIVER = este terminal replica as ordens do Master. Pode haver multiplos.
ATENCAO: nunca configure dois terminais como Master no mesmo ChannelId.

--- ChannelId [Padrao: SOMMERS_PRIMARY] ---
Nome do canal de comunicacao. O arquivo CSV sera AIOX_COPIER_<ChannelId>.csv.
Deve ser identico no Master e em todos os Receivers do mesmo canal.
Use nomes descritivos e unicos se tiver multiplos canais. Ex: SOMMERS_PRIMARY, CANAL_FTMO.

---

### AUTORIZACAO E SEGURANCA

--- ExpectedMasterLogin [Padrao: 6275085] ---
Numero da conta Master autorizada a publicar neste canal.
No Master: bloqueia publicacao se a conta logada for diferente.
No Receiver: rejeita snapshots publicados por outra conta.
Protecao contra um terminal errado publicar acidentalmente.

--- ExpectedMasterServer [Padrao: ActivTrades-Server] ---
Nome exato do servidor da conta Master.
Consulte em: Ferramentas > Opcoes > Servidor.
Evita confundir contas com mesmo numero em corretoras diferentes.

--- AllowedReceiverServer [Padrao: vazio] ---
Servidor que o Receiver esta autorizado a usar.
Vazio = sem verificacao de servidor (menos seguro, aceito em testes).
Recomendado: preencher com o nome exato. Ex: FTMO-Demo.

--- RequireDemoMaster [Padrao: true] ---
Se true, o Master so publica se a conta for do tipo DEMO.
Bloqueia completamente a publicacao em conta real.
Manter true durante testes. Mudar para false apenas em producao.

--- AllowedReceiverLogin [Padrao: 0] ---
Numero da conta que este Receiver esta autorizado a usar.
0 = NENHUMA CONTA AUTORIZADA = Receiver completamente bloqueado (fail-closed).
Preencher com o numero da conta receptora. Ex: 1514716800 para FTMO Demo.
CRITICO: o padrao 0 e intencional para que contas nao configuradas nunca copiem.

--- ReceiverEnabled [Padrao: false] ---
Liga ou desliga a replicacao neste Receiver.
false = EA conectado mas sem executar nenhuma ordem (seguro).
true  = Receiver ativo e replicando ordens do Master.
Contas protegidas (Funded, Guardian, Zero) devem permanecer SEMPRE em false.

--- DemoTestOnly [Padrao: true] ---
Trava dupla de seguranca para o periodo de rollout.
Se true, o Receiver so executa se a conta for exatamente 1514716800 (FTMO Demo).
Manter true no ensaio. Mudar para false apenas ao expandir para producao completa.

---

### MAGIC NUMBERS

--- SourceMagicNumber [Padrao: 888200] ---
Magic number das ordens da Master que devem ser copiadas.
Ordens com magic diferente sao completamente ignoradas pelo Receiver.
Permite coexistir com outros EAs no mesmo terminal sem interferencia cruzada.

--- ReceiverMagicNumber [Padrao: 888210] ---
Magic number aplicado pelo Receiver nas posicoes que abre.
Diferente do SourceMagicNumber para identificar posicoes copiadas vs posicoes da Master.
Todas as ordens abertas pelo Receiver terao este magic.

---

### VOLUME E LOTE

--- VolumeMode [Padrao: COPIER_FIXED_LOT] ---
Define como o volume da ordem copiada e calculado.
  COPIER_FIXED_LOT   = usa sempre o lote de FixedReceiverLot (ignora volume da Master).
  COPIER_MULTIPLIER  = multiplica o volume da Master pelo VolumeMultiplier.
Recomendado para mesas proprietarias: COPIER_FIXED_LOT com 0.01.

--- FixedReceiverLot [Padrao: 0.01] ---
Lote fixo usado quando VolumeMode = COPIER_FIXED_LOT.
Deve respeitar o lote minimo do broker receptor.
Para FTMO Demo no ensaio: manter 0.01.

--- VolumeMultiplier [Padrao: 1.0] ---
Multiplicador de volume quando VolumeMode = COPIER_MULTIPLIER.
1.0 = mesmo lote da Master. 0.5 = metade. 2.0 = dobro.
Ignorado quando VolumeMode = COPIER_FIXED_LOT.

--- MaxReceiverLot [Padrao: 0.01] ---
Teto absoluto de volume para qualquer ordem copiada.
Se o volume calculado (fixo ou multiplicado) for maior que este valor, a ordem e REJEITADA.
Protecao final contra lotes acidentalmente grandes. Para o ensaio: 0.01.

---

### SIMBOLOS E MAPEAMENTO

--- AllowedSymbols [Padrao: vazio] ---
Lista de simbolos da Master que o Receiver esta autorizado a copiar.
Separados por ponto-e-virgula. Ex: EURUSD;GBPUSD;XAUUSD
ATENCAO: vazio NAO significa todos os simbolos - significa NENHUM (fail-closed).
Voce deve listar EXPLICITAMENTE todos os simbolos que deseja copiar.

--- SymbolMap [Padrao: vazio] ---
Tabela de conversao de simbolos entre Master e Receiver.
Util quando corretoras usam sufixos diferentes para o mesmo ativo.
Formato: SIMBOLO_MASTER=SIMBOLO_RECEIVER separados por ponto-e-virgula.
Exemplos:
  EURUSD=EURUSDm             (um mapeamento)
  XAUUSD=GOLD;EURUSD=EURUSD. (dois mapeamentos)
Vazio = sem conversao, usa o mesmo simbolo da Master.

---

### TIPOS DE ORDEM

--- CopyPendingOrders [Padrao: false] ---
false = copia apenas posicoes ja abertas (ordens a mercado executadas). RECOMENDADO.
true  = replica tambem ordens pendentes (Limit, Stop).
Por que false e o padrao? Ordens pendentes disparadas em momentos diferentes podem ter
precos de entrada muito distintos entre Master e Receiver, gerando exposicao involuntaria.

--- CopyStopLoss [Padrao: true] ---
Se true, o SL da posicao da Master e copiado como preco ABSOLUTO no Receiver.
O SL nao e recalculado - e o mesmo preco exato da Master.
Manter true. Obrigatorio para conformidade com regras das mesas proprietarias.

--- CopyTakeProfit [Padrao: true] ---
Se true, o TP da posicao da Master e copiado como preco ABSOLUTO no Receiver.
Mesmo comportamento do CopyStopLoss - preco absoluto, sem recalculo.

--- RequireStopLoss [Padrao: true] ---
Se true, o Receiver REJEITA qualquer posicao da Master que nao tenha SL definido.
Manter true. Operacoes sem SL infringem as regras da maioria das mesas proprietarias.

---

### TEMPORIZACAO E SINCRONIZACAO

--- TimerMilliseconds [Padrao: 250] ---
Intervalo em milissegundos entre cada leitura do snapshot pelo Receiver.
Define a latencia de replicacao.
  100ms = ~100ms de latencia, alto consumo de CPU
  250ms = ~250ms de latencia, consumo normal (RECOMENDADO)
  500ms = ~500ms de latencia, baixo consumo de CPU
Aumentar para 500ms se o PC estiver sobrecarregado.

--- MaxHeartbeatAgeSeconds [Padrao: 5] ---
Tempo maximo em segundos que o Receiver aceita um snapshot sem nova atualizacao da Master.
Se o arquivo CSV nao for renovado dentro deste prazo:
  - Receiver entra em modo de espera
  - Para de executar NOVAS ordens
  - NAO fecha posicoes ja abertas
Protege contra Master desconectado, travado ou com AutoTrading desabilitado.
5 segundos e o valor recomendado para conexoes estaveis.

--- MaxSlippagePoints [Padrao: 20] ---
Slippage maximo permitido na execucao das ordens do Receiver, em pontos do instrumento.
Para EURUSD: 20 pontos = 0.0020 (2 pips).
Se o broker nao conseguir executar dentro deste slippage, a ordem e CANCELADA.
Aumentar em horarios de baixa liquidez (abertura de mercado, noticias economicas).
Valores tipicos para Forex majors: 10 a 30 pontos.

---

## Resumo dos Presets Configurados

Conta                          | Papel    | ReceiverEnabled | AllowedReceiverLogin | FixedLot | DemoTestOnly
ActivTrades Demo 6275085       | MASTER   | -               | -                    | -        | true
FTMO Demo 1514716800           | RECEIVER | TRUE            | 1514716800           | 0.01     | true
Funded Trader Markets 227066   | RECEIVER | FALSE           | 227066               | 0.01     | true
Blue Guardian 570363           | RECEIVER | FALSE           | 570363               | 0.01     | true
LVL Funding - Zero Mkt 135070 | RECEIVER | FALSE           | 135070062            | 0.01     | true

---

## Regra de Seguranca (fail-closed)

Em todos os parametros: na duvida, BLOQUEIA. Nunca executa por omissao.

Verificacoes do MASTER antes de publicar:
  1. Conta logada == ExpectedMasterLogin
  2. Servidor da conta == ExpectedMasterServer
  3. Se RequireDemoMaster = true, conta deve ser DEMO

Verificacoes do RECEIVER antes de executar cada ordem:
  1. AllowedReceiverLogin != 0 E conta logada == AllowedReceiverLogin
  2. Se AllowedReceiverServer nao vazio, servidor deve bater
  3. ReceiverEnabled == true
  4. Se DemoTestOnly = true, conta deve ser 1514716800 e demo
  5. RequireStopLoss = true E posicao da Master tem SL
  6. Simbolo da posicao esta em AllowedSymbols
  7. Volume calculado <= MaxReceiverLot
  8. Snapshot tem menos de MaxHeartbeatAgeSeconds segundos

Se qualquer verificacao falhar: log detalhado + sem execucao.
`;

fs.writeFileSync('C:/AIOX/Workspace/Protheus/docs/qa/manual-copier-v1.10.md', manual, 'utf8');
console.log('Manual gerado: C:/AIOX/Workspace/Protheus/docs/qa/manual-copier-v1.10.md');
