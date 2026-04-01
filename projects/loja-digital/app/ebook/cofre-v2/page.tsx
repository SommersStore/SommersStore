"use client";

import React from "react";
import Image from "next/image";

// 🌓 THE BLACK PROTOCOL - V2 MASTER EDITION (A4) — COLEÇÃO PREMIUM COM CAPÍTULOS
const ebookStyles = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@100;300;400;700&display=swap');

.page-a4 {
  width: 210mm;
  min-height: 297mm;
  background: #050508;
  margin: 0 auto 60px; /* Mais espaço entre as páginas */
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.9), 0 0 15px rgba(197,160,89,0.1); /* Sombra mais profunda e brilho dourado leve */
  border: 1px solid rgba(197, 160, 89, 0.2); /* Linha sutil em tom dourado (#C5A059) */
  border-bottom: 3px solid rgba(197, 160, 89, 0.4); /* Linha inferior mais grossa para demarcar bem o fim */
  overflow: hidden;
  font-family: 'Libre Baskerville', serif;
  color: #F5F5DC;
  page-break-after: always;
  display: flex;
  flex-direction: column;
}

.title-gold { color: #C5A059; font-family: 'Libre Baskerville', serif; }
.accent-red { color: #8B0000; }
.border-red-subtle { border-top: 1px solid #8B0000; }
.image-pop { filter: brightness(1.1) contrast(1.1); }
.sans-extra-light { font-family: 'Montserrat', sans-serif; font-weight: 300; letter-spacing: 0.4em; }
.technical-label { font-family: 'Montserrat', sans-serif; font-weight: 400; letter-spacing: 0.6em; text-transform: uppercase; color: #5A5A5A; }

/* SHADOW-FLOW: Image dissolves from bottom-left behind content */
.shadow-flow-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 65%;
  height: 70%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.shadow-flow-container img {
  object-fit: cover;
  opacity: 0.36;
  filter: brightness(1.45) contrast(1.1) saturate(0.7);
}
.shadow-flow-mask {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: 
    linear-gradient(to right, transparent 10%, #050508 95%),
    linear-gradient(to top, transparent 5%, #050508 85%),
    linear-gradient(to bottom, #050508 0%, transparent 25%);
}

@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  html, body {
    background: #050508 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .ebook-wrapper {
    background: #050508 !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .page-a4 {
    border: none !important;
    margin: 0 !important;
    box-shadow: none !important;
    width: 210mm !important;
    height: 297mm !important;
    min-height: 297mm !important;
    max-height: 297mm !important;
    overflow: hidden !important;
    page-break-after: always !important;
    break-after: page !important;
  }
}
`;

// ==========================================
// ESTRUTURA DE DADOS V2 (LIVRO-COLEÇÃO)
// ==========================================
const protocolChapters = [
  {
    chapterId: "I",
    chapterTitle: "Rituais de Luz e Clareza",
    chapterDesc: "Fórmulas cítricas, luminosas, revigorantes e inegavelmente elegantes. A união entre a leveza japonesa e a sofisticação marroquina.",
    imageAbertura: "/ebook/f01-yuzu.png",
    formulas: [
      {
        id: "01", category: "A",
        title: "Yuzu Imperial do Solstício", origin: "Japão — Ritual Ryokan",
        signature: "Há uma luz que só brilha no inverno. Inspirado no ritual japonês Yuzu-yu, esta composição une a base mineral mais pura à assinatura cítrica-lenhosa do Yuzu e do Hinoki.",
        experienceDesc: "Você não está apenas mergulhando em água quente; você está comprando uma apólice de seguro contra a mediocridade do trânsito mental. Enquanto os cristais se desfazem, o aroma cítrico rasga o ar denso da fadiga como uma lâmina afiada, calibrando sua dopamina e instalando um nível de clareza que o 1% do mundo exige antes de fechar grandes ciclos. A água abraça. O Yuzu alinha. O Hinoki enraíza.",
        ingredients: ["150g Sal Marinho Fino", "100g Sal Rosa Himalaia", "50g Sal Epsom", "6 gotas OE Yuzu", "3 gotas Hinoki", "2 gotas Bergamota FCF"],
        ritual: "O Protocolo de Inverno: Inicie com água quente. O vapor deve carregar as notas cítricas para limpar a mente antes de tocar a pele.",
        preparation: [
          "Misture os minerais em um recipiente de cerâmica ou madeira perfeitamente seco.",
          "Dilua os óleos essenciais em jojoba para criar a ponte olfativa.",
          "Incorpore a fase aromática aos sais com movimentos circulares lentos.",
          "Adicione cascas cítricas desidratadas e finas para selar o frescor visual.",
          "Aguarde o 'descanso térmico' de 24h. A maturação é inegociável."
        ],
        legacyPhrase: "Onde o solstício toca a alma, a clareza se faz presente.",
        imageSensorial: "/ebook/f01-yuzu.png", imageShadow: "/sais/assets/zen-method-1.png",
      },
      {
        id: "02", category: "B",
        title: "Tulipa & Yuzu de Amsterdã", origin: "Europa/Japão — Edição Limitada",
        signature: "Artístico, fresco, colecionável. Uma ponte entre o design holandês e o ritual japonês. Menos terapêutico, mais sensorial.",
        experienceDesc: "O luxo não grita; ele sussurra detalhes que a maioria não tem repertório para perceber. Esta fórmula foi hackeada das galerias de arte europeias: uma estética visual irretocável unida à agudez japonesa. Durante o uso, você transcende o estado de 'pessoa exausta' e acessa o flow state. É um download de energia vital pura. Deixe as camadas se desfazerem como velhas crenças dissolvidas pela água.",
        ingredients: ["180g Sal Marinho", "70g Sal Rosa", "5 gotas Yuzu", "3 gotas Laranja Doce", "2 gotas Cedro Claro"],
        ritual: "A Galeria: Dissolva os sais e observe as camadas se desfazendo. Um banho para mentes criativas.",
        preparation: [
          "Alterne camadas de minerais para criar as faixas de cor no envase.",
          "Crie a sinergia cítrico-amadeirada no semente de uva neutro.",
          "Verta gota a gota para não desmanchar o desenho dos sais.",
          "Decore com flores claras que não ofusquem a pureza visual.",
          "Este é um produto de prateleira: envase em tubo alongado e cilíndrico."
        ],
        legacyPhrase: "Onde termina a perfumaria, começa a arte.",
        imageSensorial: "/ebook/yuzu.png", imageShadow: "/sais/assets/zen-pain-3.png",
      },
      {
        id: "03", category: "B",
        title: "Hammam de Atlas", origin: "Marrocos — Tradição Berber",
        signature: "O frescor absoluto de um spa internacional. Purificação pura através do eucalipto pungente e do nobre Argan.",
        experienceDesc: "Seu corpo físico é o hardware. Se ele trava, o software — sua mente — não performa. O Hammam de Atlas foi arquitetado para resetar você. O eucalipto não apenas perfuma; ele cria um vácuo no ar, forçando a abertura dos pulmões enquanto o Sal Epsom expulsa as toxinas pesadas das juntas articuladas.",
        ingredients: ["180g Sal Marinho Grosso", "120g Sal Epsom", "5 gotas Eucalipto", "4 gotas Alecrim", "2 gotas Menta"],
        ritual: "A Respiração Profunda: Deixe o frescor abrir a respiração antes mesmo imersão completa.",
        preparation: [
          "Macere os sais mais grossos com almofariz para libertar o mineral bruto.",
          "Inverta a ordem: umedeça com óleo de argan antes de aromáticos.",
          "Unifique o eucalipto forte à menta aguda com uma ponte amadeirada.",
          "Misture com energia para impregnar os cristais irregulares.",
          "Armazene em recipiente largo para permitir a retirada generosa."
        ],
        legacyPhrase: "A purificação do corpo é a liberdade primordial da mente.",
        imageSensorial: "/sais/assets/zen-pain-2.png", imageShadow: "/sais/assets/zen-method-1.png",
      }
    ]
  },
  {
    chapterId: "II",
    chapterTitle: "Rituais de Silêncio e Noite",
    chapterDesc: "A imersão profunda não suporta ruídos. Estas são composições terrosas e calmantes para noitadas que exigem aterramento.",
    imageAbertura: "/ebook/spa.png",
    formulas: [
      {
        id: "04", category: "A",
        title: "Vetiver Noturno de Ceilão", origin: "Sri Lanka — Aterramento Premium",
        signature: "Terroso, profundo, silencioso. O vetiver traz a raiz mais nobre da perfumaria para noites que pedem fechamento de ciclos de estresse e total quietude.",
        experienceDesc: "A verdadeira elite não vive correndo contra o relógio; ela domina o tempo. Quando a água toca este blend denso e terroso, você entra no 'Modo Avião Absoluto'. É o momento em que o caos do mundo externo bate na porta e encontra o silêncio magnético de um monge e a solidez de um CEO. Sinta a gravidade te puxando, abaixando a frequência cerebral de beta explosivo para ondas alfa restauradoras.",
        ingredients: ["200g Sal Epsom", "100g Dead Sea Salt", "4 gotas Vetiver", "4 gotas Camomila Romana", "3 gotas Sândalo"],
        ritual: "A Queda do Mundo: Para apagar a gravidade do dia. O vetiver abaixa mentalmente os pensamentos enquanto a base pesada nutre as articulações.",
        preparation: [
          "Mensure a proporção áurea de magnésio (Epsom duplo ao Mar Morto).",
          "O vetiver é espesso; prepare-o com calor brando no óleo fracionado.",
          "Dilua, gota a gota, o sândalo ao terroso para não sufocar a camomila.",
          "Reúna fase seca e líquida em movimentos amplos e pesados.",
          "Guarde em frascaria âmbar, cega à luz, como convém às grandes raízes."
        ],
        legacyPhrase: "A noite não nos rouba tempo; a noite nos devolve a nós mesmos.",
        imageSensorial: "/sais/assets/zen-dark-hero.png", imageShadow: "/ebook/spa.png",
      },
      {
        id: "05", category: "B",
        title: "Mineral do Mar Morto", origin: "Jordânia — Protocolo Funcional",
        signature: "A resposta dermatológica e orgânica em forma de descanso. A lavanda clareia enquanto o Dead Sea reconstrói a barreira do tecido exausto.",
        experienceDesc: "Você construiu a riqueza material, agora construa a riqueza celular. Os minerais do Mar Morto não são cosméticos, são uma arquitetura de longevidade. Entrar nessa água é entregar o corpo ao sal que curou reis na Jordânia milenar. A lavanda age nos bastidores silenciando o cortisol. É uma imersão funcional desenhada para quem joga o jogo do longo prazo.",
        ingredients: ["200g Dead Sea Salt", "100g Sal Epsom", "6 gotas Lavanda Branca", "2 gotas Camomila", "2 gotas Olíbano"],
        ritual: "O Regenerador: Ideal para o exausto funcional. Carga total de íons na banheira e recuperação acelerada.",
        preparation: [
          "Concentre a base exclusivamente em cristais minerais não refinados do Mar Morto.",
          "Misture a fase aromática de lavanda clássica criando uma nuvem calmante.",
          "Deixe o olíbano sagrado selar o processo contra evaporação volátil.",
          "Evite decantação precoce — misture durante longos três minutos.",
          "Use um pote translúcido com uma espessa guarnição nobre no ato da venda."
        ],
        legacyPhrase: "Quando curamos nosso corpo orgânico, curamos silenciosamente o espírito.",
        imageSensorial: "/ebook/spa.png", imageShadow: "/sais/assets/zen-dark-hero.png",
      },
      {
        id: "06", category: "C",
        title: "Vetiver & Flor de Laranjeira", origin: "Provença — Elegância Noturna",
        signature: "A raridade da ausência de lavanda para dormir. Silêncio amadeirado cortado apenas pelo toque floral noturno mais rico do catálogo.",
        experienceDesc: "Fuja do clichê. Enquanto as massas recorrem à lavanda óbvia para descansar, a verdadeira sofisticação descansa abraçada ao Vetiver amargo e à doce Flor de Laranjeira. Um código olfativo exclusivíssimo e intimista. Ao inalar esse vapor noturno denso, você entende o peso e a glória de escolher não ser mais um no meio da manada. O ritual para se preparar antes da vitória do dia seguinte.",
        ingredients: ["180g Sal Epsom", "120g Dead Sea Salt", "4 gotas Vetiver", "3 gotas Flor de Laranjeira", "2 gotas Camomila Doce"],
        ritual: "O Acorde Profundo: Feito sob medida para instantes em que só luzes de cera quente acesas e olhos cerrados fazem sentido.",
        preparation: [
          "Estratifique Epsom e Dead Sea em recipiente côncavo largo.",
          "Permita que a doçura da flor abrace o amargor do vetiver no béquer.",
          "Uma colher grande de metal espalha o blend recém umedecido.",
          "Nenhuma flor física inteira nesta composição: uma fórmula pura e lisa.",
          "Envase e restrinja a distribuição a poucos volumes limitados anualmente."
        ],
        legacyPhrase: "O silêncio mais elegante não vem das pedras, vem das resinas raras.",
        imageSensorial: "/sais/assets/zen-pain-3.png", imageShadow: "/ebook/botanical.png",
      }
    ]
  },
  {
    chapterId: "III",
    chapterTitle: "Rituais Florais de Luxo",
    chapterDesc: "Fórmulas femininas, imensas, adornadas. O encontro preciso entre luxo visual (Pétalas de Rosas, Jasmim, Ouro) e doçura curativa madura.",
    imageAbertura: "/ebook/botanical.png",
    formulas: [
      {
        id: "07", category: "A",
        title: "Rosa de Jaipur com Açafrão", origin: "Índia — Riqueza Ayurveda",
        signature: "Dourado puro e feminino. O embate sensual e clássico da Rosa Damascena mergulhada nas notas nobres dos inestimáveis fios de açafrão.",
        experienceDesc: "Você está coroando a si mesmo(a). Os fios magnéticos do Açafrão tingindo o absoluto de Rosa Damascena não deixam espaço para falsas modéstias. Você mergulha como pó e levanta como ouro. A alquimia dessa banheira constrói um escudo místico sobre o corpo. Se o seu nível de merecimento anda baixo ultimamente, essa é a injeção fatal de luxúria e abundância material injetada diretamente no córtex através do sistema límbico olfativo.",
        ingredients: ["150g Sal Rosa", "100g Sal Marinho", "50g Sal Epsom", "5 gotas Rosa", "3 gotas Cardamomo", "Fios de Açafrão Real"],
        ritual: "A Coroa: Deixe seus convidados ou seu próprio corpo observar a água tingir-se do ouro natural. É hora do trono.",
        preparation: [
          "Assegar a qualidade premium do sal rosa, descartando minerais irregulares e duros excessivamente.",
          "O absoluto de rosa requer óleo carreador fino — Amêndoas Doces Premium é obrigatório.",
          "Insira o calor do cardamomo como faísca. Incorpore aos minerais.",
          "Pinça cirúrgica espalha longos fios vermelhos de Açafrão Verdadeiro no topo, criando o contraste espetacular de venda.",
          "O preço desse blend demanda fita de veludo para entregar alto valor percedido impecável."
        ],
        legacyPhrase: "O brilho natural exige um ritual capaz de acompanhá-lo e enaltecê-lo.",
        imageSensorial: "/ebook/master_cover.png", imageShadow: "/sais/assets/zen-method-1.png",
      },
      {
        id: "08", category: "A",
        title: "Rosa Taif & Neroli", origin: "Oriente Médio — Luxury Spa",
        signature: "Buquê floral-luminoso, absurdamente refinado e de perfume de hotéis resorts hiper-exclusivos nas áridas montanhas e lagos quentes.",
        experienceDesc: "Este blend não é sobre se limpar da sujeira física; é sobre espantar a miséria energética diária de conviver com mentes pequenas operando na escassez. O toque cortante do Neroli atua fundindo a nobreza majestosa das Rosas do Oriente. No instante em que os sais tocam a água e seu corpo imerge, aquele luxo invisível dos resorts milionários de Dubai e Bali se teletransportam para dentro do seu ritual sagrado pessoal. Uma assinatura sensorial bilionária.",
        ingredients: ["150g Dead Sea Salt", "100g Sal Rosa", "4 gotas Rosa", "3 gotas Neroli", "2 gotas Petitgrain", "Pétalas Raras"],
        ritual: "A Escapada: Aplique os cristais na água exalando neroli e gerânio em sinergia cítrica, trazendo a leveza viva de volta.",
        preparation: [
          "Pese milimetricamente as combinações do sal mineral para equilibrar absorção orgânica celular.",
          "Associe Neroli (claro/fresco) e Rosa Taif (doce/amadeirada densa) no prato misturador.",
          "Injetar sob a massa os 3 óleos, e com luvas, misturar até a coloração se uniformizar no tom de pó rosa seco e apagado suave.",
          "Traga uma flor de laranjeira pálida solitária inteira na apresentação visual deslumbrante.",
          "Esta receita não aceita erros no marketing: foque nas palavras Ouro, Spa, Taif e Resort."
        ],
        legacyPhrase: "O refinamento supremo acontece quando a raridade parece sempre fluida natural.",
        imageSensorial: "/ebook/master_cover.png", imageShadow: "/ebook/yuzu.png",
      },
      {
        id: "09", category: "B",
        title: "Jasmim Sambac Noturno", origin: "Sudeste Asiático — Creme Branco",
        signature: "Branco, cremoso, aveludado, inesquecível. Como vestir uma túnica alva tecida no mais perfumado e caríssimo dos florais femininos indianos.",
        experienceDesc: "Branco, cremoso, aveludado, inesquecível. Como vestir uma túnica alva tecida no mais perfumado e caríssimo dos florais indianos. Ao deitar nessa água leitosa perfumada pelo caríssimo Jasmim Sambac e enraizada no sândalo, todo o frenesi do mundo colapsa. Você transcende. Você não é mais refém do estresse, nem operária de sua própria vida; o vapor sela as fendas da sua aura e instaura uma calmaria estética absurda, te levando a um estado místico indiano onde sua frequência ressoa diretamente com a nobreza pura e impenetrável.",
        ingredients: ["160g Sal Rosa", "90g Sal Marinho", "4 gotas Jasmine Sambac Absolute", "3 gotas Ylang", "2 gotas Sândalo"],
        ritual: "O Jasmim Abre: Mergulhe, feche a visão mecânica do espaço. A base aveludada evoca calma sensual irrestrita profunda noturna do ambiente exótico tropical asiático.",
        preparation: [
          "Incorpore sândalo amadeirado leitoso junto ao exótico jasmim para ancorá-lo de se tornar enjoativo.",
          "Evite Epsom aqui. Fique na salmoura mais salgada para puxar inchaços do dia e clarear e equilibrar pés frios à noite.",
          "Cubos minúsculos florais brancos em mistura rosa. Um apelo feminino luxuoso irrecusável visual das arábias e índias combinadas.",
          "Frascos perolados translúcidos dão o tom misterioso do envase necessário luxuoso."
        ],
        legacyPhrase: "O cheiro das estrelas só pode ser desenhado ao desabrochar das raras flores de jasmim.",
        imageSensorial: "/sais/assets/zen-pain-3.png", imageShadow: "/sais/assets/zen-pain-2.png",
      },
      {
        id: "10", category: "B",
        title: "Rosa & Amêndoas Doces", origin: "Ayurveda Premium",
        signature: "Pausas curadas num escudo de seda tátil. Banho aveludado de amêndoas reais. Macio, acolhedor e comercialmente indispensável em qualquer spa de nicho.",
        experienceDesc: "A verdadeira sofisticação muitas vezes escolhe não quebrar regras, mas sim dominá-las graciosamente. O abraço acolhedor das Amêndoas somado ao ápice feminino da rosa pura não proporciona agitação; proporciona alinhamento absoluto do eixo de poder magnético do sistema nervoso. Enquanto as lâminas blindadoras do óleo de amêndoa tocam a pele, todo o ruído mental externo é anulado.",
        ingredients: ["170g Sal Rosa", "80g Marinho", "50g Epsom", "4 gotas Rosa", "3 gotas Sândalo", "1 colher Óleo de Amêndoa"],
        ritual: "Conforto Total: Toda descompressão começa aqui. O óleo banha e o sândalo esvazia a fúria em tranquilidade compassiva inquebrável.",
        preparation: [
          "Aqueça levemente em placa cerâmica o óleo carreador generoso de amêndoa extraída crua a frio.",
          "Despeje delicada fase de sândalo até que amêndoa abra seu cheiro denso com a rosa. Unam em cristais de banho grandes cor-de-rosa intensos.",
          "Sela frascos minimalistas brancos sem muitos textos com fita bordada."
        ],
        legacyPhrase: "Antes da revolução a calma é imprescindível.",
        imageSensorial: "/ebook/yuzu.png", imageShadow: "/sais/assets/zen-pain-3.png",
      }
    ]
  },
  {
    chapterId: "IV",
    chapterTitle: "Rituais de Resina, Mistério e Presença",
    chapterDesc: "Aqui o livro atinge a sua essência mais misteriosa e arcaica. Fórmulas com peso monástico e códigos espirituais do Lótus Azul e da Mirra Bruta.",
    imageAbertura: "/ebook/spa.png",
    formulas: [
      {
        id: "11", category: "A",
        title: "Lótus Azul do Nilo", origin: "Egito — Segredo Alquímico",
        signature: "O epicentro da coleção. Uma molécula floral milenar embalsamada, rara, repousando soberana em resinas milenares negras e rosa no cofre do Nilo mítico.",
        experienceDesc: "Você está lidando com segredos de Faraós. O absoluto de Lótus Azul é tão proibitivo financeiramente quanto espiritualmente denso. O banho deixa de ser um ato trivial de limpeza e torna-se um evento. Quando aquelas resinas ancestrais se expandirem, a neblina carrega códigos ocultos para o cérebro que esvaziam totalmente sua ansiedade efêmera frente à eternidade egípcia escura. Aqui, os fracos adormecem, mas os fortes ganham um reset imperceptível para a massa.",
        ingredients: ["140g Sal Rosa", "60g Dead Sea Salt", "3 gotas Blue Lotus Absolute", "3 gotas Frankincense", "1 gota Sândalo", "Pétalas Azuis"],
        ritual: "Vácuo Faraônico: Cerimônia pura contemplativa focada, sem distrações baratas celulares artificiais mentais, um luxo imaterial impagável absoluto.",
        preparation: [
          "Invoque paciência: A diluição do absoluto caro exige carreador da mais fina casta de jojoba.",
          "Derrame a fase líquida olíbano lentamente como uma gota dourada ancestral.",
          "Embrulhe na matriz dura e bruta salgada.",
          "Assine a caixa protetora com rótulo sombreado misterioso, caixa dupla protetora e um preço inquestionavelmente muito elevado restrito."
        ],
        legacyPhrase: "Se a eternidade repousa em um lugar, ela cheira vagamente ao lótus sob o olíbano e sol distante.",
        imageSensorial: "/ebook/spa.png", imageShadow: "/sais/assets/zen-dark-hero.png",
      },
      {
        id: "12", category: "A",
        title: "Olíbano & Mirra do Deserto", origin: "Chifre da África — Protocolo do Rei",
        signature: "Seco. Resinoso. Incrivelmente Cerimonial. Um abismo aromático adulto, escuro e amadeirado. Alta perfumaria de nicho exótica transmutada em sais esotéricos minerais purificados esteticamente puros.",
        experienceDesc: "Resinas são o sangue milenar do deserto que chora e não morre. Elas sustentam o luxo intransigente que não pede licença para existir, apenas existe e impõe majestade. Essa infusão não quer sua alegria boba; ela quer o encerramento do seu tumulto e a instauração da sua verdadeira autoridade moral monástica sobre o seu próprio eu. Um portal maciço de controle, realeza, solidez. O peso de uma árvore do incenso ancorando seu império isolado nos mares salgados.",
        ingredients: ["170g Sal Marinho", "80g Dead Sea Salt", "50g Sal Negro (Lava)", "4 gotas Olíbano", "3 gotas Mirra", "Óleo de Argan Puro Ouro"],
        ritual: "Muralha Mental: A proteção final antes da retomada em grande escala nos impérios e tribos modernas.",
        preparation: [
          "O sal negro basáltico sujo é intencional aqui: ele fornece o impacto de marketing 'bruto e obscuro'.",
          "Adira finas lamelas picadas trituradas grosseiras da resina branca e âmbar física das árvores da vida seca africana no meio dos grânulos secos cinzentas e vermelhas.",
          "Emane nobreza na embalagem: O vidro será reto pesado escuro denso cilíndrico de base polida de peso duplo."
        ],
        legacyPhrase: "Das árvores secas no limite térmico, surge o nosso único contato curativo maduro.",
        imageSensorial: "/ebook/f01-yuzu.png", imageShadow: "/sais/assets/zen-method-1.png",
      }
    ]
  },
  {
    chapterId: "V",
    chapterTitle: "Rituais Minerais de Assinatura Visual Absoluta",
    chapterDesc: "Produtos que se vendem sozinhos pela estética crua obsidiana negra cortada por luxuosos fios de chá e flores em suspensão geométrica contrastante polar.",
    imageAbertura: "/ebook/botanical.png",
    formulas: [
      {
        id: "13", category: "B",
        title: "Obsidiana Floral de Sal Negro", origin: "Havaí — Detox Visual Instagramável",
        signature: "Um abismo vulcânico vulcânico cinético na água. Detritos escuros balsâmicos esteticamente potentes e calêndulas laranjas queimantes cruzando o escuro detox.",
        experienceDesc: "Você já ouviu a expressão 'olhar o abismo letal até ele piscar'? A água enegrecer não é algo usual, é um hack de quebra de padrão visual brutal. Ao entrar nesta caldeira mentolada purificadora vulcânica, a sujeira crônica eletromagnética do mundo inteiro despenca da pele. Seu cérebro codifica o contraste absurdo das folhas claras no mar revolto vulcânico de sal de lava negro curativo e reseta seus hormônios.",
        ingredients: ["180g Sal Marinho", "80g Epsom", "40g Black Lava Salt Carbonado", "4 gotas Tea Tree", "3 gotas Eucalipto Puro Verde Metálico"],
        ritual: "A Limpeza Cinética: Sais caem, a água embaça cinzenta negra cinética perfumada esbranquiçada exangue mentolada e então ressurge revigorada estonteante clara novamente com frescor da montanha limpa extrema gélida sem odor obsoleto passado antigo do corpo velho exausto.",
        preparation: [
          "Evite contato com umidade prematura. O sal negro solta pigmento carbonáceo cedo sem ele. Adicione Tea Tree mentol picante seco.",
          "Eucalipto garante frescor polar intenso da mata. Amassamentos duros misturam sem quebrar folhas brancas amarelas.",
          "Visual é prioridade. Rótulo escuro brilhante verniz total negro. Preço deve cobrir arte inigualável preta vulcânica pura estonteante esteticamente genial."
        ],
        legacyPhrase: "Às vezes, descer a montanha escura vulcanizada de fogo nos devolve a brisa fresca clara de um vale inteiro verde novo refeito de dentro para espalhar fora limpo irretocável de corpo lavada mental absoluto resíduo mental denso apagado lavado para longe definitivamente eterno curado imergido purgado renascido fresco exalando cura real inquestionável imbatível de ponta de cima abaixo sublime inconteste de alta moda clínica banhos botânicos exatos milimétricos impecáveis soberbos definitivos.",
        imageSensorial: "/sais/assets/zen-dark-hero.png", imageShadow: "/ebook/spa.png",
      },
      {
        id: "14", category: "C",
        title: "Chá Branco & Osmanthus", origin: "Macau — Boutique Hotel",
        signature: "Pálido, verde suave, doce celestial leve como a fumaça incensada invisível diurna amadeirada sutil discreta luxuosa e caríssima dos grandes lobby boutique chiques do oriente hiper-tecnológico sereno silencioso limpo impessoal perfeito.",
        experienceDesc: "A imensidão silenciosa das coberturas de arranha-céus na grande metrópole impenetrável condensadas dentro do seu altar privado molhado. É nula a urgência aqui. Você entra na banheira transbordante do leviano e volátil frescor do Osmanthus infundido no chá branco para apagar identidades mundanas provisórias de lutas operárias inúteis da selva lá fora.",
        ingredients: ["160g Sal Marinho Branco Lavado Fino Absoluto", "90g Sal Rosa", "4 gotas Osmanthus", "3 gotas Bergamota", "2 gotas Cedro Branco Esfoliado Polido"],
        ritual: "Respiração Minimalista: Acordar limpo é estar intocável pelo caos urbano barulhento desgovernado exterior ilusório alheio impuro invasivo desgastante crônico habitual denso sujo desestruturado. O limite é desenhado a pó aromático rarefeito estético belíssimo do oriente nobre pacífico.",
        preparation: [
          "Folhas de chá branco maceradas com lentidão mecânica lenta para não machucar oxidar clorofila preciosa celular em moinhos elétricos barulhentos brutais grosseiros agressivos desmedidos.",
          "Osmanthus raríssimo em frações embutidas finamente dispersadas secas."
        ],
        legacyPhrase: "O silêncio do luxo, ecoante silenciosamente.",
        imageSensorial: "/sais/assets/zen-pain-2.png", imageShadow: "/ebook/yuzu.png",
      },
      {
        id: "15", category: "C",
        title: "Açafrão Branco", origin: "Chipre — Abundância Bruta Mineral",
        signature: "Dourado reluzente e neroli. A essência encapsulada da deusa floral cítrica deusa soberana impávida eterna intocável.",
        experienceDesc: "Isenção impessoal indômita da perfeição banhada à luz do mediterrâneo insular e inalcançável exclusivo milionário e privado para as posses reais monarcas absolutos do grande fim do universo reluzente vibrante solar da deusa vitoriosa pura soberana e indômita imperatriz invicta.",
        ingredients: ["150g Sal Rosa", "100g Dead Sea", "4 gotas Neroli", "3 gotas Cardamomo Quente", "Fios Brancos Ouro"],
        ritual: "Abundância Final de Ciclo. Para os raros momentos de triunfo irrevogável definitivo do ciclo diário completo pleno exitoso brilhante e exato vitorioso solar ardente glorioso indômito vitorioso rei vivo próspero vitorioso impávido conquistador rico liberto farto coroado soberano.",
        preparation: [
          "Jojoba é ouro líquido, que envolvem florais raros do cardamomo neroli solar reluzente. O envase fechará com tampa amadeirada hermética com aro dourado para o acabamento exato impecável final magistral majestoso.",
        ],
        legacyPhrase: "A glória repousa em cristais de luz estagnada fluida vibrante eterna do universo engarrafada para rituais de consagrações particulares absolutas inquestionáveis supremas exclusivas majestosas raras e infinitamente memoráveis e insuperáveis sem pares ou réplicas.",
        imageSensorial: "/ebook/master_cover.png", imageShadow: "/sais/assets/zen-method-1.png",
      }
    ]
  }
];

export default function MasterEditionEbook() {
    // Calculadora para total global de páginas contínuas
    let globalPageCounter = 6; // Começamos no Pag 7 as fórmulas (Intro e Sumario são 1-6)

    return (
        <div className="ebook-wrapper" style={{minHeight:'100vh', background:'#050508', paddingTop:'40px', paddingBottom:'40px', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <style dangerouslySetInnerHTML={{ __html: ebookStyles }} />
            
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 1. CAPA MASTER EDITION (PAGE 01)                          */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 1. CAPA MASTER EDITION (PAGE 01)                          */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 p-20 justify-between items-center text-center">
                <div className="pt-20">
                    <h1 className="text-6xl text-[#C5A059] font-serif italic tracking-tighter leading-tight mb-2">O Cofre das <br/> Botânicas Secretas</h1>
                    <div className="w-12 h-px bg-red-800 mx-auto mb-8 mt-6" />
                    <h2 className="text-4xl text-neutral-500 font-['Libre_Baskerville'] italic mb-6">THE BLACK PROTOCOL</h2>
                    <p className="sans-extra-light text-[#F5F5DC]/50 text-xs tracking-[0.3em] uppercase">Edição Master — Ativo Digital de Luxo</p>
                </div>
                <div className="relative w-full h-[400px] border border-neutral-800 rounded-sm overflow-hidden">
                    <Image src="/ebook/master_cover.png" alt="Master Cover" fill className="object-cover image-pop" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                </div>
                <div className="pb-10">
                    <p className="technical-label text-[10px] text-neutral-600 mb-2">Protocolo de Uso Interno — Confidencial</p>
                    <p className="title-gold font-serif italic text-2xl">&quot;A sofisticação é a inteligência em forma de design.&quot;</p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 2. ABERTURA (PAGE 02)                                      */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 p-20 flex flex-col justify-center relative border border-neutral-900/50">
                 <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <Image src="/ebook/botanical.png" alt="Botanicals" fill sizes="100vw" className="filter grayscale opacity-20 object-center object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]" />
                 </div>
                 
                 <div className="text-center mb-16 relative z-10 pt-16">
                     <p className="technical-label text-[11px] text-[#C5A059] mb-4">A ESTRUTURA</p>
                     <h2 className="title-gold italic text-5xl">O Cofre das Botânicas Secretas</h2>
                     <div className="w-16 h-px bg-red-800 mx-auto mt-6" />
                 </div>
                 
                 <div className="font-serif italic text-xl leading-relaxed text-[#F5F5DC]/80 space-y-6 max-w-2xl mx-auto text-left mb-16 relative z-10">
                     <p>&quot;Existem fórmulas que cumprem uma função. E existem fórmulas que criam uma experiência.&quot;</p>
                     <p><span className="text-[#C5A059]">O Cofre das Botânicas Secretas</span> nasce para ocupar esse segundo espaço: o da composição sensorial sofisticada, da apresentação refinada e do autocuidado transformado em ritual.</p>
                     <p>Aqui, cada blend foi pensado para unir três pilares que elevam o valor percebido de um produto artesanal: a estética visual implacável, a intenção aromática madura, e uma imersão de uso memorável.</p>
                     <p>Não se trata apenas de misturar minerais e óleos; trata-se de arquitetar um momento de pausa inegociável em um mundo que não para de gritar. Este volume é o seu passaporte para uma nova categoria de percepção, onde o invisível — o aroma e a frequência — se torna a sua ferramenta mais poderosa de soberania pessoal.</p>
                 </div>

                 <div className="mt-auto pt-10 border-t border-neutral-900/50 flex justify-between relative z-10">
                    <span className="technical-label text-[10px] text-neutral-700 font-bold">ESSÊNCIA ATIVA BR™ SYSTEM</span>
                    <span className="accent-red font-bold text-[10px]">PAG. 02</span>
                 </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 3. MANIFESTO (PAGE 03)                                      */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 pt-40 p-20 flex flex-col relative justify-center border border-neutral-900/50">
                 <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <Image src="/ebook/lotus.png" alt="Lotus" fill sizes="100vw" className="filter grayscale opacity-20 object-center object-contain" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]" />
                 </div>

                 <div className="relative z-10">
                     <h2 className="title-gold italic text-6xl mb-12 text-center">O Manifesto Editorial</h2>
                     <p className="font-serif italic text-3xl leading-relaxed text-[#F5F5DC] max-w-2xl mx-auto mb-12 opacity-90 text-center">
                         &quot;Este volume não foi concebido para a pressa. Ele é a transcrição fiel de rituais que privilegiam a sofisticação silenciosa.&quot;
                     </p>
                     
                     <div className="grid grid-cols-2 gap-12 text-left border-t border-neutral-900/50 pt-12">
                        <div>
                            <h3 className="title-gold font-bold text-lg mb-6 tracking-widest uppercase text-center">O Propósito</h3>
                            <p className="text-[17px] text-neutral-400 leading-relaxed font-serif text-center italic">
                                Este material não foi concebido para ditar regras banais ou simplistas de mercado. Sua verdadeira intenção é educar o olhar para o refinamento absoluto de fórmulas premium que transcendem o óbvio. Aqui, o perfil presenteável e a estética sensorial dos resorts e Spas mais luxuosos de Bali, Marrocos e Japão são destilados em protocolos práticos. O propósito é elevar o seu produto da categoria de 'comodidade' para a de 'objeto de desejo' inalcançável.
                            </p>
                        </div>
                        <div>
                            <h3 className="title-gold font-bold text-lg mb-6 tracking-widest uppercase text-center">A Obra</h3>
                            <p className="text-[17px] text-neutral-400 leading-relaxed font-serif text-center italic">
                                A composição deste volume repousa sobre fundações minerais rigorosas e uma curadoria de aromacologia de nicho internacional. As fórmulas aqui contidas são raras, desenhadas especificamente para estratégias de vendas High-Ticket onde a experiência de uso justifica o preço premium. Através de blends autorais e rituais de consagração, esta obra transforma o autocuidado em um sistema de biohacking sensorial e estética impecável.
                            </p>
                        </div>
                     </div>
                 </div>

                 <div className="mt-auto pt-10 border-t border-neutral-900/50 flex justify-between relative z-10">
                    <span className="technical-label text-[10px] text-neutral-700 font-bold">O ARQUÉTIPO DO COFRE</span>
                    <span className="accent-red font-bold text-[10px]">PAG. 03</span>
                 </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 4. COMO USAR (PAGE 04)                                      */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 p-20 flex flex-col relative justify-center border border-neutral-900/50">
                 <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <Image src="/ebook/yuzu.png" alt="Botanicals" fill sizes="100vw" className="filter grayscale opacity-20 object-center object-contain scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508] opacity-80" />
                 </div>

                 <div className="relative z-10 text-center">
                    <h2 className="title-gold italic text-6xl mb-6">Regras de Ouro</h2>
                    <div className="flex flex-col items-center gap-4 mb-16">
                        <div className="w-12 h-px bg-red-800" />
                        <p className="technical-label text-[13px] text-[#C5A059] tracking-[0.6em] font-bold uppercase">
                            COMO OPERAR ESTE MATERIAL COM SEGURANÇA E ELEGÂNCIA
                        </p>
                    </div>
                    
                    <div className="font-serif italic text-2xl leading-relaxed text-[#F5F5DC]/90 space-y-8 max-w-2xl mx-auto mb-20 text-center">
                        <p>&quot;O verdadeiro luxo, no autocuidado artesanal, está situado no absoluto equilíbrio entre o mineral inorgânico e a vitalidade botânica.&quot;</p>
                        <p className="text-lg opacity-80">Um bom blend não precisa gritar no aroma para ser notado. A sofisticação nasce da proporção silenciosa, da pureza dos cristais e da intenção que você deposita em cada grama de maturação.</p>
                    </div>

                    <div className="bg-[#C5A059]/5 border border-[#C5A059]/10 p-12 max-w-2xl mx-auto text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 -translate-y-16 translate-x-16">
                            <div className="w-full h-full rounded-full border border-[#C5A059]" />
                        </div>

                        <h3 className="technical-label text-[12px] text-[#C5A059] mb-8 flex items-center gap-4 font-bold tracking-widest">
                            <div className="w-3 h-3 bg-red-800 rounded-full shadow-[0_0_10px_rgba(139,0,0,0.5)]" /> 
                            MANDAMENTOS DA COLEÇÃO
                        </h3>
                        
                        <ul className="grid grid-cols-1 gap-4 font-serif text-neutral-300 text-base italic">
                            <li className="flex gap-4 border-b border-neutral-900 pb-3">
                                <span className="text-[#C5A059] font-bold not-italic">01.</span>
                                <span>Antes de qualquer comercialização, teste a estabilidade térmica e olfativa da sua mistura por no mínimo 48h.</span>
                            </li>
                            <li className="flex gap-4 border-b border-neutral-900 pb-3">
                                <span className="text-[#C5A059] font-bold not-italic">02.</span>
                                <span>A estética visual é seu primeiro vendedor. Verifique a harmonia de cores sob luz natural e artificial.</span>
                            </li>
                            <li className="flex gap-4 border-b border-neutral-900 pb-3">
                                <span className="text-[#C5A059] font-bold not-italic">03.</span>
                                <span>Umidade é o inimigo fatal. Todos os utensílios e recipientes devem ser higienizados e secos de forma cirúrgica.</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-[#C5A059] font-bold not-italic">04.</span>
                                <span>Transforme a venda em ritual. Entregue um guia de uso que induza o cliente ao estado de pausa e consciência.</span>
                            </li>
                        </ul>
                    </div>
                 </div>

                 <div className="mt-auto pt-10 border-t border-neutral-900/50 flex justify-between relative z-10">
                    <span className="technical-label text-[10px] text-neutral-700 font-bold tracking-widest leading-none">ESSÊNCIA ATIVA BR™ SYSTEM</span>
                    <span className="accent-red font-bold text-[10px]">PAG. 04</span>
                 </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 5. A LÓGICA (PAGE 05)                                       */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 pt-[120px] p-20 flex flex-col relative border border-neutral-900/50">
                 <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <Image src="/ebook/botanical.png" alt="Botanicals" fill sizes="100vw" className="filter grayscale opacity-20 object-center object-contain scale-125" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508] opacity-80" />
                 </div>

                 <div className="relative z-10 text-center">
                    <div className="mb-12">
                        <p className="technical-label text-[13px] text-[#C5A059] tracking-[0.6em] font-bold uppercase mb-4">MECÂNICA ESTRUTURAL</p>
                        <h2 className="title-gold italic text-6xl mb-6">A Geometria do Blend</h2>
                        <div className="w-12 h-px bg-red-800 mx-auto" />
                    </div>
                    
                    <p className="font-serif italic text-2xl leading-relaxed text-[#F5F5DC]/90 max-w-2xl mx-auto mb-20 text-center">
                        &quot;Construir alta perfumaria e cosmética não é um exercício de intuição amadora. Toda fórmula se ergue perante quatro fundações imutáveis:&quot;
                    </p>

                    <div className="bg-[#C5A059]/5 border border-[#C5A059]/10 p-12 max-w-3xl mx-auto text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 -translate-y-16 translate-x-16">
                            <div className="w-full h-full rounded-full border border-[#C5A059]" />
                        </div>

                        <h3 className="technical-label text-[12px] text-[#C5A059] mb-8 flex items-center gap-4 font-bold tracking-widest uppercase">
                            <div className="w-3 h-3 bg-red-800 rounded-full shadow-[0_0_10px_rgba(139,0,0,0.5)]" /> 
                            Arquitetura da Composição
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-x-12 gap-y-8 font-serif text-neutral-300 italic">
                            <div className="border-b border-neutral-900 pb-6">
                                <span className="text-[#C5A059] font-bold not-italic text-lg block mb-2">01. Base Mineral</span>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    O corpo de sustentação físico. Cristais de Mar Morto, Rosa e Epsom definem cor, peso, volume e entrega de ação mineral purificadora.
                                </p>
                            </div>
                            <div className="border-b border-neutral-900 pb-6">
                                <span className="text-[#C5A059] font-bold not-italic text-lg block mb-2">02. Base Aromática</span>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    A espinha dorsal olfativa. Cítricos para manhã, resinas terrestres para noites e especiarias para rituais abundantes.
                                </p>
                            </div>
                            <div className="border-b border-neutral-900 pb-6">
                                <span className="text-[#C5A059] font-bold not-italic text-lg block mb-2">03. Forma Botânica</span>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    O contraste e choque estético. Fios de açafrão em sal rosa, ou pétalas claríssimas em sal negro basáltico. O componente que &quot;dá o clique&quot; no Instagram.
                                </p>
                            </div>
                            <div className="border-b border-neutral-900 pb-6">
                                <span className="text-[#C5A059] font-bold not-italic text-lg block mb-2">04. A Engrenagem Visual</span>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    Embalagens pesadas, vidros espessos, rótulos texturizados, a caixa e a tipografia que transborda a inteligência da sua marca materializada.
                                </p>
                            </div>
                        </div>
                    </div>
                 </div>

                 <div className="mt-auto pt-10 border-t border-neutral-900/50 flex justify-between relative z-10">
                    <span className="technical-label text-[10px] text-neutral-700 font-bold tracking-widest">ESSÊNCIA ATIVA BR™ SYSTEM</span>
                    <span className="accent-red font-bold text-[10px]">PAG. 05</span>
                 </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 6. SUMÁRIO (PAGE 06)                                        */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 pt-16 p-20 flex flex-col relative border border-neutral-900/50">
                 <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <Image src="/ebook/botanical.png" alt="Botanicals" fill sizes="100vw" className="filter grayscale opacity-20 object-center object-contain scale-125" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508] opacity-80" />
                 </div>

                 <div className="relative z-10">
                    <div className="text-center mb-10">
                        <p className="technical-label text-[12px] text-[#C5A059] tracking-[0.6em] font-bold uppercase mb-3">MAPA DE COMPOSIÇÕES</p>
                        <h2 className="title-gold italic text-5xl mb-4">Protocolo de Inverno</h2>
                        <div className="w-12 h-px bg-red-800 mx-auto" />
                    </div>

                    <div className="max-w-3xl mx-auto font-serif relative overflow-hidden bg-[#C5A059]/5 border border-[#C5A059]/10 p-8 space-y-6">
                        <div className="absolute top-0 right-0 w-40 h-40 opacity-5 -translate-y-20 translate-x-20">
                            <div className="w-full h-full rounded-full border border-[#C5A059]" />
                        </div>
                        
                        {protocolChapters.map((cap, i) => (
                            <div key={i} className="relative z-10">
                                <h3 className="technical-label text-[11px] text-[#C5A059] mb-4 tracking-widest border-b border-neutral-900 pb-2 font-bold flex items-center gap-3">
                                    <div className="w-2 h-2 bg-red-800 rounded-full shadow-[0_0_8px_rgba(139,0,0,0.4)]" />
                                    CAP. {cap.chapterId} — {cap.chapterTitle.toUpperCase()}
                                </h3>
                                <div className="space-y-2">
                                    {cap.formulas.map((f, j) => (
                                        <div key={f.id} className="flex justify-between items-baseline border-b border-neutral-900/30 pb-1 group hover:border-[#C5A059]/30 transition-colors">
                                            <span className="text-[#F5F5DC]/80 text-[14px] italic tracking-wide group-hover:text-[#F5F5DC] transition-colors">{f.id}. {f.title} <span className="opacity-30 text-[10px] uppercase tracking-tighter">({f.category})</span></span>
                                            <span className="text-[#C5A059] text-[10px] font-bold tracking-tighter sans-extra-light">PAG. {String(7 + (protocolChapters.slice(0, i).reduce((acc, c) => acc + c.formulas.length + 1, 0)) + j).padStart(2, '0')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>

                 <div className="mt-auto pt-8 border-t border-neutral-900/50 flex justify-between relative z-10">
                    <span className="technical-label text-[10px] text-neutral-700 font-bold tracking-widest">THE BLACK PROTOCOL MASTER</span>
                    <span className="accent-red font-bold text-[10px]">PAG. 06</span>
                 </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ♾️ RENDERIZAÇÃO COMPLEXA DOS CAPÍTULOS E SUAS FÓRMULAS         */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {protocolChapters.map((chapter) => {
                globalPageCounter += 1; // Página de abertura do capítulo
                return (
                    <React.Fragment key={chapter.chapterId}>
                        {/* ── ABERTURA DE CAPÍTULO ───────────────────────── */}
                        <article className="page-a4 overflow-hidden relative justify-center text-center">
                            <div className="absolute inset-0 z-0 opacity-40">
                                <Image src={chapter.imageAbertura} alt={chapter.chapterTitle} fill className="object-cover image-pop filter grayscale" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#050508]/40 to-transparent" />
                            </div>
                            <div className="relative z-10 max-w-xl mx-auto mt-20">
                                <p className="technical-label text-[14px] mb-8 text-neutral-500 tracking-[0.8em]">CAPÍTULO {chapter.chapterId}</p>
                                <div className="w-10 h-px bg-red-800 mx-auto mb-10" />
                                <h2 className="title-gold text-5xl mb-12 italic leading-tight">{chapter.chapterTitle}</h2>
                                <p className="font-serif text-lg leading-relaxed text-[#F5F5DC]/70 italic mb-20">
                                    &quot;{chapter.chapterDesc}&quot;
                                </p>
                            </div>
                            <div className="mt-auto p-10 relative z-10 opacity-70 border-t border-neutral-900 w-full flex justify-between technical-label text-[10px]">
                                <span>THE BLACK PROTOCOL</span>
                                <span className="text-red-800">PAGE {String(globalPageCounter).padStart(2, '0')}</span>
                            </div>
                        </article>

                        {/* ── ITERAÇÃO DAS FÓRMULAS DO CAPÍTULO ──────────── */}
                        {chapter.formulas.map((item) => {
                            globalPageCounter += 1; const sensorialPageStr = String(globalPageCounter).padStart(2, '0');
                            globalPageCounter += 1; const techPageStr = String(globalPageCounter).padStart(2, '0');

                            return (
                                <React.Fragment key={item.id}>
                                    
                                    {/* ── PG1 ABERTURA SENSORIAL HERO ───────── */}
                                    <article className="page-a4 overflow-hidden relative">
                                        <div className="absolute inset-0 z-0 bg-[#050508]">
                                            <Image src={item.imageSensorial} alt={item.title} fill className="object-cover opacity-50 image-pop" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/10 to-[#050508]/30" />
                                        </div>
                                        <div className="mt-auto p-16 relative z-10 mb-10 w-full flex gap-12 justify-between items-end">
                                            <div className="flex-1">
                                                <h2 className="title-gold text-7xl mb-6 italic leading-tight tracking-tight">{item.title}</h2>
                                                <p className="technical-label text-[12px] mb-8 text-neutral-400 tracking-[0.5em]">{item.origin}</p>
                                                <p className="font-serif italic text-2xl leading-relaxed text-[#F5F5DC]/90 max-w-xl">
                                                    &quot;{item.signature}&quot;
                                                </p>
                                            </div>
                                            <div className="flex-1 border-l border-neutral-800 p-8 pb-0 bg-[#050508]/30 backdrop-blur-sm">
                                                <h5 className="technical-label text-[10px] text-[#C5A059] mb-4 uppercase tracking-[0.3em]">O Arquétipo Sensorial Absoluto</h5>
                                                <p className="font-serif text-[16px] leading-relaxed italic text-neutral-400 opacity-90">
                                                    {item.experienceDesc}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-8 absolute top-8 right-8 writing-mode-vertical border-r border-red-800/20 pr-2">
                                            <span className="technical-label text-[10px] rotate-90 inline-block font-bold">LEGACY PROTOCOL – {item.id}</span>
                                        </div>
                                    </article>

                                    {/* ── PG2 TÉCNICA (SHADOW-FLOW) ───────────── */}
                                    <article className="page-a4 p-16 justify-between relative border border-neutral-900/50">
                                         <div className="shadow-flow-container">
                                              <Image src={item.imageShadow} alt="" fill sizes="50vw" />
                                              <div className="shadow-flow-mask" />
                                         </div>
                                         <div className="relative z-10 border-l-2 border-red-800/40 pl-8 pt-4">
                                             <h4 className="technical-label text-[14px] mb-8">Composition Logic — {item.id}</h4>
                                             
                                             <div className="grid grid-cols-2 gap-16 mb-16">
                                                <div>
                                                    <h5 className="title-gold font-bold text-lg uppercase mb-6 tracking-widest flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-red-800 rounded-full" /> Insumos Elite
                                                    </h5>
                                                    <ul className="text-xl space-y-4 font-serif italic text-neutral-300">
                                                        {item.ingredients.map((ing, i) => (
                                                            <li key={i} className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                                                                <span className="text-[12px] text-red-800 font-bold uppercase tracking-tighter">ELITE_0{i+1}</span>
                                                                {ing}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h5 className="title-gold font-bold text-lg uppercase mb-6 tracking-widest flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-red-800 rounded-full" /> Alchemists Protocol
                                                    </h5>
                                                    <p className="text-[20px] leading-relaxed text-neutral-200 font-serif mb-8 italic border-b border-neutral-900 pb-8">
                                                        {item.ritual}
                                                    </p>
                                                    
                                                    <div className="mb-10">
                                                        <h6 className="technical-label text-[11px] mb-4 text-[#C5A059] font-bold">Modo de Preparo</h6>
                                                        <ol className="text-[15px] text-neutral-400 font-serif italic space-y-3">
                                                            {item.preparation.map((step, i) => (
                                                                <li key={i} className="flex gap-3">
                                                                    <span className="text-red-800 font-bold">{i+1}.</span> {step}
                                                                </li>
                                                            ))}
                                                        </ol>
                                                    </div>

                                                    <div className="bg-red-800/5 p-6 border-l-4 border-red-800">
                                                        <p className="technical-label text-[10px] mb-2 text-[#C5A059] font-bold">Apresentação Luxury</p>
                                                        <p className="text-[15px] text-neutral-400 italic">Envase em vidro escurecido. Adicione flores secas no topo para selar a assinatura visual da marca Essência Ativa BR™.</p>
                                                    </div>
                                                </div>
                                             </div>
                                         </div>

                                         <div className="relative z-10 text-center py-12 border-y border-neutral-900/50 mt-auto">
                                             <p className="title-gold font-serif italic text-3xl opacity-90">&quot;{item.legacyPhrase}&quot;</p>
                                         </div>

                                         <div className="relative z-10 pt-8 flex justify-between items-center technical-label text-[11px] text-neutral-500 font-bold">
                                             <span>THE BLACK PROTOCOL // EDIÇÃO MASTER</span>
                                             <span className="text-red-800">PAGE {techPageStr}</span>
                                         </div>
                                    </article>
                                </React.Fragment>
                            );
                        })}
                    </React.Fragment>
                );
            })}

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 🏁 ENDING (PAGE FINAL)                                     */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 p-20 justify-between items-center text-center relative overflow-hidden">
                <div className="pt-20 z-10 relative">
                    <p className="technical-label text-[11px] text-[#C5A059] mb-6 tracking-widest">VOLUME FINALIZADO</p>
                    <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto" />
                </div>
                {/* Espaço reservado para o visual da transcendence final */}
                <div className="absolute inset-x-0 bottom-0 top-[20%] pointer-events-none opacity-20 filter grayscale blur-sm"
                     style={{background: 'url(/ebook/master_cover.png) center/cover'}}>
                    <div className="absolute inset-0 bg-[#050508]/80"/>
                </div>
                <div className="pb-20 z-10 relative mt-auto">
                    <h3 className="title-gold italic text-7xl mb-8 leading-none">O Legado <br/>Continua</h3>
                    <div className="w-16 h-px mx-auto mb-10" style={{background: 'linear-gradient(to right, transparent, #C5A059, transparent)'}} />
                    <p className="font-serif italic text-2xl text-neutral-400 max-w-sm mx-auto leading-relaxed mb-16">
                        &quot;As melhores fórmulas não tratam o corpo. Elas devolvem a pessoa para si.&quot;
                    </p>
                    <span className="technical-label text-[12px] uppercase text-[#F5F5DC]/40 tracking-[1em]">Essência Ativa BR™</span>
                </div>
            </section>
        </div>
    );
}
