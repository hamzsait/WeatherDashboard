var getInput = document.querySelector("#input")
var submit = document.querySelector("#submit")
var title = document.querySelector("#cityTitle")
var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var uvi = document.querySelector("#uvi")
var pastResults = document.querySelector("#pastResults")
var warning = document.querySelector("#searchError")

async function getWeatherAPI(city){
    try{
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
    catch{
        return null
    }
}

submit.addEventListener("click",function(event){
    event.preventDefault()

    if (getInput){

        warning.textContent = ""

        getWeatherAPI(getInput.value).then(function(data){

            if (data){

                title.textContent = getInput.value.toUpperCase()
                temp.textContent = (String(data.current.temp*(9/5)-459.67).slice(0,5) +"°F")
                wind.textContent = (data.current.wind_speed + " MPH")
                humidity.textContent = (data.current.humidity + "%")
                uvi.textContent = (data.current.uvi + " UVI")

                for (x = 0; x < pastResults.children.length; x++){
                    if (pastResults.children[x].innerText == getInput.value.toUpperCase()){
                        return
                    }
                }
        
                item = document.createElement("button")
                item.textContent = (getInput.value).toUpperCase()
                item.setAttribute("id","preButton")
                pastResults.prepend(item)
            }
        })
    }

    else{
        warning.textContent = "Error, Try Again!"
    }
})

$("#pastResults").on("click", "button", function(){
    var city = this.innerText
    getWeatherAPI(city).then(function(data){
        title.textContent = city.toUpperCase()
        temp.textContent = (String(data.current.temp*(9/5)-459.67).slice(0,5) +"°F")
        wind.textContent = (data.current.wind_speed + " MPH")
        humidity.textContent = (data.current.humidity + "%")
        uvi.textContent = (data.current.uvi + " UVI")
    })
})

