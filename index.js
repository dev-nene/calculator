const buttonsEl = document.querySelectorAll("button");
const resultEl = document.querySelector(".result");

function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  if (n2 === 0) return null;
  return (n1 / n2).toFixed(2);
}

function operate(n1, n2, op) {
  n1 = Number(n1);
  n2 = Number(n2);
  switch (op) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "*":
      return multiply(n1, n2);
    case "/":
      return divide(n1, n2);
    default:
      return null;
  }
}

let firstNumber = "";
let secondNumber = "";
let operator = "";

let operators = ["+", "-", "*", "/"];

buttonsEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    if (value === "Clear") {
      firstNumber = "";
      secondNumber = "";
      resultEl.textContent = "";
      operator = "";
      return;
    } else if (value === "⌫") {
      if (!operator) {
        firstNumber = firstNumber.slice(0, -1);
      } else {
        if (secondNumber) {
          secondNumber = secondNumber.slice(0, -1);
        } else {
          operator = "";
        }
      }
    } else if (value === "=") {
      if (!(firstNumber && secondNumber)) return;
      firstNumber = String(operate(firstNumber, secondNumber, operator));
      secondNumber = "";
      operator = "";
      resultEl.textContent = firstNumber;
      return;
    } else if (operators.includes(value)) {
      if (!firstNumber) return;
      if (secondNumber) {
        firstNumber = String(operate(firstNumber, secondNumber, operator));
        secondNumber = "";
      }
      operator = value;
    } else if (operator) {
      if (value === "." && secondNumber.includes(".")) return;
      if (value === "0" && secondNumber === "0") return;
      if(secondNumber.length > 8) return
      secondNumber += value;
    } else {
      if (value === "." && firstNumber.includes(".")) return;
      if (value === "0" && firstNumber === "0") return;
      if(firstNumber.length > 8) return
      firstNumber += value;
    }
    resultEl.textContent = firstNumber + operator + secondNumber;
  });
});
