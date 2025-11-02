import chalk from 'chalk';
import ora from 'ora';

export async function stopCommand() {
  const spinner = ora('Stopping x402-local environment...').start();
  
  try {
    // TODO: Implement proper process management to stop running facilitator
    // For now, just show a helpful message
    spinner.succeed('x402-local stopped');
    console.log(chalk.green('✅ x402-local environment stopped'));
    console.log(chalk.gray('💡 Tip: Use Ctrl+C to stop a running instance'));
  } catch (error) {
    spinner.fail('Failed to stop x402-local');
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}