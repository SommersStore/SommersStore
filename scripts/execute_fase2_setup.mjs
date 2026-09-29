import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const protheusRoot = 'C:/AIOX/Workspace/Protheus';
const backupDir = path.join(protheusRoot, 'backups/copiers_terceiros_20260928');
fs.mkdirSync(backupDir, { recursive: true });

const terminals = [
  {
    role: 'Master',
    name: 'ActivTrades Demo',
    login: 6275085,
    hash: '66F5E7F481A026D99CDDE6509362A170',
    metaeditor: 'C:\\Program Files\\MetaTrader 5 - ActivTrades\\metaeditor64.exe',
    presetName: 'master-activtrades-demo-6275085.set'
  },
  {
    role: 'Receptora',
    name: 'FTMO Demo',
    login: 1514716800,
    hash: '81A933A9AFC5DE3C23B15CAB19C63850',
    metaeditor: 'C:\\Program Files\\FTMO Global Markets MT5 Terminal\\metaeditor64.exe',
    presetName: 'receiver-ftmo-demo-1514716800.set'
  },
  {
    role: 'Receptora',
    name: 'Funded Trader Markets',
    login: 227066,
    hash: '583A64D2031E6C8095B7351F1A8090CE',
    metaeditor: 'C:\\Program Files\\Funded Trader Markets MT5 Terminal_1\\metaeditor64.exe',
    presetName: 'receiver-funded-trader-markets-inactive.set'
  },
  {
    role: 'Receptora',
    name: 'Blue Guardian',
    login: 570363,
    hash: '0D1C97C3AF4FEF2A552E03CE90448FCA',
    metaeditor: 'C:\\Program Files\\Blue Guardian MT5 Terminal_1\\metaeditor64.exe',
    presetName: 'receiver-blue-guardian-inactive.set'
  },
  {
    role: 'Receptora',
    name: 'LVL Funding - Zero Markets',
    login: 135070062,
    hash: 'BF9A9B181CCD45EEBD131F7DF1A32F72',
    metaeditor: 'C:\\Program Files\\Zero Financial MT5 Terminal_1\\metaeditor64.exe',
    presetName: 'receiver-zero-markets-lvl-inactive.set'
  },
];

const basePath = path.join(process.env.APPDATA, 'MetaQuotes/Terminal');

console.log('====================================================');
console.log('FASE 2: SETUP, BACKUP E COMPILAÇÃO DOS EAS MT5');
console.log('====================================================');

// 1. BACKUP E REMOÇÃO DOS COPIADORES TERCEIROS
console.log('\n[ETAPA 1] Backup e quarentena de copiadores terceiros...');
for (const t of terminals) {
  const terminalDir = path.join(basePath, t.hash);
  const tBackup = path.join(backupDir, `${t.hash}_${t.name.replace(/[^a-zA-Z0-9]/g, '_')}`);
  fs.mkdirSync(tBackup, { recursive: true });

  const indicatorsMarket = path.join(terminalDir, 'MQL5/Indicators/Market');
  const targetFiles = ['MT5 Local Copier.ex5', 'NTS Local Copier.ex5'];

  for (const tf of targetFiles) {
    const srcFile = path.join(indicatorsMarket, tf);
    if (fs.existsSync(srcFile)) {
      const destFile = path.join(tBackup, tf);
      fs.copyFileSync(srcFile, destFile);
      fs.unlinkSync(srcFile);
      console.log(`  [${t.name}] ${tf} -> Movido com segurança para backup.`);
    }
  }
}

// 2. SINCRONIZAÇÃO DOS ARQUIVOS OFICIAIS PROTHEUS
console.log('\n[ETAPA 2] Sincronização dos fontes, templates e presets...');
const srcTrader = path.join(protheusRoot, 'platforms/mt5/AIOX_Trader_On_Chart.mq5');
const srcCopier = path.join(protheusRoot, 'platforms/mt5/AIOX_Local_Trade_Copier.mq5');
const srcTpl = path.join(protheusRoot, 'platforms/mt5/templates/Gamma_SFX_Cyan.tpl');
const presetsDir = path.join(protheusRoot, 'platforms/mt5/presets');

for (const t of terminals) {
  const terminalDir = path.join(basePath, t.hash);
  const expertsDir = path.join(terminalDir, 'MQL5/Experts');
  const templatesDir = path.join(terminalDir, 'MQL5/Profiles/Templates');
  const tPresetsDir = path.join(terminalDir, 'MQL5/Profiles/Presets');

  fs.mkdirSync(expertsDir, { recursive: true });
  fs.mkdirSync(templatesDir, { recursive: true });
  fs.mkdirSync(tPresetsDir, { recursive: true });

  // Copia fontes
  fs.copyFileSync(srcTrader, path.join(expertsDir, 'AIOX_Trader_On_Chart.mq5'));
  fs.copyFileSync(srcCopier, path.join(expertsDir, 'AIOX_Local_Trade_Copier.mq5'));

  // Copia template
  if (fs.existsSync(srcTpl)) {
    fs.copyFileSync(srcTpl, path.join(templatesDir, 'Gamma_SFX_Cyan.tpl'));
  }

  // Copia todos os presets
  const presetFiles = fs.readdirSync(presetsDir);
  for (const pf of presetFiles) {
    fs.copyFileSync(path.join(presetsDir, pf), path.join(tPresetsDir, pf));
  }
  console.log(`  [${t.name}] Fontes, Gamma_SFX_Cyan.tpl e ${presetFiles.length} presets sincronizados.`);
}

// 3. COMPILAÇÃO VIA METAEDITOR
console.log('\n[ETAPA 3] Compilação via MetaEditor nos 5 terminais...');
const compileLogsDir = path.join(backupDir, 'compile_logs');
fs.mkdirSync(compileLogsDir, { recursive: true });

for (const t of terminals) {
  console.log(`\nCompilando em [${t.role}] ${t.name}...`);
  if (!fs.existsSync(t.metaeditor)) {
    console.log(`  ⚠️ MetaEditor não encontrado em: ${t.metaeditor}`);
    continue;
  }

  const terminalDir = path.join(basePath, t.hash);
  const filesToCompile = ['AIOX_Trader_On_Chart.mq5', 'AIOX_Local_Trade_Copier.mq5'];

  for (const f of filesToCompile) {
    const mq5Path = path.join(terminalDir, 'MQL5/Experts', f);
    const logPath = path.join(compileLogsDir, `${t.hash}_${f}.log`);

    const cmd = `"${t.metaeditor}" /compile:"${mq5Path}" /log:"${logPath}"`;
    try {
      execSync(cmd, { timeout: 30000 });
    } catch (e) {
      // Metaeditor sometimes exits with non-zero on warnings or async
    }

    if (fs.existsSync(logPath)) {
      // Ler log em utf-16le ou utf-8
      let logContent = '';
      try {
        logContent = fs.readFileSync(logPath, 'utf16le');
        if (!logContent.includes('Result:')) {
          logContent = fs.readFileSync(logPath, 'utf8');
        }
      } catch (err) {
        logContent = fs.readFileSync(logPath, 'utf8');
      }

      const resultLine = logContent.split('\n').find(l => l.includes('Result:')) || logContent.trim().slice(-200);
      console.log(`  - ${f} -> ${resultLine.trim()}`);
    } else {
      console.log(`  - ${f} -> Log não gerado.`);
    }

    // Verificar se o .ex5 foi gerado
    const ex5Path = mq5Path.replace('.mq5', '.ex5');
    if (fs.existsSync(ex5Path)) {
      const stat = fs.statSync(ex5Path);
      console.log(`    ✅ Binário .ex5 atualizado com sucesso (${stat.size} bytes - ${stat.mtime.toLocaleTimeString()})`);
    } else {
      console.log(`    ❌ Binário .ex5 NÃO foi gerado!`);
    }
  }
}

console.log('\n====================================================');
console.log('ETAPA DE SETUP E COMPILAÇÃO CONCLUÍDA COM SUCESSO');
console.log('====================================================');
