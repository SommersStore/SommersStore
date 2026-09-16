param(
    [string]$ShortcutName = 'Finalizar o dia e desligar'
)

$ErrorActionPreference = 'Stop'
$desktop = [Environment]::GetFolderPath('Desktop')
$powershell = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$runner = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'finalize_day_and_shutdown.ps1'))
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$shortcutPath = Join-Path $desktop ($ShortcutName + '.lnk')

if (-not (Test-Path -LiteralPath $runner -PathType Leaf)) {
    throw "Runner nao encontrado: $runner"
}

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $powershell
$shortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$runner`""
$shortcut.WorkingDirectory = $projectRoot
$shortcut.Description = 'Executa Scribe, gates, GitHub, Firebase condicional, Restic, espelho e somente entao desliga.'
$shortcut.IconLocation = "$env:SystemRoot\System32\shell32.dll,27"
$shortcut.WindowStyle = 1
$shortcut.Save()

$check = $shell.CreateShortcut($shortcutPath)
[pscustomobject]@{
    Shortcut = $shortcutPath
    Target = $check.TargetPath
    Arguments = $check.Arguments
    WorkingDirectory = $check.WorkingDirectory
} | ConvertTo-Json -Compress
