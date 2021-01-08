function search(city) {
  let apiKey = "cea4eaec36371a8d64cf80cfa988df3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&&appid=${apiKey}`).then(showTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

//function for forecast time
function timeofForecast(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = null;

  //let timeZone = response.data.city.timezone;
  /*
  //I try to calculate F temp and include in forecast
  ForecastcelsiusTemperatureMax = forecast.main.temp_max;
  ForecastcelsiusTemperatureMin = forecast.main.temp_min;
  let forecastUnitMax = document.querySelector("#max");
  let fahrenheitTemperatureMax = (ForecastcelsiusTemperatureMax * 9) / 5 + 32;
  forecastUnitMax.innerHTML = Math.round(fahrenheitTemperatureMax);
*/
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    console.log(forecast);

    forecastElement.innerHTML += `
  <div class="col-2">
    <h6>${timeofForecast(forecast.dt * 1000)}
     </h6>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt="icon" class="icon"></img>
    <div class="weather-forecast">
      <strong id="max">${Math.round(
        forecast.main.temp_max
      )}°</strong> / ${Math.round(forecast.main.temp_min)}°
    </div>
  </div>
  `;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  search(city);
}
function showTemperature(response) {
  document.querySelector(".city").innerHTML = response.data.name;

  let showTemperature = document.querySelector(".number");
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);

  let showWind = document.querySelector(".wind");
  let wind = response.data.wind.speed;

  let showHumidity = document.querySelector(".humidity");
  let humidity = response.data.main.humidity;

  let showClouds = document.querySelector(".clouds");
  let clouds = response.data.weather[0].description;

  showTemperature.innerHTML = `${temperature}`;
  showClouds.innerHTML = `${clouds}`;
  showHumidity.innerHTML = `Humidity: ${humidity}%`;
  showWind.innerHTML = `Wind: ${wind} km/h`;

  //Formula for local time
  let timeZone = response.data.timezone;
  let localTime = document.querySelector(".currentTime");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let now = new Date(
    Date.now() +
      (`${timeZone}` - new Date().getTimezoneOffset() * -1 * 60) * 1000
  );
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month1 = months[now.getMonth()];
  let day1 = days[now.getDay()];
  let date = now.getDate();

  localTime.innerHTML = `${hours}:${minutes} ${day1}, ${date} ${month1} `;

  let urls = {
    "01d": "images/01d.gif",
    "01n": "images/01n.gif",
    "02d": "images/02d.jpg",
    "02n": "images/02n.gif",
    "03d": "images/03d.gif",
    "03n": "images/03n.gif",
    "04d": "images/04d.gif",
    "04n": "images/04n.gif",
    "09d": "images/09d.gif",
    "09n": "images/09n.gif",
    "10d": "images/10d.gif",
    "10n": "images/10n.gif",
    "11d": "images/11d.gif",
    "11n": "images/11n.gif",
    "13d": "images/13d.gif",
    "13n": "images/13n.gif",
    "50d": "images/50d.gif",
    "50n": "images/50n.gif",
  };

  let background = urls[response.data.weather[0].icon];
  document.getElementById(
    "weatherApp"
  ).style.backgroundImage = `url('${background}')`;
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", myLocation);

function myLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myPosition);
}
function myPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "cea4eaec36371a8d64cf80cfa988df3d";
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${geoUrl}&&appid=&{apiKey}`).then(showTemperature);
  //solution for a forecast in current location
  apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiForecastUrl).then(displayForecast);
}

function temperature(event) {
  event.preventDefault();
  seeTemperature.classList.add("active");
  seeTemperature2.classList.remove("active");
  let clickUnit = document.querySelector(".number");
  clickUnit.innerHTML = Math.round(celsiusTemperature);
}

function temperature2(event) {
  event.preventDefault();
  seeTemperature2.classList.add("active");
  seeTemperature.classList.remove("active");
  let clickUnit = document.querySelector(".number");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  clickUnit.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let searchInput = document.querySelector("form");
searchInput.addEventListener("submit", handleSubmit);

let seeTemperature2 = document.querySelector("#fahrenheit");
seeTemperature2.addEventListener("click", temperature2);

let seeTemperature = document.querySelector("#celsius");
seeTemperature.addEventListener("click", temperature);

search("London");
