const randomPhotoURL = "https://api.unsplash.com/photos/random?count=30";
const accessKey = "DCQrlw8LnEaIbBv0lEXebJ3REtV97mI5rvT0k0_jRNQ";
const query = {
    keyword: "",
    prevKeyword: "",
    page: 1
}
const searchInput = document.querySelector('form');
const resultsContainer = document.querySelector('.results');
const form = document.querySelector('form');
const msgError = document.querySelector('.error');
const infiniteScroll = document.querySelector('#infinite-scroll');
let errorLock = false;

searchInput.addEventListener('submit', handleForm);

// Gestion de la soumission du formulaire
function handleForm(e) {
    e.preventDefault();
    // Si l'objet query.keyword contient déjà un mot clé et que celui-ci est différent de la requête précédente (objet query), on réinitialise query.page
    if (query.keyword && query.keyword !== query.prevKeyword) {
        // On assigne celui-ci à prevKeyword 
        query.prevKeyword = query.keyword;
        query.page = 1;
    }
    // query.keyword récupère la valeur saisie dans le champ input
    query.keyword = e.target[0].value;
    // On "vide" la grille de résultats
    resultsContainer.innerHTML = "";

    errorLock = false;

    // Si on soumet un champ vide, on appelle la fonction "random" 
    if (!query.keyword) {
        getAPIData(randomPhotoURL);
        return;
    }
    // On envoie la requête à l'API Unsplash
    getAPIData(`https://api.unsplash.com/search/photos?query=${query.keyword}&page=${query.page}&per_page=30`);
}

async function getAPIData(url) {

    try {
        // Requête à l'API
        const response = await fetch(`${url}&client_id=${accessKey}`);

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }

        const data = await response.json();

        // Affichage des résultats
        if (data.results) {
            showResults(data.results);
        } else {
            showResults(data);
        }

    } catch (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    }
}

// Appel de la fonction d'affichage aléatoire au chargement de la page
window.onload = getAPIData(randomPhotoURL);

// Affichage des images dans la grille des résultats
function showResults(data) {

    // Verrou empéchant l'affichage d'un second message d'erreur, déclenché par le fetch de l'Observeur
    if (errorLock) {
        return;
    }

    // Message d'erreur si pas de résultat
    if (data.length === 0 || !data) {
        msgError.textContent = "Oups ! La recherche ne retourne aucun résultat.";
        errorLock = true;
        return;
    } else {
        msgError.textContent = "";
    }

    // Création des vignettes
    data.forEach(item => {
        const picBox = document.createElement('div');
        picBox.className = 'pic-box';
        const pic = document.createElement('img');
        pic.src = item.urls.regular;
        picBox.appendChild(pic);
        resultsContainer.appendChild(picBox);
    });
}

// Observeur de scroll
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
}

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            query.page++;
            if (query.keyword) {
                getAPIData(`https://api.unsplash.com/search/photos?query=${query.keyword}&page=${query.page}&per_page=30`);
            } else {
                getAPIData(randomPhotoURL);
            }
        }
    })
}, options);

observer.observe(infiniteScroll);