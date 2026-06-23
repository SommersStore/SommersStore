import com.dukascopy.api.*;

/**
 * Strategy: AIOX Campanha 3 por 1 (Visual Chart Setup)
 *
 * This is a visual assistant strategy. It does NOT open any automated trades.
 * Instead, when started, it automatically:
 * 1. Opens or targets the chart for the configured Instrument (e.g., EURUSD).
 * 2. Plots the required EMAs (20, 50, 200) onto the chart.
 * 3. Plots the RSI (14) and ATR (14) indicators.
 *
 * This leaves your screen perfectly prepared for manual trading according to the Campanha 3 por 1 strategy.
 */
public class AIOX_Campanha_3por1_Visual_JForex implements IStrategy {

    private IConsole console;
    private IIndicators indicators;

    @Configurable("Instrumento")
    public Instrument instrument = Instrument.EURUSD;

    @Override
    public void onStart(IContext context) throws JFException {
        this.console = context.getConsole();
        this.indicators = context.getIndicators();

        console.getOut().println(">>> Iniciando configurador do template visual Campanha 3 por 1... <<<");

        // 1. Obter ou abrir o gráfico do instrumento
        IChart chart = context.getChart(instrument);
        if (chart == null) {
            console.getOut().println("Gráfico não estava aberto. Abrindo novo gráfico para " + instrument + "...");
            chart = context.openChart(instrument);
        }

        if (chart != null) {
            // 2. Adicionar as Médias Móveis Exponenciais (EMAs)
            console.getOut().println("Plotando EMAs (20, 50, 200) no gráfico...");
            chart.add(indicators.getIndicator("EMA"), new Object[] { 20 });
            chart.add(indicators.getIndicator("EMA"), new Object[] { 50 });
            chart.add(indicators.getIndicator("EMA"), new Object[] { 200 });

            // 3. Adicionar RSI e ATR
            console.getOut().println("Plotando RSI (14) e ATR (14) no gráfico...");
            chart.add(indicators.getIndicator("RSI"), new Object[] { 14 });
            chart.add(indicators.getIndicator("ATR"), new Object[] { 14 });

            console.getOut().println(">>> Gráfico configurado com sucesso! Setup visual pronto para operação manual. <<<");
        } else {
            console.getErr().println("Erro: Não foi possível abrir o gráfico do instrumento " + instrument);
        }
    }

    @Override
    public void onStop() throws JFException {
        console.getOut().println("Configurador visual encerrado.");
    }

    @Override
    public void onTick(Instrument instrument, ITick tick) throws JFException {
        // Sem lógica de trading automatizado
    }

    @Override
    public void onBar(Instrument instrument, Period period, IBar askBar, IBar bidBar) throws JFException {
        // Sem lógica de trading automatizado
    }

    @Override
    public void onMessage(IMessage message) throws JFException {
        // Sem lógica de trading automatizado
    }

    @Override
    public void onAccount(IAccount account) throws JFException {
        // Sem lógica de trading automatizado
    }
}
