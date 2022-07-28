const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];
const comments = {
    1: "Très médiocre",
    2: "Médiocre",
    3: "Moyen",
    4: "Bon",
    5: "Excellent"
};

const form = document.querySelector('form');

form.addEventListener('submit', handleForm);

function handleForm(e){
    e.preventDefault();

    calculateMark();
}

function calculateMark() {

    const inputs = document.querySelectorAll('input:checked');
    const arrChoices = [];
    let mark = 0;

    for (i = 0; i < inputs.length; i++) {
        arrChoices.push(inputs[i].value);
    }

    for (i = 0; i < inputs.length; i++) {
        if (arrChoices[i] === responses[i]) {
            mark++;
        }
    }

    const info = document.querySelector('.info');
    const score = document.createElement('p');
    const scoreTxt = `Score : ${mark} / 5`;
    const comment = document.createElement('p');
    const commentTxt = comments[`${mark}`];
    const tip = document.createElement('p');
    const tipTxt = "Retentez une autre réponse dans les cases rouges, puis re-validez !";

    info.innerHTML = "";
    score.textContent = scoreTxt;
    comment.textContent = commentTxt;
    tip.textContent = tipTxt;
    info.appendChild(comment);
    info.appendChild(score);
    info.appendChild(tip);

}