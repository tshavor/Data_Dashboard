//AJAX call info here...
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
            resolve(data)
        }).error(function (e) {    //"e" is my error message.
            reject(e)
        })
    })
}

function filteredTychoLevel2death(y, d, s) {   //year, disease, state shorthand
    //console.log(y + d + s);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/Home/GetTychoLevel2ChartDataDeath",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                year: y,
                disease: d,
                state: s
            })

        }).done(function (data) {
            resolve(data)
        }).error(function (e) {    //"e" is my error message.
            reject(e)
        })
    })
}

function filteredTychoLevel1(y, d, s) {   //year, disease, state shorthand
    //console.log(y + d + s);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/Home/GetTychoLevel1ChartData",     
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                year: y,
                disease: d,
                state: s
            })

        }).done(function (data) {
            resolve(data)
        }).error(function (e) {    //"e" is my error message.
            reject(e)
        })
    })
}

//click event actions here..//////////////////////////////////////////////////////////////////////.

  $(".submitButton1").on("click", function () {
      var year = $(".selectedYear1").val()
      var disease = $(".selectedDisease1").val()
      var state = $(".selectedState1").val()
      filteredTychoLevel2(year, disease, state)
          .then(function (returndata) {
              console.log(returndata)


        })  
      })

  $(".submitButton2").on("click", function () {
      var year = $(".selectedYear2").val()
      var disease = $(".selectedDisease2").val()
      var state = $(".selectedState2").val()
      filteredTychoLevel2death(year, disease, state)
          .then(function (returndata) {
              console.log(returndata)

          })
        })  

  $(".submitButton3").on("click", function () {
      var year = $(".selectedYear3").val()
      var disease = $(".selectedDisease3").val()
      var state = $(".selectedState3").val()
      filteredTychoLevel1(year, disease, state)
          .then(function (returndata) {
              console.log(returndata)

          })
  })

/////////////////////////D3 GRAPHICS CODE FOLLOWS://////////////////////////////

//GRAPH #1//////// Create a function here that runs on click event of SubmitButton1///

  //function createGraph1 (){



      var margin = { top: 40, right: 20, bottom: 30, left: 40 },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      //var formatPercent = d3.format(".0%");

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
      //.tickFormat(formatPercent);

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
        })

      var svg = d3.select("graph1").append("svg")  //replaced body with "graph1"//
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.call(tip);

      //var url= put url for data here!
      //d3.json("url", type, function (error, data) {
          x.domain(data.map(function (d) { return d.week; }));  //replaced letter with week//
          y.domain([0, d3.max(data, function (d) { return d.numberperweek; })]);  //replaced frequency with numberperweek//

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Number per Week"); //replaced frequency with "Number per Week"//

          svg.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function (d) { return x(d.week); })  //replaced letter with week//
              .attr("width", x.rangeBand())
              .attr("y", function (d) { return y(d.numberperweek); }) //replaced frequency with numberperweek//
              .attr("height", function (d) { return height - y(d.numberperweek); })  //replaced frequency with numberperweek//
                  .on('mouseover', tip.show
                  .on('mouseout', tip.hide)

              );

          function type(d) {
              d.numberperweek = +d.numberperweek;  //replaced frequency with numberperweek//
              return d;
          }[]
      