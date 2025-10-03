// deploySigner.js

// 🧬 Eternum Loader: Initializes the Seed of Eternum for BSC Testnet deployment

require('dotenv').config();
const { Wallet, providers } = require('ethers');

// Step 1: Connect to BSC Testnet
const provider = new providers.JsonRpcProvider(process.env.BSC_RPC_URL);

// Step 2: Load signer from .env
const privateKey = process.env.SIGNER_PRIVATE_KEY;
if (!privateKey || privateKey.length < 64) {
  throw new Error("Missing or invalid SIGNER_PRIVATE_KEY in .env");
}

// Step 3: Create signer wallet
const signer = new Wallet(privateKey, provider);

// Step 4: Ritual echo
console.log("🪬 Watermark Signer Initialized");
console.log("Address:", signer.address);
console.log("Network:", provider.network ? provider.network.name : "BSC Testnet");

// Optional: Embed symbolic metadata
signer.symbolicName = "Seed of Eternum";
signer.origin = "Genesis Log — October 2, 2025, NexusCore";
