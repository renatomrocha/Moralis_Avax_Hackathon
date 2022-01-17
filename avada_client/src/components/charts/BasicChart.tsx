import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {transition} from "d3-transition";
import {select, selectAll} from "d3-selection";
import {axisBottom, axisLeft} from "d3";
import CrossHairs from "./candlestick/CrossHairs";
import {dollarAt, onMouseLeave, onMouseMoveInside} from "./utils/mouseUtils";
import {ColorPalette} from "../styles/color_palette";


const BasicChart = (props: any) => {

    const {data,width, height, dates} = props;

    const [lineGenerator, setLineGenerator] = useState<any>(undefined);

    const [mouseCoords, setMouseCoords] = useState({
        x: 0,
        y: 0
    });

    const dollar_low = Math.round(data.reduce((a:number,b:number) => Math.min(a,b)));
    const dollar_high = Math.ceil(data.reduce((a:number,b: number)=> Math.max(a,b)));


    const chart_dims = {
        pixel_width: width,
        pixel_height: height,
        dollar_high,
        dollar_low,
        dollar_delta: dollar_high - dollar_low
    };


    // console.log("Domain is: ", xDomain);

    const svgRef = useRef<any>();

    function updateChart() {
        const {
             data,
        } = props;

        const t : any = transition().duration(1000);

        const line = select('#line');

        console.log("Dates is: ", dates.length);
        console.log("Date is: ", data.length);
        // const xScale: any = d3.scaleTime().domain([Date.now(), Date.now() + 24 * 60 * 60 * 1000]).width(0,width)

        const xScale = d3.scaleLinear()
            // .domain([dates[0],dates[dates.length -1]]) // x ticks
            .domain([0,data.length -1]) // x ticks
            .range([0, width]) // x width

        const yMin = Math.round(data.reduce((a:number,b:number) => Math.min(a,b)));
        const yMax = Math.ceil(data.reduce((a:number,b: number)=> Math.max(a,b)));
        const yScale: any = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([height, 0])

        const lineGenerator = d3.line()
            .x((d, i)=> xScale(i))
            .y(yScale)
            .curve(d3.curveLinear)

        line
            .datum(data)
            .transition(t)
            .attr('d', lineGenerator);
    }


    const setupData = (svg:any, data:any, line:any, options: any) => {
        // Setup data
        svg
            .append('path')
            .datum(data)
            .attr('id', 'line')
            .attr('stroke', options.strokeColor?options.strokeColor:'black')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', line);
    }


    const addGrid = (svg: any, xScale : any, yScale : any, height : any, width : any) => {
        const tickFormat : any = "";

        const xAxisGrid : any = axisBottom(xScale).tickSize(-height).tickFormat(tickFormat).ticks(10);
        const yAxisGrid : any = axisLeft(yScale).tickSize(-width).tickFormat(tickFormat).ticks(10);
        svg.append('g')
            .attr('class', 'x axis-grid')
            .attr('color', ColorPalette.secondaryColor)
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxisGrid);
        svg.append('g')
            .attr('class', 'y axis-grid')
            .attr('color', ColorPalette.secondaryColor)
            .call(yAxisGrid);
    }


    const addAxis = (svg: any, xScale: any, yScale: any,width:number, height: number, ticks: number) => {
        const dateFormat : any = d3.timeFormat('%b')
        // Setup the axes



        // const xAxis = d3.axisBottom(xScale)
        //     .tickValues()
        // // .ticks(d3.timeMonth, 1)
        //     .ticks(ticks)
            // .tickFormat((i: any) => i + 1)

        const yAxis = d3.axisLeft(yScale)
            .ticks(5);

        const xAxis = d3.axisBottom(xScale)
            .ticks(5);

        // svg.append('g')
        //     .call(xAxis)
        //     .attr('transform', `translate(0, ${height})`)
        // svg.append("g")
        //     // .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(xScale).tickValues([dates[0], dates[dates.length -1]]))
                // .tickValues([Date.now() / 1000 - 1000, Date.now() / 1000]))

        svg.append('g')
            .call(xAxis)

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


    }


    const setupLinearGraph = (prices: any[]) => {

        // Setup svg


        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', 'white')
            .style('margin-left', '50')
            .style('overflow', 'visible');

        // Setup scaling

        const xScale: any = d3.scaleTime()
            // @ts-ignore
            .domain([0,data.length -1]) // x ticks
            .range([0, width]) // x width
        // const xType = d3.scaleUtc;
        // const xDomain = [dates[0], dates[dates.length -1]];
        // const xRange = [0, width];
        // const xScale = xType(xDomain, xRange).interpolate(d3.interpolateRound);


        const yMin = Math.round(data.reduce((a:number,b:number) => Math.min(a,b)));
        const yMax = Math.ceil(data.reduce((a:number,b: number)=> Math.max(a,b)));
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
        // setLineGenerator(line);

        const ticksNumber = 10;

        console.log("Before building axis, xScale is: ", xScale);
        addAxis(svg,xScale,yScale, width,height,ticksNumber);


        addGrid(svg,xScale,yScale,height,width);


        const dataOptions = {strokeColor: ColorPalette.highlight}
        setupData(svg, data,line, dataOptions);
        return line;
    }


    useEffect(()=>{

        setupLinearGraph(data);
    },[])


    useEffect(() => {
        updateChart()
        }, [data])


        return (
            <div>
                <svg onMouseMove={(e)=>onMouseMoveInside(e, setMouseCoords)}
                     onMouseLeave={()=>onMouseLeave(setMouseCoords)}
                     style={{marginLeft: "100px", zIndex:-1}} ref={svgRef}>
                    <text x="10" y="16" fill="black" fontSize="20">
                        <tspan x="10" y="30" color="black">
                            Dollars: ${dollarAt(mouseCoords.y, chart_dims)}
                        </tspan>
                    </text>
                    <CrossHairs style={{stroke:"black",strokeWidth:2}} x={mouseCoords.x} y={mouseCoords.y} chart_dims={{pixel_width: width, pixel_height: height}} />
                </svg>

            </div>
        )

};

export default BasicChart;