const fs = require('fs');
const path = require('path');

const filesToTrim = [
  'docs/control/session_state.json',
  'docs/control/memory_mutations.json',
  'docs/control/memory_checkpoints.json',
  'docs/control/execution_log.json',
  'docs/control/memory_execution_journal.json'
];

filesToTrim.forEach(file => {
  const fullPath = path.resolve(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) return;
  try {
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    let changed = false;
    
    if (data.history && Array.isArray(data.history) && data.history.length > 50) {
      data.history = data.history.slice(-50);
      changed = true;
    }
    if (data.mutations && Array.isArray(data.mutations) && data.mutations.length > 50) {
      data.mutations = data.mutations.slice(-50);
      changed = true;
    }
    if (data.checkpoints && Array.isArray(data.checkpoints) && data.checkpoints.length > 50) {
      data.checkpoints = data.checkpoints.slice(-50);
      changed = true;
    }
    if (data.journal && Array.isArray(data.journal) && data.journal.length > 50) {
      data.journal = data.journal.slice(-50);
      changed = true;
    }
    if (Array.isArray(data) && data.length > 50) {
      const trimmed = data.slice(-50);
      fs.writeFileSync(fullPath, JSON.stringify(trimmed, null, 2));
      console.log('Trimmed array root:', file);
      return;
    }

    if (changed) {
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
      console.log('Trimmed:', file);
    }
  } catch(e) {
    console.error('Error parsing', file, e.message);
  }
});
