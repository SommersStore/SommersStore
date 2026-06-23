import com.dukascopy.api.*;
import java.util.List;
import java.util.UUID;

/**
 * Strategy: AIOX Campanha 3 por 1 (JForex v3)
 *
 * Money Management rules:
 * - Level 1: Risk 1% of account balance, Target 1.6R (Reward = 1.6 * Risk).
 * - Level 2 (only after win in Level 1): Risk 2% of account balance, Target 1.6R.
 * - Level 3 (only after win in Level 2): Risk 4% of account balance, Target 1.6R.
 * - Any loss resets the sequence to Level 1.
 * - Completing Level 3 successfully resets the sequence to Level 1.
 *
 * Technical Entry Rules (Campanha 3 por 1 playbook):
 * - H4 EMA Trend: Price above EMA 20, EMA 50, and EMA 200 for BUY; below for SELL.
 * - H1 EMA Trend: Aligned with H4.
 * - M15 RSI (14) validation: RSI > 50 for BUY, RSI < 50 for SELL.
 * - M5 Execution: precise market order with Stop Loss at 1.5 * ATR (M15) and Take Profit at 1.6 * SL distance.
 */
public class AIOX_Campanha_3por1_JForex implements IStrategy {

    private IEngine engine;
    private IConsole console;
    private IHistory history;
    private IIndicators indicators;
    private IAccount account;

    // Configurable Parameters
    @Configurable("Instrument")
    public Instrument instrument = Instrument.EURUSD;
    @Configurable("H4 Period")
    public Period h4Period = Period.FOUR_HOURS;
    @Configurable("H1 Period")
    public Period h1Period = Period.ONE_HOUR;
    @Configurable("M15 Period")
    public Period m15Period = Period.fifteenMin();
    @Configurable("M5 Period")
    public Period m5Period = Period.fiveMin();

    @Configurable("EMA Fast (Trend)")
    public int emaFast = 20;
    @Configurable("EMA Medium (Trend)")
    public int emaMedium = 50;
    @Configurable("EMA Slow (Trend)")
    public int emaSlow = 200;
    @Configurable("RSI Period")
    public int rsiPeriod = 14;
    @Configurable("ATR Period")
    public int atrPeriod = 14;

    @Configurable("Max Slippage (Pips)")
    public double maxSlippage = 2.0;

    // State Variables
    private int currentLevel = 1; // 1, 2, 3
    private IOrder activeOrder = null;
    private String lastOrderLabel = "";

    @Override
    public void onStart(IContext context) throws JFException {
        this.engine = context.getEngine();
        this.console = context.getConsole();
        this.history = context.getHistory();
        this.indicators = context.getIndicators();
        this.account = context.getAccount();

        console.getOut().println(">>> AIOX Campanha 3 por 1 Strategy Started successfully! <<<");
        console.getOut().println("Instrument: " + instrument);
        console.getOut().println("Initial Campaign Level: " + currentLevel + " (Risk: " + getRiskPercent(currentLevel) + "%)");
    }

    @Override
    public void onStop() throws JFException {
        console.getOut().println(">>> AIOX Campanha 3 por 1 Strategy Stopped. <<<");
    }

    @Override
    public void onTick(Instrument instrument, ITick tick) throws JFException {
        // We evaluate entries on new bar events rather than every tick to avoid overhead
    }

    @Override
    public void onBar(Instrument instrument, Period period, IBar askBar, IBar bidBar) throws JFException {
        if (!instrument.equals(this.instrument)) {
            return;
        }

        // We run entry logic on the execution timeframe (M5) bar close
        if (period.equals(m5Period)) {
            checkActiveOrderState();
            if (activeOrder == null) {
                evaluateEntrySignals();
            }
        }
    }

    @Override
    public void onMessage(IMessage message) throws JFException {
        IOrder order = message.getOrder();
        if (order == null || !order.getLabel().equals(lastOrderLabel)) {
            return;
        }

        // Listen for order close events
        if (message.getType() == IMessage.Type.ORDER_CLOSE_OK || message.getType() == IMessage.Type.ORDER_CLOSE_BY_SYSTEM) {
            double profit = order.getProfitUSD();
            console.getOut().println("Order closed: " + order.getLabel() + " | Profit USD: " + profit);

            if (profit > 0) {
                console.getOut().println("Campaign LEVEL " + currentLevel + " WON! Proceeding...");
                if (currentLevel == 1) {
                    currentLevel = 2;
                } else if (currentLevel == 2) {
                    currentLevel = 3;
                } else if (currentLevel == 3) {
                    console.getOut().println(">>> CAMPAIGN COMPLETED SUCCESSFULLY! Recalculating to Level 1. <<<");
                    currentLevel = 1;
                }
            } else {
                console.getOut().println("Campaign LEVEL " + currentLevel + " LOST. Resetting campaign to LEVEL 1.");
                currentLevel = 1;
            }
            activeOrder = null;
            lastOrderLabel = "";
            console.getOut().println("Next Campaign Level: " + currentLevel + " (Risk: " + getRiskPercent(currentLevel) + "%)");
        }
    }

    @Override
    public void onAccount(IAccount account) throws JFException {
        this.account = account;
    }

    /**
     * Checks if there's an active trade in the engine corresponding to this strategy
     */
    private void checkActiveOrderState() throws JFException {
        if (activeOrder != null) {
            // Re-fetch state
            IOrder matchingOrder = engine.getOrder(activeOrder.getLabel());
            if (matchingOrder == null || matchingOrder.getState() == IOrder.State.CLOSED) {
                activeOrder = null;
                lastOrderLabel = "";
            } else {
                activeOrder = matchingOrder;
            }
        } else {
            // Fallback scan
            List<IOrder> orders = engine.getOrders(instrument);
            for (IOrder o : orders) {
                if (o.getLabel().startsWith("AIOX_C31_") && o.getState() != IOrder.State.CLOSED) {
                    activeOrder = o;
                    lastOrderLabel = o.getLabel();
                    break;
                }
            }
        }
    }

    /**
     * Analyzes trends and indicator criteria to identify a high-probability trade entry
     */
    private void evaluateEntrySignals() throws JFException {
        // 1. Get H4 EMAs
        double h4Price = history.getLastTick(instrument).getBid();
        double h4Ema20 = indicators.ema(instrument, h4Period, OfferSide.BID, IIndicators.AppliedPrice.CLOSE, emaFast, 1);
        double h4Ema50 = indicators.ema(instrument, h4Period, OfferSide.BID, IIndicators.AppliedPrice.CLOSE, emaMedium, 1);
        double h4Ema200 = indicators.ema(instrument, h4Period, OfferSide.BID, IIndicators.AppliedPrice.CLOSE, emaSlow, 1);

        // 2. Get H1 EMAs
        double h1Ema20 = indicators.ema(instrument, h1Period, OfferSide.BID, IIndicators.AppliedPrice.CLOSE, emaFast, 1);
        double h1Ema50 = indicators.ema(instrument, h1Period, OfferSide.BID, IIndicators.AppliedPrice.CLOSE, emaMedium, 1);
        double h1Ema200 = indicators.ema(instrument, h1Period, OfferSide.BID, IIndicators.AppliedPrice.CLOSE, emaSlow, 1);

        // 3. Get M15 RSI & ATR
        double m15Rsi = indicators.rsi(instrument, m15Period, OfferSide.BID, IIndicators.AppliedPrice.CLOSE, rsiPeriod, 1);
        double m15Atr = indicators.atr(instrument, m15Period, OfferSide.BID, atrPeriod, 1);

        // Evaluate Trend Direction
        boolean isBullish = h4Price > h4Ema20 && h4Ema20 > h4Ema50 && h4Ema50 > h4Ema200
                && h4Price > h1Ema20 && h1Ema20 > h1Ema50 && h1Ema50 > h1Ema200;

        boolean isBearish = h4Price < h4Ema20 && h4Ema20 < h4Ema50 && h4Ema50 < h4Ema200
                && h4Price < h1Ema20 && h1Ema20 < h1Ema50 && h1Ema50 < h1Ema200;

        if (isBullish && m15Rsi > 50) {
            // Execute BUY Order
            executeTrade(OrderCommand.BUY, m15Atr);
        } else if (isBearish && m15Rsi < 50) {
            // Execute SELL Order
            executeTrade(OrderCommand.SELL, m15Atr);
        }
    }

    /**
     * Submits a market order to Dukascopy Engine with correct Stop Loss, Take Profit and dynamic lot sizing
     */
    private void executeTrade(OrderCommand command, double atrM15) throws JFException {
        double entryPrice = (command == OrderCommand.BUY) ? history.getLastTick(instrument).getAsk() : history.getLastTick(instrument).getBid();
        double pipValue = instrument.getPipValue();

        // Stop Loss calculation (Playbook rule: Stop below pullback or minimum 1.5 * ATR M15)
        double slDistance = 1.5 * atrM15;
        if (slDistance < 10 * pipValue) { // Guardrail: Minimum 10 pips SL
            slDistance = 10 * pipValue;
        }

        double slPrice, tpPrice;
        if (command == OrderCommand.BUY) {
            slPrice = entryPrice - slDistance;
            tpPrice = entryPrice + (1.6 * slDistance); // Playbook rule: 1.6R reward
        } else {
            slPrice = entryPrice + slDistance;
            tpPrice = entryPrice - (1.6 * slDistance);
        }

        // Account Money Sizing (Risk 1%, 2% or 4%)
        double riskPercent = getRiskPercent(currentLevel);
        double targetRiskCash = account.getBalance() * (riskPercent / 100.0);

        // Convert risk cash and SL distance to volume in millions (Dukascopy unit size is Millions)
        // EURUSD 1 pip move for 1 million units = $100.
        // Formula: JForex Amount = TargetRisk / (StopLossDistance * 1,000,000)
        double amount = targetRiskCash / (slDistance * 1000000.0);

        // Standard lot size bounds/guardrails (minimum 0.001 millions = 1,000 units = 0.01 lot)
        if (amount < 0.001) {
            amount = 0.001;
        }
        // Round to nearest micro lot step (0.001)
        amount = Math.round(amount * 1000.0) / 1000.0;

        // Label must be unique
        String label = "AIOX_C31_L" + currentLevel + "_" + UUID.randomUUID().toString().substring(0, 8);

        console.getOut().println(String.format("Executing %s | Level: %d | Risk: %.1f%% ($%.2f) | Vol: %.3fM | SL: %.5f (%.1f pips) | TP: %.5f",
                command.name(), currentLevel, riskPercent, targetRiskCash, amount, slPrice, (slDistance / pipValue), tpPrice));

        IOrder order = engine.submitOrder(label, instrument, command, amount, 0, maxSlippage, slPrice, tpPrice);
        if (order != null) {
            activeOrder = order;
            lastOrderLabel = label;
        }
    }

    /**
     * Map level numbers to the strategy playbook percentages
     */
    private double getRiskPercent(int level) {
        switch (level) {
            case 1: return 1.0;
            case 2: return 2.0;
            case 3: return 4.0;
            default: return 1.0;
        }
    }
}
