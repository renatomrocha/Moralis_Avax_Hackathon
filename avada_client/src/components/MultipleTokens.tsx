import {HeatMap} from "./charts/heatmap/HeatMap";
import React, {useEffect, useState} from "react";
import {fetchTokensForHeatMap, getTokenList, getTokenPriceHistoryDB} from "../services/tokenService";
import {Avatar} from "@chakra-ui/react";
import AvadaSpinner from "./genericComponents/AvadaSpinner";


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

            });
    },[])



    return(
        <>
            {isLoading && <AvadaSpinner style={{width:'100%', height: "100%", marginTop:100, marginLeft:500}} message={`Loading price history`}/>}
            {tokenPrices.length && (<HeatMap tokensList={tokenList} data={tokenPrices}/>)}
        </>

    )
}