let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

let lapStartTime = 0;
let lapNumber = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function startStopwatch() {

    if (timerInterval !== null) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    lapStartTime = Date.now() - lapStartTime;

    timerInterval = setInterval(updateDisplay, 10);
}

function pauseStopwatch() {

    if (timerInterval === null) {
        return;
    }

    elapsedTime = Date.now() - startTime;

    clearInterval(timerInterval);
    timerInterval = null;
}

function resetStopwatch() {

    clearInterval(timerInterval);

    timerInterval = null;

    startTime = 0;
    elapsedTime = 0;
    lapStartTime = 0;
    lapNumber = 0;

    display.textContent = "00:00:00";

    laps.innerHTML = `
        <li class="empty">No laps recorded yet</li>
    `;
}

function updateDisplay() {

    elapsedTime = Date.now() - startTime;

    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {

    let milliseconds = Math.floor((time % 1000) / 10);

    let totalSeconds = Math.floor(time / 1000);

    let seconds = totalSeconds % 60;

    let totalMinutes = Math.floor(totalSeconds / 60);

    let minutes = totalMinutes % 60;

    let hours = Math.floor(totalMinutes / 60);

    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
    );
}

function recordLap() {

    if (timerInterval === null) {
        return;
    }

    lapNumber++;

    let currentTime = Date.now();

    let lapTime = currentTime - lapStartTime;

    lapStartTime = currentTime;

    const emptyMessage = document.querySelector(".empty");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <span>${formatTime(lapTime)}</span>
    `;

    laps.prepend(li);
}