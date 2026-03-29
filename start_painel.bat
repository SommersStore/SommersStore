@echo off
color 0b
echo ==================================================
echo SISTEMA AIOX - INICIANDO PAINEL DE CONTROLE (TOWER)
echo ==================================================
echo.
echo O servidor Node.js local esta sendo ativado na porta 4000.
echo Nao feche esta janela enquanto estiver usando o Painel.
echo.
start http://localhost:4000
node "%~dp0scripts\dashboard_server.js"
pause
