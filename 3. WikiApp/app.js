// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const input = document.querySelector('input');
const loader = document.querySelector('.loader');

// Ecouteur d'évènement sur l'élément input
input.addEventListener('input', handleForm);

function handleForm(e) {
    const searchInput = e.target.value;

    loader.style.display = "flex";

    if (searchInput !== "") {

        fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)
            .then(response => response.json())
            .then(data => showResults(data))
            .catch(function (error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                errorMsg.textContent = "Problème de connexion réseau";
            });
    } else {
        const results = document.querySelector('.results');
        eraseResults();
        loader.style.display = "none";
        return;
    }

    // loader.style.display = "none";
}

function showResults(data) {

    const arrResults = data.query.search;
    const results = document.querySelector('.results');
    const errorMsg = document.querySelector('.error-msg');

    if (arrResults.length === 0)  {
        errorMsg.textContent = "Aucun résultat à afficher...";
    }
    // Effacement des résultats
    eraseResults();

    // Boucle de création des cartes de résultats
    arrResults.forEach((result, index) => {

        // Création des éléments HTML et ajout des classes CSS
        const cardResult = document.createElement('div');
        cardResult.className = 'card-result';
        const cardTitle = document.createElement('h2');
        cardTitle.className = 'card-title';
        const cardURL = document.createElement('div');
        cardURL.className = 'card-url';
        const cardText = document.createElement('div');
        cardText.className = 'card-text';

        // Intégration des contenus
        cardTitle.innerHTML = `<a href="https://en.wikipedia.org/?curid=${arrResults[index].pageid}" target="_blank">${arrResults[index].title}</a>`;
        cardURL.textContent = `https://en.wikipedia.org/?curid=${arrResults[index].pageid}`;
        cardText.innerHTML = arrResults[index].snippet;

        // Intégration des cartes au DOM
        cardResult.appendChild(cardTitle);
        cardResult.appendChild(cardURL);
        cardResult.appendChild(cardText);
        results.appendChild(cardResult);

        // console.log(arrResults[index].pageid);
    });
    loader.style.display = "none";
}

function eraseResults() {
    const results = document.querySelector('.results');
    results.innerHTML = "";
}
