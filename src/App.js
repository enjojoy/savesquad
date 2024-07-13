import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mergeNetworks } from '@dynamic-labs/sdk-react-core';
import { http } from "viem";
import {
  baseSepolia,
  rootstockTestnet,
  arbitrumSepolia,
  celoAlfajores,
} from "viem/chains";

import Main from "./Main";

const config = createConfig({
  chains: [baseSepolia, rootstockTestnet, arbitrumSepolia, celoAlfajores],
  multiInjectedProviderDiscovery: false,
  transports: {
    [baseSepolia.id]: http(), 
    [rootstockTestnet.id]: http(),
    [arbitrumSepolia.id]: http(),
    [celoAlfajores.id]: http(),
  },
});

const queryClient = new QueryClient();

const evmNetworks = [
  {
    blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
    chainId: 31,
    chainName: 'Rootstock Testnet',
    name: "Rootstock Testnet",
    nativeCurrency: {
      decimals: 18,
      name: "Rootstock Smart Bitcoin",
      symbol: "tRBTC",
    },
    networkId: 31,
    rpcUrls: ['https://public-node.testnet.rsk.co'],
    vanityName: 'rsktestnet',
  },
  {
    blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org'],
    chainId: 44787,
    chainName: 'Celo Alfajores',
    name: 'Celo Alfajores',
    nativeCurrency: {
      decimals: 18,
      name: 'CELO',
      symbol: 'CELO',
    },
    networkId: 44787,
    rpcUrls: ['https://docs.celo.org/network/node/forno#alfajores-testnet'],
    vanityName: 'celoAlfajores',
  }

]

export default function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "85285cec-cdd9-4d7a-a42c-c5444369ccbb",
        walletConnectors: [EthereumWalletConnectors],
        overrides:{
          evmNetworks: (networks) => mergeNetworks(evmNetworks, networks)
        }
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <Main />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
