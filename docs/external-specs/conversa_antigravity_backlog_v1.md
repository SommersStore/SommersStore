# Backlog Inicial - Painel Antigravity (derivado da conversa literal)

## Visao Geral

Backlog orientado por entregas incrementais para implementar o painel em uma unica pagina com modos e governanca de entidades.

## Fase 1 - Fundacao da Tela Unica (MVP)

### BL-001 (P0) - Layout Base do Painel

- Objetivo: montar estrutura fixa `sidebar + topo modos + canvas + inspector`.
- Dependencias: nenhuma.
- Criterio de aceite:
  - sidebar com `Sais`, `Velas`, `Electro`;
  - modos `Construcao`, `Vendas`, `Squads`, `Agentes`, `Skills`;
  - area direita de inspector presente.

### BL-002 (P0) - Contexto Global de Projeto Ativo

- Objetivo: trocar contexto ao clicar no projeto.
- Dependencias: BL-001.
- Criterio de aceite:
  - projeto selecionado atualiza titulo/contexto;
  - canvas renderiza dados do projeto ativo.

### BL-003 (P0) - Componente Padrao de Botao Editar

- Objetivo: garantir consistencia visual e funcional do `Editar`.
- Dependencias: BL-001.
- Criterio de aceite:
  - `Editar` presente em todas entidades obrigatorias;
  - mesma posicao visual em cards/nodos.

## Fase 2 - Operacao por Projeto

### BL-004 (P0) - Modo Construcao

- Objetivo: renderizar fluxo de producao por projeto.
- Dependencias: BL-002.
- Criterio de aceite:
  - cada nodo mostra etapa, owner, status, entrega e `Editar`;
  - fluxo funcional para `Sais`, `Velas`, `Electro`.

### BL-005 (P0) - Modo Vendas

- Objetivo: renderizar fluxo comercial por projeto.
- Dependencias: BL-002.
- Criterio de aceite:
  - fluxo inclui anuncio/clique/pagina/checkout/remarketing;
  - cada nodo com owner, status, objetivo e `Editar`.

## Fase 3 - Estrutura Organizacional

### BL-006 (P0) - Modo Squads

- Objetivo: exibir squads e seus relacionamentos.
- Dependencias: BL-003.
- Criterio de aceite:
  - card de squad com resumo, produz, entrega para;
  - lista de agentes, skills e clones associados;
  - `Editar` no squad.

### BL-007 (P0) - Modo Agentes

- Objetivo: catalogo global de agentes.
- Dependencias: BL-006.
- Criterio de aceite:
  - cada agente mostra papel, squad pai, skills, clones;
  - `Editar` por agente.

### BL-008 (P0) - Modo Skills

- Objetivo: catalogo global de skills.
- Dependencias: BL-007.
- Criterio de aceite:
  - skill com nome, categoria, descricao e agentes que usam;
  - `Editar` por skill.

### BL-009 (P1) - Entidade Clone

- Objetivo: tratar clone como entidade de primeira classe.
- Dependencias: BL-006 e BL-007.
- Criterio de aceite:
  - clone com agente pai/finalidade/status;
  - `Editar` por clone.

## Fase 4 - Dados e Persistencia

### BL-010 (P0) - Schema de Dados Minimo

- Objetivo: consolidar schema de Projeto/Squad/Agente/Skill/Clone/NoFluxo.
- Dependencias: BL-004 ate BL-009.
- Criterio de aceite:
  - schema unico usado pelos modos;
  - chaves de relacionamento estaveis (`id`).

### BL-011 (P1) - Estado de UI e Filtros Basicos

- Objetivo: manter modo atual, projeto ativo e item selecionado.
- Dependencias: BL-010.
- Criterio de aceite:
  - mudanca de modo preserva contexto;
  - inspector acompanha item selecionado.

## Fase 5 - Evolucao Recomendada (pos-MVP)

### BL-012 (P2) - Metricas por Projeto

- Objetivo: adicionar indicadores de producao e vendas.
- Dependencias: MVP completo.

### BL-013 (P2) - Execucoes/Historico

- Objetivo: observabilidade de eventos e mudancas.
- Dependencias: MVP completo.

### BL-014 (P2) - Busca Global

- Objetivo: localizar entidades por nome/tipo.
- Dependencias: BL-010.

## Roadmap de Stories Sugerido

1. Story 1.6: consolidar especificacao e backlog canonicos.
2. Story 1.7: implementar fundacao da tela unica (BL-001 a BL-003).
3. Story 1.8: implementar modos Construcao e Vendas (BL-004 e BL-005).
4. Story 1.9: implementar modos Squads/Agentes/Skills/Clones (BL-006 a BL-009).
5. Story 2.0: schema, estado e acabamento MVP (BL-010 e BL-011).
