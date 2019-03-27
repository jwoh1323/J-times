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
    .domain([d3.min(statedata, d => d.poverty * 0.8), d3.max(statedata, d => d.poverty * 1.2)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(statedata, d => d.healthcare * 0.8), d3.max(statedata, d => d.healthcare * 1.2)])
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
    .attr("fill", "skyblue");

  chartGroup.selectAll(".text")
    .data(statedata)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty)-6)
    .attr("y", d => yLinearScale(d.healthcare)+3)
    .style("font", "8px sans-serif")
    .style("fill", "white")
    .attr({"text-anchor" : "middle"})

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 1.5))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare (%)")
    .attr("font-weight", 700)

  
  var labelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${width / 2}, ${height + 20})`);

  labelsGroup.append("text")
  .attr("x", 0)
  .attr("y", 20)
  .classed("active", true)
  .text("In Poverty (%)");

  });