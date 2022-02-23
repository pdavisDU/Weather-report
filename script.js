let weatherApi = "64c7fbab3246c8d0d30ebeb325a62960"

let city = "http://api.openweathermap.org/geo/1.0/direct?q=" + {city name} + {state code} + {country code} + "&limit=" + {limit} + "&appid=" + {API key}";

//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

let weather = fetch(api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={weatherApi});


// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}