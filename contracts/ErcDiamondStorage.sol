// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from  "./libraries/LibDiamond.sol";
import "./libraries/Strings.sol";
import "hardhat/console.sol";

contract ErcDiamondStorage {
    function getDiamondStorage() internal view returns (LibDiamond.DiamondStorage storage) {
        return LibDiamond.diamondStorage();
    }
}
