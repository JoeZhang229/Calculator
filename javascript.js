let displayValue = "";
let memStack = [];
// DOM
const screen = document.querySelector('.screen');

const message = document.querySelector('.message');

const allNumbers = document.querySelectorAll('.number');

const operatorsBtn = document.querySelectorAll('.operators');

const equal = document.querySelector('.equal');

const clearEverything = document.querySelector('.CE');

clearEverything.addEventListener('click', clear);

const operIndex = displayValue.lastIndexOf();

const operators = '/*-+.';

allNumbers.forEach(button => {
    button.addEventListener('click', function () {
        displayValue += button.value;
        console.log(displayValue);
        message.textContent += button.value;
        screen.textContent += button.value;
    })
});

operatorsBtn.forEach(button => {
    button.addEventListener('click', function () {
        console.log(displayValue);
        memStack.push(screen.textContent);
        screen.textContent = '';
        if (operators.includes(displayValue.slice(-1))) {
            return
        } else {
            memStack.push(button.value);
            displayValue += button.value;
            message.textContent += button.value;
        }
    })
});

function clear() {
    displayValue = '';
    message.textContent = '';
    screen.textContent = '';
    memStack = [];
}

function updateDisplay(e) {
    key = e.key
    numbers = /[0-9]/;
    if (numbers.test(key)) {
        displayValue += key;
        console.log(displayValue);
        message.textContent +=key;
        screen.textContent += key;
    } else { 
        switch (key) {
            // operators, special buttons
            case 'Escape':
                clear();
                break;
            case 'Enter':
                if (operators.includes(displayValue.slice(-1))) {
                    return
                } else {
                memStack.push(screen.textContent);
                screen.textContent = operate(memStack);
                }
                break;
            case '.':
            case '+':
            case '-':
            case '*':
            case '/':
                console.log(displayValue);
                memStack.push(screen.textContent);
                screen.textContent = '';
                if (operators.includes(displayValue.slice(-1))) {
                    return
                } else {
                    memStack.push(key);
                    displayValue += key;
                    message.textContent += key;

                }
            }
        }
}
// this works in Console
const calculate = (operator, a, b) => {
    switch (operator) {
        case '÷':
            if (b == 0) {
                displayValue = 'sorry, not possible.';
            } else return a / b;
        case '*':
            return a * b;
        case '+':
            return a + b;
        case '-':
            return a - b;
    }
}


function operate(array) {
    let parsedEquation = [];
    let operatorCount = [];
    for (let index = 0; index < array.length; index++) {
        // check if number
        if (parseInt(array[index])) {
            parsedEquation.push(parseInt(array[index]));
            // it's an operator
        } else {
            console.log("operator", array[index]);
            parsedEquation.push(array[index]);
            operatorCount.push(array[index]);
            console.log("operators", operatorCount.length);
        }
    }
        if (1 < operatorCount.length) {
        for (let index = 0; index < parsedEquation.length; index++) {
            if (parsedEquation[index] == "*" || parsedEquation[index] == "/") {
                // removes numbers next to operator in chunks of 3 indexes
                parsedEquation.splice(index - 1, 3, calculate(parsedEquation[index], parsedEquation[index - 1], parsedEquation[index + 1]));
                operatorCount.shift();
            } else if (parsedEquation[index] == "+" || parsedEquation[index] == "-") {
                parsedEquation.splice(index - 1, 3, calculate(parsedEquation[index], parsedEquation[index - 1], parsedEquation[index + 1]));
                operatorCount.shift();
            }
        }
        console.log(parsedEquation);
        return calculate(parsedEquation[1], parsedEquation[0], parsedEquation[2]);
        }
    console.log(parsedEquation);
    return calculate(parsedEquation[1], parsedEquation[0], parsedEquation[2]);
}


equal.addEventListener('click', function () {
    memStack.push(screen.textContent);
    screen.textContent = operate(memStack);
});

window.addEventListener('keydown', function(e){
    updateDisplay(e);
});