# Prompt Mestre para Antigravity - Rodovia Segura Operacional

Voce deve construir um aplicativo mobile chamado `Rodovia Segura Operacional`.

Use os arquivos deste pacote como fonte de verdade:

- `projects/rodovia-segura/brief.md`
- `projects/rodovia-segura/prd.md`
- `projects/rodovia-segura/architecture.md`
- `projects/rodovia-segura/mobile_ux.md`
- `projects/rodovia-segura/data/seed_config.json`

## Stack obrigatoria para o MVP

- Expo + React Native.
- TypeScript.
- Expo Router.
- Firebase Authentication.
- Cloud Firestore.
- Firebase Storage.
- Firebase Security Rules.
- Expo Camera ou Expo ImagePicker para fotos/videos.
- Expo Location para GPS.

## O que construir primeiro

1. Criar app Expo TypeScript.
2. Criar tema visual minimalista escuro conforme `mobile_ux.md`.
3. Criar Firebase config isolada por ambiente.
4. Criar modelo de permissoes por role:
   - admin
   - leaderSupervisor
   - regionalSupervisor
   - supportSupervisor
   - postGuard
   - armedSecurity
   - auditor
5. Criar seed inicial com:
   - 2 regioes: Norte e Leste.
   - 12 postos.
   - 4 equipes: Alfa, Bravo, Charlie e Delta.
   - turnos 06:00-18:00 e 18:00-06:00.
6. Criar login e roteamento por cargo.
7. Criar tela do profissional de posto.
8. Criar check-in com no minimo 2 fotos.
9. Criar check-out.
10. Criar ocorrencias com foto e video opcional.
11. Criar dashboard regional.
12. Criar dashboard lider.
13. Criar admin basico para usuarios, postos, equipes e turnos.

## Regras criticas

- O usuario de posto so pode ver e operar o proprio posto.
- Supervisor regional e supervisor de apoio so podem ver a propria regiao.
- Supervisor lider e admin podem ver as duas regioes.
- Auditor e somente leitura e deve ser parametrizavel.
- Registro so e valido quando tiver horario confirmado no servidor.
- Check-in exige no minimo 2 fotos.
- Cada foto/video deve ficar vinculado a usuario, posto, regiao, turno e registro.
- Nunca usar links publicos abertos para midias operacionais.
- Toda alteracao relevante deve gerar audit log.

## UX

- App de campo, sem enfeite.
- Botoes grandes.
- Poucos passos.
- Alto contraste.
- Sem tabelas largas no celular.
- Status por cor:
  - azul: aguardando entrada;
  - verde: em servico;
  - amarelo: pendencia/atraso;
  - vermelho: ocorrencia critica;
  - cinza: encerrado.

## Entrega esperada da primeira versao

- O app roda localmente no Expo.
- Login simulado ou Firebase Auth funcional.
- Seed carrega 12 postos e 2 regioes.
- Profissional de posto registra entrada com 2 fotos.
- Profissional de posto registra saida.
- Profissional de posto cria ocorrencia com foto.
- Supervisor regional ve somente sua regiao.
- Supervisor lider ve tudo.
- Security Rules iniciais existem e estao documentadas.
- README do app explica como rodar.

## Nao construir ainda

- Reconhecimento facial.
- IA de imagem.
- Integracao CFTV.
- PWA como solucao principal.
- Dashboard web separado, a menos que o MVP mobile ja esteja funcional.

