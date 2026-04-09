# MASTER BLUEPRINT — SommersStore 💎

Este é o documento de referência definitivo para o projeto. Ele deve ser atualizado periodicamente para refletir o estado real e as decisões estratégicas.

---

## 🏗️ 1. Arquitetura e Estrutura

| Componente | Tecnologia | Localização | Status |
|------------|------------|------------|--------|
| **Loja Digital** | Next.js 16 (Turbopack) | `projects/loja-digital/` | 🟢 Funcional / Dev Server porta 3000 |
| **Painel (Tower)** | Node.js (Express-like) | `scripts/dashboard_server.js` | 🟢 Funcional / Porta 4000 |
| **Gerador E-book** | Puppeteer / React-Render | `projects/ebook-generator/` | 🔵 Em Reconstrução 1:1 |
| **Infra Cloud** | Firebase Hosting | `sommersstore-c6c23` | 🟢 Online |
| **Scripts Utility** | Python / JS | `scripts/` e `tests/` | 🟢 Organizados |


---

## 📍 2. Estado Atual das Frentes

### 🛒 Loja Digital (Storefront)
- **Páginas Ativas:** `/sais` (vendas), `/sais/vsl`, `/ebook/cofre-v2`.
- **Hospedagem:** Firebase Hosting aponta para `projects/loja-digital/out_deploy`.
- **Build:** `npm run build` gera exportação estática.

### 📔 Produção Editorial (E-book)
- **O Cofre das Botânicas Secretas**: Reconstrução total para fidelidade 1:1 entre Web e PDF.
- **Decisão Estratégica**: O PDF será gerado via Puppeteer a partir do visualizador Next.js para garantir que cada pixel de sombra e cada fonte sejam idênticos.
- **Automação**: Preparando o Image Squad para geração modular de ativos de luxo.


---

## 🎯 3. Decisões e Diretrizes Ativas

- **Single Source of Truth**: Este arquivo é a bússola do projeto. Arquivos antigos ficam em `docs/history/`.
- **Estratégia de Contexto**: Protocolo de Checkpoint (Verde/Amarelo/Vermelho) para evitar travamentos da IA.
- **Princípio de Franqueza**: A IA deve discordar e propor soluções melhores, priorizando a integridade técnica.
- **Localização de Trabalho**: Sempre operar na raiz `SommersStore` e delegar para subpastas conforme necessário.

---

## 🛠️ 4. Comandos Essenciais

- **Iniciar Painel**: `.\start_painel.bat`
- **Ver Loja (Dev)**: `cd projects/loja-digital; npm run dev`
- **Deploy Loja**: `firebase deploy` (após build)
- **Gerar E-book**: `node projects/ebook-generator/generate.js`

---

## 📂 5. Mapa de Diretórios Relevante
- `docs/external-specs/`: Local para arquivos `.md` vindos de outras IAs (GPT/Grok).
- `docs/history/`: Local para registros antigos e histórico de progresso.
- `archive/`: Lixeira técnica e arquivos de transição.

---

*Última Atualização: 08/04/2026*
