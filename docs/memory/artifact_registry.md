# 📁 Registro de Artefatos Vitais (Artifact Registry)

Este diretório lista os pilares de código que constituem o ambiente atual:

## O Core do Painel (Control Fabric)
- `docs/aiox_dashboard.html`: Front-end principal. Responsável por UI/UX, gráficos em tempo real e abertura dos Modais de visualização/edição das regras `.md`.
- `scripts/dashboard_server.js`: Back-end Node. Trabalha servindo arquivos JSON usando 18 APIs REST.

## Database do Painel (O Cofre de Controle)
Localizado em `docs/control/`, possui 11 arquivos oficiais que representam a fonte da verdade da aplicação:
- `registry.json`: Os 27 agentes, suas cores, atributos e squads.
- `alerts.json`, `approvals.json`, `build_state.json`: Mantêm o estado das nodes na tela Master do UI.
- `context_snapshots.json`, `execution_log.json`: Ferramentas imutáveis de log para auditoria de tudo que a IA modifica.

## Biblioteca de Agentes e Skills
- Agentes: `\SommersStore\.codex\agents\*.md` (Onde reside a matriz YAML com prompts operacionais e limitações reais de personalidade de cada Agente).
- Skills: `\SommersStore\.codex\skills\*.md` (Como fazer tarefas - tutoriais canônicos do sistema).
