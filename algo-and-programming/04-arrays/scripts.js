let arr = [];

const buttons = document.querySelectorAll('button');
const result = document.getElementById('action-result');
const userInput = document.getElementById('user-input');

const redrawCurrArray = () => {
    document.getElementById('curr-array').textContent = `[${arr}]`;
};

const printResult = (text) => {
    result.textContent = text;
};

const fixAction = (button) => {
    arr = userInput.value.split(',').map(number => parseInt(number.trim())).filter((v) => !isNaN(v));

    redrawCurrArray();
};

const resetAction = () => {
    userInput.value = '';
    arr = [];
    redrawCurrArray();
};

const ensureArrayFixed = () => {
    if (!arr.length) {
        printResult('Для цієї операції потрібно ввести та зафіксувати значення');
        return false;
    }
    return true;
};

const findMaxAction = (button) => {
    if (!ensureArrayFixed()) {
        return;
    }
    let max = arr[0];

    for (const val of arr) {
        if (val > max) {
            max = val;
        }
    }

    printResult(max);
};

const findMinAction = (button) => {
    if (!ensureArrayFixed()) {
        return;
    }
    let min = arr[0];

    for (const val of arr) {
        if (val < min) {
            min = val;
        }
    }

    printResult(min);
};

const deleteMaxAction = (button) => {
    if (!ensureArrayFixed()) {
        return;
    }
    let maxIndex = 0;
    let maxValue = arr[maxIndex];
    let val;

    for (let i = 0; i < arr.length; i++) {
        val = arr[i];
        if (val > maxValue) {
            maxValue = val;
            maxIndex = i;
        }
    }

    arr = arr.filter(v => maxValue !== v);
    redrawCurrArray();

    printResult(`Видалили "${maxValue}"`);
};

const deleteMinAction = (button) => {
    if (!ensureArrayFixed()) {
        return;
    }
    let minIndex = 0;
    let minValue = arr[minIndex];
    let val;

    for (let i = 0; i < arr.length; i++) {
        val = arr[i];
        if (val < minValue) {
            minValue = val;
            minIndex = i;
        }
    }

    arr = arr.filter(v => minValue !== v);
    redrawCurrArray();

    printResult(`Видалили "${minValue}"`);
};

const sumAction = (button) => {
    if (!ensureArrayFixed()) {
        return;
    }
    let sum = 0;

    for (const val of arr) {
        sum += val;
    }

    printResult(sum);
};

const countPositiveNumbersAction = (button) => {
    const positiveNumbers = arr.filter(v => v >= 0);

    printResult(positiveNumbers.length);
};

const countNegativeNumbersAction = (button) => {
    const negativeNumbers = arr.filter(v => v < 0);

    printResult(negativeNumbers.length);
};

const isNumberAction = (button) => {
    const containsNumbers = !!arr.find(v => !isNaN(v));

    printResult(containsNumbers ? 'Так' : 'Ніт');
};

const actions = {
    'fix': fixAction,
    'reset': resetAction,
    'max': findMaxAction,
    'min': findMinAction,
    'delete-highest': deleteMaxAction,
    'delete-lowest': deleteMinAction,
    'sum': sumAction,
    'count-positive-nums': countPositiveNumbersAction,
    'count-negative-nums': countNegativeNumbersAction,
    'is-number': isNumberAction,
};

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const action = button.dataset.action;

        const fn = actions[action];
        if (!fn) {
            console.warn(`Action "${action}" not implemented yet`);
            printResult(`Дія "${action}" не імплементована`);

            return;
        }

        fn(button);
    });
});
