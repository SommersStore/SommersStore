const fs = require('fs');
let html = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

// The node string template replacement injected `\` instead of `\``
html = html.replace(/return \\`/g, 'return `');
html = html.replace(/<\/div>\\`;/g, '</div>`;');

// Let's also make sure there are no other accidental escaped backticks in renderSkills
html = html.replace(/=> \\`<div>/g, '=> `<div>');

fs.writeFileSync('docs/aiox_dashboard.html', html);
console.log('Fixed backticks.');
