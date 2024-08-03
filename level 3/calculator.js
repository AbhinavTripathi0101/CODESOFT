document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let currentInput = "";
  let currentOperator = "";
  let firstOperand = "";

  const updateDisplay = (value) => {
    display.textContent = value;
  };

  const clearDisplay = () => {
    currentInput = "";
    currentOperator = "";
    firstOperand = "";
    updateDisplay("0");
  };

  const deleteLastInput = () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  };

  const handleNumberInput = (number) => {
    currentInput += number;
    updateDisplay(currentInput);
  };

  const handleDecimalInput = () => {
    if (!currentInput.includes(".")) {
      currentInput += ".";
      updateDisplay(currentInput);
    }
  };

  const handleOperatorInput = (operator) => {
    if (currentInput === "" && operator === "-") {
      currentInput = "-";
      updateDisplay(currentInput);
      return;
    }
    if (firstOperand && currentOperator) {
      calculateResult();
    }
    firstOperand = currentInput;
    currentOperator = operator;
    currentInput = "";
  };

  const calculateResult = () => {
    let result;
    const secondOperand = currentInput;
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);

    if (isNaN(a) || isNaN(b)) {
      return;
    }

    switch (currentOperator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = a / b;
        break;
      default:
        return;
    }

    updateDisplay(result);
    firstOperand = result.toString();
    currentInput = "";
    currentOperator = "";
  };

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");

      if (action === "number") {
        handleNumberInput(button.textContent);
      } else if (action === "decimal") {
        handleDecimalInput();
      } else if (action === "clear") {
        clearDisplay();
      } else if (action === "delete") {
        deleteLastInput();
      } else if (action === "operation") {
        handleOperatorInput(button.textContent);
      } else if (action === "calculate") {
        calculateResult();
      }
    });
  });
});
