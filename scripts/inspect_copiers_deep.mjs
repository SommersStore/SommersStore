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

function listRecursive(dir, prefix = '') {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
    if (ent.isDirectory()) {
      results.push(`[DIR] ${rel}`);
      results = results.concat(listRecursive(full, rel));
    } else {
      results.push(`      ${rel}`);
    }
  }
  return results;
}

for (const t of terminals) {
  const terminalDir = path.join(basePath, t.hash);
  console.log(`\n=== [${t.role}] ${t.name} (${t.login}) ===`);
  const expertsDir = path.join(terminalDir, 'MQL5/Experts');
  const items = listRecursive(expertsDir);
  for (const it of items) {
    if (it.toLowerCase().includes('copier') || it.toLowerCase().includes('nts') || it.toLowerCase().includes('mytrader') || it.toLowerCase().includes('protheus')) {
      console.log(it);
    }
  }
}
