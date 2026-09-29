import fs from 'node:fs';
import path from 'node:path';

const snapDir = 'G:/Meu Drive/SommersStore - Backup PC/10-Backups-Criptografados/Restic-AIOX/snapshots';
const snaps = fs.readdirSync(snapDir).map(file => {
  const stat = fs.statSync(path.join(snapDir, file));
  return { file, mtime: stat.mtime };
}).sort((a, b) => b.mtime - a.mtime);

console.log('=== LATEST RESTIC SNAPSHOTS ON GOOGLE DRIVE ===');
for (const s of snaps.slice(0, 5)) {
  console.log(`- Snapshot ID: ${s.file.substring(0, 16)}... | Date: ${s.mtime.toLocaleString('pt-BR')}`);
}

const relDir = 'G:/Meu Drive/SommersStore - Backup PC/20-Relatorios-de-Integridade';
if (fs.existsSync(relDir)) {
  const rels = fs.readdirSync(relDir).map(file => {
    const stat = fs.statSync(path.join(relDir, file));
    return { file, mtime: stat.mtime, size: (stat.size / 1024).toFixed(1) + ' KB' };
  }).sort((a, b) => b.mtime - a.mtime);
  console.log('\n=== LATEST INTEGRITY REPORTS ===');
  for (const r of rels.slice(0, 5)) {
    console.log(`- ${r.file} (${r.size}) | Date: ${r.mtime.toLocaleString('pt-BR')}`);
  }
}
