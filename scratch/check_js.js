const fs = require('fs');
const html = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
    const code = match[1];
    try {
        new Function(code);
        console.log(`Script ${++count} OK`);
    } catch (e) {
        console.error(`Script ${++count} ERROR:`, e);
    }
}
