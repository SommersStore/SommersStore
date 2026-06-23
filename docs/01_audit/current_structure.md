# Current Structure Audit

**Data:** 2026-05-22  
**Escopo:** leitura inicial do repositorio `SommersStore` para orientar a reconstrucao conservadora do Control Hub.

## Estado Git

- Branch atual: `master`.
- Worktree: sujo, com alteracoes rastreadas e arquivos novos.
- Conclusao: nao executar `git add .`, tag ou branch de reconstrucao antes de classificar o estado atual.

## Stack raiz

- Runtime principal: Node.js / CommonJS.
- Scripts principais em `package.json`:
  - `npm start` -> `scripts/dashboard_server.js`
  - `npm run lint` -> `scripts/quality/lint.cjs`
  - `npm run typecheck` -> `scripts/quality/typecheck.cjs`
  - `npm test` -> `tests/quality/master_hub.test.cjs`
- Firebase Hosting publica `projects/loja-digital/out_deploy`.
- Dashboard operacional atual: `docs/aiox_dashboard.html`.
- Backend local do painel: `scripts/dashboard_server.js`.

## Diretorios principais observados

| Diretorio | Papel observado | Risco/observacao |
| --- | --- | --- |
| `.aiox-core` | Framework AIOX, agentes, sync, validadores | Core do sistema; nao mexer sem story propria |
| `docs` | Dashboard, memoria, controle, stories e docs | Muito grande; mistura runtime de memoria e documentacao |
| `projects` | Projetos de loja, financas, IR, Electro e outputs | Deve ser classificado antes de migrar |
| `Pajero` | Projeto tecnico separado, ja bem estruturado | Projeto adjacente, nao apagar/mover agora |
| `scripts` | Server e automacoes do painel | Critico para `localhost:4000` |
| `tests` | Gates de qualidade do Master Hub | Devem acompanhar qualquer alteracao |
| `knowledge`, `squads` | Clones/personas/squads | Relevante para AIOX, mas precisa classificacao |
| `.claude`, `.gemini`, `.codex`, `.antigravity` | Configuracoes de ferramentas/agentes | Fonte de possivel conflito operacional |
| `tmp` | Screenshots/testes temporarios | Nao deve virar insumo de arquitetura |

## Projetos em `projects`

| Projeto | Arquivos aproximados | Classificacao inicial |
| --- | ---: | --- |
| `loja-digital` | 1154 | Digital Products / area de membros / site publico |
| `electro-store` | 1128 | Electro Commerce |
| `financas` | 11 | Finance & Tax |
| `imposto-de-renda` | 5 | Finance & Tax / IR |
| `ebook-generator` | 8 | Digital Products / tooling |
| `the-black-protocol` | 2 | Digital Products / conteudo |
| `out_deploy` | 464 | Output/build; revisar antes de versionar/migrar |

## Recursos reais confirmados

- `docs/aiox_dashboard.html` ja contem:
  - Master/Memory/Funnel/Projeto/Mapa.
  - Aba `Financas`.
  - Aba `Saude`.
  - Aba `Pajero Full`.
  - Mapas Sais/Electro.
  - Subfluxos e UI de IR dentro de Financas.
- `tests/quality/master_hub.test.cjs` ja cobre partes de Financas, Pajero Full e navegacao do dashboard.
- `scripts/dashboard_server.js` tem endpoints/handlers para `projects/financas/data/finance_state.json`.

## Ausencias antes desta auditoria

- `docs/00_governance` nao existia.
- `docs/01_audit` nao existia.
- Nao havia politica operacional formal separando Codex, Antigravity, GenSpark, Gemini e Claude Code.

## Conclusao

O repositorio nao esta vazio nem quebrado a ponto de justificar substituicao cega. A melhor rota e criar uma camada de Control Hub mais clara sobre os ativos existentes, mantendo o painel atual vivo ate que cada migracao seja aprovada.
