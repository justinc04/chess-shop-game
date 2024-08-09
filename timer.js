let timeLabels = document.querySelectorAll(".time");

const clockTime = 900;
const increment = 5;
let clockRunning = false;

let whiteTime = clockTime;
let blackTime = clockTime;

let interval;

export function renderStartTime() {
  renderTime(1, clockTime);
  renderTime(2, clockTime);
}

export function runTimer(player) {
  interval = setInterval(() => setTime(player), 1000);
}

export function stopTimer(player) {
  if (player === 1 && whiteTime > 0) {
    whiteTime += increment;
    renderTime(player, whiteTime);
  }
  else if (player === 2 && blackTime > 0) {
    blackTime += increment;
    renderTime(player, blackTime);
  }

  clearInterval(interval);
}

export function toggleTimer(player) {
  if (clockRunning) {
    clearInterval(interval);
    document.querySelectorAll('.player').forEach(button => button.disabled = true);
  }
  else {
    runTimer(player);
    document.getElementById(player === 1 ? 'white' : 'black').disabled = false;
  }

  document.getElementById('play').innerHTML = document.getElementById('play').innerHTML === 'Play'
    ? 'Pause'
    : 'Play';
  clockRunning = !clockRunning;
}

function setTime(player) {
  let time;

  if (player === 1) {
    time = Math.max(--whiteTime, 0);
  }
  else {
    time = Math.max(--blackTime, 0);
  }

  renderTime(player, time);
}

function renderTime(player, time) {
  timeLabels[player - 1].innerHTML = `${pad(parseInt(time / 60))}:${pad(time % 60)}`;
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
