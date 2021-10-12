let now = new Date();

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

let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let localTime = document.querySelector(".local-time");
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
} else {
  localTime.innerHTML = `${currentHour}:${currentMinutes}`;
}

let localDate = document.querySelector(".current-day");
localDate.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}`;

function showCity(event) {
  event.preventDefault();
  let displayedCity = document.querySelector(".current-city");
  let searchInput = document.querySelector("#city-input");
  if (searchInput.value) {
    displayedCity.innerHTML = `${searchInput.value}`;
  } else {
    displayedCity.innerHTML = `Please type a city name`;
  }
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-city-form");
form.addEventListener("submit", showCity);

function showTemperature(response) {
  console.log(response.data);
  let currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${currentTemp} °C`;
  let tempMin = document.querySelector("#todays-min");
  let todaysMin = Math.round(response.data.main.temp_min);
  tempMin.innerHTML = `${todaysMin} °C / `;
  let tempMax = document.querySelector("#todays-max");
  let todaysMax = Math.round(response.data.main.temp_max);
  tempMax.innerHTML = `${todaysMax} °C`;
  let windspeed = document.querySelector("#todays-wind");
  let todaysWind = Math.round(response.data.wind.speed);
  windspeed.innerHTML = `${todaysWind} km/h`;
  let weatherDescription = document.querySelector("#weather-descpription");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let displayCity = document.querySelector(".current-city");
  displayCity.innerHTML = response.data.name;
}

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentPosition = document.querySelector("#current-location");
currentPosition.addEventListener("click", getPosition);
