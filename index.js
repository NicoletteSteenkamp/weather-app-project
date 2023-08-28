let defaultCity = "Boksburg";

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

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

let temperatureElement = document.querySelector("#temperature");

function formatDate(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time);
}

function getWeatherByCity(city) {
  let apiKey = "ae997t30869fc345038bf7f0abaao7e6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then((response) => {
    displayTemperature(response);
  });
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = cityInput.value.trim();
  if (cityName.length > 0) {
    defaultCity = cityName;
    getWeatherByCity(defaultCity);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let temperatureElement = document.querySelector("#temperature");
  let unitsElement = document.querySelector("#units");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  let celsiusLink = document.querySelector("#celsius");

  fahrenheitLink.addEventListener("click", function () {
    let currentCelsius = parseFloat(temperatureElement.textContent);
    let currentFahrenheit = celsiusToFahrenheit(currentCelsius);
    temperatureElement.textContent = currentFahrenheit.toFixed(2);
    unitsElement.innerHTML = `&deg;F | <a href="#" id="celsius">℃</a>`;
  });

  celsiusLink.addEventListener("click", function () {
    let currentFahrenheit = parseFloat(temperatureElement.textContent);
    let currentCelsius = fahrenheitToCelsius(currentFahrenheit);
    temperatureElement.textContent = currentCelsius.toFixed(2);
    unitsElement.innerHTML = `&deg;C | <a href="#" id="fahrenheit-link">℉</a>`;
  });

  document.querySelector("#search-form").addEventListener("submit", search);
  function celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }

  getWeatherByCity(defaultCity);
});
