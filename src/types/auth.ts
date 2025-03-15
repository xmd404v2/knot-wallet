export interface AuthParams {
  biometric?: boolean;
  twoFactorAuth?: boolean;
  encryptedSeedPhrase: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  walletAddress: string | null;
  encryptedSeedPhrase: string | null;
  loginMethod: 'password' | 'biometric' | 'twoFactor' | null;
}

export interface UserCredentials {
  password: string;
  encryptedSeedPhrase: string;
} 