const fs = require('fs');
let html = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

// Fix renderAgents and renderSkills escaped \${} issues
html = html.replace(/\\\$\{/g, '${');

// Remove the second renderPersonas that references the deleted PERSONAS array (lines 1184 to 1195 approx)
html = html.replace(/function renderPersonas\(\) \{\s+document\.getElementById\('personas-view'\)\.innerHTML = PERSONAS\.map\([^]+?\}\)\.join\(''\);\s+\}/, '');

fs.writeFileSync('docs/aiox_dashboard.html', html);
console.log('Fixed syntax errors and duplicate renderPersonas');
