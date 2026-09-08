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

O 7-Zip pedira uma senha forte sem grava-la no script. Guarde essa senha fora do Google Drive. Depois, envie ao Google Drive **somente**:

- `SommersStore-PC-Novo-....7z`
- `SommersStore-PC-Novo-....7z.sha256.txt`

A pasta aberta de preparacao permanece no disco D como copia local. Ela nao deve ser colocada no Google Drive.

## No PC novo

Instale Git, Node.js LTS, Google Drive Desktop, Antigravity IDE, Codex e as plataformas de trading a partir dos instaladores oficiais. Depois:

```powershell
New-Item -ItemType Directory -Force -Path C:\AIOX\Workspace
Set-Location C:\AIOX\Workspace
git clone https://github.com/SommersStore/SommersStore.git
Set-Location C:\AIOX\Workspace\SommersStore
npm install
```

Baixe pelo Google Drive os dois arquivos do pacote. Compare o hash exibido por este comando com o arquivo `.sha256.txt`:

```powershell
Get-FileHash -Algorithm SHA256 "C:\CAMINHO\SommersStore-PC-Novo-....7z"
```

Extraia o `.7z` para uma pasta temporaria fora do projeto. Feche MetaTrader, NinjaTrader e JForex antes da restauracao. Em seguida, valide e simule:

```powershell
node scripts\pc_migration_bundle.js verify --bundle-dir "C:\CAMINHO\PACOTE_EXTRAIDO"
node scripts\pc_migration_bundle.js restore --bundle-dir "C:\CAMINHO\PACOTE_EXTRAIDO"
```

O segundo comando e apenas uma simulacao. Leia `migration-restore-report.json`. Se o relatorio estiver correto, aplique:

```powershell
node scripts\pc_migration_bundle.js restore --bundle-dir "C:\CAMINHO\PACOTE_EXTRAIDO" --apply
```

Arquivos inexistentes sao copiados. Arquivos iguais sao reconhecidos. Arquivos diferentes viram conflitos e **nao sao sobrescritos**.

Em um clone novo, os conflitos de `workspace` representam normalmente a versao antiga do GitHub contra a versao mais recente do notebook. Depois de revisar o relatorio, eles podem ser substituidos de forma explicita, sem afetar as configuracoes Codex/trading que tenham conflito:

```powershell
node scripts\pc_migration_bundle.js restore --bundle-dir "C:\CAMINHO\PACOTE_EXTRAIDO" --apply --replace-workspace-conflicts
```

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
