// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@nomicfoundation/hardhat-toolbox/contracts/utils/Context.sol";

/**
 * @title NexusCore
 * @notice V2: Fortified with access control and replay protection.
 */
contract NexusCore is Context {
    // ============ Events ============
    event RewardTriggered(address indexed recipient, string cid, uint256 rewardAmount);
    event KeeperUpdated(address indexed newKeeper);

    // ============ State Variables ============
    address public owner;
    address public keeper; // NEW: The only address authorized to trigger rewards.
    uint256 public rewardAmount;

    // NEW: Mapping to prevent rewarding the same CID twice.
    mapping(bytes32 => bool) public processedCids;

    // ============ Constructor ============
    constructor(uint256 _initialRewardAmount) payable {
        owner = _msgSender();
        keeper = _msgSender(); // Initially, the deployer is both owner and keeper.
        rewardAmount = _initialRewardAmount;
    }

    // ============ Modifiers ============
    modifier onlyOwner() {
        require(owner == _msgSender(), "Not authorized: Owner only");
        _;
    }

    modifier onlyKeeper() {
        require(keeper == _msgSender(), "Not authorized: Keeper only");
        _;
    }

    // ============ Core Logic ============
    function triggerReward(string memory cid, address recipient) external onlyKeeper {
        require(recipient != address(0), "Invalid recipient");
        require(address(this).balance >= rewardAmount, "Insufficient funds in NexusCore");

        bytes32 cidHash = keccak256(abi.encodePacked(cid));
        require(!processedCids[cidHash], "Proof has already been rewarded");

        processedCids[cidHash] = true;

        (bool sent, ) = recipient.call{value: rewardAmount}("");
        require(sent, "Failed to send Ether");

        emit RewardTriggered(recipient, cid, rewardAmount);
    }

    // ============ Admin Controls ============
    function updateRewardAmount(uint256 newAmount) external onlyOwner {
        rewardAmount = newAmount;
    }



    function updateKeeper(address newKeeper) external onlyOwner {
        require(newKeeper != address(0), "Invalid address");
        keeper = newKeeper;
        emit KeeperUpdated(newKeeper);
    }

    // ============ Treasury Functions ============
    function withdraw() external onlyOwner {
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Withdrawal failed");
    }

    receive() external payable {}
}
