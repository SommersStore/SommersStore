# Anti-Gravity — Especificação Final Consolidada para Painel Interativo inspirado em n8n

## 0) Modo de leitura obrigatório

Leia este documento inteiro antes de responder.

Trate este arquivo como **especificação operacional**, não como conversa casual.  
Seu papel é transformar este projeto em um **painel visual operacional, auditável e interativo**, inspirado em n8n, mas adaptado ao Anti-Gravity.

### Regras centrais

- Separe rigorosamente:
  1. **BUILD** — fluxo de construção do projeto
  2. **OPS** — fluxo operacional vivo
  3. **CONTROL** — camada transversal persistente de governança, observabilidade e intervenção
- **Não** misture BUILD, OPS e CONTROL.
- **CONTROL não é uma terceira trilha igual às outras**. CONTROL é uma camada transversal permanente.
- Não trate isso como simples automação de marketing.
- Trate isso como **sistema operacional de agentes** com:
  - squads
  - agentes
  - skills
  - memória
  - estado
  - checkpoints
  - logs
  - alertas
  - governança de rerun
  - intervenção humana
  - trilha de auditoria
- Não invente dados sem marcar **[HIPÓTESE]**.
- Quando faltar dado, use placeholder explícito.
- Preserve rastreabilidade, governança, reexecução e legibilidade operacional.

---

## 1) Objetivo do sistema

Quero um sistema visual operacional, e não um diagrama estático.

O resultado deve me permitir:

- visualizar o que está acontecendo em tempo real
- entender por que está acontecendo
- saber qual agente executou cada ação
- saber qual skill foi usada
- saber qual memória foi consultada
- identificar o que está travado
- identificar o que falhou
- saber o que pode ser editado
- saber o que pode ser reexecutado
- saber qual artefato está vigente
- saber qual narrativa está vigente
- saber qual alerta exige ação
- intervir manualmente sem perder contexto
- alterar narrativa, copy, conteúdo, lógica e prioridades
- reexecutar partes específicas com governança
- preservar memória, histórico, auditoria e rastreabilidade

---

## 2) Metadados de projeto

- **project_name**: `[PROJECT_NAME_PENDING]`
- **domain_reference**: `essenciaativabr.shop`
- **traffic_source**: `Facebook Ads`
- **checkout_stack**: `Kiwify + Stripe + Order Bump`
- **publishing_stack**: `Firebase Hosting + DNS`
- **agents_estimated**: `20`
- **squads_estimated**: `6`
- **skills_estimated**: `30+`
- **status_intent**: construir um painel interativo com observabilidade e comando em tempo real

---

## 3) Arquitetura canônica revisada

### 3.1 Camadas obrigatórias

- **BUILD**
- **OPS**
- **CONTROL**

### 3.2 Squads canônicos

- **SQD-CORE** — CORE STRATEGY
- **SQD-MKF** — MARKET & FUNNEL
- **SQD-CNT** — CONTENT FACTORY
- **SQD-EXP** — EXPERIENCE & DESIGN SYSTEM
- **SQD-ENG** — PLATFORM ENGINEERING
- **SQD-QRO** — QUALITY, RISK & OBSERVABILITY

### 3.3 Responsabilidades dos squads

#### SQD-CORE — CORE STRATEGY
Responsável por:
- enquadramento do projeto
- definição de produto
- oferta
- backlog
- roadmap
- governança macro

Recebe:
- briefing
- business goals

Entrega:
- direction package
- product brief
- offer thesis
- roadmap
- prioridades

#### SQD-MKF — MARKET & FUNNEL
Responsável por:
- inteligência de mercado
- benchmark
- hooks
- arquitetura de funil
- tráfego
- CRO

Recebe:
- direção estratégica
- dados operacionais

Entrega:
- market analysis
- persona
- hooks
- funnel blueprint
- hypotheses

#### SQD-CNT — CONTENT FACTORY
Responsável por:
- estrutura editorial
- longform copy
- sales copy
- montagem de conteúdo
- narrativa

Recebe:
- direção estratégica
- inteligência de mercado

Entrega:
- skeleton editorial
- copy
- PDF assets
- blocos narrativos

#### SQD-EXP — EXPERIENCE & DESIGN SYSTEM
Responsável por:
- design system
- UX
- layout
- composição visual
- consistência estética

Recebe:
- estrutura editorial
- conteúdo

Entrega:
- MDS
- layout
- landing structure
- asset direction

#### SQD-ENG — PLATFORM ENGINEERING
Responsável por:
- checkout
- integrações
- deploy
- tracking
- automação
- entrega

Recebe:
- sales page
- design specs
- regras comerciais

Entrega:
- ambiente ativo
- checkout funcional
- webhooks
- sync
- delivery orchestration

#### SQD-QRO — QUALITY, RISK & OBSERVABILITY
Responsável por:
- QA
- checkpoints
- aprovação
- bloqueio
- logs
- alertas
- rerun governance
- trilha de auditoria

Recebe:
- outputs de todos os squads

Entrega:
- approved / rework / blocked
- incident handling
- alert routing
- execution audit
- approval governance

---

## 4) Convenção de IDs

### 4.1 Entidades principais

- **phase_definition**: `PHS-BLD-01`, `PHS-OPS-01`, `PHS-CTL-01`
- **node_definition**: `NOD-BLD-01`, `NOD-OPS-01`, `NOD-CTL-01`
- **run_instance**: `RUN-YYYYMMDD-0001`
- **rerun_instance**: `RERUN-YYYYMMDD-0001`
- **context_snapshot**: `CTX-YYYYMMDD-0001`
- **approval_instance**: `APR-YYYYMMDD-0001`
- **incident_instance**: `INC-YYYYMMDD-0001`
- **manual_command**: `CMD-YYYYMMDD-0001`

### 4.2 Registries auxiliares

- **checkpoint**: `CHK-01`, `CHK-02`, ...
- **decision**: `DEC-01`, `DEC-OPS-01`, ...
- **alert**: `ALT-OPS-01`, `ALT-SYS-01`, ...
- **deliverable**: `DLV-BLUEPRINT-*`, `DLV-SPEC-*`, `DLV-COPY-*`, `DLV-ASSET-*`, `DLV-PAGE-*`, `DLV-INTEGRATION-*`, `DLV-DEPLOY-*`, `DLV-AUTOMATION-*`, `DLV-REPORT-*`, `DLV-INSIGHT-*`

---

## 5) Registries canônicos

### 5.1 Registry de agentes

- `AGT-CORE-01-Orion`
- `AGT-CORE-02-Morgan`
- `AGT-CORE-03-Pax`
- `AGT-CORE-04-River`
- `AGT-CORE-05-Forge`
- `AGT-MKF-01-Alex`
- `AGT-MKF-02-PersonaX`
- `AGT-MKF-03-Gauge`
- `AGT-MKF-04-Stratego`
- `AGT-CNT-01-Mercury`
- `AGT-CNT-02-Iris`
- `AGT-CNT-03-Lumina`
- `AGT-EXP-01-Atlas`
- `AGT-EXP-02-Aura`
- `AGT-EXP-03-Vinci`
- `AGT-ENG-01-Dex`
- `AGT-ENG-02-Dara`
- `AGT-ENG-03-Gage`
- `AGT-ENG-04-Koda`
- `AGT-QRO-01-Quinn`
- `AGT-QRO-02-[AGENT_PENDING]`

### 5.2 Registry de skills

#### CORE
- `SKL-CORE-01-BriefIngestion`
- `SKL-CORE-02-ProductPositioning`
- `SKL-CORE-03-OfferStructuring`
- `SKL-CORE-04-PersonaFraming`
- `SKL-CORE-05-RoadmapPlanning`
- `SKL-CORE-06-SprintOrchestration`

#### MKF
- `SKL-MKF-01-MarketIntelligence`
- `SKL-MKF-02-CompetitorDeconstruction`
- `SKL-MKF-03-HookMining`
- `SKL-MKF-04-FunnelArchitecture`
- `SKL-MKF-05-TrafficStrategy`
- `SKL-MKF-06-CROHypothesis`

#### CNT
- `SKL-CNT-01-EditorialStructuring`
- `SKL-CNT-02-LongformCopy`
- `SKL-CNT-03-SalesPageCopy`
- `SKL-CNT-04-BrandVoiceEnforcement`
- `SKL-CNT-05-ImagePrompting`
- `SKL-CNT-06-PDFAssembly`

#### EXP
- `SKL-EXP-01-DesignSystemTokens`
- `SKL-EXP-02-LayoutComposition`
- `SKL-EXP-03-A4Composition`
- `SKL-EXP-04-LandingPageUXMapping`
- `SKL-EXP-05-VisualConsistency`
- `SKL-EXP-06-AssetDirection`

#### ENG
- `SKL-ENG-01-CheckoutIntegration`
- `SKL-ENG-02-DeployPipeline`
- `SKL-ENG-03-WebhookAutomation`
- `SKL-ENG-04-DeliveryOrchestration`
- `SKL-ENG-05-TrackingInstrumentation`
- `SKL-ENG-06-DataSync`

#### QRO
- `SKL-QRO-01-EditorialQA`
- `SKL-QRO-02-SecurityScan`
- `SKL-QRO-03-FailureRecovery`
- `SKL-QRO-04-AlertRouting`
- `SKL-QRO-05-ExecutionAudit`
- `SKL-QRO-06-ApprovalGovernance`

### 5.3 Registry de checkpoints

- `CHK-01 Escopo`
- `CHK-02 Persona e mercado`
- `CHK-03 Estrutura editorial`
- `CHK-04 Voz e luxo`
- `CHK-05 Design system`
- `CHK-06 PDF final`
- `CHK-07 Sales page validada`
- `CHK-08 Checkout funcional`
- `CHK-09 Deploy validado`
- `CHK-10 Automação ponta a ponta`
- `CHK-11 Baseline de métricas`

### 5.4 Registry de decisões

#### BUILD
- `DEC-01 Escopo aprovado?`
- `DEC-02 Estratégia viável?`
- `DEC-03 Tom luxo aprovado?`
- `DEC-04 Design consistente?`
- `DEC-05 Página e checkout coerentes?`
- `DEC-06 Entrega ponta a ponta passou?`

#### OPS
- `DEC-OPS-01 Engajou?`
- `DEC-OPS-02 Aceitou bump?`
- `DEC-OPS-03 Pagamento aprovado?`
- `DEC-OPS-04 Aceitou upsell?`
- `DEC-OPS-05 Escalar / manter / corrigir?`

### 5.5 Registry de alertas

- `ALT-OPS-01 Tracking quebrado`
- `ALT-OPS-02 Checkout offline`
- `ALT-OPS-03 Pagamento recusado em alta`
- `ALT-OPS-04 Entrega falhou`
- `ALT-OPS-05 CVR caiu`
- `ALT-OPS-06 CAC subiu`
- `ALT-OPS-07 ROI negativo`

### 5.6 Registry de KPIs

- `KPI-OPS-CAC`
- `KPI-OPS-CVR`
- `KPI-OPS-AOV`
- `KPI-OPS-ROI`
- `KPI-OPS-REFUND [HIPÓTESE]`
- `KPI-OPS-DELIVERY-RATE`
- `KPI-OPS-ATTRIBUTION-INTEGRITY`

---

## 6) BUILD MAP completo

### 6.1 Fases BUILD

- `BLD-01` Definição
- `BLD-02` Referências
- `BLD-03` Estratégia
- `BLD-04` Estruturação
- `BLD-05` Escrita
- `BLD-06` Revisão
- `BLD-07` Design
- `BLD-08` Imagens
- `BLD-09` Montagem
- `BLD-10` Sales Page
- `BLD-11` Checkout
- `BLD-12` Publicação
- `BLD-13` Automação
- `BLD-14` Otimização Inicial

### 6.2 Dependências BUILD

- `BLD-03` depende de `BLD-01` e `BLD-02`
- `BLD-04` depende de `BLD-03`
- `BLD-05` depende de `BLD-04`
- `BLD-06` depende de `BLD-05`
- `BLD-07` depende de `BLD-04` e `BLD-06`
- `BLD-08` depende de `BLD-02` e `BLD-04`
- `BLD-09` depende de `BLD-06`, `BLD-07` e `BLD-08`
- `BLD-10` depende de `BLD-03`, `BLD-06` e `BLD-07`
- `BLD-11` depende de `BLD-10`
- `BLD-12` depende de `BLD-10` e `BLD-11`
- `BLD-13` depende de `BLD-11` e `BLD-12`
- `BLD-14` depende de `BLD-12` e `BLD-13`

### 6.3 Mapeamento BUILD por fase

#### BLD-01 — Definição & Enquadramento
- **squad_dono**: `SQD-CORE`
- **agentes**: `AGT-CORE-01-Orion`, `AGT-CORE-02-Morgan`, `AGT-CORE-03-Pax`, `AGT-CORE-04-River`
- **skills**: `SKL-CORE-01-BriefIngestion`, `SKL-CORE-02-ProductPositioning`, `SKL-CORE-03-OfferStructuring`
- **inputs**: `Briefing`, `Business Goals`
- **outputs**: `DLV-BLUEPRINT-ProductBrief`, `DLV-SPEC-OfferThesis`, `DLV-SPEC-PersonaPreliminar`
- **checkpoint**: `CHK-01`
- **decision_gate**: `DEC-01`
- **memory_scope**: `project_memory`, `phase_memory`, `decision_memory`
- **ações_humanas_permitidas**: aprovar escopo, redefinir oferta, ajustar persona, alterar prioridades
- **fallback**: retornar a briefing e reposicionamento
- **rerun_allowed**: sim, com governança

#### BLD-02 — Referências & Benchmark
- **squad_dono**: `SQD-MKF`, `SQD-CNT`
- **agentes**: `AGT-MKF-01-Alex`, `AGT-MKF-02-PersonaX`, `AGT-CNT-02-Iris`
- **skills**: `SKL-MKF-01-MarketIntelligence`, `SKL-MKF-02-CompetitorDeconstruction`, `SKL-MKF-03-HookMining`
- **outputs**: `DLV-ASSET-ReferenceBoard`, `DLV-REPORT-BenchmarkDeck`, `DLV-INSIGHT-LinguagemMercado`
- **checkpoint**: `CHK-02`
- **memory_scope**: `phase_memory`, `content_memory`, `artifact_registry`
- **ações_humanas_permitidas**: ajustar benchmark, substituir referência, complementar ICP
- **fallback**: nova coleta de mercado

#### BLD-03 — Estratégia & Arquitetura
- **squad_dono**: `SQD-CORE`, `SQD-MKF`
- **agentes**: `AGT-CORE-01-Orion`, `AGT-CORE-03-Pax`, `AGT-MKF-01-Alex`, `AGT-MKF-03-Gauge`
- **skills**: `SKL-MKF-04-FunnelArchitecture`, `SKL-CORE-05-RoadmapPlanning`
- **outputs**: `DLV-BLUEPRINT-Roadmap`, `DLV-BLUEPRINT-FunnelBlueprint`, `DLV-SPEC-Backlog`
- **checkpoint**: `CHK-02`
- **decision_gate**: `DEC-02`
- **memory_scope**: `project_memory`, `phase_memory`, `decision_memory`
- **ações_humanas_permitidas**: alterar funil, sequência de ofertas, backlog e roadmap
- **fallback**: revisão estratégica

#### BLD-04 — Estruturação Editorial
- **squad_dono**: `SQD-CNT`
- **agentes**: `AGT-CNT-01-Mercury`, `AGT-CNT-02-Iris`, `AGT-CNT-03-Lumina`
- **skills**: `SKL-CNT-01-EditorialStructuring`, `SKL-CNT-04-BrandVoiceEnforcement`
- **outputs**: `DLV-BLUEPRINT-SkeletonEditorial`, `DLV-SPEC-Capitulos`, `DLV-SPEC-Secoes`
- **checkpoint**: `CHK-03`
- **memory_scope**: `content_memory`, `phase_memory`
- **ações_humanas_permitidas**: alterar capítulos, seções e ordem narrativa
- **fallback**: reestruturação editorial

#### BLD-05 — Escrita
- **squad_dono**: `SQD-CNT`
- **agentes**: `AGT-CNT-01-Mercury`, `AGT-CNT-03-Lumina`
- **skills**: `SKL-CNT-02-LongformCopy`, `SKL-CNT-03-SalesPageCopy`
- **outputs**: `DLV-COPY-Manifestos`, `DLV-COPY-Introducoes`, `DLV-COPY-CorpoConteudo`, `DLV-COPY-CopyBase`
- **checkpoint**: `CHK-04`
- **memory_scope**: `content_memory`, `prompt_memory`, `artifact_registry`
- **ações_humanas_permitidas**: editar copy, mudar tom, reescrever blocos, alterar narrativa
- **fallback**: rework de copy

#### BLD-06 — Revisão Editorial & Luxo
- **squad_dono**: `SQD-QRO`
- **agentes**: `AGT-QRO-01-Quinn`, `AGT-QRO-02-[AGENT_PENDING]`
- **skills**: `SKL-QRO-01-EditorialQA`
- **outputs**: `DLV-REPORT-TextoValidado`, `DLV-REPORT-ListaCorrecoes`
- **checkpoint**: `CHK-04`
- **decision_gate**: `DEC-03`
- **memory_scope**: `decision_memory`, `artifact_registry`, `incident_memory`
- **ações_humanas_permitidas**: aprovar, reprovar, devolver para rework
- **fallback**: retorno a `BLD-05`

#### BLD-07 — Design System & Layout
- **squad_dono**: `SQD-EXP`
- **agentes**: `AGT-EXP-01-Atlas`, `AGT-EXP-02-Aura`, `AGT-EXP-03-Vinci`
- **skills**: `SKL-EXP-01-DesignSystemTokens`, `SKL-EXP-02-LayoutComposition`, `SKL-EXP-03-A4Composition`
- **outputs**: `DLV-SPEC-MDS`, `DLV-ASSET-LayoutA4`, `DLV-SPEC-Grid`, `DLV-SPEC-RegrasVisuais`
- **checkpoint**: `CHK-05`
- **decision_gate**: `DEC-04`
- **memory_scope**: `artifact_registry`, `phase_memory`
- **ações_humanas_permitidas**: alterar layout, grid, tokens e regras visuais
- **fallback**: revisão de layout e MDS

#### BLD-08 — Imagens & Assets
- **squad_dono**: `SQD-CNT`, `SQD-EXP`
- **agentes**: `AGT-CNT-02-Iris`, `AGT-EXP-03-Vinci`, `AGT-QRO-02-[AGENT_PENDING] [HIPÓTESE]`
- **skills**: `SKL-CNT-05-ImagePrompting`, `SKL-EXP-06-AssetDirection`
- **outputs**: `DLV-ASSET-BibliotecaVisualHD`
- **memory_scope**: `artifact_registry`, `content_memory`
- **ações_humanas_permitidas**: revisar prompts visuais, trocar direção de arte, refazer ativos
- **fallback**: rerun isolado de asset

#### BLD-09 — Montagem dos Volumes
- **squad_dono**: `SQD-CNT`
- **agentes**: `AGT-CNT-02-Iris`, `AGT-EXP-03-Vinci`, `AGT-CNT-01-Mercury`
- **skills**: `SKL-CNT-06-PDFAssembly`, `SKL-EXP-05-VisualConsistency`
- **outputs**: `DLV-ASSET-PDFFinalPorVolume`
- **checkpoint**: `CHK-06`
- **memory_scope**: `artifact_registry`, `content_memory`
- **ações_humanas_permitidas**: remontar PDF, trocar ativos, reordenar conteúdo
- **fallback**: retorno a design ou conteúdo

#### BLD-10 — Sales Page
- **squad_dono**: `SQD-MKF`, `SQD-EXP`
- **agentes**: `AGT-MKF-04-Stratego`, `AGT-CNT-01-Mercury`, `AGT-EXP-02-Aura`
- **skills**: `SKL-CNT-03-SalesPageCopy`, `SKL-EXP-04-LandingPageUXMapping`
- **outputs**: `DLV-PAGE-SalesPagePronta`
- **checkpoint**: `CHK-07`
- **decision_gate**: `DEC-05`
- **memory_scope**: `content_memory`, `artifact_registry`
- **ações_humanas_permitidas**: alterar blocos da página, headline, CTA, estrutura UX
- **fallback**: revisar page blocks

#### BLD-11 — Checkout
- **squad_dono**: `SQD-ENG`, `SQD-MKF`
- **agentes**: `AGT-ENG-01-Dex`, `AGT-ENG-02-Dara`, `AGT-MKF-04-Stratego`
- **skills**: `SKL-ENG-01-CheckoutIntegration`, `SKL-CORE-03-OfferStructuring`
- **outputs**: `DLV-INTEGRATION-Checkout`, `DLV-INTEGRATION-OrderBump`, `DLV-INTEGRATION-Upsell`, `DLV-INTEGRATION-Downsell`
- **checkpoint**: `CHK-08`
- **decision_gate**: `DEC-05`
- **memory_scope**: `project_memory`, `artifact_registry`
- **ações_humanas_permitidas**: alterar regras comerciais, bump, upsell, downsell
- **fallback**: reconstrução do checkout

#### BLD-12 — Publicação
- **squad_dono**: `SQD-ENG`
- **agentes**: `AGT-ENG-03-Gage`, `AGT-ENG-01-Dex`, `AGT-ENG-04-Koda`
- **skills**: `SKL-ENG-02-DeployPipeline`, `SKL-QRO-02-SecurityScan`
- **outputs**: `DLV-DEPLOY-URLPublicada`, `DLV-DEPLOY-DNS`, `DLV-DEPLOY-AmbienteAtivo`
- **checkpoint**: `CHK-09`
- **memory_scope**: `artifact_registry`, `incident_memory`
- **ações_humanas_permitidas**: republicar, alterar DNS, forçar rollback
- **fallback**: rollback de deploy

#### BLD-13 — Automação & Entrega
- **squad_dono**: `SQD-ENG`
- **agentes**: `AGT-ENG-02-Dara`, `AGT-ENG-01-Dex`, `AGT-ENG-03-Gage`
- **skills**: `SKL-ENG-03-WebhookAutomation`, `SKL-ENG-04-DeliveryOrchestration`, `SKL-ENG-06-DataSync`
- **outputs**: `DLV-AUTOMATION-Emails`, `DLV-AUTOMATION-Webhooks`, `DLV-AUTOMATION-EntregaDigital`
- **checkpoint**: `CHK-10`
- **decision_gate**: `DEC-06`
- **memory_scope**: `artifact_registry`, `incident_memory`, `phase_memory`
- **ações_humanas_permitidas**: reenfileirar automação, testar webhooks, corrigir sync
- **fallback**: rerun de integração / entrega

#### BLD-14 — Otimização Inicial
- **squad_dono**: `SQD-MKF`, `SQD-QRO`
- **agentes**: `AGT-MKF-03-Gauge`, `AGT-MKF-04-Stratego`, `AGT-MKF-01-Alex`
- **skills**: `SKL-MKF-06-CROHypothesis`, `SKL-ENG-05-TrackingInstrumentation`, `SKL-QRO-05-ExecutionAudit`
- **outputs**: `DLV-REPORT-DashboardInicial`, `DLV-INSIGHT-HipotesesAB`, `DLV-REPORT-BaselineROI`
- **checkpoint**: `CHK-11`
- **memory_scope**: `decision_memory`, `artifact_registry`, `incident_memory`
- **ações_humanas_permitidas**: aprovar baseline, alterar thresholds, priorizar hipóteses
- **fallback**: revisão de tracking ou funil

---

## 7) OPS MAP completo

### 7.1 Etapas OPS

- `OPS-01` Anúncio ativo
- `OPS-02` Clique e atribuição
- `OPS-03` Landing page
- `OPS-04` CTA
- `OPS-05` Checkout
- `OPS-06` Order bump
- `OPS-07` Pagamento
- `OPS-08` Upsell/Downsell
- `OPS-09` Entrega
- `OPS-10` Pós-venda/Suporte
- `OPS-11` Tracking/CRO/ROI/Escala

### 7.2 Mapeamento OPS por etapa

#### OPS-01 — Facebook Ad Live
- **trigger**: criativos + orçamento aprovados
- **squad_dono**: `SQD-MKF`
- **agente**: `AGT-MKF-04-Stratego`
- **skill**: `SKL-MKF-05-TrafficStrategy`
- **input**: orçamento, criativos
- **output**: tráfego
- **KPI ligado**: `KPI-OPS-CAC`, `KPI-OPS-ROI`
- **fallback**: pausar campanha / ajustar criativo
- **rerun**: sim
- **owner_incidente**: `SQD-MKF`

#### OPS-02 — Session Attribution
- **trigger**: clique com UTM
- **squad_dono**: `SQD-ENG`
- **agente**: `AGT-ENG-02-Dara`
- **skill**: `SKL-ENG-05-TrackingInstrumentation`
- **input**: clique, UTM
- **output**: sessão atribuída
- **KPI ligado**: `KPI-OPS-ATTRIBUTION-INTEGRITY`
- **alerta**: `ALT-OPS-01`
- **fallback**: recalibrar tracking
- **owner_incidente**: `SQD-ENG`

#### OPS-03 — Landing View
- **trigger**: sessão iniciada
- **squad_dono**: `SQD-EXP`
- **agente**: `AGT-EXP-02-Aura`
- **skill**: `SKL-EXP-04-LandingPageUXMapping`
- **input**: sessão
- **output**: consumo da página
- **KPI ligado**: `KPI-OPS-CVR`
- **fallback**: ajuste de UX / estrutura

#### OPS-04 — CTA Click
- **trigger**: visita válida
- **squad_dono**: `SQD-MKF`
- **agente**: `AGT-CNT-01-Mercury`
- **skill**: `SKL-CNT-03-SalesPageCopy`
- **input**: visita
- **output**: intenção de compra
- **decision_gate**: `DEC-OPS-01`
- **fallback**: ajuste de copy / CTA

#### OPS-05 — Checkout Open
- **trigger**: clique em CTA
- **squad_dono**: `SQD-ENG`
- **agente**: `AGT-ENG-01-Dex`
- **skill**: `SKL-ENG-01-CheckoutIntegration`
- **input**: clique CTA
- **output**: checkout aberto
- **alerta**: `ALT-OPS-02`
- **fallback**: verificar integração, rollback de checkout

#### OPS-06 — Order Bump
- **trigger**: carrinho aberto
- **squad_dono**: `SQD-MKF`
- **agente**: `AGT-MKF-04-Stratego`
- **skill**: `SKL-CORE-03-OfferStructuring`
- **input**: carrinho
- **output**: aceitação ou rejeição do bump
- **decision_gate**: `DEC-OPS-02`
- **KPI ligado**: `KPI-OPS-AOV`
- **fallback**: recalibrar bump

#### OPS-07 — Payment Process
- **trigger**: submissão do pedido
- **squad_dono**: `SQD-ENG`
- **agente**: `AGT-ENG-02-Dara`
- **skill**: `SKL-ENG-06-DataSync`
- **input**: dados do pedido
- **output**: payment status
- **decision_gate**: `DEC-OPS-03`
- **alerta**: `ALT-OPS-03`
- **fallback**: verificar gateway / sync

#### OPS-08 — Upsell / Downsell
- **trigger**: payment approved
- **squad_dono**: `SQD-MKF`
- **agentes**: `AGT-MKF-03-Gauge`, `AGT-MKF-04-Stratego`
- **skill**: `SKL-MKF-06-CROHypothesis`
- **input**: aprovação do pagamento
- **output**: receita adicional ou saída
- **decision_gate**: `DEC-OPS-04`
- **KPI ligado**: `KPI-OPS-AOV`, `KPI-OPS-ROI`
- **fallback**: ajustar sequência de oferta

#### OPS-09 — Delivery
- **trigger**: payment approved
- **squad_dono**: `SQD-ENG`
- **agente**: `AGT-ENG-02-Dara`
- **skill**: `SKL-ENG-04-DeliveryOrchestration`
- **input**: payment approved
- **output**: acesso entregue
- **alerta**: `ALT-OPS-04`
- **KPI ligado**: `KPI-OPS-DELIVERY-RATE`
- **fallback**: reprocessar entrega

#### OPS-10 — Pós-venda / Suporte
- **trigger**: ticket, email ou mensagem
- **squad_dono**: `SQD-QRO`
- **agente**: `AGT-QRO-02-[AGENT_PENDING] [HIPÓTESE]`
- **skill**: `SKL-QRO-04-AlertRouting`
- **input**: ticket / email / mensagem
- **output**: caso aberto ou resolvido
- **fallback**: escalar incidente ao owner humano

#### OPS-11 — Tracking / CRO / ROI / Escala
- **trigger**: dados de funil consolidados
- **squad_dono**: `SQD-MKF`
- **agente**: `AGT-MKF-03-Gauge`
- **skills**: `SKL-MKF-06-CROHypothesis`, `SKL-ENG-05-TrackingInstrumentation`
- **input**: dados do funil
- **output**: hipótese nova, decisão de escala/correção
- **decision_gate**: `DEC-OPS-05`
- **alertas**: `ALT-OPS-05`, `ALT-OPS-06`, `ALT-OPS-07`
- **fallback**: reduzir gasto, corrigir tracking, mudar mensagem / oferta

---

## 8) CONTROL FABRIC completo

### 8.1 Módulos CONTROL

- `CTL-01` Global Status Board
- `CTL-02` Agent Activity Monitor
- `CTL-03` Skill Usage Monitor
- `CTL-04` Queue Board
- `CTL-05` Approval Center
- `CTL-06` Memory Vault
- `CTL-07` Context Diff Viewer
- `CTL-08` Manual Command Console
- `CTL-09` Reexecution Center
- `CTL-10` Alert Hub
- `CTL-11` Execution Log
- `CTL-12` Manual Intervention Log
- `CTL-13` Incident View
- `CTL-14` Why This Ran

### 8.2 O que o painel deve mostrar

- status global do projeto
- fase BUILD atual
- estado operacional vivo
- último checkpoint aprovado
- próximo gargalo previsto
- nós em `running`
- nós em `blocked`
- nós em `failed`
- nós em `waiting_approval`
- agentes ativos
- skills acionadas
- filas pendentes
- aprovações pendentes
- incidentes e alertas
- memória vigente
- versão de narrativa vigente
- histórico de intervenção humana
- **why_this_ran** por execução

### 8.3 O que o operador humano deve poder fazer

- aprovar
- rejeitar
- pausar
- retomar
- editar narrativa
- editar copy
- editar contexto
- editar prompt mestre
- trocar skill
- habilitar skill
- desabilitar skill
- reenfileirar fase
- reexecutar skill
- reexecutar agente
- reexecutar fase
- fazer rollback
- alterar prioridade
- fechar alerta
- anotar risco
- registrar observação operacional

---

## 9) Modelo de memória e estado

### 9.1 Escopos de memória

- `project_memory`
- `phase_memory`
- `node_memory`
- `agent_session_memory`
- `content_memory`
- `decision_memory`
- `prompt_memory`
- `artifact_registry`
- `incident_memory`

### 9.2 Finalidade de cada escopo

#### project_memory
- verdade persistente do projeto
- oferta vigente
- narrativa vigente
- persona ativa
- prioridades
- políticas

#### phase_memory
- contexto consolidado de cada fase
- entradas recebidas
- saídas aprovadas
- checkpoint associado

#### node_memory
- payload local
- tentativa atual
- erro anterior
- diff local

#### agent_session_memory
- contexto de trabalho do agente
- instrução vigente
- restrições
- janela de ação

#### content_memory
- versões de copy
- blocos narrativos
- capítulos
- seções
- assets textuais

#### decision_memory
- decisões tomadas
- racional
- aprovadores
- artefatos de base

#### prompt_memory
- comandos humanos
- prompt mestre
- override temporário
- regras temporárias

#### artifact_registry
- PDFs
- páginas
- specs
- assets
- links
- snapshots

#### incident_memory
- incidentes
- alertas
- fallback aplicado
- resolução
- reincidência

### 9.3 Estados canônicos

- `draft`
- `queued`
- `running`
- `waiting_input`
- `waiting_approval`
- `approved`
- `rework`
- `blocked`
- `failed`
- `retrying`
- `completed`
- `archived`

### 9.4 Regras de estado

- toda transição gera evento
- toda alteração de contexto gera diff
- toda aprovação gera registro
- toda reexecução gera `parent_run_id`
- override humano nunca apaga histórico
- memória persistente não pode ser sobrescrita sem versionamento

---

## 10) Governança de execução, logs e rerun

### 10.1 Regras gerais

- separar definição de nó e execução de nó
- cada execução deve ter `run_id`
- cada rerun deve ter `parent_run_id`
- toda fase crítica deve ter checkpoint
- todo checkpoint deve travar edge de saída até aprovação
- toda skill crítica deve gerar log obrigatório
- toda alteração manual deve gerar `manual_intervention_log`
- toda mutação de memória deve gerar `memory_mutation_log`
- toda aprovação deve gerar `approval_log`
- todo erro deve gerar `execution_log` e `alert_log` quando aplicável

### 10.2 Logs obrigatórios

- `execution_log`
- `decision_log`
- `manual_intervention_log`
- `memory_mutation_log`
- `approval_log`
- `rerun_log`
- `alert_log`

### 10.3 Governança de rerun

Toda reexecução deve conter:

- `rerun_id`
- `parent_run_id`
- `initiated_by`
- `reason`
- `scope`
- `target_id`
- `context_snapshot_id`
- `memory_policy`
- `approval_required`

### 10.4 Políticas de memória em rerun

- `inherit`
- `fork`
- `reset_partial`
- `reset_total`

### 10.5 Casos com governança obrigatória

- redefinição de oferta
- troca de design system
- alteração estrutural de checkout
- mudança de narrativa já publicada
- reset de memória do projeto

---

## 11) Schemas reutilizáveis

### 11.1 node_definition

```json
{
  "id": "NOD-BLD-10",
  "phase_id": "PHS-BLD-10",
  "nome": "Sales Page",
  "tipo": "phase_node",
  "camada": "build",
  "squad_responsavel": ["SQD-MKF", "SQD-EXP"],
  "agente_responsavel": ["AGT-MKF-04-Stratego", "AGT-CNT-01-Mercury", "AGT-EXP-02-Aura"],
  "skills": ["SKL-CNT-03-SalesPageCopy", "SKL-EXP-04-LandingPageUXMapping"],
  "inputs": ["strategy", "validated_copy", "design_system"],
  "outputs": ["DLV-PAGE-SalesPagePronta"],
  "depends_on": ["PHS-BLD-03", "PHS-BLD-06", "PHS-BLD-07"],
  "estado": "draft",
  "risco": "high",
  "kpis": [],
  "gatilho": "copy_and_design_ready",
  "memoria_escopo": ["content_memory", "artifact_registry"],
  "checkpoint_required": true,
  "approval_required": true,
  "manual_override_allowed": true,
  "rerun_allowed": true,
  "fallback_action": "revise_page_blocks"
}
```

### 11.2 edge_definition

```json
{
  "id": "EDG-BLD10-BLD11-01",
  "source": "NOD-BLD-10",
  "target": "NOD-BLD-11",
  "tipo": "sequence",
  "condicao": "CHK-07 approved",
  "blocking": true,
  "evento_emitido": "checkpoint_approved",
  "payload_ref": "CHK-07",
  "approval_gate": true
}
```

### 11.3 run_instance

```json
{
  "run_id": "RUN-20260413-0001",
  "node_id": "NOD-BLD-10",
  "phase_id": "PHS-BLD-10",
  "status": "running",
  "started_at": "[TIMESTAMP]",
  "ended_at": "[TIMESTAMP_PENDING]",
  "initiated_by": "system",
  "agent_ids": ["AGT-MKF-04-Stratego", "AGT-CNT-01-Mercury", "AGT-EXP-02-Aura"],
  "skills_used": ["SKL-CNT-03-SalesPageCopy", "SKL-EXP-04-LandingPageUXMapping"],
  "memory_read": ["content_memory", "artifact_registry"],
  "memory_write": ["content_memory"],
  "context_snapshot_id": "CTX-20260413-0001",
  "logs": ["execution_log"],
  "artifacts_generated": ["DLV-PAGE-SalesPagePronta"],
  "why_this_ran": "depends_on_resolved_and_trigger_copy_and_design_ready",
  "incident_id": "[INCIDENT_PENDING]"
}
```

### 11.4 rerun_instance

```json
{
  "rerun_id": "RERUN-20260413-0001",
  "parent_run_id": "RUN-20260413-0001",
  "initiated_by": "human",
  "reason": "headline_and_cta_need_rework",
  "scope": "node",
  "target_id": "NOD-BLD-10",
  "context_snapshot_id": "CTX-20260413-0002",
  "memory_policy": "fork",
  "approval_required": true,
  "status": "queued"
}
```

### 11.5 memory_entity

```json
{
  "memory_id": "MEM-content-0001",
  "memory_scope": "content_memory",
  "owner": "SQD-CNT",
  "current_version": "v12",
  "last_mutation_by": "AGT-CNT-01-Mercury",
  "last_mutation_at": "[TIMESTAMP]",
  "diff_ref": "CTX-20260413-0002",
  "impact": "sales_page_copy_changed",
  "status": "active"
}
```

### 11.6 manual_command

```json
{
  "command_id": "CMD-20260413-0001",
  "issued_by": "[HUMAN_OWNER_PENDING]",
  "target_scope": "node",
  "target_id": "NOD-BLD-10",
  "action": "edit_copy",
  "payload": {
    "instruction": "Reescreva a headline com mais luxo e precisão"
  },
  "approval_required": false,
  "log_ref": "manual_intervention_log"
}
```

### 11.7 incident

```json
{
  "incident_id": "INC-20260413-0001",
  "severity": "high",
  "owner": "SQD-ENG",
  "source_run": "RUN-20260413-0009",
  "blast_radius": "checkout",
  "affected_nodes": ["NOD-OPS-05", "NOD-OPS-07"],
  "affected_artifacts": ["DLV-INTEGRATION-Checkout"],
  "recovery_path": "rerun_checkout_integration",
  "ack_required": true,
  "status": "open"
}
```

---

## 12) Blueprint visual do canvas

### 12.1 Colunas

- `build`
- `ops`
- `control`

### 12.2 Swimlanes

- `SQD-CORE`
- `SQD-MKF`
- `SQD-CNT`
- `SQD-EXP`
- `SQD-ENG`
- `SQD-QRO`

### 12.3 Clusters

- `phases`
- `agents`
- `skills`
- `checkpoints`
- `decisions`
- `alerts`
- `memory`
- `manual_commands`
- `reruns`
- `kpis`

### 12.4 Níveis de zoom

#### Z0 — Visão executiva
- status global
- gargalos
- alertas críticos

#### Z1 — Visão por fase
- BUILD, OPS e CONTROL com estado e dono

#### Z2 — Visão por squad
- distribuição operacional e handoffs

#### Z3 — Visão por agente e skill
- última execução
- fila
- skill usada
- logs

#### Z4 — Visão de auditoria
- runs
- reruns
- diffs
- memória
- incidentes
- approvals

### 12.5 Expandir / recolher

#### Fase recolhida mostra
- estado
- risco
- dono
- checkpoint

#### Fase expandida mostra
- agentes
- skills
- inputs
- outputs
- dependências
- alertas
- reruns

#### Agente expandido mostra
- estado atual
- skill usada
- última execução
- sessão
- fila

#### Skill expandida mostra
- versão
- gatilho
- logs
- overrides

---

## 13) Matriz de intervenção humana

### 13.1 Pode editar
- narrativa vigente
- copy
- persona ativa
- oferta principal
- ordem de blocos da página
- regras de upsell e downsell
- skills habilitadas
- prioridade de squads
- critérios de checkpoint
- prompt mestre dos agentes
- regras de memória persistente
- thresholds de alerta

### 13.2 Pode aprovar
- `DEC-01`
- `DEC-02`
- `DEC-03`
- `DEC-04`
- `DEC-05`
- `DEC-06`
- checkout estrutural
- mudança narrativa publicada
- reset de memória
- rerun de fase aprovada

### 13.3 Pode corrigir
- bloco de copy
- asset
- prompt
- regra de tracking
- skill
- prioridade
- destino de handoff

### 13.4 Pode reexecutar
- fase
- skill
- agente
- bloco de copy
- geração de imagem
- montagem de PDF
- automação de entrega
- webhook pós-compra
- tracking sync
- relatório KPI

---

## 14) Matriz de logs e rastreabilidade

### 14.1 Todo evento relevante deve gerar trilha

- toda transição de estado gera evento
- toda intervenção humana gera log
- toda mutação de memória gera diff
- toda aprovação gera approval record
- toda decisão registra racional e aprovador
- todo erro crítico pode abrir incidente
- todo rerun registra razão, escopo e política de memória
- todo checkpoint bloqueia avanço até aprovação

### 14.2 Perguntas que o painel deve sempre conseguir responder

- o que está rodando agora?
- por que isso rodou?
- qual agente executou?
- qual skill foi usada?
- qual memória foi lida?
- qual memória foi escrita?
- qual artefato foi alterado?
- o que está travado?
- o que falhou?
- qual fallback foi aplicado?
- existe alerta aberto?
- existe approval pendente?
- há rerun em fila?
- qual é a narrativa vigente?

---

## 15) Placeholders explícitos

Use sempre placeholders quando faltar dado:

- `[PROJECT_NAME_PENDING]`
- `[AGENT_PENDING]`
- `[SKILL_PENDING]`
- `[NODE_PENDING]`
- `[RULE_PENDING]`
- `[ARTIFACT_PENDING]`
- `[PROMPT_PENDING]`
- `[INTEGRATION_PENDING]`
- `[KPI_PENDING]`
- `[CHECKPOINT_PENDING]`
- `[HUMAN_OWNER_PENDING]`

Marcar hipóteses com:

- `[HIPÓTESE]`

### Itens ainda pendentes de definição

- nome final do projeto
- agente definitivo de suporte / intake
- agente definitivo de QA auxiliar
- agente definitivo de imagem / asset generation
- owners humanos por approval / incident / rerun
- thresholds exatos de alerta
- regras de refund e políticas de suporte
- mapping completo dos 30+ skills ainda não listados

---

## 16) Contrato de saída obrigatório do Anti-Gravity

Entregue **exatamente nesta ordem**:

### A. Arquitetura canônica revisada
### B. Convenção de IDs
### C. Registries
- squads
- agentes
- skills
- checkpoints
- decisões
- alertas
- KPIs

### D. Schemas reutilizáveis
- `node_definition`
- `edge_definition`
- `run_instance`
- `rerun_instance`
- `memory_entity`
- `manual_command`
- `incident`

### E. BUILD MAP completo
### F. OPS MAP completo
### G. CONTROL FABRIC completo
### H. Blueprint visual do canvas
- layout
- swimlanes
- clusters
- zoom
- expand/collapse

### I. Matriz de intervenção humana
### J. Matriz de logs e rastreabilidade
### K. Placeholders explícitos
### L. Mermaid
- build
- ops
- control
- memory/state

### M. JSON robusto
### N. JSON minimalista
### O. Checklist final de auditabilidade

---

## 17) Prompt mestre resumido para execução imediata

Use a instrução abaixo como comando principal de execução, lendo este arquivo inteiro como base de referência:

```text
Atue como arquiteto de sistemas visuais, operacionais e auditáveis.

Transforme este projeto Anti-Gravity em uma especificação final pronta para implementação como painel interativo inspirado em n8n.

Separe rigorosamente:
1. BUILD
2. OPS
3. CONTROL

CONTROL deve ser tratado como camada transversal persistente de governança, observabilidade e intervenção.

Não produza diagrama estático.
Produza sistema operacional de agentes com:
- squads
- agentes
- skills
- memória
- estado
- checkpoints
- alertas
- logs
- rerun governance
- intervenção humana
- trilha de auditoria

Use o contexto, as convenções e os mapeamentos deste documento como base canônica.

Entregue exatamente na ordem A até O definida na seção "Contrato de saída obrigatório do Anti-Gravity".

Não invente dados sem marcar [HIPÓTESE].
Quando faltar dado, use placeholders explícitos.
Priorize rastreabilidade, controle humano, auditabilidade e legibilidade operacional.
```

---

## 18) Checklist final de auditabilidade

A resposta só será considerada correta se:

- BUILD, OPS e CONTROL estiverem separados de forma inequívoca
- CONTROL estiver claramente modelado como camada transversal
- squads, agentes e skills estiverem padronizados
- houver distinção entre definição e execução
- houver `run_instance`, `rerun_instance`, `context_snapshot`, `approval_instance` e `incident_instance`
- cada fase BUILD mostrar:
  - id
  - nome
  - squad_dono
  - agentes
  - skills
  - inputs
  - outputs
  - depends_on
  - checkpoint
  - decision_gate
  - estado
  - risco
  - artefatos
  - última execução
  - ações humanas permitidas
  - fallback
  - rerun_allowed
  - memory_scope
- cada etapa OPS mostrar:
  - id
  - nome
  - trigger
  - squad_dono
  - agente
  - skill
  - input
  - output
  - estado_vivo
  - fila
  - alertas
  - KPI ligado
  - fallback
  - rerun
  - erro mais recente
  - owner de incidente
- a camada CONTROL mostrar:
  - status global
  - approvals pendentes
  - filas
  - alertas
  - logs
  - diff de contexto
  - memória vigente
  - comandos manuais
  - reruns
  - incidentes
  - why_this_ran
- a memória estiver modelada como entidade governada
- toda mutação de memória gerar diff, autor, timestamp, impacto e versão
- existir matriz de intervenção humana
- existir matriz de logs e rastreabilidade
- existir convenção de IDs consistente
- existir blueprint visual do canvas com zoom e expand/collapse
- existir JSON robusto e JSON minimalista
- existir checklist final de auditabilidade

---

## 19) Observação final para implementação

Este documento não deve ser tratado como brainstorming.  
Ele deve ser tratado como **briefing técnico-operacional definitivo** para que o Anti-Gravity devolva uma arquitetura implementável, visual, interativa e governável.

Se houver conflito entre trechos menores e as regras estruturais deste documento, prevalece:

1. separação entre BUILD, OPS e CONTROL  
2. governança de memória e rerun  
3. rastreabilidade por logs, diffs e incidentes  
4. capacidade de intervenção humana sem perda de contexto  
5. auditabilidade operacional ponta a ponta
