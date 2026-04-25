require("dotenv").config();
const { ethers } = require("ethers");
const { wrapEthersSigner } = require("@oasisprotocol/sapphire-ethers-v6");

async function main() {
  console.log("================================================");
  console.log("🛠️ INITIATING BARE-METAL TEE CONNECTION");
  console.log("================================================\n");

  const provider = new ethers.JsonRpcProvider("https://testnet.sapphire.oasis.dev");
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) throw new Error("❌ Missing PRIVATE_KEY in .env");

  const wallet = new ethers.Wallet(privateKey, provider);
  console.log(`Terminal Wallet: ${wallet.address}`);

  // The Wrapper that encrypts and signs the queries
  const secureOwner = wrapEthersSigner(wallet);

  const abi = [
    "function getMessageCount() view returns (uint256)",
    "function getMessage(uint256 index) view returns (address sender, string content, uint256 timestamp)"
  ];

  const contractAddress = "0x2E71dcE4A196B144D8E833336AA02D966a11FfC9";
  const portal = new ethers.Contract(contractAddress, abi, secureOwner);

  try {
    console.log("\n[TEST 3] Attempting Hardware-Level Decryption...");
    
    // ----------------------------------------------------------------------
    // CRITICAL FIX: Bypass Ethers v6 "view" optimization.
    // We manually generate the transaction data, then FORCE the wrapped 
    // signer to execute it so the signature is cryptographically sealed.
    // ----------------------------------------------------------------------
    
    // 1. Generate raw transaction for getMessageCount
    const countTx = await portal.getMessageCount.populateTransaction();
    // 2. Force the call through the secure wrapper
    const countRaw = await secureOwner.call(countTx);
    // 3. Decode the raw bytes back into a number
    const count = portal.interface.decodeFunctionResult("getMessageCount", countRaw)[0];
    
    console.log(`✅ PASSED! TOTAL SECURE TRANSMISSIONS: ${count.toString()}`);
    
    for (let i = 0; i < Number(count); i++) {
      // Repeat the manual override for getMessage(i)
      const msgTx = await portal.getMessage.populateTransaction(i);
      const msgRaw = await secureOwner.call(msgTx);
      const msg = portal.interface.decodeFunctionResult("getMessage", msgRaw);

      console.log(`\n[TRANSMISSION #${i}]`);
      console.log(`SENDER:   ${msg.sender}`);
      console.log(`PAYLOAD:  ${msg.content}`);
      console.log(`TIME:     ${new Date(Number(msg.timestamp) * 1000).toLocaleString()}`);
    }
    console.log('\n---------------------------------------------');
  } catch (error) {
    console.error("\n❌ FAILED: TEE ACCESS DENIED.");
    console.error(error.message);
  }
}

main().catch(console.error);