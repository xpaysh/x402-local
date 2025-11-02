import { randomBytes } from 'crypto';

export interface Wallet {
  address: string;
  privateKey: string;
  balance: number;
}

export class WalletManager {
  private wallets: Wallet[] = [];

  async createWallets(count: number): Promise<Wallet[]> {
    const wallets: Wallet[] = [];
    
    for (let i = 0; i < count; i++) {
      const wallet = await this.createWallet(1000 + (i * 500)); // Varying balances
      wallets.push(wallet);
    }
    
    this.wallets = wallets;
    return wallets;
  }

  async createWallet(balance: number = 1000): Promise<Wallet> {
    // Generate a mock wallet (in real implementation, this would use proper crypto libraries)
    const privateKey = '0x' + randomBytes(32).toString('hex');
    const address = '0x' + randomBytes(20).toString('hex');
    
    const wallet: Wallet = {
      address,
      privateKey,
      balance
    };
    
    this.wallets.push(wallet);
    return wallet;
  }

  async getWallets(): Promise<Wallet[]> {
    return this.wallets;
  }

  async getWallet(address: string): Promise<Wallet | undefined> {
    return this.wallets.find(wallet => wallet.address === address);
  }

  async updateBalance(address: string, newBalance: number): Promise<void> {
    const wallet = this.wallets.find(w => w.address === address);
    if (wallet) {
      wallet.balance = newBalance;
    }
  }

  // Get a funded wallet for testing
  async getFundedWallet(): Promise<Wallet | undefined> {
    return this.wallets.find(wallet => wallet.balance > 0);
  }
}