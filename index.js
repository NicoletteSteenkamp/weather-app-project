let apiKey = "ae997t30869fc345038bf7f0abaao7e6";
let formattedTime;

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

  let currentDayElements = document.querySelectorAll(".currentDay");
  for (let i = 0; i < currentDayElements.length; i++) {
    currentDayElements[i].textContent = currentDay;
  }
}

function updateTime() {
  let currentTime = new Date();
  let formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let currentTimeElements = document.querySelectorAll(".currentTime");
  for (let i = 0; i < currentTimeElements.length; i++) {
    currentTimeElements[i].textContent = formattedTime;
  }
}

function showTemperature(response) {
  let cityNameElement = document.getElementById("headerCityName");
  cityNameElement.textContent = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let precipitation = response.data.weather[0].description;

  let weatherIconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png`;
  let weatherIconElement = document.getElementById("weatherIcon");
  weatherIconElement.src = weatherIconUrl;

  let temperatureElements = document.querySelectorAll(
    ".currentTemperature span"
  );
  for (let i = 0; i < temperatureElements.length; i++) {
    temperatureElements[i].textContent = `${temperature}°C`;
  }

  let precipitationElement = document.querySelector("[data-current-precip]");
  precipitationElement.textContent = precipitation;

  let windSpeed = response.data.wind.speed;
  let windElement = document.querySelector("[data-current-wind]");
  windElement.textContent = `${windSpeed} kph`;

  let highTemperature = Math.round(response.data.main.temp_max);
  let highTemperatureElement = document.querySelector("[data-current-high]");
  highTemperatureElement.textContent = `${highTemperature}°`;

  let lowTemperature = Math.round(response.data.main.temp_min);
  let lowTemperatureElement = document.querySelector("[data-current-low]");
  lowTemperatureElement.textContent = `${lowTemperature}°`;
}

function getWeatherByCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query={query}&key={key}`;

  axios
    .get(apiUrl)
    .then((response) => {
      showTemperature(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

function getWeatherByCoordinates(latitude, longitude) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon={lon}&lat={lat}&key={key}`;

  axios
    .get(apiUrl)
    .then((response) => {
      showTemperature(response);
    })
    .catch((error) => {
      console.error(error);
    });
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
  let input = document.querySelector("#search-text-input");
  getWeatherByCity(input.value);
}

window.onload = function () {
  updateDay();
  updateTime();
  setInterval(updateDay, 60000);

  let citySearchForm = document.getElementById("citySearchForm");
  citySearchForm.addEventListener("submit", searchCity);

  getWeatherByCity("Johannesburg");
};
