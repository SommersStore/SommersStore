# Skill Seed - Platform Template Build

## Objetivo

Converter o playbook em configuracoes praticas de MT4, MT5, JForex e ProfitPro.

## Plataformas

### MT4

- gerar checklist de indicadores para H4/H1 Elliott e H1/M15/M5 figuras;
- instruir salvamento de `.tpl`;
- separar template de analise e template de execucao;
- usar `Final_Completo_3.tpl` como referencia visual inicial quando disponivel;
- aplicar prefixos `AIOX_ELLIOTT_`, `AIOX_DOW_H1_`, `AIOX_DOW_M15_`, `AIOX_DOW_M5_`;
- orientar uso do script `AIOX_Forex_Apply_Object_Visibility.mq4`;
- orientar estudo do `Peak.ex4` com `AIOX_Peak_Buffer_Probe.mq4`;
- validar limitacoes da corretora.

### MT5

- gerar layout por timeframe;
- indicar parametros de ATR/RSI/EMAs;
- orientar uso de templates e profiles sem tratar isso como automacao de ordens;
- orientar uso do script `AIOX_Forex_Apply_Object_Visibility.mq5`;
- preparar rotas futuras para MQL5;
- usar o EA `AIOX_Trader_On_Chart.mq5` como painel manual de execucao, nao como gerador de sinais;
- validar ordens por retcode, filling mode e logs `Experts/Journal`.

### JForex

- gerar workspace por ativo;
- mapear indicadores;
- preparar automacao Java apenas depois de estatistica;
- lembrar que templates JForex sao workspaces/layouts proprios, nao `.tpl` MetaTrader.

### ProfitPro

- gerar roteiro de layout visual por timeframe;
- mapear indicadores nativos e equivalentes NTSL;
- tratar coloracao/alerta NTSL como primeira fase antes de execucao;
- documentar que ProfitPro nao importa `.tpl` MetaTrader;
- usar `templates/profitpro-campanha-3por1.md` como ponto de partida.

### MyFXBook

- orientar tracking de MT4/MT5 por fonte oficial;
- reforcar uso de credenciais read-only quando possivel;
- nunca solicitar senha master ao usuario;
- lembrar que JForex nao apareceu na lista oficial de plataformas suportadas pelo MyFXBook na pesquisa de 2026-06-15.

### Corpus Rimantas/EA Coder

- usar `research/rimantas-channel/channel-video-content-map.md` como mapa por video para instalacao, copia, multi-conta e troubleshooting;
- usar `research/rimantas-channel/channel-transcript-context-summary.md` como resumo combinado das transcricoes para contexto de persona/skills;
- usar `research/rimantas-channel/ea-coder-operational-context.md` como contexto sintetico da persona operacional;
- quando template envolver copiador, chamar a skill `metatrader-trade-copier-ops`;
- quando template envolver painel manual, erro de spread, permissoes ou presets, chamar a skill `metatrader-ea-coder-operations`;
- manter o uso como referencia operacional derivada, sem copiar codigo, assets ou textos proprietarios.

### Visual MT4 e Peak

- manter Elliott apenas em H4/H1;
- manter figuras H1 em H1/M15/M5;
- manter figuras M15 em M15/M5;
- manter figuras M5 somente em M5;
- nunca classificar Peak como non-repaint sem log em candle fechado;
- registrar alteracoes historicas por `bar_time`, nao por `shift`.

### Portabilidade cross-platform

- usar o MT4 `Final_Completo_3.tpl` como referencia canonica;
- preservar leitura operacional antes de perseguir copia visual perfeita;
- quando o indicador exato nao existir, registrar equivalente funcional, divergencia e plano de validacao;
- coletar prints H4/H1/M15/M5 para comparar MT4, MT5, JForex e ProfitPro.
