const hre = require("hardhat");

async function main() {
  console.log("Deploying LithosPortal to Sapphire Testnet...");

  // We pull ethers directly from the Hardhat Runtime Environment (hre)
  const Portal = await hre.ethers.getContractFactory("LithosPortal");
  const portal = await Portal.deploy();

  await portal.waitForDeployment();
  const address = await portal.getAddress();

  console.log(`LithosPortal deployed securely to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});