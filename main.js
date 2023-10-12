// ---- set up calculator properties and methods to be accessed and manipulated ---- //
let calc = {
  operand: null,
  currentNumStr: '',
  currentOperator: undefined,
  methods: {
    '+': (num1, num2) => +num1 + +num2,
    '-': (num1, num2) => +num1 - +num2,
    'x': (num1, num2) => +num1 * +num2,
    '/': (num1, num2) => +num1 / +num2,
  },
};

// ---- simple check functions ---- //

function clearOperatorToggles() {
  const allOperatorToggles = Array.from(document.querySelectorAll('.operator[data-toggle]'));
  for (let elem of allOperatorToggles) {
    elem.setAttribute('data-toggle', 'off');
  }
}

function clearPercentToggle() {
  const percentToggle = document.querySelector('.percent[data-toggle');
  percentToggle.setAttribute('data-toggle', 'off');
}

function clearCalculator() {
  calc.operand = null;
  calc.currentNumStr = '';
  calc.currentOperator = undefined;
  output.textContent = 0;
  clearOperatorToggles();
  clearPercentToggle();
  toggleDisable(false);
}

function limitStringSize(str) {
  if (str.length > 10) {
    str = str.slice(0, 10);
    if (str.charAt(str.length - 1) === '.') {
      str = str.slice(0, -1);
    }
  }
  return str;
}

function toggleDisable(value) {
  const allButtons = Array.from(document.querySelectorAll('button'));
  const filteredButtons = allButtons.filter( (button) => button.getAttribute('class') !== 'clear-button')
  for (let button of filteredButtons) {
    button.disabled = value;
  }
}

// ---- run an output show every time a valid button is pressed ---- //

function showOutput() {
  if (!calc.currentNumStr && !calc.operand) {
    output.textContent = 0;
    clearPercentToggle();
  } else if (!calc.currentNumStr) {
    if (calc.operand > 9999999999) {
      output.textContent = "ERROR";
      toggleDisable(true);
    } else {
      output.textContent = limitStringSize(String(calc.operand));
    }
    clearPercentToggle();
  } else if (calc.currentNumStr) {
    clearOperatorToggles();
    output.textContent = limitStringSize(calc.currentNumStr);
  }
}

// ---------- establish output display variable ---------- //
const output = document.querySelector('#output');
output.textContent = 0;

// --------- establish event listeners on all buttons --------- //
const buttons = document.querySelector('#button-container');

buttons.addEventListener('click', (e) => {
  let type = e.target.getAttribute('class');
  if (type === 'number') {
    addNumber(e.target.textContent);
  } else if (type === 'operator') {
    useOperator(e);
  } else if (type === 'sign') {
    useSignChange();
  } else if (type === 'percent') {
    getPercentage(e);
  } else if (type === 'equals') {
    calc.operand = evaluate(calc.currentOperator, calc.operand, calc.currentNumStr);
    calc.currentNumStr = '';
  } else if (type === 'back-button') {
    backspace();
  } else if (type === 'clear-button') {
    clearCalculator();
  }
  showOutput();
});

// ------- all possible operations based on button input ------- //

function addNumber(input) {
  if (input === '.') {
    if (calc.currentNumStr === '') {
      calc.currentNumStr = '0.';
    } else if (calc.currentNumStr.indexOf('.') === -1) {
      calc.currentNumStr = calc.currentNumStr + '.';
    }
  } else if (calc.currentNumStr.length < 10) {
    calc.currentNumStr = calc.currentNumStr + input;
  }
}

function useOperator(e) {
  clearOperatorToggles();
  clearPercentToggle();
  e.target.setAttribute('data-toggle', 'on');

  if (!calc.operand && calc.currentNumStr === '') {
    calc.operand = '0';
  } else if (!calc.operand && calc.currentNumStr) {
    calc.operand = +calc.currentNumStr;
  } else if (calc.operand  && calc.currentNumStr) {
    calc.operand = evaluate(calc.currentOperator, calc.operand, calc.currentNumStr);
  }

  calc.currentOperator = String(e.target.textContent);
  calc.currentNumStr = '';
}

function useSignChange() {
  if (calc.currentNumStr) {
    if (calc.currentNumStr[0] === '-') {
      calc.currentNumStr = calc.currentNumStr.slice(1);
    } else {
      calc.currentNumStr = '-' + calc.currentNumStr;
    }
  }
}

function getPercentage(e) {
  if (calc.currentNumStr) {
    if (e.target.getAttribute('data-toggle') === 'off') {
      e.target.setAttribute('data-toggle', 'on');
      calc.currentNumStr = String(+calc.currentNumStr / 100);
    } else {
      e.target.setAttribute('data-toggle', 'off');
      calc.currentNumStr = String(+calc.currentNumStr * 100);
    }
  }
}

function evaluate(op = undefined, a = null, b = '') {
  if (!a && !b) {
    return '0';
  } else if (!a) {
    return b;
  } else if (!b) {
    return a;
  } else {
    return calc.methods[op](a, b);
  }
}

function backspace() {
  if (calc.currentNumStr) {
    calc.currentNumStr = calc.currentNumStr.slice(0, -1);
    if (calc.currentNumStr === '-') {
      calc.currentNumStr = '';
    }
  }
}