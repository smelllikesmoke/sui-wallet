import dynamic from 'next/dynamic';
import Head from "next/head";
import { useState } from 'react';

const WalletButton = dynamic(() => 
  import('@suiet/wallet-kit').then(mod => {
    const ConnectButton = mod.ConnectButton;
    const useWallet = mod.useWallet;
    const addressEllipsis = mod.addressEllipsis;

    return function WalletButtonComponent() {
      const wallet = useWallet();
      const [error, setError] = useState('');

      // Clear error after 3 seconds
      const handleError = (err) => {
        setError(err);
        setTimeout(() => setError(''), 3000);
      };

      const handleDisconnect = async () => {
        try {
          await wallet.disconnect();
          setError('');
        } catch (err) {
          handleError('Failed to disconnect wallet. Please try again.');
        }
      };

      return (
        <div style={{ textAlign: 'center' }}>
          {error && (
            <div style={{
              color: '#ff4444',
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 68, 68, 0.1)'
            }}>
              {error}
            </div>
          )}
          
          {wallet.connected ? (
            <div>
              <div style={{ fontSize: '1.5rem' }}>{addressEllipsis(wallet.address)}</div>
              <div>
                Status: <span style={{ color: 'green' }}>{wallet.status}</span>
              </div>
              <button
                style={{
                  marginTop: '20px',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <ConnectButton
              onConnectError={(err) => handleError('Failed to connect wallet. Please try again.')}
            />
          )}
        </div>
      );
    };
  }),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <WalletButton />
      </div>
      <Head>
        <title>Sui Wallet Connect</title>
      </Head>
    </>
  );
} 