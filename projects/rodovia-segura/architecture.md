# Arquitetura - Rodovia Segura Operacional

## Decisao recomendada

Construir com Expo/React Native + Firebase.

Justificativa:

- React Native cria apps Android e iOS com uma base comum.
- Expo reduz atrito de camera, imagem, video, GPS e build mobile.
- Firebase atende bem o MVP: login, banco, storage, regras de seguranca e funcoes server-side.
- O dominio pede controle por usuario, regiao, posto e midia; Firebase Security Rules com Authentication e custom claims sao adequados para isso.

Referencias oficiais consultadas:

- React Native recomenda uso de framework para apps de producao: https://reactnative.dev/docs/environment-setup
- Expo Camera permite tirar fotos e gravar videos: https://docs.expo.dev/versions/latest/sdk/camera/
- Expo ImagePicker permite capturar/selecionar imagens e videos: https://docs.expo.dev/versions/latest/sdk/imagepicker/
- Expo Location cobre leitura de GPS: https://docs.expo.dev/versions/latest/sdk/location/
- Firebase orienta Auth + Firestore Security Rules para acesso por usuario e papel: https://firebase.google.com/docs/firestore/security/get-started
- Firebase Storage Security Rules controla acesso por arquivo, autenticacao, metadata e tamanho: https://firebase.google.com/docs/storage/security

## Componentes

### Mobile app

- Expo.
- React Native.
- TypeScript.
- Expo Router.
- Firebase JS SDK.
- Camera, ImagePicker e Location via Expo.
- Estado local leve para rascunhos pendentes.

### Backend serverless

- Firebase Authentication.
- Cloud Firestore.
- Firebase Storage.
- Cloud Functions para:
  - consolidar relatorios;
  - validar transicoes criticas;
  - gerar audit logs confiaveis;
  - enviar alertas push em fase 2.

### Admin

No MVP, admin pode ser uma area protegida do proprio app. Em fase 2, pode virar web console com React/Next.js.

## Modelo de dados

### `users`

Campos:

- `id`
- `displayName`
- `phone`
- `email`
- `role`
- `regionId`
- `postId`
- `teamId`
- `active`
- `createdAt`
- `updatedAt`

Roles:

- `admin`
- `leaderSupervisor`
- `regionalSupervisor`
- `supportSupervisor`
- `postGuard`
- `armedSecurity`
- `auditor`

### `regions`

- `id`
- `name`
- `active`

### `posts`

- `id`
- `code`
- `name`
- `regionId`
- `geo`
- `active`

### `teams`

- `id`
- `name`
- `shiftKind`
- `cycle`
- `coverage`

### `shiftTemplates`

- `id`
- `name`
- `startTime`
- `endTime`
- `durationHours`
- `scale`

### `shiftInstances`

- `id`
- `date`
- `templateId`
- `teamId`
- `regionIds`
- `status`

### `attendanceRecords`

- `id`
- `userId`
- `postId`
- `regionId`
- `teamId`
- `shiftInstanceId`
- `roleAtShift`
- `checkInAtDevice`
- `checkInAtServer`
- `checkInGeo`
- `checkInPhotoIds`
- `checkInNote`
- `checkOutAtDevice`
- `checkOutAtServer`
- `checkOutGeo`
- `checkOutPhotoIds`
- `checkOutNote`
- `status`
- `createdAt`
- `updatedAt`

### `mediaFiles`

- `id`
- `ownerUserId`
- `regionId`
- `postId`
- `attendanceRecordId`
- `occurrenceId`
- `storagePath`
- `type`
- `contentType`
- `sizeBytes`
- `capturedAt`
- `uploadedAt`
- `metadata`

### `occurrences`

- `id`
- `title`
- `description`
- `type`
- `severity`
- `regionId`
- `postId`
- `createdBy`
- `assignedTo`
- `mediaFileIds`
- `status`
- `createdAt`
- `updatedAt`
- `closedAt`

### `auditLogs`

- `id`
- `actorUserId`
- `action`
- `entityType`
- `entityId`
- `regionId`
- `postId`
- `createdAt`
- `before`
- `after`

## Regras de acesso

### Profissional de posto

Pode:

- Ler o proprio perfil.
- Ler o proprio posto.
- Criar check-in/check-out do proprio usuario no proprio posto.
- Criar ocorrencia no proprio posto.
- Ler historico permitido do proprio posto.

Nao pode:

- Ler outros postos.
- Ver relatorio regional.
- Alterar escala.
- Excluir evidencia.

### Supervisor regional e apoio

Pode:

- Ler usuarios, postos, check-ins, midias e ocorrencias da propria regiao.
- Atualizar status de ocorrencias da propria regiao.
- Gerar relatorios da propria regiao.

Nao pode:

- Ler outra regiao.
- Alterar configuracoes criticas, salvo permissao parametrizada.

### Supervisor lider

Pode:

- Ler Norte e Leste.
- Acompanhar todos os postos.
- Alterar status operacional de ocorrencias.
- Gerar relatorios gerais.

### Admin

Pode:

- Gerenciar usuarios, postos, regioes, equipes e turnos.
- Ajustar regras de obrigatoriedade.
- Consultar auditoria.

## Storage paths

Padrao recomendado:

```text
regions/{regionId}/posts/{postId}/attendance/{attendanceRecordId}/{mediaId}.jpg
regions/{regionId}/posts/{postId}/occurrences/{occurrenceId}/{mediaId}.jpg
regions/{regionId}/posts/{postId}/occurrences/{occurrenceId}/{mediaId}.mp4
```

As regras devem validar:

- usuario autenticado;
- cargo;
- escopo de regiao/posto;
- `contentType`;
- tamanho maximo;
- metadata obrigatoria.

## Fluxo de check-in

1. App carrega turno atual do usuario.
2. Usuario toca em `Entrada`.
3. App captura GPS, quando permitido.
4. Usuario tira no minimo 2 fotos.
5. App grava midias no Storage.
6. App cria `attendanceRecord`.
7. Cloud Function grava `auditLogs`.
8. Dashboard do supervisor atualiza pendencias.

## Fluxo de ocorrencia

1. Usuario seleciona `Nova ocorrencia`.
2. Informa tipo, gravidade e descricao.
3. Anexa fotos e, se habilitado, video curto.
4. App cria `occurrence`.
5. Supervisores do escopo visualizam.
6. Alteracoes de status geram auditoria.

## Estrutura de pastas sugerida para o app Expo

```text
rodovia-segura-mobile/
  app/
    (auth)/
    (post)/
    (supervisor)/
    (admin)/
  src/
    components/
    features/
      attendance/
      occurrences/
      reports/
      users/
    firebase/
    navigation/
    permissions/
    theme/
    utils/
  firebase/
    firestore.rules
    storage.rules
    functions/
  tests/
```

## Ordem de construcao

1. Criar app Expo TypeScript.
2. Configurar Firebase.
3. Implementar seed local e colecoes basicas.
4. Implementar Auth e roteamento por role.
5. Implementar check-in com fotos.
6. Implementar check-out.
7. Implementar ocorrencias.
8. Implementar dashboards de supervisao.
9. Implementar relatorios.
10. Endurecer Security Rules e testes.

