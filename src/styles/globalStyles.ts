import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Roboto+Mono:wght@300;400;500;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.background.primary};
    color: ${theme.colors.text.primary};
    font-size: ${theme.typography.fontSizes.md};
    line-height: 1.5;
    min-width: 360px;
    min-height: 600px;
    overflow-x: hidden;
  }

  body {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        ${theme.colors.text.primary} 50%, 
        transparent 100%);
      z-index: ${theme.zIndex.base};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Rajdhani', sans-serif;
    font-weight: ${theme.typography.fontWeights.bold};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text.primary};
    text-shadow: ${theme.shadows.text};
  }

  h1 {
    font-size: ${theme.typography.fontSizes.xxl};
  }

  h2 {
    font-size: ${theme.typography.fontSizes.xl};
  }

  h3 {
    font-size: ${theme.typography.fontSizes.lg};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.animations.fast} ease;
    
    &:hover {
      color: ${theme.colors.secondary};
      text-shadow: ${theme.shadows.text};
    }
  }

  button {
    font-family: ${theme.typography.fontFamily};
    cursor: pointer;
  }

  input, textarea, select {
    font-family: 'Roboto Mono', monospace;
    background-color: ${theme.colors.background.tertiary};
    border: 1px solid ${theme.colors.text.tertiary};
    color: ${theme.colors.text.primary};
    border-radius: ${theme.borderRadius.small};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: ${theme.shadows.small};
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.text.tertiary};
    border-radius: ${theme.borderRadius.small};
    
    &:hover {
      background: ${theme.colors.primary};
    }
  }

  /* Loading animations */
  @keyframes glow {
    0% {
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    }
    100% {
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
  }

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

export default GlobalStyles; 