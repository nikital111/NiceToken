//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Demo {
    // public
    // privat 
    // external
    // internal

    address owner;

    modifier onlyOwner(){
        require(msg.sender == owner,"You are not owner");
        _;
    }

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        owner = msg.sender;
    }

    function receiveFunds() external payable {
        console.log("Easy money, thanks ", msg.sender);
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function withdrawFunds(address payable _to) external onlyOwner {
        //address target = payable(_to);
        require(address(this).balance > 0, 'no funds');
        uint val = address(this).balance;
        _to.transfer(val);
        console.log("K pape EZ");
    }

    receive() external payable {
        console.log("Easy money, thanks ", msg.sender);
    }
    
}
