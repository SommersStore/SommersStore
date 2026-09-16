#!/usr/bin/env node
'use strict';

const path = require('path');
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
if (args.includes('--no-commit') || args.includes('--no-backup')) {
  process.stderr.write('Parametros inseguros legados foram removidos. Use finalize_day.cjs --test-mode para teste.\n');
  process.exitCode = 2;
} else {
  const forwarded = args.filter((arg) => arg !== '--push');
  if (args.includes('--push') && !forwarded.includes('--no-shutdown')) forwarded.push('--no-shutdown');
  const result = spawnSync(process.execPath, [path.join(__dirname, 'finalize_day.cjs'), ...forwarded], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
    windowsHide: false,
    shell: false
  });
  process.exitCode = Number.isInteger(result.status) ? result.status : 1;
}
