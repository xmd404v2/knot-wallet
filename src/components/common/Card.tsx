import React from 'react';
import styled, { css } from 'styled-components';

export type CardVariant = 'default' | 'outlined' | 'glass' | 'glow';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  fullWidth?: boolean;
  noBorder?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const StyledCard = styled.div<CardProps>`
  border-radius: ${({ theme }) => theme.borderRadius.large};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  transition: all ${({ theme }) => theme.animations.default} ease;
  position: relative;
  overflow: hidden;
  
  ${({ padding, theme }) => {
    switch (padding) {
      case 'none':
        return css`
          padding: 0;
        `;
      case 'small':
        return css`
          padding: ${theme.spacing.sm};
        `;
      case 'large':
        return css`
          padding: ${theme.spacing.lg};
        `;
      default: // medium
        return css`
          padding: ${theme.spacing.md};
        `;
    }
  }}
  
  ${({ variant, theme, noBorder }) => {
    switch (variant) {
      case 'outlined':
        return css`
          background-color: transparent;
          border: ${noBorder ? 'none' : `1px solid ${theme.colors.text.tertiary}`};
          
          &:hover {
            border-color: ${noBorder ? 'transparent' : theme.colors.primary};
          }
        `;
      case 'glass':
        return css`
          background-color: ${theme.colors.background.card};
          backdrop-filter: blur(10px);
          border: ${noBorder ? 'none' : `1px solid rgba(255, 255, 255, 0.1)`};
          box-shadow: ${theme.shadows.small};
          
          &:hover {
            box-shadow: ${theme.shadows.medium};
            border-color: ${noBorder ? 'transparent' : `rgba(0, 255, 255, 0.3)`};
          }
          
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(0, 255, 255, 0.2),
              transparent
            );
          }
        `;
      case 'glow':
        return css`
          background-color: ${theme.colors.background.tertiary};
          border: ${noBorder ? 'none' : `1px solid ${theme.colors.primary}`};
          box-shadow: ${theme.shadows.glow};
          
          &:hover {
            box-shadow: ${theme.shadows.large};
            transform: translateY(-2px);
          }
        `;
      default: // default
        return css`
          background-color: ${theme.colors.background.secondary};
          border: ${noBorder ? 'none' : `1px solid ${theme.colors.background.tertiary}`};
          
          &:hover {
            box-shadow: ${theme.shadows.small};
          }
        `;
    }
  }}
  
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
      
      &:active {
        transform: translateY(1px);
      }
    `}
`;

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'medium',
  fullWidth = false,
  noBorder = false,
  className,
  onClick,
  children,
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      fullWidth={fullWidth}
      noBorder={noBorder}
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledCard>
  );
};

export default Card; 