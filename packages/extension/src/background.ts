// Background script for x402-local browser extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('x402-local extension installed');
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'INJECT_PAYMENT') {
    // Handle payment injection requests
    sendResponse({ success: true });
  }
  
  if (request.type === 'GET_WALLETS') {
    // Fetch wallet information
    fetch('http://localhost:3402/wallets')
      .then(response => response.json())
      .then(data => sendResponse({ wallets: data.wallets }))
      .catch(error => sendResponse({ error: error.message }));
    
    return true; // Keep the message channel open for async response
  }
});