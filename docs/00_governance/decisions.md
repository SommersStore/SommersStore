# Decisions - Control Hub

## 2026-05-22 - Centralizar execucao no Codex

**Decisao:** Codex sera o executor tecnico principal; Antigravity sera o ambiente/orquestrador.  
**Motivo:** reduzir conflito entre agentes e evitar que ferramentas diferentes sobrescrevam a mesma base.  
**Alternativas descartadas:** GenSpark como estrutura principal; Gemini/Claude Code editando o mesmo worktree.  
**Impacto:** toda mudanca estrutural deve passar por story, auditoria e gates.

## 2026-05-22 - Excluir GenSpark do fluxo principal

**Decisao:** GenSpark fica fora do projeto principal.  
**Motivo:** o objetivo atual e simplificar, nao adicionar mais uma ferramenta.  
**Impacto:** prompts e documentos novos devem mirar Antigravity + Codex.

## 2026-05-22 - Reconstrucao por envoltorio

**Decisao:** nao reconstruir do zero abandonando o painel atual; criar uma visao limpa sobre o que ja funciona.  
**Motivo:** o repositorio ja contem dashboard, loja digital, Firebase, Financas, IR, Electro, Pajero e testes operacionais.  
**Alternativas descartadas:** mover tudo para `/legacy` antes de classificar; criar app novo sem migracao seletiva.  
**Impacto:** o painel atual continua operacional enquanto o Control Hub comercial nasce como camada mais clara.

## 2026-05-22 - Bloquear `git add .` por enquanto

**Decisao:** nao executar `git add .` nem commit de backup amplo enquanto o worktree estiver sujo.  
**Motivo:** ha arquivos de memoria, sessoes, arquivos Pajero novos, painel, server e testes misturados no mesmo estado.  
**Impacto:** antes de commit, classificar arquivos por escopo e preparar commits menores.

## 2026-05-22 - Separar hub comercial de projetos adjacentes

**Decisao:** Control Hub comercial deve priorizar Produtos Digitais, Electro Commerce e Finance & Tax.  
**Motivo:** esta e a rota principal de negocio.  
**Nuance:** Pajero e Saude nao devem ser apagados nem desvalorizados; ficam como projetos adjacentes/operacionais, fora da primeira tela comercial.

## 2026-05-22 - Financeiro exige camada de seguranca

**Decisao:** Finance & Tax deve separar CNPJ, PF e IR, e distinguir dados reais de estrutura.  
**Motivo:** risco de expor dados sensiveis ou misturar vida pessoal com operacao comercial.  
**Impacto:** antes de expandir automacoes financeiras, auditar o que esta versionado e o que deve ir para armazenamento protegido.

## 2026-05-22 - Consolidar navegacao primaria

**Decisao proposta:** a sidebar primaria deve tender a `Master`, `E-books`, `Site / Produtos` e `Financas`.  
**Motivo:** reduzir duplicidade entre abas laterais e coluna Projetos.  
**Nuance:** `Memory`, `Salvar Tudo`, `Pasta Conectada`, `Squads`, `Clones`, `Pajero` e `Saude` nao devem ser apagados; devem ser reagrupados em Master, infraestrutura ou projetos adjacentes.  
**Impacto:** a proxima etapa de UI deve consolidar navegacao antes de criar novas features.

## 2026-05-23 - Aplicar consolidacao visual da sidebar

**Decisao:** a sidebar visivel do dashboard passa a mostrar `Master`, `E-books`, `Site` e `Financas`.  
**Motivo:** implementar a proposta sem apagar views legadas nem quebrar memoria/contexto.  
**Preservacao:** `Memory`, `Funil`, `Projeto`, `Mapa`, `Pajero Full`, `Saude` e `Ops Desk` ficam acessiveis por atalhos do Master/compatibilidade. `Salvar Tudo` e `Conectar Pasta` permanecem no header.  
**Impacto:** a proxima etapa deve embutir o canvas do `Mapa` diretamente em `Construcao`, reduzindo dependencia do pane legado.

## 2026-05-23 - Embutir Mapa em Construcao

**Decisao:** `Construcao` passa a renderizar o fluxograma de `MAP_DATA` diretamente no Master para projetos com mapa existente.  
**Motivo:** aproximar a construcao do modelo visual tipo N8N sem perder o editor legado.  
**Preservacao:** o pane `Mapa` continua ativo como editor completo; o Master apenas reaproveita a mesma fonte visual e envia selecoes para o inspector compacto.  
**Impacto:** proximas melhorias devem migrar controles de edicao do Mapa antigo para dentro do Master de forma gradual.

## 2026-05-23 - Padronizar instancia local em 4000

**Decisao:** `http://localhost:4000/` volta a ser a porta canonica do workspace atual `.gemini/antigravity-ide/scratch/SommersStore`.  
**Motivo:** a porta `4000` estava ocupada por copia antiga em `.gemini/antigravity/scratch`, enquanto a base atual precisava rodar em `4001`, gerando ambiguidade operacional.  
**Preservacao:** a porta `4001` fica dispensavel para a validacao corrente; se for usada no futuro, deve ser explicitamente tratada como instancia temporaria.  
**Impacto:** o dashboard passa a expor `/api/runtime/info` e um selo no header para mostrar porta, workspace e tipo de instancia antes de novas alteracoes estruturais.

## 2026-05-23 - Migrar controles simples do Mapa para Construcao

**Decisao:** `Construcao` passa a ter controles nativos de filtro, salvamento e troca protegida de status no canvas embutido.  
**Motivo:** reduzir a dependencia diaria do pane `Mapa` sem trazer ainda edicao pesada de nos/arestas para dentro do Master.  
**Preservacao:** o pane `Mapa` continua como editor completo para criar, excluir, conectar, importar/exportar e editar detalhes complexos.  
**Impacto:** proximas iteracoes podem migrar edicao mais avancada de forma gradual, com menor risco operacional.

## 2026-05-24 - Proteger edicao rapida do Mapa no Master

**Decisao:** `Construcao` recebe um `Modo edicao` explicito para criar, duplicar e excluir nos simples do mapa embutido.  
**Motivo:** permitir ajustes pequenos no fluxo sem abrir o pane `Mapa`, mas mantendo friccao suficiente para evitar edicoes acidentais.  
**Preservacao:** nos de pipeline continuam protegidos contra exclusao rapida; conexoes/arestas e edicoes complexas continuam no editor legado.  
**Impacto:** a proxima expansao do canvas deve tratar conexoes com um modo dedicado e reversivel, nao como acao solta.

## 2026-05-24 - Criar AIOX Master Next em paralelo

**Decisao:** criar um novo painel `AIOX Master Next` em `docs/aiox_master_next.html`, sem substituir o dashboard atual.  
**Motivo:** testar uma experiencia node-based mais ampla e interativa, com canvas em tela cheia, sem arriscar o trabalho estabilizado no AIOX Master existente.  
**Preservacao:** `docs/aiox_dashboard.html` permanece intocado como painel principal; o novo estado fica isolado em `docs/control/aiox_master_next_state.json`.  
**Impacto:** futuras melhorias devem ser testadas no Next primeiro; somente depois de validacao podem migrar para o painel principal.

## 2026-05-24 - Evoluir o Next por incrementos reversiveis

**Decisao:** adicionar templates, undo/redo e conexao guiada primeiro no `AIOX Master Next`.  
**Motivo:** o usuario aprovou a direcao do novo painel; o proximo gargalo pratico era iniciar fluxos rapidamente e corrigir acoes sem medo.  
**Preservacao:** o dashboard principal continua fora do escopo desta mudanca, e o estado do Next segue isolado em `docs/control/aiox_master_next_state.json`.  
**Impacto:** proximas melhorias podem focar execucao real por agentes, versoes/snapshots de projeto e importacao/exportacao antes de migrar qualquer padrao para o painel antigo.

## 2026-05-24 - Priorizar esteira sequencial no Next

**Decisao:** o fluxo de criacao de produto no `AIOX Master Next` deve ser sequencial, numerado e orientado da esquerda para a direita.  
**Motivo:** o usuario rejeitou a dinamica solta de abrir/criar nos fora de ordem; a experiencia precisa comecar no primeiro no, iniciar trabalho e abrir automaticamente o proximo apos a conclusao.  
**Preservacao:** templates livres e conexoes manuais continuam disponiveis para uso avancado, mas o caminho recomendado para produto novo passa a ser `Produto guiado`.  
**Impacto:** upsell e downsell devem ser adicionados como etapas sequenciais futuras depois dos order bumps, mantendo a mesma mecanica de start/concluir/proximo.

## 2026-05-24 - Tornar squads e producao explicitos no Next

**Decisao:** cada no do `AIOX Master Next` deve mostrar squad executor, missao, agentes, skills, clones e perguntas de briefing.  
**Motivo:** o usuario nao quer apenas operar um mapa; ele quer dar o start, responder ao briefing e ter os materiais produzidos pelo Codex/squads.  
**Correcao:** a atribuicao automatica passa a usar os vinculos reais do `docs/control/registry.json`, incluindo skill-agente e persona-agente, em vez de depender apenas dos primeiros agentes ou de busca por palavra-chave.  
**Impacto:** a proxima etapa deve conectar o `Start/Avancar` a geracao real de artefatos locais: e-book principal, HTML de area de membros, PDF e entregaveis free/order bump.

## 2026-05-24 - Usar o Next como cockpit de producao real

**Decisao:** o `AIOX Master Next` deixa de ser apenas um mapa operacional e passa a registrar produtos com artefatos reais anexados aos nos sequenciais.  
**Motivo:** o usuario quer dar briefing inicial e receber materiais produzidos pelo Codex/squads, nao apenas instrucoes para preencher o mapa manualmente.  
**Primeira validacao:** produto `Velas Aromaticas` gerado com e-book principal em HTML, 2 entregaveis free, 2 order bumps, brief, manifest e arquivos vinculados ao estado `docs/control/aiox_master_next_state.json`.  
**Impacto:** Upsell e Downsell devem continuar a esteira ja criada, mas a proxima evolucao tecnica precisa transformar o botao `Start/Avancar` em gerador semi-automatizado de arquivos por etapa.
