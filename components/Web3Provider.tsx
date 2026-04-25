'use client';

import { useState, useEffect } from 'react'; // ADDED THIS
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Chain } from 'wagmi/chains';

const sapphireTestnet: Chain = {
  id: 23295,
  name: 'Oasis Sapphire Testnet',
  nativeCurrency: { name: 'TEST', symbol: 'TEST', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.sapphire.oasis.dev'] },
  },
  blockExplorers: {
    default: { name: 'Oasis Explorer', url: 'https://testnet.explorer.sapphire.oasis.dev' },
  },
};

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'fallback_id_to_prevent_crash';

const config = getDefaultConfig({
  appName: 'Lithos Portfolio',
  projectId: projectId, 
  chains: [sapphireTestnet],
  ssr: true, 
});

const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  // CRITICAL FIX: The Mounting State
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#22c55e', 
            accentColorForeground: 'black',
            borderRadius: 'none',
            fontStack: 'system',
          })}
        >
          {/* Only render children if mounted in the browser */}
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}