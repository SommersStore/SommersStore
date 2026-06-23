# Skill - MetaTrader EA Coder Operations

## Objetivo

Converter o corpus publico Rimantas / EA Coder em rotinas operacionais para melhorar instalacao, diagnostico, painel manual, presets e templates MT4/MT5 do projeto Forex.

## Fontes de contexto

- Canal: https://www.youtube.com/@RimantasPetrauskasEACoder/videos
- Corpus local por video: `projects/forex/research/rimantas-channel/channel-video-content-map.md`
- Resumo combinado das transcricoes: `projects/forex/research/rimantas-channel/channel-transcript-context-summary.md`
- Contexto sintetico: `projects/forex/research/rimantas-channel/ea-coder-operational-context.md`

## Quando usar

- Ao configurar ou revisar um EA MetaTrader.
- Ao montar presets para MT4/MT5, BTC/CFDs, forex majors, ouro, indices ou prop firm.
- Ao investigar clique de Buy/Sell que nao abre ordem.
- Ao corrigir painel com informacoes amontoadas, erro pouco claro ou configuracao confusa.
- Ao transformar tutorial publico em checklist AIOX sem copiar texto/codigo proprietario.

## Protocolo de operacao

1. Confirmar terminal, broker, simbolo, timeframe e tipo de conta.
2. Identificar o papel do artefato: template visual, painel manual, EA automatico, copier master ou copier client.
3. Conferir permissoes: Algo Trading, propriedades do EA, DLL/WebRequest quando aplicavel e rota de instalacao.
4. Validar inputs criticos: lote, risco, SL/TP, spread, slippage, magic number, filtros de simbolo e modo de ordem.
5. Conferir limites do simbolo: volume minimo, volume maximo, lot step, tick size, tick value, stops level e freeze level.
6. Pedir evidencias de falha: print do painel, `Experts`, `Journal`, parametros e horario do clique.
7. Aplicar correcao pequena e testavel.
8. Rodar demo/Strategy Tester quando possivel e registrar o resultado.

## Checklist de instalacao MetaTrader

- Arquivo `.mq4/.mq5` na pasta correta de `MQL4/Experts` ou `MQL5/Experts`.
- Compilacao sem errors/warnings relevantes.
- Template `.tpl` salvo pela propria plataforma.
- Preset `.set` nomeado por terminal, broker, ativo e cenario.
- EA anexado ao grafico correto, com Auto/Algo Trading ativo.
- Inputs revisados antes do primeiro clique.
- Logs de inicializacao sem erro de permissao, licenca, arquivo ou simbolo.

## Checklist de UX do painel no grafico

- Informacoes essenciais no topo: simbolo, lote, risco, spread e modo.
- Buy/Sell com cores consistentes e preco legivel.
- Alertas com causa, valor atual, limite configurado e proximo passo.
- Painel sem depender de redesenho pesado a cada tick.
- Campos curtos e alinhados para caber em telas menores.
- Controles perigosos com escopo claro: Close All, Delete Pending, OCO, Two Way, trailing e BE.

## Diagnostico de spread

- Confirmar se o ativo e forex classico, ouro, indice, BTC ou CFD.
- Separar `Point`, pip, tick size e digits antes de bloquear ordem.
- Mostrar spread atual e limite na mesma unidade.
- Em BTC/CFDs, permitir `PipSizeOverride` ou regra automatica por tipo de simbolo.
- Permitir `MaxSpreadPips=0` apenas como desativacao consciente do filtro.

## Saida esperada

- Checklist aplicado.
- Diagnostico com causa provavel e evidencias pendentes.
- Patch de EA/template quando necessario.
- Parametros sugeridos e limites de uso.
- Plano de teste em demo e rollback.
