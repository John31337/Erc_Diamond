import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { deployDiamond } from "../../diamond";

task("avaxtest:Diamond", "Deploy Diamond")
    .addParam("name", "The project`s name")
    .addParam("price", "The token's price")
    .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
        const crowdFundingDiamond = await deployDiamond(ethers, taskArguments.name, taskArguments.price);
        console.log("Diamond deployed to:", crowdFundingDiamond);
    });