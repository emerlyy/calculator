function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}

function calculate(a, b, operation) {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case 'x':
      return a * b;
    case '/':
      if (b === 0) {
        return 0;
      }
      return a / b;
    default:
      return 0;
  }
}

export { add, sub, mul, div, calculate }