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

let localTime = document.querySelector("#local-time");
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
} else {
  localTime.innerHTML = `${currentHour}:${currentMinutes}`;
}

let localDate = document.querySelector(".current-day");
localDate.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}`;

function showCity(city) {
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showCity(city);
}
let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  console.log(response.data);
  let currentTemp = Math.round(response.data.main.temp);
  document.querySelector(
    "#current-temperature"
  ).innerHTML = `${currentTemp} °C`;
  let todaysMin = Math.round(response.data.main.temp_min);
  document.querySelector("#todays-min").innerHTML = `${todaysMin} °C / `;
  let todaysMax = Math.round(response.data.main.temp_max);
  document.querySelector("#todays-max").innerHTML = `${todaysMax} °C`;
  let todaysWind = Math.round(response.data.wind.speed);
  document.querySelector("#todays-wind").innerHTML = `${todaysWind} km/h`;
  document.querySelector("#weather-descpription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".current-city").innerHTML = response.data.name;
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

showCity("Hannover");
