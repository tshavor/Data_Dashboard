// Write your Javascript code.
function getTychoLevel1()
{
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/Home/GetTychoLevel1"  //calling the method to my C# method
        }).done(function (data) {
            resolve(data)
        }).error(function (e) {    //"e" is my error message.
            reject(e)
        })
    })
}

getTychoLevel1()
.then(function (ReturnedTychoLevel1data) {
    console.log(ReturnedTychoLevel1data);

})


