/* global ethers */
/* eslint prefer-const: "off" */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";

const { getSelectors, FacetCutAction } = require('../deployment/libraries/diamond')

export async function deployDiamond(projectName: string, price: number) {
    const accounts = await ethers.getSigners()
    const contractOwner = accounts[0]
  
    // deploy DiamondCutFacet
    const DiamondCutFacet = await ethers.getContractFactory('DiamondCutFacet')
    const diamondCutFacet = await DiamondCutFacet.deploy()
    await diamondCutFacet.deployed()
    console.log('DiamondCutFacet deployed:', diamondCutFacet.address)
  
    // deploy Diamond
    const Diamond = await ethers.getContractFactory('Diamond')
    const diamond = await Diamond.deploy(projectName, price, contractOwner.address, diamondCutFacet.address)
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
        'DiamondLoupeFacet',
        'ERC20Facet',
        'ErcDiamondFacet',
    ]
    const cut = []
    for (const FacetName of FacetNames) {
    const Facet = await ethers.getContractFactory(FacetName)
    const facet = await Facet.deploy()
    await facet.deployed()
    console.log(`${FacetName} deployed: ${facet.address}`)
    cut.push({
        facetAddress: facet.address,
        action: FacetCutAction.Add,
        functionSelectors: getSelectors(facet).signatures
        })
    }


    // upgrade diamond with facets
    const diamondCut = await ethers.getContractAt('IDiamondCut', diamond.address)
    // call to init function
    let functionCall = diamondInit.interface.encodeFunctionData('init')
    let tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall)
    //console.log('Diamond cut tx: ', tx.hash)
    let receipt = await tx.wait()
    if (!receipt.status) {
        throw Error(`Diamond upgrade failed: ${tx.hash}`)
    }
    
    return diamond.address
}
