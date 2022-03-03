// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import { IERC173 } from "../interfaces/IERC173.sol";
import "../ErcDiamondStorage.sol";

contract OwnershipFacet is ErcDiamondStorage, IERC173 {

    constructor() ErcDiamondStorage() {}

    function transferOwnership(address _newOwner) external override {
        LibDiamond.enforceIsContractOwner();
        LibDiamond.setContractOwner(_newOwner);
    }

    function owner() external override view returns (address owner_) {
        owner_ = LibDiamond.contractOwner();
    }
}
