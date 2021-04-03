var submit = document.querySelector("#submit")

submit.textContent = "SEARCH"

submit.addEventListener(function(event){
    event.preventDefault()

    var requestUrl = 'https://api.github.com/orgs/nodejs/repos';

    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data)
        })
})