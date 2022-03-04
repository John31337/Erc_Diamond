import {upgrades, ethers} from "hardhat";

import {shouldBehaveLikeOwnable} from "./behavior/ownableBehaviorTest";
import {shouldBehaveLikePausable} from "./behavior/pausableBehaviorTest";
import {deployDiamond} from "../diamond";

export function likeProject(): void {

  describe("- Project Test", function () {

    beforeEach(async () => {

      this.ctx.signers = await ethers.getSigners();
      const [owner] = this.ctx.signers;
      
      const projectName:string = "Theia Coin";

      /// Deploy Erc Diamond
      this.ctx.funding = await await deployDiamond(projectName, owner)

      // Set Facet Addresses
      this.ctx.diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', this.ctx.funding)
      this.ctx.ownershipFacet = await ethers.getContractAt('OwnershipFacet', this.ctx.funding)
      this.ctx.pausableFacet = await ethers.getContractAt('PausableFacet', this.ctx.funding)
    });

    shouldBehaveLikeOwnable();

    shouldBehaveLikePausable();

  });
}
