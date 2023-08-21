function displayTemperature(response) {
  console.log(response.data.main);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = response.data.temperature;
}
let apiKey = "ae997t30869fc345038bf7f0abaao7e6";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Johannesburg&key=ae997t30869fc345038bf7f0abaao7e6&units=metric";
axios.get(apiUrl).then(displayTemperature);
