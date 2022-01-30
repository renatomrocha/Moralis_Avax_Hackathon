import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import * as d3 from "d3";

import Candle from "./Candle";
import CrossHairs from "./CrossHairs";
import {axisBottom, axisLeft} from "d3";
import {dollarAt, onMouseLeave, onMouseMoveInside} from "../utils/mouseUtils";
import {transition} from "d3-transition";
import {select} from "d3-selection";
import {ColorPalette} from "../../styles/color_palette";
import {addAxis, addGrid, updateGrid} from "../utils/plotUtils";

const Chart = props => {
    const { data, width: chart_width, height: chart_height, dates } = props;

    // console.log("Received data: ", data);
    const svgRef = useRef();
    // let { last_bar_idx = 0, bars_wide = 40 } = props;

    // last_bar_idx should default to the last bar in the data, or else be sure passed-in value doesn't exceed the last bar
    // last_bar_idx = last_bar_idx > 0 ? Math.min(last_bar_idx, data.length - 1) : data.length - 1;

    const [mouseCoords, setMouseCoords] = useState({
        x: 0,
        y: 0
    });

    console.log("Data is: ", data);
    // find the high and low bounds of all the bars being sidplayed
    const dollar_high = d3.max(data.map(bar => bar.maximumPrice)) * 1.05;
    const dollar_low = d3.min(data.map(bar => bar.minimumPrice)) * 0.95;

    console.log(`Highs are: high ${dollar_high} and low ${dollar_low}`);

    const chart_dims = {
        pixel_width: chart_width,
        pixel_height: chart_height,
        dollar_high,
        dollar_low,
        dollar_delta: dollar_high - dollar_low
    };

    const dollarAt = pixel => {
        const dollar =
            (Math.abs(pixel - chart_dims.pixel_height) / chart_dims.pixel_height) *
            chart_dims.dollar_delta +
            chart_dims.dollar_low;

        return pixel > 0 ? dollar.toFixed(2) : "-";
    };

    const pixelFor = dollar => {
        return Math.abs(
            ((dollar - chart_dims["dollar_low"]) / chart_dims["dollar_delta"]) *
            chart_dims["pixel_height"] -
            chart_dims["pixel_height"]
        );
    };

    const onMouseLeave = () => {
        setMouseCoords({
            x: 0,
            y: 0
        });
    };

    const onMouseMoveInside = e => {
        setMouseCoords({
            x:
                e.nativeEvent.x -
                Math.round(e.currentTarget.getBoundingClientRect().left),
            y:
                e.nativeEvent.y -
                Math.round(e.currentTarget.getBoundingClientRect().top)
        });
    };

    const onMouseClickInside = e => {
        console.log(`Click at ${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`);
    };

    // calculate the candle width
    const candle_width = Math.floor((chart_width / data.length) * 0.7);


    function updateChart() {
        const {
            data,
        } = props;

        const svg = d3.select(svgRef.current);

        const xScale = d3.scaleTime()
            .domain([new Date(dates[0]*1000),new Date(dates[dates.length -1] * 1000)]) // x ticks
            .range([0, props.width]) // x width
        const highs = data.map(d=>d.maximumPrice);
        const lows = data.map(d=>d.minimumPrice);
        const yMin = Math.round(lows.reduce((a,b) => Math.min(a,b)));
        const yMax = Math.ceil(highs.reduce((a,b)=> Math.max(a,b)));
        const yScale = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([props.height, 0])


        const xAxis = d3.axisBottom(xScale)
            .ticks(5);

        svg.selectAll('g.x.axis')
            .attr("transform","translate(0," + props.height + ")")
            .call(xAxis);

        const yAxis = d3.axisLeft(yScale)
            .ticks(5);

        svg.selectAll('g.y.axis')
            .call(yAxis);



        updateGrid(svg,xScale,yScale,props.height,props.width);

    }




    const drawGraph = (data) => {

        const xScale = d3.scaleTime()
            .domain([new Date(dates[0]*1000),new Date(dates[dates.length -1] * 1000)]) // x ticks
            .range([0, props.width]) // x width

        const highs = data.map(d=>d.maximumPrice);
        const lows = data.map(d=>d.minimumPrice);
        const yMin = Math.round(lows.reduce((a,b) => Math.min(a,b)));
        const yMax = Math.ceil(highs.reduce((a,b)=> Math.max(a,b)));

        const yScale = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([props.height, 0])

        const ticksNumber = 10;

        const svg = d3.select(svgRef.current)
            .attr('width', props.width)
            .attr('height', props.height)
            .style('background', 'white')
            .style('margin-left', '50')
            .style('overflow', 'visible');

        console.log("Before adding axis xScale is: ", xScale);
        console.log("Before adding axis yScale is: ", yScale);


        addAxis(svg,xScale,yScale, props.width,props.height,5,5,'Date', 'USD Price');


        addGrid(svg,xScale,yScale,props.height,props.width);

    }

    useEffect(() => {
        console.log("Setting up with prices: ", data);
        drawGraph(data);
    }, [])


    useEffect(() => {
        updateChart();
    },[data])



    return (
        <svg
            ref={svgRef}
            width={chart_width}
            height={chart_height}
            // onMouseMove={onMouseMoveInside}
            onClick={onMouseClickInside}
            // onMouseLeave={onMouseLeave}

            onMouseMove={(e)=>onMouseMoveInside(e, setMouseCoords)}
            onMouseLeave={()=>onMouseLeave(setMouseCoords)}
            style={{marginLeft: "100px", zIndex:-1}} ref={svgRef}>
            <text x="10" y="16" fill="black" fontSize="20">
                <tspan x="10" y="30" color="black">
                    Dollars: ${dollarAt(mouseCoords.y, chart_dims)}
                </tspan>
            </text>
            {data.map((bar, i) => {
                const candle_x = (chart_width / (data.length + 1)) * (i + 1);
                return (
                    <Candle
                        key={i}
                        data={bar}
                        x={candle_x}
                        candle_width={candle_width}
                        pixelFor={pixelFor}
                    />
                );
            })}
            <text x="10" y="16" fill="white" fontSize="10">
                <tspan x="10" y="30">
                    Dollars: ${dollarAt(mouseCoords.y)}
                </tspan>
            </text>
            <CrossHairs style={{stroke:ColorPalette.mainColor,strokeWidth:2}} x={mouseCoords.x} y={mouseCoords.y} chart_dims={chart_dims} />
        </svg>
    );
};

export default Chart;
