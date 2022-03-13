
const search = document.getElementById("searching-city")
const btn = document.getElementById("new-search")
const pastSearch = document.getElementById("list-group");
const apiKey = "64c7fbab3246c8d0d30ebeb325a62960"

var searches = [];

btn.addEventListener('click', function(event) {
    event.preventDefault();
    if(search.value){
        var theSearch = document.createElement('button');
        theSearch.classList.add('theSearch');
        theSearch.textContent = search.value;
        searches.push(search.value);
       pastSearch.appendChild(theSearch);

        console.log(searches);
        coord(search.value);
        log();
        
        console.log(theSearch.textContent);
        theSearch.addEventListener('click', function(event){
            event.preventDefault();
            search.value = theSearch.textContent ;
            console.log(search.value);
            
        })
        
    }   else if(search > 5 ) {
        pastSearch.removeChild(theSearch.children[0]);
    }
   
})
var log = function(){
    localStorage.setItem('searches', JSON.stringify(searches));
}

var init = function(){
    var logged = localStorage.getItem("searches");
    
    if(!logged) {
        return false;
    }
    
    logged = JSON.parse(logged);
    
    for (var i = 0; i < logged.length; ++i){
        const theSearch = document.createElement('button');
        theSearch.classList.add('theSearch');
        theSearch.innerText = logged[i];
        pastSearch.appendChild(theSearch);
        theSearch.addEventListener('click', function(event){
            event.preventDefault();
            search.value = theSearch.textContent ;
            
        })
        
    }
    
}
init();
console.log(typeof(search.value));

var coord = function(city){
    const startUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=';
    const limitApi = '&limit=1&appid=64c7fbab3246c8d0d30ebeb325a62960';
    fetch(startUrl + city + limitApi)
    .then(function(response) {
        response.json()
        .then(function(data){
            loc(data[0].lat, data[0].lon)
            day(data[0].lat, data[0].lon)
        })
    })
}
var loc = function(lat, lon){
    var startUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
    var latitude = 'lat=' + lat;
    var longitude = '&lon=' + lon;
    var params = '&exclude=minutely,hourly,alert&units=imperial&appid=64c7fbab3246c8d0d30ebeb325a62960';
    fetch(startUrl + latitude + longitude + params)
    .then(function(response){
        response.json()
        .then(function(data){
            console.log(data.current);
            present(data.current);
            presentDay(data.current.dt);
        })
    })
}




var presentDay = function(date){
    const today = document.querySelector(".date");
    var dateString = moment.unix(date).format("MM/DD/YYYY");
    presentDay.innerText = dateString;
}
var present = function(data){
    var currentCity = document.getElementById("current-city");
    currentCity.innerText = search.value;
    var weatherIcon = document.querySelector('.image');
    var weatherUrl = ' http://openweathermap.org/img/wn/';
    weatherIcon.src = weatherUrl+data.weather[0].icon+'@2x.png';
    var temp = document.getElementById("temp");
    temp.innerText = "Temperature -  " + data.temp + " F";
    var humid = document.getElementById("humid");
    humid.innerText = "Humidity -  " + data.humidity + "%";
    var wind = document.getElementById("wind");
    wind.innerText = "Wind -  " + data.wind_speed + " MPH";
    var UV = document.getElementById("uv");
    UV.innerText = "Uvi - " + data.uvi;
    UV.classList = "idx";
    search.value = '';  
}






var day = function(lat, lon) {
    var startUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
    var latitude = 'lat=' + lat;
    var longitude = '&lon=' + lon;
    var params = '&exclude=minutely,hourly,current,alert&units=imperial&appid=64c7fbab3246c8d0d30ebeb325a62960';
    fetch(startUrl + latitude + longitude + params)
    .then(function(response){
        response.json()
        .then(function(data){
            console.log(data.daily);
            fiveDay(data.daily);
        })
    })
}

var five = document.querySelector('.days');
var fiveDay = function(data) {
    five.innerHTML = " ";
    for (var i = 1; i < data.length - 2; ++i){
        
        console.log(data[i])
        
        var dayCard = document.createElement("div");
        dayCard.classList.add("card", "col-lg-2", "col-9");
        
        var myDay = document.createElement("h4");
        myDay.classList.add("forcastDate");
        var dayString = moment.unix(data[i].dt).format("MM/DD/YYYY");
        myDay.textContent = dayString;
        
        const temp = document.createElement('div');
        temp.classList.add("days-weather", "temp");
        temp.textContent = "Temp - " + data[i].temp.day + "F";
        const humidity = document.createElement('div');
        humidity.classList.add("days-weather", "humidity");
        humidity.textContent = "Humidity - " + data[i].humidity + "%";
        const wind = document.createElement('div');
        wind.classList.add("days-weather", 'wind');
        wind.textContent = "Wind - " + data[i].wind_speed + " MPH";
        const uvIn = document.createElement('div');
        uvIn.classList.add("days-weather", "uv");
        uvIn.textContent = "Uvi- " + data[i].uvi;
        
        dayCard.appendChild(myDay);
        dayCard.appendChild(temp);
        dayCard.appendChild(wind);
        dayCard.appendChild(humidity);
        dayCard.appendChild(uvIn)
        five.appendChild(dayCard);
    }
    
}
$("#uv").addClass(function () {
    return +UV <= 2 ? "green" : +UV <=5 ? "orange" : "red"
});