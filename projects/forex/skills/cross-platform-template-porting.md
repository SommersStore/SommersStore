# Skill - Cross Platform Template Porting

## Objetivo

Portar o setup visual MT4 canonico para MT5, JForex e ProfitPro por equivalencia funcional, sem assumir que um `.tpl` MetaTrader pode ser importado diretamente por outras plataformas.

## Fonte visual canonica

- Template MT4 real: `Final_Completo_3.tpl`
- Analise local: `projects/forex/research/mt4-final-completo-3-template-analysis.md`
- Mapa de visibilidade: `projects/forex/templates/timeframe-visibility-map.md`
- Setup operacional: `projects/forex/strategy/campanha-3por1-playbook.md`

## Regra de traducao

- Primeiro preservar a leitura operacional; depois buscar semelhanca estetica.
- Elliott fica em H4/H1.
- Figuras/Dow H1 aparecem em H1/M15/M5.
- Figuras/Dow M15 aparecem em M15/M5.
- Figuras/Dow M5 aparecem somente em M5.
- Peak/Fisher/RSI/volumes devem ser tratados como equivalentes funcionais quando o indicador exato nao existir na plataforma destino.

## MT5

- Usar templates/profiles proprios do MT5.
- Recriar indicadores nativos primeiro: EMAs, ATR, RSI, volumes, sessoes e objetos.
- Migrar indicadores customizados apenas quando existir `.mq4` ou logica replicavel; `.ex4` fechado exige alternativa funcional.
- Validar visual em H4, H1, M15 e M5 com screenshots.

## JForex / Dukascopy

- Usar workspace e templates do JForex, nao `.tpl`.
- Mapear indicadores por nome nativo e parametros equivalentes.
- Para estrategias Java, lembrar que `IEngine.submitOrder` usa amount em milhoes, slippage em pips e labels unicos.
- Comecar por workspace visual; automatizacao vem depois de validar manualmente.

## ProfitPro / Nelogica

- Usar layout/workspace do ProfitPro e NTSL quando necessario.
- Criar primeiro coloracao/indicador/alerta NTSL, depois execucao.
- Priorizar equivalentes: medias, ATR, volume, IFR/RSI, coloracao por tendencia, sessoes e objetos manuais.
- Registrar o que e nativo, o que e aproximado e o que precisa de indicador custom.

## Artefatos minimos por plataforma

- Print do MT4 canonico por timeframe.
- Lista de indicadores com parametros.
- Tabela de equivalencias.
- Template/workspace salvo na plataforma.
- Checklist de divergencias aceitas.
- Plano de validacao em demo.
