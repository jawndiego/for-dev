import "../styles/globals.css";
import { ConnectKitProvider } from "connectkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { config } from "../wagmi";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="minimal">
        <NextHead>
          <title>Caisson</title>
        </NextHead>

        {mounted ? <Component {...pageProps} /> : <div />}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
