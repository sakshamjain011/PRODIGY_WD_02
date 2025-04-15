let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateDisplay() {
    const hrs = String(hours).padStart(2, '0');
    const mins = String(minutes).padStart(2, '0');
    const secs = String(seconds).padStart(2, '0');
    display.textContent = `${hrs}:${mins}:${secs}`;
}

function startStopwatch() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        updateDisplay();
    }, 1000);
    startStopButton.textContent = 'Stop';
    isRunning = true;
}

function stopStopwatch() {
    clearInterval(timer);
    startStopButton.textContent = 'Start';
    isRunning = false;
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    seconds = minutes = hours = 0;
    updateDisplay();
    lapsList.innerHTML = '';
    startStopButton.textContent = 'Start';
    isRunning = false;
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
});
