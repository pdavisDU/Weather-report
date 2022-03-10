


// var form = document.querySelector(".container-fluid form");

// var citySearch = JSON.parse(localStorage.getItem("cities")) || [];
// var search = document.querySelector("#new-search");
// var userInput = document.querySelector("#searching-city");
// var current = document.querySelector("#current-city");
// var five = document.getElementById("5-day");
// var searchHistory = document.getElementById("search-history");
// var city ;
// var future = document.getElementById("5daytop");
// var days = document.getElementById("days");
// var weather = document.querySelector("#weather-effects")
// var searchIdx ;
// var searchArray ;



// search.addEventListener("click", function() {
//     localStorage.setItem("city", userInput.value);
//     console.log(userInput);
//     city = userInput.value;
//     saveInput(city);
// });

// var store = JSON.parse(localStorage.getItem("cities"));
// console.log(store)
// if (store) {
//     searchArray = [...store];
//     searchIdx = searchArray.length;
// } else {
//     searchArray = [];
//     searchIdx = 0;
// }
// for (let i=0; i < searchArray.length; i++) {
//     var searches = document.getElementById("list-group");
//     var searchList = document.createElement("li");
//     searchList.setAttribute("class", "past");
//     searchList.textContent = `${searchArray[i]}`
//     searches.append(searchList);
//     searchHistory.appendChild(searches);
// }

// var pastSearch = document.querySelectorAll(".past");
//  for(let i=0; i < pastSearch.length; i++) {
//      console.log(pastSearch[i]);
//      pastSearch[i].addEventListener("click", function(event) {
//          var boxInput = event.target.textContent;
//          city = boxInput;
//          console.log(city);
//          weather.innerHTML = ``;
//          future.innerHTML = ``;
//          weather.append(current);
//          future.append(five);
//          future.append(days)
//          fiveCall();
//      })
//  };

//  function saveInput(city)
//  {
//      searchArray.push(city);
//      localStorage.setItem('names', JSON.stringify(searchArray));//
var currentCity = document.getElementById("current-city");
var temp = document.getElementById("temp");
var humid = document.getElementById("humid");
var wind = document.getElementById("wind");
var uvi = document.getElementById("uv");
var days = document.getElementById("days");
     

const search = document.getElementById('searching-city');
const btn = document.getElementById('new-search');
const pastSearch = document.getElementById('list-group');
const cityUrl =  "https://api.openweathermap.org/geo/1.0/direct?q=";
const apiKey = '64c7fbab3246c8d0d30ebeb325a62960'

var imperial = '&exclude=minutely,hourly,alert&units=imperial&appid=64c7fbab3246c8d0d30ebeb325a62960';
var limitApi = '&limit=1&appid=64c7fbab3246c8d0d30ebeb325a62960';
var searches = [];

btn.addEventListener('click', function() {
    if(search.value){
        var city = document.createElement('button');
        city.classList.add('city');
        city.textContent = search.value;
        searches.push(search.value);
        pastSearch.appendChild(city);
        console.log(searches);
        coord(search.value);
       // memory();

        console.log(city.textContent);
        city.addEventListener('click', function(e) {
            e.preventDefault();
            search.value = city.textContent;
            console.log(search.value);
        })
    }
})

var input = function (){
    var last = localStorage.getItem("searches");
    if(!last) {
        return false;
    }
    last = JSON.parse(last);
    for (var i = 0; i < last.length; ++i) {
        var city = document.createElement('button');
        city.classList.add(city);
        city.innerText = last[i];
        pastSearch.appendChild(city);
        city.addEventListener('click', function(event) {
            event.preventDefault();
            search.value = city.textContent;
        })
    }
}
input();
console.log(typeof(search.value));

console.log(typeof(search.value));
var coord = function(thisCity) {
    fetch(cityUrl + thisCity + apiKey)
    .then(function(response) {
        response.json()
        .then(function(data) {
            current(data[0].lat, data[0].lon)
            day(data[0].lat, data[0].lon)
        })
    })
}

var current = function(lat, lon) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
    var latitude = 'lat=' + lat;
    var longitude = '&lon=' + lon;
    fetch(apiUrl + latitude + longitude + imperial)
    .then(function(response) {
        response.json()
        .then(function(data) {
            console.log(data.current);
            presentData(data.current);
            date(data.current.dt);
            console.log(current);
        })
    })
};

var presentData = function(data) {
    currentCity.innerText = search.value;
    temp.innerText = "Temperature - " + data.temp + " F";
    humid.innerText = "Humidity - " + data.humid + "%";
    wind.innerText = "Wind - " + data.wind + " mph";
    uvi.innerText = "UVI - " + data.uvi;
    search.value = "";
}

var day = function(lat, lon) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
    var latitude = 'lat=' + lat;
    var longitude = '&lon=' + lon;
    fetch(apiUrl + latitude + longitude + imperial)
    .then(function(response) {
        response.json()
        .then(function(data) {
            console.log(data.five);
            fiveCall(data.five);
        })
    }); console.log(day)
}

var fiveCall = function(data) {
    days.innerHTML = " ";
    for (var i = 1; i < data.length - 2; ++i) {
        console.log(data[i])

        var card = $('<div/>');
        card.classList.add("card", "col-lg-2", "col-9");

        var dayCall = $('<h3/>');
        dayCall.classList.add('weekDay');

        var mmnt = moment.unix(data[i].dt).format("MM/DD/YYYY");
        dayCall.textContent = mmnt;

        const tempCard = $('<div/>');
        tempCard.classList.add("weather", "temp");
        tempCard.textContent = "Temperature - " + data[i].temp.day + "F";
        const humidCard = $('<div/>');
        humidCard.classList.add("weather", "humid");
        humidCard.textContent = "Humidity - " + data[i].humid + "%";
        const windCard = $('<div/>');
        windCard.classList.add("weather", "wind");
        windCard.textContent = "Wind - " + data[i].wind + " mph";

        card.appendChild(dayCall);
        card.appendChild(tempCard);
        card.appendChild(humidCard);
        card.appendChild(windCard);
    }
}