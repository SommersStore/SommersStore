@echo off
setlocal
color 0b

echo ==================================================
echo SISTEMA AIOX - INICIANDO PAINEL DE CONTROLE (TOWER)
echo ==================================================
echo.

set "ROOT=%~dp0"
set "HEALTH_URL=http://127.0.0.1:4000/api/session"

echo Verificando se o painel ja esta ativo...
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing '%HEALTH_URL%' -TimeoutSec 1; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
if "%ERRORLEVEL%"=="0" goto OPEN_BROWSER

echo Servidor inativo. Subindo Node.js em background...
powershell -NoProfile -Command "Start-Process -FilePath node -ArgumentList 'scripts/dashboard_server.js' -WorkingDirectory '%ROOT%' -WindowStyle Hidden"

echo Aguardando servidor responder...
powershell -NoProfile -Command "$ok = $false; for ($i=0; $i -lt 30 -and -not $ok; $i++) { Start-Sleep -Milliseconds 500; try { $r = Invoke-WebRequest -UseBasicParsing '%HEALTH_URL%' -TimeoutSec 1; if ($r.StatusCode -eq 200) { $ok = $true } } catch {} }; if ($ok) { exit 0 } else { exit 2 }"
if not "%ERRORLEVEL%"=="0" (
  echo.
  echo Falha ao iniciar o servidor do painel na porta 4000.
  echo Verifique se o Node.js esta instalado e tente novamente.
  pause
  exit /b 1
)

:OPEN_BROWSER
echo Servidor online. Abrindo painel...
start "" http://localhost:4000
echo.
echo Painel iniciado com sucesso.
endlocal
