const apiKey = 'b190a0605344cc4f3af08d0dd473dd25';

document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === 200) {
            updateWeatherDetails(data);
        } else {
            alert('City not found');
        }
    } catch (error) {
        alert('Failed to fetch data');
    }
});

function updateWeatherDetails(data) {
    document.getElementById('weatherIcon').src = getWeatherIcon(data.weather[0].id);
    document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('location').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('feelsLike').innerText = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `${data.wind.speed} m/s`;
    document.getElementById('pressure').innerText = `${data.main.pressure} hPa`;
    document.getElementById('minTemp').innerText = `${Math.round(data.main.temp_min)}°`;
    document.getElementById('maxTemp').innerText = `${Math.round(data.main.temp_max)}°`;
    
    // Display the date and time
    const now = new Date();
    document.getElementById('datetime').innerText = now.toLocaleString();
}

function getWeatherIcon(weatherId) {
    if (weatherId === 800) return "https://openweathermap.org/img/wn/01d.png";
    if (weatherId >= 200 && weatherId <= 232) return "https://openweathermap.org/img/wn/11d.png";
    if (weatherId >= 600 && weatherId <= 622) return "https://openweathermap.org/img/wn/13d.png";
    if (weatherId >= 701 && weatherId <= 781) return "https://openweathermap.org/img/wn/50d.png";
    if (weatherId >= 801 && weatherId <= 804) return "https://openweathermap.org/img/wn/03d.png";
    if ((weatherId >= 500 && weatherId <= 531) || (weatherId >= 300 && weatherId <= 321)) return "https://openweathermap.org/img/wn/09d.png";
    return "https://openweathermap.org/img/wn/unknown.png";
}
