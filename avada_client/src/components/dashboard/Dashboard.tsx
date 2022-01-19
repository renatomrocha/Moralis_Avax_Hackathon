import {Gainers} from "./Gainers";
import Title from "../genericComponents/Title";
import {Losers} from "./Losers";
import {useEffect, useState} from "react";
import {MarketCap} from "./MarketCap";
import {Box, Grid, HStack, VStack} from "@chakra-ui/react";
import MiniChart from "../charts/miniChart/MiniChart";
import MiniChartContainer from "../charts/miniChart/MiniChartContainer";
import PieChart from "../charts/pieChart/PieChart";
import {getTopMCap} from "../../services/dashboardService";
import BarRaceChart from "../charts/barRaceChart/BarRaceChart"


export function Dashboard(props:any) {


    return(<div style={{...props.style}}>
        <Title title="Dashboard" />



        <HStack  spacing={10}>

            {/*<BarRaceChart/>*/}
                <MiniChartContainer address="0x50b7545627a5162f82a992c33b87adc75187b218"   width={300} height={150}/>
                <MiniChartContainer address="0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab"   width={300} height={150}/>
                <MiniChartContainer address="0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"  width={300} height={150}/>
                <MiniChartContainer address="0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd"  width={300} height={150}/>
        </HStack>

        <HStack style={{marginTop:50}}>
            <MarketCap style={{alignItems:'center', marginRight:50}}/>
            <Gainers style={{width:400,  alignItems:'center', marginLeft:50}}/>
            <Losers style={{width:400,  alignItems:'center', margin:20}}/>
        </HStack>


    </div>)
}