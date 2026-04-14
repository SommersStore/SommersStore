# ⚖️ Memória de Decisões Arquiteturais (Decision Memory)

## Decisão Crítica: A Criação do THE CONTROL FABRIC
**Data:** 2026-04-13 / 2026-04-14
**Motivador:** A complexidade assíncrona dos agentes estava causando lapsos de memória, arquivos abandonados e ciclos incompletos.
**Decisão:** Congelar desenvolvimento de features de conteúdo e front-end comercial para criar o Painel Anti-Gravity (`localhost:4000`).

## Decisão Crítica: Fragmentação de Agentes
**Motivador:** Encontro de 26-27 agentes espalhados entre `.codex/` e `.aiox-core/`, com funções inteiramente sobrepostas (ex: ux-optimizer x ux-design-expert).
**Decisão:** Não expandir a teia desnecessariamente. Consolidou-se os 6 agentes extras na aba *LEGACY & EXTRA* para limpar o escopo. 

## Decisão Crítica: Protocolo de Hidratação de Sessão
**Motivador:** Risco de amnésia ao abrir novas janelas de terminal ou trocar de IDE.
**Decisão:** Criação de diretriz obrigatória dentro de `AGENTS.md`. Nenhuma IA atinge a base de código do usuário sem antes ler este próprio repositório de memória (`docs/memory/`) liderada por "Oracle" e salvar seu estado guiada por "Scribe".
