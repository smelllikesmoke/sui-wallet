import dynamic from 'next/dynamic';
import "@suiet/wallet-kit/style.css";
import "../styles/globals.css";

const WalletProvider = dynamic(
  () => import('@suiet/wallet-kit').then(mod => mod.WalletProvider),
  { ssr: false }
);

export default function App({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
} 