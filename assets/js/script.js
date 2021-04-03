function getWeatherAPI(city){

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=fb58f472da0b2a8c35d45500aeb1b7c1")
        .then(function(response){
            return response.json()
        })
        .then (function(data){

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid=fb58f472da0b2a8c35d45500aeb1b7c1")
                .then(function(response){
                    return response.json()
                })
                .then (function(data){
                    console.log(data)
                })

        })

    

}

getWeatherAPI("Austin")

var submit = document.querySelector("#submit")

submit.textContent = "SEARCH"

submit.addEventListener(event, function(){
    event.preventDefault()

    console.log("hello")

    
})