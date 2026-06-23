# Project Classification

**Data:** 2026-05-22  
**Objetivo:** separar dominios antes de qualquer reconstrucao do Control Hub.

## Digital Products

| Caminho | Motivo | Acao recomendada |
| --- | --- | --- |
| `projects/loja-digital` | Next/app/site publico, hub de membros e funil Sais | Preservar; auditar rotas e outputs antes de refatorar |
| `projects/ebook-generator` | Ferramental/editorial para e-books | Preservar como tooling |
| `projects/the-black-protocol` | Conteudo/produto digital | Classificar como produto/conteudo |
| `funnels` | Possivel funil de venda | Auditar e vincular ao Digital Products |
| `artifacts` | Entregaveis e outputs | Classificar por produto antes de mover |
| `docs/control/project_flows.json` projetos `sais` e `velas` | Fluxos comerciais digitais existentes | Migrar seletivamente para o hub comercial |

## Electro Commerce

| Caminho | Motivo | Acao recomendada |
| --- | --- | --- |
| `projects/electro-store` | Projeto de produtos fisicos/e-commerce | Preservar; auditar stack interna |
| `docs/control/project_flows.json` projeto `electro` | Fluxo Electro ja modelado | Usar como base do canvas Electro |
| Trechos Electro em `docs/aiox_dashboard.html` | Mapa visual ja existe | Envolver em hub limpo antes de reescrever |

## Finance & Tax

| Caminho | Motivo | Acao recomendada |
| --- | --- | --- |
| `projects/financas` | Estado financeiro e importacoes | Preservar; auditar dados sensiveis |
| `projects/imposto-de-renda` | Brief, estado e checklist IR | Preservar; integrar como subarea IR |
| `financas` | Pasta raiz pequena ligada ao dominio | Revisar duplicidade com `projects/financas` |
| Aba Financas em `docs/aiox_dashboard.html` | UI operacional ja existe | Manter enquanto modulo novo e definido |
| `scripts/dashboard_server.js` handlers finance_state | Persistencia local existente | Preservar ate nova decisao de storage |

## Projetos adjacentes / pessoais

| Caminho | Motivo | Acao recomendada |
| --- | --- | --- |
| `Pajero` | Projeto tecnico automotivo completo | Manter separado; fora da primeira tela comercial |
| `squads/saude` e projeto `saude` | Projeto pessoal/saude | Manter separado; fora da primeira tela comercial |
| Aba `Pajero Full` e aba `Saude` | Valor operacional pessoal | Nao apagar; apenas separar da visao comercial principal |

## Core AIOX / Operacao

| Caminho | Motivo | Acao recomendada |
| --- | --- | --- |
| `.aiox-core` | Framework, agentes e validadores | Preservar |
| `.codex` | Skills/config local Codex | Preservar com cuidado |
| `docs/control` | Memoria, sessoes, fluxo e logs | Preservar, mas evitar commits amplos sem triagem |
| `docs/stories` | Historico de stories | Preservar |
| `scripts` | Server e automacoes | Preservar |
| `tests` | Gates de qualidade | Preservar e expandir |

## Deprecated / Unknown / Revisar

| Caminho | Motivo | Acao recomendada |
| --- | --- | --- |
| `scratch_fix_*.js`, `temp.js` | Scripts temporarios na raiz | Revisar antes de arquivar |
| `archive` | Arquivos historicos | Classificar antes de usar |
| `tmp` | Screenshots e outputs temporarios | Nao usar como fonte de verdade |
| `.claude`, `.gemini`, `.cursor` | Configs de outros agentes | Manter leitura, bloquear execucao concorrente |

## Regra de migracao

Nenhum item deve ser movido para `/legacy` por atacado. A classificacao deve ser validada por escopo e por story.
