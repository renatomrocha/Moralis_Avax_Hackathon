import {HeatMap} from "./charts/heatmap/HeatMap";
import React, {useEffect, useState} from "react";
import {fetchTokensForHeatMap, getTokenList, getTokenPriceHistoryDB} from "../services/tokenService";
import {Avatar, Flex, HStack, Select, Tab, TabList, TabPanel, TabPanels, Tabs, VStack} from "@chakra-ui/react";
import AvadaSpinner from "./genericComponents/AvadaSpinner";
import {ColorPalette} from "./styles/color_palette";
import Title from "./genericComponents/Title";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

export function MultipleTokens(props:any) {

    const [tokenList, setTokenList] = useState<any[]>([]);
    const [interval, setInterval] = useState<any>();
    const [intervalStep, setIntervalStep] = useState<string>("Token1Day");
    const [tokenPrices, setTokenPrices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        fetchTokensForHeatMap(intervalStep, interval)
            .then((tp)=>{
                console.log("Received ", tp.length, " data points");
                setTokenPrices(tp)
                setIsLoading(false);
                getTokenList()
                    .then(tl => setTokenList(tl))

            });
    },[])

    const handleCheckBoxChange = (e: any, idx: number) => {

        console.log("Token : ", tokenList[idx].symbol + " no longer selected");
        setTokenPrices(tokenPrices.filter(tp=>tp.symbol != tokenList[idx].symbol));
        console.log("Token prices are now: ", tokenPrices);


    }



    return(
        <Flex>

            <div style={{...props.style,height:'100vh', width: '100%',overflow:"auto"}}>
                <Title title="Multiple Token analysis"></Title>
                {isLoading && <AvadaSpinner style={{width:'100%', height: "100%", marginTop:100, marginLeft:500}} message={`Loading price history`}/>}

                <Tabs variant='enclosed'>
                    <TabList>
                        <Tab>Percentage Change</Tab>
                        <Tab>Correlation</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {tokenPrices.length && (<div>


                                {tokenList && <div>

                                    {tokenList.map((t:any, idx: number) => <Checkbox defaultIsChecked onChange={(e)=>handleCheckBoxChange(e, idx)}>{t.symbol}</Checkbox>)}

                                </div>}


                                <HeatMap tokensList={tokenList} data={tokenPrices}/>

                            </div>)}
                        </TabPanel>
                        <TabPanel>
                            <p>Correlation!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                </div>
        </Flex>

    )
}