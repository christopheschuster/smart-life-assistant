// Filename: AdvancedDataVisualization.js

/*
  This code implements a complex data visualization using D3.js library.
  It generates an interactive scatter plot with multiple data points,
  axis labels, tooltips, and various styling features.

  The data is fetched from an external API and then transformed for the plot.

  Note: For execution, ensure the D3.js library is included.
*/

// Define SVG dimensions
var svgWidth = 800; 
var svgHeight = 600;

// Define chart margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// Calculate chart dimensions
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Create SVG container
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Create chart group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Fetch data from API endpoint
d3.json("https://api.example.com/data", function(data) {
  // Data transformation and cleaning code here
  
  // Define scales
  var xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x)])
    .range([0, chartWidth]);
    
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range([chartHeight, 0]);
    
  // Create axes
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
  
  // Append axes to the chart group
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);
    
  chartGroup.append("g")
    .call(yAxis);
    
  // Create circles for each data point
  var circles = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 5)
    .attr("fill", "steelblue")
    .attr("opacity", 0.7)
    .attr("stroke", "black");
    
  // Add tooltips
  circles.append("title")
    .text(d => `(${d.x}, ${d.y})`);
    
  // Add event listeners for tooltip display
  circles.on("mouseover", function() {
    d3.select(this)
      .attr("opacity", 1.0)
      .attr("stroke-width", 2);
  })
  .on("mouseout", function() {
    d3.select(this)
      .attr("opacity", 0.7)
      .attr("stroke-width", 1);
  });
  
  // Add axis labels
  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 40})`)
    .style("text-anchor", "middle")
    .text("X Axis");
    
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Y Axis");
    
  // Add chart title
  chartGroup.append("text")
    .attr("x", (chartWidth / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Complex Data Visualization");
});
// End of code