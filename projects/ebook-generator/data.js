const recipes = [
    // CAPÍTULO 1: RELAXAMENTO E SONO
    {
        num: "01",
        category: "RELAXAMENTO E SONO",
        title: "Banho Serenidade Dourada",
        subname: "Acalento Mineral de Fim de Tarde",
        signature: "Há composições feitas para perfumar, e há composições feitas para desacelerar o mundo ao redor. Esta fórmula nasce do encontro entre minerais claros, flores suaves e uma assinatura aromática pensada para o fim do dia. Seu uso convida o corpo a abrandar o ritmo, enquanto o ambiente ganha uma atmosfera silenciosa, limpa e acolhedora. Um ritual para noites que pedem menos ruído e mais presença.",
        ingredients: [
            "200g de Sal de Epsom",
            "100g de Sal Marinho Fino",
            "1 colher (sopa) de flores secas de Camomila",
            "1 colher (sopa) de Lavanda seca",
            "8 gotas de Óleo Essencial de Lavanda",
            "4 gotas de Óleo Essencial de Bergamota",
            "1 colher (chá) de Óleo Vegetal de Semente de Uva"
        ],
        protocol: "1. Misture os sais em uma tigela totalmente seca. 2. Em recipiente separado, dilua os óleos essenciais no óleo vegetal. 3. Adicione a fase aromática aos sais e mexa lentamente. 4. Incorpore as flores secas por último.",
        application: "Adicione de 2 a 4 colheres de sopa em água morna para banho de imersão ou 1 a 2 colheres em escalda-pés.",
        presentation: "Use pote de vidro com tampa dourada, rótulo bege quente e detalhe em lavanda clara. Finalize o topo com pequenas flores inteiras.",
        care: "Armazene em local seco e longe de luz direta para preservar as cores das flores.",
        box: "Dica de Ouro: Perfeito para kits 'Descanso e Pausa' acompanhado de uma vela de cera de abelha."
    },
    {
        num: "02",
        category: "RELAXAMENTO E SONO",
        title: "Noite de Lavanda e Camomila",
        subname: "O Clássico Acolhimento do Sono",
        signature: "O luxo do repouso absoluto reside na simplicidade de elementos que o tempo validou. Este blend clássico foi desenhado como um convite à inércia regeneradora. A lavanda azul, em sua forma mais pura, envolve os sentidos enquanto o magnésio prepara a musculatura para o silêncio. Um porto seguro para mentes que buscam um desligamento gentil e profundo.",
        ingredients: [
            "250g de Sal de Epsom",
            "50g de Sal Rosa do Himalaia",
            "2 colheres (sopa) de Lavanda seca",
            "1 colher (sopa) de Camomila seca",
            "10 gotas de Óleo Essencial de Lavanda",
            "3 gotas de Óleo Essencial de Ylang-Ylang",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Misture primeiro os sais (Epsom e Rosa), depois a fase aromática diluída no óleo vegetal, e por último incorpore os botânicos secos.",
        application: "Ideal para banhos de imersão prolongados (20 minutos) antes de deitar.",
        presentation: "Pote de vidro cilíndrico com rótulo minimalista em papel texturizado off-white.",
        care: "O Ylang-Ylang é intenso; respeite a dosagem para manter a elegância olfativa.",
        box: "Apresentação Premium: Finalize a embalagem com um selo de cera ou cordão de algodão natural."
    },
    {
        num: "03",
        category: "RELAXAMENTO E SONO",
        title: "Escalda-Pés Aterramento Suave",
        subname: "Respiro de Presença nos Pés",
        signature: "A terra tem uma linguagem de estabilidade que frequentemente esquecemos. Este ritual de aterramento usa a densidade dos sais e o vigor do cedro para puxar a agitação mental de volta à base. Uma pausa prática, porém imensamente sofisticada, criada para restaurar o eixo de equilíbrio e devolver a sensação de solo firme após o esgotamento do dia.",
        ingredients: [
            "180g de Sal Grosso triturado",
            "120g de Sal de Epsom",
            "1 colher (sopa) de Alecrim seco",
            "1 colher (sopa) de Lavanda seca",
            "5 gotas de Óleo Essencial de Lavanda",
            "3 gotas de Óleo Essencial de Cedro",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Misture os sais, adicione a fase aromática diluída e finalize com os botânicos. Armazene em pote ou sachê com excelente vedação.",
        application: "Use em bacia profunda com água quente (38-40ºC) até cobrir os tornozelos. Permaneça por 15 minutos.",
        presentation: "Sachês individuais de tecido para linha de spa ou potes de vidro herméticos.",
        care: "Mantenha o Alecrim bem seco para evitar oxidação precoce do blend.",
        box: "Variação Econômica: Substitua o Cedro por 2 gotas extras de Lavanda e 1 de Bergamota."
    },

    // CAPÍTULO 2: ENERGIA E CLAREZA
    {
        num: "04",
        category: "ENERGIA E CLAREZA",
        title: "Banho Despertar Botânico",
        subname: "Claridade Matinal em Notas Verdes",
        signature: "Luminosa sem ser agitada, fresca sem perder a elegância, esta composição foi pensada para abrir a manhã com clareza e leveza. Os sais minerais recebem notas botânicas mais vivas, criando uma experiência que desperta os sentidos com suavidade. É uma fórmula para começos: quando se deseja reorganizar a mente e iniciar o dia com intenção.",
        ingredients: [
            "180g de Sal Marinho",
            "120g de Sal Rosa do Himalaia",
            "1 colher (sopa) de Alecrim seco",
            "Raspas secas finas de casca de Limão",
            "6 gotas de Óleo Essencial de Limão Siciliano",
            "4 gotas de Óleo Essencial de Alecrim",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Combine os sais marinho e rosa. Adicione os óleos diluídos e incorpore as cascas e o alecrim ao final.",
        application: "Banho matinal ou chuveiro com aspersão (no chão do box) para sentir o vapor cítrico.",
        presentation: "Vidro transparente que valoriza o contraste entre o sal rosa e o verde do alecrim.",
        care: "Utilize cascas de limão perfeitamente desidratadas para evitar mofo.",
        box: "Dica de Posicionamento: Excelente para coleções com nomes como 'Manhã Clara' ou 'Foco Suave'."
    },
    {
        num: "05",
        category: "ENERGIA E CLAREZA",
        title: "Escalda-Pés Foco e Leveza",
        subname: "Alívio Revigorante para Mentes Ativas",
        signature: "Há momentos em que a mente pede um choque de realidade e frescor. Este escalda-pés utiliza a menta e o alecrim para criar uma sensação de 'frio térmico' que reorganiza os pensamentos. Ideal para o meio de tarde, quando o cansaço do trabalho ameaça o foco, injetando uma nova dose de disposição sem a agitação da cafeína.",
        ingredients: [
            "200g de Sal de Epsom",
            "100g de Sal Marinho fino",
            "1 colher (sopa) de Hortelã seca",
            "1 colher (sopa) de Alecrim seco",
            "4 gotas de Óleo Essencial de Hortelã-Pimenta",
            "4 gotas de Óleo Essencial de Alecrim",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Homogeneíze os sais minerais. Adicione a sinergia de óleos diluída e finalize com as folhas secas.",
        application: "Em água quente por 15 a 20 minutos, focando na respiração profunda do vapor de menta.",
        presentation: "Envasar em latas metálicas premium ou potes de vidro com rótulo azul-água.",
        care: "O Hortelã-Pimenta é potente; evite contato com os olhos após manusear o blend.",
        box: "Atenção: Comunique o produto como uma experiência revigorante e sensorial, não terapêutica."
    },
    {
        num: "06",
        category: "ENERGIA E CLAREZA",
        title: "Banho Revitalização Cítrica",
        subname: "Efervescência de Vitalidade e Cor",
        signature: "O sol capturado em forma de blend. Esta fórmula celebra a vibração dos citros em uma composição luminosa e alegre. A laranja doce traz o contentamento, enquanto o sal rosa confere o suporte mineral necessário para uma pele radiante. Um banho de luz para dias que exigem uma energia extra e um estado de espírito solar.",
        ingredients: [
            "220g de Sal Marinho",
            "80g de Sal Rosa",
            "1 colher (sopa) de Calêndula",
            "1 colher (sopa) de Casca de Laranja seca triturada",
            "6 gotas de Óleo Essencial de Laranja Doce",
            "3 gotas de Óleo Essencial de Limão",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Inicie pelos sais de base. Integre os óleos pré-diluídos e adicione a calêndula e as cascas trituradas.",
        application: "Especialmente prazeroso em banhos diurnos ou após o exercício físico.",
        presentation: "Vidro cristalino com rótulo minimalista e escrita em dourado suave.",
        care: "Mantenha em local escuro para preservar a cor amarela vibrante da calêndula.",
        box: "Apresentação Premium: Combine com sabonetes artesanais cítricos em kits 'Energia Diária'."
    },

    // CAPÍTULO 3: AUTOESTIMA E RITUAL SENSORIAL
    {
        num: "07",
        category: "AUTOESTIMA E RITUAL SENSORIAL",
        title: "Banho Rosé de Autocuidado",
        subname: "A Delicadeza de um Ritual Feminino",
        signature: "Delicada na aparência, sofisticada na presença e memorável no gesto, esta fórmula traduz o autocuidado como cena, detalhe e permanência. As pétalas de rosa e o gerânio foram reunidos para criar uma experiência que valoriza o instante e embeleza o ritual. Um blend pensado para pausas mais bonitas e momentos que merecem ser tratados com delicadeza rara.",
        ingredients: [
            "200g de Sal Rosa do Himalaia",
            "100g de Sal Marinho Fino",
            "2 colheres (sopa) de Pétalas secas de Rosa",
            "6 gotas de Óleo Essencial de Gerânio",
            "4 gotas de Óleo Essencial de Lavanda",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Combine os sais rosa e marinho. Adicione os óleos florais diluídos e incorpore as pétalas delicadamente por cima.",
        application: "Banho imersivo em temperatura corporal (37ºC) para máxima absorção do aroma das rosas.",
        presentation: "Potes redondos ou bojudos que destaquem as pétalas inteiras de rosa na superfície.",
        care: "Use pétalas de procedência orgânica para garantir a pureza do banho.",
        box: "Dica de Ouro: Use pétalas maiores apenas na superfície do pote para um acabamento visual de elite."
    },
    {
        num: "08",
        category: "AUTOESTIMA E RITUAL SENSORIAL",
        title: "Banho Jardim Branco",
        subname: "Pureza Mineral e Calma Floral",
        signature: "Existe uma elegância discreta no branco absoluto que este banho celebra. Unindo o sal Epsom às flores de camomila e calêndula clara, criamos uma 'assinatura de limpeza' visual e sensorial. Um ritual que não grita por atenção, mas que conquista pela suavidade da sua presença floral e pela sensação de leveza que deixa na alma.",
        ingredients: [
            "220g de Sal Marinho",
            "80g de Sal de Epsom",
            "1 colher (sopa) de Camomila",
            "1 colher (sopa) de Calêndula clara",
            "5 gotas de Óleo Essencial de Lavanda",
            "3 gotas de Óleo Essencial de Ylang-Ylang",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Prepare a base mineral clara. Adicione os óleos diluídos e finalize com o mix de flores brancas e amareladas.",
        application: "Ideal para quando se busca 'limpar' o excesso de informações mentais do dia.",
        presentation: "Visual minimalista: potes brancos foscos ou vidro com fita de cetim branca.",
        care: "A Calêndula clara é frágil; evite manusear o blend com as mãos úmidas.",
        box: "Melhor Aplicação: Linha 'Spa em Casa' ou kits de presente para quem ama o minimalismo."
    },
    {
        num: "09",
        category: "AUTOESTIMA E RITUAL SENSORIAL",
        title: "Escalda-Pés Toque de Presença",
        subname: "Sutileza e Brilho para Pausas Curtas",
        signature: "A presença se manifesta nos pequenos gestos. Este escalda-pés foi concebido para ser um ponto de luz na rotina. A bergamota traz a alegria cítrica, enquanto os três sais trabalham a drenagem e o relaxamento. Uma fórmula simples e encantadora para presentes delicados e momentos que pedem um toque de brilho sem complicação.",
        ingredients: [
            "150g de Sal de Epsom",
            "100g de Sal Marinho",
            "50g de Sal Rosa",
            "1 colher (sopa) de Lavanda",
            "1 colher (sopa) de Pétalas secas de Rosa",
            "4 gotas de Óleo Essencial de Bergamota",
            "3 gotas de Óleo Essencial de Lavanda",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Crie a composição tricolor com os sais. Adicione a fase aromática e os botânicos delicadamente.",
        application: "Banho de pés de 15 minutos em bacia aquecida antes de um evento importante.",
        presentation: "Frascos pequenos de 120g com colher de madeira e tag 'Pausa com Intenção'.",
        care: "Mantenha o rótulo bem vedado para que a Bergamota não perca o frescor rapidamente.",
        box: "Variação Presenteável: Perfeito para lembrancinhas de luxo ou mimos de boas-vindas."
    },

    // CAPÍTULO 4: CONFORTO CORPORAL E RECUPERAÇÃO
    {
        num: "10",
        category: "CONFORTO CORPORAL E RECUPERAÇÃO",
        title: "Banho Alívio de Tensão",
        subname: "Envoltório de Conforto e Respiro",
        signature: "Em dias em que o corpo parece carregar o peso do mundo nos ombros, esta fórmula atua como um desabafo mineral. O eucalipto abre as vias respiratórias enquanto o magnésio abraça a musculatura fadigada. Um ritual de conforto que devolve a sensação de espaço interno, permitindo que a tensão se dissolva na água em um silêncio restaurador.",
        ingredients: [
            "250g de Sal de Epsom",
            "50g de Sal Marinho",
            "1 colher (sopa) de Alecrim seco",
            "1 colher (sopa) de Lavanda seca",
            "5 gotas de Óleo Essencial de Eucalipto",
            "4 gotas de Óleo Essencial de Lavanda",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Misture as bases minerais. Prepare a diluição do Eucalipto e Lavanda e incorpore aos sais com os botânicos.",
        application: "Banho quente com vapor intenso para beneficiar-se da inalação do Eucalipto.",
        presentation: "Embalagens em cores sóbrias (cinza, azul profundo) com foco na funcionalidade de luxo.",
        care: "O Eucalipto é estimulante; use em banhos que permitam relaxamento posterior imediato.",
        box: "Atenção: Prefira linguagens como 'sensação de conforto' em vez de promessas de cura clínica."
    },
    {
        num: "11",
        category: "CONFORTO CORPORAL E RECUPERAÇÃO",
        title: "Escalda-Pés Pós-rotina",
        subname: "O Respiro de Fim de Expediente",
        signature: "O cansaço das pernas é, muitas vezes, o cansaço do espírito. Este blend funcional foi desenhado para 'cortar' o ritmo acelerado do dia através da hortelã e do sal grosso rústico. Uma âncora de frescor que prepara o corpo para o descanso noturno, retirando a sensação de peso e devolvendo a leveza necessária para a transição ao lar.",
        ingredients: [
            "200g de Sal Grosso triturado",
            "100g de Sal de Epsom",
            "1 colher (sopa) de Hortelã seca",
            "1 colher (sopa) de Alecrim seco",
            "4 gotas de Óleo Essencial de Eucalipto",
            "3 gotas de Óleo Essencial de Lavanda",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Misture as pedras rústicas de sal grosso aos minerais finos. Adicione os óleos e as ervas verdes.",
        application: "Ideal para 15-20 minutos de imersão logo após chegar em casa.",
        presentation: "Potes de 250g com nomes como 'Pausa Merecida' ou 'Respiro Botânico'.",
        care: "Mantenha o sal grosso bem seco para evitar que 'sue' dentro da embalagem.",
        box: "Estratégia Comercial: Ótimo produto de entrada para novos clientes que buscam alívio rápido."
    },
    {
        num: "12",
        category: "CONFORTO CORPORAL E RECUPERAÇÃO",
        title: "Banho Spa Mineral Premium",
        subname: "A Assinatura Master da Coleção",
        signature: "A síntese de todo o conhecimento botânico reunida em um único ritual. Esta fórmula master equilibra a trindade de sais com o buquê floral mais nobre da coleção. O gerânio e a bergamota criam um aroma de 'spa de hotel boutique', enquanto a calêndula e a lavanda cuidam do visual. É o ápice do Cofre: uma experiência completa de sofisticação.",
        ingredients: [
            "140g de Sal Rosa do Himalaia",
            "100g de Sal de Epsom",
            "60g de Sal Marinho",
            "1 colher (sopa) de Lavanda seca",
            "1 colher (sopa) de Calêndula",
            "4 gotas de Óleo Essencial de Lavanda",
            "3 gotas de Óleo Essencial de Gerânio",
            "2 gotas de Óleo Essencial de Bergamota",
            "1 colher (chá) de Óleo Vegetal"
        ],
        protocol: "Combine as três cores de sais. Adicione a sinergia master de óleos diluída e misture as flores lentamente.",
        application: "Use em momentos de celebração, conquistas ou rituais de renovação profunda.",
        presentation: "O topo do portfólio. Use as melhores embalagens (vidro pesado) e rótulos premium de alta gramatura.",
        care: "Fórmula complexa; siga as medidas exatas para manter o equilíbrio aromático.",
        box: "Checklist: Visual sofisticado, aroma de elite e alta percepção de valor garantida."
    }
];

module.exports = { recipes };
