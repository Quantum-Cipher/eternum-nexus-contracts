const { HardhatUserConfig } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config(); 

// Ensure your private key is set in .env as PRIVATE_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const BSC_RPC_URL = process.env.BSC_RPC_URL || "";

// Define all API keys from your .env for verification purposes
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY || "";
const OPTIMISM_API_KEY = process.env.OPTIMISM_API_KEY || "";
const SNOWSCAN_API_KEY = process.env.SNOWSCAN_API_KEY || "";


const config = {
  // Set your desired Solidity compiler version
  solidity: "0.8.20", 

  // -------------------------------------------------------------------------
  // 1. NETWORK CONFIGURATION FOR DEPLOYMENT
  // -------------------------------------------------------------------------
  networks: {
    // Local development network (optional, but standard)
    hardhat: {
      chainId: 31337,
    },
    // BNB Smart Chain (BSC) TESTNET - Target for your initial deployment
    bscTestnet: {
      url: BSC_RPC_URL, // Requires BSC_RPC_URL from .env
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 97, // Official Chain ID for BSC Testnet
    },
    // Add other testnets/mainnets here for future deployments
    // For example, Ethereum Sepolia:
    // sepolia: {
    //   url: process.env.SEPOLIA_RPC_URL || "", 
    //   accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    //   chainId: 11155111,
    // },
    // bscMainnet: {
    //   url: process.env.BSC_MAINNET_RPC_URL || "", 
    //   accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    //   chainId: 56, // Official Chain ID for BSC Mainnet
    // },
  },

  // -------------------------------------------------------------------------
  // 2. ETHERSCAN/BSCSCAN VERIFICATION CONFIGURATION
  // -------------------------------------------------------------------------
  etherscan: {
    // Hardhat maps API keys based on the network name provided in the command line
    apiKey: {
      // Keys for Etherscan-derived explorers
      // Arbitrum One (Arbitrum mainnet)
      arbitrumOne: ARBISCAN_API_KEY,
      // Optimism (Optimism mainnet)
      optimisticEthereum: OPTIMISM_API_KEY,
      // Avalanche (for Snowtrace)
      avalanche: SNOWSCAN_API_KEY,
      // BSC Testnet
      bscTestnet: BSCSCAN_API_KEY,
      // General Ethereum key
      mainnet: ETHERSCAN_API_KEY, 
    },
    
    // Custom chains are necessary to tell Hardhat where the API endpoints are 
    // for non-natively supported networks (like BSC Testnet)
    customChains: [
      {
        network: "bscTestnet",
        chainId: 97,
        urls: {
          apiURL: "https://api-testnet.bscscan.com/api",
          browserURL: "https://testnet.bscscan.com",
        },
      },
      // You may need to add others (like Avalanche or Arbitrum) if Hardhat's defaults fail
    ]
  },
};

module.exports = config;
