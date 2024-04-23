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
            result = add(firstNum, secondNum);
            break;
        case "-":
            result = subtract(firstNum, secondNum);
            break;
        case "*":
            result = multiply(firstNum, secondNum);
            break;
        case "/":
            if (secondNum == 0) {
                firstNum = "";
                secondNum = "";
                workingOperator = "";
                currentOperator = "";
                currentResult = "";
                isEnter = 0;
                display.textContent = 0;
                display.classList.remove("to-be-deleted");
                highlightButton();
                return alert("AHHHHH!!!");
            }
            result = divide(firstNum, secondNum);
            break;
        default:
            display.textContent = "Error"; //to be updated
    }
    return formatResult(result);
};

let formatResult = function (number) {
    // Convert number to string
    let resultStr = number.toString();

    // Truncate string to a maximum of 10 characters
    if (resultStr.length > 10) {
        // Check if the string has a decimal point
        if (resultStr.includes(".")) {
            // Try to fit to maximum precision without rounding issues
            let precision = 10 - (resultStr.indexOf(".") + 1);
            number = number.toFixed(precision > 0 ? precision : 0);
            resultStr = number.toString();

            // Final check to ensure length is within limits (e.g., when 0s are at the end after the decimal point)
            if (resultStr.length > 10) {
                resultStr = resultStr.substring(0, 10);
            }
        } else {
            // If no decimal point and still exceeds, hard truncate (edge case for very large numbers)
            resultStr = resultStr.substring(0, 10);
        }
    }

    return resultStr;
};

// select relevant html elements
const display = document.querySelector(".display");
const numbersAndPeriod = document.querySelectorAll(".add-to-display");
const operators = document.querySelectorAll(".operator");
const allClear = document.querySelector(".all-clear");
const clear = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");

// add event listener for input button clicks
numbersAndPeriod.forEach((number) => {
    number.addEventListener("click", (event) =>
        displayNumber(number.textContent)
    );
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
            highlightButton(currentOperator);
        } else {
            isEnter = 1;
            highlightButton();
            variableUpdate(display.textContent);
        }
        event.target.blur();
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
        highlightButton(currentOperator);
    } else if (pressedButton.key === "=" || pressedButton.key === "Enter") {
        isEnter = 1;
        highlightButton();
        variableUpdate(display.textContent);
    } else if (
        pressedButton.key === "Backspace" ||
        pressedButton.key === "Delete"
    ) {
        deleteFunction();
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

let highlightButton = function (button) {
    operators.forEach((operator) => {
        if (operator.textContent === button) {
            operator.classList.add("current-operator");
        } else {
            operator.classList.remove("current-operator");
        }
    });
};

allClear.addEventListener("click", (event) => {
    firstNum = "";
    secondNum = "";
    workingOperator = "";
    currentOperator = "";
    currentResult = "";
    isEnter = 0;
    display.textContent = 0;
    display.classList.remove("to-be-deleted");
    highlightButton();
    event.target.blur();
});

clear.addEventListener("click", (event) => {
    display.textContent = 0;
    event.target.blur();
});

deleteBtn.addEventListener("click", (event) => {
    deleteFunction();
    event.target.blur();
});

let deleteFunction = function () {
    if (display.textContent.length === 1) {
        display.textContent = 0;
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
};

let tester = function () {
    console.log(firstNum);
    console.log(secondNum);
    console.log(workingOperator);
    console.log(currentOperator);
    console.log(currentResult);
};
