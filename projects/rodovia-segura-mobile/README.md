# Rodovia Segura Mobile

Expo/React Native MVP para operar o projeto `Rodovia Segura Operacional`.

## Escopo implementado

- Login demonstrativo por cargo.
- Seed local com 2 regioes, 12 postos, cargos, equipes e turnos.
- Escopo por cargo: posto, regiao ou visao global.
- Check-in com minimo de 2 fotos.
- Check-out com observacao final.
- Ocorrencias com gravidade, tipo, descricao e evidencias.
- Dashboard regional/lider/admin com cobertura e pendencias.
- Fronteira Firebase sem chaves hardcoded.

## Scripts

```bash
npm install
npm run web
npm run test:domain
```

## Firebase

O app roda em `demo-local` enquanto as variaveis abaixo nao forem configuradas:

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

Quando todas existirem, `src/services/firebase.ts` inicializa Auth, Firestore e Storage.
