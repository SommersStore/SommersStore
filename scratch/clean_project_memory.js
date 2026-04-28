const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'docs/memory/project_memory.md');
if (!fs.existsSync(filePath)) process.exit(0);

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Keep the first 58 lines (manual handoffs and headers)
const header = lines.slice(0, 58);

// Identify automatic closure blocks
// Blocks start with "- timestamp:" and usually follow "## Ultimo fechamento automatico"
let autoBlocks = [];
let currentBlock = [];
let capturing = false;

for (let i = 58; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("- timestamp:")) {
        if (currentBlock.length > 0) autoBlocks.push(currentBlock);
        currentBlock = [line];
        capturing = true;
    } else if (capturing) {
        if (line.trim() === "" && currentBlock.length > 0) {
            // End of block
            autoBlocks.push(currentBlock);
            currentBlock = [];
            capturing = false;
        } else {
            currentBlock.push(line);
        }
    }
}
if (currentBlock.length > 0) autoBlocks.push(currentBlock);

// Keep only the last 20 automatic blocks
const recentAuto = autoBlocks.slice(0, 20); // They are sorted by date descending in the file it seems (2026-04-27 at top)

let newContent = header.join('\n') + '\n\n## Ultimo fechamento automatico (Truncated)\n';
recentAuto.forEach(block => {
    newContent += block.join('\n') + '\n';
});

fs.writeFileSync(filePath, newContent);
console.log('Cleaned project_memory.md');
