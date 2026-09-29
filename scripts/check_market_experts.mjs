import fs from 'node:fs';
import path from 'node:path';

const terminals = [
  { role: 'Master', name: 'ActivTrades Demo', login: 6275085, hash: '66F5E7F481A026D99CDDE6509362A170' },
  { role: 'Receptora', name: 'FTMO Demo', login: 1514716800, hash: '81A933A9AFC5DE3C23B15CAB19C63850' },
  { role: 'Receptora', name: 'Funded Trader Markets', login: 227066, hash: '583A64D2031E6C8095B7351F1A8090CE' },
  { role: 'Receptora', name: 'Blue Guardian', login: 570363, hash: '0D1C97C3AF4FEF2A552E03CE90448FCA' },
  { role: 'Receptora', name: 'LVL Funding - Zero Markets', login: 135070062, hash: 'BF9A9B181CCD45EEBD131F7DF1A32F72' },
];

const basePath = path.join(process.env.APPDATA, 'MetaQuotes/Terminal');

for (const t of terminals) {
  const marketDir = path.join(basePath, t.hash, 'MQL5/Experts/Market');
  if (fs.existsSync(marketDir)) {
    const files = fs.readdirSync(marketDir);
    console.log(`[${t.role}] ${t.name} -> Market:`, files.join(', ') || '(vazio)');
  }
}
