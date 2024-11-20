// module.exports = {
//   solidity: "0.8.27",
//   networks: {
//     localhost: {
//       url: "http://127.0.0.1:8545",
//     },
//   },
// };

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY
  // }
};
// /contract deployed with address 0xdB97d9053Ea96B313A8B6721ca89046a0a90981a
