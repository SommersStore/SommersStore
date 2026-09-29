import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

const terminals = [
  { role: 'Master', name: 'ActivTrades Demo', login: 6275085, hash: '66F5E7F481A026D99CDDE6509362A170' },
  { role: 'Receptora', name: 'FTMO Demo', login: 1514716800, hash: '81A933A9AFC5DE3C23B15CAB19C63850' },
  { role: 'Receptora', name: 'Funded Trader Markets', login: 227066, hash: '583A64D2031E6C8095B7351F1A8090CE' },
  { role: 'Receptora', name: 'Blue Guardian', login: 570363, hash: '0D1C97C3AF4FEF2A552E03CE90448FCA' },
  { role: 'Receptora', name: 'LVL Funding - Zero Markets', login: 135070062, hash: 'BF9A9B181CCD45EEBD131F7DF1A32F72' },
];

const basePath = path.join(process.env.APPDATA, 'MetaQuotes/Terminal');
const protheusMt5 = 'C:/AIOX/Workspace/Protheus/platforms/mt5';
const sommersMt5 = 'C:/AIOX/Workspace/SommersStore/projects/forex/tools/mt5';

console.log('--- REPOSITÓRIOS ---');
for (const [repoName, repoPath] of [['Protheus', protheusMt5], ['SommersStore', sommersMt5]]) {
  for (const f of ['AIOX_Trader_On_Chart.mq5', 'AIOX_Local_Trade_Copier.mq5']) {
    const p = path.join(repoPath, f);
    if (fs.existsSync(p)) {
      const buf = fs.readFileSync(p);
      const str = buf.toString('utf8');
      const verMatch = str.match(/#property\s+version\s+"([^"]+)"/);
      const mtime = fs.statSync(p).mtime.toISOString();
      console.log(`[${repoName}] ${f} -> Ver: ${verMatch ? verMatch[1] : '?'} | Size: ${buf.length} | Hash: ${sha256(buf).slice(0, 10)} | Mtime: ${mtime}`);
    } else {
      console.log(`[${repoName}] ${f} -> NÃO ENCONTRADO em ${p}`);
    }
  }
}

console.log('\n--- TERMINAIS MT5 (ROAMING) ---');
for (const t of terminals) {
  const terminalDir = path.join(basePath, t.hash);
  for (const f of ['AIOX_Trader_On_Chart.mq5', 'AIOX_Local_Trade_Copier.mq5']) {
    const p = path.join(terminalDir, 'MQL5/Experts', f);
    if (fs.existsSync(p)) {
      const buf = fs.readFileSync(p);
      const str = buf.toString('utf8');
      const verMatch = str.match(/#property\s+version\s+"([^"]+)"/);
      const mtime = fs.statSync(p).mtime.toISOString();
      console.log(`[${t.role}] ${t.name} -> ${f} | Ver: ${verMatch ? verMatch[1] : '?'} | Size: ${buf.length} | Hash: ${sha256(buf).slice(0, 10)} | Mtime: ${mtime}`);
    }
  }
}
