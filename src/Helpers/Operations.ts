import { Operation } from "types";

function add(a: number, b: number) {
  return a + b;
}

function sub(a: number, b: number) {
  return a - b;
}

function mul(a: number, b: number) {
  return a * b;
}
function div(a: number, b: number) {
  return a / b;
}



function calculate(a: number, b: number, operation: Operation) {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
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