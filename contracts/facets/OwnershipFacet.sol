// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import { IERC173 } from "../interfaces/IERC173.sol";
import "../ErcDiamondStorage.sol";

contract OwnershipFacet is ErcDiamondStorage, IERC173 {

    constructor(bytes32 _storagePos) ErcDiamondStorage(_storagePos) {}

    function transferOwnership(address _newOwner) external override {
        LibDiamond.enforceIsContractOwner(_storagePos);
        LibDiamond.setContractOwner(_storagePos, _newOwner);
    }

    function owner() external override view returns (address owner_) {
        owner_ = LibDiamond.contractOwner(_storagePos);
    }
}
