$r = (Invoke-WebRequest -Uri 'http://localhost:4000' -UseBasicParsing).Content
Write-Host ('vm-pipe-tab: ' + ($r -match 'vm-pipe-tab'))
Write-Host ('renderPipeDeliverables: ' + ($r -match 'renderPipeDeliverables'))
Write-Host ('catalogLinks: ' + ($r -match 'catalogLinks'))
Write-Host ('length: ' + $r.Length)
