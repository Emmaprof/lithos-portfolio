import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sapphire, sapphireTestnet } from 'wagmi/chains';
import { http } from 'viem';

export const config = getDefaultConfig({
  appName: 'Lithos.eth Architecture',
  projectId: 'YOUR_PROJECT_ID', // You can leave this as a string for now
  chains: [sapphire, sapphireTestnet],
  transports: {
    [sapphire.id]: http(),
    [sapphireTestnet.id]: http(),
  },
  ssr: true,
});