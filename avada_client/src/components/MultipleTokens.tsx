import {HeatMap} from "./charts/heatmap/HeatMap";
import React, {useEffect, useState} from "react";
import {fetchTokensForHeatMap, getTokenList, getTokenPriceHistoryDB} from "../services/tokenService";
import {Avatar, HStack, Select} from "@chakra-ui/react";
import AvadaSpinner from "./genericComponents/AvadaSpinner";
import {ColorPalette} from "./styles/color_palette";
import Title from "./genericComponents/Title";


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
        <HStack>

            <div style={{...props.style,height:'100vh', width: '100%',overflow:"auto"}}>
                <Title title="Multiple Token analysis"></Title>
                {isLoading && <AvadaSpinner style={{width:'100%', height: "100%", marginTop:100, marginLeft:500}} message={`Loading price history`}/>}
                {tokenPrices.length && (<div>


                    <HeatMap tokensList={tokenList} data={tokenPrices}/></div>)}
            </div>

        </HStack>
    )
}