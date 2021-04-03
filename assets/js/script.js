 

function getWeatherAPI(){

    fetch("api.openweathermap.org/data/2.5/weather?q=austin&appid=fb58f472da0b2a8c35d45500aeb1b7c1")
        .then(response => response.json())
        .then(data => {console.log(data)})
}

getWeatherAPI()

var submit = document.querySelector("#submit")

submit.textContent = "SEARCH"

submit.addEventListener(event, function(){
    event.preventDefault()

    console.log("hello")

    
})