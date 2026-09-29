import fs from 'node:fs';

const p = 'C:/Users/AMD/AppData/Roaming/MetaQuotes/Terminal/66F5E7F481A026D99CDDE6509362A170/MQL5/Experts/AIOX_Local_Trade_Copier.mq5';
const lines = fs.readFileSync(p, 'utf8').split('\n');
console.log(lines.slice(0, 60).join('\n'));
