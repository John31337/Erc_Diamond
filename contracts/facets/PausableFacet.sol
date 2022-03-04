// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import { IERC173 } from "../interfaces/IERC173.sol";
import "../ErcDiamondStorage.sol";

contract PausableFacet is ErcDiamondStorage {
    /**
    * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    constructor(bytes32 _storagePos) ErcDiamondStorage(_storagePos) {}
    
    function paused() external view returns (bool paused_) {
        LibDiamond.DiamondStorage storage ds = getDiamondStorage();
        paused_ = ds._paused;
    }

    /// @notice Pause contract
    function pause() external {
        LibDiamond.enforceIsContractOwner(_storagePos);
        LibDiamond.whenNotPaused(_storagePos);

        LibDiamond.DiamondStorage storage ds = getDiamondStorage();
        ds._paused = true;
        emit Paused(msg.sender);
    }

    /// @notice Unpause contract
    function unpause() external {
        LibDiamond.enforceIsContractOwner(_storagePos);
        LibDiamond.whenPaused(_storagePos);

        LibDiamond.DiamondStorage storage ds = getDiamondStorage();
        ds._paused = false;
        emit Unpaused(msg.sender);
    }
}
