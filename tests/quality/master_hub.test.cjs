const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..', '..');

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), 'utf8'));
}

function testProjectFlows() {
  const flows = readJson('docs/control/project_flows.json');
  assert.ok(flows && typeof flows === 'object');
  assert.ok(flows.projects && typeof flows.projects === 'object');

  for (const key of ['sais', 'velas', 'electro', 'financas']) {
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
  assert.match(dashboardHtml, /master-project-financas/, 'dashboard should expose Financas in Master projects');
  assert.match(dashboardHtml, /data-tab="financas"/, 'dashboard should expose Financas as a sidebar tab');
  assert.match(dashboardHtml, /id="pane-financas"/, 'dashboard should render a Financas pane');
  assert.match(dashboardHtml, /projects\/financas\/data\/finance_state\.json/, 'Financas should persist data in finance_state.json');
  assert.match(dashboardHtml, /function addFinanceDebt\(/, 'Financas should support debt entry');
  assert.match(dashboardHtml, /function addFinanceIncome\(/, 'Financas should support income entry');
  assert.match(dashboardHtml, /function addFinanceGoal\(/, 'Financas should support goal entry');
  assert.match(dashboardHtml, /function saveFinanceState\(/, 'Financas should save state through the dashboard');
  assert.match(dashboardHtml, /renderFinanceSpreadsheet/, 'Financas should render the spreadsheet import view');
  assert.match(dashboardHtml, /financeiro_2026_import\.json/, 'Financas should expose the parsed Financeiro 2026 import');
  assert.match(dashboardHtml, /financeiro_2026_sss_ltda_2025_import\.json|source\.import_file/, 'Financas should support the SsS Ltda 2025 import source');
  assert.match(dashboardHtml, /Forecast mensal/, 'Financas should expose the monthly forecast from the spreadsheet');
  assert.match(dashboardHtml, /monthly_forecast/, 'Financas should consume spreadsheet monthly_forecast data');
  assert.match(dashboardHtml, /function renderFinanceForecastMatrix\(/, 'Financas should render the spreadsheet forecast as a monthly matrix');
  assert.match(dashboardHtml, /function toggleFinanceForecastMonths\(/, 'Financas should provide a control to expand the 12-month forecast');
  assert.match(dashboardHtml, /finance-months-toggle/, 'Financas should expose the 12-month forecast expansion button');
  assert.match(dashboardHtml, /monthly_payment/, 'Financas debts should support real monthly payment imported from the spreadsheet');
  assert.match(dashboardHtml, /\['spreadsheet', 'Planilha'\]/, 'Financas should expose an internal Planilha tab');
  assert.match(dashboardHtml, /id="finance-map-canvas"/, 'Financas should expose an operational map canvas');
  assert.match(dashboardHtml, /function renderFinanceMap\(/, 'Financas should render the operational map');
  assert.match(dashboardHtml, /function openFinanceMapDetail\(/, 'Financas map should expose node details');
  assert.match(dashboardHtml, /filterFinanceMap\('pressure'\)/, 'Financas map should support pressure filtering');
  assert.match(dashboardHtml, /window\.fin2Switch\s*=\s*function\(tab\)/, 'Financas top nav should expose the fin2Switch tab handler');
  for (const tab of ['planilha', 'dividas', 'ir', 'mapa']) {
    assert.match(dashboardHtml, new RegExp(`id="fin2-btn-${tab}"[\\s\\S]*?fin2Switch\\('${tab}'\\)`), `Financas top nav should wire ${tab} button to fin2Switch`);
    assert.match(dashboardHtml, new RegExp(`id="fin2-pane-${tab}"`), `Financas should render ${tab} pane`);
  }
  assert.match(dashboardHtml, /grid-template-columns:minmax\(260px,\.78fr\) minmax\(300px,\.72fr\) minmax\(560px,1\.5fr\)/, 'IR tab should use a dense three-column desktop layout');
  assert.match(dashboardHtml, /class="ir-col-data"/, 'IR tab should place fiscal worksheets in a dedicated visual column');
  assert.match(dashboardHtml, /class="ir-data-summary"/, 'IR tab should show a compact fiscal summary strip');
  assert.match(dashboardHtml, /class="ir-result-hero ir-result-\$\{resultTone\}"/, 'IR tab should expose the estimated result as a visual hero block');
  assert.match(dashboardHtml, /class="ir-file-stats"/, 'IR tab should use compact file stats to reduce empty space');
  assert.match(dashboardHtml, /class="ir-flow-rail"/, 'IR tab should show compact IR process progress');
  assert.match(dashboardHtml, /class="ir-det-summary"/, 'IR tab should keep a visible summary strip above the detail grid');
  assert.match(dashboardHtml, /Abrir Dívidas\/Acordos/, 'IR tab should link directly to debts and agreements');
  assert.match(dashboardHtml, /Dívidas\/Acordos/, 'Financas nav should make debts and agreements discoverable');
  assert.match(dashboardHtml, /let fin2IrActiveFicha = 'rendimentos'/, 'IR worksheets should track the active fiscal tab');
  assert.match(dashboardHtml, /data-ir-ficha="deducoes"/, 'IR worksheet buttons should expose stable ficha identifiers');
  assert.match(dashboardHtml, /irFichaTab\(fin2IrActiveFicha\)/, 'IR rerenders should preserve the active fiscal tab');
  assert.match(dashboardHtml, /id="ecac-run-btn"/, 'IR e-CAC action should expose the run button id used by its handler');
  assert.match(dashboardHtml, /id="ecac-irpf-btn"/, 'IRPF action should expose the IRPF button id used by its handler');
  assert.match(dashboardHtml, /data-ir-path=/, 'IR file rows should carry the target file path for opening');
  assert.match(dashboardHtml, /window\.irOpenArquivo\s*=/, 'IR file rows should have an open-file handler');
  assert.doesNotMatch(dashboardHtml, /loadFunnel\('financas'/, 'Financas should not be nested under the Funnel tab');
  assert.match(dashboardHtml, /fetch\('\/api\/personas\/assets'\)/, 'dashboard should fetch enriched persona assets for clones');
  assert.match(serverJs, /\/api\/project-flows/, 'server should expose /api/project-flows');
  assert.match(serverJs, /function writeFileAtomic\(/, 'server should write dashboard files atomically');
  assert.match(serverJs, /function writeJsonAtomic\(/, 'server should centralize validated JSON writes');
  assert.match(serverJs, /JSON\.parse\(text \|\| '\{\}'\)/, 'server should validate JSON editor saves before persisting');
  assert.doesNotMatch(serverJs, /fs\.writeFileSync\((?!fd,)/, 'server writes should go through atomic write helpers');
  assert.match(serverJs, /\/api\/ir\/open/, 'server should expose a local IR file open endpoint');
  assert.match(serverJs, /function isAllowedIrOpenPath\(/, 'IR file open endpoint should restrict allowed paths');
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
  assert.deepEqual(sidebarTabs, ['master', 'memory', 'funnel', 'projeto', 'mapa', 'financas', 'saude'], 'sidebar should keep Mapa before Financas, Saude at the end');
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
  assert.match(serverJs, /return 'financas'/, 'server inference should include Financas aliases');
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

function testDashboardInlineScriptsParse() {
  const dashboardHtml = fs.readFileSync(path.join(ROOT, 'docs/aiox_dashboard.html'), 'utf8');
  const scripts = [...dashboardHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1])
    .filter(code => code.trim());

  scripts.forEach((code, index) => {
    assert.doesNotThrow(
      () => new vm.Script(code, { filename: `docs/aiox_dashboard.html#inline-script-${index + 1}` }),
      `dashboard inline script ${index + 1} should parse`
    );
  });
}

function run() {
  testProjectFlows();
  testPersonaMaterials();
  testIntegrationPoints();
  testDashboardInlineScriptsParse();
  console.log('Tests passed: Master Hub quality checks succeeded.');
}

run();
