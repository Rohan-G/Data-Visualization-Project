import * as d3 from 'd3';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const drivers = [
  "Michael Schumacher",
  "Kimi Räikkönen",
  "Juan Pablo Montoya",
  "Rubens Barrichello",
  "Ralf Schumacher",
  "Fernando Alonso",
  "David Coulthard",
  "Jarno Trulli",
  "Jenson Button",
  "Mark Webber",
  "Heinz-Harald Frentzen",
  "Giancarlo Fisichella",
  "Cristiano da Matta",
  "Nick Heidfeld",
  "Olivier Panis",
  "Jacques Villeneuve",
  "Marc Gené",
  "Takuma Sato",
  "Ralph Firman",
  "Justin Wilson",
  "Antônio Pizzonia",
  "Jos Verstappen",
  "Nicolas Kiesa",
  "Zsolt Baumgartner",
  "Felipe Massa",
  "Christian Klien",
  "Timo Glock",
  "Ricardo Zonta",
  "Giorgio Pantano",
  "Gianmaria Bruni",
  "Tiago Monteiro",
  "Alexander Wurz",
  "Narain Karthikeyan",
  "Christijan Albers",
  "Pedro de la Rosa",
  "Patrick Friesacher",
  "Vitantonio Liuzzi",
  "Robert Doornbos",
  "Anthony Davidson",
  "Robert Kubica",
  "Nico Rosberg",
  "Scott Speed",
  "Yuji Ide",
  "Sakon Yamamoto",
  "Franck Montagny",
  "Lewis Hamilton",
  "Heikki Kovalainen",
  "Sebastian Vettel",
  "Adrian Sutil",
  "Kazuki Nakajima",
  "Nelson Piquet Jr.",
  "Sébastien Bourdais",
  "Sébastien Buemi",
  "Kamui Kobayashi",
  "Romain Grosjean",
  "Jaime Alguersuari",
  "Luca Badoer",
  "Vitaly Petrov",
  "Nico Hülkenberg",
  "Karun Chandhok",
  "Bruno Senna",
  "Lucas di Grassi",
  "Paul di Resta",
  "Sergio Pérez",
  "Pastor Maldonado",
  "Jérôme d'Ambrosio",
  "Daniel Ricciardo",
  "Jean-Éric Vergne",
  "Charles Pic",
  "Esteban Gutiérrez",
  "Valtteri Bottas",
  "Jules Bianchi",
  "Giedo van der Garde",
  "Max Chilton",
  "Kevin Magnussen",
  "Daniil Kvyat",
  "Marcus Ericsson",
  "Will Stevens",
  "André Lotterer",
  "Max Verstappen",
  "Felipe Nasr",
  "Carlos Sainz",
  "Roberto Merhi",
  "Alexander Rossi",
  "Jolyon Palmer",
  "Pascal Wehrlein",
  "Stoffel Vandoorne",
  "Esteban Ocon",
  "Rio Haryanto",
  "Lance Stroll",
  "Pierre Gasly",
  "Antonio Giovinazzi",
  "Brendon Hartley",
  "Charles Leclerc",
  "Sergey Sirotkin",
  "Alexander Albon",
  "Lando Norris",
  "George Russell",
  "Nicholas Latifi",
  "Jack Aitken",
  "Pietro Fittipaldi",
  "Yuki Tsunoda",
  "Mick Schumacher",
  "Nikita Mazepin",
  "Guanyu Zhou",
  "Nyck de Vries",
  "Oscar Piastri",
  "Logan Sargeant"
]

function App() {
  const [myArr, updArr] = useState();
  const [myMap, updMap] = useState();
  const [dname,chDriver] = useState("");

  function drawGraph(){
    var pointScale = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450];
    var xVals = [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    const myVals = Array.from(myArr.keys());
    // console.log(myArr.keys());
    
    if(myArr.length !== 0 && myMap.length !== 0){
      // console.log("Hello");
      let svg = d3.select(".H2H");

      svg.append("line")
      .attr("x1",40)
      .attr("x2",1230)
      .attr("y1",687.5)
      .attr("y2",687.5)
      .attr("style","stroke: black; stroke-width: 5");

      svg.append("line")
      .attr("x1",40)
      .attr("x2",40)
      .attr("y1",0)
      .attr("y2",690)
      .attr("style","stroke: black; stroke-width: 5")

      var xScale = d3.scaleBand();
      xScale.range([40,1215]);
      xScale.domain(xVals.map((d)=>{return d;}));
      var yScale = d3.scaleLinear();
      yScale.range([687.5,10]);
      yScale.domain([0,460]);

      svg.selectAll(".xLabels")
      .data(xVals)
      .enter().append("text")
      .attr("class","xLabels")
      .attr("x", function(d){ return xScale(d) + 5})
      .attr("y", 710)
      .text(function(d){ return d })
      .attr("style","font-size:1.01vw")

      svg.selectAll(".xticks")
      .data(xVals)
      .enter().append("line")
      .attr("class","xticks")
      .attr("x1", function(d){ return xScale(d) + xScale.bandwidth()/2})
      .attr("y1", 695)
      .attr("x2", function(d){ return xScale(d) + xScale.bandwidth()/2})
      .attr("y2", 680)
      .attr("style","stroke:black; stroke-width:2");

      svg.selectAll(".yLabels")
      .data(pointScale)
      .enter().append("text")
      .attr("class","yLabels")
      .attr("x", 0)
      .attr("y", function(d){ return yScale(d)})
      .text(function(d){ return d })
      .attr("style","font-size:1.01vw")

      svg.selectAll(".yTicks")
      .data(pointScale)
      .enter().append("line")
      .attr("class","yTicks")
      .attr("x1", 35)
      .attr("y1", function(d){ return yScale(d) - 7})
      .attr("x2", 45)
      .attr("y2", function(d){ return yScale(d) - 7})
      .attr("style", "stroke: black; stroke-width: 1")

      svg.selectAll(".infoLines")
      .data(xVals)
      .enter().append("line")
      .attr("class","infoLines")
      .attr("x1", function(d){ return xScale(d) + xScale.bandwidth()/2})
      .attr("y1", 0)
      .attr("x2", function(d){ return xScale(d) + xScale.bandwidth()/2})
      .attr("y2", 687.5)
      .attr("style","stroke:black; stroke-width:8; stroke-opacity:0.1")
      .on("mouseover",function(event,d){
        d3.select(event.target).attr("style","stroke:black; stroke-width:8; stroke-opacity:0.5");
        d3.selectAll(".info").remove()
        if(!myMap.has(String(d))){
          d3.select(".images").append("p")
          .attr("class","info")
          .text("Did not drive in "+d)
        }
        else{
          d3.select(".images").append("p")
          .attr("class","info")
          .text("Points: "+myArr.get(String(d))[0])
          d3.select(".images").append("p")
          .attr("class","info")
          .text("Teammate's Points: "+myArr.get(String(d))[1])
          
        }
      })
      .on("mouseout",function(event,d){
        d3.select(event.target).attr("style","stroke:black; stroke-width:8; stroke-opacity:0.1");
        d3.selectAll(".info").remove()
        d3.select(".images").append("p")
        .attr("class","info")
        .text("Hover over one of the veritcal lines to see the season wise points breakdown")
      });

      svg.selectAll(".opponent")
      .data(myVals)
      .enter().append("line")
      .attr("class","opponent")
      .attr("x1", function(d, index){
        if(index==0){
          return 40;
        }
        else{
          return xScale(Number(myVals[index-1])) + xScale.bandwidth()/2;
        }
      })
      .attr("y1",function(d, index){
        if(index==0){
          return 690;
        }
        else{
          return yScale(myArr.get(myVals[index-1])[1]) - 7;
        }
      })
      .attr("x2",function(d){return xScale(Number(d)) + xScale.bandwidth()/2})
      .attr("y2",function(d){return yScale(myArr.get(d)[1]) - 7})
      .attr("style","stroke: red; stroke-width:12; stroke-opacity:0.5")
      .style("z-index","0")
      .on("mouseover",function(event,d){
        svg.selectAll(".opponent").attr("style","stroke: red; stroke-width:12; stroke-opacity:1");
      })
      .on("mouseout",function(event,d){
        svg.selectAll(".opponent").attr("style","stroke: red; stroke-width:12; stroke-opacity:0.5")
      })

      svg.selectAll(".oppPoints")
      .data(myVals)
      .enter().append("circle")
      .attr("class","oppPoints")
      .attr("cx",function(d){ return xScale(Number(d)) + xScale.bandwidth()/2 })
      .attr("cy",function(d){ return yScale(myArr.get(d)[1]) - 7 })
      .attr("r", 20)
      .attr("fill","red");

      svg.append("circle")
      .attr("class","oppPoints")
      .attr("cx",40)
      .attr("cy",690)
      .attr("r", 20)
      .attr("fill","red");

      svg.selectAll(".myDriver")
      .data(myVals)
      .enter().append("line")
      .attr("class","myDriver")
      .attr("x1", function(d, index){
        if(index==0){
          return 40;
        }
        else{
          return xScale(Number(myVals[index-1])) + xScale.bandwidth()/2;
        }
      })
      .attr("y1",function(d, index){
        if(index==0){
          return 690;
        }
        else{
          return yScale(myArr.get(myVals[index-1])[0]) - 7;
        }
      })
      .attr("x2",function(d){return xScale(Number(d)) + xScale.bandwidth()/2})
      .attr("y2",function(d){return yScale(myArr.get(d)[0]) - 7})
      .attr("style","stroke: blue; stroke-width:12; stroke-opacity:0.5")
      .on("mouseover",function(event,d){
        svg.selectAll(".myDriver").attr("style","stroke: blue; stroke-width:12; stroke-opacity:1");
      })
      .on("mouseout",function(event,d){
        svg.selectAll(".myDriver").attr("style","stroke: blue; stroke-width:12; stroke-opacity:0.5")
      });

      svg.selectAll(".myPoints")
      .data(myVals)
      .enter().append("circle")
      .attr("class","myPoints")
      .attr("cx",function(d){ return xScale(Number(d)) + xScale.bandwidth()/2 })
      .attr("cy",function(d){ return yScale(myArr.get(d)[0]) - 7 })
      .attr("r", 20)
      .attr("fill","blue");

      svg.append("circle")
      .attr("class","myPoints")
      .attr("cx",40)
      .attr("cy",690)
      .attr("r", 20)
      .attr("fill","blue");
      
      // var line = d3
      // .line()
      // .x(function (d) {
      //   console.log(d);
      //   return xScale(Number(d)) + xScale.bandwidth()/2;
      // })
      // .y(function (d) {
      //   console.log(d);
      //   return yScale(myArr.get(d)[0]) - 7;
      // });

      // var lineElement = svg.selectAll(".line").data([myVals]);

      // lineElement.enter()
      // .append("path")
      // .attr("class", "line")
      // .attr("stroke", "blue")
      // .attr("stroke-width", 12)
      // .attr("fill", "none");

      // lineElement.attr("d", line(myVals.slice(0,1)));

      // lineElement.transition()
      // .duration(1000) // Set the duration of the transition
      // .ease(d3.easeLinear)
      // .attr("d", line(myVals)); // Set the final line path

    }
  }

  async function getData(name){
    const newArr = new Map();

    // console.log(newArr);

    const newMap = new Map();
    await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/DriversStandings.csv',function(data){
      if(data.Driver === name){
        newMap.set(data.Year, data.Constructor);
      }
    });

    await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/DriversStandings.csv',function(data){
      if(newMap.has(data.Year)){
        if(data.Constructor === newMap.get(data.Year)){
          if(!newArr.has(data.Year)){
            newArr.set(data.Year,[0,0])
          }
          if(data.Driver === name){
            newArr.set(data.Year, [Number(data.Points), newArr.get(data.Year)[1]]);
          }
          else{
            newArr.set(data.Year, [newArr.get(data.Year)[0], newArr.get(data.Year)[1]+Number(data.Points)]);
          }
        }
      }
    });
    updArr(newArr);
    updMap(newMap);
  }

  useEffect(()=>{
    console.log(myArr);
    // console.log(myMap);
    if(myArr!=undefined && myMap!=undefined){
      d3.select(".H2H").remove();
      d3.select("#H2Hgraph").append("svg")
      .attr("class","H2H")
      .attr("width",1230)
      .attr("height",800);
      drawGraph();

      d3.selectAll(".images").remove();
      d3.select("#H2Hgraph").append("div")
      .attr("class","images");

      d3.select(".images").append("img")
      .attr("height",600)
      .attr("width",450)
      .attr("src","https://github.com/Rohan-G/Data-Visualization-Project/blob/main/dataset/Images/Lewis%20Hamilton.jpg?raw=true")
      d3.select(".images").append("h2")
      .attr("align","center")
      .text(dname)
      d3.select(".images").append("p")
      .attr("class","info")
      .text("Hover over one of the veritcal lines to see the season wise points breakdown")
    }
  },[myArr,myMap])

  useEffect(()=>{
    if(dname !== ""){
      getData(dname);
    }
  },[dname]);

  return (
    <>
      <h1 align="center">F1</h1>
      <div align="center">
        <FormControl align={"center"} style={{ width: "50vw" }}>
          <InputLabel>Driver</InputLabel>
          <Select value = {dname} label="Driver" onChange={(event)=>{chDriver(event.target.value)}}>
            {
              drivers.map((driver, index)=>{
                return(<MenuItem key={index} value={driver}>{driver}</MenuItem>);
                // console.log(driver);
              })
            }
          </Select>
        </FormControl>
      </div>
      <div id="H2Hgraph" style={{position:"absolute", top: "20vh", left: "0vw", display:"flex", flexFlow:"row wrap", alignItems:"top", justifyItems:"center", gap:"100px" }}>
        <svg className="H2H" width={1230} height={800} />
      </div>
    </>
  );
}

export default App;
