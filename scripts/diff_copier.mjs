import fs from 'node:fs';
import path from 'node:path';

const pCopier = 'C:/AIOX/Workspace/Protheus/platforms/mt5/AIOX_Local_Trade_Copier.mq5';
const tCopier = 'C:/Users/AMD/AppData/Roaming/MetaQuotes/Terminal/66F5E7F481A026D99CDDE6509362A170/MQL5/Experts/AIOX_Local_Trade_Copier.mq5';

const pCode = fs.readFileSync(pCopier, 'utf8');
const tCode = fs.readFileSync(tCopier, 'utf8');

console.log('Tamanho Protheus:', pCode.length, 'Tamanho Terminal:', tCode.length);
if (pCode === tCode) {
  console.log('São idênticos!');
} else {
  console.log('Diferenças encontradas:');
  const pLines = pCode.split('\n');
  const tLines = tCode.split('\n');
  for (let i = 0; i < Math.max(pLines.length, tLines.length); i++) {
    if (pLines[i] !== tLines[i]) {
      console.log(`Linha ${i+1}:`);
      console.log(`  Protheus: ${pLines[i]}`);
      console.log(`  Terminal: ${tLines[i]}`);
      if (i > 50) break; // limite
    }
  }
}
