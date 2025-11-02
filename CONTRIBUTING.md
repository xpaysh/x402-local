# Contributing to x402-local

Thank you for your interest in contributing to x402-local! This project aims to make x402 development frictionless, and community contributions are essential to achieving that goal.

## 🚀 Quick Start for Contributors

1. **Fork the repository**
2. **Clone your fork:** `git clone https://github.com/YOUR-USERNAME/x402-local.git`
3. **Install dependencies:** `npm install`
4. **Build the project:** `npm run build`
5. **Test your changes:** `npm run test`

## 🏗️ Development Setup

This is a monorepo with two main packages:

```
packages/
├── cli/          # The main npx CLI tool
└── extension/    # Browser extension for testing
```

### Prerequisites

- Node.js 18+ 
- npm 9+
- Basic understanding of x402 protocol

### Local Development

```bash
# Install all dependencies
npm install

# Build all packages
npm run build

# Run CLI in development mode
npm run dev --workspace=packages/cli

# Test the CLI globally
cd packages/cli && npm link
x402-local --help

# Build browser extension
npm run build --workspace=packages/extension
```

## 🎯 How to Contribute

### 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/xpaysh/x402-local/issues/new?template=bug_report.md) with:

- Clear steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Error output if applicable

### 💡 Feature Requests

Have an idea? [Suggest a feature](https://github.com/xpaysh/x402-local/issues/new?template=feature_request.md) with:

- Clear use case description
- Proposed solution
- Alternative approaches considered

### 🔧 Code Contributions

#### Types of contributions we're looking for:

**High Priority:**
- Bug fixes and stability improvements
- Performance optimizations
- Better error handling and user experience
- Documentation improvements
- Test coverage expansion

**Medium Priority:**
- New CLI commands and options
- Browser extension enhancements
- Docker improvements
- Integration with other x402 tools

**Future:**
- WebSocket support for real-time updates
- Payment flow visualization
- Advanced testing features

#### Pull Request Process

1. **Create a branch:** `git checkout -b feature/your-feature-name`
2. **Make your changes** following our coding standards
3. **Write tests** for new functionality
4. **Update documentation** if needed
5. **Run the full test suite:** `npm run test`
6. **Commit with clear messages:** Follow [conventional commits](https://conventionalcommits.org/)
7. **Push and create a PR**

#### Code Style

- **TypeScript:** Use strict TypeScript settings
- **Formatting:** Prettier is configured (run `npm run format`)
- **Linting:** ESLint rules are enforced (run `npm run lint`)
- **Testing:** Write tests for new features using Vitest

Example commit message:
```
feat(cli): add --timeout option for payment delays

- Add configurable timeout for payment simulation
- Update help text and documentation
- Add tests for timeout functionality

Closes #123
```

## 🧪 Testing

We use [Vitest](https://vitest.dev/) for testing:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests for specific package
npm run test --workspace=packages/cli
```

### Test Categories

1. **Unit tests:** Test individual functions and classes
2. **Integration tests:** Test CLI commands end-to-end
3. **API tests:** Test facilitator endpoints
4. **Extension tests:** Test browser extension functionality

Please add tests for any new functionality!

## 📚 Documentation

### Code Documentation

- Use JSDoc comments for complex functions
- Include examples in function documentation
- Keep README up to date with new features

### User Documentation

- Update CLI help text for new commands
- Add examples to README
- Consider adding guides to `/docs` folder

## 🔍 Architecture Overview

### CLI Package (`packages/cli`)

```
src/
├── cli.ts           # Main CLI entry point
├── commands/        # CLI command implementations
├── facilitator/     # Local x402 facilitator
├── wallets/         # Test wallet management
└── utils/           # Shared utilities
```

### Key Classes

- **Facilitator:** Simulates x402 protocol endpoints
- **WalletManager:** Creates and manages test wallets
- **Commands:** Individual CLI command handlers

### Extension Package (`packages/extension`)

```
src/
├── popup.ts         # Extension popup interface
├── background.ts    # Background service worker
└── content.ts       # Page content script
```

## 🌟 Recognition

Contributors will be recognized through:

- GitHub contributors list
- Release notes for significant contributions
- Mentions in project announcements
- Special thanks section for major contributions

## 🤝 Community Guidelines

- **Be respectful** and inclusive
- **Ask questions** if anything is unclear
- **Share knowledge** and help other contributors
- **Focus on the user experience** of x402 developers
- **Think about the ecosystem** - how does this fit with other xPay tools?

## 🆘 Getting Help

- 💬 **GitHub Discussions:** [Ask questions](https://github.com/xpaysh/x402-local/discussions)
- 🐛 **Issues:** [Report bugs](https://github.com/xpaysh/x402-local/issues)
- 📧 **Email:** hello@xpay.sh
- 📚 **x402 Resources:** [awesome-x402](https://github.com/xpaysh/awesome-x402)

## 📋 Release Process

1. **Version bump:** Update version in `package.json` files
2. **Changelog:** Update `CHANGELOG.md` with new features
3. **Git tag:** Create release tag (`v1.0.0`)
4. **GitHub Release:** Create release on GitHub
5. **Auto-publish:** CI automatically publishes to NPM

## 🔗 Related Projects

This project is part of the xPay x402 ecosystem:

- [awesome-x402](https://github.com/xpaysh/awesome-x402) - Complete x402 resource hub
- [x402-agent-kit](https://github.com/xpaysh/x402-agent-kit) - Build x402-paying agents  
- [x402-sdk](https://github.com/xpaysh/x402-sdk) - TypeScript SDK for x402
- [x402-server-kit](https://github.com/xpaysh/x402-server-kit) - Server middleware

Consider how your contribution fits into the broader ecosystem!

---

## License

By contributing to x402-local, you agree that your contributions will be licensed under the MIT License.

---

<p align="center">
  <b>🚀 Thank you for helping make x402 development awesome!</b><br>
  <sub>Together we're building the future of agent payments</sub>
</p>