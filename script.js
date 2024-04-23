// Math functions

const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => parseFloat(a) - parseFloat(b);
const multiply = (a, b) => parseFloat(a) * parseFloat(b);
const divide = (a, b) => parseFloat(a) / parseFloat(b);

//current number variables
let firstNum = "";
let secondNum = "";
let workingOperator = "";
let currentOperator = "";
let currentResult = "";
let isEnter = 0;

// operate on a pair of numbers
const operate = (firstNum, secondNum, operator) => {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "*":
            return multiply(firstNum, secondNum);
        case "/":
            return divide(firstNum, secondNum);
        default:
            display.textContent = "Error"; //to be updated
    }
};

// select relevant html elements
const display = document.querySelector(".display");
const numbersAndPeriod = document.querySelectorAll(".add-to-display");
const operators = document.querySelectorAll(".operator");

// add event listener for input button clicks
numbersAndPeriod.forEach((number) => {
    number.addEventListener("click", () => displayNumber(number.textContent));
});

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        if (
            event.target.textContent === "+" ||
            event.target.textContent === "-" ||
            event.target.textContent === "*" ||
            event.target.textContent === "/"
        ) {
            variableUpdate(display.textContent);
            currentOperator = event.target.textContent;
        } else {
            isEnter = 1;
            variableUpdate(display.textContent);
        }
    });
});

// add keypad functionality
document.addEventListener("keydown", (pressedButton) => {
    console.log(pressedButton.key);
    if (isFinite(pressedButton.key)) {
        displayNumber(pressedButton.key * 1);
    } else if (pressedButton.key === ".") {
        displayNumber(pressedButton.key);
    } else if (
        pressedButton.key === "+" ||
        pressedButton.key === "-" ||
        pressedButton.key === "*" ||
        pressedButton.key === "/"
    ) {
        variableUpdate(display.textContent);
        currentOperator = pressedButton.key;
    } else if (pressedButton.key === "=" || pressedButton.key === "Enter") {
        isEnter = 1;
        variableUpdate(display.textContent);
    }
});
// populate the display
const displayNumber = (number) => {
    if (display.classList.contains("to-be-deleted")) {
        display.textContent = "";
        display.classList.remove("to-be-deleted");
    }
    if (display.textContent === "0") {
        display.textContent = number;
    } else if (
        display.textContent.length > 10 ||
        [...display.textContent.concat(number).matchAll(/\./g)].length > 1
    ) {
        return;
    } else if (number === "+/-") {
        display.textContent = multiply(display.textContent, -1);
    } else {
        display.textContent += number;
    }
};

let variableUpdate = function (number) {
    if (firstNum === "") {
        firstNum = number;
        display.classList.add("to-be-deleted");
    } else {
        secondNum = number;
        performOperation(firstNum, secondNum, currentOperator);
    }
};

let performOperation = function (a, b, c) {
    if (a && b && c) {
        // Ensure all necessary data is present
        display.textContent = operate(a, b, c);
        secondNum = "";
        if (isEnter) {
            firstNum = "";
            currentOperator = "";
            isEnter = 0;
        } else {
            firstNum = display.textContent; // Maintain the result as the new firstNum
            display.classList.add("to-be-deleted");
        }
    } else {
        console.log("Insufficient data for operation.");
        // Optionally reset states or handle the case appropriately
    }
};

let tester = function () {
    console.log(firstNum);
    console.log(secondNum);
    console.log(workingOperator);
    console.log(currentOperator);
    console.log(currentResult);
};
