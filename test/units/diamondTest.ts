/* global describe it before ethers */

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from 'hardhat';

import {deployDiamond} from "../diamond";

const { getSelectors, FacetCutAction, findAddressPositionInFacets } = require('../../deployment/libraries/diamond')
const { assert } = require('chai')

export function likeDiamond(): void{
  describe('Diamond Test', async function () {
    let owner:SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    let diamondAddress: string;
    let erc20Facet:Contract;
    let diamondLoupeFacet:Contract;
    let ownershipFacet:Contract;
    let pausableFacet:Contract;
    let addresses:string[] = [];

    let projectName:string = "Theia Coin";

    before(async function () {
      [owner, addr1, addr2] = await ethers.getSigners();
      diamondAddress = await deployDiamond(projectName, owner)
      erc20Facet = await ethers.getContractAt('ERC20Facet', diamondAddress)
      diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
      ownershipFacet = await ethers.getContractAt('OwnershipFacet', diamondAddress)
      pausableFacet = await ethers.getContractAt('PausableFacet', diamondAddress)
    })
    
    it('1. should have three facets -- call to facetAddresses function', async () => {
      for (const address of await diamondLoupeFacet.facetAddresses()) {
        addresses.push(address)
      }
      assert.equal(addresses.length, 4)
    })

    it('2. facets should have the right function selectors -- call to facetFunctionSelectors function', async () => {
        let selectors = getSelectors(erc20Facet)
        let result = await diamondLoupeFacet.facetFunctionSelectors(addresses[0])
        assert.sameMembers(result, selectors.signatures)
        selectors = getSelectors(diamondLoupeFacet)
        result = await diamondLoupeFacet.facetFunctionSelectors(addresses[1])
        assert.sameMembers(result, selectors.signatures)
        selectors = getSelectors(ownershipFacet)
        result = await diamondLoupeFacet.facetFunctionSelectors(addresses[2])
        assert.sameMembers(result, selectors.signatures)
        selectors = getSelectors(pausableFacet)
        result = await diamondLoupeFacet.facetFunctionSelectors(addresses[3])
    })

    it('3. add most functions and facets', async () => {
        const facets = await diamondLoupeFacet.facets();
        assert.equal(addresses.length, 4)
        assert.equal(facets.length, 4)
        assert.equal(facets[0][0], addresses[0], 'first facet')
        assert.equal(facets[1][0], addresses[1], 'second facet')
        assert.equal(facets[2][0], addresses[2], 'third facet')
        assert.equal(facets[3][0], addresses[3], 'third facet')
        assert.sameMembers(facets[findAddressPositionInFacets(addresses[0], facets)][1], getSelectors(erc20Facet).signatures)
        assert.sameMembers(facets[findAddressPositionInFacets(addresses[1], facets)][1], getSelectors(diamondLoupeFacet).signatures)
        assert.sameMembers(facets[findAddressPositionInFacets(addresses[2], facets)][1], getSelectors(ownershipFacet).signatures)
        assert.sameMembers(facets[findAddressPositionInFacets(addresses[3], facets)][1], getSelectors(pausableFacet).signatures)
    });
  })
}

