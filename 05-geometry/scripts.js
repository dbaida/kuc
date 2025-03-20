const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

const makeRectangleButton = document.getElementById('make-rectangle-btn');
const calcPerimeterButton = document.getElementById('calc-perimeter-btn');
const calcSquareButton = document.getElementById('calc-square-btn');
const resetInputValuesButton = document.getElementById('reset-input-values-btn');

const textInfo = document.getElementById('text-info');
const figureResult = document.getElementById('figure-result');

const printResult = (text) => {
    textInfo.textContent = text;
};

const clearErrors = () => {
    widthInput.className = '';
    heightInput.className = '';
};

const markInvalidInput = (node) => {
    node.className = 'error';
    node.focus();
};

const getDimensions = () => {
    clearErrors();

    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);

    if (isNaN(width)) {
        markInvalidInput(widthInput);
        printResult('Ширина не вказана або не є числом');
        return null;
    }

    if (isNaN(height)) {
        markInvalidInput(heightInput);
        printResult('Висота не вказана або не є числом');
        return null;
    }

    return { width, height };
};

makeRectangleButton.addEventListener('click', (e) => {
    e.preventDefault();

    const dimensions = getDimensions();
    if (!dimensions) {
        return;
    }

    figureResult.style.width = `${dimensions.width}px`;
    figureResult.style.height = `${dimensions.height}px`;

    printResult(`Намалювали фігуру розміром для ${dimensions.width} та  ${dimensions.height}`);
});

calcPerimeterButton.addEventListener('click', (e) => {
    e.preventDefault();

    const dimensions = getDimensions();
    if (!dimensions) {
        return;
    }

    const perimeter = 2 * (dimensions.width + dimensions.height);

    printResult(`Периметр для ${dimensions.width} та  ${dimensions.height} дорівнює ${perimeter}`);
});

calcSquareButton.addEventListener('click', (e) => {
    e.preventDefault();

    const dimensions = getDimensions();
    if (!dimensions) {
        return;
    }

    const square = dimensions.width * dimensions.height;

    printResult(`Площа для ${dimensions.width} та  ${dimensions.height} дорівнює ${square}`);
});

resetInputValuesButton.addEventListener('click', (e) => {
    e.preventDefault();

    widthInput.value = '';
    heightInput.value = '';

    figureResult.style.width = '0';
    figureResult.style.height = '0';

    printResult('Скинули всі значення');
});
