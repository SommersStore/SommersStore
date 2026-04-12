# 🏛️ SommersStore — Mapa Completo da Arquitetura

> **Gerado em:** 11 de Abril de 2026
> **Projeto:** SommersStore Elite — Ecossistema AIOX
> **Root:** `c:\Users\ADMIN\.gemini\antigravity\scratch\SommersStore\`

---

## 📋 Índice Rápido

| Seção | Descrição | Localização |
|---|---|---|
| **AIOX Core** | Framework de agentes, tasks, skills | `.aiox-core/` |
| **Agentes (Multi-IDE)** | Definições sincronizadas para 4 IDEs | `.codex/`, `.cursor/`, `.gemini/`, `.github/` |
| **Documentação** | Brandbooks, Dashboards, Blueprints | `docs/` |
| **Knowledge Base** | Clones, Branding, Marketing, Prompts | `knowledge/` |
| **Loja Digital** | App Next.js (E-books, Login, Hub) | `projects/loja-digital/` |
| **Scripts** | Servidor do Painel, automações | `scripts/` |
| **Squads** | Definições YAML dos 6 squads | `squads/` |

---

## 1. 🔩 RAIZ DO PROJETO

```
📁 SommersStore/
├── 📄 AGENTS.md (2.9KB)               — Instruções-mestre para todos os agentes
├── 📄 MASTER_BLUEPRINT.md (3.4KB)      — Blueprint geral do ecossistema
├── 📄 SOUL_SNAPSHOT_PROJECT_SAIS.md    — Estado-alma do projeto Sais
├── 📄 core-config.yaml (2.7KB)         — Configuração central do AIOX
├── 📄 .aiox-ai-config.yaml (1.6KB)     — Config de IA
├── 📄 .env (3.4KB)                     — Variáveis de ambiente (Firebase, APIs)
├── 📄 .env.example (2.9KB)             — Template de variáveis
├── 📄 firebase.json (1.2KB)            — Configuração Firebase Hosting
├── 📄 .firebaserc (0.1KB)              — Projeto Firebase vinculado
├── 📄 package.json (0.5KB)             — Dependências raiz
├── 📄 start_painel.bat (0.4KB)         — Script para iniciar o Dashboard
├── 📄 Painel AIOX.vbs (0.3KB)          — Atalho VBS do Painel
├── 📄 Ligar Loja Local.vbs (0.2KB)     — Atalho VBS da Loja
├── 📄 disaster_recovery_strategy.md    — Plano de recuperação de desastres
└── 📄 elite-sales-pages-content.json   — Conteúdo das páginas de venda
```

---

## 2. 🧠 `.aiox-core/` — Framework AIOX (Cérebro do Sistema)

### 2.1 Agentes de Desenvolvimento
```
📁 .aiox-core/development/agents/
├── 📄 aiox-master.md (19.5KB)          — @master (Orion) — Governança Global
├── 📄 architect.md (20.6KB)            — @architect (Atlas) — Arquitetura
├── 📄 dev.md (24.5KB)                  — @dev (Kael) — Engenharia
├── 📄 qa.md (19KB)                     — @qa (Quinn) — Qualidade
├── 📄 pm.md (16.7KB)                   — @pm (Morgan) — Gestão de Projeto
├── 📄 po.md (14.4KB)                   — @po (Sage) — Product Owner
├── 📄 sm.md (12.7KB)                   — @sm (Dash) — Scrum Master
├── 📄 analyst.md (11.8KB)              — @analyst (Nova) — Análise
├── 📄 devops.md (22.9KB)               — @devops (Gage) — Infraestrutura
├── 📄 data-engineer.md (21.9KB)        — @data-engineer (Cipher) — Dados
├── 📄 squad-creator.md (14KB)          — @squad-creator — Criação de Squads
├── 📄 ux-design-expert.md (20.1KB)     — @ux-design-expert — UX/UI
├── 📄 marketing.md                     — @marketing — Campanhas
└── 📄 copywriter.md                    — @copywriter — Redação Persuasiva
```

### 2.2 Tasks (Biblioteca de Tarefas — 120+ tasks)
```
📁 .aiox-core/development/tasks/
├── 📁 blocks/                          — Blocos reutilizáveis de tasks
│   ├── 📄 agent-prompt-template.md
│   ├── 📄 context-loading.md
│   ├── 📄 execution-pattern.md
│   ├── 📄 finalization.md
│   └── 📄 README.md
├── 📄 create-agent.md (32.7KB)         — Criar novo agente
├── 📄 create-next-story.md (30.6KB)    — Criar próxima story
├── 📄 dev-develop-story.md (27.6KB)    — Desenvolver story
├── 📄 environment-bootstrap.md (45.9KB)— Bootstrap de ambiente
├── 📄 collaborative-edit.md (32.6KB)   — Edição colaborativa
├── 📄 learn-patterns.md (27.1KB)       — Aprender padrões
├── 📄 architect-analyze-impact.md      — Análise de impacto
├── 📄 qa-gate.md (10.9KB)              — Gate de qualidade
├── 📄 health-check.yaml (8.1KB)        — Checagem de saúde
├── 📄 ci-cd-configuration.md (21.1KB)  — Config CI/CD
├── 📄 plan-create-implementation.md    — Plano de implementação
├── 📄 db-*.md (20+ tasks)             — Tasks de banco de dados
├── 📄 po-*.md (8 tasks)               — Tasks de Product Owner
├── 📄 qa-*.md (15+ tasks)             — Tasks de QA
├── 📄 dev-*.md (6 tasks)              — Tasks de desenvolvimento
└── 📄 ... (mais 80+ tasks)
```

### 2.3 Scripts Operacionais
```
📁 .aiox-core/development/scripts/
├── 📄 unified-activation-pipeline.js (30.2KB) — Pipeline de ativação
├── 📄 greeting-builder.js (50.4KB)     — Sistema de saudação
├── 📄 code-quality-improver.js (40.9KB)— Melhoria de qualidade
├── 📄 refactoring-suggester.js (35.5KB)— Sugestões de refatoração
├── 📄 pattern-learner.js (35.4KB)      — Aprendizado de padrões
├── 📄 verify-workflow-gaps.js (33.6KB) — Verificação de workflows
├── 📄 commit-message-generator.js      — Gerador de mensagens de commit
├── 📄 performance-analyzer.js          — Analisador de performance
├── 📄 metrics-tracker.js               — Rastreamento de métricas
├── 📄 populate-entity-registry.js      — Sistema de entidades
├── 📄 test-generator.js                — Gerador de testes
├── 📄 workflow-validator.js            — Validador de workflows
├── 📄 workflow-state-manager.js        — Gerenciador de estado
├── 📄 backup-manager.js                — Gerenciador de backups
├── 📄 transaction-manager.js           — Gerenciador de transações
├── 📄 dependency-analyzer.js           — Analisador de dependências
├── 📄 rollback-handler.js              — Handler de rollback
├── 📄 security-checker.js              — Verificação de segurança
├── 📄 yaml-validator.js                — Validador YAML
└── 📄 ... (mais 30+ scripts)
```

### 2.4 Skills (Habilidades da IA)
```
📁 .aiox-core/development/skills/
├── 📁 mcp-skill/                       — Skill de MCP (Model Context Protocol)
│   ├── 📁 guides/
│   │   ├── 📄 debugging_mcp.md
│   │   ├── 📄 mcp_best_practices.md
│   │   ├── 📄 node_mcp_server.md
│   │   └── 📄 python_mcp_server.md
│   ├── 📁 scripts/
│   └── 📄 SKILL.md
├── 📁 skill-creator/                   — Criador de novas skills
│   ├── 📁 scripts/
│   └── 📄 SKILL.md
├── 📁 synapse/                         — Skill Synapse
│   ├── 📁 references/
│   └── 📄 SKILL.md
├── 📁 tech-search/                     — Pesquisa técnica
│   └── 📄 SKILL.md
├── 📄 clone-mind.md (17.3KB)           — Clonagem de mentes
├── 📄 enhance-workflow.md (14.3KB)     — Aprimoramento de workflows
├── 📄 ralph.md (7.6KB)                 — Skill Ralph
├── 📄 squad.md (7.9KB)                 — Skill de Squad
└── 📄 course-generation-workflow.md    — Geração de cursos
```

---

## 3. 🔄 Agentes Sincronizados (4 IDEs)

### 3.1 `.codex/agents/` — OpenAI Codex CLI
```
📄 aiox-master.md, analyst.md, architect.md, data-engineer.md,
   dev.md, devops.md, pm.md, po.md, qa.md, sm.md,
   squad-creator.md, ux-design-expert.md
📁 skills/
└── 📄 ebook-publisher.md
```

### 3.2 `.cursor/rules/agents/` — Cursor IDE
```
📄 aiox-master.md, analyst.md, architect.md, data-engineer.md,
   dev.md, devops.md, pm.md, po.md, qa.md, sm.md,
   squad-creator.md, ux-design-expert.md
```

### 3.3 `.gemini/` — Google Gemini
```
📁 commands/
├── 📄 aiox-master.toml, aiox-architect.toml, aiox-dev.toml,
│      aiox-devops.toml, aiox-qa.toml, aiox-pm.toml, aiox-po.toml,
│      aiox-sm.toml, aiox-analyst.toml, aiox-data-engineer.toml,
│      aiox-squad-creator.toml, aiox-ux-design-expert.toml
└── 📄 aiox-menu.toml (2.1KB) — Menu principal AIOX

📁 rules/AIOX/agents/
└── 📄 (mesmos 12 agentes sincronizados)
```

### 3.4 `.github/agents/` — GitHub Copilot
```
📄 aiox-master.agent.md, analyst.agent.md, architect.agent.md,
   data-engineer.agent.md, dev.agent.md, devops.agent.md,
   pm.agent.md, po.agent.md, qa.agent.md, sm.agent.md,
   squad-creator.agent.md, ux-design-expert.agent.md
```

---

## 4. 📚 `docs/` — Documentação Central

```
📁 docs/
├── 📁 brand/
│   ├── 📄 master-brandbook.md (1.9KB)  — Brandbook textual (v1)
│   └── 📄 sais-brandbook.md (1.3KB)    — Brandbook Sais específico
├── 📁 content/ebooks/oto-vault/
│   ├── 📄 master_blueprint_v2.md       — Blueprint do e-book OTO
│   └── 📄 original_master_at_2026_03_31.md — Versão original do Master
├── 📁 external-specs/
│   ├── 📄 APP_Sais_Firebase-2.md       — Spec do app Firebase
│   ├── 📄 Design Systems.md (15.6KB)   — Specs de Design Systems
│   ├── 📄 Proposta estruturada 1.md    — Proposta comercial
│   └── 📄 Resumo executivo 1.md        — Resumo executivo
├── 📁 history/
│   ├── 📁 checkpoints/
│   │   ├── 📄 checkpoint_2026-04-08_baseline.md
│   │   └── 📄 checkpoint_2026-04-09_fidelity_start.md
│   └── 📁 old_walkthroughs/
│       └── 📄 walkthrough_final.md
├── 📁 marketing/
│   ├── 📁 assets/
│   │   ├── 🖼️ v2_original_live.png (3.6MB)
│   │   ├── 🖼️ v3_dark_live.png (1.1MB)
│   │   └── 🖼️ v3_light_live.png (1.3MB)
│   ├── 📄 launch-strategy.md           — Estratégia de lançamento
│   └── 📄 marketing-creatives.md       — Criativos de marketing
├── 📁 stories/
│   └── 📄 1.1.story.md (3.6KB)         — Story 1.1
│
├── 📄 aiox_dashboard.html (78KB)       — 🏛️ TORRE DE CONTROLE AIOX
├── 📄 aiox_fluxograma.html (125KB)     — 🗺️ Fluxograma do Ecossistema
├── 📄 brand.html (12.5KB)              — 🏛️ BRANDBOOK DARK (Elite)
├── 📄 brand-light.html (11.6KB)        — ☀️ BRANDBOOK LIGHT (Zen)
├── 📄 mindmap.html (44KB)              — 🧠 Mapa Mental Interativo
├── 📄 pipeline_state.json (15KB)       — Estado do pipeline
├── 📄 project_map.md (3.1KB)           — Mapa do projeto
├── 📄 MASTER_BLUEPRINT_UPDATE.md       — Atualização do blueprint
│
├── 🖼️ img_elite_vault_reference_sommers.png  — Imagem Brandbook Dark
├── 🖼️ img_botanical_luxury_candle_sommers.png — Imagem Brandbook Dark
├── 🖼️ img_light_vault_sommers.png             — Imagem Brandbook Light
└── 🖼️ img_light_botanical_sommers.png         — Imagem Brandbook Light
```

---

## 5. 🧬 `knowledge/` — Base de Conhecimento

```
📁 knowledge/
├── 📄 brand_core.json (1.3KB)          — DNA da marca
├── 📄 project_memory.md (1.9KB)        — Memória do projeto
├── 📄 skills_dictionary.md (3.6KB)     — Dicionário de habilidades
│
├── 📁 audience/
│   └── 📄 avatar-essencia-ativa.md     — Avatar do público-alvo
│
├── 📁 branding/
│   ├── 📁 design_systems/
│   │   ├── 📄 dark_cockpit.json        — DS: Dark Cockpit
│   │   ├── 📄 golden_luxury.json       — DS: Golden Luxury
│   │   ├── 📄 obsidian_diamond.json    — DS: Obsidian Diamond
│   │   ├── 📄 the_black_protocol.json  — DS: Black Protocol
│   │   ├── 📄 zen_light.json           — DS: Zen Light
│   │   ├── 📄 ds_sais.json             — DS: Sais (produto)
│   │   └── 📄 ds_velas.json            — DS: Velas (produto)
│   ├── 📄 layout_engine_spec.md        — Spec do motor de layout
│   ├── 📄 skills_anatomia_paginas.md   — Anatomia das páginas
│   └── 📄 voice_and_tone.md            — Voz e tom da marca
│
├── 📁 clones/
│   ├── 📁 books/
│   │   ├── 📕 Dotcom Secrets - Russel Brunson.pdf (8MB)
│   │   ├── 📕 Expert Secrets - Russell Brunson.pdf (31MB)
│   │   ├── 📕 Traffic Secrets - Russel Brunson.pdf (302MB)
│   │   ├── 📄 dotcom_secrets_map.md
│   │   ├── 📄 expert_secrets_map.md
│   │   └── 📄 traffic_secrets_map.md
│   ├── 📁 transcripts/
│   │   ├── 📄 alan_nicolas_aluno_negocio_inteiro.md (25KB)
│   │   ├── 📄 elida_dias_vturb.md (250KB)
│   │   └── 📄 iox_squad_masterclass_1.md (503KB)
│   ├── 📄 alan_nicolas_clone.md        — Clone Alan Nicolas
│   ├── 📄 brunson_heuristics.md        — Heurísticas Brunson
│   ├── 📄 elida_dias_clone.md          — Clone Élida Dias
│   ├── 📄 elisa_clark.md               — Clone Elisa Clark
│   ├── 📄 joao_vturb_clone.md          — Clone João VTurb
│   ├── 📄 julian_clone.md              — Clone Julian
│   ├── 📄 pedro_valerio_clone.md       — Clone Pedro Valério
│   ├── 📄 tiago_finch_clone.md         — Clone Tiago Finch
│   ├── 📄 brazil_experts.md            — Experts BR
│   ├── 📄 global_experts.md            — Experts Globais
│   └── 📄 clone_routing.yaml           — Roteamento de clones
│
├── 📁 copy_frameworks/
│   └── 📄 frameworks.md               — Frameworks de copy
│
├── 📁 marketing/
│   ├── 📁 examples/
│   │   ├── 📄 elisa_claro_super_vsl.md
│   │   ├── 📄 outlier_branding_poc.md
│   │   └── 📄 sais_de_banho_brunson_vsl.md
│   └── 📄 social_proof.md
│
├── 📁 operations/
│   ├── 📄 art_director_protocol.md     — Protocolo Art Director
│   └── 📄 handover_protocol.md         — Protocolo de Handover
│
├── 📁 persona/
│   └── 📄 elisa_claro.md               — Persona Elisa Claro
│
├── 📁 projects/
│   ├── 📄 super_ebook_funnel.md        — Funil Super Ebook
│   └── 📄 the_black_protocol_spec.md   — Spec Black Protocol
│
├── 📁 prompts/
│   └── 📄 master-prompts.md            — Prompts mestres
│
└── 📁 technical/
    ├── 📄 conventions.md               — Convenções técnicas
    └── 📄 infrastructure.md            — Informações de infra
```

---

## 6. 🛒 `projects/loja-digital/` — Aplicação Next.js

```
📁 projects/loja-digital/
├── 📄 package.json (0.6KB)             — Next.js 16.1.6 + Firebase
├── 📄 next.config.ts
├── 📄 tsconfig.json
├── 📄 eslint.config.mjs
├── 📄 postcss.config.mjs
├── 📄 .env.local (0.4KB)              — Chaves Firebase locais
│
├── 📁 app/
│   ├── 📄 layout.tsx (1.3KB)           — Layout raiz
│   ├── 📄 page.tsx (0.1KB)             — Página inicial (redirect)
│   ├── 📄 globals.css                  — CSS global
│   ├── 📄 design-system.css (2.4KB)    — 🎨 TOKENS DO DESIGN SYSTEM
│   │
│   ├── 📁 login/
│   │   └── 📄 page.tsx (5.6KB)         — 🔐 Página de Login Elite
│   │
│   ├── 📁 hub/
│   │   └── 📄 page.tsx (13.3KB)        — 🏠 ÁREA DE MEMBROS ELITE
│   │
│   ├── 📁 sais/
│   │   ├── 📄 page.tsx (50KB)          — 📄 Página de Vendas SAIS
│   │   ├── 📁 upsell-1/               — Página de Upsell
│   │   ├── 📁 vsl/                     — VSL Page
│   │   └── 📁 vsl-upsell-1/           — VSL Upsell
│   │
│   ├── 📁 ebook/
│   │   ├── 📁 cofre/                   — Cofre v1 (legado)
│   │   ├── 📁 cofre-v2/               — 📖 COFRE V2 (ATIVO)
│   │   │   ├── 📁 components/         — Componentes visuais do e-book
│   │   │   │   ├── 📄 CoverPage.tsx
│   │   │   │   ├── 📄 IntroPage.tsx
│   │   │   │   ├── 📄 ManifestoPage.tsx
│   │   │   │   ├── 📄 RulesPage.tsx
│   │   │   │   ├── 📄 GeometryPage.tsx
│   │   │   │   ├── 📄 SummaryPage.tsx
│   │   │   │   ├── 📄 ChapterOpener.tsx
│   │   │   │   ├── 📄 FormulaSensorial.tsx
│   │   │   │   ├── 📄 FormulaTechnical.tsx
│   │   │   │   ├── 📄 FormulaIngredients.tsx
│   │   │   │   ├── 📄 ClosingPage.tsx
│   │   │   │   └── 📄 AlchemySilencePage.tsx
│   │   │   ├── 📁 data/               — Dados dos capítulos
│   │   │   │   ├── 📄 chapters.ts      — Capítulos do Cofre Master
│   │   │   │   ├── 📄 sinergias.ts     — Capítulos 30 Sinergias
│   │   │   │   ├── 📄 fornecedores.ts  — Capítulos Fornecedores
│   │   │   │   └── 📄 ritual-noite.ts  — Capítulos Ritual da Noite
│   │   │   ├── 📁 types/
│   │   │   │   └── 📄 chapters.ts      — TypeScript types
│   │   │   └── 📄 styles.css           — Estilos do e-book
│   │   ├── 📁 master-edition/         — Edição master (legado)
│   │   └── 📁 viewer/
│   │       ├── 📁 [id]/
│   │       │   └── 📄 page.tsx (5.4KB) — 📖 VISUALIZADOR DINÂMICO
│   │       ├── 📄 page.tsx
│   │       └── 📄 viewer.css
│   │
│   └── 📁 api/                        — API Routes (Next.js)
│
├── 📁 components/
│   └── 📄 AuthGuard.tsx (1.5KB)        — 🛡️ Guard de Autenticação
│
├── 📁 lib/
│   └── 📄 firebase.ts (0.9KB)         — Config Firebase Client
│
├── 📁 public/
│   ├── 📁 downloads/                   — PDFs para download
│   └── 📁 ebook/                       — Capas e imagens dos e-books
│       ├── 🖼️ master_cover_v2.png
│       ├── 🖼️ capa_mistica_esmeralda.png
│       ├── 🖼️ capa_mistica_dourada.png
│       ├── 🖼️ capa_mistica_rubi.png
│       └── 🖼️ ... (350+ imagens de referência)
│
└── 📁 sales/                          — Conteúdo de páginas de venda
```

---

## 7. ⚙️ `scripts/` — Automações

```
📁 scripts/
└── 📄 dashboard_server.js (4.8KB)      — 🚀 Servidor HTTP do Painel (porta 4000)
```

---

## 8. 🎖️ `squads/` — Definições dos 6 Squads

```
📁 squads/
├── 📄 squad-infra-core.yaml           — Squad 1: Infra Core
├── 📄 squad-content-factory.yaml      — Squad 2: Content Factory
├── 📄 squad-growth-engine.yaml        — Squad 3: Growth Engine
├── 📄 squad-quality-gate.yaml         — Squad 4: Quality Gate
├── 📄 squad-engineering.yaml          — Squad 5: Engineering
└── 📄 squad-velas.yaml                — Squad 6: Velas (Novo Vertical)
```

---

## 9. 🧪 `funnels/` — Funis de Venda

```
📁 funnels/
└── 📁 sais_de_banho/
    └── 📄 copy_upsell.md (3.6KB)      — Copy do upsell de sais
```

---

## 10. 📦 `config/` — Configurações Globais

```
📁 config/
└── 📄 brand_config.json (0.8KB)       — Configuração da marca (JSON)
```

---

## 11. 💾 `archive/` — Backups

```
📁 archive/
├── 📄 .env.backup                     — Backup do .env
├── 📄 AGENTS.md.backup                — Backup do AGENTS.md
└── 📄 tmp_chapters.txt                — Rascunho temporário
```

---

## 📊 Estatísticas do Ecossistema

| Métrica | Valor |
|---|---|
| **Total de Agentes** | 23 (12 core + 11 especializados) |
| **Total de Tasks** | 120+ |
| **Total de Skills** | 8 skills técnicas |
| **Total de Clones** | 8 (BR + Global) |
| **Design Systems** | 7 variações (JSON) |
| **IDEs Sincronizadas** | 4 (Codex, Cursor, Gemini, GitHub) |
| **Squads Operacionais** | 6 |
| **Produtos Digitais** | 4 e-books |
| **Páginas Interativas** | Dashboard, Fluxograma, Mindmap, 2 Brandbooks |

---

> **Nota:** Pastas `node_modules/`, `.next/`, `out/`, `out_deploy/` e `.git/` foram excluídas por serem geradas automaticamente.
