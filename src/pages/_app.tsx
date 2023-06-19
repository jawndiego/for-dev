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
          <title>Clouds by Felt Zine</title>
        </NextHead>
		<div
		style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: '-1',        
			backgroundImage: 'url("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTljZGRjZTgwZWE2ZTQxMzVjODU2OTBjMTI4YzdlMzY2MjkxYmU2ZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/ylXLBVdhuyQKeVHiWC/giphy.gif")',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
				//backgroundColor: 'transparent',
			backgroundColor: 'rgba(0, 0, 0, 0)', // Adjust the alpha value (0.5) for transparency
		}}></div>          
        {mounted ? <Component {...pageProps} /> : <div />}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
