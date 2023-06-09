import * as d3 from 'd3';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';

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
drivers.sort();

function App() {
  const [myArr, updArr] = useState();
  const [myMap, updMap] = useState();
  const [dname, chDriver] = useState("");

  async function insertImage(dname) {
    await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/DriverImages.csv', function (data) {
      if (data.Driver == dname) {
        d3.select(".images").append("img")
          .attr("height", 500)
          .attr("width", 500)
          .attr("src", data['Image Link']);
        d3.select(".images").append("h2")
          .attr("align", "center")
          .style("font-family","Raleway")
          .text(dname)
        d3.select(".images").append("p")
          .attr("class", "info")
          .style("font-family","Raleway")
          .text("Hover over one of the veritcal lines to see the season wise points breakdown")
      }
    })
  }

  function drawGraph() {
    var pointScale = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450];
    var xVals = [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    const myVals = Array.from(myArr.keys());
    // console.log(myArr.keys());

    var lineOpp = d3.line()
      .x(function (d) { return xScale(Number(d)) + xScale.bandwidth() / 2 })
      .y(function (d) { return yScale(myArr.get(d)[1]) - 7 })
      .curve(d3.curveLinear);

    var lineMy = d3.line()
      .x(function (d) { return xScale(Number(d)) + xScale.bandwidth() / 2 })
      .y(function (d) { return yScale(myArr.get(d)[0]) - 7 })
      .curve(d3.curveLinear);

    if (myArr.length !== 0 && myMap.length !== 0) {
      // console.log("Hello");
      let svg = d3.select(".H2H");

      svg.append("line")
        .attr("x1", 100)
        .attr("x2", 1230)
        .attr("y1", 687.5)
        .attr("y2", 687.5)
        .attr("style", "stroke: black; stroke-width: 5");

      svg.append("line")
        .attr("x1", 100)
        .attr("x2", 100)
        .attr("y1", 0)
        .attr("y2", 690)
        .attr("style", "stroke: black; stroke-width: 5")

      var xScale = d3.scaleBand();
      xScale.range([100, 1215]);
      xScale.domain(xVals.map((d) => { return d; }));
      var yScale = d3.scaleLinear();
      yScale.range([687.5, 10]);
      yScale.domain([0, 480]);

      svg.append("text")
        .attr("x", 625)
        .attr("y", 750)
        .text("Season")
        .attr("style", "font-size:1.5vw; font-weight:bold");

      svg.selectAll(".xLabels")
        .data(xVals)
        .enter().append("text")
        .attr("class", "xLabels")
        .attr("x", function (d) { return xScale(d) + 5 })
        .attr("y", 710)
        .text(function (d) { return d })
        .attr("style", "font-size:1.01vw")

      svg.selectAll(".xticks")
        .data(xVals)
        .enter().append("line")
        .attr("class", "xticks")
        .attr("x1", function (d) { return xScale(d) + xScale.bandwidth() / 2 })
        .attr("y1", 695)
        .attr("x2", function (d) { return xScale(d) + xScale.bandwidth() / 2 })
        .attr("y2", 680)
        .attr("style", "stroke:black; stroke-width:2");

      svg.append("text")
        .attr("x", 40)
        .attr("y", 400)
        .text("Points")
        .attr("transform", "rotate(270,40,400)")
        .attr("style", "font-size:1.5vw; font-weight:bold");

      svg.selectAll(".yLabels")
        .data(pointScale)
        .enter().append("text")
        .attr("class", "yLabels")
        .attr("x", 60)
        .attr("y", function (d) { return yScale(d) })
        .text(function (d) { return d })
        .attr("style", "font-size:1.01vw")

      svg.selectAll(".yTicks")
        .data(pointScale)
        .enter().append("line")
        .attr("class", "yTicks")
        .attr("x1", 95)
        .attr("y1", function (d) { return yScale(d) - 7 })
        .attr("x2", 105)
        .attr("y2", function (d) { return yScale(d) - 7 })
        .attr("style", "stroke: black; stroke-width: 1")

      svg.selectAll(".infoLines")
        .data(xVals)
        .enter().append("line")
        .attr("class", "infoLines")
        .attr("x1", function (d) { return xScale(d) + xScale.bandwidth() / 2 })
        .attr("y1", 0)
        .attr("x2", function (d) { return xScale(d) + xScale.bandwidth() / 2 })
        .attr("y2", 687.5)
        .attr("style", "stroke:black; stroke-width:8; stroke-opacity:0.1")
        .on("mouseover", function (event, d) {
          d3.select(event.target).attr("style", "stroke:black; stroke-width:8; stroke-opacity:0.5");
          d3.selectAll(".info").remove()
          if (!myMap.has(String(d))) {
            d3.select(".images").append("p")
              .attr("class", "info")
              .style("font-family","Raleway")
              .text("Did not drive in " + d)
          }
          else {
            d3.select(".images").append("p")
              .attr("class", "info")
              .style("font-family","Raleway")
              .html("Season: " + d + "<br>" + "Team: " + myMap.get(String(d)) + "<br>" + "Points: " + myArr.get(String(d))[0] + "<br>" + "Teammates' total Points: " + myArr.get(String(d))[1])

          }
        })
        .on("mouseout", function (event, d) {
          d3.select(event.target).attr("style", "stroke:black; stroke-width:8; stroke-opacity:0.1");
          d3.selectAll(".info").remove()
          d3.select(".images").append("p")
            .attr("class", "info")
            .style("font-family","Raleway")
            .text("Hover over one of the veritcal lines to see the season wise points breakdown")
        });

      svg.append("path")
        .datum(myVals)
        .attr("d", lineOpp)
        .attr("fill", "none")
        .attr("style", "stroke: red; stroke-width:10; stroke-opacity:0.5")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("style", "stroke: red; stroke-width:10; stroke-opacity:1");
        })
        .on("mouseout", function (event, d) {
          d3.select(this).attr("style", "stroke: red; stroke-width:10; stroke-opacity:0.5")
        })
        .transition()
        .duration(10000)
        .ease(d3.easeLinear)
        .attrTween("stroke-dasharray", function() {
            var len = this.getTotalLength();
            return function(t) { return (d3.interpolateString("0," + len, len + ",0"))(t); };
        });


      svg.selectAll(".oppPoints")
        .data(myVals)
        .enter().append("circle")
        .attr("class", "oppPoints")
        .attr("cx", function (d) { return xScale(Number(d)) + xScale.bandwidth() / 2 })
        .attr("cy", function (d) { return yScale(myArr.get(d)[1]) - 7 })
        .attr("r", 13)
        .attr("fill", "red");

      svg.append("path")
        .datum(myVals)
        .attr("d", lineMy)
        .attr("fill", "none")
        .attr("style", "stroke: blue; stroke-width:8; stroke-opacity:0.5")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("style", "stroke: blue; stroke-width:10; stroke-opacity:1");
        })
        .on("mouseout", function (event, d) {
          d3.select(this).attr("style", "stroke: blue; stroke-width:10; stroke-opacity:0.5")
        })
        .transition()
        .duration(10000)
        .ease(d3.easeLinear)
        .attrTween("stroke-dasharray", function() {
            var len = this.getTotalLength();
            return function(t) { return (d3.interpolateString("0," + len, len + ",0"))(t); };
        });

      svg.selectAll(".myPoints")
        .data(myVals)
        .enter().append("circle")
        .attr("class", "myPoints")
        .attr("cx", function (d) { return xScale(Number(d)) + xScale.bandwidth() / 2 })
        .attr("cy", function (d) { return yScale(myArr.get(d)[0]) - 7 })
        .attr("r", 13)
        .attr("fill", "blue");

    }
  }

  async function getData(name) {
    const newArr = new Map();

    // console.log(newArr);

    const newMap = new Map();
    await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/DriversStandings.csv', function (data) {
      if (data.Driver === name) {
        newMap.set(data.Year, data.Constructor);
      }
    });

    await d3.csv('https://raw.githubusercontent.com/Rohan-G/Data-Visualization-Project/main/dataset/DriversStandings.csv', function (data) {
      if (newMap.has(data.Year)) {
        if (data.Constructor === newMap.get(data.Year)) {
          if (!newArr.has(data.Year)) {
            newArr.set(data.Year, [0, 0])
          }
          if (data.Driver === name) {
            newArr.set(data.Year, [Number(data.Points), newArr.get(data.Year)[1]]);
          }
          else {
            newArr.set(data.Year, [newArr.get(data.Year)[0], newArr.get(data.Year)[1] + Number(data.Points)]);
          }
        }
      }
    });
    updArr(newArr);
    updMap(newMap);
  }

  useEffect(() => {
    // console.log(myArr);
    // console.log(myMap);
    if (myArr != undefined && myMap != undefined) {
      d3.select(".H2H").remove();
      d3.select("#H2Hgraph").append("svg")
        .attr("class", "H2H")
        .attr("width", 1230)
        .attr("height", 800);
      drawGraph();

      d3.selectAll(".images").remove();
      d3.select("#H2Hgraph").append("div")
        .attr("class", "images");

      insertImage(dname);
    }
  }, [myArr, myMap])

  useEffect(() => {
    if (dname !== "") {
      // console.log(dname);
      getData(dname);
    }
  }, [dname]);

  return (
    <>
      <h1 align="center" style={{fontFamily: "Raleway",fontWeight: "300",fontSize: "40px"}}>Driver Head To Head</h1>
      <div id="information">
        <Typography style={{ marginLeft: "10vw", marginRight:"10vw", fontFamily: "Raleway", color:"grey", fontSize:"18px" }}>
          Drivers cannot be solely compared to all other drivers based on number of wins or number of points in a season. This is because even though driver ability has a part to play in these aspects, the car has a very significant hand in influencing these features. They say that F1 is a team sport. While this may be true, your teammate is the one you absolutely must beat at all costs, as they have the same car as you. If you cannot beat the one with the same car as you, how can you believe that you can stand toe to toe against the best in the world, and deserve to be called the world champion (an unspoken rule in the F1 world - you need to be confident enough to think you are the best in the world).
          <br></br>
          <br></br>
          <b>Start typing the name of a driver and select it from the dropdown to see the graph of the selected driver vs his teammate in every season the driver has been part of the sport.</b>
        </Typography>
      </div>
      <br />
      <div align = "center">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={drivers}
          sx={{ width: 300 }}
          onChange={(event, value) => { chDriver(value) }}
          renderInput={(params) => <TextField {...params} label="Driver" />}
        />
      </div>
      <br></br>
      <br></br>
      <div id="H2Hgraph" style={{ position: "absolute", left: "0vw", display: "flex", flexFlow: "row no-wrap", alignItems: "top", justifyItems: "center", gap: "100px" }}>
        <svg className="H2H" width={1230} height={800} />
      </div>
    </>
  );
}

export default App;
