const citySearchInput = document.getElementById('city-search');
const searchButton = document.getElementById('search-button');
const apiKey = 'd6d8982cca5247a882a132815242909'; // Weather API key
const weatherDisplay = document.getElementById('weather-display');
const currentLocationButton = document.getElementById('current-location-button');
const dropdownMenu = document.getElementById('dropdown-menu');

function updateDropdownMenu() {
    const recentlySearchedCities = JSON.parse(localStorage.getItem('recentlySearchedCities')) || [];
    dropdownMenu.innerHTML = ''; 

    recentlySearchedCities.forEach((city) => {
    const dropdownItem = document.createElement('li');
    dropdownItem.textContent = city;
    dropdownItem.addEventListener('click', () => {
        citySearchInput.value = city;
        fetchWeatherData(city);
        dropdownMenu.classList.add('hidden');
    });
    dropdownMenu.appendChild(dropdownItem);
  });
}

searchButton.addEventListener("click", () => {
    currentLocationButton.disabled = true;
    currentLocationButton.style.backgroundColor = 'grey';

    const cityName = citySearchInput.value;
    const cityNameRegex = /^[a-zA-Z\s]+$/;
    if (cityName) {
      if (!cityNameRegex.test(cityName)) {
        alert('Please enter a valid city name.');
        return;
      }
      fetchWeatherData(cityName);
      dropdownMenu.classList.add('hidden');
    } else {
      alert('Please enter a city name.');
    }
});

function fetchWeatherData(cityName) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        displayWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });

      const recentlySearchedCities = JSON.parse(localStorage.getItem('recentlySearchedCities')) || [];
      if (!recentlySearchedCities.includes(cityName)) {
        recentlySearchedCities.unshift(cityName);
        localStorage.setItem('recentlySearchedCities', JSON.stringify(recentlySearchedCities));
      }
      updateDropdownMenu();
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

updateDropdownMenu();
localStorage.clear();