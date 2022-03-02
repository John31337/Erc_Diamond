## About
* It's a ErcDiamond contract.
* For more, refer [Wiki](./docs/wiki).

## Installation
```console
$ yarn install
```

## Usage

### Build
```console
$ yarn hardhat compile
```

### Test
```console
$ yarn hardhat test
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
$ yarn hardhat ropsten:Diamond --network ropsten 
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
$ yarn hardhat rinkeby:Diamond --network rinkeby
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
$ yarn hardhat avaxtest:Diamond --network avaxtest
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
$ yarn hardhat ethermain:Diamond --network ethermain 
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
$ yarn hardhat avaxmain:Diamond --network avaxmain 
```
