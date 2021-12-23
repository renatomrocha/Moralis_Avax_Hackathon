import React, {useEffect, useState} from "react";
import {getTokenPriceHistory} from "../services/tokenService";
import LineChart from "./LineChart";
import BasicChart from "./BasicChart";
import {synchronizeTokenPrice} from "../services/testService";
import {useParams} from "react-router-dom";
import {Button} from "@chakra-ui/react";


function TokenView(props:any)  {

    const [tokenList, setTokenList] = useState<any>(0)
    const [tokenPrices, setTokenPrices] = useState <any[]>([])

    const {address} = useParams();

    useEffect(()=>{
        const interval = ["2021-12-17", "2021-12-18","2021-12-19", "2021-12-20"];

        getTokenPriceHistory("0x5947bb275c521040051d82396192181b413227a3", interval)
            .then((h:any[])=> {

                setTokenPrices([...h.map(r=>Math.round(r.usdPrice))]);
                console.log("Got price history: ", tokenPrices)})
    },[])


    return (
        <div>
            <h1>Token</h1>
            {/*{tokenPrices.length && (<LineChart tokenPrices={tokenPrices} />)}*/}
            <div>
            {tokenPrices.length && <LineChart  width={400} height={300} />}
            </div>
            <Button style={{marginTop:100}} onClick={()=> synchronizeTokenPrice(address)}>Synchronize prices for {address}</Button>
        </div>
    );

}


export default TokenView;