import { useEffect, useState } from 'react';
import { CryptoContext } from './crypto-context';
import { fetchCrypto } from '../api';

export default function CryptoProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState(() => {
    const savedAssets = localStorage.getItem('cryptoAssets');
    return savedAssets ? JSON.parse(savedAssets) : [];
  });
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('cryptoTransactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [crypto, setCrypto] = useState([]);
  const [error, setError] = useState(null);

  const preloadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const cryptoData = await fetchCrypto();
      const { result } = cryptoData;
      setCrypto(result);

      // Re-enrich existing assets with current crypto prices
      setAssets((prevAssets) => {
        if (prevAssets.length === 0) return prevAssets;
        
        return prevAssets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);
          if (!coin) return asset;

          const buyPrice = parseFloat(asset.price) || 0;
          const currentPrice = parseFloat(coin.price) || 0;
          const amount = parseFloat(asset.amount) || 0;
          
          const invested = amount * buyPrice;
          const currentValue = amount * currentPrice;
          const totalProfit = currentValue - invested;
          
          // Calculate profit percentage: ((current - invested) / invested) * 100
          const growPercent = invested > 0 ? ((currentValue - invested) / invested) * 100 : 0;
          
          const totalAmount = currentValue;

          return {
            ...asset,
            name: coin.name,
            symbol: coin.symbol,
            icon: coin.icon,
            price: buyPrice,
            amount,
            grow: totalProfit > 0,
            growPercent,
            totalAmount,
            totalProfit,
            currentPrice,
          };
        });
      });
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

  useEffect(() => {
    localStorage.setItem('cryptoAssets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('cryptoTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const addAsset = (newAsset) => {
    setAssets((prev) => {
      const existingIndex = prev.findIndex((a) => a.id === newAsset.id);
      
      if (existingIndex >= 0) {
        // Aggregate with existing asset
        const existing = prev[existingIndex];
        const totalAmount = existing.amount + newAsset.amount;
        const avgPrice = (existing.amount * existing.price + newAsset.amount * newAsset.price) / totalAmount;
        
        const coin = crypto.find((c) => c.id === newAsset.id);
        const currentPrice = coin?.price || newAsset.currentPrice || newAsset.price;
        const invested = totalAmount * avgPrice;
        const currentValue = totalAmount * currentPrice;
        const totalProfit = currentValue - invested;
        const growPercent = invested > 0 ? ((currentValue - invested) / invested) * 100 : 0;
        
        return prev.map((a, index) =>
          index === existingIndex
            ? {
                ...a,
                amount: totalAmount,
                price: avgPrice,
                date: new Date(),
                totalAmount: currentValue,
                totalProfit,
                currentPrice,
                grow: totalProfit > 0,
                growPercent,
                name: coin?.name || a.name,
                symbol: coin?.symbol || a.symbol,
                icon: coin?.icon || a.icon,
              }
            : a,
        );
      }
      
      // New asset - ensure it has enriched data
      const coin = crypto.find((c) => c.id === newAsset.id);
      const currentPrice = coin?.price || newAsset.currentPrice || newAsset.price;
      const invested = newAsset.amount * newAsset.price;
      const currentValue = newAsset.amount * currentPrice;
      const totalProfit = currentValue - invested;
      const growPercent = invested > 0 ? ((currentValue - invested) / invested) * 100 : 0;
      
      return [
        ...prev,
        {
          ...newAsset,
          name: newAsset.name || coin?.name,
          symbol: newAsset.symbol || coin?.symbol,
          icon: newAsset.icon || coin?.icon,
          totalAmount: currentValue,
          totalProfit,
          currentPrice,
          grow: totalProfit > 0,
          growPercent,
        },
      ];
    });

    // Add BUY transaction
    const transaction = {
      id: Date.now(),
      type: 'BUY',
      coinId: newAsset.id,
      coinName: newAsset.name,
      symbol: newAsset.symbol,
      amount: newAsset.amount,
      price: newAsset.price,
      total: newAsset.amount * newAsset.price,
      date: newAsset.date || new Date(),
    };
    setTransactions((prev) => [...prev, transaction]);
  };

  const removeAsset = (assetId) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
  };

  const sellAsset = (assetId, amount, price) => {
    setAssets((prev) => {
      const assetIndex = prev.findIndex((a) => a.id === assetId);
      if (assetIndex < 0) return prev;

      const asset = prev[assetIndex];
      if (amount >= asset.amount) {
        // Remove entire asset
        return prev.filter((a) => a.id !== assetId);
      }

      // Partial sell
      const newAmount = asset.amount - amount;
      return prev.map((a, index) =>
        index === assetIndex
          ? { ...a, amount: newAmount }
          : a,
      );
    });

    // Add SELL transaction
    const asset = assets.find((a) => a.id === assetId);
    if (asset) {
      const transaction = {
        id: Date.now(),
        type: 'SELL',
        coinId: assetId,
        coinName: asset.name,
        symbol: asset.symbol,
        amount,
        price,
        total: amount * price,
        profit: amount * (price - asset.price),
        date: new Date(),
      };
      setTransactions((prev) => [...prev, transaction]);
    }
  };

  const updateAsset = (assetId, updates) => {
    setAssets((prev) =>
      prev.map((asset) => {
        if (asset.id === assetId) {
          const coin = crypto.find((c) => c.id === assetId);
          const currentPrice = coin?.price || asset.currentPrice || asset.price;
          const amount = updates.amount !== undefined ? updates.amount : asset.amount;
          const price = updates.price !== undefined ? updates.price : asset.price;
          
          const invested = amount * price;
          const currentValue = amount * currentPrice;
          const totalProfit = currentValue - invested;
          const growPercent = invested > 0 ? ((currentValue - invested) / invested) * 100 : 0;
          
          return {
            ...asset,
            ...updates,
            totalAmount: currentValue,
            totalProfit,
            currentPrice,
            grow: totalProfit > 0,
            growPercent,
          };
        }
        return asset;
      }),
    );
  };

  const value = {
    loading,
    crypto,
    assets,
    transactions,
    error,
    addAsset,
    removeAsset,
    updateAsset,
    sellAsset,
    refetchData: preloadData,
  };

  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
}
