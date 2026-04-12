const fs = require('fs');
const path = require('path');

const coreAgentsDir = path.join(__dirname, '../.aiox-core/development/agents');
const codexAgentsDir = path.join(__dirname, '../.codex/agents');

// 1. Delete all small (dummy) files created by my previous script
const codexFiles = fs.readdirSync(codexAgentsDir);
for (const file of codexFiles) {
    if (file.endsWith('.md')) {
        const filePath = path.join(codexAgentsDir, file);
        const stats = fs.statSync(filePath);
        if (stats.size < 1000) { // Delete dummies < 1KB
            fs.unlinkSync(filePath);
        }
    }
}

// 2. Copy the real core ones over gently (override not needed, just fill the missing ones from core)
const coreFiles = fs.readdirSync(coreAgentsDir);
for (const file of coreFiles) {
    if (file.endsWith('.md')) {
        const srcPath = path.join(coreAgentsDir, file);
        const destPath = path.join(codexAgentsDir, file);
        try {
            const content = fs.readFileSync(srcPath, 'utf8');
            fs.writeFileSync(destPath, content, 'utf8');
        } catch (e) {}
    }
}

// 3. Fix the HTML handles
const htmlPath = path.join(__dirname, '../docs/aiox_dashboard.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Map bad handles to true AIOX core handles
htmlContent = htmlContent.replace(/handle: '@visual'/g, "handle: '@ux-design-expert'");
htmlContent = htmlContent.replace(/handle: '@art'/g, "handle: '@art-director'");
htmlContent = htmlContent.replace(/handle: '@master'/g, "handle: '@aiox-master'");
htmlContent = htmlContent.replace(/handle: '@market'/g, "handle: '@analyst'");
htmlContent = htmlContent.replace(/handle: '@funnel'/g, "handle: '@funnel-specialist'");
htmlContent = htmlContent.replace(/handle: '@cro'/g, "handle: '@cro-expert'");
htmlContent = htmlContent.replace(/handle: '@traffic'/g, "handle: '@traffic-specialist'");
htmlContent = htmlContent.replace(/handle: '@ux-opt'/g, "handle: '@ux-optimizer'");

fs.writeFileSync(htmlPath, htmlContent, 'utf8');

console.log('Restoration complete!');
