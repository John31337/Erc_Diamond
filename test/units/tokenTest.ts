/* global describe it before ethers */

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from 'hardhat'

import {
  ZERO_ADDRESS
} from "../helper";

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

    let projectToken: Contract;

    let projectName:string = "Theia Coin";
    let price:number = 1000;

    before(async function () {
      [owner, addr1, addr2] = await ethers.getSigners();
      diamondAddress = await deployDiamond(projectName, price, owner)
      diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
      diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
      ercDiamondFacet = await ethers.getContractAt('ErcDiamondFacet', diamondAddress)

      /// Test Project Token Deploy
      const ProjectTokenFactory = await ethers.getContractFactory("MainToken", owner);
      projectToken = await ProjectTokenFactory.deploy("Theia Coin", "TEA");
      await projectToken.deployed();
    })

    it("Main Token Test", async () => {
        const mainTokenAddr = await ercDiamondFacet.projectToken();
        cfMainToken = await ethers.getContractAt('MainToken', mainTokenAddr);
        console.log("MainToken Name:", await cfMainToken.name());
        console.log("MainToken TotalSupply", await cfMainToken.totalSupply())
        // cfMainToken.mint()
    })

    describe("1. Ownership", async function () {

      it("1.1 Verify that the crowdfunding contract is the admin", async function () {
        expect(await projectToken.owner()).to.eq(owner.address);
      });
    });

    describe("2. Mint", async function () {
      it("2.1 Succeeds when the crowdfunding contract mints token", async function () {
        await expect(projectToken.mint(addr1.address, 1000)).to.emit(projectToken, 'Transfer').withArgs(ZERO_ADDRESS, addr1.address, 1000);
        expect(await projectToken.balanceOf(addr1.address)).to.eq(1000);
      });

      it("2.2 Fails when other address mints token", async function () {
        await expect(projectToken.connect(addr1).mint(addr2.address, 1000)).to.be.revertedWith('Ownable: caller is not the owner');
      });

      it("2.3 Fails when zero tokens minted", async function () {
        await expect(projectToken.mint(addr1.address, 0)).to.be.revertedWith('ERC20: mint amount zero');
      });
    });

    describe("3. Burn", async function () {
      beforeEach(async () => {
        await projectToken.mint(owner.address, 1000);
        await projectToken.mint(addr1.address, 1000);
      });

      it("3.1 Succeeds when the crowdfunding contract burns token", async function () {
        await expect(projectToken.burn(1000)).to.be.emit(projectToken, 'Transfer').withArgs(owner.address, ZERO_ADDRESS, 1000);
        expect(await projectToken.balanceOf(owner.address)).to.eq(0);
      });

      it("3.2 Fails when other address burns token", async function () {
        await expect(projectToken.connect(addr1).burn(1000)).to.be.revertedWith('Ownable: caller is not the owner');
      });

      it("3.3 Fails when zero tokens burnt", async function () {
        await expect(projectToken.burn(0)).to.be.revertedWith('ERC20: burn amount zero');
      });
    });

    describe("4. Transfer", async function () {
      beforeEach(async () => {
        await projectToken.mint(owner.address, 1000);
        await projectToken.mint(addr1.address, 1000);
      });

      it("4.1 Check it is deactivated", async function () {
        await expect(projectToken.connect(addr1).transfer(addr2.address, 1000)).to.be.revertedWith('Ownable: caller is not the owner');

        await expect(projectToken.transfer(addr1.address, 100)).to.be.emit(projectToken, 'Transfer').withArgs(owner.address, addr1.address, 100);
        expect(await projectToken.balanceOf(owner.address)).to.eq(2900);
        expect(await projectToken.balanceOf(addr1.address)).to.eq(5100);
      });
    });

    describe("5. TransferFrom", async function () {
      beforeEach(async () => {
        await projectToken.mint(owner.address, 1000);
        await projectToken.mint(addr1.address, 1000);
      });

      it("5.1 Check it is deactivated", async function () {
        await projectToken.approve(addr1.address, 100);
        await expect(projectToken.connect(addr1).transferFrom(owner.address, addr2.address, 100)).to.be.revertedWith('Ownable: caller is not the owner');

        await projectToken.connect(addr1).approve(owner.address, 100);
        await expect(projectToken.transferFrom(addr1.address, addr2.address, 100)).to.be.emit(projectToken, 'Transfer').withArgs(addr1.address, addr2.address, 100);
        expect(await projectToken.balanceOf(addr1.address)).to.eq(6000);
        expect(await projectToken.balanceOf(addr2.address)).to.eq(100);
      });
    });

    describe("6. Approve", async function () {
      beforeEach(async () => {
        await projectToken.mint(owner.address, 1000);
      });

      it("6.1 Check it is deactivated", async function () {
        await expect(projectToken.connect(addr1).transferFrom(owner.address, addr2.address, 100)).to.be.revertedWith('Ownable: caller is not the owner');
      });
    });
  })
}

