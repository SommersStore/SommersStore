# 🤖 Memória da Sessão de Agentes (Agent Session Memory)

## Alocação do Squad Atual
Temos 27 agentes mapeados. O fluxo operacional é guiado pela orquestração do `Orion` (@aiox-master).

## Delegações Recentes Ocorridas:
1. **Limpeza de Duplicidades:** Foram identificados 6 agentes com nomes e funções duplicadas (ex: @copy-specialist x @copywriter). Eles foram movidos e reclassificados na aba **LEGACY & EXTRA (SQD-LGC)** para não sujarem o fluxo atual.
2. **Nascimento do Squad de Governança (`SQD-MEM`):** 
   - **Agentes Atribuídos:** `@oracle` (Guardião do Contexto) e `@scribe` (Cronista de Preservação).
   - **Função Mandatória:** Injetado protocolo no `AGENTS.md` exigindo que todas as assistências baseadas na extensão/Codex iniciem lendo esses documentos de memória (`docs/memory/`) e desativem a máquina registrando atualizações antes de dar commit.

Essa memória garante que nenhum modelo de IA futuro invente novos agentes sem antes consultar as regras estabelecidas no `registry.json` pelo `@squad-creator`.
