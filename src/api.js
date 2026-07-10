import { cryptoAssets, cryptoData } from './data';

// Симуляция сетевой задержки (мс)
const NETWORK_DELAY = 1500;

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

/**
 * Получить все криптовалюты
 * @returns {Promise<Object>} Данные о криптовалютах
 */
export function fetchCrypto() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!cryptoData || !cryptoData.result) {
          reject(new APIError('Invalid crypto data structure', 400));
          return;
        }
        resolve(cryptoData);
      } catch {
        reject(new APIError('Failed to fetch crypto data', 500));
      }
    }, NETWORK_DELAY);
  });
}

/**
 * Получить активы пользователя
 * @returns {Promise<Array>} Массив активов
 */
export function fetchAssets() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!Array.isArray(cryptoAssets)) {
          reject(new APIError('Invalid assets data structure', 400));
          return;
        }
        resolve(cryptoAssets);
      } catch {
        reject(new APIError('Failed to fetch assets', 500));
      }
    }, NETWORK_DELAY);
  });
}

/**
 * Поиск криптовалюты по ID
 * @param {string} id ID криптовалюты
 * @returns {Promise<Object>} Данные о криптовалюте
 */
export function fetchCryptoById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const crypto = cryptoData.result.find((coin) => coin.id === id);
        if (!crypto) {
          reject(new APIError(`Crypto with id "${id}" not found`, 404));
          return;
        }
        resolve(crypto);
      } catch {
        reject(new APIError('Failed to fetch crypto', 500));
      }
    }, NETWORK_DELAY / 2);
  });
}

// Обратная совместимость
export const fakeFetchCrypto = fetchCrypto;
export const fakeFetchAssets = fetchAssets;
