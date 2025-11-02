import { describe, it, expect } from 'vitest';
import { Facilitator } from './index';

describe('Facilitator', () => {
  it('should initialize with default port', () => {
    const facilitator = new Facilitator();
    expect(facilitator.getPort()).toBe(3402);
  });

  it('should initialize with custom port', () => {
    const facilitator = new Facilitator(3000);
    expect(facilitator.getPort()).toBe(3000);
  });

  it('should track payment count', () => {
    const facilitator = new Facilitator();
    expect(facilitator.getPaymentCount()).toBe(0);
  });
});