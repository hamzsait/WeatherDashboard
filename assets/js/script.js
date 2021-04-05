var getInput = document.querySelector("#input")
var submit = document.querySelector("#submit")
var title = document.querySelector("#cityTitle")
var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var uvi = document.querySelector("#uvi")
var pastResults = document.querySelector("#pastResults")
var warning = document.querySelector("#searchError")

try{
    items = localStorage.getItem("buttons").split(',')
    for (x = 0; x <items.length; x++){

        item = document.createElement("button")
        item.textContent = (items[x]).toUpperCase()
        item.setAttribute("id","preButton")
        pastResults.prepend(item)
    }
    saveLocal()
    
    getWeatherAPI(items[items.length-1]).then(function(data){

        if (data){

            document.getElementById("cityTitle").textContent = items[items.length-1].toUpperCase()
            document.getElementById("temp").textContent = (String(data.current.temp*(9/5)-459.67).slice(0,5) +"°F")
            document.getElementById("wind").textContent = (data.current.wind_speed + " MPH")
            document.getElementById("humidity").textContent = (data.current.humidity + "%")
            document.getElementById("uvi").textContent = (data.current.uvi + " UVI")

            removeContent()
            for (x = 0; x<5; x++){

                list = document.querySelector("#day"+(x+1)+"Content")
                headDate = document.createElement("li")
                headDate.style.fontSize = "20px"
                headDate.textContent = moment().day(x+1).format("MM/DD/YY")
                list.appendChild(headDate)

                temp = document.createElement("li")
                temp.textContent = (String(data.daily[x].temp.day*(9/5)-459.67).slice(0,5) +"°F")
                document.querySelector("#day"+(x+1)+"Content").appendChild(temp)

                wind = document.createElement("li")
                wind.textContent = data.daily[x].wind_speed
                document.querySelector("#day"+(x+1)+"Content").appendChild(wind)

                humidity = document.createElement("li")
                humidity.textContent = data.daily[x].humidity
                document.querySelector("#day"+(x+1)+"Content").appendChild(humidity)

                
            }
        }
    })
}
catch{
    console.log("Nothing in Local Storage")
}

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

                document.getElementById("cityTitle").textContent = getInput.value.toUpperCase()
                document.getElementById("temp").textContent = (String(data.current.temp*(9/5)-459.67).slice(0,5) +"°F")
                document.getElementById("wind").textContent = (data.current.wind_speed + " MPH")
                document.getElementById("humidity").textContent = (data.current.humidity + "%")
                document.getElementById("uvi").textContent = (data.current.uvi + " UVI")

                removeContent()
                for (x = 0; x<5; x++){

                    list = document.querySelector("#day"+(x+1)+"Content")
                    headDate = document.createElement("li")
                    headDate.classList.add("headDate")
                    headDate.textContent = moment().day(x+1).format("MM/DD/YY")
                    list.appendChild(headDate)

                    temp = document.createElement("li")
                    temp.textContent = (String(data.daily[x].temp.day*(9/5)-459.67).slice(0,5) +"°F")
                    document.querySelector("#day"+(x+1)+"Content").appendChild(temp)

                    wind = document.createElement("li")
                    wind.textContent = data.daily[x].wind_speed
                    document.querySelector("#day"+(x+1)+"Content").appendChild(wind)

                    humidity = document.createElement("li")
                    humidity.textContent = data.daily[x].humidity
                    document.querySelector("#day"+(x+1)+"Content").appendChild(humidity)

                    
                }

                for (x = 0; x < pastResults.children.length; x++){
                    if (pastResults.children[x].innerText == getInput.value.toUpperCase()){
                        return
                    }
                }
        
                item = document.createElement("button")
                item.textContent = (getInput.value).toUpperCase()
                item.setAttribute("id","preButton")
                pastResults.prepend(item)
                saveLocal()
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
    
    removeContent()
        for (x = 0; x<5; x++){

            list = document.querySelector("#day"+(x+1)+"Content")
            headDate = document.createElement("li")
            headDate.style.fontSize = "20px"
            headDate.textContent = moment().day(x+1).format("MM/DD/YY")
            list.appendChild(headDate)

            temp = document.createElement("li")
            temp.textContent = (String(data.daily[x].temp.day*(9/5)-459.67).slice(0,5) +"°F")
            document.querySelector("#day"+(x+1)+"Content").appendChild(temp)

            wind = document.createElement("li")
            wind.textContent = data.daily[x].wind_speed
            document.querySelector("#day"+(x+1)+"Content").appendChild(wind)

            humidity = document.createElement("li")
            humidity.textContent = data.daily[x].humidity
            document.querySelector("#day"+(x+1)+"Content").appendChild(humidity)
        }

        document.getElementById("cityTitle").textContent = city.toUpperCase()
        document.getElementById("temp").textContent = (String(data.current.temp*(9/5)-459.67).slice(0,5) +"°F")
        document.getElementById("wind").textContent = (data.current.wind_speed + " MPH")
        document.getElementById("humidity").textContent = (data.current.humidity + "%")
        document.getElementById("uvi").textContent = (data.current.uvi + " UVI")
    })
    saveLocal()
})

function removeContent(){
    for (x = 0; x<5; x++){
        $("#day"+(x+1)+"Content").empty()
    }
}

function saveLocal(){

    output = []

    buttons = document.getElementById("pastResults").children
    for(x = buttons.length-1; x>=0; x--){
        output.push(buttons[x].textContent)
    }

    localStorage.setItem("buttons",output)
}


