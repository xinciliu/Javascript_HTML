const requestData = async () => { 
	//data from basketballreference.com
	const teamcomp = await d3.csv("data/nbateamcompare.csv")


	//data from basketballreference.com, using scrapper and post-processing script in folder
	const evolve = await d3.csv("data/evolutionnbadata.csv")

//number formats
var formatDecimal = d3.format(".1f");
var formatPercent = d3.format(",.0%");





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////// Evolution of NBA Data Graph


//Margins
var width =1000;
var height=600;
var margin=100;

const Nsvg2 = d3.select("#evolution")
.append("svg")
.attr("width",width)
.attr("height",height);


	evolve.forEach((d,i)=>{

	//Convert to Number 
	d['year']=Number(d['Season']);


//X Scale
var xScale = d3.scaleLinear().domain([1980,d3.max(evolve,function(d){return d['year'];})]).range([margin,width-margin*2]);

//Y Scale
var yScale = d3.scaleLinear().domain([0.2,0.8]).range([height-margin,margin]);


// X Axis
var xAxis = d3.axisBottom().scale(xScale).ticks(10).tickFormat(d3.format("d"));
var yAxis = d3.axisLeft().scale(yScale).ticks(10).tickFormat(formatPercent);

//Format
Nsvg2.append("g").attr("class","x gridlines").call(xAxis)
.attr("transform","translate(0,"+(height-margin)+")")
.append("text")
.text("wine_price")
.attr("transform","translate("+(height-margin)+",0)");


Nsvg2.append("g").attr("class","axis").attr("transform","translate("+margin+",0)").call(yAxis)
.append("text")
.text("wine_points")
.attr("transform","translate(0,"+(margin)+")");



//Bars
var valuenew = d3.line().x(function (d) {return xScale(Number(d['year'])); }).y(function (d) {return yScale(Number(d['3P%'])); });
var valuenew2p = d3.line().x(function (d) {return xScale(Number(d['year'])); }).y(function (d) {return yScale(Number(d["2P%"])); });
var valueneworb = d3.line().x(function (d) {return xScale(Number(d['year'])); }).y(function (d) {return yScale(Number(d["ORB%"])); });
var valuenewdrb = d3.line().x(function (d) {return xScale(Number(d['year'])); }).y(function (d) {return yScale(Number(d["DRB%"])); });


Nsvg2.append("path").attr("class", "path").attr("style", "stroke:" + "maroon" + ";stroke-width:2;fill:none;").attr("d", valuenew(evolve));
Nsvg2.append("path").attr("class", "path").attr("style", "stroke:" + "teal" + ";stroke-width:2;fill:none;").attr("d", valuenew2p(evolve));
Nsvg2.append("path").attr("class", "path").attr("style", "stroke:" + "black" + ";stroke-width:2;fill:none;").attr("d", valueneworb(evolve));
Nsvg2.append("path").attr("class", "path").attr("style", "stroke:" + "purple" + ";stroke-width:2;fill:none;").attr("d", valuenewdrb(evolve));


//Legend - 3P
Nsvg2.append("line").attr("x1", xScale(2023.5)).attr("x2", xScale(2026.5)).attr("y1", yScale(0.6)).attr("y2", yScale(0.6)).attr("stroke", "maroon").text("3P%");
Nsvg2.append("circle").attr("cx", xScale(2025)).attr("cy", yScale(0.6)).attr("fill", "maroon").attr("r", 2);
Nsvg2.append("text").attr("x", xScale(2027)).attr("y", yScale(0.6)).attr("fill", "maroon").text("3P%").attr("font-size","12px").attr("font-family", "sans-serif");

//Legend - 2P
Nsvg2.append("line").attr("x1", xScale(2023.5)).attr("x2", xScale(2026.5)).attr("y1", yScale(0.55)).attr("y2", yScale(0.55)).attr("stroke", "teal").text("2P%");
Nsvg2.append("circle").attr("cx", xScale(2025)).attr("cy", yScale(0.55)).attr("fill", "teal").attr("r", 2);
Nsvg2.append("text").attr("x", xScale(2027)).attr("y", yScale(0.55)).attr("fill", "teal").text("2P%").attr("font-size","12px").attr("font-family", "sans-serif");



//Legend - ORB
Nsvg2.append("line").attr("x1", xScale(2023.5)).attr("x2", xScale(2026.5)).attr("y1", yScale(0.5)).attr("y2", yScale(0.5)).attr("stroke", "black");
Nsvg2.append("circle").attr("cx", xScale(2025)).attr("cy", yScale(0.5)).attr("fill", "black").attr("r", 2);
Nsvg2.append("text").attr("x", xScale(2027)).attr("y", yScale(0.5)).attr("fill", "black").text("ORB%").attr("font-size","12px").attr("font-family", "sans-serif");

//Legend - DRB
Nsvg2.append("line").attr("x1", xScale(2023.5)).attr("x2", xScale(2026.5)).attr("y1", yScale(0.45)).attr("y2", yScale(0.45)).attr("stroke", "purple");
Nsvg2.append("circle").attr("cx", xScale(2025)).attr("cy", yScale(0.45)).attr("fill", "purple").attr("r", 2);
Nsvg2.append("text").attr("x", xScale(2027)).attr("y", yScale(0.45)).attr("fill", "purple").text("DRB%").attr("font-size","12px").attr("font-family", "sans-serif");


var borderPath = Nsvg2.append("rect")
  .attr("x", 0)
  .attr("y", 40)
  .attr("height", height-40)
  .attr("width", width)
  .style("stroke", "black")
  .style("fill", "none")
  .style("stroke-width", 3);
});






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////// Basketball Bar Compare Graphs


//////////////////
////////////////// 1985 Lakers

	//Margins
	var margin = {top: 0, right: 81, bottom: 40, left: 0},
	width = 460 - margin.left - margin.right,
	height = 518 - margin.top - margin.bottom;


	//SVG object 
	let svg = d3.select("#my_dataviz")  
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



	teamcomp.forEach((d,i) => {

		//custom colors for each marker
		var markerarray = [["3P%", "maroon"], ["2P%", "teal"], ["ORB%","black"], ["DRB%", "purple"]];
		var myMap = new Map(markerarray);

  // Y axis
  var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(teamcomp.map(function(d) { return d["Marker"]; }))
  .padding(.3);

  svg.append("g")
  .attr("transform", "translate( " + width + ", 0 )")
  .call(d3.axisRight(y))


// Add X axis
var x = d3.scaleLinear()
.range([width, 0])
.nice();

svg.append("g")
.attr("transform", "translate(0," + height + ")")

  //Bars
  let sidechart = svg.selectAll("myRect")
  .data(teamcomp)
  .enter()

  sidechart.append("rect")
  .attr("x", function(d) {return x(d["1985 Lakers"]); })
  .attr("y", function(d) { return y(d["Marker"]); })
  .attr("width", function(d) { return x(0) - x(d["1985 Lakers"]); })
  .attr("height", y.bandwidth())
  //color continunity
  .attr("fill", function(d){ return myMap.get(d["Marker"]); })


//embed values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["1985 Lakers"]) + 10 ;})
   .text(function (d) {return formatDecimal(d["1985 Lakers"]*100)  + "%" ;})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")
   .attr("fill", "white")

//embed axis values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["1985 Lakers"]) + -55;})
   .text(function (d) {return d["Marker"];})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")

});

////////////////// 2010 Lakers

var margin = {top: 0, right: 0, bottom: 40, left: 0},
width = 460 - margin.left - margin.right,
height = 518 - margin.top - margin.bottom;

	//SVG object 
	let svg2 = d3.select("#my_dataviz2")  
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	teamcomp.forEach((d,i) => {

		var markerarray = [["3P%", "maroon"], ["2P%", "teal"], ["ORB%","black"], ["DRB%", "purple"]];
		var myMap = new Map(markerarray);

  // Y axis
  var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(teamcomp.map(function(d) { return d["Marker"]; }))
  .padding(.3);

  svg2.append("g")
  .call(d3.axisLeft(y))


// Add X axis
var x = d3.scaleLinear()
.range([0, width])
.nice();

svg2.append("g")
.attr("transform", "translate(0," + height + ")")


  //Bars
  let sidechart = svg2.selectAll("myRect")
  .data(teamcomp)
  .enter()

  sidechart.append("rect")
  .attr("x", x(0))
  .attr("y", function(d) { return y(d["Marker"]); })
  .attr("width", function(d) {return  x(d["2010 Lakers"]); })
  .attr("height", y.bandwidth() )
  .attr("fill", function(d){ return myMap.get(d["Marker"]); })
  .attr("transform", "translate(1,0)")


//embed values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["2010 Lakers"]) + -50;})
   .text(function (d) {return formatDecimal(d["2010 Lakers"]*100)  + "%" ;})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")
   .attr("fill", "white")


//embed axis values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["2010 Lakers"]) + 6;})
   .text(function (d) {return d["Marker"];})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")


});

//////////////////
//////////////////
////////////////// 2003 Spurs

	//Margins
	var margin = {top: 0, right: 81, bottom: 40, left: 0},
	width = 460 - margin.left - margin.right,
	height = 518 - margin.top - margin.bottom;


	//SVG object 
	let svg3 = d3.select("#my_dataviz3")  
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	//format to 2 decimals 
	var formatDecimal = d3.format(".1f");

	teamcomp.forEach((d,i) => {

		//custom colors for each marker
		var markerarray = [["3P%", "maroon"], ["2P%", "teal"], ["ORB%","black"], ["DRB%", "purple"]];
		var myMap = new Map(markerarray);

  // Y axis
  var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(teamcomp.map(function(d) { return d["Marker"]; }))
  .padding(.3);

  svg3.append("g")
  .attr("transform", "translate( " + width + ", 0 )")
  .call(d3.axisRight(y))


// Add X axis
var x = d3.scaleLinear()
.range([width, 0])
.nice();

svg3.append("g")
.attr("transform", "translate(0," + height + ")")

  //Bars
  let sidechart = svg3.selectAll("myRect")
  .data(teamcomp)
  .enter()

  sidechart.append("rect")
  .attr("x", function(d) {return x(d["2003 Spurs"]); })
  .attr("y", function(d) { return y(d["Marker"]); })
  .attr("width", function(d) { return x(0) - x(d["2003 Spurs"]); })
  .attr("height", y.bandwidth())
  .attr("fill", function(d){ return myMap.get(d["Marker"]); })


//embed values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["2003 Spurs"]) + 10 ;})
   .text(function (d) {return formatDecimal(d["2003 Spurs"]*100)  + "%" ;})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")
   .attr("fill", "white")

//embed axis values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["2003 Spurs"]) + -55;})
   .text(function (d) {return d["Marker"];})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")

});

////////////////// 2014 Spurs

var margin = {top: 0, right: 0, bottom: 40, left: 0},
width = 460 - margin.left - margin.right,
height = 518 - margin.top - margin.bottom;

	//SVG object 
	let svg4 = d3.select("#my_dataviz4")  
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	teamcomp.forEach((d,i) => {

		var markerarray = [["3P%", "maroon"], ["2P%", "teal"], ["ORB%","black"], ["DRB%", "purple"]];
		var myMap = new Map(markerarray);

  // Y axis
  var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(teamcomp.map(function(d) { return d["Marker"]; }))
  .padding(.3);

  svg4.append("g")
  .call(d3.axisLeft(y))


// Add X axis
var x = d3.scaleLinear()
.range([0, width])
.nice();

svg4.append("g")
.attr("transform", "translate(0," + height + ")")


  //Bars
  let sidechart = svg4.selectAll("myRect")
  .data(teamcomp)
  .enter()

  sidechart.append("rect")
  .attr("x", x(0))
  .attr("y", function(d) { return y(d["Marker"]); })
  .attr("width", function(d) {return  x(d["2014 Spurs"]); })
  .attr("height", y.bandwidth() )
  .attr("fill", function(d){ return myMap.get(d["Marker"]); })
  .attr("transform", "translate(1,0)")


//embed values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["2014 Spurs"]) + -50;})
   .text(function (d) {return formatDecimal(d["2014 Spurs"]*100)  + "%" ;})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")
   .attr("fill", "white")

//embed axis values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["2014 Spurs"]) + 6;})
   .text(function (d) {return d["Marker"];})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")


});

//////////////////
//////////////////
////////////////// 1994 Warriors


	//Margins
	var margin = {top: 0, right: 81, bottom: 40, left: 0},
	width = 460 - margin.left - margin.right,
	height = 518 - margin.top - margin.bottom;


	//SVG object 
	let svg5 = d3.select("#my_dataviz5")  
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	//format to 2 decimals 
	var formatDecimal = d3.format(".1f");

	teamcomp.forEach((d,i) => {

		//custom colors for each marker
		var markerarray = [["3P%", "maroon"], ["2P%", "teal"], ["ORB%","black"], ["DRB%", "purple"]];
		var myMap = new Map(markerarray);

  // Y axis
  var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(teamcomp.map(function(d) { return d["Marker"]; }))
  .padding(.3);

  svg5.append("g")
  .attr("transform", "translate( " + width + ", 0 )")
  .call(d3.axisRight(y))


// Add X axis
var x = d3.scaleLinear()
.range([width, 0])
.nice();

svg5.append("g")
.attr("transform", "translate(0," + height + ")")

  //Bars
  let sidechart = svg5.selectAll("myRect")
  .data(teamcomp)
  .enter()

  sidechart.append("rect")
  .attr("x", function(d) {return x(d["1994 Warriors"]); })
  .attr("y", function(d) { return y(d["Marker"]); })
  .attr("width", function(d) { return x(0) - x(d["1994 Warriors"]); })
  .attr("height", y.bandwidth())
  .attr("fill", function(d){ return myMap.get(d["Marker"]); })


//embed values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["1994 Warriors"]) + 10 ;})
   .text(function (d) {return formatDecimal(d["1994 Warriors"]*100)  + "%" ;})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")
   .attr("fill", "white")

//embed axis values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["1994 Warriors"]) + -55;})
   .text(function (d) {return d["Marker"];})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")


});


////////////////// 2015 Warriors

var margin = {top: 0, right: 0, bottom: 40, left: 0},
width = 460 - margin.left - margin.right,
height = 518 - margin.top - margin.bottom;

	//SVG object 
	let svg6 = d3.select("#my_dataviz6")  
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	teamcomp.forEach((d,i) => {

		var markerarray = [["3P%", "maroon"], ["2P%", "teal"], ["ORB%","black"], ["DRB%", "purple"]];
		var myMap = new Map(markerarray);

  // Y axis
  var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(teamcomp.map(function(d) { return d["Marker"]; }))
  .padding(.3);

  svg6.append("g")
  .call(d3.axisLeft(y))


// Add X axis
var x = d3.scaleLinear()
.range([0, width])
.nice();

svg6.append("g")
.attr("transform", "translate(0," + height + ")")


  //Bars
  let sidechart = svg6.selectAll("myRect")
  .data(teamcomp)
  .enter()

  sidechart.append("rect")
  .attr("x", x(0))
  .attr("y", function(d) { return y(d["Marker"]); })
  .attr("width", function(d) {return  x(d["2015 Warriors"]); })
  .attr("height", y.bandwidth() )
  .attr("fill", function(d){ return myMap.get(d["Marker"]); })
  .attr("transform", "translate(1,0)")


//embed values inside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["2015 Warriors"]) + -50;})
   .text(function (d) {return formatDecimal(d["2015 Warriors"]*100)  + "%" ;})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")
   .attr("fill", "white")

//embed axis values outside
sidechart.append("text")
.attr("y", function(d) { return y(d["Marker"]) + y.bandwidth() / 2 + 6;})
   //x position is 3 pixels to the right of the bar
   .attr("x", function(d) { return x(d["2015 Warriors"]) + 6;})
   .text(function (d) {return d["Marker"];})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight", "bold")

});



}





requestData(); 