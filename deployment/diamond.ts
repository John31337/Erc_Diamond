import {HardhatEthersHelpers} from "@nomiclabs/hardhat-ethers/types";

export async function deployDiamond (ethers: HardhatEthersHelpers, projectName: string, price: number, startTimestamp: number) {
  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]

  // deploy DiamondCutFacet
  const DiamondCutFacet = await ethers.getContractFactory('DiamondCutFacet')
  const diamondCutFacet = await DiamondCutFacet.deploy()
  await diamondCutFacet.deployed()
  console.log('DiamondCutFacet deployed:', diamondCutFacet.address)

  // deploy Diamond
  const Diamond = await ethers.getContractFactory('Diamond')
  const diamond = await Diamond.deploy(projectName, price, startTimestamp, contractOwner.address, diamondCutFacet.address)
  await diamond.deployed()
  console.log('Diamond deployed:', diamond.address)

  // deploy DiamondInit
  const DiamondInit = await ethers.getContractFactory('DiamondInit')
  const diamondInit = await DiamondInit.deploy()
  await diamondInit.deployed()
  console.log('DiamondInit deployed:', diamondInit.address)

  // deploy facets
  console.log('')
  console.log('Deploying facets')
  const FacetNames = [
        'ERC20Facet',
        'DiamondLoupeFacet',
        'ErcDiamondFacet',
        'OwnershipFacet',
        'PausableFacet',
  ]
  
  return diamond.address
}

exports.deployDiamond = deployDiamond
