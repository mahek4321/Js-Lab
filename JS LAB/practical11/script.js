import {formatSeconds} from './timer.js';
let intervalId;
let timeoutId;
function clearTimers() { clearInterval(intervalId); clearTimeout(timeoutId); }
const output = document.getElementById('output');
const countdown = document.getElementById('countdown');
document.getElementById('timerForm').onsubmit = function(event) {
    event.preventDefault();
    const seconds = Number(document.getElementById('seconds').value);
    if (!Number.isInteger(seconds) || seconds < 1 || seconds > 3600) {
        output.textContent = 'Enter a whole duration from 1 to 3600 seconds.'; return;
    }
    clearTimers(); // prevent overlapping timers on repeated Start
    const endTime = Date.now() + seconds * 1000;
    function update() {
        const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        countdown.textContent = formatSeconds(remaining);
    }
    update();
    output.textContent = 'Countdown running';
    intervalId = setInterval(update, 1000); // repeated updates
    timeoutId = setTimeout(function() { // one-time completion
        clearTimers();
        countdown.textContent = '00:00';
        output.textContent = 'Time is up!';
    }, seconds * 1000);
};
document.getElementById('stop').onclick = function() { clearTimers(); output.textContent = 'Stopped'; };
window.addEventListener('beforeunload', clearTimers);
