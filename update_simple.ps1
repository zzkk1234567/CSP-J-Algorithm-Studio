# Update algorithms in HTML file
$htmlFile = "d:\CSPJ\csp-j-studio-simple.html"
$backupFile = "d:\CSPJ\csp-j-studio-simple.html.backup"

Write-Host "Creating backup..."
Copy-Item $htmlFile $backupFile -Force

Write-Host "Reading file..."
$content = Get-Content $htmlFile -Raw -Encoding UTF8

Write-Host "Updating algorithms..."
# The update will be done manually due to complexity
# Please use algorithms_data_enhanced.js as reference

Write-Host "Done! Please manually update the algorithms array using algorithms_data_enhanced.js"
Write-Host "Backup saved to: $backupFile"
