# Agent Policy - Antigravity + Codex

**Data:** 2026-05-22  
**Status:** Ativa para a reconstrucao conservadora do Control Hub.

## Principio

O projeto passa a operar com uma regra simples:

```text
Antigravity organiza o ambiente.
Codex executa o trabalho tecnico.
Git registra a verdade historica.
Firebase hospeda a experiencia publica.
```

## Autoridade de execucao

| Ferramenta | Papel | Pode editar? |
| --- | --- | --- |
| Codex | Executor tecnico principal: auditoria, docs, codigo, testes e preparacao de commits | Sim |
| Antigravity | Ambiente de trabalho, navegacao, revisao humana e terminal manual | Sim, apenas pelo usuario |
| GitHub | Historico, backup, branches e revisao | Nao diretamente pelo agente sem @devops |
| Firebase | Hosting/runtime da loja e area de membros | Apenas via fluxo aprovado |
| Gemini / Claude Code | Consulta externa ou leitura | Nao no mesmo worktree |
| GenSpark | Fora do fluxo principal | Nao |

## Terminal

- Comando que altera arquivos, instala dependencias, roda build ou executa deploy: Codex.
- Comando de inspecao manual simples: Antigravity pode ser usado pelo usuario.
- Comando destrutivo, reset, checkout de arquivo, limpeza em massa ou move/delete recursivo: somente com decisao explicita e registrada.

## Git

- Nao usar `git add .` enquanto o worktree tiver arquivos de sessao, memoria, outputs e mudancas nao classificadas.
- Antes de commit de backup, gerar uma lista de arquivos por escopo.
- Push, PR, release e tag remota continuam restritos ao fluxo @devops.
- Commits devem ser pequenos por escopo: governanca, auditoria, dashboard, finance, pajero, loja, memoria.

## Dados sensiveis

- Nao versionar comprovantes, extratos, chaves, documentos fiscais reais ou dados financeiros detalhados sem decisao explicita.
- `.env` deve permanecer ignorado pelo Git.
- O modulo financeiro deve distinguir estrutura/template de dados reais.

## Regra para reconstrucao

Reconstruir por envoltorio, nao por substituicao cega:

1. Auditar.
2. Classificar.
3. Criar visao limpa.
4. Migrar seletivamente.
5. So entao arquivar ou remover legado.

Pajero, Saude e outros projetos pessoais podem continuar existindo como projetos adjacentes, mas nao devem ocupar o fluxo comercial principal.
