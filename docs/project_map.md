# Arquitetura do Projeto - Sommers Store

Este documento centraliza a visão arquitetural do projeto de Lançamento (Sais de Banho) e a estrutura recomendada de pastas para futuros produtos.

## 1. Mapa de Agentes e Funil de Vendas (Squad)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#059669', 'edgeLabelBackground':'#ecfdf5', 'tertiaryColor': '#fcf9f6'}}}%%
graph TD
    %% Título Superior / Ponto de Entrada
    Traffic(("Início do Funil<br/>(Tráfego / Ads)"))

    %% Subgráfico Central: A "Máquina" (Squad)
    subgraph SquadSais["SQUAD: Lançamento Sais de Banho"]
        style SquadSais fill:#fcf9f6,stroke:#059669,stroke-width:2px,rx:10
        
        %% Agentes e suas ferramentas
        PM["Agente: @pm<br/>Organiza o cronograma"]
        
        Copy["Agente: @copywriter<br/>Skill: Escrita Persuasiva<br/>Task: Roteiro VSL / Anúncios"]
        
        Designer["Agente: @ux-design-expert<br/>Skill: Figma / Cores Premium<br/>Task: Identidade 'V3 Light'"]
        
        Dev["Agente: @dev<br/>Skill: React / Next.js<br/>Task: Página V3 / VSL.html / Delay"]
        
        Tech["Agente: @architect<br/>Skill: Firebase / DNS<br/>Task: Deploy e Redirecionamento"]
    end

    %% Arquitetura das Páginas (Resultado Técnico)
    subgraph Frontend["Infraestrutura de Páginas (Frontend)"]
        style Frontend fill:#f8fafc,stroke:#94a3b8
        
        P_Sais["v3/light.html<br/>(Página Master da Elisa)"]
        P_VSL["vsl/page.tsx<br/>(Apresentação com Delay)"]
        P_Check["Checkout<br/>(Kiwify - Venda Externa)"]
    end

    %% O Fluxo (Como as coisas conversam)
    Traffic -->|Anúncio leva para a VSL| P_VSL
    
    %% Como a Squad constrói o Frontend
    PM -.->|Gerencia| Copy
    PM -.->|Gerencia| Designer
    Copy ==>|Entrega o texto (vsl_script.md)| Dev
    Designer ==>|Entrega o Design (CSS, Imagem)| Dev
    Dev ==>|Constrói a Página| P_VSL
    Dev ==>|Constrói a Página| P_Sais
    Tech ==>|Publica no Firebase| P_VSL
    Tech ==>|Publica no Firebase| P_Sais

    %% O Caminho Final do Usuário
    P_VSL -->|Botão aparece em 2m15s| P_Check
    P_Sais -->|Botão Imediato| P_Check
```

---

## 2. Estrutura do Repositório (Monorepo Next.js + Firebase)

Para não misturar diferentes produtos (Velas, Jardim, Sais), usamos a estrutura de sub-rotas no Next.js (`web/app/sales/`). O design base (Header, Footer, CSS, Fontes) é compartilhado, reduzindo 80% do trabalho em novos projetos.

```text
SommersStore/
 ├── .aiox-core/           # Diretrizes de Agentes e Customizações (AIOX)
 ├── firebase.json         # Direcionamento de Rotas ("Guarda de trânsito")
 │
 ├── web/app/              # Aplicação Frontend (Next.js)
 │    │
 │    ├── sales/           # Ponto central para páginas de venda
 │    │    ├── v3/light/   # (Ativo) Projeto Principal dos Sais de Banho
 │    │    ├── vsl/        # (Ativo) Landing Page VSL da Elisa Clark
 │    │    │
 │    │    ├── velas/      # (Futuro) Projeto Velas Aromáticas
 │    │    │   └── page.tsx
 │    │    │
 │    │    └── jardim/     # (Futuro) Projeto Jardim Artesanal
 │    │        └── page.tsx
 │    │
 │    └── globals.css      # Sistema de Design (Cores Pálidas, Verde Esmeralda)
 │
 └── docs/                 # Documentação Oficial da Squad e Projetos
      ├── project_map.md   # [ESTE ARQUIVO] Mapa da Arquitetura Visual
      └── stories/         # Histórico para o Agente @pm
           ├── ep-sais.md  # Checklist do Projeto "Sais de Banho"
           └── ep-velas.md # Checklist Futurdo "Velas Aromáticas"
```
