'use client';
import { useBlockNumber, useAccount } from 'wagmi';

export default function SystemHeader() {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { isConnected, address } = useAccount();

  return (
    <div className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-center pointer-events-none">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-white/40 leading-none uppercase tracking-tighter">Network_Status</span>
          <span className="text-[10px] font-mono text-green-400 uppercase leading-relaxed">Oasis_Sapphire_Online</span>
        </div>
        <div className="h-4 w-px bg-white/10"></div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-white/40 leading-none uppercase tracking-tighter">Block_Height</span>
          <span className="text-[10px] font-mono text-white leading-relaxed">#{blockNumber?.toString() || '-------'}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isConnected && (
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-white/40 leading-none uppercase tracking-tighter">Authenticated_As</span>
            <span className="text-[10px] font-mono text-blue-400 leading-relaxed italic">{address?.slice(0,6)}...{address?.slice(-4)}</span>
          </div>
        )}
      </div>
    </div>
  );
}