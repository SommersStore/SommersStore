const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const CONTROL_DIR = path.join(ROOT, 'docs', 'control');
const LOG_PATH = path.join(CONTROL_DIR, 'execution_log.json');
const FLOWS_PATH = path.join(CONTROL_DIR, 'project_flows.json');
const SESSIONS_DIR = path.join(CONTROL_DIR, 'sessions');

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (_) {
    return fallback;
  }
}

function normalizeProjectId(raw) {
  const value = String(raw || '').trim().toLowerCase();
  if (value === 'sais' || value === 'velas' || value === 'electro') return value;
  return null;
}

function inferProjectIdFromText(text, flows) {
  const haystack = String(text || '').trim().toUpperCase();
  if (!haystack) return null;

  if (haystack.includes('SAIS') || haystack.includes('SIZ')) return 'sais';
  if (haystack.includes('VELAS')) return 'velas';
  if (haystack.includes('ELECTRO')) return 'electro';

  const projects = (flows && flows.projects) || {};
  for (const [projectId, project] of Object.entries(projects)) {
    const normalizedProject = normalizeProjectId(projectId);
    if (!normalizedProject) continue;
    if (haystack.includes(String(projectId).toUpperCase())) return normalizedProject;

    const projectLabel = String((project && project.label) || '').trim().toUpperCase();
    if (projectLabel && haystack.includes(projectLabel)) return normalizedProject;

    const nodes = []
      .concat(Array.isArray(project.construcao) ? project.construcao : [])
      .concat(Array.isArray(project.vendas) ? project.vendas : []);
    const ids = nodes.map(node => String((node && node.id) || '').toUpperCase()).filter(Boolean);
    if (ids.some(id => haystack.includes(id))) return normalizedProject;
  }

  return null;
}

function loadSessionById(sessionId) {
  const safe = String(sessionId || '').trim();
  if (!safe) return null;
  const filePath = path.join(SESSIONS_DIR, `${safe}.json`);
  if (!fs.existsSync(filePath)) return null;
  return readJson(filePath, null);
}

function inferProjectIdFromSession(session, flows) {
  if (!session || typeof session !== 'object') return null;
  const explicit = normalizeProjectId(session.project_id || null);
  if (explicit) return explicit;

  const candidates = [
    session.close_summary,
    session.next_action,
    session.last_context_note,
    session.source,
    JSON.stringify(session.context_flash || {})
  ];
  for (const text of candidates) {
    const inferred = inferProjectIdFromText(text, flows);
    if (inferred) return inferred;
  }
  return null;
}

function main() {
  const flows = readJson(FLOWS_PATH, { projects: {} });
  const logData = readJson(LOG_PATH, { entries: [] });
  const entries = Array.isArray(logData.entries) ? logData.entries : [];

  let changed = 0;
  let unresolved = 0;
  const counts = { sais: 0, velas: 0, electro: 0 };

  entries.forEach(entry => {
    if (!entry || typeof entry !== 'object') return;

    const existing = normalizeProjectId(entry.project_id || null);
    if (existing) {
      counts[existing] += 1;
      entry.project_id = existing;
      return;
    }

    let inferred =
      inferProjectIdFromText(entry.target, flows) ||
      inferProjectIdFromText(entry.details, flows) ||
      inferProjectIdFromText(entry.why_this_ran, flows) ||
      inferProjectIdFromText(entry.action, flows) ||
      inferProjectIdFromText(entry.type, flows);

    if (!inferred) {
      const target = String(entry.target || '').trim();
      if (/^SES-\d{8}-\d{4}$/i.test(target)) {
        const session = loadSessionById(target);
        inferred = inferProjectIdFromSession(session, flows);
      }
    }

    if (inferred) {
      entry.project_id = inferred;
      counts[inferred] += 1;
      changed += 1;
      return;
    }

    entry.project_id = null;
    unresolved += 1;
  });

  logData.entries = entries;
  fs.writeFileSync(LOG_PATH, `${JSON.stringify(logData, null, 2)}\n`, 'utf8');

  console.log(`Backfill concluido. Atualizados: ${changed} | Sem inferencia: ${unresolved}`);
  console.log(`Totais com project_id -> sais: ${counts.sais}, velas: ${counts.velas}, electro: ${counts.electro}`);
}

main();
