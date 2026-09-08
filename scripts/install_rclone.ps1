param(
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$version = '1.75.1'
$archiveName = "rclone-v${version}-windows-amd64.zip"
$downloadUrl = "https://github.com/rclone/rclone/releases/download/v${version}/${archiveName}"
$expectedSha256 = '200eb602c126d82aa38b51e0f6b9ae837473ff99b51278d3f6f837574c494d6e'
$toolRoot = if ($env:AIOX_CONTINUITY_TOOL_DIR) {
    [System.IO.Path]::GetFullPath($env:AIOX_CONTINUITY_TOOL_DIR)
} else {
    Join-Path $env:LOCALAPPDATA 'AIOX\Tools'
}
$rclonePath = Join-Path $toolRoot 'rclone.exe'

if ((Test-Path -LiteralPath $rclonePath -PathType Leaf) -and -not $Force) {
    & $rclonePath version | Select-Object -First 1
    exit $LASTEXITCODE
}

New-Item -ItemType Directory -Path $toolRoot -Force | Out-Null
$temporaryRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("aiox-rclone-" + [Guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $temporaryRoot | Out-Null

try {
    $archivePath = Join-Path $temporaryRoot $archiveName
    Invoke-WebRequest -Uri $downloadUrl -OutFile $archivePath -UseBasicParsing
    $actualSha256 = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($actualSha256 -ne $expectedSha256) {
        throw "SHA-256 invalido para Rclone ${version}. Esperado ${expectedSha256}; obtido ${actualSha256}."
    }

    Expand-Archive -LiteralPath $archivePath -DestinationPath $temporaryRoot -Force
    $extracted = Get-ChildItem -LiteralPath $temporaryRoot -Filter 'rclone.exe' -Recurse -File | Select-Object -First 1
    if (-not $extracted) {
        throw 'Executavel do Rclone nao encontrado no arquivo oficial.'
    }

    Copy-Item -LiteralPath $extracted.FullName -Destination $rclonePath -Force
    & $rclonePath version | Select-Object -First 1
    if ($LASTEXITCODE -ne 0) {
        throw 'O executavel Rclone instalado nao respondeu corretamente.'
    }
    Write-Output "Rclone instalado e verificado em $rclonePath"
} finally {
    if (Test-Path -LiteralPath $temporaryRoot) {
        Remove-Item -LiteralPath $temporaryRoot -Recurse -Force
    }
}
