import { Chapter } from "../types/chapters";

const sinergiasChapters: Chapter[] = [
  {
    chapterId: "S-I",
    chapterTitle: "Sinergias de Foco e Performance",
    chapterDesc: "Blends desenhados para a clareza mental e a agilidade executiva.",
    chapterManifesto: "O foco é a moeda mais valiosa do século XXI. Estas sinergias foram criadas para limpar a névoa mental e instaurar um estado de prontidão absoluta. Use quando o objetivo for a conquista.",
    chapterSpecs: ["Foco: Agilidade Mental", "Notas: Cítricos Nobres", "Ação: Ativação"],
    imageAbertura: "/ebook/capa_mistica_esmeralda.png",
    formulas: [
      {
        id: "S01", category: "A",
        title: "Alquimia do CEO", origin: "Exclusive Blend",
        signature: "Limão Siciliano, Alecrim Marroquino e um toque de Hortelã Pimenta.",
        experienceDesc: "Uma explosão de frescor que corta a fadiga mental. O Alecrim ativa a memória enquanto o Limão eleva o ânimo. Ideal para manhãs decisivas.",
        ingredients: ["500g Sal Marinho", "10 gotas OE Alecrim", "5 gotas OE Limão Siciliano", "2 gotas OE Hortelã"],
        ingredientImages: [
          { name: "Sal Marinho", quantity: "500g", imagePath: "/ebook/ingredients/sal-marinho.png" },
          { name: "Alecrim", quantity: "10 gts", imagePath: "/ebook/ingredients/alecrim.png" },
          { name: "Limão", quantity: "5 gts", imagePath: "/ebook/ingredients/limao.png" },
          { name: "Hortelã", quantity: "2 gts", imagePath: "/ebook/ingredients/hortela.png" },
        ],
        ritual: "Mergulhe os pés por 15 minutos em água morna antes de iniciar sua rotina estratégica.",
        preparation: ["Misture os sais", "Adicione os óleos em sentido horário", "Armazene em vidro âmbar"],
        legacyPhrase: "Onde há clareza, há domínio.",
        imageSensorial: "/ebook/f01-yuzu.png",
        imageShadow: "/sais/assets/zen-pain-3.png"
      }
    ]
  }
];

export default sinergiasChapters;
