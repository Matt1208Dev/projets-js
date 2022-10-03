const results = document.querySelector('.results'); // Conteneur de résultats
const input = document.querySelector('input'); // Champ de recherche
const textError = document.querySelector('error');
let users;

input.addEventListener('input', filterUsers);

// Filtrage des résultats
function filterUsers(e) {
    // Valeur saisie ramenée en minuscules
    let inputValue = e.target.value.toLowerCase().replace(/\s/g, "");
    // On supprime les espaces et on passe en minuscules les noms et prénoms de users et on ne garde que ceux qui contiennent la valeur saisie via filter(). 
    const filteredUsers = users.filter((user) => user.name.last.concat(user.name.first).toLowerCase().replace(/\s/g, "").includes(inputValue) || user.name.first.concat(user.name.last).toLowerCase().replace(/\s/g, "").includes(inputValue));
    // On affiche les résultats
    showResults(filteredUsers);
}

async function getRandomUserAPIData() {
    try {
        // Récupération des données
        const results = await fetch('https://randomuser.me/api/?nat=fr&results=50');

        if (!results.ok) {
            throw new Error(`Erreur: ${results.status}`);
        }

        const data = await results.json();

        users = data.results;
        // Tri croissant du tableau users
        const sortedUsers = users.sort((a, b) => a.name.last > b.name.last);
        // On affiche les résultats
        showResults(sortedUsers);

    } catch (error) {
        // Gestion des erreurs
        textError.textContent = error;
    }
}

// Affichage des résultats
function showResults(data) {
    // On supprime tout contenu préalable dans results
    results.innerHTML = "";

    // Création des cartes
    for (const user of data) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <p class="user-identity">
            <img class="profile-pic" src="${user.picture.thumbnail}" alt="photo de profil">
            <span>${user.name.last} ${user.name.first}</span>
        </p>
        <p class="user-email">${user.email}</p>
        <p class="user-phone">${user.phone}</p>
        `;
        results.appendChild(card);
    }
}

window.onload = getRandomUserAPIData();