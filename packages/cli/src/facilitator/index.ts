import Fastify from 'fastify';

export interface FacilitatorOptions {
  delay?: number; // Artificial delay in ms for realistic testing
}

export interface PaymentRequirement {
  amount: string;
  currency: string;
  recipient: string;
  memo?: string;
}

export interface PaymentPayload {
  from: string;
  to: string;
  amount: string;
  currency: string;
  signature: string;
  timestamp: number;
}

export class Facilitator {
  private server: any;
  private port: number;
  private options: FacilitatorOptions;
  private payments: Map<string, PaymentPayload> = new Map();

  constructor(port: number = 3402, options: FacilitatorOptions = {}) {
    this.port = port;
    this.options = options;
    this.server = Fastify({ logger: false });
    this.setupRoutes();
  }

  private setupRoutes() {
    // Simple CORS headers for local development
    this.server.addHook('onRequest', async (request: any, reply: any) => {
      reply.header('Access-Control-Allow-Origin', '*');
      reply.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    });

    // Health check
    this.server.get('/health', async () => {
      return { 
        status: 'ok', 
        service: 'x402-local-facilitator',
        timestamp: Date.now(),
        delay: this.options.delay || 0
      };
    });

    // x402 payment verification endpoint
    this.server.post('/verify', async (request: any, reply: any) => {
      await this.artificialDelay();
      
      const payment = request.body as PaymentPayload;
      
      // Mock verification - in reality this would validate signatures, balances, etc.
      const isValid = this.validatePayment(payment);
      
      if (isValid) {
        const paymentId = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.payments.set(paymentId, payment);
        
        return {
          status: 'verified',
          paymentId,
          timestamp: Date.now(),
          amount: payment.amount,
          currency: payment.currency
        };
      } else {
        reply.code(400);
        return {
          status: 'invalid',
          error: 'Payment verification failed',
          timestamp: Date.now()
        };
      }
    });

    // x402 payment settlement endpoint
    this.server.post('/settle', async (request: any, reply: any) => {
      await this.artificialDelay();
      
      const { paymentId } = request.body;
      const payment = this.payments.get(paymentId);
      
      if (payment) {
        return {
          status: 'settled',
          paymentId,
          transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          timestamp: Date.now(),
          amount: payment.amount,
          currency: payment.currency
        };
      } else {
        reply.code(404);
        return {
          status: 'not_found',
          error: 'Payment not found',
          timestamp: Date.now()
        };
      }
    });

    // Get payment requirements (for testing protected endpoints)
    this.server.get('/payment-requirements', async () => {
      return {
        amount: '0.01',
        currency: 'USDC',
        recipient: '0x742d35cc6634c0532925a3b8d03b4cf1e5555d3e',
        memo: 'Test API access',
        facilitator: `http://localhost:${this.port}`,
        timestamp: Date.now()
      };
    });

    // List recent payments (for debugging)
    this.server.get('/payments', async () => {
      return {
        count: this.payments.size,
        payments: Array.from(this.payments.entries()).map(([id, payment]) => ({
          id,
          ...payment
        }))
      };
    });
  }

  private validatePayment(payment: PaymentPayload): boolean {
    // Mock validation - in reality this would check:
    // - Signature validity
    // - Balance sufficiency  
    // - Transaction format
    // - Nonce/timestamp
    
    return !!(
      payment.from &&
      payment.to &&
      payment.amount &&
      payment.currency &&
      payment.signature &&
      parseFloat(payment.amount) > 0
    );
  }

  private async artificialDelay(): Promise<void> {
    if (this.options.delay && this.options.delay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.options.delay));
    }
  }

  async start(): Promise<void> {
    try {
      await this.server.listen({ port: this.port, host: '0.0.0.0' });
    } catch (error) {
      throw new Error(`Failed to start facilitator on port ${this.port}: ${error}`);
    }
  }

  async stop(): Promise<void> {
    try {
      await this.server.close();
    } catch (error) {
      throw new Error(`Failed to stop facilitator: ${error}`);
    }
  }

  getPort(): number {
    return this.port;
  }

  getPaymentCount(): number {
    return this.payments.size;
  }
}