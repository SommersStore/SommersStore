const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const MATERIALS_PATH = path.join(ROOT, 'docs', 'control', 'persona_materials.json');

function normalizePathForJson(inputPath) {
  return String(inputPath || '').trim().replace(/\\/g, '/').replace(/^\/+/, '');
}

function safeWorkspacePath(relativePath) {
  const cleaned = String(relativePath || '').replace(/^[/\\]+/, '');
  const absolute = path.resolve(ROOT, cleaned);
  if (!absolute.toLowerCase().startsWith(ROOT.toLowerCase())) {
    throw new Error('Path outside workspace is not allowed');
  }
  return absolute;
}

function uniquePaths(paths) {
  return [...new Set((Array.isArray(paths) ? paths : []).map(normalizePathForJson).filter(Boolean))];
}

function isMarkdownAssetPath(relativePath) {
  const rel = normalizePathForJson(relativePath);
  return /\.(md|markdown|txt)$/i.test(rel);
}

function sanitizeMarkdownContent(rawContent) {
  const original = String(rawContent || '');
  let cleaned = original;
  const stats = {
    changed: false,
    original_bytes: Buffer.byteLength(original, 'utf8'),
    cleaned_bytes: 0,
    removed_markdown_images: 0,
    removed_html_images: 0,
    removed_data_uri_refs: 0,
    removed_base64_chunks: 0,
    removed_base64_chars: 0
  };

  cleaned = cleaned.replace(/!\[[^\]]*]\(([^)]+)\)/g, () => {
    stats.removed_markdown_images += 1;
    return '';
  });

  cleaned = cleaned.replace(/<img\b[^>]*>/gi, () => {
    stats.removed_html_images += 1;
    return '';
  });

  cleaned = cleaned.replace(/^\s*\[[^\]]+]\s*:\s*<?\s*data:image\/[^\n>]+>?\s*$/gim, match => {
    stats.removed_data_uri_refs += 1;
    stats.removed_base64_chars += match.length;
    return '';
  });

  cleaned = cleaned.replace(/[A-Za-z0-9+/=]{600,}/g, chunk => {
    stats.removed_base64_chunks += 1;
    stats.removed_base64_chars += chunk.length;
    return '';
  });

  cleaned = cleaned
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd();
  cleaned = cleaned ? `${cleaned}\n` : '';

  stats.cleaned_bytes = Buffer.byteLength(cleaned, 'utf8');
  stats.changed = cleaned !== original;

  return { cleaned, stats };
}

function loadPersonaMaterials() {
  if (!fs.existsSync(MATERIALS_PATH)) {
    throw new Error(`Arquivo nao encontrado: ${MATERIALS_PATH}`);
  }
  return JSON.parse(fs.readFileSync(MATERIALS_PATH, 'utf8'));
}

function collectMarkdownPaths(materials) {
  const items = Array.isArray(materials.items) ? materials.items : [];
  const all = [];
  for (const entry of items) {
    all.push(entry.clone_file || null);
    all.push(...(Array.isArray(entry.transcript_files) ? entry.transcript_files : []));
    all.push(...(Array.isArray(entry.full_transcript_files) ? entry.full_transcript_files : []));
    all.push(...(Array.isArray(entry.support_files) ? entry.support_files : []));
  }
  return uniquePaths(all).filter(isMarkdownAssetPath);
}

function cleanFile(relativePath) {
  const rel = normalizePathForJson(relativePath);
  const absolute = safeWorkspacePath(rel);
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    return { path: rel, exists: false, cleaned: false, removed_bytes: 0 };
  }
  const original = fs.readFileSync(absolute, 'utf8');
  const { cleaned, stats } = sanitizeMarkdownContent(original);
  if (stats.changed) {
    fs.writeFileSync(absolute, cleaned, 'utf8');
  }
  return {
    path: rel,
    exists: true,
    cleaned: stats.changed,
    removed_bytes: Math.max(0, stats.original_bytes - stats.cleaned_bytes),
    stats
  };
}

function main() {
  const materials = loadPersonaMaterials();
  const files = collectMarkdownPaths(materials);
  const results = files.map(cleanFile);
  const changed = results.filter(item => item.cleaned);
  const removedBytes = changed.reduce((acc, item) => acc + item.removed_bytes, 0);

  console.log(`Arquivos analisados: ${files.length}`);
  console.log(`Arquivos alterados: ${changed.length}`);
  console.log(`Bytes removidos: ${removedBytes}`);

  if (changed.length) {
    console.log('Alterados:');
    changed.forEach(item => console.log(`- ${item.path}`));
  }
}

main();
