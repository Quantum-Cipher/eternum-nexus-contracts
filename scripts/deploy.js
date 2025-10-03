const hre = require("hardhat");

async function main() {
  // The initial reward amount in WEI. 1 ETH = 1e18 WEI.
  // Let's set it to 0.01 testnet BNB for this example.
  const initialReward = hre.ethers.parseEther("0.01");

  console.log("Casting the NexusCore contract onto the blockchain...");

  const nexusCore = await hre.ethers.deployContract("NexusCore", [initialReward]);

  await nexusCore.waitForDeployment();

  console.log(`\n>>>>> ETERNUM NEXUS IS LIVE <<<<<`);
  console.log(`NexusCore contract deployed to: ${nexusCore.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
