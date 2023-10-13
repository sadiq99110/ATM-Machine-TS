let pinAttempts: number = 3;
let accountBalance: number = 10000;
const accountNumbers: string[] = [
  "1234567890123",
  "9876543210987",
  "5555555555555",
  // Add more account numbers as needed
];

let correctPin: string = "1234";

function getElementById(id : string) {
  return document.getElementById(id);
}

function showElement(element) {
  element.style.display = "block";
}

function hideElement(element) {
  element.style.display = "none";
}

// Pin Validation
let userPinSection = getElementById('user-pin-section');
let userPinValue = getElementById('user-pin') as HTMLInputElement
let userPinError = document.getElementById('error-message') as HTMLParagraphElement
let userPinErrorOld = document.getElementById('error-message-old') as HTMLParagraphElement
let userPinErrorNew = document.getElementById('error-message-new') as HTMLParagraphElement
let userPinSubmit = getElementById('user-pin-submit') as HTMLInputElement
let userPinText = getElementById('user-pin-value') as HTMLParagraphElement
let userPinResponse = getElementById('pin-response') as HTMLParagraphElement

// Choose options
let userSection = getElementById('choose-para') as HTMLDivElement
let selectedItems = getElementById('option-items') as HTMLSelectElement
let userSelectedItem = getElementById('selected-item') as HTMLParagraphElement

// Withdraw user functionality access from DOM
let userWithDrawSection = getElementById('withdraw-option-section') as HTMLDivElement
let userWithDrawAmount = getElementById('user-withdraw-amount') as HTMLInputElement
let userWithDrawAmountButton = getElementById('user-withdraw-submit') as HTMLInputElement
let userWithDrawAmountResponse = getElementById('user-withdraw-amount-response') as HTMLParagraphElement

// Transfer User Functionality access from DOM
let userTransferSection = getElementById('user-amount-transfer') as HTMLDivElement
let userTransferSectionAmount = getElementById('user-amount-transfer-number') as HTMLInputElement
let userTransferSectionButton = getElementById('user-amount-transfer-verify') as HTMLInputElement
let userTransferSectionPara = getElementById('user-amount-transfer-para') as HTMLParagraphElement
let userTransfer = getElementById('user-transfer') as HTMLDivElement
let userTransferPara = getElementById('user-transfer-para') as HTMLParagraphElement
let userTransferAmount = getElementById('user-amount') as HTMLInputElement
let userTransferButton = getElementById('user-amount-transfer-new') as HTMLInputElement
let userTransferParaResponse = getElementById('user-transfer-response') as HTMLParagraphElement

// Reset Pin functionality access from DOM
let userResetPinSection = getElementById('user-reset-pin') as HTMLDivElement
let userResetPinOld = getElementById('user-reset-pin-old') as HTMLInputElement
let userResetPinVerify = getElementById('user-reset-pin--verify-button') as HTMLInputElement
let userResetPinResponse = getElementById('user-reset-pin-response') as HTMLParagraphElement
let userSubmitPinSection = getElementById('user-submit-new-pin') as HTMLDivElement
let userNewPin = getElementById('user-reset-pin-new') as HTMLInputElement
let userSubmitNewPin = getElementById('user-submit-new-pin-button') as HTMLInputElement
let userSubmitPinResponse = getElementById('user-update-pin-response') as HTMLParagraphElement

// User Next Proceed access from DOM
let userNextProceed = getElementById('user-next-proceed') as HTMLDivElement
let userNextProceedYes = getElementById('user-next-proceed-button-yes') as HTMLInputElement
let userNextProceedNo = getElementById('user-next-proceed-button-no') as HTMLInputElement

// Thankyou para
let userLastThankYou = getElementById('user-thankyou') as HTMLDivElement

// User Balance Check access from DOM
let userCheckBalance = getElementById('user-check-balance') as HTMLDivElement
let userCheckBalancePara = getElementById('user-check-balance-para') as HTMLParagraphElement

// User Submit pin functionality
userPinSubmit.addEventListener('click', handlePinSubmit);

// Show user services
selectedItems.addEventListener('change', handleOptionChange);

// Withdraw Functionality
userWithDrawAmountButton.addEventListener('click', handleWithdraw);

// Transfer Amount Functionality
userTransferSectionButton.addEventListener('click', handleTransferSectionVerify);
userTransferButton.addEventListener('click', handleTransferAmount);

// Change Pin Functionality
userResetPinVerify.addEventListener('click', handlePinResetVerify);
userSubmitNewPin.addEventListener('click', handlePinUpdate);

// Next Proceed Actions
userNextProceedYes.addEventListener('click', handleNextProceedYes);
userNextProceedNo.addEventListener('click', handleNextProceedNo);

function handlePinSubmit() {
  userPinError.innerText = ''
  userPinText.innerText = userPinValue.value;
  if (userPinValue.value === correctPin) {
    userPinResponse.innerText = `Valid pin`;
    showElement(userSection);
    hideElement(userPinSection);
    return true;
  } else {
    pinAttempts--;
    if (pinAttempts === 0) {
      userPinSubmit.style.display = 'none';
    }
    userPinResponse.innerText = `Incorrect PIN. ${pinAttempts} attempts left.`;
  }
}

function handleOptionChange(event) : void {
  const selectedItem = event.target.value;
  switch (selectedItem) {
    case "withdraw":
      withdraw();
      break;
    case "checkbalance":
      checkBalance();
      break;
    case "transfer":
      TransferAmount();
      break;
    case "changepin":
      changePin();
      break;
    case "exit":
      userSection.style.display = 'none';
      userLastThankYou.style.display = 'block';
      pinAttempts = 0;
      break;
    default:
      // Invalid option
      break;
  }
}

function handleWithdraw() : void {
  let withdrawAmount = parseInt(userWithDrawAmount.value);

  if (!isNaN(withdrawAmount) && withdrawAmount >= 500 && withdrawAmount <= 25000 && withdrawAmount <= accountBalance) {
    accountBalance -= withdrawAmount;
    userWithDrawAmountResponse.innerText = 'Withdrawal successful! Remaining balance: ' + accountBalance;
    showElement(userNextProceed);
  } else {
    userWithDrawAmountResponse.innerText = 'Invalid withdrawal amount. Please try again.';
  }
}

function withdraw() : void {
  showElement(userWithDrawSection);
  userSection.style.display = "none";
  userWithDrawAmount.value = '';
  userWithDrawAmountResponse.innerText = '';
  hideElement(userNextProceed);
}

function handleTransferSectionVerify() : void {
  const userEnteredAccountNumber = userTransferSectionAmount.value;
  if (userEnteredAccountNumber.length !== 13) {
    alert('Account number must be 13 characters long.');
  } else {
    const isAccountNumberValid = accountNumbers.some(accountNumber => accountNumber === userEnteredAccountNumber);

    if (isAccountNumberValid) {
      hideElement(userTransferSection);
      userTransferPara.innerHTML = "Enter the amount you want to transfer"; 
      showElement(userTransfer);
      hideElement(userTransferSectionPara);
    } else {
      userTransferSectionPara.innerHTML = "Invalid User";
    }
  }
}

function handleTransferAmount() : void {
  let transferAmount = parseInt(userTransferAmount.value);
  if (!isNaN(transferAmount) && transferAmount >= 1 && transferAmount <= accountBalance) {
    accountBalance -= transferAmount;
    userTransferParaResponse.innerText = `Transfer successful! Remaining balance: $${accountBalance}`;
    showElement(userNextProceed);
  } else {
    userTransferParaResponse.innerText = `Invalid transfer amount. Please try again.`;
  }
}

function TransferAmount() : void {
  showElement(userTransferSection);
  userSection.style.display = "none";
}

function handlePinResetVerify() : void {
    userPinErrorOld.innerHTML =  ''
  if (userResetPinOld.value === correctPin) {
    showElement(userSubmitPinSection);
    hideElement(userResetPinSection);
  } else {
    userResetPinResponse.innerText = 'Incorrect old PIN. Please try again.';
  }
}

function handlePinUpdate() : void {
  userPinErrorNew.innerHTML =  ''
  let userNewUpdatePin = userNewPin.value
  if (userNewUpdatePin.length === 4) {
    correctPin = userNewUpdatePin;
    userSubmitPinResponse.innerText = 'PIN changed successfully!';
    showElement(userNextProceed);
  } else {
    userSubmitPinResponse.innerText = 'Please enter a 4-digit PIN';
  }
}

function changePin() : void {
  showElement(userResetPinSection);
  userSection.style.display = "none";
}

function checkBalance() : void {
  userSection.style.display = 'none';
  showElement(userCheckBalance);
  showElement(userNextProceed);
  userCheckBalancePara.innerHTML = `Your account balance: $${accountBalance}`;
}

function handleNextProceedYes() : void {
  userSection.style.display = 'block';
  hideElement(userNextProceed)
  hideElement(userWithDrawSection);
  hideElement(userTransferSection);
  hideElement(userTransfer);
  hideElement(userResetPinSection);
  hideElement(userSubmitPinSection);
  hideElement(userCheckBalance);
}

function handleNextProceedNo() : void {
  userLastThankYou.style.display = 'block';
  hideElement(userNextProceed)
  hideElement(userWithDrawSection);
  hideElement(userTransferSection);
  hideElement(userTransfer);
  hideElement(userResetPinSection);
  hideElement(userSubmitPinSection);
  hideElement(userCheckBalance);
}

function checkPinLength(input, verify) {
  const userPinValue = input.value;
  if (userPinValue.length > 4) {
    input.value = userPinValue.slice(0, 4); // Truncate the input to 4 digits
    if(verify == "verifyOldPin"){
      userPinErrorOld.innerHTML =  'PIN must be 4 digits or less'
    }else if(verify == "newPin"){
      userPinErrorNew.innerHTML =  'PIN must be 4 digits or less'
    }
    userPinError.innerText = 'PIN must be 4 digits or less';
  } else {
    userPinError.innerText = ''; // Clear error message
  }
}