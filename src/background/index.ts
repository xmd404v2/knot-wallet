// Background script for the Knot Wallet Chrome extension
import { BlockchainService } from '../services/blockchain.service';

// Initialize the extension when installed
chrome.runtime.onInstalled.addListener(details => {
  console.log('Knot Wallet installed!', details);
  
  // Initialize blockchain providers (would use an API key in production)
  BlockchainService.initProviders()
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
      BlockchainService.updateNetworkStatus(message.chainId)
        .then(status => sendResponse({ success: true, data: status }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Keep the channel open for async response
      
    case 'GET_BALANCE':
      // Get balance for an address on a specific chain
      BlockchainService.getBalance(message.chainId, message.address)
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
    BlockchainService.getAllNetworkStatuses()
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