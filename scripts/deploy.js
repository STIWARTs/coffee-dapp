const hre = require("hardhat");

async function main() {
  const Chai = await hre.ethers.getContractFactory("chai"); //fetching artifact form smart contracts ABI & byte code
  const chai = await Chai.deploy();// after that creating instance/obj of smart contract 

  // Wait for deployment to complete
  await chai.waitForDeployment();//deploying smart contract

  console.log("Chai deployed to:", await chai.getAddress());//feting smart contract address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Chai deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3 -- npx hardhat run scripts/deploy.js

// Chai deploy to : 0x0ef51aE3A4250c022C3452AcFA4D2a0be0fAc9b8 --alchemy holesky testnet --npx hardhat run --network holesky scripts/deploy.js

