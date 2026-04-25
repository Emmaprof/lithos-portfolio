'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import { wrapEthersSigner } from '@oasisprotocol/sapphire-ethers-v6';

const CONTRACT_ADDRESS = "0x2E71dcE4A196B144D8E833336AA02D966a11FfC9";
const ABI = [
  "function getMessageCount() view returns (uint256)",
  "function getMessage(uint256 index) view returns (address sender, string content, uint256 timestamp)"
];

export default function AdminTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [status, setStatus] = useState("Awaiting root authorization...");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'l') {
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const decryptPayloads = async () => {
    if (!privateKey || privateKey.length < 64) {
      setStatus("ERROR: Invalid Root Key format.");
      return;
    }

    try {
      setStatus("Establishing Bare-Metal RPC Pipeline...");
      
      const provider = new ethers.JsonRpcProvider("https://testnet.sapphire.oasis.dev", 23295);
      const formattedKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
      const wallet = new ethers.Wallet(formattedKey, provider);
      
      setStatus(`Identity Verified: ${wallet.address}. Wrapping payload...`);
      
      const secureSigner = wrapEthersSigner(wallet);
      const iface = new ethers.Interface(ABI);

      // ----------------------------------------------------------------------
      // CRITICAL ARCHITECTURE FIX: The Raw Payload Bypass
      // We manually encode the data and construct the transaction object.
      // This prevents Ethers v6 from stripping the 'from' address.
      // ----------------------------------------------------------------------
      
      const countTx = {
        to: CONTRACT_ADDRESS,
        from: wallet.address,
        data: iface.encodeFunctionData("getMessageCount")
      };
      
      // Force the raw transaction through the secure wrapper
      const countRaw = await secureSigner.call(countTx);
      const count = iface.decodeFunctionResult("getMessageCount", countRaw)[0];
      
      setStatus(`Found ${count.toString()} encrypted transmissions. Decrypting...`);
      
      const msgs = [];
      for (let i = 0; i < Number(count); i++) {
        const msgTx = {
          to: CONTRACT_ADDRESS,
          from: wallet.address,
          data: iface.encodeFunctionData("getMessage", [i])
        };
        
        const msgRaw = await secureSigner.call(msgTx);
        const decodedMsg = iface.decodeFunctionResult("getMessage", msgRaw);
        
        msgs.push({
          sender: decodedMsg.sender,
          content: decodedMsg.content,
          timestamp: decodedMsg.timestamp
        });
      }
      
      setMessages(msgs);
      setStatus("DECRYPTION COMPLETE.");
      setPrivateKey(""); 
    } catch (error: any) {
      console.error(error);
      setStatus("ACCESS DENIED: Hardware Enclave rejected the Root Key. Ensure wallet matches deployer.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          className="fixed top-0 left-0 w-full h-[70vh] bg-black/95 backdrop-blur-md border-b border-green-500/50 z-[999] font-mono p-8 overflow-y-auto shadow-[0_0_40px_rgba(0,255,0,0.15)]"
        >
          <div className="flex justify-between items-center border-b border-green-500/30 pb-4 mb-6">
            <span className="text-green-500 font-bold tracking-widest text-sm uppercase">Root Terminal // Lithos.eth</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white text-xs tracking-widest">[ CLOSE_TERMINAL ]</button>
          </div>
          
          <div className="text-gray-400 text-xs mb-6 space-y-2">
            <p className="text-blue-400">&gt; Bypassing browser proxy...</p>
            <p>&gt; Target Enclave: Oasis Sapphire Testnet.</p>
            <p className="text-white">&gt; Status: {status}</p>
          </div>

          <div className="flex flex-col gap-4 mb-8 max-w-lg">
            <input 
              type="password"
              placeholder="Inject Root Private Key..."
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="w-full bg-black border border-green-500/30 text-green-500 px-4 py-3 outline-none focus:border-green-500 text-xs tracking-widest placeholder:text-green-900"
            />
            <button onClick={decryptPayloads} className="px-6 py-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all text-xs uppercase tracking-[0.2em]">
              Execute_Decryption
            </button>
          </div>

          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className="p-5 bg-green-900/10 border border-green-500/20 rounded hover:border-green-500/50 transition-colors">
                <div className="text-green-400 text-[10px] mb-3 flex justify-between tracking-widest border-b border-green-500/10 pb-2">
                  <span>ID: 0x00{i}</span>
                  <span>{new Date(Number(msg.timestamp) * 1000).toLocaleString()}</span>
                </div>
                <div className="text-gray-400 text-xs mb-2">
                  SENDER: <span className="text-blue-400 break-all">{msg.sender}</span>
                </div>
                <div className="text-white text-sm leading-relaxed">
                  <span className="text-gray-500 text-xs mr-2">PAYLOAD:</span> 
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}