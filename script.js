// OPERATIONS

function addNums(num1, num) {
    return (num1 + num2);
}

function subtractNums(num1, num2) {
    return (num1 - num2);
}

function multiplyNums(num1, num2) {
    return (num1 * num2);
}

function divideNums(num1, num2) {
    return (num1 / num2);
}

let num1 = "", num2 = "", operator = "", currInput = "", currOutput = "";
let num1Stored = false, operatorStored = false, inputDone = false, num1positive = true, num2positive = true;

// SCREEN DISPLAY

function displayInput() {
    const inputScreen = document.getElementById("inputContent");
    inputScreen.textContent = currInput;
}

function displayOutput() {
    const outputScreen = document.getElementById("outputContent");
    outputScreen.textContent = currOutput;
}

function updateCurrInput() {
    currInput = num1;

    if (operatorStored == true) {
        currInput += " " + operator;
    }

    if (num1Stored == true) {
        currInput += " " + num2;
    }
}

function updateCurrOutput() {
    if (num1Stored == true && operatorStored == true) {

        switch(operator) {
            case "/":
                if (Number(num2) == 0) { currOutput = "ERROR"; }
                else { currOutput = Number(num1) / Number(num2); }
                break;

            case "X":
                currOutput = Number(num1) * Number(num2);
                break;

            case "-":
                currOutput = Number(num1) - Number(num2);
                break;

            case "+":
                currOutput = Number(num1) + Number(num2);
                break

            default:
                currOutput = "ERROR";
        }

    }
}

function resetValues() {
    num1 = "";
    num2 = "";
    operator = "";
    currInput = "";
    currOutput = "";
    num1Stored = false;
    operatorStored = false;
    inputDone = false;
    num1positive = true;
    num2positive = true;
}

function clearScreen() {
    resetValues();
    displayInput();
    displayOutput();
}

function deleteLastInput() {
    if (operatorStored == true && num2.length > 0) {
        num2 = num2.substring(0, num2.length - 1);
    }

    else if (operatorStored == true) {
        operator = "";
        operatorStored = num1Stored = false;
    }

    else {
        num1 = num1.substring(0, num1.length - 1);
    }

    updateCurrInput();
    updateCurrOutput();
    displayInput();
    displayOutput();
}

// STORE VALUES

function storeNum(input) {
    if (num1Stored == false && num1.length < 15) {
        num1 += input;

        if (num1.length > 1 && num1.charAt(0) == 0) {
            num1 = num1.substring(1);
        }
    }
    
    else if (num2.length < 15) {
        num2 += input;

        if (num2.length > 1 && num2.charAt(0) == 0) {
            num2 = num2.substring(1);
        }
    }
    
    updateCurrInput();
    updateCurrOutput();
    displayInput();
    displayOutput();
}

function storeOperator(input) {
    if (num1.length < 1) {
        return;
    }

    operator = input;
    num1Stored = operatorStored = true;
    updateCurrInput();
    displayInput();
}

function changePositiveNegative() {
    if (operatorStored == true && num2.length > 0) {

        if (num2positive == true) {
            num2 = "-" + num2;
            num2positive = false;
        }

        else {
            num2 = num2.substring(1);
            num2positive = true;
        }

    }

    else if (num1.length > 0) {

        if (num1positive == true) {
            num1 = "-" + num1;
            num1positive = false;
        }

        else {
            num1 = num1.substring(1);
            num1positive = true;
        }
        
    }

    updateCurrInput();
    updateCurrOutput();
    displayInput();
    displayOutput();
}