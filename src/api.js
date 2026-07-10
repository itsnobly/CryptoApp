import { cryptoAssets, cryptoData } from './data';

/**
 * Ошибка API
 */
class APIError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

// CoinGecko API configuration
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';
const COIN_IDS = [
  'bitcoin',
  'ethereum',
  'tether',
  'binancecoin',
  'solana',
  'ripple',
  'usd-coin',
  'staked-ether',
  'cardano',
  'avalanche-2',
  'dogecoin',
  'polkadot',
  'tron',
  'chainlink',
  'matic-network',
  'wrapped-bitcoin',
  'internet-computer',
  'shiba-inu',
  'dai',
  'litecoin',
];

/**
 * Получить все криптовалюты из реального API
 * @returns {Promise<Object>} Данные о криптовалютах
 */
export async function fetchCrypto() {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(',')}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
    );
    
    if (!response.ok) {
      throw new APIError(`API request failed: ${response.status}`, response.status);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new APIError('Invalid API response format', 400);
    }
    
    // Transform CoinGecko data to match our data structure
    const result = data.map((coin) => ({
      id: coin.id,
      icon: coin.image,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      rank: coin.market_cap_rank,
      price: coin.current_price,
      priceBtc: coin.price_btc || 0,
      volume: coin.total_volume,
      marketCap: coin.market_cap,
      availableSupply: coin.circulating_supply,
      totalSupply: coin.total_supply,
      priceChange1h: coin.price_change_percentage_1h_in_currency || 0,
      priceChange1d: coin.price_change_percentage_24h_in_currency || 0,
      priceChange1w: coin.price_change_percentage_7d_in_currency || 0,
      redditUrl: coin.links?.subreddit_url || '',
      websiteUrl: coin.links?.homepage?.[0] || '',
      twitterUrl: coin.links?.twitter_screen_name ? `https://twitter.com/${coin.links.twitter_screen_name}` : '',
      contractAddress: coin.contract_address || '',
      decimals: 18,
      explorers: [],
    }));
    
    return {
      result,
      meta: {
        page: 1,
        limit: result.length,
        itemCount: result.length,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      },
    };
  } catch (error) {
    // Fallback to mock data if API fails
    if (cryptoData && cryptoData.result) {
      return cryptoData;
    }
    throw new APIError(error.message || 'Failed to fetch crypto data', 500);
  }
}

/**
 * Получить активы пользователя
 * @returns {Promise<Array>} Массив активов
 */
export function fetchAssets() {
  return new Promise((resolve, reject) => {
    try {
      if (!Array.isArray(cryptoAssets)) {
        reject(new APIError('Invalid assets data structure', 400));
        return;
      }
      resolve(cryptoAssets);
    } catch {
      reject(new APIError('Failed to fetch assets', 500));
    }
  });
}

/**
 * Поиск криптовалюты по ID
 * @param {string} id ID криптовалюты
 * @returns {Promise<Object>} Данные о криптовалюте
 */
export async function fetchCryptoById(id) {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`
    );
    
    if (!response.ok) {
      throw new APIError(`API request failed: ${response.status}`, response.status);
    }
    
    const coin = await response.json();
    
    return {
      id: coin.id,
      icon: coin.image?.large || coin.image?.thumb || '',
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      rank: coin.market_cap_rank,
      price: coin.market_data?.current_price?.usd || 0,
      priceBtc: coin.market_data?.current_price?.btc || 0,
      volume: coin.market_data?.total_volume?.usd || 0,
      marketCap: coin.market_data?.market_cap?.usd || 0,
      availableSupply: coin.market_data?.circulating_supply || 0,
      totalSupply: coin.market_data?.total_supply || 0,
      priceChange1h: coin.market_data?.price_change_percentage_1h_in_currency?.usd || 0,
      priceChange1d: coin.market_data?.price_change_percentage_24h_in_currency?.usd || 0,
      priceChange1w: coin.market_data?.price_change_percentage_7d_in_currency?.usd || 0,
      redditUrl: coin.links?.subreddit_url || '',
      websiteUrl: coin.links?.homepage?.[0] || '',
      twitterUrl: coin.links?.twitter_screen_name ? `https://twitter.com/${coin.links.twitter_screen_name}` : '',
      contractAddress: coin.contract_address || '',
      decimals: 18,
      explorers: [],
    };
  } catch (error) {
    // Fallback to mock data if API fails
    const crypto = cryptoData.result.find((c) => c.id === id);
    if (crypto) {
      return crypto;
    }
    throw new APIError(error.message || 'Failed to fetch crypto', 500);
  }
}

// Обратная совместимость
export const fakeFetchCrypto = fetchCrypto;
export const fakeFetchAssets = fetchAssets;
