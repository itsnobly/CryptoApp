import { createContext } from 'react';

export const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});