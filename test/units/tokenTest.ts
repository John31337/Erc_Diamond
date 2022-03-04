/* global describe it before ethers */

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from 'hardhat';

import {deployDiamond} from "../diamond";

import {
    ZERO_ADDRESS
  } from "../helper";

const { getSelectors, FacetCutAction, findAddressPositionInFacets } = require('../../deployment/libraries/diamond')
const { assert } = require('chai')

export function likeToken(): void{
  describe('Token Test', async function () {
    let owner:SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    let diamondAddress: string;
    let erc20Facet:Contract;
    let addresses:string[] = [];

    let _coinSymbol:string = "Theia Coin";

    before(async function () {
      [owner, addr1, addr2] = await ethers.getSigners();
      diamondAddress = await deployDiamond(_coinSymbol, owner)
      erc20Facet = await ethers.getContractAt('ERC20Facet', diamondAddress)
    
    })
    
     
    describe("1. Mint", async function () {
    it("1.1 Succeeds when the crowdfunding contract mints token", async function () {
        await erc20Facet.mint(owner.address, 1000);
        expect(await erc20Facet.balanceOf(owner.address)).to.eq(1000);
      });
    });

    describe("2. Burn", async function () {
        beforeEach(async () => {
          await erc20Facet.mint(addr1.address, 1000);
        });
  
        it("2.1 Succeeds when the crowdfunding contract burns token", async function () {
          await erc20Facet.burn(addr1.address, 100);
          expect(await erc20Facet.balanceOf(addr1.address)).to.eq(900);
        });
      });

      describe("4. Transfer", async function () { 
        //owner: 1000, addr1: 900
        it("4.1 Check it is deactivated", async function () {
          await erc20Facet.connect(owner).transfer(addr1.address, 100);
  
          expect(await erc20Facet.balanceOf(owner.address)).to.eq(900);
          expect(await erc20Facet.balanceOf(addr1.address)).to.eq(1000);
        });
      });
  
      describe("5. Approve, TransferFrom", async function () {
        //owner: 900, addr1: 1000
        it("5.1 Check Approve", async function () {
          await erc20Facet.approve(addr1.address, 100);
          await erc20Facet.connect(addr1).transferFrom(owner.address, addr2.address, 100);
  
          await erc20Facet.connect(addr1).approve(owner.address, 100);
          await erc20Facet.transferFrom(addr1.address, addr2.address, 100);
          expect(await erc20Facet.balanceOf(addr1.address)).to.eq(900);
          expect(await erc20Facet.balanceOf(addr2.address)).to.eq(200);
        });
      });

  })
}

