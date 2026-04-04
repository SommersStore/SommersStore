# SKILLS: Anatomia Ponto-a-Ponto das Páginas

> Extraído do código real do `cofre-v2`. Cada detalhe aqui é LEI.
> Nenhum agente pode alterar esses parâmetros sem aprovação do QA Gate.

---

## SKILL 0: PageShell (O DNA de TODA Página)

Toda página do e-book HERDA esta estrutura. É o "útero" imutável.

| Elemento | Especificação Exata |
|---|---|
| **Container** | `.page-a4` — 210mm × 297mm, `overflow: hidden` |
| **Padding** | `px-16 pt-12 pb-8` (laterais 64px, topo 48px, base 32px) |
| **Flex** | `flex flex-col relative` |
| **Border** | `border border-neutral-900/50` |
| **Background** | `#050508` (Obsidian) |

### Rodapé Imutável (Footer Stamp)
| Propriedade | Valor |
|---|---|
| **Posição** | `absolute bottom-12 left-16 right-16` |
| **Borda superior** | `pt-4 border-t border-neutral-900/50` |
| **Layout** | `flex justify-between z-20` |
| **Texto esquerdo** | `THE BLACK PROTOCOL // DELUXE MASTER EDITION.` |
| **Estilo esquerdo** | `.technical-label text-[10px] text-neutral-700 font-bold tracking-widest uppercase` |
| **Texto direito** | `PAG. {pageNum}` |
| **Estilo direito** | `.accent-red font-bold text-[10px] uppercase tracking-widest` |
| **Cor accent-red** | `#8B0000` |

---

## SKILL 0.1: PÁGINAS INICIAIS (P01 a P05) - PREÂMBULO E REGRAS

Estas páginas servem para apresentar o manifesto, regras e mecânicas estruturais. Elas possuem características padronizadas que diferem da capa ou das páginas de fórmula.

### Padronização Visual (Tom 70)
- **TODOS os textos brancos ou cinzas** (parágrafos, aspas, listas) devem ser `text-[#F5F5DC]/70`.
- É **terminantemente proibido** usar `text-white`, `text-neutral-300` ou afins.
- O dourado principal se mantém `text-[#C5A059]`.

### Padronização de Sombras do Fundo (Vinheta de Contraste)
Todas as imagens de background devem possuir DUAS camadas absolutas de gradiente para garantir que o Tom 70 seja legível:
```tsx
<div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] opacity-90" />
<div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508] opacity-80" />
```
**Nota:** Efeitos de vidro embaçado (`backdrop-blur-md`) NÃO devem ser usados em caixas inteiras, elas devem exibir a textura natural atrás.

### Padronização do 'Technical Label' Superior
Os subtítulos pequenos dourados que ficam sobre títulos principais devem ser **padronizados como**:
`className="technical-label text-[12px] text-[#C5A059] tracking-[1.2em] font-bold uppercase"`

---

## SKILL 1: FormulaSensorial (Página de Assinatura Visual)

A página "heróica" de cada fórmula. Imagem full-bleed + título gigante.

### Camada 0: Background
- Imagem HD `item.imageSensorial` cobrindo `inset-0` via `object-cover`
- Opacidade: `opacity-50`
- Filtro: `.image-pop` (brightness 1.1, contrast 1.1)
- Gradiente overlay: `from-[#050508] via-[#050508]/10 to-[#050508]/30`

### Camada 1: Conteúdo Principal (z-10, alinhado ao `mt-auto`)
| Elemento | Tamanho | Font | Cor | Extras |
|---|---|---|---|---|
| **Título** | `text-[82px]` | Libre Baskerville italic | `#C5A059` | `leading-[0.95] tracking-tight` |
| **Tarja Label** | `text-[12px]` | Montserrat bold | `#C5A059` | `tracking-[0.5em]`, borda esquerda 2px vermelha |
| **Sub-label** | `text-[9px]` | Montserrat bold | `neutral-400` | `tracking-[0.3em]` |
| **Frase Signature** | `text-2xl` | Libre Baskerville italic | `#F5F5DC/90` | Entre aspas |

### Camada 2: Box Experiência Sensorial (lado direito)
- Container: `border-l border-neutral-800 p-8 bg-[#050508]/30 backdrop-blur-sm`
- Label: `text-[10px]` Montserrat, `#C5A059`, tracking `0.3em`, "O Arquétipo Sensorial Absoluto"
- Corpo: `text-[16px]` Libre Baskerville italic, `neutral-400`, `text-justify`

### Camada 3: Tag Vertical (canto superior direito)
- Box: `[writing-mode:vertical-rl]`, borda top 2px vermelha
- Texto: `LEGACY PROTOCOL – {id}`, `text-[10px]` Montserrat, `#C5A059`

---

## SKILL 2: FormulaTechnical (Página de Dados do Ritual)

A página com ingredientes + modo de preparo + frase legado.

### Layout Principal
- Grid 2 colunas: `grid grid-cols-2 gap-8` (ou `gap-6` em páginas densas)
- Borda esquerda decorativa: `border-l-2 border-red-800/40 pl-6`

### Coluna Esquerda: Insumos Elite
| Elemento | Especificação |
|---|---|
| **Título seção** | `title-gold font-bold text-lg uppercase tracking-widest` |
| **Bullet dourado** | `w-2 h-2 bg-red-800 rounded-full` antes do título |
| **Lista ingredientes** | `text-[18px] space-y-4 font-serif italic text-neutral-300` |
| **Numeração** | `text-[11px] text-red-800 font-bold uppercase tracking-tighter` |
| **Separador** | `border-b border-neutral-900 pb-3` em cada item |

### Coluna Direita: Protocolo + Preparo
| Elemento | Especificação |
|---|---|
| **Ritual text** | `text-[16px] leading-relaxed text-neutral-200 font-serif italic text-justify` |
| **Label "Modo de Preparo"** | `.technical-label text-[12px] text-[#C5A059] font-bold` |
| **Passos** | `font-serif italic text-[16px] text-neutral-400` (15.5px em densas) |
| **Numeração passos** | `text-red-800 font-bold shrink-0` |

### Box "Apresentação Luxury"
- Container: `border-l-2 border-red-800 bg-red-800/5 p-5` (p-4 em densas)
- Label: `.technical-label text-[11px] text-[#C5A059]`
- Corpo: `text-[15px] text-neutral-400 italic leading-snug text-justify` (13.5px em densas)

### Frase Legado (citação centralizada)
- Container: `text-center border-y border-neutral-900/50 py-6` (py-4 em densas)
- Texto: `title-gold font-serif italic text-[26px]` (text-xl se >150 chars)

### Shadow Flow (imagem decorativa esquerda)
- Container: `absolute bottom-0 left-0 w-[65%] h-[70%]` 
- Img: `opacity-0.36 brightness-1.45 contrast-1.1 saturate-0.7`
- Máscara: gradiente para direita e para cima em `#050508`

### Regra de Páginas Densas
IDs `07, 08, 09, 11, 16` ativam modo compacto:
- `gap-6` ao invés de `gap-8`
- `mb-12` ao invés de `mb-16`
- Font de preparo `15.5px` ao invés de `16px`
- Padding luxury box `p-4` ao invés de `p-5`
- Citação `py-4` ao invés de `py-6`

---

## SKILL 3: FormulaIngredients (Página da Grade Visual)

Grid 3×N com fotos dos ingredientes individuais.

### Header
| Elemento | Especificação |
|---|---|
| **Tarja** | `border-l-4 border-l-red-800`, backdrop blur |
| **Label tarja** | `text-[11px] Montserrat #C5A059 tracking-[0.6em]` "COMPOSIÇÃO VISUAL – F{id}" |
| **Título** | `title-gold text-4xl italic leading-tight tracking-tight` |
| **Sub-info** | `text-[10px] neutral-500 tracking-[0.4em]` "{origin} • {N} INSUMOS SELECIONADOS" |
| **Linha decorativa** | `w-16 h-px bg-red-800/60 mt-4` |

### Grid de Ingredientes
- Layout: `.ingredient-grid` = `grid-template-columns: repeat(3, 1fr); gap: 16px`
- Card: `.ingredient-card` = `bg rgba(197,160,89,0.03), border 1px rgba(197,160,89,0.12), p-12px`
- Imagem: `aspect-ratio: 1`, `object-cover brightness-90 contrast-110`
- Fallback erro: `opacity: 0` (mantém quadro escuro)
- Tag: `INS_0{i+1}` em `text-[9px] text-red-800 font-bold` no canto superior esquerdo
- Nome: `.ingredient-name` = `Libre Baskerville italic 11px #F5F5DC opacity-0.9`
- Quantidade: `.ingredient-qty` = `Montserrat 9px #C5A059 bold tracking-0.15em uppercase`

### Box de Qualidade (acima do rodapé)
- Container: `bg-[#C5A059]/5 border-l-2 border-red-800/30 p-4`
- Texto: `font-serif text-[11px] italic text-neutral-500 leading-relaxed`

---

## SKILL 4: ChapterOpener (Abertura de Capítulo)

Página de transição entre capítulos. Sensação cinematográfica.

### Background
- Imagem: `grayscale opacity-30 object-center object-cover scale-110`
- Gradiente: `from-[#050508] via-transparent to-[#050508]`

### Tarja do Capítulo
- Estilo: `border-l-4 border-l-red-800`, backdrop blur, sombra
- Texto: `Capítulo — {id}` em `text-[12px] Montserrat #C5A059 tracking-[0.8em]`

### Título do Capítulo
- Font: `title-gold text-[82px] leading-[0.9] italic tracking-tighter`
- Cascata: cada linha com `ml-12`, `ml-24` progressivo (efeito escada)

### Citação descritiva
- Font: `font-serif text-[24px] leading-snug text-[#F5F5DC]/90 italic max-w-xl`
- Entre aspas

### Grid inferior 2 colunas
| Coluna | Conteúdo |
|---|---|
| **Esquerda** | Box Manifesto: `bg-[#050508]/40 border border-[#C5A059]/10 p-10 backdrop-blur-md text-center` |
| **Esquerda label** | `text-[10px] Montserrat #C5A059 tracking-[0.4em]` |
| **Esquerda corpo** | `font-serif text-[18px] italic text-neutral-300 text-justify` |
| **Direita** | Lista de specs com bullets `w-2 h-2 bg-red-800 rounded-full shadow-glow` |
| **Direita items** | `font-serif italic text-[18px] text-neutral-400` com `border-b border-neutral-900` |

---

## Regras Globais para TODOS os Agentes

1. **NUNCA** alterar o tamanho de 210mm × 297mm
2. **NUNCA** remover `overflow: hidden`
3. **NUNCA** mudar as fontes (Libre Baskerville + Montserrat)
4. **NUNCA** usar `min-height` no `.page-a4` — só `height: 297mm`
5. **NUNCA** usar cores fora da paleta: `#050508, #C5A059, #F5F5DC, #8B0000, neutral-*`
6. **O rodapé SEMPRE fica na posição `absolute bottom-12`**
7. **Páginas densas** devem comprimir fontes (não expandir a página)
8. **Imagens quebradas** devem virar um quadro escuro (nunca ícone de erro)
