import { createContext, useContext } from 'react';

export const CryptoContext = createContext(null);

export function useCrypto() {
  const context = useContext(CryptoContext);

  if (!context) {
    throw new Error('useCrypto must be used inside CryptoProvider');
  }

  return context;
}
