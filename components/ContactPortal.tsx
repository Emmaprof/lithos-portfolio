'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { PORTAL_ADDRESS, PORTAL_ABI } from '../constants/contracts';

export default function ContactPortal() {
  const { isConnected } = useAccount();
  const [message, setMessage] = useState('');

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    writeContract({
      address: PORTAL_ADDRESS,
      abi: PORTAL_ABI,
      functionName: 'submitMessage',
      args: [message],
    });
  };

  if (!isConnected) {
    return (
      <div className="p-8 border border-white/10 bg-black/50 backdrop-blur-md rounded-sm w-full max-w-md mx-auto flex flex-col items-center">
        <p className="text-gray-400 font-light tracking-wide mb-6 text-center">
          Connect your Web3 identity to initialize a secure, hardware-encrypted session.
        </p>
        {/* RainbowKit handles the entire connection UI */}
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="p-6 border border-white/10 bg-black/50 backdrop-blur-md rounded-sm w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Smart Privacy Portal</h3>
        {/* We keep a compact connect button here so they can disconnect if needed */}
        <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" />
      </div>
      
      <p className="text-sm text-gray-400 mb-6 font-light">
        End-to-end encrypted messaging via Oasis Sapphire TEE.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter classified transmission..."
          className="w-full bg-black border border-white/20 p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors h-32 resize-none"
          disabled={isPending || isConfirming}
        />
        
        <button 
        type="submit" 
        disabled={isPending || isConfirming || !message}
        className="relative w-full py-4 bg-white text-black overflow-hidden group transition-all duration-500 hover:tracking-[0.2em] disabled:opacity-50"
      >
        <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase text-xs">
          {isPending ? (
            <>
              <span className="animate-spin text-lg">⚡</span> ENCRYPTING PAYLOAD...
            </>
          ) : isConfirming ? (
            "BROADCASTING TO TEE..."
          ) : (
            "SECURE TRANSMISSION"
          )}
        </span>
        
        {/* The "Futuristic" Loading Bar */}
        {(isPending || isConfirming) && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-blue-500/20"
          />
        )}
      </button>
      </form>

      {isConfirmed && (
        <div className="mt-4 p-3 border border-green-500/30 bg-green-500/10 text-green-400 text-sm text-center break-all">
          Transmission secured. Hash: <br/><span className="font-mono text-xs">{hash}</span>
        </div>
      )}
    </div>
  );
}