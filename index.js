// // let data = [1,2,3,4,5,6,7]
// // let k = 2
// // let result;

// // for (let i = 0; i < data.length; i++) {
// //     const element = data[i];
// //     if (element === k) {
// //         result = k
// //         console.log(result)  
// //       return element;
// //     }
 
// // }
  
// const checkItems = (data, n, k) => {
//     let page = 1;
//     let chapter = 1;
//     for (let i = 0; i < data.length; i++) {
//         const element = data[i];
//         console.log(element);
//         for (let j = 1; j <= element; j++) {
//           if(j === 1 || j === 3) {
//             console.log("iteration is start", j)
//             chapter++
//           }
//           console.log(`Inner loop: ${j}`);
//         }
//       }
//     // console.log("Page => ",page)
//     console.log("chapter => ",chapter)
//   };
  
//   let data = [4, 2, 6, 1, 10];
//   let n = 5;
//   let k = 3;
  
//   checkItems(data, n, k);
  
let pinAttempts = 3;
let accountBalance = 10000; 
const accountNumber = "1234567890123"; 
const correctPin = "1234"; 

function authorize() {
  while (pinAttempts > 0) {
    const enteredPin = prompt("Enter your 4-digit PIN:");
    if (enteredPin === correctPin) {
      return true;
    } else {
      pinAttempts--;
      alert(`Incorrect PIN. ${pinAttempts} attempts left.`);
    }
  }
  alert("Max attempts reached. Closing application.");
  return false;
}

function withdraw() {
  const withdrawalAmount = parseInt(prompt("Enter withdrawal amount (in multiples of 500):"));
  if (withdrawalAmount >= 500 && withdrawalAmount <= 25000 && withdrawalAmount <= accountBalance) {
    accountBalance -= withdrawalAmount;
    alert(`Withdrawal successful! Remaining balance: $${accountBalance}`);
  } else {
    alert("Invalid withdrawal amount. Please try again.");
  }
}

function checkBalance() {
  alert(`Your account balance: $${accountBalance}`);
}

function transfer() {
  const recipientAccountNumber = prompt("Enter recipient's 13-digit account number:");
  const isValidRecipient = recipientAccountNumber === accountNumber; 
  if (!isValidRecipient) {
    alert("Invalid recipient account number. Please try again.");
    return;
  }

  const transferAmount = parseInt(prompt(`Enter transfer amount (1 to $${accountBalance}):`));
  if (transferAmount >= 1 && transferAmount <= accountBalance) {
    accountBalance -= transferAmount;
    alert(`Transfer successful! Remaining balance: $${accountBalance}`);
  } else {
    alert("Invalid transfer amount. Please try again.");
  }
}

function changePin() {
  const oldPin = prompt("Enter your old 4-digit PIN:");
  if (oldPin === correctPin) {
    const newPin = prompt("Enter your new 4-digit PIN:");
    correctPin = newPin;
    alert("PIN changed successfully!");
  } else {
    alert("Incorrect old PIN. Please try again.");
  }
}

while (true) {
  if (!authorize()) {
    break;
  }

  const option = prompt("Choose an option: Withdraw, Balance Check, Transfer, Change PIN, Exit");
  switch (option.toLowerCase()) {
    case "withdraw":
      withdraw();
      break;
    case "balance check":
      checkBalance();
      break;
    case "transfer":
      transfer();
      break;
    case "change pin":
      changePin();
      break;
    case "exit":
      alert("Exiting the application. Thank you!");
      pinAttempts = 0; // To exit the loop
      break;
    default:
      alert("Invalid option. Please try again.");
  }
}
