//+------------------------------------------------------------------+
//|                     4-CONJUNTO-DE-VELAS-MT5-CORRIGIDO.mq5        |
//| Functional MQL5 port of the RSI candle overlay used in MT4.      |
//| Original behavior: Copyright 2013 Forexprofitsupreme.            |
//+------------------------------------------------------------------+
#property strict
#property version   "1.30"
#property description "MT5 port of the MT4 RSI candle overlay with pixel-width compensation for MT4 visual parity."

#property indicator_chart_window
#property indicator_buffers 8
#property indicator_plots   4

// The plot order intentionally matches the four rows of the MT4 Colors tab:
// green/purple thin wicks followed by green/purple candle bodies.
#property indicator_label1  "Alta - Pavio"
#property indicator_type1   DRAW_HISTOGRAM2
#property indicator_color1  clrDarkGreen
#property indicator_style1  STYLE_SOLID
#property indicator_width1  0

#property indicator_label2  "Baixa - Pavio"
#property indicator_type2   DRAW_HISTOGRAM2
#property indicator_color2  clrPurple
#property indicator_style2  STYLE_SOLID
#property indicator_width2  0

#property indicator_label3  "Alta - Corpo"
#property indicator_type3   DRAW_HISTOGRAM2
#property indicator_color3  clrDarkGreen
#property indicator_style3  STYLE_SOLID
#property indicator_width3  1

#property indicator_label4  "Baixa - Corpo"
#property indicator_type4   DRAW_HISTOGRAM2
#property indicator_color4  clrPurple
#property indicator_style4  STYLE_SOLID
#property indicator_width4  1

input int RSI_Period = 21;
input int RSI_Price = 0;
input int Overbought = 50;
input int Oversold = 50;
input int BarWidth = 1;
input int CandleWidth = 2;

double BullWickHigh[];
double BullWickLow[];
double BearWickHigh[];
double BearWickLow[];
double BullBodyOpen[];
double BullBodyClose[];
double BearBodyOpen[];
double BearBodyClose[];

int rsi_handle = INVALID_HANDLE;

int MT5VisualWidth(const int mt4_width)
{
   // In the current MT5 rasterizer, the same numeric histogram width is
   // visually one step heavier than in MT4. Zero is accepted by the current
   // compiler/runtime and reproduces the thinnest MT4 stroke.
   return MathMax(0, MathMin(5, mt4_width - 1));
}

ENUM_APPLIED_PRICE LegacyAppliedPrice(const int legacy_value)
{
   switch(legacy_value)
   {
      case 0: return PRICE_CLOSE;
      case 1: return PRICE_OPEN;
      case 2: return PRICE_HIGH;
      case 3: return PRICE_LOW;
      case 4: return PRICE_MEDIAN;
      case 5: return PRICE_TYPICAL;
      case 6: return PRICE_WEIGHTED;
   }
   return PRICE_CLOSE;
}

void ClearBar(const int index)
{
   BullWickHigh[index] = EMPTY_VALUE;
   BullWickLow[index] = EMPTY_VALUE;
   BearWickHigh[index] = EMPTY_VALUE;
   BearWickLow[index] = EMPTY_VALUE;
   BullBodyOpen[index] = EMPTY_VALUE;
   BullBodyClose[index] = EMPTY_VALUE;
   BearBodyOpen[index] = EMPTY_VALUE;
   BearBodyClose[index] = EMPTY_VALUE;
}

void InitializeBuffers()
{
   ArrayInitialize(BullWickHigh, EMPTY_VALUE);
   ArrayInitialize(BullWickLow, EMPTY_VALUE);
   ArrayInitialize(BearWickHigh, EMPTY_VALUE);
   ArrayInitialize(BearWickLow, EMPTY_VALUE);
   ArrayInitialize(BullBodyOpen, EMPTY_VALUE);
   ArrayInitialize(BullBodyClose, EMPTY_VALUE);
   ArrayInitialize(BearBodyOpen, EMPTY_VALUE);
   ArrayInitialize(BearBodyClose, EMPTY_VALUE);
}

int OnInit()
{
   // MT4 exposes applied prices as 0..6. MQL5's ENUM_APPLIED_PRICE uses
   // different numeric values, so the legacy input must be mapped explicitly.
   if(RSI_Period < 1 || RSI_Price < 0 || RSI_Price > 6)
      return INIT_PARAMETERS_INCORRECT;

   SetIndexBuffer(0, BullWickHigh, INDICATOR_DATA);
   SetIndexBuffer(1, BullWickLow, INDICATOR_DATA);
   SetIndexBuffer(2, BearWickHigh, INDICATOR_DATA);
   SetIndexBuffer(3, BearWickLow, INDICATOR_DATA);
   SetIndexBuffer(4, BullBodyOpen, INDICATOR_DATA);
   SetIndexBuffer(5, BullBodyClose, INDICATOR_DATA);
   SetIndexBuffer(6, BearBodyOpen, INDICATOR_DATA);
   SetIndexBuffer(7, BearBodyClose, INDICATOR_DATA);

   ArraySetAsSeries(BullWickHigh, true);
   ArraySetAsSeries(BullWickLow, true);
   ArraySetAsSeries(BearWickHigh, true);
   ArraySetAsSeries(BearWickLow, true);
   ArraySetAsSeries(BullBodyOpen, true);
   ArraySetAsSeries(BullBodyClose, true);
   ArraySetAsSeries(BearBodyOpen, true);
   ArraySetAsSeries(BearBodyClose, true);

   for(int plot = 0; plot < 4; plot++)
   {
      PlotIndexSetDouble(plot, PLOT_EMPTY_VALUE, EMPTY_VALUE);
      PlotIndexSetInteger(plot, PLOT_DRAW_BEGIN, RSI_Period);
   }

   // Reproduce the two MT4 Inputs while compensating for MT5 pixel weight.
   const int native_bar_width = MT5VisualWidth(BarWidth);
   const int native_candle_width = MT5VisualWidth(CandleWidth);
   PlotIndexSetInteger(0, PLOT_COLOR_INDEXES, 1);
   PlotIndexSetInteger(0, PLOT_LINE_COLOR, clrDarkGreen);
   PlotIndexSetInteger(0, PLOT_LINE_WIDTH, native_bar_width);
   PlotIndexSetInteger(1, PLOT_LINE_WIDTH, native_bar_width);
   PlotIndexSetInteger(2, PLOT_LINE_WIDTH, native_candle_width);
   PlotIndexSetInteger(3, PLOT_LINE_WIDTH, native_candle_width);

   IndicatorSetString(INDICATOR_SHORTNAME,
                      "4 Conjunto de Velas MT5 (RSI " + IntegerToString(RSI_Period) + ")");

   rsi_handle = iRSI(_Symbol,
                     _Period,
                     RSI_Period,
                     LegacyAppliedPrice(RSI_Price));
   if(rsi_handle == INVALID_HANDLE)
      return INIT_FAILED;

   return INIT_SUCCEEDED;
}

void OnDeinit(const int reason)
{
   if(rsi_handle != INVALID_HANDLE)
      IndicatorRelease(rsi_handle);
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
   if(rates_total <= RSI_Period)
      return prev_calculated;

   const int calculated = BarsCalculated(rsi_handle);
   if(calculated <= RSI_Period)
      return prev_calculated;

   ArraySetAsSeries(open, true);
   ArraySetAsSeries(high, true);
   ArraySetAsSeries(low, true);
   ArraySetAsSeries(close, true);

   int values_to_copy = MathMin(rates_total, calculated);
   if(prev_calculated > 0)
      values_to_copy = MathMin(values_to_copy,
                               MathMax(2, rates_total - prev_calculated + 2));

   double rsi[];
   ArraySetAsSeries(rsi, true);
   const int copied = CopyBuffer(rsi_handle, 0, 0, values_to_copy, rsi);
   if(copied <= 0)
      return prev_calculated;

   if(prev_calculated == 0)
      InitializeBuffers();

   for(int index = copied - 1; index >= 0; index--)
   {
      ClearBar(index);

      if(rsi[index] > Overbought)
      {
         BullWickHigh[index] = high[index];
         BullWickLow[index] = low[index];
         BullBodyOpen[index] = open[index];
         BullBodyClose[index] = close[index];
      }
      else if(rsi[index] < Oversold)
      {
         BearWickHigh[index] = high[index];
         BearWickLow[index] = low[index];
         BearBodyOpen[index] = open[index];
         BearBodyClose[index] = close[index];
      }
   }

   static bool ready_reported = false;
   if(!ready_reported)
   {
      PrintFormat("4-CONJUNTO-DE-VELAS MT5 v1.30 ready: bars=%d, RSI=%0.2f, MT4 widths=%d/%d, MT5 widths=%d/%d",
                  copied, rsi[0], BarWidth, CandleWidth,
                  MT5VisualWidth(BarWidth), MT5VisualWidth(CandleWidth));
      ready_reported = true;
   }

   return rates_total;
}
