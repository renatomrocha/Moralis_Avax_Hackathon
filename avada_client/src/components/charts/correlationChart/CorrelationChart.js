import * as d3 from "d3";
import {useEffect, useState} from "react";
import './corr.css';


export function CorrelationChart(props) {

    const {data, corrData} = props;



    useEffect(()=>{

        if(d3.selectAll("svg")) {
            d3.selectAll("svg").remove();
            d3.selectAll(".tooltip").remove();
        }


        buildCorrelationChart();
    },[corrData])





    const buildCorrelationChart = () => {
        // Graph dimension
        const margin = {top: 20, right: 20, bottom: 20, left: 20},
            width = 650 - margin.left - margin.right,
            height = 650 - margin.top - margin.bottom

// Create the svg area
        const svg = d3.select("#corr_chart")
            .append("svg")
            .attr("width", '100vw')
            .attr("height", height + margin.top + margin.bottom)
            // .attr("margin-left", 80)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

            const data = [];
            corrData.forEach(function (d) {
                let x = Object.keys(d).find(key => d[key] === 1);
                console.log("X is: ", x);
                console.log(d);
                delete d[x];
                for (let prop in d) {
                    let y = prop,
                        value = d[prop];
                    data.push({
                        x: x,
                        y: y,
                        value: +value
                    });
                }
            });



            // List of all variables and number of them
            const domain = Array.from(new Set(data.map(function (d) {
                return d.x
            })))
            const num = Math.sqrt(data.length)

            // Create a color scale
            const color = d3.scaleLinear()
                .domain([-1, 0, 1])
                .range(["#B22222", "#fff", "#000080"]);

            // Create a size scale for bubbles on top right. Watch out: must be a rootscale!
            const size = d3.scaleSqrt()
                .domain([0, 1])
                .range([0, 20]);



            // X scale
            const x = d3.scalePoint()
                .range([0, width+30])
                .domain(domain)

            // Y scale
            const y = d3.scalePoint()
                .range([0, height +30])
                .domain(domain)

        var aS = d3.scaleLinear()
            .range([-margin.top + 5, height + margin.bottom - 5])
            .domain([1, -1]);

        var yA = d3.axisRight()
            .scale(aS)
            .ticks(2);

        var aG = svg.append("g")
            .attr("class", "y axis")
            .call(yA)
            .attr("transform", "translate(" + (width + margin.right*5) + " ,0)")


        // Color scale bar
        var iR = d3.range(-1, 1.01, 0.01);
        var h = height / iR.length + 3;
        iR.forEach(function(d){
            aG.append('rect')
                .style('fill',color(d))
                .style('stroke-width', 0)
                .style('stoke', 'none')
                .attr('height', h)
                .attr('width', 10)
                .attr('x', -10)
                .attr('y', aS(d))
                .attr('margin-left', 20)

        });

            // Create one 'g' element for each cell of the correlogram
            const cor = svg.selectAll(".cor")
                .data(data)
                .join("g")
                .attr("class", "cor")
                .attr("transform", function (d) {
                    return `translate(${x(d.x)}, ${y(d.y)})`
                });

            // Low left part + Diagonal: Add the text with specific color
            cor
                .filter(function (d) {
                    const ypos = domain.indexOf(d.y);
                    const xpos = domain.indexOf(d.x);
                    return xpos <= ypos;
                })
                .append("text")
                .attr("y", 5)
                .text(function (d) {
                    if (d.x === d.y) {
                        return d.x;
                    } else {
                        return d.value.toFixed(2);
                    }
                })
                .style("font-size", 11)
                .style("text-align", "center")
                .style("fill", function (d) {
                    if (d.x === d.y) {
                        return "#fff";
                    } else {
                        return color(d.value);
                    }
                });


            // Up right part: add circles
            cor
                .filter(function (d) {
                    const ypos = domain.indexOf(d.y);
                    const xpos = domain.indexOf(d.x);
                    return xpos > ypos;
                })
                .append("circle")
                .attr("r", function (d) {
                    return size(Math.abs(d.value))
                })
                .style("fill", function (d) {
                    if (d.x === d.y) {
                        return "#000";
                    } else {
                        return color(d.value);
                    }
                })
                .style("opacity", 0.8)

    }


    return (<div >
        <div id="corr_chart" />
    </div>)


}