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
import HeatMapWrapper from "./charts/HeatMapWrapper";

export function MultipleTokens(props: any) {

    const [tokenList, setTokenList] = useState<any[]>([]);


    useEffect(() => {
        getTokenList()
            .then(tl => setTokenList(tl))

    }, [])


    return (
        <div>

            <div style={{...props.style}}>
                <Title title="Multiple Tokens on Avalanche C-Chain" extraInfo={"Comparative analysis between several tokens. Switch between tabs to access different metrics"}/>

                <Tabs variant='soft-rounded' onChange={(index) => console.log("Changed to tab: ", index)} isLazy>
                    <TabList>
                        <Tab>Percentage Change History</Tab>
                        <Tab>Correlation Analysis</Tab>
                        <Tab>Market Cap History</Tab>
                    </TabList>


                    <TabPanels>

                        <TabPanel style={{height: '100%'}}>
                            <HeatMapWrapper/>
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