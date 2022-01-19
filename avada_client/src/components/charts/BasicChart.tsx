import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {transition} from "d3-transition";
import {select, selectAll} from "d3-selection";
import {axisBottom, axisLeft} from "d3";
import CrossHairs from "./candlestick/CrossHairs";
import {dollarAt, onMouseLeave, onMouseMoveInside} from "./utils/mouseUtils";
import {ColorPalette} from "../styles/color_palette";
import {addAxis, addGrid, updateGrid} from "./utils/plotUtils";


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

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', 'white')
            .style('margin-left', '50')
            .style('overflow', 'visible');


        const xScale: any = d3.scaleTime()
            .domain([new Date(dates[0]*1000),new Date(dates[dates.length -1] * 1000)]) // x ticks
            .range([0, width]) // x width

        const yMin = Math.round(data.reduce((a:number,b:number) => Math.min(a,b)));
        const yMax = Math.ceil(data.reduce((a:number,b: number)=> Math.max(a,b)));
        const yScale: any = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([height, 0])


        const xAxis: any = d3.axisBottom(xScale)
            .ticks(5);

        svg.selectAll('g.x.axis')
            .attr("transform","translate(0," + height + ")")
            .call(xAxis);

        const yAxis: any = d3.axisLeft(yScale)
            .ticks(5);

        svg.selectAll('g.y.axis')
            .call(yAxis);


        updateGrid(svg,xScale,yScale,height,width);


        const lineGenerator = d3.line()
            .x((d, i)=> xScale(new Date(dates[i]*1000)))
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
            .domain([new Date(dates[0]*1000),new Date(dates[dates.length -1] * 1000)]) // x ticks
            .range([0, width]) // x width


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

        addAxis(svg,xScale,yScale, width,height,5,5,'Date', 'USD Price');

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
                    <text x="10" y="16" fill={ColorPalette.mainColor} fontSize="25">
                        <tspan x="10" y="30" color={ColorPalette.red}>
                            Dollars: ${dollarAt(mouseCoords.y, chart_dims)}
                        </tspan>
                    </text>
                    <CrossHairs style={{stroke:ColorPalette.red,strokeWidth:2}} x={mouseCoords.x} y={mouseCoords.y} chart_dims={{pixel_width: width, pixel_height: height}} />
                </svg>

            </div>
        )

};

export default BasicChart;