#!/usr/bin/env node

import { Command } from 'commander';
const chalk = require('chalk');
import { startCommand } from './commands/start';
import { stopCommand } from './commands/stop';
import { statusCommand } from './commands/status';
import { walletsCommand } from './commands/wallets';

const program = new Command();

program
  .name('x402-local')
  .description(chalk.cyan('🚀 x402 development without the testnet hassle'))
  .version('0.1.0');

program
  .command('start')
  .description('Start the local x402 environment')
  .option('-p, --port <port>', 'Port for the facilitator server', '3402')
  .option('--wallets <count>', 'Number of test wallets to create', '5')
  .option('--delay <ms>', 'Add realistic delays (optional)', '0')
  .action(startCommand);

program
  .command('stop')
  .description('Stop the local x402 environment')
  .action(stopCommand);

program
  .command('status')
  .description('Check status of local x402 environment')
  .action(statusCommand);

program
  .command('wallets')
  .description('List and manage test wallets')
  .option('--create', 'Create a new test wallet')
  .option('--fund <amount>', 'Fund amount for new wallet', '1000')
  .action(walletsCommand);

// Default command - same as 'start'
program
  .action(() => {
    console.log(chalk.cyan('🚀 Starting x402-local environment...'));
    startCommand({ port: '3402', wallets: '5', delay: '0' });
  });

program.parse();