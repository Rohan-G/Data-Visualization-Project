import * as d3 from 'd3';
import { useState, useEffect } from 'react';

function App() {
    const [drivers, editDrivers] = useState();
    const [constr, editConst] = useState();
    const [years, editYears] = useState();
    const [constColors, changeColors] = useState();

    var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 1000 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;

    var svg = d3.select("#championships");
    svg.attr("width", width + margin.left + margin.right);
    svg.attr("height", height + margin.top + margin.bottom);

    function drawSankey(){
        var sankey = d3.sankey()
        .nodeWidth(36)
        .size([width, height]);
    }

    return(
        <>
            <h1 align= "center">Championships</h1>
            <svg id="championships" />
        </>
    )

}