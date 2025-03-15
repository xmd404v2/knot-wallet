/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/contentScript/index.ts":
/*!************************************!*\
  !*** ./src/contentScript/index.ts ***!
  \************************************/
/***/ (function() {


// Content script for Knot Wallet Chrome extension
// This script runs in the context of web pages
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    }
    catch (error) {
        console.error('Error injecting Knot Wallet provider:', error);
    }
};
// Handle requests from the page
const handleRequest = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received request from page:', event.detail);
    const { id, method, params } = event.detail;
    let response = { id, jsonrpc: '2.0' };
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
                chrome.runtime.sendMessage({ type: 'SEND_TRANSACTION', transaction: params[0] }, (resp) => {
                    const txResponse = {
                        id,
                        jsonrpc: '2.0'
                    };
                    if (resp && resp.success) {
                        txResponse.result = resp.data;
                    }
                    else {
                        txResponse.error = {
                            code: 4001, // User rejected
                            message: resp ? resp.error : 'Transaction rejected'
                        };
                    }
                    // Send response back to page
                    document.dispatchEvent(new CustomEvent('KNOT_WALLET_RESPONSE', { detail: txResponse }));
                });
                // Don't send an immediate response, will send async
                return;
            default:
                // Unsupported method
                response.error = {
                    code: -32601,
                    message: `Method ${method} not supported`
                };
        }
    }
    catch (error) {
        console.error('Error processing request:', error);
        response.error = {
            code: -32603,
            message: 'Internal error'
        };
    }
    // Send response back to page
    document.dispatchEvent(new CustomEvent('KNOT_WALLET_RESPONSE', { detail: response }));
});
// Listen for requests from the injected script
document.addEventListener('KNOT_WALLET_REQUEST', (e) => {
    handleRequest(e);
});
// Only inject on HTML pages, not on other resources
if (document.contentType === 'text/html') {
    // Execute when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectScript);
    }
    else {
        injectScript();
    }
}
// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CHAIN_CHANGED') {
        // Notify the page that the chain has changed
        document.dispatchEvent(new CustomEvent('KNOT_WALLET_CHAIN_CHANGED', {
            detail: { chainId: message.chainId }
        }));
        sendResponse({ success: true });
    }
    return false;
});
console.log('Knot Wallet content script loaded');


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/contentScript/index.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFNjcmlwdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGdCQUFnQjtBQUNsRCxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFCQUFxQjtBQUNqQyxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGtEQUFrRDtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUZBQXFGLG9CQUFvQjtBQUN6RyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFFBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxrQkFBa0I7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsU0FBUztBQUNULHVCQUF1QixlQUFlO0FBQ3RDO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O1VFM0xBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rbm90LXdhbGxldC8uL3NyYy9jb250ZW50U2NyaXB0L2luZGV4LnRzIiwid2VicGFjazovL2tub3Qtd2FsbGV0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8va25vdC13YWxsZXQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2tub3Qtd2FsbGV0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIENvbnRlbnQgc2NyaXB0IGZvciBLbm90IFdhbGxldCBDaHJvbWUgZXh0ZW5zaW9uXG4vLyBUaGlzIHNjcmlwdCBydW5zIGluIHRoZSBjb250ZXh0IG9mIHdlYiBwYWdlc1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vLyBJbmplY3QgYSBzY3JpcHQgdG8gZGV0ZWN0IFdlYjMgcHJvdmlkZXIgcmVxdWVzdHNcbmNvbnN0IGluamVjdFNjcmlwdCA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LnRleHRDb250ZW50ID0gYFxuICAgICAgLy8gVGhpcyBjb2RlIHJ1bnMgaW4gdGhlIHBhZ2UgY29udGV4dFxuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBTdG9yZSB0aGUgb3JpZ2luYWwgd2luZG93LmV0aGVyZXVtIGlmIGl0IGV4aXN0c1xuICAgICAgICBjb25zdCBvcmlnaW5hbEV0aGVyZXVtID0gd2luZG93LmV0aGVyZXVtO1xuICAgICAgICBcbiAgICAgICAgLy8gS25vdCBwcm92aWRlciB0byBpbnRlcmNlcHQgcmVxdWVzdHNcbiAgICAgICAgY29uc3Qga25vdFByb3ZpZGVyID0ge1xuICAgICAgICAgIGlzS25vdDogdHJ1ZSxcbiAgICAgICAgICBjaGFpbklkOiAnMHgxJywgLy8gRGVmYXVsdCB0byBFdGhlcmV1bSBNYWlubmV0XG4gICAgICAgICAgbmV0d29ya1ZlcnNpb246ICcxJyxcbiAgICAgICAgICBpc0Nvbm5lY3RlZDogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBSUEMgcmVxdWVzdCBoYW5kbGVyXG4gICAgICAgICAgcmVxdWVzdDogYXN5bmMgZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgY3VzdG9tIGV2ZW50IHRvIGNvbW11bmljYXRlIHdpdGggdGhlIGNvbnRlbnQgc2NyaXB0XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnS05PVF9XQUxMRVRfUkVRVUVTVCcsIHtcbiAgICAgICAgICAgICAgZGV0YWlsOiB7IGlkOiBEYXRlLm5vdygpLCBqc29ucnBjOiAnMi4wJywgLi4uYXJncyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIHRoZSByZXNwb25zZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGV0YWlsLmlkID09PSBldmVudC5kZXRhaWwuaWQpIHtcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0tOT1RfV0FMTEVUX1JFU1BPTlNFJywgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICBpZiAoZS5kZXRhaWwuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUuZGV0YWlsLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZS5kZXRhaWwucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdLTk9UX1dBTExFVF9SRVNQT05TRScsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBMZWdhY3kgQVBJIHN1cHBvcnRcbiAgICAgICAgICBzZW5kOiBmdW5jdGlvbihtZXRob2QsIHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCh7IG1ldGhvZCwgcGFyYW1zIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXG4gICAgICAgICAgLy8gRm9yIEVJUC0xMTkzIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICBvbjogZnVuY3Rpb24oZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGxvZ2ljIGhlcmVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdLbm90IHByb3ZpZGVyIGV2ZW50IHJlZ2lzdGVyZWQ6JywgZXZlbnROYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXG4gICAgICAgICAgcmVtb3ZlTGlzdGVuZXI6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lciBsb2dpYyBoZXJlXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvLyBPbmx5IGluamVjdCBpZiBub3QgYWxyZWFkeSBwcmVzZW50XG4gICAgICAgIGlmICghd2luZG93LmV0aGVyZXVtIHx8ICF3aW5kb3cuZXRoZXJldW0uaXNLbm90KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0luamVjdGluZyBLbm90IFdhbGxldCBwcm92aWRlcicpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIElmIGV0aGVyZXVtIGFscmVhZHkgZXhpc3RzLCBwcmVzZXJ2ZSBpdHMgcHJvcGVydGllc1xuICAgICAgICAgIGlmICh3aW5kb3cuZXRoZXJldW0pIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHdpbmRvdy5ldGhlcmV1bSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWtub3RQcm92aWRlcltrZXldKSB7XG4gICAgICAgICAgICAgICAga25vdFByb3ZpZGVyW2tleV0gPSB3aW5kb3cuZXRoZXJldW1ba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIGV0aGVyZXVtIG9iamVjdFxuICAgICAgICAgIHdpbmRvdy5ldGhlcmV1bSA9IGtub3RQcm92aWRlcjtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBOb3RpZnkgZEFwcCB0aGF0IHRoZSBwcm92aWRlciBjaGFuZ2VkXG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdldGhlcmV1bSNpbml0aWFsaXplZCcpKTtcbiAgICAgICAgfVxuICAgICAgfSkoKTtcbiAgICBgO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIHNjcmlwdC5yZW1vdmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0tub3QgV2FsbGV0IHByb3ZpZGVyIGluamVjdGVkJyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbmplY3RpbmcgS25vdCBXYWxsZXQgcHJvdmlkZXI6JywgZXJyb3IpO1xuICAgIH1cbn07XG4vLyBIYW5kbGUgcmVxdWVzdHMgZnJvbSB0aGUgcGFnZVxuY29uc3QgaGFuZGxlUmVxdWVzdCA9IChldmVudCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc29sZS5sb2coJ1JlY2VpdmVkIHJlcXVlc3QgZnJvbSBwYWdlOicsIGV2ZW50LmRldGFpbCk7XG4gICAgY29uc3QgeyBpZCwgbWV0aG9kLCBwYXJhbXMgfSA9IGV2ZW50LmRldGFpbDtcbiAgICBsZXQgcmVzcG9uc2UgPSB7IGlkLCBqc29ucnBjOiAnMi4wJyB9O1xuICAgIHRyeSB7XG4gICAgICAgIC8vIFByb2Nlc3MgZGlmZmVyZW50IFJQQyBtZXRob2RzXG4gICAgICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgICAgICBjYXNlICdldGhfcmVxdWVzdEFjY291bnRzJzpcbiAgICAgICAgICAgIGNhc2UgJ2V0aF9hY2NvdW50cyc6XG4gICAgICAgICAgICAgICAgLy8gU2VuZCBtZXNzYWdlIHRvIGJhY2tncm91bmQgc2NyaXB0IHRvIGdldCBhY2NvdW50c1xuICAgICAgICAgICAgICAgIC8vIEZvciBkZW1vLCByZXR1cm4gYSBtb2NrIGFjY291bnRcbiAgICAgICAgICAgICAgICByZXNwb25zZS5yZXN1bHQgPSBbJzB4MTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3OCddO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZXRoX2NoYWluSWQnOlxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgY3VycmVudCBjaGFpbiBJRFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlc3VsdCA9ICcweDEnOyAvLyBFdGhlcmV1bSBNYWlubmV0XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdldGhfZ2V0QmFsYW5jZSc6XG4gICAgICAgICAgICAgICAgLy8gRm9yIGRlbW8sIHJldHVybiBhIG1vY2sgYmFsYW5jZVxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlc3VsdCA9ICcweDFCQzE2RDY3NEVDODAwMDAnOyAvLyAyIEVUSCBpbiBoZXhcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2V0aF9zZW5kVHJhbnNhY3Rpb24nOlxuICAgICAgICAgICAgICAgIC8vIEZvcndhcmQgdG8gZXh0ZW5zaW9uIGZvciB1c2VyIGNvbmZpcm1hdGlvblxuICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ1NFTkRfVFJBTlNBQ1RJT04nLCB0cmFuc2FjdGlvbjogcGFyYW1zWzBdIH0sIChyZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHR4UmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzb25ycGM6ICcyLjAnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwICYmIHJlc3Auc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHhSZXNwb25zZS5yZXN1bHQgPSByZXNwLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eFJlc3BvbnNlLmVycm9yID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IDQwMDEsIC8vIFVzZXIgcmVqZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNwID8gcmVzcC5lcnJvciA6ICdUcmFuc2FjdGlvbiByZWplY3RlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCByZXNwb25zZSBiYWNrIHRvIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ0tOT1RfV0FMTEVUX1JFU1BPTlNFJywgeyBkZXRhaWw6IHR4UmVzcG9uc2UgfSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIERvbid0IHNlbmQgYW4gaW1tZWRpYXRlIHJlc3BvbnNlLCB3aWxsIHNlbmQgYXN5bmNcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIFVuc3VwcG9ydGVkIG1ldGhvZFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yID0ge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiAtMzI2MDEsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBNZXRob2QgJHttZXRob2R9IG5vdCBzdXBwb3J0ZWRgXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcHJvY2Vzc2luZyByZXF1ZXN0OicsIGVycm9yKTtcbiAgICAgICAgcmVzcG9uc2UuZXJyb3IgPSB7XG4gICAgICAgICAgICBjb2RlOiAtMzI2MDMsXG4gICAgICAgICAgICBtZXNzYWdlOiAnSW50ZXJuYWwgZXJyb3InXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIFNlbmQgcmVzcG9uc2UgYmFjayB0byBwYWdlXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ0tOT1RfV0FMTEVUX1JFU1BPTlNFJywgeyBkZXRhaWw6IHJlc3BvbnNlIH0pKTtcbn0pO1xuLy8gTGlzdGVuIGZvciByZXF1ZXN0cyBmcm9tIHRoZSBpbmplY3RlZCBzY3JpcHRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0tOT1RfV0FMTEVUX1JFUVVFU1QnLCAoZSkgPT4ge1xuICAgIGhhbmRsZVJlcXVlc3QoZSk7XG59KTtcbi8vIE9ubHkgaW5qZWN0IG9uIEhUTUwgcGFnZXMsIG5vdCBvbiBvdGhlciByZXNvdXJjZXNcbmlmIChkb2N1bWVudC5jb250ZW50VHlwZSA9PT0gJ3RleHQvaHRtbCcpIHtcbiAgICAvLyBFeGVjdXRlIHdoZW4gRE9NIGlzIHJlYWR5XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5qZWN0U2NyaXB0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGluamVjdFNjcmlwdCgpO1xuICAgIH1cbn1cbi8vIExpc3RlbiBmb3IgbWVzc2FnZXMgZnJvbSB0aGUgYmFja2dyb3VuZCBzY3JpcHRcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICBpZiAobWVzc2FnZS50eXBlID09PSAnQ0hBSU5fQ0hBTkdFRCcpIHtcbiAgICAgICAgLy8gTm90aWZ5IHRoZSBwYWdlIHRoYXQgdGhlIGNoYWluIGhhcyBjaGFuZ2VkXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdLTk9UX1dBTExFVF9DSEFJTl9DSEFOR0VEJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7IGNoYWluSWQ6IG1lc3NhZ2UuY2hhaW5JZCB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufSk7XG5jb25zb2xlLmxvZygnS25vdCBXYWxsZXQgY29udGVudCBzY3JpcHQgbG9hZGVkJyk7XG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vc3JjL2NvbnRlbnRTY3JpcHQvaW5kZXgudHNcIl0oKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==