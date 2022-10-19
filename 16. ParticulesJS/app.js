// On récupère l'élément canvas
const canvas = document.querySelector('#particules');
// On récupère le contexte "2d" afin de pouvoir utiliser les méthodes rattachées 
const ctx = canvas.getContext('2d');

// On défini les dimensions du canvas sur les dimensions de la fenêtre du navigateur
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', handleResize);

function handleResize() {
    // On réassocie les nouvelles dimensions de la fenêtre au canvas
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    // On relance le calcul du nombre de particules à afficher et leur instanciation
    init();
}

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; // Position sur l'axe X
        this.y = y; // Position sur l'axe Y
        this.directionX = directionX; // Coordonnée direction de déplacement sur l'axe X
        this.directionY = directionY; // Coordonnée direction de déplacement sur l'axe Y
        this.size = size; // Taille de la particule
        this.color = color; // Couleur de la particule
    }

    draw() {
        // On commence le trajet
        ctx.beginPath();
        // On paramètre le cercle (particule) avec ses coordonnées, le rayon, dégré de départ et de fin
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Couleur de remplissage
        ctx.fillStyle = this.color;
        // Fin de trajet / Lancement du dessin
        ctx.fill();
    }

    update() {
        // La particule dépasse les bords gauche ou droite du canvas
        if (this.x > canvas.width || this.x < 0) {
            // On inverse la valeur de la coordonnée
            this.directionX = -this.directionX;
        }
        // La particule dépasse les bords haut ou bas du canvas
        else if (this.y > canvas.height || this.y < 0) {
            // On inverse la valeur de la coordonnée
            this.directionY = -this.directionY;
        }
        // On ajoute les valeurs de directionX et directionY à x et y pour orienter le déplacement
        this.x += this.directionX;  
        this.y += this.directionY;
        // On dessine
        this.draw();  
    }

}

let particlesArray;

function init() {
    // Tableau accueillant toutes les particules instanciées à partir de valeurs aléatoires
    particlesArray = [];

    // Nombres de particules à instancier. Calcul arbitraire (pour approcher du résultat de la librairie particles.js)
    const numberOfParticles = (canvas.height * canvas.width) / 9000;

    // Boucle de création des particules
    for (let i = 0; i < numberOfParticles; i++) {
        // Taille en px [1; 3[
        const size = (Math.random() * 2) + 1
        // Positions de départ avec décalage de 10px pour éviter des bugs d'immobilité à l'apparition / Pseudo-padding
        const x = Math.random() * ((innerWidth - 10) - 10 + 1) + 10;
        const y = Math.random() * ((innerHeight - 10) - 10 + 1) + 10;

        // On génère les valeurs de directionX et directionY
        const directionX = cleanDirection();
        const directionY = cleanDirection();

        // On ajoute à notre tableau la particule instanciée à partir des valeurs obtenues
        particlesArray.push(new Particle(x, y, directionX, directionY, size, "#f1f1f1"));
    }
}

init();

function cleanDirection() {
    // Tirage aléatoire entre 0 et 1
    const random = Math.trunc(Math.random() * 2);
    // Si 1
    if(random) {
        // Valeur positive sur [0.5;1.5[
        return (Math.random() * 1) + 0.5;
    // Si 0
    } else {
        // Valeur négative sur ]-1.5;-0.5]
            return (Math.random() * -1) - 0.5;
    }
}

function animate() {
    // On efface l'affichage de tout le canvas
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // On met à jour les coordonnées de chaque particule
    for (let i = 0; i< particlesArray.length; i++) {
        particlesArray[i].update();
    }
    // Création et affichage des connexions entre particules 
    connect();
    // On relance en boucle animate pour apporter une fluidité à l'animation
    requestAnimationFrame(animate);
}
animate();

function connect() {
    // On calcule la distance entre chaque particule et toutes les autres avec le théorême de Pythagore (hyp^2 = A^2 + B^2)
    // On calculera la distance (hypoténuse) via les coordonnées i.x i.y et j.x et j.y
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const squaredDistanceX = (particlesArray[i].x - particlesArray[j].x) * (particlesArray[i].x - particlesArray[j].x);
            const squaredDistanceY = (particlesArray[i].y - particlesArray[j].y) * (particlesArray[i].y - particlesArray[j].y);
            const hypotenuse = squaredDistanceX + squaredDistanceY;

            // Plus la distance (hypoténuse) est petite, plus l'opacité sera importante
            // Plus la distance se rapproche de 135px(valeur arbitraire), plus l'opacité baisse jusqu'à disparaître
            if (hypotenuse < (135 *135)) {
                ctx.strokeStyle = `rgba(240, 240, 240, ${1 - hypotenuse / (135 *135)})`;
                // Epaisseur du trait
                ctx.lineWidth = 0.4;
                // Début du trajet
                ctx.beginPath();
                // Point de départ
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                // Point d'arrivée
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                // Traçage du trait sur le canvas
                ctx.stroke();
            }
        }
    }
}