import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        card: string;
      };
      
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        accent: string;
      };
      
      status: {
        success: string;
        warning: string;
        error: string;
        info: string;
      };
      
      chains: {
        ethereum: string;
        solana: string;
        binance: string;
        polygon: string;
        avalanche: string;
        arbitrum: string;
        optimism: string;
        cosmos: string;
        bitcoin: string;
        tron: string;
      };
    };
    
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      xl: string;
      circle: string;
    };
    
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    
    typography: {
      fontFamily: string;
      fontSizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      fontWeights: {
        light: number;
        regular: number;
        medium: number;
        bold: number;
      };
    };
    
    shadows: {
      small: string;
      medium: string;
      large: string;
      glow: string;
      text: string;
    };
    
    animations: {
      fast: string;
      default: string;
      slow: string;
    };
    
    zIndex: {
      base: number;
      dropdown: number;
      modal: number;
      tooltip: number;
    };
  }
} 