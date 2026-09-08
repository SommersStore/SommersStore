Option Explicit

Dim shell, fso, scriptDir, projectRoot, nodeExe, continuityScript, logRoot, logFile, command
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
projectRoot = fso.GetParentFolderName(scriptDir)
nodeExe = "node.exe"
continuityScript = fso.BuildPath(scriptDir, "aiox_continuity.js")
logRoot = shell.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\AIOX\Continuity\logs"

If Not fso.FolderExists(logRoot) Then
    fso.CreateFolder(shell.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\AIOX")
    If Not fso.FolderExists(shell.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\AIOX\Continuity") Then
        fso.CreateFolder(shell.ExpandEnvironmentStrings("%LOCALAPPDATA%") & "\AIOX\Continuity")
    End If
    fso.CreateFolder(logRoot)
End If

logFile = fso.BuildPath(logRoot, "scheduled-backup.log")
command = "cmd.exe /d /c cd /d """ & projectRoot & """ && """ & nodeExe & """ """ & continuityScript & """ backup --trigger scheduled >> """ & logFile & """ 2>&1"
shell.Run command, 0, True
