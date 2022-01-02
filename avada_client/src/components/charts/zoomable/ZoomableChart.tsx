import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {transition} from "d3-transition";
import {select, selectAll} from "d3-selection";
import {axisBottom, axisLeft} from "d3";
import CrossHairs from "../candlestick/CrossHairs";
import {dollarAt, onMouseLeave, onMouseMoveInside} from "../utils/mouseUtils";


const ZoomableChart = (props: any) => {

    const {data, xDomain,width, height} = props;

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
            lineGenerator, data,
        } = props;

        const t : any = transition().duration(1000);

        const line = select('#line');

        line
            .datum(data)
            .transition(t)
            .attr('d', lineGenerator);
    }
    //
    // const brush = d3.brushX()                 // Add the brush feature using the d3.brush function
    //     .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    //     .on("end", updateChart)
    //
    // let idleTimeout:any;
    // function idled() { idleTimeout = null; }

    // function updateChart() {
    //
    //     const extent = d3.event.selection
    //
    //     // If no selection, back to initial coordinate. Otherwise, update X axis domain
    //     if(!extent){
    //         if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
    //         x.domain([ 4,8])
    //     }else{
    //         x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
    //         scatter.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
    //     }
    //
    //     // Update axis and circle position
    //     xAxis.transition().duration(1000).call(d3.axisBottom(x))
    //     scatter
    //         .selectAll("circle")
    //         .transition().duration(1000)
    //         .attr("cx", function (d:any) { return x(d.Sepal_Length); } )
    //         .attr("cy", function (d:any) { return y(d.Petal_Length); } )
    //
    // }




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
            .attr('color', '#c8a1ff')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxisGrid);
        svg.append('g')
            .attr('class', 'y axis-grid')
            .attr('color', '#c8a1ff')
            .call(yAxisGrid);
    }


    const addAxis = (svg: any, xScale: any, yScale: any,width:number, height: number, ticks: number) => {
        // Setup the axes
        const xAxis = d3.axisBottom(xScale)
            .ticks(ticks)
            .tickFormat((i: any) => i + 1)

        const yAxis = d3.axisLeft(yScale)
            .ticks(5);

        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${height})`)

        svg.append('g')
            .call(yAxis)


        // svg.append("text")
        //     .attr("class", "x label")
        //     .attr("text-anchor", "end")
        //     .attr("x", width/2)
        //     .attr("y", height)
        //     .text("Date");

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

    const setupLinearGraph = (prices: any[]) => {

        // Setup svg


        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#e4d1ff')
            .style('margin-left', '50')
            .style('overflow', 'visible');

        // Setup scaling
        const xScale: any = d3.scaleLinear()
            .domain([0, prices.length]) // x ticks
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

        const ticksNumber = 10;

        const [xAxis,yAxis] = addAxis(svg,xScale,yScale, width,height,ticksNumber);


        addGrid(svg,xScale,yScale,height,width);


        const dataOptions = {strokeColor: '#FF1493'}
        setupData(svg, data,line, dataOptions);


        //
        // svg.
        // append("g")
        //     .attr("class", "brush")
        //     .call(brush);

    }




    useEffect(() => {
            console.log("Setting up with prices: ", data);
            setupLinearGraph(data);
        }, [])


        return (
            <div>
                <svg onMouseMove={(e)=>onMouseMoveInside(e, setMouseCoords)}
                     onMouseLeave={()=>onMouseLeave(setMouseCoords)}
                     style={{marginLeft: "100px", zIndex:-1}} ref={svgRef}>
                    <text x="10" y="16" fill="white" fontSize="10">
                        {/*<tspan>*/}
                        {/*    Mouse: {mouseCoords.x}, {mouseCoords.y}*/}
                        {/*</tspan>*/}
                        <tspan x="10" y="30" color="black">
                            Dollars: ${dollarAt(mouseCoords.y, chart_dims)}
                        </tspan>
                    </text>
                    <CrossHairs style={{stroke:"black",strokeWidth:2}} x={mouseCoords.x} y={mouseCoords.y} chart_dims={{pixel_width: width, pixel_height: height}} />
                </svg>

            </div>
        )

};

export default ZoomableChart;