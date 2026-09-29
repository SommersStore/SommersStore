import fs from 'node:fs';
import path from 'node:path';

const protheusRoot = 'C:/AIOX/Workspace/Protheus';
const sommersRoot = 'C:/AIOX/Workspace/SommersStore';

// Ensure directories exist
const mt5Dir = path.join(protheusRoot, 'platforms/mt5');
const templatesDir = path.join(mt5Dir, 'templates');
const presetsDir = path.join(mt5Dir, 'presets');
fs.mkdirSync(templatesDir, { recursive: true });
fs.mkdirSync(presetsDir, { recursive: true });

// --- 1. AIOX_Trader_On_Chart.mq5 (v1.60) ---
console.log('Generating AIOX_Trader_On_Chart.mq5 v1.60...');
const srcTrader = fs.readFileSync(path.join(sommersRoot, 'projects/forex/tools/mt5/AIOX_Trader_On_Chart.mq5'), 'utf8');

// Update version to 1.60
let traderCode = srcTrader.replace(/#property version\s+"1\.\d+"/g, '#property version   "1.60"');

// Add RiskTolerancePercent input right after DefaultRiskMode
const toleranceParam = `input double RiskTolerancePercent = 20.0;     // Margem de Tolerância de Risco (+/- %)`;
if (!traderCode.includes('RiskTolerancePercent')) {
   traderCode = traderCode.replace(
      /input int\s+DefaultRiskMode\s*=\s*\d+;[^\r\n]*/,
      `$& \r\n${toleranceParam}`
   );
}

// Add g_risk_override state variable right after g_risk_val
if (!traderCode.includes('g_risk_override')) {
   traderCode = traderCode.replace(
      /double\s+g_risk_val\s*=\s*[\d\.]+;[^\r\n]*/,
      `$& \r\nbool   g_risk_override = false;               // Botao sutil de sobrescrita consciente de risco`
   );
}

// Refine TEMA_GAMMA_CYAN palette to match Centro de Comando
const cyanThemeOld = /if\(PanelTheme == TEMA_GAMMA_CYAN\)[\s\S]*?COLOR_EDIT_TEXT=C'63,220,249';[\s\S]*?\}/;
const cyanThemeNew = `if(PanelTheme == TEMA_GAMMA_CYAN)
   {
      // Centro de Comando Cyber Cyan Dark Theme
      COLOR_BG = C'7,11,18';            // Obsidian Navy (#070B12)
      COLOR_BORDER = C'0,180,216';      // Cyber Cyan border
      COLOR_TEXT = C'0,229,255';        // Neon Aqua Cyan (#00E5FF)
      COLOR_HEADER_BG = C'12,20,32';
      COLOR_BUY = C'0,180,120';         // Bull Neon Green (#00E676)
      COLOR_SELL = C'220,30,60';        // Bear Crimson Red (#FF1744)
      COLOR_PENDING = C'17,80,100';     // Teal Pending
      COLOR_BTN_DEFAULT = C'14,24,38';
      COLOR_BTN_ACTIVE = C'0,229,255';  // Active Cyan
      COLOR_BTN_TEXT = C'200,235,250';
      COLOR_ACTIVE_TEXT = C'7,11,18';   // Inverted on active
      COLOR_ACTION_TEXT = clrWhite;
      COLOR_EDIT_BG = C'10,16,26';
      COLOR_EDIT_TEXT = C'0,229,255';
   }`;
traderCode = traderCode.replace(cyanThemeOld, cyanThemeNew);

// Enhance CalculateLots with 20% tolerance check and override
const oldCalcLots = `double CalculateLots(ENUM_ORDER_TYPE direction, double entry, double sl)
{
   if(g_risk_mode == 2)
      return(NormalizeLotsDown(g_risk_val));

   double riskCash = RiskCashForMode();
   double oneLotResult = 0;

   if(entry <= 0 || sl <= 0 || entry == sl || riskCash <= 0)
      return(0);
   if(!OrderCalcProfit(MarketDirection(direction), Symbol(), 1.0, entry, sl, oneLotResult))
   {
      Print("AIOX TOC OrderCalcProfit failed. error=", GetLastError());
      return(0);
   }

   double oneLotRisk = MathAbs(oneLotResult);
   if(oneLotRisk <= 0)
      return(0);
   return(NormalizeLotsDown(riskCash / oneLotRisk));
}`;

const newCalcLots = `double CalculateLots(ENUM_ORDER_TYPE direction, double entry, double sl)
{
   double minLot = SymbolInfoDouble(Symbol(), SYMBOL_VOLUME_MIN);
   double step = SymbolInfoDouble(Symbol(), SYMBOL_VOLUME_STEP);

   if(g_risk_mode == 2)
      return(NormalizeLotsDown(g_risk_val));

   double riskCash = RiskCashForMode();
   double oneLotResult = 0;

   if(entry <= 0 || sl <= 0 || entry == sl || riskCash <= 0)
      return(0);
   if(!OrderCalcProfit(MarketDirection(direction), Symbol(), 1.0, entry, sl, oneLotResult))
   {
      Print("AIOX TOC OrderCalcProfit failed. error=", GetLastError());
      return(0);
   }

   double oneLotRisk = MathAbs(oneLotResult);
   if(oneLotRisk <= 0)
      return(0);

   double rawLots = riskCash / oneLotRisk;
   double normalizedLots = NormalizeLotsDown(rawLots);

   // Checagem de Lote Mínimo com Tolerância de 20%
   if(rawLots < minLot || normalizedLots < minLot)
   {
      double lossAtMinLot = minLot * oneLotRisk;
      double maxAllowedRisk = riskCash * (1.0 + RiskTolerancePercent / 100.0);

      // Caso 1: Dentro da tolerância permitida (+20%)
      if(lossAtMinLot <= maxAllowedRisk + 1e-6)
      {
         PrintFormat("[AIOX Risk] Lote mínimo %.2f aceito dentro da tolerância (+%.1f%%). Risco mín: $%.2f vs Alvo: $%.2f (Teto: $%.2f)",
                     minLot, RiskTolerancePercent, lossAtMinLot, riskCash, maxAllowedRisk);
         return(minLot);
      }

      // Caso 2: Excede a tolerância de 20% -> Verifica autorização consciente (Override)
      if(g_risk_override)
      {
         PrintFormat("[AIOX Risk OVERRIDE] Ordem autorizada com risco excedente (+%.1f%%): Risco Mín $%.2f vs Alvo $%.2f (Teto $%.2f). Autorização consciente do operador.",
                     ((lossAtMinLot / riskCash) - 1.0) * 100.0, lossAtMinLot, riskCash, maxAllowedRisk);
         return(minLot);
      }

      // Caso 3: Bloqueio Seguro (Fail-Closed)
      PrintFormat("[AIOX Risk BLOQUEADO] Risco no lote mínimo $%.2f excede o teto de 20%% ($%.2f). Clique no botão '[⚠️ Risco >20%%]' para autorizar.",
                  lossAtMinLot, maxAllowedRisk);
      Alert(StringFormat("AIOX Risk: Bloqueado! Risco mín ($%.2f) excede +%.0f%% do alvo ($%.2f). Marque '[⚠️ Risco >20%%]' para autorizar.",
                         lossAtMinLot, RiskTolerancePercent, riskCash));
      return(0);
   }

   return(normalizedLots);
}`;

traderCode = traderCode.replace(oldCalcLots, newCalcLots);

// Add the Risk Override button UI in CreatePanel
if (!traderCode.includes('AIOX_TOC_BTN_RISK_OVERRIDE')) {
   // Add button creation
   const createPanelMarker = 'CreateButton("AIOX_TOC_BTN_BUY",';
   const overrideButtonCode = `// Botão sutil de Sobrescrita de Risco (>20%)
   CreateButton("AIOX_TOC_BTN_RISK_OVERRIDE", x, y + h * 8 + 12, w, h - 2,
                g_risk_override ? "[X] Risco >20% AUTORIZADO" : "[  ] Risco >20%",
                g_risk_override ? C'255,140,0' : COLOR_BTN_DEFAULT,
                g_risk_override ? clrWhite : C'140,160,180');
   \r\n   ${createPanelMarker}`;
   traderCode = traderCode.replace(createPanelMarker, overrideButtonCode);

   // Add click handler in OnChartEvent
   const eventMarker = 'else if(sparam == "AIOX_TOC_BTN_BUY")';
   const overrideEventCode = `else if(sparam == "AIOX_TOC_BTN_RISK_OVERRIDE")
      {
         g_risk_override = !g_risk_override;
         ObjectSetString(0, "AIOX_TOC_BTN_RISK_OVERRIDE", OBJPROP_TEXT,
                         g_risk_override ? "[X] Risco >20% AUTORIZADO" : "[  ] Risco >20%");
         ObjectSetInteger(0, "AIOX_TOC_BTN_RISK_OVERRIDE", OBJPROP_BGCOLOR,
                          g_risk_override ? C'255,140,0' : COLOR_BTN_DEFAULT);
         ObjectSetInteger(0, "AIOX_TOC_BTN_RISK_OVERRIDE", OBJPROP_COLOR,
                          g_risk_override ? clrWhite : C'140,160,180');
         ChartRedraw();
         PrintFormat("[AIOX Risk] Botão de sobrescrita de risco: %s", g_risk_override ? "ARMADO (AUTORIZADO)" : "DESATIVADO");
      }
      \r\n      ${eventMarker}`;
   traderCode = traderCode.replace(eventMarker, overrideEventCode);

   // Add auto-reset in ExecuteMarketOrder after trade
   const execMarker = 'if(!TradeOperationSucceeded(trade.Buy';
   const resetCode = `if(g_risk_override)
   {
      g_risk_override = false;
      ObjectSetString(0, "AIOX_TOC_BTN_RISK_OVERRIDE", OBJPROP_TEXT, "[  ] Risco >20%");
      ObjectSetInteger(0, "AIOX_TOC_BTN_RISK_OVERRIDE", OBJPROP_BGCOLOR, COLOR_BTN_DEFAULT);
      ObjectSetInteger(0, "AIOX_TOC_BTN_RISK_OVERRIDE", OBJPROP_COLOR, C'140,160,180');
      ChartRedraw();
      Print("[AIOX Risk] Botão de sobrescrita de risco resetado automaticamente para OFF após envio.");
   }
   ${execMarker}`;
   traderCode = traderCode.replace(execMarker, resetCode);
}

fs.writeFileSync(path.join(mt5Dir, 'AIOX_Trader_On_Chart.mq5'), traderCode, 'utf8');
console.log('AIOX_Trader_On_Chart.mq5 v1.60 gerado em Protheus');

// --- 2. AIOX_Local_Trade_Copier.mq5 ---
console.log('Generating AIOX_Local_Trade_Copier.mq5 in Protheus...');
const srcCopier = fs.readFileSync(path.join(sommersRoot, 'projects/forex/tools/mt5/AIOX_Local_Trade_Copier.mq5'), 'utf8');
fs.writeFileSync(path.join(mt5Dir, 'AIOX_Local_Trade_Copier.mq5'), srcCopier, 'utf8');
console.log('AIOX_Local_Trade_Copier.mq5 copiado para Protheus');

// --- 3. Gamma_SFX_Cyan.tpl (UTF-16LE com BOM) ---
console.log('Generating Gamma_SFX_Cyan.tpl...');
const masterTplPath = 'C:/Users/AMD/AppData/Roaming/MetaQuotes/Terminal/66F5E7F481A026D99CDDE6509362A170/MQL5/Profiles/Templates/Gamma_SFX.tpl';
if (fs.existsSync(masterTplPath)) {
   let tplContent = fs.readFileSync(masterTplPath, 'utf16le');
   
   // Apply Obsidian (#070B12 = 1182471) & Cyber Cyan (#00E5FF = 16770304) palette
   tplContent = tplContent
      .replace(/background_color=\d+/g, 'background_color=1182471')
      .replace(/foreground_color=\d+/g, 'foreground_color=16770304')
      .replace(/barup_color=\d+/g, 'barup_color=16770304')
      .replace(/bardown_color=\d+/g, 'bardown_color=4462591')
      .replace(/bullcandle_color=\d+/g, 'bullcandle_color=16770304')
      .replace(/bearcandle_color=\d+/g, 'bearcandle_color=4462591')
      .replace(/chartline_color=\d+/g, 'chartline_color=16770304')
      .replace(/grid_color=\d+/g, 'grid_color=2759184')
      .replace(/bidline_color=\d+/g, 'bidline_color=16770304')
      .replace(/askline_color=\d+/g, 'askline_color=16773888')
      .replace(/stops_color=\d+/g, 'stops_color=4462591');
   
   fs.writeFileSync(path.join(templatesDir, 'Gamma_SFX_Cyan.tpl'), tplContent, 'utf16le');
   console.log('Gamma_SFX_Cyan.tpl gerado com sucesso em Protheus (UTF-16LE)');
} else {
   console.warn('Master Gamma_SFX.tpl não encontrado em roaming');
}

// --- 4. Presets das 5 contas ---
console.log('Generating Presets...');
// Master: ActivTrades Demo 6275085
const presetMaster = `CopierRole=0
ChannelId=SOMMERS_PRIMARY
ExpectedMasterLogin=6275085
ExpectedMasterServer=ActivTrades-Server
RequireDemoMaster=1
AllowedReceiverLogin=0
ReceiverEnabled=0
SourceMagicNumber=888200
ReceiverMagicNumber=888210
VolumeMode=0
FixedReceiverLot=0.01
VolumeMultiplier=1.0
MaxReceiverLot=0.01
SymbolMap=
CopyPendingOrders=0
CopyStopLoss=1
CopyTakeProfit=1
MaxHeartbeatAgeSeconds=5
TimerMilliseconds=250
MaxSlippagePoints=20
AllowedSymbols=LCrude;EURUSD;GBPUSD;USDJPY;XAUUSD;BTCUSD
RequireStopLoss=1
DemoTestOnly=1
`;
fs.writeFileSync(path.join(presetsDir, 'master-activtrades-demo-6275085.set'), presetMaster, 'utf8');

// Receiver 1: FTMO Demo 1514716800 (Ativa para teste)
const presetFTMO = `CopierRole=1
ChannelId=SOMMERS_PRIMARY
ExpectedMasterLogin=6275085
ExpectedMasterServer=ActivTrades-Server
AllowedReceiverServer=FTMO-Demo
RequireDemoMaster=1
AllowedReceiverLogin=1514716800
ReceiverEnabled=1
SourceMagicNumber=888200
ReceiverMagicNumber=888210
VolumeMode=0
FixedReceiverLot=0.01
VolumeMultiplier=1.0
MaxReceiverLot=0.01
SymbolMap=LCrude=USOIL.cash;LCrude=USOIL
CopyPendingOrders=0
CopyStopLoss=1
CopyTakeProfit=1
MaxHeartbeatAgeSeconds=5
TimerMilliseconds=250
MaxSlippagePoints=20
AllowedSymbols=LCrude;USOIL;EURUSD;GBPUSD;USDJPY;XAUUSD;BTCUSD
RequireStopLoss=1
DemoTestOnly=1
`;
fs.writeFileSync(path.join(presetsDir, 'receiver-ftmo-demo-1514716800.set'), presetFTMO, 'utf8');

// Receiver 2: Funded Trader Markets 227066 (Inativa)
const presetFTM = `CopierRole=1
ChannelId=SOMMERS_PRIMARY
ExpectedMasterLogin=6275085
ExpectedMasterServer=ActivTrades-Server
AllowedReceiverServer=FundedTraderMarkets-Server
RequireDemoMaster=1
AllowedReceiverLogin=227066
ReceiverEnabled=0
SourceMagicNumber=888200
ReceiverMagicNumber=888210
VolumeMode=0
FixedReceiverLot=0.01
VolumeMultiplier=1.0
MaxReceiverLot=0.01
SymbolMap=
CopyPendingOrders=0
CopyStopLoss=1
CopyTakeProfit=1
MaxHeartbeatAgeSeconds=5
TimerMilliseconds=250
MaxSlippagePoints=20
AllowedSymbols=
RequireStopLoss=1
DemoTestOnly=0
`;
fs.writeFileSync(path.join(presetsDir, 'receiver-funded-trader-markets-inactive.set'), presetFTM, 'utf8');

// Receiver 3: Blue Guardian 570363 (Inativa)
const presetBG = `CopierRole=1
ChannelId=SOMMERS_PRIMARY
ExpectedMasterLogin=6275085
ExpectedMasterServer=ActivTrades-Server
AllowedReceiverServer=BlueGuardian-Server
RequireDemoMaster=1
AllowedReceiverLogin=570363
ReceiverEnabled=0
SourceMagicNumber=888200
ReceiverMagicNumber=888210
VolumeMode=0
FixedReceiverLot=0.01
VolumeMultiplier=1.0
MaxReceiverLot=0.01
SymbolMap=
CopyPendingOrders=0
CopyStopLoss=1
CopyTakeProfit=1
MaxHeartbeatAgeSeconds=5
TimerMilliseconds=250
MaxSlippagePoints=20
AllowedSymbols=
RequireStopLoss=1
DemoTestOnly=0
`;
fs.writeFileSync(path.join(presetsDir, 'receiver-blue-guardian-inactive.set'), presetBG, 'utf8');

// Receiver 4: Zero Markets - LVL Funding 135070062 (Inativa)
const presetLVL = `CopierRole=1
ChannelId=SOMMERS_PRIMARY
ExpectedMasterLogin=6275085
ExpectedMasterServer=ActivTrades-Server
AllowedReceiverServer=ZeroMarkets-1
RequireDemoMaster=1
AllowedReceiverLogin=135070062
ReceiverEnabled=0
SourceMagicNumber=888200
ReceiverMagicNumber=888210
VolumeMode=0
FixedReceiverLot=0.01
VolumeMultiplier=1.0
MaxReceiverLot=0.01
SymbolMap=
CopyPendingOrders=0
CopyStopLoss=1
CopyTakeProfit=1
MaxHeartbeatAgeSeconds=5
TimerMilliseconds=250
MaxSlippagePoints=20
AllowedSymbols=
RequireStopLoss=1
DemoTestOnly=0
`;
fs.writeFileSync(path.join(presetsDir, 'receiver-zero-markets-lvl-inactive.set'), presetLVL, 'utf8');
console.log('Presets das 5 contas gerados em Protheus');

// --- 5. Test Suite in Protheus ---
console.log('Generating test suite in Protheus test/mt5-risk-copier.test.mjs...');
const testCode = `import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));

async function source(relativePath, encoding = 'utf8') {
  return readFile(new URL(relativePath, \`file:///\${root.replaceAll('\\\\\\\\', '/')}/\`), encoding);
}

test('AIOX_Trader_On_Chart v1.60 implements 20% risk tolerance and override', async () => {
  const code = await source('platforms/mt5/AIOX_Trader_On_Chart.mq5');

  // Verify version
  assert.ok(code.includes('#property version   "1.60"'), 'Version 1.60 missing');

  // Verify tolerance input
  assert.ok(code.includes('RiskTolerancePercent = 20.0'), 'RiskTolerancePercent input missing');

  // Verify OrderCalcProfit usage
  assert.ok(code.includes('OrderCalcProfit(MarketDirection(direction)'), 'OrderCalcProfit usage missing');

  // Verify Risk Override button & toggle logic
  assert.ok(code.includes('AIOX_TOC_BTN_RISK_OVERRIDE'), 'Override button identifier missing');
  assert.ok(code.includes('g_risk_override'), 'Override state variable missing');

  // Verify fail-closed message
  assert.ok(code.includes('AIOX Risk BLOQUEADO'), 'Fail-closed blocked message missing');
});

test('AIOX_Local_Trade_Copier implements static stops and fail-closed safety', async () => {
  const code = await source('platforms/mt5/AIOX_Local_Trade_Copier.mq5');

  // Verify channel, roles, and safety guards
  assert.ok(code.includes('COPIER_MASTER'), 'Master role missing');
  assert.ok(code.includes('COPIER_RECEIVER'), 'Receiver role missing');
  assert.ok(code.includes('MaxReceiverLot'), 'MaxReceiverLot ceiling missing');
  assert.ok(code.includes('PositionClosePartial'), 'PositionClosePartial missing');
  assert.ok(code.includes('DesiredStops'), 'DesiredStops function missing');

  // Verify secret safety: no passwords stored
  assert.doesNotMatch(code, /password|secret|token/i, 'No hardcoded credentials allowed');
});

test('Gamma_SFX_Cyan template applies obsidian and cyber cyan palette', async () => {
  const tpl = await source('platforms/mt5/templates/Gamma_SFX_Cyan.tpl', 'utf16le');

  // Verify Obsidian Navy background (1182471)
  assert.ok(tpl.includes('background_color=1182471'), 'Obsidian background missing');

  // Verify Neon Cyan foreground (16770304)
  assert.ok(tpl.includes('foreground_color=16770304'), 'Cyan foreground missing');

  // Verify Bull and Bear colors
  assert.ok(tpl.includes('bullcandle_color=16770304'), 'Bull cyan candle missing');
  assert.ok(tpl.includes('bearcandle_color=4462591'), 'Bear red candle missing');
});

test('Presets are present and fail-closed for protected prop firms', async () => {
  const ftm = await source('platforms/mt5/presets/receiver-funded-trader-markets-inactive.set');
  assert.ok(ftm.includes('ReceiverEnabled=0'), 'FTM must be inactive by default');

  const bg = await source('platforms/mt5/presets/receiver-blue-guardian-inactive.set');
  assert.ok(bg.includes('ReceiverEnabled=0'), 'Blue Guardian must be inactive by default');

  const lvl = await source('platforms/mt5/presets/receiver-zero-markets-lvl-inactive.set');
  assert.ok(lvl.includes('ReceiverEnabled=0'), 'Zero Markets LVL must be inactive by default');

  const ftmo = await source('platforms/mt5/presets/receiver-ftmo-demo-1514716800.set');
  assert.ok(ftmo.includes('ReceiverEnabled=1'), 'FTMO demo test must be enabled');
  assert.ok(ftmo.includes('MaxReceiverLot=0.01'), 'FTMO must cap volume at 0.01');
});
`;

fs.writeFileSync(path.join(protheusRoot, 'test/mt5-risk-copier.test.mjs'), testCode, 'utf8');
console.log('mt5-risk-copier.test.mjs gerado com sucesso em Protheus');
