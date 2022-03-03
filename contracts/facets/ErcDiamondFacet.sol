// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../ErcDiamondStorage.sol";

contract ErcDiamondFacet is ErcDiamondStorage{
    constructor() ErcDiamondStorage(_storagePos) {}
    function projectToken() external view returns (address) {
        return getDiamondStorage().MainToken;
    }
}