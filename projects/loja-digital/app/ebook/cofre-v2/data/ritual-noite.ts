import { Chapter } from "../types/chapters";

const ritualNoiteChapters: Chapter[] = [
  {
    chapterId: "N-I",
    chapterTitle: "O Ritual da Meia-Noite",
    chapterDesc: "Fórmulas para o encerramento de ciclos, o descanso regenerativo e o aterramento profundo da mente executiva.",
    chapterManifesto: "A noite é o tempo da alma. É quando o ruído do mundo silencia e você pode, finalmente, voltar para casa. Estas sinergias são portais para o repouso absoluto.",
    chapterSpecs: ["Foco: Regeneração", "Notas: Resinas e Flores Noturnas", "Ação: Aterramento"],
    imageAbertura: "/ebook/capa_mistica_rubi.png",
    formulas: [
      {
        id: "N01", category: "A",
        title: "Sopro de Morfeu", origin: "Night Protocol",
        signature: "Lavanda Búlgara, Olíbano e Sândalo.",
        experienceDesc: "Um banho que desacelera o sistema nervoso central instantaneamente. O Olíbano traz a proteção espiritual necessária para o sono, enquanto a Lavanda dissolve a ansiedade acumulada.",
        ingredients: ["400g Sal Epsom", "100g Sal Negro", "8 gotas OE Lavanda", "4 gotas OE Olíbano", "2 gotas OE Sândalo"],
        ingredientImages: [
          { name: "Sal Epsom", quantity: "400g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sal Negro", quantity: "100g", imagePath: "/ebook/ingredients/sal-negro.png" },
          { name: "Lavanda", quantity: "8 gts", imagePath: "/ebook/ingredients/lavanda.png" },
          { name: "Olíbano", quantity: "4 gts", imagePath: "/ebook/ingredients/olibano.png" },
          { name: "Sândalo", quantity: "2 gts", imagePath: "/ebook/ingredients/olibano.png" },
        ],
        ritual: "Prepare o ambiente com luz de velas. Desligue as telas 30 minutos antes. Mergulhe e visualize uma neblina azul envolvendo seu corpo.",
        preparation: [
          "Use a maior proporção de Epsom para efeito muscular profundo",
          "O sal negro amplifica o visual e a intenção purificadora",
          "Temperatura: quente mas não escaldante — 38-40°C ideal",
          "Duração: 30 minutos mínimo"
        ],
        legacyPhrase: "O descanso é o combustível da próxima grande ideia.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-pain-2.png"
      },
      {
        id: "N02", category: "A",
        title: "Portal de Ébano", origin: "African Night Ritual",
        signature: "Mirra Etíope, Benjoim e Patchouli Indonésio.",
        experienceDesc: "A África tem a tradição mais antiga de rituais noturnos. A Mirra protegia os guerreiros antes do descanso. O Benjoim selava os sonhos. O Patchouli ancorava o espírito ao corpo durante a noite.",
        ingredients: ["350g Sal Mar Morto", "150g Sal Negro", "5 gotas OE Mirra", "4 gotas OE Benjoim", "3 gotas OE Patchouli"],
        ingredientImages: [
          { name: "Sal Mar Morto", quantity: "350g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Sal Negro", quantity: "150g", imagePath: "/ebook/ingredients/sal-negro.png" },
          { name: "Mirra", quantity: "5 gts", imagePath: "/ebook/ingredients/olibano.png" },
          { name: "Benjoim", quantity: "4 gts", imagePath: "/ebook/ingredients/olibano.png" },
          { name: "Patchouli", quantity: "3 gts", imagePath: "/ebook/ingredients/patchouli.png" },
        ],
        ritual: "Use quando o dia foi particularmente intenso ou desafiador. Este blend purifica energias pesadas antes de dormir.",
        preparation: [
          "A combinação de Mar Morto e Sal Negro cria um banho mineral profundo",
          "As resinas são melhores em água mais quente — liberam mais moléculas ativas",
          "Ambiente escuro ou com luz âmbar apenas",
          "Silence digital completo antes de entrar no banheiro"
        ],
        legacyPhrase: "A escuridão não é ausência de luz. É a presença de profundidade.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      },
      {
        id: "N03", category: "B",
        title: "Véu de Isis", origin: "Egyptian Night Formula",
        signature: "Lotus Azul, Kyphi e Óleo de Semente de Loto.",
        experienceDesc: "Isis era a deusa egípcia do sono e da magia. Seus sacerdotes se banhavam nesta mistura antes dos rituais noturnos sagrados. Um portal para sonhos vívidos e sono profundo.",
        ingredients: ["400g Sal Epsom", "100g Sal Mar Morto", "4 gotas Extrato Lotus Azul", "3 gotas Kyphi", "2 gotas Óleo Loto"],
        ingredientImages: [
          { name: "Sal Epsom", quantity: "400g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sal Mar Morto", quantity: "100g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Lotus Azul", quantity: "4 gts", imagePath: "/ebook/ingredients/lavanda.png" },
          { name: "Kyphi", quantity: "3 gts", imagePath: "/ebook/ingredients/olibano.png" },
          { name: "Óleo Loto", quantity: "2 gts", imagePath: "/ebook/botanical.png" },
        ],
        ritual: "Antes de entrar na água, defina com intenção o que você quer processar durante o sono. A mente continua trabalhando.",
        preparation: [
          "Lotus azul é um suave psicoativo natural — use com consciência",
          "Kyphi é raro; pode substituir por combinação 2:1 olíbano:mirra",
          "Temperatura: morna, não quente — para induzir o sono mais facilmente",
          "Imediatamente após o banho: cama, sem telas"
        ],
        legacyPhrase: "Ísis não dormia. Ela governava no plano dos sonhos.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-pain-3.png"
      },
      {
        id: "N04", category: "A",
        title: "Sombra de Cedro", origin: "Lebanese Mountain Ritual",
        signature: "Cedro do Líbano, Vetiver Haitiano e Carvalho Sagrado.",
        experienceDesc: "Os Cedros do Líbano eram sagrados nas antigas escrituras. Sua madeira construiu os templos de Salomão. Este blend usa essa energia de solidez e eternidade para criar um sono que restaura profundamente.",
        ingredients: ["300g Sal Mar Morto", "200g Sal Epsom", "6 gotas OE Cedro", "5 gotas OE Vetiver", "2 gotas Extrato Carvalho"],
        ingredientImages: [
          { name: "Sal Mar Morto", quantity: "300g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Sal Epsom", quantity: "200g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Cedro", quantity: "6 gts", imagePath: "/ebook/ingredients/cedro.png" },
          { name: "Vetiver", quantity: "5 gts", imagePath: "/ebook/ingredients/patchouli.png" },
          { name: "Carvalho", quantity: "2 gts", imagePath: "/ebook/botanical.png" },
        ],
        ritual: "Para mentes que não conseguem desligar. O vetiver age como âncora — puxa você de volta para o corpo e para o presente.",
        preparation: [
          "O vetiver é denso: dilua em carrier antes de adicionar aos sais",
          "Cedro e vetiver juntos criam a sensação de floresta noturna",
          "Banho de 25-30 minutos com respiração abdominal profunda",
          "Prepare o quarto antes do banho: temperatura amena, escuridão total"
        ],
        legacyPhrase: "O cedro resiste a tempestades de séculos. Aprenda com ele.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-pain-2.png"
      },
      {
        id: "N05", category: "B",
        title: "Lune Noire", origin: "French Nuit Ritual",
        signature: "Íris de Florença, Violeta e Musgo Branco.",
        experienceDesc: "Paris tem uma relação especial com a noite — a Cidade Luz sabe que a luz tem mais poder quando emerge da escuridão. Este blend é a elegância noturna em estado puro.",
        ingredients: ["300g Sal Epsom", "200g Sal Marinho", "4 gotas Absoluto de Íris", "3 gotas Extrato Violeta", "2 gotas Musgo Branco"],
        ingredientImages: [
          { name: "Sal Epsom", quantity: "300g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sal Marinho", quantity: "200g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Íris", quantity: "4 gts", imagePath: "/ebook/ingredients/lavanda.png" },
          { name: "Violeta", quantity: "3 gts", imagePath: "/ebook/ingredients/lavanda.png" },
          { name: "Musgo", quantity: "2 gts", imagePath: "/ebook/botanical.png" },
        ],
        ritual: "Vinho tinto (um cálice), banho com este blend, seguido de leitura de 20 minutos. A tríade europeia do repouso aristocrático.",
        preparation: [
          "Absoluto de íris é extremamente raro e caro — pouco basta",
          "A violeta tem efeito anestésico leve no olfato — o aroma parece 'desaparecer' após alguns minutos. Normal.",
          "Temperatura: morna-quente para abertura dos poros",
          "Final: não seque o corpo com vigor — deixe a pele absorver os óleos"
        ],
        legacyPhrase: "Paris não dorme. Ela sonha acordada.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      }
    ]
  },
  {
    chapterId: "N-II",
    chapterTitle: "Rituais de Transição e Renovação",
    chapterDesc: "Fórmulas para momentos de passagem: fim de semana, lua nova, aniversários, encerramentos. O banho como marcador de ciclos.",
    chapterManifesto: "O ser humano precisa de rituais de transição para que a mente reconheça que um ciclo fechou e outro abriu. Sem esse sinal, os ciclos se confundem. Estas sinergias são os marcadores que a vida moderna esqueceu de ensinar.",
    chapterSpecs: ["Foco: Transição de Ciclos", "Notas: Profundas e Complexas", "Ação: Processamento e Renovação"],
    imageAbertura: "/ebook/capa_mistica_rubi.png",
    formulas: [
      {
        id: "N06", category: "A",
        title: "Encerramento de Ciclo", origin: "Winter Solstice Ritual",
        signature: "Resina Benjoim, Cravo e Laranja Amarga.",
        experienceDesc: "O Solstício de Inverno é o maior ritual de encerramento da natureza. A luz mais curta do ano é seguida imediatamente pelo crescimento da luz. Este blend captura essa dualidade: honrar o que foi, receber o que virá.",
        ingredients: ["300g Sal Mar Morto", "200g Sal Negro", "5 gotas OE Cravo", "4 gotas OE Laranja Amarga", "3 gotas Benjoim"],
        ingredientImages: [
          { name: "Sal Mar Morto", quantity: "300g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Sal Negro", quantity: "200g", imagePath: "/ebook/ingredients/sal-negro.png" },
          { name: "Cravo", quantity: "5 gts", imagePath: "/ebook/ingredients/patchouli.png" },
          { name: "Laranja Amarga", quantity: "4 gts", imagePath: "/ebook/ingredients/limao.png" },
          { name: "Benjoim", quantity: "3 gts", imagePath: "/ebook/ingredients/olibano.png" },
        ],
        ritual: "Use na última noite de cada mês, quarter ou ano. Escreva o que você está encerrando antes do banho. Queime o papel após.",
        preparation: [
          "Cravo é quente e potente — não exceda 5 gotas por 500g de sal",
          "A combinação Mar Morto + Negro é visual e ritualmente poderosa",
          "Temperatura: bem quente para sentir o peso do ciclo ser dissolvido",
          "Após o banho: escreva 3 intenções para o próximo ciclo"
        ],
        legacyPhrase: "Quem não fecha os ciclos carrega todos eles. Escolha o que merece continuar.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-pain-3.png"
      },
      {
        id: "N07", category: "B",
        title: "Renascimento de Lua Nova", origin: "New Moon Protocol",
        signature: "Jasmim Absoluto, Rosa Branca e Água de Flor de Laranjeira.",
        experienceDesc: "A lua nova é o ciclo de plantar intenções. Não há luz visível — apenas potencial puro. Este blend é para esse momento específico: quando tudo ainda é possível e nada foi perdido.",
        ingredients: ["400g Sal Epsom", "100g Sal Marinho", "4 gotas Jasmim Absoluto", "3 gotas OE Rosa Branca", "30ml Água de Flor de Laranjeira"],
        ingredientImages: [
          { name: "Sal Epsom", quantity: "400g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sal Marinho", quantity: "100g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Jasmim", quantity: "4 gts", imagePath: "/ebook/ingredients/lavanda.png" },
          { name: "Rosa Branca", quantity: "3 gts", imagePath: "/ebook/ingredients/lavanda.png" },
          { name: "Água Flor Laranjeira", quantity: "30ml", imagePath: "/ebook/botanical.png" },
        ],
        ritual: "Use apenas na noite de lua nova. Escreva suas 3 intenções maiores do ciclo antes de entrar na água. Mantenha o papel no banheiro durante o banho.",
        preparation: [
          "A Água de Flor de Laranjeira vai direto na banheira, não nos sais",
          "Jasmim absoluto: 1-2 gotas bastam por sua concentração",
          "Luz de vela branca apenas — branca para intenção limpa",
          "Banho de 25 minutos com atenção plena nas intenções"
        ],
        legacyPhrase: "A semente não precisa de força para germinar. Precisa de solo certo.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-pain-2.png"
      },
      {
        id: "N08", category: "A",
        title: "Consagração da Lua Cheia", origin: "Full Moon Amplification",
        signature: "Rosa Absoluta, Olíbano e Âmbar Branco.",
        experienceDesc: "A lua cheia amplifica tudo: alegrias, angústias, intuições. Este blend foi desenhado para criar um estado de gratidão ativa — celebrar o que foi construído no ciclo e colher a energia do plenilúnio.",
        ingredients: ["300g Sal Epsom", "200g Sal Rosa", "5 gotas Rosa Absoluta", "4 gotas OE Olíbano", "2 gotas Âmbar"],
        ingredientImages: [
          { name: "Sal Epsom", quantity: "300g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sal Rosa", quantity: "200g", imagePath: "/ebook/ingredients/sal-rosa.png" },
          { name: "Rosa Absoluta", quantity: "5 gts", imagePath: "/ebook/ingredients/lavanda.png" },
          { name: "Olíbano", quantity: "4 gts", imagePath: "/ebook/ingredients/olibano.png" },
          { name: "Âmbar", quantity: "2 gts", imagePath: "/ebook/ingredients/cedro.png" },
        ],
        ritual: "Use na noite de lua cheia. Se possível, com a janela aberta para ver ou sentir a lua. Liste 5 gratidões do ciclo antes de entrar.",
        preparation: [
          "Sal rosa para alinhamento com energia da lua cheia (simbólico e sensorial)",
          "Rosa absoluta: a mais cara das combinações — sinal de celebração real",
          "Vela dourada ou cor-de-rosa",
          "Após o banho: não trabalhe, não planeje. Apenas descanse."
        ],
        legacyPhrase: "A gratidão não é postura. É o idioma do poder que sabe o que tem.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      },
      {
        id: "N09", category: "B",
        title: "Limiar do Amanhã", origin: "Dawn Preparation Ritual",
        signature: "Neroli, Ylang-Ylang e Pimenta Branca.",
        experienceDesc: "Às vezes o ritual noturno não é sobre encerrar — é sobre preparar. Este blend cria um estado de antecipação serena: o corpo repousa, mas o espírito já está acordado para o que virá.",
        ingredients: ["350g Sal Epsom", "150g Sal Marinho", "5 gotas OE Neroli", "3 gotas OE Ylang-Ylang", "2 gotas OE Pimenta Branca"],
        ingredientImages: [
          { name: "Sal Epsom", quantity: "350g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sal Marinho", quantity: "150g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Neroli", quantity: "5 gts", imagePath: "/ebook/ingredients/lavanda.png" },
          { name: "Ylang-Ylang", quantity: "3 gts", imagePath: "/ebook/ingredients/lavanda.png" },
          { name: "Pimenta Branca", quantity: "2 gts", imagePath: "/ebook/botanical.png" },
        ],
        ritual: "Use na noite antes de um grande evento, lançamento ou decisão. O banho como preparação silenciosa.",
        preparation: [
          "A pimenta branca é diferente da negra: mais sutil e suave",
          "Não combine com trabalho mental após o banho",
          "Temperatura morna — não quente — para manter o estado de antecipação",
          "Durma logo após"
        ],
        legacyPhrase: "O guerreiro que dorme bem vence antes de despertar.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-pain-3.png"
      },
      {
        id: "N10", category: "A",
        title: "O Grande Silêncio", origin: "Monastic Night Protocol",
        signature: "Incenso Sagrado, Cipreste e Abeto Nórdico.",
        experienceDesc: "Os monges medievais praticavam o Grande Silêncio: da Completória até o Matinas, nenhuma palavra. Este blend é para quem precisa de um descanso tão profundo que transcende o corporal.",
        ingredients: ["250g Sal Mar Morto", "250g Sal Epsom", "5 gotas OE Incenso", "4 gotas OE Cipreste", "3 gotas OE Abeto"],
        ingredientImages: [
          { name: "Sal Mar Morto", quantity: "250g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Sal Epsom", quantity: "250g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Incenso", quantity: "5 gts", imagePath: "/ebook/ingredients/olibano.png" },
          { name: "Cipreste", quantity: "4 gts", imagePath: "/ebook/ingredients/cedro.png" },
          { name: "Abeto", quantity: "3 gts", imagePath: "/ebook/ingredients/cedro.png" },
        ],
        ritual: "Nenhuma música. Nenhuma tela. Nenhuma conversa. 40 minutos de silêncio total no banheiro e após. Quem precisa de ruído para descansar, ainda não descansou de verdade.",
        preparation: [
          "O cipreste é a árvore da transição entre mundos nas tradições mediterrâneas",
          "Abeto traz frescor de floresta ao ambiente fechado",
          "Proporção igual de Mar Morto e Epsom: máximo benefício mineral",
          "Temperatura: muito quente — para dissolução completa das tensões"
        ],
        legacyPhrase: "O silêncio não é vazio. É onde tudo essencial existe.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      }
    ]
  }
];

export default ritualNoiteChapters;
