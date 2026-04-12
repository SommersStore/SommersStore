# Briefing Estratégico para o Antigravity

## Objetivo deste documento
Este documento reorganiza a estratégia visual, estrutural e operacional do ecossistema digital para que o Antigravity trabalhe com mais clareza, menos ambiguidade e maior consistência.

A prioridade imediata continua sendo:
- corrigir o PDF baixável;
- melhorar a área de membros;
- construir uma base sistêmica reutilizável para todos os projetos.

A decisão estratégica definida neste briefing é a seguinte:

**não criaremos um único brandbook-mãe para obrigar todos os projetos a terem a mesma identidade visual.**

Em vez disso, vamos trabalhar com esta arquitetura:

1. **uma base estrutural central para o ecossistema SommersStore**;
2. **brandbooks individualizados para cada projeto**;
3. **uma lógica de herança visual e estrutural**, em que os projetos compartilham a mesma espinha dorsal, mas preservam identidades próprias.

---

## Padronização oficial de nomes
Para evitar erro de execução, considerar esta padronização como definitiva:

- **Empresa principal / CNPJ:** `Sommer's Store Ltda`
- **Ecossistema operacional dentro do Antigravity:** `SommersStore`

### Interpretação correta
- **Sommer's Store Ltda** é a entidade institucional e jurídica.
- **SommersStore** é o nome do projeto-mãe operacional no Antigravity, que abriga diferentes projetos e linhas, como:
  - sais de banho;
  - velas aromáticas;
  - e outros projetos futuros.

---

# 1. Diagnóstico atual

## 1.1 Área de membros
A área de membros está funcional, mas ainda está simplista demais do ponto de vista visual.

### Situação atual
- a estrutura funciona;
- a navegação está aceitável;
- o resultado visual ainda não comunica valor premium;
- falta sofisticação de interface, hierarquia e acabamento visual.

### Diretriz
Não reconstruir do zero sem necessidade.

Devemos:
- preservar o que já está funcionando;
- melhorar o design da interface;
- elevar a percepção de valor;
- tornar a experiência mais refinada, profissional e consistente.

---

## 1.2 PDF baixável
O PDF exportado está incorreto e isso é uma urgência técnica.

### Problemas atuais
- o PDF está errado;
- as receitas estão erradas;
- o conteúdo exportado não está fiel ao conteúdo principal da versão web;
- a equivalência entre versão online e versão impressa não está confiável.

### Regra obrigatória
O PDF pode ser mais leve visualmente, mas **não pode divergir do conteúdo principal**.

### O que pode ser simplificado no PDF
- qualidade de imagem;
- imagens de fundo pesadas;
- efeitos decorativos secundários;
- fundos complexos, desde que substituídos por uma alternativa padronizada e leve.

### O que não pode mudar no PDF
- texto;
- receitas;
- estrutura do conteúdo;
- sequência lógica;
- hierarquia editorial;
- fidelidade ao material principal da web.

### Prioridade técnica imediata
1. corrigir o PDF;
2. alinhar integralmente o conteúdo do PDF com o conteúdo da versão web;
3. garantir que qualquer simplificação aconteça apenas na camada visual secundária.

---

# 2. Decisão estratégica principal

## O que será construído
A melhor solução não é um brandbook único e engessado para todos os projetos.

A melhor solução é construir para o **SommersStore** um:

## **Master Design System + Master Markup + Biblioteca de Componentes**

E, a partir dessa base, criar **brandbooks individuais para cada subprojeto**.

---

## Por que essa é a melhor solução
Esse modelo permite:
- escala;
- reaproveitamento;
- menor índice de erro no Antigravity;
- velocidade de produção;
- manutenção mais simples;
- consistência entre projetos;
- personalização real em cada produto.

### Em termos práticos
A estrutura será compartilhada.
A identidade visual será parcialmente personalizada.
Cada projeto terá sua própria atmosfera.

Ou seja:
- a engenharia visual é comum;
- a aparência final é adaptada por projeto.

---

# 3. Arquitetura recomendada

## Camada 1 — Base institucional da empresa
### **Sommer's Store Ltda**
Esta camada é institucional e corporativa.

### Recomendação
**Não é obrigatório criar um brandbook extenso agora para a empresa principal.**

O mais adequado é criar um material institucional mais enxuto, caso necessário, contendo:
- nome oficial;
- assinatura institucional;
- uso do logotipo;
- paleta institucional mínima;
- tipografia institucional;
- aplicações em documentos, rodapés, propostas, apresentações, papelaria e comunicação corporativa.

### Observação estratégica
Esse material institucional **não deve comandar a estética dos projetos individuais**.

Ele serve para:
- formalização;
- consistência institucional;
- aplicações corporativas futuras.

**Se for preciso, esse guia institucional pode ser criado depois. Não é a prioridade máxima deste momento.**

---

## Camada 2 — Sistema-mãe do ecossistema digital
### **SommersStore**
Aqui está o núcleo do trabalho.

O SommersStore deve receber um:

## **Master Design System / Master Markup / Master UI Framework**

Este documento será a fundação operacional do ecossistema e da área de membros.

### Esse documento deve definir
- estrutura geral da área de membros;
- grids;
- margens;
- espaçamentos;
- sidebar;
- cabeçalhos;
- rodapés;
- cards;
- botões;
- campos;
- tags;
- badges;
- módulos;
- containers;
- banners;
- blocos de conteúdo;
- blocos de receita;
- blocos de download;
- blocos de vídeo;
- blocos de aula;
- tabelas;
- listas;
- paginação;
- componentes reutilizáveis;
- estrutura de páginas web;
- estrutura de páginas PDF;
- responsividade;
- estados de interação;
- regras de hierarquia tipográfica;
- estilo base de ícones;
- padrões de imagens;
- regras de fundo;
- lógica de temas derivados;
- tokens visuais reutilizáveis.

### Função real desse sistema-mãe
Esse sistema não existe para ser uma marca emocional por si só.

Ele existe para:
- organizar o ecossistema;
- padronizar a construção;
- garantir consistência;
- reduzir retrabalho;
- servir como base para todos os subprojetos.

---

## Camada 3 — Brandbooks individuais dos projetos
Cada projeto comercial ou editorial terá seu próprio brandbook.

### Regra principal
Os projetos herdam a **estrutura do SommersStore**, mas não precisam herdar exatamente a mesma identidade visual.

### Isso significa
Todos os projetos devem compartilhar:
- a mesma espinha dorsal;
- a mesma lógica de layout;
- a mesma lógica de componentes;
- a mesma arquitetura de interface;
- a mesma organização técnica entre web e PDF.

Mas cada projeto pode mudar:
- paleta;
- clima visual;
- direção de imagem;
- texturas;
- estilo de fundo;
- ornamentação;
- tipografia de destaque;
- atmosfera editorial.

---

# 4. Proporção recomendada entre unidade e personalização
A melhor relação para este ecossistema é:

## **70% estrutura compartilhada / 30% identidade própria por projeto**

Isso garante:
- eficiência;
- coerência;
- velocidade;
- identidade individual suficiente;
- menor chance de cada projeto parecer um clone ou, no outro extremo, virar algo totalmente desconectado.

---

# 5. Entregáveis principais

## Entregável 1 — Correção urgente do PDF
### Objetivo
Corrigir o PDF baixável para que ele reflita fielmente o material principal da web.

### Requisitos
- corrigir receitas;
- corrigir texto;
- corrigir ordem do conteúdo;
- preservar a equivalência editorial com a versão online;
- permitir simplificação visual apenas em fundos, efeitos e imagens pesadas.

---

## Entregável 2 — Evolução da área de membros
### Objetivo
Melhorar a área de membros sem perder o que já está funcional.

### Requisitos
- manter a estrutura funcional existente;
- elevar qualidade visual;
- melhorar acabamento;
- melhorar hierarquia de informação;
- melhorar sensação de produto premium;
- aplicar progressivamente o Master Design System.

---

## Entregável 3 — Master Design System do SommersStore
### Objetivo
Criar o sistema estrutural central do ecossistema.

### Esse documento deve funcionar como
- documentação-mãe de interface;
- biblioteca de componentes;
- guia de construção de páginas;
- padrão operacional para web e PDF;
- referência permanente dentro da aba **Design System** da torre de controle.

### Nome sugerido do documento
**SommersStore Master Design System**

ou

**SommersStore Master Markup & Design Framework**

---

## Entregável 4 — Brandbook do projeto Sais de Banho
### Objetivo
Criar um brandbook próprio para o projeto de sais de banho.

### Direção visual sugerida
- claro;
- leve;
- pastel;
- clean;
- acolhedor;
- artesanal;
- saudável;
- delicado;
- com atmosfera de bem-estar e autocuidado.

### Sensação desejada
- conforto;
- pureza;
- cuidado;
- serenidade;
- refinamento suave.

### O que esse brandbook deve definir
- paleta específica do projeto;
- tipografia do projeto;
- estilo de imagens;
- textura e fundos;
- iconografia complementar;
- regras de composição;
- aplicações em páginas, área de membros, PDF e materiais visuais.

---

## Entregável 5 — Brandbook do projeto Velas Aromáticas
### Objetivo
Criar um brandbook próprio para o projeto de velas aromáticas.

### Direção visual sugerida
- sofisticado;
- sensorial;
- aconchegante;
- elegante;
- quente na medida certa;
- refinado;
- com mais profundidade emocional do que o projeto de sais.

### Caminhos possíveis
Pode seguir uma linha:
- creme, bege, âmbar, cobre, dourado suave, marrom profundo;
- ou uma linha mais premium com contraste controlado e estética mais intimista.

### Sensação desejada
- aconchego;
- presença;
- sofisticação;
- ritual;
- atmosfera;
- valor percebido elevado.

---

## Entregáveis futuros
Cada novo projeto deverá receber:
- brandbook próprio;
- aplicação do tema visual correspondente sobre a base estrutural do SommersStore.

---

# 6. Como o Antigravity deve interpretar essa arquitetura
O Antigravity não deve tratar cada novo projeto como se fosse um site totalmente independente do zero.

A lógica correta é:

1. usar a estrutura-base do **SommersStore Master Design System**;
2. reutilizar a biblioteca de componentes;
3. aplicar o brandbook específico do projeto;
4. gerar páginas web e PDF dentro da mesma lógica estrutural;
5. adaptar apenas a camada temática e visual de cada projeto.

### Em resumo operacional
Sempre que um novo projeto for criado, a instrução não deve ser:

> crie tudo do zero

A instrução deve ser:

> use o sistema-mãe do SommersStore, aplique o tema e o brandbook do projeto específico, e gere a versão web e PDF seguindo as regras do framework principal.

---

# 7. Diretriz de tipografia
A tipografia deve seguir uma lógica central compartilhada, mas com liberdade controlada por projeto.

### Recomendação
- manter uma família-base ou uma lógica-base coerente entre os projetos;
- permitir variação nas fontes de destaque, títulos editoriais ou elementos de atmosfera;
- preservar boa legibilidade, elegância e consistência em toda a plataforma.

### Objetivo
Criar unidade sem eliminar personalidade.

---

# 8. Diretriz de imagens
As imagens dos projetos não devem ser idênticas entre si em linguagem emocional.

### O que deve ser padronizado
- qualidade;
- proporção;
- tratamento;
- nitidez;
- contraste adequado;
- regras de enquadramento;
- consistência de uso.

### O que pode variar por projeto
- mood;
- atmosfera;
- temperatura visual;
- texturas;
- profundidade;
- densidade visual;
- sensação editorial.

### Princípio
Os projetos devem parecer parte de um mesmo ecossistema, mas não cópias uns dos outros.

---

# 9. Referências visuais
Usar como referência estrutural e de profundidade:

- `https://brand.aioxsquad.ai/`
- `https://brand.aioxsquad.ai/brandbook/guidelines`

### Regra sobre a referência
A referência deve ser usada para copiar a **profundidade da estrutura**, não para copiar cegamente a identidade visual.

### O que deve ser aproveitado da referência
- organização do documento;
- profundidade do design system;
- detalhamento de componentes;
- clareza de guideline;
- padrão de documentação;
- apresentação profissional;
- amplitude de aplicações.

### O que deve mudar
- cores;
- atmosfera;
- personalização de cada projeto;
- adequação ao universo do SommersStore e de seus subprojetos.

---

# 10. Uso das imagens anexadas
As imagens anexadas nesta conversa devem ser consideradas como referências auxiliares, especialmente para entender:
- direção visual premium;
- uso de dourado, preto e contrastes sofisticados;
- molduras e elementos de luxo;
- composição elegante;
- aplicações mais clean ou mais premium, dependendo do projeto.

### Observação importante
Essas imagens podem influenciar sobretudo:
- a camada premium da interface;
- o refinamento do Master Design System;
- e alguns projetos específicos com estética mais sofisticada.

Mas elas **não devem obrigar todos os subprojetos a terem exatamente a mesma aparência**.

---

# 11. Ordem de execução recomendada

## Fase 1 — Urgência técnica
1. corrigir o PDF baixável;
2. alinhar completamente o conteúdo do PDF com a versão web;
3. revisar receitas, textos e estrutura.

## Fase 2 — Base estrutural
4. construir o **SommersStore Master Design System**;
5. construir o **Master Markup** e a biblioteca de componentes;
6. organizar esse material na aba **Design System** da torre de controle.

## Fase 3 — Evolução da interface principal
7. aplicar o sistema-mãe na área de membros;
8. melhorar o nível visual da área de membros;
9. elevar a experiência da plataforma sem quebrar a estrutura funcional existente.

## Fase 4 — Temas e projetos individuais
10. criar o brandbook de **Sais de Banho**;
11. criar o brandbook de **Velas Aromáticas**;
12. preparar o mesmo fluxo para futuros projetos.

---

# 12. Regras do que não fazer
- não criar cada subprojeto do zero em estrutura;
- não usar apenas troca de cor como se isso resolvesse a identidade;
- não fazer um material superficial;
- não resumir o design system a paleta e tipografia;
- não permitir que PDF e web tenham divergência de conteúdo;
- não confundir identidade institucional com identidade de produto.

---

# 13. Resultado final esperado
Ao final, o ecossistema deve funcionar assim:

## No nível estrutural
- uma base única;
- um framework claro;
- componentes reutilizáveis;
- consistência entre páginas, produtos e PDFs.

## No nível visual
- cada projeto com personalidade própria;
- unidade entre todos os projetos;
- aparência profissional e escalável.

## No nível operacional
- mais velocidade de produção;
- menos erro no Antigravity;
- menos retrabalho;
- expansão futura mais simples.

---

# 14. Síntese executiva
### Decisão final
**Sim, devemos construir um sistema-mãe para o SommersStore e estender esse sistema aos subprojetos.**

Mas esse sistema-mãe deve ser tratado como:
- framework visual e estrutural;
- design system mestre;
- markup mestre;
- biblioteca de componentes.

E não como um brandbook rígido que apaga a personalidade dos projetos.

### Estrutura final aprovada
- **Sommer's Store Ltda** → guia institucional leve, se necessário;
- **SommersStore** → Master Design System + Master Markup + Component Library;
- **Sais de Banho** → brandbook próprio;
- **Velas Aromáticas** → brandbook próprio;
- **demais projetos** → brandbooks próprios sobre a mesma base estrutural.

---

# 15. Instrução final de execução
Construir toda a próxima etapa do projeto com base nesta lógica:

> criar uma plataforma visual-mãe para o SommersStore, usar essa plataforma como base estrutural do ecossistema, corrigir urgentemente o PDF, elevar a área de membros e desenvolver brandbooks individualizados para cada subprojeto, mantendo unidade estrutural e liberdade visual controlada.
