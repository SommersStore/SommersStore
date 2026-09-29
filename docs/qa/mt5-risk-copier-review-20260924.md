# Revisao preliminar MT5 - 2026-09-24

Escopo: inventario e leitura de codigo; nenhuma configuracao de terminal, compilacao, instalacao ou negociacao executada nesta etapa. Alteracoes locais preexistentes foram preservadas. A Story 2.117 e os fontes em andamento foram encontrados, nao criados nesta sessao.

## Topologia confirmada

| Papel | Nome | Login | Servidor observado | Data folder |
| --- | --- | --- | --- | --- |
| Master | ActivTrades demo | 6275085 | ActivTrades-Server | 66F5E7F481A026D99CDDE6509362A170 |
| Receptora | FTMO | 1514716800 | FTMO-Demo | 81A933A9AFC5DE3C23B15CAB19C63850 |
| Receptora | Funded Trader Market | 227066 | FundedTraderMarkets-Server | 583A64D2031E6C8095B7351F1A8090CE |
| Receptora | Blue Guardian | 570363 | BlueGuardian-Server | 0D1C97C3AF4FEF2A552E03CE90448FCA |
| Receptora | LVL Funding - Zero Markets | 135070062 | ZeroMarkets-1 | BF9A9B181CCD45EEBD131F7DF1A32F72 |

Usar exatamente LVL Funding - Zero Markets nos registros futuros. A ActivTrades real 917799 esta fora desta topologia. Login e servidor foram observados nos titulos dos processos terminal64; as pastas foram relacionadas via origin.txt. Nao foi validada a conexao de negociacao nem o EA atualmente anexado a cada grafico.

## Evidencia e achados

1. O fonte do gestor presente na pasta da master declara v1.50; o fonte do workspace declara v1.60 e esta modificado. Binario presente nao comprova qual versao esta carregada no grafico.
2. ALTO: v1.50, NormalizeLots, linhas 654-664: lote calculado abaixo do minimo e elevado ao minimo. Isso pode superar o risco solicitado. A v1.60 local ja retorna zero nesse caso e usa OrderCalcProfit; ainda nao validada operacionalmente nesta sessao.
3. ALTO: AIOX_Local_Trade_Copier.mq5, linhas 523-532 e 574-582: DesiredStops recalcula SL/TP usando a cotacao atual em cada reconciliacao, mesmo sem alteracao na master. Exemplo aritmetico: master abriu a 100 com SL 90; cotacao receptora passa de 100 para 105 e o SL desejado passa de 90 para 95, embora a master nao tenha mudado o stop.
4. ALTO: copiador, linhas 67-68, 286 e 665-666: contador do master reinicia em zero; receptora que permaneceu aberta ignora sequencias menores ou iguais a ultima. Retomada pode ficar suspensa ate o contador ultrapassar o valor anterior.
5. ALTO: copiador, linhas 188-204 e 553-571: modo fixo nao reflete parciais da origem. No multiplicador, mudanca de volume fecha toda a posicao e abre outra, em vez de reduzir a existente.
6. ALTO: copiador, linhas 86-94, 240-246, 452-456 e 496-505: posicoes originadas de pendentes com comentario AIOXCO entram no escopo, mas SnapshotHasPosition somente reconhece AIOXCP. Se o broker preservar o comentario da pendente, a posicao executada pode ser fechada como obsoleta e reaberta. Requer teste e correlacao estavel entre ordem e posicao.
7. Ha binarios MT5 Local Copier e NTS Local Copier nas pastas das cinco plataformas. O copiador autoral foi localizado como fonte no workspace; nao apareceu no inventario MQL5/Experts. Presenca de arquivo nao significa EA ativo. Escolha do copiador segue pendente de resposta do usuario.
8. A Story 2.117 ainda descreve quatro terminais; a topologia vigente tem cinco. O escopo antigo de teste nao deve ser interpretado como nova autorizacao operacional nesta conversa.

## Proximos passos

- Confirmar qual copiador sera usado e qual EA esta anexado aos graficos.
- Concluir revisao da v1.60 e corrigir os achados do copiador escolhido em etapa de implementacao.
- Preparar presets individuais com contas, simbolos e dimensionamento explicitamente definidos pelo usuario; nao adotar valores padrao como limites aprovados.
- Preparar casos de lote abaixo do minimo, SL/TP estavel, parcial, pendente executada, reinicio apenas da master, desconexao e nao duplicacao.
- Depois da validacao isolada, apresentar ensaio demo com contas e limites concretos antes de qualquer operacao.

## Checklist desta etapa

- [x] Confirmar 1 master e 4 receptoras por processos e origin.txt.
- [x] Preservar a nomenclatura LVL Funding - Zero Markets.
- [x] Comparar fontes instalado e local e ler o copiador autoral.
- [x] Documentar achados e limites da verificacao.
- [ ] Confirmar copiador e parametros operacionais.
- [ ] Compilar e validar comportamento dos EAs em ambiente isolado.
- [ ] Teste de negociacao demo (nao realizado nesta etapa).

## Validacao documental

- npm.cmd run lint: passou.
- npm.cmd run typecheck: passou.
- npm.cmd test: falhou em testResticRoundTripWhenAvailable, tests/quality/continuity_backup.test.cjs:238, com EPERM ao remover diretorio temporario aiox-continuity-restic-5BxU6F. Nao foi corrigido neste escopo e a suite completa nao pode ser declarada aprovada.
- Estes gates nao compilam nem comprovam o comportamento operacional dos EAs MQL5.
