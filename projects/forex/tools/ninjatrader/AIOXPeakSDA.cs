#region Using declarations
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Windows.Media;
using NinjaTrader.NinjaScript;
using NinjaTrader.NinjaScript.Indicators;
using NinjaTrader.NinjaScript.DrawingTools;
#endregion

namespace NinjaTrader.NinjaScript.Indicators
{
    /// <summary>Realtime-safe clean-room port of PIC/Peak (SDA).</summary>
    public class AIOXPeakSDA : Indicator
    {
        [NinjaScriptProperty]
        [Range(2, 1000)]
        [Display(Name = "Len", Order = 1, GroupName = "Parameters")]
        public int Len { get; set; }

        [NinjaScriptProperty]
        [Display(Name = "Use High/Low", Order = 2, GroupName = "Parameters")]
        public bool UseHighLow { get; set; }

        protected override void OnStateChange()
        {
            if (State == State.SetDefaults)
            {
                Description = "PIC/Peak SDA record-extreme ratio; realtime-safe mode without legacy look-ahead.";
                Name = "AIOXPeakSDA";
                Calculate = Calculate.OnBarClose;
                IsOverlay = false;
                Len = 150;
                UseHighLow = true;
                AddPlot(new Stroke(Brushes.MediumSeaGreen, 2), PlotStyle.Line, "PeakUP");
                AddPlot(new Stroke(Brushes.Tomato, 2), PlotStyle.Line, "PeakDN");
                AddLine(Brushes.Gray, 15, "Signal15");
                AddLine(Brushes.Goldenrod, 25, "Signal25");
            }
        }

        protected override void OnBarUpdate()
        {
            if (CurrentBar < Len) return;
            double highest = double.MinValue, lowest = double.MaxValue;
            double highSum = 0.0, lowSum = 0.0;
            for (int barsAgo = 0; barsAgo < Len; barsAgo++)
            {
                double candidateHigh = UseHighLow ? High[barsAgo] : Math.Max(Open[barsAgo], Close[barsAgo]);
                double candidateLow = UseHighLow ? Low[barsAgo] : Math.Min(Open[barsAgo], Close[barsAgo]);
                if (candidateHigh > highest) { highest = candidateHigh; highSum += Close[barsAgo]; }
                if (candidateLow < lowest) { lowest = candidateLow; lowSum += Close[barsAgo]; }
            }
            if (highSum <= 0 || lowSum <= 0) return;
            Values[0][0] = highSum / lowSum;
            Values[1][0] = lowSum / highSum;
        }
    }
}
