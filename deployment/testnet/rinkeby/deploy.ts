import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { deployDiamond } from "../../diamond";

task("rinkeby:Diamond", "Deploy Diamond")
    .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
        const crowdFundingDiamond = await deployDiamond(ethers);
        console.log("Diamond deployed to:", crowdFundingDiamond);
    });
