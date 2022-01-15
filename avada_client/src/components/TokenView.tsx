import React, {useEffect, useState} from "react";
import {
    getTokenByAddress,
    getTokenMetadata,
    getTokenPriceHistory,
    getTokenPriceHistoryDB
} from "../services/tokenService";
import {useParams} from "react-router-dom";
import {
    Button, Flex,
    Grid,
    GridItem, HStack,
    Radio,
    RadioGroup,
    RangeSlider, RangeSliderFilledTrack, RangeSliderThumb,
    RangeSliderTrack,
    Select,
    Stack
} from "@chakra-ui/react";

import BasicChart from "./charts/BasicChart";
import RadioSelection from "./genericComponents/RadioSelection";
import CandleStickTemplate from "./charts/candlestick/CandleStickTemplate";
import AvadaSpinner from "./genericComponents/AvadaSpinner";
import MultipleSelection from "./genericComponents/MultipleSelection";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ColorPalette} from "./styles/color_palette";
import {dateFromTimeStamp} from "../utils/dateUtils";
import {get24HourPercentageChange} from "../services/dashboardService";

enum CHART_TYPES_ENUM {
    LINE,
    CANDLESTICK
}


const INTERVALS = [
    { value: "Token1Day", label: '1 Day' },
    { value: "Token4Hour", label: '4 Hours' },
    { value: "Token1Hour", label: '1 Hour' },
    {value: "Token15Min", label: '15 Mins'}
]

const CHART_TYPES = [{ value: CHART_TYPES_ENUM.LINE, label: 'Line Chart' },
    {value: CHART_TYPES_ENUM.CANDLESTICK, label: 'Candlestick chart'}]



function TokenView(props:any)  {

    const [intervalUnit, setIntervalUnit] = useState(INTERVALS[0].value);

    const getIntervalStep = () => {
        switch (intervalUnit) {
            case "Token1Day":
                return 24 * 60 * 60;
            case "Token4Hour":
                return 4 * 60 * 60;
            case "Token1Hour":
                return 60 * 60;
            case "Token15Min":
                return 15 * 60;
            default:
                return 1;
        }
    }

    const [tokenInfo, setTokenInfo] = useState<any>(null);
    const [tokenPrices, setTokenPrices] = useState <any[]>([]);
    const [dates, setDates] = useState<any[]>([]);
    const [chartType, setChartType] = useState(CHART_TYPES_ENUM.LINE);
    const [sourceExchange, setSourceExchange] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noDataAvailable, setNoDataAvailable] = useState(false);
    const {address} = useParams<string>();
    // const [intervalUnit, setIntervalUnit] = useState<any>(INTERVALS[0].value); // Gives us used interval (1day, 4hour, 1hour, ...)
    const [intervalStep, setIntervalStep] = useState<any>(getIntervalStep()) // Step for slider
    const [initialOffset, setInitialOffset] = useState((Date.now() - 30*24*60*60*1000)/1000); // 30 days in the past in seconds
    const [endOffset, setEndOffset] = useState(Date.now()/1000);
    const [startDate, setStartDate] = useState<any>(dateFromTimeStamp(initialOffset));
    const [endDate, setEndDate] = useState<any>(dateFromTimeStamp(Date.now()/1000));
    const [pctChange, setPctChange] = useState(0);


    useEffect(()=>{
        setIsLoading(true);
        getTokenByAddress(address)
            .then((t)=> {
                console.log("Received: ", t);
                setTokenInfo(t);
            })

        get24HourPercentageChange(address)
            .then((pct)=> {
                setPctChange(pct)
                // setPlotColor(pct>0?ColorPalette.green:ColorPalette.red)
            });

        getTokenPriceHistoryDB(address, intervalUnit, initialOffset, endOffset)
            .then((h:any[])=> {
                setTokenPrices([...h.map(r=>r)]);
                if(tokenPrices.length==0) {
                    setNoDataAvailable(true);
                }
                setDates([...h.map(h=>h.date)]);
                console.log("Got price history: ", tokenPrices)
                setIsLoading(false);
                const sources : any[] = [];
                h.map((p)=>{
                    if(!sources.includes(p.exchange)) {
                        sources.push(p.exchange);
                    }
                })
                setSourceExchange(sources);
                console.log("Sources: ", sources);
            })

    },[])


    const displayChart = () => {
        if(chartType === CHART_TYPES_ENUM.LINE) {
            return (<BasicChart data={tokenPrices.map(d=>d.price)} dates={tokenPrices.map(d=>d.date)} xDomain={dates}  width={1200} height={450} />)
        } else {
            return (<CandleStickTemplate data={tokenPrices.map(d=>d.price)} width={1200} height={450}/>)
        }
    }


    const onChangeInterval = async (interval: any) => {
        console.log("Asking price due to interval change: ", interval);
        setIntervalUnit(interval);
        setIntervalStep(getIntervalStep());

        getTokenPriceHistoryDB(address, interval, initialOffset, endOffset)
            .then((h:any[])=> {
                setTokenPrices([...h.map(r=>r)]);
                if(tokenPrices.length==0) {
                    setNoDataAvailable(true);
                }
                setDates([...h.map(h=>h.date)]);
                setIsLoading(false);
            })
    }

    const fetchLineChartData = (date: any) => {
        getTokenPriceHistoryDB(address, intervalUnit, Math.round(date[0]),Math.round(date[1]))
            .then((h:any[])=> {
                setTokenPrices([...h.map(r=>r)]);
                if(tokenPrices.length==0) {
                    setNoDataAvailable(true);
                }
                setDates([...h.map(h=>h.date)]);
                setIsLoading(false);
            })
    }


    const onDateDrag = (date: any) => {
        setStartDate(dateFromTimeStamp(date[0]))
        setEndDate(dateFromTimeStamp(date[1]))
    }

    const onChangeDate = async (date:any) => {
        setInitialOffset(date[0]);
        setEndOffset(date[1]);
        await fetchLineChartData(date);
    }


    const chartSelectionHandler = (e: any) => {
        console.log("Triggered with vale: ", e);
        if(chartType === CHART_TYPES_ENUM.CANDLESTICK) {
            console.log("Will fetch candle chart type");
        } else {
            console.log("Will fetch regular chart")
        }
        setChartType(e);
    }

    const getPercentage = () => {

        // Change this to be last 24 hour percentage
        return parseFloat((pctChange * 100).toFixed(2));
    }


    return (
        <div style={{alignItems:'center'}}>
            {tokenInfo && (<div style={{margin:40, fontSize:'1.3em', fontWeight:'bold' , alignItems:'center'}}>
                <HStack>
                    <img src={tokenInfo.logoUrl} style={{width:60, height:60, margin:10}}/>
                    <h2>{tokenInfo.name} / {tokenInfo.symbol}</h2>
                </HStack>
            </div>)}



            {isLoading && <div style={{alignItems:'center', justifyItems:"center"}}><AvadaSpinner style={{width:'100%', height: "100%", marginTop:100, marginLeft:500}} message={`Loading price history`}/></div>}

            {(!isLoading && tokenPrices.length) && <div style={{margin:50}}>

                    {displayChart()}



            </div>}


            <div style={{width:'50%', marginLeft:60, marginTop:40}}>

                <HStack  spacing={'24px'}>
                    <RadioGroup onChange={(e)=>onChangeInterval(e)} value={intervalUnit}>
                        <Stack direction='row'>
                            {INTERVALS.map(i=>{
                                return (<Radio value={i.value}>{i.label}</Radio>)
                            })}

                        </Stack>
                    </RadioGroup>
                    <MultipleSelection title={"Chart Type"} selectionHandler={chartSelectionHandler} style={{buttonColor:ColorPalette.thirdColor}} buttons={[{value:CHART_TYPES_ENUM.LINE, label:'Line chart'},{value:CHART_TYPES_ENUM.CANDLESTICK, label:'Candle chart'}]}/>
                </HStack>

                <div style={{borderWidth:1, borderStyle:'solid', borderRadius: 20, padding:20}}>
                <HStack>


                        <div>
                            <span>Start date: </span>
                            <span>{startDate}</span>
                        </div>
                    <div> / </div>
                        <div>
                            <span>End date: </span>
                            <span>{endDate}</span>
                        </div>

                </HStack>

                <RangeSlider onChange={(e)=> onDateDrag(e)}
                             onChangeEnd={(e)=>onChangeDate(e)}
                             defaultValue={[initialOffset, 1642118400]}
                             min={1629504000} max={1642118400}
                             step={intervalStep} minStepsBetweenThumbs={10}

                >
                    <RangeSliderTrack bg={ColorPalette.thirdColor}>
                        <RangeSliderFilledTrack bg={ColorPalette.thirdColor} />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} index={0} />
                    <RangeSliderThumb boxSize={6} index={1} />
                </RangeSlider>
                </div>




            </div>


        </div>
    );

}


export default TokenView;