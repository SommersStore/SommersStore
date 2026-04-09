# E-book: Fidelidade Absoluta e Automação de Imagens

Este plano detalha como alcançaremos a cópia fiel do design premium `cofre-v2`, integrando a automação de imagens e a otimização de peso sem perda de percepção de qualidade.

## User Review Required

> [!IMPORTANT]
> **Qualidade vs Peso**: Implementarei uma rotina de compressão "Visual Lossless". Reduziremos o peso digital (metadados e excesso de DPI) mantendo a nitidez de luxo. Farei testes e apresentarei as opções de "Peso Final".
> **Automação de Imagens**: Criaremos um "Prompt Master" para o gerador de imagens para garantir que todas (Fundo, Fórmulas, Ingredientes) tenham a mesma estética (Luz, Sombras, Ângulo).

## Proposed Changes

### [Squad: Design & Visual] Replicagem 1:1
Garantir que o Viewer seja idêntico ao Master.

#### [MODIFY] [viewer/page.tsx](file:///C:/Users/ADMIN/.gemini/antigravity/scratch/SommersStore/projects/loja-digital/app/ebook/viewer/page.tsx)
- Reconstruir utilizando os componentes originais: `PageShell`, `FormulaSensorial`, `FormulaTechnical`, `FormulaIngredients`.
- Carregar o `styles.css` master do `cofre-v2`.

---

### [Squad: Engenhosidade] Motor de PDF Premium
Garantir a fidelidade absoluta no arquivo para download.

#### [NEW] [generate_v2.js](file:///C:/Users/ADMIN/.gemini/antigravity/scratch/SommersStore/projects/ebook-generator/generate_v2.js)
- Motor baseado em Puppeteer que renderiza a aplicação Next.js e gera o PDF.
- Algoritmo de compressão inteligente de ativos pós-renderização.

---

### [Squad: IA Assets] Automação de Imagens
Preparar o terreno para a substituição em massa.

#### [NEW] [scripts/image-squad-config.yaml](file:///C:/Users/ADMIN/.gemini/antigravity/scratch/SommersStore/scripts/image-squad-config.yaml)
- Definição dos perfis visuais (ex: "Dark Botanical Luxe").
- Prompts estruturados para os 3 tipos de imagem:
    - **Fundo**: Texturas abstratas e névoas.
    - **Fórmula**: O produto final em ambiente de spa/laboratório.
    - **Ingredientes**: Close-ups macro de cada insumo.

## Verification Plan

### Automated Tests
- Gerar um PDF de 60 páginas com as imagens atuais e medir o tempo de download.
- Validar se a rota `/ebook/viewer` é idêntica ao `/ebook/cofre-v2`.

### Manual Verification
- Inspeção visual do "Glow" e das fontes em dispositivos móveis (via browser do assistente).
