import React, {useEffect, useState} from "react";
import {getTokenByAddress, getTokenPriceHistory, getTokenPriceHistoryDB} from "../services/tokenService";
import LineChart from "./LineChart";
import {synchronizeTokenPrice} from "../services/testService";
import {useParams} from "react-router-dom";
import {Button} from "@chakra-ui/react";

import BasicChart from "./charts/BasicChart";
import Title from "./Title";
import TimescaleSelection from "./TimescaleSelection";


function TokenView(props:any)  {

    const [tokenInfo, setTokenInfo] = useState<any>(null);
    const [tokenPrices, setTokenPrices] = useState <any[]>([]);
    const [dates, setDates] = useState<any[]>([]);

    const {address} = useParams<string>();

    useEffect(()=>{
        const interval = ["2021-12-17", "2021-12-18","2021-12-19", "2021-12-20"];

        getTokenByAddress(address)
            .then((ti)=>{
                setTokenInfo(ti);
            })

        getTokenPriceHistoryDB(address, interval)
            .then((h:any[])=> {
                setTokenPrices([...h.map(r=>r.price)]);
                setDates([...h.map(h=>h.date)]);
                console.log("Got price history: ", tokenPrices)})
    },[])


    return (
        <div>
            {/*<Title title="Token"/>*/}
            {tokenInfo && (<div style={{margin:20}}><h2>{tokenInfo.name} / {tokenInfo.symbol}</h2></div>)}

            {/*/!*{tokenPrices.length && (<LineChart tokenPrices={tokenPrices} />)}*!/*/}
            {/*{render(<Chart />, document.getElementById('chart'))*/}
            {/*}*/}
            {/*}*/}
            {/*<Chart/>*/}
            {/*<div id="chart"> </div>*/}
            {tokenPrices.length && <BasicChart data={tokenPrices} xDomain={dates}  width={400} height={300} />}

                <TimescaleSelection width={100} margin={30}/>

            <Button style={{marginTop:100}} onClick={()=> synchronizeTokenPrice(address)}>Synchronize prices for {address}</Button>
        </div>
    );

}


export default TokenView;