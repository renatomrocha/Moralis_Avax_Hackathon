import * as d3 from "d3";
import {useEffect} from "react";
import {Checkbox, HStack, Stack} from "@chakra-ui/react";
import {dateFromTimeStamp} from "../../../utils/dateUtils";
import {ColorPalette} from "../../styles/color_palette";


export function HeatMap(props) {

    const {data, tokensList} = props;

    useEffect(()=>console.log("Prices updated!!"),[data])


    useEffect(()=>{



        console.log("Received data: ", data);
        const margin = {top: 80, right: 25, bottom: 30, left: 40},
            width = 1000 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data


        // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
        const myGroups = Array.from(new Set(data.map(d => d.timestamp)))
        const myVars = Array.from(new Set(data.map(d => d.symbol)))

        // Build X scales and axis:
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(myGroups)
            .padding(0.05);
        // svg.append("g")
        //     .style("font-size", 15)
        //     .attr("transform", `translate(0, ${height})`)
        //     .call(d3.axisBottom(x).tickValues(myGroups[0], myGroups[myGroups.length -1 ]).tickSize(0))
        //     .select(".domain").remove()

        // Build Y scales and axis:
        const y = d3.scaleBand()
            .range([ height, 0 ])
            .domain(myVars)
            .padding(0.05);
        svg.append("g")
            .style("font-size", 15)
            .call(d3.axisLeft(y).tickSize(0))
            .select(".domain").remove()

        // Build color scale
        const pctgColor = d3.scaleSequential()
            .interpolator(d3.interpolate(ColorPalette.red,ColorPalette.green))
            .domain([-0.1,0.1])

        const btcColor = d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([1,100000])


        const ethColor = d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([1,10000])



        // create a tooltip
        const tooltip = d3.select("#my_dataviz")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        // Three function that change the tooltip when user hover / move / leave a cell
        const mouseover = function(event,d) {
            tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }
        const mousemove = function(event,d) {
            tooltip
                .html(d.symbol + ' changed ' +(d.pctChange * 100).toFixed(2)  + '% @ ' + dateFromTimeStamp(d.timestamp))
                .style("position", "absolute")
                .style("left", (event.clientX + 10) + "px")
                .style("top", (event.clientY - 60) + "px")

        }
        const mouseleave = function(event,d) {

            tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.8)
        }

        // add the squares
        svg.selectAll()
            .data(data, function(d) {return d.timestamp+':'+d.symbol;})
            .join("rect")
            .attr("x", function(d) { return x(d.timestamp) })
            .attr("y", function(d) { return y(d.symbol) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) {
                return pctgColor(d.pctChange);

            } )
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

    },[])






    return (<>

        <div id="my_dataviz" style={{width: 800, height: 800}}/>

    </>)


}