import chalk from 'chalk';
import ora from 'ora';
import { Facilitator } from '../facilitator/index.js';
import { WalletManager } from '../wallets/index.js';

interface StartOptions {
  port: string;
  wallets: string;
  delay: string;
}

export async function startCommand(options: StartOptions) {
  const spinner = ora('Starting x402-local environment...').start();
  
  try {
    const port = parseInt(options.port);
    const walletCount = parseInt(options.wallets);
    const delay = parseInt(options.delay);

    // Initialize wallet manager
    spinner.text = 'Creating test wallets...';
    const walletManager = new WalletManager();
    const wallets = await walletManager.createWallets(walletCount);
    
    // Start local facilitator
    spinner.text = 'Starting local facilitator...';
    const facilitator = new Facilitator(port, { delay });
    await facilitator.start();

    spinner.succeed('x402-local environment started!');

    console.log(chalk.green('\\n✅ Ready for x402 development!'));
    console.log(chalk.cyan(`\\n🏗️  Local Facilitator: http://localhost:${port}`));
    console.log(chalk.cyan(`💰 Test Wallets: ${walletCount} wallets created`));
    
    if (delay > 0) {
      console.log(chalk.yellow(`⏰ Payment Delay: ${delay}ms (realistic mode)`));
    } else {
      console.log(chalk.green('⚡ Payment Delay: Instant (development mode)'));
    }

    console.log(chalk.blue('\\n📚 Documentation: https://github.com/xpaysh/x402-local'));
    console.log(chalk.blue('🤖 Build agents: https://github.com/xpaysh/x402-agent-kit'));
    
    // Display wallet information
    console.log(chalk.cyan('\\n💳 Available Test Wallets:'));
    wallets.forEach((wallet, index) => {
      console.log(`  ${index + 1}. ${wallet.address} (${wallet.balance} USDC)`);
    });

    console.log(chalk.gray('\\n⌨️  Press Ctrl+C to stop'));

    // Keep the process running
    process.on('SIGINT', async () => {
      console.log(chalk.yellow('\\n⏹️  Stopping x402-local...'));
      await facilitator.stop();
      process.exit(0);
    });

  } catch (error) {
    spinner.fail('Failed to start x402-local environment');
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}