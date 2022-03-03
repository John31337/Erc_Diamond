# Instruction
## Objective
* Create a `upgradeable`, `pausable` __token__ smart contract.
* Follow [__diamond standard__](https://github.com/ethereum/EIPs/issues/2535) so as to never get this error: "exceeding contract size limit" i.e. `24 KB`.
## Features
```
Name: Theia Coin
Symbol: TEA
Decimal: 18
```
* Approve
* Mint
* Burn
* Transfer
* TransferFrom
## Diamond standard
It consists of 3 parts:
1. __Proxy contract__ which is called the _diamond_.
2. __Diamond storage__ is stored at the _position_ (basically an EVM compatible address) set via a string (unique or same). Here, all the storage variables & contract address for functions is stored & updated when the facet is updated.
3. __Implementation contract__ which is called _facet_. Each facet is deployed into an address.
> NOTES:
> - Now, 3 (PC symbol, curr_timestamp, deployer address) of all parameters set inside the constructor of _diamond_ is used to calculate the unique position for Theia coin smart contract.
> - In order to use any state variables from "Diamond storage" inside the functions of _facet_, just use the position & call the state variables.
### Storage position
* Here, we set the `DIAMOND_STORAGE_POSITION` param which is to be unique throughout.
* 2 params considered for this:
	- Project Coin (PC) symbol i.e. "TEA"
	- current timestamp
	- deployer address
* After this, we take the `keccak256` hash of the entire string.
## Unit Testing
* "Project Token SC"
	1. Ownership
		- [ ] "Verify that the deployer is the contract owner"
		- [ ] "Verify that owner is able to transfer the ownership"
	2. Pausable
		- [ ] Owner is able to pause when NOT paused
		- [ ] Owner is able to unpause when already paused
		- [ ] Owner is NOT able to pause when already paused
		- [ ] Owner is NOT able to unpause when already unpaused
	3. Mint
		- [ ] "Succeeds when the owner mint the coin"
		- [ ] "Fails when the non-owner mint the coin"
		- [ ] "Fails when the non-owner mint the coin"
	4. Burn
		- [ ] "Succeeds when the anyone burns the coin"
		- [ ] "Fails when someone burns excessive coin than owner qty"
	5. Transfer
		- [ ] "Succeeds when someone transfers to another address"
		- [ ] "Fails when someone transfers to self"
		- [ ] "Fails when someone transfers more than owned to another address"
	6. TransferFrom
	7. Approve
	
## Dependencies
* OpenZeppelin
* Diamond Standard
## Testing framework
* Hardhat using Typescript language.
## Networks
* localhost
* Testnet
	- Rinkeby
	- Kovan
	- Avalanche
* Mainnet
	- Ethereum
	- Avalanche
## Glossary
* SC: Smart Contract
