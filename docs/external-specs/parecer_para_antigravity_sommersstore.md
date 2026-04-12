# Documento para avaliação do Antigravity  
## Diagnóstico, percepções, sugestões de arquitetura e pedido formal de parecer

**Data:** 11 de abril de 2026  
**Projeto em análise:** SommersStore / Sommer's Story / ecossistema AIOX  
**Objetivo deste documento:** apresentar, de forma minuciosa, o contexto completo discutido até aqui, as percepções técnicas levantadas, as sugestões de reorganização propostas e solicitar ao Antigravity um parecer crítico, franco e detalhado sobre cada ponto.

---

# 1. Contexto deste documento

Estou conduzindo um projeto dentro do Antigravity e tenho enfrentado problemas recorrentes de continuidade, perda de contexto, alucinação, regressão de trabalho e dificuldade de saber se uma entrega realmente ficou completa.

Ao longo da conversa com o ChatGPT, foi feita uma análise sobre:

- o comportamento operacional do Antigravity no meu caso;
- a forma como estou organizando projetos, subprojetos, squads, agentes e skills;
- a hipótese de criar GPTs especializados para atuar em conjunto;
- a necessidade de uma camada de memória mais confiável;
- a estrutura do meu ecossistema SommersStore, inclusive com base no arquivo de mapeamento da arquitetura enviado por mim.

Este documento reúne **todas as percepções centrais** levantadas nessa análise e pede ao Antigravity que responda a elas de maneira estruturada.

---

# 2. Problema relatado por mim

Os problemas que venho enfrentando no Antigravity, resumidos da forma mais objetiva possível, são estes:

## 2.1 Alucinação e perda de contexto
Em vários momentos, o Antigravity começa um trabalho bem, mas depois:

- perde contexto;
- retroage em relação ao que já havia sido bem construído;
- introduz mudanças indevidas;
- mistura informações de partes distintas do projeto;
- passa a operar com uma coerência inferior à que tinha minutos antes.

## 2.2 Travamentos e reinícios
Em pelo menos uma ocasião, o sistema travou e eu precisei reiniciar o processo. Felizmente, eu tinha cópias dos arquivos, mas isso evidenciou um problema sério de continuidade operacional.

## 2.3 Dificuldade de garantir completude real
Mesmo quando parte do trabalho parece boa, nem sempre fica claro:

- se a tarefa foi concluída por completo;
- se todos os arquivos relevantes foram atualizados;
- se houve regressão silenciosa;
- se o agente esqueceu decisões anteriores;
- se o estado do projeto continua íntegro.

## 2.4 Dependência excessiva de persona, squad e skills
Minha percepção inicial foi a seguinte:

- se a persona do agente não estiver boa, ele não desenrola o trabalho;
- se o squad não estiver bom, o trabalho não sai;
- se as skills não estiverem devidamente configuradas, o trabalho também falha;
- pedir correções pontuais ao Antigravity nem sempre resolve, porque algumas falhas são visíveis, mas outras permanecem ocultas.

## 2.5 Necessidade de produzir entregas visuais de alto nível
Eu preciso que o sistema consiga, com consistência, produzir:

- página de vendas bonita e refinada;
- área de membros bonita e refinada;
- replicação de layout a partir de referência visual;
- fidelidade estética;
- continuidade de estilo entre as partes do funil e do produto.

---

# 3. Situação estrutural do projeto

O projeto mencionado por mim envolve a marca/ecossistema **SommersStore** ou **Sommer's Story**, com foco em ofertas digitais e funis de venda.

No momento da conversa, o caso concreto citado por mim era:

- produto principal relacionado a **sais de banho**;
- existência de elementos como:
  - página de vendas;
  - área de membros;
  - e-book de upsell;
  - funil com upsell e downsell;
- possibilidade de abrir depois outros produtos, como **velas aromáticas**;
- dúvida estratégica sobre manter tudo dentro de um projeto principal com subprojetos ou separar cada produto/oferta em projetos independentes.

---

# 4. Mapa da arquitetura analisado

Foi analisado o mapa completo da arquitetura do ecossistema SommersStore. Os pontos centrais identificados a partir desse mapa foram:

## 4.1 Estrutura raiz ampla e centralizada
Existe um root único do projeto, contendo muitos elementos nucleares:

- AGENTS.md
- MASTER_BLUEPRINT.md
- SOUL_SNAPSHOT_PROJECT_SAIS.md
- core-config.yaml
- .aiox-ai-config.yaml
- .env
- firebase.json
- package.json
- disaster_recovery_strategy.md
- elite-sales-pages-content.json

## 4.2 Núcleo AIOX bastante extenso
No `.aiox-core/` há um framework robusto com:

- muitos agentes especializados;
- vasta biblioteca de tasks;
- scripts operacionais diversos;
- skills técnicas múltiplas;
- camadas de automação e governança.

## 4.3 Agentes sincronizados em 4 IDEs
Há sincronização de agentes em:

- Codex
- Cursor
- Gemini
- GitHub

## 4.4 Documentação central extensa
A pasta `docs/` contém, entre outras coisas:

- brandbooks;
- specs externas;
- checkpoints;
- material de marketing;
- dashboard;
- fluxograma;
- mapa mental;
- estado de pipeline;
- mapas do projeto;
- imagens de referência.

## 4.5 Knowledge base muito grande
A pasta `knowledge/` contém:

- DNA da marca;
- memória do projeto;
- dicionário de skills;
- avatares;
- design systems;
- layout engine spec;
- voice and tone;
- clones de experts;
- frameworks de copy;
- exemplos de marketing;
- protocolos operacionais;
- personas;
- specs de projetos;
- prompts mestres;
- convenções técnicas e de infraestrutura.

## 4.6 Aplicação principal Next.js
Há um projeto de loja digital com:

- login;
- hub/área de membros;
- páginas de vendas;
- páginas de VSL;
- páginas de upsell;
- visualizador dinâmico;
- design system CSS;
- guarda de autenticação;
- configuração Firebase;
- imagens e downloads;
- bibliotecas visuais do e-book.

## 4.7 Estruturas adicionais
Há também:

- `scripts/`
- `squads/`
- `funnels/`
- `config/`
- `archive/`

## 4.8 Indícios de múltiplas verticais/produtos no mesmo ecossistema ativo
O mapa mostra, entre outras coisas:

- `ds_sais.json`
- `ds_velas.json`
- `squad-velas.yaml`
- funil de sais
- material de branding e operação que aponta para mais de uma frente de produto

---

# 5. Diagnóstico principal levantado na análise

A principal conclusão da análise foi a seguinte:

> O problema central talvez não seja simplesmente "falta de mais agentes" ou "persona insuficiente", mas sim **arquitetura de contexto, persistência de estado, isolamento de oferta e governança operacional**.

Em termos mais práticos, a leitura feita foi:

## 5.1 Não parece faltar estrutura; parece haver estrutura demais no mesmo espaço operacional
O ecossistema já está muito rico. O risco não é pobreza de sistema. O risco é:

- excesso de contexto concorrente;
- contexto amplo demais para a tarefa da vez;
- herança indevida de decisões antigas;
- mistura entre framework, marketing, branding, produto, entrega e múltiplas ofertas.

## 5.2 O sistema parece mais próximo de um “metaecossistema” do que de um “projeto de entrega isolado”
Foi usada a ideia de que o SommersStore atual parece um **metaecossistema**, ou seja, um grande sistema operacional do negócio.

Isso pode ser bom para escala futura, mas ruim para a etapa atual, na qual eu preciso de **confiabilidade de execução por oferta/produto**.

## 5.3 O problema pode estar menos na memória “espontânea” e mais na ausência de uma memória canônica obrigatória
Embora já existam arquivos como:

- `project_memory.md`
- snapshots
- checkpoints
- blueprints
- pipeline state

a percepção foi a de que a memória está **distribuída demais** e talvez não esteja organizada como um **ritual operacional obrigatório** de começo e fim de sessão.

## 5.4 O problema pode ser agravado por múltiplos produtos ou verticais sob o mesmo guarda-chuva ativo
A presença de contextos como:

- sais;
- velas;
- squads diversos;
- design systems diversos;
- materiais múltiplos;

pode estar favorecendo contaminação de contexto entre iniciativas.

---

# 6. Posição técnica sugerida ao longo da análise

Foi defendida uma posição relativamente firme:

## 6.1 Não colocar toda a esperança em “mais GPTs” ou “mais personas”
A análise foi franca ao dizer que criar muitos GPTs especializados pode ajudar **como camada de especificação, crítica e auditoria**, mas não resolve sozinho o problema estrutural.

A leitura foi de que:

- GPTs podem funcionar como copilotos de briefing, auditoria e refinamento;
- mas o problema operacional do Antigravity não desaparece só com mais agentes conversacionais;
- sem arquitetura de contexto e handoff bem definidos, mais agentes podem inclusive aumentar o ruído.

## 6.2 Não depender de prompt monolítico
Também foi apontado que não seria saudável concentrar tudo em:

- uma persona enorme;
- um prompt gigantesco;
- instruções muito densas e permanentes.

A sugestão foi caminhar na direção de:

- contexto escopado;
- handoff explícito;
- memória operacional curta, objetiva e atualizada;
- assets e decisões bem travados;
- leitura obrigatória do estado do projeto no início de cada sessão.

---

# 7. Sugestão principal sobre estrutura de projetos

Esta foi a recomendação central sobre a organização macro:

## 7.1 Separar “Core” de “Oferta”
Em vez de manter tudo em um único grande projeto operacional, foi sugerido separar em dois níveis:

### A. Projeto/plataforma-mãe
Exemplo de nome conceitual:
- `SommersStore-Core`

Responsável por guardar apenas o que é compartilhável/reutilizável:
- framework AIOX;
- agentes-base;
- skills-base;
- tasks-base;
- scripts-base;
- protocolos;
- templates;
- convenções;
- design system global;
- regras operacionais globais;
- eventualmente assets institucionais realmente transversais.

### B. Projetos de oferta independentes
Exemplos:
- `SommersStore-Sais`
- `SommersStore-Velas`
- `SommersStore-Difusores`

Cada projeto de oferta conteria apenas o ecossistema daquela oferta específica:
- copy;
- funnel;
- sales page;
- VSL;
- upsell;
- downsell;
- área de membros;
- brandbook específico;
- design tokens específicos;
- assets específicos;
- checkpoints específicos;
- memória específica.

## 7.2 Regra proposta
Foi sugerida a seguinte regra operacional:

> **Um produto/oferta ativo = um projeto ativo**

e também:

> **Novo produto deve nascer como novo projeto, e não como extensão orgânica do projeto anterior**

---

# 8. Recomendação específica para o caso atual

Como, no momento, o caso concreto mais avançado é o produto de **sais**, a sugestão foi:

## 8.1 Manter somente Sais como projeto de entrega ativo agora
Ou seja:

- continuar o trabalho dos sais;
- congelar a expansão para velas por enquanto;
- não misturar mais uma vertical enquanto a arquitetura operacional dos sais não estiver sólida.

## 8.2 Criar ou extrair um “Core” separado
Mover para um núcleo compartilhado apenas:
- base AIOX;
- agentes-base;
- skills-base;
- templates;
- protocolos;
- scripts;
- convenções.

## 8.3 Deixar o projeto de Sais conter tudo o que pertence ao produto Sais
Dentro de `SommersStore-Sais`, deixar:
- área de membros;
- e-book do upsell;
- sales page;
- VSL;
- order bump, upsell, downsell;
- identidade visual do produto;
- docs do funil;
- checkpoints;
- memória operacional do produto.

## 8.4 Não abrir Velas como subprojeto do workspace ativo de Sais
A sugestão foi que, quando chegar a hora de trabalhar velas:
- criar um novo projeto principal independente;
- herdar somente a estrutura-base;
- não herdar automaticamente a memória, a copy e os assets do projeto de sais.

---

# 9. Sugestão sobre “agente de memória”

Eu havia levantado a hipótese de criar um agente específico com skills para cuidar da memória e garantir continuidade.

A resposta dada foi, em essência, a seguinte:

## 9.1 Um agente de memória pode até existir, mas não deve ser a solução principal
A solução principal recomendada foi **uma camada de memória canônica obrigatória**, baseada em arquivos fixos e rituais operacionais.

## 9.2 Arquivos sugeridos para existir em cada projeto de oferta
Foram sugeridos arquivos como:

- `PROJECT_STATE.md`
- `DECISIONS_LOG.md`
- `NEXT_ACTIONS.md`
- `DO_NOT_CHANGE.md`
- `ACCEPTANCE_CRITERIA.md`
- `DESIGN_LOCK.md`
- `FUNNEL_CANON.md`
- `SESSION_HANDOFF.md`

Em versões anteriores da conversa, também foi sugerido um conjunto muito parecido com nomes como:
- `DECISIONS.md`
- `STYLE_SYSTEM.md`
- `CONTENT_INDEX.md`

A essência da sugestão foi a mesma: criar um **pacote canônico de estado do projeto**.

## 9.3 Ritual sugerido para início de cada sessão
Toda sessão deveria começar com:
1. leitura dos arquivos canônicos;
2. resumo do estado atual;
3. confirmação do que está travado e não deve ser alterado;
4. identificação clara da tarefa da sessão.

## 9.4 Ritual sugerido para fim de cada sessão
Toda sessão deveria terminar com:
1. atualização dos arquivos de memória;
2. registro do que mudou;
3. registro dos arquivos alterados;
4. atualização das próximas ações;
5. criação de checkpoint/handoff;
6. gravação de screenshot/artefato/estado quando houver interface.

---

# 10. Sugestão sobre número de agentes ativos por sessão

Outra recomendação importante foi:

## 10.1 Reduzir o número de agentes efetivamente ativos em cada bloco de trabalho
A leitura foi que o ecossistema atual tem muita riqueza estrutural, mas isso não significa que todos os agentes precisam estar “cognitivamente presentes” em toda sessão.

Foi sugerido reduzir o conjunto ativo por tarefa, por exemplo:

- 1 orquestrador;
- 1 executor principal;
- 1 auditor/QA;
- opcionalmente 1 especialista visual ou de copy, quando necessário.

Ou seja, trabalhar com **menos vozes ativas ao mesmo tempo**, para reduzir colisão de instruções.

---

# 11. Sugestão sobre verificação visual e prova de completude

Como eu preciso de páginas bonitas, áreas de membros bonitas e fidelidade visual, foi destacada a importância de:

- screenshots;
- artifacts;
- gravações;
- validação visual explícita;
- critérios de aceite objetivos.

A crítica implícita foi:

> Não basta o agente dizer que terminou; é preciso haver prova operacional e visual do que foi feito.

---

# 12. Diagnóstico específico sobre o meu mapa atual

A análise, aplicada ao mapa enviado, sustentou essencialmente estas interpretações:

## 12.1 O root atual parece misturar duas funções diferentes
Hoje, o root parece fazer ao mesmo tempo o papel de:

- sistema operacional do negócio;
- projeto de entrega de uma oferta concreta.

Isso foi visto como um ponto de risco.

## 12.2 A memória parece existir, mas distribuída demais
O problema talvez não seja inexistência de memória, mas fragmentação entre:
- docs;
- checkpoints;
- snapshots;
- knowledge;
- pipeline state;
- project memory;
- brand docs;
- specs;
- blueprints.

## 12.3 Há sinais de expansão lateral precoce
A existência de elementos ligados a velas dentro do mesmo ecossistema ativo foi lida como possível prenúncio de contaminação de contexto.

## 12.4 A robustez do ecossistema pode estar dificultando a confiabilidade do projeto específico
Ou seja:
- o sistema parece muito poderoso;
- mas talvez poderoso demais para o estágio atual da oferta de sais;
- o desafio agora parece ser mais governança de execução do que adição de novos componentes.

---

# 13. Recomendação executiva resumida

Se fosse resumir toda a análise em um conjunto muito enxuto de decisões, elas seriam estas:

1. **Congelar novas verticais por enquanto**
2. **Tratar Sais como o único projeto ativo de entrega neste momento**
3. **Extrair um Core compartilhado, separado da oferta**
4. **Criar memória canônica obrigatória por projeto**
5. **Reduzir o número de agentes ativos por sessão**
6. **Obrigar checkpoint e handoff ao fim de cada bloco**
7. **Separar Velas em projeto próprio quando chegar a hora**
8. **Usar o Antigravity mais como sistema de execução auditável do que como “memória espontânea”**

---

# 14. Pontos em que eu gostaria que o Antigravity me contradissesse, caso discorde

Aqui está a parte mais importante deste documento.

Peço ao Antigravity que leia os pontos acima e, por favor, responda de maneira **muito honesta, crítica e minuciosa**, inclusive me contradizendo quando achar necessário.

Quero um parecer franco, não apenas concordância automática.

---

# 15. Perguntas diretas para o Antigravity

## 15.1 Sobre a causa raiz
Você concorda que o meu problema central hoje é mais de:

- arquitetura de contexto,
- isolamento de oferta,
- persistência de estado,
- handoff,
- governança operacional,

do que simplesmente de “persona ruim”, “squad ruim” ou “skill mal configurada”?

Se discordar, explique com precisão.

---

## 15.2 Sobre a estrutura macro
Você concorda que o ideal seria separar em:

- `SommersStore-Core`
- `SommersStore-Sais`
- `SommersStore-Velas`
- etc.

em vez de concentrar múltiplas verticais/ofertas num mesmo projeto operacional?

Se não concordar, qual seria a alternativa mais robusta e por quê?

---

## 15.3 Sobre o projeto atual de Sais
Você considera que:

- a área de membros,
- a sales page,
- a VSL,
- o upsell,
- o downsell,
- os e-books,
- os assets,
- a copy

devem permanecer todos dentro de um mesmo projeto de oferta chamado algo como `SommersStore-Sais`?

Ou você sugere uma fragmentação ainda maior?

---

## 15.4 Sobre Velas
Você acha prudente que eu crie Velas agora como subprojeto dentro do mesmo workspace ativo?

Ou você concorda que o mais seguro é:
- concluir primeiro a arquitetura dos Sais;
- depois abrir Velas como projeto principal separado?

---

## 15.5 Sobre memória
Você concorda com a ideia de criar uma memória canônica obrigatória por projeto, composta por arquivos como:

- `PROJECT_STATE.md`
- `DECISIONS_LOG.md`
- `NEXT_ACTIONS.md`
- `DO_NOT_CHANGE.md`
- `ACCEPTANCE_CRITERIA.md`
- `DESIGN_LOCK.md`
- `FUNNEL_CANON.md`
- `SESSION_HANDOFF.md`

Se não concordar com essa estrutura, qual estrutura de memória você proporia no seu lugar?

---

## 15.6 Sobre agente de memória
Faz sentido existir um agente específico para memória?

Se sim:
- qual seria o papel exato dele?
- o que ele faria que não pudesse ser melhor resolvido por arquivos canônicos + protocolo obrigatório?
- como evitar que esse agente se torne mais uma camada de complexidade e ruído?

---

## 15.7 Sobre quantidade de agentes
Você concorda que há valor em reduzir o número de agentes ativos por sessão, por exemplo para algo como:

- 1 orquestrador,
- 1 executor,
- 1 QA,
- e apenas 1 especialista adicional quando necessário?

Ou você considera que, no meu caso, manter muitos agentes ativos simultaneamente é melhor?

Por quê?

---

## 15.8 Sobre completude e regressão
Qual é, na sua opinião, a melhor forma de garantir que uma entrega:

- não retroaja,
- não perca contexto,
- não altere partes aprovadas indevidamente,
- e não seja dada como concluída antes da hora?

Gostaria que você respondesse com mecanismos concretos, não apenas conceitos abstratos.

---

## 15.9 Sobre checkpoint e rollback
Qual seria, na sua visão, o protocolo ideal de:

- checkpoint,
- backup,
- rollback,
- continuidade de sessão,

para um projeto como o meu?

---

## 15.10 Sobre verificação visual
Como você sugere validar com robustez:

- beleza visual,
- fidelidade a layout de referência,
- coerência entre páginas,
- consistência de design system,
- responsividade,
- continuidade entre sales page, área de membros e e-books?

---

## 15.11 Sobre o meu mapa atual
Lendo a arquitetura atual que já existe, você considera que ela está:

- superdimensionada para o estágio atual,
- subdimensionada,
- bem dimensionada mas mal operada,
- ou corretamente estruturada e o problema está em outro lugar?

Explique com franqueza.

---

## 15.12 Sobre a melhor rota daqui para frente
Se você tivesse que me recomendar uma rota objetiva de execução para os próximos passos, qual seria?

Idealmente, responda com algo como:

1. o que eu devo congelar;
2. o que eu devo separar;
3. o que eu devo manter;
4. o que eu devo refatorar;
5. o que eu devo padronizar;
6. o que eu devo testar primeiro;
7. o que eu devo deixar para depois.

---

# 16. Pedido final ao Antigravity

Antigravity, por favor:

- leia criticamente este documento;
- concorde apenas com o que realmente fizer sentido;
- contradiga sem cerimônia o que achar equivocado;
- aponte os riscos das sugestões acima;
- diga quais delas você considera corretas, incorretas, incompletas ou prematuras;
- e proponha, se achar melhor, uma arquitetura alternativa mais forte do que a sugerida aqui.

O objetivo não é obter validação automática.  
O objetivo é chegar à arquitetura mais sólida, confiável e auditável possível para o meu caso real.

---

# 17. Fechamento

Este documento foi preparado para levar ao Antigravity uma fotografia honesta da situação:

- dores reais;
- hipóteses levantadas;
- percepções técnicas;
- recomendações estruturais;
- e perguntas objetivas.

A intenção é transformar um ecossistema muito poderoso, porém hoje sujeito a alucinação, regressão e perda de continuidade, em um sistema operacional confiável para criação de ofertas digitais com alto padrão visual e comercial.

---

# 18. Observação final

Peço ao Antigravity que, ao responder, não faça uma resposta genérica.

Gostaria idealmente de uma resposta:
- item por item;
- com justificativas;
- apontando trade-offs;
- e, se possível, já propondo uma arquitetura corrigida ou validada.

