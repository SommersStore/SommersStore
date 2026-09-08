param(
    [Parameter(Mandatory = $true, Position = 0)]
    [ValidateSet('set', 'get', 'exists', 'remove')]
    [string]$Command
)

$ErrorActionPreference = 'Stop'
$stateRoot = if ($env:AIOX_CONTINUITY_STATE_DIR) {
    [System.IO.Path]::GetFullPath($env:AIOX_CONTINUITY_STATE_DIR)
} else {
    Join-Path $env:LOCALAPPDATA 'AIOX\Continuity'
}
$secretPath = Join-Path $stateRoot 'restic-password.dpapi'

function Convert-SecureStringToPlainText {
    param([Security.SecureString]$SecureValue)
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureValue)
    try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    } finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
    }
}

switch ($Command) {
    'set' {
        New-Item -ItemType Directory -Path $stateRoot -Force | Out-Null
        $first = Read-Host 'Crie a senha de recuperacao do backup (minimo 16 caracteres)' -AsSecureString
        $second = Read-Host 'Digite a mesma senha novamente' -AsSecureString
        $firstPlain = Convert-SecureStringToPlainText $first
        $secondPlain = Convert-SecureStringToPlainText $second
        try {
            if ($firstPlain.Length -lt 16) {
                throw 'A senha precisa ter no minimo 16 caracteres.'
            }
            if ($firstPlain -cne $secondPlain) {
                throw 'As duas senhas nao coincidem.'
            }
            $encrypted = ConvertFrom-SecureString $first
            [System.IO.File]::WriteAllText($secretPath, $encrypted, [Text.Encoding]::UTF8)
            Write-Output "Segredo DPAPI configurado para o usuario atual em $secretPath"
        } finally {
            $firstPlain = $null
            $secondPlain = $null
        }
    }
    'get' {
        if (-not (Test-Path -LiteralPath $secretPath -PathType Leaf)) {
            throw "Segredo DPAPI nao configurado. Execute: powershell -File scripts/aiox_continuity_secret.ps1 set"
        }
        $encrypted = [System.IO.File]::ReadAllText($secretPath, [Text.Encoding]::UTF8).Trim()
        $secure = ConvertTo-SecureString $encrypted
        $plain = Convert-SecureStringToPlainText $secure
        try {
            [Console]::Out.Write($plain)
        } finally {
            $plain = $null
        }
    }
    'exists' {
        if (Test-Path -LiteralPath $secretPath -PathType Leaf) {
            Write-Output 'true'
            exit 0
        }
        Write-Output 'false'
        exit 1
    }
    'remove' {
        if (Test-Path -LiteralPath $secretPath -PathType Leaf) {
            Remove-Item -LiteralPath $secretPath -Force
        }
        Write-Output 'Segredo DPAPI local removido. Os snapshots existentes nao foram alterados.'
    }
}
