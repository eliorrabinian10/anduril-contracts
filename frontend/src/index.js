import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Force scroll to top before React renders
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Check if this is a fresh page load (not navigation within app)
const isPageRefresh = performance.navigation?.type === 1 ||
                      performance.getEntriesByType('navigation')[0]?.type === 'reload';

// If it's a refresh, clear any hash and scroll to top
if (isPageRefresh && window.location.hash) {
  // Remove hash from URL without reloading
  window.history.replaceState(null, '', window.location.pathname);
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
} else if (!window.location.hash) {
  // No hash - scroll to top
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
