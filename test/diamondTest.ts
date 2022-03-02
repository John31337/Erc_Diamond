/* global describe it before ethers */

import { Contract } from "ethers";
import { ethers } from 'hardhat'

import {deployDiamond} from "./diamond";
const { assert } = require('chai')

describe('DiamondTest', async function () {
  let diamondAddress: string;
  let diamondCutFacet: Contract;
  let diamondLoupeFacet:Contract;
  let ownershipFacet:Contract;
  let tokenFacet:Contract;

  before(async function () {
    diamondAddress = await deployDiamond()
    diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    tokenFacet = await ethers.getContractAt('ERC20Facet', diamondAddress)

    console.log(ownershipFacet)
  })

  it('Deployment should assign the total supply of tokens to the owner', async function () {
    // const owner = await ownershipFacet.owner()
    // const ownerBalance = await tokenFacet.balanceOf(owner)
    // assert.equal((await tokenFacet.totalSupply()).toString(), ownerBalance.toString())
  })
})
