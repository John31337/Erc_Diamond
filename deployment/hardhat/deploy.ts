import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { deployDiamond } from "../diamond";

task("hardhat:Diamond", "Deploy Diamond")
    .addParam("name", "The project`s name")
    .addParam("price", "The token's price")
    .addParam("start", "The GMT timestamp of starting funding")
    .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
        const ErcDiamond = await deployDiamond(ethers, taskArguments.name, taskArguments.price, taskArguments.start);
        console.log("Diamond deployed to:", ErcDiamond);
    });
