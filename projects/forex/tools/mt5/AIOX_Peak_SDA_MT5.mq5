//+------------------------------------------------------------------+
//|                                         AIOX_Peak_SDA_MT5.mq5   |
//| Clean-room MT5 port validated against local Peak.ex4 buffers.   |
//+------------------------------------------------------------------+
#property copyright "AIOX clean-room implementation"
#property version   "1.00"
#property strict
#property indicator_separate_window
#property indicator_buffers 2
#property indicator_plots   2
#property indicator_minimum 0.0

#property indicator_label1  "PIC Peak UP"
#property indicator_type1   DRAW_LINE
#property indicator_color1  clrMediumSeaGreen
#property indicator_width1  3

#property indicator_label2  "PIC Peak DN"
#property indicator_type2   DRAW_LINE
#property indicator_color2  clrTomato
#property indicator_width2  3

input int    InpLen              = 150;   // Original Len
input int    InpHistoryBars      = 1000;  // Bars to display
input bool   InpModeHL           = true;  // High/Low; false uses candle bodies
input bool   InpLegacyExact      = true;  // Reproduce MT4 TF2 overlap behavior
input int    InpLegacyGroupBars  = 0;     // 0 = current timeframe in minutes
input bool   InpHistogram        = false;  // Original uses lines
input double InpSignalLevel1     = 15.0;
input double InpSignalLevel2     = 25.0;

double UpBuffer[];
double DownBuffer[];

int OnInit()
  {
   if(InpLen < 2 || InpHistoryBars < 1)
      return(INIT_PARAMETERS_INCORRECT);

   SetIndexBuffer(0,UpBuffer,INDICATOR_DATA);
   SetIndexBuffer(1,DownBuffer,INDICATOR_DATA);
   ArraySetAsSeries(UpBuffer,true);
   ArraySetAsSeries(DownBuffer,true);
   PlotIndexSetDouble(0,PLOT_EMPTY_VALUE,EMPTY_VALUE);
   PlotIndexSetDouble(1,PLOT_EMPTY_VALUE,EMPTY_VALUE);
   PlotIndexSetInteger(0,PLOT_DRAW_TYPE,InpHistogram ? DRAW_HISTOGRAM : DRAW_LINE);
   PlotIndexSetInteger(1,PLOT_DRAW_TYPE,InpHistogram ? DRAW_HISTOGRAM : DRAW_LINE);
   PlotIndexSetInteger(0,PLOT_DRAW_BEGIN,InpLen);
   PlotIndexSetInteger(1,PLOT_DRAW_BEGIN,InpLen);

   IndicatorSetInteger(INDICATOR_LEVELS,2);
   IndicatorSetDouble(INDICATOR_LEVELVALUE,0,InpSignalLevel1);
   IndicatorSetDouble(INDICATOR_LEVELVALUE,1,InpSignalLevel2);
   IndicatorSetInteger(INDICATOR_LEVELCOLOR,0,clrDimGray);
   IndicatorSetInteger(INDICATOR_LEVELCOLOR,1,clrGold);
   IndicatorSetInteger(INDICATOR_LEVELSTYLE,0,STYLE_DOT);
   IndicatorSetInteger(INDICATOR_LEVELSTYLE,1,STYLE_DASH);
   IndicatorSetString(INDICATOR_SHORTNAME,"AIOX PIC Peak SDA ("+IntegerToString(InpLen)+")");
   return(INIT_SUCCEEDED);
  }

int EffectiveGroupBars()
  {
   if(!InpLegacyExact)
      return(1);
   if(InpLegacyGroupBars > 0)
      return(InpLegacyGroupBars);
   int minutes=PeriodSeconds(_Period)/60;
   return(MathMax(1,minutes));
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
   ArraySetAsSeries(open,true);
   ArraySetAsSeries(high,true);
   ArraySetAsSeries(low,true);
   ArraySetAsSeries(close,true);

   const int group=EffectiveGroupBars();
   const int required=InpLen+group+2;
   if(rates_total <= required)
      return(0);

   int oldest=MathMin(InpHistoryBars,rates_total-required);
   const int newest=InpLegacyExact ? 1 : 0;
   for(int i=oldest;i>=newest && !IsStopped();i--)
     {
      double highest=-DBL_MAX;
      double lowest=DBL_MAX;
      double highRecordCloseSum=0.0;
      double lowRecordCloseSum=0.0;

      for(int n=0;n<InpLen;n++)
        {
         int aggregate=i+n;
         for(int k=0;k<group;k++)
           {
            // The MT4 original walks from an older aggregate bar toward
            // newer bars, producing intentionally overlapping groups.
            int shift=aggregate-k;
            if(shift<0 || shift>=rates_total)
               continue;

            double candidateHigh=InpModeHL ? high[shift] : MathMax(open[shift],close[shift]);
            double candidateLow =InpModeHL ? low[shift]  : MathMin(open[shift],close[shift]);

            if(candidateHigh>highest)
              {
               highest=candidateHigh;
               highRecordCloseSum+=close[shift];
              }
            if(candidateLow<lowest)
              {
               lowest=candidateLow;
               lowRecordCloseSum+=close[shift];
              }
           }
        }

      if(highRecordCloseSum>0.0 && lowRecordCloseSum>0.0)
        {
         UpBuffer[i]=highRecordCloseSum/lowRecordCloseSum;
         DownBuffer[i]=lowRecordCloseSum/highRecordCloseSum;
        }
      else
        {
         UpBuffer[i]=EMPTY_VALUE;
         DownBuffer[i]=EMPTY_VALUE;
        }
     }

   if(InpLegacyExact)
     {
      UpBuffer[0]=EMPTY_VALUE;
      DownBuffer[0]=EMPTY_VALUE;
     }

   for(int i=oldest+1;i<rates_total;i++)
     {
      UpBuffer[i]=EMPTY_VALUE;
      DownBuffer[i]=EMPTY_VALUE;
     }
   return(rates_total);
  }
