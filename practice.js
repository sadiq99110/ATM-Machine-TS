var pinAttempts = 3;
var accountBalance = 10000;
var accountNumbers = [
    "1234567890123",
    "9876543210987",
    "5555555555555",
    // Add more account numbers as needed
];
var correctPin = "1234";
// Pin Validation
var userPinSection = document.getElementById('user-pin-section');
var userPinValue = document.getElementById('user-pin');
var userPinSubmit = document.getElementById('user-pin-submit');
var userPinText = document.getElementById('user-pin-value');
var userPinResponse = document.getElementById('pin-response');
// Choose options
var userSection = document.getElementById('choose-para');
var selectedItems = document.getElementById('option-items');
var userSelectedItem = document.getElementById('selected-item');
// Withdraw user functionality access from DOM
var userWithDrawSection = document.getElementById('withdraw-option-section');
var userWithDrawAmount = document.getElementById('user-withdraw-amount');
var userWithDrawAmountButton = document.getElementById('user-withdraw-submit');
var userWithDrawAmountResponse = document.getElementById('user-withdraw-amount-response');
// Transfer User Functionality access from DOM
var userTransferSection = document.getElementById('user-amount-transfer');
var userTransferSectionAmount = document.getElementById('user-amount-transfer-number');
var userTransferSectionButton = document.getElementById('user-amount-transfer-verify');
var userTransferSectionPara = document.getElementById('user-amount-transfer-para');
var userTransfer = document.getElementById('user-transfer');
var userTransferPara = document.getElementById('user-transfer-para');
var userTransferAmount = document.getElementById('user-amount');
var userTransferButton = document.getElementById('user-amount-transfer-new');
var userTransferParaResponse = document.getElementById('user-transfer-response');
// Reset Pin functionality access from DOM
var userResetPinSection = document.getElementById('user-reset-pin');
var userResetPinOld = document.getElementById('user-reset-pin-old');
var userResetPinVerify = document.getElementById('user-reset-pin--verify-button');
var userResetPinResponse = document.getElementById('user-reset-pin-response');
var userSubmitPinSection = document.getElementById('user-submit-new-pin');
var userNewPin = document.getElementById('user-reset-pin-new');
var userSubmitNewPin = document.getElementById('user-submit-new-pin-button');
var userSubmitPinResponse = document.getElementById('user-update-pin-response');
// User Next Proceed access from DOM
var userNextProceed = document.getElementById('user-next-proceed');
var userNextProceedYes = document.getElementById('user-next-proceed-button-yes');
var userNextProceedNo = document.getElementById('user-next-proceed-button-no');
// Thankyou para
var userLastThankYou = document.getElementById('user-thankyou');
// User Balance Check access from DOM
var userCheckBalance = document.getElementById('user-check-balance');
var userCheckBalancePara = document.getElementById('user-check-balance-para');
// User Submit pin functionality
userPinSubmit.addEventListener('click', function () {
    userPinText.innerText = userPinValue.value;
    if (userPinValue.value === correctPin) {
        userPinResponse.innerText = "Valid pin";
        userSection.style.display = "block";
        userPinSection.style.display = 'none';
        return true;
    }
    else {
        pinAttempts--;
        if (pinAttempts == 0) {
            userPinSubmit.style.display = 'none';
        }
        userPinResponse.innerText = "Incorrect PIN. ".concat(pinAttempts, " attempts left.");
    }
});
// Show user services
selectedItems.addEventListener('change', function (event) {
    var tmp = event.target;
    // userSelectedItem.innerText = tmp.value
    switch (tmp.value) {
        case "withdraw":
            console.log("withdraw");
            withdraw();
            break;
        case "checkbalance":
            console.log("balancecheck");
            checkbalance();
            //   checkBalance();
            break;
        case "transfer":
            console.log("transfer");
            TransferAmount();
            //   transfer();
            break;
        case "changepin":
            changePin();
            console.log("changepin");
            //   changePin();
            break;
        case "exit":
            console.log("exit");
            userSection.style.display = 'none';
            userLastThankYou.style.display = 'block';
            //   alert("Exiting the application. Thank you!");
            pinAttempts = 0;
            break;
        default:
        //   alert("Invalid option. Please try again.");
    }
});
// WithDraw Functionality
userWithDrawAmountButton.addEventListener('click', function () {
    var withdrawAmount = parseInt(userWithDrawAmount.value);
    if (!isNaN(withdrawAmount) && withdrawAmount >= 500 && withdrawAmount <= 25000 && withdrawAmount <= accountBalance) {
        accountBalance -= withdrawAmount;
        userWithDrawAmountResponse.innerText = 'Withdrawal successful! Remaining balance: ' + accountBalance;
        userNextProceed.style.display = 'block';
    }
    else {
        userWithDrawAmountResponse.innerText = 'Invalid withdrawal amount. Please try again.';
    }
});
var withdraw = function () {
    userWithDrawSection.style.display = 'block';
    userSection.style.display = "none";
    userWithDrawAmount.value = ''; // Clear the input field
    userWithDrawAmountResponse.innerText = ''; // Clear the response message
    userNextProceed.style.display = 'none'; // Hide the "Yes" button
};
// User Transfer Amount Functionality
// User Account Number verification
userTransferSectionButton.addEventListener('click', function () {
    var userEnteredAccountNumber = userTransferSectionAmount.value;
    if (userEnteredAccountNumber.length < 13) {
        alert('Account number must be 13 characters long.');
    }
    else {
        // if the user-entered account number matches any of the account numbers
        var isAccountNumberValid = accountNumbers.some(function (accountNumber) { return accountNumber === userEnteredAccountNumber; });
        if (isAccountNumberValid) {
            userTransferSection.style.display = "none";
            userTransferSection.style.display = "none";
            userTransferPara.innerHTML = "Enter Your amount that you need to transfer";
            userTransfer.style.display = 'block';
            userTransferSectionPara.style.display = 'none';
        }
        else {
            console.log('No');
            userTransferSectionPara.innerHTML = "Invalid User";
        }
    }
});
// Transfer Amount from balance
userTransferButton.addEventListener('click', function () {
    console.log("Test", userTransferAmount.value);
    var transferAmount = parseInt(userTransferAmount.value);
    console.log("Test 02", transferAmount);
    if (!isNaN(transferAmount) && transferAmount >= 1 && transferAmount <= accountBalance) {
        accountBalance -= transferAmount;
        userTransferParaResponse.innerText = "Transfer successful! Remaining balance: $".concat(accountBalance);
        userNextProceed.style.display = 'block';
    }
    else {
        userTransferParaResponse.innerText = "Invalid transfer amount. Please try again.";
    }
});
var TransferAmount = function () {
    userTransferSection.style.display = "block";
    userSection.style.display = "none";
};
// Change Pin Functionality
// Update New Pin
userSubmitNewPin.addEventListener('click', function () {
    var userNewUpdatePin = userNewPin.value;
    console.log("userNewUpdatePin", userNewUpdatePin.length);
    if (userNewUpdatePin.length <= 4 && userNewUpdatePin.length == 4) {
        correctPin = userNewUpdatePin;
        userSubmitPinResponse.innerText = 'PIN changed successfully!';
        userNextProceed.style.display = 'block';
    }
    else {
        userSubmitPinResponse.innerText = 'Please enter 4 digit pin';
    }
});
// pin verification
userResetPinVerify.addEventListener('click', function () {
    if (userResetPinOld.value == correctPin) {
        userSubmitPinSection.style.display = 'block';
        userResetPinSection.style.display = 'none';
    }
    else {
        userResetPinResponse.innerText = 'Incorrect old PIN. Please try again.';
    }
});
var changePin = function () {
    userResetPinSection.style.display = 'block';
    userSection.style.display = "none";
};
// Check Balance function
var checkbalance = function () {
    userSection.style.display = 'none';
    userCheckBalance.style.display = 'block';
    userNextProceed.style.display = 'block';
    userCheckBalancePara.innerHTML = "Your account balance: $".concat(accountBalance);
};
// If User click on Yes next to procees
userNextProceedYes.addEventListener('click', function () {
    console.log("Yes");
    userSection.style.display = 'block';
    userWithDrawSection.style.display = 'none';
    userNextProceed.style.display = 'none';
    userCheckBalance.style.display = 'none';
    userTransfer.style.display = 'none';
    userSubmitPinSection.style.display = 'none';
});
// If User click on No next to procees
userNextProceedNo.addEventListener('click', function () {
    console.log("No");
    userLastThankYou.style.display = 'block';
    userWithDrawSection.style.display = 'none';
    userNextProceed.style.display = 'none';
    userCheckBalance.style.display = 'none';
    userTransfer.style.display = 'none';
    userSubmitPinSection.style.display = 'none';
});
