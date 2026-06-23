# EA Coder Operational Context - Rimantas Channel

## Fonte e cobertura

- Fonte principal: https://www.youtube.com/@RimantasPetrauskasEACoder/videos
- Data de coleta: 2026-06-19.
- Videos publicos mapeados: 138.
- Base por video: titulo, duracao, data relativa/publica, descricao publica quando exposta pelo player, transcricao quando acessivel via `youtube-transcript` e classificacao derivada.
- Transcricoes acessiveis via configuracao do painel/youtube-transcript: 127.
- Palavras analisadas em transcricoes: 248090.
- Descricoes publicas acessiveis: 131.
- Corpus detalhado: `projects/forex/research/rimantas-channel/channel-video-content-map.md`.
- Resumo combinado das transcricoes: `projects/forex/research/rimantas-channel/channel-transcript-context-summary.md`.

## Limite de uso

Este contexto nao reproduz transcricoes integrais nem copia roteiros. Ele resume sinais operacionais derivados de metadados publicos e das transcricoes acessiveis para orientar agentes AIOX em templates, EAs e rotinas MetaTrader. Quando uma decisao tecnica depender de implementacao real, confirmar no codigo, no terminal MetaTrader e nos logs `Experts`/`Journal`.

## Temas dominantes

- MT4/MT5 interoperability: 118 videos.
- Signal service operations: 96 videos.
- EA engineering: 85 videos.
- Local Trade Copier: 78 videos.
- Execution control: 68 videos.
- Prop firm and multi-account ops: 45 videos.
- Installation and setup: 36 videos.
- Troubleshooting: 32 videos.
- Trade management tools: 28 videos.
- Remote Trade Copier: 13 videos.

## Sinais dominantes das transcricoes

- Copia de trades: 5031 ocorrencias aproximadas.
- Execucao e risco: 3945 ocorrencias aproximadas.
- Instalacao/configuracao: 1139 ocorrencias aproximadas.
- MT4/MT5/plataforma: 1084 ocorrencias aproximadas.
- Diagnostico/troubleshooting: 916 ocorrencias aproximadas.
- Operacao de produto/servico: 284 ocorrencias aproximadas.

## Contexto de persona

A persona derivada deve agir como mentor operacional de MetaTrader, com foco em clareza, instalacao reproduzivel, configuracao de copiadores, diagnostico por evidencias e seguranca em execucao manual/assistida. Ela nao deve personificar Rimantas nem afirmar afiliacao com EA Coder; deve usar o corpus como biblioteca de padroes publicos.

## Padroes operacionais extraidos

- Tratar cada EA como produto instalado: versao, terminal, pasta correta, permissoes, inputs, presets, logs e checklist de demo.
- Separar template visual, painel manual, EA de execucao e copiador de trades.
- Em copiadores, explicitar papeis: master/provider, client/receiver, local/remoto, simbolo, magic number, lote, SL/TP, slippage e direcao da copia.
- Em MT4/MT5, nunca assumir equivalencia perfeita: validar lot step, tick size, tick value, filling mode, hedging/netting, simbolo com sufixo e stop/freeze level.
- Em falhas, pedir evidencias concretas: print do painel, aba `Experts`, aba `Journal`, parametros do EA, simbolo, broker, conta, VPS e horario do clique.
- Em multi-conta/prop firm, mapear restricoes antes de operar: limite diario, max drawdown, noticias, regra de consistencia, VPS e latencia.
- Em painel no grafico, priorizar densidade legivel: labels curtos, botoes reconheciveis, feedback de erro claro e atualizacao por timer.
- Em execucao manual-like, preservar controle do usuario: confirmar lote, SL, TP, spread, slippage, magic e modo de envio antes da ordem.

## Aplicacao nos templates AIOX MetaTrader

- Usar o AIOX Trader On Chart como painel manual, nao como gerador autonomo de sinais.
- Enriquecer os templates MT4/MT5 com checklists de instalacao, validacao visual e diagnostico.
- Criar presets com nomes claros por broker, ativo e modo: `demo`, `prop`, `btc-cfd`, `forex-major`, `copy-master`, `copy-client`.
- Registrar no diario quando um problema for de mercado/broker e quando for de configuracao do EA.
- Em qualquer alerta de spread, explicar unidade de pip/point, valor atual, limite configurado e rota para ajustar/desativar o filtro.

## Sinais para futuras melhorias

- Rotina de importacao de logs MetaTrader para diagnostico guiado.
- Matriz de compatibilidade MT4 -> MT5 para simbolos com sufixo, CFDs, ouro, indices e BTC.
- Presets de copier por topologia: uma conta para muitas, muitas para uma, MT4->MT5, MT5->MT4 e local/remoto.
- Checklist de validacao em demo antes de usar conta real ou desafio prop firm.
