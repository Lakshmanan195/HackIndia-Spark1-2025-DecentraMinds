// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ContentVerification {
    // Mapping to store IPFS CIDs for each user
    mapping(address => string) public userToCID;

    // Event to log when a CID is stored
    event CIDStored(address indexed user, string cid);

    // Function to store a CID for the caller
    function storeCID(string memory cid) public {
        require(bytes(cid).length > 0, "CID cannot be empty");
        userToCID[msg.sender] = cid;
        emit CIDStored(msg.sender, cid);
    }

    // Function to retrieve the CID for a user
    function getCID(address user) public view returns (string memory) {
        return userToCID[user];
    }
}
