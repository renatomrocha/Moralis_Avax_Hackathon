import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import {transition} from "d3-transition";
import {select, selectAll} from "d3-selection";

function LineChart(props: any) {
    const { width, height } = props;
    const svgRef = useRef<any>();

    const [data] = useState([21,30,42,52,37,19])

    useEffect(() => {
        drawChart();
    }, []);


    function updateChart() {
        const {
            lineGenerator, xScale, yScale, data,
        } = props;

        const t : any = transition().duration(1000);

        const line = select('#line');
        const dot = selectAll('.circle');

        line
            .datum(data)
            .transition(t)
            .attr('d', lineGenerator);

        // dot
        //   .data(data)
        //   .transition(t)
        //   .attr('cx', (d, key) => xScale(key))
        //   .attr('cy', d => yScale(d.count));
    }



    function drawChart() {
        // Add logic to draw the chart here

        const margin : any = { top: 50, right: 50, bottom: 50, left: 50 };
        const yMinValue : any = d3.min(data, (d:any) => d.value);
        const yMaxValue : any = d3.max(data, (d:any) => d.value);
        const xMinValue : any = d3.min(data, (d:any) => d.label);
        const xMaxValue : any = d3.max(data, (d:any) => d.label);
        const svg = d3
            .select(svgRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);const tooltip = d3
            .select(svgRef.current)
            .append('div')
            .attr('class', 'tooltip');
        const xScale = d3
            .scaleLinear()
            .domain([xMinValue, xMaxValue])
            .range([0, width]);const yScale = d3
            .scaleLinear()
            .range([height, 0])
            .domain([0, yMaxValue]);
            const line:any = d3
            .line()
            .x((d:any) => xScale(d.label))
            .y((d:any) => yScale(d.value))
            .curve(d3.curveMonotoneX);

        svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${height})`)
            .call(
                d3.axisBottom(xScale)
                    .tickSize(-height)
                    .tickFormat(null),
            );
            svg
                .append('g')
                .attr('class', 'grid')
                .call(
                    d3.axisLeft(yScale)
                        .tickSize(-width)
                        .tickFormat(null),
                );
            svg
                .append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(xScale).tickSize(15));

            svg
                .append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(yScale));

            svg
                .append('path')
                .datum(data)
                .attr('id', 'line')
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'none')
                .attr('d', line);

    }
    return <svg ref={svgRef} />;
}

export default LineChart;