# Fix page jump issue in csp-j-studio-simple.html
$file = "d:\CSPJ\csp-j-studio-simple.html"
$content = Get-Content $file -Raw -Encoding UTF8

# Fix 1: Add transparent border to .code-line
$content = $content -replace '(\.code-line \{[^}]+)(\s+white-space: pre;\s+\})', '$1$2'.Replace(
    '            white-space: pre;
        }',
    '            white-space: pre;
            border-left: 3px solid transparent;
        }')

# Fix 2: Simplify .code-line.active (remove comment, just change border color)
$content = $content -replace '(\.code-line\.active \{[^}]+border-left:[^;]+;[^}]+\})', @'
        .code-line.active {
            background-color: #264f78;
            border-left-color: #e51400;
        }
'@

# Fix 3: Replace highlightCode function with manual scroll version
$oldFunction = @'
            // Highlight specific line in code display
            highlightCode\(lineIndex\) \{
                const lines = this\.codeDisplay\.querySelectorAll\('\.code-line'\);
                lines\.forEach\(\(line, idx\) => \{
                    if \(idx === lineIndex\) \{
                        line\.classList\.add\('active'\);
                        // Auto-scroll to keep active line in view
                        line\.scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\);
                    \} else \{
                        line\.classList\.remove\('active'\);
                    \}
                \}\);
            \}
'@

$newFunction = @'
            // Highlight specific line in code display (Fixed: no page jump)
            highlightCode(lineIndex) {
                const lines = this.codeDisplay.querySelectorAll('.code-line');
                lines.forEach((line, idx) => {
                    if (idx === lineIndex) {
                        line.classList.add('active');
                        
                        // Manual scroll to prevent page viewport jump
                        const container = this.codeDisplay;
                        const lineTop = line.offsetTop;
                        const lineHeight = line.offsetHeight;
                        const containerHeight = container.clientHeight;
                        const scrollTop = container.scrollTop;
                        
                        // Calculate if line is out of visible area
                        const lineBottom = lineTop + lineHeight;
                        const visibleTop = scrollTop;
                        const visibleBottom = scrollTop + containerHeight;
                        
                        // Only scroll if line is not fully visible
                        if (lineTop < visibleTop || lineBottom > visibleBottom) {
                            // Scroll to center the line in container
                            const targetScroll = lineTop - (containerHeight / 2) + (lineHeight / 2);
                            container.scrollTop = targetScroll;
                        }
                    } else {
                        line.classList.remove('active');
                    }
                });
            }
'@

$content = $content -replace $oldFunction, $newFunction

# Fix 4: Update version number
$content = $content -replace 'v2\.1\.0', 'v2.1.1'

# Save the file
$content | Set-Content $file -Encoding UTF8 -NoNewline

Write-Host "✅ File fixed successfully!"
