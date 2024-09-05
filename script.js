
const APIKEY = '9d0ff38a4c5f40f486395513241008';
const API = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=`;

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('city-name');
const countryName = document.getElementById('countryName');
const localTime = document.getElementById('loc-time');
const temp = document.getElementById('temp');
const sup = document.getElementById('sup');

async function getData(cityName) {
    try {
        const response = await fetch(`${API}${cityName}&aqi=yes`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Weather data fetch karne mein problem:', error);
        document.getElementById('outputCard').style.visibility = 'hidden';
        alert('Error fetching weather data. Please try again later.');
        return null;
    }
}

searchBtn.addEventListener('click', async () => {
    const input = cityInput.value.trim();
    if (input === '') {
        alert('Please enter a city name.');
        return;
    }
    document.getElementById('outputCard').style.visibility = 'visible';
    const result = await getData(input);
    if (result) {
        cityName.innerText = `${result.location.name}, ${result.location.region}`;
        countryName.innerText = `${result.location.country}`;
        temp.innerText = `${result.current.temp_c}`;
        sup.innerText = '°C';
        localTime.innerText = `${result.location.localtime}`;
    }
});
