import { execSync } from 'node:child_process';

const tasks = ['AIOX Cloud Continuity Backup', 'SommersStore Project Mirror Sync'];

for (const t of tasks) {
  try {
    const raw = execSync(`schtasks /query /tn "${t}" /fo LIST`, { encoding: 'utf8' });
    console.log(`=== TASK: ${t} ===\n${raw}`);
  } catch (err) {
    console.log(`Failed to query task ${t}:`, err.message);
  }
}
