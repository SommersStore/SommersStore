"use client";

import React from "react";
import Image from "next/image";

// 🌓 THE BLACK PROTOCOL - MASTER EDITION (A4) — 16 FORMULAS + SHADOW-FLOW
const ebookStyles = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@100;300;400;700&display=swap');

.page-a4 {
  width: 210mm;
  min-height: 297mm;
  background: #050508;
  margin: 0 auto 60px; /* Mais espaço entre as páginas */
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.9), 0 0 15px rgba(197,160,89,0.1); /* Sombra e brilho dourado leve */
  border: 1px solid rgba(197, 160, 89, 0.2); /* Linha sutil dourada */
  border-bottom: 3px solid rgba(197, 160, 89, 0.4); /* Linha inferior mais grossa */
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
  .shadow-flow-container img {
    opacity: 0.36 !important;
  }
}

/* CLOSING PAGE — TRANSCENDENCE */
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
  50% { transform: translateY(-18px) rotate(8deg); opacity: 1; }
}
@keyframes float-medium {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
  33% { transform: translateY(-12px) rotate(-5deg); opacity: 0.8; }
  66% { transform: translateY(-6px) rotate(10deg); opacity: 0.5; }
}
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}
@keyframes rise-smoke {
  0% { transform: translateY(0) translateX(0) scaleX(1); opacity: 0.6; }
  50% { transform: translateY(-40px) translateX(8px) scaleX(1.3); opacity: 0.3; }
  100% { transform: translateY(-80px) translateX(-4px) scaleX(0.8); opacity: 0; }
}
.particle { animation: float-slow 6s ease-in-out infinite; }
.particle:nth-child(2n) { animation: float-medium 8s ease-in-out infinite; animation-delay: -2s; }
.particle:nth-child(3n) { animation: float-slow 10s ease-in-out infinite; animation-delay: -4s; }
.glow-pulse { animation: pulse-glow 4s ease-in-out infinite; }
.smoke { animation: rise-smoke 5s ease-out infinite; }
.smoke:nth-child(2) { animation-delay: -1.5s; }
.smoke:nth-child(3) { animation-delay: -3s; }
`;

const protocolData = [
    {
      id: "01",
      title: "Yuzu Imperial do Solstício",
      origin: "Japão — Ritual Ryokan",
      signature: "Há uma luz que só brilha no inverno. Inspirado no ritual japonês Yuzu-yu, esta composição une a base mineral mais pura à assinatura cítrica-lenhosa do Yuzu e do Hinoki.",
      ingredients: ["150g Sal Marinho Fino", "100g Sal Rosa Himalaia", "50g Sal Epsom", "6 gotas OE Yuzu", "3 gotas Hinoki", "2 gotas Bergamota"],
      ritual: "Protocolo de Inverno: Inicie com água a 38°C. O vapor deve carregar as notas cítricas para limpar a mente antes de tocar a pele.",
      preparation: [
        "Misture os minerais em um recipiente de cerâmica ou madeira perfeitamente seco.",
        "Dilua os óleos essenciais em um veículo oleoso neutro para fixar o aroma.",
        "Incorpore a fase aromática aos sais com movimentos circulares lentos.",
        "Adicione cascas de cítricos desidratadas para selar o frescor visual.",
        "Aguarde o 'descanso térmico' de 24h antes do primeiro uso ou envase final."
      ],
      legacyPhrase: "Onde o solstício toca a alma, a clareza se faz presente.",
      imageSensorial: "/ebook/f01-yuzu.png",
      imageShadow: "/sais/assets/zen-method-1.png",
    },
    {
      id: "02",
      title: "Hammam de Atlas",
      origin: "Marrocos — Tradição Berber",
      signature: "O frescor absoluto de um spa internacional. Purificação através do eucalipto e do argan. Uma fórmula de presença, vigor e limpeza profunda.",
      ingredients: ["180g Sal Marinho Grosso", "120g Sal Epsom", "5 gotas Eucalipto", "4 gotas Alecrim", "2 gotas Menta", "1 colher Óleo de Argan"],
      ritual: "Respiração Profunda: O eucalipto abre os pulmões enquanto os sais abrem os poros.",
      preparation: [
        "Triture levemente o sal marinho grosso para liberar sua energia mineral.",
        "Misture o óleo de argan com os extratos de alecrim e menta.",
        "Unifique as bases com uma colher de madeira para evitar oxidação.",
        "Sinta a textura fria e revigorante enquanto os óleos selam os cristais.",
        "Envase em recipientes de boca larga para facilitar o gesto do ritual."
      ],
      legacyPhrase: "A purificação do corpo é o primeiro passo para a liberdade da mente.",
      imageSensorial: "/sais/assets/zen-pain-2.png",
      imageShadow: "/sais/assets/zen-pain-3.png",
    },
    {
      id: "03",
      title: "Rosa de Jaipur com Açafrão",
      origin: "Índia — Herança Ayurveda",
      signature: "Dourado floral. O encontro entre a nobreza da Rosa Damascena e o exotismo do Açafrão. Autoestima e riqueza sensorial.",
      ingredients: ["150g Sal Rosa", "100g Sal Marinho", "50g Sal Epsom", "5 gotas Rosa Absoluta", "3 gotas Cardamomo", "Fios de Açafrão Real"],
      ritual: "Ritual do Ouro: Observe a cor da água mudar com o açafrão. Sinta o calor do cardamomo abraçando a pele.",
      preparation: [
        "Selecione manualmente os fios mais vibrantes do açafrão indiano.",
        "Dilua a rosa e o cardamomo em óleo vegetal morno para expansão.",
        "Envolva os sais do Himalaia nessa mistura dourada e aromática.",
        "Acrescente pétalas de rosa inteiras no topo como selo de autenticidade.",
        "Armazene em local fresco para preservar o aroma floral especiado."
      ],
      legacyPhrase: "A beleza que emana do ritual é o brilho da sua própria essência.",
      imageSensorial: "/ebook/botanical.png",
      imageShadow: "/sais/assets/zen-method-1.png",
    },
    {
      id: "04",
      title: "Vetiver Noturno de Ceilão",
      origin: "Sri Lanka — Aterramento Premium",
      signature: "Terroso, profundo, silencioso. O vetiver traz a raiz mais nobre da perfumaria internacional em um protocolo de descanso absoluto para noites que pedem menos ruído e mais presença.",
      ingredients: ["200g Sal Epsom", "100g Dead Sea Salt", "4 gotas Vetiver", "4 gotas Camomila Romana", "3 gotas Sândalo"],
      ritual: "O Silêncio: Use após um dia de decisões pesadas. O vetiver ancora os pensamentos enquanto o Dead Sea restaura a barreira da pele.",
      preparation: [
        "Misture o Epsom e o Dead Sea Salt em proporção exata — 2:1.",
        "Dilua vetiver e sândalo em óleo de coco fracionado para suavizar.",
        "Incorpore a camomila por último para preservar suas notas delicadas.",
        "Misture com lentidão — o vetiver precisa de tempo para se fixar.",
        "Envase em pote âmbar com tampa hermética para preservar o terroso."
      ],
      legacyPhrase: "No silêncio da terra, a mente encontra sua própria música.",
      imageSensorial: "/sais/assets/zen-dark-hero.png",
      imageShadow: "/ebook/spa.png",
    },
    {
      id: "05",
      title: "Lótus Azul do Nilo",
      origin: "Egito — Segredo Alquímico",
      signature: "A joia da coleção. Uma fórmula meditativa que resgata a raridade do Lótus Azul em uma base mineral de Obsidiana. Contemplação e luxo em estado puro.",
      ingredients: ["140g Sal Rosa", "100g Sal Marinho", "60g Dead Sea Salt", "3 gotas Blue Lotus Absolute", "3 gotas Frankincense", "1 gota Sândalo"],
      ritual: "O Vácuo Noturno: Um ritual para ser feito no escuro absoluto. Deixe as resinas orientais guiarem o seu descanso.",
      preparation: [
        "Prepare os minerais sob uma atmosfera de silêncio e intenção.",
        "Dissolva o absoluto de Lótus Azul no óleo resinoso de Frankincense.",
        "Verta a alquimia aromática sobre o blend de sais brancos e negros.",
        "Misture com suavidade para preservar a integridade das pétalas raras.",
        "Mantenha em pote âmbar para proteger a 'alma' fotossensível da planta."
      ],
      legacyPhrase: "No silêncio das botânicas, o cofre do espírito se abre.",
      imageSensorial: "/ebook/lotus.png",
      imageShadow: "/sais/assets/zen-dark-hero.png",
    },
    {
      id: "06",
      title: "Olíbano & Mirra do Deserto",
      origin: "Arábia — Protocolo Cerimonial",
      signature: "Resinoso, seco, ancestral. Um banho de presença adulta e clareza mental. A união de resinas milenares em uma composição que exige reverência.",
      ingredients: ["170g Sal Marinho", "80g Dead Sea Salt", "50g Sal Negro", "4 gotas Frankincense", "3 gotas Mirra", "2 gotas Cedro"],
      ritual: "Conexão de Raiz: Use antes de decisões importantes. Sinta o aroma sagrado do deserto aterrando seus pensamentos.",
      preparation: [
        "Misture as resinas moídas finamente aos sais minerais secos.",
        "Adicione as gotas de Frankincense e Mirra com conta-gotas preciso.",
        "Incorpore o Cedro para dar corpo amadeirado à composição.",
        "Misture até que cada cristal de sal mude sutilmente de brilho.",
        "Envase em recipientes de vidro pesado para transmitir autoridade."
      ],
      legacyPhrase: "Onde o mistério da terra encontra a clareza do espírito.",
      imageSensorial: "/ebook/spa.png",
      imageShadow: "/sais/assets/zen-pain-3.png",
    },
    {
      id: "07",
      title: "Jasmim Sambac da Noite",
      origin: "Índia — Floral Sensual",
      signature: "Banho floral cremoso, sofisticado, de perfume caro. O Jasmim Sambac traz a assinatura mais elegante da perfumaria em um ritual de autoestima e reconexão.",
      ingredients: ["160g Sal Rosa", "90g Sal Marinho", "50g Sal Epsom", "4 gotas Jasmine Sambac", "3 gotas Ylang-ylang", "2 gotas Sândalo"],
      ritual: "A Noite Longa: Deixe o aroma do jasmim envolver o corpo. Ideal para momentos de reconexão e autoestima.",
      preparation: [
        "Inicie a mistura pela base mineral de Epsom para garantir fluidez.",
        "Combine o Jasmim Sambac com o Sândalo para uma base estável.",
        "Lentamente, verta os aromáticos sobre os sais rosados.",
        "Sinta a cremosidade do perfume enquanto envolve os botânicos.",
        "Deixe maturar por 48h antes de apresentar ao mercado premium."
      ],
      legacyPhrase: "A elegância é a única beleza que nunca desaparece.",
      imageSensorial: "/sais/assets/zen-pain-2.png",
      imageShadow: "/ebook/botanical.png",
    },
    {
      id: "08",
      title: "Rosa Taif & Neroli Branco",
      origin: "Oriente Médio — Luxury Hotel Spa",
      signature: "Floral luminoso, delicado e extremamente refinado. A rosa de Taif encontra o neroli em uma composição que é pura assinatura de hotel cinco estrelas do Mediterrâneo.",
      ingredients: ["150g Dead Sea Salt", "100g Sal Rosa", "4 gotas Rosa", "3 gotas Neroli", "2 gotas Petitgrain", "1 gota Gerânio"],
      ritual: "Mediterrâneo: Aplique os sais em água morna e sinta o buquê floral-cítrico envolver o ambiente como um lobby de resort.",
      preparation: [
        "Selecione Dead Sea Salt de alta pureza como base mineral nobre.",
        "Dilua a rosa e o neroli em jojoba para impedir a evaporação rápida.",
        "Misture os sais rosados à base branca para um efeito visual bicolor.",
        "Adicione pétalas de rosa claras e flor de laranjeira seca ao topo.",
        "Envase em vidro transparente para exibir a beleza da composição."
      ],
      legacyPhrase: "A verdadeira sofisticação é silenciosa — e perfumada.",
      imageSensorial: "/ebook/botanical.png",
      imageShadow: "/sais/assets/zen-method-1.png",
    },
    {
      id: "09",
      title: "Tulipa & Yuzu de Amsterdã",
      origin: "Europa/Japão — Edição Limitada",
      signature: "Artístico, fresco, colecionável. Uma ponte entre o design holandês e o ritual japonês. Menos terapêutico, mais sensorial — como uma peça de galeria que se dissolve na água.",
      ingredients: ["180g Sal Marinho", "70g Sal Rosa", "5 gotas Yuzu", "3 gotas Laranja Doce", "2 gotas Cedro Claro"],
      ritual: "O Museu: Dissolva os sais e observe as camadas de cor se desfazendo. Um banho para mentes criativas e inquietas.",
      preparation: [
        "Misture os sais em camadas alternadas — branco e rosado — para efeito visual.",
        "Incorpore o yuzu e a laranja doce em óleo de semente de uva, leve e neutro.",
        "Adicione o cedro para ancorar as notas cítricas sem peso.",
        "Decore com pétalas decorativas em tons suaves para selar a edição.",
        "Envase em frasco cilíndrico transparente — a apresentação é o produto."
      ],
      legacyPhrase: "A arte do banho é a arte de fazer o invisível, memorável.",
      imageSensorial: "/ebook/yuzu.png",
      imageShadow: "/sais/assets/zen-pain-2.png",
    },
    {
      id: "10",
      title: "Rosa Indiana & Amêndoas Doces",
      origin: "Ayurveda Premium — Harmonia",
      signature: "O banho de veludo. A união entre a rosa indiana e as amêndoas cria um escudo de maciez e proteção. Uma fórmula para pausas mais bonitas e momentos que pedem delicadeza rara.",
      ingredients: ["170g Sal Rosa", "80g Sal Marinho", "50g Sal Epsom", "4 gotas Rosa", "3 gotas Sândalo", "1 colher Óleo Amêndoas"],
      ritual: "Equilíbrio: Use após dias de excessiva agitação. O óleo de amêndoas sela a hidratação e a rosa restaura a calma.",
      preparation: [
        "Aqueça levemente o óleo de amêndoas antes de misturar os essenciais.",
        "Banhe os sais do Himalaia nessa emulsão quente.",
        "Sinta a fragrância de sândalo ancorando o aroma da rosa.",
        "Misture até que os botânicos fiquem levemente brilhantes.",
        "Apresentação ideal: pote de vidro arredondado com fita de cetim."
      ],
      legacyPhrase: "Toda pressa encontra seu fim no abraço suave da rosa.",
      imageSensorial: "/ebook/f10-rosa-indiana.png",
      imageShadow: "/ebook/spa.png",
    },
    {
      id: "11",
      title: "Mineral do Mar Morto & Lavanda Branca",
      origin: "Jordânia — Descanso Funcional",
      signature: "O protocolo da pele. Dead Sea Salt em sua concentração máxima para restauração da barreira cutânea. A lavanda acalma enquanto os minerais reconstroem.",
      ingredients: ["200g Dead Sea Salt", "100g Sal Epsom", "6 gotas Lavanda", "2 gotas Camomila Romana", "2 gotas Frankincense"],
      ritual: "Restauração: Ideal para peles sensíveis. Sinta a densidade dos minerais nutritivos do Mar Morto.",
      preparation: [
        "Utilize apenas Dead Sea Salt certificado para garantir os minerais.",
        "Misture a lavanda e a camomila em óleo de jojoba ou amêndoas.",
        "Incorpore ao sal concentrado com toques leves.",
        "Mantenha o blend em local totalmente isento de umidade.",
        "Finalize com flores de lavanda seca inteiras para selar o pote."
      ],
      legacyPhrase: "Curar o corpo é convidar a alma a descansar.",
      imageSensorial: "/sais/assets/zen-pain-2.png",
      imageShadow: "/sais/assets/zen-dark-hero.png",
    },
    {
      id: "12",
      title: "Obsidiana Floral — Sal Negro",
      origin: "Havaí — Detox Visual",
      signature: "O banho mais impactante visualmente. O Sal Negro Vulcânico cria um contraste dramático com flores brancas. Uma composição que vende antes mesmo de ser usada.",
      ingredients: ["180g Sal Marinho", "80g Sal Epsom", "40g Black Lava Salt", "4 gotas Tea Tree", "3 gotas Eucalipto", "2 gotas Lavanda"],
      ritual: "Reset Visual: Coloque os sais na água e observe a cor mudar para cinza obsidiana. Purificação do campo áurico.",
      preparation: [
        "Incorpore o Black Lava Salt por último para não manchar os sais claros.",
        "Misture os óleos de Tea Tree e Eucalipto para uma nota fresca.",
        "Adicione a lavanda como contra-ponto floral ao aroma balsâmico.",
        "Utilize flores de calêndula ou pétalas brancas para contraste no topo.",
        "Rótulo negro com escrita prata ou ouro é o envase ideal aqui."
      ],
      legacyPhrase: "Na escuridão da cinza, o espírito encontra seu brilho mais puro.",
      imageSensorial: "/sais/assets/zen-dark-hero.png",
      imageShadow: "/sais/assets/zen-pain-3.png",
    },
    {
      id: "13",
      title: "Chá Branco & Osmanthus Oriental",
      origin: "China — Hotel Boutique Asiático",
      signature: "Limpo, delicado, sofisticado. O chá branco purifica enquanto o osmanthus imprime uma doçura sutil e aveludada. Uma fórmula para quem entende que o luxo verdadeiro é discreto.",
      ingredients: ["160g Sal Marinho", "90g Sal Rosa", "50g Sal Epsom", "4 gotas Osmanthus", "3 gotas Bergamota FCF", "2 gotas Cedro Branco"],
      ritual: "Cerimônia do Silêncio: Dissolva lentamente. O aroma do osmanthus floresce com o calor — nunca tenha pressa.",
      preparation: [
        "Infuse folhas de chá branco premium no óleo vegetal por 24h antes do uso.",
        "Misture o osmanthus com a bergamota para uma nota floral-cítrica etérea.",
        "Incorpore o cedro branco como base de fixação amadeirada leve.",
        "Verta a composição aromática sobre os sais minerais com suavidade.",
        "Envase em cerâmica branca para alinhar com a estética minimalista asiática."
      ],
      legacyPhrase: "O que é verdadeiramente raro não grita — sussurra.",
      imageSensorial: "/ebook/spa.png",
      imageShadow: "/ebook/botanical.png",
    },
    {
      id: "14",
      title: "Açafrão Branco & Flor de Laranjeira",
      origin: "Mediterrâneo — Luxury Spa",
      signature: "Dourado suave, floral, raro. O açafrão imprime valor e presença, enquanto a flor de laranjeira traz a nota mais elegante da perfumaria clássica. Muito forte para kits de presente.",
      ingredients: ["150g Sal Rosa", "100g Dead Sea Salt", "4 gotas Neroli", "3 gotas Cardamomo", "1 gota Sândalo", "Fios Açafrão Branco"],
      ritual: "Abundância: Ritual de finalização de grandes ciclos. Celebre suas conquistas com o dourado mais nobre da natureza.",
      preparation: [
        "Selecione fios de açafrão de altíssima qualidade — poucos bastam.",
        "Dilua o neroli e o cardamomo em óleo de jojoba para suavidade extrema.",
        "Incorpore aos sais do Mar Morto com movimentos lentos e intencionais.",
        "Deposite o traço de sândalo por último — ele ancora tudo.",
        "Envase em vidro dourado ou com rótulo metálico para selar a assinatura."
      ],
      legacyPhrase: "O ouro da natureza não se compra — se cultiva com paciência.",
      imageSensorial: "/ebook/botanical.png",
      imageShadow: "/sais/assets/zen-method-1.png",
    },
    {
      id: "15",
      title: "Vetiver & Flor de Laranjeira Noturna",
      origin: "Provença — Elegância Adulta",
      signature: "Mais rara que a clássica lavanda. Uma fórmula para adultos que entenderam que o descanso é uma forma de sofisticação. Vetiver e orange blossom em uma composição silenciosa e profunda.",
      ingredients: ["180g Sal Epsom", "120g Dead Sea Salt", "4 gotas Vetiver", "3 gotas Orange Blossom", "2 gotas Camomila"],
      ritual: "Noturno Silencioso: Use apenas com luz de velas. O vetiver traz o chão; a flor de laranjeira, o céu.",
      preparation: [
        "Misture Epsom e Dead Sea Salt para a base mineral mais densa da coleção.",
        "Dilua vetiver em óleo neutro — ele é intenso e requer moderação.",
        "Incorpore a flor de laranjeira para iluminar a base terrosa.",
        "A camomila entra como ponte suave entre o terroso e o floral.",
        "Deixe o blend descansar por 48h antes do primeiro uso — vale a pena."
      ],
      legacyPhrase: "O verdadeiro descanso não é a ausência de movimento — é a presença de intenção.",
      imageSensorial: "/sais/assets/zen-dark-hero.png",
      imageShadow: "/ebook/lotus.png",
    },
    {
      id: "16",
      title: "Serenidade Dourada — Edição Legacy",
      origin: "Essência Ativa BR™ — Assinatura da Casa",
      signature: "A fórmula definitiva da coleção. Uma composição proprietária que une o melhor de três continentes em um único ritual. Criada para encerrar o Cofre como se encerra um grande concerto: em silêncio absoluto.",
      ingredients: ["150g Sal Rosa Himalaia", "100g Dead Sea Salt", "50g Sal Epsom", "3 gotas Neroli", "3 gotas Rosa", "2 gotas Frankincense", "Fios de Açafrão"],
      ritual: "O Legado: Este é o seu último ritual deste cofre. Use-o com a consciência de quem construiu algo que vale a pena ser lembrado.",
      preparation: [
        "Reúna os três sais como três camadas de significado — mineral, nutritivo, relaxante.",
        "Combine neroli e rosa em jojoba para a assinatura floral mais nobre possível.",
        "Adicione o frankincense para selar com resina sagrada e profundidade.",
        "Deposite os fios de açafrão sobre os sais como um selo dourado de autoria.",
        "Envase em vidro pesado, escurecido, com rótulo minimalista — este é o legado."
      ],
      legacyPhrase: "A sofisticação é a inteligência em forma de design. — Essência Ativa BR™",
      imageSensorial: "/ebook/master_cover.png",
      imageShadow: "/ebook/yuzu.png",
    },
    {
      id: "17",
      title: "Olíbano & Mirra do Deserto",
      origin: "Arábia / Chifre da África",
      signature: "Resinoso seco, cerimonial e maduro. Um banho profundo, escuro e adulto, formulado sob os códigos da alta perfumaria de nicho.",
      ingredients: ["170g Sal Marinho", "80g Dead Sea Salt", "50g Black Lava Salt", "4 gotas Frankincense", "3 gotas Mirra", "2 gotas Cedro", "1 gota Laranja Doce", "Óleo de Argan"],
      ritual: "O Protocolo Cerimonial: O contraste visual é imediato. O sal negro encontra a flor clara. A resina sagrada eleva o espírito. Feito para noites que exigem respeito.",
      preparation: [
        "Estabeleça a base com o sal marinho e o sal negro para criar uma estética obsidiana.",
        "Enriqueça o blend com Dead Sea Salt, trazendo a carga clínica para o cosmético.",
        "Crie a sinergia em argan aquecido: o peso da mirra, o lado esfumaçado do olíbano e a doçura repentina da laranja.",
        "Adicione resina de olíbano moída finamente para que a textura comunique o luxo orgânico.",
        "Pouse micro-pétalas creme no topo do pote. O contraste claro e escuro é o que vende o produto."
      ],
      legacyPhrase: "As melhores fórmulas não tratam, elas transportam. Para o absoluto.",
      imageSensorial: "/ebook/botanical.png",
      imageShadow: "/sais/assets/zen-dark-hero.png",
    },
];

export default function MasterEditionEbook() {
    return (
        <div className="ebook-wrapper" style={{minHeight:'100vh', background:'#050508', paddingTop:'40px', paddingBottom:'40px', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <style dangerouslySetInnerHTML={{ __html: ebookStyles }} />
            
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 🛡️ CAPA MASTER EDITION (PAGE 01)                          */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 p-20 justify-between items-center text-center">
                <div className="pt-20">
                    <h1 className="text-4xl text-neutral-500 font-serif italic mb-2">O Cofre das Botânicas Secretas</h1>
                    <div className="w-12 h-px bg-red-800 mx-auto mb-8" />
                    <h2 className="text-7xl title-gold italic tracking-tighter leading-none mb-6">
                        THE BLACK <br/> PROTOCOL
                    </h2>
                    <p className="sans-extra-light text-[#F5F5DC]/50 text-xs tracking-[0.3em] uppercase">
                        Master Edition — Digital Luxury Asset
                    </p>
                </div>
                
                <div className="relative w-full h-[400px] border border-neutral-800 rounded-sm overflow-hidden">
                    <Image src="/ebook/master_cover.png" alt="Master Cover" fill className="object-cover image-pop" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                </div>

                <div className="pb-10">
                    <p className="technical-label text-[10px] text-neutral-600 mb-2">Protocolo de Uso Interno — Confidencial</p>
                    <p className="title-gold font-serif italic text-2xl">&quot;A sofisticação é a inteligência em forma de design.&quot;</p>
                    <div className="mt-8 flex justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-800 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 📄 MANIFESTO (PAGE 02)                                     */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 p-20 justify-center text-center">
                 <h2 className="title-gold italic text-5xl mb-12">O Manifesto do Cofre</h2>
                 <p className="font-serif italic text-2xl leading-relaxed text-[#F5F5DC]/80 max-w-lg mx-auto mb-16">
                     &quot;Este volume não foi escrito para a massa. <br/>
                     Ele é a transcrição fiel de rituais que privilegiam a sofisticação silenciosa e o mecanismo sensorial de elite.&quot;
                 </p>
                 <div className="grid grid-cols-2 gap-10 text-left border-t border-neutral-900 pt-16">
                    <div>
                        <h3 className="accent-red technical-label text-[12px] mb-4">A Estrutura Mental</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed font-serif">Operamos sob a lógica de Squad. Design de luxo, copy outlier e curadoria botânica internacional. Nada aqui é por acaso.</p>
                    </div>
                    <div>
                        <h3 className="accent-red technical-label text-[12px] mb-4">O Legado</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed font-serif">Trate cada fórmula como um código. São insumos raros — Yuzu, Lótus, Resinas — aplicados para transformar banhos em rituais de legado.</p>
                    </div>
                 </div>
                 <div className="mt-auto pt-10 border-t border-neutral-900/50 flex justify-between items-center w-full technical-label text-[10px] text-neutral-700 font-bold">
                    <span>ESSÊNCIA ATIVA BR™ SYSTEM</span>
                    <span className="accent-red">PAG. 02</span>
                 </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 📖 INTRODUÇÃO / A LÓGICA (PAGE 03)                          */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 p-20 flex flex-col justify-center">
                <div className="mb-10 text-center">
                    <p className="technical-label text-[11px] text-neutral-700 mb-6">A ESTRUTURA MENTAL DOS BLENDS PREMIUM</p>
                    <h2 className="title-gold italic text-4xl mb-6">A Lógica da Composição</h2>
                    <div className="w-12 h-px bg-red-800 mx-auto" />
                </div>
                
                <div className="font-serif text-[#F5F5DC]/80 space-y-8 leading-relaxed max-w-2xl mx-auto text-center mb-12">
                    <p>Existem fórmulas que cumprem uma função. E existem fórmulas que criam uma experiência.</p>
                    <p>O <strong>The Black Protocol</strong> nasce para ocupar esse segundo espaço: o da composição sensorial sofisticada, da apresentação refinada e do autocuidado transformado em ritual. Cada blend foi pensado para unir três pilares que elevam o valor percebido de um produto artesanal: <em>beleza visual, intenção aromática e experiência de uso</em>.</p>
                    <p>Toda fórmula premium é mais fácil de construir quando você entende seus quatro pilares estruturais:</p>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-10 max-w-3xl mx-auto">
                    <div className="border-t border-neutral-800 pt-6">
                        <h3 className="title-gold font-serif italic text-xl mb-3">1. Base Mineral</h3>
                        <p className="text-sm text-neutral-400 font-serif leading-relaxed">É o corpo do blend. Define textura, cor, custo e sensação de produto. A união exata entre Rosa do Himalaia, Epsom e Dead Sea Salt define o peso da entrega clínica.</p>
                    </div>
                    <div className="border-t border-neutral-800 pt-6">
                        <h3 className="title-gold font-serif italic text-xl mb-3">2. Assinatura Aromática</h3>
                        <p className="text-sm text-neutral-400 font-serif leading-relaxed">É o que torna a experiência memorável. O aroma precisa ter direção clara: Yuzu para clareza, Vetiver para aterramento, Rosa Damascena para nobreza.</p>
                    </div>
                    <div className="border-t border-neutral-800 pt-6">
                        <h3 className="title-gold font-serif italic text-xl mb-3">3. Acabamento Botânico</h3>
                        <p className="text-sm text-neutral-400 font-serif leading-relaxed">O detalhe que enriquece visualmente a fórmula e aumenta sua percepção de sofisticação. Fios de Açafrão, Pétalas de Lótus ou Botões de Lavanda.</p>
                    </div>
                    <div className="border-t border-neutral-800 pt-6">
                        <h3 className="title-gold font-serif italic text-xl mb-3">4. Apresentação Final</h3>
                        <p className="text-sm text-neutral-400 font-serif leading-relaxed">A ponte entre produto artesanal e desejo. A embalagem escurecida, a tipografia limpa, a comunicação de que há intenção em cada miligrama.</p>
                    </div>
                </div>

                <div className="mt-auto pt-10 border-t border-neutral-900/50 flex justify-between items-center w-full technical-label text-[10px] text-neutral-700 font-bold">
                    <span>ESSÊNCIA ATIVA BR™ SYSTEM</span>
                    <span className="accent-red">PAG. 03</span>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 📑 SUMÁRIO (PAGE 04)                                        */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 p-20 flex flex-col justify-between">
                <div>
                    <div className="text-center mb-16">
                         <h2 className="title-gold italic text-5xl mb-6">Sumário Botânico</h2>
                         <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-800 to-transparent mx-auto" />
                    </div>

                    <div className="grid grid-cols-2 gap-x-16 gap-y-4 max-w-4xl mx-auto font-serif">
                        {protocolData.map((item, i) => (
                            <div key={i} className="flex justify-between items-baseline border-b border-neutral-900/50 pb-2">
                                <span className="text-[#F5F5DC] text-lg italic tracking-wide">{item.id}. {item.title}</span>
                                <span className="text-neutral-600 technical-label text-[10px]">
                                    {String(i * 2 + 5).padStart(2, '0')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12 pb-4">
                     <p className="sans-extra-light text-neutral-600 text-[9px] uppercase tracking-[0.4em]">Confidencial // 16 Fórmulas de Elite</p>
                </div>

                <div className="mt-auto pt-10 border-t border-neutral-900/50 flex justify-between items-center w-full technical-label text-[10px] text-neutral-700 font-bold">
                    <span>ESSÊNCIA ATIVA BR™ SYSTEM</span>
                    <span className="accent-red">PAG. 04</span>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ♾️ 16 PROTOCOLS — SENSORIAL + TECHNICAL (SHADOW-FLOW)      */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {protocolData.map((item, index) => (
                <React.Fragment key={item.id}>

                    {/* ── SENSORIAL PAGE ─────────────────────────────── */}
                    <article className="page-a4 overflow-hidden relative">
                        <div className="absolute inset-0 z-0">
                            <Image src={item.imageSensorial} alt={item.title} fill className="object-cover opacity-60 image-pop" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/20" />
                        </div>
                        
                        <div className="mt-auto p-16 relative z-10">
                            <h2 className="title-gold text-6xl mb-2 italic leading-tight">{item.title}</h2>
                            <p className="technical-label text-[12px] mb-10 text-neutral-500 tracking-[0.5em]">{item.origin}</p>
                            <p className="font-serif italic text-2xl leading-relaxed text-[#F5F5DC]/90 max-w-xl">
                                &quot;{item.signature}&quot;
                            </p>
                        </div>
                        
                        <div className="p-8 absolute top-8 right-8 writing-mode-vertical border-r border-red-800/20 pr-2">
                             <span className="technical-label text-[12px] rotate-90 inline-block font-bold">LEGACY PROTOCOL – {item.id}</span>
                        </div>
                    </article>

                    {/* ── TECHNICAL PAGE (SHADOW-FLOW) ────────────────── */}
                    <article className="page-a4 p-16 justify-between relative">

                         {/* SHADOW-FLOW: image in bottom-left, fading into black */}
                         <div className="shadow-flow-container">
                             <Image src={item.imageShadow} alt="" fill sizes="50vw" />
                             <div className="shadow-flow-mask" />
                         </div>

                         {/* CONTENT: floats above the shadow */}
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

                         <div className="relative z-10 text-center py-12 border-y border-neutral-900/50">
                             <p className="title-gold font-serif italic text-3xl opacity-90">&quot;{item.legacyPhrase}&quot;</p>
                         </div>

                         <div className="relative z-10 pt-8 flex justify-between items-center technical-label text-[11px] text-neutral-500 font-bold">
                             <span>THE BLACK PROTOCOL // MASTER EDITION</span>
                             <span className="text-red-800">PAGE {String(index * 2 + 6).padStart(2, '0')}</span>
                         </div>
                    </article>

                </React.Fragment>
            ))}

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* 🏁 ENDING (PAGE FINAL)                                     */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="page-a4 p-20 justify-between items-center text-center">

                {/* Topo */}
                <div className="pt-10">
                    <p className="technical-label text-[11px] text-neutral-700 mb-6">THE BLACK PROTOCOL // MASTER EDITION</p>
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-red-800 to-transparent mx-auto" />
                </div>

                {/* Espaço reservado para imagem deslumbrante */}
                <div className="relative w-full flex-1 my-10 border border-neutral-800/30 rounded-sm overflow-hidden"
                     style={{minHeight: '340px', background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(197,160,89,0.05) 0%, transparent 70%)'}}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-8 h-px bg-neutral-800 mb-4" />
                        <p className="technical-label text-[10px] text-neutral-800">imagem</p>
                        <div className="w-8 h-px bg-neutral-800 mt-4" />
                    </div>
                </div>

                {/* Fecho */}
                <div className="pb-10">
                    <h3 className="title-gold italic text-5xl mb-8">O Legado Continua</h3>
                    <div className="w-20 h-px mx-auto mb-8" style={{background: 'linear-gradient(to right, transparent, #C5A059, transparent)'}} />
                    <p className="font-serif italic text-xl text-neutral-500 max-w-sm mx-auto leading-relaxed mb-12">
                        &quot;A sofisticação é a inteligência em forma de design.&quot;
                    </p>
                    <span className="technical-label text-[12px] uppercase text-neutral-800 tracking-[1em]">Essência Ativa BR™</span>
                </div>

            </section>
        </div>
    );
}
