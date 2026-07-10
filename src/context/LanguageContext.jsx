import { useState } from 'react';
import { LanguageContext } from './language-context';
const translations = {
  en: {
    sidebar: {
      dashboard: 'Dashboard',
      assets: 'Assets',
      history: 'History',
      analytics: 'Analytics',
      watchlist: 'Watchlist',
      settings: 'Settings',
    },

    header: {
      selectCoin: 'Select coin',
      addAssets: 'Add Assets',
      add: 'Add',
    },

    assets: {
      title: 'Assets',
      noAssets: 'No assets',
    },

    watchlist: {
      title: 'Watchlist',
      yourWatchlist: 'Your Watchlist',
      allCoins: 'All Coins',
      coin: 'Coin',
      symbol: 'Symbol',
      price: 'Price',
      change24h: '24h Change',
      addToWatchlist: 'Add to Watchlist',
      searchCoins: 'Search coins',
      noCoins: 'No coins in watchlist',
    },

    history: {
      title: 'Transaction History',
      all: 'All Transactions',
      date: 'Date',
      type: 'Type',
      coin: 'Coin',
      amount: 'Amount',
      price: 'Price',
      total: 'Total',
      profit: 'Profit',
      buy: 'BUY',
      sell: 'SELL',
      search: 'Search transaction',
      noTransactions: 'No transactions',
      of: 'of',
      transactions: 'transactions',
      perPage: '/ page',
    },

    dashboard: {
      totalPortfolio: 'Total Portfolio',
      totalProfit: 'Total Profit',
      portfolioDistribution: 'Portfolio Distribution',
      dailyChange: 'Daily Change',
      pnl24h: '24h P&L',
      bestPerformer: 'Best Performer',
      worstPerformer: 'Worst Performer',
      yourAssets: 'Your Assets',
      total: 'total',
      assetAmount: 'Asset Amount',
      difference: 'Difference',
      gainers: 'Gainers',
      losers: 'Losers',
      invested: 'Invested',
      roi: 'Доходность',
      analytics: 'Analytics',
      totalInvested: 'Total Invested',
      currentValue: 'Current Value',
      realizedProfit: 'Realized Profit',
      unrealizedProfit: 'Unrealized Profit',
      overallProfit: 'Overall Profit',
      performanceByAsset: 'Performance by Asset',
    },

    coinInfo: {
      currentPrice: 'Current Price',
      change1h: 'Change 1h',
      change24h: 'Change 24h',
      change7d: 'Change 7d',
      marketCap: 'Market Cap',
      volume24h: 'Volume 24h',
      availableSupply: 'Available Supply',
      totalSupply: 'Total Supply',
      rank: 'Rank',
      symbol: 'Symbol',
      officialWebsite: 'Official Website',
    },

    settings: {
      title: 'Settings',
      darkMode: 'Dark Mode',
      showMarketPrices: 'Show Market Prices',
      language: 'Language',
    },

    common: {
      loading: 'Loading...',
      error: 'Error',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      profit: 'Profit',
      totalValue: 'Total Value',
      invested: 'Invested',
      roi: 'Доходность',
      name: 'Name',
      actions: 'Actions',
      buyPrice: 'Buy Price',
      currentPrice: 'Current Price',
      coin: 'Coin',
      topCoins: 'Top Coins',
    },

    addAsset: {
      title: 'Add Asset',
      selectCoin: 'Select Coin',
      amount: 'Amount',
      amountRequired: 'Amount is required',
      amountPositive: 'Amount must be positive',
      buyPrice: 'Buy Price',
      buyPriceTooltip: 'Leave empty to use current market price',
      pricePositive: 'Price must be positive',
      date: 'Date',
      selectDate: 'Select date',
      dateRequired: 'Date is required',
      total: 'Total',
      submit: 'Add Asset',
      changeCoin: 'Change',
      marketPrice: 'Market price',
      priceUsed: 'If price not entered, market price used',
      buyPriceText: 'Buy price',
    },

    assetResult: {
      title: 'Asset Added',
      added: 'Added',
      price: 'at price',
      again: 'Add Again',
    },
  },

  ru: {
    sidebar: {
      dashboard: 'Дашборд',
      assets: 'Активы',
      history: 'История',
      analytics: 'Аналитика',
      watchlist: 'Избранное',
      settings: 'Настройки',
    },

    header: {
      selectCoin: 'Выберите монету',
      addAssets: 'Добавить активы',
      add: 'Добавить',
    },

    assets: {
      title: 'Активы',
      noAssets: 'Нет активов',
    },

    watchlist: {
      title: 'Избранные монеты',
      yourWatchlist: 'Ваш список монет',
      allCoins: 'Все монеты',
      coin: 'Монета',
      symbol: 'Символ',
      price: 'Цена',
      change24h: 'Изменение за 24ч',
      addToWatchlist: 'Добавить в избранное',
      searchCoins: 'Поиск монет',
      noCoins: 'Нет избранных монет',
    },

    history: {
      title: 'История операций',
      all: 'Все операции',
      date: 'Дата',
      type: 'Тип',
      coin: 'Монета',
      amount: 'Количество',
      price: 'Цена',
      total: 'Сумма',
      profit: 'Прибыль',
      buy: 'Покупка',
      sell: 'Продажа',
      search: 'Поиск операции',
      noTransactions: 'Нет операций',
      of: 'из',
      transactions: 'операций',
      perPage: '/ стр.',
    },

    dashboard: {
      totalPortfolio: 'Общий портфель',
      totalProfit: 'Общая прибыль',
      portfolioDistribution: 'Распределение портфеля',
      dailyChange: 'Изменение за день',
      pnl24h: 'Прибыль/убыток за 24ч',
      bestPerformer: 'Лучший актив',
      worstPerformer: 'Худший актив',
      yourAssets: 'Ваши активы',
      total: 'всего',
      assetAmount: 'Количество актива',
      difference: 'Разница',
      gainers: 'Растущие',
      losers: 'Падающие',
      invested: 'Инвестировано',
      roi: 'Доходность',
      analytics: 'Аналитика',
      totalInvested: 'Всего инвестировано',
      currentValue: 'Текущая стоимость',
      realizedProfit: 'Реализованная прибыль',
      unrealizedProfit: 'Нереализованная прибыль',
      overallProfit: 'Общая прибыль',
      performanceByAsset: 'Производительность активов',
    },

    coinInfo: {
      currentPrice: 'Текущая цена',
      change1h: 'Изменение за 1ч',
      change24h: 'Изменение за 24ч',
      change7d: 'Изменение за 7д',
      marketCap: 'Рыночная капитализация',
      volume24h: 'Объём за 24ч',
      availableSupply: 'Доступное предложение',
      totalSupply: 'Общее предложение',
      rank: 'Ранг',
      symbol: 'Символ',
      officialWebsite: 'Официальный сайт',
    },

    settings: {
      title: 'Настройки',
      darkMode: 'Темная тема',
      showMarketPrices: 'Показывать рыночные цены',
      language: 'Язык',
    },

    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      save: 'Сохранить',
      cancel: 'Отмена',
      close: 'Закрыть',
      profit: 'Прибыль',
      totalValue: 'Общая стоимость',
      invested: 'Инвестировано',
      roi: 'Доходность',
      name: 'Название',
      actions: 'Действия',
      buyPrice: 'Цена покупки',
      currentPrice: 'Текущая цена',
      coin: 'Монета',
      topCoins: 'Топ монет',
    },

    addAsset: {
      title: 'Добавить актив',
      selectCoin: 'Выберите монету',
      amount: 'Количество',
      amountRequired: 'Количество обязательно',
      amountPositive: 'Количество должно быть положительным',
      buyPrice: 'Цена покупки',
      buyPriceTooltip:
        'Если оставить пустым, будет использована текущая рыночная цена',
      pricePositive: 'Цена должна быть положительной',
      date: 'Дата',
      selectDate: 'Выберите дату',
      dateRequired: 'Дата обязательна',
      total: 'Всего',
      submit: 'Добавить актив',
      changeCoin: 'Изменить',
      marketPrice: 'Рыночная цена',
      priceUsed: 'Если цена не указана, используется рыночная цена',
      buyPriceText: 'Цена покупки',
    },

    assetResult: {
      title: 'Актив добавлен',
      added: 'Добавлено',
      price: 'по цене',
      again: 'Добавить ещё',
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    const keys = key.split('.');

    let value = translations[language];

    for (const item of keys) {
      value = value?.[item];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
      }}>
      {children}
    </LanguageContext.Provider>
  );
}
