# Crowdfunding-Contract
An `upgradable`, `pausable` __crowdfunding__ smart contract which can be used as a _template_ by every __project owner__.

## About
* It's a Crowdfunding contract.
* For more, refer [Wiki](./docs/wiki).

## Installation
```console
$ yarn install
```

## Usage

### Build
```console
$ yarn compile
```

### Test
```console
$ yarn test
```


### Deploying contracts to Testnet (Public)

#### ETH Testnet - Ropsten
* Environment variables
  - Create a `.env` file with its values:
```
INFURA_API_KEY=[YOUR_INFURA_API_KEY_HERE]
DEPLOYER_PRIVATE_KEY=[YOUR_DEPLOYER_PRIVATE_KEY_without_0x]
REPORT_GAS=<true_or_false>
```

* Deploy the contract
```console
$ yarn hardhat ropsten:Crowdfunding --network ropsten --name <PROJECT_NAME> --coinAddr <PROJECT_COIN_ADDRESS> --stbcoinAddr <STABLECOIN_ADDRESS> --projectFee <PROJECT_FEE> --start <START_TIMESTAMP> --end <END_TIMESTAMP> --minThreshold <MIN_THRESHOLD>
```

#### ETH Testnet - Rinkeby
* Environment variables
    - Create a `.env` file with its values:
```
INFURA_API_KEY=[YOUR_INFURA_API_KEY_HERE]
DEPLOYER_PRIVATE_KEY=[YOUR_DEPLOYER_PRIVATE_KEY_without_0x]
REPORT_GAS=<true_or_false>
```

* Deploy the contract
```console
$ yarn hardhat rinkeby:Crowdfunding --network rinkeby --name <PROJECT_NAME> --coinAddr <PROJECT_COIN_ADDRESS> --stbcoinAddr <STABLECOIN_ADDRESS> --projectFee <PROJECT_FEE> --start <START_TIMESTAMP> --end <END_TIMESTAMP> --minThreshold <MIN_THRESHOLD>
```

#### Avalanche Testnet
* Environment variables
  - Create a `.env` file with its values:
```
DEPLOYER_PRIVATE_KEY=[YOUR_DEPLOYER_PRIVATE_KEY_without_0x]
REPORT_GAS=<true_or_false>
```

* Deploy the contract
```console
$ yarn hardhat avaxtest:Crowdfunding --network avaxtest --name <PROJECT_NAME> --coinAddr <PROJECT_COIN_ADDRESS> --stbcoinAddr <STABLECOIN_ADDRESS> --projectFee <PROJECT_FEE> --start <START_TIMESTAMP> --end <END_TIMESTAMP> --minThreshold <MIN_THRESHOLD>
```


### Deploying contracts to Mainnet
#### ETH Mainnet
* Environment variables
    - Create a `.env` file with its values:
```
INFURA_API_KEY=[YOUR_INFURA_API_KEY_HERE]
DEPLOYER_PRIVATE_KEY=[YOUR_DEPLOYER_PRIVATE_KEY_without_0x]
REPORT_GAS=<true_or_false>
```

* Deploy the contract
```console
$ yarn hardhat ethermain:Crowdfunding --network ethermain --name <PROJECT_NAME> --coinAddr <PROJECT_COIN_ADDRESS> --stbcoinAddr <STABLECOIN_ADDRESS> --projectFee <PROJECT_FEE> --start <START_TIMESTAMP> --end <END_TIMESTAMP> --minThreshold <MIN_THRESHOLD>
```

#### Avalanche Mainnet
* Environment variables
  - Create a `.env` file with its values:
```
DEPLOYER_PRIVATE_KEY=[YOUR_DEPLOYER_PRIVATE_KEY_without_0x]
REPORT_GAS=<true_or_false>
```

* Deploy the contract
```console
$ yarn hardhat avaxmain:Crowdfunding --network avaxmain --name <PROJECT_NAME> --coinAddr <PROJECT_COIN_ADDRESS> --stbcoinAddr <STABLECOIN_ADDRESS> --projectFee <PROJECT_FEE> --start <START_TIMESTAMP> --end <END_TIMESTAMP> --minThreshold <MIN_THRESHOLD>
```

### Upgrade contracts

##### Add Function to Deployed CF Diamond Contract
* Environment variables
  - Create a `.env` file with its values:
```
INFURA_API_KEY=[YOUR_INFURA_API_KEY_HERE]
DEPLOYER_PRIVATE_KEY=[YOUR_DEPLOYER_PRIVATE_KEY_without_0x]
REPORT_GAS=<true_or_false>
```
* Create new facet contract including adding function by inheriting `UniqueStorage` and using `LibCFDiamond`:
```
constract NewFacet is UniqueStorage {
  function newFunction(...){
    ...
  }
}
```

* Add function to deployed CF diamond contract
```console
$ yarn compile
$ yarn hardhat <CHAIN_NAME>:AddFunction --network <CHAIN_NAME> --cfAddr <DEPLOYED_FACET_ADDR> --newFacetName <NEW_FACET_NAME> --funcName <FUNCTION_NAME>
```

##### Update Function to Deployed CF Diamond Contract
* Environment variables
  - Create a `.env` file with its values:
```
INFURA_API_KEY=[YOUR_INFURA_API_KEY_HERE]
DEPLOYER_PRIVATE_KEY=[YOUR_DEPLOYER_PRIVATE_KEY_without_0x]
REPORT_GAS=<true_or_false>
```
* Create new facet contract including updating function by inheriting `UniqueStorage` and using `LibCFDiamond`:
```
constract NewFacet is UniqueStorage {
  function updateFunction(...){
    ...
  }
}
```

* Update function to deployed CF diamond contract
```console
$ yarn compile
$ yarn hardhat <CHAIN_NAME>:UpdateFunction --network <CHAIN_NAME> --cfAddr <DEPLOYED_FACET_ADDR> --newFacetName <NEW_FACET_NAME> --funcName <FUNCTION_NAME>
```

##### Add State Variables to Deployed CF Diamond Contract
* Environment variables
  - Create a `.env` file with its values:
```
INFURA_API_KEY=[YOUR_INFURA_API_KEY_HERE]
DEPLOYER_PRIVATE_KEY=[YOUR_DEPLOYER_PRIVATE_KEY_without_0x]
REPORT_GAS=<true_or_false>
```

* create new `LibCFDiamond` with new state variables:
```
library LibCFDiamond {
  ...
  struct DiamondStorage {
    ...
    // todo add new state variables from end of storage
    uint256 newUintVar;
    address newAddrVar;
    ...
  }
}
```

* Update all facet contracts by using `new LibCFDiamond`:
```
contract Facet is UniqueStorage, ... {
  ...
}
```

* Upgrade deployed CF diamond contract
```console
$ yarn compile
$ yarn hardhat <CHAIN_NAME>:UpdateFacet --network <CHAIN_NAME> --cfAddr <DEPLOYED_FACET_ADDR> --newFacetName <NEW_FACET_NAME>
```

##### Add Facet to Deployed CF Diamond Contract
* Environment variables
- Create a `.env` file with its values:
```
INFURA_API_KEY=[YOUR_INFURA_API_KEY_HERE]
DEPLOYER_PRIVATE_KEY=[YOUR_DEPLOYER_PRIVATE_KEY_without_0x]
REPORT_GAS=<true_or_false>
```
* Create new facet contract including adding function by inheriting `UniqueStorage` and using `LibCFDiamond`:
```
constract NewFacet is UniqueStorage {
  function newFunction(...){
    ...
  }
}
```

* Add facet to deployed CF diamond contract
```console
$ yarn compile
$ yarn hardhat <CHAIN_NAME>:AddFacet --network <CHAIN_NAME> --cfAddr <DEPLOYED_FACET_ADDR> --newFacetName <NEW_FACET_ADDRESS>
```

##### Remove Facet to Deployed CF Diamond Contract
* Environment variables
  - Create a `.env` file with its values:
```
INFURA_API_KEY=[YOUR_INFURA_API_KEY_HERE]
DEPLOYER_PRIVATE_KEY=[YOUR_DEPLOYER_PRIVATE_KEY_without_0x]
REPORT_GAS=<true_or_false>
```

* Remove facet from deployed CF diamond contract
```console
$ yarn compile
$ yarn hardhat <CHAIN_NAME>:RemoveFacet --network <CHAIN_NAME> --cfAddr <DEPLOYED_FACET_ADDR> --facetAddr <FACET_ADDRESS>
```