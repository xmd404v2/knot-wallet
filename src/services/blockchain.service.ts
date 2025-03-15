import {
  Chain,
  NetworkStatus,
  PortfolioSummary,
  Token,
  Transaction,
  SUPPORTED_CHAINS
} from '../types/blockchain';

// Mock implementation of BlockchainService for testing purposes
export class BlockchainService {
  private static networkStatus: Record<string, NetworkStatus> = {};

  /**
   * Initialize blockchain providers
   */
  public static async initProviders(apiKey: string = ''): Promise<void> {
    console.log('Initializing providers with API key:', apiKey || 'none');
    
    // Initialize network statuses for all chains
    SUPPORTED_CHAINS.forEach(chain => {
      this.networkStatus[chain.id] = {
        chainId: chain.id,
        isConnected: true,
        latency: Math.floor(Math.random() * 200) + 50, // Random latency between 50-250ms
        lastBlock: 10000000 + Math.floor(Math.random() * 1000000),
        gasPrice: chain.id === '1' ? '20' : undefined
      };
    });
    
    return Promise.resolve();
  }

  /**
   * Get provider for a specific chain
   */
  public static async getProvider(chainId: string, apiKey: string = ''): Promise<any> {
    console.log(`Getting provider for chain ${chainId}`);
    // In testing mode, just return a mock provider
    return Promise.resolve({
      getBalance: () => Promise.resolve('1000000000000000000'),
      getBlockNumber: () => Promise.resolve(10000000),
      getGasPrice: () => Promise.resolve('20000000000')
    });
  }

  /**
   * Get native token balance for an address
   */
  public static async getBalance(chainId: string, address: string): Promise<string> {
    console.log(`Getting balance for ${address} on chain ${chainId}`);
    
    // Return mock balance
    const mockBalances: Record<string, string> = {
      '1': '1500000000000000000', // 1.5 ETH
      '137': '2000000000000000000', // 2 MATIC
      'solana': '5000000000', // 5 SOL
      '56': '3000000000000000000', // 3 BNB
      '43114': '10000000000000000000', // 10 AVAX
      '42161': '1200000000000000000', // 1.2 ETH (Arbitrum)
      '10': '1800000000000000000', // 1.8 ETH (Optimism)
      'cosmos': '12000000', // 12 ATOM
      'bitcoin': '5000000', // 0.05 BTC
      'tron': '5000000000', // 5000 TRX
    };
    
    return Promise.resolve(mockBalances[chainId] || '0');
  }

  /**
   * Get token balances for an address
   */
  public static async getTokenBalances(chainId: string, address: string, apiKey: string = ''): Promise<Token[]> {
    console.log(`Getting token balances for ${address} on chain ${chainId}`);
    
    // Return mock tokens based on chainId
    const mockTokens: Record<string, Token[]> = {
      '1': [
        {
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          name: 'USD Coin',
          symbol: 'USDC',
          decimals: 6,
          chainId: '1',
          balance: '2500000000', // 2500 USDC
          dollarValue: 2500,
          logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg'
        },
        {
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          name: 'Tether',
          symbol: 'USDT',
          decimals: 6,
          chainId: '1',
          balance: '1800000000', // 1800 USDT
          dollarValue: 1800,
          logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.svg'
        }
      ],
      '137': [
        {
          address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
          name: 'USD Coin',
          symbol: 'USDC',
          decimals: 6,
          chainId: '137',
          balance: '500000000', // 500 USDC
          dollarValue: 500,
          logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg'
        }
      ]
    };
    
    return Promise.resolve(mockTokens[chainId] || []);
  }

  /**
   * Get recent transactions
   */
  public static async getRecentTransactions(
    chainId: string, 
    address: string, 
    limit: number = 10
  ): Promise<Transaction[]> {
    console.log(`Getting transactions for ${address} on chain ${chainId}`);
    
    // Return mock transactions
    const now = Math.floor(Date.now() / 1000);
    const mockTransactions: Transaction[] = [
      {
        hash: `0x${Math.random().toString(16).substring(2, 42)}`,
        from: address,
        to: `0x${Math.random().toString(16).substring(2, 42)}`,
        value: '1000000000000000000', // 1 ETH
        gasPrice: '20000000000', // 20 gwei
        gasLimit: '21000',
        chainId,
        nonce: 42,
        data: '0x',
        status: 'confirmed',
        timestamp: now - 3600, // 1 hour ago
        blockNumber: 16123456,
      },
      {
        hash: `0x${Math.random().toString(16).substring(2, 42)}`,
        from: `0x${Math.random().toString(16).substring(2, 42)}`,
        to: address,
        value: '500000000000000000', // 0.5 ETH
        gasPrice: '25000000000', // 25 gwei
        gasLimit: '21000',
        chainId,
        nonce: 123,
        data: '0x',
        status: 'confirmed',
        timestamp: now - 86400, // 1 day ago
        blockNumber: 16123400,
      },
      {
        hash: `0x${Math.random().toString(16).substring(2, 42)}`,
        from: address,
        to: `0x${Math.random().toString(16).substring(2, 42)}`,
        value: '100000000', // 0.1 MATIC
        gasPrice: '30000000000', // 30 gwei
        gasLimit: '21000',
        chainId,
        nonce: 7,
        data: '0x',
        status: 'pending',
        timestamp: now - 300, // 5 minutes ago
        blockNumber: 45678901,
      }
    ];
    
    return Promise.resolve(mockTransactions.slice(0, limit));
  }

  /**
   * Send a transaction (Mock implementation)
   */
  public static async sendTransaction(
    chainId: string,
    transaction: Partial<Transaction>,
    privateKey: string
  ): Promise<string> {
    console.log(`Sending transaction on chain ${chainId}`);
    
    // In test mode, just return a mock transaction hash
    const txHash = `0x${Math.random().toString(16).substring(2, 66)}`;
    return Promise.resolve(txHash);
  }

  /**
   * Update the status of a specific network
   */
  public static async updateNetworkStatus(chainId: string): Promise<NetworkStatus> {
    console.log(`Updating network status for chain ${chainId}`);
    
    // Create mock status
    const status: NetworkStatus = {
      chainId,
      isConnected: Math.random() > 0.1, // 90% chance of being connected
      latency: Math.floor(Math.random() * 500), // 0-500ms latency
      lastBlock: 10000000 + Math.floor(Math.random() * 1000000),
      gasPrice: chainId === '1' ? '20' : undefined // Only ETH has gas price for demo
    };
    
    // Update stored status
    this.networkStatus[chainId] = status;
    
    return Promise.resolve(status);
  }

  /**
   * Get network statuses for all chains
   */
  public static async getAllNetworkStatuses(): Promise<Record<string, NetworkStatus>> {
    console.log('Getting all network statuses');
    
    // Update all network statuses
    await Promise.all(
      SUPPORTED_CHAINS.map(chain => this.updateNetworkStatus(chain.id))
    );
    
    return Promise.resolve(this.networkStatus);
  }
}