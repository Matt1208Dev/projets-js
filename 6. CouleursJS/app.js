
// Déclaration des variables
const gradientGenerator  = document.querySelector('.gradient-generator');
const firstColorInput = document.getElementById('color-1');
const secondColorInput = document.getElementById('color-2');
const degreeInfo = document.getElementById('info');
const degreeValueInput = document.getElementById('range');
const btnCopy = document.getElementById('btn-copy');
const btnRandom = document.getElementById('btn-random');

// MAJ de la valeur des labels quand une nouvelle couleur est sélectionnée
firstColorInput.addEventListener('input', (e) => {
    e.target.nextElementSibling.innerText = e.target.value;
    createGradient();
})

secondColorInput.addEventListener('input', (e) => {
    e.target.nextElementSibling.innerText = e.target.value;
    createGradient();
})

// MAJ de l'indicateur d'orientation quand nouvelle valeur est sélectionnée
degreeValueInput.addEventListener('input', (e) => {
    degreeInfo.innerText = `Orientation: ${e.target.value}°`;
    createGradient();
})

function createGradient() {
    // Application du linear-gradient à la propriété background du body
    document.body.style.background = `linear-gradient(${degreeValueInput.value}deg, ${firstColorInput.value}, ${secondColorInput.value})`;

    // Application de la couleur selectionnée à la propriété background des inputs
    firstColorInput.style.background = firstColorInput.value;

    secondColorInput.style.background = secondColorInput.value;
}

// Copie dans le presse-papier
btnCopy.addEventListener('click', copyClipboard);

function copyClipboard() {
    // Texte à copier
    const text = `background: linear-gradient(${degreeValueInput.value}deg, ${firstColorInput.value}, ${secondColorInput.value});`;

    // Copie dans le presse-papier
    navigator.clipboard.writeText(text)
    .then(() => 
        displayMessage("Copié !")
    , () => displayMessage("Échec ! Réésayez."));
}

// Message d'info complémentaire à la fonction copyClipboard
function displayMessage(message) {
    const txtInfo = document.createElement('p');
    txtInfo.className = "text-info";
    txtInfo.textContent = message;
    gradientGenerator.appendChild(txtInfo);
    setTimeout(() => txtInfo.remove(), 3000);
}

btnRandom.addEventListener('click', randomBackground);

function randomBackground() {
    // Génération d'une valeur hexadécimal aléatoire pour les inputs
    firstColorInput.value = randomHexaNumber();
    secondColorInput.value = randomHexaNumber();

    // Changement de la valeur du label avec la nouvelle valeur
    firstColorInput.nextElementSibling.textContent = firstColorInput.value;
    secondColorInput.nextElementSibling.textContent = secondColorInput.value;

    // Génération du background
    createGradient();
}

function randomHexaNumber() {
    // Génération d'un nombre aléatoire, transformation en string en base 16 (système numérique hexadécimal), puis découpe de la string pour ne récupérer que 6 caractères
    return `#${Math.random()
.toString(16).slice(2,8)}`
}

// Génération d'un background aléatoire au chargement de la page
window.onload = randomBackground();