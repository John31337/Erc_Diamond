import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { deployDiamond } from "../diamond";

task("hardhat:Diamond", "Deploy Diamond")
    .addParam("name", "The project`s name")
    .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
        const ErcDiamond = await deployDiamond(ethers, taskArguments.name);
        console.log("Diamond deployed to:", ErcDiamond);
    });
