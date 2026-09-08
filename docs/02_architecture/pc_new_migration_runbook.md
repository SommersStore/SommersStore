# Runbook - Notebook para o PC novo

**Data:** 2026-09-07
**Base:** notebook atual
**Destino do projeto:** `C:\AIOX\Workspace\SommersStore`
**Nuvens autorizadas:** GitHub e Google Drive
**Firebase:** fora do fluxo de migracao

## Resultado esperado

O PC novo e reconstruido em duas camadas:

1. **GitHub:** codigo, documentacao, stories e memoria de projeto apropriados para versionamento.
2. **Google Drive:** um unico arquivo `.7z` criptografado com o complemento local selecionado.

Os programas sao instalados novamente no PC novo. Seus arquivos de configuracao selecionados sao restaurados depois. O notebook continua intacto ate a validacao final.

## O que o pacote privado seleciona

- alteracoes e arquivos novos ainda nao recuperaveis por um clone Git;
- dados locais privados de Financas/IR e uploads definidos pela governanca;
- sessoes, memorias, configuracao e skills pessoais do Codex;
- Experts, Indicators, Includes, Libraries, Files, Presets, Profiles e Scripts do MetaTrader 4/5;
- `bin/Custom`, templates, workspaces e sons do NinjaTrader 8;
- Strategies, Templates e Workspaces do JForex4.

O pacote exclui deliberadamente `auth.json`, bancos locais do Codex, caches, logs, temporarios, dependencias e artefatos de build. Contas Google, GitHub, Codex e corretoras devem ser autenticadas novamente no PC novo.

## No notebook

Abra o PowerShell na raiz deste projeto e execute:

```powershell
npm run sync:mirror
npm run migration:plan
npm run migration:prepare
```

O ultimo comando informa a pasta criada abaixo de `D:\AIOX-Migracao-PC-Novo`.

Instale o 7-Zip, caso ainda nao exista:

```powershell
winget install --id 7zip.7zip -e --source winget
```

Feche e abra o PowerShell, e crie o arquivo criptografado substituindo `<PASTA_DO_PACOTE>` pelo caminho informado:

```powershell
node scripts\pc_migration_bundle.js archive --bundle-dir "<PASTA_DO_PACOTE>"
```

O 7-Zip pedira uma senha forte sem grava-la no script. Guarde essa senha fora do Google Drive. Depois, gere os volumes de transporte:

```powershell
node scripts\pc_migration_bundle.js transport --bundle-dir "<PASTA_DO_PACOTE>"
```

Esse comando divide o arquivo criptografado em volumes de ate 90 MB, adequados ao conector do Google Drive. Envie somente:

- todos os arquivos `SommersStore-PC-Novo-....-gdrive.7z.001`, `.002` e seguintes;
- `SommersStore-PC-Novo-....-gdrive.parts.sha256.txt`.

A pasta aberta de preparacao permanece no disco D como copia local. Ela nao deve ser colocada no Google Drive.

## No PC novo

Instale Git, Node.js LTS, Google Drive Desktop, Antigravity IDE, Codex e as plataformas de trading a partir dos instaladores oficiais. Depois:

```powershell
New-Item -ItemType Directory -Force -Path C:\AIOX\Workspace
Set-Location C:\AIOX\Workspace
git clone --branch migration/pc-new-20260907 --single-branch https://github.com/SommersStore/SommersStore.git
Set-Location C:\AIOX\Workspace\SommersStore
npm install
```

Baixe pelo Google Drive todos os volumes e o arquivo `.sha256.txt` para a mesma pasta. Verifique as partes:

```powershell
node scripts\pc_migration_bundle.js verify-transport --receipt "C:\CAMINHO\SommersStore-PC-Novo-....-gdrive.parts.sha256.txt"
```

O resultado deve ser `"ok": true`. Reuna os volumes extraindo o primeiro arquivo; o 7-Zip le automaticamente os demais:

```powershell
New-Item -ItemType Directory -Force -Path C:\AIOX\Transfer
& 'C:\Program Files\7-Zip\7z.exe' x "C:\CAMINHO\SommersStore-PC-Novo-....-gdrive.7z.001" -o"C:\AIOX\Transfer"
```

Isso produz o `.7z` criptografado original. Extraia-o para uma pasta fora do projeto e informe a senha criada no notebook:

```powershell
New-Item -ItemType Directory -Force -Path C:\AIOX\Transfer\Pacote
& 'C:\Program Files\7-Zip\7z.exe' x "C:\AIOX\Transfer\SommersStore-PC-Novo-....7z" -o"C:\AIOX\Transfer\Pacote"
```

Feche MetaTrader, NinjaTrader e JForex antes da restauracao. Em seguida, valide e simule:

```powershell
node scripts\pc_migration_bundle.js verify --bundle-dir "C:\AIOX\Transfer\Pacote"
node scripts\pc_migration_bundle.js restore --bundle-dir "C:\AIOX\Transfer\Pacote"
```

O segundo comando e apenas uma simulacao. Leia `migration-restore-report.json`. Se o relatorio estiver correto, aplique:

```powershell
node scripts\pc_migration_bundle.js restore --bundle-dir "C:\AIOX\Transfer\Pacote" --apply
```

Arquivos inexistentes sao copiados. Arquivos iguais sao reconhecidos. Arquivos diferentes viram conflitos e **nao sao sobrescritos**.

Em um clone novo, arquivos privados legados podem existir no Git apesar do `.gitignore`. Depois de revisar o relatorio, use a opcao restrita abaixo para substituir somente `.env` reais e conteudo das raizes privadas governadas de Financas/IR, contratos, uploads e sessoes/arquivos locais. Os demais arquivos do workspace continuam sob autoridade do GitHub:

```powershell
node scripts\pc_migration_bundle.js restore --bundle-dir "C:\AIOX\Transfer\Pacote" --apply --replace-private-workspace-conflicts
```

Nao use `--replace-workspace-conflicts` durante a migracao normal: essa opcao ampla tambem substituiria codigo, stories, memoria versionada e scripts mais novos do GitHub.

## Validacao antes de promover o PC novo

Na pasta `C:\AIOX\Workspace\SommersStore`, execute:

```powershell
npm run lint
npm run typecheck
npm test
npm run validate:structure
npm run validate:agents
git status --short
```

Abra os projetos e plataformas em modo seguro/demo, confirme templates, indicadores e workspaces e refaca os logins. Somente depois desses testes o PC novo passa a ser a maquina principal.

## Regra permanente

- arquivo de trabalho continua salvo fisicamente na maquina principal;
- GitHub mantem a copia versionada segura;
- Google Drive mantem apenas o pacote privado criptografado e documentos pessoais selecionados;
- o notebook permanece como segunda maquina ate a sincronizacao entre as duas ser desenhada e validada;
- Firebase continua sendo publicacao do site, nunca backup do computador.
