const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("buymeCoffee");
  const contract = await Contract.deploy();
  await contract.deployed();
}

main()
  .then(() => {
    console.log("");
  })
  .catch((error) => {
    console.log(error.message);
  });
