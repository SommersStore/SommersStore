import fs from 'node:fs';
import path from 'node:path';

const possiblePaths = [
  'C:\\Program Files\\ActivTrades MT5\\metaeditor64.exe',
  'C:\\Program Files\\FTMO Global Markets MT5\\metaeditor64.exe',
  'C:\\Program Files\\MetaTrader 5\\metaeditor64.exe',
  'C:\\Program Files (x86)\\MetaTrader 5\\metaeditor.exe',
];

// Look into common Program Files directories
const roots = ['C:\\Program Files', 'C:\\Program Files (x86)'];
let found = [];

for (const r of roots) {
  if (!fs.existsSync(r)) continue;
  try {
    const list = fs.readdirSync(r);
    for (const d of list) {
      if (/metatrader|activtrades|ftmo|funded|guardian|zero/i.test(d)) {
        const fullDir = path.join(r, d);
        const me64 = path.join(fullDir, 'metaeditor64.exe');
        const me32 = path.join(fullDir, 'metaeditor.exe');
        if (fs.existsSync(me64)) found.push(me64);
        if (fs.existsSync(me32)) found.push(me32);
      }
    }
  } catch (e) {
    // ignore
  }
}

console.log('MetaEditor executáveis encontrados:');
found.forEach(f => console.log(' -', f));
