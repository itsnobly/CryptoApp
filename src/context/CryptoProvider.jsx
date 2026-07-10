import { useEffect, useState } from 'react';
import { CryptoContext } from './crypto-context';
import { percentDifference } from '../utils';
import { fetchCrypto, fetchAssets } from '../api';

export default function CryptoProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [error, setError] = useState(null);

  const preloadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [cryptoData, assetsData] = await Promise.all([
        fetchCrypto(),
        fetchAssets(),
      ]);

      const { result } = cryptoData;
      setCrypto(result);

      const enrichedAssets = assetsData.map((asset) => {
        const coin = result.find((c) => c.id === asset.id);

        if (!coin) return asset;

        const growPercent = percentDifference(asset.price, coin.price);
        const totalAmount = asset.amount * coin.price;
        const totalProfit = totalAmount - asset.amount * asset.price;

        return {
          ...asset,
          name: coin.name,
          symbol: coin.symbol,
          grow: asset.price < coin.price,
          growPercent,
          totalAmount,
          totalProfit,
          currentPrice: coin.price,
        };
      });

      setAssets(enrichedAssets);
    } catch (err) {
      setError(err.message || 'Failed to load crypto data');
      console.error('Error preloading crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    preloadData();
  }, []);

  const addAsset = (asset) => {
    setAssets((prev) => [...prev, asset]);
  };

  const removeAsset = (assetId) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
  };

  const updateAsset = (assetId, updates) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === assetId ? { ...asset, ...updates } : asset,
      ),
    );
  };

  const value = {
    loading,
    crypto,
    assets,
    error,
    addAsset,
    removeAsset,
    updateAsset,
    refetchData: preloadData,
  };

  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
}
