import React from 'react';
import styled from 'styled-components';
import { Token } from '../../types/blockchain';
import Card from './Card';

interface TokenBalanceProps {
  token: Token;
  showUsdValue?: boolean;
  onTokenClick?: (token: Token) => void;
}

const TokenContainer = styled(Card)`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.fast} ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const TokenIcon = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  object-fit: contain;
  border: 1px solid ${({ theme }) => theme.colors.text.tertiary};
`;

const TokenPlaceholder = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.text.tertiary};
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TokenNameContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const TokenName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const TokenSymbol = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Balance = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const UsdValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const formatBalance = (balance: string | undefined, decimals: number): string => {
  if (!balance) return '0';
  
  // Convert from base units
  const value = parseFloat(balance) / 10 ** decimals;
  
  // Format with appropriate decimal places
  if (value < 0.001) {
    return '<0.001';
  } else if (value < 1) {
    return value.toFixed(4);
  } else if (value < 1000) {
    return value.toFixed(2);
  } else {
    return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
};

const formatUsdValue = (value: number | undefined): string => {
  if (!value) return '$0.00';
  
  if (value < 0.01) {
    return '<$0.01';
  } else if (value < 1000) {
    return `$${value.toFixed(2)}`;
  } else if (value < 1000000) {
    return `$${(value / 1000).toFixed(1)}K`;
  } else {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
};

const TokenBalance: React.FC<TokenBalanceProps> = ({ 
  token, 
  showUsdValue = true,
  onTokenClick
}) => {
  const handleClick = () => {
    if (onTokenClick) {
      onTokenClick(token);
    }
  };
  
  return (
    <TokenContainer variant="glass" onClick={handleClick}>
      {token.logoURI ? (
        <TokenIcon src={token.logoURI} alt={token.symbol} />
      ) : (
        <TokenPlaceholder>
          {token.symbol.substring(0, 1)}
        </TokenPlaceholder>
      )}
      
      <TokenInfo>
        <TokenNameContainer>
          <TokenName>{token.name}</TokenName>
          <TokenSymbol>{token.symbol}</TokenSymbol>
        </TokenNameContainer>
      </TokenInfo>
      
      <BalanceContainer>
        <Balance>{formatBalance(token.balance, token.decimals)}</Balance>
        {showUsdValue && token.dollarValue !== undefined && (
          <UsdValue>{formatUsdValue(token.dollarValue)}</UsdValue>
        )}
      </BalanceContainer>
    </TokenContainer>
  );
};

export default TokenBalance; 