import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ContractsList from './components/ContractsList';
import Analytics from './components/Analytics';
import Search from './components/Search';
import NoteBuddy from './components/NoteBuddy';
import EliorAgent from './components/EliorAgent';
import './App.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top on every route change without hash
    if (!hash) {
      window.scrollTo(0, 0);
      // Double-check after a tiny delay to override any other scroll attempts
      setTimeout(() => {
        if (!window.location.hash) {
          window.scrollTo(0, 0);
        }
      }, 0);
    }
  }, [pathname, hash]);

  // Also handle page load/refresh
  useEffect(() => {
    const handleLoad = () => {
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('load', handleLoad);
    // Run immediately on mount
    handleLoad();

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAndurilRoute = location.pathname.startsWith('/anduril');

  return (
    <div className="App">
      <ScrollToTop />
      {isAndurilRoute && (
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <div className="nav-text">
                <h1>Elior Rabinian</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/anduril-logo.png" alt="Anduril" style={{ height: '20px', width: 'auto' }} />
                  <p>Anduril Contracts - Contract Tracking & Analysis</p>
                </div>
              </div>
            </div>
            <div className="nav-links">
              <Link to="/anduril" className="nav-link">Dashboard</Link>
              <Link to="/anduril/contracts" className="nav-link">Contracts</Link>
              <Link to="/anduril/analytics" className="nav-link">Analytics</Link>
              <Link to="/anduril/search" className="nav-link">Search</Link>
              <Link to="/#projects" className="nav-link nav-link-home">← Back to Portfolio</Link>
            </div>
          </div>
        </nav>
      )}

      <main className={isAndurilRoute ? "main-content" : "main-content-full"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anduril" element={<Dashboard />} />
          <Route path="/anduril/contracts" element={<ContractsList />} />
          <Route path="/anduril/analytics" element={<Analytics />} />
          <Route path="/anduril/search" element={<Search />} />
          <Route path="/notebuddy" element={<NoteBuddy />} />
          <Route path="/elior-agent" element={<EliorAgent />} />
        </Routes>
      </main>

      {isAndurilRoute && (
        <footer className="footer">
          <p>© 2026 Elior Rabinian - Independent Anduril Contract Analysis Platform</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
