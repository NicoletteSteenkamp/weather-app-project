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
}
let apiKey = "ae997t30869fc345038bf7f0abaao7e6";

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=ae997t30869fc345038bf7f0abaao7e6&units=metric;`;
axios.get(apiUrl).then(displayTemperature);

function weatherIcon(response) {
  let mainImg = document.querySelector("#mainImg");
  if (response.data.weather[0].main === "Clear") {
    mainImg.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/092/531/original/sun_icon.png?1691437170`
    );
  } else if (response.data.weather[0].main === "Clouds") {
    mainImg.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/092/620/original/cloud_icon_Small.png?1691525951`
    );
  } else if (response.data.weather[0].main === "Thunderstorm") {
    mainImg.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/092/624/original/rain_icon.png?1691526296`
    );
  } else if (response.data.weather[0].main === "Drizzle") {
    mainImg.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/092/629/original/drizzle_icon.png?1691526943`
    );
  } else if (response.data.weather[0].main === "Rain") {
    mainImg.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/092/630/original/rain_icon_Small.png?1691527033`
    );
  } else if (response.data.weather[0].main === "Snow") {
    mainImg.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/092/631/original/snow_icon.png?1691527300`
    );
  } else {
    mainImg.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/092/634/original/mist_icon_Small.png?1691527443`
    );
  }
}

function timeUpdate() {
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
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
}
