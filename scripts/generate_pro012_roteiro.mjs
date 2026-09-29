// PRO-012 Fase 2 - Gerador do roteiro de ensaio demo
import fs from 'node:fs';
import path from 'node:path';

const qaDir = 'C:/AIOX/Workspace/Protheus/docs/qa';
fs.mkdirSync(qaDir, { recursive: true });

const content = `# PRO-012 — Roteiro de Ensaio Demo Controlado (Fase 2)

**Data:** 2026-09-28  
**Escopo:** Validação operacional isolada do copiador local MT5 exclusivamente entre:
- **Master:** ActivTrades Demo \`6275085\` (\`ActivTrades-Server\`)
- **Receptora:** FTMO Demo \`1514716800\` (\`FTMO-Demo\`)

**Contas protegidas (não devem receber nenhuma ordem):**
- Funded Trader Markets \`227066\` — ReceiverEnabled=0
- Blue Guardian \`570363\` — ReceiverEnabled=0
- LVL Funding - Zero Markets \`135070062\` — ReceiverEnabled=0
- ActivTrades Real \`917799\` — fora de topologia

---

## Pre-condicoes Obrigatorias

- [x] EAs compilados com 0 errors, 0 warnings (concluido 2026-09-28 17:40)
- [x] Copiadores terceiros (MT5 Local Copier, NTS Local Copier) removidos das 5 pastas
- [x] AIOX_Local_Trade_Copier.mq5 v1.10 e AIOX_Trader_On_Chart.mq5 v1.60 instalados
- [x] Gamma_SFX_Cyan.tpl e 5 presets .set instalados
- [ ] Nenhuma posicao aberta em nenhuma conta antes de iniciar
- [ ] Nenhum EA de terceiros ativo nos graficos monitorados

---

## Configuracao dos Terminais

### Terminal Master — ActivTrades Demo (6275085)
1. Abrir MT5 ActivTrades (C:\\Program Files\\MetaTrader 5 - ActivTrades\\terminal64.exe)
2. Verificar login na conta 6275085 (demo)
3. Abrir grafico EURUSD H1
4. Naveg. -> Experts -> Arrastar AIOX_Local_Trade_Copier para o grafico
5. Inputs -> Load -> MQL5/Profiles/Presets/master-activtrades-demo-6275085.set
6. Confirmar:
   - CopierRole = COPIER_MASTER
   - ChannelId = SOMMERS_PRIMARY
   - ExpectedMasterLogin = 6275085
   - DemoTestOnly = true
   - SourceMagicNumber = 888200
7. Habilitar AutoTrading -> OK
8. Verificar log Experts: AIOX Copier MASTER init ok. channel=SOMMERS_PRIMARY

### Terminal Receptora — FTMO Demo (1514716800)
1. Abrir MT5 FTMO (C:\\Program Files\\FTMO Global Markets MT5 Terminal\\terminal64.exe)
2. Verificar login na conta 1514716800 (demo)
3. Abrir grafico EURUSD H1
4. Arrastar AIOX_Local_Trade_Copier para o grafico
5. Inputs -> Load -> MQL5/Profiles/Presets/receiver-ftmo-demo-1514716800.set
6. Confirmar:
   - CopierRole = COPIER_RECEIVER
   - AllowedReceiverLogin = 1514716800
   - ReceiverEnabled = true
   - FixedReceiverLot = 0.01
   - MaxReceiverLot = 0.01
   - RequireStopLoss = true
7. Habilitar AutoTrading -> OK
8. Verificar log Experts: AIOX Copier RECEIVER init ok. channel=SOMMERS_PRIMARY

---

## Casos de Teste

### TC-01 — Abertura Buy com SL/TP (caso base)
Passos:
1. No Master: anexar AIOX_Trader_On_Chart, preset master-activtrades-demo-6275085.set
2. Definir Risco 1%, SL e TP, clicar Buy (magic 888200)
3. Aguardar ~500ms

Esperado:
- [ ] Master: posicao Buy, magic 888200, SL/TP definidos
- [ ] FTMO: posicao Buy, lote 0.01, magic 888210, comentario AC:SOMMERS_PRIMARY:*
- [ ] SL FTMO = preco SL absoluto da Master
- [ ] TP FTMO = preco TP absoluto da Master
- [ ] Log FTMO: AIOX Copier open ok. order=... volume=0.01
- [ ] Common/Files/AIOX_COPIER_SOMMERS_PRIMARY.csv presente
- [ ] Funded/Guardian/Zero: sem nova posicao

### TC-02 — Alteracao de SL/TP na Master
Passos:
1. Com posicao TC-01 aberta, arrastar linha SL para novo nivel
2. Aguardar ~500ms

Esperado:
- [ ] FTMO: SL modificado para o mesmo preco absoluto da Master
- [ ] Log FTMO: AIOX Copier modify ok.
- [ ] Sem nova abertura de posicao

### TC-03 — Fechamento total pela Master
Passos:
1. No TOC fechar a posicao (Close All)
2. Aguardar ~500ms

Esperado:
- [ ] FTMO: posicao fechada automaticamente
- [ ] Log FTMO: AIOX Copier close ok.
- [ ] Snapshot CSV vazio

### TC-04 — Tolerancia de risco 20% e Override
Passos:
1. Configurar Risco muito baixo para forcar lote < minimo
2. Clicar Sell

Resultado: caso dentro 20%:
- [ ] Log: [AIOX Risk] Lote minimo 0.01 aceito dentro da tolerancia (+20.0%)
- [ ] Ordem Sell aberta, lote 0.01

Resultado: caso acima 20%:
- [ ] Log: [AIOX Risk BLOQUEADO] Risco no lote minimo excede o teto de 20%
- [ ] Alert exibido, ordem NAO enviada
- [ ] Botao [  ] Risco >20% visivel

Teste Override:
1. Clicar [  ] Risco >20% -> muda para laranja [X] Risco >20% AUTORIZADO
2. Clicar Sell novamente
- [ ] Log: [AIOX Risk OVERRIDE] Ordem autorizada
- [ ] Ordem aberta, lote 0.01
- [ ] Botao retorna automaticamente para OFF

### TC-05 — Fechamento parcial (Partial Close)
Passos:
1. Abrir posicao Buy
2. Fechar 50% do volume na Master

Esperado:
- [ ] FTMO: PositionClosePartial executado
- [ ] Log FTMO: AIOX Copier partial close ok.
- [ ] Posicao remanescente mantida com magic e comentario corretos

### TC-06 — Reinicializacao do Master
Objetivo: verificar que IsNewSnapshot permite retomada apos reinicio.

Passos:
1. Abrir posicao (TC-01)
2. Remover EA do Master
3. Reanexar EA no Master com preset
4. Aguardar 3 ciclos (~1.5s)

Esperado:
- [ ] Receiver retoma sincronizacao (nova sessao detectada)
- [ ] Posicao FTMO nao duplicada nem fechada indevidamente

### TC-07 — Simbolo bloqueado
Passos:
1. Master: abrir posicao em simbolo nao em AllowedSymbols (ex: NZDUSD)

Esperado:
- [ ] Log FTMO: AIOX Copier RECEIVER symbol not in allowlist. symbol=NZDUSD
- [ ] Nenhuma posicao aberta para esse simbolo

### TC-08 — Limpeza final obrigatoria
Passos:
1. Fechar todas as posicoes de teste
2. Verificar contas protegidas
3. Desanexar EAs
4. Confirmar CSV vazio ou ausente

Esperado:
- [ ] Zero posicoes em ActivTrades demo e FTMO demo
- [ ] Zero ordens em contas protegidas durante todo o ensaio
- [ ] Logs sem erros criticos

---

## Registro de Resultados

| TC  | Descricao                        | Resultado    | Observacoes |
|-----|----------------------------------|--------------|-------------|
| TC-01 | Buy com SL/TP                  | Pendente     |             |
| TC-02 | Modificacao SL/TP              | Pendente     |             |
| TC-03 | Fechamento total               | Pendente     |             |
| TC-04 | Tolerancia 20% + Override      | Pendente     |             |
| TC-05 | Parcial                        | Pendente     |             |
| TC-06 | Reinicializacao Master         | Pendente     |             |
| TC-07 | Simbolo bloqueado              | Pendente     |             |
| TC-08 | Limpeza final                  | Pendente     |             |

---

## Criterio de Aprovacao

- 8/8 TCs aprovados = Ensaio aprovado -> Story PRO-012 concluida
- Qualquer falha em TC-08 = Encerramento imediato + limpeza manual
- Ordem em conta protegida = Incidente de seguranca, registro obrigatorio

---

## Proxima Acao pos-aprovacao

1. Atualizar task.md do Protheus com checkboxes [x]
2. Registrar mutacao em docs/control/memory_mutations.json (SommersStore)
3. Criar record: records/PRO-012-ensaio-demo-20260928.md
4. Atualizar startup_context_latest.md -> checkpoint CHK-PROTHEUS-PRO-012-PHASE-2
`;

fs.writeFileSync(path.join(qaDir, 'PRO-012-ensaio-demo-20260928.md'), content, 'utf8');
console.log('Roteiro criado com sucesso em:', path.join(qaDir, 'PRO-012-ensaio-demo-20260928.md'));
