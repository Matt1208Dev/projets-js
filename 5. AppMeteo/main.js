
const loader = document.querySelector('.loader');
const forecastResults = document.querySelector("div.forecast-results");

// Localisation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(data => {
        const lat = data.coords.latitude;
        const lon = data.coords.longitude;
        getOpenWeatherData(lat, lon);
    }, () => {
        loader.textContent = "Vous avez refusé de partager votre géolocalisation. L'application ne peut fonctionner correctement. Rechargez la page et autorisez le partage.";
    }
    )
}

// Appel à l'API OpenWeather
async function getOpenWeatherData(lat, lon) {
    // Clé d'API
    const appId = ""; /* À compléter avec une clé d'API valide */
    // Paramètre(s) de requête non désiré(s)
    let part = "minutely";

    try {

        const results = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=metric&lang=fr&appid=${appId}`);

        if (!results.ok) {
            throw new Error(`Erreur: ${results.status}`);
        }

        const data = await results.json();

        // Affichage des données
        displayCurrent(data);
        displayHourly(data);
        displayDaily(data);

        forecastResults.lastElementChild.style.display = "none";

        loader.classList.add('fade-out');

    } catch (error) {
        loader.textContent = error;
    }
}

// Affichage de la météo en temps réel
function displayCurrent(data) {

    const picture = document.querySelector('img');
    const temperature = document.querySelector('.temperature');
    const userLocation = document.querySelector('.location');

    // Logo image
    const icon = data.current.weather[0].icon;
    if (icon.indexOf('n') !== -1) {
        picture.src = `./ressources/nuit/${icon}.svg`;
    } else {
        picture.src = `./ressources/jour/${icon}.svg`;
    }

    // Affichage température
    temperature.textContent = `${data.current.temp.toFixed(1)}°C`;

    // Affichage du fuseau horaire
    userLocation.textContent = `${data.timezone}`;
}

// Affichage des prévisions horaires
function displayHourly(data) {
    const hourly = data.hourly.slice(1, 23);

    const forecastHourResults = document.createElement('div');
    forecastHourResults.className = "forecast-hour-results";

    hourly.forEach((hour) => {

        let hourOfTheDay = new Date(hour.dt * 1000);

        // On affiche uniquement une prévision toutes les 3h.
        if (hourly.indexOf(hour) % 3 === 0 && hourly.indexOf(hour) !== 0) {

            // Création des éléments, remplissage et rattachement au DOM
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
            forecastHourResults.appendChild(forecastHourItem);
            forecastResults.appendChild(forecastHourResults);
        }
    })
}

// Affichage des prévisions journalières
function displayDaily(data) {
    const daily = data.daily.slice(1, 8);
    const weekDays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const forecastDayResults = document.createElement('div');
    forecastDayResults.className = "forecast-day-results";

    daily.forEach((day => {

        let currentDay = new Date(day.dt * 1000).getUTCDay();

        // Création des éléments, remplissage et rattachement au DOM
        const forecastDayItem = document.createElement('div');
        forecastDayItem.className = "forecast-day-item";

        const title = document.createElement('p');
        title.className = "item-title";
        title.textContent = `${weekDays[currentDay].slice(0, 3)}`;

        const value = document.createElement('p');
        value.className = "item-value";
        value.textContent = `${day.temp.day.toFixed(1)}`;

        forecastDayItem.appendChild(title);
        forecastDayItem.appendChild(value);
        forecastDayResults.appendChild(forecastDayItem);
        forecastResults.appendChild(forecastDayResults);
    }))
}

// Gestion de l'affichage par onglet
const btnHourly = document.querySelector('.btn-hourly');
const btnDaily = document.querySelector('.btn-daily');

const forecastHourResults = document.querySelector('.forecast-hour-results');
const forecastDayResults = document.querySelector('.forecast-day-results');

btnHourly.addEventListener('click', () => {

    const forecastHourResults = document.querySelector('.forecast-hour-results');
    const forecastDayResults = document.querySelector('.forecast-day-results');

    forecastDayResults.style.display = "none";
    forecastHourResults.style.display = "flex";
    btnDaily.classList.remove('active');
    btnHourly.classList.add('active');
})

btnDaily.addEventListener('click', () => {

    const forecastHourResults = document.querySelector('.forecast-hour-results');
    const forecastDayResults = document.querySelector('.forecast-day-results');

    forecastHourResults.style.display = "none";
    forecastDayResults.style.display = "flex";
    btnHourly.classList.remove('active');
    btnDaily.classList.add('active');
})