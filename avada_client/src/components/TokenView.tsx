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
    Stack, VStack
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
import {FaFontAwesome} from "react-icons/all";
import {faFileExport, faFileDownload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ExportIcon from "./genericComponents/ExportIcon";
import AvalyticsSpinner from "./genericComponents/AvalyticsSpinner";
import Title from "./genericComponents/Title";

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
    const [radioOptions, setRadioOptions] = useState(INTERVALS);

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

        getTokenPriceHistoryDB(address, intervalUnit, initialOffset, endOffset, chartType!==CHART_TYPES_ENUM.LINE)
            .then((h:any[])=> {
                setTokenPrices([...h.map(r=>r)]);
                if(tokenPrices.length==0) {
                    setNoDataAvailable(true);
                }
                setDates([...h.map(h=>h.timestamp)]);
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


    useEffect(()=> {
        setTokenPrices([]);
        setIsLoading(true);
        getTokenPriceHistoryDB(address, intervalUnit, initialOffset, endOffset, chartType!==CHART_TYPES_ENUM.LINE)
            .then((h:any[])=> {
                setTokenPrices([...h.map(r=>r)]);
                if(tokenPrices.length==0) {
                    setNoDataAvailable(true);
                }
                setDates([...h.map(h=>h.timestamp)]);
                setIsLoading(false);
            })

    },[chartType])



    const onChangeInterval = async (interval: any) => {
        console.log("Asking price due to interval change: ", interval);
        setIntervalUnit(interval);
        setIntervalStep(getIntervalStep());

        getTokenPriceHistoryDB(address, interval, initialOffset, endOffset, chartType!==CHART_TYPES_ENUM.LINE)
            .then((h:any[])=> {
                setTokenPrices([...h.map(r=>r)]);
                if(tokenPrices.length==0) {
                    setNoDataAvailable(true);
                }
                setDates([...h.map(h=>h.timestamp)]);
                setIsLoading(false);
            })
    }

    const fetchChartData = (date: any) => {
        getTokenPriceHistoryDB(address, intervalUnit, Math.round(date[0]),Math.round(date[1]), chartType!==CHART_TYPES_ENUM.LINE)
            .then((h:any[])=> {
                setTokenPrices([...h.map(r=>r)]);
                if(tokenPrices.length==0) {
                    setNoDataAvailable(true);
                }
                setDates([...h.map(h=>h.timestamp)]);
                setIsLoading(false);
            })
    }


    const onDateDrag = (date: any) => {
        setStartDate(dateFromTimeStamp(date[0]))
        setEndDate(dateFromTimeStamp(date[1]))
    }

    const onChangeDate = (date:any) => {
        setInitialOffset(date[0]);
        setEndOffset(date[1]);

        fetchChartData(date);
    }


    const chartSelectionHandler = (e: any) => {
        console.log("Triggered with vale: ", e);
        if(chartType === CHART_TYPES_ENUM.CANDLESTICK) {
            setRadioOptions(INTERVALS);
        } else {
            setRadioOptions(radioOptions.filter((ro)=>ro.value!='Token15Min'))
        }
        setChartType(e);
    }

    const getPercentage = () => {

        // Change this to be last 24 hour percentage
        return parseFloat((pctChange * 100).toFixed(2));
    }


    return (
        <div style={{justifyContent:'center', marginLeft: 30}}>

            {tokenInfo && <Title title={`${tokenInfo.symbol} on  Avalanche C-Chain`} extraInfo={"Analysis of token prices over a selected time period at a selected time resolution."}/>}


            {tokenInfo && (<div style={{margin:20, fontSize:'1.3em', fontWeight:'bold' , alignItems:'center'}}>
                <HStack>
                    <img src={tokenInfo.logoUrl} style={{width:60, height:60, margin:10}}/>
                    <h2>{tokenInfo.name} / {tokenInfo.symbol}</h2>
                </HStack>
            </div>)}



            <div style={{margin:30, marginLeft:60, borderColor:'gray.200',top:100, borderRadius:50, borderWidth:2,paddingTop:40, width: 1400, height:550}}>
                {isLoading && <div style={{height:'100%', alignItems:'center', justifyItems:"center"}}><AvalyticsSpinner style={{width:80, height: 80}} message={`Loading price history`}/></div>}

                {(!isLoading && tokenPrices.length) && <div >
                {chartType === CHART_TYPES_ENUM.LINE && <BasicChart data={tokenPrices.map(d=>d.price)} dates={dates} xDomain={dates}  width={1200} height={450} />}
                {chartType !== CHART_TYPES_ENUM.LINE && <CandleStickTemplate data={tokenPrices} dates={dates} xDomain={dates}  width={1200} height={450}/>}


            </div>}
            </div>

            {/* Bottom part */}


            <div style={{width:'100%', marginLeft:70, marginTop:20}}>

                <HStack  spacing={'100px'}>


                    <div style={{borderWidth:1, borderStyle:'solid', borderRadius: 20, padding:20, width:'40%'}}>
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
                                     defaultValue={[initialOffset, Math.round(Date.now() / 1000)]}
                                     min={1629504000} max={Math.round(Date.now() / 1000)}
                                     step={intervalStep} minStepsBetweenThumbs={10}

                        >
                            <RangeSliderTrack bg={ColorPalette.thirdColor}>
                                <RangeSliderFilledTrack bg={ColorPalette.thirdColor} />
                            </RangeSliderTrack>
                            <RangeSliderThumb boxSize={6} index={0} />
                            <RangeSliderThumb boxSize={6} index={1} />
                        </RangeSlider>
                    </div>



                    <HStack>
                    <RadioGroup onChange={(e)=>onChangeInterval(e)} value={intervalUnit}>
                        <Stack direction='row'>
                            {radioOptions.map(i=>{
                                return (<Radio value={i.value}>{i.label}</Radio>)
                            })}

                        </Stack>
                    </RadioGroup>
                    <MultipleSelection title={"Chart Type"} selectionHandler={chartSelectionHandler} style={{buttonColor:ColorPalette.thirdColor}} buttons={[{value:CHART_TYPES_ENUM.LINE, label:'Line chart'},{value:CHART_TYPES_ENUM.CANDLESTICK, label:'Candle chart'}]}/>
                    <ExportIcon/>
                    </HStack>





                </HStack>






            </div>


        </div>
    );

}


export default TokenView;