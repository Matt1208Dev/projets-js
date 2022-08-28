
// Un clic sur le bouton "play" déclenche le minuteur de 30 minutes.
const work = document.querySelector('.work-timer p');
const rest = document.querySelector('.rest-timer p');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const cycleCounter = document.querySelector('.cycle-counter span');

const workLoading = document.querySelector('.work-timer h2');
const restLoading = document.querySelector('.rest-timer h2');

const timerOptions = {
    minutes: 00,
    seconds: 05,
    timer: "work"
}
let pomodoro;

// Lancement du Pomodoro
startBtn.addEventListener('click', () => {

    launchTimer(timerOptions.timer, timerOptions.minutes, timerOptions.seconds);

    // Le bouton play laisse sa place à un bouton pause
    startBtn.style.display = "none";
    pauseBtn.style.display = "inline";
}
);

function launchTimer(timer, minutes, seconds) {

    pomodoro = setInterval(() => {
        rest.innerText = formatTime(5, 0);
        handleLoading(timer);
        seconds--;
        if (seconds <= 0) {
            seconds = 59;
            minutes--;
        }

        if (minutes < 0) {
            minutes = 0;
            seconds = 0;

            // Quand le minuteur de 30min arrive à 00:00, il déclenche le minuteur de repos de 5min.
            if (timer === "work") {
                work.innerText = formatTime(minutes, seconds);
                timer = "rest";
                minutes = 0;
                seconds = 05;
            } else
                // Quand le minuteur de 5min arrive à 00:00, on incrémente le compteur de cycle de 1.
                if (timer === "rest") {
                    rest.innerText = formatTime(minutes, seconds);
                    minutes = 00;
                    seconds = 05;
                    timer = "work";
                    incrementCycle();
                }
        }

        if (timer === "work") {
            work.innerText = formatTime(minutes, seconds);
        }

        if (timer === "rest") {
            rest.innerText = formatTime(minutes, seconds);
        }

    }, 1000, minutes, seconds);

    // Mise en pause
    pauseBtn.addEventListener('click', () => {
        // Réaffichage du bouton play
        pauseBtn.style.display = "none";
        startBtn.style.display = "inline";
        // un clic sur le bouton pause stoppe et met en suspens le minuteur en cours d'exécution.
        clearInterval(pomodoro);
        timerOptions.minutes = minutes;
        timerOptions.seconds = seconds;
        timerOptions.timer = timer;
    })

    // un clic sur le bouton reset réinitialise le compteur de cycle et remet les minuteur à l'arrêt et à leur valeur de temps initiale.
    const resetBtn = document.querySelector('.btn-reset');
    resetBtn.addEventListener('click', reset)
}

// Animation du timer courant
function handleLoading(timer) {
    if(timer === "work") {
        workLoading.classList.add('active');
        restLoading.classList.remove('active');
    } else
    if(timer === "rest") {
        restLoading.classList.add('active');
        workLoading.classList.remove('active');
    } else {
        restLoading.classList.remove('active');
        workLoading.classList.remove('active');
    }
}

// Réinitialisation
function reset() {
    // Réaffichage du bouton play
    pauseBtn.style.display = "none";
    startBtn.style.display = "inline";
    cycleCounter.innerText = "0";
    clearInterval(pomodoro);
    timerOptions.minutes = 30;
    timerOptions.seconds = 0;
    timerOptions.timer = "";
    handleLoading(timerOptions.timer);
    timerOptions.timer = "work";

    work.innerText = formatTime(timerOptions.minutes, timerOptions.seconds);
    rest.innerText = formatTime(5, 0);
}

function formatTime(minutes, seconds) {
    return `${minutes % 60 < 10 ? `0${minutes}` : minutes}:${seconds % 60 < 10 ? `0${seconds}` : seconds}`;
}

function incrementCycle() {
    let cycleNumber = parseInt(cycleCounter.innerText);
    cycleNumber++;
    cycleCounter.innerText = cycleNumber;
}