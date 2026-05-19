# Task Board (Canonical)

## Current Focus
- [x] Validar e operar a nova memoria em camadas no fluxo diario
- [x] Corrigir fragilidades do painel que afetam continuidade (editor/memory wiring)
- [x] Rodar validacao operacional real do ciclo startup/shutdown no painel
- [x] Auditoria tecnica completa do painel AIOX (server, frontend, registry, memoria)
- [x] Implementar correcoes P0 da auditoria (KPIs nulos, project_id em logs)
- [x] Implementar correcoes P1 (cores squads, handles AGENTS.md, rotacao JSONs)
- [x] Criar projeto Financas inicial inspirado na aba Funil do AIOX Master

## Pending Work
- [x] Handoff UX Master > Clones: remover gaveta lateral grande/flutuante e restaurar abertura dos clones dentro do `Inspector` compacto existente.
- [x] Consolidar eventos automaticos de memoria (execution + checkpoint + mutation)
- [x] Popular KPIs com valores reais em registry.json (P0 auditoria)
- [x] Garantir project_id em todos os log entries (P0 auditoria)
- [x] Diferenciar cores SQD-CORE vs SQD-MEM (P1 auditoria)
- [x] Mapear handles de agentes no AGENTS.md (P1 auditoria)
- [x] Proteger gravacoes do painel antigo com escrita atomica e validacao JSON (P1 auditoria)
- [x] Restaurar navegacao lateral completa do painel antigo e proteger sub-abas do Ops Desk/Clones
- [x] Reverter refinamento rejeitado do Master > Squads e estabilizar inspector lateral
- [/] Avancar para conteudo (ebooks) com checkpoints ativos
- [ ] Preparar trilha de integracao de checkout
- [x] Retomar drag-and-drop de squads (agente, skill, persona/clone)
- [x] Evoluir aba Financas para painel interativo com entrada de dados
- [x] Refinar aba Financas com mapa operacional no modelo da aba Mapa
- [ ] Evoluir projeto Financas com pesquisa juridica, simulacoes e intake real das dividas
- [/] Alimentar o painel Financas com credores, gastos reais, propostas e documentos
- [ ] Modularizar HTML do painel (P2 auditoria)
- [x] Anexar fichas tecnicas do projeto Pajero aos clones corretos
- [x] Criar projeto Imposto de Renda inicial com brief, funil, estado e checklist
- [ ] Alimentar projeto IR com informes de rendimento e documentos reais
- [ ] Integrar aba IR no painel AIOX Dashboard
- [x] Corrigir travamento das subabas de Financas (Planilha, Dividas, Imp. de Renda e Mapa)
- [x] Refinar visual da subaba Imp. de Renda em duas/tres colunas
- [x] Corrigir botoes da subaba Imp. de Renda preservando a ficha fiscal ativa
- [x] Corrigir botoes externos e abertura de arquivos da subaba Imp. de Renda
- [x] Reformular visual da subaba Imp. de Renda para reduzir espacos vazios

## Done in this session
- [x] Story 2.27 concluida: painel raiz auditado em 21 abas/panes e area de membros restaurada/refinada a partir da base de 11/05/2026.
- [x] Corrigido erro de runtime `REGISTRY is not defined` no painel, assets quebrados da aba Saude, favicon ausente e faixa `ir-det-summary` da subaba IR.
- [x] Catalogo do hub restaurado do checkpoint `3722728`, removendo placeholders `Novo Item` e corrigindo entregaveis com PDFs/viewers existentes.
- [x] Area de membros ganhou visual premium colorido com hero, estatisticas, sidebar, prateleiras horizontais, cards responsivos e fallback de capas.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test`, Puppeteer no painel e hub, `npm run typecheck` do app, ESLint focado em `app/hub/HubClient.tsx` e JSON do catalogo.
- [x] Observacao: `cd projects/loja-digital; npm run lint` completo excedeu 120s ao varrer o projeto inteiro; o arquivo alterado passou no lint focado.
- [x] `out_deploy` regenerado com `npm run build` e publicado no Firebase Hosting; `/hub` publico validado com a nova area de membros.
- [x] Fluxo `Salvar Tudo` executado manualmente pelo Codex enquanto o botao do painel fica em quarentena de confianca.

- [x] Story 2.26 concluida: subaba `Imp. de Renda` reformulada visualmente para ocupar melhor o painel.
- [x] Grid desktop do detalhe IR agora preenche a altura util, com colunas de arquivos, resultado e fichas mais proporcionais.
- [x] Adicionados contadores de arquivos, trilha visual de progresso e bloco hero do resultado estimado com barras fiscais.
- [x] Breakpoints validados em 1440x900, 1000x800, 760x800 e 390x760.

- [x] Story 2.25 concluida: botoes `RODAR ECAC AGENT`, `PREENCHER IRPF2025` e arquivos da declaracao respondem ao clique.
- [x] Corrigido mismatch de IDs entre HTML e handlers `ecacRunAgent`/`ecacPreencherIRPF`.
- [x] Linhas de arquivos do IR viraram botoes com `data-ir-path` e handler `irOpenArquivo`.
- [x] Adicionado endpoint `/api/ir/open` com allowlist de pastas IR/e-CAC e validacao 403/404.
- [x] Validacao concluida em Puppeteer com chamadas externas interceptadas, alem de `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Story 2.24 concluida: botoes `+ Adicionar` do IR preservam a ficha ativa apos re-render.
- [x] Reproduzido em Puppeteer: `+ Adicionar Deducao` adicionava linha, mas voltava para `Rendimentos`, parecendo nao responder.
- [x] Adicionado estado `fin2IrActiveFicha`, `data-ir-ficha` nos botoes e restauracao da ficha ativa apos `fin2RenderIR`.

- [x] Story 2.23 concluida: subaba `Imp. de Renda` reorganizada em layout visual responsivo.
- [x] IR agora separa arquivos, resultado/acoes e fichas fiscais em colunas, com resumo compacto.
- [x] Assertions adicionadas para preservar layout IR em colunas.

- [x] Story 2.22 concluida: navegacao interna de Financas destravada.
- [x] Corrigido fechamento de `ecacOpenModal` em `docs/aiox_dashboard.html`, permitindo registrar `fin2Switch`.
- [x] Teste de qualidade atualizado para validar parse dos scripts inline e wiring dos botoes `fin2-btn-*`.
- [x] Validacao concluida: Puppeteer em `http://localhost:4000/`, `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0526

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0525

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0493

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0492

- [x] Story 2.21 concluida: projeto Imposto de Renda criado com todos os artefatos iniciais.
- [x] Criados `projects/imposto-de-renda/`: README, brief, funil operacional (10 etapas), estado JSON e checklist de documentos.
- [x] Registrado projeto `imposto-de-renda` em `docs/control/project_flows.json` com 6 fases de construcao e 3 de operacao.
- [x] Story 2.21 aberta em `docs/stories/2.21.story.md`.

- [x] Story 2.20 concluida: fichas tecnicas Pajero criadas e anexadas aos 12 clones corretos.
- [x] Criadas 8 fichas em `Pajero/manuals/fichas-tecnicas/` com fonte, status, aplicabilidade e clones consumidores.
- [x] Atualizados `docs/control/persona_materials.json`, `Pajero/data/squad-roster.json` e `Pajero/squad/data/reference-matrices.json`.
- [x] Fontes pendentes da Pajero reconciliadas sem liberar torque, fluido, capacidade, peca ou procedimento sem validacao oficial.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0400

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0397

- [x] Projeto Financas criado com brief, funil operacional, templates de dados e registro no Master Hub/Funil.
- [x] Story 2.14 aberta para rastrear o projeto Financas inicial.
- [x] Fontes oficiais iniciais mapeadas para superendividamento, cidadania financeira, CVM e Tesouro Direto.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck` e `npm test`.
- [x] UX ajustada: Financas saiu do submenu Funil e virou aba lateral abaixo de Projeto.
- [x] Painel Financas aprimorado com abas internas, KPIs, formularios, tabelas editaveis, metas, plano operacional e persistencia em `projects/financas/data/finance_state.json`.
- [x] Teste visual via Puppeteer confirmou aba ativa, KPIs, abas internas e formulario de dividas.
- [x] Story 2.16 concluida: aba Financas agora segue o modelo da aba Mapa com toolbar refinada, filtros, legenda, canvas operacional, nos conectados e detalhe lateral.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando 7 KPIs, 12 nos, 12 conexoes, detalhe lateral e filtro `Pressao`.
- [x] Story 2.17 concluida: planilha `Financeiro 2026.xlsx` analisada e integrada a aba Financas.
- [x] Snapshot importado: receita R$ 15.507,03, despesas R$ 1.870, divida total R$ 178.744, parcelas mensais R$ 5.815,44 e reserva R$ 50.
- [x] Dividas individualizadas por credor/linha a partir da aba `PESSOAL`, mantendo totais iguais aos da planilha.
- [x] Subaba `Planilha` adicionada em Financas com origem, abas lidas, alertas de qualidade, workflow e sugestoes de melhoria.
- [x] Artefatos criados: `projects/financas/data/financeiro_2026_import.json` e `projects/financas/financeiro_2026_review.md`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando subaba `Planilha`, 7 KPIs e 13 nos no mapa.
- [x] Story 2.18 concluida: Financas rebaseada na aba `SsS Ltda 2025`.
- [x] Snapshot operacional de maio/2026 importado: receita R$ 11.257, despesas R$ 2.792, dividas mensais R$ 11.654, saldo mensal -R$ 3.189 e acumulado -R$ 14.261.
- [x] Forecast mensal de novembro/2025 a dezembro/2026 exposto na subaba `Planilha`.
- [x] Artefatos criados: `projects/financas/data/financeiro_2026_sss_ltda_2025_import.json` e `projects/financas/financeiro_2026_sss_ltda_2025_review.md`.
- [x] Validacao concluida: `npm run lint`, `npm run typecheck`, `npm test` e Puppeteer em `http://localhost:4000/` confirmando 14 linhas de forecast.

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0306

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0305

- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0303

- [x] Reparo do painel: sidebar completa restaurada (Status, Control/Ops Desk, Memory, Squads, Agents, Skills, Personas) e `Clones` voltou a carregar assets enriquecidos via `/api/personas/assets`.
- [x] Varredura do painel: endpoints GET do dashboard responderam 200, todas as abas laterais/sub-abas do Ops Desk abriram e Master > Sais > Clones renderizou 6 clones com arquivos presentes.
- [x] Validacao do painel: `npm run lint`, `npm run typecheck`, `npm test` e sweep via Puppeteer em `http://localhost:4000/`.
- [x] Sessao encerrada pelo usuario.
- [x] Resumo: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Proxima acao: Retomar aprimoramentos no painel, priorizando clones e depois evoluir abas de agentes e skills, validando continuamente memoria/contexto.
- [x] Checkpoint: CHK-MEM-0265

- [x] Estabilização do Dashboard (Rotação de logs implementada).
- [x] Restauração do Clone Inspector (Gaveta removida).
- [x] Limpeza de arquivos de memória (project_memory.md e task.md).
- [x] Diagnóstico de hardware do usuário (C: com 26GB livres).
- [x] Geração do PDF Editorial: "O Cofre das Botânicas Secretas" (28 páginas).
- [x] Draft do Volume I de "THE BLACK PROTOCOL" (Manifesto e Guia).

## Risks
- Automacao implantada precisa de validacao operacional recorrente para detectar regressao cedo.
- Se `task.md` nao for mantido, o protocolo Oracle/Scribe perde eficacia.

## Last updated
- updated_at: 2026-05-18T17:05:18-03:00
