// set up calculator properties and methods to be accessed and manipulated
const calc = {
  a: null,
  b: null,
  currentOperand: undefined,
  currentOperator: undefined,
  methods: {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    'x': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
    '%': (num) => num / 100,
    'sign': (num) => - num,
  },
};
