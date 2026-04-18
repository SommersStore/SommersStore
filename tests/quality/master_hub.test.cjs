const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), 'utf8'));
}

function testProjectFlows() {
  const flows = readJson('docs/control/project_flows.json');
  assert.ok(flows && typeof flows === 'object');
  assert.ok(flows.projects && typeof flows.projects === 'object');

  for (const key of ['sais', 'velas', 'electro']) {
    assert.ok(flows.projects[key], `missing project "${key}"`);
  }

  for (const [projectId, project] of Object.entries(flows.projects)) {
    assert.ok(Array.isArray(project.construcao), `${projectId}.construcao must be array`);
    assert.ok(Array.isArray(project.vendas), `${projectId}.vendas must be array`);

    const allItems = [...project.construcao, ...project.vendas];
    const ids = new Set(allItems.map(item => item.id));
    allItems.forEach(item => {
      assert.ok(item.id, `${projectId}: item.id is required`);
      assert.ok(item.nome, `${projectId}:${item.id} item.nome is required`);
      assert.ok(item.status, `${projectId}:${item.id} item.status is required`);
      const deps = Array.isArray(item.depends_on) ? item.depends_on : [];
      deps.forEach(dep => {
        assert.ok(ids.has(dep), `${projectId}:${item.id} depends_on unknown id "${dep}"`);
      });
    });
  }
}

function testPersonaMaterials() {
  const registry = readJson('docs/control/registry.json');
  const personaMaterials = readJson('docs/control/persona_materials.json');

  assert.ok(Array.isArray(registry.personas), 'registry.personas must be an array');
  assert.ok(Array.isArray(personaMaterials.items), 'persona_materials.items must be an array');

  const personaIds = new Set(registry.personas.map(p => p.id));
  const materialIds = new Set(personaMaterials.items.map(item => item.persona_id));

  personaIds.forEach(personaId => {
    assert.ok(materialIds.has(personaId), `persona "${personaId}" is missing in persona_materials`);
  });
}

function testIntegrationPoints() {
  const dashboardHtml = fs.readFileSync(path.join(ROOT, 'docs/aiox_dashboard.html'), 'utf8');
  const serverJs = fs.readFileSync(path.join(ROOT, 'scripts/dashboard_server.js'), 'utf8');
  const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const backfillScript = fs.readFileSync(path.join(ROOT, 'scripts/maintenance/backfill_project_log_ids.cjs'), 'utf8');

  assert.match(dashboardHtml, /fetch\('\/api\/project-flows'\)/, 'dashboard should fetch /api/project-flows');
  assert.match(serverJs, /\/api\/project-flows/, 'server should expose /api/project-flows');
  assert.match(dashboardHtml, /id="master-project-kpis"/, 'dashboard should render master project KPIs container');
  assert.match(dashboardHtml, /function renderMasterProjectKpis\(/, 'dashboard should define KPI renderer for project metrics');
  assert.match(dashboardHtml, /id="master-project-timeline"/, 'dashboard should render master timeline container');
  assert.match(dashboardHtml, /function buildMasterTimelineEvents\(/, 'dashboard should define timeline event builder');
  assert.match(dashboardHtml, /function renderMasterProjectTimeline\(/, 'dashboard should define timeline renderer');
  assert.match(dashboardHtml, /entry\.project_id/, 'dashboard timeline should consume explicit project_id from logs');
  assert.match(dashboardHtml, /function isMasterGlobalSearchActive\(/, 'dashboard should define global search activation helper');
  assert.match(dashboardHtml, /function getMasterGlobalSearchItems\(/, 'dashboard should define global search item indexer');
  assert.match(dashboardHtml, /Busca global no Master Hub/, 'dashboard should surface global search caption');
  assert.match(dashboardHtml, /context_project_label/, 'dashboard cards should include project context for global search results');
  assert.match(dashboardHtml, /function getSessionProjectId\(/, 'dashboard should define session project resolver');
  assert.match(dashboardHtml, /project_id:\s*getSessionProjectId\(\)/, 'dashboard session payloads should include project_id');
  assert.match(serverJs, /project_id:\s*normalizedProjectId/, 'server logs should persist project_id in appendExecutionLog');
  assert.match(serverJs, /body\.project_id\s*\|\|\s*null/, 'server should accept project_id from log payloads');
  assert.match(serverJs, /const payloadProjectId = normalizeProjectId\(body\.project_id \|\| null\)/, 'server should normalize project_id in session flows');
  assert.match(serverJs, /project_id:\s*closeProjectId/, 'server should persist project_id when closing session');
  assert.match(serverJs, /haystack\.includes\('SIZ'\)/, 'server inference should include legacy SIZ alias');
  assert.equal(packageJson.scripts['logs:backfill:project-id'], 'node scripts/maintenance/backfill_project_log_ids.cjs', 'package script for log backfill should exist');
  assert.match(backfillScript, /inferProjectIdFromSession\(/, 'backfill script should infer project id from session archives');
}

function run() {
  testProjectFlows();
  testPersonaMaterials();
  testIntegrationPoints();
  console.log('Tests passed: Master Hub quality checks succeeded.');
}

run();
