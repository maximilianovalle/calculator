// OPERATIONS

function addNums(num1, num2) {
    if (typeof(num1) != "number" || typeof(num2) != "number") {
        return "NaN";
    }

    return (num1 + num2);
}

function subtractNums(num1, num2) {
    if (typeof(num1) != "number" || typeof(num2) != "number") {
        return "NaN";
    }

    return (num1 - num2);
}

function multiplyNums(num1, num2) {
    if (typeof(num1) != "number" || typeof(num2) != "number") {
        return "NaN";
    }

    return (num1 * num2);
}

function divideNums(num1, num2) {
    if (typeof(num1) != "number" || typeof(num2) != "number" || num2 == 0) {
        return "NaN";
    }

    return (num1 / num2);
}

let num1 = "", num2 = "", operator = "", currInput = "", currOutput = "";
let num1Size = 0, num2Size = 0;
let operatorStored = false;


// SCREEN DISPLAY

function displayInput() {
    const inputScreen = document.getElementById("inputContent");
    inputScreen.textContent = currInput;
}

function displayOutput() {
    const outputScreen = document.getElementById("outputContent");
    outputScreen.textContent = currOutput;
}

function updateScreenDisplay() {
    updateCurrInput();
    updateCurrOutput();
    displayInput();
    displayOutput();
}

function updateCurrInput() {
    currInput = num1;

    if (operatorStored == true) {
        currInput += " " + operator;
    }

    if (num2Size > 0) {
        currInput += " " + num2;
    }
}

function updateCurrOutput() {
    if (operatorStored == true && num2Size > 0) {

        switch(operator) {
            case "/":
                currOutput = divideNums(Number(num1), Number(num2));
                break;

            case "X":
                currOutput = multiplyNums(Number(num1), Number(num2));
                break;

            case "-":
                currOutput = subtractNums(Number(num1), Number(num2));
                break;

            case "+":
                currOutput = addNums(Number(num1), Number(num2));
                break

            default:
                currOutput = "NaN";
        }

        if (!Number.isInteger(currOutput)) { currOutput = +currOutput.toFixed(2); }

    }

    else { currOutput = ""; }
}

function resetValues() {
    num1 = "";
    num2 = "";
    operator = "";
    currInput = "";
    currOutput = "";
    operatorStored = false;
    num1positive = true;
    num2positive = true;
    outputPositive = true;
    num1Size = 0;
    num2Size = 0;
}

function clearScreen() {
    resetValues();
    updateScreenDisplay();
}

function deleteLastInput() {
    if (operatorStored == true && num2Size > 0) {
        // if (char deleted is decimal or negative symbol) { increment num2size++ }
        num2 = num2.substring(0, num2.length - 1);
        num2Size--;
    }

    else if (operatorStored == true) {
        operator = "";
        operatorStored = false;
    }

    else {
        // if (char deleted is decimal or negative symbol) { increment num1size++ }
        num1 = num1.substring(0, num1.length - 1);
        num1Size--;
    }

    updateScreenDisplay();
}


// STORE VALUES

function storeNum(input) {
    if (operatorStored == false && num1Size < 15) {
        num1 += input;
        num1Size++;

        if (num1Size > 1 && num1.charAt(0) == 0 && num1.charAt(1) != ".") {
            num1 = num1.substring(1);
            num1Size--;
        }

        else if (num1Size > 1 && num1.charAt(0) == '-' && num1.charAt(1) == 0) {
            num1 = "-" + num1.substring(2);
            num1Size--;
        }
    }
    
    else if (operatorStored == true && num2Size < 15) {
        num2 += input;
        num2Size++;

        if (num2Size > 1 && num2.charAt(0) == 0 && num2.charAt(1) != ".") {
            num2 = num2.substring(1);
            num2Size--;
        }

        else if (num2Size > 1 && num2.charAt(0) == '-' && num2.charAt(1) == 0) {
            num2 = "-" + num2.substring(2);
            num2Size--;
        }
    }
    
    updateScreenDisplay();
}

function storeOperator(input) {
    if (num1Size < 1) {
        return;
    }

    if (operatorStored == true) {
        displayFinalResult();
    }

    operator = input;
    operatorStored = true;
    updateCurrInput();
    displayInput();
}

function addDecimal() {
    if (num2Size >= 0 && operatorStored == true && num2Size < 14) {
        let decimal = false;
        for (let i = 0; i < num2.length; i++) {
            if (num2.charAt(i) == ".") {
                decimal = true;
            }
        }
        if (decimal == false && num2Size == 0) {
            num2 = "0.";
            num2Size = 1;
        }
        else if (decimal == false) { num2 += "."; }
        else if (decimal == true) { num2 = num2.replace(".", ""); }
    } 

    else if (num1Size >= 0 && operatorStored == false) {
        let decimal = false;
        for (let i = 0; i < num1.length; i++) {
            if (num1.charAt(i) == ".") {
                decimal = true;
            }
        }
        if (decimal == false && num1Size == 0) {
            num1 = "0.";
            num1Size = 1;
        }
        else if (decimal == false) { num1 += "."; }
        else if (decimal == true) { num1 = num1.replace(".", ""); }
    }

    updateScreenDisplay();
}

function changePositiveNegative() {
    if (operatorStored == true) {
        let negative = false;
        if (num2.charAt(0) == "-") {
            negative = true;
        }
        if (negative == false && num2Size == 0) {
            num2 = "-0";
            num2Size = 1;
        }
        else if (negative == false) { num2 = "-" + num2; }
        else if (negative == true) { num2 = num2.slice(1); }
    }

    else {
        let negative = false;
        if (num1.charAt(0) == "-") {
            negative = true;
        }
        if (negative == false && num1Size == 0) {
            num1 = "-0";
            num1Size = 1;
        }
        else if (negative == false) { num1 = "-" + num1; }
        else if (negative == true) { num1 = num1.slice(1); }
    }

    updateScreenDisplay();
}

function displayFinalResult() {
    if (operatorStored == true && num2Size > 0) {
        num1 = currOutput.toString();
        operator = "";
        num2 = "";
        num2Size = 0;

        operatorStored = false;

        updateScreenDisplay();
    }
}