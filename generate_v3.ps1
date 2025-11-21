# Generate CSP-J Studio v3.0 with all visualizations
Write-Host "Generating CSP-J Studio v3.0..." -ForegroundColor Cyan

$outputFile = "d:\CSPJ\csp-j-studio-v3.html"

# Read the base file
$baseFile = "d:\CSPJ\csp-j-studio-simple.html"
$content = Get-Content $baseFile -Raw -Encoding UTF8

# Read enhanced algorithms data
$algoData = Get-Content "d:\CSPJ\algorithms_data_enhanced.js" -Raw -Encoding UTF8

Write-Host "Generating complete HTML with all visualizations..."
Write-Host "This will take a moment..."

# Extract the algorithms array from the JS file
$algoArray = $algoData -replace '(?s).*const algorithmsData = \[(.*)\];.*', '$1'

# Update the algorithms in HTML
$pattern = '(?s)(algorithms:\s*\[).*?(\s*\],)'
$replacement = "`$1$algoArray`$2"
$content = $content -replace $pattern, $replacement

# Update version
$content = $content -replace 'v2\.1\.1', 'v3.0.0'

# Save
$content | Set-Content $outputFile -Encoding UTF8 -NoNewline

Write-Host "File created: $outputFile" -ForegroundColor Green
Write-Host "Next: Adding visualization functions..." -ForegroundColor Yellow
