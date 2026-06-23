# Skill - MetaTrader Trade Copier Ops

## Objetivo

Projetar, revisar e diagnosticar rotinas de copia de trades entre contas MT4/MT5, usando o corpus Rimantas / EA Coder como referencia publica de padroes operacionais.

## Fontes de contexto

- Canal: https://www.youtube.com/@RimantasPetrauskasEACoder/videos
- Corpus local por video: `projects/forex/research/rimantas-channel/channel-video-content-map.md`
- Resumo combinado das transcricoes: `projects/forex/research/rimantas-channel/channel-transcript-context-summary.md`
- Contexto sintetico: `projects/forex/research/rimantas-channel/ea-coder-operational-context.md`

## Quando usar

- Ao planejar copia MT4 -> MT4, MT4 -> MT5, MT5 -> MT4 ou MT5 -> MT5.
- Ao configurar conta master/provider e client/receiver.
- Ao diagnosticar copia parcial, atraso, lote errado, simbolo diferente ou ordem ausente.
- Ao criar presets de multi-conta, VPS, prop firm ou sinal/assinatura.

## Topologias suportadas

- Uma conta master copiando para varias contas client.
- Varios masters enviando para uma conta receiver, com filtros estritos.
- Copia local entre terminais na mesma maquina/VPS.
- Copia remota com camada de provider/receiver e diagnostico de conectividade.
- Copia cruzada MT4/MT5 com validacao de simbolo, lote e tipos de ordem.

## Parametros que devem ser explicitados

- Papel da conta: master/provider ou client/receiver.
- Direcao da copia.
- Simbolo exato e mapeamento de sufixo/prefixo.
- Magic number aceito ou ignorado.
- Tipos de ordem copiados: market, pending, SL, TP, close, partial close.
- Lot mode: fixo, multiplicador, proporcional ao saldo/equity ou risco.
- Slippage/desvio e tempo maximo de atraso.
- Filtro por comentario, horario, ativo e conta.

## Diagnostico de falhas comuns

- Ordem nao copiou: verificar papel da conta, simbolo, magic, permissao do EA e log do receiver.
- Lote errado: revisar lot mode, multiplicador, lot step, minimo/maximo e arredondamento.
- SL/TP diferente: verificar digits, point, stop level, freeze level e mapeamento de simbolo.
- Atraso/slippage: avaliar VPS, latencia, mercado, conexao e fila de execucao.
- Copia duplicada: revisar multiplos EAs no mesmo grafico, magic/comment e escopo de fechamento.
- MT4/MT5 divergente: conferir filling mode, hedging/netting, suporte a pending e simbolos equivalentes.

## Checklist para prop firm e multi-conta

- Confirmar regras de drawdown diario, max drawdown, noticias, consistencia e copia permitida.
- Validar se a conta aceita hedging, partial close, trailing e ordem pendente.
- Testar em demo antes de desafio real.
- Registrar cada conta com preset proprio e nao reutilizar parametros cegamente.
- Usar VPS quando a estabilidade depender de terminais abertos continuamente.

## Saida esperada

- Mapa da topologia.
- Tabela de parametros master/client.
- Checklist de instalacao e teste.
- Hipoteses de falha ordenadas por probabilidade.
- Plano de correcao com teste em demo e rollback.
