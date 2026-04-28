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
  const registry = readJson('docs/control/registry.json');
  const backfillScript = fs.readFileSync(path.join(ROOT, 'scripts/maintenance/backfill_project_log_ids.cjs'), 'utf8');

  assert.match(dashboardHtml, /fetch\('\/api\/project-flows'\)/, 'dashboard should fetch /api/project-flows');
  assert.match(dashboardHtml, /fetch\('\/api\/personas\/assets'\)/, 'dashboard should fetch enriched persona assets for clones');
  assert.match(serverJs, /\/api\/project-flows/, 'server should expose /api/project-flows');
  assert.match(serverJs, /function writeFileAtomic\(/, 'server should write dashboard files atomically');
  assert.match(serverJs, /function writeJsonAtomic\(/, 'server should centralize validated JSON writes');
  assert.match(serverJs, /JSON\.parse\(text \|\| '\{\}'\)/, 'server should validate JSON editor saves before persisting');
  assert.doesNotMatch(serverJs, /fs\.writeFileSync\((?!fd,)/, 'server writes should go through atomic write helpers');
  assert.match(serverJs, /\/api\/registry\/agents/, 'server should expose agent creation endpoint');
  assert.match(serverJs, /\/api\/registry\/skills/, 'server should expose skill creation endpoint');
  assert.match(dashboardHtml, /openAddCloneModal\(/, 'dashboard should expose add clone action in Master clones view');
  assert.match(dashboardHtml, /window\.openAddAgentModal\s*=/, 'dashboard should keep add agent action available for Master workflows');
  assert.match(dashboardHtml, /window\.openAddSkillModal\s*=/, 'dashboard should keep add skill action available for Master workflows');
  assert.match(dashboardHtml, /function renderMasterCloneCardDetails\(/, 'dashboard should merge persona card details into Master clones');
  assert.match(dashboardHtml, /const personaOverview = `/, 'dashboard should show persona overview in the Master clone inspector');
  assert.match(dashboardHtml, /function collapseMasterInspector\(/, 'dashboard should collapse the Master inspector on demand');
  assert.match(dashboardHtml, /master-collapse-btn/, 'dashboard should provide prominent collapse controls');
  assert.doesNotMatch(dashboardHtml, /master-floating-inspector/, 'Master clones should use the compact in-tab inspector, not a floating clone drawer');
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
  assert.match(dashboardHtml, /function buildSquadsBoardHtml\(/, 'dashboard should reuse the Squads board inside Master squads view');
  assert.match(dashboardHtml, /window\.MASTER_VIEW === 'squads' && !globalSearch/, 'Master squads view should render the operational Squads board directly');
  assert.match(dashboardHtml, /master-squads-board-canvas/, 'Master squads board should use full-width board layout');
  assert.match(dashboardHtml, /AIOX-MASTER-SIDEBAR-STABLE-START/, 'Master sidebar sizing should be isolated for easy rollback');
  assert.match(dashboardHtml, /\.master-col-inspector\s*\{\s*min-width:\s*360px;/, 'Master inspector should keep the same lateral width across views');
  assert.match(dashboardHtml, /grid-template-columns:\s*200px minmax\(420px, 1fr\) 360px/, 'Master workspace should preserve three lateral columns at narrow widths');
  assert.doesNotMatch(dashboardHtml, /AIOX-SQUADS-REFINE-START|master-workspace-squads|squad-board-grid|squad-column-header/, 'rejected squads refinement should not remain active');
  assert.match(dashboardHtml, /state\[squadId\] === true/, 'Master squads columns should use explicit expansion state');
  assert.match(dashboardHtml, /event\.target\.closest\('\.master-card, \.master-inspector, \.editor-modal, \.detail-drawer, \.master-squads-board-canvas'\)/, 'Master click-away handler should not close agent config when clicking the squads board');
  assert.match(dashboardHtml, /data-squad-drop-zone=/, 'dashboard squads board should expose drop zones');
  assert.match(dashboardHtml, /handleSquadDrop\(/, 'dashboard squads board should handle drop events');
  assert.match(dashboardHtml, /SQUAD_UNASSIGNED_ID/, 'dashboard squads board should expose unassigned drop zone id');
  assert.match(dashboardHtml, /Arraste aqui para remover o agente de qualquer squad\./, 'dashboard squads board should explain how to unassign agents');
  assert.match(dashboardHtml, /targetSquadId === SQUAD_UNASSIGNED_ID \? '' : targetSquadId/, 'dashboard move handler should normalize unassigned drop target');
  assert.match(dashboardHtml, /minmax\(0, 2\.35fr\) minmax\(168px, 0\.7fr\)/, 'Master squads layout should keep the available agents side panel width stable');
  assert.match(dashboardHtml, /Agentes Disponíveis/, 'Master squads layout should keep the available agents side panel visible');
  assert.match(dashboardHtml, /w-full min-w-0 max-w-full overflow-hidden/, 'available agents panel and cards should not expand the side panel width');
  const sidebarTabs = [...dashboardHtml.matchAll(/class="sb-icon[^"]*" data-tab="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(sidebarTabs, ['master', 'memory', 'funnel'], 'sidebar should expose the simplified 3-tab panel set (Master, Memory, Funil)');
  assert.match(dashboardHtml, /id="control-hub-icon"/, 'dashboard should expose Ops Desk control hub');
  assert.match(dashboardHtml, /CONTROL_GROUP_TABS = \['alerts', 'logs', 'reruns', 'incidents', 'commands', 'why'\]/, 'dashboard should route control sub-tabs');
  assert.match(dashboardHtml, /function loadControlTab\(/, 'dashboard should load control hub sub-tabs');
  assert.match(dashboardHtml, /data-control-tab="alerts"/, 'dashboard should render control sub-tab buttons');
  assert.match(dashboardHtml, /GPS Flow/, 'dashboard should expose GPS Flow as the visible operations flow label');
  assert.match(dashboardHtml, /saveCurrentSquadPreset\(/, 'dashboard squads board should support saving presets');
  assert.match(dashboardHtml, /saveSquadAgentConfig\(/, 'dashboard squads board should support agent-level configuration');
  assert.match(dashboardHtml, /openSquadAgentDrawer\(/, 'dashboard squads board should open agent configuration drawer');
  assert.match(dashboardHtml, /renderSquadAgentConfigInMasterInspector\(/, 'Master squads agent config should open inside the Master inspector');
  assert.match(dashboardHtml, /startsWith\('squad-agent-config-'\)/, 'Master squads agent config selection should survive Master Hub rerenders');
  assert.match(dashboardHtml, /prepareSquadAgentConfigState\(agentId\)/, 'Master squads agent config should rehydrate after data refresh');
  assert.match(dashboardHtml, /function prepareSquadAgentConfigState\(/, 'agent config state should be shared between drawer and Master inspector');
  assert.match(dashboardHtml, /function getAgentDisplayName\(/, 'dashboard should centralize agent display names');
  assert.match(dashboardHtml, /return `\$\{name \|\| rawName\} \$\{handle\}`;/, 'dashboard should render agent cards as "Name @handle"');
  assert.match(dashboardHtml, /function getAgentDisplayNameHtml\(/, 'dashboard should style agent handle separately from agent name');
  assert.match(dashboardHtml, /text-muted font-normal text-\[0\.82em\]/, 'dashboard should render handles smaller and muted inline');
  assert.match(dashboardHtml, /function agentDisplayIncludesHandle\(/, 'dashboard should avoid duplicated handle lines when name already includes handle');
  assert.match(dashboardHtml, /getAgentSkillCount\(a\.id\)/, 'Master squads agent cards should count skills from registry links');
  assert.match(dashboardHtml, /getAgentPersonaCount\(a\.handle \|\| ''\)/, 'Master squads agent cards should count clone/persona links from registry links');
  assert.match(dashboardHtml, /const displayName = getAgentDisplayName\(a\)/, 'Agents tab should use normalized agent display names');
  assert.match(dashboardHtml, /toggleMasterSquadSection\(/, 'Master squads board should collapse and expand agents by squad');
  assert.match(dashboardHtml, /MASTER_SQUAD_SECTION_STORAGE_KEY/, 'Master squads collapse state should be persisted');
  assert.match(dashboardHtml, /handleAgentConfigDrop\(/, 'dashboard agent config drawer should support drag-and-drop drops');
  assert.match(dashboardHtml, /toggleAgentConfigItem\(/, 'dashboard agent config drawer should support moving config items between buckets');
  assert.match(dashboardHtml, /agent-config-skill-selected/, 'dashboard should render selected skills bucket');
  assert.match(dashboardHtml, /agent-config-persona-selected/, 'dashboard should render selected personas bucket');
  assert.match(dashboardHtml, /DETAIL_DRAWER_STATE/, 'dashboard should track detail drawer context state');
  assert.match(dashboardHtml, /isSamePersonaOpen/, 'dashboard should support toggle behavior when clicking the same persona');
  assert.doesNotMatch(dashboardHtml, /openEditorModal\('\$\{s\.name\}', 'docs\/memory\/\$\{s\.id\}\.md'\)/, 'memory scope editor call should keep path as first parameter');
  assert.doesNotMatch(dashboardHtml, /openEditorModal\('Squad \$\{masterEscape\(squad\.name \|\| squad\.id\)\}', '\.codex\/squads\//, 'squad editor call should keep path as first parameter');
  assert.doesNotMatch(dashboardHtml, /openEditorModal\('\$\{a\.name\} — \$\{a\.squad\}', '\.codex\/agents\//, 'agent editor call should keep path as first parameter');
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
  assert.match(serverJs, /\/api\/personas\/assets\/apply-harmonization/, 'server should expose explicit harmonization apply endpoint');
  assert.match(serverJs, /\/api\/personas\/assets\/audit-nectar/, 'server should expose Nectar Auditor endpoint');
  assert.match(serverJs, /runNectarAudit\(/, 'server should run Nectar Auditor before harmonization');
  assert.match(serverJs, /blocked_by_audit/, 'server should block harmonization when Nectar Auditor rejects it');
  assert.match(serverJs, /'knowledge', 'clones', 'candidates'/, 'server should stage harmonization candidates before changing clones');
  assert.match(serverJs, /'knowledge', 'clones', 'backups'/, 'server should backup clone files before applying harmonization');
  assert.match(serverJs, /AIOX-HARMONIZATION-LOG:START/, 'server should append harmonized source ledger to clone candidates');
  assert.match(serverJs, /AIOX-NECTAR-AUDIT:START/, 'server should persist Nectar Auditor metadata in review files');
  assert.match(dashboardHtml, /Previa de harmonizacao criada/, 'dashboard should require preview before applying harmonization');
  assert.match(dashboardHtml, /masterCloneAudit\(/, 'dashboard should expose manual Nectar Auditor action');
  assert.match(dashboardHtml, /Parecer Nectar Auditor/, 'dashboard should open Nectar Auditor review files');
  assert.match(dashboardHtml, /applyMasterCloneHarmonization\(/, 'dashboard should apply harmonization only after explicit confirmation');
  assert.ok(registry.agents.some(agent => agent.id === 'AGT-QRO-03' && agent.handle === '@nectar-auditor'), 'registry should include Nectar Auditor agent');
  assert.ok(registry.squads.find(squad => squad.id === 'SQD-QRO').agents.includes('AGT-QRO-03'), 'QRO squad should include Nectar Auditor');
  for (const skillId of ['SKL-QRO-06', 'SKL-QRO-07', 'SKL-QRO-08', 'SKL-QRO-09', 'SKL-QRO-10', 'SKL-QRO-11']) {
    const skill = registry.skills.QRO.find(item => item.id === skillId);
    assert.ok(skill, `registry should include ${skillId}`);
    assert.ok(skill.agents.includes('AGT-QRO-03'), `${skillId} should belong to Nectar Auditor`);
    assert.ok(fs.existsSync(path.join(ROOT, skill.playbook_file)), `${skillId} playbook file should exist`);
  }
  assert.ok(fs.existsSync(path.join(ROOT, '.codex/agents/nectar-auditor.md')), 'Nectar Auditor agent file should exist');
  assert.ok(fs.existsSync(path.join(ROOT, '.codex/skills/dilution-risk-gate.md')), 'Dilution risk skill file should exist');
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
