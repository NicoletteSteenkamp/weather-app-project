let apiKey = "ae997t30869fc345038bf7f0abaao7e6";
let defaultCity = "Johannesburg";

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
  let searchedCity = input.value.trim();
  if (searchedCity) {
    defaultCity = searchedCity;
    getWeatherByCity(defaultCity);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateDay();
  updateTime();

  let cityElement = document.getElementById("city");
  cityElement.textContent = defaultCity;

  let citySearchForm = document.getElementById("search-form");
  citySearchForm.addEventListener("submit", searchCity);

  getWeatherByCity(defaultCity);
});
