import React, {useEffect, useState} from "react";
import * as d3 from "d3";
import "./styles.css";
import Chart from "./Chart";
import {getTokenPriceHistoryDB} from "../../../services/tokenService";
import BasicChart from "../BasicChart";


export default function CandleStickTemplate(props) {

    let bars_displayed = 40;
    let last_bar_displayed = 0;

    const randomOne = (weight = 1) => {
        return (Math.random() + Math.random() - 1) * weight;
    };




    const buildCandles = (d) => {
        if(!props.data.map(r=>r.minimumPrice)[0])
            return;

        console.log("Candles: ", props.data);
        return props.data.map((prices, i) => {
            const openPrice =prices.openPrice;
            const closePrice = prices.closePrice
            const maximumPrice = prices.maximumPrice
            const minimumPrice = prices.minimumPrice;
            const t = prices.timestamp;
            return {
                time: new Date(t*1000),
                openPrice,
                maximumPrice,
                minimumPrice,
                closePrice
            };
        })

    }


    // buildCandles();

    const [data, setData] = useState(buildCandles());

    useEffect(()=> {
        setData(buildCandles());
    },[])


    useEffect(()=>{
        console.log("Building candles");
        setData(buildCandles());
    },props.data)



    return (
        <div>

                <div>
                    {data && <Chart data={data} dates={props.dates} width={props.width} height={props.height} />}
                </div>

        </div>
    );
}
