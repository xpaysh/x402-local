const chalk = require('chalk');
const cliSpinners = require('cli-spinners');

export class Spinner {
  private text: string;
  private isSpinning: boolean = false;
  private interval: NodeJS.Timeout | null = null;
  private frameIndex: number = 0;
  private frames: string[];

  constructor(text: string = '') {
    this.text = text;
    this.frames = cliSpinners.dots.frames;
  }

  start(): this {
    if (this.isSpinning) return this;
    
    this.isSpinning = true;
    this.frameIndex = 0;
    
    this.interval = setInterval(() => {
      const frame = chalk.cyan(this.frames[this.frameIndex]);
      process.stdout.write(`\r${frame} ${this.text}`);
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
    }, cliSpinners.dots.interval);
    
    return this;
  }

  succeed(text?: string): this {
    this.stop();
    const message = text || this.text;
    console.log(chalk.green('✓') + ' ' + message);
    return this;
  }

  fail(text?: string): this {
    this.stop();
    const message = text || this.text;
    console.log(chalk.red('✗') + ' ' + message);
    return this;
  }

  stop(): this {
    if (!this.isSpinning) return this;
    
    this.isSpinning = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    process.stdout.write('\r');
    return this;
  }

  set(property: 'text', value: string): void {
    if (property === 'text') {
      this.text = value;
    }
  }
}

// Factory function to match ora's API
export function createSpinner(text: string = ''): Spinner {
  return new Spinner(text);
}