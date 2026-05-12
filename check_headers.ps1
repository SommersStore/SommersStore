$r = Invoke-WebRequest -Uri 'http://localhost:4000' -UseBasicParsing
Write-Host "=== STATUS ==="
Write-Host $r.StatusCode
Write-Host "=== HEADERS ==="
$r.Headers.GetEnumerator() | ForEach-Object { Write-Host "$($_.Key): $($_.Value)" }
Write-Host "=== CONTENT CHECK ==="
Write-Host ("Landing Page: " + ($r.Content -match 'Landing Page'))
Write-Host ("vmPipeTabSwitch window: " + ($r.Content -match 'window\.vmPipeTabSwitch'))
Write-Host ("no-cache meta: " + ($r.Content -match 'no-store, no-cache'))
Write-Host ("Content length: " + $r.Content.Length)
