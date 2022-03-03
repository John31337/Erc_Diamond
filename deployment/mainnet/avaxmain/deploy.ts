import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { deployDiamond } from "../../diamond";

task("avaxmain:Diamond", "Deploy Diamond")
    .addParam("name", "The project`s name")
    .addParam("price", "The token's price")
    .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
        const ErcDiamond = await deployDiamond(ethers, taskArguments.name, taskArguments.price);
        console.log("Diamond deployed to:", ErcDiamond);
    });
