'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEFAULT_BUNDLE_ROOT = process.env.AIOX_MIGRATION_ROOT || 'D:\\AIOX-Migracao-PC-Novo';
const DEFAULT_RESTORE_ROOT = 'C:\\AIOX\\Workspace\\SommersStore';
const MANIFEST_FILE = 'migration-manifest.json';
const SCHEMA_VERSION = 'aiox.pc-migration.v1';

const PROJECT_PRIVATE_ROOTS = [
    'projects/financas/data',
    'projects/imposto-de-renda/data',
    'projects/financas/contracts',
    'docs/uploads',
    'docs/control/sessions',
    'docs/control/archive'
];

const CODEX_PATHS = [
    'AGENTS.md',
    'config.toml',
    'memories',
    'sessions',
    'archived_sessions',
    'session_index.jsonl',
    'skills'
];

const METATRADER_PATHS = [
    'Common/Files',
    'Common/Profiles'
];

const METATRADER_TERMINAL_PATHS = [
    'MQL4/Experts',
    'MQL4/Indicators',
    'MQL4/Include',
    'MQL4/Libraries',
    'MQL4/Files',
    'MQL4/Presets',
    'MQL4/Profiles',
    'MQL4/Scripts',
    'MQL5/Experts',
    'MQL5/Indicators',
    'MQL5/Include',
    'MQL5/Libraries',
    'MQL5/Files',
    'MQL5/Presets',
    'MQL5/Profiles',
    'MQL5/Scripts'
];

const NINJATRADER_PATHS = [
    'bin/Custom',
    'templates',
    'workspaces',
    'sounds'
];

const JFOREX_PATHS = [
    'Strategies',
    'Templates',
    'Workspaces'
];

const SKIP_DIRECTORY_NAMES = new Set([
    '.git',
    '.next',
    '.sandbox',
    '.sandbox-bin',
    '.system',
    '.firebase',
    'build',
    'cache',
    'cache2',
    'coverage',
    'dist',
    'logs',
    'node_modules',
    'obj',
    'out',
    'out_deploy',
    'target',
    'tmp'
]);

const BLOCKED_FILE_NAMES = new Set([
    'auth.json',
    '.credentials.json'
]);

const BLOCKED_FILE_PATTERNS = [
    /^state.*\.sqlite(?:-.*)?$/i,
    /\.log$/i,
    /\.tmp$/i
];

function normalizeText(value) {
    return String(value || '').trim();
}

function portablePath(value) {
    return String(value || '').split(path.sep).join('/');
}

function isInsidePath(candidate, parent) {
    const relative = path.relative(path.resolve(parent), path.resolve(candidate));
    return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function assertSafeExternalRoot(candidate, label = 'destino') {
    const resolved = path.resolve(normalizeText(candidate));
    if (!normalizeText(candidate)) throw new Error(`${label} nao informado.`);
    if (resolved === path.parse(resolved).root) throw new Error(`${label} nao pode ser a raiz de um disco.`);
    if (isInsidePath(resolved, ROOT_DIR)) throw new Error(`${label} nao pode ficar dentro do projeto de origem.`);
    return resolved;
}

function resolveInside(base, relative) {
    const resolvedBase = path.resolve(base);
    const candidate = path.resolve(resolvedBase, String(relative || ''));
    if (!isInsidePath(candidate, resolvedBase)) {
        throw new Error(`Caminho fora da raiz autorizada: ${relative}`);
    }
    return candidate;
}

function shouldSkipFile(fileName) {
    const normalized = String(fileName || '').toLowerCase();
    return BLOCKED_FILE_NAMES.has(normalized) || BLOCKED_FILE_PATTERNS.some(pattern => pattern.test(fileName));
}

function shouldSkipDirectory(directoryName) {
    return SKIP_DIRECTORY_NAMES.has(String(directoryName || '').toLowerCase());
}

function isPrivateWorkspacePath(relativePath) {
    const portable = portablePath(relativePath).replace(/^\.\//, '').toLowerCase();
    const inPrivateRoot = PROJECT_PRIVATE_ROOTS.some(root => {
        const normalizedRoot = portablePath(root).toLowerCase();
        return portable === normalizedRoot || portable.startsWith(`${normalizedRoot}/`);
    });
    if (inPrivateRoot) return true;
    const fileName = portable.split('/').pop();
    return /^\.env(?:\..+)?$/i.test(fileName)
        && !/^\.env\.(?:example|sample|template)$/i.test(fileName);
}

function findGitExecutable() {
    const candidates = [
        process.env.AIOX_GIT_PATH,
        'git',
        'C:\\Program Files\\Git\\cmd\\git.exe',
        'C:\\Program Files\\Git\\bin\\git.exe'
    ].filter(Boolean);
    for (const candidate of candidates) {
        try {
            execFileSync(candidate, ['--version'], { stdio: 'ignore', windowsHide: true });
            return candidate;
        } catch (_) {
            // Try the next known Git location.
        }
    }
    throw new Error('Git nao foi localizado. Instale o Git ou defina AIOX_GIT_PATH.');
}

function gitOutput(args) {
    return execFileSync(findGitExecutable(), args, {
        cwd: ROOT_DIR,
        encoding: 'utf8',
        windowsHide: true,
        maxBuffer: 64 * 1024 * 1024
    });
}

function gitSnapshot() {
    const safe = args => {
        try { return normalizeText(gitOutput(args)); } catch (_) { return null; }
    };
    return {
        head: safe(['rev-parse', 'HEAD']),
        branch: safe(['branch', '--show-current']),
        origin: safe(['remote', 'get-url', 'origin'])
    };
}

function changedWorkspaceFiles() {
    const output = gitOutput(['ls-files', '--modified', '--others', '--exclude-standard', '-z']);
    return output.split('\0').filter(Boolean).map(relative => ({
        source: resolveInside(ROOT_DIR, relative),
        relative: portablePath(relative)
    })).filter(item => fs.existsSync(item.source) && fs.statSync(item.source).isFile());
}

function walkFiles(root, options = {}) {
    if (!fs.existsSync(root)) return [];
    const stat = fs.statSync(root);
    if (stat.isFile()) return shouldSkipFile(path.basename(root)) ? [] : [root];
    const files = [];
    const stack = [root];
    while (stack.length) {
        const current = stack.pop();
        for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
            if (entry.isSymbolicLink()) continue;
            const fullPath = path.join(current, entry.name);
            if (entry.isDirectory()) {
                if (!shouldSkipDirectory(entry.name) || options.keepSkippedDirectories === true) stack.push(fullPath);
            } else if (entry.isFile() && !shouldSkipFile(entry.name)) {
                files.push(fullPath);
            }
        }
    }
    return files;
}

function findProjectEnvironmentFiles() {
    const result = [];
    const stack = [ROOT_DIR];
    while (stack.length) {
        const current = stack.pop();
        for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
            if (entry.isSymbolicLink()) continue;
            const fullPath = path.join(current, entry.name);
            if (entry.isDirectory()) {
                if (!shouldSkipDirectory(entry.name)) stack.push(fullPath);
            } else if (entry.isFile() && /^\.env(?:\..+)?$/i.test(entry.name)) {
                result.push(fullPath);
            }
        }
    }
    return result;
}

function addTree(selection, sourceRoot, selectedPath, scope, relativePrefix = '') {
    const absolute = path.resolve(sourceRoot, selectedPath);
    if (!fs.existsSync(absolute)) return;
    const stat = fs.statSync(absolute);
    const files = stat.isFile() ? [absolute] : walkFiles(absolute);
    for (const source of files) {
        const relativeWithin = stat.isFile() ? path.basename(source) : path.relative(absolute, source);
        const relative = portablePath(stat.isFile()
            ? path.join(relativePrefix, selectedPath)
            : path.join(relativePrefix, selectedPath, relativeWithin));
        selection.push({ source, scope, relative });
    }
}

function collectSelection(environment = process.env) {
    const selection = [];

    for (const item of changedWorkspaceFiles()) {
        selection.push({ source: item.source, scope: 'workspace', relative: item.relative });
    }
    for (const relative of PROJECT_PRIVATE_ROOTS) addTree(selection, ROOT_DIR, relative, 'workspace');
    for (const source of findProjectEnvironmentFiles()) {
        selection.push({ source, scope: 'workspace', relative: portablePath(path.relative(ROOT_DIR, source)) });
    }

    const userProfile = environment.USERPROFILE || os.homedir();
    const codexRoot = path.join(userProfile, '.codex');
    for (const relative of CODEX_PATHS) addTree(selection, codexRoot, relative, 'codex');

    const appData = environment.APPDATA || path.join(userProfile, 'AppData', 'Roaming');
    const metaTraderRoot = path.join(appData, 'MetaQuotes', 'Terminal');
    for (const relative of METATRADER_PATHS) addTree(selection, metaTraderRoot, relative, 'metatrader');
    if (fs.existsSync(metaTraderRoot)) {
        for (const entry of fs.readdirSync(metaTraderRoot, { withFileTypes: true })) {
            if (!entry.isDirectory() || entry.name.toLowerCase() === 'common') continue;
            for (const relative of METATRADER_TERMINAL_PATHS) {
                addTree(selection, metaTraderRoot, path.join(entry.name, relative), 'metatrader');
            }
        }
    }

    const ninjaRoot = path.join(userProfile, 'Documents', 'NinjaTrader 8');
    for (const relative of NINJATRADER_PATHS) addTree(selection, ninjaRoot, relative, 'ninjatrader8');

    const jForexRoot = path.join(userProfile, 'JForex4');
    for (const relative of JFOREX_PATHS) addTree(selection, jForexRoot, relative, 'jforex4');

    const unique = new Map();
    for (const item of selection) {
        const key = `${item.scope}|${item.relative.toLowerCase()}`;
        if (!unique.has(key)) unique.set(key, item);
    }
    return Array.from(unique.values()).sort((a, b) => `${a.scope}/${a.relative}`.localeCompare(`${b.scope}/${b.relative}`));
}

function hashFile(filePath) {
    const hash = crypto.createHash('sha256');
    const descriptor = fs.openSync(filePath, 'r');
    const buffer = Buffer.allocUnsafe(1024 * 1024);
    try {
        let bytesRead;
        do {
            bytesRead = fs.readSync(descriptor, buffer, 0, buffer.length, null);
            if (bytesRead > 0) hash.update(buffer.subarray(0, bytesRead));
        } while (bytesRead > 0);
    } finally {
        fs.closeSync(descriptor);
    }
    return hash.digest('hex');
}

function selectionSummary(selection) {
    const scopes = {};
    let totalBytes = 0;
    for (const item of selection) {
        const bytes = fs.statSync(item.source).size;
        totalBytes += bytes;
        if (!scopes[item.scope]) scopes[item.scope] = { files: 0, bytes: 0 };
        scopes[item.scope].files += 1;
        scopes[item.scope].bytes += bytes;
    }
    return { files: selection.length, bytes: totalBytes, scopes };
}

function timestampId(date = new Date()) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function prepareBundle(options = {}) {
    const bundleRoot = assertSafeExternalRoot(options.bundleRoot || DEFAULT_BUNDLE_ROOT, 'Raiz do pacote');
    const bundleId = normalizeText(options.bundleId) || `SommersStore-PC-Novo-${timestampId()}`;
    const bundleDir = resolveInside(bundleRoot, bundleId);
    if (fs.existsSync(bundleDir)) throw new Error(`O pacote ja existe: ${bundleDir}`);

    const selection = collectSelection(options.environment || process.env);
    fs.mkdirSync(bundleDir, { recursive: true });
    const entries = [];
    for (const item of selection) {
        const relativeInBundle = portablePath(path.join('data', item.scope, item.relative));
        const destination = resolveInside(bundleDir, relativeInBundle);
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.copyFileSync(item.source, destination, fs.constants.COPYFILE_EXCL);
        const stat = fs.statSync(destination);
        entries.push({
            scope: item.scope,
            relative_path: item.relative,
            bundle_path: relativeInBundle,
            bytes: stat.size,
            sha256: hashFile(destination)
        });
    }

    const manifest = {
        schema: SCHEMA_VERSION,
        created_at: new Date().toISOString(),
        source_computer: os.hostname(),
        source_project: ROOT_DIR,
        git: gitSnapshot(),
        security: {
            encrypted: false,
            blocked_files: Array.from(BLOCKED_FILE_NAMES),
            note: 'Esta pasta de preparacao fica somente no disco local. Envie ao Google Drive apenas o arquivo .7z criptografado.'
        },
        restore_defaults: {
            workspace: DEFAULT_RESTORE_ROOT,
            policy: 'copy_missing_and_report_conflicts'
        },
        summary: selectionSummary(selection),
        entries
    };
    fs.writeFileSync(path.join(bundleDir, MANIFEST_FILE), `${JSON.stringify(manifest, null, 2)}\n`, { flag: 'wx' });
    fs.writeFileSync(path.join(bundleDir, 'LEIA-ME-PC-NOVO.txt'), [
        'Pacote seletivo SommersStore para o PC novo.',
        '',
        '1. No PC novo, clone o GitHub em C:\\AIOX\\Workspace\\SommersStore.',
        '2. Extraia o arquivo 7z protegido fora da pasta do projeto.',
        '3. Execute: node scripts\\pc_migration_bundle.js verify --bundle-dir <pasta-extraida>',
        '4. Simule: node scripts\\pc_migration_bundle.js restore --bundle-dir <pasta-extraida>',
        '5. Aplique: node scripts\\pc_migration_bundle.js restore --bundle-dir <pasta-extraida> --apply',
        '6. Conflitos nao sao sobrescritos. Consulte migration-restore-report.json.',
        '7. Refaca os logins do Codex, Google, GitHub e corretoras; auth.json nao foi transferido.'
    ].join('\r\n'), { flag: 'wx' });

    return { bundle_dir: bundleDir, manifest: path.join(bundleDir, MANIFEST_FILE), ...manifest.summary };
}

function loadManifest(bundleDir) {
    const safeBundle = assertSafeExternalRoot(bundleDir, 'Pasta do pacote');
    const manifestPath = resolveInside(safeBundle, MANIFEST_FILE);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.schema !== SCHEMA_VERSION || !Array.isArray(manifest.entries)) {
        throw new Error('Manifesto de migracao invalido ou incompativel.');
    }
    return { bundleDir: safeBundle, manifest, manifestPath };
}

function verifyBundle(bundleDir) {
    const loaded = loadManifest(bundleDir);
    const failures = [];
    for (const entry of loaded.manifest.entries) {
        const source = resolveInside(loaded.bundleDir, entry.bundle_path);
        if (!fs.existsSync(source)) {
            failures.push({ path: entry.bundle_path, issue: 'missing' });
            continue;
        }
        const stat = fs.statSync(source);
        const actualHash = hashFile(source);
        if (stat.size !== entry.bytes || actualHash !== entry.sha256) {
            failures.push({ path: entry.bundle_path, issue: 'hash_or_size_mismatch' });
        }
    }
    return { ok: failures.length === 0, checked: loaded.manifest.entries.length, failures };
}

function restoreRoots(options = {}, environment = process.env) {
    const userProfile = environment.USERPROFILE || os.homedir();
    return {
        workspace: path.resolve(options.restoreRoot || DEFAULT_RESTORE_ROOT),
        codex: path.join(userProfile, '.codex'),
        metatrader: path.join(environment.APPDATA || path.join(userProfile, 'AppData', 'Roaming'), 'MetaQuotes', 'Terminal'),
        ninjatrader8: path.join(userProfile, 'Documents', 'NinjaTrader 8'),
        jforex4: path.join(userProfile, 'JForex4')
    };
}

function restoreBundle(options = {}) {
    const loaded = loadManifest(options.bundleDir);
    const verification = verifyBundle(loaded.bundleDir);
    if (!verification.ok) throw new Error(`Falha na verificacao do pacote: ${verification.failures.length} arquivo(s).`);
    const roots = restoreRoots(options, options.environment || process.env);
    if (roots.workspace === path.parse(roots.workspace).root) throw new Error('Destino do workspace nao pode ser a raiz de um disco.');

    const report = {
        schema: 'aiox.pc-migration.restore.v1',
        created_at: new Date().toISOString(),
        mode: options.apply ? 'apply' : 'dry_run',
        policy: {
            replace_workspace_conflicts: options.replaceWorkspaceConflicts === true,
            replace_private_workspace_conflicts: options.replacePrivateWorkspaceConflicts === true
        },
        roots,
        copied: [],
        existing_same: [],
        replaced: [],
        conflicts: [],
        errors: []
    };

    for (const entry of loaded.manifest.entries) {
        const destinationRoot = roots[entry.scope];
        if (!destinationRoot) {
            report.errors.push({ path: entry.relative_path, issue: `unknown_scope:${entry.scope}` });
            continue;
        }
        const source = resolveInside(loaded.bundleDir, entry.bundle_path);
        const destination = resolveInside(destinationRoot, entry.relative_path);
        if (fs.existsSync(destination)) {
            const actualHash = fs.statSync(destination).isFile() ? hashFile(destination) : null;
            if (actualHash === entry.sha256) report.existing_same.push({ scope: entry.scope, path: entry.relative_path });
            else if (options.apply && entry.scope === 'workspace' && (
                options.replaceWorkspaceConflicts
                || (options.replacePrivateWorkspaceConflicts && isPrivateWorkspacePath(entry.relative_path))
            )) {
                fs.copyFileSync(source, destination);
                report.replaced.push({ scope: entry.scope, path: entry.relative_path });
            } else report.conflicts.push({ scope: entry.scope, path: entry.relative_path });
            continue;
        }
        if (options.apply) {
            fs.mkdirSync(path.dirname(destination), { recursive: true });
            fs.copyFileSync(source, destination, fs.constants.COPYFILE_EXCL);
        }
        report.copied.push({ scope: entry.scope, path: entry.relative_path });
    }

    const reportPath = path.join(loaded.bundleDir, 'migration-restore-report.json');
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
    return { ...report, report_path: reportPath };
}

function find7Zip() {
    const candidates = [
        process.env.AIOX_7ZIP_PATH,
        'C:\\Program Files\\7-Zip\\7z.exe',
        'C:\\Program Files (x86)\\7-Zip\\7z.exe',
        '7z'
    ].filter(Boolean);
    for (const candidate of candidates) {
        try {
            const result = spawnSync(candidate, ['i'], { stdio: 'ignore', windowsHide: true });
            if (!result.error) return candidate;
        } catch (_) {
            // Try the next candidate.
        }
    }
    return null;
}

function archiveBundle(bundleDir) {
    const loaded = loadManifest(bundleDir);
    const verification = verifyBundle(loaded.bundleDir);
    if (!verification.ok) throw new Error('O pacote nao pode ser criptografado porque a verificacao falhou.');
    const sevenZip = find7Zip();
    if (!sevenZip) throw new Error('7-Zip nao localizado. Instale-o antes de criar o arquivo criptografado.');
    const archivePath = `${loaded.bundleDir}.7z`;
    if (fs.existsSync(archivePath)) throw new Error(`O arquivo ja existe: ${archivePath}`);
    process.stdout.write('Defina uma senha forte quando o 7-Zip solicitar. A senha nao sera gravada pelo script.\n');
    const result = spawnSync(sevenZip, ['a', '-t7z', '-mhe=on', '-mx=7', '-p', archivePath, '.'], {
        cwd: loaded.bundleDir,
        stdio: 'inherit',
        windowsHide: false
    });
    if (result.error || result.status !== 0) throw new Error(`7-Zip terminou com codigo ${result.status}.`);
    const receiptPath = `${archivePath}.sha256.txt`;
    fs.writeFileSync(receiptPath, `${hashFile(archivePath)}  ${path.basename(archivePath)}\n`, { flag: 'wx' });
    return { archive: archivePath, receipt: receiptPath, bytes: fs.statSync(archivePath).size };
}

function createTransportVolumes(options = {}) {
    const loaded = loadManifest(options.bundleDir);
    const archivePath = `${loaded.bundleDir}.7z`;
    if (!fs.existsSync(archivePath)) throw new Error(`Arquivo criptografado nao localizado: ${archivePath}`);
    const sevenZip = find7Zip();
    if (!sevenZip) throw new Error('7-Zip nao localizado.');
    const volumeSize = normalizeText(options.volumeSize) || '90m';
    if (!/^\d{1,2}m$/i.test(volumeSize) || Number.parseInt(volumeSize, 10) > 90) {
        throw new Error('O volume deve ser informado entre 1m e 90m para respeitar o limite do conector do Google Drive.');
    }
    const transportBase = `${loaded.bundleDir}-gdrive.7z`;
    const existing = fs.readdirSync(path.dirname(transportBase)).some(name => name.startsWith(`${path.basename(transportBase)}.`));
    if (existing) throw new Error(`Ja existem volumes para ${transportBase}.`);
    const result = spawnSync(sevenZip, ['a', '-t7z', '-mx=0', `-v${volumeSize}`, transportBase, archivePath], {
        cwd: path.dirname(archivePath),
        stdio: 'inherit',
        windowsHide: true
    });
    if (result.error || result.status !== 0) throw new Error(`7-Zip terminou com codigo ${result.status}.`);
    const prefix = `${path.basename(transportBase)}.`;
    const volumes = fs.readdirSync(path.dirname(transportBase))
        .filter(name => name.startsWith(prefix))
        .sort()
        .map(name => {
            const filePath = path.join(path.dirname(transportBase), name);
            return { file: name, bytes: fs.statSync(filePath).size, sha256: hashFile(filePath) };
        });
    const receiptPath = `${loaded.bundleDir}-gdrive.parts.sha256.txt`;
    const lines = volumes.map(volume => `${volume.sha256}  ${volume.file}`);
    lines.push(`${hashFile(archivePath)}  ${path.basename(archivePath)}`);
    fs.writeFileSync(receiptPath, `${lines.join('\n')}\n`, { flag: 'wx' });
    return { volumes, receipt: receiptPath, encrypted_archive: archivePath };
}

function verifyTransportReceipt(receiptPath) {
    const resolvedReceipt = path.resolve(normalizeText(receiptPath));
    if (!normalizeText(receiptPath) || !fs.existsSync(resolvedReceipt)) throw new Error('Arquivo de hashes do transporte nao localizado.');
    const directory = path.dirname(resolvedReceipt);
    const rows = fs.readFileSync(resolvedReceipt, 'utf8').split(/\r?\n/).filter(Boolean).map(line => {
        const match = line.match(/^([a-f0-9]{64})\s{2}(.+)$/i);
        if (!match) throw new Error(`Linha invalida no arquivo de hashes: ${line}`);
        return { sha256: match[1].toLowerCase(), file: match[2] };
    });
    const volumeRows = rows.filter(row => /-gdrive\.7z\.\d+$/i.test(row.file));
    if (!volumeRows.length) throw new Error('O arquivo de hashes nao contem volumes do Google Drive.');
    const failures = [];
    for (const row of volumeRows) {
        const filePath = resolveInside(directory, row.file);
        if (!fs.existsSync(filePath)) failures.push({ file: row.file, issue: 'missing' });
        else if (hashFile(filePath) !== row.sha256) failures.push({ file: row.file, issue: 'sha256_mismatch' });
    }
    return { ok: failures.length === 0, checked: volumeRows.length, failures };
}

function readCliOptions(argv) {
    const args = Array.from(argv || []);
    const options = {
        command: args.shift() || 'plan',
        apply: false,
        replaceWorkspaceConflicts: false,
        replacePrivateWorkspaceConflicts: false
    };
    for (let index = 0; index < args.length; index += 1) {
        const key = args[index];
        if (key === '--apply') {
            options.apply = true;
            continue;
        }
        if (key === '--replace-workspace-conflicts') {
            options.replaceWorkspaceConflicts = true;
            continue;
        }
        if (key === '--replace-private-workspace-conflicts') {
            options.replacePrivateWorkspaceConflicts = true;
            continue;
        }
        const value = args[index + 1];
        if (key === '--bundle-root') options.bundleRoot = value;
        else if (key === '--bundle-id') options.bundleId = value;
        else if (key === '--bundle-dir') options.bundleDir = value;
        else if (key === '--restore-root') options.restoreRoot = value;
        else if (key === '--volume-size') options.volumeSize = value;
        else if (key === '--receipt') options.receipt = value;
        else throw new Error(`Opcao desconhecida: ${key}`);
        index += 1;
    }
    return options;
}

async function main() {
    const options = readCliOptions(process.argv.slice(2));
    let result;
    if (options.command === 'plan') result = { selection: selectionSummary(collectSelection()), destination: assertSafeExternalRoot(options.bundleRoot || DEFAULT_BUNDLE_ROOT, 'Raiz do pacote') };
    else if (options.command === 'prepare') result = prepareBundle(options);
    else if (options.command === 'verify') result = verifyBundle(options.bundleDir);
    else if (options.command === 'restore') result = restoreBundle(options);
    else if (options.command === 'archive') result = archiveBundle(options.bundleDir);
    else if (options.command === 'transport') result = createTransportVolumes(options);
    else if (options.command === 'verify-transport') result = verifyTransportReceipt(options.receipt);
    else throw new Error(`Comando desconhecido: ${options.command}. Use plan, prepare, verify, archive, transport, verify-transport ou restore.`);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    if (result.ok === false) process.exitCode = 1;
}

if (require.main === module) {
    main().catch(error => {
        process.stderr.write(`${error.message}\n`);
        process.exitCode = 1;
    });
}

module.exports = {
    BLOCKED_FILE_NAMES,
    DEFAULT_BUNDLE_ROOT,
    DEFAULT_RESTORE_ROOT,
    ROOT_DIR,
    SCHEMA_VERSION,
    archiveBundle,
    assertSafeExternalRoot,
    collectSelection,
    createTransportVolumes,
    hashFile,
    isPrivateWorkspacePath,
    isInsidePath,
    prepareBundle,
    readCliOptions,
    resolveInside,
    restoreBundle,
    selectionSummary,
    shouldSkipDirectory,
    shouldSkipFile,
    verifyTransportReceipt,
    verifyBundle
};
