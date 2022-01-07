import {Gainers} from "./Gainers";
import Title from "../genericComponents/Title";
import {Losers} from "./Losers";
import {useEffect, useState} from "react";
import {MarketCap} from "./MarketCap";
import {Grid} from "@chakra-ui/react";


export function Dashboard(props:any) {

    const [favoriteTokens, setFavoriteTokens] = useState();
      useEffect(()=>{

      })



    return(<div>
        <Title title="Dashboard" />
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            <Gainers/>
            <Losers/>
            <MarketCap/>
        </Grid>


    </div>)
}