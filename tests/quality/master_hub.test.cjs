const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('node:vm');
const ibkrBridge = require('../../scripts/ibkr_local_bridge.js');
const cloudSyncGuardrails = require('../../scripts/cloud_sync_guardrails.js');
const projectMirror = require('../../scripts/project_mirror_sync.js');

const ROOT = path.resolve(__dirname, '..', '..');

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), 'utf8'));
}

function testProjectFlows() {
  const flows = readJson('docs/control/project_flows.json');
  assert.ok(flows && typeof flows === 'object');
  assert.ok(flows.projects && typeof flows.projects === 'object');

  for (const key of ['sais', 'velas', 'electro', 'financas', 'pajero', 'forex']) {
    assert.ok(flows.projects[key], `missing project "${key}"`);
  }
  assert.equal(flows.projects.pajero.label, 'Pajero AI', 'project flows should expose Pajero as Pajero AI');

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
  const fin2PlanilhaScript = dashboardHtml.slice(
    dashboardHtml.indexOf('function fin2Esc(value)'),
    dashboardHtml.indexOf('window.fin2AddRow = function(groupKey)')
  );
  const fin2DebtDrawerScript = dashboardHtml.slice(
    dashboardHtml.indexOf('window.fin2OpenDrawer = function(cid)'),
    dashboardHtml.indexOf('window.fin2CloseDrawer = function()')
  );

  assert.match(dashboardHtml, /fetch\('\/api\/project-flows'\)/, 'dashboard should fetch /api/project-flows');
  assert.match(dashboardHtml, /master-project-financas/, 'dashboard should expose Financas in Master projects');
  assert.match(dashboardHtml, /data-tab="financas"/, 'dashboard should expose Financas as a sidebar tab');
  assert.match(dashboardHtml, /data-tab="financas"[\s\S]*?data-tab="pajero-full" data-primary-nav="pajero-full"/, 'dashboard should expose Pajero directly below Financas in the primary sidebar');
  assert.match(dashboardHtml, /data-tab="forex" data-primary-nav="forex"/, 'dashboard should expose Forex as a sidebar tab');
  assert.match(dashboardHtml, /data-primary-nav="ebooks"/, 'dashboard should expose E-books in primary navigation');
  assert.match(dashboardHtml, /data-primary-nav="site-produtos"/, 'dashboard should expose Site/Produtos in primary navigation');
  assert.match(dashboardHtml, /id="pane-financas"/, 'dashboard should render a Financas pane');
  assert.match(dashboardHtml, /master-system-link-pajero-full/, 'dashboard should preserve Pajero Full through Master system shortcuts');
  assert.match(dashboardHtml, /id="pane-pajero-full"/, 'dashboard should render a Pajero Full pane');
  assert.match(dashboardHtml, /id="pane-forex"/, 'dashboard should render a Forex pane');
  assert.match(dashboardHtml, /IBKR Manual Desk/, 'Forex pane should expose the IBKR-first manual desk');
  assert.match(dashboardHtml, /Campanha 3x1/, 'Forex pane should expose the 3x1 campaign view');
  assert.match(dashboardHtml, /Proteção por opções/, 'Forex pane should expose an independent options-protection view');
  assert.match(dashboardHtml, /alvo 1,5R/, 'Forex simulator should use the user-defined 1.5R target');
  assert.match(dashboardHtml, /Ganha 1, perde 2/, 'Forex simulator should expose the second-level loss outcome');
  assert.match(dashboardHtml, /Dukas: laboratório/, 'Forex should retain Dukascopy as secondary research, not the primary journey');
  assert.match(dashboardHtml, /Nenhuma ordem é enviada/, 'Forex should state that the dashboard does not send broker orders');
  assert.match(dashboardHtml, /function renderForexPanel\(/, 'Forex should define a renderer');
  assert.match(dashboardHtml, /function switchIbkrDeskView\(view\)/, 'Forex should expose IBKR desk tabs');
  assert.match(dashboardHtml, /function renderIbkrManualDesk\(\)/, 'Forex should expose interactive campaign and options calculations');
  assert.match(dashboardHtml, /id="ibkr-campaign-stages"/, 'Forex should render the visual three-stage campaign ladder');
  assert.match(dashboardHtml, /id="ibkr-options-comparison"/, 'Forex should render the protected versus unprotected comparison');
  assert.match(dashboardHtml, /100 ações/, 'Forex should disclose the standard-contract sizing constraint');
  assert.match(dashboardHtml, /projects\/forex\/config\/agent_skill_persona_map\.json/, 'Forex should expose editable agent/skill/persona config');
  assert.match(dashboardHtml, /projects\/forex\/templates\/mt4-campanha-3por1\.md/, 'Forex should expose MT4 template documentation');
  assert.match(dashboardHtml, /projects\/forex\/templates\/mt5-campanha-3por1\.md/, 'Forex should expose MT5 template documentation');
  assert.match(dashboardHtml, /projects\/forex\/templates\/jforex-campanha-3por1\.md/, 'Forex should expose JForex template documentation');
  assert.match(dashboardHtml, /projects\/forex\/templates\/profitpro-campanha-3por1\.md/, 'Forex should expose ProfitPro template documentation');
  assert.match(dashboardHtml, /projects\/forex\/templates\/timeframe-visibility-map\.md/, 'Forex should expose timeframe visibility mapping');
  assert.match(dashboardHtml, /projects\/forex\/research\/mql5-jforex-profitpro-engineering-sources\.md/, 'Forex should expose MQL5/JForex/ProfitPro engineering sources');
  assert.match(dashboardHtml, /projects\/forex\/research\/mt4-final-completo-3-template-analysis\.md/, 'Forex should expose real MT4 template analysis');
  assert.match(dashboardHtml, /projects\/forex\/research\/peak-indicator-study\.md/, 'Forex should expose Peak study documentation');
  assert.match(dashboardHtml, /projects\/forex\/tools\/mt4\/AIOX_Forex_Apply_Object_Visibility\.mq4/, 'Forex should expose MT4 visibility script');
  assert.match(dashboardHtml, /projects\/forex\/tools\/mt5\/AIOX_Forex_Apply_Object_Visibility\.mq5/, 'Forex should expose MT5 visibility script');
  assert.match(dashboardHtml, /projects\/forex\/tools\/mt4\/AIOX_Peak_Buffer_Probe\.mq4/, 'Forex should expose Peak probe tool');
  assert.match(dashboardHtml, /projects\/forex\/research\/myfxbook-metatrader-verification\.md/, 'Forex should expose MyFXBook research documentation');
  assert.match(dashboardHtml, /projects\/forex\/skills\/myfxbook-account-verification\.md/, 'Forex should expose MyFXBook verification skill');
  assert.match(dashboardHtml, /projects\/forex\/personas\/forex-myfxbook-tracker\.md/, 'Forex should expose MyFXBook tracker persona');
  assert.match(dashboardHtml, /projects\/forex\/skills\/mt4-visual-layering-and-peak\.md/, 'Forex should expose Visual MT4 and Peak skill');
  assert.match(dashboardHtml, /projects\/forex\/skills\/mql5-expert-advisor-engineering\.md/, 'Forex should expose MQL5 EA engineering skill');
  assert.match(dashboardHtml, /projects\/forex\/skills\/cross-platform-template-porting\.md/, 'Forex should expose cross-platform porting skill');
  assert.match(dashboardHtml, /projects\/forex\/research\/rimantas-channel\/channel-video-content-map\.md/, 'Forex should expose Rimantas EA Coder video corpus');
  assert.match(dashboardHtml, /projects\/forex\/research\/rimantas-channel\/channel-transcript-context-summary\.md/, 'Forex should expose Rimantas EA Coder transcript summary');
  assert.match(dashboardHtml, /projects\/forex\/research\/rimantas-channel\/ea-coder-operational-context\.md/, 'Forex should expose EA Coder operational context');
  assert.match(dashboardHtml, /projects\/forex\/skills\/metatrader-ea-coder-operations\.md/, 'Forex should expose MetaTrader EA Coder operations skill');
  assert.match(dashboardHtml, /projects\/forex\/skills\/metatrader-trade-copier-ops\.md/, 'Forex should expose MetaTrader trade copier operations skill');
  assert.match(dashboardHtml, /projects\/forex\/personas\/forex-ea-coder-operations-mentor\.md/, 'Forex should expose EA Coder operations persona');
  const mt4TraderOnChart = fs.readFileSync(path.join(ROOT, 'projects/forex/tools/mt4/AIOX_Trader_On_Chart.mq4'), 'utf8');
  const mt5TraderOnChart = fs.readFileSync(path.join(ROOT, 'projects/forex/tools/mt5/AIOX_Trader_On_Chart.mq5'), 'utf8');
  const forexAgentMap = readJson('projects/forex/config/agent_skill_persona_map.json');
  const rimantasCorpus = readJson('projects/forex/research/rimantas-channel/channel-video-content-map.json');
  assert.match(mt4TraderOnChart, /AIOX_TOC_BTN_STRADDLE/, 'MT4 Trader On Chart EA should expose straddle orders');
  assert.match(mt4TraderOnChart, /ApplyTrailingStops/, 'MT4 Trader On Chart EA should expose trailing stop management');
  assert.match(mt4TraderOnChart, /#property version\s+"1\.32"/, 'MT4 Trader On Chart EA should be v1.32');
  assert.match(mt4TraderOnChart, /PanelScalePercent\s*=\s*135/, 'MT4 Trader On Chart EA should default to 135 percent panel scale');
  assert.match(mt4TraderOnChart, /PipSizeOverride/, 'MT4 Trader On Chart EA should expose pip-size override for CFDs and crypto');
  assert.match(mt4TraderOnChart, /IsForexSymbol/, 'MT4 Trader On Chart EA should detect Forex symbols before auto-scaling pip size');
  assert.match(mt4TraderOnChart, /SpreadText/, 'MT4 Trader On Chart EA should show spread with configured max');
  assert.match(mt4TraderOnChart, /COLOR_BG\s*=\s*C'250,250,250'/, 'MT4 Trader On Chart EA should use a light TOC-style panel background');
  assert.match(mt4TraderOnChart, /COLOR_BUY\s*=\s*C'35,160,55'/, 'MT4 Trader On Chart EA should use TOC-style green buy button');
  assert.match(mt4TraderOnChart, /AIOX_TOC_BTN_MODE_CYCLE/, 'MT4 Trader On Chart EA should expose compact risk mode selector');
  assert.match(mt4TraderOnChart, /AIOX_TOC_LBL_SYMBOL/, 'MT4 Trader On Chart EA should expose symbol header like a chart trade panel');
  assert.match(mt4TraderOnChart, /EventSetTimer/, 'MT4 Trader On Chart EA should refresh panel by timer');
  assert.match(mt4TraderOnChart, /AIOX_TOC_BTN_PENDING_MODE/, 'MT4 Trader On Chart EA should expose pending order mode selection');
  assert.match(mt4TraderOnChart, /ApplyOCO/, 'MT4 Trader On Chart EA should expose OCO pending cleanup');
  assert.match(mt4TraderOnChart, /SmartBEOffsetPips/, 'MT4 Trader On Chart EA should expose smart breakeven cost coverage');
  assert.match(mt5TraderOnChart, /AIOX_TOC_BTN_STRADDLE/, 'MT5 Trader On Chart EA should expose straddle orders');
  assert.match(mt5TraderOnChart, /ApplyTrailingStops/, 'MT5 Trader On Chart EA should expose trailing stop management');
  assert.match(mt5TraderOnChart, /#property version\s+"1\.32"/, 'MT5 Trader On Chart EA should be v1.32');
  assert.match(mt5TraderOnChart, /PanelScalePercent\s*=\s*135/, 'MT5 Trader On Chart EA should default to 135 percent panel scale');
  assert.match(mt5TraderOnChart, /PipSizeOverride/, 'MT5 Trader On Chart EA should expose pip-size override for CFDs and crypto');
  assert.match(mt5TraderOnChart, /IsForexSymbol/, 'MT5 Trader On Chart EA should detect Forex symbols before auto-scaling pip size');
  assert.match(mt5TraderOnChart, /SpreadText/, 'MT5 Trader On Chart EA should show spread with configured max');
  assert.match(mt5TraderOnChart, /COLOR_BG\s*=\s*C'250,250,250'/, 'MT5 Trader On Chart EA should use a light TOC-style panel background');
  assert.match(mt5TraderOnChart, /COLOR_BUY\s*=\s*C'35,160,55'/, 'MT5 Trader On Chart EA should use TOC-style green buy button');
  assert.match(mt5TraderOnChart, /AIOX_TOC_BTN_MODE_CYCLE/, 'MT5 Trader On Chart EA should expose compact risk mode selector');
  assert.match(mt5TraderOnChart, /AIOX_TOC_LBL_SYMBOL/, 'MT5 Trader On Chart EA should expose symbol header like a chart trade panel');
  assert.match(mt5TraderOnChart, /SetTypeFillingBySymbol/, 'MT5 Trader On Chart EA should select filling mode by symbol');
  assert.match(mt5TraderOnChart, /trade\.Buy\(lots, Symbol\(\), 0\.0/, 'MT5 Trader On Chart EA should let market buys use the current platform price');
  assert.match(mt5TraderOnChart, /AIOX_TOC_BTN_PENDING_MODE/, 'MT5 Trader On Chart EA should expose pending order mode selection');
  assert.match(mt5TraderOnChart, /ApplyOCO/, 'MT5 Trader On Chart EA should expose OCO pending cleanup');
  assert.match(mt5TraderOnChart, /SmartBEOffsetPips/, 'MT5 Trader On Chart EA should expose smart breakeven cost coverage');
  assert.ok(fs.existsSync(path.join(ROOT, 'projects/forex/research/mql5-jforex-profitpro-engineering-sources.md')), 'Forex should include MQL5/JForex/ProfitPro engineering research');
  assert.ok(fs.existsSync(path.join(ROOT, 'projects/forex/skills/mql5-expert-advisor-engineering.md')), 'Forex should include MQL5 expert advisor engineering skill');
  assert.ok(fs.existsSync(path.join(ROOT, 'projects/forex/skills/cross-platform-template-porting.md')), 'Forex should include cross-platform template porting skill');
  assert.ok(fs.existsSync(path.join(ROOT, 'projects/forex/templates/profitpro-campanha-3por1.md')), 'Forex should include initial ProfitPro template documentation');
  assert.ok(fs.existsSync(path.join(ROOT, 'projects/forex/research/rimantas-channel/channel-video-content-map.md')), 'Forex should include Rimantas EA Coder corpus markdown');
  assert.ok(fs.existsSync(path.join(ROOT, 'projects/forex/research/rimantas-channel/channel-transcript-context-summary.md')), 'Forex should include Rimantas EA Coder transcript summary');
  assert.ok(fs.existsSync(path.join(ROOT, 'projects/forex/research/rimantas-channel/ea-coder-operational-context.md')), 'Forex should include EA Coder operational context');
  assert.ok(fs.existsSync(path.join(ROOT, 'projects/forex/skills/metatrader-ea-coder-operations.md')), 'Forex should include MetaTrader EA Coder operations skill');
  assert.ok(fs.existsSync(path.join(ROOT, 'projects/forex/skills/metatrader-trade-copier-ops.md')), 'Forex should include MetaTrader trade copier operations skill');
  assert.ok(fs.existsSync(path.join(ROOT, 'projects/forex/personas/forex-ea-coder-operations-mentor.md')), 'Forex should include EA Coder operations mentor persona');
  assert.equal(rimantasCorpus.stats.videos_total, 138, 'Rimantas EA Coder corpus should map all 138 public videos found');
  assert.equal(rimantasCorpus.stats.descriptions_available, 131, 'Rimantas EA Coder corpus should preserve description-backed items when available');
  assert.equal(rimantasCorpus.stats.transcripts_available, 127, 'Rimantas EA Coder corpus should analyze accessible YouTube transcripts through the panel path');
  assert.ok(rimantasCorpus.stats.transcript_words_total > 200000, 'Rimantas EA Coder corpus should include a substantial transcript-derived analysis');
  assert.ok(forexAgentMap.agents.some(agent => agent.id === 'forex-mql5-expert-engineer'), 'Forex agent map should include MQL5 Expert Engineer');
  assert.ok(forexAgentMap.agents.some(agent => agent.id === 'forex-ea-coder-ops-mentor'), 'Forex agent map should include EA Coder Ops Mentor');
  assert.ok(forexAgentMap.agents.some(agent => agent.id === 'forex-cross-platform-template-engineer'), 'Forex agent map should include Cross Platform Template Engineer');
  assert.ok(forexAgentMap.skills.some(skill => skill.id === 'metatrader-ea-coder-operations'), 'Forex agent map should include MetaTrader EA Coder operations skill');
  assert.ok(forexAgentMap.skills.some(skill => skill.id === 'metatrader-trade-copier-ops'), 'Forex agent map should include MetaTrader trade copier operations skill');
  assert.match(dashboardHtml, /AIOX_ELLIOTT_/, 'Forex should expose Elliott object prefixes');
  assert.match(dashboardHtml, /AIOX_DOW_M5_/, 'Forex should expose M5-only Dow object prefixes');
  assert.match(dashboardHtml, /Pajero Full Command Room/, 'Pajero Full pane should expose the command room header');
  assert.match(dashboardHtml, /function renderPajeroFull\(/, 'Pajero Full should define a renderer');
  assert.match(dashboardHtml, /PAJERO_FULL_SYSTEM_BLOCKS/, 'Pajero Full should define interactive technical system blocks');
  for (const block of ['injecao', 'correias', 'cambio', 'suspensao', 'tracao', 'amortecedores-molas', 'eletrica']) {
    assert.match(dashboardHtml, new RegExp(`id: '${block}'`), `Pajero Full should expose the ${block} technical block`);
  }
  assert.match(dashboardHtml, /pj-full-system-grid/, 'Pajero Full should render the system block grid');
  assert.match(dashboardHtml, /function selectPajeroFullSystem\(id\)/, 'Pajero Full should allow selecting a technical block');
  assert.match(dashboardHtml, /id="pj-full-system-overlay"/, 'Pajero Full should render a large expanded system overlay');
  assert.match(dashboardHtml, /function openPajeroFullSystemPanel\(id\)/, 'Pajero Full should expose a direct expanded-system opener');
  assert.match(dashboardHtml, /function closePajeroFullSystemPanel\(\)/, 'Pajero Full should allow closing the expanded system panel');
  assert.match(dashboardHtml, /showPajeroFullSystemPanel\(\)/, 'Pajero Full system selection should open the expanded view');
  assert.match(dashboardHtml, /pj-full-flow-canvas/, 'Pajero Full should expose an n8n-style project flow canvas');
  assert.match(dashboardHtml, /pj-full-evidence-grid/, 'Pajero Full should reserve space for image evidence');
  assert.match(dashboardHtml, /Pajero AI/, 'Master projects should rename Pajero to Pajero AI');
  assert.match(dashboardHtml, /projects\/financas\/data\/finance_state\.json/, 'Financas should persist data in finance_state.json');
  assert.match(dashboardHtml, /function addFinanceDebt\(/, 'Financas should support debt entry');
  assert.match(dashboardHtml, /function addFinanceIncome\(/, 'Financas should support income entry');
  assert.match(dashboardHtml, /function addFinanceGoal\(/, 'Financas should support goal entry');
  assert.match(dashboardHtml, /function saveFinanceState\(/, 'Financas should save state through the dashboard');
  assert.match(dashboardHtml, /A nuvem continua no botão Salvar Tudo/, 'Conectar Pasta should clarify that cloud sync remains in Salvar Tudo');
  assert.match(dashboardHtml, /\[FS\] escrita direta falhou, usando servidor/, 'File System Access save failures should fall back to the server');
  assert.match(dashboardHtml, /\[FS\] leitura direta falhou, usando servidor/, 'File System Access read failures should fall back to the server');
  assert.match(dashboardHtml, /async function fsActivateServerWorkspace\(\)/, 'Conectar Pasta should auto-connect to the local server workspace when no browser folder handle is available');
  assert.match(dashboardHtml, /fetch\('\/api\/runtime\/info', \{ cache: 'no-store' \}\)/, 'Conectar Pasta should discover the current local workspace through runtime info');
  assert.match(dashboardHtml, /updateFsUi\('server-connected'\)/, 'Conectar Pasta should show connected state for the local server workspace');
  assert.match(dashboardHtml, /window\.__FIN2_DATA_LOADED && typeof window\.fin2SaveData === 'function'/, 'Salvar Tudo should flush loaded Financas data before cloud sync');
  assert.match(dashboardHtml, /Corrija o autosave antes de sincronizar GitHub\/Firebase/, 'Salvar Tudo should stop when Financas autosave fails');
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
  assert.match(dashboardHtml, /window\.fin2Switch\s*=\s*function\(tab\)/, 'Financas top nav should expose the fin2Switch tab handler');
  for (const tab of ['planilha', 'dividas']) {
    assert.match(dashboardHtml, new RegExp(`id="fin2-btn-${tab}"[\\s\\S]*?fin2Switch\\('${tab}'\\)`), `Financas top nav should wire ${tab} button to fin2Switch`);
    assert.match(dashboardHtml, new RegExp(`id="fin2-pane-${tab}"`), `Financas should render ${tab} pane`);
  }
  assert.match(dashboardHtml, /class="fin2-navbtn active" id="fin2-btn-planilha"/, 'Financas should open with Planilha selected by default');
  assert.match(dashboardHtml, /id="fin2-pane-planilha" class="fin2-panel" style="display:flex;overflow-y:auto;overflow-x:hidden"/, 'Financas should render Planilha as the default visible pane');
  assert.match(dashboardHtml, /id="fin2-pane-dividas" class="fin2-panel" style="display:none;flex:1;overflow:hidden"/, 'Financas should keep Dividas/Acordos hidden until selected');
  assert.match(dashboardHtml, /\.then\(\(\) => fin2Switch\('planilha'\)\);/, 'Financas render should return to Planilha after loading data and contracts');
  assert.doesNotMatch(dashboardHtml, /id="fin2-btn-ir"/, 'Financas should not expose the Imp. de Renda top nav tab');
  assert.doesNotMatch(dashboardHtml, /id="fin2-btn-mapa"/, 'Financas should not expose the Mapa top nav tab');
  assert.doesNotMatch(dashboardHtml, /id="fin2-pane-ir"/, 'Financas should not render the Imp. de Renda pane');
  assert.doesNotMatch(dashboardHtml, /id="fin2-pane-mapa"/, 'Financas should not render the Mapa pane');
  assert.doesNotMatch(dashboardHtml, /id="fin2-pm-holerite-btn"/, 'Financas Planilha should not expose a redundant top PM payslip button near Planilha');
  assert.match(dashboardHtml, /payslipRole:'credits'/, 'Pagamento PM should be configured as the PM payslip credits parent row');
  assert.match(dashboardHtml, /label:'Despesas PM'/, 'Despesas Fixas should include Despesas PM as a payslip discounts parent row');
  assert.match(dashboardHtml, /let FIN2_PAYSLIPS = /, 'Financas should keep monthly PM payslip metadata');
  assert.match(dashboardHtml, /fin2-pm-attach-btn/, 'Financas should expose compact monthly PM payslip attachment controls');
  assert.match(dashboardHtml, /fin2-pm-attach-btn-discounts/, 'Financas should render Despesas PM payslip attachment buttons with a distinct green class');
  assert.match(dashboardHtml, /\.fin2-pm-attach-btn\.fin2-pm-attach-btn-discounts \{ border-color:#22c55e33;background:#22c55e0a; \}/, 'Financas should style Despesas PM payslip attachment buttons in green');
  assert.match(dashboardHtml, /window\.fin2DeletePayslipMonth\s*=/, 'Financas should allow deleting the payslip for only the selected month');
  assert.match(dashboardHtml, /const FIN2_LOCAL_BACKUP_KEY = 'fin2_data_autosave_v2'/, 'Financas should keep a browser-local autosave backup');
  assert.match(dashboardHtml, /function fin2WriteLocalBackup\(payload\)/, 'Financas should write a local backup before server persistence');
  assert.match(dashboardHtml, /function fin2PickLoadData\(fileData\)/, 'Financas should be able to recover a newer local backup');
  assert.match(dashboardHtml, /fin2WriteLocalBackup\(fin2BuildDataPayload\(\)\);[\s\S]*?setTimeout\(fin2SaveData, 700\)/, 'Financas autosave should backup immediately and persist quickly');
  assert.match(dashboardHtml, /Excluir holerite deste mes/, 'Financas payslip modal should expose a monthly delete button');
  assert.match(dashboardHtml, /month\.file = null;[\s\S]*?month\.credits = \[\];[\s\S]*?month\.discounts = \[\];[\s\S]*?month\.extraction = null;/, 'Financas monthly payslip deletion should clear only the selected month file and extracted items');
  assert.match(dashboardHtml, /function fin2ClearPayslipDebtMonthValues\(monthIdx, debtKeys\)/, 'Financas monthly payslip deletion should clear generated bank debt values for that month');
  assert.match(dashboardHtml, /function fin2RenderPayslipSubRows\(/, 'Financas should render expandable payslip detail rows');
  assert.doesNotMatch(dashboardHtml, /const labelPrefix = role === 'discounts'/, 'Financas expanded payslip rows should show only the editable item field, without Credito/Desconto PM month prefix');
  assert.match(dashboardHtml, /function fin2PayslipLabelCase\(/, 'Financas should normalize expanded PM payslip item labels away from all caps');
  assert.match(dashboardHtml, /fin2Esc\(fin2PayslipLabelCase\(seriesRow\.label\)\)/, 'Financas should render expanded PM payslip item labels in sentence case');
  assert.match(dashboardHtml, /function fin2BuildPayslipSeries\(role\)/, 'Financas should render PM payslip expanded items as month-by-month series');
  assert.match(dashboardHtml, /function fin2PayslipSeriesCellValue\(seriesRow, monthIdx\)/, 'Financas should let expanded PM payslip item rows copy the previous cell');
  assert.match(dashboardHtml, /const FIN2_PAYSLIP_DEBT_CODES = new Set\(\['097292', '097293', '097294', '097296', '097302', '097352'\]\)/, 'Financas should classify Bradesco, Santander, Daycoval, BMG, Safra and Eagle payslip discounts as debt deductions');
  assert.match(dashboardHtml, /function fin2PayslipSeriesIsDebtDeduction\(seriesRow\)/, 'Financas should identify PM payslip discount rows that are actually debts');
  assert.match(dashboardHtml, /fin2PayslipSeriesIsDebtDeduction\(seriesRow\) \? 0 : fin2PayslipSeriesCellValue/, 'Financas should exclude bank debt deductions from Despesas PM totals');
  assert.match(dashboardHtml, /fin2-subrow-debt-deduction/, 'Financas should render PM debt deductions with a dedicated red visual class');
  assert.match(dashboardHtml, /let fin2PayslipExpanded = \{ credits: false, discounts: false \};/, 'Financas should keep PM payslip parent rows collapsed by default');
  assert.match(dashboardHtml, /let fin2PayslipDebtCollapsed = \{ despesas: false, dividas: false \};/, 'Financas should track collapsed state for payslip debt rows in Despesas PM and Dividas');
  assert.match(dashboardHtml, /let fin2ExpenseGroupsCollapsed = \{ gasolina: false, extras: false, mercado: false \};/, 'Financas should track collapsed state for Gasolina, Despesas X and Mercado groups');
  assert.match(dashboardHtml, /const FIN2_EXPENSE_GROUPS = \[[\s\S]*?\{ key: 'gasolina', label: 'Gasolina' \},[\s\S]*?\{ key: 'extras', label: 'Despesas X' \},[\s\S]*?\{ key: 'mercado', label: 'Mercado' \}/, 'Financas should define Gasolina, Despesas X and Mercado in the requested order');
  assert.match(dashboardHtml, /function fin2ExpenseGroupConfigs\(\)/, 'Financas should resolve expense subgroup order from persisted sheet data');
  assert.match(dashboardHtml, /function fin2SetExpenseGroupOrder\(keys\)/, 'Financas should persist reordered expense subgroups');
  assert.match(dashboardHtml, /FIN2_SHEET\.expenseGroupOrder = orderedKeys;/, 'Financas should save the custom expense subgroup order in the sheet payload');
  assert.match(dashboardHtml, /let fin2OldDebtsCollapsed = false;/, 'Financas should track collapsed state for old debt rows');
  assert.match(dashboardHtml, /let fin2CurrentDebtsCollapsed = false;/, 'Financas should track collapsed state for unclassified current debt rows');
  assert.match(dashboardHtml, /let fin2DebtGroupTotalModes = \{ payslip: '', old: '', current: '' \};/, 'Financas should track total modes for payslip, old and current debt group rows');
  assert.match(dashboardHtml, /function fin2RenderPayslipDebtToggle\(scope\)/, 'Financas should render discreet expand-collapse controls for payslip debt rows');
  assert.match(dashboardHtml, /function fin2RenderPayslipDebtGroupRow\(scope, groupKey, count, parentCollapsed = false\)/, 'Financas should render compact group rows for payslip-origin debt rows');
  assert.match(dashboardHtml, /onclick="fin2TogglePayslipDebtRows\('\$\{scope\}'\)"/, 'Financas payslip debt group row should toggle when the row itself is clicked');
  assert.match(dashboardHtml, /function fin2RenderExpenseGroupRow\(kind, groupKey, count, parentCollapsed = false\)/, 'Financas should render compact rows for Gasolina, Despesas X and Mercado');
  assert.match(dashboardHtml, /data-fin2-expense-group="\$\{config\.key\}"/, 'Financas should expose each expense subgroup in the DOM by key');
  assert.match(dashboardHtml, /fin2-expense-group-drag-handle/, 'Financas should expose a drag handle on each compact expense subgroup row');
  assert.match(dashboardHtml, /window\.fin2ExpenseGroupDragStart\s*=/, 'Financas should start dragging compact expense subgroup rows');
  assert.match(dashboardHtml, /window\.fin2DropExpenseGroup\s*=/, 'Financas should reorder compact expense subgroup rows on drop');
  assert.match(dashboardHtml, /fin2-expense-group-add-btn" onclick="event\.stopPropagation\(\);fin2AddExpenseGroupRow\('\$\{config\.key\}'\)" title="Adicionar em \$\{fin2Esc\(config\.label\)\}">/, 'Financas expense subgroup rows should provide group-specific add buttons');
  assert.match(dashboardHtml, /function fin2RenderExpenseGroupColumnTotalCell\(kind, monthIdx, rows, contentHtml\)/, 'Financas should wrap expense subgroup monthly subtotals with cell-style total controls');
  assert.match(dashboardHtml, /data-fin2-subgroup-column-total="\$\{fin2Esc\(scopeAttr\)\}"/, 'Financas subgroup subtotal cells should expose their managed scope in the DOM');
  assert.match(dashboardHtml, /window\.fin2ToggleExpenseGroupColumnTotal\s*=/, 'Financas should toggle an expense subgroup month out of Despesas totals');
  assert.match(dashboardHtml, /window\.fin2ToggleExpenseGroupColumnReceitasOffset\s*=/, 'Financas should toggle an expense subgroup month out of totals and Receitas');
  assert.match(dashboardHtml, /function fin2RenderOldDebtGroupRow\(groupKey, count, parentCollapsed = false\)/, 'Financas should render a compact group row for old debts');
  assert.match(dashboardHtml, /function fin2RenderCurrentDebtGroupRow\(groupKey, count, parentCollapsed = false\)/, 'Financas should render a compact group row for current unclassified debts');
  assert.match(dashboardHtml, /function fin2DebtGroupRows\(kind\)/, 'Financas should collect rows for each debt subgroup');
  assert.match(dashboardHtml, /function fin2RenderDebtGroupSubtotalCells\(kind, count\)/, 'Financas should render monthly subtotals in debt subgroup rows');
  assert.match(dashboardHtml, /id="fin2-debtgrp-\$\{kind\}-\$\{monthIdx\}"/, 'Financas should expose monthly debt subgroup subtotal cells in the DOM');
  assert.match(dashboardHtml, /id="fin2-debtgrp-\$\{kind\}-total"/, 'Financas should expose annual debt subgroup subtotal cells in the DOM');
  assert.match(dashboardHtml, /function fin2RenderDebtGroupColumnTotalCell\(kind, monthIdx, rows, contentHtml\)/, 'Financas should wrap debt subgroup monthly subtotals with cell-style total controls');
  assert.match(dashboardHtml, /window\.fin2ToggleDebtGroupColumnTotal\s*=/, 'Financas should toggle a debt subgroup month out of Dividas totals');
  assert.match(dashboardHtml, /window\.fin2ToggleDebtGroupColumnReceitasOffset\s*=/, 'Financas should toggle a debt subgroup month out of totals and Receitas');
  assert.match(dashboardHtml, /\.fin2-payslip-debt-group-row:not\(\.fin2-row-total-excluded\) \.fin2-debt-group-subtotal \{\s*color:#ef4444;/, 'Financas payslip debt group subtotals should use the payslip debt group color');
  assert.match(dashboardHtml, /\.fin2-old-debt-group-row:not\(\.fin2-row-total-excluded\) \.fin2-debt-group-subtotal \{\s*color:#c9a84c;/, 'Financas old debt group subtotals should use the old debt group color');
  assert.match(dashboardHtml, /\.fin2-current-debt-group-row:not\(\.fin2-row-total-excluded\) \.fin2-debt-group-subtotal \{\s*color:#fca5a5;/, 'Financas current debt group subtotals should use the current debt group color');
  assert.match(dashboardHtml, /\.fin2-sh-tot,\s*\.fin2-cashflow-pos,\s*\.fin2-cashflow-neg \{[\s\S]*?font-variant-numeric:tabular-nums;/, 'Financas total and subtotal values should align with tabular numeric rendering');
  assert.match(dashboardHtml, /\.fin2-cashflow-row \.fin2-cashflow-pos,\s*\.fin2-cashflow-row \.fin2-cashflow-neg \{\s*text-align:center;/, 'Financas cashflow row values should be centered inside each month cell');
  assert.match(dashboardHtml, /function fin2RenderGroupColumnTotalControls\(groupKey, monthIdx\)/, 'Financas should render bulk per-column controls on group total cells');
  assert.match(dashboardHtml, /window\.fin2ToggleGroupColumnTotal\s*=/, 'Financas should toggle every cell in a category month out of that column total');
  assert.match(dashboardHtml, /window\.fin2ToggleGroupColumnReceitasOffset\s*=/, 'Financas should toggle every cell in a category month out of totals and Receitas');
  assert.match(dashboardHtml, /fin2RenderManagedGroupTotalCell\(groupKey, i, totalHtml\)/, 'Financas should wrap monthly category totals with bulk cell controls');
  assert.match(dashboardHtml, /function fin2RenderDebtGroupTotalControls\(kind\)/, 'Financas should render subtle total controls on debt group rows');
  assert.match(dashboardHtml, /data-fin2-debt-group-total-kind="\$\{totalKind\}"/, 'Financas payslip debt group row should expose its total-control kind when rendered inside Dividas');
  assert.match(dashboardHtml, /if \(kind === 'payslip'\) return 'Dívidas holê';/, 'Financas should label payslip debt group total controls in a compact way');
  assert.match(dashboardHtml, /data-fin2-debt-group-total-kind="old"/, 'Financas old debt group row should expose its total-control kind');
  assert.match(dashboardHtml, /data-fin2-debt-group-total-kind="current"/, 'Financas current debt group row should expose its total-control kind');
  assert.match(dashboardHtml, /window\.fin2ToggleDebtGroupTotal\s*=/, 'Financas should toggle old/current debt groups out of their own totals');
  assert.match(dashboardHtml, /window\.fin2ToggleDebtGroupReceitasOffset\s*=/, 'Financas should toggle old/current debt groups out of totals and Receitas');
  assert.match(dashboardHtml, /Dívidas anti/, 'Financas should label the old debt compact group with the abbreviated Dividas anti text');
  assert.match(dashboardHtml, /Dívidas atua/, 'Financas should label the unclassified debt compact group with the abbreviated Dividas atua text');
  assert.match(dashboardHtml, /window\.fin2AddOldDebtRow\s*=/, 'Financas should allow adding a debt directly inside Dividas Antigas');
  assert.match(dashboardHtml, /fin2-current-debt-add-btn/, 'Financas should expose an add button inside Dividas Atuais');
  assert.match(dashboardHtml, /fin2-current-debt-add-btn" onclick="event\.stopPropagation\(\);fin2AddRow\('dividas'\)" title="Adicionar dívida atual">/, 'Financas current debt add button should create an ordinary Dividas row');
  assert.match(dashboardHtml, /window\.fin2ToggleCurrentDebtRows\s*=/, 'Financas should toggle current unclassified debt rows');
  assert.match(dashboardHtml, /fin2-payslip-debt-group-row/, 'Financas should use a compact separator row for payslip-origin debt groups');
  assert.match(dashboardHtml, /fin2-old-debt-group-row/, 'Financas should use a compact separator row for old debt groups');
  assert.match(dashboardHtml, /fin2-current-debt-group-row/, 'Financas should use a compact separator row for current debt groups');
  assert.match(dashboardHtml, /const label = 'Dívidas holê';/, 'Financas should label the compact payslip debt group with the abbreviated Dividas hole text');
  assert.doesNotMatch(dashboardHtml, /Dívidas bancárias do holerite/, 'Financas should not show the old verbose payslip bank debt label');
  assert.match(dashboardHtml, /data-fin2-payslip-debt-group="\$\{scope\}"/, 'Financas payslip debt group rows should expose their scope in the DOM');
  assert.match(dashboardHtml, /window\.fin2TogglePayslipDebtRows\s*=/, 'Financas should toggle payslip-origin debt rows independently from full groups');
  assert.match(dashboardHtml, /onclick="fin2TogglePayslipRow\('\$\{row\.payslipRole\}'\)"/, 'Financas PM parent arrows should expand or collapse only their own payslip rows');
  assert.doesNotMatch(dashboardHtml, /fin2ExpensesContentCollapsed/, 'Financas should not hide regular expense rows from the Despesas PM parent arrow');
  assert.match(dashboardHtml, /fin2-expense-group-pm/, 'Financas should style Despesas PM with the same compact subgroup emphasis');
  assert.match(dashboardHtml, /\.fin2-expense-group-pm \.fin2-label-input,[\s\S]*?\.fin2-row-total-excluded\.fin2-expense-group-pm \.fin2-label-input \{[\s\S]*?color:#86efac;[\s\S]*?font-size:10px;[\s\S]*?font-weight:900;/, 'Financas should render the Despesas PM name with the same compact green style as expense subgroup names');
  assert.match(dashboardHtml, /mercadoExpense\.expenseGroup = 'mercado'/, 'Financas should keep Mercado 1 inside the Mercado subgroup');
  assert.match(dashboardHtml, /fin2RenderPayslipDebtGroupRow\('despesas', groupKey, debtRows\.length\)/, 'Financas should add a compact payslip debt group row under Despesas PM');
  assert.match(dashboardHtml, /fin2RenderExpenseGroupRow\(config\.key, groupKey, despesasExpenseRowsCount\[config\.key\] \|\| 0, collapsed\)/, 'Financas should add compact empty expense subgroup rows inside Despesas');
  assert.match(dashboardHtml, /fin2RenderPayslipDebtGroupRow\('dividas', groupKey, dividasDebtRowsCount, collapsed\)/, 'Financas should add a compact payslip debt group row inside Dividas');
  assert.match(dashboardHtml, /fin2RenderOldDebtGroupRow\(groupKey, dividasOldDebtRowsCount, collapsed\)/, 'Financas should add a compact old debt group row inside Dividas');
  assert.match(dashboardHtml, /fin2RenderCurrentDebtGroupRow\(groupKey, dividasCurrentDebtRowsCount, collapsed\)/, 'Financas should add a compact current debt group row inside Dividas');
  assert.match(dashboardHtml, /if \(groupKey === 'dividas' && !dividasOldDebtGroupRendered\) \{[\s\S]*?fin2RenderOldDebtGroupRow\(groupKey, dividasOldDebtRowsCount, collapsed\)/, 'Financas should render Dividas Antigas even when it is empty');
  assert.match(dashboardHtml, /if \(groupKey === 'dividas' && !dividasCurrentDebtGroupRendered\) \{[\s\S]*?fin2RenderCurrentDebtGroupRow\(groupKey, dividasCurrentDebtRowsCount, collapsed\)/, 'Financas should render Dividas Atuais even when it is empty');
  assert.match(dashboardHtml, /if \(expenseRowClass\) \{[\s\S]*?const expenseGroupConfigs = fin2ExpenseGroupConfigs\(\);[\s\S]*?const lastExpenseGroup = expenseGroupConfigs\[expenseGroupConfigs\.length - 1\];[\s\S]*?renderExpenseGroupsThrough\(lastExpenseGroup\.key\)/, 'Financas should render expense group headers before ordinary expense rows');
  assert.match(dashboardHtml, /function fin2RowsForRender\(group, groupKey\)/, 'Financas should normalize sheet row render order');
  assert.match(dashboardHtml, /if \(groupKey === 'despesas'\) \{[\s\S]*?const payslipRows = group\.filter\(row => row\.payslipRole\);[\s\S]*?const expenseRows = group\.filter\(row => fin2IsExpenseItemRow\(row\)\);[\s\S]*?const groupedExpenseRows = fin2ExpenseGroupConfigs\(\)\.flatMap\(config => group\.filter\(row => fin2ExpenseGroupKind\(row\) === config\.key\)\);[\s\S]*?return payslipRows\.concat\(groupedExpenseRows, expenseRows\);/, 'Financas should keep Despesas PM and expense subgroups above ordinary expenses');
  assert.match(dashboardHtml, /if \(groupKey !== 'dividas'\) return group;/, 'Financas should only pin special rows inside Dividas');
  assert.match(dashboardHtml, /const payslipDebtRows = group\.filter\(row => fin2IsPayslipDebtRow\(row\)\);/, 'Financas should collect payslip-origin debt rows first for rendering');
  assert.match(dashboardHtml, /const regularDebtRows = group\.filter\(row => !fin2IsPayslipDebtRow\(row\) && !fin2IsOldDebtRow\(row\)\);/, 'Financas should keep ordinary debts outside Dividas Antigas by default');
  assert.match(dashboardHtml, /const oldDebtRows = group\.filter\(row => fin2IsOldDebtRow\(row\)\);/, 'Financas should collect old debt rows separately for rendering');
  assert.match(dashboardHtml, /return payslipDebtRows\.concat\(oldDebtRows, regularDebtRows\);/, 'Financas should render Dividas Antigas immediately after payslip-origin debts and before ordinary debts');
  assert.match(dashboardHtml, /fin2RowsForRender\(group, groupKey\)\.forEach\(row => \{/, 'Financas should use the normalized render order in the sheet');
  assert.match(dashboardHtml, /if \(!fin2PayslipDebtCollapsed\.despesas\) html \+= debtRows\.join\(''\);/, 'Financas should hide only red payslip debt rows under Despesas PM when collapsed');
  assert.match(dashboardHtml, /if \(expenseGroupKind\) \{[\s\S]*?renderExpenseGroupsThrough\(expenseGroupKind\);[\s\S]*?fin2ExpenseGroupsCollapsed\[expenseGroupKind\]/, 'Financas should hide only rows assigned to a collapsed expense subgroup');
  assert.match(dashboardHtml, /payslipDebtClass && fin2PayslipDebtCollapsed\.dividas/, 'Financas should hide only payslip-origin rows under Dividas when collapsed');
  assert.match(dashboardHtml, /groupKey === 'dividas' && !payslipDebtClass && !dividasOldDebtGroupRendered/, 'Financas should place the Dividas Antigas group directly after the Holerite block');
  assert.match(dashboardHtml, /oldDebtClass && fin2OldDebtsCollapsed/, 'Financas should hide only old debt rows when the old debt group is collapsed');
  assert.match(dashboardHtml, /currentDebtClass && fin2CurrentDebtsCollapsed/, 'Financas should hide only current debt rows when the current debt group is collapsed');
  assert.match(dashboardHtml, /function fin2IsOldDebtRow\(row\) \{[\s\S]*?row\.oldDebt === true/, 'Financas should classify old debts only when the row is explicitly marked');
  assert.match(dashboardHtml, /function fin2RenderOldDebtTotalToggle\(row\)/, 'Financas should render a per-row total inclusion toggle for old debts');
  assert.match(dashboardHtml, /window\.fin2ToggleOldDebtTotal\s*=/, 'Financas should toggle whether an old debt enters column totals');
  assert.match(dashboardHtml, /function fin2RowSupportsTotalControls\(groupKey, row\)/, 'Financas should define which sheet rows can manage totals');
  assert.match(dashboardHtml, /groupKey === 'receitas' \|\| groupKey === 'despesas' \|\| groupKey === 'dividas'/, 'Financas should expose total controls for Receitas, Despesas and Dividas rows');
  assert.match(dashboardHtml, /function fin2RowExcludedFromGroupTotals\(groupKey, row\)/, 'Financas should centralize per-row group total exclusion');
  assert.match(dashboardHtml, /row\.excludeFromGroupTotals === true/, 'Financas should persist ordinary group-total exclusions on the row');
  assert.match(dashboardHtml, /row\.deductFromReceitasTotal === true/, 'Financas should persist rows that also reduce Receitas totals');
  assert.match(dashboardHtml, /function fin2ReceitasOffsetValue\(monthIdx\)/, 'Financas should calculate the monthly offset applied to Receitas');
  assert.match(dashboardHtml, /function fin2GroupMonthTotal\(groupKey, monthIdx\)/, 'Financas should calculate display totals through group-level helpers');
  assert.match(dashboardHtml, /return groupKey === 'receitas' \? base - fin2ReceitasOffsetValue\(monthIdx\) : base;/, 'Financas should subtract flagged Despesas and Dividas from Receitas totals');
  assert.match(dashboardHtml, /function fin2RenderRowTotalControls\(groupKey, row\)/, 'Financas should render per-row total controls for managed groups');
  assert.match(dashboardHtml, /window\.fin2ToggleRowGroupTotal\s*=/, 'Financas should toggle whether a row enters its own group totals');
  assert.match(dashboardHtml, /window\.fin2ToggleRowReceitasOffset\s*=/, 'Financas should toggle whether a row also reduces Receitas totals');
  assert.match(dashboardHtml, /data-fin2-deducts-from-receitas/, 'Financas should expose the Receitas deduction state in the DOM');
  assert.match(dashboardHtml, /function fin2CellModeValue\(mode\)/, 'Financas should normalize per-cell total control modes');
  assert.match(dashboardHtml, /function fin2SheetCellTotalMode\(row, monthIdx\)/, 'Financas should read per-cell total control modes from sheet rows');
  assert.match(dashboardHtml, /function fin2SetSheetCellTotalMode\(row, monthIdx, mode\)/, 'Financas should persist per-cell total control modes on sheet rows');
  assert.match(dashboardHtml, /function fin2CellExcludedFromGroupTotals\(groupKey, row, monthIdx\)/, 'Financas should calculate per-cell group-total exclusions');
  assert.match(dashboardHtml, /function fin2CellDeductsFromReceitas\(groupKey, row, monthIdx\)/, 'Financas should calculate per-cell Receitas offsets');
  assert.match(dashboardHtml, /function fin2CellExcludedFromGroupTotals\(groupKey, row, monthIdx\) \{[\s\S]*?return fin2RowExcludedFromGroupTotals\(groupKey, row\) \|\| mode === 'exclude';/, 'Financas Receitas-offset cell mode should not zero the source cell or subgroup subtotal');
  assert.match(dashboardHtml, /function fin2RowsColumnExcludedByCellMode\(rows, monthIdx\) \{[\s\S]*?mode => mode === 'exclude'/, 'Financas subgroup subtotal exclusion state should only follow the upper-left exclude mode');
  assert.match(dashboardHtml, /groupKey === 'dividas' && fin2DebtGroupExcludesRow\(row\)/, 'Financas should let debt group-row controls exclude their member rows from Dividas totals');
  assert.match(dashboardHtml, /groupKey === 'dividas' && fin2DebtGroupDeductsRowFromReceitas\(row\)/, 'Financas should let debt group-row controls also deduct member rows from Receitas');
  assert.match(dashboardHtml, /function fin2RenderSheetCellTotalControls\(groupKey, row, monthIdx\)/, 'Financas should render two subtle total controls inside managed sheet cells');
  assert.match(dashboardHtml, /function fin2RenderManagedSheetCell\(groupKey, row, monthIdx, contentHtml\)/, 'Financas should wrap managed sheet cells with per-cell total controls');
  assert.match(dashboardHtml, /\.fin2-cell-receitas-toggle \{ left:1px;right:auto;top:auto;bottom:1px; \}/, 'Financas should move the per-cell Receitas offset button to the lower-left corner');
  assert.match(dashboardHtml, /\.fin2-cell-group-toggle\.is-on \{[\s\S]*?color:#8b94b0;[\s\S]*?background:#ffffff04;/, 'Financas should soften the upper-left per-cell button color');
  assert.match(dashboardHtml, /window\.fin2ToggleCellGroupTotal\s*=/, 'Financas should toggle a single sheet cell out of its own group total');
  assert.match(dashboardHtml, /window\.fin2ToggleCellReceitasOffset\s*=/, 'Financas should toggle a single sheet cell out of totals and out of Receitas');
  assert.match(dashboardHtml, /fin2SetSheetCellTotalMode\(row, monthIdx, current === 'exclude' \? '' : 'exclude'\);/, 'Financas upper-left cell toggle should switch from Receitas-offset mode to exclude mode predictably');
  assert.match(dashboardHtml, /data-fin2-cell-total-managed/, 'Financas should expose per-cell managed state in the DOM');
  assert.match(dashboardHtml, /data-fin2-cell-deducts-from-receitas/, 'Financas should expose per-cell Receitas deduction state in the DOM');
  assert.match(dashboardHtml, /function fin2PayslipCellTotalMode\(role, key, monthIdx\)/, 'Financas should read per-cell total modes for payslip subrows');
  assert.match(dashboardHtml, /function fin2SetPayslipCellTotalMode\(role, key, monthIdx, mode\)/, 'Financas should persist per-cell total modes for payslip subrows');
  assert.match(dashboardHtml, /function fin2PayslipSeriesCellExcludedFromTotals\(seriesRow, monthIdx\) \{[\s\S]*?return mode === 'exclude';/, 'Financas Despesas PM Receitas-offset mode should not zero the payslip subtotal source cell');
  assert.match(dashboardHtml, /function fin2RenderPayslipCellTotalControls\(seriesRow, monthIdx\)/, 'Financas should render subtle per-cell controls in Despesas PM expanded rows');
  assert.match(dashboardHtml, /function fin2RenderManagedPayslipCell\(seriesRow, monthIdx, contentHtml\)/, 'Financas should wrap Despesas PM subrow cells with total controls');
  assert.match(dashboardHtml, /window\.fin2TogglePayslipCellGroupTotal\s*=/, 'Financas should toggle a single Despesas PM subrow cell out of its group total');
  assert.match(dashboardHtml, /window\.fin2TogglePayslipCellReceitasOffset\s*=/, 'Financas should toggle a single Despesas PM subrow cell out of totals and Receitas');
  assert.match(dashboardHtml, /fin2SetPayslipCellTotalMode\(role, key, monthIdx, current === 'exclude' \? '' : 'exclude'\);/, 'Financas upper-left payslip toggle should switch from Receitas-offset mode to exclude mode predictably');
  assert.match(dashboardHtml, /FIN2_PAYSLIPS\.cellTotalModes/, 'Financas should store payslip per-cell total modes with payslip metadata');
  assert.match(dashboardHtml, /function fin2PayslipReceitasOffsetValue\(monthIdx\)/, 'Financas should calculate Receitas offsets from Despesas PM subrow cells');
  assert.match(dashboardHtml, /fin2PayslipReceitasOffsetValue\(monthIdx\)/, 'Financas should include payslip subrow offsets in Receitas totals');
  assert.match(dashboardHtml, /fin2ToggleRowGroupTotal\('dividas', rowId\);/, 'Financas should route the legacy old debt toggle through the new group-total toggle');
  assert.match(dashboardHtml, /oldDebt: true/, 'Financas should mark debts created inside Dividas Antigas explicitly');
  assert.match(dashboardHtml, /window\.fin2DropIntoOldDebtGroup\s*=/, 'Financas should allow dragging an ordinary debt into Dividas Antigas');
  assert.match(dashboardHtml, /function fin2MarkDebtAsOld\(row\)[\s\S]*?row\.oldDebt = true;/, 'Financas should mark a dropped debt as old explicitly');
  assert.match(dashboardHtml, /function fin2MarkDebtAsRegular\(row\)[\s\S]*?delete row\.oldDebt;[\s\S]*?delete row\.excludeFromDebtTotals;[\s\S]*?delete row\.excludeFromGroupTotals;[\s\S]*?delete row\.deductFromReceitasTotal;[\s\S]*?delete row\.cellTotalModes;/, 'Financas should allow old debts to be moved back to ordinary debts');
  assert.match(dashboardHtml, /function fin2SheetCellTotalValue\(groupKey, row, monthIdx\)/, 'Financas should calculate group totals through a total-aware helper');
  assert.match(dashboardHtml, /if \(fin2CellExcludedFromGroupTotals\(groupKey, row, monthIdx\)\) return 0;/, 'Financas should exclude managed cells from their own group totals when toggled off');
  assert.match(dashboardHtml, /debtGroupTotalModes: fin2DebtGroupTotalModes/, 'Financas should persist total modes for debt group rows');
  assert.match(dashboardHtml, /fin2DebtGroupTotalModes = fin2NormalizeDebtGroupTotalModes\(data\.debtGroupTotalModes\);/, 'Financas should reload debt group total modes from persisted data');
  assert.match(dashboardHtml, /const rec = fin2GroupMonthTotal\('receitas', i\);[\s\S]*?const dep = fin2GroupMonthTotal\('despesas', i\);[\s\S]*?const div = fin2GroupMonthTotal\('dividas', i\);/, 'Financas cashflow should use group totals that include Receitas offsets');
  assert.match(dashboardHtml, /function fin2SyncPayslipDebtsToSheet\(\)/, 'Financas should copy bank payslip deductions into the Dividas sheet automatically');
  assert.match(dashboardHtml, /source: 'payslipDebt'/, 'Financas should mark automatically copied payslip bank debts with a source flag');
  assert.match(dashboardHtml, /function fin2IsPayslipDebtRow\(row\)/, 'Financas should identify Dividas rows that came from PM payslip deductions');
  assert.match(dashboardHtml, /fin2-payslip-debt-row/, 'Financas should color Dividas sheet rows copied from payslip bank deductions');
  assert.match(dashboardHtml, /\.fin2-payslip-debt-row td \{\s*background:transparent;[\s\S]*?color:#ef4444 !important;/, 'Financas payslip debt rows should keep the default gray cell background while using red text');
  assert.match(dashboardHtml, /\.fin2-payslip-debt-row \.fin2-input \{\s*background:#141829;[\s\S]*?border-color:transparent;/, 'Financas payslip debt inputs should keep the default gray input background');
  assert.match(dashboardHtml, /\.fin2-old-debt-row td \{\s*background:transparent;[\s\S]*?color:#c9a84c !important;/, 'Financas old debt rows should use a yellow highlight while keeping table cells transparent');
  assert.match(dashboardHtml, /\.fin2-old-debt-row \.fin2-input \{\s*background:#141829;[\s\S]*?border-color:transparent;/, 'Financas old debt inputs should keep the default gray input background');
  assert.match(dashboardHtml, /data-fin2-payslip-debt="true"/, 'Financas should expose a DOM marker for payslip-origin debt rows');
  assert.match(dashboardHtml, /function fin2IsPayslipDebtCreditor\(creditor\)/, 'Financas should identify Dividas\/Acordos creditors that came from PM payslip deductions');
  assert.match(dashboardHtml, /fin2-debt-card\.payslip-debt/, 'Financas should color Dividas\/Acordos cards copied from payslip bank deductions');
  assert.match(dashboardHtml, /fin2-dc-source-tag">Holerite/, 'Financas should label payslip-origin debt cards as Holerite');
  assert.match(dashboardHtml, /function fin2ApplyPayslipDebtSeriesToCreditor\(seriesRow, creditor\) \{[\s\S]*?creditor\.valuesSource = 'payslipDebt';[\s\S]*?creditor\.monthly = monthly;/, 'Financas should let payslip debts keep the holerite monthly value authoritative');
  assert.match(dashboardHtml, /fin2SyncPayslipDebtsToSheet\(\);[\s\S]*?fin2SyncDebtSheetFromCreditors\(\);/, 'Financas should sync payslip debts before refreshing creditors into the sheet');
  assert.match(dashboardHtml, /\.fin2-sheet-table \{[\s\S]*?table-layout:fixed;/, 'Financas Planilha should use fixed table layout to keep the 12 months within the PC viewport');
  assert.match(dashboardHtml, /\.fin2-sheet-table th \{[\s\S]*?position:sticky;top:0;z-index:8;/, 'Financas Planilha month header should stay fixed during vertical scroll');
  assert.match(dashboardHtml, /\.fin2-sheet-wrap \{ padding:18px 18px 20px;min-width:0; \}/, 'Financas Planilha should avoid forcing horizontal overflow with a wide wrapper');
  assert.match(dashboardHtml, /\.fin2-sheet-scroll \{ overflow:visible; \}/, 'Financas Planilha should not show a horizontal scroll area on PC');
  assert.match(dashboardHtml, /id="fin2-pane-planilha" class="fin2-panel" style="display:flex;overflow-y:auto;overflow-x:hidden"/, 'Financas Planilha pane should keep vertical scrolling without horizontal scrolling');
  assert.match(dashboardHtml, /window\.fin2UpdatePayslipSeriesItem\s*=/, 'Financas should allow editing copied PM payslip series cells');
  assert.match(dashboardHtml, /fin2DeletePayslipSeriesItem/, 'Financas should allow deleting a PM payslip expanded item series');
  assert.match(dashboardHtml, /function fin2ApplyPayslipExtraction\(/, 'Financas should apply automatic PM payslip extraction results');
  assert.match(dashboardHtml, /function fin2ParseMoneyInput\(/, 'Financas spreadsheet should parse pt-BR money inputs with thousand separators');
  assert.match(dashboardHtml, /function fin2IsBlankSheetCell\(/, 'Financas spreadsheet should distinguish blank cells from numeric zero');
  assert.match(dashboardHtml, /typeof value === 'string' && value\.trim\(\) === ''/, 'Financas spreadsheet should treat whitespace-only cells as blank for inheritance');
  assert.match(dashboardHtml, /function fin2SheetNumber\(/, 'Financas spreadsheet formulas should normalize stored pt-BR money strings before totaling');
  assert.match(dashboardHtml, /return fin2ParseMoneyInput\(value\);/, 'Financas spreadsheet should parse persisted string values using the same pt-BR money parser as inputs');
  assert.match(dashboardHtml, /function fin2SheetOwnCellValue\(/, 'Financas spreadsheet should compute explicit cell values before inherited monthly values');
  assert.match(dashboardHtml, /if \(row\.payslipRole\) \{[\s\S]*?return fin2PayslipEffectiveSum\(row\.payslipRole, monthIdx\);[\s\S]*?\}/, 'Financas PM payslip parent cells should be calculated from effective expanded item rows');
  assert.match(dashboardHtml, /Holerite_maio_2026\.pdf/, 'Financas should keep the May 2026 PM payslip attached in the default reference state');
  assert.match(dashboardHtml, /credits_total:9260\.17/, 'Financas should seed May 2026 PM payslip credits from the extracted holerite');
  assert.match(dashboardHtml, /discounts_total:6080\.63/, 'Financas should seed May 2026 PM payslip discounts from the extracted holerite');
  assert.match(dashboardHtml, /for \(let i = 0; i <= monthIdx; i\+\+\)/, 'Financas spreadsheet should inherit blank month cells from previous months');
  assert.match(dashboardHtml, /if \(row && row\.payslipRole\) \{[\s\S]*?return own === null \? 0 : own;[\s\S]*?\}/, 'Financas PM payslip parent rows should not inherit totals from previous months');
  assert.match(dashboardHtml, /function fin2SheetCellIsInherited\(/, 'Financas spreadsheet should identify cells visually copied from the previous month');
  assert.match(dashboardHtml, /data-fin2-inherited="true"/, 'Financas spreadsheet should mark inherited editable cells in the DOM');
  assert.match(dashboardHtml, /fin2-input-inherited/, 'Financas spreadsheet should style inherited copied cells subtly');
  assert.match(dashboardHtml, /function fin2MoneyCell\(value, noCents = false\)/, 'Financas spreadsheet calculated cells should use the shared money formatter');
  assert.match(dashboardHtml, /Math\.round\(Math\.abs\(numeric\)\)\.toLocaleString/, 'Financas no-cents display should round values while calculations keep cents');
  assert.match(dashboardHtml, /return noCents \? fin2MoneyNoCents\(value\) : fin2MoneyPlain\(value\);/, 'Financas spreadsheet formatter should not render a currency symbol');
  assert.match(dashboardHtml, /value="\$\{fin2Esc\(fin2MoneyCell\(value, true\)\)\}"/, 'Financas editable numeric cells should display no cents while preserving numeric values');
  assert.match(dashboardHtml, /fin2MoneyCell\(v, true\)/, 'Financas monthly total cells should display without cents');
  assert.match(dashboardHtml, /fin2MoneyCell\(saldo, true\)/, 'Financas cashflow cells should display without cents');
  assert.doesNotMatch(dashboardHtml, /style:\s*'currency'/, 'Dashboard money formatters should avoid browser currency symbols');
  assert.doesNotMatch(dashboardHtml, /R\$/, 'Dashboard should not render the legacy R$ symbol');
  assert.doesNotMatch(fin2PlanilhaScript, /R\$\$\{fin2MoneyPlain|R\$\$\{rowTotalText|'R\$'\s*\+|\$ \$/, 'Financas Planilha calculated cells should not render currency prefixes');
  assert.match(dashboardHtml, /fin2-section-add-btn/, 'Financas section add actions should render as compact circular buttons');
  assert.doesNotMatch(dashboardHtml, /fin2-add-row|fin2-add-btn/, 'Financas should not keep the old rectangular add row buttons in Planilha');
  assert.doesNotMatch(dashboardHtml, /TOTAL RECEITAS|TOTAL DESPESAS|TOTAL DÍVIDAS/, 'Financas group total labels should drop the TOTAL prefix');
  assert.doesNotMatch(dashboardHtml, /DESPESAS FIXAS/, 'Financas group header should use Despesas instead of Despesas Fixas');
  assert.match(dashboardHtml, /fin2-total-row\.fin2-tot-receitas \.fin2-sh-tot \{ color:#00b7ff; \}/, 'Financas total receitas values should use the brighter receita title color');
  assert.match(dashboardHtml, /fin2-total-row\.fin2-tot-despesas \.fin2-sh-tot \{ color:#4ade80; \}/, 'Financas total despesas values should use the despesa title color');
  assert.match(dashboardHtml, /fin2-total-row\.fin2-tot-dividas\s+\.fin2-sh-tot \{ color:#ef4444; \}/, 'Financas total dividas values should use the dividas title color');
  assert.doesNotMatch(dashboardHtml, /Edite os valores diretamente\. Os totais s[ãÃ]o recalculados automaticamente\./, 'Financas Planilha should not show the old explanatory helper text');
  assert.match(dashboardHtml, /function fin2SyncDebtsFromSheet\(/, 'Financas should synchronize Planilha Dividas rows into Dividas\/Acordos');
  assert.match(dashboardHtml, /function fin2SyncCreditorFromDebtRow\(row\)/, 'Financas should update debt agreement cards from spreadsheet row edits');
  assert.match(dashboardHtml, /if \(groupKey === 'dividas'\) \{[\s\S]*?fin2SyncCreditorFromDebtRow\(row\);[\s\S]*?fin2RefreshDebtViews\(creditor\.id\);[\s\S]*?\}/, 'Financas Planilha edits should refresh Dividas/Acordos');
  assert.match(dashboardHtml, /function fin2ApplyDebtContractExtraction\(cid, extraction, options = \{\}\)/, 'Financas should apply extracted debt contract values');
  assert.match(dashboardHtml, /const payslipDebt = fin2IsPayslipDebtCreditor\(creditor\);/, 'Financas contract extraction should detect payslip-origin debts');
  assert.match(dashboardHtml, /if \(monthly > 0 && !payslipDebt && !fin2DebtFieldIsManual\(creditor, 'monthly', force\)\) creditor\.monthly = monthly;/, 'Financas should keep payslip monthly discounts authoritative over contract values');
  assert.match(dashboardHtml, /creditor\.valuesSource = payslipDebt \? 'payslipDebt' : 'contract';/, 'Financas should keep payslip-origin debts sourced from holerite even after contract extraction');
  assert.match(dashboardHtml, /if \(row && !payslipDebt\) fin2ApplyDebtCreditorValuesToSheetRow\(creditor, row\);/, 'Financas should not overwrite payslip-origin sheet rows with contract values');
  assert.match(dashboardHtml, /row\.values = fin2PayslipDebtValues\(seriesRow\);/, 'Financas should always refresh payslip-origin debt rows from the holerite series');
  assert.match(dashboardHtml, /function fin2DebtContractOverridesSheet\(creditor\)/, 'Financas should separate contract override logic from payslip-origin debt logic');
  assert.match(dashboardHtml, /if \(fin2DebtContractOverridesSheet\(creditor\)\) \{/, 'Financas should only let contract values override non-payslip sheet rows');
  assert.match(dashboardHtml, /creditor\.contractValuesLocked = true;/, 'Financas should retain extracted contract metadata for debt agreements');
  assert.match(dashboardHtml, /function fin2NormalizeDebtStatus\(value\)/, 'Financas debt agreements should normalize statuses');
  assert.match(dashboardHtml, /const statusOpts = \['ativo','negociado','suspenso'\]/, 'Financas debt agreement status control should expose only Ativo, Negociado and Suspenso');
  assert.doesNotMatch(fin2DebtDrawerScript, /Prazo Inicial|Prazo Final|Plano de Quitação|Marcar Pendurada/, 'Financas debt agreement drawer should remove prazo fields, quitacao plan label and pendurada action');
  assert.match(dashboardHtml, /<input type="file" multiple accept="\.pdf,\.doc,\.docx,\.jpg,\.png"/, 'Financas debt agreement upload should accept multiple files');
  assert.match(dashboardHtml, /window\.fin2UploadContracts = async function\(cid, files\)/, 'Financas debt agreement upload should process multiple selected files');
  assert.match(dashboardHtml, /Array\.from\(\(event\.dataTransfer && event\.dataTransfer\.files\) \|\| \[\]\)/, 'Financas debt agreement drop handler should accept multiple dropped files');
  assert.match(dashboardHtml, /function fin2CreditorContracts\(creditor\)/, 'Financas should keep a per-creditor contract document list');
  assert.match(dashboardHtml, /function fin2RegisterCreditorContract\(creditor, fileName, filePath, extractedValues\)/, 'Financas should register each uploaded document on the debt');
  assert.match(dashboardHtml, /function fin2RenderContractList\(creditor, cid\)/, 'Financas debt drawer should render attached contract documents');
  assert.match(dashboardHtml, /function fin2PaidInstallmentNumbers\(creditor\)/, 'Financas should support non-contiguous paid installments');
  assert.match(dashboardHtml, /fin2SetInstallmentPaid\(c, idx, !fin2InstallmentIsPaid\(c, idx\)\);/, 'Financas installment clicks should toggle only the selected installment');
  assert.doesNotMatch(dashboardHtml, /c\.paid = \(idx < c\.paid\) \? idx : idx\+1;/, 'Financas installment clicks should not auto-mark previous installments');
  assert.match(dashboardHtml, /fin2AttachContractUI\(cid, file\.name, data\.path, data\.extracted \|\| data\.extraction \|\| null\)/, 'Financas contract uploads should pass extracted values to the debt synchronizer');
  assert.match(serverJs, /function parseFinanceContractValues\(rawText\)/, 'server should parse financial values from debt contract PDFs');
  assert.match(serverJs, /function parseFinanceInstallmentSchedule\(lines\)/, 'server should parse full debt contract installment schedules');
  assert.match(serverJs, /extracted\.paidInstallments = paidInstallments;/, 'server should preserve paid installment numbers from contract schedules');
  assert.match(serverJs, /extracted\.anticipation = nextOpen\.anticipation;/, 'server should extract the next anticipation value from the first open installment');
  assert.match(serverJs, /extracted\.lastAnticipation = lastOpen\.anticipation;/, 'server should extract the last anticipation value from the final open installment');
  assert.match(serverJs, /extracted\.installmentSchedule = schedule;/, 'server should return the full installment schedule for debt contracts');
  assert.match(serverJs, /parser_version: 2/, 'server contract extraction should be versioned so stale parsed data can refresh');
  assert.match(serverJs, /await refreshFinanceContractsState\(state\)/, 'server should refresh stale persisted contract extractions when contracts are loaded');
  assert.match(serverJs, /async function extractFinanceContractValues\(sourceAbsolutePath, fileName\)/, 'server should attempt debt contract extraction during upload');
  assert.match(serverJs, /extracted = await extractFinanceContractValues\(filePath, fileName\);/, 'server contract upload should call extraction before responding');
  assert.match(serverJs, /state\.contracts\.push\(\{ creditorId, fileName, path: relPath, uploadedAt: new Date\(\)\.toISOString\(\), extracted \}\);/, 'server should persist extracted contract values with the contract record');
  assert.match(serverJs, /return sendJson\(res, \{ ok: true, path: relPath, fileName, creditorId, extracted \}\);/, 'server should return extracted contract values to the dashboard');
  assert.match(dashboardHtml, /function fin2DebtScheduleRows\(creditor\)/, 'Financas debt drawer should render schedule rows extracted from contracts');
  assert.match(dashboardHtml, /function fin2DebtAnticipationValue\(creditor\)/, 'Financas debt drawer should prefer extracted anticipation values over monthly parcel values');
  assert.match(dashboardHtml, /function fin2DebtFieldIsManual\(creditor, field, force = false\)/, 'Financas debt extraction should respect manual field corrections on reload');
  assert.match(dashboardHtml, /function fin2MarkDebtFieldManual\(creditor, field\)/, 'Financas debt field edits should be marked as manual overrides');
  assert.match(dashboardHtml, /window\.fin2SaveDebtField\s*=/, 'Financas debt agreement values should remain editable in the drawer');
  assert.match(dashboardHtml, /fin2ApplyDebtContractExtraction\(cid, extractedValues, \{ force: true \}\)/, 'Financas should force fresh values when the user uploads a new contract');
  assert.match(dashboardHtml, /creditor\.installmentSchedule = fin2NormalizeDebtInstallmentSchedule\(extraction\.installmentSchedule\);/, 'Financas should store normalized contract installment schedules');
  assert.match(dashboardHtml, /creditor\.paidInstallments = extraction\.paidInstallments/, 'Financas should store paid installments extracted from contracts');
  assert.match(dashboardHtml, /Ultima antecip\./, 'Financas debt drawer should expose the final anticipation value from contract schedules');
  assert.match(dashboardHtml, /onchange="fin2SaveDebtField\('\$\{cid\}','anticipation',this\.value\)"/, 'Financas anticipation values should be manually editable');
  assert.match(dashboardHtml, /if \(appliedContracts\) fin2TriggerAutoSave\(\);/, 'Financas should persist refreshed contract extractions into the finance data file');
  assert.match(dashboardHtml, /\.fin2-cashflow-pos \{ color:#c084fc;font-weight:700; \}/, 'Financas positive cashflow values should be lilac');
  assert.match(dashboardHtml, /\.fin2-cashflow-neg \{ color:#ef4444;font-weight:700; \}/, 'Financas negative cashflow values should remain red');
  assert.match(dashboardHtml, /\.fin2-commitments-row td \{[\s\S]*?background:#21141a;/, 'Financas should style the Despesas + Dividas total row');
  assert.match(dashboardHtml, /<tr class="fin2-commitments-row"><td><\/td><td class="fin2-td-label">DESPESAS \+ DÍVIDAS<\/td>/, 'Financas should render Despesas + Dividas above cashflow');
  assert.match(dashboardHtml, /const commitments = fin2GroupMonthTotal\('despesas', i\) \+ fin2GroupMonthTotal\('dividas', i\);/, 'Financas should calculate commitments from Despesas plus Dividas');
  assert.match(dashboardHtml, /<td class="fin2-td-label">FLUXO DE CAIXA<\/td>/, 'Financas cashflow row should be named Fluxo de Caixa');
  assert.doesNotMatch(dashboardHtml, /function fin2RenderSheetYearCopy\(year\)/, 'Financas should not keep the removed calculated 2017 copy renderer');
  assert.doesNotMatch(dashboardHtml, /fin2RenderSheetYearCopy\(2017\)/, 'Financas should not render the removed 2017 copy below cashflow');
  assert.doesNotMatch(dashboardHtml, /COPIA DA PLANILHA/, 'Financas should not show a copied spreadsheet section');
  assert.doesNotMatch(dashboardHtml, /<tr class="fin2-section-row"><td><\/td><td colspan="\$\{MONTHS\.length\+2\}">FLUXO DE CAIXA<\/td><\/tr>/, 'Financas should not render a separate blank Fluxo de Caixa section row');
  assert.doesNotMatch(dashboardHtml, /SALDO DO MÊS/, 'Financas should no longer label the final row Saldo do Mes');
  assert.match(dashboardHtml, /digite 0 para zerar de verdade/, 'Financas spreadsheet should explain how to stop inheritance with a real zero');
  assert.match(dashboardHtml, /row\.values\[monthIdx\] = null;/, 'Financas spreadsheet should turn cleared cells into copy-from-previous formulas');
  assert.match(dashboardHtml, /row\.values\[monthIdx\] = fin2ParseMoneyInput\(rawValue\);/, 'Financas spreadsheet should replace copied formulas with typed numeric values');
  assert.doesNotMatch(dashboardHtml, /function fin2NormalizeLegacyZeroInheritance\(/, 'Financas spreadsheet should not rely on legacy zero inference for copy formulas');
  assert.doesNotMatch(dashboardHtml, /explicitZeroMonths/, 'Financas spreadsheet should use null formulas and direct numeric overrides instead of zero metadata');
  assert.match(dashboardHtml, /values: \[0\]\.concat\(Array\(11\)\.fill\(null\)\)/, 'Financas new rows should keep February through December blank for previous-cell inheritance');
  assert.match(dashboardHtml, /inputmode="decimal"/, 'Financas spreadsheet editable numeric cells should use text decimal input for pt-BR thousand formatting');
  assert.doesNotMatch(dashboardHtml, /class="fin2-input" type="number"/, 'Financas spreadsheet numeric cells should not use number inputs that block thousand separators');
  assert.match(dashboardHtml, /function fin2ReorderDebtCreditors\(/, 'Financas should keep debt creditor order aligned after row drag-and-drop');
  assert.match(dashboardHtml, /function fin2DebtSheetOrderMap\(\)/, 'Financas should build a visual Planilha debt order map for Dividas/Acordos');
  assert.match(dashboardHtml, /const rows = fin2RowsForRender\(FIN2_SHEET\.dividas \|\| \[\], 'dividas'\);/, 'Financas should order Dividas/Acordos from the same rendered order used by Planilha');
  assert.match(dashboardHtml, /function fin2DebtCreditorOrderIndex\(creditor, orderMap\)/, 'Financas should resolve each agreement card position from the sheet order map');
  assert.match(dashboardHtml, /fin2DebtCreditorOrderIndex\(a, orderMap\)/, 'Financas creditor sorting should compare cards through the Planilha order map');
  assert.match(dashboardHtml, /data-fin2-creditor-id="\$\{fin2Esc\(fin2DebtRowCreditorId\(row\)\)\}"/, 'Financas Planilha debt rows should expose creditor ids for order validation');
  assert.match(dashboardHtml, /data-fin2-creditor-id="\$\{fin2Esc\(c\.id\)\}"/, 'Financas Dividas/Acordos cards should expose creditor ids for order validation');
  assert.match(dashboardHtml, /window\.fin2DragStart\s*=/, 'Financas should expose row drag start handler');
  assert.match(dashboardHtml, /window\.fin2DropRow\s*=/, 'Financas should expose row drop handler');
  assert.match(dashboardHtml, /class="fin2-drag-handle"/, 'Financas should render row drag handles');
  assert.match(dashboardHtml, /draggable="true"/, 'Financas row drag handles should be draggable');
  assert.match(dashboardHtml, /function fin2MoneyNoCents\(/, 'Financas should format PM parent total cells without visible cents');
  assert.match(dashboardHtml, /class="fin2-pm-total-cell"/, 'Financas should render PM parent totals as locked display cells');
  assert.match(dashboardHtml, /if \(row\.payslipRole\) return;/, 'Financas should block direct edits to PM payslip parent total rows');
  assert.match(dashboardHtml, /window\.fin2OpenPayslipModal\s*=/, 'Financas should open a monthly PM payslip modal');
  assert.match(dashboardHtml, /window\.fin2HandlePayslipFile\s*=/, 'Financas should upload and attach payslip files by month');
  assert.match(dashboardHtml, /\/api\/financas\/payslip\/extract/, 'Financas should call the PM payslip extraction endpoint after upload');
  assert.doesNotMatch(dashboardHtml, />\+ Credito PM</, 'Financas should not require manual PM credit insertion in the payslip modal');
  assert.doesNotMatch(dashboardHtml, />\+ Desconto PM</, 'Financas should not require manual PM discount insertion in the payslip modal');
  assert.match(dashboardHtml, /payslips: FIN2_PAYSLIPS/, 'Financas should persist payslip data with the sheet');
  assert.match(serverJs, /\/api\/financas\/payslip\/extract/, 'server should expose PM payslip extraction endpoint');
  assert.match(serverJs, /function parseFinancePayslipItems\(/, 'server should parse PM payslip credit and discount items');
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
  assert.match(dashboardHtml, /masterCloneUploadFile\(/, 'dashboard should upload text/audio/video files directly into clone assets');
  assert.match(dashboardHtml, /\/api\/personas\/assets\/upload/, 'dashboard should call the persona asset upload endpoint');
  assert.match(serverJs, /\/api\/personas\/assets\/upload/, 'server should expose persona asset upload endpoint');
  assert.match(serverJs, /function transcribeLocalMediaWithGemini\(/, 'server should transcribe uploaded local media via Gemini');
  assert.match(serverJs, /function writeBinaryFileAtomic\(/, 'server should centralize binary-safe writes');
  assert.match(serverJs, /synced\.entry\.clone_file = cloneRelPath/, 'persona creation should create and map a clone markdown file');
  assert.match(serverJs, /pathname\.startsWith\('\/api\/registry\/personas\/'\) && req\.method === 'DELETE'/, 'server should support clone/persona delete from the dashboard');
  assert.match(dashboardHtml, /window\.openAddAgentModal\s*=/, 'dashboard should keep add agent action available for Master workflows');
  assert.match(dashboardHtml, /window\.openAddSkillModal\s*=/, 'dashboard should keep add skill action available for Master workflows');
  assert.match(dashboardHtml, /function renderMasterCloneCardDetails\(/, 'dashboard should merge persona card details into Master clones');
  assert.match(dashboardHtml, /const personaOverview = `/, 'dashboard should show persona overview in the Master clone inspector');
  assert.match(dashboardHtml, /function masterCatalogToggleButton\(/, 'Master catalog views should use a shared project/all toggle button');
  assert.match(dashboardHtml, /catalogShowAll: window\.MASTER_CATALOG_SHOW_ALL === true/, 'Master catalog project/all mode should persist in UI state');
  assert.match(dashboardHtml, /masterCatalogToggleButton\('btn-ghost text-\[9px\] py-1\.5 px-3'\)/, 'Master clone inspector should keep the project/all toggle visible after selecting a clone');
  assert.match(dashboardHtml, /function masterCatalogDataReady\(/, 'Master catalog should wait for registry/persona assets before rendering catalog views');
  assert.match(dashboardHtml, /function renderMasterCatalogLoading\(/, 'Master catalog should show loading instead of a false empty state while data hydrates');
  assert.match(dashboardHtml, /if \(!globalSearch && !masterCatalogDataReady\(window\.MASTER_VIEW\)\)/, 'Master Hub should avoid rendering an empty catalog before data is ready');
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
  assert.match(dashboardHtml, /event\.target\.closest\('\.master-card, \.master-inspector, \.editor-modal, \.detail-drawer, \.master-squads-board-canvas, \.master-embedded-map-shell'\)/, 'Master click-away handler should not close agent config or embedded map selections');
  assert.match(dashboardHtml, /data-squad-drop-zone=/, 'dashboard squads board should expose drop zones');
  assert.match(dashboardHtml, /handleSquadDrop\(/, 'dashboard squads board should handle drop events');
  assert.match(dashboardHtml, /SQUAD_UNASSIGNED_ID/, 'dashboard squads board should expose unassigned drop zone id');
  assert.match(dashboardHtml, /Arraste aqui para remover o agente de qualquer squad\./, 'dashboard squads board should explain how to unassign agents');
  assert.match(dashboardHtml, /targetSquadId === SQUAD_UNASSIGNED_ID \? '' : targetSquadId/, 'dashboard move handler should normalize unassigned drop target');
  assert.match(dashboardHtml, /minmax\(0, 2\.35fr\) minmax\(168px, 0\.7fr\)/, 'Master squads layout should keep the available agents side panel width stable');
  assert.match(dashboardHtml, /Agentes Disponíveis/, 'Master squads layout should keep the available agents side panel visible');
  assert.match(dashboardHtml, /w-full min-w-0 max-w-full overflow-hidden/, 'available agents panel and cards should not expand the side panel width');
  const primaryNav = [...dashboardHtml.matchAll(/data-primary-nav="([^"]+)"/g)]
    .map(match => match[1])
    .filter(key => !key.includes('$'));
  assert.deepEqual(primaryNav, ['master', 'ebooks', 'site-produtos', 'financas', 'pajero-full', 'forex'], 'primary sidebar should consolidate to Master, E-books, Site/Produtos, Financas, Pajero and Forex');
  assert.match(dashboardHtml, /id="legacy-sidebar-actions"/, 'dashboard should keep hidden legacy navigation actions for compatibility');
  assert.match(dashboardHtml, /master-system-link-memory/, 'Master should keep Memory reachable after sidebar consolidation');
  assert.match(dashboardHtml, /master-open-map-btn/, 'Master Construcao should keep the visual map reachable as the n8n-style canvas candidate');
  assert.match(dashboardHtml, /master-embedded-map-shell/, 'Master Construcao should embed the visual project map directly');
  assert.match(dashboardHtml, /function renderMasterEmbeddedMap\(/, 'dashboard should render MAP_DATA inside Master Construcao');
  assert.match(dashboardHtml, /window\.MAP_DATA = MAP_DATA/, 'dashboard should expose legacy MAP_DATA for embedded Master map rendering');
  assert.match(dashboardHtml, /function selectMasterMapNode\(/, 'embedded Master map should select nodes into the Master inspector');
  assert.match(dashboardHtml, /function openMasterMapEditor\(/, 'embedded Master map should keep the legacy visual map editor reachable');
  assert.match(dashboardHtml, /MASTER_MAP_FILTERS/, 'embedded Master map should define native status filters');
  assert.match(dashboardHtml, /function setMasterMapFilter\(/, 'embedded Master map should filter nodes without leaving Master');
  assert.match(dashboardHtml, /function setMasterMapNodeStatus\(/, 'embedded Master map should support protected status changes');
  assert.match(dashboardHtml, /function saveMasterEmbeddedMap\(/, 'embedded Master map should save through the existing map endpoint');
  assert.match(dashboardHtml, /window\.MASTER_MAP_EDIT_MODE/, 'embedded Master map should keep a protected edit mode flag');
  assert.match(dashboardHtml, /function toggleMasterMapEditMode\(/, 'embedded Master map should toggle protected edit mode');
  assert.match(dashboardHtml, /function addMasterMapNode\(/, 'embedded Master map should add nodes only in edit mode');
  assert.match(dashboardHtml, /function duplicateMasterMapNode\(/, 'embedded Master map should duplicate nodes only in edit mode');
  assert.match(dashboardHtml, /function deleteMasterMapNode\(/, 'embedded Master map should delete non-pipeline nodes only in edit mode');
  assert.match(dashboardHtml, /masterMapNodeIsPipeline/, 'embedded Master map should protect pipeline nodes from quick deletion');
  assert.match(dashboardHtml, /id="master-map-edit-toggle"/, 'embedded Master map should expose an edit mode toggle');
  assert.match(dashboardHtml, /id="master-map-add-node-btn"/, 'embedded Master map should expose add-node only while editing');
  assert.match(dashboardHtml, /class="master-map-filter-row"/, 'embedded Master map should render a filter row');
  assert.match(dashboardHtml, /class="master-map-status-actions"/, 'embedded Master inspector should render status actions');
  assert.match(dashboardHtml, /class="master-map-edit-actions"/, 'embedded Master inspector should render protected edit actions');
  assert.match(dashboardHtml, /fetch\('\/api\/map\/save'/, 'embedded Master map should persist through /api/map/save');
  assert.match(dashboardHtml, /Object\.keys\(MAP_DATA \|\| \{\}\)\.forEach\(p=>\{ if\(MAP_DATA\[p\]\) s\[p\]=vmClone\(p\); \}\)/, 'legacy map save should include every MAP_DATA project');
  assert.match(dashboardHtml, /master-embedded-map-shell'\)\)/, 'Master click-away handler should preserve embedded map selections');
  assert.match(dashboardHtml, /id="btn-save-all-master"/, 'dashboard should preserve the primary Save All button');
  assert.match(dashboardHtml, /id="fs-connect-btn"/, 'dashboard should preserve the connected folder button');
  assert.match(dashboardHtml, /id="runtime-instance-badge"/, 'dashboard should show which local instance is running');
  assert.match(dashboardHtml, /async function persistSessionFlash\(flashContent\)/, 'dashboard should persist generated session flash through a shared helper');
  assert.match(dashboardHtml, /async function copySessionFlash\(\) \{\s*const flash = buildSessionFlash\(\);/, 'Flash button should copy a freshly generated context flash');
  assert.doesNotMatch(dashboardHtml, /async function copySessionFlash\(\) \{\s*let flash = '';/, 'Flash button should not prefer a stale session_flash.txt before generating current context');
  assert.match(dashboardHtml, /await persistSessionFlash\(buildSessionFlash\(\)\);/, 'Save All should persist the same freshly generated flash format');
  assert.match(dashboardHtml, /Cole este bloco no inicio da proxima conversa para retomar a sessao\./, 'session flash should use a neutral resume instruction');
  assert.match(dashboardHtml, /function runtimeShortPath\(/, 'dashboard should format the local workspace path compactly');
  assert.match(dashboardHtml, /fetch\('\/api\/runtime\/info'/, 'dashboard should fetch runtime instance metadata');
  assert.match(serverJs, /\/api\/runtime\/info/, 'server should expose runtime instance metadata');
  assert.match(serverJs, /is_antigravity_ide_workspace/, 'runtime metadata should identify the current antigravity-ide workspace');
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
  assert.match(serverJs, /Object\.prototype\.hasOwnProperty\.call\(projects, value\)/, 'server should accept project_ids declared in project_flows');
  assert.match(serverJs, /haystack\.includes\('SIZ'\)/, 'server inference should include legacy SIZ alias');
  assert.match(serverJs, /return 'financas'/, 'server inference should include Financas aliases');
  assert.match(serverJs, /normalizeProjectId\('forex'\)/, 'server inference should include Forex aliases');
  assert.match(serverJs, /normalizeProjectId\('pajero'\)/, 'server inference should include Pajero aliases');
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

function testIbkrPaperOnlyBridge() {
  const config = readJson('projects/forex/data/ibkr_integration.json');
  const tickets = readJson('projects/forex/data/ibkr_paper_tickets.json');
  const serverJs = fs.readFileSync(path.join(ROOT, 'scripts/dashboard_server.js'), 'utf8');
  const dashboardHtml = fs.readFileSync(path.join(ROOT, 'docs/aiox_dashboard.html'), 'utf8');
  const contract = fs.readFileSync(path.join(ROOT, 'projects/forex/integrations/ibkr-local-bridge-contract.md'), 'utf8');

  assert.equal(config.mode, 'paper_only', 'IBKR integration should start in paper-only mode');
  assert.equal(config.bridge.enabled, false, 'IBKR bridge must start disabled');
  assert.equal(config.safeguards.allow_live_orders, false, 'IBKR config must deny live orders');
  assert.equal(config.safeguards.credentials_storage, 'never', 'IBKR config must not store credentials');
  assert.ok(Array.isArray(tickets.items) && tickets.items.length === 0, 'paper tickets should start as an empty local list');
  assert.match(serverJs, /\/api\/ibkr\/status/, 'server should expose local IBKR status');
  assert.match(serverJs, /\/api\/ibkr\/intelligence/, 'server should expose local IBKR intelligence');
  assert.match(serverJs, /\/api\/ibkr\/paper-tickets/, 'server should expose paper-ticket endpoints');
  assert.match(serverJs, /req && req\.socket && req\.socket\.remoteAddress/, 'IBKR endpoints should require a loopback client, not only a browser origin');
  assert.doesNotMatch(serverJs, /\/api\/ibkr\/orders/, 'server must not expose an IBKR live-order endpoint');
  assert.match(dashboardHtml, /ibkr-view-intelligence/, 'dashboard should render the intelligence and paper view');
  assert.match(dashboardHtml, /Score explicável, não recomendação/, 'dashboard should describe the option score as non-recommendation');
  assert.match(dashboardHtml, /Nada será transmitido à Interactive Brokers/, 'dashboard should make the local-draft boundary explicit');
  assert.match(contract, /Não há `POST \/api\/ibkr\/orders`/, 'local bridge contract should document the absence of live orders');

  const unsafe = ibkrBridge.normalizeConfig({ bridge: { enabled: true, base_url: 'http://192.168.1.50:8765' } });
  assert.equal(unsafe.bridge.enabled, false, 'external bridge URLs must be disabled');
  assert.ok(unsafe.configuration_error, 'unsafe bridge URL should report a configuration error');
  assert.equal(ibkrBridge.normalizeLoopbackUrl('http://[::1]:8765'), 'http://[::1]:8765', 'IPv6 loopback should remain valid');
  assert.throws(() => ibkrBridge.normalizeLoopbackUrl('https://broker.example'), /loopback|HTTP/i, 'external bridge URL must be rejected');

  const candidates = ibkrBridge.rankPutCandidates([
    { right: 'P', strike: 580, expiry: '2026-08-21', bid: 8.1, ask: 8.5, underlying_price: 600, open_interest: 1000 },
    { right: 'C', strike: 620, expiry: '2026-08-21', bid: 6, ask: 7, underlying_price: 600 }
  ], { min_dte: 30, max_dte: 120, max_spread_pct: 15, max_premium_pct: 8 }, new Date('2026-06-22T00:00:00Z'));
  assert.equal(candidates.length, 1, 'only valid puts should become candidates');
  assert.equal(candidates[0].score, 100, 'a candidate inside every configured threshold should keep score 100');
  assert.ok(candidates[0].reasons.some(reason => reason.includes('spread')), 'candidate score should include an explainable spread reason');

  assert.throws(
    () => ibkrBridge.createPaperTicket({ intent: 'stock', symbol: 'SPY', quantity: 1, limit_price: 600 }, 'test', '2026-06-22T00:00:00Z'),
    /Reconheça/,
    'paper ticket must require explicit acknowledgement'
  );
  const ticket = ibkrBridge.createPaperTicket({ intent: 'protective_put', symbol: 'spy', quantity: 1, limit_price: 8.5, strike: 580, expiry: '2026-08-21', acknowledged_paper: true }, 'test', '2026-06-22T00:00:00Z');
  assert.equal(ticket.status, 'draft_local_only', 'paper ticket should remain a local draft');
  assert.equal(ticket.broker_transmission, false, 'paper ticket must never be transmitted by the server');
}

function testCloudSyncGuardrails() {
  const dashboardHtml = fs.readFileSync(path.join(ROOT, 'docs/aiox_dashboard.html'), 'utf8');
  const serverJs = fs.readFileSync(path.join(ROOT, 'scripts/dashboard_server.js'), 'utf8');

  const missingIdentity = cloudSyncGuardrails.evaluateGitSyncPreflight({ userName: '', userEmail: '', stagedFileCount: 0 });
  assert.equal(missingIdentity.ok, false, 'cloud sync must stop before staging when Git identity is absent');
  assert.equal(missingIdentity.code, 'git_identity_missing', 'missing identity should have an actionable code');

  const occupiedStage = cloudSyncGuardrails.evaluateGitSyncPreflight({ userName: 'Operador', userEmail: 'operator@example.com', stagedFileCount: 721 });
  assert.equal(occupiedStage.ok, false, 'cloud sync must not alter an existing stage');
  assert.equal(occupiedStage.code, 'git_stage_not_empty', 'existing stage should have an actionable code');

  const ready = cloudSyncGuardrails.evaluateGitSyncPreflight({ userName: 'Operador', userEmail: 'operator@example.com', stagedFileCount: 0 });
  assert.equal(ready.ok, true, 'Git sync can proceed only with identity and an empty stage');
  assert.equal(cloudSyncGuardrails.cloudSyncSucceeded('success'), true, 'success should be the only full cloud-sync state');
  assert.equal(cloudSyncGuardrails.cloudSyncSucceeded('partial'), false, 'partial cloud sync must not look fully saved');

  const preflightIndex = serverJs.indexOf('const preflight = evaluateGitSyncPreflight');
  const firstAddIndex = serverJs.indexOf("await runCommand('git', ['add'");
  assert.ok(preflightIndex >= 0, 'server should run Git preflight');
  assert.ok(firstAddIndex > preflightIndex, 'Git preflight must occur before any git add');
  assert.match(serverJs, /local_saved: true/, 'save-all response should distinguish the local checkpoint');
  assert.match(serverJs, /cloud_succeeded: cloudSyncSucceeded\(cloudResult\.status\)/, 'save-all response should expose whether cloud sync fully succeeded');
  assert.match(serverJs, /syncProjectMirror\(/, 'cloud sync should update the local D mirror after a successful cloud destination');
  assert.match(serverJs, /readProjectMirrorState\(/, 'cloud status should expose the current D mirror state after dashboard restart');
  assert.match(serverJs, /Copia D:/, 'cloud-sync state should report the D mirror result');
  assert.match(dashboardHtml, /Checkpoint salvo localmente:/, 'dashboard should explain a locally saved checkpoint when cloud sync fails');
  assert.match(dashboardHtml, /Tudo salvo e sincronizado/, 'dashboard should reserve full-success wording for full cloud success');
  assert.match(dashboardHtml, /cloud-mirror-status/, 'dashboard should expose the local D mirror status');
  assert.match(dashboardHtml, /cloud-mirror-header/, 'dashboard should show the D mirror status in the global header');
}

function testProjectMirrorConfiguration() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  assert.equal(projectMirror.DEFAULT_MIRROR_ROOT, 'D:\\Antigravity-SommersStore', 'mirror should use the requested D drive by default');
  assert.equal(projectMirror.workspacePathFor(), 'D:\\Antigravity-SommersStore\\workspace', 'mirror workspace should be isolated below the D drive root');
  assert.equal(projectMirror.isRobocopySuccess(0), true, 'robocopy exit code zero should be successful');
  assert.equal(projectMirror.isRobocopySuccess(7), true, 'robocopy informational exit codes should be successful');
  assert.equal(projectMirror.isRobocopySuccess(8), false, 'robocopy error exit codes should fail the mirror');
  assert.equal(projectMirror.readProjectMirrorState().status, 'success', 'mirror state should be readable from the configured D drive');
  assert.throws(() => projectMirror.assertSafeMirrorRoot(path.join(ROOT, 'mirror')), /não pode ficar dentro/i, 'mirror destination must not recurse into the source project');
  assert.equal(projectMirror.readCliOptions(['sync', '--trigger', 'test', '--github-status', 'success']).trigger, 'test', 'mirror CLI should parse its trigger');
  assert.equal(packageJson.scripts['sync:mirror'], 'node scripts/project_mirror_sync.js sync --trigger npm_manual', 'package should expose a manual mirror command');
  assert.equal(packageJson.scripts['deploy:hosting'], 'node scripts/deploy_hosting_with_mirror.js', 'manual Firebase deploy should run through the mirror-aware command');
  assert.ok(fs.existsSync(path.join(ROOT, '.githooks', 'post-push')), 'repository should version the post-push mirror hook template');
}

function testAioxMasterNext() {
  const nextHtml = fs.readFileSync(path.join(ROOT, 'docs/aiox_master_next.html'), 'utf8');
  const serverJs = fs.readFileSync(path.join(ROOT, 'scripts/dashboard_server.js'), 'utf8');

  assert.match(nextHtml, /AIOX Master Next/, 'AIOX Master Next page should exist');
  assert.match(nextHtml, /class="rail"/, 'AIOX Master Next should use a compact lateral rail');
  assert.match(nextHtml, /class="topbar"/, 'AIOX Master Next should use a compact topbar');
  assert.match(nextHtml, /id="viewport" class="canvas-viewport"/, 'AIOX Master Next should expose a full canvas viewport');
  assert.match(nextHtml, /id="drawer" class="drawer"/, 'AIOX Master Next should expose a node inspector drawer');
  assert.match(nextHtml, /fetch\('\/api\/aiox-master-next\/load'\)/, 'AIOX Master Next should load isolated state');
  assert.match(nextHtml, /fetch\('\/api\/aiox-master-next\/save'/, 'AIOX Master Next should save isolated state');
  assert.match(nextHtml, /fetch\('\/api\/map\/load'\)/, 'AIOX Master Next should seed from the existing map when needed');
  assert.match(nextHtml, /fetch\('\/api\/files\/upload'/, 'AIOX Master Next should support file upload on nodes');
  assert.match(nextHtml, /const NODE_TEMPLATES = \[/, 'AIOX Master Next should expose workflow templates');
  assert.match(nextHtml, /id="templateModal" class="modal"/, 'AIOX Master Next should include a template library modal');
  assert.match(nextHtml, /id="connectGuide" class="connect-guide"/, 'AIOX Master Next should include guided connection feedback');
  assert.match(nextHtml, /id="undoBtn"/, 'AIOX Master Next should expose undo control');
  assert.match(nextHtml, /id="redoBtn"/, 'AIOX Master Next should expose redo control');
  assert.match(nextHtml, /id="guidedProductModal" class="modal"/, 'AIOX Master Next should include a guided product modal');
  assert.match(nextHtml, /Produto guiado/, 'AIOX Master Next should expose guided product creation');
  assert.match(nextHtml, /function createProjectFromModal\(/, 'AIOX Master Next should create new projects');
  assert.match(nextHtml, /function guidedProductTemplate\(/, 'AIOX Master Next should create sequential guided product templates');
  assert.match(nextHtml, /function createGuidedProductFromModal\(/, 'AIOX Master Next should create a guided product from modal data');
  assert.match(nextHtml, /sequenceIndex:index \+ 1/, 'guided product nodes should be numbered sequentially');
  assert.match(nextHtml, /offerType:'order_bump'/, 'guided product should support order bump deliverables');
  assert.match(nextHtml, /function nextNodeAfter\(/, 'AIOX Master Next should find the next sequential node');
  assert.match(nextHtml, /Concluir e abrir proximo/, 'AIOX Master Next should advance to the next node after completion');
  assert.match(nextHtml, /function assignTeamForNode\(/, 'AIOX Master Next should assign agents, skills and personas through a shared helper');
  assert.match(nextHtml, /function rankedSkillsForNode\(/, 'AIOX Master Next should rank skills by node context');
  assert.match(nextHtml, /function rankedPersonasForNode\(/, 'AIOX Master Next should rank clones by node context');
  assert.match(nextHtml, /function rankedSquadsForNode\(/, 'AIOX Master Next should rank squads by node context');
  assert.match(nextHtml, /function squadOptionsForNode\(/, 'AIOX Master Next should render squad options with coverage');
  assert.match(nextHtml, /function recommendedSkillsForNode\(/, 'AIOX Master Next inspector should expose recommended skill picks');
  assert.match(nextHtml, /function recommendedPersonasForNode\(/, 'AIOX Master Next inspector should expose recommended clone picks');
  assert.match(nextHtml, /score \$\{esc\(item\.score\)\}/, 'AIOX Master Next should show recommendation score for skills');
  assert.match(nextHtml, /Cobertura do registry/, 'AIOX Master Next should summarize registry coverage for the selected squad');
  assert.match(nextHtml, /function productionQuestionsForNode\(/, 'AIOX Master Next should expose production briefing questions by node type');
  assert.match(nextHtml, /Squad executor/, 'AIOX Master Next inspector should make the executing squad visible');
  assert.match(nextHtml, /Brief necessario para eu produzir/, 'AIOX Master Next inspector should show the briefing needed for Codex production');
  assert.match(nextHtml, /skillAgents\.some\(id => agentIds\.includes\(id\)\)/, 'AIOX Master Next should use registry skill-agent links for assignment');
  assert.match(nextHtml, /function createNodeFromModal\(/, 'AIOX Master Next should create new nodes');
  assert.match(nextHtml, /function createNodeFromTemplate\(/, 'AIOX Master Next should create nodes from templates');
  assert.match(nextHtml, /function undoNext\(/, 'AIOX Master Next should support undo');
  assert.match(nextHtml, /function redoNext\(/, 'AIOX Master Next should support redo');
  assert.match(nextHtml, /function startConnectFromHandle\(/, 'AIOX Master Next should support handle-based connections');
  assert.match(nextHtml, /function handleConnectClick\(/, 'AIOX Master Next should connect nodes');
  assert.match(nextHtml, /defaultPersonasForType/, 'AIOX Master Next should use clone/persona context');
  assert.match(nextHtml, /defaultSkillsForNode/, 'AIOX Master Next should use skill context');
  assert.match(serverJs, /\/api\/aiox-master-next\/save/, 'server should expose isolated save endpoint for AIOX Master Next');
  assert.match(serverJs, /aiox_master_next_state\.json/, 'server should persist AIOX Master Next separately');

  const scripts = [...nextHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1])
    .filter(code => code.trim());
  scripts.forEach((code, index) => {
    assert.doesNotThrow(
      () => new vm.Script(code, { filename: `docs/aiox_master_next.html#inline-script-${index + 1}` }),
      `AIOX Master Next inline script ${index + 1} should parse`
    );
  });
}

function testVelasAromaticasDeliverables() {
  const manifestPath = path.join(ROOT, 'projects/velas-aromaticas/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.project_id, 'velas-aromaticas', 'Velas Aromaticas manifest should identify the project');
  assert.equal(manifest.deliverables.length, 5, 'Velas Aromaticas should expose five initial deliverables');

  const expected = [
    'projects/velas-aromaticas/deliverables/main/velas-aromaticas-master.html',
    'projects/velas-aromaticas/deliverables/free/checklist-materiais-fornecedores.html',
    'projects/velas-aromaticas/deliverables/free/mini-guia-aromas-combinacoes.html',
    'projects/velas-aromaticas/deliverables/bumps/calculadora-preco-lucro.html',
    'projects/velas-aromaticas/deliverables/bumps/pack-etiquetas-cartoes.html'
  ];
  expected.forEach(rel => {
    const html = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    assert.match(html, /<!doctype html>/i, `${rel} should be a standalone HTML deliverable`);
    assert.match(html, /Velas Aromaticas|Velas Aromáticas|THE CANDLE ATELIER/i, `${rel} should belong to the Velas Aromaticas product`);
  });

  const nextState = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/control/aiox_master_next_state.json'), 'utf8'));
  const velas = nextState.projects.find(project => project.id === 'velas-aromaticas');
  assert.ok(velas, 'AIOX Master Next state should include Velas Aromaticas');
  assert.equal(velas.nodes.length, 6, 'Velas Aromaticas should keep six sequential nodes');
  assert.equal(velas.edges.length, 5, 'Velas Aromaticas should connect nodes left-to-right');
  assert.ok(velas.nodes.every(node => Array.isArray(node.files) && node.files.length >= 1), 'every produced Velas node should have an attached artifact');
  assert.deepEqual(velas.nodes.map(node => node.sequenceIndex), [1, 2, 3, 4, 5, 6], 'Velas nodes should remain sequentially numbered');
}

function run() {
  testProjectFlows();
  testPersonaMaterials();
  testIntegrationPoints();
  testIbkrPaperOnlyBridge();
  testCloudSyncGuardrails();
  testProjectMirrorConfiguration();
  testDashboardInlineScriptsParse();
  testAioxMasterNext();
  testVelasAromaticasDeliverables();
  console.log('Tests passed: Master Hub quality checks succeeded.');
}

run();
