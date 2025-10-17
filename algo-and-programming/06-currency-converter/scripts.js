const BASE_CURRENCY = 'UAH';

const usdRateInput = document.getElementById('usd-rate-input');
const eurRateInput = document.getElementById('eur-rate-input');
const gbpRateInput = document.getElementById('gbp-rate-input');
const amountInput = document.getElementById('amount-input');
const resultInput = document.getElementById('result-input');
const fromCurrencySelect = document.getElementById('from-currency-select');
const toCurrencySelect = document.getElementById('to-currency-select');
const swapButton = document.getElementById('swap-button');

const populateRates = () => {
    fetchRates().then((rates) => {
        usdRateInput.value = rates.USD;
        eurRateInput.value = rates.EUR;
        gbpRateInput.value = rates.GBP;
    });
};

const fetchRates = () => {
    return new Promise((resolve, reject) => {
        resolve({
            UAH: 1.00,
            USD: 40.75,
            EUR: 45.85,
            GBP: 52.37,
        });
    });
};

const getRates = () => {
    return {
        UAH: 1.00,
        USD: parseFloat(usdRateInput.value),
        EUR: parseFloat(eurRateInput.value),
        GBP: parseFloat(gbpRateInput.value),
    };
};

const onSwapButtonClicked = () => {
    const currentFromValue = fromCurrencySelect.value;

    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = currentFromValue;

    updateResult();
};

const updateResult = () => {
    const result = calculateResult();

    resultInput.value = isNaN(result) ? '' :  result.toFixed(2);
};

const calculateResult = () => {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    if (!fromCurrency || !toCurrency) {
        return;
    }

    const rates = getRates();
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    if (!fromRate || !toRate) {
        return;
    }

    const amount = parseFloat(amountInput.value);

    if (fromCurrency === BASE_CURRENCY) {
        return amount / toRate;
    }

    if (toCurrency === BASE_CURRENCY) {
        return amount * fromRate;
    }

    return amount * (fromRate / toRate);
};

const onFromCurrencySelectChanged = () => {
    updateResult();
};

const onToCurrencySelectChanged = () => {
    updateResult();
};

const onAmountInput = () => {
    updateResult();
};

const onRateInput = () => {
    updateResult();
};

const onWindowLoaded = () => {
    populateRates();
};

const bindEvents = () => {
    window.onload = onWindowLoaded;
    swapButton.addEventListener('click', onSwapButtonClicked);
    fromCurrencySelect.addEventListener('change', onFromCurrencySelectChanged);
    toCurrencySelect.addEventListener('change', onToCurrencySelectChanged);
    amountInput.addEventListener('input', onAmountInput);
    usdRateInput.addEventListener('input', onRateInput);
    eurRateInput.addEventListener('input', onRateInput);
    gbpRateInput.addEventListener('input', onRateInput);
};

bindEvents();
