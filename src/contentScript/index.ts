// Content script for Knot Wallet Chrome extension
// This script runs in the context of web pages

// Define the interface for web3 provider requests
interface Web3Request {
  id: number;
  jsonrpc: string;
  method: string;
  params: any[];
}

// Define the interface for web3 provider responses
interface Web3Response {
  id: number;
  jsonrpc: string;
  result?: any;
  error?: {
    code: number;
    message: string;
  };
}

// Inject a script to detect Web3 provider requests
const injectScript = () => {
  try {
    const script = document.createElement('script');
    script.textContent = `
      // This code runs in the page context
      (function() {
        // Store the original window.ethereum if it exists
        const originalEthereum = window.ethereum;
        
        // Knot provider to intercept requests
        const knotProvider = {
          isKnot: true,
          chainId: '0x1', // Default to Ethereum Mainnet
          networkVersion: '1',
          isConnected: () => true,
          
          // RPC request handler
          request: async function(args) {
            // Create a custom event to communicate with the content script
            const event = new CustomEvent('KNOT_WALLET_REQUEST', {
              detail: { id: Date.now(), jsonrpc: '2.0', ...args }
            });
            document.dispatchEvent(event);
            
            // Listen for the response
            return new Promise((resolve, reject) => {
              const handler = (e) => {
                if (e.detail.id === event.detail.id) {
                  document.removeEventListener('KNOT_WALLET_RESPONSE', handler);
                  if (e.detail.error) {
                    reject(e.detail.error);
                  } else {
                    resolve(e.detail.result);
                  }
                }
              };
              
              document.addEventListener('KNOT_WALLET_RESPONSE', handler);
            });
          },
          
          // Legacy API support
          send: function(method, params) {
            return this.request({ method, params });
          },
          
          // For EIP-1193 compatibility
          on: function(eventName, listener) {
            // Add event listener logic here
            console.log('Knot provider event registered:', eventName);
            return this;
          },
          
          removeListener: function(eventName, listener) {
            // Remove event listener logic here
            return this;
          }
        };
        
        // Only inject if not already present
        if (!window.ethereum || !window.ethereum.isKnot) {
          console.log('Injecting Knot Wallet provider');
          
          // If ethereum already exists, preserve its properties
          if (window.ethereum) {
            Object.keys(window.ethereum).forEach(key => {
              if (!knotProvider[key]) {
                knotProvider[key] = window.ethereum[key];
              }
            });
          }
          
          // Replace the ethereum object
          window.ethereum = knotProvider;
          
          // Notify dApp that the provider changed
          window.dispatchEvent(new Event('ethereum#initialized'));
        }
      })();
    `;
    
    document.head.appendChild(script);
    script.remove();
    console.log('Knot Wallet provider injected');
  } catch (error) {
    console.error('Error injecting Knot Wallet provider:', error);
  }
};

// Handle requests from the page
const handleRequest = async (event: CustomEvent<Web3Request>) => {
  console.log('Received request from page:', event.detail);
  
  const { id, method, params } = event.detail;
  let response: Web3Response = { id, jsonrpc: '2.0' };
  
  try {
    // Process different RPC methods
    switch (method) {
      case 'eth_requestAccounts':
      case 'eth_accounts':
        // Send message to background script to get accounts
        // For demo, return a mock account
        response.result = ['0x1234567890abcdef1234567890abcdef12345678'];
        break;
        
      case 'eth_chainId':
        // Return the current chain ID
        response.result = '0x1'; // Ethereum Mainnet
        break;
        
      case 'eth_getBalance':
        // For demo, return a mock balance
        response.result = '0x1BC16D674EC80000'; // 2 ETH in hex
        break;
        
      case 'eth_sendTransaction':
        // Forward to extension for user confirmation
        chrome.runtime.sendMessage(
          { type: 'SEND_TRANSACTION', transaction: params[0] },
          (resp) => {
            const txResponse: Web3Response = {
              id,
              jsonrpc: '2.0'
            };
            
            if (resp && resp.success) {
              txResponse.result = resp.data;
            } else {
              txResponse.error = {
                code: 4001, // User rejected
                message: resp ? resp.error : 'Transaction rejected'
              };
            }
            
            // Send response back to page
            document.dispatchEvent(
              new CustomEvent('KNOT_WALLET_RESPONSE', { detail: txResponse })
            );
          }
        );
        // Don't send an immediate response, will send async
        return;
        
      default:
        // Unsupported method
        response.error = {
          code: -32601,
          message: `Method ${method} not supported`
        };
    }
  } catch (error) {
    console.error('Error processing request:', error);
    response.error = {
      code: -32603,
      message: 'Internal error'
    };
  }
  
  // Send response back to page
  document.dispatchEvent(
    new CustomEvent('KNOT_WALLET_RESPONSE', { detail: response })
  );
};

// Listen for requests from the injected script
document.addEventListener('KNOT_WALLET_REQUEST', (e: Event) => {
  handleRequest(e as CustomEvent<Web3Request>);
});

// Only inject on HTML pages, not on other resources
if (document.contentType === 'text/html') {
  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectScript);
  } else {
    injectScript();
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CHAIN_CHANGED') {
    // Notify the page that the chain has changed
    document.dispatchEvent(
      new CustomEvent('KNOT_WALLET_CHAIN_CHANGED', {
        detail: { chainId: message.chainId }
      })
    );
    sendResponse({ success: true });
  }
  return false;
});

console.log('Knot Wallet content script loaded'); 