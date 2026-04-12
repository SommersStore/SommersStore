import { Chapter } from "../types/chapters";

const fornecedoresChapters: Chapter[] = [
  {
    chapterId: "F-I",
    chapterTitle: "Insumos de Pureza Absoluta",
    chapterDesc: "A lista curada dos melhores fornecedores para sua produção de elite.",
    chapterManifesto: "Sua arte é tão boa quanto seus materiais. Não aceite nada menos que a pureza absoluta. Esta é a minha rede privada de confiança.",
    chapterSpecs: ["Qualidade: Grau Farmacêutico", "Padrão: Elite", "Origem: Brasil e Exterior"],
    imageAbertura: "/ebook/capa_mistica_dourada.png",
    formulas: [
      {
        id: "F01", category: "A",
        title: "Sais e Minerais", origin: "Curadoria Master",
        signature: "Onde encontrar Sal de Epsom, Mar Morto e Himalaia com laudo.",
        experienceDesc: "A base de todo banho de luxo. Indicamos fornecedores que garantem a ausência de metais pesados e pureza total.",
        ingredients: ["Distribuidora Alquimia Viva", "Insumos do Porto", "Naturalis Minerals"],
        ingredientImages: [],
        ritual: "Sempre peça o laudo técnico do lote para garantir o padrão Sommers Store.",
        preparation: ["Contatar o fornecedor", "Verificar disponibilidade de lotes", "Solicitar amostras"],
        legacyPhrase: "A qualidade é o silêncio do luxo.",
        imageSensorial: "/ebook/master_cover.png",
        imageShadow: "/sais/assets/zen-dark-hero.png"
      }
    ]
  }
];

export default fornecedoresChapters;
