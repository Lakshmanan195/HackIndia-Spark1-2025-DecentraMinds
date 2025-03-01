// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address public owner;

    constructor() ERC20("MyToken", "MTK") {
        owner = msg.sender;
        _mint(msg.sender, 1000000 * 10**18); // Initial supply: 1M tokens
    }

    function reward(address user, uint256 amount) public {
        require(msg.sender == owner, "Only owner can reward");
        _mint(user, amount);
    }
}