Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

root = fso.GetParentFolderName(WScript.ScriptFullName)
starter = """" & fso.BuildPath(root, "start_painel.bat") & """"

' Delega para o bootstrap robusto no .bat (healthcheck + abertura do navegador)
shell.Run "cmd /c " & starter, 0, false
