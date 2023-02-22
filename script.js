const MAX_CHARACTERS = 10;

// Get all the buttons
const buttons = document.querySelectorAll("button");
const numberButtons = Array.from(buttons).filter(button => !isNaN(parseInt(button.id)));
const operatorButtons = Array.from(buttons).filter(button => ["+", "-", "x", "%"].includes(button.id));
const delButton = document.getElementById("DEL");
const acButton = document.getElementById("AC");
const equalButton = document.getElementById("=");
const dotButton = document.getElementById(".");

// Global variables to save current operands and operator
let firstOperand = 0;
let secondOperand = 0;
let operator = "";
let equalPhase = false;

// Get main and secondary display
const mainDisplay = document.getElementById("display-lower");
const secondaryDisplay = document.getElementById("display-upper");

function add(first, second) {
    return first+second;
};

function subtract(first, second) {
    return first-second;
};

function multiply(first, second) {
    return first*second;
};

function divide(first, second) {
    return first/second;
};

function operate(operator, first, second) {
    return operator(first, second);
};

function updateMainDisplay(span) {
    let currentContent = mainDisplay.textContent;
    if (currentContent.length >= MAX_CHARACTERS) {
        return;
    }

    const newContent = span.textContent;
    if (newContent != 0) {
        if (currentContent === "0") {
            console.log("hi dad")
            mainDisplay.textContent = newContent;
        } else {
            console.log("hi mum")
            mainDisplay.textContent = currentContent + newContent;
        };
    };
};

function updateSecondaryDisplay(span) {
    firstOperand = mainDisplay.textContent;
    operator = span.textContent;
    let currentContent = secondaryDisplay.textContent;
    
    secondaryDisplay.textContent = `${mainDisplay.textContent} ${operator}`;

}

numberButtons.forEach(button => button.querySelector("span").addEventListener("click", event => {
    updateMainDisplay(event.target);
  }));

  operatorButtons.forEach(button => button.querySelector("span").addEventListener("click", event => {
    updateSecondaryDisplay(event.target)
  }));

