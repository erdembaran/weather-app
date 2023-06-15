const container = document.querySelector(".container");
const locationInput = document.querySelector("#locationInput");
const search = document.querySelector(".btn");
const weather = document.querySelector(".weather");
const weatherInfo = document.querySelector(".weather-info");
const error = document.querySelector(".error");
const containerFront = document.querySelector(".containerFront");
const startBtn = document.querySelector(".getStarted");

startBtn.addEventListener("click", searchLocation);
search.addEventListener("click", getWeather);

function searchLocation() {
  containerFront.style.display = "none";
  container.style.display = "block";
}

locationInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeather();
    event.preventDefault();
  }
});

function getWeather() {
  APIKey = "YOUR_KEY";
  const city = document.querySelector("#locationInput").value;

  if (city === "") {
    return;
  }

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},uk&APPID=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "480px";
        weather.style.display = "none";
        weatherInfo.style.display = "none";
        error.style.display = "block";
        return;
      }

      error.style.display = "none";

      const wind = document.querySelector(".weather-info .wind span");
      const temperature = document.querySelector(".weather .temperature");
      const description = document.querySelector(".weather .description");
      const image = document.querySelector(".weather img");
      const humidity = document.querySelector(".weather-info .humidity span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "image/clear.png";
          break;

        case "Clouds":
          image.src = "image/cloud.png";
          break;

        case "Haze":
          image.src = "image/mist.png";
          break;

        case "Rain":
          image.src = "image/rain.png";
          break;

        case "Snow":
          image.src = "image/snow.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${
        parseInt(json.main.temp) - 273
      }<span>°C</span>`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
      humidity.innerHTML = `${json.main.humidity}%`;
      description.innerHTML = `${json.weather[0].description}`;

      weather.style.display = "";
      weatherInfo.style.display = "";
      container.style.height = "520px";
    });
}
