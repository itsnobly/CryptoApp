import { useEffect, useState } from 'react';
import { CryptoContext } from './crypto-context';
import { percentDifference } from '../utils';
import { fakeFetchCrypto, fakeFetchAssets } from '../api';

export default function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    async function preload() {
      try {
        setLoading(true);

        const { result } = await fakeFetchCrypto();
        const assetsData = await fakeFetchAssets();

        setCrypto(result);

        setAssets(
          assetsData.map((asset) => {
            const coin = result.find((c) => c.id === asset.id);

            if (!coin) return asset;

            return {
              ...asset,
              name: coin.name,
              grow: asset.price < coin.price,
              growPercent: percentDifference(asset.price, coin.price),
              totalAmount: asset.amount * coin.price,
              totalProfit:
                asset.amount * coin.price - asset.amount * asset.price,
            };
          }),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    preload();
  }, []);

  return (
    <CryptoContext.Provider
      value={{
        loading,
        crypto,
        assets,
      }}>
      {children}
    </CryptoContext.Provider>
  );
}
