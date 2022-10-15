let currentGame = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let currentPlayer = 'x';

const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.info-txt');

// Remise à O du jeu
function resetGame() {
    // On réinitialise les variables
    currentGame = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 'x';
    cells.forEach((cell, index) => {
        // On efface le contenu des cellules
        cell.textContent = "";
        // On redonne la possibilité de cliquer sur les cellules
        cell.addEventListener('click', tickACell);
    })
    displayPlayerTurn();
}

// Clic sur une celluke
function tickACell(e) {
    let cell = e.target;
    let symbol = document.createElement('i');

    // On détermine le symbol à afficher en fonction du joueur
    if (currentPlayer === 'x') {
        symbol.classList.add('fa-solid', 'fa-xmark');
    } else if (currentPlayer === 'o') {
        symbol.classList.add('fa-regular', 'fa-circle');
    }

    cell.appendChild(symbol);
    // On met à jour le tableau d'analyse de la partie
    currentGame[cell.dataset.index] = currentPlayer;

    // Si le jeu n'est pas fini
    if (!checkEndOfGame()) {
        // On change de joueur
        switchPlayer();
        // On avertit par un message
        displayPlayerTurn();
    }

    // On désactive la cellule cliquée
    cell.removeEventListener('click', tickACell);
}

function switchPlayer() {
    if (currentPlayer === 'x') {
        currentPlayer = 'o';
        return;
    }
    currentPlayer = 'x';
}

// Affichage du tour en cours
function displayPlayerTurn() {
    message.textContent = `Au tour de ${currentPlayer.toUpperCase()} de jouer`;
}

function checkEndOfGame() {
    let allX = [];
    let allY = [];
    let winner;

    // On récupère les index des cases choisies par chaque joueur et les plaçons dans 2 tableaux
    for (const index in currentGame) {
        if (currentGame[index] === 'x') {
            allX.push(parseInt(index));
        } else if (currentGame[index] === 'o') {
            allY.push(parseInt(index));
        }
    }

    // On concatène le tableau de chaque joueur avec chaque combinaisons gagnantes et on vérifie si l'on trouve 3 doublons signifiant la victoire
    for (const winComb of winningCombinations) {
        if (findDuplicates(winComb.concat(allX))) {
            winner = "X";
            break;
        } else if (findDuplicates(winComb.concat(allY))) {
            winner = "O";
            break;
            // Si pas de combinaison gagnante, on verifie si toutes les cellules ont été cliquées
        } else if (isGridFull()) {
            winner = "no";
        }
    }

    // Un gagnant est trouvé
    if (winner) {
        // On fige la grille, en la rendant non cliquable
        cells.forEach((cell, index) => {
            cell.removeEventListener('click', tickACell);
        })
        // Message de félicitations au vainqueur ou annonce de l'égalité
        congratulate(winner);
        // Possibilité de reset le jeu via la touche espace
        document.addEventListener('keydown', handleKeyboard);
        return true;
    } else {
        return false;
    }
}

// Trouver des doublons dans un tableau donné
function findDuplicates(arr) {
    const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);
    // Si longueur du tableau obtenu = 3 -> combinaison gagnante
    if (duplicates.length === 3) {
        return true;
    } else {
        return false;
    }
}

function isGridFull() {
    // On contrôle que toutes les valeurs de currentGame ne sont pas vides
    return currentGame.every((cell) => cell !== "");
}

// Message de félicitations au gagnant ou annonce d'une égalité
function congratulate(player) {
    if (player === "no") {
        message.innerText = `Pas de gagnant pour cette partie !
        Appuyez sur F5 pour recommencer.`;
        return;
    }

    message.innerText = `Le joueur ${player} gagne la partie ! 
    Appuyez sur espace pour relancer une partie.`;
}

// Appui touche espace en fin de partie => reset du jeu
function handleKeyboard(e) {
    e.preventDefault();
    if (e.code === "Space") {
        resetGame();
        document.removeEventListener('keydown', handleKeyboard);
    }
}

window.onload = resetGame();
