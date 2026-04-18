const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');

function loadText(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

function checkJsSyntax(relPath) {
  const code = loadText(relPath);
  new vm.Script(code, { filename: relPath });
}

function checkDashboardInlineScripts(relPath) {
  const html = loadText(relPath);
  const rx = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let index = 0;
  for (const match of html.matchAll(rx)) {
    index += 1;
    const scriptBody = match[1] || '';
    if (!scriptBody.trim()) continue;
    new vm.Script(scriptBody, { filename: `${relPath}#inline-script-${index}` });
  }
}

function run() {
  checkJsSyntax('scripts/dashboard_server.js');
  checkDashboardInlineScripts('docs/aiox_dashboard.html');
  console.log('Lint checks passed: JS syntax and inline dashboard scripts are valid.');
}

run();
