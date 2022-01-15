import React, {useEffect, useState} from "react";
import * as d3 from "d3";
import "./styles.css";
import Chart from "./Chart";


export default function CandleStickTemplate(props) {

    let bars_displayed = 40;
    let last_bar_displayed = 0;

    const randomOne = (weight = 1) => {
        return (Math.random() + Math.random() - 1) * weight;
    };




    const buildCandles = () => {

        const mergedPrices = [];
        let idx = 0;
        let candle= [];
        props.data.map((price) => {
            if(idx<4) {
                candle.push(price);
                idx +=1;
            } else {
                mergedPrices.push(candle);
                candle = [];
                idx = 0;
            }
        })

        console.log("Candles: ", mergedPrices);

        return mergedPrices.map((prices, i) => {
            const open =prices[0];
            const close = prices[3];
            const high = prices.reduce((a,b)=> Math.max(a,b))
            const low = prices.reduce((a,b)=> Math.min(a,b))
            return {
                time: i,
                open,
                high,
                low,
                close
            };
        })

    }


    const generateData = () => {
        const length = Math.round(Math.random() * 90) + 10;

        // initial values
        const seed_close = Math.random() * 150 + 50;
        let previous_close = seed_close;
        let previous_volume = Math.random() * 300 + 10;
        let trend = Math.floor(Math.random() * 2) * 2 - 1;

        // calculate each bar
        return d3.range(length).map((item, i) => {
            const open = previous_close * (1 + randomOne(0.1));
            const close = open * (1 + randomOne(0.2) * trend);
            const high = Math.max(open, close) * (1 + randomOne(0.1));
            const low = Math.min(open, close) * (1 - randomOne(0.1));
            const volume = previous_volume * (1 + randomOne(0.5));

            previous_close = close;
            trend = Math.floor(Math.random() * 2) * 2 - 1;

            return {
                time: i,
                open,
                high,
                low,
                close,
                volume
            };
        });
    };
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
