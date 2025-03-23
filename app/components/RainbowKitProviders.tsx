'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  hardhat,
  sepolia,
  Chain,
} from 'wagmi/chains';

// Configure custom Sepolia with ZAN RPC URLs
const sepoliaChain: Chain = {
  ...sepolia,
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_ZAN_HTTP_URL!],
      webSocket: [process.env.NEXT_PUBLIC_ZAN_WS_URL!],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_ZAN_HTTP_URL!],
      webSocket: [process.env.NEXT_PUBLIC_ZAN_WS_URL!],
    },
  },
};

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: process.env.NODE_ENV === 'production' ? [sepoliaChain] : [hardhat],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 