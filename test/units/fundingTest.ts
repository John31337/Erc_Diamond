import {upgrades, ethers} from "hardhat";

import {shouldBehaveLikeOwnable} from "./behavior/ownableBehaviorTest";
import {shouldBehaveLikePausable} from "./behavior/pausableBehaviorTest";
import {deployDiamond} from "../diamond";

export function likefunding(): void {

  describe("- funding SC", function () {

    beforeEach(async () => {

      this.ctx.signers = await ethers.getSigners();
      const [owner] = this.ctx.signers;
      
      const projectName:string = "Theia Coin";
      const price:number = 1000;

      /// Test Project Coin Deploy
      const ProjectCoinFactory = await ethers.getContractFactory("ProjectCoin", owner);
      const projectCoin = await ProjectCoinFactory.deploy("Test Main Coin", "TPC", 1000000 * 10 ^ 18);
      await projectCoin.deployed();
      this.ctx.projectCoin = projectCoin;

      /// Deploy Erc Diamond
      this.ctx.funding = await await deployDiamond(projectName, price, owner)

      // Set Facet Addresses
      this.ctx.diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', this.ctx.funding)
      this.ctx.ownershipFacet = await ethers.getContractAt('OwnershipFacet', this.ctx.funding)
      this.ctx.pausableFacet = await ethers.getContractAt('PausableFacet', this.ctx.funding)
    });

    shouldBehaveLikeOwnable();

    shouldBehaveLikePausable();

  });
}
