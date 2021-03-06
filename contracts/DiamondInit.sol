// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
*
* Implementation of a diamond.
/******************************************************************************/

import {LibDiamond} from "./libraries/LibDiamond.sol";
import { IDiamondLoupe } from "./interfaces/IDiamondLoupe.sol";
import { IDiamondCut } from "./interfaces/IDiamondCut.sol";
import { IERC20 } from "./interfaces/IERC20.sol";
import { IERC165 } from "./interfaces/IERC165.sol";
import "./ErcDiamondStorage.sol";

contract DiamondInit is ErcDiamondStorage{

    constructor(bytes32 _storagePos) ErcDiamondStorage(_storagePos) {}
    function init() external {
        // adding ERC165 data
        LibDiamond.DiamondStorage storage ds = getDiamondStorage();
        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
        ds.supportedInterfaces[type(IERC20).interfaceId] = true;
    }
}