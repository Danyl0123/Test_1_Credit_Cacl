// validation.js

import {
  submitBtn,
  sumOfCreditInput,
  repaymentPeriodInput,
  sumOfCreditErrorBlock,
  periodOfCreditErrorBlock,
  responseBlock,
  isTouched,
  sumOfCreditSlider,
  repaymentPeriodSlider,
} from "./config.js";

submitBtn.disabled = true;
export const validateSumOfCredit = () => {
  const sumValue = sumOfCreditInput.value;
  const sumPattern = /^\d+$/;
  const isValidSum = sumPattern.test(sumValue);
  let isSumValid = true;

  if (!isValidSum) {
    if (isTouched.sumOfCredit) {
      sumOfCreditInput.classList.add("error-input");
    }
    sumOfCreditErrorBlock.textContent = isTouched.sumOfCredit
      ? "Введіть лише суму кредиту"
      : "";
    isSumValid = false;
    responseBlock.style.display = "none";
    sumOfCreditSlider.value = 1000;
  } else {
    sumOfCreditErrorBlock.textContent = "";
    sumOfCreditInput.classList.remove("error-input");
    if (sumValue < 1000 || sumValue > 50000) {
      sumOfCreditInput.classList.add("error-input");
      sumOfCreditErrorBlock.textContent =
        "Сума кредиту повинна бути від 1000 грн до 50000 грн";
      isSumValid = false;
      responseBlock.style.display = "none";
    }
  }

  return isSumValid;
};

export const validateRepaymentPeriod = () => {
  const periodValue = repaymentPeriodInput.value;
  const sumPattern = /^\d+$/;
  const isValidPeriod = sumPattern.test(periodValue);
  let isPeriodValid = true;

  if (!isValidPeriod) {
    if (isTouched.repaymentPeriod) {
      repaymentPeriodInput.classList.add("error-input");
    }
    periodOfCreditErrorBlock.textContent = isTouched.repaymentPeriod
      ? "Введіть лише кількість днів для погашення кредиту"
      : "";
    isPeriodValid = false;
    repaymentPeriodSlider.value = 7;
    responseBlock.style.display = "none";
  } else {
    periodOfCreditErrorBlock.textContent = "";
    repaymentPeriodInput.classList.remove("error-input");
    if (periodValue < 7 || periodValue > 60) {
      repaymentPeriodInput.classList.add("error-input");
      periodOfCreditErrorBlock.textContent =
        "Кількість днів для погашення має сягати від 7 до 60 днів";
      isPeriodValid = false;
      responseBlock.style.display = "none";
    }
  }

  return isPeriodValid;
};

export const validateForm = () => {
  const isSumValid = validateSumOfCredit();
  const isPeriodValid = validateRepaymentPeriod();
  const isFormValid = isSumValid && isPeriodValid;

  if (isFormValid) {
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.remove(`disabled`);
  } else {
    submitBtn.setAttribute("disabled", "");
    submitBtn.classList.add(`disabled`);
  }
  return isFormValid;
};
