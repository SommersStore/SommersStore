Option Explicit

Dim shell, fso, scriptsDir, rootDir, nodeExe, serverScript, logFile, comSpec, command, launchResult

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

scriptsDir = fso.GetParentFolderName(WScript.ScriptFullName)
rootDir = fso.GetParentFolderName(scriptsDir)
nodeExe = "C:\Program Files\nodejs\node.exe"
If Not fso.FileExists(nodeExe) Then
  nodeExe = "node"
End If

serverScript = fso.BuildPath(scriptsDir, "dashboard_server.js")
logFile = fso.BuildPath(fso.BuildPath(rootDir, "docs\control"), "dashboard_server.log")
comSpec = shell.ExpandEnvironmentStrings("%ComSpec%")
If Len(comSpec) = 0 Or Not fso.FileExists(comSpec) Then
  comSpec = "C:\Windows\System32\cmd.exe"
End If

shell.CurrentDirectory = rootDir
command = """" & nodeExe & """ """ & serverScript & """ >> """ & logFile & """ 2>&1"
launchResult = shell.Run("""" & comSpec & """ /d /s /c " & Chr(34) & command & Chr(34), 0, False)
