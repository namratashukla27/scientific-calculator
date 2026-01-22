const display = document.getElementById("display");
const sound = document.getElementById("clickSound");
const themeBtn = document.getElementById("themeToggle");
const degBtn = document.getElementById("degToggle");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

let isDegree = true;
let history = [];

/* ===============================
   MOBILE AUDIO UNLOCK FIX
================================ */
let audioUnlocked = false;

document.body.addEventListener(
  "touchstart",
  () => {
    if (!audioUnlocked && sound) {
      sound.play()
        .then(() => {
          sound.pause();
          sound.currentTime = 0;
          audioUnlocked = true;
        })
        .catch(() => {});
    }
  },
  { once: true }
);

/* ===============================
   SOUND FUNCTION
================================ */
function playSound() {
  if (sound && audioUnlocked) {
    sound.currentTime = 0;
    sound.play();
  }
}

/* ===============================
   DISPLAY FUNCTIONS
================================ */
function append(value) {
  playSound();
  display.value += value;
}

function clearAll() {
  playSound();
  display.value = "";
}

function del() {
  playSound();
  display.value = display.value.slice(0, -1);
}

/* ===============================
   CALCULATE
================================ */
function calculate() {
  playSound();
  try {
    let expression = display.value
      .replace(/π/g, Math.PI)
      .replace(/e/g, Math.E)
      .replace(/MOD/g, "%");

    let result = eval(expression);

    addToHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

/* ===============================
   HISTORY
================================ */
function addToHistory(entry) {
  history.push(entry);
  if (history.length > 10) history.shift();
  updateHistoryUI();
}

function updateHistoryUI() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  updateHistoryUI();
});

/* ===============================
   SCIENTIFIC FUNCTIONS
================================ */
function func(type) {
  playSound();
  let x = parseFloat(display.value);
  if (isNaN(x)) return;

  let angle = isDegree ? (x * Math.PI) / 180 : x;

  switch (type) {
    case "sin":
      display.value = Math.sin(angle);
      break;
    case "cos":
      display.value = Math.cos(angle);
      break;
    case "tan":
      display.value = Math.tan(angle);
      break;
    case "log":
      display.value = Math.log10(x);
      break;
    case "ln":
      display.value = Math.log(x);
      break;
    case "sqrt":
      display.value = Math.sqrt(x);
      break;
    case "square":
      display.value = Math.pow(x, 2);
      break;
  }
}

/* ===============================
   POWER & FACTORIAL
================================ */
function power() {
  playSound();
  display.value += "**";
}

function factorial() {
  playSound();
  let n = parseInt(display.value);
  if (n < 0 || isNaN(n)) {
    display.value = "Error";
    return;
  }
  let f = 1;
  for (let i = 1; i <= n; i++) f *= i;
  display.value = f;
}

/* ===============================
   DEG / RAD TOGGLE
================================ */
degBtn.addEventListener("click", () => {
  isDegree = !isDegree;
  degBtn.textContent = isDegree ? "DEG" : "RAD";
});

/* ===============================
   THEME TOGGLE
================================ */
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

/* ===============================
   KEYBOARD SUPPORT
================================ */
document.addEventListener("keydown", e => {
  if ("0123456789+-*/.%()".includes(e.key)) append(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") del();
  if (e.key === "Delete") clearAll();
});
