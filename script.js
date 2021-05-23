let screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
let screenValue = '';
for (item of buttons) {
    item.addEventListener('click', (e) => {
        buttonText = e.target.innerText;
        console.log('Button text is ', buttonText);
        if (buttonText == 'X') {
            buttonText = '*';
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText === 'CE') {
            screenValue = "";
            screen.value = screenValue;
        }
        else if (buttonText === 'AC') {
            screenValue = "";
            screen.value = screenValue;
        }
        else if (buttonText === '=') {
            screen.value = calcNotEval(screenValue);
            // screenValue = ""; //check
            // screen.value = screenValue;

        }
        else {
            screenValue += buttonText;
            screen.value = screenValue;
        }

    })
}

function parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    let calculation = [],
        current = '';
    for (let i = 0, ch; ch = s.charAt(i); i++) {
        // ^
        if ('*/+-'.indexOf(ch) > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(parseFloat(current), ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }
    if (current != '') {
        calculation.push(parseFloat(current));
    }
    return calculation;
}

function calculate(calc) {
    // --- Perform a calculation expressed as an array of operators and numbers
    let ops = [
                // {'^': (a, b) => Math.pow(a, b)},
               {'*': (a, b) => a * b, '/': (a, b) => a / b},
               {'+': (a, b) => a + b, '-': (a, b) => a - b}],
        newCalc = [],
        currentOp;
    for (let i = 0; i < ops.length; i++) {
        for (let j = 0; j < calc.length; j++) {
            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = 
                    currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
            console.log(newCalc);
        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error: unable to resolve calculation');
        return calc;
    } else {
        return calc[0];
    }
}

function calcNotEval(str) {
  const noWsStr = str.replace(/\s/g, '');
  const operators = noWsStr.replace(/[\d.,]/g, '').split('');
  const operands = noWsStr.replace(/[+/%*-]/g, ' ')
                          .replace(/\,/g, '.')
                          .split(' ')
                          .map(parseFloat)
                          .filter(it => it);

  if (operators.length >= operands.length){
    throw new Error('Operators qty must be lesser than operands qty')
  };

  while (operators.includes('*')) {
    let opIndex = operators.indexOf('*');
    operands.splice(opIndex, 2, operands[opIndex] * operands[opIndex + 1]);
    operators.splice(opIndex, 1);
  };
  while (operators.includes('/')) {
    let opIndex = operators.indexOf('/');
    operands.splice(opIndex, 2, operands[opIndex] / operands[opIndex + 1]);
    operators.splice(opIndex, 1);
  };
  while (operators.includes('%')) {
    let opIndex = operators.indexOf('%');
    operands.splice(opIndex, 2, operands[opIndex] % operands[opIndex + 1]);
    operators.splice(opIndex, 1);
  };

  let result = operands[0];
  for (let i = 0; i < operators.length; i++) {
    operators[i] === '+' ? (result += operands[i + 1]) : (result -= operands[i + 1])
  }
  return result
}