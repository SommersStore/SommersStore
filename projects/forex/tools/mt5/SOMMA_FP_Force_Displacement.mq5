//+------------------------------------------------------------------+
//|                         SOMMA_FP_Force_Displacement.mq5           |
//| Visual pressure histogram with explicit support/resistance zones|
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, SommersStore"
#property version   "2.00"
#property indicator_separate_window
#property indicator_height 200
#property indicator_minimum -100
#property indicator_maximum 100
#property indicator_buffers 7
#property indicator_plots 6
#property indicator_label1 "Pressao S/R"
#property indicator_type1 DRAW_COLOR_HISTOGRAM
#property indicator_color1 C'0,105,92',C'38,166,154',C'84,110,122',C'239,83,80',C'183,28,28'
#property indicator_width1 5
#property indicator_label2 "S2 -75"
#property indicator_type2 DRAW_LINE
#property indicator_color2 C'0,105,92'
#property indicator_style2 STYLE_DASH
#property indicator_width2 2
#property indicator_label3 "S1 -45"
#property indicator_type3 DRAW_LINE
#property indicator_color3 C'38,166,154'
#property indicator_style3 STYLE_DASH
#property indicator_width3 2
#property indicator_label4 "EQUILIBRIO 0"
#property indicator_type4 DRAW_LINE
#property indicator_color4 C'84,110,122'
#property indicator_style4 STYLE_DOT
#property indicator_width4 2
#property indicator_label5 "R1 +45"
#property indicator_type5 DRAW_LINE
#property indicator_color5 C'239,83,80'
#property indicator_style5 STYLE_DASH
#property indicator_width5 2
#property indicator_label6 "R2 +75"
#property indicator_type6 DRAW_LINE
#property indicator_color6 C'183,28,28'
#property indicator_style6 STYLE_DASH
#property indicator_width6 2
#property indicator_level1 -75
#property indicator_level2 -45
#property indicator_level3 0
#property indicator_level4 45
#property indicator_level5 75
#property indicator_levelcolor C'0,105,92',C'38,166,154',C'120,144,156',C'239,83,80',C'183,28,28'
#property indicator_levelstyle STYLE_DASH
#property indicator_levelwidth 1

input int StructureLookback = 40;
input int VolumeBaseline = 30;
input int SmoothPeriod = 4;
input double VolumeInfluence = 0.35;
input int PanelHeightPixels = 210;

double Pressure[];
double PressureColor[];
double SupportS2[];
double SupportS1[];
double Equilibrium[];
double ResistanceR1[];
double ResistanceR2[];

double Clamp100(const double value)
{
   return(MathMax(-100.0, MathMin(100.0, value)));
}

int OnInit()
{
   SetIndexBuffer(0, Pressure, INDICATOR_DATA);
   SetIndexBuffer(1, PressureColor, INDICATOR_COLOR_INDEX);
   SetIndexBuffer(2, SupportS2, INDICATOR_DATA);
   SetIndexBuffer(3, SupportS1, INDICATOR_DATA);
   SetIndexBuffer(4, Equilibrium, INDICATOR_DATA);
   SetIndexBuffer(5, ResistanceR1, INDICATOR_DATA);
   SetIndexBuffer(6, ResistanceR2, INDICATOR_DATA);
   ArraySetAsSeries(Pressure, true);
   ArraySetAsSeries(PressureColor, true);
   ArraySetAsSeries(SupportS2, true);
   ArraySetAsSeries(SupportS1, true);
   ArraySetAsSeries(Equilibrium, true);
   ArraySetAsSeries(ResistanceR1, true);
   ArraySetAsSeries(ResistanceR2, true);
   IndicatorSetString(INDICATOR_SHORTNAME, "SOMMA FP | PRESSAO S/R + VOLUME");
   IndicatorSetInteger(INDICATOR_DIGITS, 1);
   IndicatorSetString(INDICATOR_LEVELTEXT, 0, "SUPORTE S2 | absorcao");
   IndicatorSetString(INDICATOR_LEVELTEXT, 1, "SUPORTE S1 | proximidade");
   IndicatorSetString(INDICATOR_LEVELTEXT, 2, "EQUILIBRIO");
   IndicatorSetString(INDICATOR_LEVELTEXT, 3, "RESISTENCIA R1 | proximidade");
   IndicatorSetString(INDICATOR_LEVELTEXT, 4, "RESISTENCIA R2 | exaustao");
   color levelColors[5]={C'0,105,92',C'38,166,154',C'84,110,122',C'239,83,80',C'183,28,28'};
   for(int level=0;level<5;level++)
   {
      IndicatorSetInteger(INDICATOR_LEVELCOLOR,level,levelColors[level]);
      IndicatorSetInteger(INDICATOR_LEVELSTYLE,level,level==2 ? STYLE_DOT : STYLE_DASH);
      IndicatorSetInteger(INDICATOR_LEVELWIDTH,level,2);
   }
   EventSetTimer(1);
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   EventKillTimer();
}

void OnTimer()
{
   int subwindow=ChartWindowFind();
   if(subwindow>0 && PanelHeightPixels>=100)
   {
      long current=0;
      if(ChartGetInteger(0,CHART_HEIGHT_IN_PIXELS,subwindow,current) && current<PanelHeightPixels)
      {
         ChartSetInteger(0,CHART_HEIGHT_IN_PIXELS,subwindow,PanelHeightPixels);
         ChartRedraw(0);
      }
   }
}

int OnCalculate(const int rates_total,const int prev_calculated,const datetime &time[],
                const double &open[],const double &high[],const double &low[],const double &close[],
                const long &tick_volume[],const long &volume[],const int &spread[])
{
   int minimum = StructureLookback + VolumeBaseline + SmoothPeriod + 5;
   if(rates_total < minimum) return(0);
   ArraySetAsSeries(open,true); ArraySetAsSeries(high,true); ArraySetAsSeries(low,true);
   ArraySetAsSeries(close,true); ArraySetAsSeries(tick_volume,true);
   int limit = prev_calculated == 0 ? rates_total - minimum : MathMin(rates_total - minimum, rates_total - prev_calculated + 80);
   for(int i=limit; i>=0; i--)
   {
      double support=low[i+1], resistance=high[i+1];
      for(int s=2; s<=StructureLookback; s++)
      {
         support=MathMin(support,low[i+s]);
         resistance=MathMax(resistance,high[i+s]);
      }
      double corridor=MathMax(resistance-support,_Point);
      double position=((close[i]-support)/corridor)*200.0-100.0;

      double avgVolume=0;
      for(int v=1;v<=VolumeBaseline;v++) avgVolume+=(double)tick_volume[i+v];
      avgVolume=MathMax(1.0,avgVolume/VolumeBaseline);
      double volumeRatio=MathMin(2.0,(double)tick_volume[i]/avgVolume);
      double candleDirection=close[i]>=open[i]?1.0:-1.0;
      double directionalPressure=candleDirection*50.0*(volumeRatio-1.0);
      double raw=position*(1.0-VolumeInfluence)+directionalPressure*VolumeInfluence;

      double prior=0;
      int samples=0;
      for(int p=1;p<=SmoothPeriod && i+p<rates_total;p++){prior+=Pressure[i+p];samples++;}
      Pressure[i]=Clamp100(samples>0?raw*0.65+(prior/samples)*0.35:raw);
      SupportS2[i]=-75.0;
      SupportS1[i]=-45.0;
      Equilibrium[i]=0.0;
      ResistanceR1[i]=45.0;
      ResistanceR2[i]=75.0;
      if(Pressure[i]<=-75) PressureColor[i]=0;
      else if(Pressure[i]<0) PressureColor[i]=1;
      else if(Pressure[i]<45) PressureColor[i]=2;
      else if(Pressure[i]<75) PressureColor[i]=3;
      else PressureColor[i]=4;

      if(i==0)
         IndicatorSetString(INDICATOR_SHORTNAME,
            "SOMMA FP | PRESSAO "+DoubleToString(Pressure[i],1)+
            " | S "+DoubleToString(support,_Digits)+
            " | R "+DoubleToString(resistance,_Digits)+
            " | Vol x"+DoubleToString(volumeRatio,2));
   }
   return(rates_total);
}
