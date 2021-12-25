import React, {useEffect, useRef} from "react";
import * as d3 from "d3";
import {transition} from "d3-transition";
import {select, selectAll} from "d3-selection";


const BasicChart = (props: any) => {

    const {data} = props;

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

    const setupLinearGraph = (prices: any[]) => {

        // Setup svg
        const width = 1000;
        const height = 400;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#F5F5F5')
            .style('margin-left', '50')
            .style('overflow', 'visible');

        // Setup scaling
        const xScale: any = d3.scaleLinear()
            .domain([0, prices.length - 1]) // x ticks
            .range([0, width]) // x width
        const yScale: any = d3.scaleLinear()
            .domain([0, 30])
            .range([height, 0])

        // Setting up line
        const line = d3.line()
            .x((d, i)=> xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal)

        // Setup the axes
        const xAxis = d3.axisBottom(xScale)
            .ticks(prices.length)
            .tickFormat((i: any) => i + 1)
        const yAxis = d3.axisLeft(yScale)
            .ticks(5);


        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${height})`)
        svg.append('g')
            .call(yAxis)

        // Setup data
        svg
            .append('path')
            .datum(data)
            .attr('id', 'line')
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', line);
    }

        useEffect(() => {
            console.log("Setting up with prices: ", data);
            setupLinearGraph(data);
        }, [])


        return (
            <div>
                <svg style={{marginLeft: "100px"}} ref={svgRef}/>
            </div>
        )

};

export default BasicChart;