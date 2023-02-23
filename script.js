const MAX_CHARACTERS = 10;

// Get all the buttons
const buttons = document.querySelectorAll("button");
const numberButtons = Array.from(buttons).filter(button => !isNaN(parseInt(button.id)));
const operatorButtons = Array.from(buttons).filter(button => ["+", "-", "x", "÷"].includes(button.id));
const delButton = document.getElementById("DEL");
const acButton = document.getElementById("AC");
const equalButton = document.getElementById("=");
const dotButton = document.getElementById(".");

// Global variables to save current operands and operator
let firstOperand = 0;
let secondOperand = "";
let operator = "";

// Boolean to determine if we want to save first or second operand
let afterOperator = false;

// Get main and secondary display
const mainDisplay = document.getElementById("display-lower");
const secondaryDisplay = document.getElementById("display-upper");

function add(first, second) {
    return first+second;
}

function subtract(first, second) {
    return first-second;
}

function multiply(first, second) {
    return first*second;
}

function divide(first, second) {
    return first/second;
}

function operate(operator, first, second) {
    let result;
    if (operator === "+") {
        result = add(first, second);
    } else if (operator === "-") {
        result = subtract(first, second);
    } else if (operator === "x") {
        result = multiply(first, second);
    } else if (operator === "÷") {
        result = divide(first, second);
    }
    result = checkSignificantDigits(result);
    return result;
}

function executeOperandLogic(span) {
    if (!afterOperator) {
        if (firstOperand.length >= MAX_CHARACTERS) {
            return;
        }
        firstOperand = removeLeadingZeros(firstOperand.toString()+span.textContent);
        result = firstOperand;
    } else {
        if (secondOperand.length >= MAX_CHARACTERS) {
            return;
        }
        secondOperand = removeLeadingZeros(secondOperand.toString()+span.textContent);
        result = secondOperand;
        clearMainDisplay();
    }

    updateMainDisplayAdd(result.toString());
}

function executeOperatorLogic(span) {
    if (!afterOperator) {
        operator = span.textContent;
        updateSecondaryDisplay(firstOperand.toString());
        updateSecondaryDisplay(operator.toString());
        afterOperator = true;
    } else {
        if (operator === "") {
            operator = span.textContent;
        }
        if (secondOperand === "") {
            operator = span.textContent;
            secondaryDisplay.textContent= secondaryDisplay.textContent.slice(0, -1) + operator;
            return;
        }
        firstOperand = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
        secondOperand = "";
        clearMainDisplay();
        updateMainDisplayAdd(firstOperand.toString());
        clearSecondaryDisplay();
        updateSecondaryDisplay(firstOperand.toString());
        operator = span.textContent;
        updateSecondaryDisplay(operator.toString());
    }
}

function executeEqualLogic(span) {
    if (operator === "" || secondOperand === "") {
        return;
    }
    clearSecondaryDisplay();
    updateSecondaryDisplay(firstOperand.toString());
    updateSecondaryDisplay(operator.toString());
    updateSecondaryDisplay(secondOperand.toString());
    updateSecondaryDisplay(span.textContent.toString());

    firstOperand = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
    clearMainDisplay();
    updateMainDisplayAdd(firstOperand.toString());
    secondOperand = "";
    operator = "";
}

function updateMainDisplayAdd(str) {
    if (str.length <= MAX_CHARACTERS) {
        mainDisplay.textContent = str;
    }
    else {
        mainDisplay.textContent = "OutOfRange";
    }
}

function updateMainDisplayDelete() {
    let currentContent = mainDisplay.textContent;
    if (currentContent.length <= 0) {
        mainDisplay.textContent = 0;
    }

    mainDisplay.textContent = removeLeadingZeros(currentContent.slice(0, -1));
}

function clearMainDisplay() {
    mainDisplay.textContent = "0";
}

function updateSecondaryDisplay(str) {
    secondaryDisplay.textContent = `${secondaryDisplay.textContent} ${str}`;

    if (secondaryDisplay.textContent.length > MAX_CHARACTERS*2) {
        secondaryDisplay.textContent = "OutOfRange";
    }
}

function clearSecondaryDisplay() {
    secondaryDisplay.textContent = "";
}

function executeACLogic() {
    firstOperand = 0;
    secondOperand = 0;
    operator = "";
    afterOperator = false;
    clearDisplays();
}

function clearDisplays() {
    mainDisplay.textContent = "0";
    secondaryDisplay.textContent = "";
}

function removeLeadingZeros(str) {
    // Remove any leading zeros from the string
    const trimmed = str.replace(/^0+(?!\.)/, '');
  
    // If the trimmed string is empty, return '0'
    if (trimmed === '') {
      return '0';
    }
  
    // Otherwise, return the trimmed string
    return trimmed;
}

function checkSignificantDigits(num) {
    if (num % 1 === 0) {
      // If the number is an integer, return it as is
      return num;
    } else {
      // If the number has significant digits after the decimal point, return it as is
      // Otherwise, return the integer value
      return num.toFixed(2);
    }
}

function isOperand(button) {
    return (numberButtons.includes(button) || dotButton === button);
}

function isOperator(button) {
    return operatorButtons.includes(button);
}

function isDelButton(button) {
    return button === delButton;
}

function isACButton(button) {
    return button === acButton;
}

function isEqualButton(button) {
    return button === equalButton;
}

function update(span) {
    const parentButton = span.closest('button');
    if (isOperand(parentButton)) {
        executeOperandLogic(span);
    } else if (isOperator(parentButton)) {
        executeOperatorLogic(span);
    } else if (isDelButton(parentButton)) {
        updateMainDisplayDelete();
    } else if (isACButton(parentButton)) {
        executeACLogic();
    } else if (isEqualButton(parentButton)) {
        executeEqualLogic(span);
    }
}

buttons.forEach(button => button.querySelector("span").addEventListener("click", event => {
    if (secondaryDisplay.textContent === "Welcome!") {
        secondaryDisplay.textContent = "";
    }
    update(event.target);
}));