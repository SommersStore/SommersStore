import { Chapter } from "../types/chapters";

const protocolChapters: Chapter[] = [
  {
    chapterId: "I",
    chapterTitle: "Arquivos de Citrinos e Energias de Topo",
    chapterDesc: "Abertura solar, clareza mental e o despertar dos sentidos através de notas cítricas nobres da Itália e do Japão.",
    chapterManifesto: "O início de todo protocolo de luxo é o despertar. Não se constrói um império em um estado de névoa mental. As notas de topo como o Yuzu Real e a Bergamota não são apenas cheiros; são gatilhos neuro-estéticos de prontidão. Este capítulo é o seu portal de entrada para o foco inabalável. Quando o cítrico toca o vapor, o mundo lá fora silencia e a sua visão estratégica assume o comando.",
    chapterSpecs: ["Foco: Clareza e Vitalidade", "Notas: Cítricas e Herbais", "Ação: Despertar Cognitivo"],
    imageAbertura: "/ebook/master_cover.png",
    formulas: [
      {
        id: "01", category: "A",
        title: "Yuzu Imperial & Chá Matcha Verde", origin: "Japão — Kyoto Garden Ritual",
        signature: "Fresco, ácido, aristocrático. Um banho cinético que reconecta a mente com a precisão japonesa. Verde-limão translúcido e pó de matcha puro flutuando em sais marinhos.",
        longSignature: "O Yuzu não é apenas um limão; é a assinatura da realeza japonesa. O Matcha não é apenas um chá; é a meditação líquida. Juntos, criam um protocolo de despertar que limpa a fadiga adrenal e instaura uma clarea mental cortante como uma lâmina de katana.",
        experienceDesc: "Você está lidando com a aristocracia dos citrinos. O Yuzu Imperial não grita; ele anuncia sua presença com uma elegância ácida que corta o cansaço mental como uma lâmina. Ao fundir-se com a terra herbácea do Matcha de grau cerimonial, o banho deixa de ser um relaxamento passivo para tornar-se uma ativação estratégica. O vapor carrega moléculas que reorganizam sua percepção, preparando-o para o domínio absoluto do dia. É o amanhecer do império pessoal.",
        ingredients: ["150g Sal Epsom", "100g Sal Marinho", "4 gotas Yuzu Essential Oil", "2 gotas Petitgrain", "1 colher de Chá Matcha"],
        ingredientImages: [
          { name: "Sal Epsom", quantity: "150g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sal Marinho", quantity: "100g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Yuzu Oil", quantity: "4 gotas", imagePath: "/ebook/ingredients/yuzu.png" },
          { name: "Petitgrain", quantity: "2 gotas", imagePath: "/ebook/ingredients/petitgrain.png" },
          { name: "Matcha", quantity: "1 colher", imagePath: "/ebook/ingredients/matcha.png" },
        ],
        ritual: "Abertura Solar: Inicie o ritual com água em temperatura morna-viva. O vapor deve ser preenchido pela acidez nobre do Yuzu antes da imersão total.",
        preparation: [
          "Misture os sais em bowl cerâmico branco.",
          "Pingue os óleos de forma circular, visualizando a expansão da luz.",
          "Adicione o Matcha por último, polvilhando como ouro verde sobre a mistura.",
          "Apresentação: Vidro reto, tampa metálica preta fosca. Rótulo com texturas táteis."
        ],
        presentationBox: "Caixa em papel artesanal de alta gramatura, fechamento em lacre de cera preta com o selo do Protocolo. Interior forrado com papel de seda cinza-chumbo.",
        legacyPhrase: "Onde a clareza encontra o corpo, o império começa a ser desenhado.",
        imageSensorial: "/ebook/f01-yuzu.png", imageShadow: "/sais/assets/zen-pain-3.png",
      },
      {
        id: "02", category: "A",
        title: "Bergamota Italiana & Manjericão Roxo", origin: "Calábria — Southern Light",
        signature: "Solar, revigorante, picante. O brilho da costa italiana em um contraste herbal profundo. Sais amarelos vibrantes com traços de folhas secas escuras.",
        longSignature: "A Bergamota da Calábria é o ouro líquido do Mediterrâneo. O Manjericão Roxo traz o contraste necessário para que o frescor não seja comum. Um protocolo de revitalização que instaura o otimismo inteligente e a força criativa.",
        experienceDesc: "Este blend é o sol do meio-dia capturado em cristais salinos. A Bergamota não é apenas refrescante; ela é eufórica, porém contida em sua nobreza. O Manjericão Roxo entra como um contraponto sombrio e aromático, garantindo que o estímulo sensorial tenha profundidade. No contato com a água, a luz mediterrânea invade o ambiente, dissipando sombras de dúvida e estresse, deixando em seu lugar uma energia vibrante e uma prontidão executiva inabalável.",
        ingredients: ["180g Sal Rosa", "70g Sal Epsom", "5 gotas Bergamota LFC", "3 gotas Manjericão Sagrado", "Folhas secas de Manjericão Roxo"],
        ingredientImages: [
          { name: "Sal Rosa", quantity: "180g", imagePath: "/ebook/ingredients/sal-rosa.png" },
          { name: "Sal Epsom", quantity: "70g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Bergamota", quantity: "5 gotas", imagePath: "/ebook/ingredients/bergamota.png" },
          { name: "Manjericão", quantity: "3 gotas", imagePath: "/ebook/ingredients/manjericao.png" },
          { name: "Folhas Secas", quantity: "Decoração", imagePath: "/ebook/ingredients/folhas-secas.png" },
        ],
        ritual: "Revitalização Mediterrânea: Banho de transição entre o caos e a criação. Sinta a picância herbal abrindo os pulmões e a mente.",
        preparation: [
          "Incorpore as gotas de Bergamota nos sais rosas até que a coloração se torne levemente úmida e brilhante.",
          "Adicione as folhas de manjericão trituradas grosseiramente para um efeito estético 'crude luxury'.",
          "Mantenha em pote hermético de vidro âmbar para preservar a volatilidade cítrica.",
          "Marketing: Vendido como 'The Sicilian Executive' em spas de alta performance."
        ],
        presentationBox: "Caixa em papel artesanal de alta gramatura, fechamento em lacre de cera preta com o selo do Protocolo. Interior forrado com papel de seda cinza-chumbo.",
        legacyPhrase: "O sol só brilha para quem dominou o frescor da própria alma.",
        imageSensorial: "/ebook/spa.png", imageShadow: "/sais/assets/zen-dark-hero.png",
      },
      {
        id: "03", category: "B",
        title: "Verbena Real & Cidreira Bruta", origin: "Provence — Field Protocol",
        signature: "Cítrico-limpo, herbáceo, minimalista. O cheiro de lençóis de linho lavados em ervas raras sob o sol da França. Pureza absoluta.",
        longSignature: "A Verbena é a erva do discernimento. A Cidreira Bruta é a força da terra. Um protocolo de purificação que remove o peso do dia e prepara a mente para o repouso estratégico ou para a próxima grande decisão.",
        experienceDesc: "A pureza é o último grau da sofisticação. Este blend não usa artifícios; ele usa a força bruta e limpa das ervas canônicas. A Verbena traz o discernimento, limpando o 'lixo visual' da mente cansada. A Cidreira ancorar o sistema nervoso, impedindo que a energia cítrica se torne ansiosa. O resultado é um estado de presença neutra, um vácuo de tranquilidade onde o ego silencia e a essência respira. É a estética da limpeza levada ao extremo do luxo.",
        ingredients: ["200g Sal Marinho", "50g Sal Epsom", "6 gotas Verbena", "2 gotas Lemongrass", "Chá de Cidreira Seco"],
        ingredientImages: [
          { name: "Sal Marinho", quantity: "200g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Sal Epsom", quantity: "50g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Verbena", quantity: "6 gotas", imagePath: "/ebook/ingredients/verbena.png" },
          { name: "Cidreira", quantity: "2 gotas", imagePath: "/ebook/ingredients/cidreira.png" },
          { name: "Chá Seco", quantity: "Decoração", imagePath: "/ebook/ingredients/matcha.png" },
        ],
        ritual: "Limpeza de Campo: Use após longas reuniões ou viagens. Deixe que as lâminas cítricas herbais removam as toxinas energéticas acumuladas.",
        preparation: [
          "Base de sal marinho grosso para sensação tátil de limpeza.",
          "Óleo de verbena em concentração elevada para garantir rastro duradouro.",
          "Misturar Cidreira seca para dar o aspecto 'farm-to-table' de luxo.",
          "Embalar em frasco de laboratório vintage com rolha de cortiça e selo manual."
        ],
        legacyPhrase: "Escolher a simplicidade é o ato de força mais luxuoso da existência.",
        imageSensorial: "/ebook/f01-yuzu.png", imageShadow: "/sais/assets/zen-pain-2.png",
      }
    ]
  },
  {
    chapterId: "II",
    chapterTitle: "Crônicas da Floresta e Madeiras Nobres",
    chapterDesc: "Aterramento e força. O poder das resinas do Cedro e do Sândalo para fundir o corpo com a terra.",
    chapterManifesto: "Nenhum império se sustenta sem raízes profundas. Quando o citrino despertou sua mente, as madeiras vêm para ancorar o seu corpo. O Cedro do Atlas e o Sândalo não são apenas fragâncias; são estruturas de estabilidade. Este capítulo é sobre o peso moral e a resiliência. Mergulhar em notas de madeira é declarar que você é inabalável frente às tempestades. É o protocolo da autoridade silenciosa.",
    chapterSpecs: ["Foco: Estabilidade e Resiliência", "Notas: Amadeiradas e Resinosas", "Ação: Aterramento Biocinético"],
    imageAbertura: "/ebook/spa.png",
    formulas: [
      {
        id: "04", category: "A",
        title: "Cedro do Atlas & Musgo de Carvalho", origin: "Marrocos — High Altitude Ritual",
        signature: "Terroso, seco, imponente. O cheiro de uma biblioteca antiga de carvalho fundida com o ar gelado das montanhas marroquinas. Força bruta.",
        longSignature: "O Cedro do Atlas é a árvore da imortalidade. O Musgo de Carvalho é a paciência da floresta. Um protocolo de aterramento extremo, desenhado para quem precisa de solidez emocional e clareza de propósito.",
        experienceDesc: "Mergulhar neste blend é como entrar em uma floresta milenar que não conhece o tempo. O Cedro do Atlas traz a verticalidade, a sensação de espinha ereta e autoridade. O Musgo de Carvalho, úmido e persistente, completa a experiência garantindo que seu sistema nervoso reconheça a segurança da terra. O vapor se torna denso, resinoso, monástico. Não há lugar para a pressa aqui; há apenas o tempo necessário para que você se torne tão sólido quanto a madeira de lei que o cerca.",
        ingredients: ["160g Sal Marinho", "90g Sal Negro", "5 gotas Cedro Atlas", "2 gotas Patchouli", "Extrato de Musgo"],
        ingredientImages: [
          { name: "Sal Marinho", quantity: "160g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Sal Negro", quantity: "90g", imagePath: "/ebook/ingredients/sal-negro.png" },
          { name: "Cedro Atlas", quantity: "5 gotas", imagePath: "/ebook/ingredients/cedro.png" },
          { name: "Patchouli", quantity: "2 gotas", imagePath: "/ebook/ingredients/patchouli.png" },
          { name: "Musgo", quantity: "2 gotas", imagePath: "/ebook/ingredients/matcha.png" },
        ],
        ritual: "Protocolo de Raiz: Água quente-massa. Permita que a resina de cedro abra primeiro a via respiratória antes da imersão cervical.",
        preparation: [
          "Use uma base mista de sal negro e marinho para criar um visual de solo de floresta.",
          "Dissolva o extrato de musgo previamente em álcool de cereais antes de aspergir nos sais.",
          "Sela em tubos de vidro borossilicato com tampa de madeira real gravada a laser.",
          "Marketing: 'The Forest Architect' — para mentes que constroem estruturas duradouras."
        ],
        legacyPhrase: "A árvore que toca o céu é a mesma que dominou a paciência de pertencer ao solo.",
        imageSensorial: "/ebook/yuzu.png", imageShadow: "/sais/assets/zen-pain-3.png",
      },
      {
        id: "05", category: "A",
        title: "Sândalo Mysore & Vetiver de Java", origin: "Índia Oriental — Sacred Ground",
        signature: "Poderoso, esfumaçado, cremoso. A fusão entre o doce leitoso do sândalo e a raiz crua e suja do vetiver. O ápice do aterramento de luxo.",
        longSignature: "Sândalo Mysore é o perfume dos deuses e reis. Vetiver de Java é a fibra da terra. Um protocolo de presença absoluta, feito para dissolver a fragmentação mental e instaurar uma paz soberana e inegável.",
        experienceDesc: "Você está lidando com o peso da história aromática. O Sândalo Mysore não é apenas uma madeira; é um bálsamo leitoso que envolve a aura em uma camada de proteção estética impenetrável. O Vetiver, por sua vez, traz a raiz bruta, esfumaçada, quase animal, que impede que a doçura se torne frágil. Juntos, criam uma frequência de mando. Na água, a experiência é densa, restauradora de tecidos e de ânimo. É o banho da soberania pessoal assumida.",
        ingredients: ["200g Sal Marinho", "50g Epsom", "4 gotas Sândalo Mysore", "3 gotas Vetiver Java", "Óleo Carreador de Arroz"],
        ingredientImages: [
          { name: "Sal Marinho", quantity: "200g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Sal Epsom", quantity: "50g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sândalo", quantity: "4 gotas", imagePath: "/ebook/ingredients/sandalo.png" },
          { name: "Vetiver", quantity: "3 gotas", imagePath: "/ebook/ingredients/vetiver.png" },
          { name: "Óleo de Arroz", quantity: "Premium", imagePath: "/ebook/ingredients/argan.png" },
        ],
        ritual: "Soberania do Solo: Ideal para o final de ciclos desgastantes. Deixe que a fumaça de vetiver remova a confusão e o sândalo sele a sua nova autoridade.",
        preparation: [
          "Aqueça levemente o óleo de arroz no banho-maria com as gotas de sândalo antes de verter no sal.",
          "O vetiver, por ser denso, deve ser pingado individualmente em cristais maiores para retenção lenta de fragrância.",
          "Acondicione em cerâmica escura fosca ou vidro preto denso.",
          "Frase de Venda: 'Não é um banho, é uma coroação privada'."
        ],
        legacyPhrase: "A paz é o maior atributo de quem detém o verdadeiro poder.",
        imageSensorial: "/ebook/f01-yuzu.png", imageShadow: "/sais/assets/zen-dark-hero.png",
      },
      {
        id: "16", category: "B",
        title: "Palo Santo & Âmbar Ancestral", origin: "Andes — Mystic Core",
        signature: "Resinado, doce-metafísico, purificador. A madeira sagrada dos xamãs andinos fundida com o calor fóssil do âmbar. Limpeza eletromagnética.",
        longSignature: "O Palo Santo é o limpador dos campos sutis. O Âmbar é a memória quente da vida. Um protocolo de proteção e calor, ideal para renovar a energia e afastar influências externas pesadas.",
        experienceDesc: "Existe uma ciência invisível na madeira do Palo Santo. Ela não apenas perfuma; ela limpa a estática elétrica do seu campo pessoal. Combinada com a resina de Âmbar, que fornece um colchão de calor e conforto fóssil, a experiência se torna um casulo espiritual. Na banheira, o aroma é doce e levemente esfumaçado, evocando templos e rituais de fogo. É o protocolo para quando você se sente 'vazado' pelo mundo e precisa reconstruir sua membrana de proteção estética.",
        ingredients: ["180g Sal Rosa", "70g Sal Marinho", "5 gotas Palo Santo Oil", "3 gotas Âmbar Resin Blend", "Lascas de Pau Santo"],
        ingredientImages: [
          { name: "Sal Rosa", quantity: "180g", imagePath: "/ebook/ingredients/sal-rosa.png" },
          { name: "Sal Marinho", quantity: "70g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Palo Santo", quantity: "5 gotas", imagePath: "/ebook/ingredients/palo-santo.png" },
          { name: "Âmbar", quantity: "3 gotas", imagePath: "/ebook/ingredients/amber.png" },
          { name: "Lascas", quantity: "Decoração", imagePath: "/ebook/ingredients/matcha.png" },
        ],
        ritual: "Cerimônia de Proteção: Inicie o ritual com respirações profundas, permitindo que a doçura do Palo Santo neutralize seus cansaços.",
        preparation: [
          "Misture os sais até a homogeneidade visual.",
          "Adicione as lascas de pau santo finamente cortadas no centro da mistura.",
          "A fase âmbar deve ser mais densa, preferencialmente unida aos sais marinhos grossos.",
          "Embalagem recomendada: Pote de vidro borossilicato com tampa de cortiça, cordão de juta e selo manual."
        ],
        legacyPhrase: "Sua aura é o seu primeiro e mais importante território. Mantenha-o limpo e soberano.",
        imageSensorial: "/ebook/spa.png", imageShadow: "/sais/assets/zen-pain-2.png",
      }
    ]
  },
  {
    chapterId: "III",
    chapterTitle: "Arquivos Florais,\u00A0Açafrao e Sedas",
    chapterDesc: "Fórmulas de extremo valor estético e perfumaria de nicho. Jasmim, Rosas raras e o toque dourado do Açafrão indiano para o brilho da pele e da alma.",
    chapterManifesto: "O luxo sem beleza é apenas utilitarismo. Quando as mentes despertaram e os corpos se ancoraram, é hora de permitir a expansão da alma através da estética floral. A Rosa de Taif e o Açafrão Real não são caprichos; são o ápice do refinamento sensorial. Este capítulo é o seu salão de banquetes privado. Destinado a momentos de deleite, celebração da própria trajetória e o cultivo de uma aura magnética que só a raridade das flores mais nobres pode conferir.",
    chapterSpecs: ["Foco: Magnetismo e Estética", "Notas: Florais e Especiarias", "Ação: Expansão Vibracional"],
    imageAbertura: "/ebook/botanical.png",
    formulas: [
      {
        id: "07", category: "A",
        title: "Açafrão Real & Damascos de Seda", origin: "Pérsia — The Golden Glow",
        signature: "Especiado-quente, adocicado, dourado. O banho de Cleópatra reimaginado para o século XXI. Coloração âmbar brilhante com estigmas de açafrão em suspensão.",
        longSignature: "O Açafrão é a especiaria mais cara do mundo. O Damasco é o fruto da juventude. Um protocolo de brilho absoluto, tanto para a pele quanto para a disposição interna, evocando a opulência dos palácios persas.",
        experienceDesc: "O luxo aqui é quase palpável. O Açafrão Real, colhido à mão sob o sol do Irã, libera seus pigmentos e aromas terrosos-doces na água, tingindo-a em um tom de ouro líquido. O extrato de Damasco fornece a textura de seda que envolve a pele, criando uma barreira de hidratação e sofisticação tátil. Na banheira, você não está mergulhado em água; está mergulhado em riqueza líquida. O resultado é um magnetismo dourado, uma sensação de valor pessoal que transborda no seu olhar.",
        ingredients: ["150g Sal Epsom", "100g Sal Rosa", "0.2g Estigmas Açafrão", "4 gotas Óleo de Damasco", "2 gotas Cardamomo"],
        ingredientImages: [
          { name: "Sal Epsom", quantity: "150g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sal Rosa", quantity: "100g", imagePath: "/ebook/ingredients/sal-rosa.png" },
          { name: "Açafrão", quantity: "Resina", imagePath: "/ebook/ingredients/acafrao.png" },
          { name: "Óleo de Damasco", quantity: "4 gotas", imagePath: "/ebook/ingredients/damasco.png" },
          { name: "Cardamomo", quantity: "2 gotas", imagePath: "/ebook/ingredients/cardamomo.png" },
        ],
        ritual: "A Coroação Dourada: Sinta a água carregar a cor do sol. Deixe o calor das especiarias ativar sua circulação e sua coragem silenciosa para o próximo passo.",
        preparation: [
          "Esmague levemente os estigmas de açafrão com um pilão de mármore antes de unir aos óleos.",
          "Misture os óleos nos sais Epsom para que a coloração âmbar se espalhe uniformemente.",
          "Utilize o cardamomo como nota de base para ancorar a doçura das frutas.",
          "Marketing: 'The Golden Protocol' — o banho favorito para pré-eventos de altíssimo impacto."
        ],
        presentationBox: "Caixa em veludo carmesim ou dourado fosco. Os fios de açafrão devem vir em um pequeno porta-joias de vidro anexo à embalagem principal.",
        legacyPhrase: "O brilho natural exige um ritual capaz de acompanhá-lo e enaltecê-lo.",
        imageSensorial: "/ebook/master_cover.png", imageShadow: "/sais/assets/zen-method-1.png",
      },
      {
        id: "08", category: "A",
        title: "Rosa Taif &\u00A0Neroli Branco", origin: "Oriente Médio — Luxury Spa",
        signature: "Buquê floral-luminoso, absurdamente refinado e de perfume de hotéis resorts hiper-exclusivos nas áridas montanhas e lagos quentes.",
        longSignature: "O luxo silencioso dos resorts mais exclusivos de Dubai transformado em ritual. Rosa Taif é a assinatura de quem não precisa de apresentações. O Neroli traz a luz solar necessária para revitalizar um espírito cansado de excelência.",
        experienceDesc: "Este blend não é sobre se limpar da sujeira física; é sobre espantar a miséria energética diária de conviver com mentes pequenas operando na escassez. O toque cortante do Neroli atua fundindo a nobreza majestosa das Rosas do Oriente. No instante em que os sais tocam a água e seu corpo imerge, aquele luxo invisível dos resorts milionários de Dubai e Bali se teletransportam para dentro do seu ritual sagrado pessoal. Uma assinatura sensorial bilionária.",
        ingredients: ["150g Dead Sea Salt", "100g Sal Rosa", "4 gotas Rosa", "3 gotas Neroli", "2 gotas Petitgrain", "Pétalas Raras"],
        ingredientImages: [
          { name: "Dead Sea Salt", quantity: "150g", imagePath: "/ebook/ingredients/dead-sea.png" },
          { name: "Sal Rosa", quantity: "100g", imagePath: "/ebook/ingredients/sal-rosa.png" },
          { name: "Rosa Taif", quantity: "4 gotas", imagePath: "/ebook/ingredients/rosa.png" },
          { name: "Neroli", quantity: "3 gotas", imagePath: "/ebook/ingredients/neroli.png" },
          { name: "Petitgrain", quantity: "2 gotas", imagePath: "/ebook/ingredients/petitgrain.png" },
          { name: "Pétalas Raras", quantity: "Decoração", imagePath: "/ebook/ingredients/petalas.png" },
        ],
        ritual: "A Escapada: Aplique os cristais na água exalando neroli e gerânio em sinergia cítrica, trazendo a leveza viva de volta.",
        preparation: [
          "Pese milimetricamente as combinações do sal mineral para equilibrar absorção orgânica celular.",
          "Associe Neroli (claro/fresco) e Rosa Taif (doce/amadeirada densa) no prato misturador.",
          "Injetar sob a massa os 3 óleos, e com luvas, misturar até a coloração se uniformizar no tom de pó rosa seco e apagado suave.",
          "Traga uma flor de laranjeira pálida solitária inteira na apresentação visual deslumbrante.",
          "Esta receita não aceita erros no marketing: foque nas palavras Ouro, Spa, Taif e Resort."
        ],
        presentationBox: "Caixa em veludo carmesim ou dourado fosco. Os fios de açafrão devem vir em um pequeno porta-joias de vidro anexo à embalagem principal.",
        legacyPhrase: "O refinamento supremo acontece quando a raridade parece sempre fluida natural.",
        imageSensorial: "/ebook/master_cover.png", imageShadow: "/ebook/yuzu.png",
      },
      {
        id: "10", category: "B",
        title: "Rosa Indiana & Amêndoas Doces", origin: "Ayurveda Premium",
        signature: "Pausas curadas num escudo de seda tátil. Banho aveludado de amêndoas reais. Macio, acolhedor e comercialmente indispensável em qualquer spa de nicho.",
        experienceDesc: "A verdadeira sofisticação muitas vezes escolhe não quebrar regras, mas sim dominá-las graciosamente. O abraço acolhedor das Amêndoas somado ao ápice feminino da rosa pura não proporciona agitação; proporciona alinhamento absoluto do eixo de poder magnético do sistema nervoso. Enquanto as lâminas blindadoras do óleo de amêndoa tocam a pele, todo o ruído mental externo é anulado.",
        ingredients: ["170g Sal Rosa", "80g Marinho", "50g Epsom", "4 gotas Rosa", "3 gotas Sândalo", "1 colher Óleo de Amêndoa"],
        ingredientImages: [
          { name: "Sal Rosa", quantity: "170g", imagePath: "/ebook/ingredients/sal-rosa.png" },
          { name: "Sal Marinho", quantity: "80g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Sal Epsom", quantity: "50g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Rosa", quantity: "4 gotas", imagePath: "/ebook/ingredients/rosa.png" },
          { name: "Sândalo", quantity: "3 gotas", imagePath: "/ebook/ingredients/sandalo.png" },
          { name: "Óleo de Amêndoa", quantity: "1 colher", imagePath: "/ebook/ingredients/amendoa.png" },
        ],
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
    chapterTitle: "Rituais de Resina,\u00A0Presença e Mistério",
    chapterDesc: "Aqui o livro atinge a sua essência mais misteriosa e arcaica. Fórmulas com peso monástico e códigos espirituais do Lótus Azul e da Mirra Bruta.",
    chapterManifesto: "Existem segredos que os faraós levaram para os sarcófagos, e nós os desenterramos. O Lótus Azul e o Olíbano não são apenas cheiros; são frequências de poder milenar. Este capítulo é o 'Cofre Secreto' da coleção. Destinado aos momentos em que você precisa se reconectar com a sua linhagem de autoridade e silenciar o caos secular com a força das resinas ancestrais.",
    chapterSpecs: ["Foco: Introspecção e Poder", "Notas: Incensadas e Orientais", "Ação: Foco Meditativo"],
    imageAbertura: "/ebook/spa.png",
    formulas: [
      {
        id: "09", category: "B",
        title: "Jasmim Sambac\u00A0da Noite", origin: "Sudeste Asiático — Creme Branco",
        signature: "Branco, cremoso, aveludado, inesquecível. Como vestir uma túnica alva tecida no mais perfumado e caríssimo dos florais femininos indianos.",
        experienceDesc: "Branco, cremoso, aveludado, inesquecível. Como vestir uma túnica alva tecida no mais perfumado e caríssimo dos florais indianos. Ao deitar nessa água leitosa perfumada pelo caríssimo Jasmim Sambac e enraizada no sândalo, todo o frenesi do mundo colapsa. Você transcende. Você não é mais refém do estresse, nem operária de sua própria vida; o vapor sela as fendas da sua aura e instaura uma calmaria estética absurda, te levando a um estado místico indiano onde sua frequência ressoa diretamente com a nobreza pura e impenetrável.",
        ingredients: ["160g Sal Rosa", "90g Sal Marinho", "4 gotas Jasmine Sambac Absolute", "3 gotas Ylang", "2 gotas Sândalo"],
        ingredientImages: [
          { name: "Sal Rosa", quantity: "160g", imagePath: "/ebook/ingredients/sal-rosa.png" },
          { name: "Sal Marinho", quantity: "90g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Jasmim Sambac", quantity: "4 gotas", imagePath: "/ebook/ingredients/jasmim.png" },
          { name: "Ylang Ylang", quantity: "3 gotas", imagePath: "/ebook/ingredients/ylang.png" },
          { name: "Sândalo", quantity: "2 gotas", imagePath: "/ebook/ingredients/sandalo.png" },
          { name: "Flor de Lótus", quantity: "2 gotas", imagePath: "/ebook/ingredients/lotus-azul.png" },
        ],
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
        id: "11", category: "A",
        title: "Lótus Azul\u00A0do Nilo", origin: "Egito — Segredo Alquímico",
        signature: "O epicentro da coleção. Uma molécula floral milenar embalsamada, rara, repousando soberana em resinas milenares negras e rosa no cofre do Nilo mítico.",
        longSignature: "Nem toda composição precisa ser luminosa para ser memorável. O Lótus Azul é a joia mais rara do Nilo. Um ritual de atmosfera contemplativa, elegante e reservada, feito para pausas que pedem mais do que pressa: pedem presença eterna.",
        experienceDesc: "Você está lidando com segredos de Faraós. O absoluto de Lótus Azul é tão proibitivo financeiramente quanto espiritualmente denso. O banho deixa de ser um ato trivial de limpeza e torna-se um evento. Quando aquelas resinas ancestrais se expandirem, a neblina carrega códigos ocultos para o cérebro que esvaziam totalmente sua ansiedade efêmera frente à eternidade egípcia escura. Aqui, os fracos adormecem, mas os fortes ganham um reset imperceptível para a massa.",
        ingredients: ["140g Sal Rosa", "60g Dead Sea Salt", "3 gotas Blue Lotus Absolute", "3 gotas Frankincense", "1 gota Sândalo", "Pétalas Azuis"],
        ingredientImages: [
          { name: "Sal Rosa", quantity: "140g", imagePath: "/ebook/ingredients/sal-rosa.png" },
          { name: "Dead Sea Salt", quantity: "60g", imagePath: "/ebook/ingredients/dead-sea.png" },
          { name: "Blue Lotus Absolute", quantity: "3 gotas", imagePath: "/ebook/ingredients/lotus-azul.png" },
          { name: "Frankincense", quantity: "3 gotas", imagePath: "/ebook/ingredients/olibano.png" },
          { name: "Sândalo", quantity: "1 gota", imagePath: "/ebook/ingredients/sandalo.png" },
          { name: "Pétalas Azuis", quantity: "Decoração", imagePath: "/ebook/ingredients/petalas-azuis.png" },
        ],
        ritual: "Vácuo Faraônico: Cerimônia pura contemplativa focada, sem distrações baratas celulares artificiais mentais, um luxo imaterial impagável absoluto.",
        preparation: [
          "Invoque paciência: A diluição do absoluto caro exige carreador da mais fina casta de jojoba.",
          "Derrame a fase líquida olíbano lentamente como uma gota dourada ancestral.",
          "Embrulhe na matriz dura e bruta salgada.",
          "Assine a caixa protetora com rótulo sombreado misterioso, caixa dupla protetora e um preço inquestionavelmente muito elevado restrito."
        ],
        presentationBox: "Caixa em veludo carmesim ou dourado fosco. Os fios de açafrão devem vir em um pequeno porta-joias de vidro anexo à embalagem principal.",
        legacyPhrase: "Se a eternidade repousa em um lugar, ela cheira vagamente ao lótus sob o olíbano e sol distante.",
        imageSensorial: "/ebook/spa.png", imageShadow: "/sais/assets/zen-dark-hero.png",
      },
      {
        id: "12", category: "A",
        title: "Olíbano & Mirra\u00A0do Deserto", origin: "Chifre da África — Protocolo do Rei",
        signature: "Seco. Resinoso. Incrivelmente Cerimonial. Um abismo aromático adulto, escuro e amadeirado. Alta perfumaria de nicho exótica transmutada em sais esotéricos minéricos purificados esteticamente puros.",
        longSignature: "O Chifre da África entrega o sangue milenar do deserto. Olíbano e Mirra são o código da soberania milenar. Um banho de resinas secas que impõe respeito e restaura a autoridade moral do seu portador.",
        experienceDesc: "Resinas são o sangue milenar do deserto que chora e não morre. Elas sustentam o luxo intransigente que não pede licença para existir, apenas existe e impõe majestade. Essa infusão não quer sua alegria boba; ela quer o encerramento do seu tumulto e a instauração da sua verdadeira autoridade moral monástica sobre o seu próprio eu. Um portal maciço de controle, realeza, solidez. O peso de uma árvore do incenso ancorando seu império isolado nos mares salgados.",
        ingredients: ["170g Sal Marinho", "80g Dead Sea Salt", "50g Sal Negro (Lava)", "4 gotas Olíbano", "3 gotas Mirra", "Óleo de Argan Puro Ouro"],
        ingredientImages: [
          { name: "Sal Marinho", quantity: "170g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Dead Sea Salt", quantity: "80g", imagePath: "/ebook/ingredients/dead-sea.png" },
          { name: "Sal Negro Vulcânico", quantity: "50g", imagePath: "/ebook/ingredients/sal-negro.png" },
          { name: "Olíbano", quantity: "4 gotas", imagePath: "/ebook/ingredients/olibano.png" },
          { name: "Mirra", quantity: "3 gotas", imagePath: "/ebook/ingredients/mirra.png" },
          { name: "Óleo de Argan", quantity: "Premium", imagePath: "/ebook/ingredients/argan.png" },
        ],
        ritual: "Muralha Mental: A proteção final antes da retomada em grande escala nos impérios e tribos modernas.",
        preparation: [
          "O sal negro basáltico sujo é intencional aqui: ele fornece o impacto de marketing 'bruto e obscuro'.",
          "Adira finas lamelas picadas trituradas grosseiras da resina branca e âmbar física das árvores da vida seca africana no meio dos grânulos secos cinzentas e vermelhas.",
          "Emane nobreza na embalagem: O vidro será reto pesado escuro denso cilíndrico de base polida de peso duplo."
        ],
        presentationBox: "Vidro preto fosco (Matte Black), etiqueta em metal envelhecido ou couro gravado. Um item que parece um artefato histórico antes de ser um cosmético.",
        legacyPhrase: "Das árvores secas no limite térmico, surge o nosso único contato curativo maduro.",
        imageSensorial: "/ebook/f01-yuzu.png", imageShadow: "/sais/assets/zen-method-1.png",
      }
    ]
  },
  {
    chapterId: "V",
    chapterTitle: "Rituais Minerais\u00A0de Assinatura\u00A0Visual Absoluta",
    chapterDesc: "Produtos que se vendem sozinhos pela estética crua obsidiana negra cortada por luxuosos fios de chá e flores em suspensão geométrica contrastante polar.",
    chapterManifesto: "O choque visual é a primeira barreira de entrada para o premium. Se o seu produto é 'comum', ele é invisível. Aqui, desafiamos a estética tradicional com o Sal Negro Vulcânico e o minimalismo de Macau. Este capítulo é sobre branding pessoal e visual. É para quem quer que o seu ritual de banho seja tão impressionante visualmente quanto o resultado que ele entrega.",
    chapterSpecs: ["Foco: Impacto e Diferenciação", "Notas: Contrastantes e Cruas", "Ação: Detox Estético"],
    imageAbertura: "/ebook/botanical.png",
    formulas: [
      {
        id: "13", category: "B",
        title: "Obsidiana\u00A0Floral e\u00A0Sal\u00A0Negro Havaiano", origin: "Havaí — Detox Visual Instagramável",
        signature: "Um abismo vulcânico cinético na água. Detritos escuros balsâmicos esteticamente potentes e calêndulas laranjas queimantes cruzando o escuro detox.",
        experienceDesc: "Você já ouviu a expressão 'olhar o abismo letal até ele piscar'? A água enegrecer não é algo usual, é um hack de quebra de padrão visual brutal. Ao entrar nesta caldeira mentolada purificadora vulcânica, a sujeira crônica eletromagnética do mundo inteiro despenca da pele. Seu cérebro codifica o contraste absurdo das folhas claras no mar revolto vulcânico de sal de lava negro curativo e reseta seus hormônios.",
        ingredients: ["180g Sal Marinho", "80g Epsom", "40g Black Lava Salt Carbonado", "4 gotas Tea Tree", "3 gotas Eucalipto Puro Verde Metálico"],
        ingredientImages: [
          { name: "Sal Marinho", quantity: "180g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Sal Epsom", quantity: "80g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Black Lava Salt", quantity: "40g", imagePath: "/ebook/ingredients/sal-negro.png" },
          { name: "Tea Tree", quantity: "4 gotas", imagePath: "/ebook/ingredients/tea-tree.png" },
          { name: "Eucalipto", quantity: "3 gotas", imagePath: "/ebook/ingredients/eucalipto.png" },
        ],
        ritual: "A Limpeza Cinética: Sais caem, a água enegrece, e então ressurge revigorada com frescor da montanha limpa.",
        preparation: [
          "Use a granulometria do sal negro para criar o efeito de 'pedras vulcânicas' que tingem a água de forma dramática.",
          "As flores de calêndula devem ser adicionadas secas para contraste visual máximo de cor laranja sobre preto.",
          "Mantenha os óleos de eucalipto em alta voltagem: eles devem 'arder' de frescor contra o visual escuro.",
          "Embalagem: Vidro cilíndrico reto, rótulo em papel preto com impressão em hot stamping branco."
        ],
        legacyPhrase: "O verdadeiro detox começa quando você abraça o escuro para reencontrar a claridade.",
        imageSensorial: "/ebook/f01-yuzu.png", imageShadow: "/sais/assets/zen-pain-3.png",
      },
      {
        id: "14", category: "B",
        title: "Té Imperial\u00A0& Flor de Cerejeira", origin: "Macau — Minimalist Zen",
        signature: "Pura, translúcida, etérea. O silêncio de um templo zen em uma névoa floral-chá branca.",
        experienceDesc: "O luxo não precisa gritar. Este blend é o silêncio. O Chá Branco Imperial fornece a oxidação mínima, a pureza máxima. A Flor de Cerejeira traz a efemeridade, o lembrete estético de que cada ritual é único. Ao mergulhar, a sensação é de ser envolvido por uma seda líquida. É a fórmula do repouso intelectual, para quando o mundo está barulhento demais e você só precisa de um ponto branco de paz absoluta.",
        ingredients: ["200g Sal Epsom", "50g Sal Rosa", "4 gotas Chá Branco", "3 gotas Flor de Cerejeira", "Folhas de Chá Inteiras"],
        ingredientImages: [
          { name: "Sal Epsom", quantity: "200g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sal Rosa", quantity: "50g", imagePath: "/ebook/ingredients/sal-rosa.png" },
          { name: "Chá Branco", quantity: "4 gotas", imagePath: "/ebook/ingredients/tea-tree.png" },
          { name: "Cerejeira", quantity: "3 gotas", imagePath: "/ebook/ingredients/rosa.png" },
          { name: "Folhas de Chá", quantity: "Decoração", imagePath: "/ebook/ingredients/matcha.png" },
        ],
        ritual: "O Alinhamento Zen: Silêncio absoluto. Deixe que a delicadeza floral restaure sua fé na sutileza do mundo.",
        preparation: [
          "Use Epsom como base dominante para garantir transparência na água.",
          "Insira as folhas de chá inteiras como elementos flutuantes de design minime.",
          "O aroma deve ser sutil, quase um sussurro, para não invadir o campo mental.",
          "Design do Envasado: Frasco quadrado minimalista, etiqueta pequena no rodapé, selo em lacre branco."
        ],
        legacyPhrase: "No silêncio absoluto, todas as respostas já foram dadas.",
        imageSensorial: "/ebook/master_cover.png", imageShadow: "/sais/assets/zen-dark-hero.png",
      },
      {
        id: "15", category: "A",
        title: "Âmbar Cinza\u00A0& Sais Marinhos Brutos", origin: "Mar do Norte — Oceanic Luxury",
        signature: "Frio, salino, animalesco-sofisticado. O cheiro da maresia profunda fundida com a resina mais cara dos oceanos.",
        experienceDesc: "Este é o banho do explorador aristocrata. O Âmbar Cinza é a nota animal mais refinada da perfumaria, evocando o mistério dos oceanos profundos. O Sal Marinho Bruto traz a integridade da terra e do mar. É um banho de força, de amplidão, de horizontes infinitos. Para quem não teme a frieza do sucesso e precisa de uma energia que limpe e tonifique a alma com o vigor das águas revoltas do Mar do Norte.",
        ingredients: ["250g Sal Marinho Bruto", "4 gotas Ambergris Accord", "3 gotas Algas Marinhas", "2 gotas Pinheiro"],
        ingredientImages: [
          { name: "Sal Marinho", quantity: "250g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Ambergris", quantity: "4 gotas", imagePath: "/ebook/ingredients/amber.png" },
          { name: "Algas", quantity: "3 gotas", imagePath: "/ebook/ingredients/tea-tree.png" },
          { name: "Pinheiro", quantity: "2 gotas", imagePath: "/ebook/ingredients/cedro.png" },
        ],
        ritual: "A Ressaca Nobre: Água em temperatura ambiente para fria. Deixe que o vigor salino reconstrua sua resiliência muscular e mental.",
        preparation: [
          "Mantenha os cristais de sal em seu estado mais bruto e irregular possível.",
          "A fragrância deve ser marinha-ozônica, com o fundo animalesco quente do ambergris.",
          "Adicione pequenos pedaços de algas desidratadas para o visual 'fresh catch'.",
          "Marketing: 'The Oceanic Conqueror' — a força indomável do mar em um cofre de vidro."
        ],
        legacyPhrase: "O mar não pede licença; ele apenas flui e domina.",
        imageSensorial: "/ebook/f01-yuzu.png", imageShadow: "/sais/assets/zen-pain-2.png",
      },
      {
        id: "16", category: "A",
        title: "Palo Santo &\u00A0Âmbar Ancestral", origin: "SommersStore — Luxury Signature",
        signature: "O fechamento supremo. Uma sinergia oculta de todas as bases minerais com o toque final de Palo Santo e Âmbar real.",
        experienceDesc: "Esta não é apenas uma fórmula; é o selo de encerramento do seu percurso pelo Cofre. O Protocolo Black Master Edition combina a força das resinas ancestrais com a leveza dos citrinos de topo em uma proporção guardada a sete chaves. É o banho da maestria, designado para quando você atinge o ápice do seu poder pessoal e precisa de uma assinatura única que o separe do comum. O ápice do luxo, o fim do mistério.",
        ingredients: ["300g Sais Diversos", "5 gotas Palo Santo", "5 gotas Frankincense", "3 gotas Rosa Taif", "Ouro 24k comestível"],
        ingredientImages: [
          { name: "Sais Diversos", quantity: "300g", imagePath: "/ebook/ingredients/dead-sea.png" },
          { name: "Palo Santo", quantity: "5 gotas", imagePath: "/ebook/ingredients/palo-santo.png" },
          { name: "Olíbano", quantity: "5 gotas", imagePath: "/ebook/ingredients/olibano.png" },
          { name: "Rosa Taif", quantity: "3 gotas", imagePath: "/ebook/ingredients/rosa.png" },
          { name: "Ouro 24k", quantity: "Folhas", imagePath: "/ebook/ingredients/acafrao.png" },
        ],
        ritual: "A Maestria Final: Silêncio, sombra e a luz dourada do sucesso. Ocupação total do espaço com a fragrância ruiu-se a opulência.",
        preparation: [
          "Misture todas as vertentes salinas em um cristal gigante unificado.",
          "Asperja as camadas de óleos em tempos diferentes, criando texturas de odor.",
          "Finalize com o ouro flutuante.",
          "Edição Limitada: Apenas para portadores do Master Edition."
        ],
        legacyPhrase: "Onde o mistério acaba, a lenda começa.",
        imageShadow: "/sais/assets/zen-dark-hero.png", imageSensorial: "/ebook/master_cover.png"
      }
    ]
  }
];

export default protocolChapters;
