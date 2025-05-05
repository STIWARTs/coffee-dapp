const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", await contract.getAddress());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// 0xda4300e91E2f4F275e069Ef6fc8467290E267F44