# CryptoApp - Crypto Portfolio Management

Modern web application for managing cryptocurrency portfolios with real-time price tracking, analytics, and asset management.

## Features

- **Portfolio Management** - Add, edit, and delete cryptocurrency assets
- **Analytics** - Track profit/loss and percentage changes
- **Real-time Prices** - Get current cryptocurrency prices
- **Intuitive Interface** - Modern design based on Ant Design
- **Responsive Design** - Works on all devices
- **Reliable Architecture** - React Context for state management
- **Fast Development** - Built with Vite for maximum performance

## Quick Start

### Requirements

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/itsnobly/CryptoApp.git
cd CryptoApp
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Usage

### Main Commands

```bash
# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### How to Use

1. **View Portfolio** - Open the app to see all your assets with current prices and profit/loss
2. **Add Assets** - Click "Add Assets" button, select cryptocurrency, enter amount and buy price
3. **View Crypto Info** - Select a coin from the dropdown in the header to see detailed information
4. **Track Statistics** - View total portfolio value, profit/loss, and percentage changes on the dashboard

## Project Structure

```
src/
├── api.js                    # API layer for fetching data
├── App.jsx                   # Main application component
├── data.js                   # Cryptocurrency data
├── main.jsx                  # Application entry point
├── utils.js                  # Utility functions for formatting
├── index.css                 # Global styles
├── components/
│   ├── Layout/               # Layout components
│   ├── pages/               # Page components (Dashboard, Assets, History)
│   └── UI/                  # Reusable UI components
├── context/                 # React Context providers
└── features/               # Feature-specific components
```

## Data Source

The application uses data from the CoinStats API (https://coinstats.app). Currently, it includes a local dataset of popular cryptocurrencies for demonstration purposes.

## Key Components

- **Dashboard** - Overview of portfolio with charts and statistics
- **Assets** - Detailed portfolio table with profit/loss tracking
- **History** - Transaction history with pagination
- **Add Assets Form** - Form to add new cryptocurrency assets

## Deployment

### Production Build

```bash
npm run build
```

This creates a `dist/` folder with optimized code.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

## Troubleshooting

**Data not loading:** Check browser console for errors, ensure `api.js` is accessible

**Styles not applying:** Run `npm install` and `npm run dev`

**Context error:** Ensure components are wrapped in `<CryptoContextProvider>`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub:** [@itsnobly](https://github.com/itsnobly)
- **Issues:** [GitHub Issues](https://github.com/itsnobly/CryptoApp/issues)
