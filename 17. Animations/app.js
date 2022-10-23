const heroTitle = document.querySelector('h1');
const heroSubtitle = document.querySelector('.hero-subtitle');
const arrowBtn = document.querySelector('.down-arrow-btn');
const caret = document.querySelector('.caret');
const text = "Porsche, set free.";
text.replace(' ', "&#32");
let speed = 200;
let index = 0;

// Si le H1 n'est pas vide, on efface le contenu texte
if(heroTitle.firstChild.data) {
    heroTitle.firstChild.remove();
}

// Animation Typing
function typeWriter() {
    console.log(text, index);
    // Selon l'index i, apparition du subtitle et du bouton
    if (index === 3) {
        heroSubtitle.classList.add('fade-in');
    }
    if (index === 6) {
        arrowBtn.classList.add('fade-in');
    }
    // L'index i est-il inférieur à la longueur totale de la string à afficher
    if (index < text.length) {
        // Retrait du curseur
        caret.remove();
        // Insertion de la lettre courante
        heroTitle.innerHTML = `${heroTitle.innerHTML}${text.charAt(index)}`;
        // Retour du curseur
        heroTitle.appendChild(caret);
        // Incrémentation du compteur de lettres et rappel de la fonction
        index++;
        setTimeout(typeWriter, speed);
    }
}

window.onload = setTimeout(typeWriter, 1000);
// window.onload = typeWriter();

// Curseur personnalisé
const customCursor = document.querySelector('.custom-cursor');
// On écoute le mouvement de souris
window.addEventListener('mousemove', HandleCursor);
// Le curseur personnalisé prendra pour valeur de translation X et Y les coordonnées du pointeur de la souris
function HandleCursor(e) {
    customCursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
}

// Observeur de scroll section Experience
const sectExp = document.querySelector('.sect-experience-content');
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
}

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
            // À l'intersection, ajout de la classe qui "lancera" l'animation
        if (entry.isIntersecting) {
            sectExp.classList.add('opacity-anim');
        }
    })
}, options);

observer.observe(sectExp);

// Observeur de scroll section Models
// On récupère les modèles à animer
const sectModels = document.querySelectorAll('.sect-models-content');
// Pour chacun, mise en place d'un Intersection Observer
sectModels.forEach((sectModel) => {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // À l'intersection, ajout de la classe qui "lancera" l'animation
            if (entry.isIntersecting) {
                sectModel.classList.add('slide-anim');
            }
        })
    }, {threshold: 0.5});
    observer.observe(sectModel);
})

