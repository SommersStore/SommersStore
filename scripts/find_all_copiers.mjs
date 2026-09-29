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

function findFiles(dir, matchFn) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      res = res.concat(findFiles(full, matchFn));
    } else if (matchFn(item.name)) {
      res.push(full);
    }
  }
  return res;
}

for (const t of terminals) {
  const terminalDir = path.join(basePath, t.hash);
  const found = findFiles(terminalDir, name => /copier|nts/i.test(name));
  console.log(`\n[${t.role}] ${t.name}:`);
  for (const f of found) {
    console.log(' ', path.relative(terminalDir, f));
  }
}
