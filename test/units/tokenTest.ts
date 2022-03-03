/* global describe it before ethers */

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from 'hardhat'

import {deployDiamond} from "../diamond";
const { assert } = require('chai')

export function likeToken(): void{
  describe('TokenTest', async function () {
    let owner:SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    let diamondAddress: string;
    let diamondCutFacet: Contract;
    let diamondLoupeFacet:Contract;
    let cfMainToken: Contract;
    let ercDiamondFacet:Contract;
    let addresses:string[] = [];

    let projectName:string = "ERC20Diamond";
    let price:number = 1000;

    before(async function () {
      [owner, addr1, addr2] = await ethers.getSigners();
      diamondAddress = await deployDiamond(projectName, price, owner)
      diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
      diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
      ercDiamondFacet = await ethers.getContractAt('ErcDiamondFacet', diamondAddress)
    })

    it("Main Token Test", async () => {
        const mainTokenAddr = await ercDiamondFacet.projectToken();
        cfMainToken = await ethers.getContractAt('MainToken', mainTokenAddr);
        console.log("MainToken Name:", await cfMainToken.name());
        console.log("MainToken TotalSupply", await cfMainToken.totalSupply())
        // cfMainToken.mint()
    })
  })
}

