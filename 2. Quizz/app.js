const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];
const comments = {
    0: `👎 Peut mieux faire ! 👎`,
    1: `😭 Peut mieux faire ! 😭`,
    2: `👀 Il reste quelques erreurs. 😭`,
    3: `✨ Encore un effort ... 👀`,
    4: `✨ Vous y êtes presque ! ✨`,
    5: `✔️ Bravo, c'est un sans faute ! ✔️`
};

const form = document.querySelector('form');

form.addEventListener('submit', handleForm);

function handleForm(e) {
    e.preventDefault();

    calculateMark();
}

function calculateMark() {

    const inputs = document.querySelectorAll('input:checked');
    let mark = 0;
    const rightColor = "linear-gradient(to right, #a8ff78, #78ffd6)";
    const wrongColor = "linear-gradient(to right, #f5567b, #fd674c)";

    // Affichage d'un message d'erreur si l'utilisateur n'a pas répondu à toutes les questions.
    if (inputs.length < 5) {
        showErrorMessage();
        return;
    }

    // Test comparatif des réponses et changement de couleur du background de la question
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value === responses[i]) {
            mark++;
            inputs[i].parentElement.parentElement.style.backgroundImage = `${rightColor}`;
        } else {
            inputs[i].parentElement.parentElement.style.backgroundImage = `${wrongColor}`;
        }
    }

    showResult(mark);
}

function showErrorMessage() {

    const info = document.querySelector('.info');
    info.innerHTML = "Vous n'avez pas répondu à toutes les questions. Vérifiez vos réponses et re-validez.";
    info.style.color = "red";
    info.style.fontWeight = 500;
};

function showResult(mark) {

    // Affichage dynamique du résultat et commentaire
    const info = document.querySelector('.info');
    const score = document.createElement('p');
    const scoreTxt = `Score : <span>${mark} / 5</span>`;
    const comment = document.createElement('p');
    const commentTxt = comments[`${mark}`];
    const tip = document.createElement('p');
    const tipTxt = "Retentez une autre réponse dans les cases rouges, puis re-validez !";

    info.innerHTML = "";
    info.style.color = "#000";
    info.style.fontWeight = 400;
    score.innerHTML = scoreTxt;
    comment.textContent = commentTxt;
    tip.textContent = tipTxt;
    info.appendChild(comment);
    info.appendChild(score);
    info.appendChild(tip);
};

// Retour au background par défaut lors du cochage d'un input radio.
form.addEventListener('input', resetBackground);

function resetBackground(e) {
    e.target.parentElement.parentElement.style.background = "#f1f1f1";
};