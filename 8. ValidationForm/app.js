/* Contrôle de formulaire */

// Champs à contrôler
const form = document.querySelector('form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#password-confirm');

// Indicateurs de sécurité colorés
const low = document.querySelector('.low');
const mid = document.querySelector('.mid');
const high = document.querySelector('.high');

// Indicateurs de contrôle
let usernameVerif = false;
let emailVerif = false;
let passwordVerif = false;
let passwordConfirmVerif = false;

// Contrôle du champ #username
username.addEventListener('input', (e) => handleUsername(e));

function handleUsername(e) {

    let element = e.target;

    if (element.value.length >= 3) {
        displayError(element, "");
        usernameVerif = true;
    } else {
        displayError(element, "Choisissez un pseudo contenant au moins 3 caractères.");
        usernameVerif = false;
    }

    handleStatusIcon(element, usernameVerif);
}

// Contrôle du champ #email
email.addEventListener('input', (e) => handleEmail(e));

function handleEmail(e) {

    const emailRegExp = new RegExp(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);
    let element = e.target;
    console.dir(element);

    if (emailRegExp.test(element.value)) {
        displayError(element, "");
        emailVerif = true;
    } else {
        displayError(element, "Rentrez un email valide");
        emailVerif = false;
    }

    handleStatusIcon(element, emailVerif);
}

// Contrôle du champ #password
password.addEventListener('input', (e) => checkPasswordSecurity(e));

function checkPasswordSecurity(e) {
    const upperCaseRegExp = new RegExp(/[A-Z]/);
    const symbolRegExp = new RegExp(/[!\?\-_&§$€%£#]/);
    const numberRegExp = new RegExp(/[0-9]/);
    let element = e.target;

    // Condition d'obtention du niveau "Bas"
    if (element.value.length >= 6 && upperCaseRegExp.test(element.value)) {
        low.style.display = "block";
        passwordVerif = false;

        // Condition d'obtention du niveau "Moyen"
        if ((element.value.length >= 6) && (symbolRegExp.test(element.value) || numberRegExp.test(element.value))) {
            mid.style.display = "block";
            passwordVerif = false;

            // Condition d'obtention du niveau "Fort"
            if (element.value.length >= 9 && (symbolRegExp.test(element.value) && numberRegExp.test(element.value))) {
                mid.style.display = "block";
                high.style.display = "block";
                passwordVerif = true;
            } else {
                high.style.display = "none";
                passwordVerif = false;

            }

        } else {
            mid.style.display = "none";
            passwordVerif = false;
        }

    } else {
        low.style.display = "none";
        mid.style.display = "none";
        high.style.display = "none";
        passwordVerif = false;
    }

    if(passwordConfirmVerif === true) {
        passwordConfirmVerif = false;
        passwordConfirm.value = "";
    }

    handleStatusIcon(element, passwordVerif);
    handleStatusIcon(passwordConfirm, passwordConfirmVerif);
}

// Contrôle du champ #password-confirm
passwordConfirm.addEventListener('input', (e) => checkPasswordConfirmation(e))

function checkPasswordConfirmation(e) {
    let element = e.target;
    if (element.value === password.value) {
        passwordConfirmVerif = true;
        displayError(element, "");
    } else {
        passwordConfirmVerif = false;
        displayError(element, "Les mots de passe ne sont pas identiques. Rééssayez.")
    }

    handleStatusIcon(element, passwordConfirmVerif);
}

// Vérification des indicateurs de contrôle à la soumission du formulaire
form.addEventListener('submit', (e) => handleForm(e));

function handleForm(e) {

    if (usernameVerif &&
        emailVerif &&
        passwordVerif &&
        passwordConfirmVerif) {

        // Formulaire conforme
        alert("Formulaire envoyé !");

    } else {

        // Blocage de l'envoi du formulaire et affichage des erreurs
        e.preventDefault();
        if (!usernameVerif) {
            displayError(username, "Choisissez un pseudo contenant au moins 3 caractères.");
        } else {
            displayError(username, "");
        }
        handleStatusIcon(username, usernameVerif);

        if (!emailVerif) {
            displayError(email, "Rentrez un email valide");
        } else {
            displayError(email, "");
        }
        handleStatusIcon(email, emailVerif);

        if (!passwordConfirmVerif) {
            password.value = "";
            passwordVerif = false;
            low.style.display = "none";
            mid.style.display = "none";
            high.style.display = "none";
            passwordConfirm.value = "";
        }
        handleStatusIcon(password, passwordVerif);
        handleStatusIcon(passwordConfirm, passwordConfirmVerif);
    }
}

// Affichage du message d'erreur selon le champ concerné
function displayError(element, message) {
    element.parentElement.nextElementSibling.innerText = `${message}`;
}

// Affichage d'une coche verte ou point d'exclamation dans l'input selon le résultat de contrôle du champ
function handleStatusIcon(element, status) {
    let img = element.nextElementSibling;
    if (status === true) {
        img.src = "ressources/check.svg";
        img.alt = "icône coche verte"
        img.style.display = "block";
    } else if (status === false) {
        img.src = "ressources/error.svg";
        img.alt = "icône erreur rouge"
        img.style.display = "block";
    }
}