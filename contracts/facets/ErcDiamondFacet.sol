// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../ErcDiamondStorage.sol";

contract ErcDiamondFacet is ErcDiamondStorage{
    constructor() ErcDiamondStorage() {}

    function projectToken() external view returns (address) {
        return getDiamondStorage().MainToken;
    }

    function startTimestamp() external view returns (uint256) {
        return getDiamondStorage().startTimestamp;
    }

    function projectOwnerAddr() external view returns (address) {
        return getDiamondStorage().contractOwner;
    }
}