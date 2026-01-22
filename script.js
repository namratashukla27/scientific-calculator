const display = document.getElementById("display");
const sound = document.getElementById("clickSound");
const themeBtn = document.getElementById("themeToggle");
const degBtn = document.getElementById("degToggle");

let isDegree = true;
let history = [];
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

/* --------- SOUND --------- */
function playSound() {
    if (sound) sound.play();
}

/* --------- APPEND VALUES --------- */
function append(value) {
    playSound();
    display.value += value;
}

/* --------- CLEAR & DELETE --------- */
function clearAll() {
    playSound();
    display.value = "";
}

function del() {
    playSound();
    display.value = display.value.slice(0, -1);
}

/* --------- CALCULATE --------- */
function calculate() {
    playSound();
    try {
        // Replace π, e, MOD with numbers/operators
        let expression = display.value
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/MOD/g, '%');

        let result = eval(expression);
        addToHistory(display.value + " = " + result);
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

/* --------- HISTORY --------- */
function addToHistory(entry) {
    history.push(entry);
    if (history.length > 10) history.shift(); // max 10 entries
    updateHistoryUI();
}

function updateHistoryUI() {
    historyList.innerHTML = "";
    history.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

/* Clear History Button */
clearHistoryBtn.onclick = () => {
    history = [];
    updateHistoryUI();
};

/* --------- SCIENTIFIC FUNCTIONS --------- */
function func(type) {
    playSound();
    let x = parseFloat(display.value);
    if (isNaN(x)) return;

    let angle = isDegree ? x * Math.PI / 180 : x;

    switch (type) {
        case 'sin': display.value = Math.sin(angle); break;
        case 'cos': display.value = Math.cos(angle); break;
        case 'tan': display.value = Math.tan(angle); break;
        case 'log': display.value = Math.log10(x); break;
        case 'ln': display.value = Math.log(x); break;
        case 'sqrt': display.value = Math.sqrt(x); break;
        case 'square': display.value = Math.pow(x, 2); break;
    }
}

/* --------- POWER xʸ --------- */
function power() {
    playSound();
    display.value += "**";
}

/* --------- FACTORIAL --------- */
function factorial() {
    playSound();
    let n = parseInt(display.value);
    if (n < 0) return display.value = "Error";
    let f = 1;
    for (let i = 1; i <= n; i++) f *= i;
    display.value = f;
}

/* --------- DEG/RAD TOGGLE --------- */
degBtn.onclick = () => {
    isDegree = !isDegree;
    degBtn.textContent = isDegree ? "DEG" : "RAD";
};

/* --------- DARK/LIGHT MODE --------- */
themeBtn.onclick = () => {
    document.body.classList.toggle("light");
};

/* --------- KEYBOARD SUPPORT --------- */
document.addEventListener("keydown", e => {
    if ("0123456789+-*/.%()".includes(e.key)) append(e.key);
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") del();
    if (e.key === "Delete") clearAll();
});
