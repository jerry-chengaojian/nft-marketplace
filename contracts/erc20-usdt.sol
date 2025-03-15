// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDTCoin is ERC20 {
    constructor(address recipient) ERC20("USDT Coin", "USDT") {
        _mint(recipient, 1 * 10 ** 6 * 10 ** decimals());
    }
}