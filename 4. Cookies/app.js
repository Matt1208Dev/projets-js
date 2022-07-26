
const form = document.querySelector('form');
const cookieContainer = document.querySelector('.cookie-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    createCookie();
});

function createCookie() {

    const cookieName = document.querySelector('#cookie-name');
    const cookieValue = document.querySelector('#cookie-value');

    // Gestion des erreurs par absence de saisie utilisateur
    const cookieNameErrorMsg = cookieName.nextElementSibling;
    const cookieValueErrorMsg = cookieValue.nextElementSibling;

    if (!cookieName.value) {
        cookieNameErrorMsg.innerHTML = "Le champ n'est pas rempli !";
    } else {
        cookieNameErrorMsg.innerHTML = "";
    }

    if (!cookieValue.value) {
        cookieValueErrorMsg.innerHTML = "Le champ n'est pas rempli !";
        return;
    } else {
        cookieValueErrorMsg.innerHTML = "";
    }

    if (!cookieName.value || !cookieValue.value) {
        return;
    } else {
        // On récupère le tableau des cookies
        const allCookies = getAllCookies();

        // On boucle dans celui-ci à la recherche d'un cookie du même nom
        if (!allCookies) {

            // Création du cookie avec les valeurs récupérées des inputs
            document.cookie = `${cookieName.value}=${cookieValue.value}`;

            // Affichage de la notification
            displayMessage('created', cookieName.value);

            // Effacement des valeurs d'inputs et messages d'erreurs
            form.reset();
            // cookieName.value = "";
            // cookieValue.value = "";
            cookieNameErrorMsg.innerHTML = "";
            cookieValueErrorMsg.innerHTML = "";

        } else {

            allCookies.forEach(el => {
                if (el.includes(cookieName.value)) {
                    // Modification du cookie avec les valeurs récupérées des inputs
                    document.cookie = `${encodeURIComponent(cookieName.value)}=${encodeURIComponent(cookieValue.value)}`;

                    // Affichage de la notification
                    displayMessage('updated', cookieName.value);

                } else {
                    // Création du cookie avec les valeurs récupérées des inputs
                    document.cookie = `${encodeURIComponent(cookieName.value)}=${encodeURIComponent(cookieValue.value)}`;

                    // Affichage de la notification
                    displayMessage('created', cookieName.value);
                }

                // Effacement des valeurs d'inputs et messages d'erreurs
                form.reset();
                // cookieName.value = "";
                // cookieValue.value = "";
                cookieNameErrorMsg.innerHTML = "";
                cookieValueErrorMsg.innerHTML = "";
            })
        }
    }

}

function getAllCookies() {
    // Recuperer les Cookies et les mettre dans un tableau
    if (document.cookie) {
        return document.cookie.split("; ");
    } else {
        return false;
    }
}

const displayCookiesButton = document.querySelector('#display-cookies');
displayCookiesButton.addEventListener('click', showCookies);

function showCookies() {
    // On efface tout contenu de cookie-container
    cookieContainer.textContent = "";

    // On recupère les cookies
    const allCookies = getAllCookies();

    // Si pas de cookie stocké => message d'erreur
    if (!allCookies) {
        const errorMsg = document.createElement('p');
        errorMsg.className = "error-msg";
        errorMsg.textContent = "Pas de cookie à afficher.";
        cookieContainer.appendChild(errorMsg);

        return;
    }

    // Boucle d'affichage des cookies
    for (let i = 0; i < allCookies.length; i++) {
        const cookie = allCookies[i].split("=");

        // Création de la card, intégration du contenu, intégration au DOM
        const card = document.createElement('div');
        card.className = "card";
        const name = document.createElement('p');
        name.innerHTML = `<span>Nom :</span> ${cookie[0]}`;
        const value = document.createElement('p');
        value.innerHTML = `<span>Valeur :</span> ${cookie[1]}`;
        const closeBtn = document.createElement('span');
        closeBtn.textContent = "X";
        closeBtn.className = "close-btn";
        card.appendChild(name);
        card.appendChild(value);
        card.appendChild(closeBtn);
        cookieContainer.appendChild(card);

        // Ecouteur d'évènement pour la suppression d'un cookie
        closeBtn.addEventListener('click', (e) => { deleteCookie(e) });
    }
}


function deleteCookie(e) {
    // Récupération du nom du cookie dans le texte de la card
    const cookieCard = e.target.parentElement;
    let cookieKey = e.target.parentElement.firstElementChild.childNodes[1].nodeValue;
    cookieKey = cookieKey.substr(1);

    // On récupère le tableau des cookies
    const allCookies = getAllCookies();

    document.cookie = `${cookieKey}=; expires=${new Date(0).toUTCString()}`;

    cookieCard.remove();

    // Affichage de la notification
    displayMessage('deleted', cookieKey);

    
    // On boucle dans celui-ci à la recherche d'un cookie du même nom afin de le supprimer
    // allCookies.forEach(el => {
    //     if (el.includes(cookieKey)) {
    //         document.cookie = `${cookieKey}=; expires=${new Date(0).toUTCString()}`;

    //         cookieCard.remove();

    //         // Affichage de la notification
    //         displayMessage('deleted', cookieKey);
    //     }
    // })
}

const messagesContainer = document.querySelector('.messages-container');

function displayMessage(message, cookieName) {

    const msgBox = document.createElement('p');
    msgBox.className = "message-box";

    switch (message) {
        case 'created':
            msgBox.textContent = `Cookie ${cookieName} créé.`;
            msgBox.style.backgroundColor = "blue";
            break;

        case 'updated':
            msgBox.textContent = `Cookie ${cookieName} modifié.`;
            msgBox.style.backgroundColor = "orange";
            break;

        case 'deleted':
            msgBox.textContent = `Cookie ${cookieName} supprimé.`;
            msgBox.style.backgroundColor = "red";
            break;

        default:
            'situation inattendue';
    }

    messagesContainer.appendChild(msgBox);
    setTimeout(() => { msgBox.remove() }, 2500);
}
