# Projeto Forex / IBKR Manual Desk

## Fase atual: inteligência local e paper

O painel prioriza Interactive Brokers, operações manuais e conta paper. A aba **Inteligência & paper** só apresenta dados quando uma ponte local, configurada pelo próprio operador, estiver ligada e autenticada fora do painel. Ela não pede nem guarda credenciais e não transmite ordens.

- Configuração segura: `data/ibkr_integration.json`
- Rascunhos locais: `data/ibkr_paper_tickets.json`
- Contrato técnico: `integrations/ibkr-local-bridge-contract.md`

O score de contratos é uma triagem explicável por prazo, spread e prêmio relativo — não é recomendação, “melhor opção” ou garantia de preço. O clique final, inclusive em paper, continua acontecendo na plataforma da IBKR.

Painel de estudo e disciplina para a campanha 3x1 e para proteção de ações por opções. A Interactive Brokers é o foco de operação manual; Dukascopy, MetaTrader e JForex ficam como laboratório secundário de pesquisa e material histórico.

## Missão atual

Começar pequeno, visível e manual:

- uma campanha 3x1 por vez, com risco de 1%, 2% e 4% somente após vitória anterior e com novo setup;
- alvo de 1,5R em cada operação, com reset na primeira perda;
- posições patrimoniais em ações/ETFs separadas da campanha, com estudo de protective put antes de qualquer combinação;
- IBKR Desktop como jornada inicial; TWS apenas quando uma cadeia ou combinação de opções for necessária;
- conta paper, diário e simulações antes de qualquer automação.

## Matemática da campanha 3x1

| Resultado | Resultado líquido antes de custos |
| --- | ---: |
| Stop no nível 1 | -1,0% |
| Vitória no nível 1, stop no nível 2 | -0,5% |
| Vitórias nos níveis 1 e 2, stop no nível 3 | +0,5% |
| Três alvos atingidos | +10,5% |

Os níveis são sequenciais: uma perda encerra a campanha. Portanto, 7% é a soma abstrata dos riscos nominais, não uma perda realizável dentro de uma campanha. Ainda assim, a terceira ordem expõe 4% e pode devolver quatro pontos percentuais do pico da campanha.

## Proteção com opções

Uma put protetiva não substitui automaticamente um stop. Ela custa prêmio, vence, depende de liquidez e protege apenas abaixo do strike. Em opções de ações dos EUA, o multiplicador usual é 100 ações por contrato; com conta inicial de US$ 500, uma posição de 100 ações mais prêmio frequentemente não caberá. Os simuladores continuam didáticos; dados de mercado só aparecem se uma ponte local opcional estiver configurada, e o painel nunca envia ordens.

## Guardrails

- Nenhuma simulação é recomendação de investimento, tributária ou de adequação.
- Não compartilhar senha, token, extrato ou credencial de corretora com IA, painel ou terceiros.
- Confirmar instrumento, contrato, multiplicador, permissões, custos e tributação antes de qualquer operação real.
- Opções e ativos alavancados podem gerar perdas relevantes; o painel existe para tornar limitações visíveis, não para prometer resultado.

## Artefatos

- `brief.md` - premissas do desk manual IBKR e materiais legados de pesquisa.
- `strategy/campanha-3por1-playbook.md` - playbook atual da campanha 3x1 e da proteção por opções.
- `templates/mt4-campanha-3por1.md` - configuracao visual MT4.
- `templates/mt5-campanha-3por1.md` - configuracao visual MT5.
- `templates/jforex-campanha-3por1.md` - workspace JForex/Dukascopy.
- `templates/profitpro-campanha-3por1.md` - template inicial ProfitPro/NTSL por equivalencia funcional.
- `templates/timeframe-visibility-map.md` - mapa de visibilidade Elliott/Dow por timeframe.
- `research/mt4-final-completo-3-template-analysis.md` - analise do template MT4 real.
- `research/peak-indicator-study.md` - estudo e protocolo de avaliacao do Peak.
- `research/trader-on-chart-reference.md` - referencia funcional publica para o EA/painel AIOX Trader On Chart.
- `research/mql5-jforex-profitpro-engineering-sources.md` - fontes oficiais e notas de engenharia MQL5/JForex/ProfitPro.
- `research/myfxbook-metatrader-verification.md` - fontes e roteiro MyFXBook.
- `research/rimantas-channel/channel-video-content-map.md` - mapa video a video do canal Rimantas/EA Coder com classificacao derivada.
- `research/rimantas-channel/channel-transcript-context-summary.md` - resumo combinado das 127 transcricoes acessiveis via painel/youtube-transcript.
- `research/rimantas-channel/ea-coder-operational-context.md` - contexto operacional sintetico para persona e skills MetaTrader.
- `skills/mql5-expert-advisor-engineering.md` - skill de engenharia para EAs MQL5.
- `skills/cross-platform-template-porting.md` - skill de portabilidade MT4 -> MT5/JForex/ProfitPro.
- `skills/metatrader-ea-coder-operations.md` - skill de operacoes EA-Coder/MetaTrader para instalacao, painel e diagnostico.
- `skills/metatrader-trade-copier-ops.md` - skill de topologia e diagnostico de copiadores MT4/MT5.
- `personas/forex-mql5-expert-engineer.md` - persona de engenharia MQL5.
- `personas/forex-cross-platform-template-engineer.md` - persona de portabilidade visual cross-platform.
- `personas/forex-ea-coder-operations-mentor.md` - persona de operacoes MetaTrader baseada no corpus Rimantas/EA Coder.
- `tools/mt4/AIOX_Forex_Apply_Object_Visibility.mq4` - script MT4 para visibilidade por prefixo.
- `tools/mt4/AIOX_Peak_Buffer_Probe.mq4` - EA MT4 para auditar buffers do Peak.
- `tools/mt4/AIOX_Trader_On_Chart.mq4` - EA MT4 v1.32 de execucao manual no grafico, layout ampliado estilo TOC, pip automatico para BTC/CFDs, risco, modos de pendente, straddle/Two Way, OCO, Smart BE e trailing.
- `tools/mt5/AIOX_Forex_Apply_Object_Visibility.mq5` - script MT5 para visibilidade por prefixo.
- `tools/mt5/AIOX_Trader_On_Chart.mq5` - EA MT5 v1.32 de execucao manual no grafico, layout ampliado estilo TOC, pip automatico para BTC/CFDs, risco, modos de pendente, straddle/Two Way, OCO, Smart BE e trailing.
- `config/agent_skill_persona_map.json` - mapa editavel de agentes, skills e clones/personas.
- `data/forex_control.json` - seed operacional consumivel pelo painel.
