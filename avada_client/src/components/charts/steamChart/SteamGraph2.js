import * as d3 from "d3";
import {nest} from 'd3-collection';
import {useEffect, useState} from "react";

const SteamGraph2 = (props) => {


    var data = [{"key":"active time","date":"05/13/2013","value":"3860.0"},
        {"key":"active time","date":"05/14/2013","value":"5167.0"},
        {"key":"active time","date":"05/15/2013","value":"5663.0"},
        {"key":"active time","date":"05/16/2013","value":"542.0"},
        {"key":"active time","date":"05/16/2013","value":"6758.0"},
        {"key":"active time","date":"05/17/2013","value":"6379.0"},
        {"key":"active time","date":"05/18/2013","value":"10710.0"},
        {"key":"active time","date":"05/19/2013","value":"10025.0"},
        {"key":"active time","date":"05/20/2013","value":"4326.0"},
        {"key":"active time","date":"05/21/2013","value":"3711.0"},
        {"key":"active time","date":"05/22/2013","value":"10.0"},
        {"key":"active time","date":"05/22/2013","value":"3371.0"},
        {"key":"distance","date":"05/13/2013","value":"5766.0"},
        {"key":"distance","date":"05/14/2013","value":"7472.0"},
        {"key":"distance","date":"05/15/2013","value":"8264.0"},
        {"key":"distance","date":"05/16/2013","value":"797.0"},
        {"key":"distance","date":"05/16/2013","value":"14842.0"},
        {"key":"distance","date":"05/17/2013","value":"9369.0"},{"key":"distance","date":"05/18/2013","value":"19950.0"},{"key":"distance","date":"05/19/2013","value":"18100.0"},{"key":"distance","date":"05/20/2013","value":"6547.0"},{"key":"distance","date":"05/21/2013","value":"5583.0"},{"key":"distance","date":"05/22/2013","value":"18.0"},{"key":"distance","date":"05/22/2013","value":"4989.0"},{"key":"steps","date":"05/13/2013","value":"7210.0"},{"key":"steps","date":"05/14/2013","value":"9481.0"},{"key":"steps","date":"05/15/2013","value":"10431.0"},{"key":"steps","date":"05/16/2013","value":"1006.0"},{"key":"steps","date":"05/16/2013","value":"14975.0"},{"key":"steps","date":"05/17/2013","value":"11821.0"},{"key":"steps","date":"05/18/2013","value":"22069.0"},{"key":"steps","date":"05/19/2013","value":"20228.0"},{"key":"steps","date":"05/20/2013","value":"8107.0"},{"key":"steps","date":"05/21/2013","value":"6944.0"},{"key":"steps","date":"05/22/2013","value":"21.0"},{"key":"steps","date":"05/22/2013","value":"6268.0"}];

    var margin = {top: 20, right: 20, bottom: 20, left: 30};
    var width = 950 - margin.left - margin.right;
    var height = 250 - margin.top - margin.bottom;

    var colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];

    var parseDate = d3.timeFormat("%m/%d/%Y").parse;

    var x = d3.scaleTime().range([margin.left, width]);

    var y = d3.scaleLinear().range([height, 0]);

    var z = d3.scaleOrdinal().range(colorrange);

    var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(d3.timeYears);

    var yAxis = d3.axisBottom().scale(y);

    var nest = d3.group(data,function(d) { return d.key; })

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value= +d.value;
    });

    var stack = d3.stack()
        .offset("silhouette")
        .values(function(d) { return d.values; })
        .x(function(d) { return d.date; })
        .y(function(d) { return d.value; });

    var layers = stack(nest.entries(data));

    var area = d3.svg.area()
        //.interpolate("cardinal")
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });

    var svg = d3.select("#streamgraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layers = stack(nest.entries(data));

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

    svg.selectAll(".layer")
        .data(layers)
        .enter().append("path")
        .attr("class", "layer")
        .attr("d", function(d) { return area(d.values); })
        .style("fill", function(d, i) { return z(i); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ", 0)")
        .call(yAxis.orient("right"));

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis.orient("left"));


    svg.selectAll(".layer")
        .attr("opacity", 1)
        .on("mouseover", function(d, i) {
            svg.selectAll(".layer").transition()
                .duration(250)
                .attr("opacity", function(d, j) {
                    return j != i ? 0.6 : 1;
                })
        })

    return (<><div id = "streamgraph"></div></>)


}

export default SteamGraph2;