import com.dukascopy.api.indicators.*;
import java.awt.Color;
import java.util.Arrays;

/** Clean-room JForex port of the PIC/Peak (SDA) oscillator. */
public class AIOX_Peak_SDA_JForex implements IIndicator {
    private IndicatorInfo info;
    private InputParameterInfo[] inputs;
    private OptInputParameterInfo[] options;
    private OutputParameterInfo[] outputs;
    private double[][] price;
    private double[] up;
    private double[] down;
    private int len = 150;
    private int groupBars = 15;
    private boolean modeHL = true;

    public void onStart(IIndicatorContext context) {
        info = new IndicatorInfo("AIOXPEAKSDA", "AIOX PIC Peak SDA", "AIOX", false, false, false, 1, 3, 2);
        info.setDefaultLevelsInfo(Arrays.asList(
            new LevelInfo("Sinal 15", 15, OutputParameterInfo.DrawingStyle.DOT_LINE, Color.GRAY, 1, 1f),
            new LevelInfo("Sinal forte 25", 25, OutputParameterInfo.DrawingStyle.DASH_LINE, Color.ORANGE, 1, 1f)
        ));
        inputs = new InputParameterInfo[]{new InputParameterInfo("Price", InputParameterInfo.Type.PRICE)};
        options = new OptInputParameterInfo[]{
            new OptInputParameterInfo("Len", OptInputParameterInfo.Type.OTHER, new IntegerRangeDescription(150, 2, 1000, 1)),
            new OptInputParameterInfo("Legacy group bars", OptInputParameterInfo.Type.OTHER, new IntegerRangeDescription(15, 1, 240, 1)),
            new OptInputParameterInfo("Use High/Low", OptInputParameterInfo.Type.OTHER, new BooleanOptInputDescription(true))
        };
        outputs = new OutputParameterInfo[]{
            new OutputParameterInfo("PIC Peak UP", OutputParameterInfo.Type.DOUBLE, OutputParameterInfo.DrawingStyle.LINE),
            new OutputParameterInfo("PIC Peak DN", OutputParameterInfo.Type.DOUBLE, OutputParameterInfo.DrawingStyle.LINE)
        };
        outputs[0].setColor(new Color(46, 180, 110));
        outputs[1].setColor(new Color(239, 83, 80));
        outputs[0].setLineWidth(3);
        outputs[1].setLineWidth(3);
    }

    public IndicatorResult calculate(int startIndex, int endIndex) {
        startIndex = Math.max(startIndex, getLookback());
        endIndex = Math.min(endIndex, price[0].length - groupBars);
        if (startIndex > endIndex) return new IndicatorResult(0, 0);
        int out = 0;
        for (int i = startIndex; i <= endIndex; i++, out++) {
            double highest = -Double.MAX_VALUE, lowest = Double.MAX_VALUE;
            double highSum = 0.0, lowSum = 0.0;
            for (int n = 0; n < len; n++) {
                int aggregate = i - n;
                for (int k = 0; k < groupBars; k++) {
                    int bar = aggregate + k; // MT4 legacy overlap/look-forward
                    if (bar < 0 || bar >= price[0].length) continue;
                    double high = modeHL ? price[2][bar] : Math.max(price[0][bar], price[1][bar]);
                    double low = modeHL ? price[3][bar] : Math.min(price[0][bar], price[1][bar]);
                    if (high > highest) { highest = high; highSum += price[1][bar]; }
                    if (low < lowest) { lowest = low; lowSum += price[1][bar]; }
                }
            }
            if (highSum > 0 && lowSum > 0) {
                up[out] = highSum / lowSum;
                down[out] = lowSum / highSum;
            } else {
                up[out] = Double.NaN;
                down[out] = Double.NaN;
            }
        }
        return new IndicatorResult(startIndex, out);
    }

    public int getLookback() { return len; }
    public int getLookforward() { return Math.max(0, groupBars - 1); }
    public IndicatorInfo getIndicatorInfo() { return info; }
    public InputParameterInfo getInputParameterInfo(int index) { return index == 0 ? inputs[0] : null; }
    public OptInputParameterInfo getOptInputParameterInfo(int index) { return index >= 0 && index < options.length ? options[index] : null; }
    public OutputParameterInfo getOutputParameterInfo(int index) { return index >= 0 && index < outputs.length ? outputs[index] : null; }
    public void setInputParameter(int index, Object array) { price = (double[][]) array; }
    public void setOptInputParameter(int index, Object value) {
        if (index == 0) len = (Integer) value;
        else if (index == 1) groupBars = (Integer) value;
        else if (index == 2) modeHL = (Boolean) value;
    }
    public void setOutputParameter(int index, Object array) {
        if (index == 0) up = (double[]) array;
        else if (index == 1) down = (double[]) array;
    }
}
