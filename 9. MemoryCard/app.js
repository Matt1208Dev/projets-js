// 2e script, avec nouvelles notions de CSS 3D
const cards = document.querySelectorAll('.card');
const textInfo = document.querySelector('.text-info');
const score = document.querySelector('.score');

let lock = false;

// Melange des cartes
function shuffleCards() {
    cards.forEach(card => {
        card.style.order = Math.trunc(Math.random() * 12);
    })
}
shuffleCards();

cards.forEach(card => {
    card.addEventListener('click', turnCard);
})

let cardChosen = [];

function turnCard(e) {
    // lock empêche de limiter le nombre de cartes retournées à la fois
    if (lock) {
        return;
    }

    saveCard(e.target.children[0], e.target.getAttribute("data-fruit"));

    if (cardChosen.length === 2) {
        result();
    }
}

function saveCard(element, attribute) {
    // Empêcher l'interaction avec la carte si elle est déjà dans cardChosen
    if (element === cardChosen[0]?.element) {
        return;
    }

    // Retournement de la carte
    element.classList.add('active');

    // Ajout de l'élément et son attribut à cardChosen
    cardChosen.push({ element, attribute });
}

let numberOfTries = 0;
function result() {
    // Si les cartes sont identiques, on les laisse retournées
    if (cardChosen[0].attribute === cardChosen[1].attribute) {

        cardChosen[0].element.parentElement.removeEventListener('click', turnCard);
        cardChosen[1].element.parentElement.removeEventListener('click', turnCard);
        cardChosen = [];
        incrementScore();
        return;
    }

    lock = true;
    // On désactive l'écouteur d'évènement sur la carte
    setTimeout(() => {
        cardChosen[0].element.classList.remove('active');
        cardChosen[1].element.classList.remove('active');
        cardChosen = [];
        lock = false;
    }, 1000);

    incrementScore();

}

const activeCards = [...document.querySelectorAll('.double-face')];

function incrementScore() {
    numberOfTries++;
    score.textContent = `Nombre de coups : ${numberOfTries}`;

    // Vérification du nombre de carte non retournées
    const checkForEnd = activeCards.filter(card => !card.classList.contains('active'));

    // SI toutes les cartes sont retournées, partie terminée
    if (!checkForEnd.length) {
        textInfo.textContent = 'Bravo ! Appuyez sur "espace" pour relancer une partie.';
        score.textContent = `Score final : ${numberOfTries}`;
    }
}

window.addEventListener('keydown', handleKeydown);

// shuffleLock empêche le spam de touche espace pour relancer le jeu
let shuffleLock = false;
// Reset si appui sur espace
function handleKeydown(e) {
    // on désactive le comportement par défaut
    e.preventDefault();

    // SI la touche est bien l'espace, on réinitialise toutes les variables et message dans leur état de départ
    if (e.keyCode === 32) {
        activeCards.forEach(card => card.classList.remove('active'));
        cards.forEach(card => card.addEventListener('click', turnCard));
        textInfo.textContent = "Tentez de gagner avec le moins d'essais possible.";
        score.textContent = `Nombre de coups : 0`;
        numberOfTries = 0;
        lock = false;
        cardChosen = [];

        if (shuffleLock) {
            return;
        }
        shuffleLock = true;
        setTimeout(() => {
            shuffleCards();
            shuffleLock = false;
        }, 600);
    }
}


// Premier script basé sur l'utilisation du Z-index (manquait le reset et pas d'animation de retournement de carte)

// let cards = [...document.querySelectorAll('.card')];
// const cardsImgs = [...document.querySelectorAll('.card img')];
// const textInfo = document.querySelector('.text-info');
// const counter = document.querySelector('.counter span');
// const arrFruits = ['apple', 'banana', 'brocoli', 'cherry', 'pepper', 'straw'];
// const questionPic = "ressources/question.svg";

// let randCard;
// let prevImg = "";
// let turnCounter = 0;
// let pairsFound = 0;

// // Pour chaque fruit du tableau
// arrFruits.forEach(fruit => {
//     for (i = 0; i <= 1; i++) {
//         // Création d'une paire d'image
//         const imgFruit = document.createElement('img');
//         imgFruit.src = `ressources/${fruit}.svg`;
//         imgFruit.alt = `${fruit} image`;
//         imgFruit.className = "picture";
//         imgFruit.style.zIndex = "-1";

//         // Association de chaque image à une carte aléatoire du jeu
//         randCard = cards[Math.floor(Math.random() * cards.length)];
//         randCard.appendChild(imgFruit);
//         cards.splice(cards.indexOf(randCard), 1);

//         imgFruit.addEventListener('click', (e) => handleCard(e));
//     }
// });

// cardsImgs.forEach(element => {
//     element.addEventListener('click', (e) => handleCard(e))
// })

// function handleCard(e) {
//     const cardImg = e.target;
//     const fruitImg = e.target.nextElementSibling;

//     // Clique-t-on sur une carte déjà retournée ?
//     if (cardImg.src.indexOf('question') === -1) {
//         return;
//     } else {
//         showPicture(cardImg);
//     }

//     // Est-ce qu'une première image est déjà retournée ?
//     if (prevImg) {
//         // Oui
//         // Les 2 images sont elles les mêmes ?
//         if (fruitImg.src === prevImg.src) {
//             // Oui, on incrémente le compteur de paires
//             pairsFound++;
//             console.log(pairsFound);
//             if (pairsFound === 6) {
//                 textInfo.textContent = 'Bravo ! Appuyez sur "espace" pour relancer une partie.';

//                 window.addEventListener('keydown', function (e) {
//                     if (e.key === " ") {
//                         resetGame();
//                     }
//                 });
//             }
//         } else {
//             // Non, On retourne les 2 cartes
//             setTimeout(showPicture, 1000, prevImg);
//             setTimeout(showPicture, 1000, fruitImg);
//         }
//         prevImg = "";
//         incrementCounter();
//     } else {
//         // Non
//         prevImg = e.target.nextElementSibling;
//     }
// }

// function showPicture(element) {

//     element.style.zIndex = "-1";
//     if (element.nextElementSibling) {
//         element.nextElementSibling.style.zIndex = "1";
//     } else {
//         element.previousElementSibling.style.zIndex = "1";
//     }
// }

// function incrementCounter() {
//     turnCounter++;
//     counter.textContent = turnCounter;
// }

// function resetGame() {
//     cards = [...document.querySelectorAll('.card')];
//     cards.forEach(element => {
//         element.childNodes.forEach(img => {
//             console.log(img.src.indexOf('question'));
//             if (img.src.indexOf('question') !== -1) {
//                 img.style.zIndex = "0";
//             } else {
//                 img.style.zIndex = "-1";
//             }
//         })
//     });

//     textInfo.textContent = "Tentez de gagner avec le moins d'essais possible";
//     counter.textContent = 0;
// }

