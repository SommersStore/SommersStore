#property strict

input string PeakPath = "Nova pasta\\ForexWOT.Com-PriceChannelStop\\Indicators\\Peak";
input int Len = 150;
input int HistoryBars = 1000;
input int TF1 = 0;
input int TF2 = 0;
input bool ModeHL = true;
input bool ModeOnline = true;
input bool ModeinFile = false;
input bool ModeHistory = false;
input bool EnableAlert = false;
input bool EnableSound = false;
input bool EnableEmail = false;
input bool GV = false;
input double UrovenSignal = 25.0;
input int BufferA = 0;
input int BufferB = 1;
input int ProbeBars = 250;
input double ValueTolerance = 0.0000001;
input bool WriteCsv = true;
input bool LogNewSignals = true;
input int TimerSeconds = 10;
input string FilePrefix = "AIOX_Peak_Probe";

datetime g_times[];
double g_buffer_a[];
double g_buffer_b[];
datetime g_last_bar = 0;

int OnInit()
{
   ArrayResize(g_times, 0);
   ArrayResize(g_buffer_a, 0);
   ArrayResize(g_buffer_b, 0);

   if(TimerSeconds > 0)
      EventSetTimer(TimerSeconds);

   ScanPeak("init");
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   EventKillTimer();
}

void OnTick()
{
   MaybeScan("tick");
}

void OnTimer()
{
   MaybeScan("timer");
}

void MaybeScan(string trigger)
{
   datetime current_bar = iTime(Symbol(), Period(), 0);
   if(current_bar <= 0)
      return;

   if(current_bar == g_last_bar)
      return;

   g_last_bar = current_bar;
   ScanPeak(trigger);
}

double PeakValue(int buffer_index, int shift)
{
   double value = iCustom(
      Symbol(),
      Period(),
      PeakPath,
      Len,
      HistoryBars,
      TF1,
      TF2,
      ModeHL,
      ModeOnline,
      ModeinFile,
      ModeHistory,
      EnableAlert,
      EnableSound,
      EnableEmail,
      GV,
      UrovenSignal,
      buffer_index,
      shift
   );

   if(MathAbs(value) > 100000000.0)
      return(EMPTY_VALUE);

   return(value);
}

bool IsDifferent(double old_value, double new_value)
{
   if(old_value == EMPTY_VALUE && new_value == EMPTY_VALUE)
      return(false);

   if(old_value == EMPTY_VALUE || new_value == EMPTY_VALUE)
      return(true);

   return(MathAbs(old_value - new_value) > ValueTolerance);
}

bool IsSignal(double value)
{
   if(value == EMPTY_VALUE)
      return(false);
   return(MathAbs(value) > ValueTolerance);
}

int FindBar(datetime bar_time)
{
   int total = ArraySize(g_times);
   for(int i = 0; i < total; i++)
   {
      if(g_times[i] == bar_time)
         return(i);
   }
   return(-1);
}

int AddBar(datetime bar_time, double value_a, double value_b)
{
   int index = ArraySize(g_times);
   ArrayResize(g_times, index + 1);
   ArrayResize(g_buffer_a, index + 1);
   ArrayResize(g_buffer_b, index + 1);
   g_times[index] = bar_time;
   g_buffer_a[index] = value_a;
   g_buffer_b[index] = value_b;
   return(index);
}

string CsvFileName()
{
   return(FilePrefix + "_" + Symbol() + "_" + IntegerToString(Period()) + ".csv");
}

string FormatPeakValue(double value)
{
   if(value == EMPTY_VALUE)
      return("EMPTY");
   return(DoubleToString(value, 8));
}

void LogRow(string event_name, datetime bar_time, int shift, double value_a, double value_b, string note)
{
   if(!WriteCsv)
      return;

   string file_name = CsvFileName();
   int handle = FileOpen(file_name, FILE_CSV | FILE_READ | FILE_WRITE | FILE_SHARE_READ | FILE_SHARE_WRITE, ';');
   if(handle == INVALID_HANDLE)
   {
      Print("AIOX Peak probe cannot open file: ", file_name, " error=", GetLastError());
      return;
   }

   if(FileSize(handle) == 0)
   {
      FileWrite(handle, "logged_at", "symbol", "period", "event", "bar_time", "shift", "buffer_a", "buffer_b", "note");
   }

   FileSeek(handle, 0, SEEK_END);
   FileWrite(
      handle,
      TimeToString(TimeCurrent(), TIME_DATE | TIME_SECONDS),
      Symbol(),
      IntegerToString(Period()),
      event_name,
      TimeToString(bar_time, TIME_DATE | TIME_MINUTES),
      IntegerToString(shift),
      FormatPeakValue(value_a),
      FormatPeakValue(value_b),
      note
   );

   FileClose(handle);
}

void ScanPeak(string trigger)
{
   int changed = 0;
   int new_signals = 0;

   for(int shift = 1; shift <= ProbeBars; shift++)
   {
      datetime bar_time = iTime(Symbol(), Period(), shift);
      if(bar_time <= 0)
         continue;

      double value_a = PeakValue(BufferA, shift);
      double value_b = PeakValue(BufferB, shift);
      int index = FindBar(bar_time);

      if(index < 0)
      {
         AddBar(bar_time, value_a, value_b);
         if(LogNewSignals && (IsSignal(value_a) || IsSignal(value_b)))
         {
            new_signals++;
            LogRow("new_signal_snapshot", bar_time, shift, value_a, value_b, trigger);
         }
         continue;
      }

      bool changed_a = IsDifferent(g_buffer_a[index], value_a);
      bool changed_b = IsDifferent(g_buffer_b[index], value_b);

      if(changed_a || changed_b)
      {
         changed++;
         LogRow("closed_bar_changed", bar_time, shift, value_a, value_b, "old_a=" + FormatPeakValue(g_buffer_a[index]) + " old_b=" + FormatPeakValue(g_buffer_b[index]) + " trigger=" + trigger);
         g_buffer_a[index] = value_a;
         g_buffer_b[index] = value_b;
      }
   }

   Print("AIOX Peak probe scan: ", trigger, " | changed closed bars=", changed, " | new signals=", new_signals, " | file=", CsvFileName());
}
