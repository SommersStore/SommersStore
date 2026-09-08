param(
    [string]$WorkspaceRoot = 'C:\AIOX\Workspace',
    [string]$SommersStoreRepository = 'https://github.com/SommersStore/SommersStore.git',
    [string]$ProtheusRepository = '',
    [switch]$ClaimPrimary,
    [switch]$ReplacePrimary
)

$ErrorActionPreference = 'Stop'

function Assert-CommandAvailable {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name,
        [Parameter(Mandatory = $true)]
        [string]$InstallHint
    )
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "$Name nao esta instalado. $InstallHint"
    }
}

Assert-CommandAvailable -Name 'git.exe' -InstallHint 'Instale Git for Windows e execute novamente.'
Assert-CommandAvailable -Name 'node.exe' -InstallHint 'Instale Node.js LTS e execute novamente.'

$driveRoot = 'G:\Meu Drive\SommersStore - Backup PC'
if (-not (Test-Path -LiteralPath $driveRoot -PathType Container)) {
    throw 'Google Drive Desktop nao esta conectado em G:\Meu Drive com a conta SommersStore.'
}

$workspaceRootResolved = [System.IO.Path]::GetFullPath($WorkspaceRoot)
if ($workspaceRootResolved -eq [System.IO.Path]::GetPathRoot($workspaceRootResolved)) {
    throw 'WorkspaceRoot nao pode ser a raiz do disco.'
}
New-Item -ItemType Directory -Path $workspaceRootResolved -Force | Out-Null

$sommersStorePath = Join-Path $workspaceRootResolved 'SommersStore'
if (-not (Test-Path -LiteralPath (Join-Path $sommersStorePath '.git') -PathType Container)) {
    if (Test-Path -LiteralPath $sommersStorePath) {
        throw "$sommersStorePath ja existe, mas nao e um clone Git. Preserve-o e escolha outro WorkspaceRoot."
    }
    & git.exe clone $SommersStoreRepository $sommersStorePath
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao clonar SommersStore.' }
}

if ($ProtheusRepository) {
    $protheusPath = Join-Path $workspaceRootResolved 'Protheus'
    if (-not (Test-Path -LiteralPath (Join-Path $protheusPath '.git') -PathType Container)) {
        if (Test-Path -LiteralPath $protheusPath) {
            throw "$protheusPath ja existe, mas nao e um clone Git. Preserve-o e restaure primeiro em diretorio isolado."
        }
        & git.exe clone $ProtheusRepository $protheusPath
        if ($LASTEXITCODE -ne 0) { throw 'Falha ao clonar Protheus.' }
    }
}

Push-Location $sommersStorePath
try {
    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File 'scripts\install_restic.ps1'
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao instalar Restic.' }

    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File 'scripts\install_rclone.ps1'
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao instalar Rclone.' }

    $rclonePath = Join-Path $env:LOCALAPPDATA 'AIOX\Tools\rclone.exe'
    $configuredRemotes = & $rclonePath listremotes
    if ($LASTEXITCODE -ne 0 -or $configuredRemotes -notcontains 'aioxdrive:') {
        throw 'O remote aioxdrive ainda nao foi autorizado. Configure-o antes de adotar o backup.'
    }

    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File 'scripts\aiox_continuity_secret.ps1' set
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao proteger a senha de recuperacao nesta maquina.' }

    $adoptArgs = @('scripts\aiox_continuity.js', 'adopt')
    if ($ClaimPrimary) { $adoptArgs += '--claim-primary' }
    if ($ReplacePrimary) { $adoptArgs += '--replace-primary' }
    & node.exe @adoptArgs
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao adotar o repositorio criptografado do Drive.' }

    & node.exe 'scripts\aiox_continuity.js' restore
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao gerar o plano de restauracao isolada.' }

    Write-Output ''
    Write-Output 'Bootstrap concluido sem sobrescrever o workspace.'
    Write-Output 'Revise o plano acima e execute continuity:restore:apply para restaurar em C:\AIOX\RestoreTest.'
    if (-not $ClaimPrimary) {
        Write-Output 'A maquina ainda nao foi promovida. Use continuity:schedule somente depois do teste de restore.'
    }
} finally {
    Pop-Location
}
