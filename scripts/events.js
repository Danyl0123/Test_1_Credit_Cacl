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
  repaymentPeriodSlider,
  sumOfCreditSlider,
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
  sumOfCreditSlider.value = this.value;
  updateResponse();
});

repaymentPeriodInput.addEventListener("input", function () {
  isTouched.repaymentPeriod = true;
  if (validateForm()) {
    responseBlock.style.display = "block";
  }
  repaymentPeriodSlider.value = this.value;
  updateResponse();
});

sumOfCreditSlider.addEventListener("input", function () {
  sumOfCreditInput.value = this.value;
  sumOfCreditInput.textContent = this.value;
  if (validateForm()) {
    responseBlock.style.display = "block";
  }
  updateResponse();
});
repaymentPeriodSlider.addEventListener("input", function () {
  repaymentPeriodInput.value = this.value;
  repaymentPeriodInput.textContent = this.value;
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
  sumOfCreditSlider.value = sumOfCreditInput.value;
  updateResponse();
});

sumOfCreditDownBtn.addEventListener("click", function (event) {
  event.preventDefault();
  sumOfCreditInput.value = +sumOfCreditInput.value - 100;
  if (validateForm()) {
    responseBlock.style.display = "block";
  }
  sumOfCreditSlider.value = sumOfCreditInput.value;
  updateResponse();
});

daysOfCreditUpBtn.addEventListener("click", function (event) {
  event.preventDefault();
  repaymentPeriodInput.value = +repaymentPeriodInput.value + 1;
  if (validateForm()) {
    responseBlock.style.display = "block";
  }
  repaymentPeriodSlider.value = repaymentPeriodInput.value;
  updateResponse();
});

daysOfCreditDownBtn.addEventListener("click", function (event) {
  event.preventDefault();
  repaymentPeriodInput.value = +repaymentPeriodInput.value - 1;
  if (validateForm()) {
    responseBlock.style.display = "block";
  }
  repaymentPeriodSlider.value = repaymentPeriodInput.value;
  updateResponse();
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
});
