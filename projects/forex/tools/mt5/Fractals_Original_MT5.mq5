//+------------------------------------------------------------------+
//|                                      Fractals_Original_MT5.mq5   |
//| MT5 port of the MetaQuotes MT4 Fractals_Original behavior.       |
//+------------------------------------------------------------------+
#property strict
#property version   "1.20"
#property description "MT5 parity port of MT4 Fractals_Original, with an ultrafine marker for MT5 rendering."

#property indicator_chart_window
#property indicator_buffers 2
#property indicator_plots   2

#property indicator_label1  "Fractal Superior"
#property indicator_type1   DRAW_ARROW
#property indicator_color1  clrMagenta
#property indicator_style1  STYLE_SOLID
#property indicator_width1  0

#property indicator_label2  "Fractal Inferior"
#property indicator_type2   DRAW_ARROW
#property indicator_color2  clrLime
#property indicator_style2  STYLE_SOLID
#property indicator_width2  0

double UpperFractals[];
double LowerFractals[];

enum ENUM_FRACTAL_MARKER_MODE
{
   MARCADOR_ULTRAFINO = 0,    // Ponto menor para compensar o limite minimo do MT5.
   MARCADOR_MT4_ORIGINAL = 1  // Simbolo Wingdings 119 usado no indicador MT4.
};

input ENUM_FRACTAL_MARKER_MODE ModoMarcador = MARCADOR_ULTRAFINO;

bool IsUpperFractal(const int index,
                    const int rates_total,
                    const double &high[])
{
   const double current = high[index];
   const int older_bars = rates_total - index - 1;

   // Standard five-bar fractal.
   if(current > high[index + 1] && current > high[index + 2] &&
      current > high[index - 1] && current > high[index - 2])
      return true;

   // MT4 Fractals_Original also recognizes flat tops spanning 6-9 bars.
   if(older_bars >= 3 &&
      current == high[index + 1] &&
      current > high[index + 2] && current > high[index + 3] &&
      current > high[index - 1] && current > high[index - 2])
      return true;

   if(older_bars >= 4 &&
      current >= high[index + 1] && current == high[index + 2] &&
      current > high[index + 3] && current > high[index + 4] &&
      current > high[index - 1] && current > high[index - 2])
      return true;

   if(older_bars >= 5 &&
      current >= high[index + 1] && current == high[index + 2] &&
      current == high[index + 3] && current > high[index + 4] &&
      current > high[index + 5] &&
      current > high[index - 1] && current > high[index - 2])
      return true;

   if(older_bars >= 6 &&
      current >= high[index + 1] && current == high[index + 2] &&
      current >= high[index + 3] && current == high[index + 4] &&
      current > high[index + 5] && current > high[index + 6] &&
      current > high[index - 1] && current > high[index - 2])
      return true;

   return false;
}

bool IsLowerFractal(const int index,
                    const int rates_total,
                    const double &low[])
{
   const double current = low[index];
   const int older_bars = rates_total - index - 1;

   // Standard five-bar fractal.
   if(current < low[index + 1] && current < low[index + 2] &&
      current < low[index - 1] && current < low[index - 2])
      return true;

   // MT4 Fractals_Original also recognizes flat bottoms spanning 6-9 bars.
   if(older_bars >= 3 &&
      current == low[index + 1] &&
      current < low[index + 2] && current < low[index + 3] &&
      current < low[index - 1] && current < low[index - 2])
      return true;

   if(older_bars >= 4 &&
      current <= low[index + 1] && current == low[index + 2] &&
      current < low[index + 3] && current < low[index + 4] &&
      current < low[index - 1] && current < low[index - 2])
      return true;

   if(older_bars >= 5 &&
      current <= low[index + 1] && current == low[index + 2] &&
      current == low[index + 3] && current < low[index + 4] &&
      current < low[index + 5] &&
      current < low[index - 1] && current < low[index - 2])
      return true;

   if(older_bars >= 6 &&
      current <= low[index + 1] && current == low[index + 2] &&
      current <= low[index + 3] && current == low[index + 4] &&
      current < low[index + 5] && current < low[index + 6] &&
      current < low[index - 1] && current < low[index - 2])
      return true;

   return false;
}

int OnInit()
{
   const int marker_code = (ModoMarcador == MARCADOR_ULTRAFINO ? 159 : 119);

   SetIndexBuffer(0, UpperFractals, INDICATOR_DATA);
   SetIndexBuffer(1, LowerFractals, INDICATOR_DATA);

   ArraySetAsSeries(UpperFractals, true);
   ArraySetAsSeries(LowerFractals, true);

   PlotIndexSetInteger(0, PLOT_ARROW, marker_code);
   PlotIndexSetInteger(1, PLOT_ARROW, marker_code);
   PlotIndexSetInteger(0, PLOT_LINE_WIDTH, 0);
   PlotIndexSetInteger(1, PLOT_LINE_WIDTH, 0);
   PlotIndexSetDouble(0, PLOT_EMPTY_VALUE, 0.0);
   PlotIndexSetDouble(1, PLOT_EMPTY_VALUE, 0.0);
   PlotIndexSetInteger(0, PLOT_DRAW_BEGIN, 2);
   PlotIndexSetInteger(1, PLOT_DRAW_BEGIN, 2);

   IndicatorSetInteger(INDICATOR_DIGITS, _Digits);
   IndicatorSetString(INDICATOR_SHORTNAME, "Fractals_Original MT5 v1.20");
   PrintFormat("Fractals_Original MT5 v1.20 ready: requested_widths=0/0, effective_widths=%d/%d, symbol=%d",
               (int)PlotIndexGetInteger(0, PLOT_LINE_WIDTH),
               (int)PlotIndexGetInteger(1, PLOT_LINE_WIDTH),
               marker_code);

   return INIT_SUCCEEDED;
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
   if(rates_total < 5)
      return 0;

   ArraySetAsSeries(high, true);
   ArraySetAsSeries(low, true);

   int limit;
   if(prev_calculated < 7 || prev_calculated > rates_total)
   {
      ArrayInitialize(UpperFractals, 0.0);
      ArrayInitialize(LowerFractals, 0.0);
      limit = rates_total - 3;
   }
   else
   {
      // Recalculate the confirmation area and all plateau variants.
      limit = MathMin(rates_total - 3,
                      rates_total - prev_calculated + 8);
   }

   for(int index = limit; index >= 2 && !IsStopped(); index--)
   {
      UpperFractals[index] = 0.0;
      LowerFractals[index] = 0.0;

      if(IsUpperFractal(index, rates_total, high))
         UpperFractals[index] = high[index];

      if(IsLowerFractal(index, rates_total, low))
         LowerFractals[index] = low[index];
   }

   return rates_total;
}
