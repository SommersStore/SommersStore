<chart>
id=133747219597133218
symbol=EURJPY
description=Euro vs Japanese Yen
period_type=0
period_size=1
digits=3
tick_size=0.000000
position_time=1764301920
scale_fix=0
scale_fixed_min=180.760000
scale_fixed_max=181.410000
scale_fix11=0
scale_bar=0
scale_bar_val=1.000000
scale=8
mode=1
fore=0
grid=0
volume=0
scroll=0
shift=1
shift_size=29.565217
fixed_pos=0.000000
ticker=1
ohlc=0
one_click=0
one_click_btn=0
bidline=1
askline=1
lastline=0
days=1
descriptions=0
tradelines=1
tradehistory=1
window_left=768
window_top=0
window_right=1536
window_bottom=374
window_type=1
floating=0
floating_left=0
floating_top=0
floating_right=0
floating_bottom=0
floating_type=1
floating_toolbar=1
floating_tbstate=
background_color=14745599
foreground_color=11119017
barup_color=8388352
bardown_color=11823615
bullcandle_color=2664488
bearcandle_color=3937500
chartline_color=0
volumes_color=3329330
grid_color=13382297
bidline_color=2237106
askline_color=32768
lastline_color=3329330
stops_color=8388736
windows_total=2

<expert>
name=AIOX_Trader_On_Chart
path=Experts\AIOX_Trader_On_Chart.ex5
expertmode=1
<inputs>
RiskPercent=1.0
RiskCash=100.0
FixedLot=0.10
DefaultRiskMode=0
DefaultSLPips=20
DefaultTPPips=32
DefaultSlippage=20
MagicNumber=888200
ManageOnlyMagic=true
MaxSpreadPips=5
PipSizeOverride=0.0
BreakevenTriggerPips=8
BreakevenOffsetPips=1
EnableSmartBreakeven=true
SmartBEExtraCostPips=0.2
EnableAutoTrailing=false
TrailingStartPips=15
TrailingDistancePips=12
TrailingStepPips=2
StraddleEntryOffsetPips=5
StraddleExpiryMinutes=60
EnableTwoWayTrading=true
EnableOCO=true
PanelOffsetX=20
PanelOffsetY=40
PanelScalePercent=135
PanelFontScalePercent=82
PanelRefreshSeconds=1
</inputs>
</expert>

<window>
height=130.000000
objects=1

<indicator>
name=Main
path=
apply=1
show_data=1
scale_inherit=0
scale_line=0
scale_line_percent=50
scale_line_value=0.000000
scale_fix_min=0
scale_fix_min_val=0.000000
scale_fix_max=0
scale_fix_max_val=0.000000
expertmode=0
fixed_height=-1
</indicator>

<indicator>
name=Custom Indicator
path=Indicators\Market\Top Clock MT5.ex5
apply=0
show_data=1
scale_inherit=0
scale_line=0
scale_line_percent=50
scale_line_value=0.000000
scale_fix_min=0
scale_fix_min_val=0.000000
scale_fix_max=0
scale_fix_max_val=0.000000
expertmode=0
fixed_height=-1

<graph>
name=
draw=0
style=0
width=1
arrow=251
color=
</graph>
<inputs>
ShowTimeToBar=false
UseTime=1
UseMode=0
ClockPos=0
TimeOffset=0
ClockSize=18
ClockColor=16711935
ClockFont=Arial black
ClockMargin=15
ShowDate=false
ShowBack=false
</inputs>
</indicator>

<indicator>
name=Custom Indicator
path=Indicators\MT5 Indicators\braintrend2.ex5
apply=0
show_data=1
scale_inherit=0
scale_line=0
scale_line_percent=50
scale_line_value=0.000000
scale_fix_min=0
scale_fix_min_val=0.000000
scale_fix_max=0
scale_fix_max_val=0.000000
expertmode=4
fixed_height=-1

<graph>
name=Flat; UpTrend; DownTrend;
draw=17
style=0
width=1
arrow=251
color=-1,65280,16711935
</graph>
<inputs>
ATR_Period=7
</inputs>
</indicator>

<indicator>
name=Custom Indicator
path=Indicators\MT5 Indicators\fractal-levels-indicator-m5.ex5
apply=0
show_data=1
scale_inherit=0
scale_line=0
scale_line_percent=50
scale_line_value=0.000000
scale_fix_min=0
scale_fix_min_val=0.000000
scale_fix_max=0
scale_fix_max_val=0.000000
expertmode=4
fixed_height=-1

<graph>
name=Fractal resistance
draw=1
style=0
width=1
arrow=251
color=-1
</graph>

<graph>
name=DOWNWARD fractal
draw=1
style=0
width=1
arrow=251
color=-1
</graph>

<graph>
name=UPWARD fractal
draw=3
style=0
width=1
arrow=119
color=3937500
</graph>

<graph>
name=
draw=3
style=0
width=1
arrow=119
color=3329330
</graph>

<graph>
name=UPWARD breakout
draw=3
style=0
width=1
arrow=108
color=-1
</graph>

<graph>
name=Ïðîáîé ÂÍÈÇ
draw=3
style=0
width=1
arrow=108
color=-1
</graph>
<inputs>
LeftBars_=3
RightBars_=3
</inputs>
</indicator>
<indicator>
name=Custom Indicator
path=Indicators\SOMMA\SOMMA_Multimarket_Desk.ex5
apply=0
show_data=1
scale_inherit=0
scale_line=0
scale_line_percent=50
scale_line_value=0.000000
scale_fix_min=0
scale_fix_min_val=0.000000
scale_fix_max=0
scale_fix_max_val=0.000000
expertmode=4
fixed_height=-1

<graph>
name=EMA 20
draw=1
style=0
width=1
arrow=251
color=16760576
</graph>

<graph>
name=EMA 50
draw=1
style=0
width=2
arrow=251
color=42495
</graph>

<graph>
name=EMA 200
draw=1
style=0
width=2
arrow=251
color=14524637
</graph>

<graph>
name=Setup Buy
draw=3
style=0
width=2
arrow=233
color=3329330
</graph>

<graph>
name=Setup Sell
draw=3
style=0
width=2
arrow=234
color=4678655
</graph>
<inputs>
ShowDashboard=true
ShowMarketMap=true
ShowGammaLevels=true
ShowMinorGamma=true
GammaLevelsFile=SOMMA\Niveis_Opcoes_Tradingview_2026-07-18.txt
ShowEMAs=true
StructureLookback=20
AtrPeriod=14
AtrBaselineBars=50
PullbackAtrDistance=0.55
BreakoutAtrFactor=1.20
MaxSpreadPoints=80.0
DashboardX=360
DashboardY=28
DashboardWidth=440
RefreshSeconds=2
</inputs>
</indicator>
<object>
type=102
name=TC_01
hidden=1
descr=12:28:08
color=16711935
selectable=0
angle=0
pos_x=15
pos_y=15
fontsz=18
fontnm=Arial black
anchorpos=5
refpoint=3
</object>

</window>

<window>
height=125.000000
objects=0
<indicator>
name=Custom Indicator
path=Indicators\SOMMA\SOMMA_FP_Force_Displacement.ex5
apply=0
show_data=1
scale_inherit=0
scale_line=0
scale_line_percent=50
scale_line_value=0.000000
scale_fix_min=1
scale_fix_min_val=-100.000000
scale_fix_max=1
scale_fix_max_val=100.000000
expertmode=4
fixed_height=-1
<graph>
name=Pressao S/R
draw=11
style=0
width=5
arrow=251
color=6054400,10184230,8026746,5260271,18352
</graph>
<inputs>
StructureLookback=40
VolumeBaseline=30
SmoothPeriod=4
VolumeInfluence=0.35
</inputs>
</indicator>
</window>

</chart>
