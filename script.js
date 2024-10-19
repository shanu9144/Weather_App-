document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("input-box");
    const cityEl = document.getElementById("city");
    const dateEl = document.getElementById("date");
    const weatherEl = document.getElementById("weather");
    const tempEl = document.getElementById("temp");
    const minMaxEl = document.getElementById("min-max");
    const descriptionEl = document.getElementById("description");

    inputBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const city = inputBox.value;
            getWeather(city);
        }
    });

    async function getWeather(city) {
        const apiKey = '6af691736cc4c65cb016ae806326a4e0'; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === "404") {
                alert("City not found");
                return;
            }

            // Update the DOM with the fetched data
            cityEl.textContent = `${data.name}, ${data.sys.country}`;
            dateEl.textContent = new Date().toLocaleDateString();
            weatherEl.textContent = data.weather[0].main;
            tempEl.textContent = `${data.main.temp}°C`;
            minMaxEl.textContent = `Min: ${data.main.temp_min}°C / Max: ${data.main.temp_max}°C`;
            descriptionEl.textContent = data.weather[0].description;
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
});
