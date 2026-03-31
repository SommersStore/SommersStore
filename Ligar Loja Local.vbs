Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c cd projects\loja-digital && npm run dev", 0, false
WScript.Sleep 3000
WshShell.Run "http://localhost:3000/sales/v3/zen-dark-v3"
