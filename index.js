let defaultCity = "Boksburg";
let celsiusTemperature = null;

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
  celsiusTemperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
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
  getForecast(response.data.coordinates);
}

function getForecast(coordinates) {
  let apiKey = "ae997t30869fc345038bf7f0abaao7e6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function getWeatherByCity(city) {
  let apiKey = "ae997t30869fc345038bf7f0abaao7e6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then((response) => {
    displayTemperature(response);
  });
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".WeatherForecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let dayName = getDayName(index);
      forecastHTML += `
        <div class="col-2 WeatherForecastPreview" id="forecast-day-${index}">
          <div class="forecast-time">${dayName}</div>
          <img class="tempImg" src="${
            forecastDay.condition.icon_url
          }" alt="" width="40">
          <div class="forecast-temperature">
            <span class="forecast-temperature-max">${Math.round(
              forecastDay.temperature.maximum
            )}°</span> |
            <span class="forecast-temperature-min">${Math.round(
              forecastDay.temperature.minimum
            )}°</span>
          </div>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getDayName(index) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let todayIndex = new Date().getDay();
  let targetIndex = (todayIndex + index) % 7;
  return days[targetIndex];
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = cityInput.value.trim();
  if (cityName.length > 0) {
    defaultCity = cityName;
    getWeatherByCity(defaultCity);
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

getWeatherByCity(defaultCity);
