//+------------------------------------------------------------------+
//|                                  SOMMA_Multimarket_Desk.mq5       |
//|  Visual MVP: market map, volatility regime, MTF trend and setups |
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, SommersStore"
#property version   "1.10"
#property indicator_chart_window
#property indicator_buffers 5
#property indicator_plots   5

#property indicator_label1  "EMA 20"
#property indicator_type1   DRAW_LINE
#property indicator_color1  clrDeepSkyBlue
#property indicator_width1  1
#property indicator_label2  "EMA 50"
#property indicator_type2   DRAW_LINE
#property indicator_color2  clrOrange
#property indicator_width2  2
#property indicator_label3  "EMA 200"
#property indicator_type3   DRAW_LINE
#property indicator_color3  clrMediumPurple
#property indicator_width3  2
#property indicator_label4  "Setup Buy"
#property indicator_type4   DRAW_ARROW
#property indicator_color4  clrLimeGreen
#property indicator_width4  2
#property indicator_label5  "Setup Sell"
#property indicator_type5   DRAW_ARROW
#property indicator_color5  clrTomato
#property indicator_width5  2

input bool   ShowDashboard = true;
input bool   ShowMarketMap = true;
input bool   ShowGammaLevels = true;
input bool   ShowMinorGamma = true;
input string GammaLevelsFile = "SOMMA\\Niveis_Opcoes_Tradingview_2026-07-18.txt";
input bool   ShowEMAs = true;
input int    StructureLookback = 20;
input int    AtrPeriod = 14;
input int    AtrBaselineBars = 50;
input double PullbackAtrDistance = 0.55;
input double BreakoutAtrFactor = 1.20;
input double MaxSpreadPoints = 80.0;
input int    DashboardX = 360;
input int    DashboardY = 28;
input int    DashboardWidth = 440;
input int    RefreshSeconds = 2;

double Ema20Buffer[];
double Ema50Buffer[];
double Ema200Buffer[];
double BuyBuffer[];
double SellBuffer[];

int hEma20 = INVALID_HANDLE;
int hEma50 = INVALID_HANDLE;
int hEma200 = INVALID_HANDLE;
int hAtrCurrent = INVALID_HANDLE;
int hAtrH4 = INVALID_HANDLE;
int hAtrH1 = INVALID_HANDLE;
int hAtrM15 = INVALID_HANDLE;
int hAtrM5 = INVALID_HANDLE;
int hEma20H4 = INVALID_HANDLE, hEma50H4 = INVALID_HANDLE, hEma200H4 = INVALID_HANDLE;
int hEma20H1 = INVALID_HANDLE, hEma50H1 = INVALID_HANDLE, hEma200H1 = INVALID_HANDLE;
int hEma20M15 = INVALID_HANDLE, hEma50M15 = INVALID_HANDLE, hEma200M15 = INVALID_HANDLE;
int hEma20M5 = INVALID_HANDLE, hEma50M5 = INVALID_HANDLE, hEma200M5 = INVALID_HANDLE;

string PREFIX = "SOMMA_DESK_";
string GAMMA_PREFIX = "SOMMA_GAMMA_";

struct TfState
{
   string label;
   int direction;
   double close_price;
   double ema20;
   double ema50;
   double ema200;
};

double HandleValue(const int handle, const int shift=1)
{
   if(handle == INVALID_HANDLE) return(EMPTY_VALUE);
   double values[1];
   if(CopyBuffer(handle, 0, shift, 1, values) != 1) return(EMPTY_VALUE);
   return(values[0]);
}

int DirectionFromHandles(const ENUM_TIMEFRAMES tf,
                         const int ema20_handle,
                         const int ema50_handle,
                         const int ema200_handle,
                         TfState &state)
{
   state.close_price = iClose(_Symbol, tf, 1);
   state.ema20 = HandleValue(ema20_handle);
   state.ema50 = HandleValue(ema50_handle);
   state.ema200 = HandleValue(ema200_handle);
   if(state.close_price == 0 || state.ema20 == EMPTY_VALUE ||
      state.ema50 == EMPTY_VALUE || state.ema200 == EMPTY_VALUE)
      return(0);
   if(state.close_price > state.ema20 && state.ema20 > state.ema50 && state.ema50 > state.ema200)
      return(1);
   if(state.close_price < state.ema20 && state.ema20 < state.ema50 && state.ema50 < state.ema200)
      return(-1);
   return(0);
}

string DirectionText(const int direction)
{
   if(direction > 0) return("ALTA");
   if(direction < 0) return("BAIXA");
   return("MISTO");
}

color DirectionColor(const int direction)
{
   if(direction > 0) return(clrLimeGreen);
   if(direction < 0) return(clrTomato);
   return(clrGold);
}

void SetLabel(const string id, const string text, const int x, const int y,
              const int size, const color text_color, const string font="Segoe UI")
{
   string name = PREFIX + id;
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_LABEL, 0, 0, 0);
   ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE, size);
   ObjectSetInteger(0, name, OBJPROP_COLOR, text_color);
   ObjectSetString(0, name, OBJPROP_FONT, font);
   ObjectSetString(0, name, OBJPROP_TEXT, text);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
   ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
}

void SetPanel(const string id, const int x, const int y, const int width, const int height,
              const color bg, const color border)
{
   string name = PREFIX + id;
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_RECTANGLE_LABEL, 0, 0, 0);
   ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, name, OBJPROP_XSIZE, width);
   ObjectSetInteger(0, name, OBJPROP_YSIZE, height);
   ObjectSetInteger(0, name, OBJPROP_BGCOLOR, bg);
   ObjectSetInteger(0, name, OBJPROP_BORDER_COLOR, border);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
   ObjectSetInteger(0, name, OBJPROP_BACK, false);
   ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
}

void SetLevel(const string id, const double price, const color line_color,
              const ENUM_LINE_STYLE style, const string caption)
{
   string name = PREFIX + "LEVEL_" + id;
   if(!ShowMarketMap || price <= 0)
   {
      ObjectDelete(0, name);
      return;
   }
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_HLINE, 0, 0, price);
   ObjectSetDouble(0, name, OBJPROP_PRICE, price);
   ObjectSetInteger(0, name, OBJPROP_COLOR, line_color);
   ObjectSetInteger(0, name, OBJPROP_STYLE, style);
   ObjectSetInteger(0, name, OBJPROP_WIDTH, 1);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
   ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
   ObjectSetString(0, name, OBJPROP_TEXT, caption);
}

string TrimText(string value)
{
   StringTrimLeft(value);
   StringTrimRight(value);
   return(value);
}

string GammaSourceSymbol()
{
   string symbol = _Symbol;
   StringToUpper(symbol);
   if(StringFind(symbol, "XAU") >= 0 || StringFind(symbol, "GOLD") >= 0) return("$GC1!");
   if(StringFind(symbol, "XAG") >= 0 || StringFind(symbol, "SILVER") >= 0) return("$SI1!");
   if(StringFind(symbol, "GBP") >= 0) return("$6B1!");
   if(StringFind(symbol, "EUR") >= 0) return("$6E1!");
   if(StringFind(symbol, "AUD") >= 0) return("$6A1!");
   if(StringFind(symbol, "CAD") >= 0) return("$6C1!");
   if(StringFind(symbol, "JPY") >= 0) return("$6J1!");
   if(StringFind(symbol, "NZD") >= 0) return("$6N1!");
   if(StringFind(symbol, "CHF") >= 0) return("$6S1!");
   if(StringFind(symbol, "US500") >= 0 || StringFind(symbol, "SP500") >= 0) return("$ES1!");
   if(StringFind(symbol, "USTEC") >= 0 || StringFind(symbol, "NAS") >= 0 || StringFind(symbol, "US100") >= 0) return("$NQ1!");
   if(StringFind(symbol, "US30") >= 0 || StringFind(symbol, "DOW") >= 0) return("$YM1!");
   if(StringFind(symbol, "OIL") >= 0 || StringFind(symbol, "WTI") >= 0) return("$CL1!");
   return("");
}

color GammaColor(const string label)
{
   if(StringFind(label, "Call Wall") >= 0) return(C'239,83,80');
   if(StringFind(label, "Put Wall") >= 0) return(C'38,166,154');
   if(StringFind(label, "Key Level") >= 0) return(C'255,193,7');
   if(StringFind(label, "GammaFlip") >= 0) return(C'171,71,188');
   if(StringFind(label, "Max Gamma") >= 0 || StringFind(label, "Min Gamma") >= 0) return(C'126,87,194');
   return(C'120,144,156');
}

bool IsPrimaryGamma(const string label)
{
   if(StringFind(label, "Wall") >= 0 || StringFind(label, "Key Level") >= 0 ||
      StringFind(label, "GammaFlip") >= 0 || StringFind(label, "Max Gamma") >= 0 ||
      StringFind(label, "Min Gamma") >= 0) return(true);
   if(ShowMinorGamma && StringFind(label, "Gamma ") >= 0) return(true);
   return(false);
}

void RenderGammaLevels()
{
   ObjectsDeleteAll(0, GAMMA_PREFIX);
   if(!ShowGammaLevels) return;
   string source_symbol = GammaSourceSymbol();
   if(source_symbol == "") return;
   int file = FileOpen(GammaLevelsFile, FILE_READ|FILE_TXT|FILE_ANSI);
   if(file == INVALID_HANDLE) return;
   string wanted = source_symbol + ":";
   string source_line = "";
   while(!FileIsEnding(file))
   {
      string line = FileReadString(file);
      if(StringFind(line, wanted) == 0) { source_line = line; break; }
   }
   FileClose(file);
   if(source_line == "") return;

   int colon = StringFind(source_line, ":");
   string payload = StringSubstr(source_line, colon + 1);
   string fields[];
   int count = StringSplit(payload, ',', fields);
   string call_wall="--", put_wall="--", key_level="--", gamma_flip="--";
   for(int i = 0; i + 1 < count; i += 2)
   {
      string label = TrimText(fields[i]);
      double price = StringToDouble(TrimText(fields[i + 1]));
      if(price <= 0 || !IsPrimaryGamma(label)) continue;
      if(StringFind(label,"Call Wall") == 0 && StringFind(label,"0DTE") < 0 && call_wall == "--") call_wall=DoubleToString(price,_Digits);
      if(StringFind(label,"Put Wall") == 0 && put_wall == "--") put_wall=DoubleToString(price,_Digits);
      if(StringFind(label,"Key Level") >= 0 && key_level == "--") key_level=DoubleToString(price,_Digits);
      if(StringFind(label,"GammaFlip") >= 0) gamma_flip=DoubleToString(price,_Digits);
      string safe = label;
      StringReplace(safe, " ", "_"); StringReplace(safe, "/", "_");
      string name = GAMMA_PREFIX + safe;
      ObjectCreate(0, name, OBJ_HLINE, 0, 0, price);
      color line_color = GammaColor(label);
      bool major = StringFind(label, "Wall") >= 0 || StringFind(label, "Key Level") >= 0 || StringFind(label, "GammaFlip") >= 0;
      ObjectSetInteger(0, name, OBJPROP_COLOR, line_color);
      ObjectSetInteger(0, name, OBJPROP_STYLE, major ? STYLE_SOLID : STYLE_DOT);
      ObjectSetInteger(0, name, OBJPROP_WIDTH, major ? 2 : 1);
      ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, name, OBJPROP_HIDDEN, false);
      ObjectSetString(0, name, OBJPROP_TEXT, "");
      string label_name = name + "_LABEL";
      datetime label_time = iTime(_Symbol, _Period, 18);
      ObjectCreate(0, label_name, OBJ_TEXT, 0, label_time, price);
      ObjectSetString(0, label_name, OBJPROP_TEXT, label + "  " + DoubleToString(price, _Digits));
      ObjectSetString(0, label_name, OBJPROP_FONT, "Segoe UI Semibold");
      ObjectSetInteger(0, label_name, OBJPROP_FONTSIZE, major ? 8 : 7);
      ObjectSetInteger(0, label_name, OBJPROP_COLOR, line_color);
      ObjectSetInteger(0, label_name, OBJPROP_ANCHOR, ANCHOR_LEFT_LOWER);
      ObjectSetInteger(0, label_name, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, label_name, OBJPROP_HIDDEN, true);
   }
   SetLabel("GAMMASRC", "OPTIONS "+source_symbol+" 18/JUL | CW "+call_wall+"  PW "+put_wall+"  KEY "+key_level+"  FLIP "+gamma_flip,
            DashboardX+14, DashboardY+296, 8, C'176,190,214');
}

double AtrMedian(const int handle, const int count)
{
   if(handle == INVALID_HANDLE || count < 5) return(0);
   double values[];
   ArrayResize(values, count);
   int copied = CopyBuffer(handle, 0, 1, count, values);
   if(copied < 5) return(0);
   ArrayResize(values, copied);
   ArraySort(values);
   if((copied % 2) == 1) return(values[copied / 2]);
   return((values[copied / 2 - 1] + values[copied / 2]) / 2.0);
}

string VolatilityRegime(const double ratio, color &regime_color)
{
   if(ratio <= 0) { regime_color = clrSilver; return("V0 DADOS"); }
   if(ratio < 0.72) { regime_color = clrDeepSkyBlue; return("V1 COMPRESSAO"); }
   if(ratio <= 1.30) { regime_color = clrLimeGreen; return("V2 NORMAL"); }
   if(ratio <= 2.00) { regime_color = clrOrange; return("V3 EXPANSAO"); }
   regime_color = clrTomato;
   return("V4 EXTREMA");
}

double SessionVwap()
{
   MqlDateTime now;
   TimeToStruct(TimeCurrent(), now);
   now.hour = 0; now.min = 0; now.sec = 0;
   datetime day_start = StructToTime(now);
   MqlRates rates[];
   int copied = CopyRates(_Symbol, PERIOD_M5, day_start, TimeCurrent(), rates);
   if(copied <= 0) return(0);
   double pv = 0, volume = 0;
   for(int i = 0; i < copied; i++)
   {
      double typical = (rates[i].high + rates[i].low + rates[i].close) / 3.0;
      double v = (double)MathMax((long)1, rates[i].tick_volume);
      pv += typical * v;
      volume += v;
   }
   return(volume > 0 ? pv / volume : 0);
}

bool RecentStructure(const ENUM_TIMEFRAMES tf, const int direction, double &boundary)
{
   int bars = MathMax(8, StructureLookback);
   int highest = iHighest(_Symbol, tf, MODE_HIGH, bars, 2);
   int lowest = iLowest(_Symbol, tf, MODE_LOW, bars, 2);
   double prior_high = highest >= 0 ? iHigh(_Symbol, tf, highest) : 0;
   double prior_low = lowest >= 0 ? iLow(_Symbol, tf, lowest) : 0;
   double close1 = iClose(_Symbol, tf, 1);
   boundary = direction >= 0 ? prior_high : prior_low;
   if(direction > 0) return(close1 > prior_high);
   if(direction < 0) return(close1 < prior_low);
   return(false);
}

void RenderDashboard()
{
   if(!ShowDashboard) return;

   TfState h4, h1, m15, m5;
   h4.label = "MACRO H4"; h1.label = "CONTEXTO H1";
   m15.label = "SETUP M15"; m5.label = "GATILHO M5";
   h4.direction = DirectionFromHandles(PERIOD_H4, hEma20H4, hEma50H4, hEma200H4, h4);
   h1.direction = DirectionFromHandles(PERIOD_H1, hEma20H1, hEma50H1, hEma200H1, h1);
   m15.direction = DirectionFromHandles(PERIOD_M15, hEma20M15, hEma50M15, hEma200M15, m15);
   m5.direction = DirectionFromHandles(PERIOD_M5, hEma20M5, hEma50M5, hEma200M5, m5);

   double atr = HandleValue(hAtrCurrent);
   double median_atr = AtrMedian(hAtrCurrent, AtrBaselineBars);
   double atr_ratio = median_atr > 0 ? atr / median_atr : 0;
   color regime_color;
   string regime = VolatilityRegime(atr_ratio, regime_color);
   double vwap = SessionVwap();
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double spread_points = _Point > 0 ? (ask - bid) / _Point : 0;
   bool spread_ok = MaxSpreadPoints <= 0 || spread_points <= MaxSpreadPoints;

   int macro_dir = (h4.direction == h1.direction ? h4.direction : 0);
   bool volatility_ok = (atr_ratio >= 0.72 && atr_ratio <= 2.00);
   bool pullback = false;
   if(macro_dir != 0 && atr > 0)
      pullback = MathAbs(m15.close_price - m15.ema20) <= atr * PullbackAtrDistance;
   bool trigger = (macro_dir != 0 && m5.direction == macro_dir &&
                   ((macro_dir > 0 && iClose(_Symbol, PERIOD_M5, 1) > iOpen(_Symbol, PERIOD_M5, 1)) ||
                    (macro_dir < 0 && iClose(_Symbol, PERIOD_M5, 1) < iOpen(_Symbol, PERIOD_M5, 1))));

   double breakout_boundary = 0;
   bool breakout = RecentStructure(PERIOD_M15, m15.direction, breakout_boundary);
   double m15_range = iHigh(_Symbol, PERIOD_M15, 1) - iLow(_Symbol, PERIOD_M15, 1);
   double atr_m15 = HandleValue(hAtrM15);
   bool expansion = atr_m15 > 0 && m15_range >= atr_m15 * BreakoutAtrFactor;

   string setup = "SEM SETUP";
   int setup_points = 0;
   if(macro_dir != 0 && pullback && trigger && volatility_ok)
   {
      setup = "A PULLBACK " + DirectionText(macro_dir);
      setup_points = 20;
   }
   else if(m15.direction != 0 && breakout && expansion && spread_ok)
   {
      setup = "B ROMPIMENTO " + DirectionText(m15.direction);
      setup_points = 20;
   }

   int score = 0;
   if(macro_dir != 0) score += 20;
   if(h1.direction != 0 && h1.direction == m15.direction) score += 20;
   if(vwap > 0 && ((macro_dir > 0 && bid > vwap) || (macro_dir < 0 && bid < vwap))) score += 15;
   score += setup_points;
   if(volatility_ok) score += 10;
   if(m5.direction != 0 && m5.direction == m15.direction) score += 10;
   if(spread_ok) score += 5;

   bool blocked = !spread_ok || atr_ratio <= 0 || atr_ratio > 2.0;
   string state = blocked ? "BLOCKED" : (score >= 75 ? "ARMED" : (score >= 65 ? "WATCH" : "BLOCKED"));
   color state_color = blocked ? clrTomato : (score >= 75 ? clrLimeGreen : (score >= 65 ? clrGold : clrTomato));
   string grade = score >= 85 ? "A+" : (score >= 75 ? "A" : (score >= 65 ? "B" : "--"));

   int x = DashboardX, y = DashboardY;
   SetPanel("BG", x, y, DashboardWidth, 320, C'12,18,28', C'64,80,104');
   SetPanel("HEADER", x + 1, y + 1, DashboardWidth - 2, 42, C'22,34,52', C'22,34,52');
   SetLabel("TITLE", "SOMMA | MULTIMARKET DESK", x + 14, y + 8, 12, clrWhite, "Segoe UI Semibold");
   SetLabel("SYMBOL", _Symbol + "  " + EnumToString((ENUM_TIMEFRAMES)_Period), x + 14, y + 25, 9, clrDeepSkyBlue);
   SetLabel("STATE", state + "  " + IntegerToString(score) + "/100  " + grade, x + 275, y + 25, 10, state_color, "Segoe UI Semibold");

   int row = y + 52;
   SetLabel("H4L", "MACRO H4", x + 14, row, 9, clrSilver);
   SetLabel("H4V", DirectionText(h4.direction), x + 118, row, 9, DirectionColor(h4.direction), "Segoe UI Semibold");
   SetLabel("H1L", "CONTEXTO H1", x + 235, row, 9, clrSilver);
   SetLabel("H1V", DirectionText(h1.direction), x + 350, row, 9, DirectionColor(h1.direction), "Segoe UI Semibold");
   row += 22;
   SetLabel("M15L", "SETUP M15", x + 14, row, 9, clrSilver);
   SetLabel("M15V", DirectionText(m15.direction), x + 118, row, 9, DirectionColor(m15.direction), "Segoe UI Semibold");
   SetLabel("M5L", "GATILHO M5", x + 235, row, 9, clrSilver);
   SetLabel("M5V", DirectionText(m5.direction), x + 350, row, 9, DirectionColor(m5.direction), "Segoe UI Semibold");

   row += 30;
   SetLabel("REGIMEL", "REGIME", x + 14, row, 9, clrSilver);
   SetLabel("REGIMEV", regime + "  x" + DoubleToString(atr_ratio, 2), x + 92, row, 9, regime_color, "Segoe UI Semibold");
   row += 22;
   SetLabel("VWAPL", "VWAP SESSAO", x + 14, row, 9, clrSilver);
   SetLabel("VWAPV", vwap > 0 ? DoubleToString(vwap, _Digits) : "N/D", x + 118, row, 9, clrAqua);
   SetLabel("SPREADL", "SPREAD", x + 290, row, 9, clrSilver);
   SetLabel("SPREADV", DoubleToString(spread_points, 1), x + 365, row, 9, spread_ok ? clrLimeGreen : clrTomato);

   row += 30;
   SetPanel("SETUPBG", x + 10, row - 5, DashboardWidth - 20, 48, C'20,28,40', C'52,68,88');
   SetLabel("SETUPL", "SETUP DETECTADO", x + 20, row, 9, clrSilver);
   SetLabel("SETUPV", setup, x + 20, row + 20, 11, setup_points > 0 ? clrLimeGreen : clrGold, "Segoe UI Semibold");

   row += 58;
   string reasons = "Macro " + (macro_dir != 0 ? "OK" : "X") +
                    " | Estrutura " + (h1.direction == m15.direction && h1.direction != 0 ? "OK" : "X") +
                    " | Vol " + (volatility_ok ? "OK" : "X") +
                    " | Spread " + (spread_ok ? "OK" : "X");
   SetLabel("REASONS", reasons, x + 14, row, 9, clrLightSteelBlue);
   row += 22;
   string block_reason = !spread_ok ? "BLOQUEIO: spread acima do limite" :
                         (atr_ratio > 2.0 ? "BLOQUEIO: volatilidade extrema" :
                         (score < 65 ? "AGUARDAR: confluencia insuficiente" : "GATES: liberados para observacao/demo"));
   SetLabel("BLOCK", block_reason, x + 14, row, 9, state_color);
   row += 22;
   SetLabel("FOOT", "Paper + Assisted | sem promessa de performance", x + 14, row, 8, clrSlateGray);

   SetLevel("PDH", iHigh(_Symbol, PERIOD_D1, 1), clrDodgerBlue, STYLE_DASH, "PDH");
   SetLevel("PDL", iLow(_Symbol, PERIOD_D1, 1), clrDodgerBlue, STYLE_DASH, "PDL");
   SetLevel("PWH", iHigh(_Symbol, PERIOD_W1, 1), clrMediumPurple, STYLE_DOT, "PWH");
   SetLevel("PWL", iLow(_Symbol, PERIOD_W1, 1), clrMediumPurple, STYLE_DOT, "PWL");
   SetLevel("DOPEN", iOpen(_Symbol, PERIOD_D1, 0), clrSilver, STYLE_DOT, "D OPEN");
   SetLevel("WOPEN", iOpen(_Symbol, PERIOD_W1, 0), clrDarkGray, STYLE_DOT, "W OPEN");
   SetLevel("VWAP", vwap, clrAqua, STYLE_SOLID, "SESSION VWAP (tick volume)");
   RenderGammaLevels();

   ChartRedraw(0);
}

int OnInit()
{
   SetIndexBuffer(0, Ema20Buffer, INDICATOR_DATA);
   SetIndexBuffer(1, Ema50Buffer, INDICATOR_DATA);
   SetIndexBuffer(2, Ema200Buffer, INDICATOR_DATA);
   SetIndexBuffer(3, BuyBuffer, INDICATOR_DATA);
   SetIndexBuffer(4, SellBuffer, INDICATOR_DATA);
   PlotIndexSetDouble(0, PLOT_EMPTY_VALUE, EMPTY_VALUE);
   PlotIndexSetDouble(1, PLOT_EMPTY_VALUE, EMPTY_VALUE);
   PlotIndexSetDouble(2, PLOT_EMPTY_VALUE, EMPTY_VALUE);
   PlotIndexSetInteger(0, PLOT_DRAW_BEGIN, 19);
   PlotIndexSetInteger(1, PLOT_DRAW_BEGIN, 49);
   PlotIndexSetInteger(2, PLOT_DRAW_BEGIN, 199);
   PlotIndexSetInteger(3, PLOT_ARROW, 233);
   PlotIndexSetInteger(4, PLOT_ARROW, 234);
   PlotIndexSetDouble(3, PLOT_EMPTY_VALUE, EMPTY_VALUE);
   PlotIndexSetDouble(4, PLOT_EMPTY_VALUE, EMPTY_VALUE);

   hEma20 = iMA(_Symbol, _Period, 20, 0, MODE_EMA, PRICE_CLOSE);
   hEma50 = iMA(_Symbol, _Period, 50, 0, MODE_EMA, PRICE_CLOSE);
   hEma200 = iMA(_Symbol, _Period, 200, 0, MODE_EMA, PRICE_CLOSE);
   hAtrCurrent = iATR(_Symbol, _Period, AtrPeriod);
   hAtrH4 = iATR(_Symbol, PERIOD_H4, AtrPeriod);
   hAtrH1 = iATR(_Symbol, PERIOD_H1, AtrPeriod);
   hAtrM15 = iATR(_Symbol, PERIOD_M15, AtrPeriod);
   hAtrM5 = iATR(_Symbol, PERIOD_M5, AtrPeriod);

   hEma20H4 = iMA(_Symbol, PERIOD_H4, 20, 0, MODE_EMA, PRICE_CLOSE);
   hEma50H4 = iMA(_Symbol, PERIOD_H4, 50, 0, MODE_EMA, PRICE_CLOSE);
   hEma200H4 = iMA(_Symbol, PERIOD_H4, 200, 0, MODE_EMA, PRICE_CLOSE);
   hEma20H1 = iMA(_Symbol, PERIOD_H1, 20, 0, MODE_EMA, PRICE_CLOSE);
   hEma50H1 = iMA(_Symbol, PERIOD_H1, 50, 0, MODE_EMA, PRICE_CLOSE);
   hEma200H1 = iMA(_Symbol, PERIOD_H1, 200, 0, MODE_EMA, PRICE_CLOSE);
   hEma20M15 = iMA(_Symbol, PERIOD_M15, 20, 0, MODE_EMA, PRICE_CLOSE);
   hEma50M15 = iMA(_Symbol, PERIOD_M15, 50, 0, MODE_EMA, PRICE_CLOSE);
   hEma200M15 = iMA(_Symbol, PERIOD_M15, 200, 0, MODE_EMA, PRICE_CLOSE);
   hEma20M5 = iMA(_Symbol, PERIOD_M5, 20, 0, MODE_EMA, PRICE_CLOSE);
   hEma50M5 = iMA(_Symbol, PERIOD_M5, 50, 0, MODE_EMA, PRICE_CLOSE);
   hEma200M5 = iMA(_Symbol, PERIOD_M5, 200, 0, MODE_EMA, PRICE_CLOSE);

   if(hEma20 == INVALID_HANDLE || hEma50 == INVALID_HANDLE || hEma200 == INVALID_HANDLE || hAtrCurrent == INVALID_HANDLE)
      return(INIT_FAILED);

   IndicatorSetString(INDICATOR_SHORTNAME, "SOMMA Multimarket Desk");
   EventSetTimer(MathMax(1, RefreshSeconds));
   RenderDashboard();
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   EventKillTimer();
   ObjectsDeleteAll(0, PREFIX);
   ObjectsDeleteAll(0, GAMMA_PREFIX);
   int handles[] = {hEma20,hEma50,hEma200,hAtrCurrent,hAtrH4,hAtrH1,hAtrM15,hAtrM5,
                    hEma20H4,hEma50H4,hEma200H4,hEma20H1,hEma50H1,hEma200H1,
                    hEma20M15,hEma50M15,hEma200M15,hEma20M5,hEma50M5,hEma200M5};
   for(int i = 0; i < ArraySize(handles); i++)
      if(handles[i] != INVALID_HANDLE) IndicatorRelease(handles[i]);
}

void OnTimer()
{
   RenderDashboard();
}

int OnCalculate(const int rates_total,
                const int prev_calculated,
                const datetime &time[],
                const double &open[],
                const double &high[],
                const double &low[],
                const double &close[],
                const long &tick_volume[],
                const long &volume[],
                const int &spread[])
{
   if(rates_total < 210) return(0);

   int start = (prev_calculated > 0 && prev_calculated <= rates_total)
               ? prev_calculated - 1
               : 0;
   int values_to_copy = (start == 0) ? rates_total : rates_total - prev_calculated + 1;

   if(ShowEMAs)
   {
      // CopyBuffer uses a shift from the current bar, not a chart-buffer index.
      // Always copy from shift zero so the newest EMA value cannot remain zero
      // and create a vertical segment at the right edge of the chart.
      int newest = rates_total - 1;
      Ema20Buffer[newest] = EMPTY_VALUE;
      Ema50Buffer[newest] = EMPTY_VALUE;
      Ema200Buffer[newest] = EMPTY_VALUE;

      if(BarsCalculated(hEma20) < rates_total ||
         BarsCalculated(hEma50) < rates_total ||
         BarsCalculated(hEma200) < rates_total)
         return(prev_calculated);

      if(CopyBuffer(hEma20, 0, 0, values_to_copy, Ema20Buffer) != values_to_copy ||
         CopyBuffer(hEma50, 0, 0, values_to_copy, Ema50Buffer) != values_to_copy ||
         CopyBuffer(hEma200, 0, 0, values_to_copy, Ema200Buffer) != values_to_copy)
         return(prev_calculated);
   }
   else
   {
      for(int i = start; i < rates_total; i++)
      {
         Ema20Buffer[i] = EMPTY_VALUE;
         Ema50Buffer[i] = EMPTY_VALUE;
         Ema200Buffer[i] = EMPTY_VALUE;
      }
   }

   for(int i = start; i < rates_total; i++)
   {
      BuyBuffer[i] = EMPTY_VALUE;
      SellBuffer[i] = EMPTY_VALUE;
   }
   return(rates_total);
}
