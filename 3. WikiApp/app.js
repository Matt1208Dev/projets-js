// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const input = document.querySelector('input');

// Ecouteur d'évènement sur l'élément input
input.addEventListener('input', handleForm);

function handleForm(e) {
    const searchInput = e.target.value;

    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)
        .then(response => response.json())
        .then(data => showResults(data));
}

function showResults(data) {

    const arrResults = data.query.search;

    // Sélection et effacement du contenu du conteneur des résultats
    const results = document.querySelector('.results');
    results.innerHTML = "";

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
        cardTitle.innerHTML = `<a href="https://en.wikipedia.org/?curid=${arrResults[index].pageid}">${arrResults[index].title}</a>`;
        cardURL.textContent = `https://en.wikipedia.org/?curid=${arrResults[index].pageid}`;
        cardText.innerHTML = arrResults[index].snippet;

        // Intégration des cartes au DOM
        cardResult.appendChild(cardTitle);
        cardResult.appendChild(cardURL);
        cardResult.appendChild(cardText);
        results.appendChild(cardResult);

        // console.log(arrResults[index].pageid);
    });
}