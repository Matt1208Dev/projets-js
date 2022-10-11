const videoContainer = document.getElementById('videoContainer');
const video = document.getElementById('video');
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress-bar');
const playPauseBtn = document.querySelector('#play-pause');
const muteUnmuteBtn = document.querySelector('#mute');
const volumeBar = document.querySelector('#vol-bar');
const time = document.querySelector('#time');
const fullScreenBtn = document.querySelector('#full-screen');

// Lecture/pause
playPauseBtn.addEventListener('click', playPause);
video.addEventListener('click', playPause);
function playPause() {
    // Toggle d'image play/pause
    if (playPauseBtn.src.includes('play')) {
        playPauseBtn.src = 'ressources/pause.svg';
    } else {
        playPauseBtn.src = 'ressources/play.svg';
    }
    // Mise en lecture/pause
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
}

// Mode muet actif/inactif
muteUnmuteBtn.addEventListener('click', muteUnmute);
function muteUnmute() {
    // Toggle d'image muet/actif
    if (muteUnmuteBtn.src.includes('unmute')) {
        muteUnmuteBtn.src = 'ressources/mute.svg';
    } else {
        muteUnmuteBtn.src = 'ressources/unmute.svg';
    }
    // Mutage de la vidéo
    video.muted = !video.muted;
}

// Gestion du volume
volumeBar.addEventListener('input', handleVolume);
function handleVolume(e) {
    // Niveau de volume = valeur récupérée dans l'input
    video.volume = e.target.value;
    if (video.volume === 0) {
        muteUnmuteBtn.src = 'ressources/mute.svg';
    } else {
        muteUnmuteBtn.src = 'ressources/unmute.svg';
    }
}

// Remplissage de la barre de progression
video.addEventListener('timeupdate', manageTime);

// Gestion du temps
function manageTime() {
    fillProgressBar();
    showTimeInfos();

    // Changement d'icône mute si le volume est au minimum
    if (video.ended) {
        playPauseBtn.src = 'ressources/play.svg';
        // progress.value = 0;
        video.currentTime = 0;
    }
}

// Remplissage de la barre de progression
function fillProgressBar() {
    let progressBarWidth = video.currentTime / video.duration;
    progressBar.style.transform = `scaleX(${progressBarWidth})`;
}

// Affichage du temps
function showTimeInfos() {
    time.textContent = `${getTime(video.currentTime)} / ${getTime(video.duration)}`;
}

// Formatage du temps
function getTime(timeInSeconds) {
    dateObj = new Date(Math.floor(timeInSeconds) * 1000);
    hours = dateObj.getUTCHours();
    minutes = dateObj.getUTCMinutes();
    seconds = dateObj.getSeconds();

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Cliquer sur la timeline de la vidéo
progress.addEventListener('click', skipAhead);
function skipAhead(e) {
    // Récupération des infos de positionnement de progress sur la page    
    const rect = progressBar.getBoundingClientRect();
    // pos = distance en px entre point 0 et point cliqué de progress / distance totale
    const pos = (e.pageX - rect.left) / progressBar.offsetWidth;
    // On multiplie le ratio obtenu à la longueur totale de la vidéo
    video.currentTime = pos * video.duration;
}

// Gestion du plein écran
video.addEventListener('dblclick', handleFullscreen);
fullScreenBtn.addEventListener('click', handleFullscreen);
function handleFullscreen(e) {
    // Compatibilité fullscreen Safari
    if (document.webkitFullscreenEnabled) {
        if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
        } else {
            videoContainer.webkitRequestFullscreen();
        }
        return;
    }

    // Si un élément est déjà en plein écran
    if (document.fullscreenElement) {
        // On sort du plein écran
        document.exitFullscreen();
    } else {
        // On passe l'élément en plein écran
        videoContainer.requestFullscreen();
    }
}
