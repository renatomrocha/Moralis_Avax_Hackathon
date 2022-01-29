import {HeatMap} from "./charts/heatmap/HeatMap";
import React, {useEffect, useState} from "react";
import {fetchTokensForHeatMap, getTokenList, getTokenPriceHistoryDB} from "../services/tokenService";
import {
    Avatar,
    Flex,
    HStack,
    RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack,
    Select,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack
} from "@chakra-ui/react";
import AvadaSpinner from "./genericComponents/AvadaSpinner";
import {ColorPalette} from "./styles/color_palette";
import Title from "./genericComponents/Title";
import {Checkbox, CheckboxGroup} from '@chakra-ui/react'
import BarRaceChart from "./charts/barRaceChart/BarRaceChart";
import {dateFromTimeStamp} from "../utils/dateUtils";
import ExportIcon from "./genericComponents/ExportIcon";
import {CorrelationChart} from "./charts/correlationChart/CorrelationChart";
import CorrelationChartWrapper from "./charts/CorrelationChartWrapper";

export function MultipleTokens(props: any) {

    const [tokenList, setTokenList] = useState<any[]>([]);
    const [sliderStep, setSliderStep] = useState<number>(24 * 60 * 60);

    const [tokenPrices, setTokenPrices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [initialOffset, setInitialOffset] = useState((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000); // 30 days in the past in seconds
    const [startDate, setStartDate] = useState<any>(dateFromTimeStamp(initialOffset));
    const [endDate, setEndDate] = useState<any>(dateFromTimeStamp(Date.now() / 1000));
    const [endOffset, setEndOffset] = useState(Math.round(Date.now() / 1000));

    const [activeTokens, setActiveTokens] = useState<any>(["WBTC.e", "WETH.e", "WAVAX.e", "LINK.e", "TIME", "JOE", "AAVE.e"]);

    const [correlationValues, setCorrelationValues] = useState([]);


    const fetchPctChanges = () => {
        setIsLoading(true);
        fetchTokensForHeatMap("Token1Day", initialOffset, endOffset, activeTokens)
            .then((tp) => {
                setTokenPrices(tp.filter((t) => t.symbol != "SUSHI.e").sort((a, b) => {
                    return (a.symbol > b.symbol ? -1 : 1)
                }))
                setIsLoading(false);
                console.log("Token prices: ", tokenPrices);
            });
    }


    useEffect(() => {
        getTokenList()
            .then(tl => setTokenList(tl))
        setIsLoading(true);
        fetchPctChanges();
    }, [])


    const handleCheckBoxChange = (e: any, idx: number) => {
        const toAdd = e.target.checked;
        if (toAdd) {
            activeTokens.push(tokenList[idx].symbol);
            setIsLoading(true);
            fetchPctChanges();
        } else {
            const idxToRemove = activeTokens.indexOf(tokenList[idx].symbol);
            activeTokens.splice(idxToRemove, 1);
            const currentPrices = tokenPrices;
            setTokenPrices(currentPrices.filter((tp) => tp.symbol != tokenList[idx].symbol));
            // tokenPrices;
        }
    }

    const handleSelectAll = (e: any) => {
        console.log("After handleSelect: ", e.target.checked);
        if (e.target.checked) {
            setActiveTokens(tokenList.map((t) => t.symbol));
            fetchPctChanges();
        } else {
            setActiveTokens(["WBTC.e", "WETH.e", "WAVAX.e", "LINK.e", "TIME", "JOE", "AAVE.e"])
            fetchPctChanges();
        }
    }

    const onDateDrag = (date: any) => {
        setStartDate(dateFromTimeStamp(date[0]))
        setEndDate(dateFromTimeStamp(date[1]))
    }

    const onChangeDate = (date: any) => {
        setInitialOffset(date[0]);
        setEndOffset(date[1]);
        console.log("Fetch data again");

    }

    useEffect(() => {
        fetchPctChanges();
    }, [initialOffset, endOffset])


    const checkActiveTokens = (t: any) => {
        return activeTokens.includes(t.symbol)
    }


    return (
        <div>

            <div style={{...props.style}}>
                <Title title="Multiple Tokens" hasInfo></Title>

                <Tabs variant='soft-rounded' onChange={(index) => console.log("Changed to tab: ", index)} isLazy>
                    <TabList>
                        <Tab>Percentage Change</Tab>
                        <Tab>Correlation</Tab>
                        <Tab>Market Cap</Tab>
                    </TabList>


                    <TabPanels>

                        <TabPanel style={{height: '100%'}}>

                            {tokenPrices.length && (<div><HStack style={{height: '100%'}}>

                                {tokenList && <div style={{
                                    marginTop: -200,
                                }}>
                                    <div style={{fontSize: '1.4em'}}>Tokens</div>
                                    <div style={{
                                        height: 550,
                                        marginRight:100,
                                        overflowY: 'scroll',
                                        width: 300,
                                        borderColor: ColorPalette.thirdColor,
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        padding: 20
                                    }}>

                                        <ul style={{listStyleType: 'none'}}>
                                            {tokenList.map((t: any, idx: number) => <li style={{marginBottom: 5}}>
                                                <Checkbox size='lg' iconColor='red'
                                                          style={{margin: 15}}
                                                          colorScheme='red'
                                                          defaultChecked={checkActiveTokens(t)}
                                                          onChange={(e) => handleCheckBoxChange(e, idx)}>
                                                    <HStack style={{marginLeft:20}}>
                                                        <img width={30} src={t.logoUrl}/>
                                                        <div>{t.symbol}</div>
                                                    </HStack>
                                                </Checkbox></li>)}
                                        </ul>

                                    </div>
                                </div>}

                                {tokenList.length > 0 && (<div style={{marginLeft: 60}}>
                                    {isLoading && (<div style={{position: 'absolute', marginLeft: 550, marginTop: 300}}>
                                        <AvadaSpinner/></div>)}

                                        <HeatMap tokensList={tokenList} data={tokenPrices}/>

                                </div>)}

                            </HStack>
                            <HStack>
                                <div style={{
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    marginTop: -180,
                                    borderRadius: 20,
                                    padding: 20,
                                    width: '80%'
                                }}>
                                    <HStack>
                                        <div>
                                            <span>Start date: </span>
                                            <span>{startDate}</span>
                                        </div>
                                        <div> /</div>
                                        <div>
                                            <span>End date: </span>
                                            <span>{endDate}</span>
                                        </div>
                                    </HStack>
                                    <RangeSlider onChange={(e) => onDateDrag(e)}
                                                 onChangeEnd={(e) => onChangeDate(e)}
                                                 defaultValue={[initialOffset, endOffset]}
                                                 min={1629504000} max={Math.round(Date.now() / 1000)}
                                                 step={sliderStep} minStepsBetweenThumbs={10}
                                    >
                                        <RangeSliderTrack bg={ColorPalette.thirdColor}>
                                            <RangeSliderFilledTrack bg={ColorPalette.thirdColor}/>
                                        </RangeSliderTrack>
                                        <RangeSliderThumb boxSize={6} index={0}/>
                                        <RangeSliderThumb boxSize={6} index={1}/>
                                    </RangeSlider>
                                </div>

                            </HStack>

                            </div>)}

                            {isLoading &&
                            <AvadaSpinner style={{width: '100%', height: "100%", marginTop: 100, marginLeft: 500}}
                                          message={`Loading price history`}/>}

                        </TabPanel>

                        <TabPanel style={{height: '100%'}}>
                            <CorrelationChartWrapper tokenList={tokenList}/>
                        </TabPanel>

                        <TabPanel>
                            <BarRaceChart/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </div>
        </div>

    )
}