@echo off
setlocal
cd /d "%~dp0"

echo ==============================================
echo AIOX - FECHAMENTO LOCAL (SEM PUSH)
echo ==============================================

echo.
node scripts\daily_close.cjs
if errorlevel 1 (
  echo.
  echo [ERRO] Falha no fechamento automatico local.
  pause
  exit /b 1
)

echo.
echo [OK] Fechamento local concluido.
pause
