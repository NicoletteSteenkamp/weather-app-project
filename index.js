function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = response.data.temperature.current;
}
let apiKey = "ae997t30869fc345038bf7f0abaao7e6";
let city = "Boksburg";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=ae997t30869fc345038bf7f0abaao7e6&units=metric;`;
axios.get(apiUrl).then(displayTemperature);

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
