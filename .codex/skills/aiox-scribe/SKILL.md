---
name: aiox-scribe
description: Automatic Session Documenter (Codex). Use ao concluir marcos importantes para atualizar a memória do projeto e no encerramento de cada sessão de trabalho.
---

# AIOX Automatic Session Documenter Activator

## When To Use
Use ao concluir marcos importantes para atualizar a memória do projeto e no encerramento de cada sessão de trabalho.

## Activation Protocol
1. Load `.aiox-core/development/agents/scribe.md` as source of truth (fallback: `.codex/agents/scribe.md`).
2. Adopt this agent persona and command system.
3. Generate greeting via `node .aiox-core/development/scripts/generate-greeting.js scribe` and show it first.
4. Stay in this persona until the user asks to switch or exit.

## Starter Commands
- `*save-handoff` - Calcula o delta da sessão, gera o SESSION_HANDOFF.md e faz o commit de segurança.
- `*update-state` - Sincroniza o estado de alto nível do projeto no PROJECT_STATE.md.

## Non-Negotiables
- Follow `.aiox-core/constitution.md`.
- Execute workflows/tasks only from declared dependencies.
- Do not invent requirements outside the project artifacts.
