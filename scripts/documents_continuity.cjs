'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const PLATFORM_SEGMENT_PATTERNS = [
  /^ninjatrader(?:\s*8)?(?:$|[\s_-])/i,
  /^ctrader(?:$|[\s_-])/i,
  /^calgo(?:$|[\s_-])/i,
  /^metatrader(?:\s*[45])?(?:$|[\s_-])/i,
  /^metaquotes(?:$|[\s_-])/i,
  /^jforex(?:\s*\d+)?(?:$|[\s_-])/i,
  /^profit(?:pro)?(?:$|[\s_-])/i,
  /^blackarrow(?:$|[\s_-])/i,
  /^nelogica(?:$|[\s_-])/i,
  /^spotware(?:$|[\s_-])/i,
  /^tradovate(?:$|[\s_-])/i,
  /^ibkr(?:$|[\s_-])/i,
  /^jts(?:$|[\s_-])/i,
  /^trader workstation(?:$|[\s_-])/i
];

const BLOCKED_FILE_PATTERNS = [
  /^auth\.json$/i,
  /^credentials(?:\..+)?\.json$/i,
  /^\.env(?:\..+)?$/i,
  /\.(?:key|pem|p12|pfx)$/i,
  /\.tmp$/i,
  /^~\$/,
  /^thumbs\.db$/i,
  /^desktop\.ini$/i
];

function resolveDocumentsRoot(environment = process.env) {
  const candidates = [
    environment.AIOX_DOCUMENTS_ROOT,
    environment.USERPROFILE ? path.join(environment.USERPROFILE, 'Documents') : null,
    path.join(os.homedir(), 'Documents')
  ].filter(Boolean).map((candidate) => path.resolve(candidate));
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) || null;
}

function stateRoot(environment = process.env) {
  return path.resolve(environment.AIOX_DOCUMENTS_SNAPSHOT_DIR
    || path.join(environment.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'), 'AIOX', 'Continuity', 'documents'));
}

function isPlatformOperationalPath(relativePath) {
  const segments = String(relativePath || '').split(/[\\/]+/).filter(Boolean);
  return segments.some((segment) => PLATFORM_SEGMENT_PATTERNS.some((pattern) => pattern.test(segment)));
}

function shouldIncludeFile(relativePath) {
  if (isPlatformOperationalPath(relativePath)) return false;
  const baseName = path.basename(relativePath);
  return !BLOCKED_FILE_PATTERNS.some((pattern) => pattern.test(baseName));
}

function hashFile(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function ensureInside(candidate, root) {
  const relative = path.relative(path.resolve(root), path.resolve(candidate));
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function copyDocuments(sourceRoot, targetRoot) {
  const manifest = [];
  const excluded = [];
  const stack = [sourceRoot];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const source = path.join(current, entry.name);
      const relativePath = path.relative(sourceRoot, source);
      if (!ensureInside(source, sourceRoot)) continue;
      if (entry.isSymbolicLink()) {
        excluded.push({ path: relativePath, reason: 'symbolic_link' });
        continue;
      }
      if (isPlatformOperationalPath(relativePath)) {
        excluded.push({ path: relativePath, reason: 'platform_operational' });
        continue;
      }
      if (entry.isDirectory()) {
        stack.push(source);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!shouldIncludeFile(relativePath)) {
        excluded.push({ path: relativePath, reason: 'blocked_file' });
        continue;
      }
      const target = path.join(targetRoot, relativePath);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(source, target);
      const stat = fs.statSync(target);
      manifest.push({ path: relativePath.replace(/\\/g, '/'), bytes: stat.size, sha256: hashFile(target) });
    }
  }
  return { files: manifest, excluded };
}

function writeJsonAtomic(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temp = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(temp, filePath);
}

function captureDocuments(options = {}) {
  const environment = options.environment || process.env;
  const sourceRoot = options.sourceRoot || resolveDocumentsRoot(environment);
  const root = options.snapshotRoot || stateRoot(environment);
  const current = path.join(root, 'current');
  const next = path.join(root, `.next-${process.pid}-${Date.now()}`);
  if (!sourceRoot) return { ok: false, status: 'error', error: 'documents_root_not_found', root: current };
  fs.mkdirSync(next, { recursive: true });
  try {
    const copied = copyDocuments(sourceRoot, next);
    const manifest = {
      schema_version: 'aiox.documents-capture.v1',
      captured_at: new Date().toISOString(),
      source_root: sourceRoot,
      destination_root: current,
      files: copied.files.length,
      bytes: copied.files.reduce((sum, item) => sum + item.bytes, 0),
      excluded: copied.excluded,
      entries: copied.files
    };
    writeJsonAtomic(path.join(next, 'documents-capture-manifest.json'), manifest);
    const previous = path.join(root, `.previous-${process.pid}-${Date.now()}`);
    if (fs.existsSync(current)) fs.renameSync(current, previous);
    fs.renameSync(next, current);
    if (fs.existsSync(previous)) fs.rmSync(previous, { recursive: true, force: true });
    return { ok: true, status: 'success', root: current, manifest };
  } catch (error) {
    return { ok: false, status: 'error', error: error.message, root: current };
  }
}

function main() {
  const result = captureDocuments();
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = result.ok ? 0 : 1;
}

if (require.main === module) main();

module.exports = {
  BLOCKED_FILE_PATTERNS,
  PLATFORM_SEGMENT_PATTERNS,
  captureDocuments,
  copyDocuments,
  isPlatformOperationalPath,
  resolveDocumentsRoot,
  shouldIncludeFile,
  stateRoot
};
