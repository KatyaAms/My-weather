let actualTime = document.querySelector(".currentTime");

// days
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
let now = new Date();
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

actualTime.innerHTML = `${hours}:${minutes} ${day1}, ${month1} ${date}`;

function search(city) {
  let apiKey = "cea4eaec36371a8d64cf80cfa988df3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&&appid=${apiKey}`).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  search(city);
}
function showTemperature(response) {
  document.querySelector(".city").innerHTML = response.data.name;

  let showTemperature = document.querySelector(".number");
  let temperature = Math.round(response.data.main.temp);

  let showWind = document.querySelector(".wind");
  let wind = response.data.wind.speed;

  let showHumidity = document.querySelector(".humidity");
  let humidity = response.data.main.humidity;

  console.log(response);

  let showClouds = document.querySelector(".clouds");
  let clouds = response.data.weather[0].main;

  showTemperature.innerHTML = `${temperature}`;
  showClouds.innerHTML = `${clouds}`;
  showHumidity.innerHTML = `Humidity: ${humidity}%`;
  showWind.innerHTML = `Wind: ${wind} km/h`;
}

let searchInput = document.querySelector("form");
searchInput.addEventListener("submit", handleSubmit);

function temperature(event) {
  event.preventDefault();
  let clickUnit = document.querySelector(".number");
  clickUnit.innerHTML = `2`;
}

let seeTemperature = document.querySelector(".celsius");
seeTemperature.addEventListener("click", temperature);

function temperature2(event) {
  event.preventDefault();
  let clickUnit = document.querySelector(".number");
  clickUnit.innerHTML = `35,6`;
}
let seeTemperature2 = document.querySelector(".fahrenheit");
seeTemperature2.addEventListener("click", temperature2);

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
}

search("Amsterdam");
