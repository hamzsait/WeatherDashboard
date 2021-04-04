async function getWeatherAPI(city){

    cityLonLat = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=fb58f472da0b2a8c35d45500aeb1b7c1")
        .then(function(response){
            return response.json()
        })
        .then (function(data){
            return data
        })

    outer = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+cityLonLat.coord.lat+"&lon="+cityLonLat.coord.lon+"&appid=fb58f472da0b2a8c35d45500aeb1b7c1")
        .then(function(response){
            return response.json()
        })
        .then (function(data){
            return data
        })
    return outer
}


getWeatherAPI("Austin").then(function(data){
    console.log(data)
})

var submit = document.querySelector("#submit")

submit.textContent = "SEARCH"

submit.addEventListener(event, function(){
    event.preventDefault()

    console.log("hello")

    
})