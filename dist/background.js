/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services/blockchain.service.ts":
/*!********************************************!*\
  !*** ./src/services/blockchain.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockchainService: () => (/* binding */ BlockchainService)
/* harmony export */ });
/* harmony import */ var _types_blockchain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/blockchain */ "./src/types/blockchain.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// Mock implementation of BlockchainService for testing purposes
class BlockchainService {
    /**
     * Initialize blockchain providers
     */
    static initProviders() {
        return __awaiter(this, arguments, void 0, function* (apiKey = '') {
            console.log('Initializing providers with API key:', apiKey || 'none');
            // Initialize network statuses for all chains
            _types_blockchain__WEBPACK_IMPORTED_MODULE_0__.SUPPORTED_CHAINS.forEach(chain => {
                this.networkStatus[chain.id] = {
                    chainId: chain.id,
                    isConnected: true,
                    latency: Math.floor(Math.random() * 200) + 50, // Random latency between 50-250ms
                    lastBlock: 10000000 + Math.floor(Math.random() * 1000000),
                    gasPrice: chain.id === '1' ? '20' : undefined
                };
            });
            return Promise.resolve();
        });
    }
    /**
     * Get provider for a specific chain
     */
    static getProvider(chainId_1) {
        return __awaiter(this, arguments, void 0, function* (chainId, apiKey = '') {
            console.log(`Getting provider for chain ${chainId}`);
            // In testing mode, just return a mock provider
            return Promise.resolve({
                getBalance: () => Promise.resolve('1000000000000000000'),
                getBlockNumber: () => Promise.resolve(10000000),
                getGasPrice: () => Promise.resolve('20000000000')
            });
        });
    }
    /**
     * Get native token balance for an address
     */
    static getBalance(chainId, address) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Getting balance for ${address} on chain ${chainId}`);
            // Return mock balance
            const mockBalances = {
                '1': '1500000000000000000', // 1.5 ETH
                '137': '2000000000000000000', // 2 MATIC
                'solana': '5000000000', // 5 SOL
                '56': '3000000000000000000', // 3 BNB
                '43114': '10000000000000000000', // 10 AVAX
                '42161': '1200000000000000000', // 1.2 ETH (Arbitrum)
                '10': '1800000000000000000', // 1.8 ETH (Optimism)
                'cosmos': '12000000', // 12 ATOM
                'bitcoin': '5000000', // 0.05 BTC
                'tron': '5000000000', // 5000 TRX
            };
            return Promise.resolve(mockBalances[chainId] || '0');
        });
    }
    /**
     * Get token balances for an address
     */
    static getTokenBalances(chainId_1, address_1) {
        return __awaiter(this, arguments, void 0, function* (chainId, address, apiKey = '') {
            console.log(`Getting token balances for ${address} on chain ${chainId}`);
            // Return mock tokens based on chainId
            const mockTokens = {
                '1': [
                    {
                        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                        name: 'USD Coin',
                        symbol: 'USDC',
                        decimals: 6,
                        chainId: '1',
                        balance: '2500000000', // 2500 USDC
                        dollarValue: 2500,
                        logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg'
                    },
                    {
                        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                        name: 'Tether',
                        symbol: 'USDT',
                        decimals: 6,
                        chainId: '1',
                        balance: '1800000000', // 1800 USDT
                        dollarValue: 1800,
                        logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.svg'
                    }
                ],
                '137': [
                    {
                        address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
                        name: 'USD Coin',
                        symbol: 'USDC',
                        decimals: 6,
                        chainId: '137',
                        balance: '500000000', // 500 USDC
                        dollarValue: 500,
                        logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg'
                    }
                ]
            };
            return Promise.resolve(mockTokens[chainId] || []);
        });
    }
    /**
     * Get recent transactions
     */
    static getRecentTransactions(chainId_1, address_1) {
        return __awaiter(this, arguments, void 0, function* (chainId, address, limit = 10) {
            console.log(`Getting transactions for ${address} on chain ${chainId}`);
            // Return mock transactions
            const now = Math.floor(Date.now() / 1000);
            const mockTransactions = [
                {
                    hash: `0x${Math.random().toString(16).substring(2, 42)}`,
                    from: address,
                    to: `0x${Math.random().toString(16).substring(2, 42)}`,
                    value: '1000000000000000000', // 1 ETH
                    gasPrice: '20000000000', // 20 gwei
                    gasLimit: '21000',
                    chainId,
                    nonce: 42,
                    data: '0x',
                    status: 'confirmed',
                    timestamp: now - 3600, // 1 hour ago
                    blockNumber: 16123456,
                },
                {
                    hash: `0x${Math.random().toString(16).substring(2, 42)}`,
                    from: `0x${Math.random().toString(16).substring(2, 42)}`,
                    to: address,
                    value: '500000000000000000', // 0.5 ETH
                    gasPrice: '25000000000', // 25 gwei
                    gasLimit: '21000',
                    chainId,
                    nonce: 123,
                    data: '0x',
                    status: 'confirmed',
                    timestamp: now - 86400, // 1 day ago
                    blockNumber: 16123400,
                },
                {
                    hash: `0x${Math.random().toString(16).substring(2, 42)}`,
                    from: address,
                    to: `0x${Math.random().toString(16).substring(2, 42)}`,
                    value: '100000000', // 0.1 MATIC
                    gasPrice: '30000000000', // 30 gwei
                    gasLimit: '21000',
                    chainId,
                    nonce: 7,
                    data: '0x',
                    status: 'pending',
                    timestamp: now - 300, // 5 minutes ago
                    blockNumber: 45678901,
                }
            ];
            return Promise.resolve(mockTransactions.slice(0, limit));
        });
    }
    /**
     * Send a transaction (Mock implementation)
     */
    static sendTransaction(chainId, transaction, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Sending transaction on chain ${chainId}`);
            // In test mode, just return a mock transaction hash
            const txHash = `0x${Math.random().toString(16).substring(2, 66)}`;
            return Promise.resolve(txHash);
        });
    }
    /**
     * Update the status of a specific network
     */
    static updateNetworkStatus(chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Updating network status for chain ${chainId}`);
            // Create mock status
            const status = {
                chainId,
                isConnected: Math.random() > 0.1, // 90% chance of being connected
                latency: Math.floor(Math.random() * 500), // 0-500ms latency
                lastBlock: 10000000 + Math.floor(Math.random() * 1000000),
                gasPrice: chainId === '1' ? '20' : undefined // Only ETH has gas price for demo
            };
            // Update stored status
            this.networkStatus[chainId] = status;
            return Promise.resolve(status);
        });
    }
    /**
     * Get network statuses for all chains
     */
    static getAllNetworkStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Getting all network statuses');
            // Update all network statuses
            yield Promise.all(_types_blockchain__WEBPACK_IMPORTED_MODULE_0__.SUPPORTED_CHAINS.map(chain => this.updateNetworkStatus(chain.id)));
            return Promise.resolve(this.networkStatus);
        });
    }
}
BlockchainService.networkStatus = {};


/***/ }),

/***/ "./src/types/blockchain.ts":
/*!*********************************!*\
  !*** ./src/types/blockchain.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SUPPORTED_CHAINS: () => (/* binding */ SUPPORTED_CHAINS)
/* harmony export */ });
const SUPPORTED_CHAINS = [
    {
        id: '1',
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
        explorerUrl: 'https://etherscan.io',
        logo: 'ethereum.svg',
        isTestnet: false
    },
    {
        id: '137',
        name: 'Polygon',
        symbol: 'MATIC',
        decimals: 18,
        rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
        explorerUrl: 'https://polygonscan.com',
        logo: 'polygon.svg',
        isTestnet: false
    },
    {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        decimals: 9,
        rpcUrl: 'https://api.mainnet-beta.solana.com',
        explorerUrl: 'https://solscan.io',
        logo: 'solana.svg',
        isTestnet: false
    },
    {
        id: '56',
        name: 'Binance Smart Chain',
        symbol: 'BNB',
        decimals: 18,
        rpcUrl: 'https://bsc-dataseed.binance.org',
        explorerUrl: 'https://bscscan.com',
        logo: 'binance.svg',
        isTestnet: false
    },
    {
        id: '43114',
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18,
        rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
        explorerUrl: 'https://snowtrace.io',
        logo: 'avalanche.svg',
        isTestnet: false
    },
    {
        id: '42161',
        name: 'Arbitrum',
        symbol: 'ETH',
        decimals: 18,
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        explorerUrl: 'https://arbiscan.io',
        logo: 'arbitrum.svg',
        isTestnet: false
    },
    {
        id: '10',
        name: 'Optimism',
        symbol: 'ETH',
        decimals: 18,
        rpcUrl: 'https://mainnet.optimism.io',
        explorerUrl: 'https://optimistic.etherscan.io',
        logo: 'optimism.svg',
        isTestnet: false
    },
    {
        id: 'cosmos',
        name: 'Cosmos',
        symbol: 'ATOM',
        decimals: 6,
        rpcUrl: 'https://rpc.cosmos.network',
        explorerUrl: 'https://mintscan.io/cosmos',
        logo: 'cosmos.svg',
        isTestnet: false
    },
    {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        decimals: 8,
        rpcUrl: 'https://btc.getblock.io/mainnet/',
        explorerUrl: 'https://www.blockchain.com/explorer',
        logo: 'bitcoin.svg',
        isTestnet: false
    },
    {
        id: 'tron',
        name: 'Tron',
        symbol: 'TRX',
        decimals: 6,
        rpcUrl: 'https://api.trongrid.io',
        explorerUrl: 'https://tronscan.org',
        logo: 'tron.svg',
        isTestnet: false
    }
];


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/background/index.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_blockchain_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/blockchain.service */ "./src/services/blockchain.service.ts");
// Background script for the Knot Wallet Chrome extension

// Initialize the extension when installed
chrome.runtime.onInstalled.addListener(details => {
    console.log('Knot Wallet installed!', details);
    // Initialize blockchain providers (would use an API key in production)
    _services_blockchain_service__WEBPACK_IMPORTED_MODULE_0__.BlockchainService.initProviders()
        .catch(error => console.error('Error initializing providers:', error));
    // Set up context menu (optional)
    chrome.contextMenus.create({
        id: 'knot-wallet',
        title: 'Knot Wallet',
        contexts: ['all']
    });
});
// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message, 'from:', sender);
    // Handle different message types
    switch (message.type) {
        case 'GET_NETWORK_STATUS':
            // Get network status for a specific chain
            _services_blockchain_service__WEBPACK_IMPORTED_MODULE_0__.BlockchainService.updateNetworkStatus(message.chainId)
                .then(status => sendResponse({ success: true, data: status }))
                .catch(error => sendResponse({ success: false, error: error.message }));
            return true; // Keep the channel open for async response
        case 'GET_BALANCE':
            // Get balance for an address on a specific chain
            _services_blockchain_service__WEBPACK_IMPORTED_MODULE_0__.BlockchainService.getBalance(message.chainId, message.address)
                .then(balance => sendResponse({ success: true, data: balance }))
                .catch(error => sendResponse({ success: false, error: error.message }));
            return true; // Keep the channel open for async response
        case 'SEND_TRANSACTION':
            // Send a transaction
            // In a real app, this would require user confirmation
            console.log('Transaction request received - would prompt user');
            sendResponse({ success: false, error: 'Manual sending not implemented in demo' });
            return false;
        default:
            console.warn('Unknown message type:', message.type);
            sendResponse({ success: false, error: 'Unknown message type' });
            return false;
    }
});
// Set up an alarm to periodically update network statuses
chrome.alarms.create('updateNetworkStatus', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === 'updateNetworkStatus') {
        console.log('Updating network statuses...');
        // Update network statuses for all chains
        _services_blockchain_service__WEBPACK_IMPORTED_MODULE_0__.BlockchainService.getAllNetworkStatuses()
            .then(statuses => {
            // Store updated statuses in local storage for quick access
            chrome.storage.local.set({ networkStatuses: statuses });
            console.log('Network statuses updated');
        })
            .catch(error => console.error('Error updating network statuses:', error));
    }
});
// Handle connection to extension
chrome.runtime.onConnect.addListener(port => {
    console.log('Port connected:', port.name);
    port.onMessage.addListener(message => {
        console.log('Port message received:', message);
        // Handle long-lived connection messages
        // This is useful for operations that require ongoing communication
    });
    port.onDisconnect.addListener(() => {
        console.log('Port disconnected:', port.name);
    });
});
// Log when extension is loaded
console.log('Knot Wallet background script loaded');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDdUQ7QUFDdkQ7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrREFBZ0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFFBQVE7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFNBQVMsV0FBVyxRQUFRO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFNBQVMsV0FBVyxRQUFRO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsU0FBUyxXQUFXLFFBQVE7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNENBQTRDO0FBQzNFO0FBQ0EsNkJBQTZCLDRDQUE0QztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSwrQkFBK0IsNENBQTRDO0FBQzNFLCtCQUErQiw0Q0FBNEM7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSwrQkFBK0IsNENBQTRDO0FBQzNFO0FBQ0EsNkJBQTZCLDRDQUE0QztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELFFBQVE7QUFDaEU7QUFDQSxnQ0FBZ0MsNENBQTRDO0FBQzVFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxRQUFRO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwrREFBZ0I7QUFDOUM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsTk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGdCQUFnQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxnQkFBZ0I7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDckdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksMkVBQWlCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDJFQUFpQjtBQUM3QiwrQ0FBK0MsNkJBQTZCO0FBQzVFLCtDQUErQyxzQ0FBc0M7QUFDckYseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxZQUFZLDJFQUFpQjtBQUM3QixnREFBZ0QsOEJBQThCO0FBQzlFLCtDQUErQyxzQ0FBc0M7QUFDckYseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGlFQUFpRTtBQUM1RjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsK0NBQStDO0FBQzFFO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSw4Q0FBOEMsb0JBQW9CO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwyRUFBaUI7QUFDekI7QUFDQTtBQUNBLHVDQUF1QywyQkFBMkI7QUFDbEU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25vdC13YWxsZXQvLi9zcmMvc2VydmljZXMvYmxvY2tjaGFpbi5zZXJ2aWNlLnRzIiwid2VicGFjazovL2tub3Qtd2FsbGV0Ly4vc3JjL3R5cGVzL2Jsb2NrY2hhaW4udHMiLCJ3ZWJwYWNrOi8va25vdC13YWxsZXQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va25vdC13YWxsZXQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tub3Qtd2FsbGV0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va25vdC13YWxsZXQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rbm90LXdhbGxldC8uL3NyYy9iYWNrZ3JvdW5kL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgU1VQUE9SVEVEX0NIQUlOUyB9IGZyb20gJy4uL3R5cGVzL2Jsb2NrY2hhaW4nO1xuLy8gTW9jayBpbXBsZW1lbnRhdGlvbiBvZiBCbG9ja2NoYWluU2VydmljZSBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuZXhwb3J0IGNsYXNzIEJsb2NrY2hhaW5TZXJ2aWNlIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGJsb2NrY2hhaW4gcHJvdmlkZXJzXG4gICAgICovXG4gICAgc3RhdGljIGluaXRQcm92aWRlcnMoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgYXJndW1lbnRzLCB2b2lkIDAsIGZ1bmN0aW9uKiAoYXBpS2V5ID0gJycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgcHJvdmlkZXJzIHdpdGggQVBJIGtleTonLCBhcGlLZXkgfHwgJ25vbmUnKTtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgbmV0d29yayBzdGF0dXNlcyBmb3IgYWxsIGNoYWluc1xuICAgICAgICAgICAgU1VQUE9SVEVEX0NIQUlOUy5mb3JFYWNoKGNoYWluID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5ldHdvcmtTdGF0dXNbY2hhaW4uaWRdID0ge1xuICAgICAgICAgICAgICAgICAgICBjaGFpbklkOiBjaGFpbi5pZCxcbiAgICAgICAgICAgICAgICAgICAgaXNDb25uZWN0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxhdGVuY3k6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwMCkgKyA1MCwgLy8gUmFuZG9tIGxhdGVuY3kgYmV0d2VlbiA1MC0yNTBtc1xuICAgICAgICAgICAgICAgICAgICBsYXN0QmxvY2s6IDEwMDAwMDAwICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCksXG4gICAgICAgICAgICAgICAgICAgIGdhc1ByaWNlOiBjaGFpbi5pZCA9PT0gJzEnID8gJzIwJyA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBwcm92aWRlciBmb3IgYSBzcGVjaWZpYyBjaGFpblxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRQcm92aWRlcihjaGFpbklkXzEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCBhcmd1bWVudHMsIHZvaWQgMCwgZnVuY3Rpb24qIChjaGFpbklkLCBhcGlLZXkgPSAnJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEdldHRpbmcgcHJvdmlkZXIgZm9yIGNoYWluICR7Y2hhaW5JZH1gKTtcbiAgICAgICAgICAgIC8vIEluIHRlc3RpbmcgbW9kZSwganVzdCByZXR1cm4gYSBtb2NrIHByb3ZpZGVyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICAgICAgICBnZXRCYWxhbmNlOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoJzEwMDAwMDAwMDAwMDAwMDAwMDAnKSxcbiAgICAgICAgICAgICAgICBnZXRCbG9ja051bWJlcjogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKDEwMDAwMDAwKSxcbiAgICAgICAgICAgICAgICBnZXRHYXNQcmljZTogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCcyMDAwMDAwMDAwMCcpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBuYXRpdmUgdG9rZW4gYmFsYW5jZSBmb3IgYW4gYWRkcmVzc1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRCYWxhbmNlKGNoYWluSWQsIGFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBHZXR0aW5nIGJhbGFuY2UgZm9yICR7YWRkcmVzc30gb24gY2hhaW4gJHtjaGFpbklkfWApO1xuICAgICAgICAgICAgLy8gUmV0dXJuIG1vY2sgYmFsYW5jZVxuICAgICAgICAgICAgY29uc3QgbW9ja0JhbGFuY2VzID0ge1xuICAgICAgICAgICAgICAgICcxJzogJzE1MDAwMDAwMDAwMDAwMDAwMDAnLCAvLyAxLjUgRVRIXG4gICAgICAgICAgICAgICAgJzEzNyc6ICcyMDAwMDAwMDAwMDAwMDAwMDAwJywgLy8gMiBNQVRJQ1xuICAgICAgICAgICAgICAgICdzb2xhbmEnOiAnNTAwMDAwMDAwMCcsIC8vIDUgU09MXG4gICAgICAgICAgICAgICAgJzU2JzogJzMwMDAwMDAwMDAwMDAwMDAwMDAnLCAvLyAzIEJOQlxuICAgICAgICAgICAgICAgICc0MzExNCc6ICcxMDAwMDAwMDAwMDAwMDAwMDAwMCcsIC8vIDEwIEFWQVhcbiAgICAgICAgICAgICAgICAnNDIxNjEnOiAnMTIwMDAwMDAwMDAwMDAwMDAwMCcsIC8vIDEuMiBFVEggKEFyYml0cnVtKVxuICAgICAgICAgICAgICAgICcxMCc6ICcxODAwMDAwMDAwMDAwMDAwMDAwJywgLy8gMS44IEVUSCAoT3B0aW1pc20pXG4gICAgICAgICAgICAgICAgJ2Nvc21vcyc6ICcxMjAwMDAwMCcsIC8vIDEyIEFUT01cbiAgICAgICAgICAgICAgICAnYml0Y29pbic6ICc1MDAwMDAwJywgLy8gMC4wNSBCVENcbiAgICAgICAgICAgICAgICAndHJvbic6ICc1MDAwMDAwMDAwJywgLy8gNTAwMCBUUlhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1vY2tCYWxhbmNlc1tjaGFpbklkXSB8fCAnMCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRva2VuIGJhbGFuY2VzIGZvciBhbiBhZGRyZXNzXG4gICAgICovXG4gICAgc3RhdGljIGdldFRva2VuQmFsYW5jZXMoY2hhaW5JZF8xLCBhZGRyZXNzXzEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCBhcmd1bWVudHMsIHZvaWQgMCwgZnVuY3Rpb24qIChjaGFpbklkLCBhZGRyZXNzLCBhcGlLZXkgPSAnJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEdldHRpbmcgdG9rZW4gYmFsYW5jZXMgZm9yICR7YWRkcmVzc30gb24gY2hhaW4gJHtjaGFpbklkfWApO1xuICAgICAgICAgICAgLy8gUmV0dXJuIG1vY2sgdG9rZW5zIGJhc2VkIG9uIGNoYWluSWRcbiAgICAgICAgICAgIGNvbnN0IG1vY2tUb2tlbnMgPSB7XG4gICAgICAgICAgICAgICAgJzEnOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6ICcweEEwYjg2OTkxYzYyMThiMzZjMWQxOUQ0YTJlOUViMGNFMzYwNmVCNDgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1VTRCBDb2luJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ1VTREMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjaW1hbHM6IDYsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFpbklkOiAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWxhbmNlOiAnMjUwMDAwMDAwMCcsIC8vIDI1MDAgVVNEQ1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9sbGFyVmFsdWU6IDI1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dvVVJJOiAnaHR0cHM6Ly9jcnlwdG9sb2dvcy5jYy9sb2dvcy91c2QtY29pbi11c2RjLWxvZ28uc3ZnJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnMHhkQUMxN0Y5NThEMmVlNTIzYTIyMDYyMDY5OTQ1OTdDMTNEODMxZWM3JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdUZXRoZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnVVNEVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNpbWFsczogNixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWluSWQ6ICcxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbGFuY2U6ICcxODAwMDAwMDAwJywgLy8gMTgwMCBVU0RUXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2xsYXJWYWx1ZTogMTgwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ29VUkk6ICdodHRwczovL2NyeXB0b2xvZ29zLmNjL2xvZ29zL3RldGhlci11c2R0LWxvZ28uc3ZnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAnMTM3JzogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiAnMHgyNzkxQmNhMWYyZGU0NjYxRUQ4OEEzMEM5OUE3YTk0NDlBYTg0MTc0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdVU0QgQ29pbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2w6ICdVU0RDJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY2ltYWxzOiA2LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhaW5JZDogJzEzNycsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWxhbmNlOiAnNTAwMDAwMDAwJywgLy8gNTAwIFVTRENcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbGxhclZhbHVlOiA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dvVVJJOiAnaHR0cHM6Ly9jcnlwdG9sb2dvcy5jYy9sb2dvcy91c2QtY29pbi11c2RjLWxvZ28uc3ZnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobW9ja1Rva2Vuc1tjaGFpbklkXSB8fCBbXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgcmVjZW50IHRyYW5zYWN0aW9uc1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRSZWNlbnRUcmFuc2FjdGlvbnMoY2hhaW5JZF8xLCBhZGRyZXNzXzEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCBhcmd1bWVudHMsIHZvaWQgMCwgZnVuY3Rpb24qIChjaGFpbklkLCBhZGRyZXNzLCBsaW1pdCA9IDEwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgR2V0dGluZyB0cmFuc2FjdGlvbnMgZm9yICR7YWRkcmVzc30gb24gY2hhaW4gJHtjaGFpbklkfWApO1xuICAgICAgICAgICAgLy8gUmV0dXJuIG1vY2sgdHJhbnNhY3Rpb25zXG4gICAgICAgICAgICBjb25zdCBub3cgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgIGNvbnN0IG1vY2tUcmFuc2FjdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoYXNoOiBgMHgke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygyLCA0Mil9YCxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgdG86IGAweCR7TWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDIsIDQyKX1gLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzEwMDAwMDAwMDAwMDAwMDAwMDAnLCAvLyAxIEVUSFxuICAgICAgICAgICAgICAgICAgICBnYXNQcmljZTogJzIwMDAwMDAwMDAwJywgLy8gMjAgZ3dlaVxuICAgICAgICAgICAgICAgICAgICBnYXNMaW1pdDogJzIxMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgY2hhaW5JZCxcbiAgICAgICAgICAgICAgICAgICAgbm9uY2U6IDQyLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAnMHgnLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjb25maXJtZWQnLFxuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5vdyAtIDM2MDAsIC8vIDEgaG91ciBhZ29cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tOdW1iZXI6IDE2MTIzNDU2LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoYXNoOiBgMHgke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygyLCA0Mil9YCxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogYDB4JHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMiwgNDIpfWAsXG4gICAgICAgICAgICAgICAgICAgIHRvOiBhZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzUwMDAwMDAwMDAwMDAwMDAwMCcsIC8vIDAuNSBFVEhcbiAgICAgICAgICAgICAgICAgICAgZ2FzUHJpY2U6ICcyNTAwMDAwMDAwMCcsIC8vIDI1IGd3ZWlcbiAgICAgICAgICAgICAgICAgICAgZ2FzTGltaXQ6ICcyMTAwMCcsXG4gICAgICAgICAgICAgICAgICAgIGNoYWluSWQsXG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiAxMjMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICcweCcsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NvbmZpcm1lZCcsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbm93IC0gODY0MDAsIC8vIDEgZGF5IGFnb1xuICAgICAgICAgICAgICAgICAgICBibG9ja051bWJlcjogMTYxMjM0MDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhhc2g6IGAweCR7TWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDIsIDQyKX1gLFxuICAgICAgICAgICAgICAgICAgICBmcm9tOiBhZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICB0bzogYDB4JHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMiwgNDIpfWAsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnMTAwMDAwMDAwJywgLy8gMC4xIE1BVElDXG4gICAgICAgICAgICAgICAgICAgIGdhc1ByaWNlOiAnMzAwMDAwMDAwMDAnLCAvLyAzMCBnd2VpXG4gICAgICAgICAgICAgICAgICAgIGdhc0xpbWl0OiAnMjEwMDAnLFxuICAgICAgICAgICAgICAgICAgICBjaGFpbklkLFxuICAgICAgICAgICAgICAgICAgICBub25jZTogNyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJzB4JyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAncGVuZGluZycsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbm93IC0gMzAwLCAvLyA1IG1pbnV0ZXMgYWdvXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrTnVtYmVyOiA0NTY3ODkwMSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtb2NrVHJhbnNhY3Rpb25zLnNsaWNlKDAsIGxpbWl0KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgdHJhbnNhY3Rpb24gKE1vY2sgaW1wbGVtZW50YXRpb24pXG4gICAgICovXG4gICAgc3RhdGljIHNlbmRUcmFuc2FjdGlvbihjaGFpbklkLCB0cmFuc2FjdGlvbiwgcHJpdmF0ZUtleSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFNlbmRpbmcgdHJhbnNhY3Rpb24gb24gY2hhaW4gJHtjaGFpbklkfWApO1xuICAgICAgICAgICAgLy8gSW4gdGVzdCBtb2RlLCBqdXN0IHJldHVybiBhIG1vY2sgdHJhbnNhY3Rpb24gaGFzaFxuICAgICAgICAgICAgY29uc3QgdHhIYXNoID0gYDB4JHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMiwgNjYpfWA7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHR4SGFzaCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHN0YXR1cyBvZiBhIHNwZWNpZmljIG5ldHdvcmtcbiAgICAgKi9cbiAgICBzdGF0aWMgdXBkYXRlTmV0d29ya1N0YXR1cyhjaGFpbklkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgbmV0d29yayBzdGF0dXMgZm9yIGNoYWluICR7Y2hhaW5JZH1gKTtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBtb2NrIHN0YXR1c1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0ge1xuICAgICAgICAgICAgICAgIGNoYWluSWQsXG4gICAgICAgICAgICAgICAgaXNDb25uZWN0ZWQ6IE1hdGgucmFuZG9tKCkgPiAwLjEsIC8vIDkwJSBjaGFuY2Ugb2YgYmVpbmcgY29ubmVjdGVkXG4gICAgICAgICAgICAgICAgbGF0ZW5jeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNTAwKSwgLy8gMC01MDBtcyBsYXRlbmN5XG4gICAgICAgICAgICAgICAgbGFzdEJsb2NrOiAxMDAwMDAwMCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApLFxuICAgICAgICAgICAgICAgIGdhc1ByaWNlOiBjaGFpbklkID09PSAnMScgPyAnMjAnIDogdW5kZWZpbmVkIC8vIE9ubHkgRVRIIGhhcyBnYXMgcHJpY2UgZm9yIGRlbW9cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBVcGRhdGUgc3RvcmVkIHN0YXR1c1xuICAgICAgICAgICAgdGhpcy5uZXR3b3JrU3RhdHVzW2NoYWluSWRdID0gc3RhdHVzO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdGF0dXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IG5ldHdvcmsgc3RhdHVzZXMgZm9yIGFsbCBjaGFpbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QWxsTmV0d29ya1N0YXR1c2VzKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dldHRpbmcgYWxsIG5ldHdvcmsgc3RhdHVzZXMnKTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhbGwgbmV0d29yayBzdGF0dXNlc1xuICAgICAgICAgICAgeWllbGQgUHJvbWlzZS5hbGwoU1VQUE9SVEVEX0NIQUlOUy5tYXAoY2hhaW4gPT4gdGhpcy51cGRhdGVOZXR3b3JrU3RhdHVzKGNoYWluLmlkKSkpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLm5ldHdvcmtTdGF0dXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5CbG9ja2NoYWluU2VydmljZS5uZXR3b3JrU3RhdHVzID0ge307XG4iLCJleHBvcnQgY29uc3QgU1VQUE9SVEVEX0NIQUlOUyA9IFtcbiAgICB7XG4gICAgICAgIGlkOiAnMScsXG4gICAgICAgIG5hbWU6ICdFdGhlcmV1bScsXG4gICAgICAgIHN5bWJvbDogJ0VUSCcsXG4gICAgICAgIGRlY2ltYWxzOiAxOCxcbiAgICAgICAgcnBjVXJsOiAnaHR0cHM6Ly9ldGgtbWFpbm5ldC5nLmFsY2hlbXkuY29tL3YyLyR7QUxDSEVNWV9BUElfS0VZfScsXG4gICAgICAgIGV4cGxvcmVyVXJsOiAnaHR0cHM6Ly9ldGhlcnNjYW4uaW8nLFxuICAgICAgICBsb2dvOiAnZXRoZXJldW0uc3ZnJyxcbiAgICAgICAgaXNUZXN0bmV0OiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJzEzNycsXG4gICAgICAgIG5hbWU6ICdQb2x5Z29uJyxcbiAgICAgICAgc3ltYm9sOiAnTUFUSUMnLFxuICAgICAgICBkZWNpbWFsczogMTgsXG4gICAgICAgIHJwY1VybDogJ2h0dHBzOi8vcG9seWdvbi1tYWlubmV0LmcuYWxjaGVteS5jb20vdjIvJHtBTENIRU1ZX0FQSV9LRVl9JyxcbiAgICAgICAgZXhwbG9yZXJVcmw6ICdodHRwczovL3BvbHlnb25zY2FuLmNvbScsXG4gICAgICAgIGxvZ286ICdwb2x5Z29uLnN2ZycsXG4gICAgICAgIGlzVGVzdG5ldDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdzb2xhbmEnLFxuICAgICAgICBuYW1lOiAnU29sYW5hJyxcbiAgICAgICAgc3ltYm9sOiAnU09MJyxcbiAgICAgICAgZGVjaW1hbHM6IDksXG4gICAgICAgIHJwY1VybDogJ2h0dHBzOi8vYXBpLm1haW5uZXQtYmV0YS5zb2xhbmEuY29tJyxcbiAgICAgICAgZXhwbG9yZXJVcmw6ICdodHRwczovL3NvbHNjYW4uaW8nLFxuICAgICAgICBsb2dvOiAnc29sYW5hLnN2ZycsXG4gICAgICAgIGlzVGVzdG5ldDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICc1NicsXG4gICAgICAgIG5hbWU6ICdCaW5hbmNlIFNtYXJ0IENoYWluJyxcbiAgICAgICAgc3ltYm9sOiAnQk5CJyxcbiAgICAgICAgZGVjaW1hbHM6IDE4LFxuICAgICAgICBycGNVcmw6ICdodHRwczovL2JzYy1kYXRhc2VlZC5iaW5hbmNlLm9yZycsXG4gICAgICAgIGV4cGxvcmVyVXJsOiAnaHR0cHM6Ly9ic2NzY2FuLmNvbScsXG4gICAgICAgIGxvZ286ICdiaW5hbmNlLnN2ZycsXG4gICAgICAgIGlzVGVzdG5ldDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICc0MzExNCcsXG4gICAgICAgIG5hbWU6ICdBdmFsYW5jaGUnLFxuICAgICAgICBzeW1ib2w6ICdBVkFYJyxcbiAgICAgICAgZGVjaW1hbHM6IDE4LFxuICAgICAgICBycGNVcmw6ICdodHRwczovL2FwaS5hdmF4Lm5ldHdvcmsvZXh0L2JjL0MvcnBjJyxcbiAgICAgICAgZXhwbG9yZXJVcmw6ICdodHRwczovL3Nub3d0cmFjZS5pbycsXG4gICAgICAgIGxvZ286ICdhdmFsYW5jaGUuc3ZnJyxcbiAgICAgICAgaXNUZXN0bmV0OiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJzQyMTYxJyxcbiAgICAgICAgbmFtZTogJ0FyYml0cnVtJyxcbiAgICAgICAgc3ltYm9sOiAnRVRIJyxcbiAgICAgICAgZGVjaW1hbHM6IDE4LFxuICAgICAgICBycGNVcmw6ICdodHRwczovL2FyYjEuYXJiaXRydW0uaW8vcnBjJyxcbiAgICAgICAgZXhwbG9yZXJVcmw6ICdodHRwczovL2FyYmlzY2FuLmlvJyxcbiAgICAgICAgbG9nbzogJ2FyYml0cnVtLnN2ZycsXG4gICAgICAgIGlzVGVzdG5ldDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICcxMCcsXG4gICAgICAgIG5hbWU6ICdPcHRpbWlzbScsXG4gICAgICAgIHN5bWJvbDogJ0VUSCcsXG4gICAgICAgIGRlY2ltYWxzOiAxOCxcbiAgICAgICAgcnBjVXJsOiAnaHR0cHM6Ly9tYWlubmV0Lm9wdGltaXNtLmlvJyxcbiAgICAgICAgZXhwbG9yZXJVcmw6ICdodHRwczovL29wdGltaXN0aWMuZXRoZXJzY2FuLmlvJyxcbiAgICAgICAgbG9nbzogJ29wdGltaXNtLnN2ZycsXG4gICAgICAgIGlzVGVzdG5ldDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdjb3Ntb3MnLFxuICAgICAgICBuYW1lOiAnQ29zbW9zJyxcbiAgICAgICAgc3ltYm9sOiAnQVRPTScsXG4gICAgICAgIGRlY2ltYWxzOiA2LFxuICAgICAgICBycGNVcmw6ICdodHRwczovL3JwYy5jb3Ntb3MubmV0d29yaycsXG4gICAgICAgIGV4cGxvcmVyVXJsOiAnaHR0cHM6Ly9taW50c2Nhbi5pby9jb3Ntb3MnLFxuICAgICAgICBsb2dvOiAnY29zbW9zLnN2ZycsXG4gICAgICAgIGlzVGVzdG5ldDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdiaXRjb2luJyxcbiAgICAgICAgbmFtZTogJ0JpdGNvaW4nLFxuICAgICAgICBzeW1ib2w6ICdCVEMnLFxuICAgICAgICBkZWNpbWFsczogOCxcbiAgICAgICAgcnBjVXJsOiAnaHR0cHM6Ly9idGMuZ2V0YmxvY2suaW8vbWFpbm5ldC8nLFxuICAgICAgICBleHBsb3JlclVybDogJ2h0dHBzOi8vd3d3LmJsb2NrY2hhaW4uY29tL2V4cGxvcmVyJyxcbiAgICAgICAgbG9nbzogJ2JpdGNvaW4uc3ZnJyxcbiAgICAgICAgaXNUZXN0bmV0OiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ3Ryb24nLFxuICAgICAgICBuYW1lOiAnVHJvbicsXG4gICAgICAgIHN5bWJvbDogJ1RSWCcsXG4gICAgICAgIGRlY2ltYWxzOiA2LFxuICAgICAgICBycGNVcmw6ICdodHRwczovL2FwaS50cm9uZ3JpZC5pbycsXG4gICAgICAgIGV4cGxvcmVyVXJsOiAnaHR0cHM6Ly90cm9uc2Nhbi5vcmcnLFxuICAgICAgICBsb2dvOiAndHJvbi5zdmcnLFxuICAgICAgICBpc1Rlc3RuZXQ6IGZhbHNlXG4gICAgfVxuXTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gQmFja2dyb3VuZCBzY3JpcHQgZm9yIHRoZSBLbm90IFdhbGxldCBDaHJvbWUgZXh0ZW5zaW9uXG5pbXBvcnQgeyBCbG9ja2NoYWluU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Jsb2NrY2hhaW4uc2VydmljZSc7XG4vLyBJbml0aWFsaXplIHRoZSBleHRlbnNpb24gd2hlbiBpbnN0YWxsZWRcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKGRldGFpbHMgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdLbm90IFdhbGxldCBpbnN0YWxsZWQhJywgZGV0YWlscyk7XG4gICAgLy8gSW5pdGlhbGl6ZSBibG9ja2NoYWluIHByb3ZpZGVycyAod291bGQgdXNlIGFuIEFQSSBrZXkgaW4gcHJvZHVjdGlvbilcbiAgICBCbG9ja2NoYWluU2VydmljZS5pbml0UHJvdmlkZXJzKClcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluaXRpYWxpemluZyBwcm92aWRlcnM6JywgZXJyb3IpKTtcbiAgICAvLyBTZXQgdXAgY29udGV4dCBtZW51IChvcHRpb25hbClcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICAgIGlkOiAna25vdC13YWxsZXQnLFxuICAgICAgICB0aXRsZTogJ0tub3QgV2FsbGV0JyxcbiAgICAgICAgY29udGV4dHM6IFsnYWxsJ11cbiAgICB9KTtcbn0pO1xuLy8gTGlzdGVuIGZvciBtZXNzYWdlcyBmcm9tIGNvbnRlbnQgc2NyaXB0IG9yIHBvcHVwXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ01lc3NhZ2UgcmVjZWl2ZWQ6JywgbWVzc2FnZSwgJ2Zyb206Jywgc2VuZGVyKTtcbiAgICAvLyBIYW5kbGUgZGlmZmVyZW50IG1lc3NhZ2UgdHlwZXNcbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgICBjYXNlICdHRVRfTkVUV09SS19TVEFUVVMnOlxuICAgICAgICAgICAgLy8gR2V0IG5ldHdvcmsgc3RhdHVzIGZvciBhIHNwZWNpZmljIGNoYWluXG4gICAgICAgICAgICBCbG9ja2NoYWluU2VydmljZS51cGRhdGVOZXR3b3JrU3RhdHVzKG1lc3NhZ2UuY2hhaW5JZClcbiAgICAgICAgICAgICAgICAudGhlbihzdGF0dXMgPT4gc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogc3RhdHVzIH0pKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIEtlZXAgdGhlIGNoYW5uZWwgb3BlbiBmb3IgYXN5bmMgcmVzcG9uc2VcbiAgICAgICAgY2FzZSAnR0VUX0JBTEFOQ0UnOlxuICAgICAgICAgICAgLy8gR2V0IGJhbGFuY2UgZm9yIGFuIGFkZHJlc3Mgb24gYSBzcGVjaWZpYyBjaGFpblxuICAgICAgICAgICAgQmxvY2tjaGFpblNlcnZpY2UuZ2V0QmFsYW5jZShtZXNzYWdlLmNoYWluSWQsIG1lc3NhZ2UuYWRkcmVzcylcbiAgICAgICAgICAgICAgICAudGhlbihiYWxhbmNlID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGJhbGFuY2UgfSkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gS2VlcCB0aGUgY2hhbm5lbCBvcGVuIGZvciBhc3luYyByZXNwb25zZVxuICAgICAgICBjYXNlICdTRU5EX1RSQU5TQUNUSU9OJzpcbiAgICAgICAgICAgIC8vIFNlbmQgYSB0cmFuc2FjdGlvblxuICAgICAgICAgICAgLy8gSW4gYSByZWFsIGFwcCwgdGhpcyB3b3VsZCByZXF1aXJlIHVzZXIgY29uZmlybWF0aW9uXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVHJhbnNhY3Rpb24gcmVxdWVzdCByZWNlaXZlZCAtIHdvdWxkIHByb21wdCB1c2VyJyk7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdNYW51YWwgc2VuZGluZyBub3QgaW1wbGVtZW50ZWQgaW4gZGVtbycgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1Vua25vd24gbWVzc2FnZSB0eXBlOicsIG1lc3NhZ2UudHlwZSk7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVbmtub3duIG1lc3NhZ2UgdHlwZScgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSk7XG4vLyBTZXQgdXAgYW4gYWxhcm0gdG8gcGVyaW9kaWNhbGx5IHVwZGF0ZSBuZXR3b3JrIHN0YXR1c2VzXG5jaHJvbWUuYWxhcm1zLmNyZWF0ZSgndXBkYXRlTmV0d29ya1N0YXR1cycsIHsgcGVyaW9kSW5NaW51dGVzOiAxIH0pO1xuY2hyb21lLmFsYXJtcy5vbkFsYXJtLmFkZExpc3RlbmVyKGFsYXJtID0+IHtcbiAgICBpZiAoYWxhcm0ubmFtZSA9PT0gJ3VwZGF0ZU5ldHdvcmtTdGF0dXMnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGluZyBuZXR3b3JrIHN0YXR1c2VzLi4uJyk7XG4gICAgICAgIC8vIFVwZGF0ZSBuZXR3b3JrIHN0YXR1c2VzIGZvciBhbGwgY2hhaW5zXG4gICAgICAgIEJsb2NrY2hhaW5TZXJ2aWNlLmdldEFsbE5ldHdvcmtTdGF0dXNlcygpXG4gICAgICAgICAgICAudGhlbihzdGF0dXNlcyA9PiB7XG4gICAgICAgICAgICAvLyBTdG9yZSB1cGRhdGVkIHN0YXR1c2VzIGluIGxvY2FsIHN0b3JhZ2UgZm9yIHF1aWNrIGFjY2Vzc1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgbmV0d29ya1N0YXR1c2VzOiBzdGF0dXNlcyB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOZXR3b3JrIHN0YXR1c2VzIHVwZGF0ZWQnKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvciB1cGRhdGluZyBuZXR3b3JrIHN0YXR1c2VzOicsIGVycm9yKSk7XG4gICAgfVxufSk7XG4vLyBIYW5kbGUgY29ubmVjdGlvbiB0byBleHRlbnNpb25cbmNocm9tZS5ydW50aW1lLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihwb3J0ID0+IHtcbiAgICBjb25zb2xlLmxvZygnUG9ydCBjb25uZWN0ZWQ6JywgcG9ydC5uYW1lKTtcbiAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtZXNzYWdlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1BvcnQgbWVzc2FnZSByZWNlaXZlZDonLCBtZXNzYWdlKTtcbiAgICAgICAgLy8gSGFuZGxlIGxvbmctbGl2ZWQgY29ubmVjdGlvbiBtZXNzYWdlc1xuICAgICAgICAvLyBUaGlzIGlzIHVzZWZ1bCBmb3Igb3BlcmF0aW9ucyB0aGF0IHJlcXVpcmUgb25nb2luZyBjb21tdW5pY2F0aW9uXG4gICAgfSk7XG4gICAgcG9ydC5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnUG9ydCBkaXNjb25uZWN0ZWQ6JywgcG9ydC5uYW1lKTtcbiAgICB9KTtcbn0pO1xuLy8gTG9nIHdoZW4gZXh0ZW5zaW9uIGlzIGxvYWRlZFxuY29uc29sZS5sb2coJ0tub3QgV2FsbGV0IGJhY2tncm91bmQgc2NyaXB0IGxvYWRlZCcpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9