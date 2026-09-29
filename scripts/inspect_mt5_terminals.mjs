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

console.log('--- INSPEÇÃO DAS PASTAS DE TERMINAIS MT5 ---');
for (const t of terminals) {
  const terminalDir = path.join(basePath, t.hash);
  console.log(`\n[${t.role}] ${t.name} (${t.login}) - Hash: ${t.hash}`);
  if (!fs.existsSync(terminalDir)) {
    console.log('  ❌ Pasta do terminal NÃO encontrada:', terminalDir);
    continue;
  }
  console.log('  ✅ Pasta do terminal encontrada:', terminalDir);
  
  const expertsDir = path.join(terminalDir, 'MQL5/Experts');
  if (fs.existsSync(expertsDir)) {
    console.log('  📁 MQL5/Experts:');
    const items = fs.readdirSync(expertsDir, { withFileTypes: true });
    for (const item of items) {
      console.log(`     - ${item.isDirectory() ? '[DIR] ' : ''}${item.name}`);
    }
  } else {
    console.log('  ⚠️ MQL5/Experts não existe');
  }

  const templatesDir = path.join(terminalDir, 'MQL5/Profiles/Templates');
  if (fs.existsSync(templatesDir)) {
    const tpls = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tpl'));
    console.log('  📄 Templates relevantes:', tpls.filter(f => f.includes('Gamma') || f.includes('SFX') || f.includes('AIOX')).join(', ') || 'nenhum específico');
  }
}
