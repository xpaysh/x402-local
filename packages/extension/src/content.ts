// Content script for x402-local browser extension

// Inject helper functions for x402 development
(function() {
  // Add visual indicator when x402-local is available
  function addX402Indicator() {
    const indicator = document.createElement('div');
    indicator.id = 'x402-local-indicator';
    indicator.innerHTML = '🚀 x402-local active';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #28a745;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(indicator);
    
    // Remove after 3 seconds
    setTimeout(() => {
      indicator.remove();
    }, 3000);
  }

  // Check if x402-local is running
  fetch('http://localhost:3402/health')
    .then(response => response.json())
    .then(data => {
      if (data.service === 'x402-local-facilitator') {
        addX402Indicator();
        
        // Add x402 helper to window for debugging
        (window as any).x402Local = {
          facilitatorUrl: 'http://localhost:3402',
          async getWallets() {
            const response = await fetch('http://localhost:3402/wallets');
            return response.json();
          },
          async getPayments() {
            const response = await fetch('http://localhost:3402/payments');
            return response.json();
          },
          async testPayment() {
            console.log('x402-local: Test payment functionality coming soon!');
          }
        };
        
        console.log('🚀 x402-local detected! Use window.x402Local for debugging.');
      }
    })
    .catch(() => {
      // x402-local not running, do nothing
    });
})();