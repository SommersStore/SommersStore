import fs from 'node:fs';

const p = 'C:/Users/AMD/AppData/Roaming/MetaQuotes/Terminal/66F5E7F481A026D99CDDE6509362A170/MQL5/Experts/AIOX_Local_Trade_Copier.mq5';
const text = fs.readFileSync(p, 'utf8');

const lines = text.split('\n');
let start = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('SnapshotFileName')) {
    start = true;
  }
  if (start) {
    console.log(lines[i]);
    if (lines[i].includes('}')) break;
  }
}
