import chalk from 'chalk';
import ora from 'ora';
import { WalletManager } from '../wallets/index.js';

interface WalletOptions {
  create?: boolean;
  fund?: string;
}

export async function walletsCommand(options: WalletOptions) {
  const walletManager = new WalletManager();
  
  if (options.create) {
    const spinner = ora('Creating new test wallet...').start();
    try {
      const fundAmount = parseFloat(options.fund || '1000');
      const wallet = await walletManager.createWallet(fundAmount);
      
      spinner.succeed('New wallet created!');
      console.log(chalk.cyan('💳 New Test Wallet:'));
      console.log(`   Address: ${wallet.address}`);
      console.log(`   Balance: ${wallet.balance} USDC`);
      console.log(`   Private Key: ${wallet.privateKey}`);
      console.log(chalk.yellow('⚠️  Keep your private key secure!'));
      
    } catch (error) {
      spinner.fail('Failed to create wallet');
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  } else {
    // List existing wallets
    const spinner = ora('Loading test wallets...').start();
    try {
      const wallets = await walletManager.getWallets();
      
      spinner.succeed('Wallets loaded');
      console.log(chalk.cyan('💳 Available Test Wallets:'));
      console.log(chalk.gray('━'.repeat(50)));
      
      if (wallets.length === 0) {
        console.log(chalk.yellow('No wallets found. Run `x402-local start` to create test wallets.'));
      } else {
        wallets.forEach((wallet, index) => {
          console.log(`${index + 1}. ${wallet.address}`);
          console.log(`   Balance: ${chalk.green(wallet.balance + ' USDC')}`);
          console.log(`   Private Key: ${chalk.gray(wallet.privateKey)}`);
          console.log('');
        });
      }
      
      console.log(chalk.blue('💡 Create new wallet: x402-local wallets --create'));
      
    } catch (error) {
      spinner.fail('Failed to load wallets');
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  }
}