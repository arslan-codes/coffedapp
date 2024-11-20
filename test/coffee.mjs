import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;
describe("buymeCoffee contract", function () {
  let Contract, contract, owner, addr1, addr2;

  // Deploy contract before each test
  beforeEach(async function () {
    Contract = await ethers.getContractFactory("buymeCoffee");
    contract = await Contract.deploy();
    await contract.deployed();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("should allow addr1 to send a memo with funds", async function () {
    const amount = ethers.utils.parseEther("1.0");

    // Send memo with 1 ether
    await expect(
      contract.connect(addr1).SendMemo("Arslan", "Hello, how are you?", {
        value: amount,
      })
    );

    // Check the contract balance
    const contractBalance = await ethers.provider.getBalance(contract.address);
    expect(contractBalance).to.equal(amount);
  });

  it("should allow the owner to claim funds", async function () {
    const amount = ethers.utils.parseEther("1.0");

    // Send some ether first
    await contract.connect(addr1).SendMemo("Arslan", "Hello, how are you?", {
      value: amount,
    });

    // Check the balance before claiming
    const contractBalanceBefore = await ethers.provider.getBalance(
      contract.address
    );
    expect(contractBalanceBefore).to.equal(amount);

    // Owner claims the balance
    const tx = await contract.connect(owner).claimWithdraw();
    const receipt = await tx.wait();

    // Check the transaction receipt
    console.log("Transaction Receipt: ", receipt);

    // Check the contract balance after the withdrawal (should be 0)
    const contractBalanceAfter = await ethers.provider.getBalance(
      contract.address
    );
    expect(contractBalanceAfter).to.equal(0);

    // Check the owner's balance (should have increased)
    const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
    expect(ownerBalanceAfter).to.be.above(0); // Ensure that the balance has increased
  });

  it("should return all memos", async function () {
    // Send some memos
    await contract.connect(addr1).SendMemo("Arslan", "Hello, how are you?", {
      value: ethers.utils.parseEther("1.0"),
    });
    await contract.connect(addr2).SendMemo("Alice", "Nice work!", {
      value: ethers.utils.parseEther("2.0"),
    });

    // Get all memos
    const memos = await contract.connect(owner).getMemos();

    // Check if memos contain correct data
    expect(memos.length).to.equal(2);
    expect(memos[0].name).to.equal("Arslan");
    expect(memos[1].name).to.equal("Alice");
    console.log(memos); // You can remove this or keep it for debugging
  });
});
