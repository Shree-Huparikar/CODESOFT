const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;
let memory = 0;  

const buttons = Array.from(document.querySelectorAll('.button'));

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if (value === 'C') {
            clear();
        } else if (value === '←') {
            backspace();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            setOperator(value);
        } else if (value === '√') {
            squareRoot();
        } else if (value === '.') {
            appendDecimal();
        } else if (value === 'M+') {
            memoryAdd();
        } else if (value === 'M-') {
            memorySubtract();
        } else if (value === 'MR') {
            recallMemory();
        } else {
            appendNumber(value);
        }
    });
});


function appendNumber(value) {
    currentInput += value;
    updateDisplay(currentInput);
}


function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}


function setOperator(value) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = '';
}


function calculate() {
    if (operator === null || currentInput === '' || previousInput === '') return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
    }
    
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay(currentInput);
}


function squareRoot() {
    const current = parseFloat(currentInput);
    if (current < 0) {
        alert("Cannot take the square root of a negative number");
        return;
    }
    currentInput = Math.sqrt(current).toString();
    updateDisplay(currentInput);
}


function clear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay(currentInput);
}


function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}


function updateDisplay(value) {
    display.value = value;
}


function memoryAdd() {
    memory += parseFloat(currentInput);
}

function memorySubtract() {
    memory -= parseFloat(currentInput);
}

function recallMemory() {
    currentInput = memory.toString();
    updateDisplay(currentInput);
}
