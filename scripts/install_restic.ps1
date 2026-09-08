param(
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$version = '0.19.1'
$archiveName = "restic_${version}_windows_amd64.zip"
$downloadUrl = "https://github.com/restic/restic/releases/download/v${version}/${archiveName}"
$expectedSha256 = 'da948ad707ed690426473aaba2046cd61f8f90f6f0e7dab6be0d5796531de67d'
$toolRoot = if ($env:AIOX_CONTINUITY_TOOL_DIR) {
    [System.IO.Path]::GetFullPath($env:AIOX_CONTINUITY_TOOL_DIR)
} else {
    Join-Path $env:LOCALAPPDATA 'AIOX\Tools'
}
$resticPath = Join-Path $toolRoot 'restic.exe'

if ((Test-Path -LiteralPath $resticPath -PathType Leaf) -and -not $Force) {
    & $resticPath version
    exit $LASTEXITCODE
}

New-Item -ItemType Directory -Path $toolRoot -Force | Out-Null
$temporaryRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("aiox-restic-" + [Guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $temporaryRoot | Out-Null

try {
    $archivePath = Join-Path $temporaryRoot $archiveName
    Invoke-WebRequest -Uri $downloadUrl -OutFile $archivePath -UseBasicParsing
    $actualSha256 = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($actualSha256 -ne $expectedSha256) {
        throw "SHA-256 invalido para Restic ${version}. Esperado ${expectedSha256}; obtido ${actualSha256}."
    }

    Expand-Archive -LiteralPath $archivePath -DestinationPath $temporaryRoot -Force
    $extracted = Get-ChildItem -LiteralPath $temporaryRoot -Filter 'restic*.exe' -File | Select-Object -First 1
    if (-not $extracted) {
        throw 'Executavel do Restic nao encontrado no arquivo oficial.'
    }

    Copy-Item -LiteralPath $extracted.FullName -Destination $resticPath -Force
    & $resticPath version
    if ($LASTEXITCODE -ne 0) {
        throw 'O executavel Restic instalado nao respondeu corretamente.'
    }
    Write-Output "Restic instalado e verificado em $resticPath"
} finally {
    if (Test-Path -LiteralPath $temporaryRoot) {
        Remove-Item -LiteralPath $temporaryRoot -Recurse -Force
    }
}
