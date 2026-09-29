import fs from 'node:fs';

const report = 'G:/Meu Drive/SommersStore - Backup PC/20-Relatorios-de-Integridade/latest-continuity-report.json';
if (fs.existsSync(report)) {
  const content = fs.readFileSync(report, 'utf8');
  console.log('=== LATEST CONTINUITY REPORT CONTENT ===\n', content);
} else {
  console.log('Report not found');
}
