Capítulos  
Transcrição

### **Capítulo 1: Rafael mostra o dashboard de agentes**

0:00  
Por enquanto eu tô rodando tudo local aí, tá usando o cloud code, mas ele já tá com a API preparada para na hora que subir poder est acessível de qualquer  
0:07  
7 segundos  
lugar, né? É. Eí, um teste que eu fiz é e que funciona é colocar num VPS e aí você instala o cloud lá e você consegue  
0:14  
14 segundos  
usar o plano do mesmo jeito, como se tivesse usando API.  
0:18  
18 segundos  
Cara, tá muito massa, tem muita coisa aí bem legal. Até o design também gostei bastante. Acho que ficou bem, pegou bem aquela parte do Glaz ali da Apple,  
0:25  
25 segundos  
assim.  
0:27  
27 segundos  
Bom, eu mandei um pouquinho lá no no grupo do que eu tô fazendo, né? Uma parte foi parecida com o que o Torriane fez. Eu vou compartilhar a tela para mostrar um pouquinho aí.

### **Capítulo 2: Interface de conversa com gamificação**

0:37  
37 segundos  
Eh,  
0:39  
39 segundos  
eu fiz uma interface também para poder conversar com os agentes. Eu tentei até gamificar um pouquinho, tipo, colocando  
0:47  
47 segundos  
as skills deles ali. Então, tipo, o que que cada um tem de ponto forte, ponto fraco, etc.  
0:53  
53 segundos  
Deixei disponível aqui também para uso mais fácil, comandos, prompos sugeridos,  
0:59  
59 segundos  
as tesques, enfim, tô trazendo tudo aqui também como uma barrinha auxiliar para poder facilitar. Aqui vai ficar o  
1:05  
1 minuto e 5 segundos  
histórico da conversa com cada agente e as métricas, né? Então, tipo o status das da LLM que tá usando, tokens, etc.  
1:13  
1 minuto e 13 segundos  
Então, tem algumas coisinhas ali ainda para terminar.

### **Capítulo 3: Cloud Code vs API: economia real**

1:15  
1 minuto e 15 segundos  
Mas isso tu tá usando API ou tá usando o cloud code?  
1:19  
1 minuto e 19 segundos  
Então, por enquanto eu tô rodando tudo local aí. tá usando o cloud code, mas ele já tá com a API preparada para na hora que subir poder tá acessível de qualquer lugar, né?  
1:27  
1 minuto e 27 segundos  
Legal. Não é, eu digo isso porque assim,  
1:29  
1 minuto e 29 segundos  
né, é bom de estar com usando cloud code ou codex por trás porque daí tu economiza muito token, tu não gasta, tu paga tua assinatura lá, porque eu já  
1:37  
1 minuto e 37 segundos  
falei para vocês, uma assinatura de ó do cloud code equivale a uns 3.000 de API,  
1:42  
1 minuto e 42 segundos  
então compensa muito mais pagar uma assinatura. Eles estão bloqueando agora quem tem, e fiquem ligados aí, eu descobri isso ontem de noite. Eles começaram a bloquear agora quem tem mais  
1:50  
1 minuto e 50 segundos  
de uma conta que fica usando só o mesmo computador ou só os mesmos e-mails similares, porque eles eles basicamente estão entre aspas nos bancando, né? Eles  
1:58  
1 minuto e 58 segundos  
dão 200, a gente paga 200$ 200, eles dão 3.000. A OP, como tava perdendo para para Antropic, eles dobraram a aposta,  
2:05  
2 minutos e 5 segundos  
eles estão entregando muito mais com a conta dele de 200\. Então usem e abusem realmente localmente aí para vocês poderem validar os projetos de vocês antes de botar no ar com API.

### **Capítulo 4: VPS rodando Claude Code como alternativa**

2:16  
2 minutos e 16 segundos  
É, e um teste que eu fiz e que funciona é colocar num VPS e aí você instala o cloud lá e você consegue usar o plano do mesmo jeito como se tivesse usando API.  
2:26  
2 minutos e 26 segundos  
Então também para uma alternativa aí vai depender obviamente da quantidade de de uso ali para ver se vai ser suficiente como que vai ser, mas até com as  
2:34  
2 minutos e 34 segundos  
economias ali que foram geradas de tokens aí nas últimas otimizações ali,  
2:39  
2 minutos e 39 segundos  
implementações do iOS, eu acho que vai funcionar. Então um teste que eu já fiz que que rola legal, né? E e aí tipo

### **Capítulo 5: Sistema de orquestração centralizado**

2:47  
2 minutos e 47 segundos  
assim, eu fiz aqui a divisão, né? por tem os orquestradores de cada squad, tem divisão aqui pelos especialistas, enfim,  
2:54  
2 minutos e 54 segundos  
eu coloquei essa essa telinha aqui para poder facilitar com uma busca global também. Eh, eu tô terminando de de  
3:02  
3 minutos e 2 segundos  
validar algumas coisas, mas a ideia é ter um sistema de orquestração. Então,  
3:06  
3 minutos e 6 segundos  
tipo, clicaria eh aqui tem até um esqueminha aqui de orquestração, que é basicamente centralizar num agente para  
3:14  
3 minutos e 14 segundos  
poder fazer o contato e aí basicamente ele vai fazer a orquestração completa,  
3:18  
3 minutos e 18 segundos  
né? Então, primeira etapa seria basicamente planejar toda a tarefa que foi solicitada, ver o workflow, ver os squads desenvolvidos, etc. Mas assim,  
3:26  
3 minutos e 26 segundos  
centralizando aí a tela, eh, para poder facilitar. Então, aí ficaria depois o menuzinho auxiliar para ver as tarefas, tarefas em andamento, estatísticas, etc.

### **Capítulo 6: Visualização de workflows e gargalos**

3:35  
3 minutos e 35 segundos  
Aqui também, eh, tá um, na verdade, tentei fazer uma gamificação ali, eh,  
3:42  
3 minutos e 42 segundos  
para poder ver, tipo assim, os squads trabalhando e tudo mais. Então, isso aqui tá bem embrionário ainda, bem só simulação por enquanto ali, mas a ideia é tipo assim,  
3:53  
3 minutos e 53 segundos  
eh, ordenou uma orquestração, ele montaria um ambiente ali com os agentes,  
3:59  
3 minutos e 59 segundos  
os squads selecionados para ver eh o trabalho sendo desempenhado, né? E aí  
4:05  
4 minutos e 5 segundos  
numa numa tela alternativa também, eu coloquei o esqueminha aqui de de workflow mesmo para poder ver e  
4:12  
4 minutos e 12 segundos  
conseguir mapear mais fácil um pouco os gargalos. Então a ideia é ver input,  
4:17  
4 minutos e 17 segundos  
output de cada um dos agentes para poder saber, pô, o trabalho, o resultado final foi uma merda, mas por quê? porque teve um input intermediário que foi ruim ou o  
4:25  
4 minutos e 25 segundos  
que que aconteceu ali. Então fica um pouco mais fácil de de identificar ali o que que cada gente fez, o que que cada gente entregou e procurar eh realmente  
4:35  
4 minutos e 35 segundos  
identificar os gargalos ali para poder melhorar o progresso como um todo, né, o processo como um todo. Então aí vai ficar o progresso total ali da da tarefa de cada gente, tipo uma tido list, os  
4:43  
4 minutos e 43 segundos  
arquivos gerados, eu coloquei aqui auxiliar também porque eu tô plugando eh MCPs, ferramentas, etc. Então assim,  
4:50  
4 minutos e 50 segundos  
para eu poder ver o a gente tá usando as ferramentas que foram prédefinidas,  
4:53  
4 minutos e 53 segundos  
enfim, tem um controle maior e a questão do uso de tokens ali e tal. Então é mais ou menos isso. Onde é que fica a parte dos tokens?

### **Capítulo 7: Tracking de tokens em tempo real**

5:02  
5 minutos e 2 segundos  
Onde que fica? É ali do a barrinha lateral ali. Isso aqui, ó. Legal. Tá aqui embaixo. Uso de tokens.  
5:12  
5 minutos e 12 segundos  
Ah, uso de tokens. É que para mim eu não sei se Ah, foi, acho. Não é que tu tá com um zoom maior, tá cortando, sabe? Para mim aqui. Ah. Ah, então pera aí, pera aí.  
5:19  
5 minutos e 19 segundos  
Melhorou?  
5:22  
5 minutos e 22 segundos  
Não, agora deu mais um. Agora sim. Agora tá 100%. Ah, foi. Agora sim. Ah, beleza. Ah, ali, agora sim. Tô vendo ali, ó.  
5:29  
5 minutos e 29 segundos  
3.2K progresso. Exato. A ideia,

### **Capítulo 8: Inspirações visuais do painel**

5:34  
5 minutos e 34 segundos  
isso é tentar acompanhar em em tempo real ali e aí vendo o que que vai acontecer durante a tarefa ali. Enfim,  
5:41  
5 minutos e 41 segundos  
eh, ter um acompanhamento mais de perto mesmo.  
5:43  
5 minutos e 43 segundos  
E tu se baseou em algum projeto para para poder entender essas telas assim,  
5:46  
5 minutos e 46 segundos  
porque ficaram muito boas, ficou muito legal. Então, na verdade, eh, eu peguei e fui puxando um monte de coisas de  
5:54  
5 minutos e 54 segundos  
aplicações que eu já conheci. Então, por exemplo, essa telinha aqui, eu me basei naquele ger lá, que é tipo para eh trabalho remoto e tal. É, então assim,  
6:02  
6 minutos e 2 segundos  
eu fui puxando um pouquinho de cada coisa que me vinha na memória que que funcionava. Então, tipo os workflows meio tipo NN, make e tal, mas assim, aí  
6:10  
6 minutos e 10 segundos  
eu fui dando o visual e customizando de acordo com as informações que eu sentia falta ali, que eu achava que eram relevantes ali para eu poder eh  
6:18  
6 minutos e 18 segundos  
identificar, né? Então, coloquei um sisteminha também tipo de notificação. Eh, enfim, tem algumas coisinhas aqui.  
6:26  
6 minutos e 26 segundos  
Aqui também a ideia é ter um painel eh com gráficos. Então aqui já tá são por enquanto tá tá simulado os dados, mas enfim, para ter uma visão geral ali de como é que tá o andamento das coisas,  
6:36  
6 minutos e 36 segundos  
tipo visão para gente, visão por ferramenta, enfim, eh os custos estimados e e eh o que que tá ligado aos  
6:44  
6 minutos e 44 segundos  
sistemas, então as chaves de API que depois vão sendo colocadas, enfim. Eh coloquei aqui na parte de configuração também eh categorização dos squads, né?  
6:53  
6 minutos e 53 segundos  
Então para eu poder ter flexibilidade de mudar, ajustar, etc. como achar que é melhor.  
6:58  
6 minutos e 58 segundos  
Mas tu consegue editar também por aí ou é só de observar para observar? Não, não consigo. Consigo editar aqui. Uhum.

### **Capítulo 9: Edição de squads e categorias pelo painel**

7:05  
7 minutos e 5 segundos  
Então tem a listinha aqui e aí dá para você ir alterando todas as as categorias.  
7:11  
7 minutos e 11 segundos  
Pode alterar o ícone, pode alterar o nome, mas pode alterar também dentro dele, por exemplo, as tesques, checklists, workflows.  
7:17  
7 minutos e 17 segundos  
Isso aí, que que acontece ali? Por enquanto, sim, tem algumas coisas que elas estão eh redundantes, né? Então aí conforme eu concluí eu vou implementando  
7:26  
7 minutos e 26 segundos  
as outras telas dos outros lugares. Mas a ideia aqui, por exemplo, dos workflows é exatamente isso. Então eu posso ir criando workflows aqui, deixando eles  
7:34  
7 minutos e 34 segundos  
salvos de acordo com os testes, aquilo que eu vou validando que funciona melhor. E aí depois eu posso só vir aqui e executar a tarefa ou criar novos workflows por aqui. Basicamente isso.  
7:44  
7 minutos e 44 segundos  
Tu chegou a criar alguma coisa de Chrome aí para deixar caso tu queira deixar algum Chrome rodando?  
7:50  
7 minutos e 50 segundos  
Sim, tem alguns que estão rodando. Na verdade, assim, até pela questão da máquina, eu tô eu instalei o MCP e da  
7:58  
7 minutos e 58 segundos  
Hosinger, que é a hospedagem que eu contratei o VPS e aí eu tô subindo os crons lá, entendeu?

### **Capítulo 10: Crons no VPS para automação contínua**

8:04  
8 minutos e 4 segundos  
Que é justamente para depois não ter que lidar com a questão de às vezes eh,  
8:08  
8 minutos e 8 segundos  
enfim, a máquina tá offline ou desligada ou qualquer outra coisa.  
8:13  
8 minutos e 13 segundos  
Cara, muito legal. Aí aqui tem alguns perfilzinhos, tipo, eh, informações para colocar as APIs. Aqui algumas coisas em  
8:20  
8 minutos e 20 segundos  
relação à aparência, sistema de notificações, dados, informações gerais ali do sistema. Aqui eu coloquei um  
8:28  
8 minutos e 28 segundos  
sistema que é para fazer depois a gestão de memória. Por enquanto tá tá só fazendo listagem, etc. Mas a ideia é  
8:35  
8 minutos e 35 segundos  
facilitar um pouco mais e depois até tipo assim fazer a gestão do banco de conhecimento por agente. Então é, tu vai ver que a gente o novo iOS,  
8:44  
8 minutos e 44 segundos  
né, ele tá com essa parte do conhecimento por agentes e a gente o novo iOS que ainda não foi lançado para vocês, que a gente a gente tá validando ainda, ele tá com workspace. Então  
8:52  
8 minutos e 52 segundos  
assim, workspace pensa que é a toda a tua empresa, todos os teus negócios,  
8:56  
8 minutos e 56 segundos  
todas as tuas BU extremamente definidas lá dentro. Então, cara, nessa nessa nessa forma de demonstrar como tu tá fazendo aí, vai ficar maravilhoso essa parte workspace, porque vai ser onde tu

### **Capítulo 11: AIOX novo: workspaces e controladoria**

9:04  
9 minutos e 4 segundos  
vai ter controladoria de todo o teu negócio. Então, nesse workspace e o que acontece, a IA vai ter informação em tempo real de cada etapa do teu negócio,  
9:11  
9 minutos e 11 segundos  
por exemplo, seja os teus produtos, as tuas ofertas, a a as tuas pops, tudo. E daí ela consegue te ajudar, inclusive, a criar squads, a criar novos produtos,  
9:22  
9 minutos e 22 segundos  
identificar, por exemplo, nos teus usuários o que que eles estão precisando e que produto você pode criar novo. Então, tendo uma visualização assim,  
9:29  
9 minutos e 29 segundos  
cara, fica sensacional, tá muito legal.  
9:33  
9 minutos e 33 segundos  
E aí, uma coisa que eu fiz, eh, foi integrar também com o Telegram e Telegram e o WhatsApp. Então, eh, tô

### **Capítulo 12: Integração Telegram \+ WhatsApp**

9:42  
9 minutos e 42 segundos  
vendo aí qual que que vai funcionar melhor para mim. Mas basicamente o que que eu fiz? Eh, eu integrei com ClickUp,  
9:48  
9 minutos e 48 segundos  
que é onde eu faço a gestão dos projetos e e eu criei uma comunidade e dentro dessa comunidade um grupo com cada squad. E basicamente toda vez que uma  
9:57  
9 minutos e 57 segundos  
demanda é gerada, porque tem essa orquestração e tipo eu tô testando os agentes serem um pouco autônomos, então ah, eh, o agente de tráfego vai fazer otimização das campanhas. Então, tipo,  
10:07  
10 minutos e 7 segundos  
por enquanto eu tô aprovando todas as solicitações, mas basicamente vem com um plano de otimização e inclusive dentro desse plano eu peço que ele eh crie  
10:16  
10 minutos e 16 segundos  
demandas, né? Demande outras coisas pros outros squads. Então, pô, preciso de mais criativos. Daí, beleza? E aí isso vai chegando e eu vou vendo as demandas  
10:24  
10 minutos e 24 segundos  
que vão sendo resolvidas. E aí, tipo, eu comecei a a ideia é colocar agentes de suporte, de vendas, né? Na verdade eu já  
10:32  
10 minutos e 32 segundos  
coloquei, mas eu queria acompanhar um pouco mais de perto eh como é que esses agentes estavam agindo. Então eu criei um bote lá no Telegram e basicamente ele  
10:41  
10 minutos e 41 segundos  
puxa as mensagens tanto do WhatsApp quanto do Instagram ali, direct e tal e vem com uma tela. Vou até mostrar aqui,  
10:49  
10 minutos e 49 segundos  
mas eu vou só compartilhar outro negócio que depois eu mostro com botõezinhos para aprovar, recusar e editar. Então, tipo, aí isso vai ficando registrado,  
10:57  
10 minutos e 57 segundos  
né? O que que eu aprovo que como é que é a mensagem do lead? A resposta que o agente sugeriu, aí se eu aprovo recuso ou edito. E aí para ir gerando um aprendizado, né, em relação a isso. Eh,

### **Capítulo 13: Pipeline de criativos com hooks visuais**

11:09  
11 minutos e 9 segundos  
e aí aqui, por exemplo, dessa questão dos criativos, que é uma das paradas que eu fiz. Então assim, aqui tá um uma uma janelinha. Essa aqui nem é a última  
11:17  
11 minutos e 17 segundos  
porque que eu eu coloquei o mesmo esquema pros criativos, que é vem o criativo, tem um botãozinho de aprovar e de recusar e quando recusa abre uma caixinha para eu descrever os motivos,  
11:27  
11 minutos e 27 segundos  
porque aí aquele criativo volta para ser alterado de acordo com o que eu pedi e o que for aprovado, que essa última versão não tá, mas tem os botõezinhos aqui para  
11:35  
11 minutos e 35 segundos  
poder sincronizar e aí isso já eh dá como aprovado ali pro agente de tráfego ele poder subir. Eh,  
11:42  
11 minutos e 42 segundos  
mas basicamente o que que eu fiz aqui?  
11:44  
11 minutos e 44 segundos  
Eu peguei uns hooks visuais ali para ele poder criar foto, é, anúncios com foto do experts, anúncios só de texto,  
11:51  
11 minutos e 51 segundos  
anúncio com mocap do ebook, anúncio simulando conversa de WhatsApp, antes,  
11:56  
11 minutos e 56 segundos  
depois, tabelinha. Então, tem uma variação bem grande ali de tipo de criativo e tudo mais. E aí, mesma coisa,  
12:03  
12 minutos e 3 segundos  
segui o mesmo processo, né? Vem a estratégia que aí eu peguei e montei, tipo, de acordo com o Big Blackbook,  
12:10  
12 minutos e 10 segundos  
tipo um time de estratégia da Água, né?  
12:13  
12 minutos e 13 segundos  
E aí, eh, eles desenham estratégia e vai, vai efeito cascata, né? Tipo, se tiver a necessidade de ter um scraping,  
12:21  
12 minutos e 21 segundos  
aí vai pro time de deep scraping, que vai pegar redes sociais, etc, e vai fazer uma investigação, vai trazer os materiais, aí vai pro time de COP, aí  
12:29  
12 minutos e 29 segundos  
faz todo o workflow de COP ali, daí isso tem as aprovações, né, lógico, no meio do caminho. Fez isso aí, vai pro time de  
12:37  
12 minutos e 37 segundos  
design, daí executa os designs de acordo com os hooks prédefinidos, sobe aqui pra aprovação. fiz a aprovação, aí dispara  
12:44  
12 minutos e 44 segundos  
lá pro pro agente de tráfego subir as campanhas. Então isso aqui é basicamente isso. Eh, e aí também mesmo esquema, eh,

### **Capítulo 14: Funil completo criado por agentes**

12:52  
12 minutos e 52 segundos  
criou também as páginas do funil, né? Então, criou o estilo do Stephan George,  
12:58  
12 minutos e 58 segundos  
então aí tem as cartinhas de vendas aqui da entrada do do low ticket aqui. Aí depois upell, down,  
13:09  
13 minutos e 9 segundos  
que aqui não aparece por causa do código do funil, né? o page de obrigado.  
13:16  
13 minutos e 16 segundos  
Eh, bom, basicamente isso assim em relação à questão do funil. Hã, daí aqui eu ainda tô criando é o dashboardzinho  
13:24  
13 minutos e 24 segundos  
aqui. Tem tem os dados aqui, dá para ver mais ou menos, mas eh a ideia é a mesma coisa, ter um controle ali do que vai  
13:31  
13 minutos e 31 segundos  
sendo gerado pelos pelos agentes. Deixa eu pegar os dados aqui.  
13:38  
13 minutos e 38 segundos  
Eh,  
13:40  
13 minutos e 40 segundos  
aqui ainda tá com dados simulados, mas a  
13:48  
13 minutos e 48 segundos  
ideia é ter toda a visão ali das campanhas dividido por perpétuo lançamento, tipos de campanha, top campanhas, enfim. Aí tem todo um  
13:57  
13 minutos e 57 segundos  
dashboardzinho aqui que vai rolar, visão por produto.  
14:02  
14 minutos e 2 segundos  
Eh, ah, aqui também coloquei uma parada de análise de criativos para justamente ver, tipo, igual aqui, aqui não tava com  
14:11  
14 minutos e 11 segundos  
os dados, mas assim, para ver fadiga de criativo, pô, tava com frequência excessiva, enfim, toda a mecânica ali para poder fazer a otimização ali, ver  
14:19  
14 minutos e 19 segundos  
como é que tá a questão da ascensão do funil. Então, os funis vão ter a a jornada ali bonitinha. E aí a parte de alertas, monitoramento, que é onde vão  
14:28  
14 minutos e 28 segundos  
entrar os croms ali, basicamente que você perguntou. Então para não só ficar eh olhando ali, mas também tem uma interface pra gente poder visualizar ali  
14:37  
14 minutos e 37 segundos  
performance por hora, enfim, aí conseguir facilitar um pouco das otimizações, né? Eh, daí,  
14:46  
14 minutos e 46 segundos  
bom, também tem o produto que foi criado integral com o  
14:52  
14 minutos e 52 segundos  
com os agentes. E aí foi um e-book bem longo. Deixa eu ver só se ele tá liberado aqui. Mas basicamente, cara, mesmo esquema, criou área de membros,  
15:01  
15 minutos e 1 segundo  
fez o esquema de autenticação ali com eh Medic Link. Então, manda lá o link pro e-mail para você autenticar eh automaticamente.

### **Capítulo 15: E-book com 90 ilustrações feito por IA**

15:11  
15 minutos e 11 segundos  
Criou, cara, acho que foi só foram 90 ilustrações ali dentro do e-book. Deixa eu ver se só tem uns dados aqui.  
15:20  
15 minutos e 20 segundos  
Eu achei que ficou ficou bem legal assim. Eh, mas é isso. É basicamente isso, sim. Só isso, né, pessoal?  
15:29  
15 minutos e 29 segundos  
\[risadas\]  
15:31  
15 minutos e 31 segundos  
Mas aquele teu painel ali, cara, tá muito legal. Ah, se topar a gente contribuir junto, porque a ideia é a gente,  
15:39  
15 minutos e 39 segundos  
não sei se tu tá tá no no tu tá no no corte avançado, né, Rafael? Sim. Ã,  
15:46  
15 minutos e 46 segundos  
eu criei já um GitHub lá para nós, que vai ser um GitHub compartilhado entre nós, pra gente poder se ajudar ali,  
15:52  
**Alan Nicolas :** **Meu Aluno Criou Um Negócio INTEIRO Com Agentes de IA**

[00:00](https://www.youtube.com/watch?v=tAcKxn1crOc) Rafael mostra o dashboard de agentes  
[00:37](https://www.youtube.com/watch?v=tAcKxn1crOc&t=37s) Interface de conversa com gamificação  
[01:15](https://www.youtube.com/watch?v=tAcKxn1crOc&t=75s) Cloud Code vs API: economia real  
[02:16](https://www.youtube.com/watch?v=tAcKxn1crOc&t=136s) VPS rodando Claude Code como alternativa  
[02:47](https://www.youtube.com/watch?v=tAcKxn1crOc&t=167s) Sistema de orquestração centralizado  
[03:35](https://www.youtube.com/watch?v=tAcKxn1crOc&t=215s) Visualização de workflows e gargalos  
[04:58](https://www.youtube.com/watch?v=tAcKxn1crOc&t=298s) Tracking de tokens em tempo real  
[05:32](https://www.youtube.com/watch?v=tAcKxn1crOc&t=332s) Inspirações visuais do painel  
[07:01](https://www.youtube.com/watch?v=tAcKxn1crOc&t=421s) Edição de squads e categorias pelo painel  
[08:04](https://www.youtube.com/watch?v=tAcKxn1crOc&t=484s) Crons no VPS para automação contínua  
[09:00](https://www.youtube.com/watch?v=tAcKxn1crOc&t=540s) AIOX novo: workspaces e controladoria  
[09:36](https://www.youtube.com/watch?v=tAcKxn1crOc&t=576s) Integração Telegram \+ WhatsApp  
[11:09](https://www.youtube.com/watch?v=tAcKxn1crOc&t=669s) Pipeline de criativos com hooks visuais  
[12:49](https://www.youtube.com/watch?v=tAcKxn1crOc&t=769s) Funil completo criado por agentes  
[15:11](https://www.youtube.com/watch?v=tAcKxn1crOc&t=911s) E-book com 90 ilustrações feito por IA  
[15:54](https://www.youtube.com/watch?v=tAcKxn1crOc&t=954s) GitHub compartilhado e colaboração  
[16:44](https://www.youtube.com/watch?v=tAcKxn1crOc&t=1004s) Geração de thumbnails no fluxo

15 minutos e 52 segundos  
criar uns painéis. O teu tá, o teu tá muito bom, tipo, tá bem mais avançado que eu comecei a criar aqui pra galera.

### **Capítulo 16: GitHub compartilhado e colaboração**

15:59  
15 minutos e 59 segundos  
A única coisa que o meu tem talvez um pouquinho mais ali da parte de análises de do que tá acontecendo dos logs um  
16:06  
16 minutos e 6 segundos  
pouco, talvez a mais da parte de Aham.  
16:09  
16 minutos e 9 segundos  
dos camban como os pipelines. Eu também fiz uma integração para poder pegar e tu ativar o Bob lá, né? Deixar ele a fazendo sozinho  
16:16  
16 minutos e 16 segundos  
e tu vê ela trabalhando sozinho, tipo um Ralf. Mas cara, tá muito massa, tem muita coisa aí bem legal. Até o design  
16:24  
16 minutos e 24 segundos  
também eu gostei bastante. Ã, acho que foi bem, tu pegou bem aquela parte do Glaz ali da Apple, assim, dá para, não  
16:32  
16 minutos e 32 segundos  
sei se chegou, provavelmente tu ainda não tocanizou ele, mas dá para tocanizar ele e deixar ele, ele 100% tocanizado.  
16:38  
16 minutos e 38 segundos  
Mas, cara, tá muito bom. Parabéns aí por todo o trabalho que tu fez. Tá bem legal. Eh, eu também fiz o esqueminha aqui,

### **Capítulo 17: Geração de thumbnails no fluxo**

16:44  
16 minutos e 44 segundos  
acho que até tem numa das conversas que eu não sei onde tá, mas eu cheguei a mandar lá no grupo da geração de thumbnailos. E aí, tipo, a ideia é tá  
16:52  
16 minutos e 52 segundos  
rolando aqui até dentro das das conversas, porque daí eu tenho fluxo ali de, deixa eu ver se tem ele aqui.  
17:01  
17 minutos e 1 segundo  
Não sei se ficou registrado um histórico, mas basicamente assim tava com problemas para conseguir renderizar todos os os arquivos ali dentro da própria conversa, né? Então, tipo assim,  
17:11  
17 minutos e 11 segundos  
você mandava para um negócio externo,  
17:13  
17 minutos e 13 segundos  
tal, e aí eu, ah, eu resolvi isso aqui recentemente, mas depois eu ca lá onde tá e aí eu mando para vocês no grupo  
17:21  
17 minutos e 21 segundos  
quiserem dar uma olhada lá depois. Mas basicamente é isso, já tá com suporte para arquivos, áudios, receber ali tudo no fluxo ali do chat. Belê,  
17:33  
17 minutos e 33 segundos  
top, muito bom, parabéns aí.  
17:37  
17 minutos e 37 segundos  
\[música\]  
17:43  
17 minutos e 43 segundos  
\[música\]  
