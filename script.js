document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "99b61561146348a7239400a39caa259e"; //env variables

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    //server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&unts=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City not found ");
    }
    const data = await response.json();
    return data;
  }
  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
   const temperatureinCelsius = main.temp - 273.15; 
    temperatureDisplay.textContent = `Temperature : ${temperatureinCelsius.toFixed(2)}°C`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    // unlocking display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
  function showError() {
    wetherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
