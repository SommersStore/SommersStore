Option Explicit

Dim shell, fso, scriptsDir, rootDir, nodeExe, syncScript, logFile, comSpec, command, exitCode

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

scriptsDir = fso.GetParentFolderName(WScript.ScriptFullName)
rootDir = fso.GetParentFolderName(scriptsDir)
nodeExe = "C:\Program Files\nodejs\node.exe"
If Not fso.FileExists(nodeExe) Then
  nodeExe = "node"
End If

syncScript = fso.BuildPath(scriptsDir, "project_mirror_sync.js")
logFile = fso.BuildPath(fso.BuildPath(rootDir, "docs\control"), "project_mirror_schedule.log")
comSpec = shell.ExpandEnvironmentStrings("%ComSpec%")
If Len(comSpec) = 0 Or Not fso.FileExists(comSpec) Then
  comSpec = "C:\Windows\System32\cmd.exe"
End If

command = """" & nodeExe & """ """ & syncScript & """ sync --trigger scheduled-watchdog >> """ & logFile & """ 2>&1"
exitCode = shell.Run("""" & comSpec & """ /d /s /c " & Chr(34) & command & Chr(34), 0, True)

WScript.Quit exitCode
