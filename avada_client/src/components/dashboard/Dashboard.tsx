import {Gainers} from "./Gainers";
import Title from "../genericComponents/Title";
import {Losers} from "./Losers";
import {MarketCap} from "./MarketCap";
import {Box, Grid, HStack, VStack} from "@chakra-ui/react";
import MiniChartContainer from "../charts/miniChart/MiniChartContainer";



export function Dashboard(props:any) {


    return(<div style={{...props.style}}>
        <Title title="Dashboard" extraInfo={"Summary dashboard for Avalanche C-chain"}/>

        <HStack style={{marginTop:40}}  spacing={10}>
            <div style={{width:350,height:250}}>
                <MiniChartContainer address="0x50b7545627a5162f82a992c33b87adc75187b218"   width={300} height={150}/>
            </div>
            <div style={{width:350,height:250}}>
                <MiniChartContainer address="0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab"   width={300} height={150}/>
            </div>
            <div style={{width:350,height:250}}>
                <MiniChartContainer address="0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"  width={300} height={150}/>
            </div>
            <div style={{width:350,height:250}}>
                <MiniChartContainer address="0xb54f16fb19478766a268f172c9480f8da1a7c9c3"  width={300} height={150}/>
            </div>
        </HStack>

        <HStack style={{marginTop:50}}>
            <MarketCap style={{alignItems:'center', marginRight:50}}/>
            <Gainers style={{width:400,  alignItems:'center', marginLeft:50}}/>
            <Losers style={{width:400,  alignItems:'center', margin:20}}/>
        </HStack>
    </div>)
}