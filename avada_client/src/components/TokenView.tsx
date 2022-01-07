import React, {useEffect, useState} from "react";
import {
    getTokenByAddress,
    getTokenMetadata,
    getTokenPriceHistory,
    getTokenPriceHistoryDB
} from "../services/tokenService";
import {useParams} from "react-router-dom";
import {Button, Grid, GridItem, Radio, RadioGroup, Stack} from "@chakra-ui/react";

import BasicChart from "./charts/BasicChart";
import RadioSelection from "./genericComponents/RadioSelection";
import CandleStickTemplate from "./charts/candlestick/CandleStickTemplate";
import AvadaSpinner from "./genericComponents/AvadaSpinner";
import MultipleSelection from "./genericComponents/MultipleSelection";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    { value: INTERVALS_ENUM.ONE_DAY, label: '1d' },
    { value: INTERVALS_ENUM.FOUR_HOURS, label: '4h' },
    { value: INTERVALS_ENUM.ONE_HOUR, label: '1h' },
    {value: INTERVALS_ENUM.FIFTEEN_MINS, label: '15m'}
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

    const [startDate, setStartDate] = useState<any>(new Date());

    useEffect(()=>{
        setIsLoading(true);


        getTokenMetadata(address)
            .then((tmd)=> {
                console.log("Received: ", tmd);
                setTokenInfo(tmd[0]);
                // console.log("Metadata is: ", to/kenInfo);
            })


        getTokenPriceHistoryDB(address)
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



    const onChangeDate = async (date:any) => {
        setStartDate(date);
        console.log("Date change to: ", Math.round(date.getTime()/1000));

        getTokenPriceHistoryDB(address, Math.round(date.getTime()/1000))
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


    }

    const chartSelectionHandler = (e: any) => {
        console.log("Triggered with vale: ", e);
        setChartType(e);
    }

    const onIntervalChange = (e:any) => {
        setInterval(e);
    }

    return (
        <div>
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem style={{height: 50, borderColor:'pink', borderWidth:1, borderRadius:5}} colSpan={2} >{tokenInfo && (<div style={{margin:20, fontSize:'1.3em', fontWeight:'bold'}}><h2>{tokenInfo.name} / {tokenInfo.symbol}</h2></div>)}</GridItem>
                <GridItem style={{height: 50, borderColor:'pink', borderWidth:1, borderRadius:5}} colStart={4} colEnd={6}>{tokenInfo && (<div style={{margin:20}}><h2>Source: {sourceExchange.join("/")}</h2></div>)}</GridItem>
            </Grid>


            {isLoading && <AvadaSpinner style={{width:'100%', height: "100%", marginTop:100, marginLeft:500}} message={`Loading price history`}/>}

            {/*{noDataAvailable && <h2>No data available for {tokenInfo.name}</h2>}*/}
            {tokenPrices.length && <div>
                {/*<RadioSelection title={"Chart Type"} width={400} margin={30} onChange={onChartTypeChange} options={CHART_TYPES} value={chartType}/>*/}
                {/*<div style={{width: 400, margin: 30}}>*/}
                {/*    <h3>{"Chart Type"}</h3>*/}
                {/*    <RadioGroup onChange={onChartTypeChange} value={chartType}>*/}
                {/*        <Stack direction='row'>*/}
                {/*            {CHART_TYPES.map((o: any) => (<Radio value={o.value}>{o.label}</Radio>))}*/}
                {/*        </Stack>*/}
                {/*    </RadioGroup>*/}
                {/*</div>*/}

                <MultipleSelection title={"Chart Type"} selectionHandler={chartSelectionHandler} style={{buttonColor:'pink'}} buttons={[{value:CHART_TYPES_ENUM.LINE, label:'Line chart'},{value:CHART_TYPES_ENUM.CANDLESTICK, label:'Candle chart'}]}/>


                <RadioSelection title={"Time interval"} width={100} margin={30} onChange={onIntervalChange} options={INTERVALS} value={interval}/>
                <div>{displayChart()}</div>
                <div style={{margin:50}}>
                    <span>Start date</span>
                    <DatePicker selected={startDate} onChange={onChangeDate} /></div>
            </div>}


            {/*<div style = {{width:100,margin:30}}>*/}
            {/*    <span>Chart type</span>*/}
            {/*    <Select onChange={onChartTypeChange} options={options} />*/}
            {/*</div>*/}

            {/*<Button style={{marginTop:100}} onClick={()=> synchronizeTokenPrice(address, 1, INCREMENT_UNITS.HOURS, 1)}>Synchronize prices for {address}</Button>*/}
        </div>
    );

}


export default TokenView;