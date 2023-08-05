let apiKey = "ae997t30869fc345038bf7f0abaao7e6";

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

  let currentDayElement = document.getElementById("city");
  currentDayElement.textContent = currentDay;
}

function updateTime() {
  let currentTime = new Date();
  let formattedTime = currentTime.toLocaleTimeString([], {
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
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  getWeatherData(apiUrl);
}

function getWeatherByCoordinates(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  getWeatherData(apiUrl);
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getWeatherByCoordinates(latitude, longitude);
    });
  } else {
    alert("Geolocation is not available on this device.");
  }
}

function searchCity(event) {
  event.preventDefault();
  const input = document.getElementById("city-input");
  getWeatherByCity(input.value);
}

document.addEventListener("DOMContentLoaded", function () {
  updateDay();
  updateTime();

  const citySearchForm = document.getElementById("search-form");
  citySearchForm.addEventListener("submit", searchCity);

  getCurrentLocationWeather();
});
