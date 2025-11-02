// Popup script for x402-local browser extension

interface X402Status {
  connected: boolean;
  facilitatorUrl: string;
  wallets: Array<{
    address: string;
    balance: number;
  }>;
}

async function checkFacilitatorStatus(): Promise<X402Status> {
  try {
    const response = await fetch('http://localhost:3402/health');
    const data = await response.json();
    
    const walletsResponse = await fetch('http://localhost:3402/wallets');
    const walletsData = await walletsResponse.json();
    
    return {
      connected: true,
      facilitatorUrl: 'http://localhost:3402',
      wallets: walletsData.wallets || []
    };
  } catch (error) {
    return {
      connected: false,
      facilitatorUrl: 'http://localhost:3402',
      wallets: []
    };
  }
}

async function updateUI() {
  const status = await checkFacilitatorStatus();
  const statusElement = document.getElementById('status');
  const statusText = document.getElementById('status-text');
  const walletList = document.getElementById('wallet-list');
  
  if (status.connected) {
    statusElement!.className = 'status connected';
    statusText!.textContent = '🟢 Connected to x402-local';
    
    if (status.wallets.length > 0) {
      walletList!.innerHTML = status.wallets
        .map((wallet, i) => `
          <div class="wallet">
            ${i + 1}. ${wallet.address.substring(0, 10)}... 
            (${wallet.balance} USDC)
          </div>
        `)
        .join('');
    } else {
      walletList!.innerHTML = '<div>No wallets found</div>';
    }
  } else {
    statusElement!.className = 'status disconnected';
    statusText!.textContent = '🔴 Not connected to x402-local';
    walletList!.innerHTML = '<div>Start x402-local to see wallets</div>';
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  
  document.getElementById('inject-payment')?.addEventListener('click', () => {
    // TODO: Implement payment injection
    alert('Payment injection feature coming soon!');
  });
  
  document.getElementById('clear-payments')?.addEventListener('click', () => {
    // TODO: Implement payment clearing
    alert('Payment clearing feature coming soon!');
  });
  
  document.getElementById('open-facilitator')?.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3402/health' });
  });
  
  // Refresh status every 5 seconds
  setInterval(updateUI, 5000);
});