import fs from 'node:fs';

const pCopier = 'C:/AIOX/Workspace/Protheus/platforms/mt5/AIOX_Local_Trade_Copier.mq5';
const tCopier = 'C:/Users/AMD/AppData/Roaming/MetaQuotes/Terminal/66F5E7F481A026D99CDDE6509362A170/MQL5/Experts/AIOX_Local_Trade_Copier.mq5';

const pLines = fs.readFileSync(pCopier, 'utf8').split('\n');
const tLines = fs.readFileSync(tCopier, 'utf8').split('\n');

for (let i = 0; i < Math.max(pLines.length, tLines.length); i++) {
  if (pLines[i] !== tLines[i]) {
    console.log(`L${i+1}:`);
    console.log(`  + P: ${pLines[i] || ''}`);
    console.log(`  - T: ${tLines[i] || ''}`);
  }
}
