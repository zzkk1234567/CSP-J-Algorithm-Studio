# Fix page jump issue - Version 2
$file = "d:\CSPJ\csp-j-studio-simple.html"
$content = Get-Content $file -Raw -Encoding UTF8

# Fix 1: Add transparent border to .code-line (more precise)
$content = $content -replace `
    '(\.code-line \{[^}]*white-space: pre;)\s*(\})', `
    '$1' + "`r`n            border-left: 3px solid transparent;`r`n        " + '$2'

# Fix 2: Update version
$content = $content -replace 'v2\.1\.0', 'v2.1.1'

# Save
$content | Set-Content $file -Encoding UTF8 -NoNewline

Write-Host "✅ Fixed!"
