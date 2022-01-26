import React, {useEffect, useState} from "react";
import * as d3 from "d3";
import "./styles.css";
import Chart from "./Chart";
import {getTokenPriceHistoryDB} from "../../../services/tokenService";


export default function CandleStickTemplate(props) {

    let bars_displayed = 40;
    let last_bar_displayed = 0;

    const randomOne = (weight = 1) => {
        return (Math.random() + Math.random() - 1) * weight;
    };




    const buildCandles = (d) => {


        console.log("Candles: ", d);

        return props.data.map((prices, i) => {
            const open =prices.openPrice;
            const close = prices.closePrice
            const high = prices.maximumPrice
            const low = prices.minimumPrice;
            return {
                time: i,
                open,
                high,
                low,
                close
            };
        })

    }


    buildCandles();

    const [data, setData] = useState(buildCandles());
    // const changeData = () => {
    //     setData(generateData);
    //
    // };

    useEffect(()=>{
        console.log("Building candles");
        setData(buildCandles());
    },props.data)


    // const data_on_chart = data.slice()

    return (
        <div>

                <div>
                    <Chart data={data} width={props.width} height={props.height} />
                </div>

        </div>
    );
}
