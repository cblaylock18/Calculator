// Math functions

const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => parseFloat(a) - parseFloat(b);
const multiply = (a, b) => parseFloat(a) * parseFloat(b);
const divide = (a, b) => parseFloat(a) / parseFloat(b);

// input variables
let firstNum = 3;
let secondNum = 5;
let operator = "+";

const operate = (firstNum, secondNum, operator) => {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
            break;
        case "-":
            return subtract(firstNum, secondNum);
            break;
        case "*":
            return multiply(firstNum, secondNum);
            break;
        case "/":
            return divide(firstNum, secondNum);
            break;
        default:
            console.log("Error"); //to be updated
    }
};

console.log(operate(firstNum, secondNum, operator));
