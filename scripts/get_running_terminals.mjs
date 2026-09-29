import { execSync } from 'node:child_process';

const script = `Get-CimInstance Win32_Process -Filter "Name = 'terminal64.exe'" | ForEach-Object { [PSCustomObject]@{ ProcessId = $_.ProcessId; Path = $_.ExecutablePath; CommandLine = $_.CommandLine } } | Format-List`;
const output = execSync(`powershell -NoProfile -Command "${script}"`, { encoding: 'utf8' });
console.log(output);
