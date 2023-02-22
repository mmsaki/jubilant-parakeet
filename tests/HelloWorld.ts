// Ethers from Hardhat helper functions: https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-ethers#helpers
// Contract abstraction from ethers https://docs.ethers.org/v5/api/contract/contract/

import { expect } from "chai";
import { ethers } from "hardhat"
import { HelloWorld } from "../typechain-types";

describe("Hello World", () => {
  let helloWorldContract: HelloWorld;

  beforeEach(async () => {
    const helloWorldContractFactory = await ethers.getContractFactory("HelloWorld");
    helloWorldContract = await helloWorldContractFactory.deploy();
    await helloWorldContract.deployed();
  })
  it("Should give a 'Hello World'", async () => {
    const text = await helloWorldContract.helloWorld();
    console.log("The text from the contract is", text);
    expect(text).to.eq("Hello World!")
  })
  it("should set the owner to deploer account", async () => {
    const signers = await ethers.getSigners();
    const owner = await helloWorldContract.owner();
    expect(owner).to.eq(signers[0].address)
  })
  it("should not allow anyone other than the owner to call transferOwnership", async () => {
    const signers = await ethers.getSigners();
    await expect(helloWorldContract.connect(signers[1]).transferOwnership(signers[1].address)).to.be.revertedWith("Caller is not the owner");
  })
})