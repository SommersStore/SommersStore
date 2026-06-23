# Conflict Report

**Data:** 2026-05-22  
**Objetivo:** registrar riscos reais antes de reconstruir o Control Hub.

## Conflitos criticos

### 1. Worktree sujo e amplo

O repositorio esta em `master` com muitas alteracoes simultaneas: painel, servidor, memoria, Pajero, testes, sessoes e arquivos novos.

**Risco:** `git add .` criaria um commit grande demais, misturando trabalho funcional, logs e artefatos de sessao.  
**Resposta:** bloquear commit amplo ate classificar arquivos por escopo.

### 2. Multiplas configuracoes de agentes

Existem `.claude`, `.gemini`, `.codex`, `.antigravity`, `.cursor` e arquivos AIOX.

**Risco:** ferramentas diferentes podem aplicar convencoes ou automacoes concorrentes.  
**Resposta:** Codex vira executor principal; outras ferramentas ficam leitura/consulta.

### 3. Dashboard monolitico

`docs/aiox_dashboard.html` concentra muitas abas, estilos e scripts.

**Risco:** pequenas alteracoes podem quebrar areas distantes; dificil modularizar sem regressao.  
**Resposta:** evoluir por testes e envoltorios; nao reescrever tudo de uma vez.

### 4. Dados financeiros em arquivos locais

`projects/financas` e `projects/imposto-de-renda` existem como arquivos de projeto.

**Risco:** dados financeiros reais podem ser versionados sem separacao entre template e informacao sensivel.  
**Resposta:** auditar conteudo antes de expandir automacoes ou enviar ao Git.

### 5. Logs/memoria como parte do worktree

`docs/control` contem sessoes, mutacoes, checkpoints e arquivos de arquivo/archive.

**Risco:** ruido operacional entrar em commits funcionais.  
**Resposta:** commits de memoria devem ser separados de commits de codigo/arquitetura.

## Conflitos medios

### 6. Projetos pessoais misturados na navegacao

Saude e Pajero aparecem no mesmo dashboard que projetos comerciais.

**Risco:** perda de foco no trabalho comercial.  
**Resposta:** tirar da primeira tela comercial, mas manter como projetos adjacentes acessiveis.

### 7. Duplicidade de Financeiro e IR

Financas, Imposto de Renda e planilhas/importacoes aparecem em lugares diferentes.

**Risco:** o usuario nao sabe qual tela e a fonte atual.  
**Resposta:** Finance & Tax deve ser modulo unico com subareas CNPJ, PF e IR.

### 8. Outputs de build versionados

Firebase aponta para `projects/loja-digital/out_deploy`; ha tambem `projects/out_deploy`.

**Risco:** confundir fonte com output publicado.  
**Resposta:** documentar o que e source e o que e build.

## Nao fazer agora

- Nao mover `Pajero` para legacy.
- Nao mover `Saude` para legacy.
- Nao criar app novo React/Next antes de decidir se o dashboard atual sera envolvido ou substituido.
- Nao executar `git add .`.
- Nao rodar deploy.
- Nao apagar configs de outros agentes.

## Proxima acao segura

Criar uma visao de arquitetura do Control Hub comercial, usando os ativos atuais como base e definindo uma trilha de migracao seletiva.
