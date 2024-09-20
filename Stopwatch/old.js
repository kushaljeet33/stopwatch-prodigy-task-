// script.js
let startTime, updatedTime, difference, tInterval, running = false;
let pausedTime = 0; // Track the paused duration
let lapCounter = 1;
let timeDisplay = document.getElementById('time');
let lapList = document.getElementById('lapList');

function startTimer() {
    if (!running) {
        running = true;
        if (!pausedTime) {
            startTime = new Date().getTime();
        } else {
            startTime = new Date().getTime() - pausedTime;
            pausedTime = 0;
        }
        tInterval = setInterval(getShowTime, 1);
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(tInterval);
        pausedTime = new Date().getTime() - startTime; // Calculate the elapsed time
    }
}

function resetTimer() {
    running = false;
    clearInterval(tInterval);
    timeDisplay.innerHTML = "00:00:00";
    lapList.innerHTML = '';
    lapCounter = 1;
    pausedTime = 0; // Reset paused time
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.innerHTML = hours + ":" + minutes + ":" + seconds;
}

function addLap() {
    if (running) {
        let lapTime = timeDisplay.innerHTML;
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapItem.style.color = '#00ff99'; // Neon green color for lap times
        lapItem.style.textShadow = '0 0 5px #00ff99, 0 0 10px #00ff99'; // Glowing effect
        lapList.appendChild(lapItem);
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', addLap);
