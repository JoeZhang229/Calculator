let displayValue = "";
let memStack = [];
// DOM
const screen = document.querySelector('.screen');

const message = document.querySelector('.message');

const allNumbers = document.querySelectorAll('.number');

const operatorsBtn = document.querySelectorAll('.operators');

const equal = document.querySelector('.equal');

const clear = document.querySelector('.CE');

const operators = ['-+*÷'];

const operIndex = displayValue.lastIndexOf(operators)

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

clear.addEventListener('click', function () {
    displayValue = '';
    message.textContent = '';
    screen.textContent = '';
    memStack = [];
});
// this works in Console
const calculate = (operator, a, b) => {
    switch (operator) {
        case '÷':
            if (b == 0) {
                screen.textContent = 'sorry, not possible.';
            } else return a / b;
            break;
        case '*':
            return a * b;
        case '+':
            return a + b;
        case '-':
            return a - b;
    }
}

function operate(array) {
    result = [];
    array.every(ele => {
        if (parseInt(ele) != NaN) {
            result.push(parseInt(ele));
        } else return result.push(ele);
    });
    return calculate(array[1], array[0], array[2]);
}

equal.addEventListener('click', function () {
    memStack.push(screen.textContent);
    screen.textContent = operate(memStack);
});

/* window.addEventListener('keydown', function(e) {
    const key = document.querySelector(`${e.keyCode}`);
    console.log(key);
});
*/
