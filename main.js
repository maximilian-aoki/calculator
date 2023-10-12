// set up calculator properties and methods to be accessed and manipulated
let calc = {
  a: null,
  b: null,
  currentNumberString: '',
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
  calc.currentNumberString = '';
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
    console.log(e.target.textContent);
  } else if (type === 'operator') {
    console.log(e.target.textContent);
  } else if (type === 'sign') {
    console.log("SIGN");
  } else if (type === 'equals') {
    console.log("EQ");
  } else if (type === 'clear-button') {
    console.log("AC");
  }
});