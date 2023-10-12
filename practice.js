var pinAttempts = 3;
var accountBalance = 10000;
var accountNumbers = [
    "1234567890123",
    "9876543210987",
    "5555555555555",
    // Add more account numbers as needed
];
var correctPin = "1234";
function getElementById(id) {
    return document.getElementById(id);
}
function showElement(element) {
    element.style.display = "block";
}
function hideElement(element) {
    element.style.display = "none";
}
// Pin Validation
var userPinSection = getElementById('user-pin-section');
var userPinValue = getElementById('user-pin');
var userPinSubmit = getElementById('user-pin-submit');
var userPinText = getElementById('user-pin-value');
var userPinResponse = getElementById('pin-response');
// Choose options
var userSection = getElementById('choose-para');
var selectedItems = getElementById('option-items');
var userSelectedItem = getElementById('selected-item');
// Withdraw user functionality access from DOM
var userWithDrawSection = getElementById('withdraw-option-section');
var userWithDrawAmount = getElementById('user-withdraw-amount');
var userWithDrawAmountButton = getElementById('user-withdraw-submit');
var userWithDrawAmountResponse = getElementById('user-withdraw-amount-response');
// Transfer User Functionality access from DOM
var userTransferSection = getElementById('user-amount-transfer');
var userTransferSectionAmount = getElementById('user-amount-transfer-number');
var userTransferSectionButton = getElementById('user-amount-transfer-verify');
var userTransferSectionPara = getElementById('user-amount-transfer-para');
var userTransfer = getElementById('user-transfer');
var userTransferPara = getElementById('user-transfer-para');
var userTransferAmount = getElementById('user-amount');
var userTransferButton = getElementById('user-amount-transfer-new');
var userTransferParaResponse = getElementById('user-transfer-response');
// Reset Pin functionality access from DOM
var userResetPinSection = getElementById('user-reset-pin');
var userResetPinOld = getElementById('user-reset-pin-old');
var userResetPinVerify = getElementById('user-reset-pin--verify-button');
var userResetPinResponse = getElementById('user-reset-pin-response');
var userSubmitPinSection = getElementById('user-submit-new-pin');
var userNewPin = getElementById('user-reset-pin-new');
var userSubmitNewPin = getElementById('user-submit-new-pin-button');
var userSubmitPinResponse = getElementById('user-update-pin-response');
// User Next Proceed access from DOM
var userNextProceed = getElementById('user-next-proceed');
var userNextProceedYes = getElementById('user-next-proceed-button-yes');
var userNextProceedNo = getElementById('user-next-proceed-button-no');
// Thankyou para
var userLastThankYou = getElementById('user-thankyou');
// User Balance Check access from DOM
var userCheckBalance = getElementById('user-check-balance');
var userCheckBalancePara = getElementById('user-check-balance-para');
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
    userPinText.innerText = userPinValue.value;
    if (userPinValue.value === correctPin) {
        userPinResponse.innerText = "Valid pin";
        showElement(userSection);
        hideElement(userPinSection);
        return true;
    }
    else {
        pinAttempts--;
        if (pinAttempts === 0) {
            userPinSubmit.style.display = 'none';
        }
        userPinResponse.innerText = "Incorrect PIN. ".concat(pinAttempts, " attempts left.");
    }
}
function handleOptionChange(event) {
    var selectedItem = event.target.value;
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
function handleWithdraw() {
    var withdrawAmount = parseInt(userWithDrawAmount.value);
    if (!isNaN(withdrawAmount) && withdrawAmount >= 500 && withdrawAmount <= 25000 && withdrawAmount <= accountBalance) {
        accountBalance -= withdrawAmount;
        userWithDrawAmountResponse.innerText = 'Withdrawal successful! Remaining balance: ' + accountBalance;
        showElement(userNextProceed);
    }
    else {
        userWithDrawAmountResponse.innerText = 'Invalid withdrawal amount. Please try again.';
    }
}
function withdraw() {
    showElement(userWithDrawSection);
    userSection.style.display = "none";
    userWithDrawAmount.value = '';
    userWithDrawAmountResponse.innerText = '';
    hideElement(userNextProceed);
}
function handleTransferSectionVerify() {
    var userEnteredAccountNumber = userTransferSectionAmount.value;
    if (userEnteredAccountNumber.length !== 13) {
        alert('Account number must be 13 characters long.');
    }
    else {
        var isAccountNumberValid = accountNumbers.some(function (accountNumber) { return accountNumber === userEnteredAccountNumber; });
        if (isAccountNumberValid) {
            hideElement(userTransferSection);
            userTransferPara.innerHTML = "Enter the amount you want to transfer";
            showElement(userTransfer);
            hideElement(userTransferSectionPara);
        }
        else {
            userTransferSectionPara.innerHTML = "Invalid User";
        }
    }
}
function handleTransferAmount() {
    var transferAmount = parseInt(userTransferAmount.value);
    if (!isNaN(transferAmount) && transferAmount >= 1 && transferAmount <= accountBalance) {
        accountBalance -= transferAmount;
        userTransferParaResponse.innerText = "Transfer successful! Remaining balance: $".concat(accountBalance);
        showElement(userNextProceed);
    }
    else {
        userTransferParaResponse.innerText = "Invalid transfer amount. Please try again.";
    }
}
function TransferAmount() {
    showElement(userTransferSection);
    userSection.style.display = "none";
}
function handlePinResetVerify() {
    if (userResetPinOld.value === correctPin) {
        showElement(userSubmitPinSection);
        hideElement(userResetPinSection);
    }
    else {
        userResetPinResponse.innerText = 'Incorrect old PIN. Please try again.';
    }
}
function handlePinUpdate() {
    var userNewUpdatePin = userNewPin.value;
    if (userNewUpdatePin.length === 4) {
        correctPin = userNewUpdatePin;
        userSubmitPinResponse.innerText = 'PIN changed successfully!';
        showElement(userNextProceed);
    }
    else {
        userSubmitPinResponse.innerText = 'Please enter a 4-digit PIN';
    }
}
function changePin() {
    showElement(userResetPinSection);
    userSection.style.display = "none";
}
function checkBalance() {
    userSection.style.display = 'none';
    showElement(userCheckBalance);
    showElement(userNextProceed);
    userCheckBalancePara.innerHTML = "Your account balance: $".concat(accountBalance);
}
function handleNextProceedYes() {
    userSection.style.display = 'block';
    hideElement(userNextProceed);
    hideElement(userWithDrawSection);
    hideElement(userTransferSection);
    hideElement(userTransfer);
    hideElement(userResetPinSection);
    hideElement(userSubmitPinSection);
    hideElement(userCheckBalance);
}
function handleNextProceedNo() {
    userLastThankYou.style.display = 'block';
    hideElement(userNextProceed);
    hideElement(userWithDrawSection);
    hideElement(userTransferSection);
    hideElement(userTransfer);
    hideElement(userResetPinSection);
    hideElement(userSubmitPinSection);
    hideElement(userCheckBalance);
}
