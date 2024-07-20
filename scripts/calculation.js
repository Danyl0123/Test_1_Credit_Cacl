// calculation.js

export const calculateDailyRepayment = (fullSum, fullPeriod, rate) => {
  const secondValue = fullSum * (rate / 100) * fullPeriod;
  const dailyRepaymentValue = (+fullSum + +secondValue.toFixed(2)) / fullPeriod;
  return dailyRepaymentValue;
};

export const calculateFullRepaymentValue = (
  dailyRepaymentValue,
  fullPeriod
) => {
  const fullRepaymentValue = dailyRepaymentValue * fullPeriod;
  return fullRepaymentValue;
};
