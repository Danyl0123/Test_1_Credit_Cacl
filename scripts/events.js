// events.js

import {
  dailyRepayment,
  fullRepayment,
  interestRate,
  submitBtn,
  sumOfCreditInput,
  repaymentPeriodInput,
  sumOfCreditUpBtn,
  sumOfCreditDownBtn,
  daysOfCreditUpBtn,
  daysOfCreditDownBtn,
  responseBlock,
  isTouched,
} from "./config.js";
import {
  validateForm,
  validateSumOfCredit,
  validateRepaymentPeriod,
} from "./validation.js";
import {
  calculateDailyRepayment,
  calculateFullRepaymentValue,
} from "./calculation.js";

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
    fullRepayment.textContent = `Повна сума виплати - ${fullRepaymentValue.toFixed(
      2
    )} грн`;
  } else {
    responseBlock.style.display = "none";
  }
  validateForm();
};

sumOfCreditInput.addEventListener("input", function () {
  isTouched.sumOfCredit = true;
  submitBtn.disabled = false;
  updateResponse();
});

repaymentPeriodInput.addEventListener("input", function () {
  isTouched.repaymentPeriod = true;
  submitBtn.disabled = false;
  updateResponse();
});

sumOfCreditUpBtn.addEventListener("click", function (event) {
  event.preventDefault();
  sumOfCreditInput.value = +sumOfCreditInput.value + 100;
  updateResponse();
});

sumOfCreditDownBtn.addEventListener("click", function (event) {
  event.preventDefault();
  sumOfCreditInput.value = +sumOfCreditInput.value - 100;
  updateResponse();
});

daysOfCreditUpBtn.addEventListener("click", function (event) {
  event.preventDefault();
  repaymentPeriodInput.value = +repaymentPeriodInput.value + 1;
  updateResponse();
});

daysOfCreditDownBtn.addEventListener("click", function (event) {
  event.preventDefault();
  repaymentPeriodInput.value = +repaymentPeriodInput.value - 1;
  updateResponse();
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const isFormValid = validateForm();
  if (isFormValid) {
    responseBlock.style.display = "block";
    submitBtn.disabled = true;
    submitBtn.classList.add(`disabled`);
  } else {
    responseBlock.style.display = "none";
  }
});