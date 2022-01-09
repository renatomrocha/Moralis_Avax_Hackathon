import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {transition} from "d3-transition";
import {select, selectAll} from "d3-selection";
import {axisBottom, axisLeft} from "d3";
import {getTokenPriceHistoryDB} from "../../../services/tokenService";
import {ColorPalette} from "../../styles/color_palette";


const MiniChart = ({data, width, height}:any) => {



    const [lineGenerator, setLineGenerator] = useState<any>(undefined);



    // useEffect(()=>{
    //     console.log("Data changed to: ", data.length);
    // }, data)


    // console.log("Domain is: ", xDomain);

    const svgRef = useRef<any>();

    function updateChart(data:any) {
        // const {
        //     data,
        // } = props;

        const t : any = transition().duration(1000);

        const line = select('#line');

        const xScale: any = d3.scaleLinear()
            .domain([0, data.length]) // x ticks
            .range([0, width]) // x width

        const yMin = Math.round(data.map((r:any)=>r.price).reduce((a:number,b:number) => Math.min(a,b)));
        const yMax = Math.ceil(data.map((r:any)=>r.price).reduce((a:number,b: number)=> Math.max(a,b)));
        const yScale: any = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([height, 0])

        const lineGenerator = d3.line()
            .x((d, i)=> xScale(i))
            .y(yScale)
            .curve(d3.curveLinear)
        console.log("Line generator is: ", lineGenerator);
        line
            .datum(data)
            .transition(t)
            .attr('d', lineGenerator);
    }


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



    const addAxis = (svg: any, xScale: any, yScale: any,width:number, height: number, ticks: number) => {
        const dateFormat : any = d3.timeFormat('%b')
        // Setup the axes
        const xAxis = d3.axisBottom(xScale)
            // .ticks(d3.timeMonth, 1)
            //     .tickFormat();            // .tickValues(["A","B","C","D","E","F","G","H","I","J"])
            .ticks(ticks)
        // .tickFormat((i: any) => i + 1)

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


    const setupLinearGraph = () => {

        // Setup svg
        console.log("Data is: ", data);
        if(data == undefined) {
            console.log("Data is: ", data)
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
        // setLineGenerator(line);


        const dataOptions = {strokeColor: '#FF1493'}
        console.log("Setting uo data: ", data);
        setupData(svg,line, dataOptions);
        return line;
    }


    useEffect(()=>{

                setupLinearGraph();
    },[])


    return (
        // <div style={{borderStyle:'solid', borderColor:ColorPalette.backgroundColor, borderWidth:1}}>
            <svg style={{zIndex:-1}} ref={svgRef}>
            </svg>

        // </div>
    )

};

export default MiniChart;