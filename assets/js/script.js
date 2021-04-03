import csv from './jquery.csv.js';

data = ($(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "worldcities.csv",
        dataType: "csv",
     });
})).toObjects(csv);

console.log(data)

var submit = document.querySelector("#submit")

submit.textContent = "SEARCH"

submit.addEventListener(function(event){
    event.preventDefault()

    console.log("hello")

    
})