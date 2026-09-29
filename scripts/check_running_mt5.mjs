import { execSync } from 'node:child_process';

try {
  const output = execSync('powershell "Get-Process -Name terminal64, metaeditor64 -ErrorAction SilentlyContinue | Select-Object Id, ProcessName, MainWindowTitle | Format-Table -AutoSize"', { encoding: 'utf8' });
  console.log(output || 'Nenhum processo MT5 em execução.');
} catch (e) {
  console.log('Erro ou nenhum processo ativo:', e.message);
}
