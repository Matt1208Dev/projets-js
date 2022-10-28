const APIEndpoint = "http://api.quotable.io/random";
const btnTime = document.querySelector('#btn-time');
const time = document.querySelector('.time');
const score = document.querySelector('.score');
const typingArea = document.querySelector('#typing-area');
const quote = document.querySelector('.quote');
let timeMax = 20;
let timeLaunched = false;
let remainingTime;
let finalScore = 0;
let tempScore;

function timer() {
    // Si timeLaunched est true
    if (timeLaunched) {
        // On entame le décompte
        remainingTime = setInterval(() => {
            timeMax--;
            // Affichage du temps restant
            time.textContent = timeMax;
            // Quand le timer est écoulé
            if (timeMax === 0) {
                // On annule le timer
                clearInterval(remainingTime);
                // On passe son statut sur "arrêt/false"
                timeLaunched === false;
                // On retire le clignotement du bouton de temps
                btnTime.classList.remove('btn-active');
                // On n'écoute plus le textarea
                typingArea.removeEventListener('input', checkText);
                // On calcul et affiche le score final
                finalScore = finalScore + Number.parseInt(score.textContent, 10);
                score.textContent = finalScore;
            }
        }, 1000);
    }
}

async function getAPIData() {
    try {
        const response = await fetch(`${APIEndpoint}`);

        if (!response.ok) {
            quote.textContent = "Problème d'accès aux données de l'API. Rafraichissez la page."
            throw new Error(`Erreur: ${response.status}`);
        }

        const data = await response.json();

        if (data) {
            displayQuote(data.content);
        } else {
            quote.textContent = "Problème d'accès aux données de l'API. Rafraichissez la page."
        }

    } catch (e) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + e.message);
    }
}

function displayQuote(text) {
    // On récupère chaque caractère de la citation dans un tableau
    let quoteToType = [...text];
    // On entoure chaque caractère d'un span
    quoteToType.forEach((char, index) => {
        quoteToType[index] = `<span class="char">${char}</span>`;
    })
    // Affichage de la citation
    quote.innerHTML = "";
    quoteToType.forEach(char => quote.innerHTML += char);
}

window.addEventListener('keyup', startGame);

function startGame(e) {
    // Si la touche relachée n'est pas "Échap", on ne fait rien
    if (e.key !== "Escape") {
        return;
    } else {
        // Si le timer est en marche
        if (timeLaunched === true) {
            // On l'annule
            clearInterval(remainingTime);
            // On repasse le statut du timer sur "arrêt/false"
            timeLaunched = false;
        }
        // On efface le textarea
        typingArea.value = "";
        // On charge une nouvelle citation aléatoire
        getAPIData();
        // On rend clignotant le bouton Temps 
        btnTime.classList.add('btn-active');
        // Temps max du timer
        timeMax = 60;
        // Affichage du temps
        time.textContent = timeMax;
        // Réinitialisation des scores
        tempScore = 0;
        finalScore = 0;
        // Affichage du score
        score.textContent = tempScore;
        // On écoute le textarea
        typingArea.addEventListener('input', checkText);
    }
}

function changeQuote() {
    // On efface le contenu du textarea
    typingArea.value = "";
    // On charge une nouvelle citation aléatoire
    getAPIData();
}

function checkText(e) {

    // Si le timer n'est pas en route, on le déclenche
    if (timeLaunched === false) {
        timeLaunched = true;
        timer();
        tempScore = 0;
    }
    // Saisie du joueur
    const playerText = [...typingArea.value];
    // Caractères de la citation à comparer
    const quoteChars = [...document.querySelectorAll('.char')];

    // Si la longueur de la saisie équivaut au moins à celle de la citation et que le dernier caractère est "."
    if (playerText.length >= quoteChars.length) {
        if (playerText.lastIndexOf('.') === playerText.length - 1 || playerText.lastIndexOf('?') === playerText.length - 1) {
            // Le score obtenu devient la nouvelle valeur minimum du score final
            finalScore = finalScore + Number.parseInt(score.textContent, 10);
            // On change la citation
            changeQuote();
            // On réaffiche le score à 0
            score.textContent = 0;
            return;
        }
    }

    // On réinitialise le compteur de point à 0 avant de recompter les points acquis.
    tempScore = 0;

    // On retire tous les background-color des lettres de la citation
    quoteChars.forEach((char, index) => quoteChars[index].classList.remove('wrong', 'right'));
    // On compare la saisie au tableau
    playerText.forEach((char, index) => {
        if (playerText[index] === quoteChars[index].innerText) {
            // Si égaux, le caractère passe au vert
            quoteChars[index].classList.add('right');
            // On incrémente le score
            tempScore++;
        } else {
            // Sinon, le caractère passe au rouge
            quoteChars[index].classList.add('wrong');
            // On décrémente le score
            tempScore--;
        }

    })

    // Si un score venait à être négatif, on laisse le compteur à 0
    if (tempScore < 0) tempScore = 0;

    // Affichage du score intermédiaire
    score.textContent = tempScore;
}