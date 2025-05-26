const contractAddress = window.AppConfig.contractAddress;
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "oldMessage",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newMessage",
        "type": "string"
      }
    ],
    "name": "MessageUpdated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getMessage",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "setMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let tronWeb;
let contract;
let accounts;
const messageDiv = document.getElementById("message");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connectButton").addEventListener("click", connectTronLink);
  document.getElementById("getMessageButton").addEventListener("click", getMessage);
  document.getElementById("setMessageButton").addEventListener("click", setMessage);
});

async function connectTronLink() {
  console.log("Connecting to TronLink...");
  if (window.tronLink && window.tronWeb) {
    try {
      const tronLink = window.tronLink;
      await tronLink.request({ method: 'tron_requestAccounts' });
      tronWeb = window.tronWeb;

      accounts = [tronWeb.defaultAddress.base58];
      if (!accounts[0]) {
        throw new Error("No accounts found. Please unlock TronLink.");
      }
      contract = await tronWeb.contract(contractABI, contractAddress);
      messageDiv.innerText = "Connected to TronLink: " + accounts[0];
      messageDiv.className = "alert alert-success";
      console.log("Connected to TronLink:", accounts[0]);
    } catch (error) {
      messageDiv.innerText = "Failed to connect to TronLink: " + error.message;
      messageDiv.className = "alert alert-danger";
      console.error("Connection error:", error);
    }
  } else {
    messageDiv.innerText = "Please install TronLink to use this DApp!";
    messageDiv.className = "alert alert-warning";
    console.log("TronLink not detected.");
  }
}

async function getMessage() {
  console.log("Get Message button clicked");
  if (!contract) {
    messageDiv.innerText = "Please connect to TronLink first!";
    messageDiv.className = "alert alert-warning";
    console.log("Contract not initialized");
    return;
  }
  try {
    messageDiv.innerText = "Fetching message...";
    messageDiv.className = "alert alert-info";
    const message = await contract.getMessage().call();
    messageDiv.innerText = "Current Message: " + message;
    messageDiv.className = "alert alert-info";
    console.log("Message retrieved:", message);
  } catch (error) {
    messageDiv.innerText = "Error getting message: " + error.message;
    messageDiv.className = "alert alert-danger";
    console.error("Get message error:", error);
  }
}

async function setMessage() {
  console.log("Set Message button clicked");
  if (!contract) {
    messageDiv.innerText = "Please connect to TronLink first!";
    messageDiv.className = "alert alert-warning";
    console.log("Contract not initialized");
    return;
  }
  const newMessage = document.getElementById("newMessage").value;
  console.log("New message entered:", newMessage);
  if (!newMessage) {
    messageDiv.innerText = "Please enter a message!";
    messageDiv.className = "alert alert-warning";
    return;
  }
  if (newMessage.length > 1000) {
    messageDiv.innerText = "Message too long! Max 1000 characters.";
    messageDiv.className = "alert alert-warning";
    return;
  }
  try {
    messageDiv.innerText = "Sending transaction...";
    messageDiv.className = "alert alert-info";
    await contract.setMessage(newMessage).send({
      feeLimit: 100000000, // 100 TRX
      callValue: 0,
      shouldPollResponse: true
    });
    messageDiv.innerText = "Transaction successful!";
    messageDiv.className = "alert alert-success";
    console.log("setMessage transaction successful");
    getMessage();
  } catch (error) {
    messageDiv.innerText = "Error setting message: " + error.message;
    messageDiv.className = "alert alert-danger";
    console.error("Error setting message:", error);
  }
}