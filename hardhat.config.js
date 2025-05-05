require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // To use environment variables from a .env file

/** @type import('hardhat/config').HardhatUserConfig */

const HOLESKY_RPC_URL = process.env.HOLESKY_RPC_URL; // Ensure you have this in your .env file//->"https://holesky.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your Infura Holesky RPC URL
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Ensure you have this in your .env file
// if (!HOLESKY_RPC_URL || !PRIVATE_KEY) {
//   throw new Error("Please set your HOLESKY_RPC_URL and PRIVATE_KEY in a .env file");
// }
module.exports = {
  solidity: "0.8.28",
  networks: {
    holesky: {
      url: HOLESKY_RPC_URL, // Use your Holesky RPC URL from the .env file
      accounts: [PRIVATE_KEY], // Use your private key from the .env file
    },
  },
};