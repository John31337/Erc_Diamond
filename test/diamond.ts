/* global ethers */
/* eslint prefer-const: "off" */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import {
    AFTER_ONE_DAY_TIMESTAMP
} from "./helper";

const { getSelectors, FacetCutAction } = require('../deployment/libraries/diamond')

export async function deployDiamond(_coinSymbol: string, timestamp: number, signer: SignerWithAddress) {
    const accounts = await ethers.getSigners()
    const contractOwner = accounts[0]
  
    // deploy Diamond
    const Diamond = await ethers.getContractFactory('Diamond', signer)
    const diamond = await Diamond.deploy(_coinSymbol)
    await diamond.deployed()
    console.log('Diamond deployed:', diamond.address)
  
    // deploy DiamondInit

    const storagePos = await diamond.getStoragePosition();

    const DiamondInit = await ethers.getContractFactory('DiamondInit', signer)
    const diamondInit = await DiamondInit.deploy(storagePos)
    await diamondInit.deployed()
    console.log('DiamondInit deployed:', diamondInit.address)

    // // deploy ERC20Facet
    // const ERC20Facet = await ethers.getContractFactory('ERC20Facet', signer)
    // const eRC20Facet = await ERC20Facet.deploy()
    // await eRC20Facet.deployed()
    // console.log('ERC20Facet deployed:', diamondInit.address)
  
    // deploy facets
    // console.log('')
    // console.log('Deploying facets')
    const FacetNames = [
        'ERC20Facet',
        'DiamondLoupeFacet',
        'OwnershipFacet',
        'PausableFacet',
    ]
    const cut = []
    for (const FacetName of FacetNames) {
        const Facet = await ethers.getContractFactory(FacetName, signer)
        const facet = await Facet.deploy(storagePos)
        await facet.deployed()
        console.log(`${FacetName} deployed: ${facet.address}`)
        cut.push({
            facetAddress: facet.address,
            action: FacetCutAction.Add,
            functionSelectors: getSelectors(facet).signatures
            })
    }

    // upgrade diamond with facets
    //console.log('Diamond Cut:', cut)
    const diamondCut = await ethers.getContractAt('IDiamondCut', diamond.address)
    // call to init function
    let functionCall = diamondInit.interface.encodeFunctionData('init')
    let tx = await diamondCut.connect(signer).diamondCut(cut, diamondInit.address, functionCall)
    //console.log('Diamond cut tx: ', tx.hash)
    let receipt = await tx.wait()
    if (!receipt.status) {
        throw Error(`Diamond upgrade failed: ${tx.hash}`)
    }
    
    return diamond.address
}
