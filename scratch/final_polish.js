const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../docs/aiox_dashboard.html');
let content = fs.readFileSync(filePath, 'utf8');

const mapping = {
    'Â·': '·',
    'Â': '',
    'ção': 'ção',
    'ã': 'ã'
};

for (const [bad, good] of Object.entries(mapping)) {
    content = content.split(bad).join(good);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Final polishing of dashboard finished.');
