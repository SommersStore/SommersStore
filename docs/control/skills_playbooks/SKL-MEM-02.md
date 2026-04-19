# Skill: Context Recovery

## Objetivo
Recuperar continuidade quando houver troca de conversa, reinicio de maquina ou interrupcao.

## Entradas
- `docs/control/session_state.json`
- `docs/control/memory_current_state.json`
- `docs/control/memory_open_loops.json`

## Saidas
- Estado retomado sem perda
- Lista de loops abertos relevantes

## Checklist
- Validar sessao ativa/ultima sessao
- Reconciliar estado atual com loops
- Sinalizar divergencias
