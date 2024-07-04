// Store key in variable

const apiKey = "fa02be04f10180fa619c5d316e0baf31"

//Get main HTML elements

var userSearch = document.getElementById("user-search");

var searchBtn = document.getElementById("search-btn");

var cityList = document.getElementById("city-list");

 var cityName = document.getElementById("city-name");

 // Create function to get coordinates for city

 function getCoordinates(city) {
    var queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(queryUrl)
    .then(response =>{
        return response.json();
    })
    .then( data => {
        // console.log(data);
        // console.log(data.city.coord.lat)
        var latitude = data.city.coord.lat;
        var longitude = data.city.coord.lon;
        console.log(latitude, longitude)
        getWeather(latitude, longitude)
    })
    .catch( error => {
        console.error("Error fetching data:", error);
    });
 }

 //Create function to get weather based on long and lat

 function getWeather(latitude, longitude) {
    var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=english&units=metric&appid=${apiKey}`;
 
    fetch(forecastUrl)
        .then(response => {
            return response.json();
        })
        .then( data => {
            console.log(data);
            console.log(data.list[0]);
            pushWeather(data)
        })
        .catch( error => {
            console.error("Error fetching data:", error);
        });
}

//Create function to push data to html for user visibility

//Create index of numbers to plug in and pull certain values from array

var index = [0, 6, 14, 22, 30, 38];

//Define temp, wind and humid

var temp = [6];
var wind = [6];
var humid = [6];

// Reference HTML elems to append data from API

var tempElem = document.getElementById("temp");
var windElem = document.getElementById("wind");
var humidElem = document.getElementById("humidity");
var cityElem = document.getElementById("city-name");

function pushWeather(data) {
    console.log(data)
    var city = data.city.name;
    cityElem.textContent = city;

    for( i=0; i<6; i++) {
        temp[i] = data.list[index[i]].main.temp;
        wind[i] = data.list[index[i]].wind.speed;
        humid[i] = data.list[index[i]].main.humidity;
    }

    for( a=0; a<6; a++) {
        tempElem.textContent = "Temp: " + temp[a] + " ºF";
        windElem.textContent = "Wind: " + wind[a] + " MPH";
        humidElem.textContent = "Humidity: " + humid[a] + " %";
    }
}

 //Create event listener for search button

 searchBtn.addEventListener("click", function(){
    var userInput = userSearch.value;
    getCoordinates(userInput);
    // getWeather();
    console.log("Event listener works mfer")
 })