import { createContext, useContext, useState } from 'react';

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
      roi: 'ROI',
      analytics: 'Analytics',
      totalInvested: 'Total Invested',
      currentValue: 'Current Value',
      realizedProfit: 'Realized Profit',
      unrealizedProfit: 'Unrealized Profit',
      overallProfit: 'Overall Profit',
      performanceByAsset: 'Performance by Asset',
    },
    assets: {
      title: 'Assets',
      search: 'Search assets...',
      noAssets: 'No assets yet. Add your first asset to get started.',
      edit: 'Edit',
      sell: 'Sell',
      delete: 'Delete',
    },
    history: {
      title: 'Transaction History',
      search: 'Search transactions...',
      type: 'Type',
      coin: 'Coin',
      amount: 'Amount',
      price: 'Price',
      total: 'Total',
      date: 'Date',
      noTransactions: 'No transactions yet.',
      all: 'All',
    },
    watchlist: {
      title: 'Watchlist',
      yourWatchlist: 'Your Watchlist',
      noCoins: 'No coins in watchlist. Add coins from the list below.',
      allCoins: 'All Coins',
      searchCoins: 'Search coins...',
      coin: 'Coin',
      symbol: 'Symbol',
      price: 'Price',
      change24h: '24h Change',
      addToWatchlist: 'Add to watchlist',
    },
    settings: {
      title: 'Settings',
      darkMode: 'Dark Mode',
      showMarketPrices: 'Show Market Prices',
      language: 'Language',
    },
    addAsset: {
      title: 'Add Assets',
      selectCoin: 'Select coin',
      amount: 'Amount',
      buyPrice: 'Buy price (optional)',
      buyPriceTooltip: 'If left empty, current market price will be used',
      date: 'Date',
      total: 'Total',
      submit: 'Add Asset',
      amountRequired: 'Amount is required',
      amountPositive: 'Amount must be greater than 0',
      pricePositive: 'Price must be greater than 0',
      dateRequired: 'Date required',
      changeCoin: 'Change',
    },
    sellAsset: {
      title: 'Sell Asset',
      sellAmount: 'Sell Amount',
      sellPrice: 'Sell Price ($)',
      date: 'Date',
      submit: 'Sell',
      amountRequired: 'Please enter amount',
      amountRange: 'Amount must be between',
      priceRequired: 'Please enter price',
      priceMin: 'Price must be at least $0.01',
      dateRequired: 'Please select date',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      coin: 'Coin',
      available: 'Available',
      currentPrice: 'Current Price',
      currentValue: 'Current Value',
      profit: 'Profit',
      actions: 'Actions',
      name: 'Name',
      buyPrice: 'Buy Price',
      totalValue: 'Total Value',
      invested: 'Invested',
      roi: 'ROI',
      topCoins: 'Top coins',
      marketPricesHidden: 'Market prices are hidden. Enable in Settings.',
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
      roi: 'ROI',
      analytics: 'Аналитика',
      totalInvested: 'Всего инвестировано',
      currentValue: 'Текущая стоимость',
      realizedProfit: 'Реализованная прибыль',
      unrealizedProfit: 'Нереализованная прибыль',
      overallProfit: 'Общая прибыль',
      performanceByAsset: 'Производительность активов',
    },
    assets: {
      title: 'Активы',
      search: 'Поиск активов...',
      noAssets: 'Активов пока нет. Добавьте первый актив для начала.',
      edit: 'Редактировать',
      sell: 'Продать',
      delete: 'Удалить',
    },
    history: {
      title: 'История транзакций',
      search: 'Поиск транзакций...',
      type: 'Тип',
      coin: 'Монета',
      amount: 'Количество',
      price: 'Цена',
      total: 'Всего',
      date: 'Дата',
      noTransactions: 'Транзакций пока нет.',
      all: 'Все',
    },
    watchlist: {
      title: 'Избранное',
      yourWatchlist: 'Ваш список избранного',
      noCoins: 'В избранном нет монет. Добавьте монеты из списка ниже.',
      allCoins: 'Все монеты',
      searchCoins: 'Поиск монет...',
      coin: 'Монета',
      symbol: 'Символ',
      price: 'Цена',
      change24h: 'Изм. за 24ч',
      addToWatchlist: ' В избранное',
    },
    settings: {
      title: 'Настройки',
      darkMode: 'Темная тема',
      showMarketPrices: 'Показывать рыночные цены',
      language: 'Язык',
    },
    addAsset: {
      title: 'Добавить активы',
      selectCoin: 'Выберите монету',
      amount: 'Количество',
      buyPrice: 'Цена покупки (опционально)',
      buyPriceTooltip:
        'Если оставить пустым, будет использована текущая рыночная цена',
      date: 'Дата',
      total: 'Всего',
      submit: 'Добавить актив',
      amountRequired: 'Количество обязательно',
      amountPositive: 'Количество должно быть больше 0',
      pricePositive: 'Цена должна быть больше 0',
      dateRequired: 'Дата обязательна',
      changeCoin: 'Изменить',
    },
    sellAsset: {
      title: 'Продать актив',
      sellAmount: 'Количество для продажи',
      sellPrice: 'Цена продажи ($)',
      date: 'Дата',
      submit: 'Продать',
      amountRequired: 'Пожалуйста, введите количество',
      amountRange: 'Количество должно быть между',
      priceRequired: 'Пожалуйста, введите цену',
      priceMin: 'Цена должна быть минимум $0.01',
      dateRequired: 'Пожалуйста, выберите дату',
    },
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      save: 'Сохранить',
      cancel: 'Отмена',
      close: 'Закрыть',
      coin: 'Монета',
      available: 'Доступно',
      currentPrice: 'Текущая цена',
      currentValue: 'Текущая стоимость',
      profit: 'Прибыль',
      actions: 'Действия',
      name: 'Название',
      buyPrice: 'Цена покупки',
      totalValue: 'Общая стоимость',
      invested: 'Инвестировано',
      roi: 'ROI',
      topCoins: 'Топ монет',
      marketPricesHidden: 'Рыночные цены скрыты. Включите в Настройках.',
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
