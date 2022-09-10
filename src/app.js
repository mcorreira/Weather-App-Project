let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  hours = ("0" + date.getHours()).slice(-2);
  let minutes = date.getMinutes();
  minutes = ("0" + date.getMinutes()).slice(-2);
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayCityWeather(response) {
  let cityElement = (document.querySelector("#city").innerHTML =
    response.data.name);
  let temperatureElement = (document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp));
  let descriptionElement = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let humidityElement = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);
  let windElement = (document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let dateElement = (document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  ));
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//function searchCity(city) {
let apiKey = "b7d0aaa9315b0b857b058fd4db6bdb09";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCityWeather);

//function handleSearch(event) {
//event.preventDefault();
//let city = document.querySelector("#enter-city").value;Mia
//searchCity(city);
//}

//function searchLocation(position) {
//let lat = position.coords.latitude;
//let lon = position.coords.longitude;
//let units = "metric";
//let apiKey = "210b7ede94aa064d56bd1cc04916b421";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
//axios.get(apiUrl).then(displayCityWeather);
//}

//function getCurrentLocation(event) {
//event.preventDefault();
//navigator.geolocation.getCurrentPosition(searchLocation);
//}

//let currentLocationButton = document.querySelector("#search-geo");
//currentLocationButton.addEventListener("click", getCurrentLocation);

//let dateElement = document.querySelector("#date-time");
//let currentTime = new Date();
//dateElement.innerHTML = formatDate(currentTime);

//let searchForm = document.querySelector("#search-form");
//searchForm.addEventListener("submit", handleSearch);

//searchCity("Tokyo");
