import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { mainnet } from "wagmi";

export default defineConfig({
  out: "src/wagmi/generated.ts",
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: mainnet.id,
      contracts: [
        {
          name: "mechaFutures",
          address: {
            [mainnet.id]: "0x127eB7b87CBb33Ade80961eb026996109A936a35",
          },
        },
        {
          name: "housePlants",
          address: {
            [mainnet.id]: "0x32887799ba0d479fa9495c4f1dd28178b37068e5",
          },
        },
      ],
    }),
    react(),
  ],
});
