import com.dukascopy.api.*;

/**
 * Strategy: AIOX Campanha 3 por 1 (Visual Chart Setup)
 *
 * This is a visual assistant strategy. It does NOT open any automated trades.
 * Instead, when started, it automatically:
 * 1. Opens or targets the chart for the configured Instrument (e.g., EURUSD).
 * 2. Plots the required EMAs (20, 50, 200) onto the chart.
 * 3. Plots the SOMMA FP pressure histogram with marked S/R zones.
 *
 * This leaves your screen perfectly prepared for manual trading according to the Campanha 3 por 1 strategy.
 */
public class AIOX_Campanha_3por1_Visual_JForex implements IStrategy {

    private IConsole console;
    private IIndicators indicators;

    @Configurable("Instrumento")
    public Instrument instrument = Instrument.XAUUSD;

    @Override
    public void onStart(IContext context) throws JFException {
        this.console = context.getConsole();
        this.indicators = context.getIndicators();

        console.getOut().println(">>> Iniciando configurador do template visual Campanha 3 por 1... <<<");

        // 1. Obter ou abrir o gráfico do instrumento
        IChart chart = context.getChart(instrument);
        if (chart == null)
            console.getWarn().println("Abra um gráfico de " + instrument + " antes de iniciar o template visual.");

        if (chart != null) {
            // 2. Adicionar as Médias Móveis Exponenciais (EMAs)
            console.getOut().println("Plotando EMAs (20, 50, 200) no gráfico...");
            chart.add(indicators.getIndicator("EMA"), new Object[] { 20 });
            chart.add(indicators.getIndicator("EMA"), new Object[] { 50 });
            chart.add(indicators.getIndicator("EMA"), new Object[] { 200 });

            // 3. Rodape visual unico com histograma e zonas S/R marcadas
            String customName = indicators.registerCustomIndicator(SOMMA_FP_Pressure_JForex.class);
            console.getOut().println("Plotando SOMMA FP Pressao S/R + Volume: " + customName);
            chart.add(indicators.getIndicator(customName));

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
