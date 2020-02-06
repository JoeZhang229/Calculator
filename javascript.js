let displayValue = "";
let memStack = [];
// DOM
const screen = document.querySelector('.screen');

const message = document.querySelector('.message');

const allNumbers = document.querySelectorAll('.number');

const operatorsBtn = document.querySelectorAll('.operators');

const equal = document.querySelector('.equal');

const clear = document.querySelector('.CE');

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

allNumbers.forEach(button => {
    button.addEventListener('click', function() {
        displayValue += button.value;
        console.log(displayValue);
        message.textContent += button.value; 
        if (button.value.includes(screen.textContent.slice(-1))) {
            screen.textContent += button.value;
        } else {
            screen.textContent = '';
            screen.textContent += button.value;
        }
    })
});

operatorsBtn.forEach(button => {
    button.addEventListener('click', function() {
        console.log(displayValue);
        if ('-+*÷'.includes(displayValue.slice(-1))) {
            return
        } else {
            displayValue += button.value;
            message.textContent += button.value;
        }
    })
});

clear.addEventListener('click', function() {
    displayValue = '';  
    message.textContent = '';
    screen.textContent = '';
});
// this works in Console
const operate = (operator, a, b) => {
    switch (operator) {
        case '÷':
            if (b == 0) {
                displayValue = 'sorry, not possible.';
            } else return divide(a, b);
        case '*':
            return multiply(a, b);
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
    }
}


// troubles with getting desired result
function operations(value) {
    temp = value.split("") 
    result = "";    
    for (let i = 0; i < value.length; i++) {
        operator = temp[i];
        a = temp[i - 1];
        b = temp[i + 1];
        if (operator == '÷' || operator == '*') {
            temp.splice(i-1, 3, (operate(operator, a, b)));
        }
    }
    for (let i = 0; i < value.length; i++) {
        if (operator == '+' || operator == '-') {
            temp.splice(i - 1, 3, (operate(operator, a, b)));
        }
    }
    return (temp[0].toString());
}


equal.addEventListener('click', function() {
    screen.textContent = operations(displayValue);
});

/* window.addEventListener('keydown', function(e) {
    const key = document.querySelector(`${e.keyCode}`);
    console.log(key);
});
*/
