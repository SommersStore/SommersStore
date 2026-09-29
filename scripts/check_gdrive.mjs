import fs from 'node:fs';
import path from 'node:path';

function checkDir(d) {
  try {
    if (fs.existsSync(d)) {
      console.log(`[EXISTS] ${d}`);
      const items = fs.readdirSync(d);
      for (const item of items.slice(0, 15)) {
        const full = path.join(d, item);
        const stat = fs.statSync(full);
        console.log(`  - ${item} (${stat.isDirectory() ? 'DIR' : (stat.size / 1024).toFixed(1) + ' KB'}, mtime: ${stat.mtime.toISOString()})`);
      }
    } else {
      console.log(`[NOT FOUND] ${d}`);
    }
  } catch (err) {
    console.log(`[ERROR] ${d}: ${err.message}`);
  }
}

console.log('=== CHECKING GOOGLE DRIVE BACKUPS ===');
checkDir('G:/Meu Drive');
checkDir('G:/Meu Drive/SommersStore - Backup PC');
checkDir('G:/Meu Drive/SommersStore - Backup PC/10-Backups-Criptografados');
checkDir('G:/Meu Drive/SommersStore - Backup PC/10-Backups-Criptografados/Restic-AIOX');
checkDir('G:/Meu Drive/SommersStore - Backup PC/10-Backups-Criptografados/Restic-AIOX/snapshots');
