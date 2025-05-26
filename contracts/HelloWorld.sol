// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HelloWorld is Ownable {
  string private message = "Hello World";

  constructor() Ownable(msg.sender) {}

 function setMessage(string memory _message) public onlyOwner {
  require(bytes(_message).length <= 1000, "Message too long");
  message = _message;
}

  function getMessage() public view returns (string memory) {
    return message;
  }
}