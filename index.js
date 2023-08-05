let apiKey = "ae997t30869fc345038bf7f0abaao7e6";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Johannesburg&key=ae997t30869fc345038bf7f0abaao7e6&units=metric";

function updateDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentTime = new Date();
  let currentDayIndex = currentTime.getDay();
  let currentDay = days[currentDayIndex];

  let currentDayElement = document.getElementById("currentDay");
  currentDayElement.textContent = currentDay;
}

function updateTime() {
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let currentTimeElement = document.getElementById("currentTime");
  currentTimeElement.textContent = formattedTime;
}

function showWeatherData(response) {
  let cityNameElement = document.getElementById("city");
  cityNameElement.textContent = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  let weatherIconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.weather[0].icon}.png`;
  let weatherIconElement = document.getElementById("weather-icon");
  weatherIconElement.src = weatherIconUrl;

  let temperatureElements = document.querySelectorAll(".currentTemperature");
  for (let i = 0; i < temperatureElements.length; i++) {
    temperatureElements[i].textContent = `${temperature}°C`;
  }

  let precipitationElement = document.getElementById("condition");
  precipitationElement.textContent = weatherDescription;

  let windSpeed = response.data.wind.speed;
  let windElement = document.getElementById("wind");
  windElement.textContent = `Wind: ${windSpeed} km/h`;
}

function getWeatherData(url) {
  axios
    .get(url)
    .then((response) => {
      showWeatherData(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

function getWeatherByCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  getWeatherData(apiUrl);
}

function getWeatherByCoordinates(latitude, longitude) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  getWeatherData(apiUrl);
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getWeatherByCoordinates(latitude, longitude);
    });
  } else {
    alert("Geolocation is not available on this device.");
  }
}

function searchCity(event) {
  event.preventDefault();
  let input = document.getElementById("city-input");

  if (searchedCity) {
    defaultCity = searchedCity;
    document.getElementById("city").textContent = defaultCity;
    getWeatherByCity(defaultCity);
  }
}
function searchCity(event) {
  event.preventDefault();
  let search = input.value.trim();
  let input = document.querySelector("#search-text-input");
  getWeatherByCity(input.value);
}

document.addEventListener("DOMContentLoaded", function () {
  updateDay();
  updateTime();

  let citySearchForm = document.getElementById("citySearchForm");
  citySearchForm.addEventListener("submit", searchCity);

  getWeatherByCity("Johannesburg");
});
