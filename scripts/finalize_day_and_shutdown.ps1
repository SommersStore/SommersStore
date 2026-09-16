param(
    [switch]$NoShutdown,
    [switch]$TestMode
)

$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$nodeCandidates = @(
    'C:\Program Files\nodejs\node.exe',
    (Get-Command node.exe -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -First 1)
) | Where-Object { $_ -and (Test-Path -LiteralPath $_ -PathType Leaf) }

if (-not $nodeCandidates) {
    throw 'Node.js nao encontrado. O computador nao sera desligado.'
}

$arguments = @((Join-Path $PSScriptRoot 'finalize_day.cjs'))
if ($NoShutdown) { $arguments += '--no-shutdown' }
if ($TestMode) { $arguments += '--test-mode' }

Push-Location $projectRoot
try {
    & $nodeCandidates[0] @arguments
    $exitCode = $LASTEXITCODE
} finally {
    Pop-Location
}

if ($exitCode -ne 0) {
    Write-Host ''
    Write-Host 'A finalizacao falhou. O computador NAO sera desligado.' -ForegroundColor Red
    Read-Host 'Pressione ENTER para fechar'
    exit $exitCode
}

if ($NoShutdown -or $TestMode) {
    Write-Host ''
    Write-Host 'Teste concluido. O desligamento permaneceu desativado.' -ForegroundColor Green
}

exit 0
