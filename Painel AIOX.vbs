Set WshShell = CreateObject("WScript.Shell")
' Roda o servidor Node.js invisível (o 0 significa "Hide window")
WshShell.Run "cmd /c node scripts\dashboard_server.js", 0, false
' Aguarda 1 segundinho para o servidor iniciar
WScript.Sleep 1000
' Abre o navegador padrão direto no painel
WshShell.Run "http://localhost:4000"
