# Autorizacao unica do Google Drive para a continuidade AIOX

Esta configuracao autoriza o Rclone a confirmar pela API que o snapshot saiu do computador e chegou ao mesmo Google Drive usado pela conta SommersStore. Ela nao cria outra nuvem.

## Antes de iniciar

- Use a conta Google que administra o Drive da SommersStore.
- Nao envie o `client secret`, o token do Rclone nem a senha do backup por chat, GitHub ou Google Drive.
- O remote deve se chamar exatamente `aioxdrive`.
- A pasta raiz autorizada sera `SommersStore - Backup PC`, ID `1dUHExcnYTlDsdFlaY9AEa_MvY027v8B1`.

## 1. Criar credencial OAuth propria

O client ID compartilhado do Rclone esta sendo descontinuado em 2026. Use um client proprio:

1. Abra <https://console.cloud.google.com/apis/credentials>.
2. Selecione um projeto controlado pela SommersStore ou crie `AIOX Cloud Continuity`.
3. Em APIs e servicos, habilite **Google Drive API**.
4. Configure a tela de consentimento OAuth como uso externo/pessoal.
5. Para uma agenda permanente, altere o status de publicacao para **In production** antes da autorizacao. No modo `Testing`, o refresh token de um aplicativo externo com acesso ao Drive expira em sete dias.
6. Crie uma credencial **OAuth Client ID** do tipo **Desktop app**.
7. Guarde o Client ID e o Client Secret apenas para a proxima etapa.

## 2. Autorizar o Rclone nesta maquina

Abra PowerShell nesta pasta do SommersStore e execute:

```powershell
& "$env:LOCALAPPDATA\AIOX\Tools\rclone.exe" config
```

Responda:

1. `n` para criar novo remote.
2. Nome: `aioxdrive`.
3. Storage: `drive` (Google Drive).
4. Client ID: cole o Client ID criado acima.
5. Client Secret: cole o Client Secret; nao o compartilhe.
6. Scope: `1` (`drive`). O acesso e amplo no OAuth, mas a raiz sera restringida abaixo.
7. Service account file: deixe vazio.
8. Advanced config: `n`.
9. Use web browser: `y`.
10. No navegador, entre em `sommersstoreltda@gmail.com` e autorize.
11. Shared Drive: `n`.
12. Confirme e encerre com `q`.

Agora restrinja a raiz logica do remote a pasta de backup:

```powershell
& "$env:LOCALAPPDATA\AIOX\Tools\rclone.exe" config update aioxdrive root_folder_id 1dUHExcnYTlDsdFlaY9AEa_MvY027v8B1
```

## 3. Validar sem gravar backup

```powershell
& "$env:LOCALAPPDATA\AIOX\Tools\rclone.exe" lsd aioxdrive:
npm run continuity:preflight
```

O primeiro comando deve listar `00-Recovery-Kit`, `10-Backups-Criptografados`, `20-Relatorios-de-Integridade` e `90-Migracoes-Legadas`. O preflight deve terminar com `"ok": true`.

## 4. Regra para outro computador

Nao copie `%APPDATA%\rclone\rclone.conf`. Em cada computador novo, repita a autorizacao OAuth. Isso evita transferir tokens de acesso antigos. O repositorio criptografado e a senha de recuperacao continuam os mesmos.

## Referencia oficial

- Configuracao Google Drive e client ID proprio: <https://rclone.org/drive/#making-your-own-client-id>
- Restricao por `root_folder_id`: <https://rclone.org/drive/#root-folder-id>
