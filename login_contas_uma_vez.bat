@echo off
setlocal
cd /d "%~dp0"

echo ==============================================
echo AIOX - LOGIN DAS CONTAS (1 VEZ)
echo ==============================================

echo.
echo [1/3] GitHub (gh)
"%ProgramFiles%\GitHub CLI\gh.exe" auth login --hostname github.com --git-protocol https --web
if errorlevel 1 (
  echo.
  echo [ATENCAO] Nao foi possivel concluir o login do GitHub agora.
)

echo.
echo [2/3] Vercel
vercel login
if errorlevel 1 (
  echo.
  echo [ATENCAO] Nao foi possivel concluir o login da Vercel agora.
)

echo.
echo [3/3] Gemini
rem O Gemini pode usar login web ou chave API.
rem Se abrir navegador, conclua o login e volte.
gemini auth login
if errorlevel 1 (
  echo.
  echo [ATENCAO] Nao foi possivel concluir o login do Gemini agora.
)

echo.
echo ==============================================
echo Validacao rapida
echo ==============================================

echo.
echo GitHub:
"%ProgramFiles%\GitHub CLI\gh.exe" auth status

echo.
echo Vercel:
vercel whoami

echo.
echo Gemini:
gemini auth status

echo.
echo [OK] Processo finalizado.
pause
