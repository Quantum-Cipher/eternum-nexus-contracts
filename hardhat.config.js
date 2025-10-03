require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { BSC_RPC_URL, SIGNER_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    bscTestnet: {
      url: BSC_RPC_URL || "",
      accounts: SIGNER_PRIVATE_KEY ? [SIGNER_PRIVATE_KEY] : [],
      chainId: 97,
    },
  },
};
