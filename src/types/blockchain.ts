export interface Chain {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  rpcUrl: string;
  explorerUrl: string;
  logo: string;
  isTestnet: boolean;
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chainId: string;
  logoURI?: string;
  balance?: string;
  dollarValue?: number;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasPrice?: string;
  gasLimit?: string;
  chainId: string;
  nonce?: number;
  data?: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  blockNumber?: number;
  tokenTransfers?: TokenTransfer[];
}

export interface TokenTransfer {
  tokenAddress: string;
  tokenSymbol: string;
  from: string;
  to: string;
  value: string;
  decimals: number;
}

export interface DApp {
  id: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  category: string;
  supportedChains: string[];
  featured: boolean;
}

export interface NetworkStatus {
  chainId: string;
  isConnected: boolean;
  latency: number; // in ms
  lastBlock: number;
  gasPrice?: string;
}

export interface PortfolioSummary {
  totalValue: number; // in USD
  assets: {
    chainId: string;
    value: number; // in USD
    tokens: Token[];
  }[];
  recentTransactions: Transaction[];
}

export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
    explorerUrl: 'https://etherscan.io',
    logo: 'ethereum.svg',
    isTestnet: false
  },
  {
    id: '137',
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
    explorerUrl: 'https://polygonscan.com',
    logo: 'polygon.svg',
    isTestnet: false
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    explorerUrl: 'https://solscan.io',
    logo: 'solana.svg',
    isTestnet: false
  },
  {
    id: '56',
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    decimals: 18,
    rpcUrl: 'https://bsc-dataseed.binance.org',
    explorerUrl: 'https://bscscan.com',
    logo: 'binance.svg',
    isTestnet: false
  },
  {
    id: '43114',
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io',
    logo: 'avalanche.svg',
    isTestnet: false
  },
  {
    id: '42161',
    name: 'Arbitrum',
    symbol: 'ETH',
    decimals: 18,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorerUrl: 'https://arbiscan.io',
    logo: 'arbitrum.svg',
    isTestnet: false
  },
  {
    id: '10',
    name: 'Optimism',
    symbol: 'ETH',
    decimals: 18,
    rpcUrl: 'https://mainnet.optimism.io',
    explorerUrl: 'https://optimistic.etherscan.io',
    logo: 'optimism.svg',
    isTestnet: false
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    symbol: 'ATOM',
    decimals: 6,
    rpcUrl: 'https://rpc.cosmos.network',
    explorerUrl: 'https://mintscan.io/cosmos',
    logo: 'cosmos.svg',
    isTestnet: false
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    decimals: 8,
    rpcUrl: 'https://btc.getblock.io/mainnet/',
    explorerUrl: 'https://www.blockchain.com/explorer',
    logo: 'bitcoin.svg',
    isTestnet: false
  },
  {
    id: 'tron',
    name: 'Tron',
    symbol: 'TRX',
    decimals: 6,
    rpcUrl: 'https://api.trongrid.io',
    explorerUrl: 'https://tronscan.org',
    logo: 'tron.svg',
    isTestnet: false
  }
]; 