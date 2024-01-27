const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=",
    weather = document.querySelector(".weather"),
    userInput = document.querySelector(".searchBar"),
    weatherImg = document.querySelector(".weatherImg"),
    searchBtn = document.querySelector(".searchButton"),
    temp = document.querySelector(".temp"),
    cityNamePlace = document.querySelector(".cityName"),
    humidity = document.querySelector(".humidityVal"),
    windSpeed = document.querySelector(".speedVal"),
    error = document.querySelector(".error p"),
    humidityImg = document.querySelector(".humidityImg"),
    windImg = document.querySelector(".windSpeedImg"),
    humidityId = document.querySelector("#humidity"),
    windId = document.querySelector("#windSpeed");

async function checkWeather(cityName) {
    try {
        const response = await fetch(apiUrl + `${cityName}&appid=${apiKey}`);

        if (!response.ok) {
            handleError();
            return;
        }

        const data = await response.json();
        updateWeather(data);
        resetErrorDisplay();
    }
    catch (error) {
        console.error("An error occurred:", error);
        handleError();
    }
}

function updateWeather(data) {
    humidityImg.src = "images/humidity.png";
    windImg.src = "images/wind.png";
    humidityId.innerHTML = "humidity";
    windId.innerHTML = "wind speed";

    var weatherType = data.weather[0].main;

    switch (weatherType) {
        case "Clouds":
            weatherImg.src = "images/clouds.png";
            break;
        case "Clear":
            weatherImg.src = "images/clear.png";
            break;
        case "Rain":
            weatherImg.src = "images/rain.png";
            break;
        case "Drizzle":
            weatherImg.src = "images/drizzle.png";
            break;
        case "Mist":
        case "Fog":
            weatherImg.src = "images/mist.png";
            break;
        case "Snow":
            weatherImg.src = "images/snow.png";
            break;
        default:
            weatherImg.src = "images/clear.png";
    }

    temp.innerHTML = Math.round(data.main.temp) + "°C";
    cityNamePlace.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = parseFloat(data.wind.speed.toFixed(1)) + " Km/h";
}

function handleError() {
    error.style.display = "block";
    weather.style.display = "none";
}

function resetErrorDisplay() {
    error.style.display = "none";
    weather.style.display = "block";
}

searchBtn.addEventListener('click', () => {
    let cityName = userInput.value;
    checkWeather(cityName);
});
