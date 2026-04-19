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
  assert.match(dashboardHtml, /function renderSquads\(/, 'dashboard should define squads board renderer');
  assert.match(dashboardHtml, /data-squad-drop-zone=/, 'dashboard squads board should expose drop zones');
  assert.match(dashboardHtml, /handleSquadDrop\(/, 'dashboard squads board should handle drop events');
  assert.match(dashboardHtml, /id="control-hub-icon"/, 'dashboard should group control tabs under a primary control hub');
  assert.match(dashboardHtml, /CONTROL_GROUP_TABS/, 'dashboard should define grouped control tab list');
  assert.match(dashboardHtml, /function loadControlTab\(/, 'dashboard should support control sub-tab navigation');
  assert.match(dashboardHtml, /data-control-tab="alerts"/, 'dashboard control hub should expose alerts as grouped sub-tab');
  assert.match(dashboardHtml, /saveCurrentSquadPreset\(/, 'dashboard squads board should support saving presets');
  assert.match(dashboardHtml, /saveSquadAgentConfig\(/, 'dashboard squads board should support agent-level configuration');
  assert.match(dashboardHtml, /openSquadAgentDrawer\(/, 'dashboard squads board should open agent configuration drawer');
  assert.match(dashboardHtml, /handleAgentConfigDrop\(/, 'dashboard agent config drawer should support drag-and-drop drops');
  assert.match(dashboardHtml, /toggleAgentConfigItem\(/, 'dashboard agent config drawer should support moving config items between buckets');
  assert.match(dashboardHtml, /agent-config-skill-selected/, 'dashboard should render selected skills bucket');
  assert.match(dashboardHtml, /agent-config-persona-selected/, 'dashboard should render selected personas bucket');
  assert.match(dashboardHtml, /DETAIL_DRAWER_STATE/, 'dashboard should track detail drawer context state');
  assert.match(dashboardHtml, /isSamePersonaOpen/, 'dashboard should support toggle behavior when clicking the same persona');
  assert.match(dashboardHtml, /function getSessionProjectId\(/, 'dashboard should define session project resolver');
  assert.match(dashboardHtml, /project_id:\s*getSessionProjectId\(\)/, 'dashboard session payloads should include project_id');
  assert.match(serverJs, /project_id:\s*normalizedProjectId/, 'server logs should persist project_id in appendExecutionLog');
  assert.match(serverJs, /body\.project_id\s*\|\|\s*null/, 'server should accept project_id from log payloads');
  assert.match(serverJs, /const payloadProjectId = normalizeProjectId\(body\.project_id \|\| null\)/, 'server should normalize project_id in session flows');
  assert.match(serverJs, /project_id:\s*closeProjectId/, 'server should persist project_id when closing session');
  assert.match(serverJs, /haystack\.includes\('SIZ'\)/, 'server inference should include legacy SIZ alias');
  assert.match(serverJs, /SESSION_PULSE_LOG_INTERVAL_MS/, 'server should throttle recurring pulse logs');
  assert.match(serverJs, /type:\s*'session_pulse'/, 'server should persist session_pulse snapshots');
  assert.match(serverJs, /'session_pulse'/, 'server should append session_pulse execution logs');
  assert.match(serverJs, /inferProjectIdFromSessionArchive\(/, 'server should infer project_id from session archives for log fallback');
  assert.match(serverJs, /\/api\/personas\/assets\/clean-md/, 'server should expose markdown cleanup endpoint for persona assets');
  assert.match(serverJs, /cleanMarkdownFile\(/, 'server should sanitize markdown files for persona assets');
  assert.match(serverJs, /Upload de PDF bloqueado neste fluxo/, 'server should block PDF uploads in persona assets flow');
  assert.match(serverJs, /kind must be one of: clone, transcript, full_transcript, support/, 'server should reject legacy "book" kind in persona assets flow');
  assert.match(serverJs, /Fluxo PDF desativado\. Use apenas transcricoes em markdown/, 'server should disable legacy PDF transcript generation endpoint');
  assert.equal(packageJson.scripts['logs:backfill:project-id'], 'node scripts/maintenance/backfill_project_log_ids.cjs', 'package script for log backfill should exist');
  assert.equal(packageJson.scripts['personas:clean-md'], 'node scripts/maintenance/clean_persona_markdown_assets.cjs', 'package script for persona markdown cleanup should exist');
  assert.match(backfillScript, /inferProjectIdFromSession\(/, 'backfill script should infer project id from session archives');
}

function run() {
  testProjectFlows();
  testPersonaMaterials();
  testIntegrationPoints();
  console.log('Tests passed: Master Hub quality checks succeeded.');
}

run();
