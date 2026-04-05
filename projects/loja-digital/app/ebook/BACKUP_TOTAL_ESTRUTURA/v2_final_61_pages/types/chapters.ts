export interface IngredientImage {
  name: string;
  quantity: string;
  imagePath: string;
}

export interface Formula {
  id: string;
  category: "A" | "B";
  title: string;
  origin: string;
  signature: string;
  longSignature?: string;
  experienceDesc: string;
  ingredients: string[];
  ingredientImages: IngredientImage[];
  ritual: string;
  preparation: string[];
  presentationBox?: string;
  legacyPhrase: string;
  imageSensorial: string;
  imageShadow: string;
}

export interface Chapter {
  chapterId: string;
  chapterTitle: string;
  chapterDesc: string;
  chapterManifesto: string;
  chapterSpecs: string[];
  imageAbertura: string;
  formulas: Formula[];
}
