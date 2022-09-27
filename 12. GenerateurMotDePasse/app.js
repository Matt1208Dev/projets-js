const form = document.querySelector('form'); // formulaire
const range = document.querySelector('#pwd-length'); // sélecteur de longueur du mot de passe
const pwdLengthInfo = document.querySelector('.range-group-label span'); // Affichage longueur du mot de passe
const checkboxes = [...document.querySelectorAll('.checkbox-input')]; // Checkboxes
const password = document.querySelector('.password'); // Box d'affichage du résultat (mot de passe)
const btnCopy = document.querySelector('.btn-copy'); // Bouton de copie
const error = document.querySelector('.error'); // Box d'affichage du message d'erreur
const pwdOptions = {
    length: 10,
    numbers: "0123456789",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVXYZ",
    specials: `@[]^_!"#$%&'()*+,-./:;{}<>=|~?`
} // Charsets et longueur du mot de passe

range.addEventListener('input', displayPasswordLength);
form.addEventListener('submit', handleSubmit);

// Affichage du nombre de caractères sélectionné
function displayPasswordLength(e) {
    pwdLengthInfo.textContent = e.target.value;
}

// Affichage du mot de passe sur la page
function displayPassword(newPassword) {
    password.textContent = newPassword;
}

// Génération d'un nombre aléatoire entre un min et un max fournis en arguments
function getRandomNumber(min, max) {
    let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
    randomNumber = randomNumber / 4294967296;
    return Math.floor(randomNumber * (max - min + 1)) + min;
}

function handleSubmit(e) {
    e.preventDefault();
    let selectedCharsets = [];
    let passwordBase = [];
    let password = "";

    // Récupération de la longueur de mot de passe choisie
    pwdOptions.length = range.value;

    // Contrôle des checkboxes sélectionnées et récupération des charsets concernés dans selectedCharsets
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCharsets.push(pwdOptions[checkbox.id]);
        }
    });

    // Affichage d'un message d'erreur si pas de checkbox cochée
    if (!selectedCharsets.length) {
        error.textContent = "Au moins une case doit être cochée !";
        return;
    } else {
        error.textContent = "";
    }

    // Ajout d'un caractère de chaque charset pour respecter les conditions cochées
    selectedCharsets.forEach(charset => {
        passwordBase.push(charset[getRandomNumber(0, charset.length - 1)]);
    })

    // Fusion des items de selectedCharsets en une string
    let allSelectedCharacters = selectedCharsets.reduce((acc, val) => acc + val);

    // Construction du reste du mot de passe
    for (let i = selectedCharsets.length; i < pwdOptions.length; i++) {
        password += allSelectedCharacters[getRandomNumber(0, allSelectedCharacters.length - 1)];
    }

    // Intégration aléatoire des caractères de passwordBase dans password pour former le résultat final
    passwordBase.forEach((char, index) => {
        let randomNumber = getRandomNumber(0, password.length);
        password = password.slice(0, randomNumber) + passwordBase[index] + password.slice(randomNumber);
    });

    // Affichage du résultats
    displayPassword(password);
}

// Copie dans le presse-papier
btnCopy.addEventListener('click', copyClipboard);

let lock = false;
function copyClipboard() {
    if (lock) {
        return;
    } else {
        // Verrou de la fonction
        lock = true;
        // Copie dans le presse-papier
        navigator.clipboard.writeText(password.textContent);
        // Affichage message de confirmation
        btnCopy.classList.add('active');

        setTimeout(() => {
            // Disparition du message
            btnCopy.classList.remove('active');
            // Dévérouillage de la fonction
            lock = false;
        }, 1000);
    }
}