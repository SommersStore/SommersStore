@echo off
setlocal
cd /d "%~dp0"

echo ==============================================
echo AIOX - FECHAMENTO DO DIA (SNAPSHOT + CHECKPOINT)
echo ==============================================

echo.
node scripts\daily_close.cjs --push
if errorlevel 1 (
  echo.
  echo [ERRO] Falha no fechamento automatico do dia.
  pause
  exit /b 1
)

echo.
echo [OK] Fechamento concluido.
pause
