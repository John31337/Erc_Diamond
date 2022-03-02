// /* global describe it before ethers */

// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { Contract } from "ethers";
// import { ethers } from 'hardhat'

// import {deployDiamond} from "../diamond";
// const { assert } = require('chai')

// export function likeDiamond(): void{
//   describe('DiamondTest', async function () {
//     let diamondAddress: string;
//     let diamondCutFacet: Contract;
//     let diamondLoupeFacet:Contract;
//     let tokenFacet:Contract;
//     let addresses:string[] = [];
//     before(async function () {
//       diamondAddress = await deployDiamond()
//       diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
//       diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
//       tokenFacet = await ethers.getContractAt('ERC20Facet', diamondAddress)
//     })
    
//     it('should have three facets -- call to facetAddresses function', async () => {
//       for (const address of await diamondLoupeFacet.facetAddresses()) {
//         addresses.push(address)
//       }
//       assert.equal(addresses.length, 3)
//     })
//   })
// }
