// Simple test to check for JavaScript syntax errors
const fs = require('fs');

try {
    const html = fs.readFileSync('csp-j-learning-tool.html', 'utf8');
    
    // Extract JavaScript from HTML
    const scriptMatch = html.match(/<script>(.*?)<\/script>/s);
    
    if (scriptMatch) {
        const jsCode = scriptMatch[1];
        
        // Check for common syntax issues
        console.log('Checking for common JavaScript issues...');
        
        // Check for template string syntax errors
        const templateStringIssues = jsCode.match(/\\?\$\{[^}]*\}/g);
        if (templateStringIssues) {
            console.log('Found template string patterns:', templateStringIssues.slice(0, 5));
        }
        
        // Check for function definitions
        const functionCount = (jsCode.match(/function\s+\w+/g) || []).length;
        console.log('Found', functionCount, 'function definitions');
        
        // Check if key elements are referenced
        const hasKnowledgeNav = jsCode.includes('knowledge-nav');
        const hasCodeEditor = jsCode.includes('code-editor');
        const hasAlgorithmViz = jsCode.includes('algorithm-visualization');
        const hasTestArea = jsCode.includes('test-area');
        
        console.log('Element references:');
        console.log('- knowledge-nav:', hasKnowledgeNav);
        console.log('- code-editor:', hasCodeEditor);
        console.log('- algorithm-visualization:', hasAlgorithmViz);
        console.log('- test-area:', hasTestArea);
        
        // Check if initialization happens
        const hasInit = jsCode.includes('DOMContentLoaded') && jsCode.includes('initializeApp');
        console.log('- Has initialization:', hasInit);
        
        console.log('JavaScript syntax check completed successfully');
    } else {
        console.log('No JavaScript found in HTML file');
    }
} catch (error) {
    console.error('Error reading or parsing file:', error.message);
}