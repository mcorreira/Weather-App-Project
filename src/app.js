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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Wednesday", "Thursday", "Friday", "Saturday"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">
                ${day}
                </div>
               <img src="http://openweathermap.org/img/wn/10d@2x.png" width="25"/>
               
               <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max">
                  10°
                </span>
                <span class="weather-forecast-temp-min">
                  28°
                </span>
               </div>
             </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function displayCityWeather(response) {
  let cityElement = (document.querySelector("#city").innerHTML =
    response.data.name);
  let temperatureElement = (document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp));
  let descriptionElement = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let pressureElement = (document.querySelector("#pressure").innerHTML =
    Math.round(response.data.main.pressure) / 1000);
  let humidityElement = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);
  let windElement = (document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) * 3.6);
  let dateElement = (document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  ));
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "b7d0aaa9315b0b857b058fd4db6bdb09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#enter-city");
  searchCity(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * (9 / 5) + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b7d0aaa9315b0b857b058fd4db6bdb09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Berlin");
