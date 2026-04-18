# Conversa Antigravity -> Especificacao Funcional Executavel (v1)

## 1. Objetivo

Transformar o material de `conversa_antigravity_literal.md` em uma especificacao clara para implementar um painel operacional unico, com foco em:

- organizacao de 3 projetos iniciais (`Sais`, `Velas`, `Electro`);
- visualizacao de fluxo de construcao por projeto;
- visualizacao de fluxo de vendas por projeto;
- governanca de squads, agentes, skills e clones;
- edicao consistente de entidades via botao `Editar`.

## 2. Fonte Canonica e Escopo

- Fonte principal: `docs/external-specs/conversa_antigravity_literal.md`
- Este documento define requisitos implementaveis sem ambiguidade.
- Tudo que nao estiver explicitamente marcado como `Opcional` deve ser tratado como requisito.

## 3. Requisitos Funcionais (FR)

### FR-001 - Projeto Ativo na Sidebar

O painel deve exibir, na lateral esquerda, os projetos:

- `Sais`
- `Velas`
- `Electro`

Ao clicar em um projeto, o contexto central deve mudar para esse projeto.

### FR-002 - Pagina Unica com Modos de Visualizacao

O painel deve operar em uma unica pagina base, com mudanca de modo sem troca de rota completa.

Modos obrigatorios:

- `Construcao`
- `Vendas`
- `Squads`
- `Agentes`
- `Skills`

### FR-003 - Fluxo de Construcao por Projeto

No modo `Construcao`, cada projeto deve mostrar etapas encadeadas de producao.

Exemplo de referencia (Sais):

`Estrategia -> PDF -> E-book -> Pagina de vendas -> QA/Publicacao`

Cada etapa deve exibir:

- nome da etapa;
- squad responsavel;
- status;
- entrega/resultado esperado;
- botao `Editar`.

### FR-004 - Fluxo de Vendas por Projeto

No modo `Vendas`, cada projeto deve mostrar fluxo comercial ponta a ponta.

Minimo obrigatorio do fluxo:

`Clique no anuncio -> pagina -> checkout -> remarketing`

Cada etapa deve exibir:

- canal/etapa;
- objetivo;
- status;
- owner (squad ou agente);
- botao `Editar`.

### FR-005 - Visao Separada de Squads

No modo `Squads`, cada squad deve exibir:

- nome;
- resumo do que faz;
- resultado que produz;
- para quem entrega;
- agentes vinculados;
- skills vinculadas por agente;
- clones vinculados;
- botao `Editar`.

### FR-006 - Visao Separada de Agentes

No modo `Agentes`, exibir todos os agentes de forma global, independente de squad.

Cada agente deve exibir:

- nome;
- papel;
- squad pai;
- skills vinculadas;
- clones vinculados;
- botao `Editar`.

### FR-007 - Visao Separada de Skills

No modo `Skills`, exibir todas as skills de forma global.

Cada skill deve exibir:

- nome;
- categoria;
- descricao curta;
- agentes que utilizam;
- botao `Editar`.

### FR-008 - Entidade Clone

Clones devem ser entidades proprias e editaveis.

Cada clone deve exibir:

- nome;
- agente pai;
- finalidade;
- botao `Editar`.

### FR-009 - Inspector Lateral Direito

Ao selecionar qualquer entidade/nodo no centro, o painel direito deve mostrar detalhes operacionais e disponibilizar `Editar`.

Campos minimos no inspector:

- nome;
- tipo;
- resumo;
- owner;
- status;
- dependencias (quando houver);
- entrega para (quando houver).

### FR-010 - Consistencia do Botao Editar

O botao `Editar` deve aparecer em squads, agentes, skills, clones e etapas de fluxo, sempre em posicao visual consistente.

## 4. Requisitos Nao Funcionais (NFR)

### NFR-001 - Clareza Visual

Interface deve minimizar sobrecarga cognitiva:

- canvas central limpo;
- informacao curta no nodo;
- detalhes no inspector.

### NFR-002 - Padrao Visual Inspirado em n8n

Nao copiar literal, mas seguir principios:

- sidebar de navegacao;
- canvas de nodos/conexoes;
- painel de detalhes contextual.

### NFR-003 - Escalabilidade de Informacao

A tela unica deve suportar crescimento de entidades sem "tudo aberto ao mesmo tempo", usando modos e foco contextual.

## 5. Constraints (CON)

- CON-001: Implementacao deve seguir principio `CLI First -> Observability -> UI`.
- CON-002: Nao misturar visualmente cadastro estrutural com fluxo operacional no mesmo canvas simultaneo.
- CON-003: Toda entidade principal precisa ser editavel (`Editar`).
- CON-004: Requisitos deste documento devem ser rastreaveis a conversa-fonte.

## 6. Modelo de Dados Minimo

### Projeto

```text
id
nome
objetivo
status
fluxo_construcao[]
fluxo_vendas[]
squads_ids[]
```

### Squad

```text
id
nome
resumo
resultado_produzido
entrega_para
agentes_ids[]
status
```

### Agente

```text
id
nome
papel
squad_id
skills_ids[]
clones_ids[]
status
```

### Skill

```text
id
nome
categoria
descricao
agentes_ids[]
status
```

### Clone

```text
id
nome
agente_id
finalidade
status
```

### NoFluxo

```text
id
projeto_id
modo            # construcao | vendas
nome
owner_id
status
entrega
depende_de_ids[]
```

## 7. Estados e Status

Status recomendados para etapas e entidades operacionais:

- `nao_iniciado`
- `em_preparacao`
- `em_execucao`
- `em_revisao`
- `aprovado`
- `bloqueado`
- `publicado`

## 8. Regras de Interacao

- Clique em projeto troca contexto global.
- Clique em nodo/entidade abre inspector direito.
- Duplo clique pode abrir detalhe aprofundado.
- Busca global (opcional v1.1) pode localizar projeto/squad/agente/skill/clone.
- Filtros persistentes por contexto (opcional v1.1): projeto, status, squad.

## 9. Fora do Escopo do v1 (Opcional)

Itens sugeridos na conversa mas nao obrigatorios para o primeiro corte:

- aba `Metricas`;
- aba `Execucoes/Historico`;
- zoom/pan avancado de canvas;
- auditoria detalhada de mudancas.

## 10. Matriz de Rastreabilidade

- FR-001, FR-002: pedido de "uma unica pagina" + projetos na esquerda.
- FR-003: pedido explicito de fluxo de construcao (PDF, e-book, pagina de vendas).
- FR-004: pedido explicito de fluxo de vendas (anuncio ate remarketing).
- FR-005, FR-006, FR-007: pedido explicito de visualizar squads/agentes/skills em separado.
- FR-008: pedido explicito de clones vinculados e editaveis.
- FR-009: proposta consolidada de painel direito para detalhe contextual.
- FR-010: pedido explicito de botao editar em squad/skill/agente/clone.

## 11. Criterio de Pronto (Definition of Done)

O v1 desta especificacao estara implementado quando:

- todos os FR obrigatorios estiverem navegaveis no painel;
- cada entidade possuir botao `Editar`;
- troca de projeto atualizar contexto sem quebrar modos;
- fluxos de `Construcao` e `Vendas` funcionarem para os 3 projetos iniciais.
