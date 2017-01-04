//this function clears the indiv graphics on submit click//

$(".submitButton1").click(function () {   
    $(".graph1").empty();
});

$(".submitButton2").click(function () { 
    $(".graph2").empty();
});

////////////////////////////////AJAX call info here...////////////////////////////////////////////////////////////////

function filteredTychoLevel2(y, d, s) {   //year, disease, state shorthand
    //console.log(y + d + s);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/Home/GetTychoLevel2ChartData",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                year: y,
                disease: d,
                state: s
            })

        }).done(function (data) {
            resolve(data);
        }).error(function (e) {    //"e" is my error message.
            reject(e);
        });
    });
}

function filteredTychoLevel2death(d, s) {   //year, disease, state shorthand
    //console.log(y + d + s);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/Home/GetTychoLevel2ChartDataDeath",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                disease: d,
                state: s
            })

        }).done(function (data) {
            resolve(data);
        }).error(function (e) {    //"e" is my error message.
            reject(e);
        });
    });
}
////pageload graph specs here...///
filteredTychoLevel2("1920", "DIPHTHERIA", "NY")

        .then(function (returndata) {
            createGraph1(returndata);
        });

filteredTychoLevel2death("DIPHTHERIA", "NY")
        .then(function (returndata) {
            createGraph2(returndata);
        });



//click event actions here..//////////////////////
$(".submitButton1").on("click", function () {
    //enter a function to clear the graph here!//
    
    var year = $(".selectedYear1").val();
    var disease = $(".selectedDisease1").val();
    var state = $(".selectedState1").val();
    filteredTychoLevel2(year, disease, state)

        .then(function (returndata) {
            createGraph1(returndata);
 
        });
  });

$(".submitButton2").on("click", function () {
    
    var disease = $(".selectedDisease2").val();
    var state = $(".selectedState2").val();
    filteredTychoLevel2death(disease, state)
        .then(function (returndata) {
            //console.log(returndata);
            createGraph2(returndata);
        });

});

/////////////////////////D3 GRAPHICS CODE FOLLOWS://////////////////////////////

//GRAPH #1//////// Create a function here that runs on click event of SubmitButton1///

function createGraph1(monkeybutt) {
    //console.log(monkeybutt);
    // set the dimensions and margins of the graph//
    var margin = { top: 40, right: 10, bottom: 30, left: 50 },
        width = 1050 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges//
     var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);
    
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    
    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return "<strong>Number per Week:</strong> <span style='color:red'>" + d.numberPerWeek + "</span>";
    });

    var svg = d3.select("#graph1").append("svg")  
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    // define the line//
        x.domain(monkeybutt.map(function (d) { return parseInt(d.week) }));  
        y.domain([0, d3.max(monkeybutt, function (d) { return parseInt(d.numberPerWeek); })]); 

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        svg.append("text")      // text label for the x axis
        .attr("x", 400)
        .attr("y", 465)
        .style("text-anchor", "middle")
        .text("MMWR Week");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".9em")
            .style("text-anchor", "end")
            .text("Number per Week"); 

        svg.selectAll(".bar")
            .data(monkeybutt)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(parseInt(d.week)); })

        .attr("width", x.rangeBand())
            .attr("y", function (d) { return y(parseInt(d.numberPerWeek)); })
            .attr("height", function (d) { return height - y(parseInt(d.numberPerWeek)); })
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

        function type(d) {
            d.numberPerWeek = +d.numberPerWeek;  
            return d;
        }
    //})
}
///////////////GRAPH 2- AREA CHART CODE HERE.../////////////////////////////////////////////
function createGraph2(data) {
    var margin = { top: 20, right: 20, bottom: 50, left: 50 },
    width = 1050 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

     var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.format("d"));  

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var area = d3.svg.area()
        .x(function (d) { return x(d.year); })
        .y0(height)
        .y1(function (d) { return y(d.numberPerYear); });
    
    var svg = d3.select("#graph2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            data.forEach(function (d) {
                d.year = parseInt(d.year);
                d.numberPerYear = parseInt(d.numberPerYear);
        });

        x.domain(d3.extent(data, function (d) {return d.year;}));
        y.domain([0, d3.max(data, function (d) {return d.numberPerYear;})]);


        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .attr("width", "5%")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Number per Year");

}
///////////////GRAPH 3- AREA CHART CODE HERE.../////////////////////////////////////////////


function dashboard(id, fData){
    var barColor = 'steelblue';
    function segColor(c) { return { First: "#807dba", Second: "#e08214", Third: "#41ab5d" }[c]; }
    
    // compute total for each state.
    fData.forEach(function (d) { d.total = d.freq.First + d.freq.Second + d.freq.Third; });
    
    // function to handle histogram.
    function histoGram(fD){
        var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
        hGDim.w = 500 - hGDim.l - hGDim.r, 
        hGDim.h = 300 - hGDim.t - hGDim.b;
            
        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

        
        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                .domain(fD.map(function(d) { return d[0]; }));

        // Add x-axis to the histogram svg.
        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([hGDim.h, 0])
                .domain([0, d3.max(fD, function(d) { return d[1]; })]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
                .append("g").attr("class", "bar");
        
        //create the rectangles.
        bars.append("rect")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("width", x.rangeBand())
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr('fill',barColor)
            .on("mouseover",mouseover)// mouseover is defined below.
            .on("mouseout",mouseout);// mouseout is defined below.
            
        //Create the frequency labels above the rectangles.
        bars.append("text").text(function(d){ return d3.format(",")(d[1])})
            .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
            .attr("y", function(d) { return y(d[1])-5; })
            .attr("text-anchor", "middle");
        
        function mouseover(d){  // utility function to be called on mouseover.
            // filter for selected state.
            var st = fData.filter(function(s){ return s.State === d[0];})[0],
                nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});
               
            // call update functions of pie-chart and legend.    
            pC.update(nD);
            leg.update(nD);
        }
        
        function mouseout(d){    // utility function to be called on mouseout.
            // reset the pie-chart and legend.    
            pC.update(tF);
            leg.update(tF);
        }
        
        // create function to update the bars. This will be used by pie-chart.
        hG.update = function (nD, color) {
            // update the domain of the y-axis map to reflect change in frequencies.
            y.domain([0, d3.max(nD, function (d) { return d[1]; })]);

            // Attach the new data to the bars.
            var bars = hGsvg.selectAll(".bar").data(nD);

            // transition the height and color of rectangles.
            bars.select("rect").transition().duration(500)
                .attr("y", function (d) { return y(d[1]); })
                .attr("height", function (d) { return hGDim.h - y(d[1]); })
                .attr("fill", color);

            // transition the frequency labels location and change value.
            bars.select("text").transition().duration(500)
                .text(function (d) { return d3.format(",")(d[1]) })
                .attr("y", function (d) { return y(d[1]) - 5; });
        };
        return hG;
    }
    
    // function to handle pieChart.
    function pieChart(pD){
        var pC ={},    pieDim ={w:250, h: 250};
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
                
        // create svg for pie chart.
        var piesvg = d3.select(id).append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
        
        // create function to draw the arcs of the pie slices.
        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
            .each(function(d) { this._current = d; })
            .style("fill", function(d) { return segColor(d.data.type); })
            .on("mouseover",mouseover).on("mouseout",mouseout);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function (nD) {
            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                .attrTween("d", arcTween);
        };
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d){
            // call the update function of histogram with new data.
            hG.update(fData.map(function(v){ 
                return [v.State,v.freq[d.data.type]];}),segColor(d.data.type));
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d){
            // call the update function of histogram with all data.
            hG.update(fData.map(function(v){
                return [v.State,v.total];}), barColor);
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return arc(i(t));    };
        }    
        return pC;
    }
    
    // function to handle legend.
    function legend(lD){
        var leg = {};
            
        // create table for legend.
        var legend = d3.select(id).append("table").attr('class','legend');
        
        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
            
        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
			.attr("fill",function(d){ return segColor(d.type); });
            
        // create the second column for each segment.
        tr.append("td").text(function(d){ return d.type;});

        // create the third column for each segment.
        tr.append("td").attr("class",'legendFreq')
            .text(function(d){ return d3.format(",")(d.freq);});

        // create the fourth column for each segment.
        tr.append("td").attr("class",'legendPerc')
            .text(function(d){ return getLegend(d,lD);});

        // Utility function to be used to update the legend.
        leg.update = function (nD) {
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(nD);

            // update the frequencies.
            l.select(".legendFreq").text(function (d) { return d3.format(",")(d.freq); });

            // update the percentage column.
            l.select(".legendPerc").text(function (d) { return getLegend(d, nD); });
        };
        
        function getLegend(d,aD){ // Utility function to compute percentage.
            return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
        }

        return leg;
    }
    
    // calculate total frequency by segment for all state.
    var tF = ['First', 'Second', 'Third'].map(function (d) {
        return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))}; 
    });    
    
    // calculate total frequency by state for all segment.
    var sF = fData.map(function(d){return [d.State,d.total];});

    var hG = histoGram(sF), // create the histogram.
        pC = pieChart(tF), // create the pie-chart.
        leg= legend(tF);  // create the legend.
}


var freqData=[
  { State: 'TN', freq: { First: 4098, Second: 2813, Third: 584 } }
, { State: 'AL', freq: { First: 2822, Second: 3214, Third: 972 } }
, { State: 'KY', freq: { First: 4832, Second: 1777, Third: 360 } }
, { State: 'LA', freq: { First: 5993, Second: 5990, Third: 2193 } }
, { State: 'VA', freq: { First: 7037, Second: 4494, Third: 1032 } }
, { State: 'SC', freq: { First: 1202, Second: 598, Third: 263 } }
, { State: 'NC', freq: { First: 1579, Second: 1719, Third: 636 } }
, { State: 'IN', freq: { First: 10852, Second: 4466, Third: 1838 } }
, { State: 'WV', freq: { First: 2225, Second: 1133, Third: 377 } }
, { State: 'GA', freq: { First: 2617, Second: 2984, Third: 848 } }
];

dashboard('#dashboard', freqData);

//////////////////Chloropleth Map Code Here//////////////////////



