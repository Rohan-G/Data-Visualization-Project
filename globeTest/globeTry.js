// width and height
var w = 850;
var h = 700;

// scale globe to size of window
var scl = Math.min(w, h) / 2.5;

// map projection
var projection = d3
  .geoOrthographic()
  .scale(scl)
  .translate([w / 2, h / 2.3]);

const initialScale = projection.scale();

// path generator
var path = d3.geoPath(projection);

// append svg
var svg = d3
  .select("#svgDiv")
  .append("svg")
  .attr("width", w)
  .attr("height", h - 70)
  .attr("class", "globeSvg")
  .style("cursor", "move");

var countryDetails = d3
  .select("body")
  .append("div")
  .attr("id", "countryDetails");

// append g element for map
var map = svg.append("g");

// enable zoom
// var zoom = d3
//   .zoom()
//   .scaleExtent([0.75, 50]) //bound zoom
//   .on("zoom", zoomed);

// svg.call(zoom);


const highlightedCountries = [
  "United States of America",
  "Japan",
  "Australia",
  "Mexico",
  "Brazil",
  "Italy",
  "Bahrain",
  "Azerbaijan",
  "Spain",
  "Monaco",
  "Belgium",
  "Canada",
  "Netherlands",
  "Hungary",
  "Saudi Arabia",
  "Qatar",
  "Singapore",
  "Austria",
  "China",
  "United Kingdom",
  "United Arab Emirates",
];

// load topojson
Promise.all([
  d3.json("countries-110m.json"),
  d3.json("countryF1Data.json"),
]).then(function (response) {
  const json = response[0];
  const data = response[1];

  const array1 = Object.entries(data).map((count) => count[0])
  console.log(array1);

  const countries = topojson.feature(json, json.objects.countries);
  const boundaries = topojson.mesh(
    json,
    json.objects.countries,
    (a, b) => a != b
  );

  // console.log(countries.features[0]);

  map
    .append("path")
    .datum({ type: "Sphere" })
    .attr("class", "ocean")
    .attr("d", path);

  map
    .append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "land")
    .attr("d", path)
    .style("stroke", "black")
    .style("stroke-width", 0.5)
    .style("opacity", 1)
    .style("fill", function (d) {
      if (highlightedCountries.includes(d.properties.name)) {
        return "#da1e37";
      }
    })
    .on("click", function (d, i) {

      if (highlightedCountries.includes(i.properties.name)) {
        d3.selectAll(".land").classed("countryClick", false)
        d3.select(this).classed("countryClick", true)
        let countryName = i.properties.name;
        console.log(countryName);

        if (countryName === "United States of America") {
          countryName = "USA";
        }
        if (countryName === "United Arab Emirates") {
          countryName = "UAE";
        }
        if (countryName === "United Kingdom") {
          countryName = "UK";
        }

        let country = data[countryName];
        // console.log(country);

        let currentTrackIndex = 0;
        let raceTracksData = country.Circuits;

        let driversData = country.Drivers;

        function showCurrentTrack() {
          let currentTrack = raceTracksData[currentTrackIndex];
          let driverCards = driversData
            .map(
              (driver) => `
      <div class="driverCard">
        <img class="driverImage" src="${driver.Image}" alt="${driver.Name}">
        <div class="driverName">${
          driver.Name.split(" ")[0] +
          " " +
          driver.Name.split(" ")[1].toUpperCase()
        }</div>
      </div>
    `
            )
            .join("\n");
          countryDetails.html(`
        <div class="header">
            <img class="flag" src=${country.Flag} alt="Country Flag">
            <hr class="line">
            <div class="country-name">${countryName.toUpperCase()}</div>
            <hr class="line">
          </div>
        
       
                           <div class="raceTracks">Race Tracks</div>
                           <div class = "trackImage">
                            <div class="leftArrow">&lt;</div>
                            <img class="circuitImage" src="${
                              currentTrack.Image
                            }" alt="Circuit">
                            <div class="rightArrow">&gt;</div>
                           </div>
                           <div class="circuitName">${currentTrack.Name}</div>
                           <div class="circuitLoc">${
                             currentTrack.Location
                           }</div>
                           <div class="raceTracks">Current / Recent Drivers</div>
                           ${
                             driversData.length
                               ? `<div class="driversContainer">${driverCards}</div>`
                               : `<div class="noDataMessage">No driver data available</div>`
                           }
                          `);

          let leftArrow = countryDetails.select(".leftArrow");
          let rightArrow = countryDetails.select(".rightArrow");
          leftArrow.on("click", function () {
            currentTrackIndex--;
            if (currentTrackIndex < 0) {
              currentTrackIndex = raceTracksData.length - 1;
            }

            showCurrentTrack();
          });

          rightArrow.on("click", function () {
            currentTrackIndex++;
            if (currentTrackIndex >= raceTracksData.length) {
              currentTrackIndex = 0;
            }
            showCurrentTrack();
          });
        }

        showCurrentTrack();
      }
    });

  map
    .call(
      d3.drag().on("drag", (event) => {
        const rotate = projection.rotate();
        const k = 175 / projection.scale();
        projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k]);
        map.selectAll("path").attr("d", path);
        // requestAnimationFrame(dragged, 1000 / 60);
      })
    )
    .call(
      d3.zoom().scaleExtent([1,10])
      .on("zoom", (event) => {
        if (event.transform.k > 0.3) {
          projection.scale(initialScale * event.transform.k);
          path = d3.geoPath().projection(projection);
          map.selectAll("path").attr("d", path);
          map.attr("r", projection.scale());
        } else {
          event.transform.k = 0.3;
        }
      })
    );
});

d3.timer(function(elapsed) {
  const rotate = projection.rotate()
  const k = 35 / projection.scale()
  projection.rotate([
    rotate[0] - 1 * k,
    rotate[1]
  ])
  path = d3.geoPath().projection(projection)
  svg.selectAll("path").attr("d", path)
},500)

// function zoomed(event) {
//   projection.scale(event.transform.apply(projection).k * scl);
//   map.selectAll("path").attr("d", path);
// }
