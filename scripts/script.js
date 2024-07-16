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
    sumOfCreditErrorBlock.textContent = isTouched.sumOfCredit
      ? "Введіть лише суму кредиту"
      : "";
    isSumValid = false;
    responseBlock.style.display = "none";
  } else {
    sumOfCreditErrorBlock.textContent = "";
    if (sumValue < 1000 || sumValue > 50000) {
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
    periodOfCreditErrorBlock.textContent = isTouched.repaymentPeriod
      ? "Введіть лише кількість днів для погашення кредиту"
      : "";
    isPeriodValid = false;
    responseBlock.style.display = "none";
  } else {
    periodOfCreditErrorBlock.textContent = "";
    if (periodValue < 7 || periodValue > 60) {
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
  const sumValue = sumOfCreditInput.value;
  const periodOfRepaymentValue = repaymentPeriodInput.value;
  if (isFormValid) {
    responseBlock.style.display = "block";
    const dailyRepaymentValue = calculateDailyRepayment(
      sumValue,
      periodOfRepaymentValue,
      interestRate
    );
    const fullRepaymentValue = calculateFullRepaymentValue(
      dailyRepaymentValue,
      periodOfRepaymentValue
    );
    dailyRepayment.textContent = `Сума щоденного платежу - ${dailyRepaymentValue.toFixed(
      2
    )}`;
    fullRepayment.textContent = `Сума повного погашення - ${fullRepaymentValue}`;
    responseBlock.style.display = "block";
  } else {
    responseBlock.style.display = "none";
  }
});

sumOfCreditInput.addEventListener(`input`, function () {
  validateForm();
  isTouched.sumOfCredit = true;
});

repaymentPeriodInput.addEventListener(`input`, function () {
  validateForm();
  isTouched.repaymentPeriod = true;
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

validateForm();
