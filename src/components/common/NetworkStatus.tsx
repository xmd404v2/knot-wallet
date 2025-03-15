import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { NetworkStatus as NetworkStatusType } from '../../types/blockchain';

interface NetworkStatusProps {
  network: NetworkStatusType;
  compact?: boolean;
  showDetails?: boolean;
}

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 255, 0);
  }
`;

const StatusIndicator = styled.div<{ isConnected: boolean; latency: number }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  animation: ${pulse} 2s infinite;
  
  ${({ isConnected, latency, theme }) => {
    if (!isConnected) {
      return css`
        background-color: ${theme.colors.status.error};
        box-shadow: 0 0 8px ${theme.colors.status.error};
      `;
    }
    
    if (latency > 300) {
      return css`
        background-color: ${theme.colors.status.warning};
        box-shadow: 0 0 8px ${theme.colors.status.warning};
      `;
    }
    
    return css`
      background-color: ${theme.colors.status.success};
      box-shadow: 0 0 8px ${theme.colors.status.success};
    `;
  }}
`;

const StatusContainer = styled.div<{ compact: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ compact, theme }) => (compact ? theme.spacing.xs : theme.spacing.sm)};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ compact, theme }) => (compact ? theme.typography.fontSizes.xs : theme.typography.fontSizes.sm)};
  max-width: ${({ compact }) => (compact ? '120px' : '100%')};
`;

const NetworkName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-right: ${({ theme }) => theme.spacing.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-left: 20px;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;

const DetailLabel = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const DetailValue = styled.span`
  font-family: 'Roboto Mono', monospace;
`;

const NetworkStatus: React.FC<NetworkStatusProps> = ({ 
  network, 
  compact = false,
  showDetails = false
}) => {
  const getNetworkName = (chainId: string): string => {
    const networks: Record<string, string> = {
      '1': 'Ethereum',
      '137': 'Polygon',
      'solana': 'Solana',
      '56': 'Binance Chain',
      '43114': 'Avalanche',
      '42161': 'Arbitrum',
      '10': 'Optimism',
      'cosmos': 'Cosmos',
      'bitcoin': 'Bitcoin',
      'tron': 'Tron',
    };
    
    return networks[chainId] || chainId;
  };
  
  return (
    <div>
      <StatusContainer compact={compact}>
        <StatusIndicator isConnected={network.isConnected} latency={network.latency} />
        <NetworkName>{getNetworkName(network.chainId)}</NetworkName>
        {!compact && network.isConnected && (
          <span>{network.latency}ms</span>
        )}
      </StatusContainer>
      
      {showDetails && network.isConnected && (
        <DetailContainer>
          <DetailRow>
            <DetailLabel>Block:</DetailLabel>
            <DetailValue>{network.lastBlock}</DetailValue>
          </DetailRow>
          {network.gasPrice && (
            <DetailRow>
              <DetailLabel>Gas:</DetailLabel>
              <DetailValue>{network.gasPrice} gwei</DetailValue>
            </DetailRow>
          )}
        </DetailContainer>
      )}
    </div>
  );
};

export default NetworkStatus; 