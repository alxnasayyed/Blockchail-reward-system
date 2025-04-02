// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    mapping(address => bool) private recyclingCenters;
    mapping(address => bool) private retailers;

    constructor(address initialOwner) ERC20("RecycleReward", "RCT") Ownable(initialOwner) {
        _mint(initialOwner, 1000000 * 10**18); // Initial supply
    }

    function addRecyclingCenter(address _center) public onlyOwner {
        recyclingCenters[_center] = true;
    }

    function addRetailer(address _retailer) public onlyOwner {
        retailers[_retailer] = true;
    }

    function rewardRecycler(address recycler, uint256 amount) public {
        require(recyclingCenters[msg.sender], "Not an authorized center");
        _mint(recycler, amount * 10**18);
    }

    function redeemTokens(address customer, uint256 amount) public {
        require(retailers[msg.sender], "Not an authorized retailer");
        _transfer(customer, msg.sender, amount * 10**18);
    }
}
