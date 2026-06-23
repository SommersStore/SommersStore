#property strict
#property script_show_inputs

input bool DryRun = false;
input bool Verbose = true;
input string ElliottPrefix = "AIOX_ELLIOTT_";
input string DowH1Prefix = "AIOX_DOW_H1_";
input string DowM15Prefix = "AIOX_DOW_M15_";
input string DowM5Prefix = "AIOX_DOW_M5_";
input string KeepAllPrefix = "AIOX_KEEP_ALL_";

bool StartsWithPrefix(string value, string prefix)
{
   if(StringLen(prefix) <= 0)
      return(false);
   return(StringFind(value, prefix, 0) == 0);
}

int ApplyPrefix(string prefix, long flags, string label)
{
   int changed = 0;
   int matched = 0;
   int total = ObjectsTotal(0, -1, -1);

   for(int i = total - 1; i >= 0; i--)
   {
      string name = ObjectName(0, i, -1, -1);
      if(!StartsWithPrefix(name, prefix))
         continue;

      matched++;
      long current = ObjectGetInteger(0, name, OBJPROP_TIMEFRAMES);

      if(current != flags)
      {
         changed++;
         if(!DryRun)
            ObjectSetInteger(0, name, OBJPROP_TIMEFRAMES, flags);
      }

      if(Verbose)
         Print(label, " | ", name, " | flags ", current, " -> ", flags, DryRun ? " | dry run" : "");
   }

   if(Verbose && matched == 0)
      Print(label, " | nenhum objeto encontrado com prefixo ", prefix);

   return(changed);
}

void OnStart()
{
   long elliottFlags = OBJ_PERIOD_H4 | OBJ_PERIOD_H1;
   long dowH1Flags = OBJ_PERIOD_H1 | OBJ_PERIOD_M15 | OBJ_PERIOD_M5;
   long dowM15Flags = OBJ_PERIOD_M15 | OBJ_PERIOD_M5;
   long dowM5Flags = OBJ_PERIOD_M5;
   long keepAllFlags = OBJ_ALL_PERIODS;

   int changed = 0;
   changed += ApplyPrefix(ElliottPrefix, elliottFlags, "Elliott H4/H1");
   changed += ApplyPrefix(DowH1Prefix, dowH1Flags, "Dow H1 -> H1/M15/M5");
   changed += ApplyPrefix(DowM15Prefix, dowM15Flags, "Dow M15 -> M15/M5");
   changed += ApplyPrefix(DowM5Prefix, dowM5Flags, "Dow M5 -> M5");
   changed += ApplyPrefix(KeepAllPrefix, keepAllFlags, "Keep all");

   if(!DryRun)
      ChartRedraw(0);

   Print("AIOX visibility finished. Changed objects: ", changed, DryRun ? " | dry run only" : "");
}
