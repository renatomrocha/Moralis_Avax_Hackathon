import * as d3 from "d3";
import {useEffect} from "react";



const data = [{year: 1880, Amanda: 241,Ashley:1000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1881, Amanda: 500,Ashley:10000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1882, Amanda: 2000,Ashley:4500,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1883, Amanda: 6000,Ashley:2000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1884, Amanda: 4000,Ashley:3000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1885, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
        {year: 1886, Amanda: 241,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    {year: 1887, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    {year: 1888, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},

    ]





export default function SteamGraph() {

    useEffect(()=>{
        buildChart();
    }, [])


    const buildChart=()=>{
        var margin = {top: 20, right: 30, bottom: 0, left: 10},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select("#steam_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data

    console.log("Data is: ", data);

    // List of groups = header of the csv files
    var keys = ["year","Amanda","Ashley","Betty","Deborah","Dorothy","Helen","Linda","Patricia"];

    // Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.year; }))
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height*0.8 + ")")
        .call(d3.axisBottom(x).tickSize(-height*.7).tickValues([1900, 1925, 1975, 2000]))
        .select(".domain").remove()
    // Customization
    svg.selectAll(".tick line").attr("stroke", "#b8b8b8")

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height-30 )
        .text("Time (year)");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([-100000, 100000])
        .range([ height, 0 ]);

    // color palette
    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeDark2);

    //stack the data?
    var stackedData = d3.stack()
        .offset(d3.stackOffsetSilhouette)
        .keys(keys)
        (data)

    // create a tooltip
    var Tooltip = svg
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .style("opacity", 0)
        .style("font-size", 17)

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        Tooltip.style("opacity", 1)
        d3.selectAll(".myArea").style("opacity", .2)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    var mousemove = function(d,i) {
        let grp = keys[i]
        Tooltip.text(grp)
    }
    var mouseleave = function(d) {
        Tooltip.style("opacity", 0)
        d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
    }

    // Area generator
    var area = d3.area()
        .x(function(d) { return x(d.data.year); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })

    // Show the areas
    svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", "myArea")
        .style("fill", function(d) { return color(d.key); })
        .attr("d", area)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)


}

    return (<div id="steam_graph"></div>)

}