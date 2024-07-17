To open this project you need to:
  -clone or download the repository
  -install dependencies - "npm install"
  -run the script in the terminal - "npm run run"

  Here is a brief description of the implemented functionality:

Selecting DOM Elements:
   -Various DOM elements are selected, such as input fields, buttons, error message blocks, and the response block.

Validation Functions:
  -validateSumOfCredit: Checks the entered credit amount to ensure it is a number and falls within the specified range (from 1000 to 50000).
  -validateRepaymentPeriod: Checks the entered repayment period to ensure it is a number and falls within the specified range (from 7 to 60 days).
  -validateForm: Checks the overall correctness of the form based on individual input validations and enables or disables the submit button accordingly.

  
Calculation Functions:
  -calculateDailyRepayment: Calculates the daily repayment amount based on the credit amount, repayment period, and interest rate.
  -calculateFullRepaymentValue: Calculates the total repayment amount based on the daily repayment and repayment period.

  
Event Handlers:
  -input events on the credit amount and repayment period input fields to trigger validation and update calculations in real-time.
  -click events on the submit button and increment/decrement buttons for the credit amount and repayment period to adjust values and update the response.

  
Update Function:
  -updateResponse: A central function to handle validation and update calculations, as well as display or hide the response block depending on the form's validity.
