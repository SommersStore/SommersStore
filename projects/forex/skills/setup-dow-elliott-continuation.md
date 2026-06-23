# Skill - Elliott First Continuation Setup

## Objetivo

Classificar setups de continuacao para a Campanha 3 por 1 usando a ordem correta:

1. Elliott H4 define tendencia macro.
2. Elliott H1 confirma tendencia/zona.
3. Figuras de Dow/graficas em H1 refinam estrutura.
4. Figuras M15 validam gatilho.
5. Microfigura M5 valida entrada.

## Entrada esperada

- ativo;
- direcao pretendida;
- leitura Elliott H4;
- leitura Elliott H1;
- figura H1;
- figura M15;
- confirmacao/microfigura M5;
- contexto de horario/noticia;
- spread, stop, ATR e alvo 1.6R;
- nivel atual da campanha.

## Checklist de score

| Criterio | Peso |
| --- | ---: |
| H4 tem contagem Elliott direcional | 1 |
| H1 confirma onda 2/4 ou continuidade aceitavel | 1 |
| H1 tem estrutura/figura alinhada com Elliott | 1 |
| M15 tem figura de continuacao limpa | 1 |
| M5 confirma microestrutura e candle de forca | 1 |
| Stop tecnico <= 1.5 ATR M15 | 1 |
| Alvo 1.6R livre antes da barreira | 1 |
| Spread/custo normal | 1 |
| Sem noticia forte nas proximas 2h | 1 |
| Janela Londres/NY ou liquidez equivalente | 1 |

## Saida esperada

- classe A+, B ou C;
- score de 0 a 10;
- nivel maximo permitido;
- motivos de aprovacao ou bloqueio;
- invalidacao tecnica;
- observacoes para backtest.

## Regras

- Setup B nao entra na campanha 1-2-4.
- O M5 nunca contraria H4/H1; ele apenas refina entrada.
- Figura de reversao so pode bloquear ou pedir estudo separado, nao liberar campanha.
- Se Elliott H4/H1 estiver confuso, classificar como C.
- Objetos Elliott usam prefixo `AIOX_ELLIOTT_` e aparecem apenas em H4/H1.
- Figuras H1 usam `AIOX_DOW_H1_` e aparecem em H1/M15/M5.
- Figuras M15 usam `AIOX_DOW_M15_` e aparecem em M15/M5.
- Figuras M5 usam `AIOX_DOW_M5_` e aparecem apenas em M5.
