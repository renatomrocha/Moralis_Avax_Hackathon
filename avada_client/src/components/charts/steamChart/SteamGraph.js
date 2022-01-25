import * as d3 from "d3";
import {useEffect, useState} from "react";
import {ColorPalette} from "../../styles/color_palette";



export default function SteamGraph(props) {

    const [data, setData] = useState([]);
    const [maxKey, setMaxKey] = useState(null);


    const getMax = (d, keys) => {
        const maxArray = [];
        const maxKey = []

        keys.forEach((key,idx)=>{
            const arr = d.map((a)=>a[key]);
            console.log("MAximu array: ", arr);
            maxArray.push( Math.max(...arr));
            maxKey.push(key);
        })
        const absMax = Math.max(...maxArray);
        const index = maxArray.indexOf(absMax);
        setMaxKey(maxKey[index]);
        console.log("Max array is: ", maxArray);
        return absMax;
    }



    useEffect(()=> {
        // console.log("Initialized!!");
        // console.log("Received data: ", props.data);
        if(d3.selectAll("svg")) {
            d3.selectAll("svg").remove();
            d3.selectAll(".tooltip").remove();
        }
        setData(props.data);
        buildChart(props.data);

    },[props.data])


    const buildChart=(chartData)=>{
        var margin = {top: 20, right: 30, bottom: 0, left: 100},
        width = 1300 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select("#steam_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data

    // List of groups = header of the csv files
    var keys = props.keys;


        // const xScale = d3.scaleTime()
        //     .domain([new Date(chartData[0].timestamp*1000),new Date(chartData[dates.length -1] * 1000)]) // x ticks
        //     .range([0, width]) // x width

    // Add X axis
    var xScale = d3.scaleTime()
        .domain(d3.extent(chartData, function(d) { return new Date(d.timestamp * 1000); }))
        .range([ 0, width ]);

    svg.append("g")
        .attr("transform", "translate(0," + height*0.95 + ")")
        .call(d3.axisBottom(xScale).tickSize(-height*0.95).ticks(5))
            // .tickValues([new Date(chartData[0].timestamp), new Date(chartData[chartData.length -1 ].timestamp)]))
        .select(".domain").remove()
    // Customization
    svg.selectAll(".tick line").attr("stroke", "#b8b8b8")



    const max = getMax(props.data, props.keys);


    // Add Y axis
    var y = d3.scaleLinear()
        .domain([-max, max])
        .range([ height, 0 ]);



    svg.append("g")
        // .attr("transform", "translate(0," + width*0.1 + ")")
        .call(d3.axisLeft(y).tickSize(-width).ticks(5))
        .select(".domain").remove()

    // color palette
    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeDark2);

    //stack the data?
    var stackedData = d3.stack()
        .offset(d3.stackOffsetSilhouette)
        .keys(keys)
        (chartData)

    // create a tooltip
    var Tooltip = svg
        .append("text")
        .attr("x", width-200)
        .attr("y", 0)
        .style("opacity", 0)
        .style("font-size", 17)

        svg.append("text")
            .attr("class", "y label")
            .attr('color', ColorPalette.mainColor)
            .attr("text-anchor", "end")
            .attr("y", -50 - 10)
            .attr("x",  - height/2 + 10)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('TVL (USD)');


    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        Tooltip.style("opacity", 1)
        d3.selectAll(".myArea").style("opacity", .2)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }

    var mousemove = function(d,i) {
        let grp = d.target.__data__.key
        Tooltip.text(grp)

    }
    var mouseleave = function(d) {
        Tooltip.style("opacity", 0)
        d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
    }

    // Area generator
    var area = d3.area()
        .x(function(d) { return xScale(new Date(d.data.timestamp*1000)); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })

    // Show the areas
    svg
        .selectAll("steam_graph")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", "myArea")
        .style("fill", function(d) {return color(d.key); })
        .attr("d", area)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)


}

    return (<><div id="steam_graph"/></>)

}