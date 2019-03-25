// @TODO: YOUR CODE HERE!

// Set up a chart

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("/assets/data/data.csv").then (function(statedata) {
  
  console.log(statedata)

  statedata.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });
  
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(statedata, d => d.poverty))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(statedata, d => d.healthcare)])
    .range([height, 0]);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

  chartGroup.append("g").call(leftAxis);

  chartGroup.selectAll("circle")
    .data(statedata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 10)
    .attr("fill", "lightblue");

  chartGroup.append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
  });