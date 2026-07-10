# 🚀 CryptoApp - Crypto Portfolio Management

Современное веб-приложение для управления портфелем криптовалют с отслеживанием цен, аналитикой и управлением активами в реальном времени.

## ✨ Возможности

- 📊 **Управление портфелем** - Добавляйте, редактируйте и удаляйте криптовалютные активы
- 📈 **Аналитика** - Отслеживайте прибыль/убыток и процентные изменения
- 💰 **Цены в реальном времени** - Получайте актуальные цены криптовалют
- 🎨 **Интуитивный интерфейс** - Современный дизайн на основе Ant Design
- 📱 **Адаптивный дизайн** - Работает на всех устройствах
- 🔐 **Надёжная архитектура** - React Context для управления состоянием
- ⚡ **Быстрая разработка** - Построено на Vite для максимальной производительности

## 📋 Содержание

- [Быстрый старт](#быстрый-старт)
- [Установка](#установка)
- [Использование](#использование)
- [Архитектура проекта](#архитектура-проекта)
- [API](#api)
- [Развертывание](#развертывание)
- [Проблемы и решения](#проблемы-и-решения)
- [Лицензия](#лицензия)

## 🎯 Быстрый старт

### Требования

- Node.js 16+
- npm или yarn

### Установка

1. **Клонируйте репозиторий**

```bash
git clone https://github.com/itsnobly/CryptoApp.git
cd CryptoApp
```

2. **Установите зависимости**

```bash
npm install
# или
yarn install
```

3. **Запустите приложение в режиме разработки**

```bash
npm run dev
# или
yarn dev
```

Приложение откроется на `http://localhost:5173`

## 💻 Использование

### Основные команды

```bash
# Запуск в режиме разработки
npm run dev

# Сборка для production
npm run build

# Локальный preview build'а
npm run preview

# Проверка кода линтером
npm run lint
```

### Основной функционал

#### 1. Просмотр портфеля

Откройте приложение - вы увидите список всех ваших активов с текущей ценой и прибылью/убытком.

#### 2. Добавление новых активов

- Нажмите кнопку **"Add Assets"**
- Выберите криптовалюту из выпадающего списка
- Введите количество и цену покупки
- Нажмите "Add"

#### 3. Просмотр информации о криптовалюте

- Выберите монету из выпадающего меню в заголовке
- Откроется модальное окно с подробной информацией

#### 4. Отслеживание статистики

- Смотрите общую стоимость портфеля на главной странице
- Отслеживайте процент роста/падения
- Анализируйте данные на графике

## 🏗️ Архитектура проекта

```
src/
├── api.js                           # API слой с функциями получения данных
├── App.jsx                          # Главный компонент приложения
├── data.js                          # Тестовые данные криптовалют
├── main.jsx                         # Точка входа приложения
├── utils.js                         # Утилиты для форматирования и расчётов
├── index.css                        # Глобальные стили
│
├── assets/                          # Статические ресурсы
│
├── components/
│   ├── Layout/
│   │   ├── AppLayout.jsx           # Основной layout приложения
│   │   ├── Content.jsx             # Главное содержимое
│   │   ├── Header.jsx              # Заголовок с поиском криптовалют
│   │   ├── Sidebar.jsx             # Боковая навигация
│   │   └── CardContent.jsx         # Контейнер для контента
│   │
│   ├── pages/
│   │   ├── Dashboard/              # Главная страница с статистикой
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Cards.jsx           # Карточки статистики
│   │   │   ├── Chart.jsx           # Диаграмма портфеля
│   │   │   └── Statistics.jsx      # Статистика активов
│   │   │
│   │   ├── Assets/                 # Управление активами
│   │   │   ├── Assets.jsx
│   │   │   ├── AddAssetsForm.jsx   # Форма добавления активов
│   │   │   ├── CoinInfo.jsx        # Информация о монете
│   │   │   └── Portfolio.jsx       # Таблица портфеля
│   │   │
│   │   └── History/                # История транзакций
│   │       ├── History.jsx
│   │       └── TransactionsList.jsx
│   │
│   ├── Settings/                   # Настройки приложения
│   │   └── Settings.jsx
│   │
│   └── UI/                          # Переиспользуемые UI компоненты
│       ├── CoinInfoModal.jsx       # Модальное окно информации о монете
│       ├── AssetsInfoModal.jsx     # Модальное окно активов
│       ├── AssetAddedResult.jsx    # Результат добавления актива
│       ├── addAssetsForm.jsx       # Компонент формы
│       └── FullscreenLoader.jsx    # Загрузчик на полный экран
│
├── context/
│   ├── crypto-context.js           # Определение контекста
│   └── cryprto-context.jsx         # Провайдер контекста (основной)
│
└── features/
    └── crypto/                     # Фича криптовалют
        ├── crypto.service.js       # Сервис работы с данными
        ├── AddAssetsForm.jsx
        └── CoinInfoModal.jsx
```

## 🔌 API

### Файл: `src/api.js`

#### `fetchCrypto()`

Получает список всех доступных криптовалют.

```javascript
import { fetchCrypto } from './api';

const data = await fetchCrypto();
console.log(data.result); // Array of crypto objects
```

**Возвращает:**

```javascript
{
  result: [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 44870.39,
      icon: 'https://...',
      // ... другие поля
    },
    // ... больше криптовалют
  ];
}
```

#### `fetchAssets()`

Получает список активов пользователя.

```javascript
const assets = await fetchAssets();
```

**Возвращает:**

```javascript
[
  {
    id: 'bitcoin',
    amount: 0.5,
    price: 40000,
  },
  // ... больше активов
];
```

#### `fetchCryptoById(id)`

Получает информацию о конкретной криптовалюте.

```javascript
const bitcoin = await fetchCryptoById('bitcoin');
```

### Контекст: `src/context/cryprto-context.jsx`

#### Значения контекста:

```javascript
{
  // Состояние
  loading: boolean,        // Идёт ли загрузка данных
  crypto: array,          // Массив криптовалют
  assets: array,          // Массив активов
  error: string|null,     // Ошибка загрузки (если есть)

  // Методы
  addAsset(asset),        // Добавить новый актив
  removeAsset(assetId),   // Удалить актив
  updateAsset(id, updates), // Обновить актив
  refetchData()           // Перезагрузить данные
}
```

### Утилиты: `src/utils.js`

#### `formatCurrency(value, currency = 'USD')`

Форматирует число как валюту.

```javascript
formatCurrency(1234.567); // '$1,234.57'
```

#### `formatNumber(value, fractionDigits = 2)`

Форматирует число с разделителями.

```javascript
formatNumber(1000000); // '1,000,000.00'
```

#### `abbreviateNumber(value)`

Сокращает большие числа (K, M, B).

```javascript
abbreviateNumber(1500000); // '1.50M'
```

#### `percentDifference(a, b)`

Вычисляет процентную разницу.

```javascript
percentDifference(100, 150); // 40.0
```

#### `formatPercent(value)`

Форматирует процент со знаком.

```javascript
formatPercent(5.5); // '+5.50%'
```

#### `getPriceChangeColor(value)`

Возвращает цвет в зависимости от знака.

```javascript
getPriceChangeColor(10); // 'green'
getPriceChangeColor(-10); // 'red'
```

        ## 📦 Развертывание

### Подготовка к production

1. **Проверьте код линтером:**

```bash
npm run lint
```

2. **Создайте production build:**

```bash
npm run build
```

Это создаст папку `dist/` с оптимизированным кодом.

### Развертывание на Vercel

1. **Установите Vercel CLI:**

```bash
npm install -g vercel
```

2. **Разверните приложение:**

```bash
vercel
```

Следуйте инструкциям интерфейса.

### Развертывание на Netlify

1. **Через веб-интерфейс:**
   - Перейдите на https://netlify.com
   - Нажмите "New site from Git"
   - Выберите ваш репозиторий
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Через CLI:**

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Развертывание на GitHub Pages

1. **Обновите `vite.config.js`:**

```javascript
export default {
  base: '/CryptoApp/',
  // ... остальная конфигурация
};
```

2. **Создайте GitHub Actions workflow** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. **Включите GitHub Pages:**
   - Перейдите в Settings репозитория
   - Выберите "Pages"
   - Выберите ветку `gh-pages`

### Развертывание на Docker

1. **Создайте `Dockerfile`:**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Создайте `nginx.conf`:**

```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
  }
}
```

3. **Соберите и запустите:**

```bash
docker build -t crypto-app .
docker run -p 80:80 crypto-app
```

## 🐛 Проблемы и решения

### Проблема: Данные не загружаются

**Решение:**

1. Проверьте консоль браузера на ошибки
2. Убедитесь, что `api.js` доступен
3. Проверьте, что `data.js` содержит данные

### Проблема: Стили не применяются

**Решение:**

```bash
npm install
npm run dev
```

### Проблема: Ошибка "useCrypto must be used within CryptoProvider"

**Решение:** Убедитесь, что компонент обёрнут в `<CryptoContextProvider>`

### Проблема: Медленная загрузка

**Решение:**

- Используйте `npm run build` для production
- Включите кэширование в браузере
- Оптимизируйте изображения в `assets/`

## 🔧 Обслуживание

### Обновление зависимостей

```bash
npm update
npm audit fix
```

### Оптимизация производительности

```bash
# Анализируйте размер бандла
npm run build -- --visualize
```

### Форматирование кода (с Prettier - опционально)

```bash
npm install --save-dev prettier
npm run format
```

## 📚 Дополнительные ресурсы

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Ant Design](https://ant.design)
- [CoinStats API](https://coinstats.app)

## 👥 Вклад

Если вы хотите внести свой вклад:

1. Форкируйте репозиторий
2. Создайте ветку (`git checkout -b feature/AmazingFeature`)
3. Сделайте коммит (`git commit -m 'Add some AmazingFeature'`)
4. Отправьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## ✉️ Контакты

- **GitHub:** [@itsnobly](https://github.com/itsnobly)
- **Issues:** [GitHub Issues](https://github.com/itsnobly/CryptoApp/issues)

---

Спасибо за использование CryptoApp! 🎉

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# CryptoApp
