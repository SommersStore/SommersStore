# Financas Mobile Cloud 24h

## Como ficou

O app do celular fica hospedado em `https://sommersstore-c6c23.web.app/financas-mobile-cloud` e nao depende do notebook ligado para abrir. O usuario nao precisa digitar senha Firebase no celular nem no painel do PC.

## Fluxo atual

1. O celular abre o app hospedado no Firebase Hosting.
2. O app entra com Firebase Auth anonimo, sem email e sem senha.
3. O app le `financasMobileControl/main` para saber se esta ativo ou desativado pelo painel local.
4. Cada lancamento vira documento `pending` em `users/{uid}/financasMobileInbox`.
5. Ao abrir o painel ou dar F5 na pagina do notebook, o servidor local consulta o Firestore pela API REST usando a credencial tecnica do Firebase CLI ja autorizada neste computador.
6. O painel aplica automaticamente o lancamento no destino escolhido no celular, salva `projects/financas/data/fin2_data.json` e marca o documento como `imported`.
7. Documentos ja importados podem ser limpos da nuvem depois de 24h; os dados definitivos ficam na planilha local do PC.

## Aba Mobile no PC

A aba `Financas > Mobile` nao mostra mais campos de API Key, Auth Domain, Project ID, email ou senha. Ela foi reduzida a um controle de emergencia:

- `Desativar app do celular`: bloqueia novos lancamentos no app hospedado.
- `Ativar app do celular`: libera novos lancamentos novamente.

A sincronizacao normal nao depende dessa aba estar aberta. O F5 na planilha/Financas ja inicia a importacao automatica. Nao ha polling a cada 60 segundos enquanto a pagina fica parada.

## Categorias e destinos

O catalogo do app cloud e gerado a partir de `projects/financas/data/fin2_data.json` durante o build do `projects/loja-digital`.

Estrutura esperada:

- `Receitas`: `Rodoanel`, `Outros` e `Pagamento PM`.
- `Despesas`: `Casa`, `Carro`, `Extras` e `Despesas PM`.
- `Dividas`: `Atuais`, `Antigas` e `Holerite`.

`Pagamento PM`, `Despesas PM` e a parte de `Holerite` derivada de emprestimos aparecem para conferencia, mas nao devem ser preenchidas manualmente porque sao alimentadas pela extracao do holerite.

## Infra atual

- Firebase project: `sommersstore-c6c23`
- Hosting: `https://sommersstore-c6c23.web.app`
- Firestore database: `(default)`
- Firestore region: `southamerica-east1`
- Auth: email/senha continua existindo para areas privadas do site; o app financeiro 24h usa Auth anonimo.
- Controle emergencial: `financasMobileControl/main`
- Inbox temporaria: `users/{uid}/financasMobileInbox`

## Variaveis de build

O app hospedado ainda precisa das variaveis publicas `NEXT_PUBLIC_FINANCAS_FIREBASE_*` durante o build, mas o usuario nao precisa preencher nada no painel local.

- `NEXT_PUBLIC_FINANCAS_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FINANCAS_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FINANCAS_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FINANCAS_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FINANCAS_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FINANCAS_FIREBASE_APP_ID`

## Limite intencional

O app cloud captura lancamentos. A planilha local continua sendo a base definitiva de conferencia e consolidacao.
