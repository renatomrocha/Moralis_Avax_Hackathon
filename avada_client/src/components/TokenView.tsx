import React, {useEffect, useState} from "react";
import {
    getTokenByAddress,
    getTokenMetadata,
    getTokenPriceHistory,
    getTokenPriceHistoryDB
} from "../services/tokenService";
import {useParams} from "react-router-dom";
import {
    Button,
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

enum CHART_TYPES_ENUM {
    LINE,
    CANDLESTICK
}

enum INTERVALS_ENUM {
    FIFTEEN_MINS,
    ONE_HOUR,
    FOUR_HOURS,
    ONE_DAY
}

const INTERVALS = [
    { value: "Token1Day", label: 'Token1Day' },
    { value: "Token4Hour", label: 'Token4Hour' },
    { value: "Token1Hour", label: 'Token1Hour' },
    {value: "Token15Min", label: 'Token15Min'}
]

const CHART_TYPES = [{ value: CHART_TYPES_ENUM.LINE, label: 'Line Chart' },
    {value: CHART_TYPES_ENUM.CANDLESTICK, label: 'Candlestick chart'}]



function TokenView(props:any)  {

    const [tokenInfo, setTokenInfo] = useState<any>(null);
    const [tokenPrices, setTokenPrices] = useState <any[]>([]);
    const [dates, setDates] = useState<any[]>([]);
    const [chartType, setChartType] = useState(CHART_TYPES_ENUM.LINE);
    const [sourceExchange, setSourceExchange] = useState<any[]>([]);
    const [interval, setInterval] = useState<any>(INTERVALS_ENUM.ONE_HOUR);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noDataAvailable, setNoDataAvailable] = useState(false);
    const {address} = useParams<string>();
    const [intervalStep, setIntervalStep] = useState<string>("Token1Day");
    const [startDate, setStartDate] = useState<any>(new Date());

    useEffect(()=>{
        setIsLoading(true);


        getTokenByAddress(address)
            .then((t)=> {
                console.log("Received: ", t);
                setTokenInfo(t);

            })


        getTokenPriceHistoryDB(address, intervalStep, interval)
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
            return (<BasicChart data={tokenPrices.map(d=>d.price)} dates={tokenPrices.map(d=>d.date)} xDomain={dates}  width={1000} height={400} />)
        } else {
            return (<CandleStickTemplate data={tokenPrices.map(d=>d.price)} width={1000} height={400}/>)
        }
    }


    const onChangeInterval = async (interval: any) => {
        console.log("Interval changed to: ", interval.target.value);
        getTokenPriceHistoryDB(address, interval.target.value,Date.now() - (30*24*60*60*1000))
            .then((h:any[])=> {
                setTokenPrices([...h.map(r=>r)]);
                console.log("Prices now is: ", tokenPrices);
                if(tokenPrices.length==0) {
                    setNoDataAvailable(true);
                }
                setDates([...h.map(h=>h.date)]);
                console.log("Got price history: ", tokenPrices)
                setIsLoading(false);
            })
    }

    const fetchLineChartData = (date: any) => {
        console.log("Changing date with intervalStep: ", intervalStep);
        getTokenPriceHistoryDB(address, intervalStep,Math.round(date.getTime()/1000))
            .then((h:any[])=> {
                setTokenPrices([...h.map(r=>r)]);
                console.log("Prices now is: ", tokenPrices);
                if(tokenPrices.length==0) {
                    setNoDataAvailable(true);
                }
                setDates([...h.map(h=>h.date)]);
                console.log("Got price history: ", tokenPrices)
                setIsLoading(false);
            })
    }

    const onChangeDate = async (date:any) => {
        setStartDate(date);
        console.log("Date change to: ", Math.round(date.getTime()/1000));
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

    const onIntervalChange = (e:any) => {
        setInterval(e);
    }

    useEffect(()=>console.log("INtervale stap change to: ", intervalStep),[intervalStep])

    return (
        <div style={{alignItems:'center'}}>
            {tokenInfo && (<div style={{margin:20, fontSize:'1.3em', fontWeight:'bold' , alignItems:'center'}}>
                <HStack style={{margin:40}}>
                    <img src={tokenInfo.logoUrl} style={{width:60, height:60, margin:10}}/>
                    <h2>{tokenInfo.name} / {tokenInfo.symbol}</h2>
                </HStack>
                </div>)}

            {isLoading && <div style={{alignItems:'center'}}><AvadaSpinner style={{width:'100%', height: "100%", marginTop:100, marginLeft:500}} message={`Loading price history`}/></div>}

            {(!isLoading && tokenPrices.length) && <div>

                <div>
                    {/*{chartType === CHART_TYPES_ENUM.LINE && <BasicChart data={tokenPrices.map(d=>d.price)} dates={tokenPrices.map(d=>d.date)} xDomain={dates}  width={1000} height={400} />}*/}
                    {/*{chartType === CHART_TYPES_ENUM.CANDLESTICK && <CandleStickTemplate data={tokenPrices.map(d=>d.price)} width={1000} height={400}/>}*/}
                    {displayChart()}


                </div>
                <MultipleSelection title={"Chart Type"} selectionHandler={chartSelectionHandler} style={{buttonColor:'pink'}} buttons={[{value:CHART_TYPES_ENUM.LINE, label:'Line chart'},{value:CHART_TYPES_ENUM.CANDLESTICK, label:'Candle chart'}]}/>
                {/*<RadioSelection title={"Time interval"} width={100} margin={30} onChange={onIntervalChange} options={INTERVALS} value={interval}/>*/}
                <Select
                    onChange={onChangeInterval}
                    w={150}
                    bg={ColorPalette.secondaryColor}
                    borderColor={ColorPalette.secondaryColor}
                    color='white'
                    placeholder='Time interval'
                >
                    {INTERVALS.map(i=>{
                        return (<option onClick={()=>setIntervalStep(i.value)}>{i.label}</option>)
                    })}
                </Select>
                <div>
                    <RangeSlider defaultValue={[120, 240]} min={0} max={300} step={30}>
                        <RangeSliderTrack bg={ColorPalette.secondaryColor}>
                            <RangeSliderFilledTrack bg={ColorPalette.secondaryColor} />
                        </RangeSliderTrack>
                        <RangeSliderThumb boxSize={6} index={0} />
                        <RangeSliderThumb boxSize={6} index={1} />
                    </RangeSlider>

                </div>
                <div style={{margin:50}}>
                    <span>Start date</span>
                    <DatePicker selected={startDate} onChange={onChangeDate} /></div>
            </div>}

        </div>
    );

}


export default TokenView;