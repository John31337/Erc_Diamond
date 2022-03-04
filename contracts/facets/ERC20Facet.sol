//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibERC20} from "../libraries/LibERC20.sol";
import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../ErcDiamondStorage.sol";

contract ERC20Facet is ErcDiamondStorage {

    constructor(bytes32 _storagePos) ErcDiamondStorage(_storagePos) {}

    

    function name() external pure returns (string memory)  {
        return unicode"Theia Coin";
    }

    function symbol() external pure returns (string memory) {
        return unicode"TEA";
    }

    function decimals() external pure returns (uint8) { 
        return 18;        
    }

    function totalSupply() external view returns (uint256) {
        LibDiamond.DiamondStorage storage s = getDiamondStorage();
        return s.totalSupply;
    }

    function balanceOf(address _owner) external view returns (uint256 balance_) {
        LibDiamond.DiamondStorage storage s = getDiamondStorage();
        balance_ = s.balances[_owner];
    }

    function approve(address _spender, uint256 _value) external returns (bool) {
        LibDiamond.DiamondStorage storage s = getDiamondStorage();
        LibERC20.approve(s, msg.sender, _spender, _value);
        return true;
    }

    function increaseAllowance(address _spender, uint256 _addedValue) external returns (bool) {
        LibDiamond.DiamondStorage storage s = getDiamondStorage();
        unchecked {
            LibERC20.approve(s, msg.sender, _spender, s.allowances[msg.sender][_spender] + _addedValue);
        }
        return true;
    }      

    function decreaseAllowance(address _spender, uint256 _subtractedValue) external returns (bool) {
        LibDiamond.DiamondStorage storage s = getDiamondStorage();
        uint256 currentAllowance = s.allowances[msg.sender][_spender];
        require(currentAllowance >= _subtractedValue, "Cannot decrease allowance to less than 0");
        unchecked {
         LibERC20.approve(s, msg.sender, _spender, currentAllowance - _subtractedValue);   
        }        
        return true;        
    }

    function allowance(address _owner, address _spender) external view returns (uint256 remaining_) {
        LibDiamond.DiamondStorage storage s = getDiamondStorage();
        return s.allowances[_owner][_spender];
    }    

    function transfer(address _to, uint256 _value) external returns (bool) {       
        LibDiamond.DiamondStorage storage s = getDiamondStorage(); 
        LibERC20.transfer(s, msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success) {
        LibDiamond.DiamondStorage storage s = getDiamondStorage();
        LibERC20.transfer(s, _from, _to, _value);
        uint256 currentAllowance = s.allowances[_from][msg.sender];
        require(currentAllowance >= _value, "transfer amount exceeds allowance");
        unchecked {
            LibERC20.approve(s, _from, msg.sender, currentAllowance - _value);        
        }             
        return true;        
    }

}
