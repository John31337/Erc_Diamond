// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "../interfaces/IERC20.sol";
import {LibDiamond} from "./LibDiamond.sol";

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a + b;
        assert(c >= a);
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }
}

library LibERC20 {

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    using SafeMath for uint256;

    function transfer(LibDiamond.DiamondStorage storage s, address _from, address _to, uint256 _value) internal {
        require(_from != address(0), "_from cannot be zero address");
        require(_to != address(0), "_to cannot be zero address");
        uint256 balance = s.balances[_from];
        require(balance >= _value, "_value greater than balance");
        unchecked {
            s.balances[_from] -= _value;
            s.balances[_to] += _value;    
        }        
        emit Transfer(_from, _to, _value);
    }

    function mint(LibDiamond.DiamondStorage storage s, address _to, uint256 _value) internal {
        require(_to != address(0), "_to cannot be zero address");
        unchecked {
            s.totalSupply = s.totalSupply.add(_value);
            s.balances[_to] = s.balances[_to].add(_value);
        }
        emit Transfer(address(0), _to, _value);
    }

    function burn(LibDiamond.DiamondStorage storage s, address _from, uint256 _value) internal {
        unchecked {
            s.balances[_from] = s.balances[_from].sub(_value);
            s.totalSupply = s.totalSupply.sub(_value);
        }
        emit Transfer(_from, address(0), _value);
    }

    function approve(LibDiamond.DiamondStorage storage s, address owner, address spender, uint256 amount) internal {        
        require(owner != address(0), "approve from the zero address");
        require(spender != address(0), "approve to the zero address");
        s.allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
}
