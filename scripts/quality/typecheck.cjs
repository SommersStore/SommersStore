const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const CONTROL_DIR = path.join(ROOT, 'docs', 'control');
const ALLOWED_STATUSES = new Set([
  'nao_iniciado',
  'em_preparacao',
  'em_execucao',
  'em_revisao',
  'aprovado',
  'bloqueado',
  'publicado',
  'ativo'
]);

const errors = [];

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function addError(message) {
  errors.push(message);
}

function assert(condition, message) {
  if (!condition) addError(message);
}

function readJson(relPath) {
  const filePath = path.join(ROOT, relPath);
  let raw = '';
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    addError(`${relPath}: could not read file (${err.message})`);
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    addError(`${relPath}: invalid JSON (${err.message})`);
    return null;
  }
}

function isSafeRelativePath(input) {
  if (typeof input !== 'string' || !input.trim()) return false;
  const normalized = input.replace(/\\/g, '/').trim();
  if (normalized.startsWith('/')) return false;
  if (/^[a-zA-Z]:\//.test(normalized)) return false;
  if (normalized.includes('..')) return false;
  return true;
}

function expectString(value, label) {
  assert(typeof value === 'string' && value.trim().length > 0, `${label} must be a non-empty string`);
}

function expectStringArray(value, label) {
  assert(Array.isArray(value), `${label} must be an array`);
  if (!Array.isArray(value)) return;
  value.forEach((item, idx) => {
    assert(typeof item === 'string' && item.trim().length > 0, `${label}[${idx}] must be a non-empty string`);
  });
}

function validateProjectFlows() {
  const relPath = 'docs/control/project_flows.json';
  const data = readJson(relPath);
  if (!isPlainObject(data)) {
    addError(`${relPath}: root must be an object`);
    return;
  }

  assert(isPlainObject(data.projects), `${relPath}: "projects" must be an object`);
  if (!isPlainObject(data.projects)) return;

  const projectEntries = Object.entries(data.projects);
  assert(projectEntries.length > 0, `${relPath}: "projects" cannot be empty`);

  const projectIds = new Set(projectEntries.map(([projectId]) => projectId));

  for (const [projectId, project] of projectEntries) {
    const base = `${relPath}: projects.${projectId}`;
    assert(isPlainObject(project), `${base} must be an object`);
    if (!isPlainObject(project)) continue;

    expectString(project.label, `${base}.label`);
    expectString(project.description, `${base}.description`);

    const lanes = ['construcao', 'vendas'];
    const allIds = new Set();
    const pendingDependencies = [];

    for (const lane of lanes) {
      const laneValue = project[lane];
      assert(Array.isArray(laneValue), `${base}.${lane} must be an array`);
      if (!Array.isArray(laneValue)) continue;

      laneValue.forEach((item, index) => {
        const itemLabel = `${base}.${lane}[${index}]`;
        assert(isPlainObject(item), `${itemLabel} must be an object`);
        if (!isPlainObject(item)) return;

        expectString(item.id, `${itemLabel}.id`);
        expectString(item.nome, `${itemLabel}.nome`);
        expectString(item.squad, `${itemLabel}.squad`);
        expectString(item.status, `${itemLabel}.status`);
        expectString(item.resumo, `${itemLabel}.resumo`);
        expectString(item.entrega, `${itemLabel}.entrega`);
        expectString(item.entrega_para, `${itemLabel}.entrega_para`);

        if (typeof item.status === 'string') {
          assert(
            ALLOWED_STATUSES.has(item.status),
            `${itemLabel}.status "${item.status}" is not in the allowed list`
          );
        }

        if (typeof item.id === 'string' && item.id.trim()) {
          assert(!allIds.has(item.id), `${itemLabel}.id "${item.id}" is duplicated in project ${projectId}`);
          allIds.add(item.id);
        }

        if (item.depends_on !== undefined) {
          expectStringArray(item.depends_on, `${itemLabel}.depends_on`);
          if (Array.isArray(item.depends_on)) {
            item.depends_on.forEach(dep => {
              pendingDependencies.push({ itemId: item.id, depId: dep, itemLabel });
            });
          }
        }
      });
    }

    pendingDependencies.forEach(dep => {
      assert(dep.itemId !== dep.depId, `${dep.itemLabel}.depends_on cannot include its own id "${dep.depId}"`);
      assert(
        allIds.has(dep.depId),
        `${dep.itemLabel}.depends_on references unknown id "${dep.depId}" in project ${projectId}`
      );
    });
  }

  return { projectIds };
}

function validateRegistry() {
  const relPath = 'docs/control/registry.json';
  const data = readJson(relPath);
  if (!isPlainObject(data)) {
    addError(`${relPath}: root must be an object`);
    return { personaIds: new Set(), squadIds: new Set() };
  }

  assert(Array.isArray(data.squads), `${relPath}: "squads" must be an array`);
  assert(Array.isArray(data.agents), `${relPath}: "agents" must be an array`);
  assert(Array.isArray(data.personas), `${relPath}: "personas" must be an array`);

  const squadIds = new Set();
  const personaIds = new Set();

  if (Array.isArray(data.squads)) {
    data.squads.forEach((squad, index) => {
      const label = `${relPath}: squads[${index}]`;
      assert(isPlainObject(squad), `${label} must be an object`);
      if (!isPlainObject(squad)) return;
      expectString(squad.id, `${label}.id`);
      expectString(squad.name, `${label}.name`);
      if (typeof squad.id === 'string' && squad.id.trim()) {
        assert(!squadIds.has(squad.id), `${label}.id "${squad.id}" is duplicated`);
        squadIds.add(squad.id);
      }
    });
  }

  const agentIds = new Set();
  if (Array.isArray(data.agents)) {
    data.agents.forEach((agent, index) => {
      const label = `${relPath}: agents[${index}]`;
      assert(isPlainObject(agent), `${label} must be an object`);
      if (!isPlainObject(agent)) return;
      expectString(agent.id, `${label}.id`);
      expectString(agent.name, `${label}.name`);
      expectString(agent.squad, `${label}.squad`);
      if (typeof agent.id === 'string' && agent.id.trim()) {
        assert(!agentIds.has(agent.id), `${label}.id "${agent.id}" is duplicated`);
        agentIds.add(agent.id);
      }
      if (typeof agent.squad === 'string' && agent.squad.trim()) {
        assert(squadIds.has(agent.squad), `${label}.squad "${agent.squad}" was not found in squads`);
      }
    });
  }

  if (Array.isArray(data.personas)) {
    data.personas.forEach((persona, index) => {
      const label = `${relPath}: personas[${index}]`;
      assert(isPlainObject(persona), `${label} must be an object`);
      if (!isPlainObject(persona)) return;
      expectString(persona.id, `${label}.id`);
      expectString(persona.name, `${label}.name`);
      if (typeof persona.id === 'string' && persona.id.trim()) {
        assert(!personaIds.has(persona.id), `${label}.id "${persona.id}" is duplicated`);
        personaIds.add(persona.id);
      }
    });
  }

  return { personaIds, squadIds };
}

function validatePersonaMaterials(registryPersonaIds) {
  const relPath = 'docs/control/persona_materials.json';
  const data = readJson(relPath);
  if (!isPlainObject(data)) {
    addError(`${relPath}: root must be an object`);
    return;
  }

  assert(Array.isArray(data.items), `${relPath}: "items" must be an array`);
  if (!Array.isArray(data.items)) return;

  const seenPersonaIds = new Set();
  data.items.forEach((item, index) => {
    const label = `${relPath}: items[${index}]`;
    assert(isPlainObject(item), `${label} must be an object`);
    if (!isPlainObject(item)) return;

    expectString(item.persona_id, `${label}.persona_id`);
    if (typeof item.persona_id === 'string' && item.persona_id.trim()) {
      assert(!seenPersonaIds.has(item.persona_id), `${label}.persona_id "${item.persona_id}" is duplicated`);
      seenPersonaIds.add(item.persona_id);
      assert(
        registryPersonaIds.has(item.persona_id),
        `${label}.persona_id "${item.persona_id}" was not found in registry personas`
      );
    }

    if (item.clone_file !== null && item.clone_file !== undefined) {
      expectString(item.clone_file, `${label}.clone_file`);
      if (typeof item.clone_file === 'string' && item.clone_file.trim()) {
        assert(isSafeRelativePath(item.clone_file), `${label}.clone_file must be a safe relative path`);
      }
    }

    ['transcript_files', 'book_files', 'support_files'].forEach(field => {
      const value = item[field];
      expectStringArray(value, `${label}.${field}`);
      if (Array.isArray(value)) {
        value.forEach((filePath, fileIndex) => {
          assert(
            isSafeRelativePath(filePath),
            `${label}.${field}[${fileIndex}] must be a safe relative path`
          );
        });
      }
    });

    if (item.full_transcript_files !== undefined) {
      expectStringArray(item.full_transcript_files, `${label}.full_transcript_files`);
      if (Array.isArray(item.full_transcript_files)) {
        item.full_transcript_files.forEach((filePath, fileIndex) => {
          assert(
            isSafeRelativePath(filePath),
            `${label}.full_transcript_files[${fileIndex}] must be a safe relative path`
          );
        });
      }
    }
  });
}

function validateExecutionLogs(projectIds) {
  const relPath = 'docs/control/execution_log.json';
  const data = readJson(relPath);
  if (!isPlainObject(data)) {
    addError(`${relPath}: root must be an object`);
    return;
  }

  assert(Array.isArray(data.entries), `${relPath}: "entries" must be an array`);
  if (!Array.isArray(data.entries)) return;

  data.entries.forEach((entry, index) => {
    const label = `${relPath}: entries[${index}]`;
    assert(isPlainObject(entry), `${label} must be an object`);
    if (!isPlainObject(entry)) return;
    if (entry.project_id !== null && entry.project_id !== undefined) {
      expectString(entry.project_id, `${label}.project_id`);
      if (typeof entry.project_id === 'string' && entry.project_id.trim()) {
        assert(
          projectIds.has(entry.project_id),
          `${label}.project_id "${entry.project_id}" was not found in project_flows`
        );
      }
    }
  });
}

function run() {
  const requiredFiles = [
    path.join(CONTROL_DIR, 'project_flows.json'),
    path.join(CONTROL_DIR, 'registry.json'),
    path.join(CONTROL_DIR, 'persona_materials.json'),
    path.join(CONTROL_DIR, 'execution_log.json')
  ];
  requiredFiles.forEach(filePath => {
    assert(fs.existsSync(filePath), `required file is missing: ${path.relative(ROOT, filePath)}`);
  });

  const projectFlowInfo = validateProjectFlows() || { projectIds: new Set() };
  const registryInfo = validateRegistry();
  validatePersonaMaterials(registryInfo.personaIds);
  validateExecutionLogs(projectFlowInfo.projectIds);

  if (errors.length) {
    console.error('Typecheck failed with the following issues:');
    errors.forEach((msg, idx) => {
      console.error(`${idx + 1}. ${msg}`);
    });
    process.exit(1);
  }

  console.log('Typecheck passed: control JSON schemas are consistent for Master Hub.');
}

run();
