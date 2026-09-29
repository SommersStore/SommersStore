import fs from 'node:fs';

const lockDir = 'G:/Meu Drive/SommersStore - Backup PC/10-Backups-Criptografados/Restic-AIOX/locks';
if (fs.existsSync(lockDir)) {
  const locks = fs.readdirSync(lockDir);
  console.log('Locks found:', locks);
  for (const l of locks) {
    try {
      const content = fs.readFileSync(`${lockDir}/${l}`, 'utf8');
      console.log(`Lock ${l}:`, content);
    } catch (e) {
      console.log(`Could not read ${l}`);
    }
  }
}
