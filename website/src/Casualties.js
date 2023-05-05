import * as d3 from 'd3';
import Backdrop from '@mui/material/Backdrop';
import { useState, useEffect } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

function Casualties() {

    const [marshalls, setMarshalls] = useState();
    const [drivers, setDrivers] = useState();
    const [regulations, setRegulations] = useState();
    const [bdEnable, enableBd] = useState(false);
    const [bdInfo, setBdInfo] = useState();

    var scale = 1.5;

    var yVals = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

    var margin = { top: 20, right: 10, bottom: 10, left: 70 },
        width = 2000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var svg = d3.select("#championships");
    svg.attr("width", width + margin.left + margin.right);
    svg.attr("height", height + margin.top + margin.bottom);

    var xScale = d3.scaleTime()
        .domain([new Date(1949, 0, 1), new Date(2023, 0, 1)])
        .range([margin.left, width - margin.left - margin.right]);

    var yScale = d3.scaleLinear()
        .domain([0, 50])
        .range([500, margin.top]);

    svg.append("line")
        .attr("x1", margin.left)
        .attr("y1", yScale(0))
        .attr("x2", width - margin.left)
        .attr("y2", yScale(0))
        .attr("style", "stroke:black; stroke-width:2")

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - margin.bottom + 10)
        .attr("style", "font-size:1.5vw")
        .text("Year");

    svg.append("line")
        .attr("x1", margin.left)
        .attr("y1", yScale(0))
        .attr("x2", margin.left)
        .attr("y2", margin.top)
        .attr("style", "stroke:black; stroke-width:2")


    svg.selectAll(".yticks")
        .data(yVals)
        .enter().append("line")
        .attr("class", "yticks")
        .attr("x1", margin.left + 5)
        .attr("y1", function (d) { return yScale(d) })
        .attr("x2", margin.left - 5)
        .attr("y2", function (d) { return yScale(d) })
        .attr("style", "stroke:black; stroke-width:2");

    svg.selectAll(".yLabels")
        .data(yVals)
        .enter().append("text")
        .attr("class", "yLabels")
        .attr("x", margin.left - 30)
        .attr("y", function (d) { return yScale(d) + 7 })
        .text(function (d) { return d });

    svg.append("text")
        .text("Casualties since the Last Regulation Change")
        .attr("x", 30)
        .attr("y", 530)
        .attr("transform", "rotate(270,30,530)")
        .attr("style", "font-size:1.25vw");

    var curve = d3.line()
        .x(function (d) { return xScale(d.Year) })
        .y(function (d) { return yScale(d.Number); })
        .curve(d3.curveCatmullRom);

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

    var brush = d3.brushX()
        .extent([[0, 0], [width, height]])
        .on("end", updateChart)

    var graph = svg.append('g')
        .attr('clip-path', 'url(#clip)')

    function makeGraph() {

        graph.append("g")
            .attr("class", "brush")
            .call(brush);

        var curr = true;
        graph.selectAll(".RegInfo")
            .data(regulations)
            .enter().append("text")
            .attr("class", "RegInfo")
            .attr("x", function (d) { return xScale(d.Year) - 20 })
            .attr("y", function () {
                if (curr) {
                    curr = !curr;
                    return 530;
                }
                else {
                    curr = !curr;
                    return margin.top - 5;
                }
            })
            .text(function (d) { return d.Year.getFullYear() });


        graph.selectAll(".RegLines")
            .data(regulations)
            .enter().append("line")
            .attr("class", "RegLines")
            .attr("x1", function (d) { return xScale(d.Year) })
            .attr("y1", 500)
            .attr("x2", function (d) { return xScale(d.Year) })
            .attr("y2", yScale(50))
            .attr("style", "stroke:red; stroke-width:4; stroke-dasharray:3 3 0; opacity:0.5")
            .on("mouseover", (event, d) => {
                // console.log(d);
                d3.select(event.target).attr("style", "stroke:red; stroke-width:4; stroke-dasharray:3 3 0; opacity: 1")
            })
            .on("mouseout", (event, d) => {
                d3.select(event.target).attr("style", "stroke:red; stroke-width:4; stroke-dasharray:3 3 0; opacity:0.5")
            })
            .on("click", (event, d) => {
                console.log(d);
                setBdInfo(
                    `<b>Year:</b> ${d.Year.getFullYear()} <br/> <b>Regulation Change:</b> ${d.Regulation} <br /> <b>Number of Casualties since Last Regulation Change:</b> ${d.Number} <br />`
                )
                enableBd(true);
            });

        graph.append("path")
            .datum(regulations)
            .attr("d", curve)
            .attr("fill", "none")
            .attr("style", "stroke:red; stroke-width:2");

        graph.selectAll(".dcasualties")
            .data(drivers)
            .enter().append("circle")
            .attr("class", "dcasualties")
            .style("opacity", "0.5")
            .style("fill", "green")
            .attr("r", 10)
            .attr("cx", function (d) { return xScale(d['Date Of Accident']) })
            .attr("cy", 115)
            .on("mouseover", (event, d) => {
                console.log(d);
                d3.select(event.target).style("opacity", 1);
                tippy(event.target, {
                    content: 'Driver: ' + d.Driver + '<br>' + 'Age: ' + d.Age + '<br>' + 'Date Of Accident: ' + d['Date Of Accident'].toLocaleDateString() + '<br>' + 'Session: ' + d['Session'] + '<br>' + 'Car: ' + d['Car'] + '<br>' + 'Event: ' + d['Event'],
                    theme: 'light-border',
                    animation: 'scale',
                    duration: 0,
                    allowHTML: true
                }).show();
            })
            .on("mouseout", (event, d) => {
                d3.select(event.target).style("opacity", 0.5);
                tippy(event.target).hide();
            });

        graph.selectAll(".mcasualties")
            .data(marshalls)
            .enter().append("circle")
            .attr("class", "mcasualties")
            .style("opacity", "0.5")
            .style("fill", "orange")
            .attr("r", 10)
            .attr("cx", function (d) { return xScale(d['Date Of Accident']) })
            .attr("cy", 115)
            .on("mouseover", (event, d) => {
                // console.log(d);
                d3.select(event.target).style("opacity", 1);
                tippy(event.target, {
                    content: 'Marshall: ' + d.Name + '<br>' + 'Age: ' + d.Age + '<br>' + 'Date Of Accident: ' + d['Date Of Accident'].toLocaleDateString() + '<br>' + 'Event: ' + d['Event'],
                    theme: 'light-border',
                    animation: 'scale',
                    duration: 0,
                    allowHTML: true
                }).show();
            })
            .on("mouseout", (event, d) => {
                d3.select(event.target).style("opacity", 0.5);
                tippy(event.target).hide();
            });
    }

    var idleTimeout;
    function idled() { idleTimeout = null; }

    function updateChart(event) {

        var extent = event.selection
        console.log(extent);

        if (!extent) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350);
            xScale.domain([new Date(1949, 0, 1), new Date(2023, 0, 1)])
            .range([margin.left, width - margin.left - margin.right]);
        }
        else {
            xScale.domain([xScale.invert(extent[0]), xScale.invert(extent[1])])
            .range([margin.left, width - margin.left - margin.right]);
            graph.select(".brush").call(brush.move, null)
        }

        var curr = true;
        graph.selectAll(".RegInfo")
            .transition().duration(1000)
            .attr("x", function (d) { return xScale(d.Year) - 20 })
            .attr("y", function () {
                if (curr) {
                    curr = !curr;
                    return 530;
                }
                else {
                    curr = !curr;
                    return margin.top - 5;
                }
            })

        graph.selectAll(".RegLines")
            .transition().duration(1000)
            .attr("class", "RegLines")
            .attr("x1", function (d) { return xScale(d.Year) })
            .attr("y1", 500)
            .attr("x2", function (d) { return xScale(d.Year) })
            .attr("y2", yScale(50))

        graph.selectAll(".dcasualties")
            .transition().duration(1000)
            .attr("cx", function (d) { return xScale(d['Date Of Accident']) })
            .attr("cy", 115)

        graph.selectAll(".mcasualties")
            .transition().duration(1000)
            .attr("cx", function (d) { return xScale(d['Date Of Accident']) })
            .attr("cy", 115)

        graph.select("path").transition().duration(1000).attr('d',curve);

    }


    async function getData() {
        var driversData = [];
        await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/DriverCasualties.csv', function (data) {
            data['Date Of Accident'] = new Date(data['Date Of Accident'])
            data['Age'] = Number(data.Age)
            driversData.push(data);
        })
        setDrivers(driversData);

        var marshallsData = [];
        await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/MarshallCasualties.csv', function (data) {
            data['Date Of Accident'] = new Date(data['Date Of Accident'])
            data['Age'] = Number(data.Age)
            marshallsData.push(data);
        })
        setMarshalls(marshallsData);

        var regulationData = [];
        await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/Regulations.csv', function (data) {
            if (regulationData.length > 0) {
                if (regulationData[regulationData.length - 1].Year.getFullYear() == data.Year) {
                    regulationData[regulationData.length - 1].Regulation = regulationData[regulationData.length - 1].Regulation + ', ' + data.Regulation;
                }
                else {
                    data['Year'] = new Date(Number(data['Year']), 0, 1);
                    let count = 0;
                    for (var i = 0; i < driversData.length; i++) {
                        if (driversData[i]['Date Of Accident'] < data.Year) {
                            count += 1;
                        }
                        else {
                            break;
                        }
                    }
                    for (var i = 0; i < marshallsData.length; i++) {
                        if (marshallsData[i]['Date Of Accident'] < data.Year) {
                            count += 1;
                        }
                        else {
                            break;
                        }
                    }
                    data.Number = count;
                    regulationData.push(data);
                }
            }
            else {
                data['Year'] = new Date(Number(data['Year']), 0, 1);
                let count = 0;
                for (var i = 0; i < driversData.length; i++) {
                    if (driversData[i]['Date Of Accident'] < data.Year) {
                        count += 1;
                    }
                    else {
                        break;
                    }
                }
                for (var i = 0; i < marshallsData.length; i++) {
                    if (marshallsData[i]['Date Of Accident'] < data.Year) {
                        count += 1;
                    }
                    else {
                        break;
                    }
                }
                data.Number = count;
                regulationData.push(data);
            }
        })

        regulationData.push({ 'Year': new Date(2023, 0, 1), 'Regulation': 'No newer regulations', 'Number': driversData.length + marshallsData.length })

        for (var i = regulationData.length - 1; i > 0; i--) {
            regulationData[i].Number -= regulationData[i - 1].Number;
        }
        setRegulations(regulationData);
    }

    useEffect(() => {
        if (drivers != undefined && marshalls != undefined && regulations != undefined) {
            // console.log(drivers);
            // console.log(marshalls);
            // console.log(regulations);
            makeGraph();
        }
    }, [drivers, marshalls, regulations])

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <h1 align="center" style={{ "left": "48vw", fontFamily: "Raleway",fontWeight: "300",fontSize: "40px" }}>Evolution of Safety</h1>
            <p style={{ marginLeft: "10vw", marginRight:"10vw", fontFamily: "Raleway", color:"grey", fontSize:"18px" }}>
                F1 is an entertaining sport, but it is also very dangerous. There have been many casualties on the track, both drivers and volunteers, and there have been many regulations added to make the sport safer for both drivers and by-standers. We wanted  to show a correlation (if any) between the added regulations and the casualties in the sport, and how safe the sport is in this day and age.
                <br />
                <br />
                <b>Use the brush to select a range of x values to zoom into in the graph.<br></br> The green dots represent a driver casualty, and the yellow dots represent a marshall casualty. Hover over the dots for more details.<br></br>The red lines depict a new regulation that was introduced in that particular year. Click on the lines to view more information on the regulation.</b>    
            </p>
            <div style={{ position: 'relative', left: '3vw' }}>
                <svg id="legend" />
            </div>
            <div style={{ position: 'relative', left: '3vw' }}>
                <svg id="championships" />
            </div>

            <Backdrop
                sx={{ color: '#faebd7', zIndex: (theme) => theme.zIndex.drawer + 1, fontSize: '2vw' }}
                open={bdEnable}
                onClick={() => { enableBd(false); setBdInfo(<></>) }}
            >
                <div dangerouslySetInnerHTML={{ __html: bdInfo }} />
            </Backdrop>
        </>
    )

}

export default Casualties;