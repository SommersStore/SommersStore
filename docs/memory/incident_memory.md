# 🚨 Memória de Incidentes e Resolvidos (Incident Memory)

## Incidente: A Perca de Memória dos Agentes V1 (Resolvido)
**Data:** Constatado em meados de 2026-04-13.
**Sintoma:** Agentes deixavam projetos inacabados por conta de fugas de contexto da Engine principal. O Scribe listava "LOCKED ASSETS" que não entravam em harmonia com a lógica do painel.
**Resolução:** Limpeza da pasta `docs/memory/`, expurgo dos .md obsoletos e reintrodução de 9 matrizes canônicas. Atribuição de um Time Dedicado (Squad `SQD-MEM`) atuando direto nas regras mestras de boot (`AGENTS.md`).

## Incidente: O Bug da Edição em Branco do Painel (Resolvido)
**Sintoma:** Na arquitetura velha, os squads e skills abriam uma aba de edição, mas após um refactoring as abas ficaram "em branco", inutilizando a leitura dos arquivos de agentes.
**Resolução:** Restauramos o Handler Javascript clicável que lê nativamente de `.codex/agents/*.md` e abre um editor dinâmico via API. Funcionalidade testada, comprovada e aprovada pelo CEO.
