const APIEndpoint = "http://api.quotable.io/random";
const time = document.querySelector('.time');
let timeMax = 60;

function timer() {
    let remainingTime = setInterval(() => {
        timeMax--;
        time.textContent = timeMax;
        if (timeMax === 0) {
            clearInterval(remainingTime);
        }
    }, 1000);
}
timer();