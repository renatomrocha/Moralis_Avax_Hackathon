import * as d3 from "d3";
import {useEffect} from "react";


const SteamGraph3 = ({data}) => {

    // const data = [{year: 1880, Amanda: 241,Ashley:1000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1881, Amanda: 500,Ashley:10000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1882, Amanda: 2000,Ashley:4500,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1883, Amanda: 6000,Ashley:2000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1884, Amanda: 4000,Ashley:3000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1885, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1886, Amanda: 241,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1887, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1888, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1889, Amanda: 241,Ashley:1000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1890, Amanda: 500,Ashley:10000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1891, Amanda: 2000,Ashley:4500,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1892, Amanda: 6000,Ashley:2000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1893, Amanda: 4000,Ashley:3000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1894, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1895, Amanda: 241,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1896, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1897, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1898, Amanda: 241,Ashley:1000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1899, Amanda: 500,Ashley:10000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1900, Amanda: 2000,Ashley:4500,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1901, Amanda: 6000,Ashley:2000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1902, Amanda: 4000,Ashley:3000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1903, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1904, Amanda: 241,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1905, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1906, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1907, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1908, Amanda: 500,Ashley:10000,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1909, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1910, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1911, Amanda: 6000,Ashley:0,Betty:6117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //     {year: 1912, Amanda: 8000,Ashley:0,Betty:117,Deborah:12,Dorothy:112,Helen:636,Linda:27,Patricia:0},
    //
    //
    // ]




    useEffect(()=>{buildGraph()},[data])

    const buildGraph = () => {


        // set the dimensions and margins of the graph
        const margin = {top: 20, right: 30, bottom: 30, left: 100},
            width = 1100 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

// Parse the Data

            // List of groups = header of the csv files
            const keys = ["reserve0","reserve1"];

            // Add X axis
            const x = d3.scaleLinear()
                .domain(d3.extent(data, function(d) { return d.timestamp; }))
                .range([ 0, width ]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x).ticks(5));

            // Add Y axis
            const y = d3.scaleLinear()
                .domain([-1000000, 1000000])
                .range([ height, 0 ]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // color palette
            const color = d3.scaleOrdinal()
                .domain(keys)
                .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'])

            //stack the data?
            const stackedData = d3.stack()
                .offset(d3.stackOffsetSilhouette)
                .keys(keys)
                (data)

            // Show the areas
            svg
                .selectAll("mylayers")
                .data(stackedData)
                .join("path")
                .style("fill", function(d) { return color(d.key); })
                .attr("d", d3.area()
                    .x(function(d, i) { return x(d.data.timestamp); })
                    .y0(function(d) { return y(d[0]); })
                    .y1(function(d) { return y(d[1]); })
                )


    }



    return(<div id="my_dataviz"/>)

}

export default SteamGraph3;