
// Localisation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(data => {
        const lat = data.coords.latitude;
        const lon = data.coords.longitude;
        getOpenWeatherData(lat, lon);
    }, () => {
        throw new Error("Vous avez refusé de partager votre géolocalisation. L'application ne peut être chargée. Recharger la page et autoriser le partage.");
    }
    )
}

// Appel à l'API OpenWeather
async function getOpenWeatherData(lat, lon) {
    // Clé d'API
    const appId = "42185c0f84f31c69b7b2765aee80ba1b";
    // Paramètre(s) de requête non désiré(s)
    let part = "minutely";

    try {

        const results = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=metric&lang=fr&appid=${appId}`);

        if (!results.ok) {
            throw new Error(`Erreur: ${results.status}`);
        }

        const data = await results.json();

        console.log(data);

        displayCurrent(data);
        displayHourly(data);

    } catch (error) {
        console.log(error);
    }
}

function displayCurrent(data) {

    const picture = document.querySelector('img');
    const temperature = document.querySelector('.temperature');
    const userLocation = document.querySelector('.location');

    const icon = data.current.weather[0].icon;
    if (icon.indexOf('n') !== -1) {
        picture.src = `./ressources/nuit/${icon}.svg`;
    } else {
        picture.src = `./ressources/jour/${icon}.svg`;
    }
    temperature.textContent = `${data.current.temp.toFixed(1)}°C`;
}

function displayHourly(data) {
    const hourly = data.hourly.slice(0, 23);
    console.log(hourly);

    hourly.forEach((hour) => {

        const forecastResults = document.querySelector("div.forecast-results");

        let hourOfTheDay = new Date(hour.dt * 1000);

        // On affiche uniquement une prévision toutes les 3h.
        if (hourly.indexOf(hour) % 3 === 0 && hourly.indexOf(hour) !== 0) {
            const forecastHourItem = document.createElement('div');
            forecastHourItem.className = "forecast-hour-item";

            const title = document.createElement('p');
            title.className = "item-title";
            title.textContent = `${hourOfTheDay.getHours()}h`;

            const value = document.createElement('p');
            value.className = "item-value";
            value.textContent = `${hour.temp.toFixed(1)}`;

            forecastHourItem.appendChild(title);
            forecastHourItem.appendChild(value);
            forecastResults.appendChild(forecastHourItem);
        }
    })
}