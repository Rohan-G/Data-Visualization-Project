import * as d3 from 'd3';
import { useState, useEffect } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

function Dominance() {
    const [actData, newData] = useState();
    const[teams, setTeams] = useState();
    const[nChamps, setnChamps] = useState();
    const [constChamps, setConstChamps] = useState();

    var margin = {top: 10, right: 10, bottom: 10, left: 70},
    width = 1800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    var svg = d3.select("#championships");
    svg.attr("width", width + margin.left + margin.right);
    svg.attr("height", height + margin.top + margin.bottom);

    //   .domain([1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022])

    var xScale = d3.scaleTime()
    .domain([new Date(1957, 0, 1), new Date(2024, 0, 1)])
    .range([0, width]);

    // var curve = d3.curveCatmullRom.alpha(0.5);

    // Create x and y axes
    const xAxis = d3.axisBottom(xScale);

    async function getData(){
        var myElems = [];
        var myTeams = new Map();
        var driverWise = new Map();
        var constWise = new Map();
        var prev = undefined;
        await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/Champions.csv', (data)=>{
            if(prev === undefined){
                prev = data;
                var myMap = new Object();
                myMap.Year = 2023;
                myElems.push(new Array(myMap,data))
                console.log(prev);
            }
            else{
                myElems.push(new Array(prev,data));
                prev = data;
            }

            myTeams.set(data.Constructor,data.Color);

            if(driverWise.has(data.Driver)){
                driverWise.set(data.Driver, driverWise.get(data.Driver)+1)
            }
            else{
                driverWise.set(data.Driver,1)
            }

            if(constWise.has(data.Constructor)){
                var info = constWise.get(data.Constructor);
                if(data['Point Difference']<0){
                    constWise.set(data.Constructor, [info[0]+1,info[1]])
                }
                else{
                    constWise.set(data.Constructor, [info[0]+1,info[1]+1])
                }
            }
            else{
                if(data['Point Difference']<0){
                    constWise.set(data.Constructor, [1,0])
                }
                else{
                    constWise.set(data.Constructor, [1,1])
                }
            }
        })

        // var myMap = new Map();
        // myMap.set('Year',2023)
        // myMap.set('')
        // myElems.push()

        newData(myElems);
        setTeams(myTeams);
        setnChamps(driverWise);
        setConstChamps(constWise);
    }

    function drawTimeline(){

        const tHeight = height/4;

        svg.selectAll(".myCurve")
        .data(actData)
        .enter().append("rect")
        .attr("class",function(d){return String(d[1].Driver.split(' ')[0]+d[1].Driver.split(' ')[1]) + ' ' + d[1].Constructor.split(' ')[0]})
        .attr("id",function(d){ return 'b'+String(d[1].Year) })
        .attr("x", function(d){return xScale(new Date(Number(d[1]['Year']), 0 , 1)) + margin.left;})
        .attr("y",function(d){
            if(d[1]['Point Difference']<0){
                return height/2 + 3*margin.bottom;
            }

            return height/2 - 3*margin.bottom - tHeight;
        })
        .attr("width", function(d){return xScale(new Date(Number(d[0]['Year']), 0 , 1)) - xScale(new Date(Number(d[1]['Year']), 0 , 1))})
        .attr("height",tHeight)
        .style("fill",function(d){return d[1].Color})
        .on("mouseover", function(event,target){
            svg.selectAll("."+String(target[1].Driver.split(' ')[0]+target[1].Driver.split(' ')[1])).style("opacity","0.3");
            tippy(this, {
                content: 'Driver: '+target[1].Driver+'<br>'+'Team: '+target[1].Constructor + '<br>' + 'Year: ' + target[1].Year + '<br>' + 'Number of Championships: '+nChamps.get(target[1].Driver),
                theme: 'light-border',
                animation: 'scale',
                duration: 0,
                allowHTML: true
                }).show();
        })
        .on("mouseout", function(event,target){
            svg.selectAll("."+String(target[1].Driver.split(' ')[0]+target[1].Driver.split(' ')[1])).style("opacity","1")
            tippy(this).hide();
        });

        // Add x and y axes to the SVG container
        svg.append("g")
        .attr("transform", `translate(${margin.left},${height/2})`)
        .call(xAxis);

        svg.append("line")
        .attr("x1",margin.left)
        .attr("y1",0)
        .attr("x2",margin.left)
        .attr("y2",height)
        .attr("style", "stroke: black; stroke-width: 0.45")

        svg.append("text")
        .text("Won the Constructor's title")
        .attr("x",50)
        .attr("y",225)
        .attr("transform","rotate(270,50,225)")

        svg.append("text")
        .text("Lost the Constructor's title")
        .attr("x",50)
        .attr("y",height/2 + 230)
        .attr("transform","rotate(270,50,"+(height/2 + 230)+")")

        svg.append("text")
        .text("Year")
        .attr("x",20)
        .attr("y",height/2+10)

    }

    function drawLegend(){

        var legendScale = d3.scaleBand().domain([0,1,2,3,4,5,6,7,8,9,10,11,12,13]).range([margin.left, width-margin.left-margin.right])

        var legend = d3.select("#legend");
        legend
        .attr("width",width)
        .attr("height",100)
        
        legend.selectAll("mydots")
        .data(Array.from(teams.keys()))
        .enter()
        .append("circle")
            .attr("class",function(d){return d.split(' ')[0];})
            .attr("cx", function(d,i){ return legendScale(i);})
            .attr("cy", 50) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 7)
            .style("fill", function(d){ return teams.get(d)})
        
        legend.selectAll("mylabels")
        .data(Array.from(teams.keys()))
        .enter()
        .append("text")
            .attr("class",function(d){ return d.split(' ')[0]; })
            .attr("x", function(d,i){ return legendScale(i)+10})
            .attr("y",51.5 ) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return teams.get(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .on("mouseover", function(event,target){
                console.log(constChamps.get(target));
                svg.selectAll("."+target.split(' ')[0]).style("opacity","0.3");
                tippy(this, {
                    content: 'Number of Driver Championships: '+constChamps.get(target)[0]+'<br>'+'Number of Driver and Constructor Championships: '+constChamps.get(target)[1],
                    theme: 'light-border',
                    animation: 'scale',
                    duration: 0,
                    allowHTML: true
                    }).show();
            })
            .on("mouseout", function(event,target){
                svg.selectAll("."+target.split(' ')[0]).style("opacity","1");
            });

    }

    useEffect(()=>{
        if(actData != undefined){
            // console.log(actData);
            drawTimeline();
        }
    },[actData]);

    useEffect(()=>{
        if(teams != undefined){
            // console.log(teams.keys());
            drawLegend();
        }
    },[teams]);

    useEffect(()=>{
        getData();
    },[])

    return(
        <>
            <h1 align= "center">Championships</h1>
            <div style={{position: 'absolute', top: '12vh', left: '3vw'}}>
                <svg id="legend" />
            </div>
            <div style={{position: 'absolute', top: '25vh', left: '3vw'}}>
                <svg id="championships" />
            </div>
        </>
    )

}

export default Dominance;