// config.js

export const sumOfCreditInput = document.querySelector("#sumOfCredit");
export const repaymentPeriodInput = document.querySelector("#repaymentPeriod");
export const dailyRepayment = document.querySelector(
  ".response-block__daily-repayment"
);
export const fullRepayment = document.querySelector(
  ".response-block__full-repayment"
);
export const submitBtn = document.querySelector(".form__btn");
export const sumOfCreditErrorBlock =
  document.querySelector("#sumOfCredit-error");
export const periodOfCreditErrorBlock = document.querySelector(
  "#periodOfCredit-error"
);
export const sumOfCreditUpBtn = document.querySelector("#sumOfCreditUp");
export const sumOfCreditDownBtn = document.querySelector("#sumOfCreditDown");
export const daysOfCreditUpBtn = document.querySelector("#periodOfCreditUp");
export const daysOfCreditDownBtn = document.querySelector(
  "#periodOfCreditDown"
);
export const responseBlock = document.querySelector(".wrapper__response-block");
export const isTouched = {
  sumOfCredit: false,
  repaymentPeriod: false,
  submitBtn: false,
};
export const interestRate = 2.2;
