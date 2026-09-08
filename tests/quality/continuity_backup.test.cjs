'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const continuity = require('../../scripts/aiox_continuity.js');

function createFixture(root) {
  const profile = path.join(root, 'profile');
  const appData = path.join(profile, 'AppData', 'Roaming');
  const localAppData = path.join(profile, 'AppData', 'Local');
  const sommers = path.join(root, 'workspace', 'SommersStore');
  const protheus = path.join(root, 'workspace', 'Protheus');
  const codex = path.join(profile, '.codex');
  const antigravity = path.join(profile, '.gemini', 'antigravity-ide');
  const antigravityUser = path.join(appData, 'Antigravity', 'User');
  const localRepository = path.join(root, 'continuity', 'local-repository');
  const cloudRepository = path.join(root, 'drive', 'Restic-AIOX');
  const reports = path.join(root, 'drive', 'reports');
  const recoveryKit = path.join(root, 'drive', 'kit');

  const files = {
    [path.join(sommers, 'README.md')]: 'sommers sentinel',
    [path.join(protheus, 'README.md')]: 'protheus sentinel',
    [path.join(protheus, 'platforms', 'mt5', 'expert.mq5')]: 'authorial project source',
    [path.join(codex, 'sessions', 'session.jsonl')]: '{"session":"portable"}',
    [path.join(codex, 'session_index.jsonl')]: '{"id":"portable"}',
    [path.join(codex, 'auth.json')]: '{"token":"must-not-be-selected"}',
    [path.join(antigravity, 'conversations', 'conversation.json')]: '{"conversation":true}',
    [path.join(antigravityUser, 'settings.json')]: '{"theme":"dark"}'
  };
  for (const [filePath, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
  }
  fs.mkdirSync(path.dirname(cloudRepository), { recursive: true });

  const environment = {
    ...process.env,
    USERPROFILE: profile,
    APPDATA: appData,
    LOCALAPPDATA: localAppData,
    AIOX_CONTINUITY_STATE_DIR: path.join(root, 'continuity', 'state'),
    AIOX_CONTINUITY_TEST_PASSWORD: 'test-only-password-with-32-characters',
    COMPUTERNAME: 'AIOX-TEST-PRIMARY'
  };
  const config = {
    schema_version: continuity.SCHEMA_VERSION,
    rpo_minutes: 120,
    repository: {
      local_candidates: [localRepository],
      cloud_candidates: [cloudRepository],
      reports_candidates: [reports],
      recovery_kit_candidates: [recoveryKit]
    },
    retention: { keep_hourly: 24, keep_daily: 14, keep_weekly: 8, keep_monthly: 12 },
    sources: [
      { id: 'sommersstore', required: true, candidates: [sommers] },
      { id: 'protheus', required: true, candidates: [protheus] },
      { id: 'codex_portable', required: true, candidates: [codex], includes: ['sessions', 'session_index.jsonl'] },
      { id: 'antigravity_context', required: true, candidates: [antigravity], includes: ['conversations'] },
      { id: 'antigravity_user', required: false, candidates: [antigravityUser], includes: ['settings.json'] }
    ],
    blocked_operational_roots: [
      path.join(appData, 'MetaQuotes', 'Terminal'),
      path.join(profile, 'Documents', 'NinjaTrader 8'),
      path.join(profile, 'JForex4')
    ],
    recovery_kit_files: []
  };
  return {
    config,
    environment,
    paths: {
      local: localRepository,
      cloud: cloudRepository,
      cloud_remote: null,
      active_cloud: cloudRepository,
      require_remote_api: false,
      reports,
      recovery_kit: recoveryKit
    },
    protheus
  };
}

function testPureGuardrails() {
  assert.equal(continuity.pathIsOperationalPlatform('C:\\Users\\A\\AppData\\Roaming\\MetaQuotes\\Terminal\\ABC'), true);
  assert.equal(continuity.pathIsOperationalPlatform('C:\\Users\\A\\Documents\\NinjaTrader 8\\workspaces'), true);
  assert.equal(continuity.pathIsOperationalPlatform('C:\\Users\\A\\JForex4\\Workspaces'), true);
  assert.equal(continuity.pathIsOperationalPlatform('C:\\AIOX\\Workspace\\Protheus\\platforms\\mt5'), false, 'authorial source inside Protheus is not an installed platform root');
  assert.equal(continuity.shouldExcludeCriticalPath('C:\\Users\\A\\.codex\\auth.json'), true);
  assert.equal(continuity.shouldExcludeCriticalPath('C:\\Users\\A\\.codex\\state_5.sqlite-wal'), true);
  assert.deepEqual(continuity.retentionArgs({ keep_hourly: 24, keep_daily: 14, keep_weekly: 8, keep_monthly: 12 }), [
    '--keep-hourly', '24', '--keep-daily', '14', '--keep-weekly', '8', '--keep-monthly', '12'
  ]);
  assert.equal(continuity.isRobocopySuccess(7), true);
  assert.equal(continuity.isRobocopySuccess(8), false);
  assert.equal(continuity.parseCli(['backup', '--handoff-source', '--trigger', 'test']).handoffSource, true);
  assert.throws(() => continuity.assertSafeRestoreTarget('C:\\AIOX\\Workspace', 'C:\\AIOX\\RestoreTest'), /subpasta/i);
}

function testResolutionAndSingleWriter() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aiox-continuity-unit-'));
  try {
    const fixture = createFixture(root);
    const resolved = continuity.resolveSources(fixture.config, fixture.environment, { projectRoot: path.join(root, 'project') });
    assert.deepEqual(resolved.missing_required, []);
    assert.ok(resolved.sources.some((source) => source.id === 'protheus'));
    assert.ok(resolved.source_paths.includes(fixture.protheus));
    assert.ok(!resolved.source_paths.some((sourcePath) => path.basename(sourcePath).toLowerCase() === 'auth.json'));

    const firstClaim = continuity.claimPrimary({ config: fixture.config, environment: fixture.environment, paths: fixture.paths });
    assert.equal(firstClaim.ok, true);
    const otherEnvironment = { ...fixture.environment, AIOX_CONTINUITY_STATE_DIR: path.join(root, 'other-state'), COMPUTERNAME: 'AIOX-OTHER' };
    const secondClaim = continuity.claimPrimary({ config: fixture.config, environment: otherEnvironment, paths: fixture.paths });
    assert.equal(secondClaim.ok, false, 'a second machine must not silently replace the primary writer');

    fs.rmSync(fixture.protheus, { recursive: true, force: true });
    const missing = continuity.resolveSources(fixture.config, fixture.environment, { projectRoot: path.join(root, 'project') });
    assert.ok(missing.missing_required.some((item) => item.id === 'protheus'), 'missing Protheus must block a regular backup');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function testResticRoundTripWhenAvailable() {
  const resticPath = continuity.findRestic(process.env);
  if (!resticPath || process.platform !== 'win32') return;
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aiox-continuity-restic-'));
  try {
    const fixture = createFixture(root);
    const claim = continuity.claimPrimary({ config: fixture.config, environment: fixture.environment, paths: fixture.paths });
    assert.equal(claim.ok, true);
    const report = continuity.backup({
      config: fixture.config,
      environment: fixture.environment,
      paths: fixture.paths,
      resticPath,
      password: fixture.environment.AIOX_CONTINUITY_TEST_PASSWORD,
      trigger: 'integration-test'
    });
    assert.equal(report.status, 'success', report.error || 'continuity backup should succeed');
    assert.equal(report.snapshot.id, report.cloud_validation.snapshot_id);

    const restoreRoot = path.join(root, 'restore-tests');
    const restored = continuity.restore({
      config: fixture.config,
      environment: fixture.environment,
      paths: fixture.paths,
      resticPath,
      password: fixture.environment.AIOX_CONTINUITY_TEST_PASSWORD,
      restoreRoot,
      target: path.join(restoreRoot, 'round-trip'),
      snapshot: report.snapshot.id,
      apply: true
    });
    assert.equal(restored.ok, true, JSON.stringify(restored.validation));
    assert.ok(restored.validation.checked >= 4, 'restore should verify representative files from mandatory sources');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function runContinuityTests() {
  testPureGuardrails();
  testResolutionAndSingleWriter();
  testResticRoundTripWhenAvailable();
}

module.exports = { runContinuityTests };
