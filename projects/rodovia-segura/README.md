# Rodovia Segura Operacional

Aplicativo mobile para controle operacional de seguranca em rodovia com 12 postos, duas regioes, escalas 12x36, evidencias por foto/video, ocorrencias, supervisao por hierarquia e auditoria.

## Missao

Construir um app simples, confiavel e rapido de operar em campo, onde cada profissional registre entrada, saida, evidencias do posto e ocorrencias do turno, enquanto supervisores enxergam apenas o escopo permitido pelo proprio cargo.

## Escopo operacional inicial

- 12 postos operacionais.
- 2 regioes canonicas: Norte e Leste.
- Por posto: 4 vigilantes e 4 segurancas armados em escala 12x36.
- Por turno ativo em cada posto: 1 vigilante e 1 seguranca armado.
- Supervisao: 4 lideres, 8 regionais e 8 apoios.
- Total previsto: 116 pessoas.
- Total por turno ativo: 29 pessoas.
- Equipes iniciais: Alfa, Bravo, Charlie e Delta.

## Recomendacao tecnica

A melhor rota para construir no Antigravity e um app Expo/React Native com Firebase:

- Expo/React Native para Android e iOS com uma base unica.
- Firebase Authentication para login.
- Cloud Firestore para registros operacionais e relatorios.
- Firebase Storage para fotos e videos.
- Firebase Security Rules com custom claims para permissao por cargo, regiao e posto.
- Cloud Functions apenas quando precisar consolidar relatorios, alertas ou auditoria server-side.

PWA puro nao e a melhor opcao para o app principal porque camera, video, GPS, operacao em campo e confiabilidade mobile ficam mais consistentes em app nativo/hibrido.

## Artefatos deste pacote

- `brief.md` - briefing estruturado a partir do texto do usuario.
- `prd.md` - requisitos de produto, MVP, fases e criterios de aceite.
- `architecture.md` - arquitetura recomendada, modelo de dados, permissoes e seguranca.
- `mobile_ux.md` - fluxos de tela e direcao visual minimalista.
- `data/seed_config.json` - configuracao inicial de regioes, postos, cargos, equipes e turnos.
- `prompts/antigravity_master_prompt.md` - prompt mestre para iniciar a construcao no Antigravity.

## Como construir no Antigravity

1. Abra o prompt mestre em `prompts/antigravity_master_prompt.md`.
2. Mande o Antigravity criar um projeto Expo com TypeScript.
3. Implemente primeiro login, perfis, seed e navegacao por cargo.
4. Em seguida implemente check-in/check-out com fotos obrigatorias.
5. Depois implemente ocorrencias, painel de supervisao e relatorios.
6. So libere piloto depois de testar permissoes por cargo, posto e regiao.

## Guardrails

- O profissional de posto ve somente o proprio posto e os proprios registros.
- Supervisor regional e apoio veem apenas sua regiao.
- Supervisor lider e admin veem Norte e Leste.
- Midias devem ter controle de acesso por Storage Rules, nunca link publico aberto por padrao.
- Auditoria deve registrar quem criou, alterou, aprovou ou visualizou item sensivel.
- LGPD: coletar somente o necessario para operacao, com retencao e acesso justificados.

