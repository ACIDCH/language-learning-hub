param([string]$Python = '', [string]$DataDirectory = '')
$ErrorActionPreference = 'Stop'
$repository = Split-Path $PSScriptRoot -Parent
if (-not $Python) {
    $bundled = Join-Path (Split-Path $repository -Parent) 'runtime/Scripts/python.exe'
    $Python = if (Test-Path -LiteralPath $bundled) { $bundled } else { (Get-Command python).Source }
}
if ($DataDirectory) { $env:LLH_DATA_DIR = (Resolve-Path -LiteralPath $DataDirectory).Path }
$node = (Get-Command node).Source
$vite = Join-Path $repository 'node_modules/vite/bin/vite.js'
if (-not (Test-Path -LiteralPath $vite)) { throw 'Run npm ci in the repository first.' }
function Test-LocalService([string]$Url) {
    try { return (Invoke-WebRequest -Uri $Url -TimeoutSec 2).StatusCode -eq 200 } catch { return $false }
}
if (-not (Test-LocalService 'http://127.0.0.1:8765/api/health')) {
    Start-Process -FilePath $Python -ArgumentList @('-m','uvicorn','server.app:app','--host','127.0.0.1','--port','8765') -WorkingDirectory $repository -WindowStyle Hidden | Out-Null
}
if (-not (Test-LocalService 'http://127.0.0.1:5173/language-learning-hub/')) {
    Start-Process -FilePath $node -ArgumentList @(('"' + $vite + '"')) -WorkingDirectory $repository -WindowStyle Hidden | Out-Null
}
Write-Output 'Personal learning workspace: http://127.0.0.1:5173/language-learning-hub/'
Write-Output 'Both services bind only to this computer. Close their processes to stop them.'
