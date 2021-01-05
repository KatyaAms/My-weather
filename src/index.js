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
  console.log(response);
  document.querySelector(".city").innerHTML = response.data.name;

  let showTemperature = document.querySelector(".number");
  let temperature = Math.round(response.data.main.temp);

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

  // iconElement.setAttribute(   "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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
    "01d": `https://gfycat.com/perfectmemorablealaskanhusky`,
    "01n": `https://qph.fs.quoracdn.net/main-qimg-f7807eda4d877f7da8e616636e04d273`,
    "02d": `https://gfycat.com/acrobaticresponsibleasianelephant`,
    "02n": `https://windowscustomization.com/2018/12/02/black-a-night-sky-4k/`,
    "03d": `https://i.gifer.com/hC1.gif`,
    "03n": `https://images.squarespace-cdn.com/content/v1/52e1aa3fe4b05f4de5ac831f/1553753096230-4005AD15ILZF4H0KV7MO/ke17ZwdGBToddI8pDm48kDBT_XcJ-mJ7qRE6Ci7Fa1JZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVEzUcJ5LR_qoMDyiSqbrzF4SWrILhrGJBQV6_jucxeimSb8BodarTVrzIWCp72ioWw/tenor.gif?format=500w`,
    "04d": `https://i.imgur.com/xlx95Wg.gif`,
    "04n": `https://i.gifer.com/1ezS.gif`,
    "09d": `https://thumbs.gfycat.com/CompleteWideeyedFirecrest-mobile.mp4`,
    "09n": `https://i.pinimg.com/originals/cc/f2/d3/ccf2d3afe3b30a7d317037f2a87b4e4a.gif`,
    "10d": `https://i.pinimg.com/originals/34/97/4e/34974e9d7f1585429c235b17379be7fe.gif`,
    "10n": `https://i.pinimg.com/originals/3b/c5/78/3bc57817a5901f3598795a29a7ca0845.gif`,
    "11d": `https://31.media.tumblr.com/6970e70662adaa802666c22454b3cedc/tumblr_mzi9h6iOQ71r4zr2vo1_r1_500.gif`,
    "11n": `https://thumbs.gfycat.com/ClearWelllitEmu-max-1mb.gif`,
    "13d": `https://media1.tenor.com/images/f490706632dbe4a6385c4f7d549ae2d3/tenor.gif?itemid=13000113`,
    "13n": `https://i.pinimg.com/originals/1d/92/5c/1d925c2d326f57d76837877d9b8f2356.gif`,
    "50d": `https://i.gifer.com/1PSm.gif`,
    "50n": `https://thumbs.gfycat.com/DeliciousUnfortunateCockroach-small.gif`,
  };

  let background = urls[response.data.weather[0].icon];
  document.getElementById(
    "weatherApp"
  ).style.backgroundImage = `url(${background})`;
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

search("London");
