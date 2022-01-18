import {axisBottom, axisLeft} from "d3";
import {ColorPalette} from "../../styles/color_palette";
import * as d3 from "d3";

export const addGrid = (svg: any, xScale : any, yScale : any, height : any, width : any) => {
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


export const updateGrid = (svg: any, xScale : any, yScale : any, height : any, width : any) => {
    const tickFormat : any = "";

    const xAxisGrid : any = axisBottom(xScale).tickSize(-height).tickFormat(tickFormat).ticks(10);
    const yAxisGrid : any = axisLeft(yScale).tickSize(-width).tickFormat(tickFormat).ticks(10);
    svg.selectAll('g.y.axis-grid')
        .attr('class', 'y axis-grid')
        .attr('color', ColorPalette.secondaryColor)
        .call(xAxisGrid)

    svg.selectAll('g.y.axis-grid')
        .attr('class', 'y axis-grid')
        .attr('color', ColorPalette.secondaryColor)
        .call(yAxisGrid);
}



export const addAxis = (svg: any, xScale: any, yScale: any, width:number, height: number, xTicks:number, yTicks:number , xLabel: string, yLabel: string) => {
    const dateFormat : any = d3.timeFormat('%b')
    // Setup the axes

    const yAxis = d3.axisLeft(yScale)
        .ticks(5);

    const xAxis = d3.axisBottom(xScale)
        .ticks(5);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('color', ColorPalette.mainColor)
        .attr("transform","translate(0," + height + ")")
        .call(xAxis)

    svg.append('g')
        .attr('color', ColorPalette.mainColor)
        .attr('class', 'y axis')
        .call(yAxis)


    svg.append("text")
        .attr("class", "y label")
        .attr('color', ColorPalette.mainColor)
        .attr("text-anchor", "end")
        .attr("y", -50 - 10)
        .attr("x",  - height/2 + 10)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text(yLabel);
}


