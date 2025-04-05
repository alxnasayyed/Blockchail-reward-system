require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20", // Ensure Solidity version matches your contract
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545", // Ensure correct RPC URL
    },
  },
};
