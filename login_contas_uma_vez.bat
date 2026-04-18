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
rem O Gemini CLI NAO usa "gemini auth login".
rem Abra o Gemini, escolha "Sign in with Google", conclua no navegador
rem e depois digite /quit para voltar ao terminal.
echo.
echo Abra o Gemini e escolha "Sign in with Google".
echo Quando terminar, digite /quit para fechar e voltar.
gemini
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
gemini -p "Responda apenas OK"

echo.
echo [OK] Processo finalizado.
pause
