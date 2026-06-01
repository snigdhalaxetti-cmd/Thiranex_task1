const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) {
        weatherCard.innerHTML = "<p class='error'>Please enter a city name</p>";
        return;
    }

    try {

        weatherCard.innerHTML = "Loading...";

        // Get coordinates from city name
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        if (!geoResponse.ok) {
            throw new Error("Failed to fetch location");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results) {
            throw new Error("City not found");
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const cityName = geoData.results[0].name;
        const country = geoData.results[0].country;

        // Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather");
        }

        const weatherData = await weatherResponse.json();

        const temperature =
            weatherData.current.temperature_2m;

        const humidity =
            weatherData.current.relative_humidity_2m;

        const windSpeed =
            weatherData.current.wind_speed_10m;

        weatherCard.innerHTML = `
            <h2>${cityName}, ${country}</h2>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
        `;

    } catch (error) {

        weatherCard.innerHTML = `
            <p class="error">${error.message}</p>
        `;

    }
}
