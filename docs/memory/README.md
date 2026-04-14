# 🧠 Sistema Unificado de Memória (The Anchor Protocol)

Este documento é a "Fonte da Verdade" sobre como o SommersStore Elite preserva seu contexto entre sessões de trabalho, evitando alucinações e perda de progresso.

## 🏛️ Governança (SQUAD MEMORY)

A gestão desta memória é operada exclusivamente pelo **SQUAD MEMORY**:
- **@oracle**: Auditor que valida o início de cada sessão via "Flash de Contexto".
- **@scribe**: Cronista que automatiza a gravação do estado operacional.

---

## 🛰️ Workflow de Persistência

### 1. Início da Sessão (Recovery)
Sempre que uma nova conversa for aberta, o **Antigravity** sincroniza com o `@oracle`:
1.  **Leitura**: Varredura de `docs/memory/SESSION_HANDOFF.md` e `docs/memory/PROJECT_STATE.md`.
2.  **Flash de Contexto**: O Agente emite um resumo de:
    - Onde paramos.
    - O que foi validado (Fé Operacional).
    - O objetivo imediato da sessão.
3.  **Sanity Check**: Verificação se algum arquivo crucial foi alterado fora do CLI.

### 2. Durante a Sessão (Sincronia Automática)
O `@scribe` monitora o progresso e dispara o salvamento automático:
- **Trigger**: Ao concluir uma **Story**, um **Marco Técnico** ou ao comando expresso do usuário.
- **Ação**: Atualização do `PROJECT_STATE.md`.

### 3. Fim da Sessão (Handoff)
Ao sinal de encerramento (`git push`, "até amanhã", etc.):
1.  **Commit de Segurança**: `git add -A && git commit -m "chore: EOD Sync"`.
2.  **Snapshot**: Criação do `SESSION_HANDOFF.md` com a lista de pendências para a próxima sessão.

---

## 📂 Arquitetura de Ficheiros

- `docs/memory/PROJECT_STATE.md`: Estado macro do projeto (Agentes ativos, fases concluídas).
- `docs/memory/SESSION_HANDOFF.md`: O "Último Delta" (última coisa feita e a próxima a fazer).
- `docs/memory/LOCKED_ASSETS.md`: Definições que o mestre proibiu a IA de alterar sem ordem expressa.
- `docs/history/checkpoints/`: Versões granulares de momentos críticos.

> [!IMPORTANT]
> **Padrão SommersStore:** Nunca apague arquivos de memória legados sem o aval do `@oracle`. O histórico é a nossa maior defesa contra alucinações.
