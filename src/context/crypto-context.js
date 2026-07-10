import { createContext, useContext } from 'react';

export const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function useCrypto() {
  return useContext(CryptoContext);
}
