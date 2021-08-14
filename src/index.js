//Feature1
let today = new Date();

let pDayTimeToday = document.querySelector(".dateTimeToday");

let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = today.getUTCMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = today.getDate();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayToday = days[today.getDay()];

pDayTimeToday.innerHTML = `${dayToday} ${date}, ${hours}:${minutes}`;

//Feature2

function showCitySelected(event) {
  event.preventDefault();
  let h2City = document.querySelector("h2");
  let citySelected = document.querySelector("#inputCity");
  h2City.innerHTML = citySelected.value;
  showLiveCity(citySelected.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCitySelected);

function showTemperatureCitySelected(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let temperatureCitySelected = document.querySelector(".degrees");
  temperatureCitySelected.innerHTML = `${temperature}°C`;
}

function showLiveCity(citySelected) {
  let apiKey = "15311e86ae668422281f7a4353f9243b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySelected}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperatureCitySelected);
}

//Bonus feature
function showCurrentPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "15311e86ae668422281f7a4353f9243b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperatureCitySelected2);
}

function showTemperatureCitySelected2(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureCitySelected = document.querySelector(".degrees");
  temperatureCitySelected.innerHTML = `${temperature}°C`;
  let myCity = response.data.name;
  let h2City = document.querySelector("h2");
  h2City.innerHTML = myCity;
}

function getMyCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let buttonMyPosition = document.querySelector(".currentPosition");
buttonMyPosition.addEventListener("click", getMyCurrentPosition);
