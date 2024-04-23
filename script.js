// Math functions

const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => parseFloat(a) - parseFloat(b);
const multiply = (a, b) => parseFloat(a) * parseFloat(b);
const divide = (a, b) => parseFloat(a) / parseFloat(b);

//current number variables
let firstNum = "";
let secondNum = "";
let currentOperator = "";
let currentResult = "";

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
const numbers = document.querySelectorAll(".add-to-display");
const operators = document.querySelectorAll(".operator");

// add event listener for input button clicks
numbers.forEach((number) => {
    number.addEventListener("click", () => displayNumber(number.textContent));
});

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        currentOperator = event.target.textContent;
        display.classList.add("to-be-deleted");
    });
});

// add keypad functionality
document.addEventListener("keydown", (pressedButton) => {
    if (isFinite(pressedButton.key)) {
        displayNumber(pressedButton.key * 1);
    } else if (pressedButton.key === ".") {
        displayNumber(pressedButton.key);
    } else if (
        pressedButton.key === "+" ||
        pressedButton.key === "-" ||
        pressedButton.key === "*" ||
        pressedButton.key === "/" ||
        pressedButton.key === "=" ||
        pressedButton.key === "Enter"
    ) {
        currentOperator = pressedButton.key;
        display.classList.add("to-be-deleted");
    }
});
// populate the display
const displayNumber = (number) => {
    if (display.classList.contains("to-be-deleted")) {
        updateOperateInputs(display.textContent, currentOperator);
        display.textContent = "";
        display.classList.remove("to-be-deleted");
    }
    if (display.textContent === "0") {
        display.textContent = number;
    } else if (display.textContent.length > 10) {
        return;
    } else if (number === "+/-") {
        display.textContent = multiply(display.textContent, -1);
    } else {
        display.textContent += number;
    }
};

let updateOperateInputs = function (displayNumber, operator) {
    if (firstNum === "") {
        firstNum = displayNumber;
    } else if (secondNum === "") {
        secondNum = display;
        display.textContent = operate(firstNum, secondNum, currentOperator);
    }
    console.log(firstNum);
    console.log(secondNum);
    console.log(currentOperator);
};
