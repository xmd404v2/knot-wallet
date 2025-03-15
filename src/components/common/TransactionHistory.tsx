import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Transaction, TokenTransfer } from '../../types/blockchain';
import Card from './Card';

interface TransactionHistoryProps {
  transactions: Transaction[];
  maxItems?: number;
  onTransactionClick?: (tx: Transaction) => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HistoryContainer = styled(Card)`
  width: 100%;
  overflow: hidden;
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.tertiary};
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TxList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const TxItem = styled.div<{ status: Transaction['status'] }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.animations.fast} ease;
  animation: ${fadeIn} 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }
  
  ${({ status, theme }) => {
    switch (status) {
      case 'confirmed':
        return css`
          border-left: 3px solid ${theme.colors.status.success};
        `;
      case 'failed':
        return css`
          border-left: 3px solid ${theme.colors.status.error};
        `;
      default: // pending
        return css`
          border-left: 3px solid ${theme.colors.status.warning};
        `;
    }
  }}
`;

const TxIcon = styled.div<{ status: Transaction['status']; isIncoming: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  
  ${({ isIncoming, theme }) => isIncoming 
    ? css`color: ${theme.colors.status.success};` 
    : css`color: ${theme.colors.text.primary};`
  }
  
  ${({ status, theme }) => {
    switch (status) {
      case 'confirmed':
        return css`
          border: 1px solid ${theme.colors.status.success};
        `;
      case 'failed':
        return css`
          border: 1px solid ${theme.colors.status.error};
        `;
      default: // pending
        return css`
          border: 1px solid ${theme.colors.status.warning};
          animation: pulse 2s infinite;
          
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 214, 0, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(255, 214, 0, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 214, 0, 0);
            }
          }
        `;
    }
  }}
  
  &::before {
    content: "${({ isIncoming }) => isIncoming ? '↓' : '↑'}";
    font-size: 18px;
    font-weight: bold;
  }
`;

const TxDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TxTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const TxAddress = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

const TxTime = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const TxValue = styled.div<{ isIncoming: boolean }>`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ isIncoming, theme }) => 
    isIncoming ? theme.colors.status.success : theme.colors.text.primary};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const TxTokenName = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

const TxBottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TxStatus = styled.div<{ status: Transaction['status'] }>`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  
  ${({ status, theme }) => {
    switch (status) {
      case 'confirmed':
        return css`
          background-color: rgba(11, 255, 126, 0.1);
          color: ${theme.colors.status.success};
        `;
      case 'failed':
        return css`
          background-color: rgba(255, 0, 64, 0.1);
          color: ${theme.colors.status.error};
        `;
      default: // pending
        return css`
          background-color: rgba(255, 214, 0, 0.1);
          color: ${theme.colors.status.warning};
        `;
    }
  }}
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  text-align: center;
`;

const formatTxValue = (value: string, decimals: number = 18): string => {
  const numValue = parseFloat(value) / 10 ** decimals;
  if (numValue < 0.001) {
    return '<0.001';
  }
  return numValue.toFixed(numValue < 1 ? 4 : 2);
};

const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const formatTime = (timestamp: number): string => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp * 1000) / 1000);
  
  if (seconds < 60) {
    return 'Just now';
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days}d ago`;
  }
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  maxItems = 5,
  onTransactionClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const displayTransactions = expanded ? transactions : transactions.slice(0, maxItems);
  
  const handleTxClick = (tx: Transaction) => {
    if (onTransactionClick) {
      onTransactionClick(tx);
    }
  };
  
  return (
    <HistoryContainer variant="glass">
      <HistoryHeader>
        <Title>Recent Transactions</Title>
        {transactions.length > maxItems && (
          <div
            onClick={() => setExpanded(!expanded)}
            style={{ cursor: 'pointer', color: '#00FFFF' }}
          >
            {expanded ? 'Show Less' : 'Show All'}
          </div>
        )}
      </HistoryHeader>
      
      <TxList>
        {displayTransactions.length === 0 ? (
          <EmptyState>
            <div>No transactions yet</div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>
              Your transaction history will appear here
            </div>
          </EmptyState>
        ) : (
          displayTransactions.map((tx) => {
            const isIncoming = true; // This would normally be determined by comparing tx.to with current wallet address
            
            return (
              <TxItem 
                key={tx.hash} 
                status={tx.status}
                onClick={() => handleTxClick(tx)}
              >
                <TxIcon status={tx.status} isIncoming={isIncoming} />
                
                <TxDetails>
                  <TxTopRow>
                    <TxAddress>{formatAddress(isIncoming ? tx.from : tx.to)}</TxAddress>
                    <TxTime>{formatTime(tx.timestamp)}</TxTime>
                  </TxTopRow>
                  
                  <TxBottomRow>
                    <div>
                      <TxValue isIncoming={isIncoming}>
                        {isIncoming ? '+' : '-'}{formatTxValue(tx.value)}
                        <TxTokenName> ETH</TxTokenName>
                      </TxValue>
                    </div>
                    <TxStatus status={tx.status}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </TxStatus>
                  </TxBottomRow>
                </TxDetails>
              </TxItem>
            );
          })
        )}
      </TxList>
    </HistoryContainer>
  );
};

export default TransactionHistory; 