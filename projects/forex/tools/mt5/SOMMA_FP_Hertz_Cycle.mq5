//+------------------------------------------------------------------+
//|                                  SOMMA_FP_Hertz_Cycle.mq5         |
//| Multi-horizon cycle/energy monitor inspired by exposed controls |
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, SommersStore"
#property version "1.00"
#property indicator_separate_window
#property indicator_minimum -100
#property indicator_maximum 100
#property indicator_buffers 4
#property indicator_plots 3
#property indicator_level1 0
#property indicator_level2 60
#property indicator_level3 -60
#property indicator_levelcolor clrSlateGray
#property indicator_levelstyle STYLE_DOT

#property indicator_label1 "Hertz rapido"
#property indicator_type1 DRAW_LINE
#property indicator_color1 clrAqua
#property indicator_width1 2
#property indicator_label2 "Hertz lento"
#property indicator_type2 DRAW_LINE
#property indicator_color2 clrOrange
#property indicator_width2 2
#property indicator_label3 "Energia"
#property indicator_type3 DRAW_COLOR_HISTOGRAM
#property indicator_color3 C'38,166,154',C'239,83,80',C'84,110,122'
#property indicator_width3 2

input int FastCycle = 8;
input int SlowCycle = 34;
input int AtrPeriod = 14;

double FastLine[], SlowLine[], Energy[], EnergyColor[];
int hAtr=INVALID_HANDLE;

int OnInit()
{
   SetIndexBuffer(0,FastLine,INDICATOR_DATA); SetIndexBuffer(1,SlowLine,INDICATOR_DATA);
   SetIndexBuffer(2,Energy,INDICATOR_DATA); SetIndexBuffer(3,EnergyColor,INDICATOR_COLOR_INDEX);
   ArraySetAsSeries(FastLine,true);ArraySetAsSeries(SlowLine,true);ArraySetAsSeries(Energy,true);ArraySetAsSeries(EnergyColor,true);
   hAtr=iATR(_Symbol,_Period,AtrPeriod);
   if(hAtr==INVALID_HANDLE) return(INIT_FAILED);
   IndicatorSetString(INDICATOR_SHORTNAME,"SOMMA FP | HERTZ + CICLO");
   IndicatorSetInteger(INDICATOR_DIGITS,1);
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason){if(hAtr!=INVALID_HANDLE)IndicatorRelease(hAtr);}
double Bound(const double v){return(MathMax(-100.0,MathMin(100.0,v)));}

int OnCalculate(const int rates_total,const int prev_calculated,const datetime &time[],const double &open[],
 const double &high[],const double &low[],const double &close[],const long &tick_volume[],const long &volume[],const int &spread[])
{
   if(rates_total<SlowCycle+AtrPeriod+5)return(0);
   ArraySetAsSeries(close,true);
   double atr[];ArraySetAsSeries(atr,true);
   int needed=MathMin(rates_total,prev_calculated==0?rates_total:rates_total-prev_calculated+100);
   if(CopyBuffer(hAtr,0,0,needed,atr)<needed)return(prev_calculated);
   int limit=needed-SlowCycle-1;
   for(int i=limit;i>=0;i--)
   {
      double unit=MathMax(atr[i],_Point);
      FastLine[i]=Bound(25.0*(close[i]-close[i+FastCycle])/unit/FastCycle);
      SlowLine[i]=Bound(25.0*(close[i]-close[i+SlowCycle])/unit/SlowCycle);
      Energy[i]=Bound(FastLine[i]-SlowLine[i]);
      EnergyColor[i]=Energy[i]>10?0:(Energy[i]<-10?1:2);
   }
   return(rates_total);
}
