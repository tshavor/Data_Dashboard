function filteredTychoLevel2(y,d,s) {   //year, disease, state shorthand
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

//bootstrap button experiment to display selected choice- NOT WORKING!/////////////////////////it 
//$(".btn btn-info dropdown-toggle").click(function () {
//    $(this).parents(".btn-group").find('.btn').html($(this).text() + ' <span class="caret"></span>');
//    $(this).parents(".btn-group").find('.btn').val($(this).data('value'));
//});




  $(".submitButton1").on("click", function () {
      var year = $(".selectedYear1").val()
      var disease = $(".selectedDisease1").val()
      var state = $(".selectedState1").val()
      //console.log(year);
      //console.log(disease);
      //console.log(state);
      filteredTychoLevel2(year, disease, state)
          .then(function (returndata) {
              console.log(returndata)


          })  



})

  $(".submitButton2").on("click", function () {
      var year = $(".selectedYear2").val()
      var disease = $(".selectedDisease2").val()
      var state = $(".selectedState2").val()
      //console.log(year);
      //console.log(disease);
      //console.log(state);

  })

  $(".submitButton3").on("click", function () {
      var year = $(".selectedYear3").val()
      var disease = $(".selectedDisease3").val()
      var state = $(".selectedState3").val()
      //console.log(year);
      //console.log(disease);
      //console.log(state);

  })