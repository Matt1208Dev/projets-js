const prevButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
const sliderItems = [...document.querySelectorAll('.slider-item')];
let index = 0;
// lock rendra incatif les boutons le temps de l'animation
let lock = false;

prevButton.addEventListener('click', handleSlider);
nextButton.addEventListener('click', handleSlider);

// Gestion des clics sur "précédent" et "suivant"
function handleSlider(e) {

    if(lock) {
        return;
    }

    lock = true; 

    // clic sur le bouton previous/précédent
    if (e.target === prevButton) {
        
        // décrémentation de l'index
        index--;

        // gestion de l'index qui "sort" de l'intervalle du tableau
        if (index < 0) {
            index = sliderItems.length - 1;
        }

        // retrait des classes de transitions et d'affichage des éléments
        sliderItems.forEach(item => {
            item.classList.remove('slide-out-left', 'slide-in-left', 'slide-out-right', 'slide-in-right', 'active');
        })

        // transition et affichage de l'élément "entrant"
        sliderItems[index].classList.add('slide-in-left', 'active');

        // transitions de l'élément "sortant"
        if (index + 1 > sliderItems.length - 1) {
            sliderItems[0].classList.add('slide-out-left');
        } else {
            sliderItems[index + 1].classList.add('slide-out-left');
        }
    // clic sur le bouton next/suivant
    } else if (e.target === nextButton) {

        index++;

        if (index > sliderItems.length - 1) {
            index = 0;
        }

        sliderItems.forEach(item => {
            item.classList.remove('slide-out-right', 'slide-in-right', 'slide-out-left', 'slide-in-left', 'slide-in-left', 'active');
        })

        sliderItems[index].classList.add('slide-in-right', 'active');

        if (index - 1 < 0) {
            sliderItems[sliderItems.length - 1].classList.add('slide-out-right');
        } else {
            sliderItems[index - 1].classList.add('slide-out-right');
        }
    }

    setTimeout(() => {
        lock = false;
    }, 400);
}
