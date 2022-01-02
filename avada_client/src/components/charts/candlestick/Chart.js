import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import * as d3 from "d3";

import Candle from "./Candle";
import CrossHairs from "./CrossHairs";
import {axisBottom, axisLeft} from "d3";

const Chart = props => {
    const { data, width: chart_width, height: chart_height } = props;

    // console.log("Received data: ", data);
    const svgRef = useRef();
    // let { last_bar_idx = 0, bars_wide = 40 } = props;

    // last_bar_idx should default to the last bar in the data, or else be sure passed-in value doesn't exceed the last bar
    // last_bar_idx = last_bar_idx > 0 ? Math.min(last_bar_idx, data.length - 1) : data.length - 1;

    const [mouseCoords, setMouseCoords] = useState({
        x: 0,
        y: 0
    });


    // find the high and low bounds of all the bars being sidplayed
    const dollar_high = d3.max(data.map(bar => bar.high)) * 1.05;
    const dollar_low = d3.min(data.map(bar => bar.low)) * 0.95;

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


    const addGrid = (svg, xScale, yScale, height , width ) => {
        const tickFormat = "";

        const xAxisGrid = axisBottom(xScale).tickSize(-height).tickFormat(tickFormat).ticks(10);
        const yAxisGrid = axisLeft(yScale).tickSize(-width).tickFormat(tickFormat).ticks(10);
        svg.append('g')
            .attr('class', 'x axis-grid')
            .attr('color', '#c8a1ff')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxisGrid);
        svg.append('g')
            .attr('class', 'y axis-grid')
            .attr('color', '#c8a1ff')
            .call(yAxisGrid);
    }

    const addAxis = (svg, xScale, yScale,width, height, ticks) => {
        // Setup the axes
        const xAxis = d3.axisBottom(xScale)
            .ticks(ticks)
            .tickFormat((i) => i + 1)

        const yAxis = d3.axisLeft(yScale)
            .ticks(5);

        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${height})`)

        svg.append('g')
            .call(yAxis)


        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("x",  - height/2)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Price (USD)");

        return [xAxis, yAxis]
    }

    const drawGraph = () => {

        const xScale = d3.scaleLinear()
            .domain([0, data.length]) // x ticks
            .range([0, props.width]) // x width
        const highs = data.map(d=>d.high);
        const lows = data.map(d=>d.low);
        const yMin = Math.round(lows.reduce((a,b) => Math.min(a,b)));
        const yMax = Math.ceil(highs.reduce((a,b)=> Math.max(a,b)));
        console.log("Y max is: ", yMax);
        console.log("Y min is: ", yMin);
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

        const [xAxis,yAxis] = addAxis(svg,xScale,yScale, props.width,props.height,ticksNumber);


        addGrid(svg,xScale,yScale,props.height,props.width);

    }

    useEffect(() => {
        // console.log("Setting up with prices: ", data);
        drawGraph();
    }, [])



    return (
        <svg
            ref={svgRef}
            width={chart_width}
            height={chart_height}
            onMouseMove={onMouseMoveInside}
            onClick={onMouseClickInside}
            onMouseLeave={onMouseLeave}
        >
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
            <CrossHairs style={{stroke:"black",strokeWidth:2}} x={mouseCoords.x} y={mouseCoords.y} chart_dims={chart_dims} />
        </svg>
    );
};

export default Chart;
