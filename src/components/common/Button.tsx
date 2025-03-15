import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.animations.fast} ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return css`
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.fontSizes.xs};
        `;
      case 'large':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSizes.lg};
        `;
      default: // medium
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSizes.md};
        `;
    }
  }}
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.text.primary};
          border: none;
          
          &:hover {
            background-color: ${theme.colors.accent};
            box-shadow: ${theme.shadows.glow};
          }
          
          &:active {
            transform: translateY(1px);
          }
          
          &:disabled {
            background-color: ${theme.colors.text.tertiary};
            color: ${theme.colors.text.secondary};
            cursor: not-allowed;
            box-shadow: none;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          
          &:hover {
            background-color: rgba(0, 255, 255, 0.1);
            box-shadow: ${theme.shadows.glow};
          }
          
          &:active {
            transform: translateY(1px);
          }
          
          &:disabled {
            border-color: ${theme.colors.text.tertiary};
            color: ${theme.colors.text.tertiary};
            cursor: not-allowed;
            box-shadow: none;
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: none;
          padding-left: 0;
          padding-right: 0;
          
          &:hover {
            color: ${theme.colors.accent};
            text-shadow: ${theme.shadows.text};
          }
          
          &:active {
            transform: translateY(1px);
          }
          
          &:disabled {
            color: ${theme.colors.text.tertiary};
            cursor: not-allowed;
            text-shadow: none;
          }
        `;
      default: // primary
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.background.primary};
          border: none;
          
          &:hover {
            background-color: ${theme.colors.accent};
            box-shadow: ${theme.shadows.glow};
          }
          
          &:active {
            transform: translateY(1px);
          }
          
          &:disabled {
            background-color: ${theme.colors.text.tertiary};
            color: ${theme.colors.text.secondary};
            cursor: not-allowed;
            box-shadow: none;
          }
          
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: left 0.7s ease;
          }
          
          &:hover::before {
            left: 100%;
          }
        `;
    }
  }}
  
  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.8;
      pointer-events: none;
      
      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid transparent;
        border-top-color: currentColor;
        animation: spin 0.8s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? null : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </StyledButton>
  );
};

export default Button; 