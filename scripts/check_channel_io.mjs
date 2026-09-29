import fs from 'node:fs';

const p = 'C:/Users/AMD/AppData/Roaming/MetaQuotes/Terminal/66F5E7F481A026D99CDDE6509362A170/MQL5/Experts/AIOX_Local_Trade_Copier.mq5';
const text = fs.readFileSync(p, 'utf8');

const matches = text.match(/string\s+ChannelFileName[^{]*\{[^}]*\}/s);
if (matches) {
  console.log(matches[0]);
} else {
  // search for FileOpen
  const lines = text.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('FileOpen') || l.includes('ChannelFileName') || l.includes('COMMON')) {
      console.log(`L${idx+1}: ${l}`);
    }
  });
}
