import { Chapter } from "../types/chapters";

const fornecedoresChapters: Chapter[] = [
  {
    chapterId: "F-I",
    chapterTitle: "Insumos de Pureza Absoluta",
    chapterDesc: "A lista curada dos melhores fornecedores de sais, minerais e bases para sua produção de elite.",
    chapterManifesto: "Sua arte é tão boa quanto seus materiais. Não aceite nada menos que a pureza absoluta. Esta é a minha rede privada de confiança — construída ao longo de anos e validada por resultados reais.",
    chapterSpecs: ["Qualidade: Grau Farmacêutico", "Padrão: Elite", "Origem: Brasil e Exterior"],
    imageAbertura: "/ebook/capa_mistica_dourada.png",
    formulas: [
      {
        id: "F01", category: "A",
        title: "Sais e Minerais Premium", origin: "Curadoria Master",
        signature: "Sal Epsom, Mar Morto, Himalaia e Negro com laudo de pureza.",
        experienceDesc: "A base de todo banho de luxo. Indicamos fornecedores que garantem a ausência de metais pesados e pureza total. Sempre exija o laudo técnico do lote.",
        ingredients: ["Distribuidora Alquimia Viva (SP)", "Insumos do Porto (RJ)", "Naturalis Minerals (MG)", "Mar Profundo Importações"],
        ingredientImages: [],
        ritual: "Sempre peça o laudo técnico do lote para garantir o padrão Sommers Store. Fornecedores sérios entregam sem hesitar.",
        preparation: [
          "Contatar o fornecedor pelo canal oficial",
          "Solicitar amostra de 500g antes do pedido maior",
          "Verificar laudo microbiológico e ausência de metais pesados",
          "Negociar frete para pedidos acima de 50kg"
        ],
        legacyPhrase: "A qualidade é o silêncio do luxo.",
        imageSensorial: "/ebook/master_cover.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      },
      {
        id: "F02", category: "A",
        title: "Sal Epsom Grau Farmacêutico", origin: "Nacional e Importado",
        signature: "Sulfato de magnésio de alta pureza, grau USP, sem aditivos.",
        experienceDesc: "O Sal Epsom é o ingrediente mais usado nas formulações Sommers Store. A qualidade farmacêutica garante absorção de magnésio real — não apenas visual. Evite versões industriais.",
        ingredients: ["Pharma Nostra (SP) — grau USP", "Import Chem Brasil (PR)", "Natrium (MG)", "FarmaVerde (RS)"],
        ingredientImages: [],
        ritual: "Encomende em sacos de 25kg para melhor custo-benefício. Armazene em local seco e ventilado.",
        preparation: [
          "Especifique 'grau farmacêutico USP' no pedido",
          "Peça certificado de análise (COA) com número de lote",
          "Validade mínima de 2 anos — exija isso",
          "Embalagem: saco kraft com válvula ou balde hermético"
        ],
        legacyPhrase: "O magnésio não mente. O corpo sente a diferença.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-pain-3.png"
      },
      {
        id: "F03", category: "B",
        title: "Sal do Mar Morto Original", origin: "Israel — Dead Sea Works",
        signature: "Cloreto de magnésio e mineral complex autêntico do Mar Morto.",
        experienceDesc: "O verdadeiro Sal do Mar Morto tem composição mineral única: 21 minerais que não existem em nenhum outro lugar. Desconfie de produtos genéricos com esse nome.",
        ingredients: ["Ahava Brasil (importador oficial)", "Lev Haolam Imports", "Dermosil Cosméticos (distribuidor)"],
        ingredientImages: [],
        ritual: "Verifique se o produto tem o certificado de origem israelense. O QR code no rótulo deve rastrear até a fábrica.",
        preparation: [
          "Solicite o certificado de autenticidade Dead Sea Works",
          "Compare a composição mineral na embalagem — deve listar 10+ minerais",
          "Preço médio: R$ 80-120/kg no Brasil",
          "Importação direta: custo menor, burocracia maior"
        ],
        legacyPhrase: "O Mar Morto tem 3 milhões de anos. Não precisa de marketing.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      },
      {
        id: "F04", category: "A",
        title: "Sal Rosa do Himalaia", origin: "Paquistão — Khewra Mine",
        signature: "Halita rosa natural, extraída à mão, sem refino químico.",
        experienceDesc: "A mina de Khewra produz o sal mais fotografado do mundo. Mas poucos sabem a diferença entre o sal premium de extração manual e o industrial moído. Esta lista te ensina a distinguir.",
        ingredients: ["Himalayan Gold Brasil (SP)", "Eco Salt Imports (RJ)", "Spice House Premium (MG)", "NaturalMine Direto"],
        ingredientImages: [],
        ritual: "Grãos grossos (5-10mm) para esfoliação; grãos finos para dissolução em banho. Tenha os dois.",
        preparation: [
          "Prefira grãos grandes e irregulares — sinal de extração manual",
          "A cor deve ser rosa-salmão, não cor-de-rosa uniforme",
          "Retire uma amostra da água: deve ser levemente rosada, não turva",
          "Descarte lotes com odor químico — indica tratamento industrial"
        ],
        legacyPhrase: "O Himalaia levou 250 milhões de anos para criar. Reconheça isso.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-pain-2.png"
      },
      {
        id: "F05", category: "B",
        title: "Sal Negro Havaiano e Ativado", origin: "Havaí e Carvão Ativado",
        signature: "Flor de sal com carvão ativado de coco — desintoxicação e visual premium.",
        experienceDesc: "O sal negro cria o visual mais impactante nas composições Sommers Store. Existem dois tipos: o Havaiano (com lava negra) e o produzido com carvão ativado. Cada um tem uso específico.",
        ingredients: ["Black Lava Salt Imports (importado HI)", "Chams Ativos (carvão ativado nacional)", "Danival Cosméticos (SP)", "KokoBlack Brasil"],
        ingredientImages: [],
        ritual: "Sal negro havaiano: para rituais de luxo visual e fotografia de produto. Carvão ativado: para efeito detox e uso cotidiano.",
        preparation: [
          "Havaiano: verifique partículas de lava basáltica real (não é carvão)",
          "Carvão Ativado: certifique-se que é de coco, não de madeira",
          "Ambos: não use em pele com ferimentos abertos",
          "Embalagem premium: use sempre em recipientes opacos"
        ],
        legacyPhrase: "O preto absorve tudo — inclusive as toxinas do dia.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-pain-3.png"
      }
    ]
  },
  {
    chapterId: "F-II",
    chapterTitle: "Óleos Essenciais Certificados",
    chapterDesc: "A curadoria dos melhores fornecedores de óleos essenciais 100% puros, com laudos GCMS e certificação orgânica.",
    chapterManifesto: "O óleo essencial é a alma da fórmula. Um OE adulterado não apenas não funciona — ele engana. Minha rede de fornecedores passou por testes rigorosos. Use apenas quem está aqui.",
    chapterSpecs: ["Padrão: 100% Puro", "Certificação: GCMS Obrigatória", "Origem: Rastreável"],
    imageAbertura: "/ebook/capa_mistica_esmeralda.png",
    formulas: [
      {
        id: "F06", category: "A",
        title: "Óleos Cítricos de Alta Performance", origin: "Itália, Brasil e Japão",
        signature: "Bergamota, Limão Siciliano, Toranja, Yuzu e Laranja Doce com extração a frio.",
        experienceDesc: "Os cítricos extraídos a frio (cold press) preservam os terpenos ativos responsáveis pelo efeito aromático real. Nunca compre cítrico destilado a vapor — perde 70% das propriedades.",
        ingredients: [
          "Essencia Brasil (SP) — bergamota italiana certificada",
          "Yamato Aromatics (importador japonês — yuzu)",
          "Citrus Premium Importações (SC)",
          "Ortosyntes Brasil (grau farmacêutico)"
        ],
        ingredientImages: [],
        ritual: "Cítricos fotossensibilizantes: não use em pele exposta ao sol. Sempre em banho coberto ou noturno.",
        preparation: [
          "Exija relatório GCMS (cromatografia gasosa) de cada lote",
          "Verifique o índice de refração e densidade no laudo",
          "Cítricos: validade de 12-18 meses; guarde em vidro âmbar na geladeira",
          "Descarte qualquer lote com preço abaixo de 80% do mercado — é adulterado"
        ],
        legacyPhrase: "O sol não é um item de prateleira. Quando você o encontra, cuide.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      },
      {
        id: "F07", category: "A",
        title: "Florais Raros e Premium", origin: "Bulgária, Egito e Grasse",
        signature: "Rosa Búlgara (absoluto), Neroli, Jasmim Grandiflorum e Ylang-Ylang Extra.",
        experienceDesc: "Os florais absolutos são os mais caros da perfumaria. A Rosa Búlgara genuína custa mais que ouro por kilo. Qualquer produto a R$20 é fraude. Conheça o preço real e os fornecedores honestos.",
        ingredients: [
          "Quinta Essência (RJ) — importador autorizado de Grasse",
          "Attar Brasil (absolutos orientais)",
          "Rose Valley Imports (búlgara certificada)",
          "Fleur de Parfum (SP — Ylang Extra)"
        ],
        ingredientImages: [],
        ritual: "Florais absolutos são concentrados: 1-2 gotas por 500g de sal é suficiente. Menos é sempre mais.",
        preparation: [
          "Rosa búlgara: preço de referência R$800-1200/10ml (absoluto)",
          "Neroli: R$300-500/10ml para genuíno",
          "Sempre peça o COA com número de lote e origem específica",
          "Absolutos não são óleos essenciais: são extratos em solvente. Saiba usar."
        ],
        legacyPhrase: "A rosa búlgara leva 3 toneladas de pétalas para 1kg de absoluto. Respeite isso.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-pain-2.png"
      },
      {
        id: "F08", category: "B",
        title: "Resinas e Madeiras Sagradas", origin: "Somália, Haiti, Sri Lanka",
        signature: "Olíbano, Mirra, Vetiver, Sândalo e Cedro do Atlas com rastreabilidade.",
        experienceDesc: "As madeiras e resinas carregam a maior complexidade aromática e o maior risco de adulteração. O Sândalo Mysore legítimo custa mais que ouro. Aprenda a identificar os genuínos.",
        ingredients: [
          "Aromatic International (vetiver haitiano certificado)",
          "African Resins Imports (olíbano e mirra)",
          "Sandal Spirit Brasil (sândalo rastreado)",
          "Atlas Source (cedro marroquino direto)"
        ],
        ingredientImages: [],
        ritual: "Madeiras e resinas melhoram com o tempo. Compre em quantidade e armazene em local fresco e escuro.",
        preparation: [
          "Vetiver: o haitiano é superior ao bourbon — verifique origem no laudo",
          "Sândalo Mysore: proibido de exportação — use Australian Sandalwood como substituto ético",
          "Cedro Atlas: sempre do Marrocos, não confunda com cedro virginiano",
          "Resinas: solicitar laudos de pesticidas e metais pesados"
        ],
        legacyPhrase: "A madeira mais velha é a mais silenciosa. E a mais poderosa.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-pain-3.png"
      },
      {
        id: "F09", category: "A",
        title: "Óleos Herbais e Especiarias", origin: "Brasil, Índia e Mediterrâneo",
        signature: "Alecrim, Lavanda, Hortelã, Gengibre, Pimenta Negra e Canela com pureza verificada.",
        experienceDesc: "As especiarias e herbais são os mais acessíveis — e os mais falsificados. Alecrim diluído em cânfora, lavanda misturada com lavandin. Aprenda a testar em casa.",
        ingredients: [
          "Floris Brasil (herbs nativas certificadas)",
          "AromaBrasilis (SP — lavanda e alecrim)",
          "Spice of India Imports (especiarias)",
          "Herbanatus (MG — medicinais e aromáticas)"
        ],
        ingredientImages: [],
        ritual: "Teste simples de campo: 1 gota no papel. OE puro evapora sem mancha. OE diluído em fixador deixa anel oleoso.",
        preparation: [
          "Lavanda: o lavandin é um híbrido mais barato — distinto da lavanda real",
          "Alecrim: dois quimiotipos: cânfora (estimulante) e 1,8-cineol (respiratório)",
          "Hortelã pimenta: deve refrescar imediatamente no pulso",
          "Descarte qualquer OE com prazo superior a 3 anos"
        ],
        legacyPhrase: "A erva que cura é específica. A genérica apenas perfuma.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      },
      {
        id: "F10", category: "B",
        title: "Óleos Carreadores e Bases", origin: "Brasil e Exterior",
        signature: "Jojoba, Argão, Amêndoa Doce, Baobá e Semente de Rosa Mosqueta.",
        experienceDesc: "Os óleos carreadores são os parceiros silenciosos dos OEs. Eles determinam a textura, a absorção e a duração do produto final. Escolha com o mesmo rigor que os OEs.",
        ingredients: [
          "Mapric Cosmética (SP — jojoba certificada)",
          "Quintas do Argão (importado Marrocos)",
          "Beraca Brasil (baobá e rosa mosqueta)",
          "Davene Cosmética (amêndoa nacional)"
        ],
        ingredientImages: [],
        ritual: "Armazene todos os carreadores na geladeira após abertos. Oxidação é o maior inimigo da qualidade.",
        preparation: [
          "Jojoba é tecnicamente uma cera líquida — não ranço, validade longa",
          "Argão: verifique se é cosmético (light) ou culinário (mais denso)",
          "Rosa Mosqueta: vai rançar. Compre em pequenas quantidades e refrigere",
          "Sempre compre em dark glass ou HDPE opaco"
        ],
        legacyPhrase: "O melhor carreador é aquele que some quando você o quer.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-pain-2.png"
      }
    ]
  },
  {
    chapterId: "F-III",
    chapterTitle: "Embalagens Premium e Apresentação",
    chapterDesc: "Os fornecedores de vidros, tampas, rótulos e embalagens de luxo que transformam um produto excelente em um objeto de desejo.",
    chapterManifesto: "O produto começa no ingrediente. A venda começa na embalagem. A fidelidade começa na experiência de unboxing. Não economize na apresentação — ela é parte inseparável do produto.",
    chapterSpecs: ["Padrão: Luxury Packaging", "Material: Vidro e Metal", "Personalização: Sim"],
    imageAbertura: "/ebook/capa_mistica_dourada.png",
    formulas: [
      {
        id: "F11", category: "A",
        title: "Frascos de Vidro Premium", origin: "Brasil e Europa",
        signature: "Vidro âmbar, transparente, fosco e âmbar com tampas metálicas.",
        experienceDesc: "O frasco é o primeiro toque físico do cliente com seu produto. Vidro fino, tampa pesada, vedação perfeita. A diferença entre um produto de R$30 e um de R$300 muitas vezes está apenas no frasco.",
        ingredients: [
          "Vidrolar (SP) — frascos boticário premium",
          "Pack Brasil (RJ — importados europeus)",
          "Indalima (MG — linha luxo)",
          "Embalageria Gold (SC — frascos foscos e gravados)"
        ],
        ingredientImages: [],
        ritual: "Sempre teste a vedação antes de confirmar o pedido. Uma tampa que não veda destrói o produto e a marca.",
        preparation: [
          "Especifique espessura mínima de vidro: 3mm para frascos de banho",
          "Tampas metálicas pretas ou douradas: peça amostra de 10 unidades",
          "Pedir teste de compatibilidade com seus OEs (alguns corroem tampas)",
          "Pedido mínimo geralmente 50-100 unidades por modelo"
        ],
        legacyPhrase: "O frasco não segura o produto. Ele segura o desejo.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      },
      {
        id: "F12", category: "B",
        title: "Rótulos e Identidade Visual", origin: "Nacional — Gráficas Especializadas",
        signature: "Papel texturizado, hot stamping dourado, verniz localizado e laminação fosca.",
        experienceDesc: "O rótulo comunica a promessa antes do aroma. Hot stamping dourado sobre papel creme com verniz UV seletivo é o padrão Sommers Store. Qualquer coisa abaixo disso é subproduto.",
        ingredients: [
          "Gráfica Allegra (SP — hot stamping e verniz)",
          "RotulosLux (PR — papéis premium)",
          "DataLabel Brasil (MG — autoclave e waterproof)",
          "Label & Co (RJ — importados europeus)"
        ],
        ingredientImages: [],
        ritual: "Sempre solicite prova física antes da tiragem final. Monitor de tela não representa cor real.",
        preparation: [
          "Papel mínimo: 120g com textura. Couchê brilhante é amateur",
          "Hot stamping dourado: adiciona R$0,80-1,20 por rótulo — vale cada centavo",
          "Verniz UV seletivo: eleva percepção de luxo sem exagero",
          "Resistência à umidade: obrigatório para banho/spa"
        ],
        legacyPhrase: "O rótulo não é decoração. É a primeira promessa que você faz.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-pain-3.png"
      },
      {
        id: "F13", category: "A",
        title: "Caixas e Embalagens de Presente", origin: "Nacional — Kraft e Papelão Premium",
        signature: "Caixa rígida, interior em seda, fechamento em lacre de cera.",
        experienceDesc: "O unboxing é um ritual que o cliente vai fotografar e compartilhar. Uma caixa rígida preta com interior em seda cinza e lacre de cera preta é reconhecível antes mesmo de ver o produto.",
        ingredients: [
          "Caixas Premium Brasil (SP — rígidas e magnéticas)",
          "Krafia (SC — kraft artesanal premium)",
          "Embala Luxo (RJ — seda e enchimento)",
          "Selos de Cera Master (artesanal nacional)"
        ],
        ingredientImages: [],
        ritual: "Defina um padrão e mantenha-o em todos os pedidos. A consistência cria reconhecimento de marca.",
        preparation: [
          "Caixa rígida com fechamento magnético: padrão Sommers Store",
          "Interior: papel de seda cinza-chumbo ou creme — nunca branco simples",
          "Lacre de cera: compre o kit (cera + pistola + selos personalizados)",
          "Peça amostras de 5 unidades antes do pedido grande"
        ],
        legacyPhrase: "A primeira caixa que o cliente abre é uma declaração de amor.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-pain-2.png"
      },
      {
        id: "F14", category: "B",
        title: "Acessórios e Colheres Decorativas", origin: "Nacional e Importado",
        signature: "Colheres de madeira, espátulas em cobre e colheres de porcelana para kits premium.",
        experienceDesc: "O acessório dentro da embalagem transforma o produto em experiência. Uma colher de madeira gravada a laser com 'Sommers Store' é um item colecionável — não descartável.",
        ingredients: [
          "WoodCraft Brasil (colheres de madeira sob encomenda)",
          "Cobre Design SP (espátulas e acessórios em cobre)",
          "Porcelana Arte (colheres de porcelana branca)",
          "Laser Craft MG (gravação a laser em madeira)"
        ],
        ingredientImages: [],
        ritual: "Inclua sempre um cartão artesanal manuscrito (ou imitação premium de manuscrito) com o kit.",
        preparation: [
          "Colheres de madeira: especifique madeira não tratada, sem verniz",
          "Gravação a laser: arquivo em vetor (.svg ou .ai) necessário",
          "Cobre: vai oxidar — isso é parte da estética, não defeito",
          "Pedido mínimo: 50 unidades para customização"
        ],
        legacyPhrase: "O detalhe que ninguém pede é o que ninguém esquece.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      },
      {
        id: "F15", category: "A",
        title: "Fitas, Lacres e Finalizações", origin: "Nacional",
        signature: "Fita de cetim, lacre de cera, barbante encerado e papel kraft premium.",
        experienceDesc: "Os acabamentos fazem a diferença entre uma encomenda e uma entrega de presente. Fita de cetim dupla-face dourada, lacre preto com o monograma SS. Custo adicional mínimo, impacto máximo.",
        ingredients: [
          "Fitas Décor Brasil (SP — cetim e organza)",
          "Papel Kraft Master (SC — kraft natural e reciclado)",
          "Barbantes Cru Premium (artesanal nacional)",
          "Cera Pura Brasil (para lacres artesanais)"
        ],
        ingredientImages: [],
        ritual: "Padronize cada finalização: todas as embalagens iguais em cada linha de produto. Consistência é marca.",
        preparation: [
          "Fita de cetim: largura de 1.5cm dourada ou preta para o padrão SS",
          "Barbante encerado: dá textura rústica-luxo ao visual kraft",
          "Lacre de cera: temperatura correta é 80°C — nem mais, nem menos",
          "Crie um manual de embalagem interno para garantir consistência com equipe"
        ],
        legacyPhrase: "O laço é o último gesto antes do cliente abrir. Faça valer.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-pain-3.png"
      }
    ]
  }
];

export default fornecedoresChapters;
