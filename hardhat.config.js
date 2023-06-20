require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config({ path: ".env" });
// require("@nomicfoundation/hardhat-verify");
// const ganache = require("ganache");
// const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  paths: {
    artifacts: './src/Components/artifacts',
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // mumbai: {
    //   url: "https://fittest-broken-asphalt.matic-testnet.discover.quiknode.pro/5e41e2cab8d5c4ff360f81cb1016e2e19928777e/",
    //   accounts: [""],
    // },
    localhost: {
      
    },
    ganache: {
      url: "http://127.0.0.1:7545",
        accounts: [
          `0x389e8f4b58876f858f4c0f4da25d2ca413a48ac6d409aea03e5e4e273ae8493d`,
        ],  
    },
  },
  // etherscan: {
  //   apiKey: ""
  // }
};