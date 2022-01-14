
import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {ColorPalette} from "../../styles/color_palette";
import './pieChartStyles.css';



const PieChart = ({data}:any)=> {


    useEffect(()=>{
        buildPieChart2();

    },[data])

    const buildPieChart2 = () => {
        var width = 250,
            height = 250,
            radius = Math.min(width, height) / 2;
        var divNode = d3.select("body").node();
        var outerRadius = radius - 10,
            innerRadius = radius - 80;

        var color : any = d3.scaleOrdinal().range([ColorPalette.mainColor, ColorPalette.red, ColorPalette.secondaryColor, ColorPalette.highlight, ColorPalette.green]);//Constructs a new ordinal scale with an empty domain and the specified range. If a range is not specified, it defaults to the empty array; an ordinal scale always returns undefined until a non-empty range is defined.


        //add svg with margin !important
        //this is svg is actually group
        var svg = d3.select("#diagram").append("svg")
            .attr("width",width)
            .attr("height",height)
            .append("g")  //add group to leave margin for axis
            .attr("transform","translate("+width/2+","+height/2+")");


        //the code above should be same
        if(data === undefined)
            return;
        var dataset : any = data;

        // //arc to draw the chart. pie to generate the data for chart from the input
        // var donutWidth = 40;
        // var arc : any = d3.arc().outerRadius(radius).innerRadius(radius-donutWidth);//to generate the chart
        // var pie = d3.pie()
        //     .value(function(d:any){return d.percentage;});//sort the value to show from the 12 0'clcok
        //

        var arc:any = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 60);

        console.log("Arc: ", arc);

        var pie = d3.pie()
            .sort(null)
            .value(function(d:any) { return d.percentage; });

        d3.select("#chart").append("div")
            .attr("id","mainPie")
            .attr("class","pieBox");

        var svg = d3.select("#mainPie").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



        var defs = svg.append("defs");
        var filter = defs.append("filter")
            .attr("id", "drop-shadow")
            .attr("height","130%");

        filter.append("feGaussianBlur")
            .attr("in","SourceAlpha")
            .attr("stdDeviation", 3)
            .attr("result", "blur");

        filter.append("feOffset")
            .attr("in", "blur")
            .attr("dx", 3)
            .attr("dy", 3)
            .attr("result", "offsetBlur");
        var feMerge = filter.append("feMerge");

        feMerge.append("feMergeNode")
            .attr("in", "offsetBlur")
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");


        // Handling hovers
        var paths = g.append("path")
            .attr("d",arc)
            // @ts-ignore
            .style("fill",function(d:any){return color(d.data);})
            .on("mouseover", function(d:any, i:any) {
                console.log("Data is: ", d);
                console.log("Index is: ", i);
                d3.select(this)
                    .attr("stroke","#fff")
                    .attr("stroke-width","2px")
                    .style("filter", "url(#drop-shadow)");
                d3.select(this)
                    .transition()
                    .duration(500)
                    // .ease('elastic')
                    .attr('transform',function(d:any){
                        var dist = 1;
                        d.midAngle = ((d.endAngle - d.startAngle)/2) + d.startAngle;
                        var x = Math.sin(d.midAngle) * dist;
                        var y = Math.cos(d.midAngle) * dist;
                        return 'translate(' + x + ',' + y + ')';
                    });


                svg.append('circle')
                    .attr('id','circle')
                    .attr('fill','#42A5F5')
                    .attr('r','62')

                svg.append('text')
                    .attr('id', 'circle-text')
                    .style('fill', '#F2F2F2')
                    .style("font-size", "20px")
                    .style("font-weight", "bold")
                    .attr("transform", "translate(0," + 20 + ")")
                    .attr("text-anchor", "middle")
                    .html(`${i.data.symbol} <br/> ${i.data.percentage}%`);


            })
            .on("mouseout", function(d){
                d3.select(this)
                    .attr("stroke","none")
                    .style("filter","none");
                d3.select(this)
                    .transition()
                    .duration(500)
                    // .ease('bounce')
                    .attr('transform','translate(0,0)');

                // d3.select("#mainTooltip").style("display", 'none');
                d3.select('circle').remove();
                d3.select('#circle-text').remove();
                // d3.select('#circle').style("display","hidden");

            });


        //add legend to the donut chart

        // var legendSize = 15;
        // var legendSpacing = 2;
        // var legend = svg.selectAll(".legend")
        //     .data(color.domain())
        //     .enter()
        //     .append("g")
        //     .attr("transform",function(d,i){
        //         var legendH = color.domain().length*(legendSize+legendSpacing);//total height of legends
        //         var legendY = i*(legendSize+legendSpacing) - legendH/2;//
        //         var legendX = -legendSize;
        //         return "translate("+legendX+","+legendY+")";
        //     });
        // legend.append("rect")
        //     .attr("width",legendSize)
        //     .attr("height",legendSize)
        //     .attr("fill",color)
        //     .attr("stroke",color);
        // legend.append("text")
        //     .text(function(d:any){return d[0];})
        //     .attr('x', legendSize + legendSpacing)
        //     .attr('y', legendSize - legendSpacing);

        //add  tooltip to paths
        var tooltip = d3.select("#diagram").append("div").attr("class","tooltip");
        tooltip.append("div").attr("class","name");
        tooltip.append("div").attr("class","count");
        tooltip.append("div").attr("class","percentage");


        // svg.on("mouseover",function(d:any){
        //     var total = d3.sum(dataset,function(dd:any){return dd[1];});
        //     console.log("d is: ", d);
        //     var percent = Math.round(1000 * d.data[1] / total) / 10;
        //     tooltip.select(".name").html(d.data[0]);
        //     tooltip.select(".count").html(d.data[1]);
        //     tooltip.select(".percentage").html(percent + '%');
        //     tooltip.style("display", "block");
        // });
        // paths.on("mouseout",function(d){
        //     tooltip.style("display", "none");
        // });


    }


    const buildPieChart = () => {
        var data :any = [
            {
                "str_lab": "Jon",
                "num": 100
            },
            {
                "str_lab": "Shaggydog",
                "num": 44
            },
            {
                "str_lab": "Ghost",
                "num": 215
            },
            {
                "str_lab": "Nymeria",
                "num": 385
            },
            {
                "str_lab": "Summer",
                "num": 141
            },
            {
                "str_lab": "Grey wind",
                "num": 340
            }
        ];

        var width = 300,
            height = 300,
            radius = Math.min(width, height) / 2;
        var divNode = d3.select("body").node();
        var outerRadius = radius - 10,
            innerRadius = radius - 80;
        var color = d3.scaleOrdinal()
            .range(["#2E7D32","#53856D","#FF7043", "#1FDA9A", "#28ABE3", "#DF514C", "#DAE9F7"]);

        var arc:any = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 80);

        console.log("Arc: ", arc);

        var pie = d3.pie()
            .sort(null)
            .value(function(d:any) { return d.num; });

        d3.select("#chart").append("div")
            .attr("id","mainPie")
            .attr("class","pieBox");

        var svg = d3.select("#mainPie").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var defs = svg.append("defs");
        var filter = defs.append("filter")
            .attr("id", "drop-shadow")
            .attr("height","130%");

        filter.append("feGaussianBlur")
            .attr("in","SourceAlpha")
            .attr("stdDeviation", 3)
            .attr("result", "blur");

        filter.append("feOffset")
            .attr("in", "blur")
            .attr("dx", 3)
            .attr("dy", 3)
            .attr("result", "offsetBlur");
        var feMerge = filter.append("feMerge");

        feMerge.append("feMergeNode")
            .attr("in", "offsetBlur")
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", "blue")
            .on("mousemove", function(d) {
                d3.select(this)
                    .attr("stroke","#fff")
                    .attr("stroke-width","2px")
                    .style("filter", "url(#drop-shadow)");
                d3.select(this)
                    .transition()
                    .duration(500)
                    // .ease('elastic')
                    .attr('transform',function(d:any){
                        var dist = 1;
                        d.midAngle = ((d.endAngle - d.startAngle)/2) + d.startAngle;
                        var x = Math.sin(d.midAngle) * dist;
                        var y = Math.cos(d.midAngle) * dist;
                        return 'translate(' + x + ',' + y + ')';
                    });
                var mousePos = d3.pointer(divNode);
                d3.select("#mainTooltip")
                    .style("left", mousePos[0] - 40 + "px")
                    .style("top", mousePos[1] - 70 + "px")
                    .select("#value")
                    .attr("text-anchor", "middle")
                    // .html(d.data.str_lab + "<br />" + d.data.num);
                console.log("d is: ", d);
                d3.select("#mainTooltip").classed("hidden", false);
            })
            .on("mouseout", function(d){
                d3.select(this)
                    .attr("stroke","none")
                    .style("filter","none");
                d3.select(this)
                    .transition()
                    .duration(500)
                    // .ease('bounce')
                    .attr('transform','translate(0,0)');

                d3.select("#mainTooltip").classed("hidden", true);
            });
        var centerSvg = svg.append('circle')
            .attr('fill','#42A5F5')
            .attr('r','62');

        svg.append('text')
            .style('fill', '#F2F2F2')
            .style("font-size", "64px")
            .style("font-weight", "bold")
            .attr("transform", "translate(0," + 20 + ")")
            .attr("text-anchor", "middle")
            .html(data.length.toString());


    }

    return(<>
        <div id="chart"></div>
        <div id="mainTooltip" className="hidden">
            <p><span id="value"></span></p>
        </div>


    </>)

}

export default PieChart;