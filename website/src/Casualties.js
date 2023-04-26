import * as d3 from 'd3';
import Backdrop from '@mui/material/Backdrop';
import { useState, useEffect } from 'react';

function Casualties() {

    const [marshalls, setMarshalls] = useState();
    const [drivers, setDrivers] = useState();
    const [regulations, setRegulations] = useState();
    const [bdEnable, enableBd] = useState(false);
    const [bdInfo,setBdInfo] = useState();

    var scale = 1.5;

    var margin = {top: 10, right: 10, bottom: 10, left: 70},
    width = 2000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    var svg = d3.select("#championships");
    svg.attr("width", width + margin.left + margin.right);
    svg.attr("height", height + margin.top + margin.bottom);

    var xScale = d3.scaleTime()
    .domain([new Date(1948, 0, 1), new Date(2023, 0, 1)])
    .range([margin.left, width-margin.left-margin.right]);

    var yScale = d3.scaleLinear()
    .domain([0, 50])
    .range([500, margin.top]);


    function makeGraph(){
        // svg.selectAll(".RegInfo")
        // .data(regulations)
        // .enter().append("text")
        // .attr("class","RegInfo")
        // .attr("x",function(d){ return xScale(d.Year) - 20 })
        // .attr("y",550)
        // .text(function(d){ return d.Year.getFullYear() });

        svg.selectAll(".RegLines")
        .data(regulations)
        .enter().append("line")
        .attr("class","RegLines")
        .attr("x1",function(d){ return xScale(d.Year) })
        .attr("y1",520)
        .attr("x2",function(d){ return xScale(d.Year) })
        .attr("y2",yScale(50))
        .attr("style","stroke:black; stroke-width:4; stroke-dasharray:3 3 0; opacity:0.5")
        .on("mouseover",(event,d)=>{
            // console.log(d);
            d3.select(event.target).attr("style","stroke:black; stroke-width:4; stroke-dasharray:3 3 0; opacity: 1")
        })
        .on("mouseout",(event,d)=>{
            d3.select(event.target).attr("style","stroke:black; stroke-width:4; stroke-dasharray:3 3 0; opacity:0.5")
        })
        .on("click",(event,d)=>{
            console.log(d);
            setBdInfo(
                `<b>Year:</b> ${d.Year.getFullYear()} <br/> <b>Regulation Change:</b> ${d.Regulation} <br /> <b>Number of Casualties since Last Regulation Change:</b> ${d.Number} <br />`
            )
            enableBd(true);
        });

        var curve = d3.line()
        .x(function(d) { return xScale(d.Year); })
        .y(function(d) { return yScale(d.Number); })
        .curve(d3.curveCatmullRom);

        svg.append("path")
        .datum(regulations)
        .attr("d", curve)
        .attr("fill", "none")
        .attr("style","stroke:black; stroke-width:2");
    }

    async function getData(){
        var driversData = [];
        await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/DriverCasualties.csv',function(data){
            data['Date Of Accident'] = new Date(data['Date Of Accident'])
            data['Age'] = Number(data.Age)
            driversData.push(data);
        })
        setDrivers(driversData);

        var marshallsData = [];
        await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/MarshallCasualties.csv',function(data){
            data['Date Of Accident'] = new Date(data['Date Of Accident'])
            data['Age'] = Number(data.Age)    
            marshallsData.push(data);
        })
        setMarshalls(marshallsData);

        var regulationData = [];
        await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/Regulations.csv',function(data){
            data['Year'] = new Date(Number(data['Year']),0,1);
            let count = 0;
            for(var i=0; i<driversData.length; i++){
                if(driversData[i]['Date Of Accident'] < data.Year){
                    count+=1;
                }
                else{
                    break;
                }
            }
            for(var i=0; i<marshallsData.length; i++){
                if(marshallsData[i]['Date Of Accident'] < data.Year){
                    count+=1;
                }
                else{
                    break;
                }
            }
            data.Number = count;
            regulationData.push(data);
        })

        regulationData.push({'Year':new Date(2023,0,1), 'Regulation':'No newer regulations', 'Number':driversData.length+marshallsData.length})

        for(var i=regulationData.length-1; i>0; i--){
            regulationData[i].Number-=regulationData[i-1].Number;
        }
        setRegulations(regulationData);
    }

    useEffect(()=>{
        if(drivers!=undefined && marshalls!=undefined && regulations!=undefined){
            // console.log(drivers);
            // console.log(marshalls);
            // console.log(regulations);
            makeGraph();
        }
    },[drivers,marshalls,regulations])

    useEffect(()=>{
        getData();
    },[])

    return(
        <>
            <h1 align= "center" style={{"position":"fixed", "left":"48vw"}}>Safety</h1>
            <div style={{position: 'absolute', top: '12vh', left: '3vw'}}>
                <svg id="legend" />
            </div>
            <div style={{position: 'absolute', top: '25vh', left: '3vw'}}>
                <svg id="championships" />
            </div>

            <Backdrop
                sx={{ color: '#faebd7', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={bdEnable}
                onClick={()=>{enableBd(false); setBdInfo(<></>)}}
            >
                <div dangerouslySetInnerHTML={{ __html: bdInfo }} />
            </Backdrop>
        </>
    )

}

export default Casualties;