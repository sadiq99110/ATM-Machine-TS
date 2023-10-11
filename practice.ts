let pinAttempts: number = 3;
let accountBalance: number = 10000;
const accountNumbers: string[] = [
  "1234567890123",
  "9876543210987",
  "5555555555555",
  // Add more account numbers as needed
];

let correctPin: string = "1234";


// Pin Validation
let userPinSection = document.getElementById('user-pin-section') as HTMLDivElement
let userPinValue = document.getElementById('user-pin') as HTMLInputElement
let userPinSubmit = document.getElementById('user-pin-submit') as HTMLInputElement
let userPinText = document.getElementById('user-pin-value') as HTMLParagraphElement
let userPinResponse = document.getElementById('pin-response') as HTMLParagraphElement

// Choose options
let userSection = document.getElementById('choose-para') as HTMLDivElement
let selectedItems = document.getElementById('option-items') as HTMLSelectElement
let userSelectedItem = document.getElementById('selected-item') as HTMLParagraphElement 


// Withdraw user functionality access from DOM
let userWithDrawSection = document.getElementById('withdraw-option-section') as HTMLDivElement
let userWithDrawAmount = document.getElementById('user-withdraw-amount') as HTMLInputElement
let userWithDrawAmountButton = document.getElementById('user-withdraw-submit') as HTMLInputElement
let userWithDrawAmountResponse = document.getElementById('user-withdraw-amount-response') as HTMLParagraphElement

// Transfer User Functionality access from DOM
let userTransferSection = document.getElementById('user-amount-transfer') as HTMLDivElement
let userTransferSectionAmount = document.getElementById('user-amount-transfer-number') as HTMLInputElement
let userTransferSectionButton = document.getElementById('user-amount-transfer-verify') as HTMLInputElement
let userTransferSectionPara = document.getElementById('user-amount-transfer-para') as HTMLParagraphElement
let userTransfer = document.getElementById('user-transfer') as HTMLDivElement
let userTransferPara = document.getElementById('user-transfer-para') as HTMLParagraphElement
let userTransferAmount = document.getElementById('user-amount') as HTMLInputElement
let userTransferButton = document.getElementById('user-amount-transfer-new') as HTMLInputElement
let userTransferParaResponse = document.getElementById('user-transfer-response') as HTMLParagraphElement

// Reset Pin functionality access from DOM
let userResetPinSection = document.getElementById('user-reset-pin') as HTMLDivElement
let userResetPinOld = document.getElementById('user-reset-pin-old') as HTMLInputElement
let userResetPinVerify = document.getElementById('user-reset-pin--verify-button') as HTMLInputElement
let userResetPinResponse = document.getElementById('user-reset-pin-response') as HTMLParagraphElement
let userSubmitPinSection = document.getElementById('user-submit-new-pin') as HTMLDivElement
let userNewPin = document.getElementById('user-reset-pin-new') as HTMLInputElement
let userSubmitNewPin = document.getElementById('user-submit-new-pin-button') as HTMLInputElement
let userSubmitPinResponse = document.getElementById('user-update-pin-response') as HTMLParagraphElement




// User Next Proceed access from DOM
let userNextProceed = document.getElementById('user-next-proceed') as HTMLDivElement
let userNextProceedYes = document.getElementById('user-next-proceed-button-yes') as HTMLInputElement
let userNextProceedNo = document.getElementById('user-next-proceed-button-no') as HTMLInputElement

// Thankyou para
let userLastThankYou = document.getElementById('user-thankyou') as HTMLDivElement

// User Balance Check access from DOM
let userCheckBalance = document.getElementById('user-check-balance') as HTMLDivElement
let userCheckBalancePara = document.getElementById('user-check-balance-para') as HTMLParagraphElement

// User Submit pin functionality
userPinSubmit.addEventListener('click', () => {
    userPinText.innerText = userPinValue.value
    if (userPinValue.value === correctPin) {
        userPinResponse.innerText = `Valid pin`
        userSection.style.display = "block"
        userPinSection.style.display = 'none'
          return true;
        }    
    else{
        pinAttempts--;
        if(pinAttempts == 0){
            userPinSubmit.style.display = 'none'
        } 
        userPinResponse.innerText = `Incorrect PIN. ${pinAttempts} attempts left.`
    }    
})


// Show user services
selectedItems.addEventListener('change', (event: Event) => {
    const tmp = event.target as HTMLSelectElement;
    // userSelectedItem.innerText = tmp.value

switch (tmp.value) {
    case "withdraw":
        console.log("withdraw");
      withdraw();
      break;
    case "checkbalance":
        console.log("balancecheck");
        checkbalance()  
        
    //   checkBalance();
      break;
    case "transfer":
        console.log("transfer");
        TransferAmount()
        
    //   transfer();
      break;
    case "changepin":
        changePin()
        console.log("changepin");
        
    //   changePin();
      break;
    case "exit":
        console.log("exit");
        userSection.style.display = 'none'
        userLastThankYou.style.display = 'block'
        
    //   alert("Exiting the application. Thank you!");
      pinAttempts = 0; 
      break;
    default:
    //   alert("Invalid option. Please try again.");
  }
})


// WithDraw Functionality

userWithDrawAmountButton.addEventListener('click', () => {
  let withdrawAmount: number = parseInt(userWithDrawAmount.value);

  if (!isNaN(withdrawAmount) && withdrawAmount >= 500 && withdrawAmount <= 25000 && withdrawAmount <= accountBalance) {
      accountBalance -= withdrawAmount;
      userWithDrawAmountResponse.innerText = 'Withdrawal successful! Remaining balance: ' + accountBalance;
      userNextProceed.style.display = 'block';
  } else {
      userWithDrawAmountResponse.innerText = 'Invalid withdrawal amount. Please try again.';
  }
});
const withdraw = () : void => {
  userWithDrawSection.style.display = 'block';
  userSection.style.display = "none";
  userWithDrawAmount.value = '';  // Clear the input field
  userWithDrawAmountResponse.innerText = '';  // Clear the response message
  userNextProceed.style.display = 'none';  // Hide the "Yes" button
}

// User Transfer Amount Functionality

// User Account Number verification
userTransferSectionButton.addEventListener('click', () => {
  const userEnteredAccountNumber = userTransferSectionAmount.value;
  if (userEnteredAccountNumber.length < 13) {
      alert('Account number must be 13 characters long.');
  } else {
      // if the user-entered account number matches any of the account numbers
      const isAccountNumberValid = accountNumbers.some(accountNumber => accountNumber === userEnteredAccountNumber);

      if (isAccountNumberValid) {
          userTransferSection.style.display = "none"
          userTransferSection.style.display = "none"
          userTransferPara.innerHTML = "Enter Your amount that you need to transfer"
          userTransfer.style.display = 'block'
          userTransferSectionPara.style.display = 'none'

      } else {
          console.log('No');
          userTransferSectionPara.innerHTML = "Invalid User"
      }
  }
});

// Transfer Amount from balance
userTransferButton.addEventListener('click', () => {
  console.log("Test", userTransferAmount.value);
  
  let transferAmount : number = parseInt(userTransferAmount.value)
  console.log("Test 02", transferAmount);
  if(!isNaN(transferAmount) && transferAmount >= 1 && transferAmount <= accountBalance){
    accountBalance -= transferAmount
    userTransferParaResponse.innerText = `Transfer successful! Remaining balance: $${accountBalance}`
    userNextProceed.style.display = 'block';
  }else{
    userTransferParaResponse.innerText = `Invalid transfer amount. Please try again.`
  }
})

const TransferAmount = () : void => {
  userTransferSection.style.display = "block"
  userSection.style.display = "none";
}

// Change Pin Functionality

// Update New Pin
userSubmitNewPin.addEventListener('click', () => {  
  let userNewUpdatePin = userNewPin.value
  console.log("userNewUpdatePin", userNewUpdatePin.length);
  
  if(userNewUpdatePin.length <= 4 && userNewUpdatePin.length == 4){
    correctPin = userNewUpdatePin
    userSubmitPinResponse.innerText = 'PIN changed successfully!'
    userNextProceed.style.display = 'block'
  }else{
    userSubmitPinResponse.innerText = 'Please enter 4 digit pin'
  }
})

// pin verification
userResetPinVerify.addEventListener('click', () => {
  if(userResetPinOld.value == correctPin){
    userSubmitPinSection.style.display = 'block'
    userResetPinSection.style.display = 'none'

  }else{
    userResetPinResponse.innerText = 'Incorrect old PIN. Please try again.'
  }
})
const changePin = () : void =>{
  userResetPinSection.style.display = 'block'
  userSection.style.display = "none";
}

// Check Balance function
const checkbalance = () : void => {
  userSection.style.display = 'none';
  userCheckBalance.style.display = 'block';
  userNextProceed.style.display = 'block';
  userCheckBalancePara.innerHTML = `Your account balance: $${accountBalance}`;
}

// If User click on Yes next to procees
userNextProceedYes.addEventListener('click',() => {
  console.log("Yes");  
  userSection.style.display = 'block'
  userWithDrawSection.style.display = 'none'
  userNextProceed.style.display = 'none'
  userCheckBalance.style.display = 'none'
  userTransfer.style.display = 'none'
  userSubmitPinSection.style.display = 'none'

})

// If User click on No next to procees
userNextProceedNo.addEventListener('click',() => {
  console.log("No");  
  userLastThankYou.style.display = 'block'
  userWithDrawSection.style.display = 'none'
  userNextProceed.style.display = 'none'
  userCheckBalance.style.display = 'none'
  userTransfer.style.display = 'none'
  userSubmitPinSection.style.display = 'none'

})

