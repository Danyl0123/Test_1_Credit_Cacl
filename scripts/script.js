const sumOfCreditInput = document.querySelector(`#sumOfCredit`);
const repaymentPeriodInput = document.querySelector(`#repaymentPeriod`);
const dailyRepayment = document.querySelector(
  `.response-block__daily-repayment`
);
const fullRepayment = document.querySelector(`.response-block__full-repayment`);
const submitBtn = document.querySelector(`.form__btn`);
const sumOfCreditErrorBlock = document.querySelector(`#sumOfCredit-error`);
const periodOfCreditErrorBlock = document.querySelector(
  `#periodOfCredit-error`
);
const sumOfCreditUpBtn = document.querySelector(`#sumOfCreditUp`);
const sumOfCreditDownBtn = document.querySelector(`#sumOfCreditDown`);
const daysOfCreditUpBtn = document.querySelector(`#periodOfCreditUp`);
const daysOfCreditDownBtn = document.querySelector(`#periodOfCreditDown`);
const responseBlock = document.querySelector(`.wrapper__response-block`);
const isTouched = {
  sumOfCredit: false,
  repaymentPeriod: false,
};
const interestRate = 2.2;

const validateSumOfCredit = () => {
  const sumValue = sumOfCreditInput.value;
  const sumPattern = /^\d+$/;
  const isValidSum = sumPattern.test(sumValue);
  let isSumValid = true;

  if (!isValidSum) {
    isTouched.sumOfCredit
      ? sumOfCreditInput.classList.add(`error-input`)
      : null;
    sumOfCreditErrorBlock.textContent = isTouched.sumOfCredit
      ? "Введіть лише суму кредиту"
      : "";
    isSumValid = false;
    responseBlock.style.display = "none";
  } else {
    sumOfCreditErrorBlock.textContent = "";
    sumOfCreditInput.classList.remove(`error-input`);
    if (sumValue < 1000 || sumValue > 50000) {
      sumOfCreditInput.classList.add(`error-input`);
      sumOfCreditErrorBlock.textContent =
        "Сума кредиту повинна бути від 1000 грн до 50000 грн";
      isSumValid = false;
      responseBlock.style.display = "none";
    }
  }

  return isSumValid;
};

const validateRepaymentPeriod = () => {
  const periodValue = repaymentPeriodInput.value;
  const sumPattern = /^\d+$/;
  const isValidPeriod = sumPattern.test(periodValue);
  let isPeriodValid = true;

  if (!isValidPeriod) {
    isTouched.repaymentPeriod
      ? repaymentPeriodInput.classList.add(`error-input`)
      : null;
    periodOfCreditErrorBlock.textContent = isTouched.repaymentPeriod
      ? "Введіть лише кількість днів для погашення кредиту"
      : "";
    isPeriodValid = false;
    responseBlock.style.display = "none";
  } else {
    periodOfCreditErrorBlock.textContent = "";
    repaymentPeriodInput.classList.remove(`error-input`);
    if (periodValue < 7 || periodValue > 60) {
      repaymentPeriodInput.classList.add(`error-input`);
      periodOfCreditErrorBlock.textContent =
        "Кількість днів для погашення має сягати від 7 до 60 днів";
      isPeriodValid = false;
      responseBlock.style.display = "none";
    }
  }

  return isPeriodValid;
};

const validateForm = () => {
  const isSumValid = validateSumOfCredit();
  const isPeriodValid = validateRepaymentPeriod();
  const isFormValid = isSumValid && isPeriodValid;

  isFormValid
    ? submitBtn.removeAttribute(`disabled`)
    : submitBtn.setAttribute(`disabled`, ``);
  return isFormValid;
};

submitBtn.addEventListener(`click`, function (event) {
  event.preventDefault();
  const isFormValid = validateForm();
  if (isFormValid) {
    responseBlock.style.display = "block";
  } else {
    responseBlock.style.display = "none";
  }
});

sumOfCreditInput.addEventListener(`input`, function () {
  isTouched.sumOfCredit = true;
  updateResponse();
});

repaymentPeriodInput.addEventListener(`input`, function () {
  isTouched.repaymentPeriod = true;
  updateResponse();
});

const calculateDailyRepayment = (fullSum, fullPeriod, rate) => {
  const secondValue = fullSum * (rate / 100) * fullPeriod;
  const dailyRepaymentValue = (+fullSum + +secondValue.toFixed(2)) / fullPeriod;
  return dailyRepaymentValue;
};

const calculateFullRepaymentValue = (dailyRepaymentValue, fullPeriod) => {
  const fullRepaymentValue = dailyRepaymentValue * fullPeriod;
  return fullRepaymentValue;
};

sumOfCreditUpBtn.addEventListener(`click`, function (event) {
  event.preventDefault();
  sumOfCreditInput.value = +sumOfCreditInput.value + 100;
  updateResponse();
});

sumOfCreditDownBtn.addEventListener(`click`, function (event) {
  event.preventDefault();
  sumOfCreditInput.value = +sumOfCreditInput.value - 100;
  updateResponse();
});

daysOfCreditUpBtn.addEventListener(`click`, function (event) {
  event.preventDefault();
  repaymentPeriodInput.value = +repaymentPeriodInput.value + 1;
  updateResponse();
});

daysOfCreditDownBtn.addEventListener(`click`, function (event) {
  event.preventDefault();
  repaymentPeriodInput.value = +repaymentPeriodInput.value - 1;
  updateResponse();
});

const updateResponse = () => {
  const sumValue = sumOfCreditInput.value;
  const periodOfRepaymentValue = repaymentPeriodInput.value;

  if (validateSumOfCredit() && validateRepaymentPeriod()) {
    const dailyRepaymentValue = calculateDailyRepayment(
      sumValue,
      periodOfRepaymentValue,
      interestRate
    );
    const fullRepaymentValue = calculateFullRepaymentValue(
      dailyRepaymentValue,
      periodOfRepaymentValue
    );

    dailyRepayment.textContent = `Щоденний платіж - ${dailyRepaymentValue.toFixed(
      2
    )} грн`;
    fullRepayment.textContent = `Повна сума виплати - ${fullRepaymentValue} грн`;
  } else {
    responseBlock.style.display = "none";
  }
  validateForm();
};

validateForm();
