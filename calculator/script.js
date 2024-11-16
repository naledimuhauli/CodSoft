let display = document.querySelector('.input');
let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay() {
    display.value = currentInput || '0';
}

function handleOperator(newOperator) {
    if (currentInput) {
        if (previousInput && operator) {
            currentInput = String(calculate(previousInput, currentInput, operator));
        }
        operator = newOperator;
        previousInput = currentInput;
        currentInput = '';
    }
}

function calculate(num1, num2, op) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b;
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function () {
        const value = this.innerText;

        if (!isNaN(value) || value === '.') {
            if (value !== '.' || !currentInput.includes('.')) {
                currentInput += value;
            }
        } else if (value === 'AC') {
            currentInput = '';
            previousInput = '';
            operator = '';
        } else if (value === '+/-') {
            currentInput = currentInput ? String(-parseFloat(currentInput)) : '0';
        } else if (value === '%') {
            currentInput = currentInput ? String(parseFloat(currentInput) / 100) : '0';
        } else if (value === '=') {
            if (operator && previousInput && currentInput) {
                currentInput = String(calculate(previousInput, currentInput, operator));
                operator = '';
                previousInput = '';
            }
        } else {
            handleOperator(value);
        }
        updateDisplay();
    });
});

updateDisplay();
