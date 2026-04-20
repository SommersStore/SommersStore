# AGENTS.md - Synkra AIOX (Codex CLI)

Este arquivo define as instrucoes do projeto para o Codex CLI.

<!-- AIOX-MANAGED-START: core -->
## Core Rules

1. Siga a Constitution em `.aiox-core/constitution.md`
2. Priorize `CLI First -> Observability Second -> UI Third`
3. Trabalhe por stories em `docs/stories/`
4. Nao invente requisitos fora dos artefatos existentes
<!-- AIOX-MANAGED-END: core -->

<!-- AIOX-MANAGED-START: quality -->
## Quality Gates

- Rode `npm run lint`
- Rode `npm run typecheck`
- Rode `npm test`
- Atualize checklist e file list da story antes de concluir
<!-- AIOX-MANAGED-END: quality -->

<!-- AIOX-MANAGED-START: codebase -->
## Project Map

- Core framework: `.aiox-core/`
- CLI entrypoints: `bin/`
- Shared packages: `packages/`
- Tests: `tests/`
- Docs: `docs/`
<!-- AIOX-MANAGED-END: codebase -->

<!-- AIOX-MANAGED-START: commands -->
## Common Commands

- `npm run sync:ide`
- `npm run sync:ide:check`
- `npm run sync:skills:codex`
- `npm run sync:skills:codex:global` (opcional; neste repo o padrao e local-first)
- `npm run validate:structure`
- `npm run validate:agents`
<!-- AIOX-MANAGED-END: commands -->

<!-- AIOX-MANAGED-START: shortcuts -->
## Agent Shortcuts

Preferencia de ativacao no Codex CLI:
1. Use `/skills` e selecione `aiox-<agent-id>` vindo de `.codex/skills` (ex.: `aiox-architect`)
2. Se preferir, use os atalhos abaixo (`@architect`, `/architect`, etc.)

Interprete os atalhos abaixo carregando o arquivo correspondente em `.aiox-core/development/agents/` (fallback: `.codex/agents/`), renderize o greeting via `generate-greeting.js` e assuma a persona ate `*exit`:

- `@architect`, `/architect`, `/architect.md` -> `.aiox-core/development/agents/architect.md`
- `@dev`, `/dev`, `/dev.md` -> `.aiox-core/development/agents/dev.md`
- `@qa`, `/qa`, `/qa.md` -> `.aiox-core/development/agents/qa.md`
- `@pm`, `/pm`, `/pm.md` -> `.aiox-core/development/agents/pm.md`
- `@po`, `/po`, `/po.md` -> `.aiox-core/development/agents/po.md`
- `@sm`, `/sm`, `/sm.md` -> `.aiox-core/development/agents/sm.md`
- `@analyst`, `/analyst`, `/analyst.md` -> `.aiox-core/development/agents/analyst.md`
- `@devops`, `/devops`, `/devops.md` -> `.aiox-core/development/agents/devops.md`
- `@data-engineer`, `/data-engineer`, `/data-engineer.md` -> `.aiox-core/development/agents/data-engineer.md`
- `@ux-design-expert`, `/ux-design-expert`, `/ux-design-expert.md` -> `.aiox-core/development/agents/ux-design-expert.md`
- `@marketing`, `/marketing`, `/marketing.md` -> `.aiox-core/development/agents/marketing.md`
- `@copywriter`, `/copywriter`, `/copywriter.md` -> `.aiox-core/development/agents/copywriter.md`
- `@squad-creator`, `/squad-creator`, `/squad-creator.md` -> `.aiox-core/development/agents/squad-creator.md`
- `@aiox-master`, `/aiox-master`, `/aiox-master.md` -> `.aiox-core/development/agents/aiox-master.md`
<!-- AIOX-MANAGED-END: shortcuts -->

## 🚨 PROTOCOLO OBRIGATÓRIO DE MEMÓRIA E CONTEXTO (LIFECYCLE)

Para evitar a perda de contexto (amnésia da IA), **todas as instâncias deste assistente** devem obrigatoriamente executar as seguintes rotinas sob supervisão do Squad Memory & Governance (`SQD-MEM`):

### 1. STARTUP ROUTINE (Sempre no inı́cio de uma Nova Conversa)
Assim que uma nova sessão for iniciada com o usuário, ancorar a memória executando silenciosamente o **Protocolo Oracle**:
- Leia (via ferramenta `view_file`) o arquivo `docs/memory/project_memory.md` para entender a meta principal do projeto.
- Inspecione as últimas interações no `docs/control/memory_mutations.json` ou logs para saber onde a última sessão parou.
- Reveja o `task.md` atual para saber quais tarefas ficaram pendentes.
- Aja como o `@oracle`: Garanta que nada saia dos trilhos estipulados nestes documentos centrais ao propor os novos passos ao usuário.

### 2. SHUTDOWN ROUTINE (Sempre ao Encerrar a Conversa / Ao fazer Push)
Quando o usuário informar que a sessão encerrou (ex: "boa noite", "é isso por hoje", "faça os commits/push"), suspenda todas as tarefas e execute obrigatoriamente o **Protocolo Scribe**:
- Assuma a persona `@scribe` e faça um sumário estruturado de tudo o que foi realizado, modificado ou decidido na sessão.
- Insira esse update de estado nos arquivos da aba Memory (ex: atualizando `docs/memory/project_memory.md` ou `phase_memory.md`).
- Atualize a `task.md` marcando o progresso.
- Chame a API ou edite o JSON em `docs/control/memory_mutations.json` registrando a mutação com o resumo da sessão.
- Somente após salvar essa memória física é autorizado dar o "goodbye" final e encerrar.

## CONTINUITY HANDSHAKE (MANDATORY)

To eliminate ambiguity in new conversations, every assistant instance must do the following at the first user turn of a new chat:

1. Execute startup reads before answering:
- `docs/memory/startup_context_latest.md` (if available)
- `docs/memory/project_memory.md`
- `docs/control/session_state.json`
- `docs/control/memory_mutations.json`
- `task.md`

2. Show an explicit startup signal in the first reply, in plain language, containing:
- `checkpoint_base`
- `onde_paramos`
- `proxima_acao_objetiva`
- `resumo_10_dias` (short)
- `fonte` (which files were used)

3. If `startup_context_latest.md` is missing, state fallback mode and continue with the other sources.
