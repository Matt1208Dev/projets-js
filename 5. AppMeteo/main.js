
// Localisation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(data => {
        const lat = data.coords.latitude;
        const lon = data.coords.longitude;
        getOpenWeatherData(lat, lon);
    }
    )
}

// Appel à l'API OpenWeather
function getOpenWeatherData(lat, lon) {
    // Clé d'API
    const appId = "75157f1f56f27ef79c440b801997a584";
    // Paramètre(s) de requête non désiré(s)
    let part = "minutely";

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${appId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}