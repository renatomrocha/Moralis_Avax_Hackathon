import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {transition} from "d3-transition";
import {select, selectAll} from "d3-selection";
import {axisBottom, axisLeft} from "d3";
import {getTokenPriceHistoryDB} from "../../../services/tokenService";
import {ColorPalette} from "../../styles/color_palette";


const MiniChart = ({data, width, height,color}:any) => {

    const svgRef = useRef<any>();

    const setupData = (svg:any, line:any, options: any) => {
        // Setup data
        svg
            .append('path')
            .datum(data.map((r:any)=>r.price))
            .attr('id', 'line')
            .attr('stroke', options.strokeColor?options.strokeColor:'black')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', line);
    }

    const setupLinearGraph = () => {

        // Setup svg
        if(data == undefined) {
            return;
        }

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', 'white')
            .style('margin-left', '50')
            .style('overflow', 'visible');

        // Setup scaling
        const xScale: any = d3.scaleLinear()
            .domain([0, data.length]) // x ticks
            .range([0, width]) // x width



        const yMin = Math.round(data.map((r:any)=>r.price).reduce((a:number,b:number) => Math.min(a,b)));
        const yMax = Math.ceil(data.map((r:any)=>r.price).reduce((a:number,b: number)=> Math.max(a,b)));
        console.log("Y max is: ", yMax);
        console.log("Y min is: ", yMin);
        const yScale: any = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([height, 0])

        // Setting up line
        const line = d3.line()
            .x((d, i)=> xScale(i))
            .y(yScale)
            .curve(d3.curveLinear)


        const dataOptions = {strokeColor: color}
        setupData(svg,line, dataOptions);
        return line;
    }


    useEffect(()=>{
        console.log("COLOR is: ", color);

                setupLinearGraph();
    },[])


    return (
            <svg style={{zIndex:-1}} ref={svgRef}>
            </svg>

    )

};

export default MiniChart;