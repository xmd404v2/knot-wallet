# Knot - Multichain Web3 Wallet + Chrome Extension

A sleek, cyberpunk-themed multichain wallet Chrome extension that supports 10+ blockchain networks.

## Features

- **Multi-Chain Support**: Ethereum, Solana, Binance Chain, Polygon, Avalanche, Arbitrum, Optimism, Cosmos, Bitcoin (via WBTC), and Tron
- **Unified Dashboard**: View portfolio value and recent transactions across all chains
- **Network Status Indicators**: Real-time connection status for all supported networks
- **Secure Authentication**: Self-custody with AES-256 encryption
- **Dark Mode UI**: Sleek cyberpunk design with glassmorphism cards and neon accents

## Technology Stack

- TypeScript
- React.js
- Styled Components
- Ethers.js & Web3.js
- Chrome Extension API

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/knot-wallet.git
cd knot-wallet
```

2. Install dependencies
```bash
npm install
# or 
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder from the project directory

### Build for Production

```bash
npm run build
# or
yarn build
```

## Security

Knot Wallet uses several security measures to protect your assets:

- AES-256 encryption for storing seed phrases
- Self-custody (your keys, your crypto)
- Optional biometric authentication
- Optional 2FA 

## License

MIT

## Acknowledgements

- Inspired by MetaMask's extension architecture
- Uses Opera's wallet selector pattern
- Implements Antier's multi-chain swap functionality 
