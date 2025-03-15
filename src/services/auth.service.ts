import CryptoJS from 'crypto-js';
import * as bip39 from 'bip39';
import { AuthParams } from '../types/auth';

export class AuthService {
  private static readonly STORAGE_KEY_SEED = 'knot_encrypted_seed';
  private static readonly STORAGE_KEY_AUTH = 'knot_auth_settings';
  private static readonly SALT_SIZE = 16;
  private static readonly KEY_SIZE = 256 / 32; // 256 bits in bytes
  private static readonly ITERATIONS = 10000;
  
  /**
   * Create a new wallet with a randomly generated seed phrase
   * @param password User's password for encryption
   * @returns The generated seed phrase and its encrypted version
   */
  public static async createWallet(password: string): Promise<{
    seedPhrase: string;
    encryptedSeedPhrase: string;
  }> {
    // Generate a random mnemonic (seed phrase)
    const seedPhrase = bip39.generateMnemonic(256); // 24 words
    
    // Encrypt the seed phrase
    const encryptedSeedPhrase = await this.encryptSeedPhrase(seedPhrase, password);
    
    // Save the encrypted seed phrase
    await this.saveEncryptedSeed(encryptedSeedPhrase);
    
    // Save default auth settings
    await this.saveAuthSettings({ 
      biometric: false, 
      twoFactorAuth: false, 
      encryptedSeedPhrase 
    });
    
    return { seedPhrase, encryptedSeedPhrase };
  }
  
  /**
   * Import an existing wallet using a seed phrase
   * @param seedPhrase User's seed phrase
   * @param password User's password for encryption
   * @returns The encrypted seed phrase
   */
  public static async importWallet(seedPhrase: string, password: string): Promise<string> {
    // Validate the seed phrase
    if (!bip39.validateMnemonic(seedPhrase)) {
      throw new Error('Invalid seed phrase');
    }
    
    // Encrypt the seed phrase
    const encryptedSeedPhrase = await this.encryptSeedPhrase(seedPhrase, password);
    
    // Save the encrypted seed phrase
    await this.saveEncryptedSeed(encryptedSeedPhrase);
    
    // Save default auth settings
    await this.saveAuthSettings({ 
      biometric: false, 
      twoFactorAuth: false,
      encryptedSeedPhrase 
    });
    
    return encryptedSeedPhrase;
  }
  
  /**
   * Authenticate a user with their password and decrypt the seed phrase
   * @param password User's password
   * @returns The decrypted seed phrase if authentication is successful
   */
  public static async authenticate(password: string): Promise<string> {
    const encryptedSeed = await this.getEncryptedSeed();
    
    if (!encryptedSeed) {
      throw new Error('No wallet found');
    }
    
    try {
      return await this.decryptSeedPhrase(encryptedSeed, password);
    } catch (error) {
      throw new Error('Invalid password');
    }
  }
  
  /**
   * Update authentication settings
   * @param settings New auth settings
   */
  public static async updateAuthSettings(settings: AuthParams): Promise<void> {
    await this.saveAuthSettings(settings);
  }
  
  /**
   * Get current authentication settings
   * @returns Current auth settings
   */
  public static async getAuthSettings(): Promise<AuthParams> {
    return new Promise((resolve) => {
      chrome.storage.local.get([this.STORAGE_KEY_AUTH], (result) => {
        const settings = result[this.STORAGE_KEY_AUTH] as AuthParams;
        if (!settings) {
          // Return default settings if none exists
          resolve({
            biometric: false,
            twoFactorAuth: false,
            encryptedSeedPhrase: '',
          });
        } else {
          resolve(settings);
        }
      });
    });
  }
  
  /**
   * Encrypt a seed phrase with AES-256 using a password
   * @param seedPhrase Seed phrase to encrypt
   * @param password User's password
   * @returns Encrypted seed phrase string
   */
  private static async encryptSeedPhrase(seedPhrase: string, password: string): Promise<string> {
    // Generate a random salt
    const salt = CryptoJS.lib.WordArray.random(this.SALT_SIZE);
    
    // Derive a key using PBKDF2
    const key = CryptoJS.PBKDF2(
      password,
      salt,
      {
        keySize: this.KEY_SIZE,
        iterations: this.ITERATIONS,
      }
    );
    
    // Encrypt the seed phrase
    const encrypted = CryptoJS.AES.encrypt(seedPhrase, key.toString());
    
    // Combine salt and encrypted data
    return salt.toString() + '.' + encrypted.toString();
  }
  
  /**
   * Decrypt a seed phrase with the user's password
   * @param encryptedSeedPhrase Encrypted seed phrase
   * @param password User's password
   * @returns Decrypted seed phrase
   */
  private static async decryptSeedPhrase(encryptedSeedPhrase: string, password: string): Promise<string> {
    // Split the salt and encrypted data
    const parts = encryptedSeedPhrase.split('.');
    if (parts.length !== 2) {
      throw new Error('Invalid encrypted seed phrase format');
    }
    
    const salt = CryptoJS.enc.Hex.parse(parts[0]);
    const encrypted = parts[1];
    
    // Derive the key using PBKDF2
    const key = CryptoJS.PBKDF2(
      password,
      salt,
      {
        keySize: this.KEY_SIZE,
        iterations: this.ITERATIONS,
      }
    );
    
    // Decrypt the seed phrase
    const decrypted = CryptoJS.AES.decrypt(encrypted, key.toString());
    
    try {
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      throw new Error('Decryption failed');
    }
  }
  
  /**
   * Save encrypted seed phrase to storage
   * @param encryptedSeed Encrypted seed phrase
   */
  private static async saveEncryptedSeed(encryptedSeed: string): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [this.STORAGE_KEY_SEED]: encryptedSeed }, () => {
        resolve();
      });
    });
  }
  
  /**
   * Get encrypted seed phrase from storage
   * @returns Encrypted seed phrase
   */
  private static async getEncryptedSeed(): Promise<string | null> {
    return new Promise((resolve) => {
      chrome.storage.local.get([this.STORAGE_KEY_SEED], (result) => {
        resolve(result[this.STORAGE_KEY_SEED] || null);
      });
    });
  }
  
  /**
   * Save authentication settings to storage
   * @param settings Auth settings to save
   */
  private static async saveAuthSettings(settings: AuthParams): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [this.STORAGE_KEY_AUTH]: settings }, () => {
        resolve();
      });
    });
  }
} 