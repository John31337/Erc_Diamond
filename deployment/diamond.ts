import {HardhatEthersHelpers} from "@nomiclabs/hardhat-ethers/types";

export async function deployDiamond (ethers: HardhatEthersHelpers, _coinSymbol: string) {
  // deploy Diamond
  const Diamond = await ethers.getContractFactory('CFDiamond')
  const diamond = await Diamond.deploy(_coinSymbol)
  await diamond.deployed()
  console.log('Diamond deployed:', diamond.address)

  const storagePos = await diamond.getStoragePosition();

  // deploy InitDiamond
  // InitDiamond provides a function that is called when the diamond is upgraded to initialize state variables
  // Read about how the diamondCut function works here: https://eips.ethereum.org/EIPS/eip-2535#addingreplacingremoving-functions
  const InitDiamond = await ethers.getContractFactory('InitDiamond')
  const diamondInit = await InitDiamond.deploy(storagePos)
  await diamondInit.deployed()
  console.log('InitDiamond deployed:', diamondInit.address)

  // deploy facets
  console.log('')
  console.log('Deploying facets')
  const FacetNames = [
    'ERC20Facet',
    'DiamondLoupeFacet',
    'OwnershipFacet',
    'PausableFacet',
  ]

  // const cut = []
  //   for (const FacetName of FacetNames) {
  //       const Facet = await ethers.getContractFactory(FacetName)
  //       const facet = await Facet.deploy(storagePos)
  //       await facet.deployed()
  //       console.log(`${FacetName} deployed: ${facet.address}`)
  //       cut.push({
  //           facetAddress: facet.address,
  //           action: FacetCutAction.Add,
  //           functionSelectors: getSelectors(facet)
  //       })
  //   }

  //   // upgrade diamond with facets
  //   console.log('Diamond Cut:', cut)

  //   let tx
  //   let receipt
  //   // call to init function
  //   let functionCall = diamondInit.interface.encodeFunctionData('init')
  //   tx = await diamond.diamondCut(cut, diamondInit.address, functionCall)
  //   //console.log('Diamond cut tx: ', tx.hash)
  //   receipt = await tx.wait()
  //   if (!receipt.status) {
  //       throw Error(`Diamond upgrade failed: ${tx.hash}`)
  //   }
  //   //console.log('Completed diamond cut')

    return diamond.address
}

exports.deployDiamond = deployDiamond
