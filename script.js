// Math functions

const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => parseFloat(a) - parseFloat(b);
const multiply = (a, b) => parseFloat(a) * parseFloat(b);
const divide = (a, b) => parseFloat(a) / parseFloat(b);

// input variables, dummy values for now
let firstNum = 3;
let secondNum = 5;
let operator = "+";

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
            console.log("Error"); //to be updated
    }
};

// select relevant html elements
const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".add-to-display");

// add event listener for input button presses
numbers.forEach((number) => {
    number.addEventListener("click", () => displayNumber(number.textContent));
});

// populate the display
const displayNumber = (number) => {
    if (number === "+/-") {
        display.textContent = multiply(display.textContent, -1);
    } else {
        display.textContent = number;
    }
};
// next, get display to update with more than one digit numbers
// be sure to store display variable somewhere, will need it to operate
console.log(operate(firstNum, secondNum, operator));
