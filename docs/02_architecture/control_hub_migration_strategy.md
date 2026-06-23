# Control Hub Migration Strategy

**Data:** 2026-05-22  
**Status:** Proposta arquitetural inicial baseada na auditoria real do repositorio.

## Direcao

O Control Hub deve ser uma camada de clareza sobre o ecossistema atual, nao uma substituicao abrupta.

```text
Control Hub Comercial
  -> Produtos Digitais
  -> Electro Commerce
  -> Financeiro & IR

Projetos Adjacentemente Acessiveis
  -> Pajero
  -> Saude
  -> Outros pessoais
```

## Arquitetura atual preservada

| Componente | Papel atual | Direcao |
| --- | --- | --- |
| `docs/aiox_dashboard.html` | Dashboard operacional AIOX | Preservar e envolver |
| `scripts/dashboard_server.js` | Server local e APIs do painel | Preservar |
| `tests/quality/master_hub.test.cjs` | Gate do dashboard | Expandir |
| `docs/control/project_flows.json` | Fluxos de projetos | Usar como fonte inicial |
| `projects/loja-digital` | Site/hub publicado | Preservar como produto real |
| `projects/electro-store` | Projeto Electro | Preservar |
| `projects/financas` e `projects/imposto-de-renda` | Finance/IR | Unificar conceitualmente |
| `Pajero` | Projeto tecnico automotivo | Manter adjacente |

## Modelo de navegação alvo

1. Primeira tela: comercial e financeiro.
2. Secao lateral: projetos adjacentes.
3. Cada modulo abre um canvas visual.
4. Cada no abre detalhe, arquivos, checklist, status e proxima acao.
5. Dados sensiveis ficam separados de templates e exemplos.

## Regras de implementacao

- Nao iniciar com dependencia nova se o HTML atual conseguir provar o fluxo.
- Nao migrar para React/XYFlow antes de validar UX, dados e fronteiras.
- Nao mover arquivos para legacy sem mapa de origem/destino.
- Nao apagar abas existentes ate nova camada cobrir o caso de uso.
- Cada mudanca visual deve ter teste em `tests/quality/master_hub.test.cjs` ou teste equivalente.

## Candidato de data model conceitual

```text
hub_modules
  id
  label
  domain: digital | electro | finance_tax | adjacent
  status
  priority

hub_nodes
  id
  module_id
  label
  status
  progress
  files[]
  checklist[]
  blockers[]
  updated_at

hub_assets
  id
  module_id
  node_id
  path
  kind
  sensitivity
  source_status
```

## Primeira entrega tecnica recomendada

Criar uma aba/visao "Control Hub Comercial" que mostre apenas:

- Produtos Digitais;
- Electro Commerce;
- Financeiro & IR;
- links secundarios para Pajero e Saude.

Essa entrega deve reaproveitar `project_flows.json`, sem duplicar dados em um novo banco.

## Navegacao consolidada

A proposta detalhada de navegacao esta em [`navigation_consolidation_proposal.md`](navigation_consolidation_proposal.md).

Resumo:

- sidebar primaria: `Master`, `E-books`, `Site / Produtos`, `Financas`;
- `Mapa` deve ser absorvido por `Construcao` como canvas tipo N8N;
- `Financas` e `Imposto de Renda` devem virar uma unica experiencia Finance & Tax;
- `Pajero Full` e `Saude` devem virar projetos adjacentes no Master;
- `Memory`, `Salvar Tudo`, `Pasta Conectada`, `Squads` e `Clones` devem ser preservados em area tecnica/sistema.
