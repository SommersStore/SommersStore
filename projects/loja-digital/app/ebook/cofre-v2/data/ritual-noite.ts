import { Chapter } from "../types/chapters";

const ritualNoiteChapters: Chapter[] = [
  {
    chapterId: "N-I",
    chapterTitle: "O Ritual da Meia-Noite",
    chapterDesc: "Fórmulas para o encerramento de ciclos e o descanso regenerativo.",
    chapterManifesto: "A noite é o tempo da alma. É quando o ruído do mundo silencia e você pode, finalmente, voltar para casa. Estas sinergias são portais para o repouso absoluto.",
    chapterSpecs: ["Foco: Regeneração", "Notas: Resinas e Flores Noturnas", "Ação: Aterramento"],
    imageAbertura: "/ebook/capa_mistica_rubi.png",
    formulas: [
      {
        id: "N01", category: "A",
        title: "Sopro de Morfeu", origin: "Night Protocol",
        signature: "Lavanda Búlgara, Olíbano e Sândalo.",
        experienceDesc: "Um banho que desacelera o sistema nervoso central instantaneamente. O Olíbano traz a proteção espiritual necessária para o sono, enquanto a Lavanda dissolve a ansiedade.",
        ingredients: ["400g Sal Epsom", "100g Sal Negro", "8 gotas OE Lavanda", "4 gotas OE Olíbano", "2 gotas OE Sândalo"],
        ingredientImages: [
          { name: "Sal Epsom", quantity: "400g", imagePath: "/ebook/ingredients/sal-epsom.png" },
          { name: "Sal Negro", quantity: "100g", imagePath: "/ebook/ingredients/sal-negro.png" },
          { name: "Lavanda", quantity: "8 gts", imagePath: "/ebook/ingredients/lavanda.png" },
          { name: "Olíbano", quantity: "4 gts", imagePath: "/ebook/ingredients/olibano.png" },
          { name: "Sândalo", quantity: "2 gts", imagePath: "/ebook/ingredients/sandalo.png" },
        ],
        ritual: "Prepare o ambiente com luz de velas. Desligue as telas 30 minutos antes. Mergulhe e visualize a neblina azul envolvendo seu corpo.",
        preparation: ["Incorpore as resinas no sal negro", "Finalize com a lavanda", "Use imediatamente"],
        legacyPhrase: "O descanso é o combustível da próxima grande ideia.",
        imageSensorial: "/ebook/spa.png",
        imageShadow: "/sais/assets/zen-pain-2.png"
      }
    ]
  }
];

export default ritualNoiteChapters;
