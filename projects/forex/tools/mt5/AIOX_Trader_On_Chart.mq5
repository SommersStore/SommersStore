//+------------------------------------------------------------------+
//|                                         AIOX_Trader_On_Chart.mq5 |
//|                                  Copyright 2026, SommersStore    |
//|                                             https://sommers.store |
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, SommersStore"
#property link      "https://sommers.store"
#property version   "1.32"

#include <Trade\Trade.mqh>
#include <Trade\PositionInfo.mqh>
#include <Trade\OrderInfo.mqh>

CTrade trade;
CPositionInfo position;
COrderInfo orderInfo;

//--- Risk parameters
input double RiskPercent = 1.0;            // Default risk % in percent mode
input double RiskCash = 100.0;             // Default cash risk in cash mode
input double FixedLot = 0.10;              // Default lot in fixed-lot mode
input int    DefaultRiskMode = 0;          // 0=Risk %, 1=Risk cash, 2=Fixed lot

//--- Trade defaults
input int DefaultSLPips = 20;              // Initial stop loss distance
input int DefaultTPPips = 32;              // Initial take profit distance (1.6R from 20 pips)
input int DefaultSlippage = 20;            // Slippage in points
input int MagicNumber = 888200;            // Magic number
input bool ManageOnlyMagic = true;         // Manage only AIOX orders
input int MaxSpreadPips = 5;               // Block entries above this spread, 0 disables
input double PipSizeOverride = 0.0;        // 0=auto; set explicit pip size for special symbols

//--- Order management
input int BreakevenTriggerPips = 8;        // Move to BE after this profit
input int BreakevenOffsetPips = 1;         // BE plus offset
input bool EnableSmartBreakeven = true;    // Add commission/swap cost buffer to BE
input double SmartBEExtraCostPips = 0.2;   // Extra BE buffer after cost coverage
input bool EnableAutoTrailing = false;     // Start with trailing enabled
input int TrailingStartPips = 15;          // Profit before trailing starts
input int TrailingDistancePips = 12;       // Distance from current price
input int TrailingStepPips = 2;            // Minimum SL improvement
input int StraddleEntryOffsetPips = 5;     // BuyStop/SellStop distance from market
input int StraddleExpiryMinutes = 60;      // Pending expiry, 0=GTC
input bool EnableTwoWayTrading = true;     // Straddle can place both directions
input bool EnableOCO = true;               // Delete opposite pending after fill

//--- Visual offset
input int PanelOffsetX = 20;
input int PanelOffsetY = 40;
input int PanelScalePercent = 135;         // 135 = TOC-style panel enlarged for readability
input int PanelRefreshSeconds = 1;         // Panel refresh timer

//--- Runtime state
int    g_risk_mode = 0;
double g_risk_val = 1.0;
int    g_sl_pips = 20;
int    g_tp_pips = 32;
int    g_be_trigger_pips = 8;
int    g_ts_pips = 12;
int    g_pending_offset_pips = 5;
bool   g_auto_trailing = false;
bool   g_two_way = true;
bool   g_oco_enabled = true;
int    g_pending_mode = 0;                 // 0=Buy Stop, 1=Sell Stop, 2=Buy Limit, 3=Sell Limit

//--- Colors
color COLOR_BG = C'250,250,250';
color COLOR_BORDER = C'170,170,170';
color COLOR_TEXT = C'24,24,24';
color COLOR_MUTED = C'128,128,128';
color COLOR_SYMBOL = C'0,38,255';
color COLOR_BUY = C'35,160,55';
color COLOR_SELL = C'235,28,36';
color COLOR_PENDING = C'20,170,90';
color COLOR_BTN_DEFAULT = C'236,236,236';
color COLOR_BTN_ACTIVE = C'255,211,36';

//+------------------------------------------------------------------+
//| Price helpers                                                    |
//+------------------------------------------------------------------+
double GetBid()
{
   return(SymbolInfoDouble(Symbol(), SYMBOL_BID));
}

double GetAsk()
{
   return(SymbolInfoDouble(Symbol(), SYMBOL_ASK));
}

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   g_risk_mode = DefaultRiskMode;
   if(g_risk_mode < 0 || g_risk_mode > 2)
      g_risk_mode = 0;

   if(g_risk_mode == 0) g_risk_val = RiskPercent;
   else if(g_risk_mode == 1) g_risk_val = RiskCash;
   else g_risk_val = FixedLot;

   g_sl_pips = MathMax(1, DefaultSLPips);
   g_tp_pips = MathMax(0, DefaultTPPips);
   g_be_trigger_pips = MathMax(0, BreakevenTriggerPips);
   g_ts_pips = MathMax(1, TrailingDistancePips);
   g_pending_offset_pips = MathMax(1, StraddleEntryOffsetPips);
   g_auto_trailing = EnableAutoTrailing;
   g_two_way = EnableTwoWayTrading;
   g_oco_enabled = EnableOCO;

   trade.SetExpertMagicNumber(MagicNumber);
   trade.SetDeviationInPoints(DefaultSlippage);
   trade.SetTypeFillingBySymbol(Symbol());
   trade.SetAsyncMode(false);
   ChartSetInteger(0, CHART_SHOW_OBJECT_DESCR, true);

   CreatePanel();
   UpdateLines();
   RecalculateAndRedraw();
   EventSetTimer(MathMax(1, PanelRefreshSeconds));
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   EventKillTimer();
   ObjectsDeleteAll(0, "AIOX_TOC_");
   ChartRedraw(0);
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   if(g_auto_trailing)
      ApplyTrailingStops();
   if(g_oco_enabled)
      ApplyOCO();
}

//+------------------------------------------------------------------+
//| Timer function                                                   |
//+------------------------------------------------------------------+
void OnTimer()
{
   RecalculateAndRedraw();
}

int U(int value)
{
   return((int)MathRound(value * MathMax(80, PanelScalePercent) / 100.0));
}

int UiFont(int value)
{
   return(MathMax(7, U(value)));
}

//+------------------------------------------------------------------+
//| ChartEvent function                                              |
//+------------------------------------------------------------------+
void OnChartEvent(const int id, const long &lparam, const double &dparam, const string &sparam)
{
   if(id == CHARTEVENT_OBJECT_CLICK)
   {
      if(sparam == "AIOX_TOC_BTN_MODE_PCT")
         SetRiskMode(0, RiskPercent);
      else if(sparam == "AIOX_TOC_BTN_MODE_CASH")
         SetRiskMode(1, RiskCash);
      else if(sparam == "AIOX_TOC_BTN_MODE_LOT")
         SetRiskMode(2, FixedLot);
      else if(sparam == "AIOX_TOC_BTN_MODE_CYCLE")
         CycleRiskMode();
      else if(sparam == "AIOX_TOC_BTN_PENDING_MODE")
         CyclePendingMode();
      else if(sparam == "AIOX_TOC_BTN_TWOWAY")
         ToggleTwoWay();
      else if(sparam == "AIOX_TOC_BTN_OCO")
         ToggleOCO();
      else if(sparam == "AIOX_TOC_BTN_CLOSE_MARKET")
         ClosePositions(Symbol(), 0);
      else if(sparam == "AIOX_TOC_BTN_CLOSE_PROFIT")
         ClosePositions(Symbol(), 1);
      else if(sparam == "AIOX_TOC_BTN_CLOSE_LOSS")
         ClosePositions(Symbol(), -1);
      else if(sparam == "AIOX_TOC_BTN_CLOSE_PENDING")
         DeletePendingOrders();
      else if(sparam == "AIOX_TOC_BTN_BUY")
         ExecuteMarketOrder(ORDER_TYPE_BUY);
      else if(sparam == "AIOX_TOC_BTN_SELL")
         ExecuteMarketOrder(ORDER_TYPE_SELL);
      else if(sparam == "AIOX_TOC_BTN_PEND")
         ExecutePendingOrder();
      else if(sparam == "AIOX_TOC_BTN_STRADDLE")
         PlaceStraddleOrders();
      else if(sparam == "AIOX_TOC_BTN_BE")
         MoveToBreakeven();
      else if(sparam == "AIOX_TOC_BTN_TRAIL")
         ToggleTrailing();
      else if(sparam == "AIOX_TOC_BTN_CLOSE")
         ClosePositions(Symbol(), 0);
      else if(sparam == "AIOX_TOC_BTN_CLOSEALL")
         ClosePositions("", 0);
      else if(sparam == "AIOX_TOC_BTN_DELPEND")
         DeletePendingOrders();

      if(StringFind(sparam, "AIOX_TOC_BTN_", 0) == 0)
         ObjectSetInteger(0, sparam, OBJPROP_STATE, false);

      ChartRedraw(0);
   }
   else if(id == CHARTEVENT_OBJECT_ENDEDIT)
   {
      if(sparam == "AIOX_TOC_EDIT_RISK")
      {
         g_risk_val = MathMax(0.0, StringToDouble(ObjectGetString(0, sparam, OBJPROP_TEXT)));
         RecalculateAndRedraw();
      }
      else if(sparam == "AIOX_TOC_EDIT_SL")
      {
         g_sl_pips = MathMax(1, (int)StringToInteger(ObjectGetString(0, sparam, OBJPROP_TEXT)));
         UpdateLinesFromPips();
         RecalculateAndRedraw();
      }
      else if(sparam == "AIOX_TOC_EDIT_TP")
      {
         g_tp_pips = MathMax(0, (int)StringToInteger(ObjectGetString(0, sparam, OBJPROP_TEXT)));
         UpdateLinesFromPips();
         RecalculateAndRedraw();
      }
      else if(sparam == "AIOX_TOC_EDIT_BE")
      {
         g_be_trigger_pips = MathMax(0, (int)StringToInteger(ObjectGetString(0, sparam, OBJPROP_TEXT)));
         RecalculateAndRedraw();
      }
      else if(sparam == "AIOX_TOC_EDIT_TS")
      {
         g_ts_pips = MathMax(1, (int)StringToInteger(ObjectGetString(0, sparam, OBJPROP_TEXT)));
         RecalculateAndRedraw();
      }
      else if(sparam == "AIOX_TOC_EDIT_PENDING_OFFSET")
      {
         g_pending_offset_pips = MathMax(1, (int)StringToInteger(ObjectGetString(0, sparam, OBJPROP_TEXT)));
         RecalculateAndRedraw();
      }
   }
   else if(id == CHARTEVENT_OBJECT_DRAG)
   {
      if(sparam == "AIOX_TOC_LINE_ENTRY" || sparam == "AIOX_TOC_LINE_SL" || sparam == "AIOX_TOC_LINE_TP")
         OnLineDrag(sparam);
   }
}

//+------------------------------------------------------------------+
//| UI                                                               |
//+------------------------------------------------------------------+
void CreatePanel()
{
   int x = PanelOffsetX;
   int y = PanelOffsetY;
   int w = U(240);
   int h = U(396);

   ObjectCreate(0, "AIOX_TOC_BG", OBJ_RECTANGLE_LABEL, 0, 0, 0);
   ObjectSetInteger(0, "AIOX_TOC_BG", OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, "AIOX_TOC_BG", OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, "AIOX_TOC_BG", OBJPROP_XSIZE, w);
   ObjectSetInteger(0, "AIOX_TOC_BG", OBJPROP_YSIZE, h);
   ObjectSetInteger(0, "AIOX_TOC_BG", OBJPROP_BGCOLOR, COLOR_BG);
   ObjectSetInteger(0, "AIOX_TOC_BG", OBJPROP_BORDER_COLOR, COLOR_BORDER);
   ObjectSetInteger(0, "AIOX_TOC_BG", OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetInteger(0, "AIOX_TOC_BG", OBJPROP_SELECTABLE, false);
   ObjectSetInteger(0, "AIOX_TOC_BG", OBJPROP_BACK, false);

   CreateLabel("AIOX_TOC_LBL_SYMBOL", Symbol(), x + U(8), y + U(6), COLOR_SYMBOL, 11, true);
   CreateLabel("AIOX_TOC_LBL_VERSION", "AIOX v1.32", x + U(182), y + U(8), COLOR_TEXT, 7, true);

   CreateLabel("AIOX_TOC_LBL_CLOSE_ORDERS", "Close orders:", x + U(8), y + U(28), COLOR_TEXT, 7, true);
   CreateButton("AIOX_TOC_BTN_CLOSE_MARKET", "All", x + U(88), y + U(25), U(30), U(18), 7);
   CreateButton("AIOX_TOC_BTN_CLOSE_PROFIT", "Profit", x + U(122), y + U(25), U(38), U(18), 7);
   CreateButton("AIOX_TOC_BTN_CLOSE_LOSS", "Loss", x + U(164), y + U(25), U(30), U(18), 7);
   CreateButton("AIOX_TOC_BTN_CLOSE_PENDING", "Pend", x + U(198), y + U(25), U(34), U(18), 7);
   ObjectSetInteger(0, "AIOX_TOC_BTN_CLOSE_MARKET", OBJPROP_COLOR, COLOR_SELL);
   ObjectSetInteger(0, "AIOX_TOC_BTN_CLOSE_PROFIT", OBJPROP_COLOR, COLOR_PENDING);
   ObjectSetInteger(0, "AIOX_TOC_BTN_CLOSE_LOSS", OBJPROP_COLOR, COLOR_SELL);
   ObjectSetInteger(0, "AIOX_TOC_BTN_CLOSE_PENDING", OBJPROP_COLOR, COLOR_SELL);

   CreateRule("AIOX_TOC_RULE_TOP", x + U(6), y + U(50), U(228));

   CreateButton("AIOX_TOC_BTN_MODE_CYCLE", RiskModeText(), x + U(8), y + U(60), U(142), U(20), 8);
   CreateEdit("AIOX_TOC_EDIT_RISK", DoubleToString(g_risk_val, 2), x + U(158), y + U(60), U(66), U(20), 8);

   CreateButton("AIOX_TOC_BTN_SL_ROW", "SL Pips", x + U(8), y + U(89), U(142), U(20), 8);
   CreateEdit("AIOX_TOC_EDIT_SL", IntegerToString(g_sl_pips), x + U(158), y + U(89), U(66), U(20), 8);

   CreateButton("AIOX_TOC_BTN_TP_ROW", "TP Pips", x + U(8), y + U(118), U(142), U(20), 8);
   CreateEdit("AIOX_TOC_EDIT_TP", IntegerToString(g_tp_pips), x + U(158), y + U(118), U(66), U(20), 8);

   CreateButton("AIOX_TOC_BTN_TS_ROW", "Trailing Pips", x + U(8), y + U(147), U(142), U(20), 8);
   CreateEdit("AIOX_TOC_EDIT_TS", IntegerToString(g_ts_pips), x + U(158), y + U(147), U(66), U(20), 8);

   CreateLabel("AIOX_TOC_LBL_BE", "BE:", x + U(8), y + U(180), COLOR_TEXT, 8, true);
   CreateEdit("AIOX_TOC_EDIT_BE", IntegerToString(g_be_trigger_pips), x + U(31), y + U(176), U(44), U(20), 8);
   CreateLabel("AIOX_TOC_LBL_HEDGE", "Allow hedge:", x + U(86), y + U(180), COLOR_TEXT, 8, true);
   CreateButton("AIOX_TOC_BTN_TWOWAY", "Yes", x + U(176), y + U(176), U(48), U(20), 8);

   CreateLabel("AIOX_TOC_LBL_OCO", "OCO:", x + U(8), y + U(209), COLOR_TEXT, 8, true);
   CreateButton("AIOX_TOC_BTN_OCO", "Yes", x + U(45), y + U(205), U(48), U(20), 8);
   CreateButton("AIOX_TOC_BTN_PENDING_MODE", PendingModeText(), x + U(102), y + U(205), U(122), U(20), 8);

   CreateButton("AIOX_TOC_BTN_DISTANCE_LABEL", "pips distance", x + U(8), y + U(234), U(142), U(20), 8);
   CreateEdit("AIOX_TOC_EDIT_PENDING_OFFSET", IntegerToString(g_pending_offset_pips), x + U(158), y + U(234), U(36), U(20), 8);
   CreateButton("AIOX_TOC_BTN_PEND", "Place", x + U(198), y + U(234), U(34), U(20), 8);

   CreateButton("AIOX_TOC_BTN_STRADDLE", "Straddle", x + U(8), y + U(263), U(78), U(22), 8);
   CreateButton("AIOX_TOC_BTN_BE", "BE", x + U(92), y + U(263), U(34), U(22), 8);
   CreateButton("AIOX_TOC_BTN_TRAIL", "Trail", x + U(132), y + U(263), U(42), U(22), 8);
   CreateButton("AIOX_TOC_BTN_DELPEND", "Del", x + U(180), y + U(263), U(44), U(22), 8);
   ObjectSetInteger(0, "AIOX_TOC_BTN_STRADDLE", OBJPROP_BGCOLOR, COLOR_PENDING);
   ObjectSetInteger(0, "AIOX_TOC_BTN_STRADDLE", OBJPROP_COLOR, clrWhite);

   CreateLabel("AIOX_TOC_LBL_CALC_LOTS", "Lot: --", x + U(8), y + U(294), COLOR_TEXT, 8, false);
   CreateLabel("AIOX_TOC_LBL_CALC_RISK", "Risk: --", x + U(8), y + U(312), COLOR_TEXT, 8, false);
   CreateLabel("AIOX_TOC_LBL_MARKET", "Spread: --", x + U(8), y + U(330), COLOR_MUTED, 8, false);

   CreateButton("AIOX_TOC_BTN_SELL", "Sell", x + U(8), y + U(350), U(78), U(32), 9);
   ObjectSetInteger(0, "AIOX_TOC_BTN_SELL", OBJPROP_BGCOLOR, COLOR_SELL);
   ObjectSetInteger(0, "AIOX_TOC_BTN_SELL", OBJPROP_COLOR, clrWhite);

   CreateButton("AIOX_TOC_BTN_LOT_DISPLAY", "0.00", x + U(92), y + U(357), U(56), U(18), 8);
   ObjectSetInteger(0, "AIOX_TOC_BTN_LOT_DISPLAY", OBJPROP_BGCOLOR, clrWhite);

   CreateButton("AIOX_TOC_BTN_BUY", "Buy", x + U(156), y + U(350), U(76), U(32), 9);
   ObjectSetInteger(0, "AIOX_TOC_BTN_BUY", OBJPROP_BGCOLOR, COLOR_BUY);
   ObjectSetInteger(0, "AIOX_TOC_BTN_BUY", OBJPROP_COLOR, clrWhite);

   CreateLabel("AIOX_TOC_LBL_POWERED", "Powered by AIOX", x + U(76), y + U(382), COLOR_MUTED, 7, false);
}

void CreateRule(string name, int x, int y, int w)
{
   ObjectCreate(0, name, OBJ_RECTANGLE_LABEL, 0, 0, 0);
   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, name, OBJPROP_XSIZE, w);
   ObjectSetInteger(0, name, OBJPROP_YSIZE, MathMax(1, U(1)));
   ObjectSetInteger(0, name, OBJPROP_BGCOLOR, COLOR_BORDER);
   ObjectSetInteger(0, name, OBJPROP_BORDER_COLOR, COLOR_BORDER);
   ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
}

void CreateLabel(string name, string text, int x, int y, color fg, int fontSize, bool isBold)
{
   ObjectCreate(0, name, OBJ_LABEL, 0, 0, 0);
   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetString(0, name, OBJPROP_TEXT, text);
   ObjectSetInteger(0, name, OBJPROP_COLOR, fg);
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE, UiFont(fontSize));
   ObjectSetString(0, name, OBJPROP_FONT, isBold ? "Arial Bold" : "Arial");
   ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
}

void CreateButton(string name, string text, int x, int y, int w, int h, int fontSize)
{
   ObjectCreate(0, name, OBJ_BUTTON, 0, 0, 0);
   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, name, OBJPROP_XSIZE, w);
   ObjectSetInteger(0, name, OBJPROP_YSIZE, h);
   ObjectSetString(0, name, OBJPROP_TEXT, text);
   ObjectSetInteger(0, name, OBJPROP_BGCOLOR, COLOR_BTN_DEFAULT);
   ObjectSetInteger(0, name, OBJPROP_COLOR, COLOR_TEXT);
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE, UiFont(fontSize));
   ObjectSetString(0, name, OBJPROP_FONT, "Arial");
   ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
}

void CreateEdit(string name, string text, int x, int y, int w, int h, int fontSize)
{
   ObjectCreate(0, name, OBJ_EDIT, 0, 0, 0);
   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, name, OBJPROP_XSIZE, w);
   ObjectSetInteger(0, name, OBJPROP_YSIZE, h);
   ObjectSetString(0, name, OBJPROP_TEXT, text);
   ObjectSetInteger(0, name, OBJPROP_BGCOLOR, clrWhite);
   ObjectSetInteger(0, name, OBJPROP_COLOR, COLOR_TEXT);
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE, UiFont(fontSize));
   ObjectSetString(0, name, OBJPROP_FONT, "Arial");
   ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetInteger(0, name, OBJPROP_ALIGN, ALIGN_CENTER);
}

//+------------------------------------------------------------------+
//| Chart lines                                                      |
//+------------------------------------------------------------------+
void UpdateLines()
{
   double pip = GetPipSize();
   double entryPrice = GetBid();
   double slPrice = entryPrice - g_sl_pips * pip;
   double tpPrice = entryPrice + g_tp_pips * pip;

   if(ObjectFind(0, "AIOX_TOC_LINE_ENTRY") < 0)
   {
      ObjectCreate(0, "AIOX_TOC_LINE_ENTRY", OBJ_HLINE, 0, 0, entryPrice);
      ObjectSetInteger(0, "AIOX_TOC_LINE_ENTRY", OBJPROP_COLOR, clrGold);
      ObjectSetInteger(0, "AIOX_TOC_LINE_ENTRY", OBJPROP_STYLE, STYLE_SOLID);
      ObjectSetInteger(0, "AIOX_TOC_LINE_ENTRY", OBJPROP_WIDTH, 1);
      ObjectSetInteger(0, "AIOX_TOC_LINE_ENTRY", OBJPROP_SELECTABLE, true);
      ObjectSetString(0, "AIOX_TOC_LINE_ENTRY", OBJPROP_TEXT, "AIOX Entry");
   }

   if(ObjectFind(0, "AIOX_TOC_LINE_SL") < 0)
   {
      ObjectCreate(0, "AIOX_TOC_LINE_SL", OBJ_HLINE, 0, 0, slPrice);
      ObjectSetInteger(0, "AIOX_TOC_LINE_SL", OBJPROP_COLOR, clrCrimson);
      ObjectSetInteger(0, "AIOX_TOC_LINE_SL", OBJPROP_STYLE, STYLE_DASH);
      ObjectSetInteger(0, "AIOX_TOC_LINE_SL", OBJPROP_WIDTH, 1);
      ObjectSetInteger(0, "AIOX_TOC_LINE_SL", OBJPROP_SELECTABLE, true);
   }

   if(ObjectFind(0, "AIOX_TOC_LINE_TP") < 0)
   {
      ObjectCreate(0, "AIOX_TOC_LINE_TP", OBJ_HLINE, 0, 0, tpPrice);
      ObjectSetInteger(0, "AIOX_TOC_LINE_TP", OBJPROP_COLOR, clrLimeGreen);
      ObjectSetInteger(0, "AIOX_TOC_LINE_TP", OBJPROP_STYLE, STYLE_DASH);
      ObjectSetInteger(0, "AIOX_TOC_LINE_TP", OBJPROP_WIDTH, 1);
      ObjectSetInteger(0, "AIOX_TOC_LINE_TP", OBJPROP_SELECTABLE, true);
   }
}

void UpdateLinesFromPips()
{
   double entry = ObjectGetDouble(0, "AIOX_TOC_LINE_ENTRY", OBJPROP_PRICE);
   if(entry <= 0) entry = GetBid();

   double pip = GetPipSize();
   ObjectMove(0, "AIOX_TOC_LINE_ENTRY", 0, 0, entry);
   ObjectMove(0, "AIOX_TOC_LINE_SL", 0, 0, entry - g_sl_pips * pip);
   ObjectMove(0, "AIOX_TOC_LINE_TP", 0, 0, entry + g_tp_pips * pip);
}

void OnLineDrag(string name)
{
   double entry = ObjectGetDouble(0, "AIOX_TOC_LINE_ENTRY", OBJPROP_PRICE);
   double sl = ObjectGetDouble(0, "AIOX_TOC_LINE_SL", OBJPROP_PRICE);
   double tp = ObjectGetDouble(0, "AIOX_TOC_LINE_TP", OBJPROP_PRICE);
   double pip = GetPipSize();
   if(pip <= 0) return;

   if(name == "AIOX_TOC_LINE_ENTRY")
   {
      g_sl_pips = (int)MathRound(MathAbs(entry - sl) / pip);
      g_tp_pips = (int)MathRound(MathAbs(entry - tp) / pip);
   }
   else if(name == "AIOX_TOC_LINE_SL")
      g_sl_pips = (int)MathRound(MathAbs(entry - sl) / pip);
   else if(name == "AIOX_TOC_LINE_TP")
      g_tp_pips = (int)MathRound(MathAbs(entry - tp) / pip);

   g_sl_pips = MathMax(1, g_sl_pips);
   g_tp_pips = MathMax(0, g_tp_pips);

   ObjectSetString(0, "AIOX_TOC_EDIT_SL", OBJPROP_TEXT, IntegerToString(g_sl_pips));
   ObjectSetString(0, "AIOX_TOC_EDIT_TP", OBJPROP_TEXT, IntegerToString(g_tp_pips));
   RecalculateAndRedraw();
}

//+------------------------------------------------------------------+
//| Risk and market helpers                                          |
//+------------------------------------------------------------------+
double GetPipSize()
{
   if(PipSizeOverride > 0)
      return(PipSizeOverride);

   int digits = (int)SymbolInfoInteger(Symbol(), SYMBOL_DIGITS);
   double point = SymbolInfoDouble(Symbol(), SYMBOL_POINT);
   if(point <= 0)
      point = _Point;

   if(!IsForexSymbol())
   {
      double ask = GetAsk();
      double bid = GetBid();
      double price = (ask > 0 && bid > 0) ? ((ask + bid) / 2.0) : bid;
      if(price >= 10000.0 && point < 1.0)
         return(1.0);
      if(price >= 100.0 && point < 0.1)
         return(0.1);
   }

   if(digits == 3 || digits == 5)
      return(10.0 * point);
   return(point);
}

bool IsKnownCurrency(string code)
{
   return(code == "AUD" || code == "CAD" || code == "CHF" || code == "EUR" ||
          code == "GBP" || code == "JPY" || code == "NZD" || code == "USD");
}

bool IsForexSymbol()
{
   string symbol = Symbol();
   if(StringLen(symbol) < 6)
      return(false);

   string base = StringSubstr(symbol, 0, 3);
   string quote = StringSubstr(symbol, 3, 3);
   return(IsKnownCurrency(base) && IsKnownCurrency(quote));
}

double GetSpreadPips()
{
   double pip = GetPipSize();
   if(pip <= 0) return(0);
   return((GetAsk() - GetBid()) / pip);
}

string SpreadText()
{
   string limit = (MaxSpreadPips > 0) ? (" / Max " + IntegerToString(MaxSpreadPips)) : " / Max Off";
   return("Spr: " + DoubleToString(GetSpreadPips(), 1) + limit);
}

int VolumeDigits(double step)
{
   int digits = 0;
   while(step > 0 && step < 1.0 && digits < 8)
   {
      step *= 10.0;
      digits++;
   }
   return(digits);
}

double NormalizeLots(double lots)
{
   double step = SymbolInfoDouble(Symbol(), SYMBOL_VOLUME_STEP);
   double minLot = SymbolInfoDouble(Symbol(), SYMBOL_VOLUME_MIN);
   double maxLot = SymbolInfoDouble(Symbol(), SYMBOL_VOLUME_MAX);
   if(step <= 0) step = 0.01;

   lots = MathFloor(lots / step) * step;
   if(lots < minLot) lots = minLot;
   if(lots > maxLot) lots = maxLot;
   return(NormalizeDouble(lots, VolumeDigits(step)));
}

double RiskCashForMode()
{
   if(g_risk_mode == 0)
      return(AccountInfoDouble(ACCOUNT_BALANCE) * (g_risk_val / 100.0));
   if(g_risk_mode == 1)
      return(g_risk_val);
   return(0);
}

double CalculateLots(double entry, double sl)
{
   if(g_risk_mode == 2)
      return(NormalizeLots(g_risk_val));

   double diff = MathAbs(entry - sl);
   double tickValue = SymbolInfoDouble(Symbol(), SYMBOL_TRADE_TICK_VALUE);
   double tickSize = SymbolInfoDouble(Symbol(), SYMBOL_TRADE_TICK_SIZE);
   double riskCash = RiskCashForMode();

   if(diff <= 0 || tickSize <= 0 || tickValue <= 0 || riskCash <= 0)
      return(0);

   return(NormalizeLots(riskCash / ((diff / tickSize) * tickValue)));
}

bool HasValidLots(double lots)
{
   if(lots > 0)
      return(true);
   Alert("AIOX TOC: lot size is zero. Check Entry/SL distance and symbol tick value.");
   return(false);
}

bool TradeSucceeded()
{
   uint ret = trade.ResultRetcode();
   return(ret == TRADE_RETCODE_DONE || ret == TRADE_RETCODE_PLACED || ret == TRADE_RETCODE_DONE_PARTIAL);
}

string TradeErrorText()
{
   return(IntegerToString((int)trade.ResultRetcode()) + " - " + trade.ResultRetcodeDescription());
}

double CashAtRisk(double lots, double entry, double sl)
{
   double diff = MathAbs(entry - sl);
   double tickValue = SymbolInfoDouble(Symbol(), SYMBOL_TRADE_TICK_VALUE);
   double tickSize = SymbolInfoDouble(Symbol(), SYMBOL_TRADE_TICK_SIZE);
   if(diff <= 0 || tickSize <= 0 || tickValue <= 0 || lots <= 0)
      return(0);
   return(lots * ((diff / tickSize) * tickValue));
}

double CashPerPip(double lots)
{
   double pip = GetPipSize();
   double tickValue = SymbolInfoDouble(Symbol(), SYMBOL_TRADE_TICK_VALUE);
   double tickSize = SymbolInfoDouble(Symbol(), SYMBOL_TRADE_TICK_SIZE);
   if(lots <= 0 || pip <= 0 || tickValue <= 0 || tickSize <= 0)
      return(0);
   return(lots * ((pip / tickSize) * tickValue));
}

double SmartBEOffsetPips()
{
   double offset = BreakevenOffsetPips;
   if(!EnableSmartBreakeven)
      return(offset);

   double costs = -(position.Commission() + position.Swap());
   if(costs < 0)
      costs = 0;

   double pipCash = CashPerPip(position.Volume());
   if(pipCash > 0)
      offset += costs / pipCash;

   return(offset + MathMax(0.0, SmartBEExtraCostPips));
}

bool CheckTradeAllowed()
{
   if(!TerminalInfoInteger(TERMINAL_TRADE_ALLOWED) || !MQLInfoInteger(MQL_TRADE_ALLOWED))
   {
      Alert("AIOX TOC: trading is not allowed. Enable Algo Trading and live trading for this EA.");
      return(false);
   }

   long tradeMode = SymbolInfoInteger(Symbol(), SYMBOL_TRADE_MODE);
   if(tradeMode == SYMBOL_TRADE_MODE_DISABLED)
   {
      Alert("AIOX TOC: broker does not allow trading on this symbol now.");
      return(false);
   }

   double spread = GetSpreadPips();
   if(MaxSpreadPips > 0 && spread > MaxSpreadPips)
   {
      Alert("AIOX TOC: spread ", DoubleToString(spread, 1),
            " is above MaxSpreadPips ", MaxSpreadPips,
            ". Set MaxSpreadPips=0 to disable the spread filter.");
      return(false);
   }
   return(true);
}

bool ValidateStopDistance(double price, double sl, double tp)
{
   double minDist = SymbolInfoInteger(Symbol(), SYMBOL_TRADE_STOPS_LEVEL) * _Point;
   if(minDist <= 0) return(true);

   if(sl > 0 && MathAbs(price - sl) < minDist)
   {
      Alert("AIOX TOC: SL is inside broker stop level.");
      return(false);
   }

   if(tp > 0 && MathAbs(price - tp) < minDist)
   {
      Alert("AIOX TOC: TP is inside broker stop level.");
      return(false);
   }
   return(true);
}

bool PositionInScope()
{
   if(!ManageOnlyMagic)
      return(true);
   return(position.Magic() == MagicNumber);
}

bool OrderInScope()
{
   if(!ManageOnlyMagic)
      return(true);
   return(OrderGetInteger(ORDER_MAGIC) == MagicNumber);
}

string RiskModeText()
{
   if(g_risk_mode == 0) return("Risk %");
   if(g_risk_mode == 1) return("Risk $");
   return("Lots");
}

void CycleRiskMode()
{
   g_risk_mode++;
   if(g_risk_mode > 2)
      g_risk_mode = 0;

   if(g_risk_mode == 0) g_risk_val = RiskPercent;
   else if(g_risk_mode == 1) g_risk_val = RiskCash;
   else g_risk_val = FixedLot;

   ObjectSetString(0, "AIOX_TOC_EDIT_RISK", OBJPROP_TEXT, DoubleToString(g_risk_val, 2));
   RecalculateAndRedraw();
}

string PendingModeText()
{
   if(g_pending_mode == 0) return("BUY STOP");
   if(g_pending_mode == 1) return("SELL STOP");
   if(g_pending_mode == 2) return("BUY LIMIT");
   return("SELL LIMIT");
}

void CyclePendingMode()
{
   g_pending_mode++;
   if(g_pending_mode > 3)
      g_pending_mode = 0;
   RecalculateAndRedraw();
}

void ToggleTwoWay()
{
   g_two_way = !g_two_way;
   RecalculateAndRedraw();
}

void ToggleOCO()
{
   g_oco_enabled = !g_oco_enabled;
   RecalculateAndRedraw();
}

ENUM_ORDER_TYPE DirectionFromLines()
{
   double entry = ObjectGetDouble(0, "AIOX_TOC_LINE_ENTRY", OBJPROP_PRICE);
   double sl = ObjectGetDouble(0, "AIOX_TOC_LINE_SL", OBJPROP_PRICE);
   double tp = ObjectGetDouble(0, "AIOX_TOC_LINE_TP", OBJPROP_PRICE);

   if(tp > entry && sl < entry) return(ORDER_TYPE_BUY);
   if(tp < entry && sl > entry) return(ORDER_TYPE_SELL);
   if(entry >= GetAsk()) return(ORDER_TYPE_BUY);
   if(entry <= GetBid()) return(ORDER_TYPE_SELL);
   return(ORDER_TYPE_BUY);
}

void NormalizeDirectionLevels(ENUM_ORDER_TYPE direction, double price, double &sl, double &tp)
{
   double pip = GetPipSize();

   if(direction == ORDER_TYPE_BUY || direction == ORDER_TYPE_BUY_LIMIT || direction == ORDER_TYPE_BUY_STOP)
   {
      if(sl <= 0 || sl >= price)
         sl = price - g_sl_pips * pip;
      if(g_tp_pips <= 0)
         tp = 0;
      else if(tp <= price)
         tp = price + g_tp_pips * pip;
   }
   else
   {
      if(sl <= 0 || sl <= price)
         sl = price + g_sl_pips * pip;
      if(g_tp_pips <= 0)
         tp = 0;
      else if(tp >= price)
         tp = price - g_tp_pips * pip;
   }

   sl = NormalizeDouble(sl, _Digits);
   if(tp > 0)
      tp = NormalizeDouble(tp, _Digits);
}

//+------------------------------------------------------------------+
//| Panel calculations                                               |
//+------------------------------------------------------------------+
void SetRiskMode(int mode, double default_val)
{
   g_risk_mode = mode;
   g_risk_val = default_val;

   ObjectSetString(0, "AIOX_TOC_EDIT_RISK", OBJPROP_TEXT, DoubleToString(g_risk_val, 2));
   RecalculateAndRedraw();
}

void ToggleTrailing()
{
   g_auto_trailing = !g_auto_trailing;
   RecalculateAndRedraw();
}

void RecalculateAndRedraw()
{
   if(ObjectFind(0, "AIOX_TOC_LINE_ENTRY") < 0)
      return;

   double entry = ObjectGetDouble(0, "AIOX_TOC_LINE_ENTRY", OBJPROP_PRICE);
   double sl = ObjectGetDouble(0, "AIOX_TOC_LINE_SL", OBJPROP_PRICE);
   double tp = ObjectGetDouble(0, "AIOX_TOC_LINE_TP", OBJPROP_PRICE);
   double lots = CalculateLots(entry, sl);
   double riskCash = CashAtRisk(lots, entry, sl);
   double rewardCash = CashAtRisk(lots, entry, tp);
   double rr = 0;
   double riskDist = MathAbs(entry - sl);
   if(riskDist > 0)
      rr = MathAbs(entry - tp) / riskDist;

   ObjectSetString(0, "AIOX_TOC_LBL_SYMBOL", OBJPROP_TEXT, Symbol());
   ObjectSetString(0, "AIOX_TOC_BTN_MODE_CYCLE", OBJPROP_TEXT, RiskModeText());
   ObjectSetString(0, "AIOX_TOC_BTN_LOT_DISPLAY", OBJPROP_TEXT, DoubleToString(lots, 2));
   ObjectSetString(0, "AIOX_TOC_LBL_CALC_LOTS", OBJPROP_TEXT, "Lot: " + DoubleToString(lots, 2) + " | R:R " + DoubleToString(rr, 2));
   ObjectSetString(0, "AIOX_TOC_LBL_CALC_RISK", OBJPROP_TEXT, "Risk: " + DoubleToString(riskCash, 2) + " | Reward: " + DoubleToString(rewardCash, 2));
   ObjectSetString(0, "AIOX_TOC_LBL_MARKET", OBJPROP_TEXT, SpreadText() + " | Trail " + (g_auto_trailing ? "ON" : "OFF"));

   ObjectSetString(0, "AIOX_TOC_LINE_ENTRY", OBJPROP_TEXT, "AIOX Entry " + DoubleToString(entry, _Digits));
   ObjectSetString(0, "AIOX_TOC_LINE_SL", OBJPROP_TEXT, "AIOX SL " + IntegerToString(g_sl_pips) + "p | risk " + DoubleToString(riskCash, 2));
   ObjectSetString(0, "AIOX_TOC_LINE_TP", OBJPROP_TEXT, "AIOX TP " + IntegerToString(g_tp_pips) + "p | reward " + DoubleToString(rewardCash, 2));

   ObjectSetInteger(0, "AIOX_TOC_BTN_MODE_CYCLE", OBJPROP_BGCOLOR, COLOR_BTN_ACTIVE);
   ObjectSetInteger(0, "AIOX_TOC_BTN_TRAIL", OBJPROP_BGCOLOR, g_auto_trailing ? COLOR_BTN_ACTIVE : COLOR_BTN_DEFAULT);
   ObjectSetString(0, "AIOX_TOC_BTN_TRAIL", OBJPROP_TEXT, g_auto_trailing ? "On" : "Trail");
   ObjectSetString(0, "AIOX_TOC_BTN_BUY", OBJPROP_TEXT, "Buy\n" + DoubleToString(GetAsk(), _Digits));
   ObjectSetString(0, "AIOX_TOC_BTN_SELL", OBJPROP_TEXT, "Sell\n" + DoubleToString(GetBid(), _Digits));
   ObjectSetString(0, "AIOX_TOC_BTN_PENDING_MODE", OBJPROP_TEXT, PendingModeText());
   ObjectSetString(0, "AIOX_TOC_BTN_TWOWAY", OBJPROP_TEXT, g_two_way ? "Yes" : "No");
   ObjectSetString(0, "AIOX_TOC_BTN_OCO", OBJPROP_TEXT, g_oco_enabled ? "Yes" : "No");
   ObjectSetInteger(0, "AIOX_TOC_BTN_TWOWAY", OBJPROP_BGCOLOR, g_two_way ? COLOR_BTN_ACTIVE : COLOR_BTN_DEFAULT);
   ObjectSetInteger(0, "AIOX_TOC_BTN_OCO", OBJPROP_BGCOLOR, g_oco_enabled ? COLOR_BTN_ACTIVE : COLOR_BTN_DEFAULT);
   ObjectSetInteger(0, "AIOX_TOC_BTN_PEND", OBJPROP_BGCOLOR, COLOR_PENDING);
   ObjectSetInteger(0, "AIOX_TOC_BTN_PEND", OBJPROP_COLOR, clrWhite);
   ObjectSetInteger(0, "AIOX_TOC_BTN_PENDING_MODE", OBJPROP_BGCOLOR, COLOR_BTN_ACTIVE);

   ChartRedraw(0);
}

//+------------------------------------------------------------------+
//| Trading actions                                                  |
//+------------------------------------------------------------------+
void ExecuteMarketOrder(ENUM_ORDER_TYPE type)
{
   if(!CheckTradeAllowed())
      return;

   double price = (type == ORDER_TYPE_BUY) ? GetAsk() : GetBid();
   double sl = ObjectGetDouble(0, "AIOX_TOC_LINE_SL", OBJPROP_PRICE);
   double tp = ObjectGetDouble(0, "AIOX_TOC_LINE_TP", OBJPROP_PRICE);
   NormalizeDirectionLevels(type, price, sl, tp);

   if(!ValidateStopDistance(price, sl, tp))
      return;

   double lots = CalculateLots(price, sl);
   if(!HasValidLots(lots))
      return;

   bool ok = false;

   if(type == ORDER_TYPE_BUY)
      ok = trade.Buy(lots, Symbol(), 0.0, sl, tp, "AIOX TOC Buy");
   else
      ok = trade.Sell(lots, Symbol(), 0.0, sl, tp, "AIOX TOC Sell");

   if(!ok || !TradeSucceeded())
      Alert("AIOX TOC market order failed. Retcode ", TradeErrorText());
}

void ExecutePendingOrder()
{
   if(!CheckTradeAllowed())
      return;

   double pip = GetPipSize();
   double offset = MathMax(1, g_pending_offset_pips) * pip;
   double entry = 0;
   ENUM_ORDER_TYPE direction = ORDER_TYPE_BUY;
   ENUM_ORDER_TYPE pendingType = ORDER_TYPE_BUY_STOP;
   double minDist = SymbolInfoInteger(Symbol(), SYMBOL_TRADE_STOPS_LEVEL) * _Point;
   double ask = GetAsk();
   double bid = GetBid();
   bool ok = false;

   if(g_pending_mode == 0)
   {
      entry = NormalizeDouble(ask + offset, _Digits);
      direction = ORDER_TYPE_BUY;
      pendingType = ORDER_TYPE_BUY_STOP;
   }
   else if(g_pending_mode == 1)
   {
      entry = NormalizeDouble(bid - offset, _Digits);
      direction = ORDER_TYPE_SELL;
      pendingType = ORDER_TYPE_SELL_STOP;
   }
   else if(g_pending_mode == 2)
   {
      entry = NormalizeDouble(bid - offset, _Digits);
      direction = ORDER_TYPE_BUY;
      pendingType = ORDER_TYPE_BUY_LIMIT;
   }
   else
   {
      entry = NormalizeDouble(ask + offset, _Digits);
      direction = ORDER_TYPE_SELL;
      pendingType = ORDER_TYPE_SELL_LIMIT;
   }

   double sl = (direction == ORDER_TYPE_BUY) ? entry - g_sl_pips * pip : entry + g_sl_pips * pip;
   double tp = 0;
   if(g_tp_pips > 0)
      tp = (direction == ORDER_TYPE_BUY) ? entry + g_tp_pips * pip : entry - g_tp_pips * pip;

   NormalizeDirectionLevels(direction, entry, sl, tp);
   if(!ValidateStopDistance(entry, sl, tp))
      return;

   double lots = CalculateLots(entry, sl);
   if(!HasValidLots(lots))
      return;
   ENUM_ORDER_TYPE_TIME timeType = (StraddleExpiryMinutes > 0) ? ORDER_TIME_SPECIFIED : ORDER_TIME_GTC;
   datetime expiration = (StraddleExpiryMinutes > 0) ? TimeCurrent() + StraddleExpiryMinutes * 60 : 0;

   ObjectMove(0, "AIOX_TOC_LINE_ENTRY", 0, 0, entry);
   ObjectMove(0, "AIOX_TOC_LINE_SL", 0, 0, sl);
   if(tp > 0)
      ObjectMove(0, "AIOX_TOC_LINE_TP", 0, 0, tp);

   if(pendingType == ORDER_TYPE_BUY_STOP && entry > ask + minDist)
      ok = trade.BuyStop(lots, entry, Symbol(), sl, tp, timeType, expiration, "AIOX TOC Pending");
   else if(pendingType == ORDER_TYPE_SELL_STOP && entry < bid - minDist)
      ok = trade.SellStop(lots, entry, Symbol(), sl, tp, timeType, expiration, "AIOX TOC Pending");
   else if(pendingType == ORDER_TYPE_BUY_LIMIT && entry < ask - minDist)
      ok = trade.BuyLimit(lots, entry, Symbol(), sl, tp, timeType, expiration, "AIOX TOC Pending");
   else if(pendingType == ORDER_TYPE_SELL_LIMIT && entry > bid + minDist)
      ok = trade.SellLimit(lots, entry, Symbol(), sl, tp, timeType, expiration, "AIOX TOC Pending");

   if(!ok || !TradeSucceeded())
      Alert("AIOX TOC pending order failed or distance is too close. Retcode ", TradeErrorText());
}

void PlaceStraddleOrders()
{
   if(!CheckTradeAllowed())
      return;

   if(!g_two_way)
   {
      ExecutePendingOrder();
      return;
   }

   double pip = GetPipSize();
   double offset = MathMax(1, g_pending_offset_pips) * pip;
   double buyEntry = NormalizeDouble(GetAsk() + offset, _Digits);
   double sellEntry = NormalizeDouble(GetBid() - offset, _Digits);
   double buySl = buyEntry - g_sl_pips * pip;
   double buyTp = (g_tp_pips > 0) ? buyEntry + g_tp_pips * pip : 0;
   double sellSl = sellEntry + g_sl_pips * pip;
   double sellTp = (g_tp_pips > 0) ? sellEntry - g_tp_pips * pip : 0;

   NormalizeDirectionLevels(ORDER_TYPE_BUY_STOP, buyEntry, buySl, buyTp);
   NormalizeDirectionLevels(ORDER_TYPE_SELL_STOP, sellEntry, sellSl, sellTp);

   if(!ValidateStopDistance(buyEntry, buySl, buyTp) || !ValidateStopDistance(sellEntry, sellSl, sellTp))
      return;

   double buyLots = CalculateLots(buyEntry, buySl);
   double sellLots = CalculateLots(sellEntry, sellSl);
   if(!HasValidLots(buyLots) || !HasValidLots(sellLots))
      return;
   ENUM_ORDER_TYPE_TIME timeType = (StraddleExpiryMinutes > 0) ? ORDER_TIME_SPECIFIED : ORDER_TIME_GTC;
   datetime expiration = (StraddleExpiryMinutes > 0) ? TimeCurrent() + StraddleExpiryMinutes * 60 : 0;

   bool buyOk = trade.BuyStop(buyLots, buyEntry, Symbol(), buySl, buyTp, timeType, expiration, "AIOX TOC Straddle Buy");
   bool sellOk = trade.SellStop(sellLots, sellEntry, Symbol(), sellSl, sellTp, timeType, expiration, "AIOX TOC Straddle Sell");

   if(!buyOk || !sellOk || !TradeSucceeded())
      Alert("AIOX TOC straddle placement incomplete. Retcode ", TradeErrorText());
}

void ClosePositions(string sym, int profitFilter)
{
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(!position.SelectByIndex(i))
         continue;
      if(sym != "" && position.Symbol() != sym)
         continue;
      if(!PositionInScope())
         continue;
      double netProfit = position.Profit() + position.Swap() + position.Commission();
      if(profitFilter > 0 && netProfit <= 0)
         continue;
      if(profitFilter < 0 && netProfit >= 0)
         continue;

      if(!trade.PositionClose(position.Ticket()))
         Print("AIOX TOC position close failed #", position.Ticket(), " retcode=", TradeErrorText());
   }
}

void CloseAllSymbol(string sym)
{
   ClosePositions(sym, 0);
}

void DeletePendingOrders()
{
   for(int i = OrdersTotal() - 1; i >= 0; i--)
   {
      ulong ticket = OrderGetTicket(i);
      if(ticket == 0)
         continue;
      if(OrderGetString(ORDER_SYMBOL) != Symbol())
         continue;
      if(!OrderInScope())
         continue;

      long type = OrderGetInteger(ORDER_TYPE);
      if(type != ORDER_TYPE_BUY && type != ORDER_TYPE_SELL)
      {
         if(!trade.OrderDelete(ticket))
            Print("AIOX TOC pending delete failed #", ticket, " retcode=", TradeErrorText());
      }
   }
}

void ApplyOCO()
{
   bool hasScopedPosition = false;
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(!position.SelectByIndex(i))
         continue;
      if(position.Symbol() == Symbol() && PositionInScope())
      {
         hasScopedPosition = true;
         break;
      }
   }

   if(hasScopedPosition)
      DeletePendingOrders();
}

void MoveToBreakeven()
{
   double pip = GetPipSize();
   double minDist = SymbolInfoInteger(Symbol(), SYMBOL_TRADE_STOPS_LEVEL) * _Point;

   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(!position.SelectByIndex(i))
         continue;
      if(position.Symbol() != Symbol() || !PositionInScope())
         continue;

      double openPrice = position.PriceOpen();
      double currentSL = position.StopLoss();
      double newSL = 0;
      bool shouldMove = false;

      if(position.PositionType() == POSITION_TYPE_BUY)
      {
         double profitPips = (GetBid() - openPrice) / pip;
         newSL = NormalizeDouble(openPrice + SmartBEOffsetPips() * pip, _Digits);
         shouldMove = (profitPips >= g_be_trigger_pips && (currentSL == 0 || currentSL < newSL) && newSL < GetBid() - minDist);
      }
      else if(position.PositionType() == POSITION_TYPE_SELL)
      {
         double profitPips = (openPrice - GetAsk()) / pip;
         newSL = NormalizeDouble(openPrice - SmartBEOffsetPips() * pip, _Digits);
         shouldMove = (profitPips >= g_be_trigger_pips && (currentSL == 0 || currentSL > newSL) && newSL > GetAsk() + minDist);
      }

      if(shouldMove)
      {
         if(!trade.PositionModify(position.Ticket(), newSL, position.TakeProfit()))
            Print("AIOX TOC BE failed #", position.Ticket(), " retcode=", TradeErrorText());
      }
   }
}

void ApplyTrailingStops()
{
   double pip = GetPipSize();
   double minDist = SymbolInfoInteger(Symbol(), SYMBOL_TRADE_STOPS_LEVEL) * _Point;
   double step = MathMax(1, TrailingStepPips) * pip;

   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(!position.SelectByIndex(i))
         continue;
      if(position.Symbol() != Symbol() || !PositionInScope())
         continue;

      double openPrice = position.PriceOpen();
      double currentSL = position.StopLoss();
      double newSL = 0;
      bool shouldMove = false;

      if(position.PositionType() == POSITION_TYPE_BUY)
      {
         double profitPips = (GetBid() - openPrice) / pip;
         newSL = NormalizeDouble(GetBid() - g_ts_pips * pip, _Digits);
         shouldMove = (profitPips >= TrailingStartPips && newSL > openPrice && (currentSL == 0 || newSL > currentSL + step) && newSL < GetBid() - minDist);
      }
      else if(position.PositionType() == POSITION_TYPE_SELL)
      {
         double profitPips = (openPrice - GetAsk()) / pip;
         newSL = NormalizeDouble(GetAsk() + g_ts_pips * pip, _Digits);
         shouldMove = (profitPips >= TrailingStartPips && newSL < openPrice && (currentSL == 0 || newSL < currentSL - step) && newSL > GetAsk() + minDist);
      }

      if(shouldMove)
      {
         if(!trade.PositionModify(position.Ticket(), newSL, position.TakeProfit()))
            Print("AIOX TOC trailing failed #", position.Ticket(), " retcode=", TradeErrorText());
      }
   }
}
