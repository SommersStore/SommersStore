# Convenções Técnicas - SommersStore

Diretrizes para o @dex (Dev) e @aria (Architect) manterem o código limpo e padronizado.

## 1. Tecnologias Core
- **Frontend**: HTML5, Vanilla JavaScript, Vanilla CSS.
- **Frameworks (se solicitado)**: Next.js + Tailwind CSS.
- **Hospedagem**: Firebase Hosting.

## 2. Padrões de Nomenclatura
- **Arquivos**: `kebab-case.js` ou `kebab-case.css`.
- **Classes CSS**: `BEM` (Block Element Modifier) ou utilitários Tailwind.
- **Variáveis JS**: `camelCase`.

## 3. Estrutura de Pastas de Componentes
- Cada componente deve ter seu próprio diretório com `index.html` (ou `.js`), `style.css` e, se necessário, `test.js`.

## 4. Prioridades de Design
- **Estética Premium**: Use cores HSL coordenadas, gradientes suaves e micro-animações.
- **Performance**: Otimização de imagens e carregamento crítico de CSS são mandatórios.
