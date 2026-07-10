/**
 * Вычислить процентную разницу между двумя значениями
 * @param {number} a Первое значение
 * @param {number} b Второе значение
 * @returns {number} Процентная разница
 */
export function percentDifference(a, b) {
  if (a === 0 && b === 0) return 0;
  if (a === 0) return b > 0 ? 100 : -100;
  const result = ((b - a) / a) * 100;
  return Number(Math.round((result + Number.EPSILON) * 100) / 100);
}

/**
 * Привести первую букву в заглавную
 * @param {string} str Строка
 * @returns {string} Строка с первой заглавной буквой
 */
export function capitalize(str) {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Отформатировать число как валюту
 * @param {number} value Значение
 * @param {string} currency Код валюты (по умолчанию USD)
 * @returns {string} Отформатированная строка
 */
export function formatCurrency(value, currency = 'USD') {
  if (
    typeof value !== 'number' ||
    Number.isNaN(value) ||
    !Number.isFinite(value)
  )
    return '$0.00';
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}

/**
 * Отформатировать число с разделителями тысяч
 * @param {number} value Значение
 * @param {number} fractionDigits Количество знаков после запятой
 * @returns {string} Отформатированное число
 */
export function formatNumber(value, fractionDigits = 2) {
  if (
    typeof value !== 'number' ||
    Number.isNaN(value) ||
    !Number.isFinite(value)
  )
    return '0';
  const multiplier = Math.pow(10, fractionDigits);
  const rounded =
    Math.round((value + Number.EPSILON) * multiplier) / multiplier;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(rounded);
}

/**
 * Сокращённое отображение больших чисел (K, M, B)
 * @param {number} value Значение
 * @returns {string} Сокращённая запись
 */
export function abbreviateNumber(value) {
  if (
    typeof value !== 'number' ||
    Number.isNaN(value) ||
    !Number.isFinite(value)
  )
    return '0';
  const absValue = Math.abs(value);

  if (absValue >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  }
  if (absValue >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  }
  if (absValue >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  }

  return value.toFixed(2);
}

/**
 * Получить цвет в зависимости от знака числа
 * @param {number} value Значение
 * @returns {string} CSS класс или цвет
 */
export function getPriceChangeColor(value) {
  if (typeof value !== 'number') return 'neutral';
  if (value > 0) return 'green';
  if (value < 0) return 'red';
  return 'neutral';
}

/**
 * Отформатировать процент
 * @param {number} value Значение
 * @returns {string} Строка с процентом и знаком
 */
export function formatPercent(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '0%';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
export function formatCompactNumber(value) {
  if (!value) return '0';

  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)}T`;
  }

  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }

  return value.toLocaleString();
}
