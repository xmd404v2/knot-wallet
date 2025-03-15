import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AuthService } from '../services/auth.service';
import { SUPPORTED_CHAINS } from '../types/blockchain';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.fast} ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const NetworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const NetworkCard = styled.div<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, active }) => 
    active ? 'rgba(0, 255, 255, 0.1)' : theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme, active }) => 
    active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`;

const NetworkName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const NetworkId = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SuccessMessage = styled.div`
  background-color: rgba(11, 255, 126, 0.1);
  color: ${({ theme }) => theme.colors.status.success};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Options: React.FC = () => {
  const [enableBiometric, setEnableBiometric] = useState<boolean>(false);
  const [enable2FA, setEnable2FA] = useState<boolean>(false);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [alchemyApiKey, setAlchemyApiKey] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await AuthService.getAuthSettings();
        
        if (settings) {
          setEnableBiometric(!!settings.biometric);
          setEnable2FA(!!settings.twoFactorAuth);
        }
        
        // Load selected networks from storage
        chrome.storage.local.get(['selectedNetworks'], (result) => {
          if (result.selectedNetworks) {
            setSelectedNetworks(result.selectedNetworks);
          } else {
            // Default to enable all networks
            setSelectedNetworks(SUPPORTED_CHAINS.map(chain => chain.id));
          }
        });
        
        // Load API key from storage
        chrome.storage.local.get(['alchemyApiKey'], (result) => {
          if (result.alchemyApiKey) {
            setAlchemyApiKey(result.alchemyApiKey);
          }
        });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    loadSettings();
  }, []);
  
  const saveSettings = async () => {
    try {
      // Save auth settings
      await AuthService.updateAuthSettings({
        biometric: enableBiometric,
        twoFactorAuth: enable2FA,
        encryptedSeedPhrase: 'placeholder' // This would be the actual encryptedSeedPhrase in production
      });
      
      // Save selected networks to storage
      chrome.storage.local.set({ selectedNetworks }, () => {
        console.log('Selected networks saved');
      });
      
      // Save API key to storage
      chrome.storage.local.set({ alchemyApiKey }, () => {
        console.log('API key saved');
      });
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };
  
  const toggleNetwork = (chainId: string) => {
    if (selectedNetworks.includes(chainId)) {
      setSelectedNetworks(selectedNetworks.filter(id => id !== chainId));
    } else {
      setSelectedNetworks([...selectedNetworks, chainId]);
    }
  };
  
  return (
    <Container>
      <Header>
        <Title>Knot Wallet Settings</Title>
        <p>Configure your wallet settings and preferences</p>
      </Header>
      
      {showSuccess && (
        <SuccessMessage>Settings saved successfully!</SuccessMessage>
      )}
      
      <Section>
        <SectionTitle>Security</SectionTitle>
        
        <FormGroup>
          <CheckboxLabel>
            <Checkbox
              checked={enableBiometric}
              onChange={() => setEnableBiometric(!enableBiometric)}
            />
            Enable Biometric Authentication
          </CheckboxLabel>
          <p>Use fingerprint or face recognition to unlock your wallet (if supported by your device)</p>
        </FormGroup>
        
        <FormGroup>
          <CheckboxLabel>
            <Checkbox
              checked={enable2FA}
              onChange={() => setEnable2FA(!enable2FA)}
            />
            Enable Two-Factor Authentication (2FA)
          </CheckboxLabel>
          <p>Add an extra layer of security with two-factor authentication</p>
        </FormGroup>
      </Section>
      
      <Section>
        <SectionTitle>Networks</SectionTitle>
        <p>Select the blockchain networks you want to use in Knot Wallet</p>
        
        <NetworkGrid>
          {SUPPORTED_CHAINS.map(chain => (
            <NetworkCard
              key={chain.id}
              active={selectedNetworks.includes(chain.id)}
              onClick={() => toggleNetwork(chain.id)}
            >
              <NetworkName>{chain.name}</NetworkName>
              <NetworkId>{chain.symbol}</NetworkId>
            </NetworkCard>
          ))}
        </NetworkGrid>
      </Section>
      
      <Section>
        <SectionTitle>API Keys (Optional)</SectionTitle>
        <p>Add your own API keys for better performance and higher rate limits</p>
        
        <FormGroup>
          <Label htmlFor="alchemy-api-key">Alchemy API Key</Label>
          <Input
            id="alchemy-api-key"
            type="text"
            value={alchemyApiKey}
            onChange={(e) => setAlchemyApiKey(e.target.value)}
            placeholder="Enter your Alchemy API key"
          />
        </FormGroup>
      </Section>
      
      <Button onClick={saveSettings}>Save Settings</Button>
    </Container>
  );
};

export default Options; 