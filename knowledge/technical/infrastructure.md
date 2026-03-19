# Mapa de Infraestrutura - SommersStore

Documento para o @devops e @dex entenderem o ambiente de execução.

## 1. Firebase Hosting
- **Projeto**: `sommers-store` (ou conforme `.firebaserc`).
- **Configuração**: `firebase.json` define os redirecionamentos e cabeçalhos.
- **Domínio Principal**: [sommersstore.web.app](https://sommersstore.web.app)

## 2. CI/CD (GitHub Actions)
- **Workflow**: Localizado em `.github/workflows/deploy.yml`.
- **Gatilho**: Push na branch `main`.

## 3. Variáveis de Ambientes (Secrets)
- `FIREBASE_API_KEY`: Para integrações de banco de dados/auth.
- `STRIPE_PUBLIC_KEY`: Para o checkout (se aplicável).

## 4. Backup & Recuperação
- Cópias locais em `c:\Users\ADMIN\SommersStore`.
- Histórico completo via Git.
