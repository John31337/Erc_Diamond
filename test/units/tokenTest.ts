/* global describe it before ethers */

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from 'hardhat'

import {deployDiamond} from "../diamond";
const { assert } = require('chai')

export function likeToken(): void{
  describe('TokenTest', async function () {
    let diamondAddress: string;
    let diamondCutFacet: Contract;
    let diamondLoupeFacet:Contract;
    let cfMainToken: Contract;
    let tokenFacet:Contract;
    let ercDiamondFacet:Contract;
    let owner:SignerWithAddress;
    let addresses:string[] = [];

    let projectName:string = "ERC20Diamond";
    let price:number = 1000;

    before(async function () {
      [owner] = await ethers.getSigners();
      diamondAddress = await deployDiamond(projectName, price)
      diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
      diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
      tokenFacet = await ethers.getContractAt('ERC20Facet', diamondAddress)
      ercDiamondFacet = await ethers.getContractAt('ErcDiamondFacet', diamondAddress)
    })
    
    it('should have three facets -- call to facetAddresses function', async () => {
      for (const address of await diamondLoupeFacet.facetAddresses()) {
        addresses.push(address)
      }
      assert.equal(addresses.length, 4)
    })

    it('Emoji Token Test', async function () {
      console.log("Token Name", await tokenFacet.name())
      console.log("Token Symbol", await tokenFacet.symbol())
      console.log("Token Total Supply", await tokenFacet.totalSupply())
    })

    it("Main Token Test", async () => {
        const mainTokenAddr = await ercDiamondFacet.projectToken();
        cfMainToken = await ethers.getContractAt('MainToken', mainTokenAddr);
        console.log(cfMainToken);
    })
  })
}

