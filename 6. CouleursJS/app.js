
// Déclaration des variables
const gradientGenerator = document.querySelector('.gradient-generator');
const firstColorInput = document.getElementById('color-1');
const secondColorInput = document.getElementById('color-2');
const degreeInfo = document.getElementById('info');
const degreeValueInput = document.getElementById('range');
const btnCopy = document.getElementById('btn-copy');
const btnRandom = document.getElementById('btn-random');

const labels = [...document.querySelectorAll('.color-label')];

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

    adaptLabelColorFont();
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
// Ajout d'une variable lock pour empêcher l'affichage excessif de messages.
let lock = false;
function displayMessage(message) {
    if (lock) {
        return;
    }
    lock = true;
    const txtInfo = document.createElement('p');
    txtInfo.className = "text-info";
    txtInfo.textContent = message;
    gradientGenerator.appendChild(txtInfo);
    setTimeout(() => {
        txtInfo.remove();
        lock = false;
    }, 3000);
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
        .toString(16).slice(2, 8)}`
}

// Adaptation de la couleur de la font du label en fonction de la luminance du background
function adaptLabelColorFont() {
    labels.forEach(label => {
        // Récupération des valeurs hexadécimal et conversion en valeur RGB
        const hexaColor = label.innerText.replace('#', '');
        const red = parseInt(hexaColor.slice(0, 2), 16);
        const green = parseInt(hexaColor.slice(2, 4), 16);
        const blue = parseInt(hexaColor.slice(4, 6), 16);

        // Calcul du YIQ, indice de luminance
        const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

        // Changement de couleur de la font en fonction du résultat
        if (yiq >= 128) {
            label.style.color = "#000000";
        } else {
            label.style.color = "#f1f1f1";
        }

    });
}
// Génération d'un background aléatoire au chargement de la page
window.onload = randomBackground();