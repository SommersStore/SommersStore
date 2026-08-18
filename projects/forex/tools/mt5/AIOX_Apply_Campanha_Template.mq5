//+------------------------------------------------------------------+
//|                      AIOX_Apply_Campanha_Template.mq5             |
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, SommersStore"
#property version   "1.00"
#property script_show_inputs

input string TemplatePath = "\\Profiles\\Templates\\AIOX_Campanha_3por1_MT5.tpl";

void OnStart()
{
   ResetLastError();
   if(!ChartApplyTemplate(0, TemplatePath))
   {
      Print("AIOX: falha ao aplicar template ", TemplatePath,
            "; erro=", GetLastError());
      return;
   }

   Print("AIOX: template solicitado com sucesso: ", TemplatePath);
   ChartRedraw(0);
}
