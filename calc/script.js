const currDisplay = document.querySelector(".curr-display");
const prevDisplay = document.querySelector(".prev-display");
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operation");
const clearbtn = document.querySelector(".clear");
const delbtn = document.querySelector(".delete");
const eqlbtn = document.querySelector(".equal");

let operation;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (shouldResetDisplay) {
        currDisplay.innerText = "";
        shouldResetDisplay = false;
    }
    if (number === "." && currDisplay.innerText.includes(".")) return;
    currDisplay.innerText += number;
}

function chooseOperation(operand) {
    if (currDisplay.innerText === "") return;
    if (prevDisplay.innerText !== "") {
        compute();
    }
    operation = operand;
    prevDisplay.innerText = currDisplay.innerText + " " + operand;
    currDisplay.innerText = "";
}

function clearDisplay() {
    currDisplay.innerText = "";
    prevDisplay.innerText = "";
    operation = undefined;
}

function compute() {
    let result;
    const previousVal = parseFloat(prevDisplay.innerText);
    const currVal = parseFloat(currDisplay.innerText);

    if (isNaN(previousVal) || isNaN(currVal)) return;

    switch (operation) {
        case "+":
            result = previousVal + currVal;
            break;
        case "-":
            result = previousVal - currVal;
            break;
        case "/":
            result = previousVal / currVal;
            break;
        case "*":
            result = previousVal * currVal;
            break;
        default:
            return;
    }
    currDisplay.innerText = result;
    prevDisplay.innerText = "";
    shouldResetDisplay = true;
}

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        appendNumber(number.innerText);
    });
});

operands.forEach((operand) => {
    operand.addEventListener("click", () => {
        chooseOperation(operand.innerText);
    });
});

clearbtn.addEventListener("click", () => {
    clearDisplay();
});

eqlbtn.addEventListener("click", () => {
    if (prevDisplay.innerText === "") return;
    compute();
    prevDisplay.innerText = "";
});

delbtn.addEventListener("click", () => {
    currDisplay.innerText = currDisplay.innerText.slice(0, -1);
});
