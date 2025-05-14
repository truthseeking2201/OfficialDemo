// Network kill-switch for security
window.fetch = () => Promise.reject(new Error('[blocked] outbound fetch disabled'));
const XHR = window.XMLHttpRequest;
window.XMLHttpRequest = class extends XHR { 
  open(){ throw new Error('[blocked] xhr disabled'); } 
};

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FakeWalletProvider } from './stubs/FakeWalletBridge';

// Simplify the rendering process to reduce potential errors
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found!");
} else {
  // Mount app with FakeWalletProvider
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <FakeWalletProvider>
        <App />
      </FakeWalletProvider>
    </React.StrictMode>
  );
}