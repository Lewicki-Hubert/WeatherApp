const apiKey = "56f5608b63ba15beb33be1eb3f832fbd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchButton = document.querySelector(".search button");
const searchBox = document.querySelector(".search input");

async function checkWeather(city) {
    document.querySelector(".error").style.display = "none"; // Ukryj błąd na start

    const response = await fetch(apiUrl + city + "&appid=" + apiKey);
    var data = await response.json();

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

        const weatherIcon = document.querySelector(".weather-icon");

        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = "images/mist.png";
        } else {
            weatherIcon.src = "images/default.png"; // Domyślny obrazek, jeśli brak dopasowania
        }

        weatherIcon.style.display = "block"; // Upewnij się, że obrazek jest widoczny
        document.querySelector(".weather").style.display = "block";
    }
}




searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
