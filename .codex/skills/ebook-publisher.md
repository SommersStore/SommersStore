# AIOX Skill: Ebook Publisher (Manual de Estilo OTO)

Esta skill governa as regras rígidas de diagramação e tipografia para qualquer material em PDF gerado pelo ecossistema SommersStore.

## 1. LEIS DA TIPOGRAFIA (FORMATO A4)
- **Títulos de Abertura:** `Playfair Display`, `32pt a 40pt`, Cor: `#C5A059` (Gold).
- **Corpo de Texto (Páginas Técnicas):** `Inter` ou `Playfair Display`, **Mínimo 12pt a 13pt**.
- **Regra de Ouro:** NUNCA reduza o `font-size` para "fazer caber" um texto longo. Se o texto exceder a página, ele DEVE quebrar para a próxima folha (Pagination) ou o design deve ser adaptado para 4 páginas.

## 2. REGRAS DE LAYOUT (ELITE)
- **Margens:** Zero margem para imagens de fundo (Bleed) e 25mm de margem de segurança para textos.
- **Sumário (TOC):** Obrigatório em 2 páginas se houver mais de 8 fórmulas. Deve conter o tracejado dinâmico (`table dotted border-bottom`).
- **Capas Temporais:** Páginas 01 e 02 devem ser exclusivas para Capa e Introdução (A Alquimia da Elisa).

## 3. LÓGICA DE PAGINAÇÃO (ESTRATÉGIA)
- **Fórmulas Curtas (2 Páginas):** 
   - [PAG A] Imagem Sensorial + Título + Assinatura Intelectual.
   - [PAG B] Técnica (Ingredientes + Modo de Preparo + Cuidados). Dividida em colunas.
- **Fórmulas Longas (4 Páginas):**
   - [PAG A] Painel Sensorial (Full Screen).
   - [PAG B] Os Elementos Botânicos (Ingredientes listados com respiro).
   - [PAG C] O Ritual de Integração (Protocolo e Uso explicados densamente).
   - [PAG D] O Box de Cuidado Clínico (Isolado e Proeminente).

## 4. COMANDO DE SEGURANÇA
O @dev (Dex) ou Antigravity deve carregar este arquivo e injetar as propriedades no `generate.js`. Qualquer falha visual em PDF deve ser reportada ao @qa (Quinn) com referência direta a esta Skill.

---
**Document Status:** Approved V3 (Master Typography)
**References:** [Design Systems/Zen Dark V3](file:///C:/Users/ADMIN/SommersStore/knowledge/branding/design_systems/zen-dark-v3.json)
