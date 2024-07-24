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
  if (validateForm()) {
    responseBlock.style.display = "block";
  }
  updateResponse();
});

repaymentPeriodInput.addEventListener("input", function () {
  isTouched.repaymentPeriod = true;
  if (validateForm()) {
    responseBlock.style.display = "block";
  }
  updateResponse();
});

sumOfCreditUpBtn.addEventListener("click", function (event) {
  event.preventDefault();
  sumOfCreditInput.value = +sumOfCreditInput.value + 100;
  if (validateForm()) {
    responseBlock.style.display = "block";
  }
  updateResponse();
});

sumOfCreditDownBtn.addEventListener("click", function (event) {
  event.preventDefault();
  sumOfCreditInput.value = +sumOfCreditInput.value - 100;
  if (validateForm()) {
    responseBlock.style.display = "block";
  }
  updateResponse();
});

daysOfCreditUpBtn.addEventListener("click", function (event) {
  event.preventDefault();
  repaymentPeriodInput.value = +repaymentPeriodInput.value + 1;
  if (validateForm()) {
    responseBlock.style.display = "block";
  }
  updateResponse();
});

daysOfCreditDownBtn.addEventListener("click", function (event) {
  event.preventDefault();
  repaymentPeriodInput.value = +repaymentPeriodInput.value - 1;

  updateResponse();
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
});
