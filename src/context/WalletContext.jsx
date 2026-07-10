import { createContext, useContext, useState, useCallback } from 'react';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletType, setWalletType] = useState(null);

  // MetaMask Connection
  const connectMetaMask = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const account = accounts[0];
        setWalletAddress(account);
        setWalletType('metamask');
        setConnectedWallet({
          type: 'metamask',
          address: account,
          chainId: await window.ethereum.request({ method: 'eth_chainId' }),
        });
        return account;
      } catch (error) {
        console.error('MetaMask connection error:', error);
        throw error;
      }
    } else {
      throw new Error('MetaMask not installed');
    }
  }, []);

  // WalletConnect Connection (placeholder for future implementation)
  const connectWalletConnect = useCallback(async () => {
    // Future implementation with @walletconnect/web3-provider
    throw new Error('WalletConnect not yet implemented');
  }, []);

  // Binance Wallet Connection (placeholder)
  const connectBinance = useCallback(async () => {
    if (typeof window.BinanceChain !== 'undefined') {
      try {
        const accounts = await window.BinanceChain.request({
          method: 'eth_requestAccounts',
        });
        const account = accounts[0];
        setWalletAddress(account);
        setWalletType('binance');
        setConnectedWallet({
          type: 'binance',
          address: account,
        });
        return account;
      } catch (error) {
        console.error('Binance connection error:', error);
        throw error;
      }
    } else {
      throw new Error('Binance Wallet not installed');
    }
  }, []);

  // Telegram Mini App (placeholder for future)
  const connectTelegram = useCallback(async () => {
    // Future implementation with Telegram WebApp API
    throw new Error('Telegram integration not yet implemented');
  }, []);

  const disconnectWallet = useCallback(() => {
    setConnectedWallet(null);
    setWalletAddress(null);
    setWalletType(null);
  }, []);

  const getWalletBalance = useCallback(async () => {
    if (!connectedWallet || !window.ethereum) return null;
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [walletAddress, 'latest'],
      });
      return parseInt(balance, 16) / 1e18; // Convert from wei to ETH
    } catch (error) {
      console.error('Error getting balance:', error);
      return null;
    }
  }, [connectedWallet, walletAddress]);

  const value = {
    connectedWallet,
    walletAddress,
    walletType,
    connectMetaMask,
    connectWalletConnect,
    connectBinance,
    connectTelegram,
    disconnectWallet,
    getWalletBalance,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
