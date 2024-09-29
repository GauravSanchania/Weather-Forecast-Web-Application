const citySearchInput = document.getElementById('city-search');
const searchButton = document.getElementById('search-button');
const apiKey = 'd6d8982cca5247a882a132815242909'; // Weather API key
const weatherDisplay = document.getElementById('weather-display');

searchButton.addEventListener("click", () => {
  const cityName = citySearchInput.value;
  if (cityName) {
    fetchWeatherData(cityName);
  } else {
    alert('Please enter a city name.');
  }
});

function fetchWeatherData(cityName) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        displayWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
}

function displayWeatherData(data) {
    const weatherInfo = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p>Temperature: ${data.current.temp_c}°C</p>
      <p>Condition: ${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}"
      alt="${data.current.condition.text}">
      `;
    weatherDisplay.innerHTML = weatherInfo;
}