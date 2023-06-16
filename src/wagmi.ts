import { getDefaultConfig } from "connectkit";
import { configureChains, createConfig } from "wagmi";
import { mainnet, optimism, arbitrum, goerli, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;

let providers = [publicProvider()];
if (alchemyKey) {
  providers = [alchemyProvider({ apiKey: alchemyKey as string }), ...providers];
}
if (infuraKey) {
  providers = [infuraProvider({ apiKey: infuraKey as string })];
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  // [mainnet, optimism, arbitrum, goerli, sepolia],
  [mainnet],
  providers as any
);

export const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID as string,
    appName: "Caisson",
    autoConnect: true,
    chains,
    publicClient,
    webSocketPublicClient,
  })
);
