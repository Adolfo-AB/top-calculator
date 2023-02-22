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
}

const first = 100;
const second = 10;
console.log(operate(add, first, second));
console.log(operate(subtract, first, second));
console.log(operate(multiply, first, second));
console.log(operate(divide, first, second));