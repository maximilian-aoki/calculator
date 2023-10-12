// set up calculator properties and methods to be accessed and manipulated
let calc = {
  a: null,
  b: null,
  currentNumStr: '',
  currentOperator: undefined,
  methods: {
    '+': (num1, num2) => +num1 + +num2,
    '-': (num1, num2) => +num1 - +num2,
    'x': (num1, num2) => +num1 * +num2,
    '/': (num1, num2) => +num1 / +num2,
    '%': (num) => +num / 100,
    'sign': (num) => +num * (-1),
  },
};

function getCurrentOperand() {
  return calc.a === null ? 'a' : 'b';
}

function clearCalculator() {
  calc.a = null;
  calc.b = null;
  calc.currentNumStr = '';
  calc.currentOperator = undefined;
  output.textContent = 0;
}

function showOutput() {
  return;
}

// establish output display variable
const output = document.querySelector('#output');
output.textContent = 0;

// establish event listeners on all buttons
const buttons = document.querySelector('#button-container');

buttons.addEventListener('click', (e) => {
  let type = e.target.getAttribute('class');
  if (type === 'number') {
    addNumber(e.target.textContent);
  } else if (type === 'operator') {
    useOperator(e.target.textContent);
  } else if (type === 'sign') {
    useSignChange();
  } else if (type === 'equals') {
    evaluate();
  } else if (type === 'back-button') {
    backspace();
  } else if (type === 'clear-button') {
    clearCalculator();
  }
  showOutput();
});

// all operations based on button input

function addNumber(input) {
  if (input === '.') {
    if (calc.currentNumStr === '') {
      calc.currentNumStr = '0.';
    } else if (calc.currentNumStr.indexOf('.') === -1) {
      calc.currentNumStr = calc.currentNumStr + '.';
    }
  } else {
    calc.currentNumStr = calc.currentNumStr + input;
  }
}

function useOperator(input) {
  return;
}

function useSignChange() {
  return;
}

function evaluate() {
  return;
}

function backspace() {
  return;
}