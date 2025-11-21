const fs = require('fs');

try {
    console.log('Reading HTML file...');
    const html = fs.readFileSync('csp-j-learning-tool.html', 'utf8');
    
    // Extract JavaScript content
    const scriptMatches = html.match(/<script>([\s\S]*?)<\/script>/g);
    
    if (!scriptMatches) {
        console.log('No JavaScript found');
        return;
    }
    
    console.log(`Found ${scriptMatches.length} script tags`);
    
    // Get the main script (last one should be our main code)
    const mainScript = scriptMatches[scriptMatches.length - 1];
    const jsCode = mainScript.replace(/<\/?script>/g, '');
    
    // Write to temporary file for syntax check
    fs.writeFileSync('temp_check.js', jsCode);
    console.log('JavaScript extracted to temp_check.js');
    
    // Basic syntax check - look for obvious issues
    const lines = jsCode.split('\n');
    let inString = false;
    let stringChar = '';
    let braceCount = 0;
    let parenCount = 0;
    let bracketCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.length === 0 || line.startsWith('//')) continue;
        
        // Check for unclosed template strings
        if (line.includes('`') && !line.match(/`[^`]*`/)) {
            console.log(`Line ${i+1}: Potential unclosed template string: ${line}`);
        }
        
        // Check for basic brace matching
        for (let char of line) {
            if (!inString) {
                if (char === '"' || char === "'" || char === '`') {
                    inString = true;
                    stringChar = char;
                } else if (char === '{') braceCount++;
                else if (char === '}') braceCount--;
                else if (char === '(') parenCount++;
                else if (char === ')') parenCount--;
                else if (char === '[') bracketCount++;
                else if (char === ']') bracketCount--;
            } else {
                if (char === stringChar && lines[i][lines[i].indexOf(char) - 1] !== '\\') {
                    inString = false;
                    stringChar = '';
                }
            }
        }
    }
    
    console.log('Brace balance check:');
    console.log(`Braces: ${braceCount}`);
    console.log(`Parentheses: ${parenCount}`);
    console.log(`Brackets: ${bracketCount}`);
    
    if (braceCount !== 0 || parenCount !== 0 || bracketCount !== 0) {
        console.log('WARNING: Unbalanced braces/parentheses detected!');
    }
    
    console.log('Syntax check completed');
    
} catch (error) {
    console.error('Error:', error.message);
}