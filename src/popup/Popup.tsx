import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dashboard from '../components/dashboard/Dashboard';
import { AuthService } from '../services/auth.service';
import { AuthState } from '../types/auth';

const PopupContainer = styled.div`
  width: 360px;
  min-height: 600px;
  overflow: hidden;
  position: relative;
`;

const BackgroundGradient = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: radial-gradient(
    circle at top right,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 30%,
    rgba(0, 0, 0, 0) 70%
  );
  z-index: -1;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 600px;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Logo = styled.div`
  font-size: 48px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  text-shadow: ${({ theme }) => theme.shadows.text};
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 2px;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  transition: all ${({ theme }) => theme.animations.fast} ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.fast} ease;
  margin-top: ${({ theme }) => theme.spacing.md};
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
  
  &:active {
    transform: translateY(1px);
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

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: left;
  width: 100%;
`;

const TextLink = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.fast} ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    text-shadow: ${({ theme }) => theme.shadows.text};
  }
`;

const Popup: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    walletAddress: null,
    encryptedSeedPhrase: null,
    loginMethod: null,
  });
  
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isCreatingWallet, setIsCreatingWallet] = useState<boolean>(false);
  
  // For demo purposes, use a mock address
  const demoAddress = '0x1234567890abcdef1234567890abcdef12345678';
  
  // Check if a wallet exists on component mount
  useEffect(() => {
    const checkWallet = async () => {
      try {
        const settings = await AuthService.getAuthSettings();
        
        if (settings && settings.encryptedSeedPhrase) {
          // Wallet exists, show login screen
          setShowLogin(true);
          setAuthState({
            ...authState,
            encryptedSeedPhrase: settings.encryptedSeedPhrase
          });
        } else {
          // No wallet exists, show create wallet screen
          setShowLogin(false);
        }
      } catch (error) {
        console.error('Error checking wallet:', error);
        setShowLogin(false);
      }
    };
    
    checkWallet();
  }, []);
  
  const handleLogin = async () => {
    setError('');
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    try {
      // In a real app, this would decrypt the wallet
      // For demo purposes, just simulate login
      
      // await AuthService.authenticate(password);
      
      // Set authenticated state with mock address
      setAuthState({
        isAuthenticated: true,
        walletAddress: demoAddress,
        encryptedSeedPhrase: 'encrypted_data',
        loginMethod: 'password',
      });
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Invalid password');
    }
  };
  
  const handleCreateWallet = async () => {
    setError('');
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    try {
      setIsCreatingWallet(true);
      
      // In a real app, this would create a new wallet
      // await AuthService.createWallet(password);
      
      // Set authenticated state with mock address
      setAuthState({
        isAuthenticated: true,
        walletAddress: demoAddress,
        encryptedSeedPhrase: 'encrypted_data',
        loginMethod: 'password',
      });
    } catch (error) {
      console.error('Error creating wallet:', error);
      setError('Failed to create wallet');
    } finally {
      setIsCreatingWallet(false);
    }
  };
  
  const renderLoginForm = () => (
    <LoginContainer>
      <Logo>KNOT</Logo>
      <h2>Welcome Back</h2>
      <p>Enter your password to unlock your wallet</p>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <Button onClick={handleLogin}>Unlock</Button>
      
      <p>
        Don't have a wallet?{' '}
        <TextLink onClick={() => setShowLogin(false)}>Create one</TextLink>
      </p>
    </LoginContainer>
  );
  
  const renderCreateWalletForm = () => (
    <LoginContainer>
      <Logo>KNOT</Logo>
      <h2>Create New Wallet</h2>
      <p>Secure your wallet with a strong password</p>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      
      <Button onClick={handleCreateWallet} disabled={isCreatingWallet}>
        {isCreatingWallet ? 'Creating...' : 'Create Wallet'}
      </Button>
      
      <p>
        Already have a wallet?{' '}
        <TextLink onClick={() => setShowLogin(true)}>Log in</TextLink>
      </p>
    </LoginContainer>
  );
  
  return (
    <PopupContainer>
      <BackgroundGradient />
      {authState.isAuthenticated ? (
        <Dashboard currentAddress={authState.walletAddress || demoAddress} />
      ) : (
        <>
          {showLogin ? renderLoginForm() : renderCreateWalletForm()}
        </>
      )}
    </PopupContainer>
  );
};

export default Popup; 