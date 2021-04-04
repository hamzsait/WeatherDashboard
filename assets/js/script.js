var getInput = document.querySelector("#input")
var submit = document.querySelector("#submit")
var title = document.querySelector("#cityTitle")
var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var uvi = document.querySelector("#uvi")

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

submit.addEventListener("click",function(event){
    event.preventDefault()

    getWeatherAPI(getInput.value).then(function(data){
        title.textContent = getInput.value.toUpperCase()
        temp.textContent = (String(data.current.temp*(9/5)-459.67).slice(0,5) +"°F")
        wind.textContent = (data.current.wind_speed + " MPH")
        humidity.textContent = (data.current.humidity + "%")
        uvi.textContent = (data.current.uvi)
        console.log(data)
        
    })
})