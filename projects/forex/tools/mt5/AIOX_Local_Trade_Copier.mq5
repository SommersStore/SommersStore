//+------------------------------------------------------------------+
//|                              AIOX_Local_Trade_Copier.mq5         |
//|                                  Copyright 2026, SommersStore    |
//|                                             https://sommers.store |
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, SommersStore"
#property link      "https://sommers.store"
#property version   "1.10"

#include <Trade\Trade.mqh>

enum ENUM_AIOX_COPIER_ROLE
{
   COPIER_MASTER = 0,
   COPIER_RECEIVER = 1
};

enum ENUM_AIOX_COPIER_VOLUME_MODE
{
   COPIER_FIXED_LOT = 0,
   COPIER_MULTIPLIER = 1
};

input ENUM_AIOX_COPIER_ROLE CopierRole = COPIER_RECEIVER;
input string ChannelId = "SOMMERS_PRIMARY";
input long ExpectedMasterLogin = 6275085;
input string ExpectedMasterServer = "ActivTrades-Server";
input string AllowedReceiverServer = "";
input bool RequireDemoMaster = true;
input long AllowedReceiverLogin = 0;
input bool ReceiverEnabled = false;
input long SourceMagicNumber = 888200;
input long ReceiverMagicNumber = 888210;
input ENUM_AIOX_COPIER_VOLUME_MODE VolumeMode = COPIER_FIXED_LOT;
input double FixedReceiverLot = 0.01;
input double VolumeMultiplier = 1.0;
input double MaxReceiverLot = 0.01;
input string SymbolMap = "";
input bool CopyPendingOrders = false; // Market-only default avoids independently triggered entries
input bool CopyStopLoss = true;
input bool CopyTakeProfit = true;
input int MaxHeartbeatAgeSeconds = 5;
input int TimerMilliseconds = 250;
input int MaxSlippagePoints = 20;
input string AllowedSymbols = ""; // Explicit semicolon-separated source symbols; empty blocks new exposure
input bool RequireStopLoss = true;
input bool DemoTestOnly = true; // Only master 6275085 -> FTMO 1514716800 in this rollout

struct CopierPositionState
{
   ulong sourceTicket;
   string sourceSymbol;
   ENUM_POSITION_TYPE positionType;
   double volume;
   double openPrice;
   double stopLoss;
   double takeProfit;
};

struct CopierOrderState
{
   ulong sourceTicket;
   string sourceSymbol;
   ENUM_ORDER_TYPE orderType;
   double volume;
   double price;
   double stopLoss;
   double takeProfit;
   datetime expiration;
};

CTrade copierTrade;
ulong g_sequence = 0;
ulong g_last_sequence = 0;
bool g_receiver_disabled_logged = false;
string g_session="";
string g_read_session="";
string g_last_session="";
string g_lock="";
int g_lock_file=INVALID_HANDLE;
bool g_blocked=false;
string g_status="INATIVO";

string SnapshotFileName()
{
   return("AIOX_COPIER_" + ChannelId + ".csv");
}

string SnapshotTempFileName()
{
   return("AIOX_COPIER_" + ChannelId + ".tmp");
}

string ChannelTag()
{
   uint hash=2166136261;
   string seed=ChannelId+ExpectedMasterServer+IntegerToString(ExpectedMasterLogin);
   for(int i=0;i<StringLen(seed);i++) hash=(hash^StringGetCharacter(seed,i))*16777619;
   return(StringFormat("%08X",hash));
}

string PositionComment(const ulong sourceTicket)
{
   return("AC:"+ChannelTag()+":"+IntegerToString((long)sourceTicket));
}

string OrderComment(const ulong sourceTicket)
{
   return(PositionComment(sourceTicket));
}

bool IsValidChannelId()
{
   int length = StringLen(ChannelId);
   if(length < 1 || length > 24)
      return(false);

   for(int i = 0; i < length; i++)
   {
      ushort character = StringGetCharacter(ChannelId, i);
      bool valid = (character >= 'A' && character <= 'Z') ||
                   (character >= 'a' && character <= 'z') ||
                   (character >= '0' && character <= '9') ||
                   character == '_' || character == '-';
      if(!valid)
         return(false);
   }
   return(true);
}

bool TradeSucceeded()
{
   uint retcode = copierTrade.ResultRetcode();
   return(retcode == TRADE_RETCODE_DONE || retcode == TRADE_RETCODE_PLACED || retcode == TRADE_RETCODE_DONE_PARTIAL);
}

string TradeResultText()
{
   return(IntegerToString((int)copierTrade.ResultRetcode()) + " - " + copierTrade.ResultRetcodeDescription());
}

bool ConfirmTradeResult(const bool requested, const string action)
{
   if(requested && TradeSucceeded())
   {
      Print("AIOX Copier ", action, " ok. order=", copierTrade.ResultOrder(),
            " deal=", copierTrade.ResultDeal(), " volume=", copierTrade.ResultVolume());
      return(true);
   }
   Print("AIOX Copier ", action, " failed. retcode=", TradeResultText());
   return(false);
}

bool ValidateMasterAuthorization()
{
   long login = AccountInfoInteger(ACCOUNT_LOGIN);
   if(login != ExpectedMasterLogin || AccountInfoString(ACCOUNT_SERVER)!=ExpectedMasterServer ||
      (RequireDemoMaster && AccountInfoInteger(ACCOUNT_TRADE_MODE)!=ACCOUNT_TRADE_MODE_DEMO))
   {
      Print("AIOX Copier MASTER blocked. login=", login, " expected=", ExpectedMasterLogin);
      return(false);
   }
   return(true);
}

bool ValidateReceiverAuthorization()
{
   long login = AccountInfoInteger(ACCOUNT_LOGIN);
   if(g_blocked || !ReceiverEnabled)
   {
      if(!g_receiver_disabled_logged)
      {
         Print("AIOX Copier RECEIVER inactive by configuration. login=", login);
         g_receiver_disabled_logged = true;
      }
      return(false);
   }
   if(AllowedReceiverLogin <= 0 || login != AllowedReceiverLogin ||
      AllowedReceiverServer=="" || AccountInfoString(ACCOUNT_SERVER)!=AllowedReceiverServer ||
      AccountInfoInteger(ACCOUNT_MARGIN_MODE)!=ACCOUNT_MARGIN_MODE_RETAIL_HEDGING ||
      (DemoTestOnly && (login!=1514716800 || AccountInfoInteger(ACCOUNT_TRADE_MODE)!=ACCOUNT_TRADE_MODE_DEMO)))
   {
      Print("AIOX Copier RECEIVER blocked by login allowlist. login=", login,
            " allowed=", AllowedReceiverLogin);
      return(false);
   }
   if(!TerminalInfoInteger(TERMINAL_CONNECTED) || !TerminalInfoInteger(TERMINAL_TRADE_ALLOWED) || !MQLInfoInteger(MQL_TRADE_ALLOWED) ||
      !AccountInfoInteger(ACCOUNT_TRADE_ALLOWED) || !AccountInfoInteger(ACCOUNT_TRADE_EXPERT))
   {
      Print("AIOX Copier RECEIVER blocked because EA trading is not allowed.");
      return(false);
   }
   return(true);
}

int VolumeDigits(const double step)
{
   int digits=0; double current=step;
   while(digits<8 && MathAbs(current-MathRound(current))>1e-8){current*=10;digits++;}
   return(digits);
}

double DesiredReceiverVolume(const string symbol, const double sourceVolume)
{
   double rawVolume = (VolumeMode == COPIER_FIXED_LOT) ? FixedReceiverLot : sourceVolume * VolumeMultiplier;
   double minVolume = SymbolInfoDouble(symbol, SYMBOL_VOLUME_MIN);
   double maxVolume = SymbolInfoDouble(symbol, SYMBOL_VOLUME_MAX);
   double step = SymbolInfoDouble(symbol, SYMBOL_VOLUME_STEP);

   if(rawVolume <= 0 || MaxReceiverLot <= 0 || rawVolume > MaxReceiverLot + 1e-8)
      return(0);
   if(minVolume <= 0 || maxVolume <= 0 || step <= 0)
      return(0);

   double normalized = MathFloor(rawVolume / step + 1e-8) * step;
   normalized = NormalizeDouble(normalized, VolumeDigits(step));
   if(normalized < minVolume || normalized > maxVolume || normalized > MaxReceiverLot + 1e-8)
      return(0);
   return(normalized);
}

string Trim(const string value)
{
   string result = value;
   StringTrimLeft(result);
   StringTrimRight(result);
   return(result);
}

string MapSymbol(const string sourceSymbol)
{
   string entries[];
   int count = StringSplit(SymbolMap, ';', entries);
   for(int i = 0; i < count; i++)
   {
      string pair[];
      if(StringSplit(entries[i], '=', pair) != 2)
         continue;
      if(Trim(pair[0]) == sourceSymbol)
         return(Trim(pair[1]));
   }
   return(sourceSymbol);
}

bool SourcePositionInScope()
{
   return(PositionGetInteger(POSITION_MAGIC) == SourceMagicNumber);
}

bool SourceOrderInScope()
{
   return(OrderGetInteger(ORDER_MAGIC) == SourceMagicNumber);
}

bool ReceiverPositionInScope()
{
   if(PositionGetInteger(POSITION_MAGIC) != ReceiverMagicNumber) return(false);
   return(StringFind(PositionGetString(POSITION_COMMENT),"AC:"+ChannelTag()+":")==0);
}

bool ReceiverOrderInScope()
{
   return(OrderGetInteger(ORDER_MAGIC)==ReceiverMagicNumber &&
          StringFind(OrderGetString(ORDER_COMMENT),"AC:"+ChannelTag()+":")==0);
}

int CountSourcePositions()
{
   int count = 0;
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(PositionGetTicket(i) > 0 && SourcePositionInScope())
         count++;
   }
   return(count);
}

int CountSourceOrders()
{
   int count = 0;
   if(!CopyPendingOrders)
      return(0);
   for(int i = OrdersTotal() - 1; i >= 0; i--)
   {
      if(OrderGetTicket(i) > 0 && SourceOrderInScope())
         count++;
   }
   return(count);
}

bool PublishSnapshot()
{
   if(!ValidateMasterAuthorization() || !TerminalInfoInteger(TERMINAL_CONNECTED))
      return(false);

   g_sequence++;
   string temporaryFile = SnapshotTempFileName();
   int handle = FileOpen(temporaryFile,
                         FILE_WRITE | FILE_CSV | FILE_ANSI | FILE_COMMON | FILE_SHARE_READ,
                         ';');
   if(handle == INVALID_HANDLE)
   {
      Print("AIOX Copier snapshot open failed. error=", GetLastError());
      return(false);
   }

   FileWrite(handle, "META", 2, ChannelId, AccountInfoInteger(ACCOUNT_LOGIN),
             g_sequence, TimeLocal(), SourceMagicNumber, CountSourcePositions(), CountSourceOrders(),
              AccountInfoString(ACCOUNT_SERVER),g_session);

   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong ticket = PositionGetTicket(i);
      if(ticket == 0 || !SourcePositionInScope())
         continue;
      FileWrite(handle, "P", (ulong)PositionGetInteger(POSITION_IDENTIFIER), PositionGetString(POSITION_SYMBOL),
                PositionGetInteger(POSITION_TYPE), PositionGetDouble(POSITION_VOLUME),
                PositionGetDouble(POSITION_PRICE_OPEN), PositionGetDouble(POSITION_SL),
                PositionGetDouble(POSITION_TP));
   }

   if(CopyPendingOrders)
   {
      for(int i = OrdersTotal() - 1; i >= 0; i--)
      {
         ulong ticket = OrderGetTicket(i);
         if(ticket == 0 || !SourceOrderInScope())
            continue;
         FileWrite(handle, "O", ticket, OrderGetString(ORDER_SYMBOL),
                   OrderGetInteger(ORDER_TYPE), OrderGetDouble(ORDER_VOLUME_CURRENT),
                   OrderGetDouble(ORDER_PRICE_OPEN), OrderGetDouble(ORDER_SL),
                   OrderGetDouble(ORDER_TP), OrderGetInteger(ORDER_TIME_EXPIRATION));
      }
   }

   FileWrite(handle, "END", g_sequence);
   FileFlush(handle);
   FileClose(handle);

   ResetLastError();
   if(!FileMove(temporaryFile, FILE_COMMON, SnapshotFileName(), FILE_COMMON | FILE_REWRITE))
   {
      Print("AIOX Copier snapshot publish failed. error=", GetLastError());
      FileDelete(temporaryFile, FILE_COMMON);
      return(false);
   }
   return(true);
}

bool ReadSnapshot(CopierPositionState &positions[], CopierOrderState &orders[], ulong &sequence,
                  datetime &heartbeat, long &masterLogin)
{
   ArrayResize(positions, 0);
   ArrayResize(orders, 0);
   int handle = FileOpen(SnapshotFileName(),
                         FILE_READ | FILE_CSV | FILE_ANSI | FILE_COMMON | FILE_SHARE_READ,
                         ';');
   if(handle == INVALID_HANDLE)
      return(false);

   string rowType = FileReadString(handle);
   int version = (int)FileReadNumber(handle);
   string channel = FileReadString(handle);
   masterLogin = (long)FileReadNumber(handle);
   sequence = (ulong)StringToInteger(FileReadString(handle));
   heartbeat = (datetime)FileReadNumber(handle);
   long sourceMagic = (long)FileReadNumber(handle);
   int declaredPositions = (int)FileReadNumber(handle);
   int declaredOrders = (int)FileReadNumber(handle);
   string masterServer=FileReadString(handle);
   g_read_session=FileReadString(handle);

   if(rowType != "META" || version != 2 || channel != ChannelId || sourceMagic != SourceMagicNumber ||
      masterServer!=ExpectedMasterServer || g_read_session=="" ||
      declaredPositions<0 || declaredOrders<0 || declaredPositions+declaredOrders>2000)
   {
      FileClose(handle);
      return(false);
   }

   bool complete = false;
   ulong trailerSequence = 0;
   int rows=0;
   while(!FileIsEnding(handle) && rows++ <= declaredPositions+declaredOrders)
   {
      rowType = FileReadString(handle);
      if(rowType == "P")
      {
         int index = ArraySize(positions);
         ArrayResize(positions, index + 1);
         positions[index].sourceTicket = (ulong)StringToInteger(FileReadString(handle));
         positions[index].sourceSymbol = FileReadString(handle);
         positions[index].positionType = (ENUM_POSITION_TYPE)FileReadNumber(handle);
         positions[index].volume = FileReadNumber(handle);
         positions[index].openPrice = FileReadNumber(handle);
         positions[index].stopLoss = FileReadNumber(handle);
         positions[index].takeProfit = FileReadNumber(handle);
      }
      else if(rowType == "O")
      {
         int index = ArraySize(orders);
         ArrayResize(orders, index + 1);
         orders[index].sourceTicket = (ulong)StringToInteger(FileReadString(handle));
         orders[index].sourceSymbol = FileReadString(handle);
         orders[index].orderType = (ENUM_ORDER_TYPE)FileReadNumber(handle);
         orders[index].volume = FileReadNumber(handle);
         orders[index].price = FileReadNumber(handle);
         orders[index].stopLoss = FileReadNumber(handle);
         orders[index].takeProfit = FileReadNumber(handle);
         orders[index].expiration = (datetime)FileReadNumber(handle);
      }
      else if(rowType == "END")
      {
         trailerSequence = (ulong)StringToInteger(FileReadString(handle));
         complete = true;
         break;
      }
      else
      {
         break;
      }
   }
   FileClose(handle);

   return(complete && trailerSequence == sequence &&
          ArraySize(positions) == declaredPositions && ArraySize(orders) == declaredOrders);
}

bool ValidateSnapshot(CopierPositionState &positions[], CopierOrderState &orders[],
                      const datetime heartbeat, const long masterLogin)
{
   if(masterLogin != ExpectedMasterLogin)
   {
      Print("AIOX Copier snapshot rejected: master login mismatch. got=", masterLogin,
            " expected=", ExpectedMasterLogin);
      return(false);
   }

   long heartbeatAge = (long)(TimeLocal() - heartbeat);
   if(heartbeatAge < 0 || heartbeatAge > MaxHeartbeatAgeSeconds)
   {
      Print("AIOX Copier snapshot rejected: stale heartbeat age=", heartbeatAge, "s");
      return(false);
   }

   for(int i=0;i<ArraySize(positions);i++)
   {
      if(positions[i].sourceTicket==0 || positions[i].volume<=0 || positions[i].sourceSymbol=="" ||
         positions[i].positionType<POSITION_TYPE_BUY || positions[i].positionType>POSITION_TYPE_SELL ||
         !MathIsValidNumber(positions[i].volume) || !MathIsValidNumber(positions[i].stopLoss) ||
         !MathIsValidNumber(positions[i].takeProfit)) return(false);
      for(int j=0;j<i;j++) if(positions[j].sourceTicket==positions[i].sourceTicket) return(false);
   }
   for(int i=0;i<ArraySize(orders);i++)
   {
      if(orders[i].sourceTicket==0 || orders[i].volume<=0 || orders[i].price<=0 ||
         orders[i].orderType<ORDER_TYPE_BUY_LIMIT || orders[i].orderType>ORDER_TYPE_SELL_STOP ||
         !MathIsValidNumber(orders[i].volume)) return(false);
      for(int j=0;j<i;j++) if(orders[j].sourceTicket==orders[i].sourceTicket) return(false);
   }
   return(true);
}

bool SnapshotHasPosition(CopierPositionState &positions[], const string comment)
{
   for(int i = 0; i < ArraySize(positions); i++)
      if(PositionComment(positions[i].sourceTicket) == comment)
         return(true);
   return(false);
}

bool SnapshotHasOrder(CopierOrderState &orders[], const string comment)
{
   for(int i = 0; i < ArraySize(orders); i++)
      if(OrderComment(orders[i].sourceTicket) == comment)
         return(true);
   return(false);
}

ulong FindReceiverPosition(const string comment)
{
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong ticket = PositionGetTicket(i);
      if(ticket > 0 && ReceiverPositionInScope() && PositionGetString(POSITION_COMMENT) == comment)
         return(ticket);
   }
   return(0);
}

ulong FindReceiverOrder(const string comment)
{
   for(int i = OrdersTotal() - 1; i >= 0; i--)
   {
      ulong ticket = OrderGetTicket(i);
      if(ticket > 0 && ReceiverOrderInScope() && OrderGetString(ORDER_COMMENT) == comment)
         return(ticket);
   }
   return(0);
}

bool CloseReceiverPosition(const ulong ticket)
{
   return(ConfirmTradeResult(copierTrade.PositionClose(ticket),
                             "close position #" + IntegerToString((long)ticket)));
}

void CloseStaleReceiverPositions(CopierPositionState &positions[], CopierOrderState &orders[])
{
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong ticket = PositionGetTicket(i);
      if(ticket == 0 || !ReceiverPositionInScope())
         continue;
      string comment = PositionGetString(POSITION_COMMENT);
      if(!SnapshotHasPosition(positions, comment) && !SnapshotHasOrder(orders, comment))
         CloseReceiverPosition(ticket);
   }
}

void DeleteStaleReceiverOrders(CopierOrderState &orders[])
{
   for(int i = OrdersTotal() - 1; i >= 0; i--)
   {
      ulong ticket = OrderGetTicket(i);
      if(ticket == 0 || !ReceiverOrderInScope())
         continue;
      string comment = OrderGetString(ORDER_COMMENT);
      if(!SnapshotHasOrder(orders, comment))
         ConfirmTradeResult(copierTrade.OrderDelete(ticket),
                            "delete order #" + IntegerToString((long)ticket));
   }
}

void DesiredStops(const CopierPositionState &source, const string symbol, double &stopLoss, double &takeProfit)
{
   // Absolute source levels remain stable while quotes move. Symbol maps must represent the same price scale.
   double tick=SymbolInfoDouble(symbol,SYMBOL_TRADE_TICK_SIZE);
   int digits=(int)SymbolInfoInteger(symbol,SYMBOL_DIGITS);
   stopLoss=CopyStopLoss ? source.stopLoss : 0;
   takeProfit=CopyTakeProfit ? source.takeProfit : 0;
   if(tick>0)
   {
      if(stopLoss>0) stopLoss=NormalizeDouble(MathRound(stopLoss/tick)*tick,digits);
      if(takeProfit>0) takeProfit=NormalizeDouble(MathRound(takeProfit/tick)*tick,digits);
   }
}

bool OpenReceiverPosition(const CopierPositionState &source, const double volume)
{
   string symbol=MapSymbol(source.sourceSymbol);
   double sl=0,tp=0; DesiredStops(source,symbol,sl,tp);
   if(volume<=0 || !StopsValid(symbol,source.positionType,sl,tp)) return(false);
   copierTrade.SetTypeFillingBySymbol(symbol);
   // Persist intent before sending. An ambiguous result must never cause a blind retry.
   GlobalVariableSet(StateKey(source.sourceTicket,"I"),1); GlobalVariablesFlush();
   bool requested=source.positionType==POSITION_TYPE_BUY ?
      copierTrade.Buy(volume,symbol,0,sl,tp,PositionComment(source.sourceTicket)) :
      copierTrade.Sell(volume,symbol,0,sl,tp,PositionComment(source.sourceTicket));
   bool success=ConfirmTradeResult(requested,"open "+symbol);
   uint code=copierTrade.ResultRetcode();
   if(code==TRADE_RETCODE_TIMEOUT || code==TRADE_RETCODE_CONNECTION || code==TRADE_RETCODE_PLACED)
   {g_blocked=true;g_status="RESULTADO INCERTO - REVISAR LOG";return(false);}
   GlobalVariableDel(StateKey(source.sourceTicket,"I"));
   if(success) GlobalVariableSet(StateKey(source.sourceTicket,"E"),1);
   GlobalVariablesFlush();
   return(success);
}

void SyncReceiverPositions(CopierPositionState &positions[])
{
   for(int i=0;i<ArraySize(positions) && !g_blocked;i++)
   {
      CopierPositionState source=positions[i];
      if(!CanUseSymbol(source.sourceSymbol)) {g_status="SIMBOLO NAO AUTORIZADO";continue;}
      string symbol=MapSymbol(source.sourceSymbol),comment=PositionComment(source.sourceTicket);
      double target=ScaledVolume(source.sourceTicket,symbol,source.volume);
      if(target<0) {g_status="VOLUME BLOQUEADO";continue;}
      ulong pending=FindReceiverOrder(comment);
      if(pending>0 && !ConfirmTradeResult(copierTrade.OrderDelete(pending),"pending transition")) continue;
      double actual=0; bool wrongDirection=false;
      for(int j=PositionsTotal()-1;j>=0;j--)
      {
         ulong ticket=PositionGetTicket(j);
         if(ticket==0 || !ReceiverPositionInScope() || PositionGetString(POSITION_COMMENT)!=comment) continue;
         if(PositionGetString(POSITION_SYMBOL)!=symbol) {g_blocked=true;g_status="MAPA ALTERADO COM POSICAO ABERTA";break;}
         actual+=PositionGetDouble(POSITION_VOLUME);
         if(PositionGetInteger(POSITION_TYPE)!=source.positionType) wrongDirection=true;
      }
      if(g_blocked) break;
      if(GlobalVariableCheck(StateKey(source.sourceTicket,"I")))
      {g_blocked=true;g_status="INTENCAO PENDENTE - AUDITORIA NECESSARIA";break;}
      if(actual>0) GlobalVariableSet(StateKey(source.sourceTicket,"E"),1);
      // Receiver SL/TP or manual close is final for this source lifecycle; never reopen automatically.
      if(actual==0 && GlobalVariableCheck(StateKey(source.sourceTicket,"E"))) continue;
      double step=SymbolInfoDouble(symbol,SYMBOL_VOLUME_STEP);
      if(wrongDirection || actual>target+step*0.5)
      {
         double remaining=wrongDirection ? actual : actual-target;
         for(int j=PositionsTotal()-1;j>=0 && remaining>step*0.5;j--)
         {
            ulong ticket=PositionGetTicket(j);
            if(ticket==0 || !ReceiverPositionInScope() || PositionGetString(POSITION_COMMENT)!=comment) continue;
            double before=PositionGetDouble(POSITION_VOLUME), reduction=MathMin(before,remaining);
            reduction=NormalizeDouble(reduction,VolumeDigits(step));
            if(!ReducePosition(ticket,reduction)) break;
            double after=PositionSelectByTicket(ticket) ? PositionGetDouble(POSITION_VOLUME) : 0;
            remaining-=before-after;
         }
         // Reversal requires a fresh observed flat state; no close-and-open in one pass.
         if(wrongDirection && remaining<=step*0.5)
            GlobalVariableDel(StateKey(source.sourceTicket,"E"));
         continue;
      }
      if(actual<target-step*0.5)
      {
         double additional=NormalizeDouble(target-actual,VolumeDigits(step));
         if(additional>=SymbolInfoDouble(symbol,SYMBOL_VOLUME_MIN)) OpenReceiverPosition(source,additional);
      }
      double sl=0,tp=0; DesiredStops(source,symbol,sl,tp);
      if(!StopsValid(symbol,source.positionType,sl,tp)) continue;
      for(int j=PositionsTotal()-1;j>=0;j--)
      {
         ulong ticket=PositionGetTicket(j);
         if(ticket==0 || !ReceiverPositionInScope() || PositionGetString(POSITION_COMMENT)!=comment) continue;
         double desiredSL=CopyStopLoss ? sl : PositionGetDouble(POSITION_SL);
         double desiredTP=CopyTakeProfit ? tp : PositionGetDouble(POSITION_TP);
         double point=SymbolInfoDouble(symbol,SYMBOL_POINT);
         if(MathAbs(PositionGetDouble(POSITION_SL)-desiredSL)>point*0.5 ||
            MathAbs(PositionGetDouble(POSITION_TP)-desiredTP)>point*0.5)
            ConfirmTradeResult(copierTrade.PositionModify(ticket,desiredSL,desiredTP),"sync SL/TP");
      }
   }
}

bool PendingOrderMatches(const CopierOrderState &source, const ulong ticket)
{
   if(!OrderSelect(ticket))
      return(false);
   string symbol = MapSymbol(source.sourceSymbol);
   double point = SymbolInfoDouble(symbol, SYMBOL_POINT);
   double volume = DesiredReceiverVolume(symbol, source.volume);
   return(OrderGetInteger(ORDER_TYPE) == source.orderType &&
          MathAbs(OrderGetDouble(ORDER_VOLUME_CURRENT) - volume) < SymbolInfoDouble(symbol, SYMBOL_VOLUME_STEP) * 0.5 &&
          MathAbs(OrderGetDouble(ORDER_PRICE_OPEN) - source.price) <= point &&
          MathAbs(OrderGetDouble(ORDER_SL) - source.stopLoss) <= point &&
          MathAbs(OrderGetDouble(ORDER_TP) - source.takeProfit) <= point);
}

bool PlaceReceiverOrder(const CopierOrderState &source)
{
   string symbol = MapSymbol(source.sourceSymbol);
   double volume = ScaledVolume(source.sourceTicket,symbol,source.volume);
   if(volume<=0 || (RequireStopLoss && source.stopLoss<=0)) return(false);
   int digits = (int)SymbolInfoInteger(symbol, SYMBOL_DIGITS);
   double price = NormalizeDouble(source.price, digits);
   double stopLoss = CopyStopLoss ? NormalizeDouble(source.stopLoss, digits) : 0;
   double takeProfit = CopyTakeProfit ? NormalizeDouble(source.takeProfit, digits) : 0;
   ENUM_ORDER_TYPE_TIME timeType = source.expiration > 0 ? ORDER_TIME_SPECIFIED : ORDER_TIME_GTC;
   string comment = OrderComment(source.sourceTicket);
   bool requested = false;

   copierTrade.SetTypeFillingBySymbol(symbol);
   if(source.orderType == ORDER_TYPE_BUY_STOP)
      requested = copierTrade.BuyStop(volume, price, symbol, stopLoss, takeProfit, timeType, source.expiration, comment);
   else if(source.orderType == ORDER_TYPE_SELL_STOP)
      requested = copierTrade.SellStop(volume, price, symbol, stopLoss, takeProfit, timeType, source.expiration, comment);
   else if(source.orderType == ORDER_TYPE_BUY_LIMIT)
      requested = copierTrade.BuyLimit(volume, price, symbol, stopLoss, takeProfit, timeType, source.expiration, comment);
   else if(source.orderType == ORDER_TYPE_SELL_LIMIT)
      requested = copierTrade.SellLimit(volume, price, symbol, stopLoss, takeProfit, timeType, source.expiration, comment);
   else
      return(false);

   return(ConfirmTradeResult(requested, "place pending from #" + IntegerToString((long)source.sourceTicket)));
}

void SyncReceiverOrders(CopierOrderState &orders[])
{
   if(!CopyPendingOrders)
      return;

   for(int i = 0; i < ArraySize(orders); i++)
   {
      if(!CanUseSymbol(orders[i].sourceSymbol)) continue;
      string comment = OrderComment(orders[i].sourceTicket);
      if(FindReceiverPosition(comment)>0 || GlobalVariableCheck(StateKey(orders[i].sourceTicket,"E"))) continue;
      ulong ticket = FindReceiverOrder(comment);
      if(ticket > 0 && !PendingOrderMatches(orders[i], ticket))
      {
         if(ConfirmTradeResult(copierTrade.OrderDelete(ticket),
                               "refresh pending #" + IntegerToString((long)ticket)))
            ticket = 0;
      }
      if(ticket == 0)
         PlaceReceiverOrder(orders[i]);
   }
}

void ReconcileReceiver()
{
   if(!ValidateReceiverAuthorization())
      return;

   CopierPositionState positions[];
   CopierOrderState orders[];
   ulong sequence = 0;
   datetime heartbeat = 0;
   long masterLogin = 0;
   if(!ReadSnapshot(positions, orders, sequence, heartbeat, masterLogin))
   {g_status="SEM SNAPSHOT VALIDO";return;}
   if(g_read_session==g_last_session && sequence <= g_last_sequence)
      return;
   if(!ValidateSnapshot(positions, orders, heartbeat, masterLogin))
   {g_status="SNAPSHOT REJEITADO";return;}

   CloseStaleReceiverPositions(positions,orders);
   DeleteStaleReceiverOrders(orders);
   SyncReceiverPositions(positions);
   SyncReceiverOrders(orders);
   g_last_sequence = sequence;
   g_last_session=g_read_session;
   if(!g_blocked) g_status="ATIVO  |  HEARTBEAT OK  |  POS "+IntegerToString(ArraySize(positions));
}

int OnInit()
{
   if(!IsValidChannelId())
   {
      Print("AIOX Copier initialization failed: ChannelId must contain only letters, numbers, underscore or hyphen.");
      return(INIT_PARAMETERS_INCORRECT);
   }

   if(SourceMagicNumber<=0 || ReceiverMagicNumber<=0 || MaxReceiverLot<=0 ||
      MaxHeartbeatAgeSeconds<1 || MaxSlippagePoints<0 || ExpectedMasterLogin<=0 ||
      ExpectedMasterServer=="" || (RequireStopLoss && !CopyStopLoss)) return(INIT_PARAMETERS_INCORRECT);
   g_session=IntegerToString((long)TimeLocal())+"-"+IntegerToString((long)GetMicrosecondCount());
   // Exclusive file handle prevents two instances on the same terminal/channel.
   g_lock="AIOX_COPIER_LOCK_"+ChannelTag()+"_"+IntegerToString(AccountInfoInteger(ACCOUNT_LOGIN))+".lock";
   g_lock_file=FileOpen(g_lock,FILE_WRITE|FILE_BIN);
   if(g_lock_file==INVALID_HANDLE) {Print("AIOX Copier duplicate instance blocked.");return(INIT_FAILED);}
   copierTrade.SetExpertMagicNumber(ReceiverMagicNumber);
   copierTrade.SetDeviationInPoints(MaxSlippagePoints);
   copierTrade.SetAsyncMode(false);

   if(CopierRole == COPIER_MASTER && !ValidateMasterAuthorization())
      return(INIT_PARAMETERS_INCORRECT);
   if(CopierRole == COPIER_RECEIVER && AllowedReceiverLogin > 0 &&
      AccountInfoInteger(ACCOUNT_LOGIN) != AllowedReceiverLogin)
   {
      Print("AIOX Copier receiver attached to an unauthorized login.");
      return(INIT_PARAMETERS_INCORRECT);
   }

   EventSetMillisecondTimer(MathMax(100, TimerMilliseconds));
   Print("AIOX Copier initialized. role=", CopierRole == COPIER_MASTER ? "MASTER" : "RECEIVER",
         " login=", AccountInfoInteger(ACCOUNT_LOGIN), " channel=", ChannelId,
         " enabled=", ReceiverEnabled ? "true" : "false");
   if(CopierRole == COPIER_MASTER)
      PublishSnapshot();
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   EventKillTimer();
   if(g_lock_file!=INVALID_HANDLE) FileClose(g_lock_file);
   Comment("");
}

void OnTimer()
{
   if(CopierRole==COPIER_MASTER)
      g_status=PublishSnapshot() ? "PUBLICANDO  /  SOMENTE LEITURA" : "MASTER DESCONECTADA OU BLOQUEADA";
   else ReconcileReceiver();
   DisplayStatus();
}

void OnTradeTransaction(const MqlTradeTransaction &transaction,
                        const MqlTradeRequest &request,
                        const MqlTradeResult &result)
{
   if(CopierRole == COPIER_MASTER)
      PublishSnapshot();
}

string StateKey(const ulong id,const string suffix)
{
   return("AC_"+IntegerToString(AccountInfoInteger(ACCOUNT_LOGIN))+"_"+ChannelTag()+"_"+
          IntegerToString(ReceiverMagicNumber)+"_"+IntegerToString((long)id)+suffix);
}
bool AllowedSymbol(const string symbol)
{
   string symbols[]; int n=StringSplit(AllowedSymbols,';',symbols);
   for(int i=0;i<n;i++) if(Trim(symbols[i])==symbol) return(true);
   return(false);
}
bool CanUseSymbol(const string source)
{
   string symbol=MapSymbol(source);
   return(AllowedSymbol(source) && symbol!="" && SymbolSelect(symbol,true) &&
          SymbolInfoDouble(symbol,SYMBOL_VOLUME_STEP)>0);
}
double ScaledVolume(const ulong id,const string symbol,const double sourceVolume)
{
   string key=StateKey(id,"S");
   if(!GlobalVariableCheck(key))
   {
      double initial=DesiredReceiverVolume(symbol,sourceVolume);
      if(initial<=0) return(-1);
      GlobalVariableSet(key,sourceVolume);
      GlobalVariableSet(StateKey(id,"V"),initial);
      GlobalVariablesFlush();
   }
   double base=GlobalVariableGet(key), initial=GlobalVariableGet(StateKey(id,"V"));
   if(base<=0 || initial<=0) return(-1);
   double rawVolume=VolumeMode==COPIER_FIXED_LOT ? initial*sourceVolume/base : sourceVolume*VolumeMultiplier;
   double step=SymbolInfoDouble(symbol,SYMBOL_VOLUME_STEP);
   if(step<=0 || rawVolume > MaxReceiverLot+1e-8 || rawVolume<0) return(-1);
   double target=NormalizeDouble(MathFloor(rawVolume/step+1e-8)*step,VolumeDigits(step));
   if(target<SymbolInfoDouble(symbol,SYMBOL_VOLUME_MIN)) return(0);
   if(target>SymbolInfoDouble(symbol,SYMBOL_VOLUME_MAX)) return(-1);
   return(target);
}
bool StopsValid(const string symbol,const ENUM_POSITION_TYPE type,const double sl,const double tp)
{
   MqlTick tick={};
   if(!SymbolInfoTick(symbol,tick) || tick.bid<=0 || tick.ask<=0) return(false);
   double distance=MathMax(SymbolInfoInteger(symbol,SYMBOL_TRADE_STOPS_LEVEL),
                           SymbolInfoInteger(symbol,SYMBOL_TRADE_FREEZE_LEVEL))*SymbolInfoDouble(symbol,SYMBOL_POINT);
   if(RequireStopLoss && sl<=0) return(false);
   if(type==POSITION_TYPE_BUY)
      return((sl==0 || sl<tick.bid-distance) && (tp==0 || tp>tick.bid+distance));
   return((sl==0 || sl>tick.ask+distance) && (tp==0 || tp<tick.ask-distance));
}
bool ReducePosition(const ulong ticket,const double volume)
{
   if(!PositionSelectByTicket(ticket)) return(false);
   string symbol=PositionGetString(POSITION_SYMBOL);
   copierTrade.SetTypeFillingBySymbol(symbol);
   double current=PositionGetDouble(POSITION_VOLUME), step=SymbolInfoDouble(symbol,SYMBOL_VOLUME_STEP);
   if(volume>=current-step*0.5) return(CloseReceiverPosition(ticket));
   if(volume<SymbolInfoDouble(symbol,SYMBOL_VOLUME_MIN)) return(false);
   return(ConfirmTradeResult(copierTrade.PositionClosePartial(ticket,volume,MaxSlippagePoints),"partial reduction"));
}
void DisplayStatus()
{
   string text="AIOX COPIER 1.10  |  "+(CopierRole==COPIER_MASTER ? "MASTER" : "RECEIVER")+
      "\n"+IntegerToString(AccountInfoInteger(ACCOUNT_LOGIN))+"  /  "+ChannelId+
      "\n"+g_status;
   Comment(text);
}
