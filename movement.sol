// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TokenVault {
    address public owner;
    IERC20 public token;
    uint256 public currentBlock;
    uint256 public nextMoveIndex;
    address[] public destinationAddresses;
    uint256[] public amounts;

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }

    function setDestinationAddressesAndAmounts(address[] memory _destinations, uint256[] memory _amounts) external onlyOwner {
        require(_destinations.length == _amounts.length, "Invalid input");
        destinationAddresses = _destinations;
        amounts = _amounts;
    }

    function moveTokens() external onlyOwner {
        require(nextMoveIndex < destinationAddresses.length, "All moves completed");
        require(block.number > currentBlock, "Wait for the current block to end");
        
        uint256 amountToTransfer = amounts[nextMoveIndex];
        uint256 vaultBalance = token.balanceOf(address(this));
        require(vaultBalance >= amountToTransfer, "Insufficient balance in vault");

        currentBlock = block.number + 1; // Set the next block to move tokens
        nextMoveIndex += 1;

        address destination = destinationAddresses[nextMoveIndex - 1];
        require(token.transfer(destination, amountToTransfer), "Transfer failed");
    }

    function getVaultBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function returnRemainingTokens() external onlyOwner {
        require(nextMoveIndex >= destinationAddresses.length, "Not all moves completed");
        
        uint256 remainingBalance = token.balanceOf(address(this));
        require(remainingBalance > 0, "No remaining tokens in vault");

        address ownerAddress = msg.sender;
        require(token.transfer(ownerAddress, remainingBalance), "Transfer failed");
    }
}
