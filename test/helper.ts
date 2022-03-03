import {HardhatEthersHelpers} from "@nomiclabs/hardhat-ethers/types";

export function getTimestamp(date: Date){
    return Math.floor(date.getTime()/1000);
}

export async function travelTime(ethers: HardhatEthersHelpers, time: number){
    await ethers.provider.send("evm_increaseTime", [time]);
    await ethers.provider.send("evm_mine", []);
}

export async function resetBlockTimestamp(ethers: HardhatEthersHelpers) {
    const blockNumber = ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNumber);
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    const secondsDiff = currentTimestamp - block.timestamp;
    await ethers.provider.send('evm_increaseTime', [secondsDiff]);
    await ethers.provider.send('evm_mine', []);
}

export const BEFORE_ONE_HOUR_TIMESTAMP = () => getTimestamp(new Date()) - 3600;
export const BEFORE_ONE_WEEK_TIMESTAMP = () => getTimestamp(new Date()) - 3600 * 24 * 7;
export const BEFORE_TWO_WEEKS_TIMESTAMP = () => getTimestamp(new Date()) - 3600 * 24 * 7 * 2;

export const TIMESTAMP_NOW = () => getTimestamp(new Date());

export const AFTER_ONE_HOUR_TIESTAMP = () => getTimestamp(new Date()) + 3600;
export const AFTER_ONE_DAY_TIMESTAMP = () => getTimestamp(new Date()) + 3600 * 24;
export const AFTER_ONE_YEAR_TIMESTAMP = () => getTimestamp(new Date()) + 3600 * 24 * 365;

export const ONE_HOUR   = 3600;
export const TWO_HOURS  = 3600 * 2;
export const ONE_DAY    = 3600 * 24;
export const TWO_DAYS   = 3600 * 24 * 2;
export const ONE_WEEK   = 3600 * 24 * 7;
export const TWO_WEEKS  = 3600 * 24 * 7 * 2;
export const THREE_WEEKS  = 3600 * 24 * 7 * 3;
export const TWELVE_WEEKS = 3600 * 24 * 7 * 12;

export const FUNDING_COIN_SUPPLY = 20000;
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';


