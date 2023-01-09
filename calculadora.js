class Calculator {
  firstNumber;
  nextNumber;
  decimalLength = "0000";

  constructor(firstNumber, nextNumber) {
    this.firstNumber = firstNumber * 1;
    this.nextNumber = nextNumber * 1;
  }

  rounding(toBeRounded) {
    return (
      Math.floor(toBeRounded * ("1" + this.decimalLength)) /
      ("1" + this.decimalLength)
    );
  }

  get addition() {
    return this.rounding(this.firstNumber + this.nextNumber);
  }
  get substraction() {
    return this.rounding(this.firstNumber - this.nextNumber);
  }
  get multiplication() {
    return this.rounding(this.firstNumber * this.nextNumber);
  }
  get division() {
    return this.rounding(this.firstNumber / this.nextNumber);
  }
  get squareRoot() {
    return this.rounding(Math.sqrt(this.firstNumber));
  }
}

let inputDisplay = [];
let inputsBuffer = [];
let calculatorOperations = {};
let decimalOperatorCounter = 0;
let equalOperatorCounter = 0;

const getNumber = (id) => {
  const number = document.getElementById(id);
  const zeroClear = document.getElementById("on");

  number.addEventListener("click", () => {
    equalOperatorCounter = 0;

    if ([...inputDisplay.join("")].length < 13) {
      if (id === "decimal") {
        decimalOperatorCounter++;
      }

      if (decimalOperatorCounter === 1 || id !== "decimal") {
        const numberValue = number.value;
        const zeroOn = zeroClear.parentNode;

        if (zeroOn) {
          zeroOn.removeChild(zeroClear);
        }

        if (inputDisplay.length < 13) {
          inputDisplay.push(numberValue);
          showInDisplay(inputDisplay[inputDisplay.length - 1]);
        }
      }
    }
  });
};

const showInDisplay = (number) => {
  const workingDisplay = document.createElement("span");
  workingDisplay.textContent = number;

  const display = document.getElementById("display-numbers");
  display.appendChild(workingDisplay);
};

const operationLauncher = (id) => {
  const operator = document.getElementById(id);
  const zeroClear = document.getElementById("on");

  operator.addEventListener("click", () => {
    decimalOperatorCounter = 0;

    if (id === "all-clear") {
      location.reload();
    }

    if (id === "equal") {
      if (!calculatorOperations.operator) {
      } else {
        equalOperatorCounter++;
        equalStopper();
      }
    }

    if (equalOperatorCounter === 1 || id !== "equal") {
      const zeroOn = zeroClear.parentNode;

      if (zeroOn) {
        zeroOn.removeChild(zeroClear);
      }

      if (Object.keys(calculatorOperations).length === 3) {
        inputDisplay.push("=");
        showInDisplay(calculatorOperations.numberA);
      } else {
        inputDisplay.push(operatorIdentifier(id));
        showInDisplay(inputDisplay[inputDisplay.length - 1]);
      }

      inputDisplay.pop();
      inputsBuffer.push(inputDisplay.join(""));
      inputDisplay = [];

      if (!calculatorOperations.operator) {
        calculatorOperations.operator = operatorIdentifier(id);
        calculatorOperations.numberA = +inputsBuffer[0];
      } else {
        calculatorOperations.numberB = +inputsBuffer[1];
        inputsBuffer.shift();

        if (calculatorOperations.operator === "=") {
          calculatorOperations.operator = operatorIdentifier(id);
          OperationSetWithEqual(id);
        } else if (calculatorOperations.operator === "+") {
          const operation = new Calculator(
            calculatorOperations.numberA,
            calculatorOperations.numberB
          );
          calculatorOperations.numberN = operation.addition;
          calculatorOperations.operator = operatorIdentifier(id);
        } else if (calculatorOperations.operator === "-") {
          const operation = new Calculator(
            calculatorOperations.numberA,
            calculatorOperations.numberB
          );
          calculatorOperations.numberN = operation.substraction;
          calculatorOperations.operator = operatorIdentifier(id);
        } else if (calculatorOperations.operator === "x") {
          if (!calculatorOperations.numberB) {
            calculatorOperations.numberB = 1;
          }

          const operation = new Calculator(
            calculatorOperations.numberA,
            calculatorOperations.numberB
          );
          calculatorOperations.numberN = operation.multiplication;
          calculatorOperations.operator = operatorIdentifier(id);
        } else if (calculatorOperations.operator === "÷") {
          if (!calculatorOperations.numberB) {
            calculatorOperations.numberB = 1;
          }

          const operation = new Calculator(
            calculatorOperations.numberA,
            calculatorOperations.numberB
          );
          calculatorOperations.numberN = operation.division;
          calculatorOperations.operator = operatorIdentifier(id);
        } else if (calculatorOperations.operator === "√") {
          if (!calculatorOperations.numberB) {
            calculatorOperations.numberB = 1;
          }

          const operation = new Calculator(
            calculatorOperations.numberA,
            calculatorOperations.numberB
          );
          calculatorOperations.numberN = operation.squareRoot;
          calculatorOperations.operator = operatorIdentifier(id);

          operationLauncher("equal");
        }

        displayCleaner();

        showInDisplay(calculatorOperations.numberN);
        inputsBuffer = [];
        inputsBuffer[0] = calculatorOperations.numberN;
        calculatorOperations.numberA = inputsBuffer[0];

        showInDisplay(operatorIdentifier(id));
      }
    }
  });
};

displayCleaner = () => {
  const displayClear = document.getElementById("display-numbers");
  const displayUsed = displayClear.parentNode;
  displayUsed.removeChild(displayClear);

  const resetedDisplay = document.createElement("span");
  resetedDisplay.setAttribute("id", "display-numbers");
  const display = document.querySelector(".calculator-display");
  display.appendChild(resetedDisplay);
};

const equalStopper = () => {
  const getLastDisplayData = document.getElementById("display-numbers");
  const displayData = getLastDisplayData.textContent;
  console.log(displayData);

  if (
    !isNaN(+displayData.substring(displayData.length - 1, displayData.length))
  ) {
    const dataTransformForObject = displayData.substring(
      0,
      displayData.length - 1
    );
    calculatorOperations.lastDisplayData = dataTransformForObject;
  }

  if (equalOperatorCounter === 1) {
    displayCleaner();
  }
};

const OperationSetWithEqual = (id) => {
  if (calculatorOperations.operator === "+") {
    const operation = new Calculator(
      calculatorOperations.numberA,
      calculatorOperations.numberB
    );
    calculatorOperations.numberN = operation.addition;
    calculatorOperations.operator = operatorIdentifier(id);
  } else if (calculatorOperations.operator === "-") {
    const operation = new Calculator(
      calculatorOperations.numberA,
      calculatorOperations.numberB
    );
    calculatorOperations.numberN = operation.substraction;
    calculatorOperations.operator = operatorIdentifier(id);
  } else if (calculatorOperations.operator === "x") {
    if (!calculatorOperations.numberB) {
      calculatorOperations.numberB = 1;
    }

    const operation = new Calculator(
      calculatorOperations.numberA,
      calculatorOperations.numberB
    );
    calculatorOperations.numberN = operation.multiplication;
    calculatorOperations.operator = operatorIdentifier(id);
  } else if (calculatorOperations.operator === "÷") {
    if (!calculatorOperations.numberB) {
      calculatorOperations.numberB = 1;
    }

    const operation = new Calculator(
      calculatorOperations.numberA,
      calculatorOperations.numberB
    );
    calculatorOperations.numberN = operation.division;
    calculatorOperations.operator = operatorIdentifier(id);
  }
};

const operatorIdentifier = (id) => {
  let operatorID = id;
  switch (operatorID) {
    case "add":
      return "+";
    case "substract":
      return "-";
    case "multiplicate":
      return "x";
    case "divide":
      return "÷";
    case "percentage":
      return "%";
    case "square-root":
      return "√";
    case "decimal":
      return ".";
    case "equal":
      return "=";
    case "all-clear":
      return "C";
    default:
      return "err";
  }
};

getNumber("0");
getNumber("1");
getNumber("2");
getNumber("3");
getNumber("4");
getNumber("5");
getNumber("6");
getNumber("7");
getNumber("8");
getNumber("9");
getNumber("decimal");

operationLauncher("add");
operationLauncher("substract");
operationLauncher("multiplicate");
operationLauncher("divide");
operationLauncher("all-clear");
operationLauncher("square-root");
operationLauncher("equal");
