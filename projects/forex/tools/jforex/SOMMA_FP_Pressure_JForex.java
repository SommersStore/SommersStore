import com.dukascopy.api.indicators.*;
import java.awt.Color;
import java.util.Arrays;

/** Visual S/R pressure histogram for JForex. No order execution. */
public class SOMMA_FP_Pressure_JForex implements IIndicator, IMinMax {
    private IndicatorInfo info;
    private InputParameterInfo[] inputInfo;
    private OutputParameterInfo[] outputInfo;
    private double[][] price;
    private double[] output;
    private final int structureLookback=40;
    private final int volumeBaseline=30;

    public void onStart(IIndicatorContext context) {
        info=new IndicatorInfo("SOMMAFPPRESSURE","SOMMA FP | Pressao S/R + Volume","SOMMA",false,false,false,1,0,1);
        info.setDefaultLevelsInfo(Arrays.asList(
            new LevelInfo("SUPORTE S2 | absorcao",-75,OutputParameterInfo.DrawingStyle.DASH_LINE,new Color(0,105,92),1,1f),
            new LevelInfo("SUPORTE S1 | proximidade",-45,OutputParameterInfo.DrawingStyle.DASH_LINE,new Color(38,166,154),1,1f),
            new LevelInfo("EQUILIBRIO",0,OutputParameterInfo.DrawingStyle.DOT_LINE,new Color(120,144,156),1,1f),
            new LevelInfo("RESISTENCIA R1 | proximidade",45,OutputParameterInfo.DrawingStyle.DASH_LINE,new Color(239,83,80),1,1f),
            new LevelInfo("RESISTENCIA R2 | exaustao",75,OutputParameterInfo.DrawingStyle.DASH_LINE,new Color(183,28,28),1,1f)
        ));
        inputInfo=new InputParameterInfo[]{new InputParameterInfo("Price + tick volume",InputParameterInfo.Type.PRICE)};
        outputInfo=new OutputParameterInfo[]{new OutputParameterInfo("Pressao S/R",OutputParameterInfo.Type.DOUBLE,OutputParameterInfo.DrawingStyle.HISTOGRAM)};
        outputInfo[0].setColor(new Color(38,166,154));
        outputInfo[0].setColor2(new Color(239,83,80));
        outputInfo[0].setHistogramTwoColor(true);
        outputInfo[0].setLineWidth(5);
    }

    public IndicatorResult calculate(int startIndex,int endIndex) {
        startIndex=Math.max(startIndex,getLookback());
        if(startIndex>endIndex)return new IndicatorResult(0,0);
        int out=0;
        for(int i=startIndex;i<=endIndex;i++,out++){
            double support=price[3][i-1],resistance=price[2][i-1];
            for(int s=2;s<=structureLookback;s++){support=Math.min(support,price[3][i-s]);resistance=Math.max(resistance,price[2][i-s]);}
            double corridor=Math.max(1e-12,resistance-support);
            double position=((price[1][i]-support)/corridor)*200.0-100.0;
            double avgVolume=0;
            for(int v=1;v<=volumeBaseline;v++)avgVolume+=price[4][i-v];
            avgVolume=Math.max(1.0,avgVolume/volumeBaseline);
            double volumeRatio=Math.min(2.0,price[4][i]/avgVolume);
            double direction=price[1][i]>=price[0][i]?1.0:-1.0;
            double pressure=position*0.65+direction*50.0*(volumeRatio-1.0)*0.35;
            output[out]=Math.max(-100.0,Math.min(100.0,pressure));
        }
        return new IndicatorResult(startIndex,out);
    }

    public int getLookback(){return structureLookback+volumeBaseline;}
    public int getLookforward(){return 0;}
    public IndicatorInfo getIndicatorInfo(){return info;}
    public InputParameterInfo getInputParameterInfo(int index){return index==0?inputInfo[0]:null;}
    public OptInputParameterInfo getOptInputParameterInfo(int index){return null;}
    public OutputParameterInfo getOutputParameterInfo(int index){return index==0?outputInfo[0]:null;}
    public void setInputParameter(int index,Object array){price=(double[][])array;}
    public void setOptInputParameter(int index,Object value){}
    public void setOutputParameter(int index,Object array){output=(double[])array;}
    public double[] getMinMax(int outputIdx,Object values,int firstVisibleValueIndex,int lastVisibleValueIndex){return new double[]{-100,100};}
}
