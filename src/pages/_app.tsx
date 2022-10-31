// NextJS import
import type { AppProps } from 'next/app'

// Custom component import
import Navbar from '@/components/navbar'

// CSS import
import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css'

// Dependencies import
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Book Library | LimeAcademy',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {
  return <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider theme={darkTheme({
      accentColor : '#4946FF',
    })} chains={chains}>
      <Navbar />

      <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>
}
