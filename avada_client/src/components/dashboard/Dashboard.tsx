import {Gainers} from "./Gainers";
import Title from "../genericComponents/Title";
import {Losers} from "./Losers";
import {useEffect, useState} from "react";
import {MarketCap} from "./MarketCap";
import {Box, Grid, HStack, VStack} from "@chakra-ui/react";
import MiniChart from "../charts/miniChart/MiniChart";
import MiniChartContainer from "../charts/miniChart/MiniChartContainer";


export function Dashboard(props:any) {

    const [favoriteTokens, setFavoriteTokens] = useState();
      useEffect(()=>{

      })



    return(<div style={{padding:10}}>
        <Title title="Dashboard" />

        <HStack style={{margin:20}} spacing={10}>


                <MiniChartContainer address="0x50b7545627a5162f82a992c33b87adc75187b218"   width={300} height={150}/>
                <MiniChartContainer address="0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab"   width={300} height={150}/>

                <MiniChartContainer address="0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"  width={300} height={150}/>
                <MiniChartContainer address="0x57319d41f71e81f3c65f2a47ca4e001ebafd4f33"  width={300} height={150}/>

            {/*<MiniChartContainer address="0x5947bb275c521040051d82396192181b413227a3"  width={300} height={150}/>*/}

        </HStack>
        <HStack spacing={"10%"}>
            <MarketCap/>

            <Gainers/>
            <Losers/>
        </HStack>
    </div>)
}