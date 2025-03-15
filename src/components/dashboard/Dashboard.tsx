import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import TokenBalance from '../common/TokenBalance';
import NetworkStatus from '../common/NetworkStatus';
import TransactionHistory from '../common/TransactionHistory';
import { BlockchainService } from '../../services/blockchain.service';
import { 
  SUPPORTED_CHAINS, 
  Token, 
  Transaction, 
  NetworkStatus as NetworkStatusType,
  PortfolioSummary
} from '../../types/blockchain';

interface DashboardProps {
  currentAddress: string;
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 100%;
  overflow-x: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  text-shadow: ${({ theme }) => theme.shadows.text};
`;

const NetworksContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const BalanceCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const TotalValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: 1px;
`;

const ValueLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.colors.background.tertiary} 50%,
    transparent 100%
  );
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const SectionTitle = styled.h2`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
`;

// Mock data for demonstration
const mockTokens: Token[] = [
  {
    address: '0x0',
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    chainId: '1',
    balance: '1500000000000000000', // 1.5 ETH
    dollarValue: 3000,
    logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024'
  },
  {
    address: '0x1',
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    chainId: '1',
    balance: '2500000000', // 2500 USDC
    dollarValue: 2500,
    logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=024'
  },
  {
    address: '0x0',
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    chainId: '137',
    balance: '2000000000000000000', // 2 MATIC
    dollarValue: 1.5,
    logoURI: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=024'
  }
];

const mockTransactions: Transaction[] = [
  {
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0xabcdef1234567890abcdef1234567890abcdef12',
    value: '1000000000000000000', // 1 ETH
    gasPrice: '20000000000', // 20 gwei
    gasLimit: '21000',
    chainId: '1',
    nonce: 42,
    data: '0x',
    status: 'confirmed',
    timestamp: Date.now() / 1000 - 3600, // 1 hour ago
    blockNumber: 16123456,
  },
  {
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    from: '0xabcdef1234567890abcdef1234567890abcdef12',
    to: '0x1234567890abcdef1234567890abcdef12345678',
    value: '500000000000000000', // 0.5 ETH
    gasPrice: '25000000000', // 25 gwei
    gasLimit: '21000',
    chainId: '1',
    nonce: 123,
    data: '0x',
    status: 'confirmed',
    timestamp: Date.now() / 1000 - 86400, // 1 day ago
    blockNumber: 16123400,
  },
  {
    hash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0x7890abcdef1234567890abcdef1234567890abcd',
    value: '100000000', // 0.1 MATIC
    gasPrice: '30000000000', // 30 gwei
    gasLimit: '21000',
    chainId: '137',
    nonce: 7,
    data: '0x',
    status: 'pending',
    timestamp: Date.now() / 1000 - 300, // 5 minutes ago
    blockNumber: 45678901,
  }
];

const Dashboard: React.FC<DashboardProps> = ({ currentAddress }) => {
  const [portfolio, setPortfolio] = useState<PortfolioSummary>({
    totalValue: 0,
    assets: [],
    recentTransactions: []
  });
  const [networkStatuses, setNetworkStatuses] = useState<Record<string, NetworkStatusType>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, we would call these services with the actual currentAddress
        // For demo purposes, we're using mock data
        
        // Load network statuses
        // const statuses = await BlockchainService.getAllNetworkStatuses();
        // setNetworkStatuses(statuses);
        
        // Simulate network statuses
        const mockStatuses: Record<string, NetworkStatusType> = {};
        SUPPORTED_CHAINS.forEach(chain => {
          mockStatuses[chain.id] = {
            chainId: chain.id,
            isConnected: Math.random() > 0.2, // 80% chance of being connected
            latency: Math.floor(Math.random() * 500), // 0-500ms latency
            lastBlock: Math.floor(12000000 + Math.random() * 1000000),
            gasPrice: chain.id === '1' ? '25' : undefined // Only ETH has gas price for demo
          };
        });
        setNetworkStatuses(mockStatuses);
        
        // Load portfolio data
        // For demo, we'll use our mock data
        setPortfolio({
          totalValue: mockTokens.reduce((sum, token) => sum + (token.dollarValue || 0), 0),
          assets: [
            {
              chainId: '1',
              value: mockTokens
                .filter(t => t.chainId === '1')
                .reduce((sum, token) => sum + (token.dollarValue || 0), 0),
              tokens: mockTokens.filter(t => t.chainId === '1')
            },
            {
              chainId: '137',
              value: mockTokens
                .filter(t => t.chainId === '137')
                .reduce((sum, token) => sum + (token.dollarValue || 0), 0),
              tokens: mockTokens.filter(t => t.chainId === '137')
            }
          ],
          recentTransactions: mockTransactions
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [currentAddress]);
  
  // Handler for token click
  const handleTokenClick = (token: Token) => {
    console.log('Token clicked:', token);
    // This would typically navigate to a token detail page
  };
  
  // Handler for transaction click
  const handleTransactionClick = (tx: Transaction) => {
    console.log('Transaction clicked:', tx);
    // This would typically open a transaction details modal or page
  };
  
  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard</Title>
        <NetworksContainer>
          {Object.values(networkStatuses).slice(0, 3).map(network => (
            <NetworkStatus 
              key={network.chainId} 
              network={network} 
              compact 
            />
          ))}
        </NetworksContainer>
      </Header>
      
      <BalanceCard variant="glass">
        <TotalValue>${portfolio.totalValue.toLocaleString()}</TotalValue>
        <ValueLabel>Total Portfolio Value</ValueLabel>
        
        <Divider />
        
        <SectionTitle>Assets</SectionTitle>
        {portfolio.assets.flatMap(asset => 
          asset.tokens.map(token => (
            <TokenBalance 
              key={`${token.chainId}-${token.address}`}
              token={token}
              onTokenClick={handleTokenClick}
            />
          ))
        )}
      </BalanceCard>
      
      <SectionTitle>Recent Activity</SectionTitle>
      <TransactionHistory 
        transactions={portfolio.recentTransactions}
        onTransactionClick={handleTransactionClick}
      />
    </DashboardContainer>
  );
};

export default Dashboard;