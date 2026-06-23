#property strict
#property script_show_inputs

input int LookbackBars = 140;
input bool ReplaceExistingAioxObjects = false;
input bool DrawElliottLayer = true;
input bool DrawDowH1Layer = true;
input bool DrawDowM15Layer = true;
input bool DrawDowM5Layer = true;
input bool DrawLegend = true;
input bool ApplyFinalTimeframeVisibility = true;

string PREFIX_ELLIOTT = "AIOX_ELLIOTT_";
string PREFIX_DOW_H1 = "AIOX_DOW_H1_";
string PREFIX_DOW_M15 = "AIOX_DOW_M15_";
string PREFIX_DOW_M5 = "AIOX_DOW_M5_";
string PREFIX_KEEP = "AIOX_KEEP_ALL_";

int FlagElliott()
{
   return(ApplyFinalTimeframeVisibility ? (OBJ_PERIOD_H4 | OBJ_PERIOD_H1) : OBJ_ALL_PERIODS);
}

int FlagDowH1()
{
   return(ApplyFinalTimeframeVisibility ? (OBJ_PERIOD_H1 | OBJ_PERIOD_M15 | OBJ_PERIOD_M5) : OBJ_ALL_PERIODS);
}

int FlagDowM15()
{
   return(ApplyFinalTimeframeVisibility ? (OBJ_PERIOD_M15 | OBJ_PERIOD_M5) : OBJ_ALL_PERIODS);
}

int FlagDowM5()
{
   return(ApplyFinalTimeframeVisibility ? OBJ_PERIOD_M5 : OBJ_ALL_PERIODS);
}

bool StartsWithPrefix(string value, string prefix)
{
   return(StringFind(value, prefix, 0) == 0);
}

void DeleteByPrefix(string prefix)
{
   int total = ObjectsTotal(0, -1, -1);
   for(int i = total - 1; i >= 0; i--)
   {
      string name = ObjectName(0, i, -1, -1);
      if(StartsWithPrefix(name, prefix))
         ObjectDelete(0, name);
   }
}

int MaxShift()
{
   int bars = Bars(_Symbol, _Period);
   if(bars < 20)
      return((int)MathMax(1, bars - 2));
   return((int)MathMin(LookbackBars, bars - 2));
}

int ShiftAt(double ratio)
{
   int maxShift = MaxShift();
   int shift = (int)MathRound(maxShift * ratio);
   if(shift < 1)
      shift = 1;
   if(shift > maxShift)
      shift = maxShift;
   return(shift);
}

datetime T(double ratio)
{
   return(iTime(_Symbol, _Period, ShiftAt(ratio)));
}

double H(int shift)
{
   return(iHigh(_Symbol, _Period, shift));
}

double L(int shift)
{
   return(iLow(_Symbol, _Period, shift));
}

double PriceLevel(double low, double range, double ratio)
{
   return(NormalizeDouble(low + range * ratio, _Digits));
}

void StyleObject(string name, color objectColor, int style, int width, int flags)
{
   ObjectSetInteger(0, name, OBJPROP_COLOR, objectColor);
   ObjectSetInteger(0, name, OBJPROP_STYLE, style);
   ObjectSetInteger(0, name, OBJPROP_WIDTH, width);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, true);
   ObjectSetInteger(0, name, OBJPROP_SELECTED, false);
   ObjectSetInteger(0, name, OBJPROP_BACK, false);
   ObjectSetInteger(0, name, OBJPROP_TIMEFRAMES, flags);
}

void CreateTrend(string name, datetime t1, double p1, datetime t2, double p2, color objectColor, int style, int width, int flags)
{
   ObjectDelete(0, name);
   ObjectCreate(0, name, OBJ_TREND, 0, t1, p1, t2, p2);
   ObjectSetInteger(0, name, OBJPROP_RAY_RIGHT, false);
   StyleObject(name, objectColor, style, width, flags);
}

void CreateRect(string name, datetime t1, double p1, datetime t2, double p2, color objectColor, int flags)
{
   ObjectDelete(0, name);
   ObjectCreate(0, name, OBJ_RECTANGLE, 0, t1, p1, t2, p2);
   StyleObject(name, objectColor, STYLE_DOT, 1, flags);
   ObjectSetInteger(0, name, OBJPROP_BACK, true);
}

void CreateText(string name, datetime t, double p, string text, color objectColor, int flags)
{
   ObjectDelete(0, name);
   ObjectCreate(0, name, OBJ_TEXT, 0, t, p);
   ObjectSetString(0, name, OBJPROP_TEXT, text);
   ObjectSetString(0, name, OBJPROP_FONT, "Arial");
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE, 8);
   StyleObject(name, objectColor, STYLE_SOLID, 1, flags);
}

void CreateElliott(double low, double range)
{
   int flags = FlagElliott();
   color c = clrGold;
   datetime t0 = T(0.96), t1 = T(0.78), t2 = T(0.60), t3 = T(0.42), t4 = T(0.25), t5 = T(0.08);
   double p0 = PriceLevel(low, range, 0.26);
   double p1 = PriceLevel(low, range, 0.68);
   double p2 = PriceLevel(low, range, 0.43);
   double p3 = PriceLevel(low, range, 0.84);
   double p4 = PriceLevel(low, range, 0.58);
   double p5 = PriceLevel(low, range, 0.76);

   CreateTrend(PREFIX_ELLIOTT + "W1", t0, p0, t1, p1, c, STYLE_DASH, 1, flags);
   CreateTrend(PREFIX_ELLIOTT + "W2", t1, p1, t2, p2, c, STYLE_DASH, 1, flags);
   CreateTrend(PREFIX_ELLIOTT + "W3", t2, p2, t3, p3, c, STYLE_DASH, 1, flags);
   CreateTrend(PREFIX_ELLIOTT + "W4", t3, p3, t4, p4, c, STYLE_DASH, 1, flags);
   CreateTrend(PREFIX_ELLIOTT + "W5", t4, p4, t5, p5, c, STYLE_DASH, 1, flags);
   CreateText(PREFIX_ELLIOTT + "LABEL", t5, PriceLevel(low, range, 0.88), "Elliott H4/H1", c, flags);
}

void CreateDowH1(double low, double range)
{
   int flags = FlagDowH1();
   color c = clrDarkTurquoise;
   datetime left = T(0.88), right = T(0.20);
   CreateTrend(PREFIX_DOW_H1 + "TREND_TOP", left, PriceLevel(low, range, 0.72), right, PriceLevel(low, range, 0.62), c, STYLE_DOT, 1, flags);
   CreateTrend(PREFIX_DOW_H1 + "TREND_BOTTOM", left, PriceLevel(low, range, 0.42), right, PriceLevel(low, range, 0.36), c, STYLE_DOT, 1, flags);
   CreateRect(PREFIX_DOW_H1 + "STRUCTURE_ZONE", T(0.36), PriceLevel(low, range, 0.64), T(0.08), PriceLevel(low, range, 0.54), c, flags);
   CreateText(PREFIX_DOW_H1 + "LABEL", T(0.84), PriceLevel(low, range, 0.77), "Dow H1 -> H1/M15/M5", c, flags);
}

void CreateDowM15(double low, double range)
{
   int flags = FlagDowM15();
   color c = clrDodgerBlue;
   CreateTrend(PREFIX_DOW_M15 + "TRIANGLE_TOP", T(0.64), PriceLevel(low, range, 0.58), T(0.16), PriceLevel(low, range, 0.49), c, STYLE_DOT, 1, flags);
   CreateTrend(PREFIX_DOW_M15 + "TRIANGLE_BOTTOM", T(0.64), PriceLevel(low, range, 0.34), T(0.16), PriceLevel(low, range, 0.43), c, STYLE_DOT, 1, flags);
   CreateText(PREFIX_DOW_M15 + "LABEL", T(0.60), PriceLevel(low, range, 0.62), "Dow M15 -> M15/M5", c, flags);
}

void CreateDowM5(double low, double range)
{
   int flags = FlagDowM5();
   color c = clrSilver;
   CreateTrend(PREFIX_DOW_M5 + "MICRO_TREND", T(0.30), PriceLevel(low, range, 0.35), T(0.05), PriceLevel(low, range, 0.45), c, STYLE_SOLID, 1, flags);
   CreateRect(PREFIX_DOW_M5 + "ENTRY_ZONE", T(0.16), PriceLevel(low, range, 0.47), T(0.03), PriceLevel(low, range, 0.40), c, flags);
   CreateText(PREFIX_DOW_M5 + "LABEL", T(0.28), PriceLevel(low, range, 0.30), "Dow M5 only", c, flags);
}

void CreateLegend(double low, double range)
{
   int flags = OBJ_ALL_PERIODS;
   CreateText(PREFIX_KEEP + "VISUAL_LAYER_NOTE", T(0.96), PriceLevel(low, range, 0.95), "AIOX: arraste os desenhos e rode Apply Visibility", clrWhite, flags);
}

void OnStart()
{
   if(ReplaceExistingAioxObjects)
   {
      DeleteByPrefix(PREFIX_ELLIOTT);
      DeleteByPrefix(PREFIX_DOW_H1);
      DeleteByPrefix(PREFIX_DOW_M15);
      DeleteByPrefix(PREFIX_DOW_M5);
      DeleteByPrefix(PREFIX_KEEP);
   }

   int maxShift = MaxShift();
   int hiShift = iHighest(_Symbol, _Period, MODE_HIGH, maxShift, 1);
   int loShift = iLowest(_Symbol, _Period, MODE_LOW, maxShift, 1);
   double high = H(hiShift);
   double low = L(loShift);
   double range = high - low;
   if(range <= _Point * 50)
   {
      high = SymbolInfoDouble(_Symbol, SYMBOL_ASK) + _Point * 500;
      low = SymbolInfoDouble(_Symbol, SYMBOL_BID) - _Point * 500;
      range = high - low;
   }

   if(DrawElliottLayer)
      CreateElliott(low, range);
   if(DrawDowH1Layer)
      CreateDowH1(low, range);
   if(DrawDowM15Layer)
      CreateDowM15(low, range);
   if(DrawDowM5Layer)
      CreateDowM5(low, range);
   if(DrawLegend)
      CreateLegend(low, range);

   ChartRedraw(0);
   Print("AIOX strategy drawings created. If Elliott is hidden, switch to H4/H1. M5 shows inherited H1/M15/M5 layers.");
}
