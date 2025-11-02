import { describe, it, expect } from 'vitest';
import { WalletManager } from './index';

describe('WalletManager', () => {
  it('should create wallets', async () => {
    const walletManager = new WalletManager();
    const wallets = await walletManager.createWallets(3);
    
    expect(wallets).toHaveLength(3);
    expect(wallets[0]).toHaveProperty('address');
    expect(wallets[0]).toHaveProperty('privateKey');
    expect(wallets[0]).toHaveProperty('balance');
  });

  it('should create single wallet with custom balance', async () => {
    const walletManager = new WalletManager();
    const wallet = await walletManager.createWallet(2000);
    
    expect(wallet.balance).toBe(2000);
    expect(wallet.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(wallet.privateKey).toMatch(/^0x[a-fA-F0-9]{64}$/);
  });

  it('should find funded wallet', async () => {
    const walletManager = new WalletManager();
    await walletManager.createWallets(2);
    
    const fundedWallet = await walletManager.getFundedWallet();
    expect(fundedWallet).toBeDefined();
    expect(fundedWallet!.balance).toBeGreaterThan(0);
  });
});