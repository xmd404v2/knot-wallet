import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    // Primary colors
    primary: '#FFFFFF', // White
    secondary: '#AAAAAA', // Light gray
    accent: '#DDDDDD', // Very light gray
    
    // Background colors
    background: {
      primary: '#000000', // Black
      secondary: '#111111', // Very dark gray
      tertiary: '#222222', // Dark gray
      card: 'rgba(17, 17, 17, 0.7)', // Glassmorphism dark
    },
    
    // Text colors
    text: {
      primary: '#FFFFFF', // White
      secondary: '#AAAAAA', // Light gray
      tertiary: '#666666', // Medium gray
      accent: '#FFFFFF', // White
    },
    
    // Status colors
    status: {
      success: '#FFFFFF', // White
      warning: '#AAAAAA', // Light gray
      error: '#FFFFFF', // White
      info: '#DDDDDD', // Very light gray
    },
    
    // Chain-specific colors (all monochrome)
    chains: {
      ethereum: '#FFFFFF',
      solana: '#EEEEEE',
      binance: '#DDDDDD',
      polygon: '#CCCCCC',
      avalanche: '#BBBBBB',
      arbitrum: '#AAAAAA',
      optimism: '#999999',
      cosmos: '#888888',
      bitcoin: '#777777',
      tron: '#666666',
    },
  },
  
  // Border Radius
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    xl: '24px',
    circle: '50%',
  },
  
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  // Typography
  typography: {
    fontFamily: "'Rajdhani', 'Roboto Mono', monospace",
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      xxl: '32px',
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  
  // Shadows
  shadows: {
    small: '0 2px 8px rgba(255, 255, 255, 0.15)',
    medium: '0 4px 16px rgba(255, 255, 255, 0.2)',
    large: '0 8px 24px rgba(255, 255, 255, 0.25)',
    glow: '0 0 10px rgba(255, 255, 255, 0.7)',
    text: '0 0 8px rgba(255, 255, 255, 0.5)',
  },
  
  // Animations
  animations: {
    fast: '0.2s',
    default: '0.3s',
    slow: '0.5s',
  },
  
  // Z-index
  zIndex: {
    base: 1,
    dropdown: 10,
    modal: 100,
    tooltip: 50,
  },
};

export default theme; 