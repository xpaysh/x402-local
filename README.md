# x402-local

> ⚡ Stop waiting for testnet faucets. Start building x402 agents in 30 seconds.

[![npm version](https://img.shields.io/npm/v/@xpay/x402-local)](https://www.npmjs.com/package/@xpay/x402-local)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/@xpay/x402-local)](https://www.npmjs.com/package/@xpay/x402-local)

## 🚀 Quick Start

```bash
npx @xpay/x402-local
```

**That's it!** In 30 seconds you get:
- ✅ Local facilitator running on :3402
- ✅ 5 funded test wallets created  
- ✅ Instant payment confirmations
- ✅ Ready for x402 development!

*No testnet setup. No faucet waiting. No slow confirmations.*

## 📦 What You Get

🏗️ **Local Facilitator**  
- Full x402 protocol simulation on `localhost:3402`
- `/verify` and `/settle` endpoints that work like mainnet
- Instant confirmations (or add realistic delays for testing)

💰 **Pre-funded Test Wallets**  
- 5 wallets with different USDC balances (1000-3000)
- No faucet needed - ready to use immediately
- Private keys provided for testing agents

⚡ **Zero-Friction Development**  
- Works with any x402 client library
- Perfect for agent development and API testing
- Docker support for CI/CD pipelines

## 🎯 Perfect For

- **AI Agent Development** - Test payment flows without mainnet complexity
- **x402 API Development** - Build and test protected endpoints locally  
- **Integration Testing** - Verify payment logic before production
- **Learning x402** - Understand the protocol without crypto friction

## 📖 Usage

### Basic Commands

```bash
# Start with defaults (port 3402, 5 wallets, instant payments)
npx @xpay/x402-local

# Custom configuration
npx @xpay/x402-local start --port 3403 --wallets 10

# Add realistic delays for testing
npx @xpay/x402-local start --delay 1000

# Check status
npx @xpay/x402-local status

# Manage wallets
npx @xpay/x402-local wallets
npx @xpay/x402-local wallets --create --fund 2000
```

### Example: Testing x402 API

1. **Start the local environment:**
   ```bash
   npx @xpay/x402-local
   ```

2. **Test the facilitator endpoints:**
   ```bash
   # Health check
   curl http://localhost:3402/health
   
   # Get payment requirements
   curl http://localhost:3402/payment-requirements
   ```

3. **Build your x402-protected API using the local facilitator:**
   ```javascript
   // Your API can now use http://localhost:3402 as the facilitator
   const facilitatorUrl = 'http://localhost:3402';
   ```

## 🔧 API Reference

### Facilitator Endpoints

The local facilitator simulates a production x402 facilitator:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check and configuration |
| `/verify` | POST | Verify x402 payment |
| `/settle` | POST | Settle verified payment |
| `/payment-requirements` | GET | Get payment requirements for testing |
| `/payments` | GET | List recent payments (debug) |

### Test Wallets

Default wallets created with `x402-local start`:

```
Wallet 1: 1000 USDC
Wallet 2: 1500 USDC  
Wallet 3: 2000 USDC
Wallet 4: 2500 USDC
Wallet 5: 3000 USDC
```

Each wallet includes:
- Ethereum-style address (`0x...`)
- Private key for signing transactions
- Pre-funded USDC balance

## 🤖 Agent Development

Perfect for building AI agents that make x402 payments:

```javascript
import { X402Client } from '@xpay/x402-sdk';

const client = new X402Client({
  facilitatorUrl: 'http://localhost:3402',
  privateKey: 'your-test-wallet-key'
});

// Your agent can now make payments to x402-protected APIs
const response = await client.request('http://your-api.com/protected-endpoint');
```

👉 **Next:** Build complete agents with [x402-agent-kit](https://github.com/xpaysh/x402-agent-kit)

## 🐳 Docker Support

Use in CI/CD or containerized development:

```bash
# Pull the image
docker pull xpay/x402-local

# Run with default settings
docker run -p 3402:3402 xpay/x402-local

# Custom configuration
docker run -p 3403:3403 xpay/x402-local --port 3403 --wallets 10
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Your Agent    │    │   x402-local     │    │  Your x402 API  │
│                 │    │   Facilitator    │    │                 │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌─────────────┐ │
│ │ X402 Client │ │───▶│ │ /verify      │ │◀───│ │ Middleware  │ │
│ │             │ │    │ │ /settle      │ │    │ │             │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌──────────────────┐             │
         └──────────────▶│   Test Wallets   │◀────────────┘
                         │ (Pre-funded USDC)│
                         └──────────────────┘
```

## 🔗 xPay x402 Ecosystem

`x402-local` is part of the complete xPay x402 developer toolkit:

- 📚 **[awesome-x402](https://github.com/xpaysh/awesome-x402)** - Complete x402 resource hub
- 🛠️ **[x402-local](https://github.com/xpaysh/x402-local)** - Local development environment (you are here)
- 🤖 **[x402-agent-kit](https://github.com/xpaysh/x402-agent-kit)** - Build x402-paying agents
- 📦 **[x402-sdk](https://github.com/xpaysh/x402-sdk)** - TypeScript SDK for x402
- 🔧 **[x402-server-kit](https://github.com/xpaysh/x402-server-kit)** - Server middleware for all frameworks

## 🚧 Roadmap

- [x] Core CLI with local facilitator
- [x] Pre-funded test wallets
- [x] Instant payment simulation
- [ ] Browser extension for testing
- [ ] Docker image for CI/CD
- [ ] WebSocket support for real-time updates
- [ ] Payment flow visualization
- [ ] Integration with popular testing frameworks

## 🤝 Contributing

We love contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

**Quick ways to help:**
- 🐛 Report bugs or request features
- 📝 Improve documentation  
- 🧪 Add test cases
- 💡 Suggest new features

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- 📖 **Documentation:** [Full docs](https://github.com/xpaysh/x402-local/tree/main/docs)
- 💬 **Community:** [GitHub Discussions](https://github.com/xpaysh/x402-local/discussions)
- 🐛 **Issues:** [Bug Reports](https://github.com/xpaysh/x402-local/issues)
- 📧 **Email:** hello@xpay.sh

---

<p align="center">
  <b>🚀 Built by xPay - Helping the agentic community get paid and pay safely</b><br>
  <sub>If this tool helped you build with x402, please ⭐ star the repo!</sub><br><br>
  <a href="https://github.com/xpaysh/awesome-x402">Explore x402 Resources</a> •
  <a href="https://github.com/xpaysh/x402-agent-kit">Build AI Agents</a> •
  <a href="https://x402.org">Learn x402 Protocol</a>
</p>