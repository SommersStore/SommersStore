# AIOX Skill: PREMIUM EBOOK LAYOUT ENGINE (A4-STRICT)

## 1. Physical Constraints (Non-Negotiable)
- **Format**: International A4 (210mm x 297mm).
- **Behavior**: Every page is a flex-column container.
- **Overflow**: `overflow: hidden` is MANDATORY. No page may scroll.
- **Background**: Solid `#050508` (Obsidian Black).
- **Margins**: Safety margin of 10mm around all logical content.

## 2. Typography Manifesto (The Hierarchy)
- **Primary Serif**: 'Libre Baskerville', serif.
- **Secondary Sans**: 'Montserrat', sans-serif.
- **H1 (Volume Title)**: 84px, color: #C5A059, italic, letter-spacing: -0.05em.
- **H2 (Formula Name)**: 42px, color: #F5F5DC, serif.
- **Labels (Technical)**: 9px, color: #C5A059, Montserrat Bold, tracking: 0.5em, uppercase.
- **Body Text**: 14px, color: #F5F5DC, 1.8 line-height, Libre Baskerville.

## 3. Structural Immutability
- **The Frame**: Every page MUST have a footer (Page Number + Brand Signature) at the absolute bottom.
- **Footer Position**: `bottom: 3rem`, `left: 3rem`, `right: 3rem`. Use `absolute` positioning within the `page-a4` relative parent.
- **Component Grid**: Ingredient grid blocks MUST have a fixed height calculation. Never allow `grid-auto-flow` to expand the page.
- **Page Breaks**: `@media print { page-break-after: always; }`.

## 4. Operational Instructions for Agentes
- **@architect**: Before generating components, verify against `styles.css` token map.
- **@ux-design-expert**: Reject any design that uses border-radius > 0px or drop-shadows (only subtle inner glows allowed).
- **@qa**: Final check MUST use 'Inspect Element' (A4 Viewport) to ensure 0px overflow.
